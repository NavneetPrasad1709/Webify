"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";
import { listingHero } from "@/lib/pages/service";

/* Services banner - dark, editorial. Title lines rise out of clip masks (the
   site's signature line-mask reveal), the banner loop blurs in and drifts on
   scroll. Reduced motion drops straight to the resting state. */
export default function ServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      gsap.fromTo(
        ".svc-hero-line",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.1, delay: 0.05 }
      );
      gsap.fromTo(
        "[data-hero-fade]",
        { y: 24, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-ink pb-20 pt-32 text-white md:pb-28 md:pt-40"
    >
      <div className="mx-auto w-[min(94%,1320px)]">
        <p
          data-hero-fade
          className="eyebrow text-white"
        >
          {listingHero.eyebrow}
        </p>

        <div className="mt-6 flex flex-col gap-8 md:mt-9 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <h1 className="display-1 text-white">
            {listingHero.titleLines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span className="svc-hero-line block">{line}</span>
              </span>
            ))}
          </h1>

          <div
            data-hero-fade
            className="flex max-w-md flex-col items-start gap-6 lg:pb-3"
          >
            <p className="text-lg leading-snug text-white md:text-xl">
              {listingHero.subtitle}
            </p>
            <PillButton tone="blue" href={listingHero.ctaHref}>
              {listingHero.ctaLabel}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
