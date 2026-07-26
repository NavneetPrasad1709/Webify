import type { Metadata } from "next";
import ContactSection from "@/components/pages/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk directly to the senior team that designs and builds. Based in Greater Noida, serving Delhi NCR and clients worldwide. Replies within 24 hours.",
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
