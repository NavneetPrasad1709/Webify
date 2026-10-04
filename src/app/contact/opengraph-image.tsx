import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Webify: Tell Us What You Are Building";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Contact", title: "Tell Us What You Are Building" });
}
