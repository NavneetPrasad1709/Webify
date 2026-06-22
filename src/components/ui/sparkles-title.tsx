"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

interface SparklesTitleProps {
  children: ReactNode;
  /** Heading tag — preserve each section's level. Default h2. */
  as?: ElementType;
  /** Heading classes — pass each section's own heading styling, untouched. */
  className?: string;
  /** Wrapper classes (alignment etc.). */
  wrapperClassName?: string;
  /** Sparkle dot colour (defaults to brand indigo-hi). */
  sparkleColor?: string;
  /** Particle density. Lower = lighter. */
  density?: number;
  /** Hide the gradient underline glow (keep only the sparkle field). */
  hideBeam?: boolean;
  /** Beam container classes — defaults to centered; pass to left-align etc. */
  beamClassName?: string;
}

/**
 * SparklesTitle — wraps a heading with the tsparticles "sparkle beam" treatment
 * (aceternity SparklesCore): a thin indigo/sky gradient beam under the heading
 * with twinkling particles emanating from it.
 *
 * Particles mount ONLY while the title is in view (perf — no idle canvases) and
 * the edge mask fades to transparent so it sits cleanly on dark OR light panels.
 * The heading text/classes you pass are rendered verbatim — nothing else changes.
 */
export function SparklesTitle({
  children,
  as: Tag = "h2",
  className,
  wrapperClassName,
  sparkleColor = "#818cf8",
  density = 80,
  hideBeam = false,
  beamClassName,
}: SparklesTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px", amount: 0.1 });

  return (
    <div ref={ref} className={cn("relative w-full", wrapperClassName)}>
      <Tag className={className}>{children}</Tag>

      <div
        className={cn("relative mx-auto mt-4 h-16 w-full max-w-[34rem]", beamClassName)}
        aria-hidden="true"
      >
        {!hideBeam && (
          <>
            <div className="absolute inset-x-[12%] top-0 h-[2px] w-[76%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
            <div className="absolute inset-x-[12%] top-0 h-px w-[76%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="absolute inset-x-[32%] top-0 h-[5px] w-[36%] bg-gradient-to-r from-transparent via-sky-400 to-transparent blur-sm" />
            <div className="absolute inset-x-[32%] top-0 h-px w-[36%] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
          </>
        )}

        {inView && (
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={density}
            particleColor={sparkleColor}
            speed={2}
            className="h-full w-full [mask-image:radial-gradient(ellipse_at_top,white,transparent_72%)]"
          />
        )}
      </div>
    </div>
  );
}
