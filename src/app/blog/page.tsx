import type { Metadata } from "next";
import BlogIndex from "@/components/pages/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News and insights from Webify: articles on branding, UI/UX design, web design, and design systems.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogIndex />
    </main>
  );
}
