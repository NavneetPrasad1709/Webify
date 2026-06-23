/**
 * SEO landing pages for the studio's core services (global intent).
 *
 * Each entry powers /services/[service] - a 600+ word, keyword-targeted page
 * with Service + FAQPage + BreadcrumbList structured data. Add a service by
 * appending to SERVICE_PAGES; the route and sitemap pick it up automatically.
 */

export interface ServicePage {
  slug: string;
  /** <title> */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  /** H1 split so a key word can carry the script accent. */
  h1Lead: string;
  h1Accent: string;
  /** Hero subhead. */
  intro: string;
  /** Body sections (each renders an H2 + paragraphs). */
  sections: { heading: string; paragraphs: string[] }[];
  /** "What's included" grid. */
  includes: { title: string; body: string }[];
  /** Delivery process. */
  process: { n: string; title: string; body: string }[];
  stack: string[];
  faq: { q: string; a: string }[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "ai-development",
    metaTitle: "AI Development Agency - LLM, Agents & RAG, Shipped to Production",
    metaDescription:
      "Senior-led AI development agency. We design and ship LLM apps, agents, copilots, and RAG systems that run in production - for founders and teams worldwide.",
    keywords: [
      "AI development agency",
      "hire AI developers",
      "LLM app development",
      "AI agent development",
      "RAG development",
      "AI product development company",
    ],
    eyebrow: "AI Development",
    h1Lead: "AI development that ships to",
    h1Accent: "production.",
    intro:
      "Agents, copilots, RAG systems, and ML features - designed, built, and shipped end to end by senior engineers you talk to directly. We're judged on what runs in production, not on a demo.",
    sections: [
      {
        heading: "AI that does real work - not a demo",
        paragraphs: [
          "Most teams can spin up a flashy AI demo in an afternoon. Turning that into a product people trust in production is a different problem entirely - and it's the one we solve. We build AI features that handle real data, real edge cases, and real users, with the guardrails and evaluations that keep them reliable as they scale.",
          "Whether you need a customer-facing copilot, an internal automation that buys back your team's time, or a retrieval-augmented system grounded in your own data, we start from the outcome you need and work backward to the simplest architecture that gets you there. No model worship, no over-engineering - just the right tool, wired in cleanly.",
        ],
      },
      {
        heading: "Why teams choose us for AI",
        paragraphs: [
          "You work directly with the senior engineers who design and build your system - there are no account managers and no junior hand-offs. The person who scopes the work is the person who writes the code, so decisions happen in hours, not in a relay of review meetings.",
          "Every system we ship is evaluated before it goes live. We build eval harnesses so we can measure accuracy, catch regressions, and prove the AI is doing what it should before it touches a real user. And you own everything: the code, the prompts, the data, and the accounts, from day one.",
        ],
      },
    ],
    includes: [
      { title: "LLM apps & copilots", body: "Customer-facing assistants and copilots that ship to real users and survive real data." },
      { title: "AI agents", body: "Multi-step, tool-using agents that automate real workflows with guardrails and graceful fallbacks." },
      { title: "RAG & search", body: "Retrieval-augmented systems grounded in your docs, tickets, and product data - with citations." },
      { title: "Evals & reliability", body: "Eval harnesses, monitoring, and prompt versioning so quality is measured, not hoped for." },
      { title: "Automation", body: "Internal AI tools that remove the repetitive work and pay for themselves quickly." },
      { title: "Integrations", body: "Wired into your stack - webhooks, queues, vector stores, and the providers you already use." },
    ],
    process: [
      { n: "01", title: "Scope", body: "We pressure-test the use case and lock the one outcome that matters before any code." },
      { n: "02", title: "Prototype", body: "A working slice in front of real data fast, so we validate the approach early." },
      { n: "03", title: "Harden", body: "Evals, guardrails, observability, and fallbacks - production-grade, not demo-grade." },
      { n: "04", title: "Ship & iterate", body: "We launch, measure real usage, and improve what moves the numbers." },
    ],
    stack: ["OpenAI", "Anthropic", "AI SDK", "LangChain", "Vector DBs", "Python", "TypeScript", "Vercel"],
    faq: [
      {
        q: "Can you take our AI prototype to production?",
        a: "Yes - that's our core work. We turn promising prototypes into reliable, evaluated, monitored systems that hold up with real users and real data.",
      },
      {
        q: "Which AI models do you work with?",
        a: "We're model-agnostic. We pick the provider and model that fit your accuracy, latency, privacy, and cost needs - OpenAI, Anthropic, open models, or a mix.",
      },
      {
        q: "How do you make sure the AI is accurate?",
        a: "We build evaluation harnesses that score the system against real examples, run them before every release, and monitor in production so quality is measured, not guessed.",
      },
      {
        q: "Do we own the code and the prompts?",
        a: "Completely. Your code, prompts, data, and accounts are yours from day one - no lock-in.",
      },
    ],
  },
  {
    slug: "web-development",
    metaTitle: "Web Development Agency - Fast Next.js Sites & Web Apps That Convert",
    metaDescription:
      "Senior-led web development agency. We design and build fast Next.js websites, web apps, and SaaS platforms - engineered to perform and convert. Worldwide.",
    keywords: [
      "web development agency",
      "Next.js development company",
      "web app development",
      "hire web developers",
      "SaaS development",
      "react development agency",
    ],
    eyebrow: "Web Development",
    h1Lead: "Web development built to",
    h1Accent: "perform & convert.",
    intro:
      "Fast, accessible Next.js websites, web apps, and SaaS platforms - designed and engineered end to end by senior people who care about load time, conversion, and code you own.",
    sections: [
      {
        heading: "Sites that load fast and sell harder",
        paragraphs: [
          "A slow, generic website quietly costs you customers every day. We build the opposite: sites that paint real content instantly, hold green Core Web Vitals on a mid-range phone, and guide a visitor toward one clear action. Speed isn't a vanity metric - it's conversion, SEO ranking, and trust, all at once.",
          "Every build runs on a modern, owned codebase - no page-builder lock-in, no theme bloat, no agency ticket queue to change a headline. You get a fast, accessible, maintainable site that your team can extend, and that search engines and buyers both reward.",
        ],
      },
      {
        heading: "From marketing sites to full SaaS",
        paragraphs: [
          "We cover the full range: conversion-focused marketing sites, content-heavy platforms, internal dashboards, and multi-tenant SaaS products with auth, billing, and real-time data. The same senior team designs the experience and writes the production code, so the thing that ships matches the thing that was designed.",
          "Performance, accessibility (WCAG), and SEO are built in from the first wireframe - not bolted on at the end. The result is a web product that's fast, ranks, converts, and is genuinely yours to own and grow.",
        ],
      },
    ],
    includes: [
      { title: "Marketing sites", body: "Conversion-focused sites that load like a native app and sell like a senior closer." },
      { title: "Web apps", body: "Dashboards, portals, and tools with real-time data and a product-grade feel." },
      { title: "SaaS platforms", body: "Multi-tenant SaaS with auth, billing, roles, and an architecture built to scale calmly." },
      { title: "Performance", body: "Green Core Web Vitals, fast LCP, near-zero layout shift - on the devices your buyers use." },
      { title: "Accessibility & SEO", body: "WCAG-aware, semantic, and search-friendly from the first line of markup." },
      { title: "CMS & content", body: "Edit your own content without a developer, on a clean, headless setup." },
    ],
    process: [
      { n: "01", title: "Strategy", body: "We map the one outcome the site must drive, then design the path to it." },
      { n: "02", title: "Design", body: "Flows, UI, and a clickable prototype - aligned before a line of production code." },
      { n: "03", title: "Build", body: "Server-first Next.js, performance-budgeted, tested, and accessible." },
      { n: "04", title: "Launch & grow", body: "We ship, measure, and iterate - and you own the codebase outright." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node", "Postgres", "Vercel"],
    faq: [
      {
        q: "Do you build marketing sites or web apps?",
        a: "Both. From a fast conversion-focused marketing site to a full multi-tenant SaaS product - designed and built by the same senior team.",
      },
      {
        q: "Will my site be fast and good for SEO?",
        a: "Yes. We build server-first on Next.js with a strict performance budget, so the site paints real content fast, holds green Core Web Vitals, and is structured for search.",
      },
      {
        q: "Can my team edit content without a developer?",
        a: "Yes - we wire in a headless CMS so your team can update content, while the front end stays fast and owned by you.",
      },
      {
        q: "Do we own the code?",
        a: "Completely. Your repositories, your accounts, your data - no proprietary lock-in, ever.",
      },
    ],
  },
  {
    slug: "seo",
    metaTitle: "SEO Services - Technical & Content SEO That Ranks You for Buyers",
    metaDescription:
      "Senior-led SEO services for startups and product teams worldwide. Technical SEO, content, and Core Web Vitals that rank you for the terms your buyers actually search.",
    keywords: [
      "SEO services",
      "SEO agency",
      "technical SEO",
      "SEO for startups",
      "SEO consultant",
      "Core Web Vitals optimization",
    ],
    eyebrow: "SEO",
    h1Lead: "SEO that ranks you for what buyers",
    h1Accent: "actually search.",
    intro:
      "Technical SEO, content, and performance - tied to revenue, not vanity rankings. We get you found for the high-intent terms your customers type when they're ready to buy.",
    sections: [
      {
        heading: "Rankings that bring buyers, not just traffic",
        paragraphs: [
          "Plenty of agencies can grow a traffic chart. We care about the traffic that turns into customers. We start by finding the high-intent keywords your buyers actually search - the ones with purchase intent - and build the technical foundation, content, and internal linking to rank for them.",
          "SEO is three things working together: a site search engines can crawl and trust, content that answers real questions better than anyone else, and a fast, healthy technical base. We handle all three, and we tie every recommendation back to leads and revenue - not to a rankings screenshot.",
        ],
      },
      {
        heading: "Technical, content, and performance - in one team",
        paragraphs: [
          "Because we also build websites, our SEO isn't a list of tickets handed to a developer who may never action them - we implement the fixes ourselves. Core Web Vitals, crawlability, structured data, internal linking, and information architecture all get handled by the same team that ranks you.",
          "On the content side, we map the topics and intent your buyers move through, then build pages that genuinely deserve to rank. The outcome is durable, compounding organic traffic that brings qualified leads month after month - an asset you own, not ad spend you rent.",
        ],
      },
    ],
    includes: [
      { title: "SEO audit", body: "A full technical, content, and competitive audit with a prioritized, revenue-ranked plan." },
      { title: "Keyword & intent", body: "We target the high-intent terms buyers search when they're ready - not vanity volume." },
      { title: "Technical SEO", body: "Crawlability, indexing, structured data, sitemaps, and a clean information architecture." },
      { title: "Core Web Vitals", body: "Speed and stability fixes that lift both rankings and conversion at the same time." },
      { title: "Content & on-page", body: "Pages mapped to intent that deserve to rank - titles, headings, and copy that convert." },
      { title: "Internal linking", body: "An internal link structure that spreads authority to the pages that drive revenue." },
    ],
    process: [
      { n: "01", title: "Audit", body: "We find what's blocking rankings and where the high-intent opportunity is." },
      { n: "02", title: "Foundation", body: "Technical fixes, Core Web Vitals, schema, and architecture - the base everything builds on." },
      { n: "03", title: "Content", body: "Intent-mapped pages and on-page work that earn the rankings." },
      { n: "04", title: "Measure", body: "We track rankings, traffic, and - most importantly - leads, and iterate." },
    ],
    stack: ["Technical SEO", "Core Web Vitals", "Schema / JSON-LD", "Content strategy", "GSC", "Analytics"],
    faq: [
      {
        q: "How long until SEO works?",
        a: "Technical and on-page fixes can move rankings within weeks; durable content-driven growth typically compounds over 3-6 months. We focus on high-intent terms first so leads come sooner.",
      },
      {
        q: "Do you do the technical fixes or just recommend them?",
        a: "We implement them. Because we also build sites, the same team that audits your SEO ships the fixes - nothing gets stuck in a backlog.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "No honest SEO can guarantee a specific position - but we can guarantee a sound technical base, intent-driven content, and reporting tied to leads, not vanity metrics.",
      },
      {
        q: "Is this only for big sites?",
        a: "No - we work especially well with startups and product teams who need to rank for buyer-intent terms without burning budget on ads.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    metaTitle: "Mobile App Development Company - iOS & Android, One Codebase",
    metaDescription:
      "Senior-led mobile app development company. We design and ship cross-platform iOS & Android apps with React Native - one codebase, a native feel. Worldwide.",
    keywords: [
      "mobile app development company",
      "React Native development",
      "iOS app development",
      "android app development",
      "hire mobile app developers",
      "cross-platform app development",
    ],
    eyebrow: "Mobile App Development",
    h1Lead: "Mobile apps people open",
    h1Accent: "every day.",
    intro:
      "Cross-platform iOS & Android apps with React Native - one codebase, a genuinely native feel, and a senior team that ships fast. Designed and built end to end.",
    sections: [
      {
        heading: "One codebase, a native feel, half the cost",
        paragraphs: [
          "Two separate native builds are slow and expensive. We build cross-platform apps with React Native that feel genuinely native - real gestures, platform-correct navigation, smooth 60fps motion - from a single codebase your team can actually maintain. You ship to both the App Store and Google Play without doubling the work.",
          "The result is the experience of a native app with the speed and economics of one codebase: faster to launch, cheaper to maintain, and easier to grow. We sweat the details that make an app feel premium - the animations, the offline behaviour, the polish - because those are what make people open it daily.",
        ],
      },
      {
        heading: "From idea to the stores, fast",
        paragraphs: [
          "We scope hard to the one core loop that matters, get it onto real devices early, and iterate against actual usage instead of a spec document. Analytics are wired in from day one, and over-the-air updates let us ship fixes without waiting on store review.",
          "Payments, push notifications, deep links, real-time chat, offline-tolerant state - we wire in the native capabilities that count, cleanly. And the person designing the flows is the person building them, so your app ships in a focused sprint, not a multi-quarter relay.",
        ],
      },
    ],
    includes: [
      { title: "Cross-platform apps", body: "iOS & Android from one React Native codebase, with a genuinely native feel." },
      { title: "Native capabilities", body: "Payments, push, deep links, camera, and more - wired in cleanly where they count." },
      { title: "Offline-ready", body: "Local-first state so the app holds up on a patchy connection." },
      { title: "Smooth motion", body: "60fps animations and gestures that make the app feel premium on mid-range phones." },
      { title: "Store launch", body: "We take it through App Store and Google Play submission and review." },
      { title: "OTA updates", body: "Ship fixes and features over the air without waiting on store review." },
    ],
    process: [
      { n: "01", title: "Scope", body: "We lock the one core loop that matters and defer everything else, on purpose." },
      { n: "02", title: "Design", body: "Flows and a clickable prototype on real devices before production code." },
      { n: "03", title: "Build", body: "Native-feel React Native with analytics wired in from day one." },
      { n: "04", title: "Launch", body: "Store submission, review, and a calm release - then we iterate on real usage." },
    ],
    stack: ["React Native", "Expo", "TypeScript", "Reanimated", "Supabase", "Stripe"],
    faq: [
      {
        q: "Native or cross-platform - which is better?",
        a: "For most products, cross-platform with React Native gives a native feel at roughly half the cost and time of two separate builds. We'll tell you honestly if your case genuinely needs native.",
      },
      {
        q: "Will the app feel native?",
        a: "Yes. Real gestures, platform-correct navigation, and 60fps motion - users won't know it's cross-platform.",
      },
      {
        q: "How fast can we launch?",
        a: "We scope to the core loop and get an internal build on your device within days, with a store-ready release not long after. Exact timing depends on scope.",
      },
      {
        q: "Do you handle App Store and Play Store submission?",
        a: "Yes - we take the app through submission and review on both stores, and set up over-the-air updates so you can ship fixes fast afterward.",
      },
    ],
  },
];

export const getServicePage = (slug: string) =>
  SERVICE_PAGES.find((p) => p.slug === slug);
export const getServiceSlugs = () => SERVICE_PAGES.map((p) => p.slug);
