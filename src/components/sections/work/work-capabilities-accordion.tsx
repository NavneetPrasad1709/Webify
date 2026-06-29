"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SparklesTitle } from "@/components/ui/sparkles-title";

type Cap = { num: string; title: string; lead: string; includes: string[] };

// Capabilities content (no long dashes; site font / large type).
const CAPS: Cap[] = [
  {
    num: "01",
    title: "AI Products",
    lead: "Agents, copilots, RAG and ML features wired into real products. Built to run in production and judged on outcomes, not demos.",
    includes: ["LLM apps & agents", "RAG & data pipelines", "Evals & guardrails"],
  },
  {
    num: "02",
    title: "Web Platforms",
    lead: "Next.js sites, SaaS and dashboards engineered to perform and convert. Fast first paint, real performance budgets, motion that serves the story.",
    includes: ["Next.js / React", "Design systems", "Core Web Vitals"],
  },
  {
    num: "03",
    title: "Mobile Apps",
    lead: "iOS and Android with React Native. One codebase, a native feel, offline ready and smooth on the mid-range phones your users actually carry.",
    includes: ["React Native / Expo", "Native gestures", "Offline ready"],
  },
  {
    num: "04",
    title: "Product Design",
    lead: "Research, flows and design systems, refined until the product feels obvious to use and the brand feels inevitable.",
    includes: ["UX research", "UI systems", "Prototypes"],
  },
  {
    num: "05",
    title: "MVP Sprints",
    lead: "Zero to one in weeks. A working, demo-able product in front of real users, with fixed scope and fixed price agreed before we start.",
    includes: ["4 to 6 week builds", "Fixed price", "Real users, fast"],
  },
  {
    num: "06",
    title: "AI Automation",
    lead: "Internal tools and workflows that buy back your team's time. The repetitive work routed, automated and measured.",
    includes: ["Workflow automation", "Internal tools", "Integrations"],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Animated hairline that draws in from the left when it scrolls into view. */
function Separator({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.span
      aria-hidden
      className="block h-px w-full origin-left bg-black/15"
      initial={reduce ? undefined : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
    />
  );
}

export function WorkCapabilitiesAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Container className="py-16 sm:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
        Capabilities
      </p>
      <SparklesTitle
        as="h2"
        className="mt-4 max-w-[16ch] font-black uppercase leading-[0.95] tracking-tight text-[#0d0d0d] text-[clamp(2.5rem,8vw,6rem)]"
        beamClassName="mx-0 mr-auto mt-1 max-w-[22rem]"
        sparkleColor="#4f46e5"
        density={32}
      >
        Six ways we <span className="script-accent script-accent-ink">ship.</span>
      </SparklesTitle>

      <div className="mt-12 sm:mt-16">
        {CAPS.map((cap, i) => {
          const isOpen = open === i;
          return (
            <div key={cap.num}>
              <Separator reduce={reduce} />
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-5 py-7 text-left transition-colors duration-300 hover:bg-black/[0.03] sm:gap-8 sm:py-9"
              >
                <span className="flex items-baseline gap-5 sm:gap-9">
                  <span className="nums font-mono text-sm text-black/40 sm:text-base">
                    {cap.num}
                  </span>
                  <span className="font-black uppercase leading-none tracking-tight text-[#0d0d0d] text-[clamp(1.9rem,5.5vw,4rem)]">
                    {cap.title}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`shrink-0 text-3xl font-light leading-none text-[#0d0d0d] transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-2xl pb-9 pl-[2.75rem] sm:pl-[5.5rem]">
                      <p className="text-[clamp(1.1rem,2vw,1.45rem)] leading-relaxed text-black/70">
                        {cap.lead}
                      </p>
                      <ul className="mt-6 flex flex-wrap gap-2.5">
                        {cap.includes.map((it) => (
                          <li
                            key={it}
                            className="rounded-full border border-black/15 bg-black/[0.04] px-4 py-1.5 text-sm text-black/70"
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <Separator reduce={reduce} />
      </div>
    </Container>
  );
}
