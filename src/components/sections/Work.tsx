"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/anim";
import { projectDetails } from "@/lib/pages/project";
import PillButton from "@/components/ui/PillButton";
import RollingText from "@/components/ui/RollingText";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");

      if (reduce) {
        gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1, filter: "none" });
        gsap.set(".work-title-line, .work-tag", { autoAlpha: 1, yPercent: 0 });
        return;
      }

      // Title: tag settles, then OUR / WORK rise through their line-masks.
      gsap.from(".work-tag", {
        autoAlpha: 0,
        y: 18,
        filter: "blur(6px)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".work-title-line", {
        yPercent: 115,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      const stickies = gsap.utils.toArray<HTMLElement>("[data-work-sticky]");
      stickies.forEach((wrap, i) => {
        const card = wrap.querySelector<HTMLElement>("[data-work-card]");
        if (!card) return;
        const next = stickies[i + 1];

        // Soft fade as the card first arrives (the stacking supplies the motion).
        gsap.from(card, {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
        });

        // STACK: as the next card rises to cover this one, this one recedes -
        // scaling down and dimming behind it so the deck reads with depth.
        if (next) {
          gsap.fromTo(
            card,
            { scale: 1, filter: "brightness(1)" },
            {
              scale: 0.9,
              filter: "brightness(0.82)",
              ease: "none",
              transformOrigin: "center top",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top 16%", scrub: true },
            }
          );
        }

        // Image pans vertically inside its frame - smooth translate parallax.
        const visual = card.querySelector<HTMLElement>("[data-work-visual]");
        if (visual) {
          gsap.fromTo(
            visual,
            { yPercent: 0 },
            {
              yPercent: -16,
              ease: "none",
              scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1 },
            }
          );
        }
      });

      // Recede the pinned title as the card stack scrolls past: fade + scale
      // down + soft blur for depth recession.
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 1, scale: 1, filter: "blur(0px)", transformOrigin: "center center" },
          {
            opacity: 0,
            scale: 0.94,
            filter: "blur(4px)",
            transformOrigin: "center center",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom 90%",
              end: "bottom 40%",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative rounded-t-card-lg bg-white py-24 text-ink md:py-32"
    >
      {/* Pinned title - cards scroll over it */}
      <div
        ref={titleRef}
        className="pointer-events-none sticky top-[18vh] z-0 px-5 text-center md:px-10"
      >
        <p className="work-tag eyebrow text-gray-mid">SELECTED WORK</p>
        <h2 className="display-1 mt-4 leading-[0.85] text-ink">
          <span className="block overflow-hidden">
            <span className="work-title-line block">OUR</span>
          </span>
          <span className="block overflow-hidden">
            <span className="work-title-line block">WORK</span>
          </span>
        </h2>
      </div>

      {/* Card stack - sticky cards pile into a deck as you scroll */}
      <div className="relative z-10">
        {projectDetails.map((p, i) => {
          const slug = p.slug;
          return (
            <div
              key={p.name}
              data-work-sticky
              className={`sticky top-[8vh] md:top-[14vh] ${
                i === 0 ? "mt-[14vh]" : "mt-[7vh] md:mt-[11vh]"
              }`}
            >
              <article
                data-work-card
                className="relative mx-auto flex w-[min(94%,1240px)] flex-col gap-6 rounded-card bg-fill-light p-6 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.45)] will-change-transform md:min-h-[62vh] md:p-10"
              >
              {/* Center - visual (in flow on mobile, absolutely centered on md+).
                  Hover scale lives on the frame; GSAP pans the img vertically. */}
              <Link
                href={`/project/${slug}`}
                className="group/visual block w-full overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,.12)] md:absolute md:inset-0 md:m-auto md:h-max md:w-[46%]"
              >
                <div className="relative aspect-[8/5] w-full overflow-hidden transition-transform duration-500 ease-out group-hover/visual:scale-[1.02]">
                  <img
                    data-work-visual
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-x-0 top-0 h-[135%] w-full object-cover will-change-transform"
                  />
                </div>
              </Link>

              {/* Top-left - honest date chip (matches the reference's date box) */}
              <div className="absolute left-6 top-6 z-20 rounded-lg bg-white px-3.5 py-2 shadow-sm md:left-10 md:top-10">
                <p className="text-[12px] uppercase tracking-wide text-gray-mid">Date</p>
                <p className="text-[15px] font-semibold leading-tight">{p.year}</p>
              </div>

              {/* Top-right - view (letter-flip, no arrow) */}
              <Link
                href={`/project/${slug}`}
                className="group absolute right-6 top-6 z-20 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:right-10 md:top-10"
              >
                <RollingText label="View" em={1.2} delayStep={26} />
              </Link>

              {/* Bottom-left - bar + live-build chip */}
              <div className="flex flex-wrap items-center gap-3 md:absolute md:bottom-10 md:left-10 md:flex-nowrap">
                <span aria-hidden className="h-[44px] w-[3px] rounded-full bg-ink/80" />
                <Link
                  href={`/project/${slug}`}
                  className="w-max rounded-lg bg-white px-3.5 py-2"
                >
                  <p className="text-[12px] uppercase tracking-wide text-gray-mid">Live Build</p>
                  <p className="text-[15px] font-semibold leading-tight">View Project</p>
                </Link>
              </div>

              {/* Bottom-right - project name */}
              <div className="text-left md:absolute md:bottom-10 md:right-10 md:text-right">
                <p className="eyebrow text-gray-mid">PROJECT</p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-tight md:text-[32px]">
                  {p.name}
                </h3>
              </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-16 flex justify-center md:mt-24">
        <PillButton tone="dark" href="/project">
          View All Projects
        </PillButton>
      </div>
    </section>
  );
}
