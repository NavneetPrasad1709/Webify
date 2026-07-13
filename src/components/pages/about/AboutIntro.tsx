"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";
import { aboutIntro, resultsSection, type TemplateCard } from "@/lib/pages/about";

const cardTones: Record<TemplateCard["tone"], string> = {
  lime: "bg-lime text-ink",
  light: "bg-fill-light text-ink",
  blue: "bg-primary text-white",
};

function StatCard({ card }: { card: TemplateCard }) {
  const isBlue = card.tone === "blue";
  const dim = isBlue ? "text-white" : "text-black font-medium";

  return (
    <article
      data-template-card
      className={`flex min-h-[300px] flex-col justify-between rounded-card p-7 md:min-h-[356px] md:p-8 ${cardTones[card.tone]}`}
    >
      <div>
        <p className={`text-base font-semibold ${isBlue ? "text-white" : "text-ink"}`}>
          {card.bold}
        </p>
        <p className={`text-base ${dim}`}>{card.sub}</p>
      </div>

      {card.stat ? (
        <div>
          <h3 className="text-[clamp(44px,4.5vw,64px)] font-bold leading-none tracking-tight">
            {card.stat}
          </h3>
          <p className="mt-4 max-w-[240px] text-sm font-medium leading-relaxed">
            {card.text}
          </p>
        </div>
      ) : (
        <div>
          <p className="mb-7 max-w-[220px] text-[clamp(19px,1.6vw,24px)] font-medium leading-snug text-white">
            {card.text}
          </p>
          <PillButton tone="white" href="/contact">
            {card.cta}
          </PillButton>
        </div>
      )}
    </article>
  );
}

export default function AboutIntro() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-about-text]", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: "[data-about-text]", start: "top 80%" },
      });

      gsap.fromTo(
        "[data-template-card]",
        { ...revealFrom, y: 80 },
        {
          ...revealTo,
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-template-grid]", start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white pb-24 pt-16 text-ink md:pb-32 md:pt-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* ABOUT US intro copy */}
        <div data-about-text className="mb-20 md:mb-28">
          <p className="eyebrow mb-6 text-gray-mid">{aboutIntro.tag}</p>
          <h2 className="max-w-[1000px] text-[clamp(24px,2.8vw,40px)] font-semibold leading-[1.3] text-black">
            {aboutIntro.text}
          </h2>
        </div>

        {/* Results stat cards */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <div className="flex shrink-0 items-center gap-10">
            <p className="eyebrow text-gray-mid">{resultsSection.tagLeft}</p>
            <p className="eyebrow text-ink">{resultsSection.tagRight}</p>
          </div>

          <div
            data-template-grid
            className="grid flex-1 gap-4 md:max-w-[888px] md:grid-cols-3 md:ml-auto"
          >
            {resultsSection.cards.map((card) => (
              <StatCard key={card.bold} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
