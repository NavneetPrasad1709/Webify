"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { LiveProjectButton } from "./live-project-button";

/**
 * H5 — Featured work. Sticky-stacking project cards that scale down as the next
 * card slides up, forming a layered deck (sshahaider-style projects deck).
 *
 * The scroll-scale is driven by GSAP ScrollTrigger (synced to our Lenis
 * smooth-scroll) rather than framer's useScroll, which desyncs under Lenis.
 * Sticky offsets clear the fixed nav (~75px). Reduced-motion keeps the sticky
 * stack but skips the scale.
 *
 * [REPLACE:] images are the supplied reference assets — swap for real Webify
 * case-study captures when available.
 */
type ProjectCategory = "Client" | "Personal";

interface Project {
  number: string;
  name: string;
  category: ProjectCategory;
  images: { col1a: string; col1b: string; col2: string };
}

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Nextlevel Studio",
    category: "Client",
    images: {
      col1a:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1b:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    },
  },
  {
    number: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    images: {
      col1a:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1b:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    },
  },
  {
    number: "03",
    name: "Solaris Digital",
    category: "Client",
    images: {
      col1a:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1b:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    },
  },
];

export function ProjectsSection() {
  return (
    <section
      className={cn(
        "relative z-10",
        "-mt-10 sm:-mt-12 md:-mt-14",
        "px-4 pt-16 sm:px-6 sm:pt-20 md:px-8 md:pt-24",
      )}
      aria-label="Featured work"
    >
      <h2
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Featured <span className="script-accent">work</span>
      </h2>

      {/* Cards are DIRECT siblings here so they share one sticky containing
          block and pile on top of each other. pb gives the last card pin time. */}
      <div className="mx-auto mt-10 max-w-7xl space-y-[8vh] pb-[24vh] sm:mt-14">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const card = useRef<HTMLDivElement>(null);
  // Later cards shrink less; the topmost (last) card stays at scale 1.
  const targetScale = 1 - (total - 1 - index) * 0.04;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const k = card.current;
    if (!k) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(k, { transformOrigin: "top center" });
      gsap.fromTo(
        k,
        { scale: 1 },
        {
          scale: targetScale,
          ease: "none",
          scrollTrigger: {
            trigger: k,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [targetScale]);

  return (
    <div
      ref={card}
      className={cn(
        "sticky overflow-hidden bg-[#0C0C0C]",
        "border-2 border-[#D7E2EA]",
        "rounded-[32px] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8",
      )}
      style={{ top: `calc(5.5rem + ${index * 28}px)` }}
    >
      {/* Top row: number + meta + Live Project */}
        <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className="nums font-black leading-none tracking-tight text-[#D7E2EA] [font-family:var(--font-geist-sans)]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 90px)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col pt-1">
              <span className="text-[0.7rem] uppercase tracking-widest text-[#D7E2EA]/60 sm:text-xs">
                {project.category}
              </span>
              <span className="text-xl font-semibold leading-tight text-[#D7E2EA] sm:text-2xl md:text-3xl">
                {project.name}
              </span>
            </div>
          </div>

          <LiveProjectButton />
        </div>

        {/* Bottom row: 40% / 60% image grid */}
        <div className="mt-5 flex gap-3 sm:mt-6 sm:gap-6 md:gap-8">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-6 md:gap-8">
            <div
              className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[40px] md:rounded-[50px]"
              style={{ height: "clamp(80px, 9vw, 130px)" }}
            >
              <Image
                src={project.images.col1a}
                alt={`${project.name} — image 1`}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
            <div
              className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[40px] md:rounded-[50px]"
              style={{ height: "clamp(100px, 12vw, 165px)" }}
            >
              <Image
                src={project.images.col1b}
                alt={`${project.name} — image 2`}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative w-[60%] overflow-hidden rounded-[20px] sm:rounded-[40px] md:rounded-[50px]">
            <Image
              src={project.images.col2}
              alt={`${project.name} — cover`}
              fill
              sizes="(max-width: 640px) 60vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
  );
}
