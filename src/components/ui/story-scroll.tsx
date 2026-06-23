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
    // Mobile: content-height, scrolls naturally (no pinning, so nothing clips).
    // Desktop (md+): full-screen panel for the pin-stacking effect.
    className={cn("relative w-full overflow-hidden md:min-h-screen", className)}
  >
    <div
      data-flow-inner
      className={cn(
        // pt clears the fixed nav; pb-24 keeps the last panel clear of the
        // floating CTA on mobile. md+ restores the full-height justify-between
        // layout the pin-stacking expects.
        "flow-art-container relative flex w-full flex-col gap-[clamp(1.25rem,3vw,1.5rem)] px-[6vw] pb-24 pt-[clamp(6rem,12vw,8.5rem)] md:min-h-screen md:justify-between md:pb-[8vw]",
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
 * FlowArt (boudjadjasamira/story-scroll) - stacked full-screen panels that rotate
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
      const mm = gsap.matchMedia();

      // Shared choreography. `rotation` = the tilt each panel rises from; `pin`
      // toggles the stacking pin (desktop only).
      const setup = (rotation: number, pin: boolean) => {
        const sections = Array.from(
          root.querySelectorAll<HTMLElement>("[data-flow-section]"),
        );
        if (sections.length === 0) return;

        sections.forEach((section, i) => {
          gsap.set(section, { zIndex: i + 1 });
          const inner = section.querySelector<HTMLElement>(".flow-art-container");

          if (inner && i > 0) {
            gsap.set(inner, { rotation, transformOrigin: "bottom left" });
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

          if (pin && i < sections.length - 1) {
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
      };

      // Desktop: full pin-stacking + 30° rise (panels are min-h-screen, so the
      // content fits in each pinned screen).
      mm.add("(min-width: 768px)", () => setup(30, true));
      // Mobile: a gentle tilt-in only, NO pin. Panels are content-height and
      // scroll naturally, so nothing is clipped behind a pinned panel or hidden
      // under the floating CTA.
      mm.add("(max-width: 767px)", () => setup(6, false));
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
