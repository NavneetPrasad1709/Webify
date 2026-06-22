/**
 * Single source of truth for portfolio case studies.
 *
 * Consumed by:
 *  - /work            (W1–W3 index grid)
 *  - /work/[slug]     (W4 case-study template: problem → approach → build →
 *                      outcome → metrics → next project)
 *  - /work/[slug]/opengraph-image (per-study share card)
 *
 * CONTENT RULE (per BRIEF.md): the narrative is real, reusable positioning copy
 * — but every client-specific fact a senior studio can't invent (real names,
 * metric figures, quotes, production screenshots) is wrapped in a [REPLACE: …]
 * slot. Swap those for the actual project assets; the layout is final.
 *
 * Images reuse the locked reference assets already whitelisted in next.config.ts
 * (images.higgs.ai). Replace each with the real production capture when supplied.
 */

export type Discipline = "AI Product" | "Web App" | "Mobile App";

export interface CaseStudyImage {
  src: string;
  /** Real, descriptive alt text — required for a11y + SEO. */
  alt: string;
}

export interface Metric {
  /** Headline figure. Bracketed where it needs a real number. */
  value: string;
  /** What the figure measures. */
  label: string;
}

export interface CaseStudy {
  slug: string;
  /** Project name (display). */
  name: string;
  /** Client / org behind the project. */
  client: string;
  discipline: Discipline;
  /** Engagement type — surfaced as a chip. */
  kind: "Client" | "Personal";
  year: string;
  /** One-line positioning headline for the study hero. */
  tagline: string;
  /** 1–2 sentence summary — also used for the index card + meta description. */
  summary: string;
  /** Hero / cover image. */
  cover: CaseStudyImage;
  /** Optional live deployment. */
  liveUrl?: string;
  /** W4 — Problem. */
  problem: string[];
  /** W4 — Approach. */
  approach: string[];
  /** W4 — Build. */
  build: {
    paragraphs: string[];
    stack: string[];
  };
  /** W4 — Outcome. */
  outcome: string[];
  /** W4 — Metrics (3–4 headline figures). */
  metrics: Metric[];
  /** Supporting visuals. */
  gallery: CaseStudyImage[];
  /** Optional client quote tied to a specific outcome (BRIEF: not vague praise). */
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

const IMG = "https://images.higgs.ai/?default=1&output=webp&q=85";
const CF = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P";
/** Build a higgs-resized URL for a reference asset (matches the home deck). */
const ref = (file: string, w = 1280) =>
  `${IMG}&w=${w}&url=${encodeURIComponent(`${CF}/${file}`)}`;

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "nextlevel-studio",
    name: "Nextlevel Studio",
    client: "[REPLACE: real client name]",
    discipline: "Web App",
    kind: "Client",
    year: "2025",
    tagline: "A marketing site that loads like a native app and sells like a senior closer.",
    summary:
      "A conversion-focused web platform rebuilt for speed and story — replacing a slow, template-heavy agency build with a fast, motion-led experience.",
    cover: {
      src: ref("hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png"),
      alt: "[REPLACE: Nextlevel Studio homepage hero — production screenshot]",
    },
    liveUrl: undefined, // [REPLACE: live URL]
    problem: [
      "The previous site was built by a large agency on a heavy template. It looked dated, scored in the 40s on mobile Lighthouse, and took over six seconds to become interactive on a mid-range phone — the exact device most of their buyers use.",
      "Worse, the story was buried. Eight generic service blocks competed for attention, and the one thing that actually won deals — the team's craft — never came through. Visitors bounced before they understood what made the studio different.",
    ],
    approach: [
      "We started with the decision, not the design: what does a buyer need to believe to book a call, and in what order? That became a single, paced narrative — one idea per scroll beat — instead of a wall of services.",
      "Mobile-first from the first wireframe. Every motion idea had to earn its place against a strict performance budget. If an effect couldn't hold LCP under 2.5s on a throttled phone, it didn't ship.",
    ],
    build: {
      paragraphs: [
        "Rebuilt on the App Router with server components doing the heavy lifting, so the first paint is real HTML, not a loading spinner. Imagery runs through the framework optimizer with explicit sizes to keep layout shift near zero.",
        "Motion is GPU-cheap and reduced-motion aware — smooth scroll, scroll-linked reveals, and a kinetic menu that feels expensive without blocking the main thread. The whole thing is one codebase you actually own.",
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Vercel"],
    },
    outcome: [
      "The rebuild turned a liability into the studio's best salesperson. Mobile performance moved from a blocker to a brag, and the narrative now does the qualifying work before a human ever joins the call.",
      "Because they own the codebase end to end, small content and campaign changes ship the same day — no agency ticket queue.",
    ],
    metrics: [
      { value: "90+", label: "Mobile Lighthouse performance" },
      { value: "−X%", label: "Time to interactive" },
      { value: "+X%", label: "Demo requests, first 90 days" },
    ],
    gallery: [
      {
        src: ref("hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png"),
        alt: "[REPLACE: Nextlevel Studio — services section screenshot]",
      },
      {
        src: ref("hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png"),
        alt: "[REPLACE: Nextlevel Studio — case study detail screenshot]",
      },
    ],
    testimonial: {
      quote: "[REPLACE: a specific-outcome quote — e.g. “Our mobile bounce rate dropped by a third in the first month.”]",
      author: "[REPLACE: client name]",
      role: "[REPLACE: title, company]",
    },
  },
  {
    slug: "aura",
    name: "Aura",
    client: "Personal project",
    discipline: "AI Product",
    kind: "Personal",
    year: "2025",
    tagline: "An AI brand-identity copilot that turns a one-line prompt into a usable system.",
    summary:
      "A self-initiated AI product that generates coherent brand systems — names, type pairings, palettes, and voice — and explains the reasoning behind each choice.",
    cover: {
      src: ref("hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png"),
      alt: "[REPLACE: Aura — generated brand-system board screenshot]",
    },
    problem: [
      "Most AI design tools produce a pretty picture and stop there. They don't reason about why a typeface fits a positioning, or hand you anything you can actually build with. The output looks like a demo, not a deliverable.",
      "The gap is judgment. A junior tool generates options; a senior designer makes a decision and defends it. We wanted to see how close a product could get to the second one.",
    ],
    approach: [
      "Treat the model as a collaborator with taste, not a slot machine. The system asks the right framing questions first, then commits to a direction and explains the trade-offs — the way a senior designer walks a client through a rationale.",
      "Every generated asset had to be production-shaped: real font stacks, accessible color contrast, exportable tokens — not decorative mockups you'd have to rebuild from scratch.",
    ],
    build: {
      paragraphs: [
        "A streaming agent orchestrates several tool calls — naming, type pairing, palette generation with contrast checks, and voice guidelines — then assembles them into one coherent board with the reasoning attached.",
        "The interface streams results token by token so the product feels alive while it thinks, with graceful fallbacks when a model call is slow or returns something off-spec.",
      ],
      stack: ["Next.js", "AI SDK", "TypeScript", "Tailwind CSS", "Vercel AI Gateway", "Zod"],
    },
    outcome: [
      "Aura proves the thesis the studio sells: AI products win on judgment and follow-through, not on raw generation. It doubles as the clearest demo of how we think about agentic UX.",
      "The patterns built here — streaming, tool orchestration, structured output you can trust — carry straight into client work.",
    ],
    metrics: [
      { value: "<Xs", label: "Prompt to full system" },
      { value: "AA", label: "Contrast on every palette" },
      { value: "X+", label: "Exportable design tokens" },
    ],
    gallery: [
      {
        src: ref("hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png"),
        alt: "[REPLACE: Aura — type pairing view screenshot]",
      },
      {
        src: ref("hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png"),
        alt: "[REPLACE: Aura — palette + reasoning panel screenshot]",
      },
    ],
  },
  {
    slug: "solaris-digital",
    name: "Solaris Digital",
    client: "[REPLACE: real client name]",
    discipline: "Mobile App",
    kind: "Client",
    year: "2024",
    tagline: "From idea to a shipped, daily-use mobile app in a single focused sprint.",
    summary:
      "A cross-platform mobile app taken from concept to the stores fast — one codebase, a native feel, and a senior building it end to end.",
    cover: {
      src: ref("hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png"),
      alt: "[REPLACE: Solaris Digital — app home screen capture]",
    },
    problem: [
      "The client had a validated idea and a closing window — a partnership that needed a working app in users' hands within weeks, not the multi-month timeline a traditional agency quoted.",
      "Two separate native builds were off the table on that budget. They needed one codebase that still felt native, and a single person accountable for shipping it.",
    ],
    approach: [
      "Scope hard to the one loop that mattered, ship that loop to real devices early, and iterate against actual usage instead of a spec document. Everything outside the core flow was deferred, on purpose.",
      "Senior-led and direct: the person designing the flows was the person building them, so decisions happened in hours, not in a relay of handoffs and review meetings.",
    ],
    build: {
      paragraphs: [
        "A single cross-platform codebase delivering a genuinely native feel — real gestures, platform-correct navigation, and offline-tolerant state so the app holds up on a patchy connection.",
        "Tight release cadence: internal builds to the client's phone within days, store-ready not long after, with analytics wired in from day one to steer the iteration.",
      ],
      stack: ["React Native", "Expo", "TypeScript", "Reanimated", "Supabase"],
    },
    outcome: [
      "The app shipped inside the window and the partnership held. Users got something they open daily, and the client got a product they can extend without agency overhead.",
      "A lean, owned codebase meant the next feature was a sprint away — not a new statement of work.",
    ],
    metrics: [
      { value: "X wks", label: "Concept to store" },
      { value: "1", label: "Codebase, both platforms" },
      { value: "X★", label: "Average store rating" },
    ],
    gallery: [
      {
        src: ref("hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png"),
        alt: "[REPLACE: Solaris Digital — onboarding flow capture]",
      },
      {
        src: ref("hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png"),
        alt: "[REPLACE: Solaris Digital — core feature screen capture]",
      },
    ],
    testimonial: {
      quote: "[REPLACE: a specific-outcome quote tied to speed or ownership]",
      author: "[REPLACE: client name]",
      role: "[REPLACE: title, company]",
    },
  },
] as const;

/** All case studies (index order). */
export function getCaseStudies(): readonly CaseStudy[] {
  return CASE_STUDIES;
}

/** Lookup by slug. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Every slug — for generateStaticParams. */
export function getCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((c) => c.slug);
}

/** The next study in the list (wraps around) — powers "Next project". */
export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (i === -1) return undefined;
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
}
