"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, SplitWords, revealFrom, revealTo } from "@/lib/anim";
import { impactsParagraph, stats } from "@/lib/data";

export default function Impacts() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Read-along word scrub: faded -> full opacity as the user scrolls.
      // Opacity (not color) keeps the pure-white text standard and animates
      // on the compositor.
      if (paragraphRef.current) {
        gsap.to(paragraphRef.current.querySelectorAll(".scrub-word"), {
          opacity: 1,
          stagger: 0.06,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 1,
          },
        });
      }

      if (gridRef.current) {
        const items = gsap.utils.toArray<HTMLElement>(
          ".impact-stat",
          gridRef.current
        );

        // Blur-in reveal of the stat cells.
        gsap.fromTo(items, revealFrom, {
          ...revealTo,
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        });

        // Count-up numbers on first enter.
        items.forEach((item) => {
          const numEl = item.querySelector<HTMLElement>(".impact-number");
          if (!numEl) return;
          const value = parseFloat(numEl.dataset.value ?? "0");
          const decimals = parseInt(numEl.dataset.decimals ?? "0", 10);
          // The element ships with the final figure, so the tween has to
          // reset it to zero itself rather than counting up from markup.
          // Reduced motion keeps the number exactly as rendered.
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
          }
          const counter = { current: 0 };
          numEl.textContent = (0).toFixed(decimals);
          gsap.to(counter, {
            current: value,
            duration: 1.6,
            ease: "power2.out",
            snap: { current: decimals > 0 ? 0.1 : 1 },
            onUpdate: () => {
              numEl.textContent = counter.current.toFixed(decimals);
            },
            scrollTrigger: { trigger: item, start: "top 80%", once: true },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-ink text-white py-24 md:py-32 px-5 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
      <p className="eyebrow text-gray-soft">HOW WE OPERATE</p>

      <p
        ref={paragraphRef}
        className="max-w-5xl text-[clamp(24px,3.4vw,42px)] font-semibold leading-[1.3] tracking-tight mt-8 text-white"
      >
        <SplitWords text={impactsParagraph} wordClassName="scrub-word" />
      </p>

      {/* A rule above each figure rather than a border below the label. The
          old bottom border sat at the foot of a grid row sized by the tallest
          cell, so three of the four columns carried a gap of dead space
          between their label and their line. Anchoring to the top also means
          labels of different lengths can no longer knock the rules out of
          alignment with each other. */}
      <div
        ref={gridRef}
        className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-10 lg:grid-cols-4"
      >
        {stats.map((stat) => {
          const decimals = stat.decimals ?? 0;
          return (
            <div key={stat.label} className="impact-stat relative pt-7">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-white/15"
              />
              {/* Short cobalt segment on every column: the same mark each
                  time, where the old squares alternated grey and blue on
                  nothing more than the loop index. */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-10 bg-primary"
              />
              <p className="flex items-baseline whitespace-nowrap text-[clamp(46px,6vw,84px)] font-extrabold leading-[0.85] tracking-[-0.03em] tabular-nums">
                {/* Ships the real figure, not 0: without JS the section
                    otherwise claims zero of everything, and the count-up
                    tween starts from 0 on trigger anyway. */}
                <span
                  className="impact-number"
                  data-value={stat.value}
                  data-decimals={decimals}
                >
                  {stat.value.toFixed(decimals)}
                </span>
                {stat.suffix ? (
                  <span className="text-[0.44em] font-extrabold tracking-tight text-primary">
                    {stat.suffix}
                  </span>
                ) : null}
              </p>
              <p className="mt-4 max-w-[20ch] text-[15px] font-medium leading-snug text-white md:text-base">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
