"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Star, Sparkles, Globe, Smartphone, PenTool, Check } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import "./stellar-hero.css";

/**
 * H2 - Hero (Stellar layout, dark + Webify content). Senior-led AI & software
 * product team - agency positioning (not a SaaS product). Archivo font, heavy
 * large headline. No internal nav (global Sterling Gate nav stays).
 * Note: the background video is a reference/stock asset - swap for an owned clip.
 */
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4";

const TABS = [
  { id: "ai", label: "AI Products", icon: Sparkles },
  { id: "web", label: "Web Apps", icon: Globe },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "design", label: "Design", icon: PenTool },
] as const;

type TabId = (typeof TABS)[number]["id"];

const OVERLAYS: Record<TabId, { title: string; sub: string; items: string[] }> = {
  ai: {
    title: "AI products",
    sub: "Agents, copilots & automation",
    items: ["Models running in production", "RAG & data pipelines", "Judged on outcomes, not demos"],
  },
  web: {
    title: "Web platforms",
    sub: "Sites & web apps",
    items: ["Next.js, performance-budgeted", "Accessible (WCAG)", "Built to convert"],
  },
  mobile: {
    title: "Mobile apps",
    sub: "iOS & Android",
    items: ["One codebase, native feel", "Offline-ready", "Daily-use quality"],
  },
  design: {
    title: "Product design",
    sub: "Research → system → product",
    items: ["Strategy & research", "Design systems", "Prototypes that test"],
  },
};

export function StellarHero() {
  const [active, setActive] = useState<TabId>("ai");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keep the decorative background video OFF the LCP/critical path: paint a dark
  // fill immediately, then lazy-attach the source after first paint (and never,
  // for reduced-motion users). This cuts megabytes of video out of initial load.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const attach = () => {
      if (!v.src) {
        v.src = VIDEO_SRC;
        v.load();
        v.play().catch(() => {});
      }
    };
    const supportsRIC = typeof window.requestIdleCallback === "function";
    const id = supportsRIC
      ? window.requestIdleCallback(attach)
      : window.setTimeout(attach, 600);
    return () => {
      if (supportsRIC) window.cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => {
        const i = TABS.findIndex((t) => t.id === prev);
        return TABS[(i + 1) % TABS.length].id;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  const o = OVERLAYS[active];

  return (
    <section className="stellar-hero w-full px-5 pb-20 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-28">
      <div className="mx-auto max-w-7xl">
      {/* Badge */}
      <div
        className="animate-fade-in-up mb-7 inline-flex items-center gap-2"
        style={{ animationDelay: "0.2s" }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded border border-white/20">
          <Star className="h-3.5 w-3.5 fill-white text-white" />
        </span>
        <span className="text-[13px] font-medium text-white/80 sm:text-sm">
          Senior-led AI &amp; software - India &amp; worldwide
        </span>
      </div>

      {/* Heading - heavy Archivo, large. States WHAT (AI products) + FOR WHOM
          (founders & teams) + OUTCOME (ship fast). */}
      <h1
        className="animate-fade-in-up mx-auto mb-5 max-w-[18ch] text-[clamp(2.5rem,9vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight text-white"
        style={{ animationDelay: "0.3s" }}
      >
        AI products for founders
        <br />
        who need to <span className="script-accent">ship fast.</span>
      </h1>

      {/* Subheading - one line, outcome-led, &lt;20 words */}
      <p
        className="animate-fade-in-up mx-auto mb-9 max-w-xl text-lg leading-relaxed text-white/75 opacity-0 sm:text-xl"
        style={{ animationDelay: "0.4s" }}
      >
        The senior team that designs your product is the same one that builds and
        ships it - end to end, no junior hand-offs.
      </p>

      {/* CTA - full-width on mobile (thumb-reach), hugs on desktop */}
      <div className="animate-fade-in-up flex flex-col items-center gap-3" style={{ animationDelay: "0.5s" }}>
        <Magnetic>
          <Link
            href="/contact"
            className="inline-flex h-13 w-full items-center justify-center rounded-pill bg-white px-9 text-base font-semibold text-black transition-transform duration-[--dur] ease-[--ease-out] hover:scale-[1.02] sm:w-auto sm:text-lg"
          >
            Book a free 30-min call
          </Link>
        </Magnetic>
        <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
          No obligation · Reply within 24h
        </p>
      </div>

      {/* Tab bar - desktop only; on mobile it's decorative clutter above the fold,
          so we drop it and let the preview overlay auto-cycle on its own. */}
      <div
        className="animate-fade-in-up mx-auto mb-8 hidden w-fit rounded-input bg-white/[0.06] p-1 opacity-0 sm:block"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center">
          {TABS.map((t, i) => (
            <div key={t.id} className="flex items-center">
              {i > 0 && <span className="mx-1 h-5 w-px bg-white/10" />}
              <TabButton tab={t} active={active} onClick={() => setActive(t.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Video + per-tab overlay */}
      <div
        className="animate-fade-in-up relative h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c11] opacity-0 sm:h-[440px] md:h-[500px]"
        style={{ animationDelay: "0.7s" }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden
          className="h-full w-full object-cover"
        />
        <div key={active} className="animate-fade-in-overlay absolute inset-0 bg-black/45">
          <div className="animate-slide-up-overlay absolute left-1/2 top-1/2 w-[min(92%,420px)] rounded-2xl border border-white/10 bg-[#0c0c11]/85 p-5 text-left shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-6">
            <h3 className="text-lg font-bold text-white sm:text-xl">{o.title}</h3>
            <p className="mt-1 text-xs text-white/50 sm:text-sm">{o.sub}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75 sm:text-base">
              {o.items.map((it) => (
                <li key={it} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[#6366f1]" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Honest capability strip (no fabricated client logos - swap for real,
          permissioned logos once a public engagement exists). */}
      <div
        className="animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/55 opacity-0 sm:mt-20 sm:gap-x-8 sm:text-base"
        style={{ animationDelay: "0.8s" }}
      >
        <span>You talk to the senior who builds it</span>
        <span aria-hidden className="h-4 w-px bg-white/15" />
        <span>Shipped end to end - design to production</span>
        <span aria-hidden className="h-4 w-px bg-white/15" />
        <span>Your code &amp; IP, 100% yours</span>
      </div>
      </div>
    </section>
  );
}

function TabButton({
  tab,
  active,
  onClick,
}: {
  tab: (typeof TABS)[number];
  active: TabId;
  onClick: () => void;
}) {
  const Icon = tab.icon;
  const isActive = active === tab.id;
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
        isActive ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {tab.label}
    </button>
  );
}
