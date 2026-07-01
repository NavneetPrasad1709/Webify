"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Sparkles, Code2, LayoutDashboard, Smartphone, Rocket, Check } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import "./stellar-hero.css";

/**
 * H2 - Hero (video-reference layout). A 3-line uppercase headline with an image
 * chip tucked between the words, a top trust bar, floating discipline pills, and
 * sparkles - the studio look from the shared reference, on Webify's violet+green
 * brand and honest (no fabricated ratings). The giant reveal + video preview +
 * tab bar are preserved.
 */
type HWord = { t: string; tone?: "violet" | "green" } | { chip: true };

// Headline lines. Accent words carry violet/green; the chip sits mid-line 2.
const LINES: HWord[][] = [
  [{ t: "We" }, { t: "build" }, { t: "stunning" }],
  [{ t: "websites", tone: "violet" }, { t: "&" }, { chip: true }, { t: "digital", tone: "green" }],
  [{ t: "experiences." }],
];
const HERO_EASE = [0.76, 0, 0.24, 1] as const;

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
    const id = supportsRIC ? window.requestIdleCallback(attach) : window.setTimeout(attach, 600);
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
  let wi = 0; // running word index for the reveal stagger

  return (
    <section className="stellar-hero relative w-full overflow-hidden px-5 pb-20 pt-28 text-center sm:px-6 sm:pb-28 sm:pt-32">
      <div className="hero-aurora" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Trust bar - two honest pills (video-style, no fabricated rating) */}
        <div
          className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-center gap-2.5"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            Senior-led studio
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Available for new projects
          </span>
        </div>

        {/* Headline stage - 3-line reveal with inline image chip, ringed by
            floating discipline pills + sparkles (desktop only). */}
        <div className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block" aria-hidden>
            <Sparkle className="left-[7%] top-[6%]" size={22} delay={1.5} reduce={reduce} />
            <Sparkle className="right-[10%] top-[0%]" size={15} delay={1.75} reduce={reduce} />
            <Sparkle className="left-[16%] bottom-[10%]" size={13} delay={1.95} reduce={reduce} />
            <FloatChip className="bottom-[2%] left-[1%]" rotate={-7} delay={1.5} reduce={reduce} tone="violet" icon={Sparkles}>
              UI / UX Design
            </FloatChip>
            <FloatChip className="bottom-[-4%] right-[1%]" rotate={6} delay={1.7} reduce={reduce} tone="green" icon={Code2}>
              Web Development
            </FloatChip>
          </div>

          <h1
            className="relative isolate mx-auto text-center font-bold uppercase leading-[0.92] tracking-[-0.03em] text-white text-[clamp(2rem,6.6vw,5.75rem)]"
            aria-label="We build stunning websites and digital experiences."
          >
            <span aria-hidden className="headline-bloom headline-bloom--violet" />
            <span aria-hidden className="headline-bloom headline-bloom--green" />
            {LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, i) => {
                  const delay = 0.15 + wi * 0.08;
                  wi += 1;
                  if ("chip" in w) {
                    return <ChipInline key={i} reduce={reduce} delay={delay} />;
                  }
                  return (
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
                        transition={{ duration: 0.9, delay, ease: HERO_EASE }}
                      >
                        {w.t}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtext */}
        <p
          className="animate-fade-in-up mx-auto mb-9 mt-7 max-w-xl text-pretty text-base leading-[1.65] text-white/65 opacity-0 sm:text-lg"
          style={{ animationDelay: "1.1s" }}
        >
          We help founders, startups, and teams launch fast, responsive, and
          genuinely stunning products - designed and shipped end to end by one
          senior team.
        </p>

        {/* CTA */}
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

        {/* Tab bar */}
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

        {/* Video + per-tab overlay - centered gallery plate, fully fluid */}
        <div
          className="hero-video-frame animate-fade-in-up relative mx-auto w-full rounded-3xl opacity-0"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="relative aspect-[16/10] max-h-[36rem] min-h-[20rem] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c11] sm:min-h-[24rem]">
            <video ref={videoRef} autoPlay loop muted playsInline preload="none" aria-hidden className="h-full w-full object-cover" />
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

        {/* Capability strip */}
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

/** Tilted image chip tucked inline between the headline words (letter-sized). */
function ChipInline({ reduce, delay }: { reduce: boolean | null; delay: number }) {
  return (
    <motion.span
      className="mx-[0.14em] inline-block aspect-[4/3] h-[0.78em] overflow-hidden rounded-[0.14em] border border-white/25 align-[-0.1em] shadow-[0_10px_28px_-8px_rgba(0,0,0,0.85)]"
      style={{ rotate: 6 }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.4 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: HERO_EASE }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/work/stealthconnect/demo-poster.jpg" alt="" className="h-full w-full object-cover" />
    </motion.span>
  );
}

// --- Floating studio annotations (reference-inspired, desktop only) ----------

const CHIP_TONE: Record<"violet" | "green", { pill: string; tail: string }> = {
  violet: {
    pill: "border-violet-400/40 bg-violet-500/20 text-violet-100",
    tail: "border-violet-400/40 bg-violet-500/20",
  },
  green: {
    pill: "border-green-400/40 bg-green-500/20 text-green-100",
    tail: "border-green-400/40 bg-green-500/20",
  },
};

/** A tilted, floating discipline pill with a pointer tail. */
function FloatChip({
  children,
  className,
  rotate,
  delay,
  reduce,
  tone,
  icon: Icon,
}: {
  children: ReactNode;
  className: string;
  rotate: number;
  delay: number;
  reduce: boolean | null;
  tone: "violet" | "green";
  icon: LucideIcon;
}) {
  const t = CHIP_TONE[tone];
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ rotate }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -7, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: delay + 0.3 },
      }}
    >
      <span
        className={`relative inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-sm ${t.pill}`}
      >
        <Icon className="h-4 w-4" />
        {children}
        <span className={`absolute -top-1 left-6 h-2.5 w-2.5 rotate-45 border-l border-t ${t.tail}`} />
      </span>
    </motion.div>
  );
}

/** A small 4-point sparkle that twinkles. */
function Sparkle({
  className,
  size = 16,
  delay = 0,
  reduce,
}: {
  className: string;
  size?: number;
  delay?: number;
  reduce: boolean | null;
}) {
  return (
    <motion.svg
      className={`absolute text-white/70 ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      initial={reduce ? { opacity: 0.7 } : { opacity: 0, scale: 0 }}
      animate={reduce ? { opacity: 0.7 } : { opacity: [0.35, 1, 0.35], scale: 1 }}
      transition={{
        opacity: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay },
        scale: { duration: 0.5, delay },
      }}
    >
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
    </motion.svg>
  );
}
