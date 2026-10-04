import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Webify: Notes on Design and Engineering";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Journal", title: "Notes on Design and Engineering" });
}
