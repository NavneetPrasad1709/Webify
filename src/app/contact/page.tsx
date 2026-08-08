import type { Metadata } from "next";
import ContactSection from "@/components/pages/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Webify or Book a 20 Minute Call",
  description:
    "Tell us what you are building, or take a short call instead. You talk to the people who design and build it, and we reply within 24 hours, wherever you are.",
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
