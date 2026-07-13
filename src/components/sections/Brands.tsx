"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/anim";

/* THE STACK - a light orbiting-skills field. Real tool marks orbit a cobalt core
   on two counter-rotating rings; each icon carries its brand colour and glows on
   hover. Honest: the tools Webify builds with, not client logos. */

type Tool = { slug: string; label: string; brand: string; ring: 0 | 1; phase: number; size: number };

const TOOLS: Tool[] = [
  // Inner ring
  { slug: "react", label: "React", brand: "#149ECA", ring: 0, phase: 0, size: 70 },
  { slug: "typescript", label: "TypeScript", brand: "#3178C6", ring: 0, phase: Math.PI / 2, size: 62 },
  { slug: "nextjs", label: "Next.js", brand: "#111111", ring: 0, phase: Math.PI, size: 66 },
  { slug: "vercel", label: "Vercel", brand: "#111111", ring: 0, phase: (3 * Math.PI) / 2, size: 60 },
  // Outer ring
  { slug: "figma", label: "Figma", brand: "#F24E1E", ring: 1, phase: 0, size: 64 },
  { slug: "webflow", label: "Webflow", brand: "#146EF5", ring: 1, phase: Math.PI / 2, size: 62 },
  { slug: "shopify", label: "Shopify", brand: "#5E8E3E", ring: 1, phase: Math.PI, size: 60 },
  { slug: "nodejs", label: "Node.js", brand: "#539E43", ring: 1, phase: (3 * Math.PI) / 2, size: 68 },
];

const R_INNER = 0.46; // as a fraction of the field's half-width
const R_OUTER = 0.8;
const SPEED_INNER = 0.9;
const SPEED_OUTER = -0.55;

export default function Brands() {
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);

  // Continuous orbit (direct DOM transforms - no per-frame React render).
  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    let half = field.clientWidth / 2;
    const ro = new ResizeObserver(() => { half = field.clientWidth / 2; });
    ro.observe(field);

    const place = (t: number) => {
      for (let i = 0; i < TOOLS.length; i++) {
        const c = TOOLS[i];
        const r = (c.ring === 0 ? R_INNER : R_OUTER) * half;
        const a = t * (c.ring === 0 ? SPEED_INNER : SPEED_OUTER) + c.phase;
        const el = iconRefs.current[i];
        if (el) {
          el.style.transform = `translate(calc(${(Math.cos(a) * r).toFixed(1)}px - 50%), calc(${(Math.sin(a) * r).toFixed(1)}px - 50%))`;
        }
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(0);
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    let time = 0;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) time += dt;
      place(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  // Subtle cursor-parallax tilt (fine pointers only) for premium depth.
  useEffect(() => {
    const field = fieldRef.current;
    const wrap = field?.parentElement;
    if (
      !field || !wrap ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    gsap.set(field, { transformOrigin: "center center" });
    const rX = gsap.quickTo(field, "rotationX", { duration: 0.6, ease: "power3" });
    const rY = gsap.quickTo(field, "rotationY", { duration: 0.6, ease: "power3" });
    const move = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      rY(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 9);
      rX((-(e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 9);
    };
    const leave = () => { rX(0); rY(0); };
    wrap.addEventListener("mousemove", move);
    wrap.addEventListener("mouseleave", leave);
    return () => {
      wrap.removeEventListener("mousemove", move);
      wrap.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Scroll reveal - the whole band rises, scales up and de-blurs into place,
  // the same entrance the Work section cards use.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".sk-card", { autoAlpha: 1, y: 0, scale: 1, filter: "none" });
        return;
      }
      gsap.from(".sk-card", {
        y: 56,
        scale: 0.9,
        autoAlpha: 0,
        filter: "blur(8px)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden rounded-card-lg bg-white py-24 text-ink md:py-32">
      <div className="sk-card mx-auto grid w-[min(92%,1180px)] items-center gap-y-14 lg:grid-cols-[1fr_1fr] lg:gap-x-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="sk-fade eyebrow text-gray-mid">OWN THE BUILD</p>
          <h2 className="sk-fade mt-6 display-2">
            <span className="text-ink">PROVEN </span>
            <span className="text-gray-soft">TOOLS.</span>
            <span className="text-ink"> TOTAL </span>
            <span className="text-gray-soft">OWNERSHIP.</span>
          </h2>
          <p className="sk-fade mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-black font-medium lg:mx-0 md:text-base">
            The stack serious teams already run, every line of it yours. Keep it, move it, or hand it to anyone.
          </p>
        </div>

        {/* Orbit field */}
        <div className="sk-field flex justify-center [perspective:900px]">
          <div
            ref={fieldRef}
            className="relative aspect-square w-[min(88vw,460px)]"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            {/* Orbit rings */}
            {[R_INNER, R_OUTER].map((r) => (
              <div
                key={r}
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/12"
                style={{ width: `${r * 100}%`, height: `${r * 100}%`, boxShadow: "inset 0 0 40px rgba(0,81,255,0.05)" }}
              />
            ))}
            {/* Glowing sparks travelling each orbit */}
            {[{ r: R_INNER, dur: 13, rev: false }, { r: R_OUTER, dur: 19, rev: true }].map((s) => (
              <div
                key={`s-${s.r}`}
                aria-hidden
                className={`sk-spinner pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${s.rev ? "rev" : ""}`}
                style={{ width: `${s.r * 100}%`, height: `${s.r * 100}%`, "--dur": `${s.dur}s` } as React.CSSProperties}
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(0,81,255,0.55)]" />
              </div>
            ))}

            {/* Soft core glow + rotating halo */}
            <div aria-hidden className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl" />
            <div aria-hidden className="sk-halo absolute left-1/2 top-1/2 z-[9] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full" />

            {/* Core */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.06] bg-white shadow-[0_12px_34px_rgba(0,0,0,0.12)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="url(#sk-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <defs>
                  <linearGradient id="sk-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0051ff" />
                    <stop offset="100%" stopColor="#87adff" />
                  </linearGradient>
                </defs>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>

            {/* Orbiting tool icons */}
            {TOOLS.map((t, i) => (
              <div
                key={t.slug}
                ref={(el) => { iconRefs.current[i] = el; }}
                className="absolute left-1/2 top-1/2 z-[10]"
                style={{ width: t.size, height: t.size }}
              >
                <div
                  className="orbit-chip group relative flex h-full w-full cursor-pointer items-center justify-center rounded-full border border-black/[0.06] bg-gradient-to-b from-white to-[#f4f5f7] shadow-[0_10px_26px_-8px_rgba(0,0,0,0.18),0_2px_5px_rgba(0,0,0,0.05)]"
                  style={{ "--brand": t.brand } as React.CSSProperties}
                >
                  <span
                    className="orbit-ico h-[58%] w-[58%]"
                    style={{ WebkitMaskImage: `url(/assets/stack/${t.slug}.svg)`, maskImage: `url(/assets/stack/${t.slug}.svg)` }}
                  />
                  <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                    {t.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
