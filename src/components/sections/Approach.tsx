"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { approachCards, type ApproachCard } from "@/lib/data";
import PillButton from "@/components/ui/PillButton";

/* ---------- Abstract UI mockups - pure CSS/SVG, no assets ---------- */

function BrowserMock() {
  return (
    <div className="h-full w-full rounded-t-xl border border-white/10 bg-[#1a1a1a] p-3">
      <div className="flex gap-1.5 pb-3">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="grid h-[calc(100%-20px)] grid-cols-[1.4fr_1fr] gap-3">
        <div className="rounded-lg bg-[#212121] p-4">
          <div className="h-3 w-3/4 rounded bg-white/25" />
          <div className="mt-2 h-3 w-1/2 rounded bg-white/15" />
          <div className="mt-5 h-6 w-24 rounded-full bg-primary/80" />
          <div className="mt-5 flex gap-3">
            <div className="h-10 flex-1 rounded bg-white/[.07]" />
            <div className="h-10 flex-1 rounded bg-white/[.07]" />
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-[#3a3a3a] to-[#141414]" />
      </div>
    </div>
  );
}

function PhonesMock() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-x-0 bottom-[-40%] h-[130%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,81,255,.45),transparent_65%)]" />
      {[
        { rot: "-8deg", x: "22%", y: "14%" },
        { rot: "7deg", x: "52%", y: "6%" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute h-[125%] w-[34%] rounded-[22px] border border-white/20 bg-[#101010] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,.5)]"
          style={{ left: p.x, top: p.y, transform: `rotate(${p.rot})` }}
        >
          <div className="mx-auto mb-1.5 h-1 w-8 rounded-full bg-white/20" />
          <div className="h-full rounded-[14px] bg-[#1c1c1c] p-2.5">
            <div className="h-2.5 w-2/3 rounded bg-white/30" />
            <div className="mt-1.5 h-2.5 w-1/2 rounded bg-white/15" />
            <div className="mt-3 h-4 w-14 rounded-full bg-primary/70" />
            <div className="mt-3 h-12 rounded bg-gradient-to-br from-white/10 to-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardMock() {
  const stats = ["$3,690", "$120,423", "40,780", "98,340"];
  return (
    <div className="h-full w-full rounded-t-xl border border-white/10 bg-[#f3f3f3] p-4">
      <div className="flex flex-wrap gap-2">
        {stats.map((s) => (
          <span
            key={s}
            className="rounded-md bg-white px-2.5 py-1.5 font-mono text-[10px] font-semibold text-ink shadow-sm"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 flex h-[52%] items-end gap-2">
        {[42, 68, 35, 80, 55, 92, 60, 74].map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t ${i % 3 === 1 ? "bg-primary/80" : "bg-ink/15"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function EditorMock() {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_2.4fr] gap-2 rounded-t-xl border border-white/10 bg-[#151515] p-3">
      <div className="rounded-lg bg-[#1d1d1d] p-2.5">
        {["Pages", "Layers", "Assets", "Stack", "Frame", "Slide"].map((l, i) => (
          <div
            key={l}
            className={`mb-1.5 flex items-center gap-1.5 rounded px-1.5 py-1 text-[9px] font-medium ${
              i === 1 ? "bg-primary/90 text-white" : "text-white/50"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-sm bg-current opacity-60" />
            {l}
          </div>
        ))}
      </div>
      <div className="relative rounded-lg bg-[#232323] p-3">
        <div className="h-3 w-1/2 rounded bg-white/25" />
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded bg-white/[.08]" />
          ))}
        </div>
        <div className="absolute right-6 top-8 h-16 w-24 rounded border-2 border-primary bg-primary/10">
          <span className="absolute -top-2 -right-2 h-2 w-2 rounded-sm border border-primary bg-[#232323]" />
          <span className="absolute -bottom-2 -left-2 h-2 w-2 rounded-sm border border-primary bg-[#232323]" />
        </div>
      </div>
    </div>
  );
}

function CmsMock() {
  const rows = [
    { t: "Design decisions that move revenue", d: "8 June 2026", g: "from-primary to-primary-lite" },
    { t: "Scaling systems that convert", d: "10 May 2026", g: "from-[#f97316] to-[#f3f696]" },
    { t: "A field guide to design QA", d: "22 April 2026", g: "from-[#a5b4fc] to-[#312e81]" },
  ];
  return (
    <div className="h-full w-full rounded-t-xl border border-white/10 bg-[#141414] p-4">
      <div className="grid grid-cols-[2fr_1fr_auto] gap-3 border-b border-white/10 pb-2 font-mono text-[9px] uppercase tracking-widest text-white/40">
        <span>Title</span>
        <span>Date</span>
        <span>Image</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.t}
          className="grid grid-cols-[2fr_1fr_auto] items-center gap-3 border-b border-white/5 py-2.5"
        >
          <span className="truncate text-[11px] font-medium text-white/80">{r.t}</span>
          <span className="font-mono text-[10px] text-white/40">{r.d}</span>
          <span className={`h-6 w-9 rounded bg-gradient-to-br ${r.g}`} />
        </div>
      ))}
    </div>
  );
}

function DialMock() {
  return (
    <div className="relative flex h-full w-full items-start justify-center overflow-hidden">
      <svg viewBox="0 0 200 200" className="mt-2 h-[150%] w-auto" aria-hidden="true">
        <circle cx="100" cy="100" r="96" fill="#0c0c0c" stroke="#2a2a2a" strokeWidth="6" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="#ffffff" strokeOpacity=".08" strokeWidth="1" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const big = i % 5 === 0;
          const r1 = big ? 68 : 74;
          // round to 2dp so server/client render identical attribute strings
          const rd = (v: number) => Math.round(v * 100) / 100;
          return (
            <line
              key={i}
              x1={rd(100 + r1 * Math.sin(a))}
              y1={rd(100 - r1 * Math.cos(a))}
              x2={rd(100 + 80 * Math.sin(a))}
              y2={rd(100 - 80 * Math.cos(a))}
              stroke="#ffffff"
              strokeOpacity={big ? 0.7 : 0.25}
              strokeWidth={big ? 2.5 : 1}
            />
          );
        })}
        <line x1="100" y1="100" x2="100" y2="44" stroke="#f3f3f3" strokeWidth="3" strokeLinecap="round" />
        <line x1="100" y1="100" x2="138" y2="118" stroke="#0051ff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="100" r="4" fill="#f3f3f3" />
      </svg>
    </div>
  );
}

const VISUALS: Record<ApproachCard["visual"], () => ReactNode> = {
  browser: BrowserMock,
  phones: PhonesMock,
  dashboard: DashboardMock,
  editor: EditorMock,
  cms: CmsMock,
  dial: DialMock,
};

/* ---------- Body text with bright highlight phrases ---------- */

function HighlightedBody({ body, highlights }: { body: string; highlights: string[] }) {
  let parts: ReactNode[] = [body];
  highlights.forEach((h, hi) => {
    const next: ReactNode[] = [];
    for (const p of parts) {
      if (typeof p !== "string" || !p.includes(h)) {
        next.push(p);
        continue;
      }
      const [before, ...rest] = p.split(h);
      next.push(
        before,
        <span key={`${hi}-${before.length}`} className="font-semibold text-white">
          {h}
        </span>,
        rest.join(h)
      );
    }
    parts = next;
  });
  return <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-white">{parts}</p>;
}

/* ---------- Section ---------- */

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".approach-head", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: ".approach-head", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".approach-card").forEach((card, i) => {
        gsap.fromTo(card, revealFrom, {
          ...revealTo,
          delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".approach-visual").forEach((v) => {
        gsap.fromTo(
          v,
          { y: 30 },
          {
            y: -10,
            ease: "none",
            scrollTrigger: { trigger: v, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ink px-5 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="approach-head">
          <p className="eyebrow text-gray-soft">Our Approach</p>
          <h2 className="display-2 mt-6">
            How We <span className="text-gray-deep">Ship.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-5">
          {approachCards.map((c) => {
            const Visual = VISUALS[c.visual];
            return (
              <article
                key={c.title}
                className={`approach-card flex flex-col overflow-hidden rounded-card border border-white/[.06] bg-ink-2 transition-colors duration-300 hover:border-white/[.12] ${
                  c.wide ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <div className="p-7 pb-0 md:p-9 md:pb-0">
                  <h3 className="text-2xl font-extrabold tracking-tight md:text-[26px]">
                    {c.title}
                  </h3>
                  <HighlightedBody body={c.body} highlights={c.highlights} />
                </div>
                <div className="approach-visual mt-7 h-52 px-7 md:px-9">
                  <Visual />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <PillButton tone="blue" href="/contact">
            Start a Project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
