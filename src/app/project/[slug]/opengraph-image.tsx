import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getProject, projectDetails } from "@/lib/pages/project";

export const alt = "Webify";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projectDetails.map((x) => ({ slug: x.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getProject(slug);
  return ogImage({ eyebrow: "Case Study", title: item?.name ?? "Webify" });
}
