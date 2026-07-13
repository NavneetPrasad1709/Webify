"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/anim";

/** Brand intro on page load: icon breathes in, wordmark follows, veil lifts. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    // Intro plays once per session; deep links and repeat visits skip it.
    if (sessionStorage.getItem("wf-intro")) {
      gsap.set(ref.current, { display: "none" });
      return;
    }
    sessionStorage.setItem("wf-intro", "1");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(ref.current, { autoAlpha: 0 });
        return;
      }
      gsap
        .timeline()
        .fromTo(
          iconRef.current,
          { scale: 0.7, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.45, ease: "power3.out" }
        )
        .fromTo(
          logoRef.current,
          { y: 26, autoAlpha: 0, filter: "blur(6px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
          "-=0.2"
        )
        .to(
          ref.current,
          { yPercent: -100, duration: 0.6, ease: "power4.inOut" },
          "-=0.15"
        )
        .set(ref.current, { display: "none" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      data-preloader
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 bg-ink"
      aria-hidden="true"
    >
      <img
        ref={iconRef}
        src="/assets/webify-icon-dark.png"
        alt=""
        className="h-36 w-auto md:h-48"
      />
      <img
        ref={logoRef}
        src="/assets/webify-logo-white.png"
        alt=""
        className="h-20 w-auto max-w-[85vw] object-contain md:h-[120px]"
      />
    </div>
  );
}
