import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import {
  WorkHero,
  WorkFeatured,
  WorkStatement,
  WorkShowcase,
  WorkPartners,
  WorkLogos,
  WorkMarquee,
} from "@/components/sections/work/habito-work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "What a senior-led product engineering studio builds - AI products, web apps, and mobile apps, designed and shipped end to end for teams in India and worldwide.",
  alternates: { canonical: "/work" },
};

/**
 * /work - light capability page (Habito-style reference). Uses the site's global
 * navbar + footer (rendered by the root layout); this page only paints its own
 * light canvas and content, with scroll motion on every section (habito-work).
 */
export default function WorkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Work - Webify",
    url: `${siteConfig.url}/work`,
    description:
      "AI products, web apps, and mobile apps designed and shipped end to end by a senior-led studio.",
  };

  return (
    <main className="bg-[#f3f2ee] text-[#0d0d0d]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkHero />
      <WorkFeatured />
      <WorkStatement />
      <WorkShowcase />
      <WorkPartners />
      <WorkLogos />
      <WorkMarquee />
    </main>
  );
}
