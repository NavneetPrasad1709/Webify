"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { projectDetails } from "@/lib/pages/project";
import PillButton from "@/components/ui/PillButton";
import RollingText from "@/components/ui/RollingText";

/** /project - "SELECTED WORKS" index of the six portfolio projects. */
export default function ProjectsIndex() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Page-load reveal for the title block
      gsap.fromTo(
        "[data-proj-title] > *",
        revealFrom,
        { ...revealTo, stagger: 0.12, delay: 0.1 },
      );

      // Card entrance (the hero video supplies its own motion, so no
      // zoom-parallax on the visual, which would crop the sides).
      gsap.utils.toArray<HTMLElement>("[data-proj-card]").forEach((card) => {
        gsap.fromTo(card, revealFrom, {
          ...revealTo,
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-5 pb-10 pt-32 text-ink md:px-10 md:pt-40"
    >
      {/* Section title */}
      <div data-proj-title className="mx-auto max-w-[1720px] text-center">
        <p className="eyebrow text-gray-mid">SELECTED WORK</p>
        <h1 className="display-3 mt-4 text-ink">
          <span className="block">SELECTED</span>
          <span className="block">WORKS</span>
        </h1>
      </div>

      {/* Project rows */}
      <div className="mx-auto mt-16 flex max-w-[1720px] flex-col gap-6 md:mt-24 md:gap-8">
        {projectDetails.map((p) => (
          <article
            key={p.slug}
            data-proj-card
            className="relative grid grid-cols-1 gap-6 rounded-card bg-fill-light p-6 md:grid-cols-[1fr_minmax(0,680px)_1fr] md:items-center md:gap-8 md:p-10"
          >
            {/* Left - live-build chip */}
            <div className="order-2 flex items-end gap-3 self-end md:order-1">
              <Link
                href={`/project/${p.slug}`}
                className="w-max rounded-lg bg-white px-3.5 py-2"
              >
                <p className="text-[12px] uppercase tracking-wide text-gray-mid">
                  Live Build
                </p>
                <p className="text-[15px] font-semibold leading-tight">
                  View Project
                </p>
              </Link>
            </div>

            {/* Center - visual */}
            <Link
              href={`/project/${p.slug}`}
              className="order-1 block overflow-hidden rounded-xl shadow-[0_16px_44px_rgba(0,0,0,.12)] md:order-2"
            >
              <div className="aspect-[8/5] w-full">
                <video
                  data-proj-visual
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={p.image}
                  className="h-full w-full object-cover will-change-transform"
                >
                  <source src={p.video} type="video/mp4" />
                </video>
              </div>
            </Link>

            {/* Right - view pill (top) + project name (bottom) */}
            <div className="order-3 flex flex-col md:h-full md:items-end md:justify-between">
              <Link
                href={`/project/${p.slug}`}
                className="group hidden w-max items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:inline-flex"
              >
                <RollingText label="View" em={1.2} delayStep={26} />
              </Link>
              <div className="md:text-right">
                <p className="eyebrow text-gray-mid">PROJECT</p>
                <Link href={`/project/${p.slug}`} className="group inline-block">
                  <h2 className="mt-1 text-2xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-primary md:text-[28px]">
                    {p.name}
                  </h2>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Closing conversion step: the strongest buying-intent page should not
          dead-end into the footer. */}
      <div className="mx-auto mt-16 flex flex-col items-center gap-5 text-center md:mt-24">
        <p className="max-w-md text-base font-medium text-black">
          Want a build like these for your own product? Fixed quote within 3
          working days.
        </p>
        <PillButton tone="dark" href="/contact">
          Start a Project
        </PillButton>
      </div>
    </section>
  );
}
