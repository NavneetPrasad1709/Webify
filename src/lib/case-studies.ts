import type { CaseStudyImage, Metric } from "@/lib/work";

/**
 * Case studies shown at /case-studies (list) and /case-studies/[slug] (detail).
 * [REPLACE: real studies, copy, covers, and figures]. Five placeholders for now.
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
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const CASE_STUDIES: CaseStudyEntry[] = [
  {
    slug: "fintech-onboarding",
    title: "Fintech onboarding, rebuilt in 6 weeks",
    client: "Series-A Fintech",
    category: "AI Product · Web",
    year: 2025,
    summary:
      "Reworked a 14-step KYC flow into a 3-step, AI-assisted onboarding — cutting drop-off and automating manual review.",
    cover: { src: U("photo-1551288049-bebda4e38f71"), alt: "Analytics dashboard" },
    results: [
      { value: "3.2×", label: "conversion" },
      { value: "6 wks", label: "to launch" },
    ],
    problem: [
      "Onboarding was a 14-step gauntlet. Most applicants dropped off before finishing, and the ones who did finish waited days for a human to review their documents.",
      "Every percentage point of drop-off was lost revenue — and the manual review queue didn't scale.",
    ],
    approach: [
      "We mapped the funnel, found the three steps that actually mattered for compliance, and designed an AI-assisted flow that did the rest in the background.",
      "Document checks, data extraction, and risk scoring moved server-side so the applicant just answered three questions.",
    ],
    build: {
      paragraphs: [
        "A Next.js onboarding flow backed by an LLM pipeline for document understanding and a rules engine for risk — shipped behind a feature flag and rolled out gradually.",
      ],
      stack: ["Next.js", "TypeScript", "Python", "OpenAI", "Postgres", "AWS"],
    },
    outcome: [
      "Conversion more than tripled and manual reviews dropped to the genuine edge cases. The team shipped the whole thing in six weeks.",
    ],
    metrics: [
      { value: "3.2×", label: "Onboarding conversion" },
      { value: "−80%", label: "Manual reviews" },
      { value: "6 wks", label: "Idea to production" },
    ],
  },
  {
    slug: "ai-support-agent",
    title: "AI support agent that deflects 60% of tickets",
    client: "B2B SaaS",
    category: "AI Product",
    year: 2025,
    summary:
      "A retrieval-augmented support agent wired into their help desk — answering accurately and escalating only when it should.",
    cover: { src: U("photo-1531746790731-6c087fecd65a"), alt: "Support workspace" },
    results: [
      { value: "60%", label: "ticket deflection" },
      { value: "4 wks", label: "sprint" },
    ],
    problem: [
      "Support volume was growing faster than the team. Most tickets were repeats the docs already answered — but customers wanted an answer, not a search box.",
    ],
    approach: [
      "We grounded an agent in their docs, past tickets, and product data, with strict guardrails: cite sources, admit uncertainty, and hand off cleanly to a human.",
    ],
    build: {
      paragraphs: [
        "A RAG pipeline over a vector store, wired into the help desk via webhooks, with an eval harness so we could measure accuracy before every release.",
      ],
      stack: ["TypeScript", "Anthropic", "LangChain", "Pinecone", "Node"],
    },
    outcome: [
      "Six in ten tickets now resolve without a human, response times dropped, and the team focuses on the conversations that need them.",
    ],
    metrics: [
      { value: "60%", label: "Tickets deflected" },
      { value: "<5s", label: "Median response" },
      { value: "4 wks", label: "To launch" },
    ],
  },
  {
    slug: "marketplace-mobile-app",
    title: "Marketplace mobile app, zero to launch",
    client: "Consumer Marketplace",
    category: "Mobile",
    year: 2024,
    summary:
      "A cross-platform React Native app — listings, payments, and chat — designed, built, and shipped to both stores.",
    cover: { src: U("photo-1512941937669-90a1b58e7e9c"), alt: "Mobile app on a phone" },
    results: [
      { value: "50k+", label: "downloads" },
      { value: "10 wks", label: "to stores" },
    ],
    problem: [
      "A founder with traction on web needed a real mobile presence — fast — without doubling the team or the codebase.",
    ],
    approach: [
      "One React Native codebase, native where it counted (payments, push, deep links), and a design system that kept iOS and Android consistent.",
    ],
    build: {
      paragraphs: [
        "Listings, in-app payments, and real-time chat, with over-the-air updates so we could ship fixes without waiting on store review.",
      ],
      stack: ["React Native", "Expo", "TypeScript", "Stripe", "Node"],
    },
    outcome: [
      "Live on both stores in ten weeks, past 50k downloads, with a single team maintaining one codebase.",
    ],
    metrics: [
      { value: "50k+", label: "Downloads" },
      { value: "4.8★", label: "Store rating" },
      { value: "10 wks", label: "To both stores" },
    ],
  },
  {
    slug: "internal-ops-tool",
    title: "Internal ops tool that saved 20 hrs/week",
    client: "Logistics Scale-up",
    category: "AI Automation",
    year: 2024,
    summary:
      "Replaced a spreadsheet-and-email workflow with an automated dashboard — routing, alerts, and one-click reporting.",
    cover: { src: U("photo-1460925895917-afdab827c52f"), alt: "Operations dashboard" },
    results: [
      { value: "20 hrs", label: "saved / week" },
      { value: "0 → 1", label: "ops platform" },
    ],
    problem: [
      "Operations ran on a tangle of spreadsheets and email threads. Nothing was real-time, mistakes were costly, and reporting took a full day each week.",
    ],
    approach: [
      "We modelled the actual workflow, automated the repetitive routing and alerts, and gave the team one dashboard that was always up to date.",
    ],
    build: {
      paragraphs: [
        "An internal platform with role-based access, automated routing rules, and scheduled reports — integrated with the tools they already used.",
      ],
      stack: ["Next.js", "TypeScript", "Postgres", "Redis", "Vercel"],
    },
    outcome: [
      "Twenty hours a week back in the team's pocket, fewer errors, and reporting that's now one click instead of one day.",
    ],
    metrics: [
      { value: "20 hrs", label: "Saved per week" },
      { value: "−90%", label: "Reporting time" },
      { value: "1", label: "Source of truth" },
    ],
  },
  {
    slug: "design-system-rebuild",
    title: "Design system + web platform rebuild",
    client: "Enterprise SaaS",
    category: "Design & UX · Web",
    year: 2025,
    summary:
      "A typed component library and rebuilt marketing + app shell — doubling delivery speed and unifying the brand.",
    cover: { src: U("photo-1467232004584-a241de8bcf5d"), alt: "Design system components" },
    results: [
      { value: "2×", label: "dev velocity" },
      { value: "1", label: "design system" },
    ],
    problem: [
      "Every team shipped a slightly different button. The brand felt inconsistent, and engineers rebuilt the same UI over and over.",
    ],
    approach: [
      "We built one typed, documented component library and rebuilt the marketing site and app shell on top of it — a single source of truth for design and code.",
    ],
    build: {
      paragraphs: [
        "A Tailwind + React design system with tokens, accessibility baked in, and a docs site — adopted across the marketing site and the product.",
      ],
      stack: ["React", "TypeScript", "Tailwind", "Storybook", "Next.js"],
    },
    outcome: [
      "Delivery roughly doubled, the brand finally looks like one company, and new features start from a shared kit instead of scratch.",
    ],
    metrics: [
      { value: "2×", label: "Delivery speed" },
      { value: "1", label: "Design system" },
      { value: "100%", label: "Brand consistency" },
    ],
  },
];

export const getCaseStudies = () => CASE_STUDIES;
export const getCaseStudyEntry = (slug: string) =>
  CASE_STUDIES.find((s) => s.slug === slug);
export const getCaseStudySlugs = () => CASE_STUDIES.map((s) => s.slug);
