import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Webify: Live Concept Builds";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Work", title: "Live Concept Builds" });
}
