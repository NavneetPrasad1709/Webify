import type { Metadata } from "next";
import BlogIndex from "@/components/pages/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Web Design, Branding & Development Articles",
  description:
    "Articles from Webify on web design, branding, UI and UX, and development. Written from real build work at a studio in Greater Noida. No filler.",
};

export default function BlogPage() {
  return (
    <main id="main">
      <BlogIndex />
    </main>
  );
}
