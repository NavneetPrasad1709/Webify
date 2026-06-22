"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, ArrowRight } from "lucide-react";
import { whatsappHref } from "@/lib/site";

/**
 * Persistent "start a project" affordance on every page. Appears once the hero
 * has scrolled away so the visitor always has a one-tap path to convert - a
 * floating pill on desktop, a thumb-reachable bar on mobile (safe-area aware).
 * Hidden on /contact (you're already there) and for reduced-motion it simply
 * appears without the slide.
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
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div
        className={`pointer-events-auto flex w-full items-center gap-2.5 rounded-full border border-white/15 bg-[#0c0c11]/85 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:w-auto ${
          shown ? "" : "pointer-events-none"
        }`}
      >
        <Link
          href="/contact"
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 sm:flex-none"
        >
          Start a project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-black transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
          </a>
        ) : null}
      </div>
    </div>
  );
}
