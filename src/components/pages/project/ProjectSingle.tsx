"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import {
  type ProjectDetail,
  projectBodyImage,
  projectCraft,
  projectSections,
} from "@/lib/pages/project";
import PillButton from "@/components/ui/PillButton";
import RollingText from "@/components/ui/RollingText";

/** /project/[slug] - narrative body for a single self-initiated concept build. */
export default function ProjectSingle({
  project,
  next,
}: {
  project: ProjectDetail;
  next: ProjectDetail;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header block reveals on load
      gsap.fromTo(
        "[data-ps-load]",
        revealFrom,
        { ...revealTo, stagger: 0.12, delay: 0.1 },
      );

      // Scroll reveals for body blocks
      gsap.utils.toArray<HTMLElement>("[data-ps-reveal]").forEach((el) => {
        gsap.fromTo(el, revealFrom, {
          ...revealTo,
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      // Parallax zoom on the large imagery
      gsap.utils.toArray<HTMLElement>("[data-ps-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Count-up feature numbers (mirrors the source counter-animation)
      gsap.utils.toArray<HTMLElement>("[data-ps-counter]").forEach((el) => {
        const end = parseFloat(el.dataset.count || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val));
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const richHeading = "text-[18px] font-extrabold tracking-tight text-ink md:text-[20px]";
  const richBody = "mt-3 text-[15px] leading-[1.7] text-black font-medium md:text-base";

  return (
    <section
      ref={sectionRef}
      className="bg-white px-5 pb-10 pt-32 text-ink md:px-10 md:pt-40"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Header - details left, CMS meta right */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <p data-ps-load className="eyebrow text-gray-mid">
              PROJECT DETAILS
            </p>
            <h1
              data-ps-load
              className="mt-4 font-extrabold tracking-tight"
              style={{ fontSize: "clamp(38px,5vw,68px)", lineHeight: 1 }}
            >
              {project.name}
            </h1>
            <p
              data-ps-load
              className="mt-6 max-w-[560px] text-[15px] leading-[1.7] text-black font-medium md:text-base"
            >
              {project.description}
            </p>
          </div>

          <div data-ps-load className="self-end">
            {project.meta.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between border-t border-ink/10 py-4 ${
                  i === project.meta.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="eyebrow text-gray-mid">{row.label}</p>
                <p className="text-[15px] font-semibold">{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-12 overflow-hidden rounded-card md:mt-16">
          <div className="aspect-[8/5] w-full md:aspect-[2/1]">
            <img
              data-ps-parallax
              src={project.image}
              alt={project.name}
              fetchPriority="high"
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
        </div>

        {/* Rich text - overview + challenge */}
        <div className="mx-auto mt-16 max-w-[820px] md:mt-24">
          {/* Honest labeling: these projects are studio concepts, not client work. */}
          <div data-ps-reveal className="mb-10">
            <p className="eyebrow text-gray-mid">SELF-INITIATED CONCEPT BUILD</p>
            <p className="mt-2 text-sm text-black font-medium">
              The kind of engagement we take on for clients, designed and built
              in-house to show how we work.
            </p>
          </div>
          <div data-ps-reveal>
            <h2 className={richHeading}>{projectSections.overview}</h2>
            <p className={richBody}>{project.overview}</p>
          </div>
          <div data-ps-reveal className="mt-10">
            <h2 className={richHeading}>{projectSections.challenge}</h2>
            <p className={richBody}>{project.challenge}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-black font-medium md:text-base">
              {project.challengePoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Body image */}
        <div className="mt-16 overflow-hidden rounded-card md:mt-24">
          <div className="aspect-[8/5] w-full md:aspect-[1.91/1]">
            <img
              data-ps-parallax
              src={project.bodyImage || projectBodyImage}
              alt={`${project.name} concept build detail`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
        </div>

        {/* Craft at a glance */}
        <div
          data-ps-reveal
          className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-[1fr_2fr] md:gap-16"
        >
          <h2 className="text-[22px] font-extrabold tracking-tight md:text-[26px]">
            {projectCraft.heading}
          </h2>
          <p className="text-[15px] leading-[1.7] text-black font-medium md:text-base">
            {projectCraft.body}
          </p>
        </div>

        {/* Feature counters */}
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ink/10 pt-12 md:mt-20 md:grid-cols-3 md:gap-12">
          {project.features.map((f) => (
            <div key={f.label} data-ps-reveal>
              <div className="flex items-start font-extrabold tracking-tight">
                <span
                  data-ps-counter
                  data-count={f.value}
                  className="text-[56px] leading-none md:text-[72px]"
                >
                  0
                </span>
                <span className="text-[56px] leading-none md:text-[72px]">
                  {f.suffix}
                </span>
              </div>
              <p className="mt-3 text-[15px] font-semibold uppercase tracking-wide text-primary">
                {f.label}
              </p>
              <p className="mt-3 text-[14px] leading-[1.7] text-black font-medium md:text-[15px]">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {/* Rich text - solution + results */}
        <div className="mx-auto mt-16 max-w-[820px] md:mt-24">
          <div data-ps-reveal>
            <h2 className={richHeading}>{projectSections.solution}</h2>
            <p className={richBody}>{project.solution}</p>
          </div>
          <div data-ps-reveal className="mt-10">
            <h2 className={richHeading}>{projectSections.results}</h2>
            <p className={richBody}>{project.results}</p>
          </div>
        </div>

        {/* Conversion step: readers this deep are the highest-intent visitors */}
        <div
          data-ps-reveal
          className="mx-auto mt-16 flex max-w-[820px] flex-col items-center gap-5 text-center md:mt-24"
        >
          <p className="max-w-md text-base font-medium text-black">
            Want a build like this for your own product? Fixed quote within 3
            working days.
          </p>
          <PillButton tone="blue" href="/contact">
            Start a Project
          </PillButton>
        </div>

        {/* Next project */}
        <Link
          data-ps-reveal
          href={`/project/${next.slug}`}
          className="group mt-16 flex items-center justify-between gap-6 border-t border-ink/10 pt-10 md:mt-24"
        >
          <div>
            <p className="eyebrow text-gray-mid">NEXT PROJECT</p>
            <h2 className="mt-2 text-[28px] font-extrabold tracking-tight transition-colors duration-300 group-hover:text-primary md:text-[44px]">
              {next.name}
            </h2>
          </div>
          <span className="hidden shrink-0 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex">
            <RollingText label="View" em={1.2} delayStep={26} />
          </span>
        </Link>
      </div>
    </section>
  );
}
