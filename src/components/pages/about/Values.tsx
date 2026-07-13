"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import Marquee from "@/components/ui/Marquee";
import { valuesSection, type ValueItem } from "@/lib/pages/about";

/* Value pill: the description is reachable on every input - pointer (hover),
   keyboard (focus/toggle), and touch (tap toggles; small screens also render
   the text inline since the floating card would clip). */
function ValuePill({ item }: { item: ValueItem }) {
  const [open, setOpen] = useState(false);

  return (
    // The active pill lifts above its neighbours (and above the grain layer)
    // so its info card sits cleanly on top instead of tangling with the pill
    // outlines behind it.
    <div
      className={`group relative mx-3 py-4 hover:z-40 focus-within:z-40 ${
        open ? "z-40" : ""
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="inline-block rounded-full border border-primary-lite px-12 py-6 text-[clamp(24px,2.6vw,44px)] font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:bg-primary-lite/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:px-16 md:py-8"
      >
        {item.name}
      </button>

      {/* Description card: centered under the pill, mt gap so it clears the
          pill border; hover, keyboard focus, or tap. */}
      <div
        className={`pointer-events-none absolute left-1/2 top-full mt-3 hidden w-[320px] min-h-[160px] -translate-x-1/2 flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition-opacity duration-300 md:flex ${
          open
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
        }`}
      >
        <p className="text-lg font-semibold text-black">{item.number}</p>
        <p className="text-sm leading-relaxed text-black">{item.text}</p>
      </div>

      {/* Small screens: tap reveals the text inline under the pill */}
      {open && (
        <p className="max-w-[42ch] px-2 pt-3 text-sm leading-relaxed text-white md:hidden">
          {item.text}
        </p>
      )}
    </div>
  );
}

export default function Values() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-values-title]", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: "[data-values-title]", start: "top 80%" },
      });

      gsap.fromTo(
        "[data-values-band]",
        { ...revealFrom, y: 80 },
        {
          ...revealTo,
          scrollTrigger: { trigger: "[data-values-band]", start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white pb-24 text-ink md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div data-values-title className="mb-14 text-center md:mb-20">
          <p className="eyebrow mb-4 text-ink">{valuesSection.tag}</p>
          <h2 className="display-2 text-ink">{valuesSection.title}</h2>
        </div>

        {/* Blue band with alternating marquee rows of value pills */}
        <div
          data-values-band
          className="flex flex-col gap-8 overflow-hidden rounded-card-lg bg-primary py-16 md:gap-10 md:py-24"
        >
          {valuesSection.rows.map((row, i) => (
            <Marquee
              key={i}
              direction={i % 2 === 0 ? "right" : "left"}
              duration={38}
              pauseOnHover
              className="!overflow-visible"
            >
              {row.map((item) => (
                <ValuePill key={item.name} item={item} />
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
