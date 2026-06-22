import { NextResponse } from "next/server";

/**
 * GET /api/goodreads?userId=<goodreads-list-rss-id>
 *
 * Server-side proxy + parser for a Goodreads "currently-reading" shelf.
 *
 * Why this exists: the original 21st.dev component fetched the RSS in the
 * browser through a public CORS proxy (api.allorigins.win) — slow, rate-limited,
 * and a third-party dependency on the critical path. Fetching server-side here
 * removes the proxy, dodges CORS entirely, and lets us cache the feed (Goodreads
 * updates infrequently), so the widget is fast and reliable. Returns the most
 * recently-added book, or `{ book: null }` on any failure (the client then
 * renders nothing — matching the component's original empty/error behaviour).
 */

export const revalidate = 3600; // re-fetch the shelf at most hourly

export interface CurrentlyReadingBook {
  title: string;
  author: string;
  imageUrl: string | null;
  bookUrl: string | null;
  rating: number | null;
  published: number | null;
}

/** Extract a tag's text content, tolerating CDATA wrappers. */
function pick(block: string, tag: string): string | undefined {
  const re = new RegExp(
    `<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`,
    "i",
  );
  const value = block.match(re)?.[1]?.trim();
  return value || undefined;
}

function parseFirstItem(xml: string): CurrentlyReadingBook | null {
  const item = xml.match(/<item>([\s\S]*?)<\/item>/i)?.[1];
  if (!item) return null;

  const title = pick(item, "title") ?? "Unknown Title";
  const author = pick(item, "author_name") ?? "Unknown Author";
  const imageUrl =
    pick(item, "book_large_image_url") ??
    pick(item, "book_medium_image_url") ??
    pick(item, "book_small_image_url") ??
    pick(item, "book_image_url") ??
    null;
  const bookId = pick(item, "book_id");
  const ratingRaw = pick(item, "average_rating");
  const publishedRaw = pick(item, "book_published");

  const rating = ratingRaw ? Number.parseFloat(ratingRaw) : null;
  const published = publishedRaw ? Number.parseInt(publishedRaw, 10) : null;

  return {
    title,
    author,
    imageUrl,
    bookUrl: bookId ? `https://www.goodreads.com/book/show/${bookId}` : null,
    rating: Number.isFinite(rating as number) ? rating : null,
    published: Number.isFinite(published as number) ? published : null,
  };
}

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("userId")?.trim();

  // Validate: Goodreads list ids are alphanumerics + hyphens (e.g. "12345-name").
  if (!userId || !/^[\w-]+$/.test(userId)) {
    return NextResponse.json({ book: null }, { status: 200 });
  }

  const rssUrl = `https://www.goodreads.com/review/list_rss/${encodeURIComponent(
    userId,
  )}?shelf=currently-reading`;

  try {
    const res = await fetch(rssUrl, {
      headers: {
        // Goodreads serves an empty body to a missing/blank UA.
        "User-Agent": "WebifyStudio/1.0 (+https://webify.dev)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate },
    });

    if (!res.ok) {
      return NextResponse.json({ book: null }, { status: 200 });
    }

    const xml = await res.text();
    const book = parseFirstItem(xml);

    return NextResponse.json(
      { book },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json({ book: null }, { status: 200 });
  }
}
