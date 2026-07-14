/* /project + /project/[slug] content for Webify's live builds. Each project
   here is a real, deployed site Webify designed and built end to end to show
   how it works across an industry (SaaS, healthcare, real estate). The
   businesses shown inside the demos are illustrative; the design and
   engineering are real and live, and each project links to the running site. */

export interface ProjectMetaRow {
  label: string;
  value: string;
}

export interface ProjectFeature {
  value: number;
  suffix: string;
  label: string;
  body: string;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  year: string;
  image: string;
  /** Mid-page build image; each project uses its own cover asset. */
  bodyImage: string;
  /** The running site, so anyone can click through and use the real build. */
  liveUrl: string;
  description: string;
  meta: ProjectMetaRow[];
  overview: string;
  challenge: string;
  challengePoints: string[];
  solution: string;
  results: string;
  features: ProjectFeature[];
}

/* Shared section headings for the single-page narrative */

export const projectSections = {
  overview: "Project Overview",
  challenge: "The Challenge",
  solution: "The Solution",
  results: "The Result",
};

export const projectCraft = {
  heading: "Craft at a Glance",
  body: "Webify designs and builds websites, brand systems, and product interfaces end to end. Each build pairs senior design and engineering, a component-driven front end, and a responsive, fast, SEO-ready result that stays easy to maintain long after launch. The projects below are live, so you can click through and use them yourself.",
};

/** Fallback body image for any project without its own asset. */
export const projectBodyImage = "/assets/project/vexel-ai.webp";

export const projectDetails: ProjectDetail[] = [
  {
    slug: "vexel-ai",
    name: "Vexel AI",
    year: "2026",
    image: "/assets/project/vexel-ai.webp",
    bodyImage: "/assets/project/vexel-ai-body.webp",
    liveUrl: "https://saas.webify.org.in/",
    description:
      "A conversion-first marketing site and product dashboard UI for an AI sales-agent SaaS, designed and built to turn a complex product into a clear, fast, credible first impression.",
    meta: [
      { label: "Category", value: "SaaS Product" },
      { label: "Industry", value: "AI / Sales Automation" },
      { label: "Scope", value: "Marketing site + dashboard UI" },
      { label: "Type", value: "Live build" },
    ],
    overview:
      "Vexel is a live build for an AI sales-agent SaaS: a marketing site that sells the product in seconds and a dashboard interface that shows it in action. The work covers a dark, high-contrast brand system, a clear feature narrative (answer, qualify, convert), transparent pricing tiers, and a product UI that reads as a real tool rather than a stock screenshot.",
    challenge:
      "SaaS landing pages fail when they explain the technology instead of the outcome. The brief was to make an AI product feel simple and trustworthy on the first scroll, then back it up with an interface that looks like software a team would actually open every day.",
    challengePoints: [
      "Communicating a complex AI workflow without a wall of jargon",
      "Making a new product feel credible and enterprise-ready",
      "A pricing section that removes hesitation instead of adding it",
      "A dashboard UI convincing enough to carry the demo",
      "Fast load and clean motion on a visually rich dark theme",
    ],
    solution:
      "We led with the outcome, not the tech: a single sharp headline, a three-step feature story, and social-proof and security cues placed exactly where doubt appears. Pricing is laid out for quick comparison with one recommended tier. The dashboard UI was designed as a real component system (sidebar, metric cards, tables, charts) so the product feels tangible, and the whole site ships responsive and quick.",
    results:
      "A live product site that reads clearly in one scroll, a pricing layout built to convert, and a dashboard interface that makes the product feel real. Visit it and the flow speaks for itself.",
    features: [
      {
        value: 6,
        suffix: "",
        label: "Marketing Sections",
        body: "Hero, feature story, security, integrations, pricing, and CTA, composed as one coherent narrative.",
      },
      {
        value: 3,
        suffix: "",
        label: "Pricing Tiers Designed",
        body: "A free, pro, and enterprise layout built for fast comparison with one clear recommendation.",
      },
      {
        value: 100,
        suffix: "%",
        label: "Responsive & Live",
        body: "Deployed, fast, and fully responsive from wide desktop down to mobile.",
      },
    ],
  },
  {
    slug: "dental-health",
    name: "Dental Health",
    year: "2026",
    image: "/assets/project/dental-health.webp",
    bodyImage: "/assets/project/dental-health-body.webp",
    liveUrl: "https://webify-dentist.vercel.app/",
    description:
      "A clean, conversion-focused website for a modern dental practice, built to turn local searches into booked appointments.",
    meta: [
      { label: "Category", value: "Local Business" },
      { label: "Industry", value: "Healthcare / Dental" },
      { label: "Scope", value: "Marketing site + booking flow" },
      { label: "Type", value: "Live build" },
    ],
    overview:
      "Dental Health is a live build for a local dental practice: a warm, trustworthy site whose whole job is to get a visitor from first click to a booked appointment. It pairs confident typography and real photography with a clear service list, provider profiles, reviews, and a booking call to action that follows the visitor down the page.",
    challenge:
      "A local healthcare site lives or dies on trust and speed to booking. Most practice sites bury services, hide the phone number, and make appointments feel like paperwork. The brief was the opposite: build trust fast and put booking one tap away everywhere.",
    challengePoints: [
      "Establishing trust for a healthcare brand in the first few seconds",
      "Making services and credentials easy to scan, not read",
      "Keeping a Book Online action within reach on every screen",
      "Reassurance signals (insurance, same-day, financing) placed early",
      "A fast, accessible experience for every age of patient",
    ],
    solution:
      "The hero pairs a strong local claim with a smiling patient photo and two reassurance lines, with Book Online and a phone number immediately visible. Services are chip-scannable, provider profiles add real faces, and reviews plus insurance and financing notes answer objections before they are asked. The booking action is persistent, and the layout stays clean and quick on any device.",
    results:
      "A practice site built around a single job, booking, with trust signals and a call to action on every screen. It is live and ready to turn local traffic into appointments.",
    features: [
      {
        value: 6,
        suffix: "+",
        label: "Services Presented",
        body: "Preventive, cosmetic, whitening, implants, orthodontics, and emergency care, each scannable at a glance.",
      },
      {
        value: 1,
        suffix: "-tap",
        label: "Booking, Everywhere",
        body: "A Book Online action that stays within reach from the hero to the footer.",
      },
      {
        value: 100,
        suffix: "%",
        label: "Responsive & Live",
        body: "Deployed, accessible, and fully responsive for patients on any device.",
      },
    ],
  },
  {
    slug: "evergreen-studio",
    name: "EverGreen Studio",
    year: "2026",
    image: "/assets/project/evergreen-studio.webp",
    bodyImage: "/assets/project/evergreen-studio-body.webp",
    liveUrl: "https://webify-luxory-homes.vercel.app/",
    description:
      "An elegant, photography-led website for a luxury architecture and real-estate studio, built to make restraint feel premium.",
    meta: [
      { label: "Category", value: "Real Estate" },
      { label: "Industry", value: "Architecture / Luxury" },
      { label: "Scope", value: "Brand site + portfolio" },
      { label: "Type", value: "Live build" },
    ],
    overview:
      "EverGreen is a live build for a luxury architecture and real-estate studio, where the design has to feel as considered as the homes. Large architectural photography leads every screen, the type is quiet and confident, and the layout uses generous space and numbered sections so the work, not the interface, is the star.",
    challenge:
      "Luxury reads as restraint. A high-end property brand can not look like a listings portal; it has to feel editorial, unhurried, and expensive. The brief was to let the architecture breathe while still guiding a serious buyer toward the work and the enquiry.",
    challengePoints: [
      "Making a site feel premium through restraint, not decoration",
      "Letting full-bleed photography carry the experience",
      "A property and services structure that stays elegant, not listy",
      "Quiet, confident typography and generous whitespace",
      "Guiding a high-intent visitor to enquire without hard selling",
    ],
    solution:
      "We built the site around the photography: full-bleed imagery, a restrained neutral palette, and large display type used sparingly. Services and residences are organised with numbered, grid-based sections that read like an editorial spread, and the enquiry path is calm and always present. The result feels like the brand it represents, elevated and deliberate.",
    results:
      "A property brand site that feels editorial and expensive, where the architecture leads and every section is composed with restraint. It is live and ready to explore.",
    features: [
      {
        value: 4,
        suffix: "",
        label: "Core Services",
        body: "Acquisition, architecture, interiors, and development, each given a clear, elegant section.",
      },
      {
        value: 1,
        suffix: "",
        label: "Photography-Led System",
        body: "A full-bleed imagery and type system built so the work stays the focus on every screen.",
      },
      {
        value: 100,
        suffix: "%",
        label: "Responsive & Live",
        body: "Deployed and fully responsive, holding its composure from cinema-wide to mobile.",
      },
    ],
  },
];

export function getProject(slug: string): ProjectDetail | undefined {
  return projectDetails.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): ProjectDetail {
  const i = projectDetails.findIndex((p) => p.slug === slug);
  return projectDetails[(i + 1) % projectDetails.length];
}
