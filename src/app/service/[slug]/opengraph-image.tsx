import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getService, services } from "@/lib/pages/service";

export const alt = "Webify";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((x) => ({ slug: x.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getService(slug);
  return ogImage({ eyebrow: "Service", title: item?.title ?? "Webify" });
}
