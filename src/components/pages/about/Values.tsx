"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import Marquee from "@/components/ui/Marquee";
import { valuesSection, type ValueItem } from "@/lib/pages/about";

/* Value pill (template pattern): a dim outline capsule that fills black with
   white text on direct hover / focus and reveals a white info card that slides
   up into place. The active pill's wrapper lifts above its neighbours (z-50)
   so the card floats cleanly on top of the outlines behind it. Text colour is
   also driven by a cursor-proximity glow (see the band effect below). */
function ValuePill({ item }: { item: ValueItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group relative mx-[10px] py-2 md:mx-[15px] ${
        open ? "z-50" : "hover:z-50 focus-within:z-50"
      }`}
    >
      <button
        type="button"
        data-value-pill
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className={`inline-block rounded-full border px-8 py-4 text-[clamp(30px,5vw,64px)] font-extrabold uppercase leading-none tracking-[-0.02em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:px-[50px] md:py-[30px] ${
          open
            ? "border-ink bg-ink text-white"
            : "border-primary-lite text-primary-lite group-hover:border-ink group-hover:bg-ink group-hover:text-white group-focus-within:border-ink group-focus-within:bg-ink group-focus-within:text-white"
        }`}
      >
        {item.name}
      </button>

      {/* Info card: slides up and fades in below the pill, offset right,
          matching the template. Hidden until hover / focus / tap. */}
      <div
        className={`pointer-events-none absolute left-[60%] top-full z-10 mt-2 hidden w-[320px] min-h-[175px] flex-col justify-between rounded-[10px] bg-white p-5 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.55)] transition-[opacity,transform] duration-300 ease-out md:flex ${
          open
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        }`}
      >
        <p className="text-base font-semibold text-ink">{item.number}</p>
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
  const bandRef = useRef<HTMLDivElement>(null);

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

  /* Cursor-proximity glow (template signature): pills near the cursor
     interpolate their text colour from dim primary-lite to bright white.
     Fine pointers only; the direct-hover black fill is handled in CSS and
     wins because the closest pill lands at ~white anyway. */
  useEffect(() => {
    const band = bandRef.current;
    if (!band || !window.matchMedia("(pointer: fine)").matches) return;

    const DIM = [135, 173, 255]; // --color-primary-lite
    const BRIGHT = [255, 255, 255];
    const RADIUS = 300;
    let raf = 0;
    let mx = 0;
    let my = 0;

    const paint = () => {
      raf = 0;
      const pills = band.querySelectorAll<HTMLElement>("[data-value-pill]");
      // Read all rects first, then write, to avoid layout thrashing.
      const rects: { el: HTMLElement; cx: number; cy: number }[] = [];
      pills.forEach((el) => {
        const r = el.getBoundingClientRect();
        rects.push({ el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
      });
      for (const { el, cx, cy } of rects) {
        const d = Math.hypot(mx - cx, my - cy);
        const t = Math.max(0, 1 - d / RADIUS);
        const f = t * t; // sharper falloff
        const c = DIM.map((v, i) => Math.round(v + (BRIGHT[i] - v) * f));
        el.style.color = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      band
        .querySelectorAll<HTMLElement>("[data-value-pill]")
        .forEach((el) => (el.style.color = ""));
    };

    band.addEventListener("mousemove", onMove);
    band.addEventListener("mouseleave", onLeave);
    return () => {
      band.removeEventListener("mousemove", onMove);
      band.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
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
        ref={bandRef}
        data-values-band
        className="flex flex-col gap-6 bg-primary py-16 md:gap-8 md:py-24"
      >
        {valuesSection.rows.map((row, i) => (
          <Marquee
            key={i}
            direction={i % 2 === 0 ? "right" : "left"}
            duration={42}
            pauseOnHover
            /* relative + hover z-lift raises the whole hovered ROW above the
               rows below it. Each marquee row is its own transform stacking
               context, so a pill's own z-index can only win inside its row;
               the row itself must outrank the next row for the card to sit on
               top of the pills beneath it. */
            className="relative !overflow-visible hover:z-30 focus-within:z-30"
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
