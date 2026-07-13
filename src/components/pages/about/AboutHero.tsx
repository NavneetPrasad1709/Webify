"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";
import { aboutHero } from "@/lib/pages/about";

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        revealFrom,
        { ...revealTo, stagger: 0.12, delay: 0.15 }
      );

      // Banner video scales in gently after the title.
      gsap.fromTo(
        "[data-hero-banner]",
        { opacity: 0, scale: 0.97, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.35,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white pt-32 md:pt-40 text-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-8 pb-12 md:flex-row md:items-start md:justify-between md:pb-16">
          <p data-hero-item className="eyebrow pt-3 text-ink">
            {aboutHero.tag}
          </p>

          <h1
            data-hero-item
            className="display-1 text-center text-ink md:flex-1"
          >
            {aboutHero.title}
          </h1>

          <div data-hero-item className="md:pt-3">
            <PillButton tone="blue" href="/contact">
              {aboutHero.cta}
            </PillButton>
          </div>
        </div>
      </div>

      {/* Full-bleed banner video */}
      <div data-hero-banner className="w-full overflow-hidden">
        <video
          className="h-[42vh] w-full object-cover md:h-[78vh]"
          src={aboutHero.video}
          poster={aboutHero.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}
