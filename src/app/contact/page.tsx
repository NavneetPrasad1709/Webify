import type { Metadata } from "next";
import ContactSection from "@/components/pages/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact a Web Development Company in Delhi NCR",
  description:
    "Write to Webify, a web development company in Greater Noida serving Delhi NCR. You talk directly to the people who design and build. Replies within 24 hours.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <main id="main">
      <ContactSection defaultTopic={typeof topic === "string" ? topic.slice(0, 120) : ""} />
    </main>
  );
}
