"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { SparklesTitle } from "@/components/ui/sparkles-title";

/**
 * H5 - Featured work. Sticky-stacking project cards that scale down as the next
 * card slides up, forming a layered deck (sshahaider-style projects deck).
 *
 * The first card is real, shipped client work (StealthConnect) shown as a
 * looping in-browser product clip captured from the live site, so the project
 * reads as alive and in motion. The remaining cards are illustrative capability
 * tiles - kept honest with no fabricated client names.
 *
 * The scroll-scale is driven by GSAP ScrollTrigger (synced to our Lenis
 * smooth-scroll). Sticky offsets clear the fixed nav. Reduced-motion keeps the
 * sticky stack but skips the scale, and the video falls back to its poster.
 */
interface ProjectVideo {
  mp4: string;
  webm: string;
  poster: string;
  /** Domain shown in the faux browser chrome. */
  domain: string;
}

interface Project {
  number: string;
  name: string;
  category: string;
  /** When set, the card links to a real case study and shows the "Client" tag. */
  href?: string;
  tag?: string;
  /** Real work: a looping in-browser clip + headline metrics. */
  video?: ProjectVideo;
  metrics?: { v: string; l: string }[];
  /** Illustrative capability tiles use a 3-image grid instead. */
  images?: { col1a: string; col1b: string; col2: string };
}

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "StealthConnect — verified LinkedIn contacts in 30 min",
    category: "AI Product",
    href: "/work/stealthconnect",
    tag: "Client · Live",
    video: {
      mp4: "/work/stealthconnect/demo.mp4",
      webm: "/work/stealthconnect/demo.webm",
      poster: "/work/stealthconnect/demo-poster.jpg",
      domain: "stealthconnect.ai",
    },
    metrics: [
      { v: "97.2%", l: "verified" },
      { v: "28 min", l: "avg delivery" },
      { v: "800M+", l: "contacts" },
    ],
  },
  {
    number: "02",
    name: "Agents, copilots & automation",
    category: "AI Products",
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
    number: "03",
    name: "Next.js sites & web apps",
    category: "Web Platforms",
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
    number: "04",
    name: "iOS & Android, one codebase",
    category: "Mobile Apps",
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
        // consistent section start gap (no negative overlap into the prior
        // section, so the boundary reads clearly)
        "px-4 pt-24 sm:px-6 sm:pt-32 md:px-8",
      )}
      aria-label="Featured work"
    >
      <SparklesTitle
        as="h2"
        className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]"
        beamClassName="mx-auto mt-1 max-w-[26rem]"
        density={36}
      >
        Built to <span className="script-accent">ship.</span>
      </SparklesTitle>

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

/** Looping in-browser product clip - plays only while on-screen, pauses off-screen
 *  and for reduced-motion users (poster stays visible). */
function ProductVideo({ video }: { video: ProjectVideo }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c11] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:rounded-3xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-white/55">
            <Lock className="h-3 w-3" aria-hidden />
            {video.domain}
          </span>
        </div>
        <span className="w-[54px]" aria-hidden />
      </div>

      {/* The live product, in motion */}
      <div className="relative aspect-[16/10] w-full">
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover object-top"
          poster={video.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      </div>
    </div>
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
      data-cursor="view"
      className={cn(
        "group sticky overflow-hidden",
        "rounded-[32px] p-4 sm:rounded-[44px] sm:p-6 md:rounded-[52px] md:p-8",
        "border border-white/10 bg-gradient-to-b from-[#16161c] to-[#0a0a0d]",
        "shadow-[0_40px_120px_-45px_rgba(0,0,0,0.95)]",
        "transition-colors duration-500 hover:border-white/20",
      )}
      style={{ top: `calc(5.5rem + ${index * 28}px)` }}
    >
      {/* Whole-card link to the case study (real work only). */}
      {project.href ? (
        <Link
          href={project.href}
          aria-label={`View case study: ${project.name}`}
          className="absolute inset-0 z-30"
        />
      ) : null}

      {/* Violet accent line — grows from the left on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 h-[3px] w-full origin-left scale-x-0 bg-[#8b5cf6] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      {/* Top row: number + label + (case-study affordance) */}
      <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-4 sm:gap-6">
          <span
            className="nums font-black leading-none tracking-tight text-[#E8EEF2] [font-family:var(--font-geist-sans)]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 90px)" }}
          >
            {project.number}
          </span>
          <div className="flex flex-col items-start pt-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex w-fit rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 px-3 py-1 text-[0.7rem] uppercase tracking-widest text-[#E8EEF2]/80 sm:text-xs">
                {project.category}
              </span>
              {project.tag ? (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#4ade80]/40 bg-[#4ade80]/15 px-3 py-1 text-[0.7rem] uppercase tracking-widest text-[#4ade80] sm:text-xs">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                  </span>
                  {project.tag}
                </span>
              ) : null}
            </div>
            <span className="text-xl font-semibold leading-tight text-[#E8EEF2] sm:text-2xl md:text-3xl">
              {project.name}
            </span>
          </div>
        </div>

        {project.href ? (
          <span className="hidden items-center gap-1.5 self-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#E8EEF2] transition-colors group-hover:border-[#4ade80] group-hover:text-[#4ade80] sm:inline-flex">
            View case study
            <ArrowUpRight className="h-4 w-4" />
          </span>
        ) : null}
      </div>

      {/* Body: video product-window (real work) or 3-image grid (capabilities) */}
      {project.video ? (
        <div className="mt-5 sm:mt-7">
          <ProductVideo video={project.video} />
          {project.metrics ? (
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-6">
              {project.metrics.map((m, i) => (
                <span key={m.l} className="inline-flex items-center gap-3">
                  {i > 0 ? (
                    <span className="h-3.5 w-px bg-white/15" aria-hidden />
                  ) : null}
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-white sm:text-lg">
                      {m.v}
                    </span>
                    <span className="text-[0.7rem] uppercase tracking-wider text-white/45 sm:text-xs">
                      {m.l}
                    </span>
                  </span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : project.images ? (
        <div className="mt-5 flex gap-3 sm:mt-6 sm:gap-6 md:gap-8">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-6 md:gap-8">
            <div
              className="relative w-full overflow-hidden rounded-[20px] border border-white/10 sm:rounded-[34px] md:rounded-[40px]"
              style={{ height: "clamp(80px, 9vw, 130px)" }}
            >
              <Image
                src={project.images.col1a}
                alt={`${project.name} - image 1`}
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div
              className="relative w-full overflow-hidden rounded-[20px] border border-white/10 sm:rounded-[34px] md:rounded-[40px]"
              style={{ height: "clamp(100px, 12vw, 165px)" }}
            >
              <Image
                src={project.images.col1b}
                alt={`${project.name} - image 2`}
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          <div className="relative w-[60%] overflow-hidden rounded-[20px] border border-white/10 sm:rounded-[34px] md:rounded-[40px]">
            <Image
              src={project.images.col2}
              alt={`${project.name} - cover`}
              fill
              sizes="(max-width: 640px) 60vw, 42vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
