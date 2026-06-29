/**
 * Portfolio case studies (powers /work/[slug]).
 *
 * Intentionally EMPTY until real, shippable client work exists. We do not
 * publish invented clients, fabricated metrics, or AI-generated "screenshots" -
 * a verifiable portfolio is the one trust asset that can't be faked. Add real
 * entries here (with real names, real figures, and real production captures) and
 * the /work case-study pages light up automatically.
 */

export type Discipline = "AI Product" | "Web App" | "Mobile App";

export interface CaseStudyImage {
  src: string;
  /** Real, descriptive alt text - required for a11y + SEO. */
  alt: string;
}

export interface Metric {
  /** Headline figure. */
  value: string;
  /** What the figure measures. */
  label: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  client: string;
  discipline: Discipline;
  kind: "Client" | "Personal";
  year: string;
  tagline: string;
  summary: string;
  cover: CaseStudyImage;
  liveUrl?: string;
  problem: string[];
  approach: string[];
  build: {
    paragraphs: string[];
    stack: string[];
  };
  outcome: string[];
  metrics: Metric[];
  gallery: CaseStudyImage[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "stealthconnect",
    name: "StealthConnect",
    client: "StealthConnect",
    discipline: "AI Product",
    kind: "Client",
    year: "2025",
    tagline: "Verified LinkedIn contacts, delivered in under 30 minutes.",
    summary:
      "An AI contact-intelligence platform that turns a LinkedIn profile into a verified email and phone number in under 30 minutes - cross-referenced across live data sources, billed per result, no subscription.",
    cover: {
      src: "/work/stealthconnect/cover.png",
      alt: "StealthConnect home page - 'Looking for someone on LinkedIn?' with a contact-lookup field and live platform stats",
    },
    liveUrl: "https://www.stealthconnect.ai/",
    problem: [
      "Sales, recruiting, and business-development teams burn hours hunting for one decision-maker's real email or phone - and most contact tools lock that behind expensive monthly subscriptions, then still serve stale or unverified data.",
      "StealthConnect needed a product that flipped the model: paste a LinkedIn profile, get a verified contact back fast, and only pay when the data is real.",
    ],
    approach: [
      "We built the entire experience around a single action - paste a URL, get a verified contact - so the value lands in the first ten seconds on the page.",
      "Pricing is pay-per-result with a 'verified or it's free' guarantee, so trust sits inside the transaction rather than in the marketing copy.",
      "The interface leans on proof: live platform stats, a worked example, and a transparent three-step 'how it works' that shows exactly where each contact comes from.",
    ],
    build: {
      paragraphs: [
        "The contact engine cross-references multiple live sources - corporate directories, domain registries, and B2B enrichment databases - and verifies every result before it is ever charged, targeting a sub-30-minute turnaround.",
        "The front end pairs a fast, animated marketing site with an authenticated dashboard where results are delivered - built mobile-first and tuned for conversion from the first scroll.",
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe", "AI verification pipeline"],
    },
    outcome: [
      "StealthConnect shipped as a live, public product at stealthconnect.ai, with the pay-per-result flow working end to end - from a pasted LinkedIn URL to a verified contact in the dashboard.",
      "The product leads on its published performance: 97.2% verified accuracy, a 28-minute average delivery, and coverage across 190+ countries from a base of 800M+ contacts.",
    ],
    metrics: [
      { value: "97.2%", label: "Verified accuracy on delivered contacts" },
      { value: "28 min", label: "Average delivery, URL to verified contact" },
      { value: "800M+", label: "Contacts in the base, across 190+ countries" },
    ],
    gallery: [
      {
        src: "/work/stealthconnect/s2.png",
        alt: "StealthConnect 'How it works' - three steps from pasting a LinkedIn URL to a delivered, verified contact",
      },
      {
        src: "/work/stealthconnect/s3.png",
        alt: "StealthConnect 'Why' section - verified-not-estimated, 30-minute turnaround, and pay-per-result feature cards",
      },
    ],
  },
];

/** All case studies (index order). */
export function getCaseStudies(): readonly CaseStudy[] {
  return CASE_STUDIES;
}

/** Lookup by slug. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Every slug - for generateStaticParams. */
export function getCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((c) => c.slug);
}

/** The next study in the list (wraps around) - powers "Next project". */
export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (i === -1) return undefined;
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
}
