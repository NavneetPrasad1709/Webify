"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth-scroll provider, synced with GSAP ScrollTrigger.
 *
 * - Disabled entirely under prefers-reduced-motion (native scroll; scroll-driven
 *   sections fall back to their reduced layouts).
 * - Drives Lenis off the GSAP ticker and forwards Lenis scroll events to
 *   ScrollTrigger.update so pinned / scrubbed animations stay in sync.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    // Don't let the mobile address-bar show/hide resize re-fire pinned/scrubbed
    // sections (avoids jitter on the India-heavy mid-range mobile audience).
    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
