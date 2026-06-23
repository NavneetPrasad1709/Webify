/**
 * Social-proof data for the home trust bar + testimonials.
 *
 * METRICS are TRUE, self-defensible figures (no fabricated business outcomes) -
 * safe to ship as-is.
 *
 * TESTIMONIALS and CLIENT_LOGOS are PLACEHOLDERS, flagged `placeholder: true`.
 * The components render them with a visible "sample - replace before launch"
 * marker so nothing fake ever ships unnoticed. Swap in real, permissioned quotes
 * and logos (then drop the `placeholder` flag) and the markers disappear.
 */

export interface Metric {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  /** Initials shown in the avatar chip until a real photo exists. */
  initials: string;
  placeholder?: boolean;
}

export interface ClientLogo {
  name: string;
  placeholder?: boolean;
}

/** TRUE figures - ship as-is. */
export const METRICS: readonly Metric[] = [
  { value: "100%", label: "Code, repos & IP you keep" },
  { value: "0", label: "Junior hand-offs or account managers" },
  { value: "24h", label: "First reply to every enquiry" },
  { value: "End-to-end", label: "Design → build → ship, one senior team" },
] as const;

/** PLACEHOLDER - replace with real, permissioned client quotes. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "They scoped, designed and shipped our MVP in weeks - and we owned every line of it. The senior we spoke to on day one is the one who built it.",
    author: "Client Name",
    role: "Founder, Company",
    initials: "CN",
    placeholder: true,
  },
  {
    quote:
      "No hand-offs, no account managers, no surprises. Just a tight team that moved fast and told us the truth about trade-offs.",
    author: "Client Name",
    role: "Head of Product, Company",
    initials: "CN",
    placeholder: true,
  },
  {
    quote:
      "We came with a half-formed idea and left with a production AI product our customers actually use every day.",
    author: "Client Name",
    role: "CEO, Company",
    initials: "CN",
    placeholder: true,
  },
] as const;

/** PLACEHOLDER - replace with real client wordmarks/logos. */
export const CLIENT_LOGOS: readonly ClientLogo[] = [
  { name: "Client 01", placeholder: true },
  { name: "Client 02", placeholder: true },
  { name: "Client 03", placeholder: true },
  { name: "Client 04", placeholder: true },
  { name: "Client 05", placeholder: true },
] as const;

export const hasRealTestimonials = TESTIMONIALS.some((t) => !t.placeholder);
export const hasRealLogos = CLIENT_LOGOS.some((l) => !l.placeholder);
