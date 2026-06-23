"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, ArrowRight } from "lucide-react";
import { whatsappHref } from "@/lib/site";

/**
 * Persistent "start a project" affordance on every page. Appears once the hero
 * has scrolled away so the visitor always has a one-tap path to convert - a
 * glowing pill on desktop, a thumb-reachable bar on mobile (safe-area aware).
 * The pulsing glow + shimmer + nudging arrow draw the eye without being noisy;
 * everything freezes under prefers-reduced-motion. Hidden on /contact.
 */
export function StickyCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  const wa = whatsappHref("Hi Webify - I'd like to talk about a project.");

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <div
      aria-hidden={!shown}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] transition-all duration-500 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end sm:px-0 sm:pb-0 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className={`relative w-full sm:w-auto ${shown ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Pulsing gradient glow behind the pill - draws the eye. */}
        <div
          aria-hidden
          className="absolute -inset-2 -z-10 rounded-full bg-[linear-gradient(90deg,#6366f1,#8b5cf6,#25D366)] opacity-50 blur-xl animate-cta-glow"
        />

        <div className="flex w-full items-center gap-2.5 rounded-full border border-white/15 bg-[#0c0c11]/90 p-1.5 shadow-[0_20px_55px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:w-auto">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("webify:open-contact"))}
            className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-transform duration-300 hover:scale-[1.03] sm:flex-none sm:px-7"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Get a free strategy call
              <ArrowRight
                className="h-4 w-4 animate-cta-nudge transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
            {/* Shimmer sweep */}
            <span
              aria-hidden
              className="absolute inset-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-black/10 to-transparent animate-cta-shimmer"
            />
          </button>

          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-black shadow-[0_0_20px_-2px_rgba(37,211,102,0.7)] transition-transform hover:scale-110"
            >
              <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
              <MessageCircle className="relative h-5 w-5" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
