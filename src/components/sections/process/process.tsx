"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/sections/cta/fade-up";
import "./process.css";

type Step = {
  id: string;
  num: string;
  title: string;
  lead: string;
  deliverables: string[];
};

const STEPS: Step[] = [
  {
    id: "discover",
    num: "01",
    title: "Discover",
    lead: "We immerse ourselves in your market, audience and ambitions - surfacing the real problem worth solving before any work begins.",
    deliverables: ["Research", "Audit", "Insights brief"],
  },
  {
    id: "strategy",
    num: "02",
    title: "Strategy",
    lead: "Findings become a sharp, opinionated plan: positioning, narrative and the metrics that matter - with a path engineered to move them.",
    deliverables: ["Positioning", "Roadmap", "KPIs"],
  },
  {
    id: "design",
    num: "03",
    title: "Design",
    lead: "Strategy takes visual form - a distinct system of type, motion and interface, tested against real intent rather than taste alone.",
    deliverables: ["Art direction", "UI system", "Prototype"],
  },
  {
    id: "build",
    num: "04",
    title: "Build",
    lead: "We build lean, accessible and fast - engineering that ships green on Core Web Vitals and renders flawlessly on every screen.",
    deliverables: ["Development", "CMS", "QA"],
  },
  {
    id: "launch",
    num: "05",
    title: "Launch",
    lead: "We ship with confidence and stay close - measured, monitored and refined, the work keeps compounding long after release.",
    deliverables: ["Deploy", "Analytics", "Iteration"],
  },
];

/**
 * H6 - "How we work". 50/50 layout, mobile-first: each step's heading pins on the
 * left while its info scrolls on the right. A scroll-driven progress rail (a
 * glowing dot travels as an accent line fills) runs down the left on desktop, and
 * the metallic headings carry a slow sheen sweep - the section's wow factor.
 */
export function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 40%", "end 65%"],
  });
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="process text-[var(--color-bone)]" aria-label="How we work">
      {/* Intro */}
      <Container className="pt-24 pb-10 sm:pt-32 sm:pb-12">
        <p className="pin-kicker mb-6 text-[var(--color-bone-dim)]">
          <span className="pin-star mr-3" />
          How we work
        </p>
        <h2 className="pin-display pin-fluid-1 max-w-[16ch] leading-[0.95]">
          A process built for <span className="script-accent">outcomes.</span>
        </h2>
      </Container>

      {/* Steps - 50/50 split with a scroll-driven progress rail */}
      <Container className="pb-20 sm:pb-28">
        <div ref={railRef} className="relative border-t border-[var(--color-line)] pl-7 lg:pl-16">
          {/* Progress rail (mobile + desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1 top-0 block w-px overflow-visible bg-[var(--color-line-strong)]"
          >
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[var(--color-accent)] via-[#818cf8] to-[#8b5cf6]"
            />
            <motion.div
              style={{ top: dotTop }}
              className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_20px_6px_rgba(99,102,241,0.55)]"
            />
          </div>

          {STEPS.map((step) => (
            <div
              key={step.id}
              className="border-b border-[var(--color-line)] py-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-20"
            >
              {/* Left - sticky heading + giant faded step numeral. Pins on mobile
                  AND desktop; the solid bg keeps the card from showing through it
                  while it's pinned. (Block layout on mobile gives the sticky
                  element room to travel; grid restores the 50/50 split on lg.) */}
              <div className="sticky top-20 z-20 self-start bg-[var(--surface-0)] py-3 lg:top-28 lg:z-auto lg:bg-transparent lg:py-0">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-1 -top-6 select-none font-black leading-none text-white/[0.04] sm:-top-10"
                  style={{ fontSize: "clamp(8rem,20vw,17rem)" }}
                >
                  {step.num}
                </span>
                <div className="relative">
                  <span className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)] sm:text-sm">
                    <span className="h-px w-7 bg-[var(--color-accent)]" aria-hidden />
                    Step {step.num}
                  </span>
                  <h3 className="pin-display pin-grad mt-4 text-[clamp(3.5rem,9vw,7rem)] leading-[0.9]">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Right - info in a frosted card */}
              <FadeUp className="mt-7 lg:mt-0">
                <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white/[0.04] p-6 sm:p-9">
                  <p className="text-[clamp(1.3rem,2.2vw,1.9rem)] font-light leading-[1.35] text-[var(--color-bone)]">
                    {step.lead}
                  </p>
                  <div className="mt-7 border-t border-[var(--color-line)] pt-6">
                    <p className="pin-kicker mb-4 text-[var(--color-bone-faint)]">Deliverables</p>
                    <ul className="flex flex-wrap gap-2.5">
                      {step.deliverables.map((d) => (
                        <li
                          key={d}
                          className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-line-strong)] bg-white/[0.03] px-4 py-2 text-[clamp(0.95rem,1.4vw,1.1rem)] text-[var(--color-bone-dim)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:bg-white/[0.07] hover:text-[var(--color-bone)]"
                        >
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                            aria-hidden
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
