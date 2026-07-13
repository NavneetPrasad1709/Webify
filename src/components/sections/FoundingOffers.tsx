"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { foundingOffers } from "@/lib/data";
import PillButton from "@/components/ui/PillButton";

const toneStyles: Record<
  (typeof foundingOffers)[number]["tone"],
  { card: string; body: string }
> = {
  light: { card: "bg-fill-light text-ink", body: "text-black font-medium" },
  blue: { card: "bg-primary text-white", body: "text-white" },
  dark: { card: "bg-ink text-white", body: "text-white" },
  lime: { card: "bg-lime text-ink", body: "text-black font-medium" },
};

export default function FoundingOffers() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Each card blur-reveals as it individually enters the viewport.
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { ...revealFrom, y: 100 },
          {
            ...revealTo,
            // Clear GSAP's inline transform on complete so the CSS
            // hover:-translate-y-1 lift on the card can take effect.
            clearProps: "all",
            scrollTrigger: { trigger: card, start: "top 80%" },
          }
        );
      });

      // Pinned title recedes (scale + fade) as the card stack scrolls over it.
      if (titleRef.current && cardsRef.current) {
        gsap.to(titleRef.current, {
          scale: 0.92,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white pt-24 md:pt-28 pb-24 md:pb-32 text-ink"
    >
      <div
        ref={titleRef}
        className="pointer-events-none sticky top-[22vh] z-0 px-5 text-center"
      >
        <p className="eyebrow mb-4 text-gray-mid">FOUNDING CLIENTS</p>
        <h2 className="display-2 text-ink">BE ONE OF OUR</h2>
        <h2 className="display-2 text-primary">FIRST CLIENTS</h2>
      </div>

      <div
        ref={cardsRef}
        className="relative z-10 mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2 md:gap-10"
      >
        {foundingOffers.map((offer, i) => {
          const tone = toneStyles[offer.tone];
          const offset =
            i === 0
              ? "mt-[12vh] md:mt-[34vh]"
              : i === 1
                ? "md:mt-[48vh]"
                : i % 2 === 0
                  ? "md:mt-24"
                  : "";

          return (
            <article
              key={offer.tag}
              data-card
              className={`flex min-h-0 flex-col justify-between gap-10 rounded-card p-7 transition-[translate] duration-300 hover:-translate-y-1 md:min-h-80 md:p-10 ${tone.card} ${offset}`}
            >
              <p className="eyebrow uppercase opacity-60">{offer.tag}</p>

              <h3 className="text-[clamp(19px,1.8vw,26px)] font-semibold leading-snug tracking-tight">
                {offer.title}
              </h3>

              <p className={`text-base ${tone.body}`}>{offer.body}</p>
            </article>
          );
        })}
      </div>

      {/* The hardest sell on the page should not end without an ask */}
      <div className="relative z-10 mt-14 flex flex-col items-center gap-4 px-5 text-center md:mt-20">
        <p className="max-w-md text-base font-medium text-black">
          Founding rates for our first 10 projects, locked for 12 months.
        </p>
        <PillButton tone="blue" href="/contact">
          Start a Project
        </PillButton>
      </div>
    </section>
  );
}
