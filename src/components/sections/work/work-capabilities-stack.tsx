"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * /work capabilities as a sticky-stacking card deck (same scroll-scale pattern as
 * the home Services section). Dark cards on the light /work canvas - each pins,
 * the next slides up and scales the stack, forming a layered deck. Reduced-motion
 * keeps the stack but skips the scale.
 */
type Tone = "indigo" | "violet" | "sky" | "emerald";

type Capability = {
  number: string;
  name: string;
  description: string;
  includes: string[];
  tone: Tone;
};

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    name: "AI Products",
    description:
      "Agents, copilots, RAG, and ML features wired into real products - built to run in production and judged on outcomes, not demos.",
    includes: ["LLM apps & agents", "RAG & data pipelines", "Evals & guardrails"],
    tone: "indigo",
  },
  {
    number: "02",
    name: "Web Platforms",
    description:
      "Next.js sites, SaaS, and dashboards engineered to perform and convert - fast first paint, real performance budgets, motion that serves the story.",
    includes: ["Next.js / React", "Design systems", "Core Web Vitals"],
    tone: "sky",
  },
  {
    number: "03",
    name: "Mobile Apps",
    description:
      "iOS & Android with React Native - one codebase, a native feel, offline-ready, and smooth on the mid-range phones your users actually carry.",
    includes: ["React Native / Expo", "Native gestures", "Offline-first"],
    tone: "violet",
  },
  {
    number: "04",
    name: "Product Design",
    description:
      "Research, flows, and design systems - refined until the product feels obvious to use and the brand feels inevitable.",
    includes: ["UX research", "UI systems", "Prototypes"],
    tone: "emerald",
  },
  {
    number: "05",
    name: "MVP Sprints",
    description:
      "Zero to one in weeks. A working, demo-able product in front of real users - fixed scope, fixed price, agreed before we start.",
    includes: ["4-6 week builds", "Fixed price", "Real users, fast"],
    tone: "indigo",
  },
  {
    number: "06",
    name: "AI Automation",
    description:
      "Internal tools and workflows that buy back your team's time - the repetitive work routed, automated, and measured.",
    includes: ["Workflow automation", "Internal tools", "Integrations"],
    tone: "sky",
  },
];

const TONES: Record<Tone, { dot: string; wash: string }> = {
  indigo: { dot: "#6366f1", wash: "#15162b" },
  violet: { dot: "#8b5cf6", wash: "#1b1430" },
  sky: { dot: "#38bdf8", wash: "#0f1f2b" },
  emerald: { dot: "#34d399", wash: "#0f2018" },
};

export function WorkCapabilitiesStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative pb-[6vh]">
      {CAPABILITIES.map((cap, i) => (
        <Card
          key={cap.number}
          i={i}
          total={CAPABILITIES.length}
          cap={cap}
          progress={scrollYProgress}
          range={[i / CAPABILITIES.length, 1]}
          targetScale={1 - (CAPABILITIES.length - 1 - i) * 0.045}
        />
      ))}
    </div>
  );
}

function Card({
  i,
  total,
  cap,
  progress,
  range,
  targetScale,
}: {
  i: number;
  total: number;
  cap: Capability;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const reduce = useReducedMotion();
  const stackScale = useTransform(progress, range, [1, targetScale]);
  const tone = TONES[cap.tone];

  return (
    <div className="sticky top-0 flex h-screen items-start justify-center px-3 pt-[92px] sm:px-6">
      <motion.div
        style={{
          scale: reduce ? 1 : stackScale,
          top: reduce ? 0 : `${i * 22}px`,
          background: `linear-gradient(155deg, #0e0e13 0%, ${tone.wash} 150%)`,
        }}
        className="relative h-[62vh] max-h-[560px] w-full max-w-[1100px] origin-top overflow-hidden rounded-[32px] ring-1 ring-white/[0.08] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.45)] sm:h-[68vh] sm:max-h-[620px] sm:rounded-[40px]"
      >
        <div className="relative z-10 flex h-full flex-col p-8 sm:p-12 md:p-16">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[clamp(0.72rem,2.2vw,0.82rem)] font-medium uppercase tracking-[0.2em] text-white/45">
                Capability - {cap.number} / {String(total).padStart(2, "0")}
              </span>
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: tone.dot, boxShadow: `0 0 0 4px ${tone.dot}1f` }}
              />
            </div>
            <div className="mt-5 h-px w-full bg-white/10" />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-5 sm:flex-row sm:items-center sm:gap-10 md:gap-14">
            <span
              className="nums shrink-0 font-black leading-none text-white/90"
              style={{ fontSize: "clamp(4.5rem,16vw,128px)", letterSpacing: "-0.04em" }}
            >
              {cap.number}
            </span>
            <div className="flex min-w-0 flex-col gap-4">
              <h3
                className="font-semibold uppercase text-white"
                style={{ fontSize: "clamp(1.75rem,6vw,2.5rem)", letterSpacing: "-0.01em" }}
              >
                {cap.name}
              </h3>
              <p
                className="max-w-2xl leading-relaxed text-white/80"
                style={{ fontSize: "clamp(1.0625rem,3.4vw,1.25rem)" }}
              >
                {cap.description}
              </p>
              <ul className="mt-1 flex flex-wrap gap-2.5">
                {cap.includes.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/75"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
