/* /project + /project/[slug] content for the six self-initiated concept builds.
   Every project here is honestly-labeled concept work: briefs Webify set for
   itself to demonstrate craft, not client engagements. Each concept carries
   its own narrative (overview, challenge, solution, outcome), scope counters,
   meta rows, and body image. Section headings and the "Craft at a Glance"
   block are shared across projects. */

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
  /** Mid-page concept-build image; each project uses its own cover asset. */
  bodyImage: string;
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
  results: "What It Demonstrates",
};

export const projectCraft = {
  heading: "Craft at a Glance",
  body: "Webify designs and ships websites, brand systems, and product interfaces for SaaS, fintech, and e-commerce teams. Each engagement pairs a dedicated designer and developer, weekly sprints, and a component-driven build that stays easy to maintain long after launch.",
};

/** Fallback body image for any project without its own asset. */
export const projectBodyImage = "/assets/project/project-single-image.webp";

export const projectDetails: ProjectDetail[] = [
  {
    slug: "averon-platform",
    name: "Averon Platform",
    year: "2026",
    image: "/assets/averon.webp",
    bodyImage: "/assets/averon.webp",
    description:
      "Averon is a concept for a cloud-based analytics platform that helps small and mid-sized businesses visualize operational and financial data in one centralized dashboard.",
    meta: [
      { label: "Category", value: "SaaS Platform" },
      { label: "Industry", value: "Business Intelligence" },
      { label: "Timeline", value: "5 Weeks" },
      { label: "Type", value: "Self-initiated concept" },
    ],
    overview:
      "We designed Averon as a self-initiated concept: a cloud analytics platform that helps small and mid-sized businesses see operational and financial data in one place. The build explores how a structured layout system, refined visual patterns, and a scalable component library keep a data-dense dashboard easy to navigate, interpret, and act on as a product grows.",
    challenge:
      "The brief we set ourselves reflects a familiar pattern: analytics interfaces that grow feature by feature without a consistent structure, until users face a wall of metrics on login and start working around the product instead of with it.",
    challengePoints: [
      "Overcrowded dashboards that make important metrics difficult to identify",
      "Navigation that requires multiple steps to reach frequently used reports",
      "Inconsistent UI elements across different sections of a product",
      "Limited responsiveness that reduces usability on tablets and smaller screens",
      "Dated visual styling that erodes user confidence in the accuracy of the data",
    ],
    solution:
      "We built the concept around a clear information hierarchy: a structured grid that surfaces headline metrics first, streamlined navigation that puts frequent reports one click away, and a component system that keeps every screen visually and functionally consistent. The interface is designed for desktop and tablet so teams get the same experience wherever they work.",
    results:
      "The layout is built so key metrics surface first, core reporting flows take fewer steps, and every screen reads as part of one product. The component library means new modules can be added without redesigning from scratch, the same standard we would bring to any client dashboard engagement.",
    features: [
      {
        value: 8,
        suffix: "+",
        label: "Dashboard Modules Designed",
        body: "Core modules, from financial overviews to operations reporting, composed on one structured grid.",
      },
      {
        value: 30,
        suffix: "+",
        label: "Components in the System",
        body: "Cards, charts, tables, and controls documented once and reused across every screen of the concept.",
      },
      {
        value: 5,
        suffix: "",
        label: "Weeks From Brief to Concept",
        body: "The full dashboard system was scoped, designed, and documented inside a five-week self-set sprint.",
      },
    ],
  },
  {
    slug: "solvix-brand",
    name: "Solvix Brand",
    year: "2026",
    image: "/assets/solvix.webp",
    bodyImage: "/assets/solvix.webp",
    description:
      "Solvix is a concept brand identity system for a B2B consultancy, spanning logo, guidelines, and a modular marketing site.",
    meta: [
      { label: "Category", value: "Brand Identity" },
      { label: "Industry", value: "Consulting" },
      { label: "Timeline", value: "3 Weeks" },
      { label: "Type", value: "Self-initiated concept" },
    ],
    overview:
      "We designed Solvix as a concept brand system to show how a B2B consultancy can run one recognizable visual language across proposals, decks, and the web without a designer in the room. The system spans a logo suite, documented guidelines, and a modular marketing site.",
    challenge:
      "The scenario we designed for is common: a consultancy that grows faster than its brand, where every office produces its own materials and nothing on the marketing side matches the quality of the actual work.",
    challengePoints: [
      "Inconsistent logo usage across decks, proposals, and social channels",
      "No documented guidelines, so every asset gets rebuilt from scratch",
      "Color and type choices that vary between offices and partners",
      "A marketing site that undersells the caliber of the firm's client work",
      "No reusable templates for proposals, case studies, or reports",
    ],
    solution:
      "We designed a single confident wordmark with a supporting system of color, type, and layout rules, documented in guidelines a whole firm could follow. A modular marketing site and a library of proposal and case study templates show how every touchpoint can come from the same system.",
    results:
      "The system is built so on-brand materials take hours, not days: proposals, decks, and the site share one visual language, and the guidelines document is written to keep new hires and external vendors consistent without rounds of review.",
    features: [
      {
        value: 40,
        suffix: "+",
        label: "Brand Assets Designed",
        body: "Logo suite, templates, social kits, and collateral designed as one coordinated package.",
      },
      {
        value: 3,
        suffix: "",
        label: "Weeks From Brief to Finished System",
        body: "A focused sprint covered strategy, design, documentation, and the marketing site build without scope drift.",
      },
      {
        value: 1,
        suffix: "",
        label: "Reusable Design System",
        body: "Every asset draws from a single documented system, so future materials stay consistent without redesign.",
      },
    ],
  },
  {
    slug: "luminary-studio",
    name: "Luminary Studio",
    year: "2026",
    image: "/assets/luminary.webp",
    bodyImage: "/assets/luminary.webp",
    description:
      "Luminary Studio is a concept portfolio platform for a photography collective, built around large imagery and effortless browsing.",
    meta: [
      { label: "Category", value: "Portfolio Platform" },
      { label: "Industry", value: "Photography" },
      { label: "Timeline", value: "10 Weeks" },
      { label: "Type", value: "Self-initiated concept" },
    ],
    overview:
      "We designed Luminary Studio as a concept portfolio platform for a photography collective, built to put large imagery first. The build covers an editorial gallery system, an automated image delivery pipeline, and a lightweight CMS designed so photographers can publish new work themselves in minutes.",
    challenge:
      "The scenario the concept answers: a collective whose work is scattered across personal sites and social profiles, on a shared site that buckles under full-resolution uploads.",
    challengePoints: [
      "Full-resolution uploads that make gallery pages painfully slow to load",
      "No consistent structure, so every photographer's section looks different",
      "Publishing new work that requires a developer for every update",
      "A weak mobile experience for an audience that browses mostly on phones",
      "No clear inquiry path for booking or licensing work",
    ],
    solution:
      "We designed an editorial gallery system around large, uninterrupted imagery and an image pipeline that generates responsive sizes automatically, so pages stay fast without sacrificing quality. A simple CMS lets each photographer upload, order, and caption their own galleries, and a structured inquiry flow is designed to turn viewers into bookings.",
    results:
      "The system is built so galleries load quickly on any connection while showing the work at full visual quality, new shoots can go live the day they are edited, and mobile browsing matches the desktop experience. Inquiries route through one structured form instead of scattered messages.",
    features: [
      {
        value: 6,
        suffix: "",
        label: "Responsive Sizes Per Image",
        body: "The automated pipeline renders every upload at six sizes, so each device receives a right-sized file.",
      },
      {
        value: 12,
        suffix: "+",
        label: "Gallery Layouts Designed",
        body: "Editorial layouts covering full-bleed features, grids, and photo essays, all drawn from one consistent system.",
      },
      {
        value: 3,
        suffix: "",
        label: "Core Flows Designed End to End",
        body: "Browsing, publishing, and inquiry flows designed in full, from gallery view to structured booking form.",
      },
    ],
  },
  {
    slug: "arcstone-portfolio",
    name: "Arcstone Portfolio",
    year: "2026",
    image: "/assets/arcstone.webp",
    bodyImage: "/assets/arcstone.webp",
    description:
      "Arcstone is a concept portfolio and lead generation site for an architecture practice, pairing editorial layouts with fast performance.",
    meta: [
      { label: "Category", value: "Portfolio Website" },
      { label: "Industry", value: "Architecture" },
      { label: "Timeline", value: "6 Weeks" },
      { label: "Type", value: "Self-initiated concept" },
    ],
    overview:
      "We designed Arcstone as a concept portfolio and lead generation site for an architecture practice, pairing editorial project layouts with fast performance. The self-set brief: present built work with the same rigor a practice brings to its buildings, and turn that attention into qualified inquiries.",
    challenge:
      "The scenario is one many practices know: the strongest projects hidden in PDF portfolios sent on request, while the website shows a dated grid of small thumbnails.",
    challengePoints: [
      "Project documentation locked in PDFs instead of on the website",
      "Photography presented in small crops that flatten the work",
      "A dated design that misrepresents a contemporary practice",
      "No clear route from viewing a project to starting a conversation",
      "Slow load times on the image-heavy pages that matter most",
    ],
    solution:
      "We designed editorial case study layouts that give each project room: full-bleed photography, drawings, and concise narrative in a consistent structure. Projects are filterable by type and scale, every page ends in a clear inquiry prompt, and the build is tuned so large imagery loads fast.",
    results:
      "The concept is built to work as a practice's primary portfolio: full case studies replace PDFs sent on request, image-heavy pages stay fast, and the contact flow is structured to capture project type and budget so every inquiry arrives qualified.",
    features: [
      {
        value: 5,
        suffix: "",
        label: "Case Study Templates Designed",
        body: "Editorial layouts that give full-bleed photography, drawings, and concise narrative one consistent, repeatable structure.",
      },
      {
        value: 1,
        suffix: "",
        label: "Inquiry Flow Designed End to End",
        body: "A structured contact flow that captures project type and budget before the first conversation.",
      },
      {
        value: 6,
        suffix: "",
        label: "Weeks From Brief to Concept",
        body: "Design and build of the full site system inside a six-week self-set sprint.",
      },
    ],
  },
  {
    slug: "helix-agency",
    name: "Helix Agency",
    year: "2026",
    image: "/assets/helix.webp",
    bodyImage: "/assets/helix.webp",
    description:
      "Helix is a concept agency website with case studies, careers, and a modular CMS built for daily updates.",
    meta: [
      { label: "Category", value: "Agency Website" },
      { label: "Industry", value: "Creative Services" },
      { label: "Timeline", value: "5 Weeks" },
      { label: "Type", value: "Self-initiated concept" },
    ],
    overview:
      "We designed Helix as a concept agency website with case studies, careers, and a modular CMS built for daily updates. The build covers design, front end, and a content model that lets non-technical editors assemble new pages from a library of tested blocks.",
    challenge:
      "The scenario: an agency whose static site routes every case study, hire, and announcement through a developer, leaving the site permanently out of date.",
    challengePoints: [
      "Every content change requiring a developer and a deploy",
      "Case studies that run months behind the agency's actual portfolio",
      "Careers listings managed through third-party links instead of on-site",
      "Pages assembled ad hoc, with no consistent component structure",
      "No preview workflow, so editors publish without seeing the result",
    ],
    solution:
      "We built a library of modular CMS blocks: heroes, case study sections, team grids, job listings, and more, each designed to work in any combination. Editors can assemble and preview pages themselves, case studies follow a repeatable template, and the careers section runs entirely on the site.",
    results:
      "The system is built so case studies and job openings can go live the day they are ready: the block library keeps every new page on-brand without design oversight, and developers stay out of the content loop entirely.",
    features: [
      {
        value: 18,
        suffix: "+",
        label: "Modular CMS Blocks",
        body: "A library of tested content blocks lets editors assemble on-brand pages in any combination.",
      },
      {
        value: 5,
        suffix: "",
        label: "Page Types Composed From Blocks",
        body: "Home, case studies, careers, about, and contact, all assembled from the same block library.",
      },
      {
        value: 5,
        suffix: "",
        label: "Weeks From Brief to Concept",
        body: "Design, build, CMS setup, and demo content shipped inside a five-week self-set sprint.",
      },
    ],
  },
  {
    slug: "vireon-design",
    name: "Vireon Design",
    year: "2026",
    image: "/assets/vireon.webp",
    bodyImage: "/assets/vireon.webp",
    description:
      "Vireon is a concept SaaS product design system covering dashboard UX, documented components, and data visualization patterns.",
    meta: [
      { label: "Category", value: "SaaS Product Design" },
      { label: "Industry", value: "Data Analytics" },
      { label: "Timeline", value: "7 Weeks" },
      { label: "Type", value: "Self-initiated concept" },
    ],
    overview:
      "We designed Vireon as a concept product design system for a B2B analytics product: dashboard UX, a tokenized design system, and a dedicated set of data visualization patterns. The build shows how order comes to a fast-grown interface, and what a system both designers and engineers can build with looks like.",
    challenge:
      "The starting scenario: years of rapid shipping leaving a product with dozens of one-off screens and no shared language between design and engineering.",
    challengePoints: [
      "Charts styled differently on every screen, making data hard to compare",
      "Components rebuilt ad hoc, multiplying design and engineering effort",
      "Dense screens with no consistent hierarchy or spacing rules",
      "Slow handoff, with engineers interpreting each mockup from scratch",
      "No documentation, so conventions live in individual heads",
    ],
    solution:
      "We built a tokenized design system: documented components, spacing and type scales, and a dedicated set of data visualization patterns covering an analytics product's core chart types. Dashboard templates show how the pieces compose, and everything ships with usage guidance for both designers and engineers.",
    results:
      "The system is built so new screens start from components instead of a blank canvas: charts read consistently across the product, handoff moves from redline documents to shared components, and the documentation is written so a team could extend the system on their own.",
    features: [
      {
        value: 60,
        suffix: "+",
        label: "Documented Components",
        body: "From buttons to complex data tables, every component ships with states, tokens, and usage guidance.",
      },
      {
        value: 4,
        suffix: "",
        label: "Dashboard Templates Composed",
        body: "Full-page templates showing how components, tokens, and chart patterns compose into real screens.",
      },
      {
        value: 9,
        suffix: "+",
        label: "Data Visualization Patterns",
        body: "A dedicated chart library covers an analytics product's core visualization needs with consistent, accessible styling.",
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
