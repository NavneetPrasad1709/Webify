import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/work";
import {
  WorkHero,
  WorkStatement,
  WorkShowcase,
  WorkPartners,
  WorkLogos,
  WorkMarquee,
} from "@/components/sections/work/habito-work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Brand-selected works from a senior-led product engineering studio — AI products, web apps, and mobile apps, shipped and running for teams in India and worldwide.",
  alternates: { canonical: "/work" },
};

const SITE_URL = "https://webify.dev"; // [REPLACE: production domain]

/**
 * /work — light "BRAND SELECTED WORKS" page (Habito-style reference).
 * Uses the site's global navbar + footer (rendered by the root layout); this
 * page only paints its own light canvas and content, with scroll motion on
 * every section (see habito-work.tsx).
 */
export default function WorkPage() {
  const studies = getCaseStudies();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Work — Webify",
    url: `${SITE_URL}/work`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: studies.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/work/${s.slug}`,
        name: s.name,
      })),
    },
  };

  return (
    <main className="bg-[#f3f2ee] text-[#0d0d0d]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkHero />
      <WorkStatement />
      <WorkShowcase />
      <WorkPartners />
      <WorkLogos />
      <WorkMarquee />
    </main>
  );
}
