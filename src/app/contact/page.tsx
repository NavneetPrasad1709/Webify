import type { Metadata } from "next";
import ContactSection from "@/components/pages/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk directly to the senior team that designs and builds. Start a project or ask a question; replies within 24 hours.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <main>
      <ContactSection defaultTopic={typeof topic === "string" ? topic.slice(0, 120) : ""} />
    </main>
  );
}
