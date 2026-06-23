"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { SparklesTitle } from "@/components/ui/sparkles-title";
import {
  Sparkles,
  Globe,
  Smartphone,
  PenTool,
  TrendingUp,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import "./services-section.css";

type Tone = "indigo" | "violet" | "slate";

type Service = {
  number: string;
  name: string;
  description: string;
  tone: Tone;
  icon: LucideIcon;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    number: "01",
    name: "AI Solutions",
    description:
      "Agents, copilots, and automation - built to run in production and judged on outcomes, not demos.",
    tone: "indigo",
    icon: Sparkles,
    tags: ["LLM agents", "RAG pipelines", "Automation"],
  },
  {
    number: "02",
    name: "Web & SaaS",
    description:
      "Fast Next.js websites, SaaS platforms, and dashboards - engineered to perform and convert.",
    tone: "slate",
    icon: Globe,
    tags: ["Next.js", "Dashboards", "Web apps"],
  },
  {
    number: "03",
    name: "Mobile Apps",
    description:
      "One codebase, a native feel. Cross-platform iOS & Android apps your users open daily.",
    tone: "violet",
    icon: Smartphone,
    tags: ["iOS & Android", "React Native", "Offline-ready"],
  },
  {
    number: "04",
    name: "Design & Branding",
    description:
      "Identity, UI, and design systems - refined until the product feels obvious and the brand inevitable.",
    tone: "slate",
    icon: PenTool,
    tags: ["Identity", "UI systems", "Prototypes"],
  },
  {
    number: "05",
    name: "SEO & Marketing",
    description:
      "SEO, content, and digital marketing that brings qualified traffic - and turns it into customers.",
    tone: "indigo",
    icon: TrendingUp,
    tags: ["SEO", "Content", "Growth"],
  },
  {
    number: "06",
    name: "MVP Sprints",
    description:
      "Idea to live in weeks. A real, usable product in front of users - then we iterate.",
    tone: "violet",
    icon: Rocket,
    tags: ["4-6 weeks", "Fixed price", "Real users"],
  },
];

const CARD_TEXT = "#0f1115"; // dark ink for the light cards
const TONES: Record<Tone, { dot: string; wash: string }> = {
  indigo: { dot: "#6366f1", wash: "#ecebfa" },
  violet: { dot: "#8b5cf6", wash: "#f1e9fb" },
  slate: { dot: "#64748b", wash: "#eef1f6" },
};
const pad2 = (n: number) => String(n).padStart(2, "0");

export function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" className="relative" aria-label="Services">
      {/* Header (small beam keeps the heading close to the cards) */}
      <div className="mx-auto max-w-[1100px] px-5 pt-24 pb-8 sm:px-8 sm:pt-32 sm:pb-10">
        <SparklesTitle
          as="h2"
          className="text-center font-black uppercase tracking-[-0.03em] text-white text-[clamp(2.75rem,12vw,160px)]"
          beamClassName="mx-auto mt-0 h-8 max-w-[26rem]"
          density={36}
        >
          Services
        </SparklesTitle>
      </div>

      {/* Stacking cards */}
      <div ref={container} className="relative pb-20 sm:pb-28">
        {SERVICES.map((service, i) => (
          <Card
            key={service.number}
            i={i}
            total={SERVICES.length}
            service={service}
            progress={scrollYProgress}
            range={[i / SERVICES.length, 1]}
            targetScale={1 - (SERVICES.length - 1 - i) * 0.05}
          />
        ))}
      </div>
    </section>
  );
}

function Card({
  i,
  total,
  service,
  progress,
  range,
  targetScale,
}: {
  i: number;
  total: number;
  service: Service;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const reduce = useReducedMotion();
  // Single scroll-linked transform per card (the decorative background-numeral
  // zoom was removed — two scrubbed transforms per card was the jitter source
  // under Lenis). transform is GPU-composited via willChange.
  const stackScale = useTransform(progress, range, [1, targetScale]);

  const tone = TONES[service.tone];
  const Icon = service.icon;

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4 pb-28 pt-24 sm:items-start sm:pb-0 sm:pt-23 sm:px-6">
      <motion.div
        style={{
          scale: reduce ? 1 : stackScale,
          top: reduce ? 0 : `${i * 22}px`,
          background: `linear-gradient(155deg, #ffffff 0%, ${tone.wash} 150%)`,
          willChange: "transform",
        }}
        className="relative h-auto min-h-[42vh] w-full max-w-[1100px] origin-top overflow-hidden rounded-[32px] ring-1 ring-black/[0.06] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.45)] sm:h-[72vh] sm:min-h-0 sm:max-h-[680px] sm:rounded-[40px]"
      >
        {/* static giant numeral (no scroll-zoom) */}
        <span
          aria-hidden
          className="svc-card-outline pointer-events-none absolute -bottom-[0.16em] -right-[0.04em] select-none font-black leading-none"
          style={{ fontSize: "clamp(9rem, 36vw, 34rem)" }}
        >
          {Number(service.number)}
        </span>

        {/* grain */}
        <div className="svc-card-grain" aria-hidden />

        {/* content */}
        <div className="relative z-10 flex h-full flex-col p-7 sm:p-12 md:p-16">
          {/* header: label + faint index number */}
          <div className="flex items-start justify-between">
            <span
              className="font-mono font-medium uppercase"
              style={{
                color: CARD_TEXT,
                opacity: 0.5,
                fontSize: "clamp(0.72rem, 2.4vw, 0.85rem)",
                letterSpacing: "0.2em",
              }}
            >
              Service {service.number} / {pad2(total)}
            </span>
            <span
              aria-hidden
              className="nums font-black leading-none"
              style={{ color: tone.dot, opacity: 0.22, fontSize: "clamp(2.25rem, 9vw, 3.75rem)", letterSpacing: "-0.04em" }}
            >
              {service.number}
            </span>
          </div>

          {/* main: icon -> name -> description -> tags (scannable, content-led).
              Mobile flows naturally from the header; desktop anchors to the
              bottom (poster) via mt-auto. */}
          <div className="flex flex-col gap-4 pt-7 sm:mt-auto sm:gap-5 sm:pt-12">
            <span
              className="flex shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: `${tone.dot}1f`,
                color: tone.dot,
                width: "clamp(3rem, 11vw, 3.75rem)",
                height: "clamp(3rem, 11vw, 3.75rem)",
              }}
            >
              <Icon className="h-1/2 w-1/2" strokeWidth={2.1} aria-hidden />
            </span>

            <h3
              className="font-semibold uppercase"
              style={{ color: CARD_TEXT, fontSize: "clamp(1.9rem, 6.5vw, 2.85rem)", letterSpacing: "-0.01em", lineHeight: 1.02 }}
            >
              {service.name}
            </h3>

            <p
              className="max-w-md font-normal leading-relaxed sm:max-w-lg"
              style={{ color: CARD_TEXT, opacity: 0.8, fontSize: "clamp(1.2rem, 3.6vw, 1.45rem)" }}
            >
              {service.description}
            </p>

            <ul className="mt-1 flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full font-medium"
                  style={{
                    border: `1px solid ${tone.dot}40`,
                    background: `${tone.dot}12`,
                    color: CARD_TEXT,
                    fontSize: "clamp(0.85rem, 2.6vw, 0.95rem)",
                    padding: "0.4em 0.85em",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
