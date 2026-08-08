"use client";

import { useEffect, type RefObject } from "react";

/**
 * Scroll reveal without GSAP.
 *
 * Every component mounted in the root layout used to import gsap and
 * ScrollTrigger for what amounts to a fade and a rise, which put 121 kB of
 * animation library on the critical path of every route, including the two
 * legal pages that render no animation at all. IntersectionObserver and a
 * CSS transition do the same job in a few hundred bytes.
 *
 * Elements opt in with `data-reveal`. The hook flips them to
 * `data-reveal="in"` once, when they first enter the viewport; the transition
 * itself lives in globals.css, along with a wall-clock safety animation that
 * makes the content appear even if this hook never runs.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal=""]')
    );
    if (targets.length === 0) return;

    const show = (el: HTMLElement) => el.setAttribute("data-reveal", "in");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scope]);
}
