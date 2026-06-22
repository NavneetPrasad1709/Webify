"use client";

import StickyTabs from "@/components/ui/sticky-section-tabs";
import { Container } from "@/components/ui/Container";
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
    lead: "We immerse ourselves in your market, audience and ambitions — surfacing the real problem worth solving before any work begins.",
    deliverables: ["Research", "Audit", "Insights brief"],
  },
  {
    id: "strategy",
    num: "02",
    title: "Strategy",
    lead: "Findings become a sharp, opinionated plan: positioning, narrative and the metrics that matter — with a path engineered to move them.",
    deliverables: ["Positioning", "Roadmap", "KPIs"],
  },
  {
    id: "design",
    num: "03",
    title: "Design",
    lead: "Strategy takes visual form — a distinct system of type, motion and interface, tested against real intent rather than taste alone.",
    deliverables: ["Art direction", "UI system", "Prototype"],
  },
  {
    id: "build",
    num: "04",
    title: "Build",
    lead: "We build lean, accessible and fast — engineering that ships green on Core Web Vitals and renders flawlessly on every screen.",
    deliverables: ["Development", "CMS", "QA"],
  },
  {
    id: "launch",
    num: "05",
    title: "Launch",
    lead: "We ship with confidence and stay close — measured, monitored and refined, the work keeps compounding long after release.",
    deliverables: ["Deploy", "Analytics", "Iteration"],
  },
];

export function Process() {
  return (
    <section className="process bg-[var(--color-ink)] text-[var(--color-bone)]" aria-label="How we work">
      {/* Intro */}
      <Container className="pt-[clamp(6rem,12vw,10rem)] pb-[clamp(2.5rem,6vw,4.5rem)]">
        <p className="pin-kicker mb-6 text-[var(--color-bone-dim)]">
          <span className="pin-star mr-3" />
          How we work
        </p>
        <h2 className="pin-display pin-fluid-1 max-w-[16ch] leading-[0.95]">
          A process built for{" "}
          <span className="script-accent">outcomes.</span>
        </h2>
      </Container>

      {/* Sticky section tabs */}
      <StickyTabs
        mainNavHeight="0px"
        rootClassName="bg-[var(--color-ink)] text-[var(--color-bone)]"
        sectionClassName="bg-[var(--color-ink)]"
        stickyHeaderContainerClassName=""
        /* Opaque bar (no translucency) so scrolling content can't bleed through;
           sticks at the very top + clears the transparent nav via pt so content
           hides cleanly behind it. */
        headerContentWrapperClassName="border-b border-[var(--color-line)] bg-[var(--color-ink)]"
        headerContentLayoutClassName="mx-auto w-full max-w-[1400px] px-6 pb-5 pt-[5.25rem] sm:px-8 lg:px-16"
        titleClassName="pin-display text-[clamp(2.5rem,7vw,6rem)] leading-none text-[var(--color-bone)]"
        contentLayoutClassName="mx-auto w-full max-w-[1400px] px-6 py-12 sm:px-8 md:py-16 lg:px-16"
      >
        {STEPS.map((step) => {
          return (
            <StickyTabs.Item
              key={step.id}
              id={step.id}
              title={
                <span className="flex items-baseline gap-3 sm:gap-4">
                  <span className="font-mono text-[0.5em] tracking-widest text-[var(--color-accent)]">
                    {step.num}
                  </span>
                  <span>{step.title}</span>
                </span>
              }
            >
              <div className="grid min-h-[46vh] gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <p className="max-w-3xl text-[clamp(1.75rem,3.4vw,3rem)] font-light leading-[1.28] text-[var(--color-bone)]">
                    {step.lead}
                  </p>
                </div>
                <aside className="lg:col-span-5 lg:border-l lg:border-[var(--color-line)] lg:pl-16">
                  <p className="pin-kicker mb-6 text-[var(--color-bone-faint)]">Deliverables</p>
                  <ul className="space-y-4">
                    {step.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-4 text-[clamp(1.15rem,1.6vw,1.5rem)] text-[var(--color-bone-dim)]"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                          aria-hidden
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </StickyTabs.Item>
          );
        })}
      </StickyTabs>
    </section>
  );
}
