import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCaseStudies, type CaseStudyEntry } from "@/lib/case-studies";
import { SparklesTitle } from "@/components/ui/sparkles-title";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Selected Webify work, in depth — AI products, web platforms, and mobile apps shipped for founders and teams. Outcomes, timelines, and what we built.",
};

function CaseStudyCard({ study, index }: { study: CaseStudyEntry; index: number }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      aria-label={`Read case study: ${study.title}`}
      className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <article className="flex flex-col gap-7 border-b border-white/10 pb-14 last:border-0 sm:gap-8 md:flex-row md:items-center md:gap-12">
        {/* Cover — big, shadowed, hover-scaled (goodreads-style) */}
        <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] transition-colors duration-500 group-hover:border-white/25 md:aspect-[3/4] md:w-56 lg:w-64">
          <Image
            src={study.cover.src}
            alt={study.cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={index === 0}
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1 space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            <span>{study.category}</span>
            <span aria-hidden className="opacity-40">/</span>
            <span>{study.year}</span>
          </div>

          <h2 className="text-balance text-3xl font-black leading-[1.05] text-foreground transition-colors group-hover:text-accent-hi sm:text-4xl lg:text-5xl">
            {study.title}
          </h2>

          <p className="text-xl font-bold text-muted-foreground sm:text-2xl">{study.client}</p>

          <p className="max-w-[60ch] text-base leading-relaxed text-muted-foreground/80 sm:text-lg">
            {study.summary}
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-1">
            {study.results.map((r) => (
              <div key={r.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-foreground sm:text-3xl">{r.value}</span>
                <span className="text-sm text-muted-foreground sm:text-base">{r.label}</span>
              </div>
            ))}
            <span className="ml-auto hidden items-center gap-1.5 text-sm font-semibold text-accent-hi transition-all group-hover:gap-2.5 sm:inline-flex">
              Read case study
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/** /case-studies — selected work, goodreads-card styling, mobile-first. */
export default function CaseStudiesPage() {
  const studies = getCaseStudies();
  return (
    <main className="mx-auto w-full max-w-[var(--size-container)] px-6 pb-24 pt-28 sm:px-10 sm:pt-36 lg:pt-40">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Case Studies
        </p>
        <SparklesTitle
          as="h1"
          className="mt-5 max-w-[20ch] text-balance text-[clamp(2.5rem,8vw,4.5rem)] font-black leading-[1.02] tracking-tight"
          beamClassName="mx-0 mr-auto mt-2 max-w-[22rem]"
        >
          <span className="script-accent">Proof</span>, not promises.
        </SparklesTitle>
        <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A look at what we&apos;ve shipped — the problem, the build, and the
          outcome. Real numbers, real timelines. {/* [REPLACE: real studies] */}
        </p>
      </header>

      <div className="mt-14 space-y-14 sm:mt-20 sm:space-y-16">
        {studies.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} index={i} />
        ))}
      </div>
    </main>
  );
}
