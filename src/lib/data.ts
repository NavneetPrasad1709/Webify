/* Content from the licensed template, rebranded to Webify.
   Template's original typos ("Sverage", "FREQUENLTY", "Dsigning") fixed for production. */

import { services } from "@/lib/pages/service";

/* Project and blog card data lives in src/lib/pages/project.ts and blog.ts;
   the homepage sections read those canonical sources directly. */

export const impactsParagraph =
  "Webify is a product engineering and AI automation company. We design and build SaaS products, custom software, AI-powered systems, and the websites that sell them, with one focused team of designers and engineers.";

export const stats: {
  value: number;
  suffix: string;
  label: string;
  accent: boolean;
  decimals?: number;
}[] = [
  /* Suffixes stay one character. "-day" belonged to the label, not the
     numeral: at 88px it wrapped onto a second line, which pushed that one
     label out of line with the other three and left a hole under the rest. */
  { value: 24, suffix: "h", label: "Reply time on every inquiry", accent: false },
  { value: 2, suffix: "", label: "Revision rounds per deliverable", accent: true },
  { value: 30, suffix: "", label: "Days of post-launch support", accent: false },
  { value: 100, suffix: "%", label: "Senior-led, zero handoffs", accent: true },
];

/* Founding-client offers: honest commitments the studio controls.
   No fabricated testimonials - Webify is newly launched with zero clients. */
export const foundingOffers: {
  tag: string;
  title: string;
  body: string;
  tone: "light" | "blue" | "dark" | "lime";
}[] = [
  {
    tag: "DIRECT ACCESS",
    title: "You work with the people who build",
    body: "No account managers, no relay layer. The developers and designers building your product are in the room on every call, from kickoff to launch.",
    tone: "light",
  },
  {
    tag: "FOUNDING PRICING",
    title: "Founding-client rates, locked for 12 months",
    body: "Early clients keep our launch pricing for a full year. As the company grows and rates rise, yours stay exactly where they started.",
    tone: "blue",
  },
  {
    tag: "30-DAY SUPPORT",
    title: "We stay after launch",
    body: "Every project includes a 30-day post-launch window for fixes and refinements, so what ships keeps working after go-live.",
    tone: "lime",
  },
  {
    tag: "FULL OWNERSHIP",
    title: "You own everything we build",
    body: "Code, design files, and accounts are handed over completely at the end of the engagement. No lock-in, no hostage assets, ever.",
    tone: "dark",
  },
];

export type PricingPlan = {
  name: string;
  blurb: string;
  timeline: string;
  features: string[];
  featured?: boolean;
};

/* Fixed-price project engagements, scoped in writing per client. Public dollar
   floors are deliberately withheld until the first 10 founding projects ship;
   every quote is fixed and written before work starts. */
export const pricingPlans: PricingPlan[] = [
  {
    name: "Launch",
    blurb: "For a focused site or landing page, designed and built to convert.",
    timeline: "Ships in 2 to 3 weeks",
    features: [
      "Strategy and copy session",
      "Bespoke design, no templates",
      "CMS you can edit yourself",
      "30-day post-launch support",
    ],
  },
  {
    name: "Website",
    blurb: "For a full multi-page site with a CMS your team can run.",
    timeline: "Ships in 4 to 8 weeks",
    featured: true,
    features: [
      "Everything in Launch",
      "Multi-page site with integrations",
      "SEO and performance pass",
      "Weekly working session",
    ],
  },
  {
    name: "Product",
    blurb: "For a SaaS product, web app, AI feature, or custom business system.",
    timeline: "Scoped per build",
    features: [
      "Everything in Website",
      "Dedicated design and engineering team",
      "Roadmap planned together",
      "Focused cycles, no long lock-in",
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What does Webify build?",
    a: "SaaS products and MVPs, custom business software, AI automation and chatbots, CRMs, mobile apps, and the websites that sell them. One team designs and engineers each project end to end.",
  },
  {
    q: "How long does a typical project take?",
    a: "A landing page ships in 2 to 3 weeks, a full website in 4 to 8 weeks, and a SaaS MVP or custom system in 6 to 14 weeks. The schedule is agreed in writing before work starts.",
  },
  {
    q: "How does pricing work?",
    a: "Every project is a fixed quote, in USD or INR, agreed in writing before work starts. No hourly billing. Send a short brief and you get a written quote within 3 working days.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We work remotely with clients worldwide, with calls in hours that overlap US, UK, and Middle East working days.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes 30 days of support for fixes and refinements. After that, an optional care retainer covers updates and new work.",
  },
];

/** Compact footer labels where the full service title is too long for the column. */
const footerServiceLabels: Record<string, string> = {
  seo: "SEO",
  "app-development": "App Development",
};

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/service" },
      { label: "Projects", href: "/project" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: services.map((s) => ({
      label: footerServiceLabels[s.slug] ?? s.title,
      href: `/service/${s.slug}`,
    })),
  },
];

export interface ApproachCard {
  title: string;
  body: string;
  highlights: string[];
  visual: "browser" | "phones" | "dashboard" | "editor" | "cms" | "dial";
  wide: boolean;
}

/* Four real steps, in order. Rows alternate wide/narrow (3+2, 2+3) on desktop. */
export const approachCards: ApproachCard[] = [
  {
    title: "1. Scope In Writing",
    body: "A short call, then a written scope with a fixed price and a timeline. Nothing starts until you approve it.",
    highlights: ["fixed price"],
    visual: "browser",
    wide: true,
  },
  {
    title: "2. Design You Approve",
    body: "Screens designed in Figma around the one action your users need to take, with two revision rounds.",
    highlights: ["two revision rounds"],
    visual: "editor",
    wide: false,
  },
  {
    title: "3. Build On A Live URL",
    body: "A staging link from week one that updates as we build, so progress is something you check, not ask for.",
    highlights: ["staging link from week one"],
    visual: "dashboard",
    wide: false,
  },
  {
    title: "4. Launch And Hand Over",
    body: "Launch, a CMS your team can edit, full handover of code and accounts, and 30 days of support after go-live.",
    highlights: ["full handover", "30 days of support"],
    visual: "cms",
    wide: true,
  },
];
