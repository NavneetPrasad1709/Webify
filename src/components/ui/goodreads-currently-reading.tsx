"use client";

import { BookOpen, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { CurrentlyReadingBook } from "@/app/api/goodreads/route";

/**
 * Goodreads "currently reading" widget (21st.dev: abbasplusplus).
 *
 * Built faithfully to the reference's BOLD look — oversized mono
 * "CURRENTLY READING" label, large shadowed/bordered cover, font-black title,
 * big star rating — just made mobile-first responsive (the reference's fixed
 * text-5xl / w-64 / p-12 overflow a phone) so the same anatomy scales down.
 *
 * Data is fetched from our cached server route (/api/goodreads) rather than the
 * reference's public CORS proxy + browser DOMParser — faster, reliable, no
 * third-party on the critical path. Visual design is unchanged.
 *
 * Pass the founder's real Goodreads list id via `goodreadsUserId`
 * (e.g. NEXT_PUBLIC_GOODREADS_USER_ID) — [REPLACE: founder's Goodreads list id].
 */
export function GoodreadsCurrentlyReading({
  goodreadsUserId = "117356165-mohammad-abbas",
  className,
}: {
  goodreadsUserId?: string;
  className?: string;
}) {
  const [book, setBook] = useState<CurrentlyReadingBook | null>(null);
  const [loading, setLoading] = useState(Boolean(goodreadsUserId));

  useEffect(() => {
    if (!goodreadsUserId) return;

    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    (async () => {
      try {
        const res = await fetch(
          `/api/goodreads?userId=${encodeURIComponent(goodreadsUserId)}`,
          { signal: controller.signal },
        );
        const data: { book: CurrentlyReadingBook | null } = await res.json();
        if (!cancelled) setBook(data.book);
      } catch {
        if (!cancelled) setBook(null);
      } finally {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [goodreadsUserId]);

  const Label = (
    <div className="font-mono uppercase tracking-[0.2em] text-muted-foreground text-[clamp(1.25rem,4vw,2.25rem)]">
      Currently reading
    </div>
  );

  const shellClass = cn(
    "rounded-3xl border border-border bg-card p-5 sm:p-8 md:p-10",
    className,
  );

  if (loading) {
    return (
      <div className={shellClass} aria-busy="true" aria-label="Loading currently reading">
        <div className="space-y-7 sm:space-y-9">
          {Label}
          <div className="flex animate-pulse items-start gap-5 sm:gap-8 md:gap-10">
            <div className="aspect-[2/3] w-28 shrink-0 rounded-2xl bg-muted sm:w-44 md:w-56" />
            <div className="flex-1 space-y-5 pt-1">
              <div className="h-10 w-4/5 rounded-lg bg-muted sm:h-14" />
              <div className="h-7 w-1/2 rounded-lg bg-muted sm:h-9" />
              <div className="h-6 w-1/3 rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty / error → render nothing (reference behaviour).
  if (!book) return null;

  const cover = (
    <div className="group/cover relative aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-border bg-muted shadow-2xl shadow-black/50 sm:w-44 md:w-56 lg:w-64">
      {book.imageUrl ? (
        // Cover comes from the Goodreads CDN (dynamic, off-domain) — a plain
        // <img> avoids whitelisting a host for one small lazy thumbnail.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/cover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <BookOpen className="h-16 w-16 text-muted-foreground sm:h-20 sm:w-20" aria-hidden />
        </div>
      )}
    </div>
  );

  return (
    <div className={shellClass}>
      <div className="space-y-7 sm:space-y-9">
        {Label}

        <div className="flex items-start gap-5 sm:gap-8 md:gap-10">
          {book.bookUrl ? (
            <a
              href={book.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-2xl"
              aria-label={`${book.title} on Goodreads`}
            >
              {cover}
            </a>
          ) : (
            cover
          )}

          <div className="min-w-0 flex-1 space-y-4 sm:space-y-5">
            {book.bookUrl ? (
              <a href={book.bookUrl} target="_blank" rel="noopener noreferrer" className="group/title block">
                <h3 className="line-clamp-4 text-balance font-black leading-[1.05] tracking-tight text-foreground transition-colors group-hover/title:text-muted-foreground text-[clamp(1.5rem,6vw,3rem)]">
                  {book.title}
                </h3>
              </a>
            ) : (
              <h3 className="line-clamp-4 text-balance font-black leading-[1.05] tracking-tight text-foreground text-[clamp(1.5rem,6vw,3rem)]">
                {book.title}
              </h3>
            )}

            <p className="font-bold text-muted-foreground text-[clamp(1.0625rem,3.5vw,1.75rem)]">
              by {book.author}
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-semibold text-muted-foreground">
              {book.rating ? (
                <span className="inline-flex items-center gap-2.5">
                  <Star className="h-7 w-7 shrink-0 fill-current text-yellow-400 sm:h-9 sm:w-9" aria-hidden />
                  <span className="nums font-bold text-foreground text-[clamp(1.25rem,4vw,1.875rem)]">
                    {book.rating.toFixed(2)}
                  </span>
                  <span className="sr-only">average Goodreads rating</span>
                </span>
              ) : null}
              {book.published ? (
                <span className="text-[clamp(0.875rem,2.5vw,1.25rem)] opacity-75">
                  Published {book.published}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoodreadsCurrentlyReading;
