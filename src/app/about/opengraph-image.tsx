import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Webify: The Team Behind Your Build";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "About Webify", title: "The Team Behind Your Build" });
}
