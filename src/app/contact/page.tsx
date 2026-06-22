import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = { title: "Contact" };

/** /contact — geo-aware form + calendar + FAQ (C1..C3). Crafted shell. */
export default function ContactPage() {
  return (
    <PageHero
      eyebrow="Contact"
      title={
        <>
          Tell us what you&apos;re <span className="script-accent">building</span>.
        </>
      }
    >
      The geo-aware form, calendar embed, and FAQ (C1–C3) wire in here.
    </PageHero>
  );
}
