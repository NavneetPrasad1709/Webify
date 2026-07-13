import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/pages/blog/BlogArticle";
import { getNextPost, getPost, posts } from "@/lib/pages/blog";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString().slice(0, 10),
    image: `https://webify.org.in${post.hero}`,
    url: `https://webify.org.in/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Webify" },
    publisher: { "@id": "https://webify.org.in/#organization" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} next={getNextPost(slug)} />
    </main>
  );
}
