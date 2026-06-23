"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";
import { SparklesTitle } from "@/components/ui/sparkles-title";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
}: VerticalMarqueeProps) {
  return (
    <div
      className={cn("group flex flex-col overflow-hidden", className)}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

// Who we build for - scrolls in the right column.
const marqueeItems = [
  "Founders & Execs",
  "Startups",
  "Enterprises",
  "Product Teams",
  "Scale-ups",
];

/**
 * H9 - Final CTA. Vertical text marquee of who we build for, with a
 * center-focus opacity falloff (rAF). Adapted from the 21st.dev
 * lyanchouss/cta-with-text-marquee reference; dark Webify palette.
 */
export function CtaSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    let frame = 0;
    let running = false;
    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll(".marquee-item");
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.85;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
      frame = requestAnimationFrame(updateOpacity);
    };

    // Perf: only run the per-frame opacity loop while the CTA is on screen, so
    // it isn't doing layout reads on every frame for the whole rest of the page.
    // (The visible animation is unchanged.)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(updateOpacity);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(marqueeContainer);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="cta"
      aria-label="Start a project"
      className="flex min-h-svh w-full items-center justify-center overflow-hidden px-6 py-24 text-foreground sm:py-32"
    >
      <div className="w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left - CTA copy */}
          <div className="max-w-xl space-y-8">
            <SparklesTitle
              as="h2"
              className="animate-fade-in-up text-balance text-5xl font-medium leading-tight tracking-tight text-foreground [animation-delay:200ms] md:text-6xl lg:text-7xl"
              beamClassName="mx-0 mr-auto mt-1 max-w-[22rem]"
              density={32}
            >
              Let&apos;s <span className="script-accent">build</span> your product.
            </SparklesTitle>
            <p className="animate-fade-in-up text-lg leading-relaxed text-landing-text-muted [animation-delay:400ms] md:text-xl">
              Tell us about the idea you can&apos;t stop thinking about. In one free
              call we&apos;ll scope it, price it, and show you exactly how we&apos;d
              ship it - fast, senior-led, and 100% yours to keep.
            </p>
            <div className="animate-fade-in-up space-y-3 [animation-delay:600ms]">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-pill bg-foreground px-7 font-semibold text-background transition-transform duration-[--dur] ease-[--ease-out] hover:scale-[1.02]"
                >
                  <span className="relative z-10">Book your free strategy call</span>
                  <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
                </Link>
                <Link
                  href="/work"
                  className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-pill border border-border bg-white/4 px-7 font-medium text-foreground transition-colors duration-[--dur] hover:bg-white/8"
                >
                  <span className="relative z-10">See our work</span>
                </Link>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-landing-text-muted">
                Free · No obligation · We reply within 24h
              </p>
            </div>
          </div>

          {/* Right - vertical marquee */}
          <div
            ref={marqueeRef}
            className="relative flex h-[clamp(320px,52vh,700px)] animate-fade-in-up items-center justify-center [animation-delay:400ms]"
          >
            {/* Mask fades the marquee to transparent at top/bottom so the
                starfield shows through (instead of solid-black vignettes). */}
            <div className="relative h-full w-full [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%,#000_84%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%,#000_84%,transparent_100%)]">
              <VerticalMarquee speed={20} pauseOnHover className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="marquee-item py-8 text-4xl font-light tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
