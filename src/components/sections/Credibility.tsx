"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, revealTo } from "@/lib/anim";

/* Headline words ignite grey -> ink on scroll (the template's signature move). */
const HEADLINE = "We turn ideas into products that grow your business.".split(" ");

/* The three reasons a client can trust a new studio - our honest pillars. */
const PILLARS = [
  {
    title: "Senior-led, end to end",
    body: "You work directly with the people who design and build.",
  },
  {
    title: "Reply within 24 hours",
    body: "A senior team member answers, with no sales layer in between.",
  },
  {
    title: "You own everything",
    body: "Every file, repo, and asset is yours from day one.",
  },
];

/* Honest "what we build" wordmarks - our own service marks, uniform logotypes
   scrolling like a logo row, split by a cobalt spark. */
const FOCUS = [
  "SaaS Dashboards",
  "Fintech Onboarding",
  "D2C Storefronts",
  "CRM Rollouts",
  "SEO Rebuilds",
  "Founder Portfolios",
];

function Spark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.2l2.3 7.5L21.8 12l-7.5 2.3L12 21.8l-2.3-7.5L2.2 12l7.5-2.3z" />
    </svg>
  );
}

export default function Credibility() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // White band rises + blurs in as it scrolls over the hero.
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, filter: "blur(10px)" },
        {
          ...revealTo,
          duration: 1.1,
          scrollTrigger: { trigger: cardRef.current, start: "top 90%" },
        }
      );

      // Signature move: headline words scrub from light grey to ink as the
      // section travels up through the viewport - reading paced by scroll.
      gsap.fromTo(
        ".cred-word",
        { color: "#d3d3d3" },
        {
          color: "#000000",
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: ".cred-headline",
            start: "top 80%",
            end: "top 35%",
            scrub: 0.6,
          },
        }
      );

      // Founding stamp fades + rises in under the headline.
      gsap.fromTo(
        ".cred-est",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cred-est", start: "top 92%" },
        }
      );

      // Pillars fade + rise in, staggered.
      gsap.fromTo(
        ".cred-pillar",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".cred-pillars", start: "top 88%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="-mt-2 bg-ink pb-6">
      {/* Full-width white band; content aligns to the site's 1240px column. */}
      <div
        ref={cardRef}
        className="rounded-card-lg bg-white pt-14 pb-12 text-ink md:pt-16 md:pb-14"
      >
        <div className="mx-auto w-[min(94%,1240px)]">
          {/* Header eyebrow */}
          <p className="eyebrow text-[15px] text-ink">OUR GOAL</p>

          {/* Main: scroll-fill headline + founding stamp | trust pillars */}
          <div className="mt-7 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-3xl">
              <h2 className="cred-headline text-[clamp(30px,4.4vw,56px)] font-extrabold uppercase leading-[1.05] tracking-tight">
                {HEADLINE.map((word, i) => (
                  <span key={i} className="cred-word mr-[0.26em] inline-block">
                    {word}
                  </span>
                ))}
              </h2>

              {/* Founding stamp - honest provenance, large under the headline */}
              <p className="cred-est mt-7 flex items-baseline gap-3 text-[clamp(38px,6.4vw,84px)] font-extrabold uppercase leading-none tracking-tight md:mt-9">
                <span className="text-ink">Est.</span>
                <span className="text-primary">2026</span>
              </p>
            </div>

            <div className="cred-pillars flex shrink-0 flex-col gap-6 lg:max-w-[300px] lg:border-l lg:border-border-soft lg:pl-9">
              {PILLARS.map((p) => (
                <div key={p.title} className="cred-pillar flex items-start gap-3">
                  <Spark className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold tracking-tight text-ink">{p.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-black font-medium">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What-we-build strip: uniform logotypes scrolling like a logo row,
            split by a cobalt spark (marquee pauses on hover). */}
        <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:mt-16">
          <div
            className="flex w-max animate-marquee-left items-center"
            style={{ "--marquee-duration": "36s" } as React.CSSProperties}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center"
              >
                {FOCUS.map((name) => (
                  <span key={name} className="flex shrink-0 items-center">
                    <span className="whitespace-nowrap px-8 text-[28px] font-semibold leading-none tracking-tight text-ink transition-colors duration-300 hover:text-primary md:px-11 md:text-[36px]">
                      {name}
                    </span>
                    <Spark className="h-3.5 w-3.5 shrink-0 text-primary md:h-4 md:w-4" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
