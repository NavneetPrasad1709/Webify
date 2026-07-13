"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";
import { techStack } from "@/lib/pages/service";

/* Flexible technology stack, grouped by project scale. Dark section; the
   monochrome stack marks are recoloured to a dark-safe brand tint through the
   shared `orbit-ico` mask so each glyph reads on ink. */
export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-tech-head]",
        revealFrom,
        {
          ...revealTo,
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(
        "[data-tech-card]",
        { y: 40, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-tech-grid]", start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-ink py-24 text-white md:py-32"
    >
      <div className="mx-auto w-[min(94%,1320px)]">
        <p data-tech-head className="eyebrow text-white">
          {techStack.eyebrow}
        </p>
        <div className="mt-6 flex flex-col gap-8 md:mt-9 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <h2 data-tech-head className="display-2 text-white">
            {techStack.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p data-tech-head className="max-w-sm text-lg leading-snug text-white lg:pb-2">
            {techStack.note}
          </p>
        </div>

        <div
          data-tech-grid
          className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3"
        >
          {techStack.tiers.map((tier) => (
            <div
              key={tier.tier}
              data-tech-card
              className="flex flex-col rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold tracking-tight text-white">
                  {tier.tier}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-white">
                  Stack
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-snug text-white">
                {tier.note}
              </p>

              <div className="mt-7 flex flex-col gap-2.5">
                {tier.stack.map((t) => (
                  <div
                    key={`${tier.tier}-${t.slug}`}
                    className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
                  >
                    <span
                      aria-hidden="true"
                      className="orbit-ico h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={
                        {
                          WebkitMaskImage: `url(/assets/stack/${t.slug}.svg)`,
                          maskImage: `url(/assets/stack/${t.slug}.svg)`,
                          "--brand": t.brand,
                        } as React.CSSProperties
                      }
                    />
                    <span className="font-medium text-white">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          data-tech-head
          className="mt-12 flex flex-col items-start gap-6 md:mt-16 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-lg text-lg leading-snug text-white">
            Not sure which fits? We will map the right stack to your goals on the
            first call.
          </p>
          <PillButton tone="white" href={techStack.ctaHref}>
            {techStack.ctaLabel}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
