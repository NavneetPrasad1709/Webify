"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  "aria-label": ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cn("relative min-h-screen w-full overflow-hidden", className)}
  >
    <div
      data-flow-inner
      className={cn(
        // pt clears the fixed (transparent) nav; fluid padding scales to mobile.
        "flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-[clamp(1rem,3vw,1.5rem)] px-[6vw] pb-[8vw] pt-[clamp(6rem,12vw,8.5rem)]",
        "will-change-transform",
      )}
      style={{ transformOrigin: "bottom left", ...style }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

/**
 * FlowArt (boudjadjasamira/story-scroll) — stacked full-screen panels that rotate
 * up into place and pin over one another as you scroll.
 *
 * Ported off @gsap/react to our gsap.context pattern (ScrollTrigger is synced to
 * Lenis by the SmoothScroll provider). On desktop/tablet the rotate+pin runs; on
 * small screens (and reduced-motion) it falls back to clean stacked scrolling so
 * the effect never feels janky on phones.
 */
const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  "aria-label": ariaLabel = "Story scroll",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Only run the rotate+pin choreography on pointer-fine / larger screens.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const sections = Array.from(
          root.querySelectorAll<HTMLElement>("[data-flow-section]"),
        );
        if (sections.length === 0) return;

        sections.forEach((section, i) => {
          gsap.set(section, { zIndex: i + 1 });
          const inner = section.querySelector<HTMLElement>(".flow-art-container");

          if (inner && i > 0) {
            gsap.set(inner, { rotation: 30, transformOrigin: "bottom left" });
            gsap.to(inner, {
              rotation: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top 25%",
                scrub: true,
              },
            });
          }

          if (i < sections.length - 1) {
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
            });
          }
        });

        ScrollTrigger.refresh();
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cn("w-full overflow-x-hidden", className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
