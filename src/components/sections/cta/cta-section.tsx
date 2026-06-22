"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";

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

// Who we build for — scrolls in the right column.
const marqueeItems = [
  "Founders & Execs",
  "Startups",
  "Enterprises",
  "Product Teams",
  "Scale-ups",
];

/**
 * H9 — Final CTA. Vertical text marquee of who we build for, with a
 * center-focus opacity falloff (rAF). Adapted from the 21st.dev
 * lyanchouss/cta-with-text-marquee reference; dark Webify palette.
 */
export function CtaSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    let frame = 0;
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

    frame = requestAnimationFrame(updateOpacity);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="cta"
      aria-label="Start a project"
      className="flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-24 text-foreground"
    >
      <div className="w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left — CTA copy */}
          <div className="max-w-xl space-y-8">
            <h2 className="animate-fade-in-up text-balance text-5xl font-medium leading-tight tracking-tight text-foreground [animation-delay:200ms] md:text-6xl lg:text-7xl">
              Let&apos;s <span className="script-accent">build</span> your product.
            </h2>
            <p className="animate-fade-in-up text-lg leading-relaxed text-landing-text-muted [animation-delay:400ms] md:text-xl">
              Book a free strategy call. We&apos;ll scope the work, map the build,
              and ship a working prototype — fast. Senior-led, end to end.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up [animation-delay:600ms]">
              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-md bg-foreground px-6 py-3 font-medium text-background transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10">BOOK A CALL</span>
                <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              </Link>
              <Link
                href="/work"
                className="group relative overflow-hidden rounded-md border border-white/15 bg-white/[0.04] px-6 py-3 font-medium text-foreground transition-all duration-300 hover:scale-105 hover:bg-white/[0.08] hover:shadow-lg"
              >
                <span className="relative z-10">SEE OUR WORK</span>
                <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              </Link>
            </div>
          </div>

          {/* Right — vertical marquee */}
          <div
            ref={marqueeRef}
            className="relative flex h-[600px] animate-fade-in-up items-center justify-center [animation-delay:400ms] lg:h-[700px]"
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
