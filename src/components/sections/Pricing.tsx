"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { pricingPlans } from "@/lib/data";
import PillButton from "@/components/ui/PillButton";

const cardStyles = {
  base: { card: "bg-fill-light text-ink", sub: "text-gray-mid", blurb: "text-black font-medium", check: "text-ink/70" },
  featured: { card: "bg-ink text-white", sub: "text-white", blurb: "text-white", check: "text-white" },
} as const;

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Entrance reveals.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      });
      gsap.fromTo(
        ".pricing-card",
        { ...revealFrom, y: 80 },
        {
          ...revealTo,
          stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="bg-white px-5 py-24 text-ink md:px-10 md:py-32"
    >
      <div ref={headerRef} className="text-center">
        <p className="eyebrow text-gray-mid">FOUNDING RATES, FIRST 10 PROJECTS</p>
        <h2 className="display-2 mt-4">Pricing</h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] font-medium text-black md:text-base">
          Every project is a fixed quote, agreed in writing before we start. No
          hourly surprises. Our first 10 projects ship at founding rates,
          locked for 12 months.
        </p>
      </div>

      <div ref={gridRef} className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const s = plan.featured ? cardStyles.featured : cardStyles.base;
          return (
            <article
              key={plan.name}
              className={`pricing-card flex flex-col rounded-card p-8 md:p-10 ${s.card} ${
                plan.featured ? "ring-1 ring-primary lg:-mt-6 lg:mb-6" : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-3xl font-extrabold tracking-tight">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-white">
                    Our recommended starting point
                  </span>
                )}
              </div>
              <p className={`mt-3 max-w-[32ch] text-sm ${s.blurb}`}>{plan.blurb}</p>

              <div className="mt-8">
                <p className={`text-xs font-semibold uppercase tracking-wider ${s.sub}`}>
                  Founding rate
                </p>
                <p className="mt-2 text-[clamp(30px,2.8vw,42px)] font-extrabold leading-none tracking-tight">
                  Fixed Quote
                </p>
                <p className={`mt-2 text-xs font-medium ${s.sub}`}>
                  Scoped in writing within 3 working days
                </p>
                <p className={`mt-1 text-sm font-medium ${s.sub}`}>{plan.timeline}</p>
              </div>

              {plan.featured ? (
                <PillButton
                  tone="white"
                  href="/contact"
                  className="mt-8 w-full justify-center text-ink!"
                >
                  Start a Project
                </PillButton>
              ) : (
                <PillButton tone="dark" href="/contact" className="mt-8 w-full justify-center">
                  Start a Project
                </PillButton>
              )}

              <p className={`eyebrow mt-10 ${s.sub}`}>Includes</p>
              <ul className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                    <span
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-current/40 text-[10px] ${s.check}`}
                    >
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-medium text-black">
        Every quote is fixed and scoped in writing before we start. You own everything we ship,
        backed by a 30-day post-launch window. These are founding-client rates for our first 10
        projects, and early clients keep them for 12 months. Need ongoing help after launch? We
        offer a light care retainer once your project is live.
      </p>
    </section>
  );
}
