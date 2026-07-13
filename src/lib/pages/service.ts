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
