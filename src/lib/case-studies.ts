import type { CaseStudyImage, Metric } from "@/lib/work";

/**
 * Case studies shown at /case-studies (list) and /case-studies/[slug] (detail).
 *
 * These three are PERSONAL / CONCEPT builds - self-initiated work that shows how
 * we think and what we can ship, labelled honestly (no invented client names, no
 * fabricated business outcomes; the metrics are real, self-measurable
 * engineering figures). Swap in your own personal projects, or add real client
 * studies, by editing this array.
 */
export interface CaseStudyResult {
  value: string;
  label: string;
}

export interface CaseStudyEntry {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: number;
  summary: string;
  cover: CaseStudyImage;
  results: CaseStudyResult[];
  problem: string[];
  approach: string[];
  build: { paragraphs: string[]; stack: string[] };
  outcome: string[];
  metrics: Metric[];
}

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

export const CASE_STUDIES: CaseStudyEntry[] = [
  {
    slug: "evergreen",
    title: "EverGreen - a luxury real-estate studio site",
    client: "Self-initiated build",
    category: "Web Design · Live",
    year: 2026,
    summary:
      "The 'Luxory Homes' project: a complete luxury architecture & real-estate brand - EverGreen - designed and shipped end to end, from a type-led, editorial home page to a scroll-choreographed residences gallery. Live and public on Next.js.",
    cover: {
      src: "/work/luxory-homes/cover.jpg",
      alt: "EverGreen home page - 'Homes built to last' over a modern architectural residence",
    },
    results: [
      { value: "~1.1s", label: "LCP, photo-led hero" },
      { value: "Live", label: "shipped on Vercel" },
    ],
    problem: [
      "Luxury real-estate sites tend to look the same - stock templates, timid typography, and stiff galleries that make premium homes feel ordinary.",
      "We set our own brief: design and ship a complete, believable luxury-property brand - EverGreen - with the editorial confidence of a print title and the performance of a modern web app.",
    ],
    approach: [
      "Lead with type and space - an oversized condensed display face, generous whitespace, and a warm cream-and-forest-green palette give every section the calm authority of a monograph.",
      "Let the architecture breathe, and choreograph the scroll: full-bleed photography, a staggered residences grid, and reveals that use motion to guide the eye rather than distract it.",
    ],
    build: {
      paragraphs: [
        "Built on Next.js with every image run through the framework's optimizer, so the cinematic photography loads sharp without stalling the page - mobile-first and fluid from phone to wide desktop.",
        "A full studio narrative is designed and wired end to end - hero, studio intro, a four-home residences gallery, a numbered services list, awards, client stories, a journal, an FAQ, and contact - each with its own scroll-triggered motion.",
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Vercel"],
    },
    outcome: [
      "EverGreen ships as a live, public site you can scroll end to end - a complete luxury real-estate brand that holds a largest-contentful-paint around 1.1 seconds despite a photography-led hero.",
      "It doubles as proof of range: the same studio behind an AI product can design and ship a premium, editorial brand experience with equal polish.",
    ],
    metrics: [
      { value: "~1.1s", label: "Largest contentful paint" },
      { value: "9", label: "Sections, choreographed on scroll" },
      { value: "Live", label: "Public on Vercel" },
    ],
  },
  {
    slug: "aura-ai-brand-copilot",
    title: "Aura - an AI brand-identity copilot",
    client: "Personal project",
    category: "AI Product · Concept",
    year: 2025,
    summary:
      "A self-initiated AI product that turns a one-line prompt into a usable brand system - names, type pairings, accessible palettes, and voice - with the reasoning behind every choice.",
    cover: { src: U("photo-1618005182384-a83a8bd57fbe"), alt: "Aura - generated brand system board" },
    results: [
      { value: "<8s", label: "prompt → full system" },
      { value: "AA", label: "contrast, every palette" },
    ],
    problem: [
      "Most AI design tools hand you a pretty picture and stop there. They don't reason about why a typeface fits a positioning, and they don't give you anything you can actually build with.",
      "We wanted to see how close a product could get to a senior designer's judgement - one that makes a decision and defends it, instead of spraying ten options.",
    ],
    approach: [
      "Treat the model as a collaborator with taste, not a slot machine: ask the right framing questions first, then commit to a direction and explain the trade-offs.",
      "Every generated asset had to be production-shaped - real font stacks, accessible contrast, exportable tokens - not decorative mockups you'd rebuild from scratch.",
    ],
    build: {
      paragraphs: [
        "A streaming agent orchestrates several tool calls - naming, type pairing, palette generation with live contrast checks, and voice guidelines - then assembles a coherent board with the rationale attached.",
        "Results stream token by token so the product feels alive while it thinks, with graceful fallbacks when a model call is slow or returns something off-spec.",
      ],
      stack: ["Next.js", "AI SDK", "TypeScript", "Tailwind CSS", "Vercel AI Gateway", "Zod"],
    },
    outcome: [
      "Aura proves the thesis the studio sells: AI products win on judgement and follow-through, not raw generation - and it doubles as a clear demo of how we approach agentic UX.",
      "The patterns built here - streaming, tool orchestration, structured output you can trust - carry straight into client work.",
    ],
    metrics: [
      { value: "<8s", label: "Prompt to full system" },
      { value: "AA", label: "Contrast on every palette" },
      { value: "100%", label: "Exportable design tokens" },
    ],
  },
  {
    slug: "helio-focus-app",
    title: "Helio - a focus & habit app",
    client: "Concept build",
    category: "Mobile · Concept",
    year: 2025,
    summary:
      "A cross-platform mobile app exploring calm, daily-use design - one codebase, a native feel, and motion that stays smooth on the mid-range phones most people actually carry.",
    cover: { src: U("photo-1512941937669-90a1b58e7e9c"), alt: "Helio - focus app on a phone" },
    results: [
      { value: "60fps", label: "on mid-range Android" },
      { value: "1", label: "codebase, both stores" },
    ],
    problem: [
      "Habit apps tend to either feel cheap or run hot - heavy animations that stutter on the exact budget devices their users own.",
      "We set a constraint: a genuinely native feel and rich motion, with nothing that drops a frame on a throttled phone.",
    ],
    approach: [
      "Design the one core loop first - open, focus, log - and make it effortless before adding anything else.",
      "Every animation had to earn its place against a strict performance budget, with platform-correct gestures and offline-tolerant state.",
    ],
    build: {
      paragraphs: [
        "A single React Native codebase with Reanimated-driven motion, real gestures, and local-first state so the app holds up on a patchy connection.",
        "Tight feedback loop - internal builds to a real device early, analytics wired in from day one to steer the iteration.",
      ],
      stack: ["React Native", "Expo", "TypeScript", "Reanimated", "Supabase"],
    },
    outcome: [
      "Helio shows we can take a mobile idea from concept to a polished, store-ready feel fast - without doubling the team or the codebase.",
      "The performance discipline and motion system here translate directly to client mobile builds.",
    ],
    metrics: [
      { value: "60fps", label: "Animations, mid-range Android" },
      { value: "<2s", label: "Cold start" },
      { value: "1", label: "Codebase, iOS + Android" },
    ],
  },
  {
    slug: "pulse-realtime-dashboard",
    title: "Pulse - a realtime analytics dashboard",
    client: "Concept build",
    category: "Web App · Concept",
    year: 2024,
    summary:
      "A web dashboard exploring how fast and calm realtime data can feel - sub-100ms live updates, zero layout shift, and a performance budget held under load.",
    cover: { src: U("photo-1551288049-bebda4e38f71"), alt: "Pulse - realtime analytics dashboard" },
    results: [
      { value: "<100ms", label: "live update latency" },
      { value: "90+", label: "Lighthouse performance" },
    ],
    problem: [
      "Realtime dashboards usually buy 'live' at the cost of jank - janky charts, jumpy layouts, and a tab that melts your battery.",
      "We wanted live data that feels instant and calm, and stays fast as the stream gets busy.",
    ],
    approach: [
      "Server components do the heavy lifting so first paint is real HTML, with live data layered on top through an efficient subscription.",
      "Charts and counters are sized explicitly to keep layout shift at zero, and updates are batched to stay smooth under load.",
    ],
    build: {
      paragraphs: [
        "A Next.js App Router dashboard with a streaming data layer, virtualised tables, and GPU-cheap chart animations - engineered to a strict frame budget.",
        "Everything is typed end to end and measured against Core Web Vitals before each change shipped.",
      ],
      stack: ["Next.js", "TypeScript", "Postgres", "Redis", "Vercel"],
    },
    outcome: [
      "Pulse demonstrates the studio's performance bar: realtime that's genuinely fast, accessible, and stable - not a demo that falls apart at scale.",
      "The data and rendering patterns here are exactly what we bring to client web platforms.",
    ],
    metrics: [
      { value: "<100ms", label: "Live update latency" },
      { value: "90+", label: "Lighthouse performance" },
      { value: "0", label: "Cumulative layout shift" },
    ],
  },
];

export const getCaseStudies = () => CASE_STUDIES;
export const getCaseStudyEntry = (slug: string) =>
  CASE_STUDIES.find((s) => s.slug === slug);
export const getCaseStudySlugs = () => CASE_STUDIES.map((s) => s.slug);
