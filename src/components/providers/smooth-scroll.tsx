"use client";

import { useEffect, useRef, type ReactNode } from "react";
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
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll-lock listener (always on, even under reduced-motion where there's no
  // Lenis): an open overlay must not let the page scroll behind it on mobile.
  useEffect(() => {
    const lock = () => {
      document.documentElement.classList.add("overlay-locked");
      lenisRef.current?.stop();
    };
    const unlock = () => {
      document.documentElement.classList.remove("overlay-locked");
      lenisRef.current?.start();
    };
    window.addEventListener("webify:lock-scroll", lock);
    window.addEventListener("webify:unlock-scroll", unlock);
    return () => {
      window.removeEventListener("webify:lock-scroll", lock);
      window.removeEventListener("webify:unlock-scroll", unlock);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    // Don't let the mobile address-bar show/hide resize re-fire pinned/scrubbed
    // sections (avoids jitter on the India-heavy mid-range mobile audience).
    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({
      // frame-rate-independent smoothing — Textura-style premium glide
      lerp: 0.08,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
