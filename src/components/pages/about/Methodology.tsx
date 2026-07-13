"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { methodology } from "@/lib/pages/about";

export default function Methodology() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-method-title]", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: "[data-method-title]", start: "top 80%" },
      });

      gsap.fromTo(
        "[data-method-video]",
        { ...revealFrom, y: 40 },
        {
          ...revealTo,
          scrollTrigger: { trigger: "[data-method-grid]", start: "top 80%" },
        }
      );

      gsap.fromTo(
        "[data-method-item]",
        { ...revealFrom, y: 40 },
        {
          ...revealTo,
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-method-grid]", start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white pb-24 text-ink md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div data-method-title className="mb-14 text-center md:mb-20">
          <p className="eyebrow mb-4 text-ink">{methodology.tag}</p>
          <h2 className="display-2 text-ink">{methodology.title}</h2>
        </div>

        <div
          data-method-grid
          className="grid gap-5 md:grid-cols-[1fr_1.6fr]"
        >
          {/* Left: looping studio video */}
          <div data-method-video className="overflow-hidden rounded-card">
            <video
              className="h-full max-h-[300px] w-full object-cover md:max-h-none"
              src={methodology.video}
              poster={methodology.poster}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Right: methodology steps with lime hover overlay */}
          <div className="flex flex-col gap-5">
            {methodology.items.map((item) => (
              <div
                key={item.title}
                data-method-item
                className="group relative flex min-h-[150px] flex-col justify-between gap-8 overflow-hidden rounded-card bg-fill-light p-7 md:flex-row md:items-end md:p-8"
              >
                {/* Lime overlay rises from the bottom on hover */}
                <div
                  className="absolute inset-0 origin-bottom scale-y-0 bg-lime transition-transform duration-500 ease-out group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <p className="relative z-10 text-[clamp(22px,2vw,30px)] font-semibold text-ink">
                  {item.title}
                </p>
                <p className="relative z-10 max-w-[228px] text-sm font-medium leading-relaxed text-ink">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
