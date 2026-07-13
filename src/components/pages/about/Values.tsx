"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import Marquee from "@/components/ui/Marquee";
import { valuesSection, type ValueItem } from "@/lib/pages/about";

/* Value pill: a self-contained capsule that fills on hover. No floating
   description card, which is what tangled with neighbouring pills and rows
   before; the value names carry the section on their own. */
function ValuePill({ item }: { item: ValueItem }) {
  return (
    <span className="mx-2 inline-flex shrink-0 items-center rounded-full border border-primary-lite/70 px-7 py-3.5 text-[clamp(20px,2.4vw,42px)] font-bold uppercase tracking-tight text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-primary md:mx-3 md:px-12 md:py-6">
      {item.name}
    </span>
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
    <section ref={ref} className="overflow-hidden bg-white pb-24 text-ink md:pb-32">
      {/* Title stays in the reading column */}
      <div
        data-values-title
        className="mx-auto mb-12 max-w-[1400px] px-5 text-center md:mb-16 md:px-10"
      >
        <p className="eyebrow mb-4 text-ink">{valuesSection.tag}</p>
        <h2 className="display-2 text-ink">{valuesSection.title}</h2>
      </div>

      {/* Full-bleed blue band: alternating marquee rows of value pills.
          Edge-gradient masks fade the rows in and out of the viewport. */}
      <div
        data-values-band
        className="flex flex-col gap-4 bg-primary py-14 md:gap-6 md:py-20 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        {valuesSection.rows.map((row, i) => (
          <Marquee
            key={i}
            direction={i % 2 === 0 ? "right" : "left"}
            duration={40}
            pauseOnHover
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
