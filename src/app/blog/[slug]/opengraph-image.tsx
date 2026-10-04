import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getPost, posts } from "@/lib/pages/blog";

export const alt = "Webify";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((x) => ({ slug: x.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPost(slug);
  return ogImage({ eyebrow: "Article", title: item?.title ?? "Webify" });
}
