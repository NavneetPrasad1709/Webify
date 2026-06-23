"use client";

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
 * H6 - "How we work". Mobile-first 50/50 layout: on desktop the step heading
 * pins on the left (sticky) while its info scrolls on the right, then releases
 * to the next step - a calm sticky-scroll reveal. On mobile it stacks cleanly
 * (heading, then info). No decorative underline; metallic gradient headings.
 */
export function Process() {
  return (
    <section className="process text-[var(--color-bone)]" aria-label="How we work">
      {/* Intro */}
      <Container className="pt-[clamp(6rem,12vw,10rem)] pb-[clamp(2rem,5vw,3.5rem)]">
        <p className="pin-kicker mb-6 text-[var(--color-bone-dim)]">
          <span className="pin-star mr-3" />
          How we work
        </p>
        <h2 className="pin-display pin-fluid-1 max-w-[16ch] leading-[0.95]">
          A process built for <span className="script-accent">outcomes.</span>
        </h2>
      </Container>

      {/* Steps - 50/50 split, sticky heading on the left */}
      <Container className="pb-[clamp(4rem,10vw,8rem)]">
        <div className="border-t border-[var(--color-line)]">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="grid grid-cols-1 gap-7 border-b border-[var(--color-line)] py-12 sm:gap-9 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-20"
            >
              {/* Left - sticky heading + giant faded step numeral */}
              <div className="relative lg:sticky lg:top-28 lg:self-start">
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
                  <h3 className="pin-display pin-grad mt-4 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.9]">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Right - info in a frosted card */}
              <FadeUp>
                <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-9">
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
