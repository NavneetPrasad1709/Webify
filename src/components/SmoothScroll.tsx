"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { getScrollBridge, onScrollBridge } from "@/lib/scroll-bridge";

/**
 * Smooth scrolling, loaded after the page is usable rather than before it.
 *
 * This component wraps the whole app from the root layout, so its imports are
 * every route's imports. It used to import Lenis, gsap and ScrollTrigger
 * statically, which meant /privacy and /terms, which animate nothing, still
 * paid for the whole animation library.
 *
 * Now Lenis arrives through a dynamic import after mount, and ScrollTrigger
 * is reached through the bridge in @/lib/scroll-bridge rather than imported:
 * routes that animate register it themselves, routes that do not never load
 * it. The rAF loop that used to ride gsap.ticker is a plain one.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let teardown: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      // The component can unmount while the import is still in flight.
      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        anchors: true,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", () => getScrollBridge()?.update());

      let frame = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      // Sections that mounted before Lenis took over measured against the
      // native scroller, so their triggers need re-measuring once it does.
      const stop = onScrollBridge((bridge) => bridge.refresh());

      teardown = () => {
        cancelAnimationFrame(frame);
        stop();
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  // Client-side navigations (next/link) swap the page without reloading, so
  // Lenis would keep its old scroll state and every ScrollTrigger would keep
  // measurements from the previous page's layout. Reset the scroller and
  // re-measure once the new page has painted, otherwise scroll-linked
  // sections (services accordion, work deck, reveals) fire at stale
  // positions.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => getScrollBridge()?.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
