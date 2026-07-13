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
          const counter = { current: 0 };
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

      <div
        ref={gridRef}
        className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14"
      >
        {stats.map((stat, i) => {
          const decimals = stat.decimals ?? 0;
          // Top squares alternate by index; underlines stay uniform brand blue.
          const squareBlue = i % 2 === 1;
          return (
            <div
              key={stat.label}
              className="impact-stat border-b border-primary pb-8"
            >
              <div
                className={`mb-6 h-[10px] w-[10px] ${
                  squareBlue
                    ? "bg-primary"
                    : "bg-fill-dark border border-line-dark"
                }`}
                aria-hidden="true"
              />
              <div className="text-[clamp(48px,6vw,88px)] font-extrabold tracking-tight tabular-nums leading-[0.9]">
                <span
                  className="impact-number"
                  data-value={stat.value}
                  data-decimals={decimals}
                >
                  {(0).toFixed(decimals)}
                </span>
                {stat.suffix}
              </div>
              <p className="text-white text-base mt-2">{stat.label}</p>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
