import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Webify: Web, Software and AI Services";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Services", title: "Web, Software and AI Services" });
}
