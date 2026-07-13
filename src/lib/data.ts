/* Content from the licensed template, rebranded to Webify.
   Template's original typos ("Sverage", "FREQUENLTY", "Dsigning") fixed for production. */

export const socialLinks = [
  { label: "Instagram", href: "#", icon: "/assets/ig-light.svg" },
  { label: "Medium", href: "#", icon: "/assets/m-light.svg" },
  { label: "Twitter X", href: "#", icon: "/assets/x-light.svg" },
  { label: "LinkedIn", href: "#", icon: "/assets/ln-light.svg" },
];

/* Project and blog card data lives in src/lib/pages/project.ts and blog.ts;
   the homepage sections read those canonical sources directly. */

export const impactsParagraph =
  "Webify is a senior-led design and engineering company built to ship websites and products that grow revenue, for founders and product leaders who value precision, speed, and outcomes. Digital systems that scale without adding operational drag. Strategy, design, and execution from one senior team.";

export const stats: {
  value: number;
  suffix: string;
  label: string;
  accent: boolean;
  decimals?: number;
}[] = [
  { value: 24, suffix: "h", label: "Reply time on every inquiry", accent: false },
  { value: 2, suffix: "", label: "Revision rounds per deliverable", accent: true },
  { value: 30, suffix: "-day", label: "Post-launch support window", accent: false },
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
    body: "No account managers, no relay layer. The senior designing and coding your product is in the room on every call, from kickoff to launch.",
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
      "Strategy and content session",
      "Bespoke design, no templates",
      "Responsive build, launch-ready",
      "CMS so you can edit it yourself",
      "2 revision rounds",
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
      "Full multi-page site or web app",
      "CMS setup and integrations",
      "SEO and performance pass",
      "Dedicated senior designer and developer",
      "Weekly working session",
    ],
  },
  {
    name: "Product",
    blurb: "For a web app or product, designed and engineered by one senior team.",
    timeline: "Scoped per build",
    features: [
      "Everything in Website",
      "A dedicated senior design and engineering team",
      "A roadmap we plan together",
      "Ship in focused cycles, no long lock-in",
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Do you work with international clients?",
    a: "Yes. We are a remote-first company set up to work with clients worldwide, across North America, Europe, the Middle East, and beyond. We run projects async-first with clear documentation and schedule calls in overlapping hours, so time zones rarely slow anything down.",
  },
  {
    q: "How does the creative process work?",
    a: "Every engagement starts with a discovery workshop where we define goals, audience, and scope. From there we move through strategy, design, and build in weekly sprints, with a shared board so you always know what is in progress and what ships next.",
  },
  {
    q: "How long does a typical project take?",
    a: "A landing page or site refresh usually ships in 2 to 3 weeks. A full multi-page website typically ships in 4 to 8 weeks, and larger web apps and products are scoped per build. We agree on a delivery schedule in writing before any work begins.",
  },
  {
    q: "How do pricing and engagements work?",
    a: "Every project is a fixed quote, agreed in writing before work starts, so there is no hourly billing and no surprises. We are taking our first 10 projects at founding rates, locked in for 12 months. Tell us what you are building and you get a written quote within 3 working days.",
  },
  {
    q: "What happens after launch?",
    a: "We do not disappear at go-live. Every project includes a 30-day support window for fixes and refinements. After your first project ships, you can move to a light care retainer for ongoing iterations, new pages, and performance monitoring.",
  },
];

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
    links: [
      { label: "Website Development", href: "/service/website-development" },
      { label: "Branding & Design", href: "/service/branding-design" },
      { label: "E-commerce", href: "/service/e-commerce" },
      { label: "App Development", href: "/service/app-development" },
      { label: "SEO", href: "/service/seo" },
    ],
  },
];

export interface ApproachCard {
  title: string;
  body: string;
  highlights: string[];
  visual: "browser" | "phones" | "dashboard" | "editor" | "cms" | "dial";
  wide: boolean;
}

export const approachCards: ApproachCard[] = [
  {
    title: "Strategy-First Kickoff",
    body: "Every engagement opens by defining clear goals, mapping your audience, and aligning with your brand voice, a foundation the design can stand on.",
    highlights: ["defining clear goals", "brand voice"],
    visual: "browser",
    wide: true,
  },
  {
    title: "Mobile-First By Default",
    body: "Every layout is composed for seamless mobile-first experiences, holding performance and clarity on every device.",
    highlights: ["seamless mobile-first experiences"],
    visual: "phones",
    wide: false,
  },
  {
    title: "Conversion-Driven",
    body: "Websites built with strategy, designed to engage audiences, and crafted to turn visitors into customers.",
    highlights: ["visitors into customers"],
    visual: "dashboard",
    wide: false,
  },
  {
    title: "Pixel-Perfect Development",
    body: "Designed and developed with pixel-perfect precision, delivering high performance and easy updates.",
    highlights: ["pixel-perfect precision"],
    visual: "editor",
    wide: true,
  },
  {
    title: "Seamless CMS Launch",
    body: "Launched on a powerful CMS, so your team can update and manage content effortlessly after going live.",
    highlights: ["update and manage content"],
    visual: "cms",
    wide: true,
  },
  {
    title: "Future-Ready",
    body: "Systems designed to be scalable and future-ready, adapting as your business grows.",
    highlights: ["scalable and future-ready"],
    visual: "dial",
    wide: false,
  },
];
