"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, LayoutDashboard, Smartphone, Rocket, Check } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import "./stellar-hero.css";

// Headline split into words for the load-in reveal; tone drives the accent.
// The boast resolves last: violet "Websites" leads, green "better." lands the payoff.
const HEADLINE: { t: string; tone?: "violet" | "green" }[] = [
  { t: "Websites", tone: "violet" },
  { t: "nobody" },
  { t: "builds" },
  { t: "better.", tone: "green" },
];
const HERO_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * H2 - Hero (Stellar layout, dark + Webify content). Senior-led creative-dev +
 * product studio. Flagship: award-level animated & 3D websites; plus SaaS, mobile
 * apps, and landing pages. No internal nav (global Sterling Gate nav stays).
 * Note: the background video is a reference/stock asset - swap for an owned clip.
 */
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4";

const TABS = [
  { id: "web", label: "Animated Web", icon: Sparkles },
  { id: "saas", label: "SaaS Products", icon: LayoutDashboard },
  { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  { id: "landing", label: "Landing Pages", icon: Rocket },
] as const;

type TabId = (typeof TABS)[number]["id"];

const OVERLAYS: Record<TabId, { title: string; sub: string; items: string[] }> = {
  web: {
    title: "Animated & 3D websites",
    sub: "Our flagship - the futuristic web nobody builds better.",
    items: [
      "WebGL, shaders & scroll-driven 3D that stay buttery on real devices",
      "Hand-tuned motion & kinetic type, easing down to the frame",
      "60fps as a rule, not a hope - performance budgeted from commit one",
    ],
  },
  saas: {
    title: "SaaS product UI",
    sub: "Advanced interfaces, best-in-class performance under load.",
    items: [
      "Complex dashboards & flows that stay fast at scale",
      "Design systems built for a real team, not a one-off screen",
      "Shipped live for StealthConnect, our first public AI SaaS client",
    ],
  },
  mobile: {
    title: "Mobile apps",
    sub: "Smart, native-grade feel.",
    items: [
      "Fluid, gesture-led UI that feels instant in the hand",
      "One design language across web and app",
      "Considered states - loading, empty & error handled with care",
    ],
  },
  landing: {
    title: "Landing pages",
    sub: "High-converting, built to sell.",
    items: [
      "Story-led scroll & motion tuned to one decisive action",
      "Sub-second loads, WCAG-clean, SEO-ready",
      "Copy, design & dev in one tight senior loop - launch in days",
    ],
  },
};

export function StellarHero() {
  const [active, setActive] = useState<TabId>("web");
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

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
    <section className="stellar-hero relative w-full overflow-hidden px-5 pb-20 pt-28 text-center sm:px-6 sm:pb-28 sm:pt-36">
      {/* Futuristic ambient bloom behind the headline (pure CSS, reduced-motion safe). */}
      <div className="hero-aurora" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl">
      {/* Availability pill - a calm, real studio signal */}
      <div
        className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm"
        style={{ animationDelay: "0.2s" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs">
          Available for new projects
        </span>
      </div>

      {/* Gradient hairline divider */}
      <motion.div
        aria-hidden
        className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-violet-500/50 to-green-400/50"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: HERO_EASE }}
        style={{ transformOrigin: "center" }}
      />

      {/* Heading - giant, cinematic word-by-word reveal on load. Lit from within
          by two unclipped radial blooms (children of the h1, not the clipped
          reveal wrappers) so the accents glow softly with no rectangle. */}
      <h1
        className="relative isolate mx-auto mb-6 max-w-[15ch] text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.92] tracking-[-0.045em] text-white [text-wrap:balance]"
        aria-label="Websites nobody builds better."
      >
        <span aria-hidden className="headline-bloom headline-bloom--violet" />
        <span aria-hidden className="headline-bloom headline-bloom--green" />
        {HEADLINE.map((w, i) => (
          <span key={i} aria-hidden className="reveal-word">
            <motion.span
              className={
                w.tone === "violet"
                  ? "hero-grad-text"
                  : w.tone === "green"
                    ? "script-accent"
                    : undefined
              }
              style={{ display: "inline-block", willChange: "transform" }}
              initial={reduce ? { y: 0 } : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: HERO_EASE }}
            >
              {w.t}
            </motion.span>
            {i < HEADLINE.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>

      {/* Subheading - one narrow, even-breaking measure */}
      <p
        className="animate-fade-in-up mx-auto mb-9 max-w-xl text-pretty text-base leading-[1.65] text-white/65 opacity-0 sm:text-lg"
        style={{ animationDelay: "1.1s" }}
      >
        Award-level animated and 3D sites are our flagship - plus fast SaaS
        products, smart mobile apps, and landing pages that convert. Designed and
        shipped by one senior team.
      </p>

      {/* CTA - full-width on mobile (thumb-reach), hugs on desktop */}
      <div className="animate-fade-in-up flex flex-col items-center gap-3" style={{ animationDelay: "1.3s" }}>
        <Magnetic>
          <Link
            href="/contact"
            className="inline-flex h-13 w-full items-center justify-center rounded-pill bg-white px-9 text-base font-semibold text-black transition-transform duration-[--dur] ease-[--ease-out] hover:scale-[1.02] sm:w-auto sm:text-lg"
          >
            Start your build
          </Link>
        </Magnetic>
        <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
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

      {/* Video + per-tab overlay, framed as a centered gallery plate with an
          animated gradient ring (WebGL hint). */}
      <div
        className="hero-video-frame animate-fade-in-up relative mx-auto w-full rounded-3xl opacity-0"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="relative aspect-[16/10] max-h-[36rem] min-h-[20rem] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c11] sm:min-h-[24rem]">
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
              <p className="text-lg font-bold text-white sm:text-xl">{o.title}</p>
              <p className="mt-1 text-xs text-white/50 sm:text-sm">{o.sub}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/75 sm:text-base">
                {o.items.map((it) => (
                  <li key={it} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-[#8b5cf6]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Honest capability strip (no fabricated client logos - swap for real,
          permissioned logos once more public engagements exist). */}
      <div
        className="animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/55 opacity-0 sm:mt-20 sm:gap-x-8 sm:text-base"
        style={{ animationDelay: "0.8s" }}
      >
        <span>Senior-led, no junior hand-offs</span>
        <span aria-hidden className="h-4 w-px bg-white/15" />
        <span>Flagship: the best animated &amp; 3D sites</span>
        <span aria-hidden className="h-4 w-px bg-white/15" />
        <span>First public client shipped: StealthConnect</span>
      </div>

      {/* Editorial index line - a quiet studio finish */}
      <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
        Animated &amp; 3D web studio · India / Worldwide · Senior-led
      </p>
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
