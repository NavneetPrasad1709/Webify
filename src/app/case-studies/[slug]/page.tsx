import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  getCaseStudyEntry,
  getCaseStudySlugs,
  CASE_STUDIES,
} from "@/lib/case-studies";
import { FadeUp } from "@/components/sections/cta/fade-up";
import {
  CaseContainer,
  CaseSection,
  Prose,
  StackChips,
  MetricGrid,
  CaseFigure,
} from "@/components/sections/case-study/case-study-parts";

// Fixed set — prerender each study; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyEntry(slug);
  if (!study) return {};
  const url = `/case-studies/${study.slug}`;
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", title: study.title, description: study.summary, url },
    twitter: { card: "summary_large_image", title: study.title, description: study.summary },
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyEntry(slug);
  if (!study) notFound();

  const idx = CASE_STUDIES.findIndex((s) => s.slug === slug);
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  return (
    <main className="pb-24 pt-28 sm:pt-36">
      <article>
        {/* Hero */}
        <CaseContainer>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
              <li>
                <Link href="/case-studies" className="transition-colors hover:text-foreground">
                  Case Studies
                </Link>
              </li>
              <li aria-hidden className="text-neutral-700">/</li>
              <li className="truncate text-neutral-300">{study.client}</li>
            </ol>
          </nav>

          <header className="pt-8 sm:pt-10">
            <FadeUp>
              <p
                className="font-mono uppercase tracking-[0.2em] text-accent-hi"
                style={{ fontSize: "clamp(1rem,3.2vw,1.5rem)" }}
              >
                {study.category}
                <span className="mx-3 text-neutral-700">·</span>
                {study.year}
              </p>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1
                className="mt-6 max-w-[18ch] text-balance font-black leading-[0.98] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.5rem,9vw,5.5rem)" }}
              >
                {study.title}
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p
                className="mt-7 max-w-[40ch] text-balance leading-[1.3] text-muted-foreground"
                style={{ fontSize: "clamp(1.25rem,4vw,2rem)" }}
              >
                {study.summary}
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-7 border-t border-border pt-9">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
                    Client
                  </dt>
                  <dd className="mt-2 text-lg font-semibold text-neutral-100 sm:text-xl">
                    {study.client}
                  </dd>
                </div>
                {study.results.map((r) => (
                  <div key={r.label}>
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
                      {r.label}
                    </dt>
                    <dd className="mt-2 text-lg font-semibold text-neutral-100 sm:text-xl">
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeUp>

            <div className="mt-12 sm:mt-16">
              <CaseFigure image={study.cover} priority sizes="(max-width: 1024px) 100vw, 64rem" />
            </div>
          </header>
        </CaseContainer>

        {/* Body */}
        <div className="mt-6 sm:mt-12">
          <CaseSection index="01" label="Problem" title="The problem">
            <Prose paragraphs={study.problem} />
          </CaseSection>
          <CaseSection index="02" label="Approach" title="Our approach">
            <Prose paragraphs={study.approach} />
          </CaseSection>
          <CaseSection index="03" label="Build" title="The build">
            <Prose paragraphs={study.build.paragraphs} />
            <StackChips stack={study.build.stack} />
          </CaseSection>
          <CaseSection index="04" label="Outcome" title="The outcome">
            <Prose paragraphs={study.outcome} />
          </CaseSection>
          <CaseSection index="05" label="Results" title="By the numbers">
            <MetricGrid metrics={study.metrics} />
          </CaseSection>
        </div>

        {/* Next + CTA */}
        <section aria-label="Continue" className="border-t border-border pt-14 sm:pt-20">
          <CaseContainer>
            <FadeUp>
              <Link
                href={`/case-studies/${next.slug}`}
                className="group block rounded-3xl border border-border bg-card p-7 transition-colors hover:border-white/25 hover:bg-white/[0.05] sm:p-10"
              >
                <p
                  className="font-mono uppercase tracking-[0.2em] text-muted-foreground"
                  style={{ fontSize: "clamp(0.95rem,3vw,1.25rem)" }}
                >
                  Next case study
                </p>
                <div className="mt-5 flex items-center justify-between gap-6">
                  <h2
                    className="font-black leading-[1.02] tracking-tight text-foreground"
                    style={{ fontSize: "clamp(1.75rem,7vw,3.5rem)" }}
                  >
                    {next.title}
                  </h2>
                  <ArrowRight className="hidden h-12 w-12 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent-hi sm:block" />
                </div>
              </Link>
            </FadeUp>

            <div className="mt-14 flex flex-col items-start gap-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="text-balance font-bold text-foreground"
                style={{ fontSize: "clamp(1.5rem,5vw,2.25rem)" }}
              >
                Have a project like this?
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-13 items-center justify-center rounded-full bg-white px-9 text-base font-semibold text-black transition-colors hover:bg-neutral-200"
                >
                  Book a call
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-border px-9 text-base font-semibold text-neutral-100 transition-colors hover:bg-white/5"
                >
                  All case studies
                </Link>
              </div>
            </div>
          </CaseContainer>
        </section>
      </article>
    </main>
  );
}
