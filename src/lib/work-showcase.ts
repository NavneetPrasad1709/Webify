/**
 * Data for the /work index (Habito-style "BRAND SELECTED WORKS" layout).
 *
 * The editorial grid mixes 2-up and 3-up rows. Tiles that map to a real case
 * study link into /work/[slug] and reuse its cover; the rest are placeholder
 * brand-work tiles ([REPLACE:] the title + image with real project captures).
 * Unsplash + higgs hosts are already whitelisted in next.config.ts.
 */
import { getCaseStudy } from "./work";

export interface ShowcaseTile {
  title: string;
  category: string;
  year: string;
  image: { src: string; alt: string };
  /** Internal route if this tile is a real case study. */
  href?: string;
  /** Visual emphasis — controls the tile's aspect ratio in its row. */
  shape?: "portrait" | "landscape" | "square";
}

export interface ShowcaseRow {
  cols: 2 | 3;
  items: ShowcaseTile[];
}

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&auto=format&q=85`;

function fromCase(slug: string, category: string, shape: ShowcaseTile["shape"]): ShowcaseTile {
  const c = getCaseStudy(slug);
  if (!c) throw new Error(`Unknown case study: ${slug}`);
  return {
    title: c.name,
    category,
    year: c.year,
    image: c.cover,
    href: `/work/${c.slug}`,
    shape,
  };
}

export const SHOWCASE_ROWS: ShowcaseRow[] = [
  {
    cols: 2,
    items: [
      fromCase("nextlevel-studio", "Web platform", "portrait"),
      {
        title: "[REPLACE: project name]",
        category: "Editorial & print",
        year: "2025",
        image: {
          src: u("1486406146926-c627a92ad1ab", 1280, 1600),
          alt: "[REPLACE: editorial / print brand work capture]",
        },
        shape: "landscape",
      },
    ],
  },
  {
    cols: 3,
    items: [
      fromCase("aura", "AI product", "square"),
      {
        title: "[REPLACE: project name]",
        category: "Visual identity",
        year: "2024",
        image: {
          src: u("1557683316-973673baf926", 1000, 1000),
          alt: "[REPLACE: visual identity brand work capture]",
        },
        shape: "square",
      },
      {
        title: "[REPLACE: project name]",
        category: "Packaging",
        year: "2024",
        image: {
          src: u("1618005182384-a83a8bd57fbe", 1000, 1000),
          alt: "[REPLACE: packaging brand work capture]",
        },
        shape: "square",
      },
    ],
  },
  {
    cols: 2,
    items: [
      fromCase("solaris-digital", "Mobile app", "landscape"),
      {
        title: "[REPLACE: project name]",
        category: "Brand identity",
        year: "2024",
        image: {
          src: u("1449824913935-59a10b8d2000", 1280, 900),
          alt: "[REPLACE: brand identity work capture]",
        },
        shape: "landscape",
      },
    ],
  },
  {
    cols: 3,
    items: [
      {
        title: "[REPLACE: project name]",
        category: "Campaign",
        year: "2023",
        image: {
          src: u("1506905925346-21bda4d32df4", 1000, 1000),
          alt: "[REPLACE: campaign brand work capture]",
        },
        shape: "square",
      },
      {
        title: "[REPLACE: project name]",
        category: "Product design",
        year: "2023",
        image: {
          src: u("1441974231531-c6227db76b6e", 1000, 1000),
          alt: "[REPLACE: product design brand work capture]",
        },
        shape: "square",
      },
      {
        title: "[REPLACE: project name]",
        category: "Web design",
        year: "2023",
        image: {
          src: u("1439066615861-d1af74d74000", 1000, 1000),
          alt: "[REPLACE: web design brand work capture]",
        },
        shape: "square",
      },
    ],
  },
];

/** Client testimonial rows for "OUR PARTNER SAYS". Featured = first row. */
export interface PartnerQuote {
  client: string;
  company: string;
  year: string;
  feedback: string;
  services: string[];
}

export const PARTNER_QUOTES: PartnerQuote[] = [
  {
    client: "[REPLACE: client name]",
    company: "[REPLACE: company]",
    year: "2025",
    feedback:
      "[REPLACE: a specific-outcome quote — e.g. “Working with Webify elevated our product to a whole new level. The senior-led process and attention to detail made the collaboration a success.”]",
    services: ["Branding", "Pitch Deck", "Website", "Development"],
  },
  { client: "[REPLACE: client name]", company: "[REPLACE: company]", year: "2025", feedback: "", services: [] },
  { client: "[REPLACE: client name]", company: "[REPLACE: company]", year: "2024", feedback: "", services: [] },
  { client: "[REPLACE: client name]", company: "[REPLACE: company]", year: "2024", feedback: "", services: [] },
  { client: "[REPLACE: client name]", company: "[REPLACE: company]", year: "2023", feedback: "", services: [] },
];

/** Partner / client wordmarks (text placeholders — swap for real SVG logos). */
export const PARTNERS: string[] = [
  "bridge",
  "SARGAH",
  "Blomer",
  "hamlet",
  "Hyllo",
  "uneek",
  "Bohemian",
  "Onnec",
  "Bilkelin",
  "HDS",
  "social",
  "Webify",
];
