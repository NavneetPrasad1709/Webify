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

export const CASE_STUDIES: readonly CaseStudy[] = [];

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
