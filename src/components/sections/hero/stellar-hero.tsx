"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Star, Sparkles, Globe, Smartphone, PenTool, Check } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import "./stellar-hero.css";

/**
 * H2 — Hero (Stellar layout, dark + Webify content). Senior-led AI & software
 * product team — agency positioning (not a SaaS product). Archivo font, heavy
 * large headline. No internal nav (global Sterling Gate nav stays).
 * [REPLACE:] background video + trusted-by logos with real assets.
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

  // Honor reduced-motion: pause the background video (poster frame stays).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
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
        <span className="text-xs font-medium text-white/80 sm:text-sm">
          Senior-led AI &amp; software — India &amp; worldwide
        </span>
      </div>

      {/* Heading — heavy Archivo, large */}
      <h1
        className="animate-fade-in-up mx-auto mb-5 max-w-[16ch] text-[clamp(2.5rem,9vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight text-white"
        style={{ animationDelay: "0.3s" }}
      >
        We build AI-first products
        <br />
        that <span className="script-accent">actually ship.</span>
      </h1>

      {/* Subheading */}
      <p
        className="animate-fade-in-up mx-auto mb-8 max-w-2xl text-base text-white/60 opacity-0 sm:text-lg md:text-xl"
        style={{ animationDelay: "0.4s" }}
      >
        Senior engineers and designers — end to end, no junior hand-offs. For
        ambitious founders and teams in India and worldwide.
      </p>

      {/* CTA */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <Magnetic className="mb-12">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-white px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-white/90"
          >
            Book a call
          </Link>
        </Magnetic>
      </div>

      {/* Tab bar */}
      <div
        className="animate-fade-in-up mx-auto mb-8 w-full max-w-md rounded-lg bg-white/[0.06] p-1 opacity-0 sm:w-fit sm:max-w-none"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="grid grid-cols-2 gap-1 sm:hidden">
          {TABS.map((t) => (
            <TabButton key={t.id} tab={t} active={active} onClick={() => setActive(t.id)} />
          ))}
        </div>
        <div className="hidden items-center sm:flex">
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
        className="animate-fade-in-up relative h-[360px] overflow-hidden rounded-3xl border border-white/10 opacity-0 sm:h-[440px] md:h-[500px]"
        style={{ animationDelay: "0.7s" }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
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

      {/* Trusted-by logos ([REPLACE:] with real client logos) */}
      <div
        className="animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 text-white/40 opacity-0 sm:mt-20 sm:gap-x-10"
        style={{ animationDelay: "0.8s" }}
      >
        <span className="text-base font-extrabold tracking-[0.2em] sm:text-lg">NORTHWIND</span>
        <span className="text-base font-bold tracking-tight sm:text-lg">AXIOM</span>
        <span className="text-base font-medium sm:text-lg">Nexera</span>
        <span className="text-lg italic [font-family:'Instrument_Serif',serif] sm:text-xl">M3</span>
        <span className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-[10px]">
            LC
          </span>
          LAURA COLE
        </span>
        <span className="text-base font-medium lowercase tracking-wide sm:text-lg">vertex</span>
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
