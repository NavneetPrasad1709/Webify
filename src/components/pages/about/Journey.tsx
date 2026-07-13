"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { journey } from "@/lib/pages/about";

export default function Journey() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-journey-title]", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: "[data-journey-title]", start: "top 80%" },
      });

      const mm = gsap.matchMedia();

      // Desktop: the sticky section scrubs lines and images against the
      // tall wrapper, staggered per column like the source's sticky journey.
      // Windows are tight so the first column starts forming immediately and
      // all three columns are fully revealed by roughly half the scrub,
      // ensuring the section never opens as a blank viewport.
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-journey-line]").forEach((line, i) => {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: `top+=${i * 10}% top`,
                end: `top+=${25 + i * 10}% top`,
                scrub: true,
              },
            }
          );
        });

        // Images + pills fade in shortly after each line starts growing.
        gsap.utils.toArray<HTMLElement>("[data-journey-image]").forEach((img, i) => {
          gsap.fromTo(
            img,
            { opacity: 0, y: 60, filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: `top+=${5 + i * 10}% top`,
                end: `top+=${25 + i * 10}% top`,
                scrub: true,
              },
            }
          );
        });
      });

      // Mobile: the section is short and not sticky, so scrubbed reveals
      // anchored to the section top never complete. Use simple per-element
      // entrances instead.
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-journey-line]").forEach((line) => {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: line, start: "top 85%" },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-journey-image]").forEach((img) => {
          gsap.fromTo(
            img,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: img, start: "top 90%" },
            }
          );
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white text-ink md:min-h-[160vh]">
      <div className="md:sticky md:top-4">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-28">
          <div data-journey-title className="mb-16 text-center md:mb-20">
            <p className="eyebrow mb-4 text-ink">{journey.tag}</p>
            <h2 className="display-2 text-ink">{journey.title}</h2>
          </div>

          <div className="grid gap-16 md:grid-cols-3 md:gap-4">
            {journey.items.map((item) => (
              <div key={item.year} className="relative">
                <h3 className="text-[clamp(28px,2.4vw,36px)] font-bold tracking-tight">
                  {item.year}
                </h3>

                <div className="relative mt-8 pl-10">
                  <div className="h-4 w-4 rounded-[2px] bg-primary" />
                  <div
                    data-journey-line
                    className="ml-2 h-full min-h-[260px] w-px origin-top bg-gray-soft md:min-h-[470px]"
                  />

                  <div
                    data-journey-image
                    className="absolute inset-x-0 bottom-0 z-10 max-w-[340px] pl-10"
                  >
                    <div className="overflow-hidden rounded-card">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="block max-h-[400px] w-full object-cover"
                      />
                    </div>
                    {/* Label sits in flow below the photo: the milestone claim
                        belongs to the studio, not to the stock-photo people,
                        and the in-flow pill cannot collide with the year
                        heading on narrow screens. */}
                    <p className="mt-3 inline-block whitespace-nowrap rounded-card bg-primary px-6 py-3 text-center font-medium text-white">
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
