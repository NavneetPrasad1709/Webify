import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/pages/blog/BlogArticle";
import { getNextPost, getPost, posts } from "@/lib/pages/blog";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const published = new Date(post.date).toISOString().slice(0, 10);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: published,
        // No per-post updated field exists yet, so this mirrors publication
        // rather than claiming an edit that never happened.
        dateModified: published,
        image: `${SITE_URL}${post.hero}`,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        /* A named person on a technical post is a trust signal an
           organization byline cannot buy, and there is exactly one human
           writing these. */
        author: {
          "@type": "Person",
          name: "Navneet Prasad",
          url: `${SITE_URL}/about`,
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} next={getNextPost(slug)} />
    </main>
  );
}
