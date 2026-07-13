"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import Marquee from "@/components/ui/Marquee";
import { valuesSection, type ValueItem } from "@/lib/pages/about";

/* Value pill (template pattern): an outline capsule that reveals a white
   info card on hover / focus / tap. The active pill's wrapper lifts above all
   its neighbours (z-50) so the card floats cleanly on top instead of tangling
   with the pill outlines behind it. */
function ValuePill({ item }: { item: ValueItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group relative mx-2.5 py-3 md:mx-3 ${
        open ? "z-50" : "hover:z-50 focus-within:z-50"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="inline-block rounded-full border border-primary-lite px-9 py-4 text-[clamp(20px,2.4vw,42px)] font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:px-14 md:py-6"
      >
        {item.name}
      </button>

      {/* Info card: floats below the pill, offset right (template layout).
          Hidden until hover / keyboard focus / tap; md+ only. */}
      <div
        className={`pointer-events-none absolute left-[55%] top-full z-10 mt-4 hidden w-[320px] min-h-[175px] flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.55)] transition-opacity duration-300 md:flex ${
          open
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
        }`}
      >
        <p className="font-mono text-base font-semibold text-primary">
          {item.number}
        </p>
        <p className="text-[15px] leading-relaxed text-black">{item.text}</p>
      </div>

      {/* Small screens: tap reveals the text inline below the pill */}
      {open && (
        <p className="mx-auto max-w-[42ch] px-2 pt-3 text-center text-sm leading-relaxed text-white md:hidden">
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
          scrollTrigger: { trigger: "[data-values-band]", start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    // overflow-x-clip stops the marquee causing horizontal scroll while still
    // letting the hover cards spill downward (overflow-y stays visible).
    <section ref={ref} className="overflow-x-clip bg-white pb-24 text-ink md:pb-32">
      <div
        data-values-title
        className="mx-auto mb-12 max-w-[1400px] px-5 text-center md:mb-16 md:px-10"
      >
        <p className="eyebrow mb-4 text-ink">{valuesSection.tag}</p>
        <h2 className="display-2 text-ink">{valuesSection.title}</h2>
      </div>

      {/* Full-bleed blue band: alternating marquee rows of value pills */}
      <div
        data-values-band
        className="flex flex-col gap-6 bg-primary py-16 md:gap-8 md:py-24"
      >
        {valuesSection.rows.map((row, i) => (
          <Marquee
            key={i}
            direction={i % 2 === 0 ? "right" : "left"}
            duration={42}
            pauseOnHover
            className="!overflow-visible"
          >
            {row.map((item) => (
              <ValuePill key={item.name} item={item} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
