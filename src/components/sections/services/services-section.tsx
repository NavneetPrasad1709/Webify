"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import "./services-section.css";

type Tone = "indigo" | "violet" | "slate";

type Service = {
  number: string;
  name: string;
  description: string;
  tone: Tone;
};

// [REBRAND] reference listed a 3D studio's services → Webify's real offerings.
const SERVICES: Service[] = [
  {
    number: "01",
    name: "AI Products",
    description:
      "Agents, copilots, and automation — built to run in production and judged on outcomes, not demos.",
    tone: "indigo",
  },
  {
    number: "02",
    name: "Web Apps",
    description:
      "Fast, accessible Next.js builds with real performance budgets and motion that serves the story.",
    tone: "slate",
  },
  {
    number: "03",
    name: "Mobile Apps",
    description:
      "One codebase, a native feel. Cross-platform apps your users open daily — no agency overhead.",
    tone: "violet",
  },
  {
    number: "04",
    name: "Product Design",
    description:
      "Research, flows, and design systems — refined until the product feels obvious to use.",
    tone: "slate",
  },
  {
    number: "05",
    name: "MVP Sprints",
    description:
      "Idea to live in weeks. A real, usable product in front of users — then we iterate.",
    tone: "indigo",
  },
];

const INK = "#0C0C0C";
const CARD_TEXT = "#f4f4f5";
const TONES: Record<Tone, { dot: string; wash: string }> = {
  indigo: { dot: "#6366f1", wash: "#15162b" },
  violet: { dot: "#8b5cf6", wash: "#1b1430" },
  slate: { dot: "#64748b", wash: "#15181f" },
};
const pad2 = (n: number) => String(n).padStart(2, "0");

export function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" className="relative" style={{ backgroundColor: INK }} aria-label="Services">
      {/* Header */}
      <div className="mx-auto max-w-[1100px] px-5 pt-20 pb-2 sm:px-8 sm:pt-28 sm:pb-6">
        <h2
          className="text-center font-black uppercase text-white"
          style={{ fontSize: "clamp(2.75rem, 12vw, 160px)", letterSpacing: "-0.03em" }}
        >
          Services
        </h2>
      </div>

      {/* Stacking cards */}
      <div ref={container} className="relative pb-[6vh]">
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
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const zoom = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const stackScale = useTransform(progress, range, [1, targetScale]);

  const tone = TONES[service.tone];

  return (
    <div ref={ref} className="sticky top-0 flex h-screen items-start justify-center px-4 pt-[92px] sm:px-6">
      <motion.div
        style={{
          scale: reduce ? 1 : stackScale,
          top: reduce ? 0 : `${i * 22}px`,
          background: `linear-gradient(155deg, #121217 0%, ${tone.wash} 140%)`,
        }}
        className="relative h-[62vh] max-h-[600px] w-full max-w-[1100px] origin-top overflow-hidden rounded-[32px] ring-1 ring-white/[0.08] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] sm:h-[72vh] sm:max-h-[680px] sm:rounded-[40px]"
      >
        {/* zoom-parallax outline numeral */}
        <motion.div style={{ scale: reduce ? 1 : zoom }} className="absolute inset-0">
          <span
            aria-hidden
            className="svc-card-outline pointer-events-none absolute -bottom-[0.16em] -right-[0.04em] select-none font-black leading-none"
            style={{ fontSize: "clamp(16rem, 42vw, 34rem)" }}
          >
            {Number(service.number)}
          </span>
        </motion.div>

        {/* grain */}
        <div className="svc-card-grain" aria-hidden />

        {/* content */}
        <div className="relative z-10 flex h-full flex-col p-8 sm:p-12 md:p-16">
          {/* label + accent + hairline */}
          <div>
            <div className="flex items-center justify-between">
              <span
                className="font-medium uppercase"
                style={{
                  color: CARD_TEXT,
                  opacity: 0.5,
                  fontSize: "clamp(0.78rem, 2.4vw, 0.85rem)",
                  letterSpacing: "0.2em",
                }}
              >
                Service — {service.number} / {pad2(total)}
              </span>
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: tone.dot, boxShadow: `0 0 0 4px ${tone.dot}1f` }}
              />
            </div>
            <div className="mt-5 h-px w-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
          </div>

          {/* number + name + description */}
          <div className="flex flex-1 flex-col justify-center gap-4 sm:flex-row sm:items-center sm:gap-8 md:gap-12">
            <span
              className="nums shrink-0 font-black leading-none"
              style={{ color: CARD_TEXT, fontSize: "clamp(5rem, 18vw, 140px)", letterSpacing: "-0.04em" }}
            >
              {service.number}
            </span>
            <div className="flex min-w-0 flex-col gap-3">
              <h3
                className="font-semibold uppercase"
                style={{ color: CARD_TEXT, fontSize: "clamp(1.75rem, 6vw, 2.25rem)", letterSpacing: "-0.01em" }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-normal leading-relaxed"
                style={{ color: CARD_TEXT, opacity: 0.92, fontSize: "clamp(1.1875rem, 3.8vw, 1.3125rem)" }}
              >
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
