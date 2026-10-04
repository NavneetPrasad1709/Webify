/**
 * /service + /service/[slug] - Webify's real service catalogue.
 *
 * Each service carries its own sub-service list (rendered in the homepage
 * accordion and on the /service listing) and an optional looping video for
 * the accordion media slot. Services without a loop fall back to their
 * listing image.
 */

export type ServiceEntry = {
  slug: string;
  title: string;
  /** Card image on the /service listing; also the accordion poster. */
  listingImage: string;
  /** Full-width hero image on the single page. */
  heroImage: string;
  /** Looping media for the homepage accordion (optional). */
  video?: string;
  /** Card description on the /service listing. */
  blurb: string;
  /** Sub-services shown under the title (may be empty). */
  items: string[];
  /** Label above the items list; defaults to listingIncludedLabel. */
  itemsLabel?: string;
  /** "What Is X?" body on the single page; falls back to single.whatIsBody. */
  whatIs?: string;
  /** Deliverables list on the single page; falls back to single.deliverablesItems. */
  deliverables?: string[];
  /** Project timeline shown in the process cards; falls back to the shared value. */
  timeline?: string;
  /** Slug of a live concept build on /project that demonstrates this service. */
  relatedProject?: string;
};

export const services: ServiceEntry[] = [
  {
    slug: "website-development",
    title: "Website Development",
    listingImage: "/assets/service/listing-website-saas.webp",
    heroImage: "/assets/service/single-website-saas.webp",
    video: "/assets/service/loops/website-development.mp4",
    blurb:
      "Custom marketing sites and SaaS front ends built on modern stacks, engineered for speed, SEO, and easy content updates.",
    items: [
      "React & Next.js Builds",
      "Vue & Nuxt Builds",
      "WordPress & CMS Builds",
      "Laravel & Node.js Back Ends",
    ],
    whatIs:
      "Website development is the full build of your marketing site or SaaS front end, from information architecture and design through to a production-ready codebase. We build on modern stacks like React, Vue, Laravel, and WordPress, engineered for speed, SEO, and content your team can update without a developer. Every build ships with clean, documented code that stays easy to extend as the product grows.",
    deliverables: [
      "Discovery Workshop & Technical Scoping",
      "Sitemap, UX Architecture & Responsive Design",
      "Component-Based Front End Build",
      "CMS Setup & Content Migration",
      "Performance, SEO & Accessibility Pass",
      "Launch Support & Handover Documentation",
    ],
    timeline: "4-8 Weeks",
    relatedProject: "vexel-ai",
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    listingImage: "/assets/service/listing-custom-software.webp",
    heroImage: "/assets/service/single-custom-software.webp",
    video: "/assets/service/loops/custom-software.mp4",
    blurb:
      "Web apps, SaaS platforms, internal tools, and APIs built around how your business actually runs, not around a template.",
    itemsLabel: "What we build:",
    items: [
      "Web Applications & SaaS Platforms",
      "Internal Tools & Admin Dashboards",
      "Client Portals & Booking Systems",
      "APIs & Third-Party Integrations",
    ],
    whatIs:
      "Custom software development is building the exact tool your business needs instead of bending your process around off-the-shelf software. We scope the workflow with you, design the interface, and engineer the full stack: front end, back end, database, authentication, and integrations with the tools you already use. You own the code, the data, and the infrastructure from day one.",
    deliverables: [
      "Workflow Mapping & Technical Architecture",
      "UX Flows & Interface Design",
      "Full-Stack Build: Front End, API & Database",
      "Authentication, Roles & Permissions",
      "Integrations With Your Existing Tools",
      "Deployment, Documentation & Handover",
    ],
    timeline: "6-14 Weeks",
  },
  {
    slug: "ai-development",
    title: "AI Development",
    listingImage: "/assets/service/listing-ai-development.webp",
    heroImage: "/assets/service/single-ai-development.webp",
    video: "/assets/service/loops/ai-development.mp4",
    blurb:
      "AI agents, chatbots, and LLM features built into your product or operations, grounded in your own data and shipped to production.",
    itemsLabel: "What we build:",
    items: [
      "AI Chatbots & Support Assistants",
      "AI Agents & Workflow Automation",
      "LLM Features Inside Your Product",
      "Document Search Over Your Own Data",
    ],
    whatIs:
      "AI development is putting large language models to work on a specific job in your business: answering customers, qualifying leads, drafting documents, or searching your own knowledge base. We pick the right model for the task, ground it in your data so answers stay accurate, add guardrails and logging, and ship it as a real feature inside your website, app, or internal tools, not as a demo.",
    deliverables: [
      "Use-Case Scoping & Model Selection",
      "Data Preparation & Retrieval Setup",
      "AI Feature, Chatbot or Agent Build",
      "Guardrails, Evaluation & Cost Controls",
      "Integration Into Your Site, App or Tools",
      "Monitoring, Logging & Post-Launch Tuning",
    ],
    timeline: "3-8 Weeks",
    relatedProject: "vexel-ai",
  },
  {
    slug: "branding-design",
    title: "Branding and Design",
    listingImage: "/assets/service/listing-product-design.webp",
    heroImage: "/assets/service/single-product-design.webp",
    video: "/assets/service/loops/branding-design.mp4",
    blurb:
      "Logos, brand guidelines, and interface design that give your product one consistent, recognizable visual language.",
    items: [
      "Logo & Brand Guidelines",
      "Landing Page Design",
      "Online Store Design",
      "Custom Website Design",
      "UI/UX Website Design",
    ],
    whatIs:
      "Branding and design gives your company one consistent, recognizable visual language across every touchpoint. We start from strategy and positioning, then craft the logo, color, type, and interface patterns that carry it, and document everything so the system holds up long after handover.",
    deliverables: [
      "Brand Strategy & Positioning Workshop",
      "Logo Suite & Visual Identity System",
      "Brand Guidelines Document",
      "Typography, Color & Iconography System",
      "UI/UX Design for Web & Product",
      "Marketing Collateral & Social Templates",
    ],
    timeline: "3-5 Weeks",
    relatedProject: "evergreen-studio",
  },
  {
    slug: "crm-system",
    title: "CRM System",
    listingImage: "/assets/service/listing-design-systems.webp",
    heroImage: "/assets/service/single-design-systems.webp",
    video: "/assets/service/loops/crm-system.mp4",
    blurb:
      "Tailored CRM builds that map to how your team actually sells, from client database to pipeline automation.",
    itemsLabel: "What it covers:",
    items: [
      "Client & Lead Database",
      "Sales Pipeline & Deal Stages",
      "Task & Follow-up Automation",
      "Reports & Dashboards",
      "Integrations With Your Tools",
    ],
    whatIs:
      "A CRM system is the operational core of your sales process: one place where every lead, client, and deal lives. We map your pipelines, client database, and follow-up automation to how your team actually sells, instead of forcing you into an off-the-shelf template. The result is a system your team opens every morning because it saves them time.",
    deliverables: [
      "CRM Architecture & Pipeline Design",
      "Client Database Setup & Data Migration",
      "Role-Based Dashboards & Reporting",
      "Sales Automation & Follow-Up Workflows",
      "Email, Telephony & Payment Integrations",
      "Team Training & Post-Launch Support",
    ],
    timeline: "6-12 Weeks",
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    listingImage: "/assets/solvix.webp",
    heroImage: "/assets/solvix.webp",
    video: "/assets/service/loops/e-commerce.mp4",
    blurb:
      "Storefronts on Shopify, OpenCart, or custom builds, designed to load fast and convert browsers into buyers.",
    items: [
      "E-commerce Website Development",
      "OpenCart Website Development",
      "Shopify Website Development",
    ],
    whatIs:
      "E-commerce development covers everything a store needs to sell online: catalog, cart, checkout, payments, and the admin your team runs it from. We build on Shopify, OpenCart, or custom stacks, and tune every step of the funnel so product pages load fast and checkout never gets in the way of a sale.",
    deliverables: [
      "Store Architecture & Catalog Structure",
      "Custom Storefront Design & Build",
      "Cart, Checkout & Payment Gateway Setup",
      "Shipping, Tax & Inventory Configuration",
      "Analytics & Conversion Tracking Setup",
      "Store Training & Post-Launch Support",
    ],
    timeline: "5-8 Weeks",
  },
  {
    slug: "landing-page",
    title: "Landing Page",
    listingImage: "/assets/luminary.webp",
    heroImage: "/assets/luminary.webp",
    video: "/assets/service/loops/landing-page.mp4",
    blurb:
      "Single-purpose pages built around one offer and one action, tested and tuned for paid traffic.",
    items: [],
    whatIs:
      "A landing page is a single-purpose page built around one offer and one action, whether that is booking a call, starting a trial, or capturing a lead. We write, design, and build it for paid traffic, then tune headlines, layout, and calls to action against real visitor behavior.",
    deliverables: [
      "Offer Positioning & Page Copywriting",
      "Conversion-Focused Design & Build",
      "Mobile Optimization & Speed Tuning",
      "Form, Booking & CRM Integrations",
      "Analytics, Pixels & A/B Test Setup",
      "Post-Launch Conversion Review",
    ],
    timeline: "2-3 Weeks",
    relatedProject: "vexel-ai",
  },
  {
    slug: "website-support",
    title: "Website Support",
    listingImage: "/assets/service/listing-design-qa.webp",
    heroImage: "/assets/service/single-design-qa.webp",
    video: "/assets/service/loops/website-support.mp4",
    blurb:
      "Ongoing maintenance, monitoring, and content updates so your site stays fast, secure, and current.",
    items: [],
    whatIs:
      "Website support is ongoing care for your site after launch: updates, monitoring, backups, and a team on call when something needs to change. Instead of chasing a freelancer for every fix, you get a predictable monthly arrangement that keeps the site fast, secure, and current.",
    deliverables: [
      "Uptime, Security & Performance Monitoring",
      "Regular Backups & Platform Updates",
      "Content & Design Change Requests",
      "Bug Fixes & Compatibility Patches",
      "Monthly Performance & SEO Reporting",
      "Priority Response for Critical Issues",
    ],
    timeline: "Ongoing",
  },
  {
    slug: "redesign",
    title: "Redesign",
    listingImage: "/assets/helix.webp",
    heroImage: "/assets/helix.webp",
    video: "/assets/service/loops/redesign.mp4",
    blurb:
      "A structured overhaul of your existing site: same brand equity, modern design, measurably better performance.",
    items: [],
    whatIs:
      "A redesign is a structured overhaul of your existing site: same brand equity and domain authority, modern design, measurably better performance. We audit what works today and keep it, rebuild what does not, and migrate content with SEO preserved so your rankings survive the switch.",
    deliverables: [
      "UX, Content & Analytics Audit",
      "New Information Architecture & Design",
      "Component-Based Rebuild on a Modern Stack",
      "Content Migration & URL Redirect Map",
      "Performance, SEO & Accessibility Pass",
      "Launch Support & Before/After Reporting",
    ],
    timeline: "4-8 Weeks",
  },
  {
    slug: "app-development",
    title: "Application Development",
    listingImage: "/assets/averon.webp",
    heroImage: "/assets/averon.webp",
    video: "/assets/service/loops/app-development.mp4",
    blurb:
      "Native Android and iOS applications taken from concept through App Store release.",
    items: ["Android Apps", "iOS Apps"],
    whatIs:
      "Application development takes your product from concept to a native Android and iOS release. We handle UX, interface design, engineering, and the App Store and Google Play submission process, then stay on after launch to iterate on real usage data.",
    deliverables: [
      "Product Scoping & Technical Architecture",
      "UX Flows & Native Interface Design",
      "iOS & Android Development",
      "API & Backend Integration",
      "QA Testing Across Devices",
      "App Store Submission & Release Support",
    ],
    timeline: "8-14 Weeks",
  },
  {
    slug: "seo",
    title: "Search Engine Optimization",
    listingImage: "/assets/service/listing-launch-scale.webp",
    heroImage: "/assets/service/single-launch-scale.webp",
    video: "/assets/service/loops/seo.mp4",
    blurb:
      "Technical and on-page SEO that grows qualified organic traffic month over month.",
    items: [],
    whatIs:
      "Search engine optimization grows the qualified organic traffic your site earns month over month. We combine technical fixes, on-page structure, and content targeting the searches your buyers actually make, and we report on rankings and conversions rather than vanity metrics.",
    deliverables: [
      "Technical SEO Audit & Fixes",
      "Keyword & Competitor Research",
      "On-Page Optimization & Internal Linking",
      "Content Strategy & Briefs",
      "Local SEO & Business Profile Setup",
      "Monthly Rankings & Traffic Reporting",
    ],
    timeline: "3-6 Months",
  },
];

/* Per-service FAQs: the questions buyers type into search before they hire.
   Rendered on each single page and emitted as FAQPage JSON-LD. No prices
   (withheld until the founding projects ship) and no client claims. */
export const serviceFaqs: Record<string, { q: string; a: string }[]> = {
  "website-development": [
    { q: "How long does it take to build a website?", a: "A marketing site usually takes 4 to 8 weeks from kickoff to launch, depending on page count, content readiness, and integrations. You get the exact timeline in writing with your fixed quote, before any work starts." },
    { q: "How much does website development cost?", a: "Every project is a fixed quote based on scope, agreed in writing before work starts, so there is no hourly billing. Send a short brief and you get a written quote within 3 working days." },
    { q: "Which technology do you build websites with?", a: "Mostly Next.js and React for speed and SEO, with WordPress, Webflow, or a headless CMS when your team needs to edit content without a developer. We pick the stack that fits your site, not the other way around." },
    { q: "Will my new website be SEO-friendly and fast?", a: "Yes. Every build ships with clean semantic markup, metadata, a sitemap, structured data, optimized images, and a Core Web Vitals pass, so the site starts on a strong technical foundation." },
  ],
  "custom-software": [
    { q: "What kind of custom software can you build?", a: "Web applications, SaaS platforms, internal tools, admin dashboards, client portals, booking systems, and the APIs that connect them. If your team runs part of the business in spreadsheets, that is usually the best place to start." },
    { q: "Is custom software better than an off-the-shelf tool?", a: "When an off-the-shelf tool fits your process, use it. Custom software pays off when your workflow is your advantage, when you are paying for many seats you barely use, or when several tools need to work as one system." },
    { q: "Who owns the code and data?", a: "You do, from day one. The repository, the database, the hosting accounts, and the documentation are all in your name, so you are never locked in to us." },
    { q: "How long does custom software development take?", a: "A focused first version usually ships in 6 to 14 weeks. We scope a lean first release that solves the core problem, launch it, and then extend it based on real use." },
  ],
  "ai-development": [
    { q: "What can AI actually do for my business?", a: "The strongest use cases are narrow and repetitive: answering customer questions from your own documentation, qualifying and routing leads, drafting proposals or reports, extracting data from documents, and searching an internal knowledge base in plain language." },
    { q: "Can you build a chatbot trained on our own data?", a: "Yes. We connect the model to your documents, help center, or database through retrieval, so it answers from your content and cites it, instead of guessing. Your data is not used to train public models." },
    { q: "Which AI models do you work with?", a: "We work with the leading models from Anthropic, OpenAI, and Google, and choose per task based on accuracy, speed, and cost. The integration is built so the model can be swapped later without a rebuild." },
    { q: "How do you keep AI answers accurate and costs under control?", a: "Every AI feature ships with grounding in your data, guardrails on what it may answer, an evaluation set we test against, usage limits, and logging, so you can see what it said and what it cost." },
  ],
  "branding-design": [
    { q: "What is included in a branding project?", a: "Strategy and positioning, a logo suite, color and typography systems, iconography, brand guidelines, and the UI patterns that carry the brand into your website and product." },
    { q: "How long does a brand identity take?", a: "Usually 3 to 5 weeks, including two structured revision rounds per deliverable, all agreed in your fixed quote before work starts." },
    { q: "Do you design UI/UX for apps and websites too?", a: "Yes. Interface and experience design is part of the same service, so your brand and your product look and behave like one system." },
    { q: "Will I get the source files?", a: "Yes. You receive the full Figma files, exported logo and asset packs, and a guidelines document your team or any future designer can work from." },
  ],
  "crm-system": [
    { q: "Why build a custom CRM instead of using an existing one?", a: "Off-the-shelf CRMs force your sales process into their template and charge per seat forever. A custom CRM maps to how your team actually sells, holds only the fields you use, and has no per-user licence fee." },
    { q: "Can you migrate our existing data?", a: "Yes. We migrate clients, leads, deals, and history from spreadsheets or your current CRM, cleaned and de-duplicated, as part of the build." },
    { q: "Can the CRM connect to email, WhatsApp, or payments?", a: "Yes. Email, telephony, payment gateways, calendars, and messaging tools can all be integrated, so follow-ups and updates happen without manual entry." },
    { q: "How long does a custom CRM take?", a: "Typically 6 to 12 weeks for a first version, followed by team training and post-launch support." },
  ],
  "e-commerce": [
    { q: "Shopify or a custom store: which should I choose?", a: "Shopify suits most stores that want to launch fast and manage everything themselves. A custom build makes sense for unusual catalogs, complex pricing, or deep integrations. We recommend the one that fits after a short scoping call." },
    { q: "How long does it take to build an online store?", a: "Usually 5 to 8 weeks, including catalog setup, payment gateway, shipping and tax configuration, and training." },
    { q: "Which payment gateways can you integrate?", a: "Stripe, PayPal, Razorpay, and most other major gateways, plus local payment methods where your customers expect them." },
    { q: "Can you migrate my existing store?", a: "Yes. Products, customers, and orders can be migrated with URL redirects in place, so you keep your search rankings through the switch." },
  ],
  "landing-page": [
    { q: "How fast can you deliver a landing page?", a: "Usually 2 to 3 weeks including copywriting, design, build, tracking setup, and a conversion review after launch." },
    { q: "Do you write the copy?", a: "Yes. Offer positioning and page copy are part of the service, because the words decide conversion more than the layout does." },
    { q: "Can it connect to my CRM and ad pixels?", a: "Yes. Forms, booking tools, CRM, analytics, and ad platform pixels are set up and tested before launch." },
    { q: "Do you run A/B tests?", a: "We set up the testing framework and tune headlines, layout, and calls to action against real visitor data after launch." },
  ],
  "website-support": [
    { q: "What does website maintenance include?", a: "Uptime and security monitoring, backups, platform and plugin updates, bug fixes, content and design change requests, and a monthly performance report." },
    { q: "Can you support a website you did not build?", a: "Yes. We start with an audit of the code, hosting, and security, fix anything urgent, and then take over ongoing care." },
    { q: "How fast do you respond to issues?", a: "Critical issues such as downtime or a broken checkout get priority response. Every other request gets a reply within 24 hours." },
    { q: "Is there a long-term contract?", a: "No. Support runs month to month on a predictable arrangement, agreed in writing." },
  ],
  redesign: [
    { q: "Will a redesign hurt my Google rankings?", a: "Not when it is done carefully. We map every old URL to its new one with redirects, preserve content that ranks, and keep metadata intact, so rankings survive the switch." },
    { q: "How do I know if my website needs a redesign?", a: "Common signs: it is slow on mobile, it is hard to update, it no longer matches your brand or offer, or visitors arrive and leave without contacting you." },
    { q: "How long does a website redesign take?", a: "Usually 4 to 8 weeks, from audit to launch, with before and after reporting." },
    { q: "Can you keep our existing content?", a: "Yes. We audit what works, keep and improve it, and rewrite or remove what does not." },
  ],
  "app-development": [
    { q: "Do you build native apps or cross-platform apps?", a: "Both. We recommend native or cross-platform per project, based on performance needs, budget, and how fast you need to be on both stores." },
    { q: "How long does it take to build a mobile app?", a: "A first release usually takes 8 to 14 weeks, from scoping and design through App Store and Google Play submission." },
    { q: "Do you handle App Store and Play Store submission?", a: "Yes. Store listings, review requirements, and release management are part of the service." },
    { q: "Can you add AI features to an app?", a: "Yes. Chat assistants, smart search, and automation powered by large language models can be built into the app as part of the same project." },
  ],
  seo: [
    { q: "How long does SEO take to show results?", a: "Technical fixes can show impact within weeks. Rankings for long-tail searches usually move in 3 to 6 months, and competitive terms take longer. Anyone promising page one in a week is not being honest." },
    { q: "What is included in your SEO service?", a: "A technical audit and fixes, keyword and competitor research, on-page optimization, internal linking, content strategy and briefs, local SEO where relevant, and monthly reporting on rankings and conversions." },
    { q: "Do you build backlinks?", a: "We focus on earning links through useful content, directory listings, and partnerships. We do not buy links, because it puts your domain at risk." },
    { q: "Do you optimize for AI search like ChatGPT and Google AI Overviews?", a: "Yes. Clear structure, structured data, and direct answers to buyer questions help your site get cited in AI answers as well as ranked in classic search." },
  ],
};

export function getService(slug: string): ServiceEntry | undefined {
  return services.find((s) => s.slug === slug);
}

/* ---------------------------------------------------------------- */
/* Listing page copy                                                 */
/* ---------------------------------------------------------------- */

export const listingTag = "Our Services";

export const listingIncludedLabel = "What’s Included:";

/* Services page dark hero. Media slot intentionally omitted: the supplied
   services.mp4 was a showreel of third-party product UIs, which breaks the
   no-third-party-brands media rule. Restore `video`/`poster` here and the media
   block in ServiceHero once a clean, service-relevant clip is available. */
export const listingHero = {
  eyebrow: "Our Services",
  titleLines: ["Services", "That Deliver"],
  subtitle:
    "One in-house team of developers and designers for strategy, design, build, and everything after launch.",
  ctaLabel: "Start a Project",
  ctaHref: "/contact",
};

/* Flexible technology stack, grouped by project scale. Icons are the monochrome
   marks in /assets/stack, recoloured to a dark-safe brand tint via the shared
   `orbit-ico` mask (see globals.css). Honest: the tools we build with. */
export const techStack = {
  eyebrow: "Flexible Stack",
  titleLines: ["Flexible", "Technology Stack"],
  note: "We pick the stack that fits your scale, not the other way around.",
  ctaLabel: "Start a Project",
  ctaHref: "/contact",
  tiers: [
    {
      tier: "Launch",
      note: "Marketing sites, landing pages, and storefronts, shipped in weeks.",
      stack: [
        { slug: "figma", label: "Figma", brand: "#F24E1E" },
        { slug: "webflow", label: "Webflow", brand: "#4A8CFF" },
        { slug: "shopify", label: "Shopify", brand: "#7DBE4E" },
      ],
    },
    {
      tier: "Product",
      note: "Web apps and SaaS front ends, typed and component-driven.",
      stack: [
        { slug: "react", label: "React", brand: "#61DAFB" },
        { slug: "nextjs", label: "Next.js", brand: "#FFFFFF" },
        { slug: "typescript", label: "TypeScript", brand: "#4C8DD6" },
      ],
    },
    {
      tier: "Scale",
      note: "Full-stack systems and infrastructure tuned for real load.",
      stack: [
        { slug: "nodejs", label: "Node.js", brand: "#6CC24A" },
        { slug: "vercel", label: "Vercel", brand: "#FFFFFF" },
        { slug: "nextjs", label: "Next.js", brand: "#FFFFFF" },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- */
/* Single page copy (shared template; titles interpolate per service) */
/* ---------------------------------------------------------------- */

export const single = {
  tag: "SERVICE DETAILS",
  overviewLabel: "Overview",
  overviewImage: "/assets/service/overview.webp",
  overviewHeading: "Solutions Crafted For Performance And Growth",
  overviewParagraphs: [
    "We provide strategic, creative, and result-driven services that help businesses build strong brands, attract the right audience, and communicate with confidence. From brand systems and visual design to engineering, digital assets, and marketing materials, every service is crafted to deliver consistency, clarity, and long-term value.",
    "Every engagement runs one accountable process: discovery, strategy, design, and implementation, so the work ships on time, performs under pressure, and keeps compounding value long after launch.",
  ],
  overviewBoxText:
    "Supporting your product through every stage, from concept testing to advanced optimization.",
  processCards: [
    { label: "The Process", value: "Discovery &\nResearch", icon: "flask" },
    { label: "Experience Level", value: "Senior\nProduct Team", icon: "orbit" },
    { label: "Project Timeline", value: "3-6 Months", icon: "cube" },
  ] as { label: string; value: string; icon: "flask" | "orbit" | "cube" }[],
  processNote:
    "Tell us what you are building. A senior replies within 24 hours with an honest scope, timeline, and fixed quote.",
  whatIsBody:
    "Every Webify engagement combines strategy, design, and engineering into one accountable process. It covers discovery, planning, design direction, implementation, and the guidelines that keep your product consistent everywhere it appears. A strong foundation helps customers instantly recognize you, trust you, and remember you. Our approach pairs research, strategy, creativity, and precision to craft solutions that are not only beautiful but purposeful and scalable for future growth.",
  deliverablesTag: "Deliverables",
  deliverablesTitle: "Everything Included In This Service Package",
  deliverablesLabel: "What’s Included:",
  deliverablesItems: [
    "Discovery Workshop & Technical Scoping",
    "UX Architecture & Responsive Design",
    "Production-Ready Build & QA Testing",
    "Performance, SEO & Accessibility Pass",
    "Launch Support & Handover Documentation",
    "Expert Consultation & Post-Delivery Support",
  ],
  packageImage: "/assets/service/package.webp",
  /* Honest commitments the studio controls, not invented market statistics. */
  prioritiesTitle:
    "Commitments that hold on every engagement, in writing before we start",
  priorities: [
    {
      value: 24,
      suffix: "h",
      title: "Reply Time",
      text: "A senior replies to every inquiry and project question within 24 hours.",
    },
    {
      value: 2,
      suffix: "",
      title: "Revision Rounds",
      text: "Two structured revision rounds per deliverable, scoped into every quote.",
    },
    {
      value: 30,
      suffix: "-day",
      title: "Post-Launch Support",
      text: "A 30-day window after go-live for fixes and refinements, included.",
    },
  ],
};
