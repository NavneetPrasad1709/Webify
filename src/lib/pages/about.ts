// Static content for the /about page.

export const aboutHero = {
  tag: "WHO WE ARE",
  title: "A Founding Company",
  cta: "Start a Project",
  video: "/assets/about/hero-banner.mp4",
  poster: "/assets/about/hero-banner-poster.jpg",
};

export const aboutIntro = {
  tag: "ABOUT US",
  text: "Webify is new, and says so. No borrowed case studies, no rented logos: a team of software developers and UI/UX designers who design and ship every project end to end, from the first call to launch.",
};

/* The real founder: the studio's verifiable human trust anchor. Facts only,
   no invented credentials. */
export const founder = {
  tag: "FOUNDER",
  name: "Navneet Prasad",
  role: "Founder & Lead Engineer",
  bio: "Navneet founded Webify and leads its team of software developers and UI/UX designers. Every project is designed and built in-house, with no account managers and no handoffs, so you work directly with the people doing the work, from the first call to launch and through the 30-day support window after it.",
  address: "Tech Zone IV, Greater Noida, Uttar Pradesh 201318",
  reach: "Remote-first, working with clients worldwide",
  email: "contact@webify.org.in",
  image: "/assets/about/founder.webp",
  imageAlt: "Navneet Prasad, founder of Webify",
};

export interface TemplateCard {
  tone: "lime" | "light" | "blue";
  bold: string;
  sub: string;
  stat?: string;
  text?: string;
  cta?: string;
}

/* Promise cards: commitments the studio controls, no performance claims.
   The stat slot carries the engagement cadence word (AboutIntro renders
   stat-less cards through its blue CTA branch, so the slot stays filled). */
export const resultsSection = {
  tagLeft: "PROMISES",
  tagRight: "WHAT WE DELIVER",
  cards: [
    {
      tone: "lime",
      bold: "Retention",
      sub: "Earned, Not Contracted",
      stat: "Repeat",
      text: "We win the next project by how the first one ships: honest scope, weekly progress, and a build you fully own.",
    },
    {
      tone: "light",
      bold: "Velocity",
      sub: "Momentum From Week One",
      stat: "Weekly",
      text: "Weekly sprints with a shared board, so something ships every week.",
    },
    {
      tone: "blue",
      bold: "Branding",
      sub: "Identities That Speak",
      text: "Visual Identities That Stand Out",
      cta: "Start a Project",
    },
  ] as TemplateCard[],
};

/* Forward-looking roadmap, not a fabricated history. The `year` field feeds
   the big column heading and `label` feeds the image pill in Journey.tsx;
   `text` carries the supporting copy for each milestone. Images are stock
   scenes of studio work, not photos of the Webify team. */
export const journey = {
  tag: "THE ROAD AHEAD",
  title: "Driven By Creative Vision",
  items: [
    {
      year: "DAY ONE",
      label: "A senior-led team",
      text: "Webify runs as a senior-led team of developers and designers, so every project is built by experienced hands with senior review on everything that ships.",
      image: "/assets/about/year-one.webp",
      alt: "Four colleagues gathered around a laptop, looking engaged and smiling during a discussion in a bright office.",
    },
    {
      year: "YEAR ONE",
      label: "Founding clients",
      text: "A handful of founding clients, each served deeply: close collaboration, honest scope, and work we are both proud to show.",
      image: "/assets/about/year-two.webp",
      alt: "Two women engaged in a discussion in an office, one seated in a green chair holding a red notebook, the other gesturing while leaning forward.",
    },
    {
      year: "BEYOND",
      label: "A compounding system",
      text: "A component library that grows with every build, so each next project starts further ahead and ships faster than the last.",
      image: "/assets/about/year-three.webp",
      alt: "Designers collaborating around a table in a bright office during a working session.",
    },
  ],
};

export const methodology = {
  tag: "Method",
  title: "Our Work Methodology",
  video: "/assets/about/method.mp4",
  poster: "/assets/about/method-poster.jpg",
  items: [
    {
      title: "Research & Discovery",
      text: "Gather insights about your brand, audience, and goals.",
    },
    {
      title: "Concept Development",
      text: "Refine creative concepts until the direction is clear.",
    },
    {
      title: "Production & Execution",
      text: "Build with precision, creativity, and your objectives in view.",
    },
  ],
};

export interface ValueItem {
  name: string;
  number: string;
  text: string;
}

export const valuesSection = {
  tag: "values",
  title: "Core Principles",
  // Four marquee rows, alternating scroll direction (right, left, right, left).
  rows: [
    [
      {
        name: "COLLABORATION",
        number: "01",
        text: "We build with you, not for you: shared boards, weekly working sessions, and decisions made together.",
      },
      {
        name: "EXCELLENCE",
        number: "02",
        text: "Senior-led craft on every screen: experienced developers and designers, with review on every detail before it ships.",
      },
      {
        name: "VISION",
        number: "03",
        text: "Every build starts from where your product is going, not just what it needs today.",
      },
      {
        name: "PASSION",
        number: "04",
        text: "We take on work we care about, and it shows in the finish of everything we ship.",
      },
    ],
    [
      {
        name: "CREATIVITY",
        number: "05",
        text: "Distinctive design over templates: every interface is drawn for your brand alone.",
      },
      {
        name: "INNOVATION",
        number: "06",
        text: "We keep learning new tools and techniques so your product ships on a modern stack.",
      },
      {
        name: "QUALITY",
        number: "07",
        text: "Structured workflows keep accuracy, consistency, and dependable delivery on every project.",
      },
      {
        name: "INTEGRITY",
        number: "08",
        text: "Honest scope, honest timelines, and dependable actions through every stage of a project.",
      },
    ],
    [
      {
        name: "IMPACT",
        number: "09",
        text: "Impact guides our work, transforming ideas into results-driven, creative, and purposeful solutions.",
      },
      {
        name: "STRATEGY",
        number: "10",
        text: "Strategy guides our decisions, ensuring creative solutions achieve impactful and measurable results.",
      },
      {
        name: "PRECISION",
        number: "11",
        text: "Attention to detail and precision help deliver exceptional and dependable project outcomes always.",
      },
      {
        name: "GROWTH",
        number: "12",
        text: "We achieve growth through feedback, learning, and improving processes for superior project results.",
      },
    ],
    [
      {
        name: "ORIGINALITY",
        number: "13",
        text: "Creative originality allows us to deliver designs that are distinctive, thoughtful, and impactful consistently.",
      },
      {
        name: "TRUST",
        number: "14",
        text: "We earn trust by maintaining integrity, transparency, and accountability in every creative decision.",
      },
      {
        name: "BOLDNESS",
        number: "15",
        text: "Boldness guides our work, helping us innovate, experiment, and exceed client expectations consistently.",
      },
      {
        name: "FOCUS",
        number: "16",
        text: "By maintaining focus, we produce high-quality work that achieves objectives and exceeds expectations.",
      },
    ],
  ] as ValueItem[][],
};

/* Fictional testimonial and team sections were removed entirely: Webify is a
   newly launched studio with zero clients, and no invented people may appear
   anywhere on the site. Add real sections here only when real feedback and
   real staff exist. */
