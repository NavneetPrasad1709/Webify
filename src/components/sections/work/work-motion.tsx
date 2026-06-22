"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-motion primitives for /work. GSAP ScrollTrigger (scrub) stays in sync
 * with the app's Lenis smooth-scroll (SmoothScroll provider forwards Lenis
 * scroll → ScrollTrigger.update). All effects are transform-only (GPU) and
 * no-op under prefers-reduced-motion, where Lenis is disabled too.
 */

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Image in a frame that zoom-parallaxes (scrubbed scale) as it crosses the viewport. */
export function ZoomImage({
  src,
  alt,
  sizes,
  className,
  from = 1.15,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  /** Frame classes — aspect ratio, rounding, background. */
  className?: string;
  /** Starting scale (zooms out to 1 as it scrolls through). */
  from?: number;
  priority?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const f = frame.current;
    const el = inner.current;
    if (!f || !el) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: from },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: f,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, f);
    return () => ctx.revert();
  }, [from]);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className ?? ""}`}>
      <div ref={inner} className="absolute inset-0 will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}

/** Wraps content and scrubs a subtle zoom-in (scale + fade) as it enters. */
export function ScrollZoom({
  children,
  className,
  from = 0.9,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: from, autoAlpha: 0.55 },
        {
          scale: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [from]);

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}

/** Vertical parallax — content drifts against the scroll for depth. */
export function Parallax({
  children,
  amount = 60,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
