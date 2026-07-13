"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";

/* WHO WE'RE BUILT FOR - the template's signature reveal interaction, made honest.
   Three big situation titles stack on the cobalt field; hovering one brightens it,
   dims the rest, and floats a panel that follows the cursor - inside, an abstract
   line-diagram draws itself in (no stock photos, nothing faked for a new studio).
   On touch the diagrams sit inline. Professional list, creative reveal. */

const HEADING = "Three moments we build for.".split(" ");

/* --- Abstract line-diagrams: pure SVG, stroke-drawn on reveal (no assets) --- */

function LaunchViz() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full" aria-hidden="true">
      <path d="M16 104 H184" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M16 96 V104 M60 96 V104 M104 96 V104 M148 96 V104" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />
      <path className="sb-draw" pathLength={1} d="M16 100 C 66 96, 96 84, 118 58 S 166 20, 186 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <circle className="sb-node" cx="186" cy="14" r="5.5" fill="#f3f696" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </svg>
  );
}

function OutgrowViz() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full" aria-hidden="true">
      <rect className="sb-draw" pathLength={1} x="16" y="30" width="104" height="64" rx="8" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M30 50 H74 M30 62 H92 M30 74 H60" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
      <path className="sb-draw" pathLength={1} d="M104 62 H186" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path className="sb-draw" pathLength={1} d="M172 50 L186 62 L172 74" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="sb-node" cx="186" cy="62" r="5.5" fill="#f3f696" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </svg>
  );
}

function ConvertViz() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full" aria-hidden="true">
      <path className="sb-draw" pathLength={1} d="M28 30 H172" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path className="sb-draw" pathLength={1} d="M44 46 L98 92" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path className="sb-draw" pathLength={1} d="M156 46 L102 92" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M64 46 H136 M78 62 H122" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
      <circle className="sb-node" cx="100" cy="98" r="5.5" fill="#f3f696" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </svg>
  );
}

const SITUATIONS = [
  {
    n: "01",
    title: "Launching",
    who: "For founders with a first product",
    body: "From idea to a live, senior-built product, without hiring a team.",
    Viz: LaunchViz,
    href: "/contact?topic=Starting%20from%20zero",
  },
  {
    n: "02",
    title: "Outgrowing",
    who: "For teams on a stack that fights back",
    body: "Your next site on a clean stack your own team controls.",
    Viz: OutgrowViz,
    href: "/contact?topic=Rebuild%20our%20current%20site",
  },
  {
    n: "03",
    title: "Converting",
    who: "For sites with traffic that stalls",
    body: "Design and copy rebuilt to turn visitors into buyers.",
    Viz: ConvertViz,
    href: "/contact?topic=Site%20that%20does%20not%20convert",
  },
];

export default function ServicesBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fineRef = useRef(false);
  const [hover, setHover] = useState<number | null>(null);

  // Scroll reveals (heading word-fill + list rise).
  useLayoutEffect(() => {
    fineRef.current = window.matchMedia("(pointer: fine)").matches;
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".sb-hw", { color: "#ffffff" });
        gsap.set(".sb-fade, .sb-item, .sb-inline-draw", { autoAlpha: 1, y: 0 });
        gsap.set(".sb-inline .sb-draw", { strokeDashoffset: 0 });
        gsap.set(".sb-inline .sb-node", { scale: 1 });
        return;
      }
      gsap.from(".sb-fade", {
        y: 20, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.fromTo(".sb-hw", { color: "rgba(255,255,255,0.3)" }, {
        color: "#ffffff", ease: "none", stagger: 0.35,
        scrollTrigger: { trigger: ".sb-head", start: "top 82%", end: "top 45%", scrub: 0.6 },
      });
      gsap.from(".sb-item", {
        y: 40, autoAlpha: 0, duration: 0.9, ease: "power4.out", stagger: 0.12,
        scrollTrigger: { trigger: listRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cursor-follow for the floating preview (fine pointers only).
  useLayoutEffect(() => {
    const panel = previewRef.current;
    const list = listRef.current;
    if (!panel || !list || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(panel, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(panel, "y", { duration: 0.5, ease: "power3" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX + 28);
      yTo(e.clientY - 140);
    };
    list.addEventListener("mousemove", move);
    return () => list.removeEventListener("mousemove", move);
  }, []);

  // Reveal + redraw the diagram when the hovered item changes.
  useLayoutEffect(() => {
    const panel = previewRef.current;
    if (!panel) return;
    if (hover === null) {
      gsap.to(panel, { autoAlpha: 0, scale: 0.92, duration: 0.3, ease: "power2.out" });
      return;
    }
    gsap.to(panel, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out" });
    const draws = panel.querySelectorAll(".sb-draw");
    const nodes = panel.querySelectorAll(".sb-node");
    gsap.set(draws, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(nodes, { scale: 0, transformOrigin: "center" });
    gsap.to(draws, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.1 });
    gsap.to(nodes, { scale: 1, duration: 0.4, ease: "back.out(2.2)", stagger: 0.08, delay: 0.35 });
  }, [hover]);

  const Active = hover !== null ? SITUATIONS[hover] : null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary">
      {/* Notches: white bridges the Work section above, ink bridges Impacts below. */}
      <div aria-hidden className="absolute right-0 top-0 h-16 w-44 rounded-bl-[48px] bg-white" />
      <div aria-hidden className="absolute bottom-0 left-0 h-16 w-44 rounded-tr-[48px] bg-ink" />

      <div className="mx-auto w-[min(92%,1180px)] py-24 md:py-32">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="sb-fade eyebrow text-lime">WHO WE&apos;RE BUILT FOR</p>
          <h2 className="sb-head mt-6 text-[clamp(30px,4vw,54px)] font-bold leading-[1.05] tracking-tight text-white">
            {HEADING.map((w, i) => (
              <span key={i} className="sb-hw mr-[0.24em] inline-block">{w}</span>
            ))}
          </h2>
          <p className="sb-fade mt-6 max-w-xl text-[15px] leading-relaxed text-white md:text-base">
            Whichever one is yours, you work directly with the senior team that designs
            and builds it. No logos yet, we launched in 2026.
          </p>
        </div>

        {/* Reveal list */}
        <div ref={listRef} className="mt-12 md:mt-16">
          {SITUATIONS.map((s, i) => {
            const active = hover === i;
            const dimmed = hover !== null && !active;
            return (
              <Link
                key={s.n}
                href={s.href}
                onMouseEnter={() => fineRef.current && setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="sb-item group block border-t border-white/15 py-7 transition-colors duration-300 last:border-b md:py-9"
              >
                <div className="flex items-center gap-5 md:gap-8">
                  <span
                    className={`font-mono text-sm tabular-nums tracking-widest transition-colors duration-300 ${
                      active ? "text-white" : dimmed ? "text-white/25" : "text-lime"
                    }`}
                  >
                    {s.n}
                  </span>
                  <span className="min-w-0">
                    <h3
                      className={`text-[clamp(30px,5.4vw,68px)] font-extrabold uppercase leading-[1.02] tracking-tight transition-[color,transform] duration-300 group-hover:md:translate-x-3 ${
                        active ? "text-white" : dimmed ? "text-white/25" : "text-white/55"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`mt-1.5 font-mono text-[12px] uppercase tracking-widest transition-colors duration-300 ${
                        dimmed ? "text-white/25" : "text-lime"
                      }`}
                    >
                      {s.who}
                    </p>
                  </span>
                  <span
                    className={`ml-auto hidden max-w-[15rem] text-right text-sm text-white transition-opacity duration-300 lg:block ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {s.body}
                  </span>
                </div>

                {/* Inline diagram + copy for touch / no-hover */}
                <div className="sb-inline mt-5 grid grid-cols-[1fr_auto] items-end gap-4 [@media(hover:hover)]:hidden">
                  <p className="text-[15px] leading-relaxed text-white">{s.body}</p>
                  <div className="sb-inline-draw h-16 w-28 shrink-0"><s.Viz /></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer CTA bar */}
        <div className="sb-fade mt-14 flex flex-col items-start gap-5 border-t border-white/15 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[12px] uppercase tracking-widest text-white/55">
            A senior replies within 24 hours.
          </p>
          <PillButton tone="white" href="/contact">
            Start a Project
          </PillButton>
        </div>
      </div>

      {/* Floating cursor-follow preview (desktop) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[340px] opacity-0 md:block"
        style={{ willChange: "transform" }}
      >
        <div className="rounded-card-lg border border-white/10 bg-ink p-7 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-widest text-primary-lite">
              {Active ? Active.n : "01"}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Webify
            </span>
          </div>
          <div className="my-6 h-40 w-full">{Active ? <Active.Viz /> : null}</div>
          <p className="text-lg font-bold tracking-tight text-white">
            {Active ? Active.title : ""}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white">
            {Active ? Active.body : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
