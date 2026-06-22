import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  getCaseStudy,
  getCaseStudySlugs,
  getNextCaseStudy,
} from "@/lib/work";
import { FadeUp } from "@/components/sections/cta/fade-up";
import {
  CaseContainer,
  CaseSection,
  Prose,
  StackChips,
  MetricGrid,
  CaseFigure,
} from "@/components/sections/case-study/case-study-parts";

// Fixed portfolio — prerender every study at build time; unknown slugs 404.
export const dynamicParams = false;

const SITE_URL = "https://webify.dev"; // [REPLACE: production domain]

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.name} — ${study.discipline} case study`;
  const url = `/work/${study.slug}`;

  return {
    title,
    description: study.summary,
    keywords: [study.discipline, study.name, "case study", "product engineering"],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description: study.summary,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = getNextCaseStudy(slug);
  const url = `${SITE_URL}/work/${study.slug}`;

  // Structured data: the case study as a CreativeWork + a breadcrumb trail.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: study.name,
        headline: study.tagline,
        abstract: study.summary,
        url,
        genre: study.discipline,
        dateCreated: study.year,
        creator: { "@type": "Organization", name: "Webify" },
        keywords: study.build.stack.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Work", item: `${SITE_URL}/work` },
          { "@type": "ListItem", position: 2, name: study.name, item: url },
        ],
      },
    ],
  };

  return (
    <main className="pb-24 pt-28 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* W4 — Hero */}
        <CaseContainer>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
              <li>
                <Link href="/work" className="transition-colors hover:text-foreground">
                  Work
                </Link>
              </li>
              <li aria-hidden className="text-neutral-700">/</li>
              <li className="truncate text-neutral-300">{study.name}</li>
            </ol>
          </nav>

          <header className="pt-8 sm:pt-10">
            <FadeUp>
              <p
                className="font-mono uppercase tracking-[0.2em] text-accent-hi"
                style={{ fontSize: "clamp(1rem,3.2vw,1.5rem)" }}
              >
                {study.kind === "Personal" ? "Personal project" : "Case study"}
                <span className="mx-3 text-neutral-700">·</span>
                {study.discipline}
              </p>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1
                className="mt-6 max-w-[15ch] text-balance font-black leading-[0.95] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.75rem,11vw,6.5rem)" }}
              >
                {study.name}
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p
                className="mt-7 max-w-[24ch] text-balance font-bold leading-[1.1] text-muted-foreground"
                style={{ fontSize: "clamp(1.5rem,5vw,2.5rem)" }}
              >
                {study.tagline}
              </p>
            </FadeUp>

            {/* Quick facts */}
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
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
                    Discipline
                  </dt>
                  <dd className="mt-2 text-lg font-semibold text-neutral-100 sm:text-xl">
                    {study.discipline}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
                    Year
                  </dt>
                  <dd className="mt-2 text-lg font-semibold text-neutral-100 sm:text-xl">
                    {study.year}
                  </dd>
                </div>
                {study.liveUrl ? (
                  <div className="flex items-end">
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-lg font-semibold text-accent-hi transition-colors hover:text-white sm:text-xl"
                    >
                      Visit live site
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                ) : null}
              </dl>
            </FadeUp>

            {/* Hero cover (LCP) */}
            <div className="mt-12 sm:mt-16">
              <CaseFigure image={study.cover} priority sizes="(max-width: 1024px) 100vw, 64rem" />
            </div>
          </header>
        </CaseContainer>

        {/* W4 — Problem → Approach → Build → Outcome → Metrics */}
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
            {study.gallery[0] ? (
              <div className="mt-12">
                <CaseFigure image={study.gallery[0]} />
              </div>
            ) : null}
          </CaseSection>

          <CaseSection index="04" label="Outcome" title="The outcome">
            <Prose paragraphs={study.outcome} />
            {study.gallery[1] ? (
              <div className="mt-12">
                <CaseFigure image={study.gallery[1]} />
              </div>
            ) : null}
          </CaseSection>

          <CaseSection index="05" label="Metrics" title="By the numbers">
            <FadeUp>
              <p className="mb-10 max-w-[48ch] text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {/* BRIEF: real figures only — placeholders shown; an "X" marks a number to fill in. */}
                Headline results from the engagement. The figures below are
                placeholders (an &ldquo;X&rdquo; marks a number to fill in) — swap each
                for the project&apos;s real result.
              </p>
            </FadeUp>
            <MetricGrid metrics={study.metrics} />
          </CaseSection>

          {/* Testimonial (optional) */}
          {study.testimonial ? (
            <section
              aria-label="Client testimonial"
              className="border-t border-border py-16 sm:py-24"
            >
              <CaseContainer>
                <FadeUp>
                  <figure>
                    <blockquote
                      className="text-balance font-black leading-[1.08] tracking-tight text-foreground"
                      style={{ fontSize: "clamp(1.75rem,6vw,3.5rem)" }}
                    >
                      <span className="text-accent-hi">“</span>
                      {study.testimonial.quote}
                      <span className="text-accent-hi">”</span>
                    </blockquote>
                    <figcaption className="mt-8 text-base text-muted-foreground sm:text-lg">
                      <span className="font-semibold text-neutral-100">
                        {study.testimonial.author}
                      </span>
                      <span className="mx-2 text-neutral-700">—</span>
                      {study.testimonial.role}
                    </figcaption>
                  </figure>
                </FadeUp>
              </CaseContainer>
            </section>
          ) : null}
        </div>

        {/* W4 — Next project + CTA */}
        <section aria-label="Continue" className="border-t border-border pt-14 sm:pt-20">
          <CaseContainer>
            {next ? (
              <FadeUp>
                <Link
                  href={`/work/${next.slug}`}
                  className="group block rounded-3xl border border-border bg-card p-7 transition-colors hover:border-white/25 hover:bg-white/[0.05] sm:p-10"
                >
                  <p
                    className="font-mono uppercase tracking-[0.2em] text-muted-foreground"
                    style={{ fontSize: "clamp(0.95rem,3vw,1.25rem)" }}
                  >
                    Next project
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-6">
                    <div>
                      <h2
                        className="font-black leading-[1.0] tracking-tight text-foreground"
                        style={{ fontSize: "clamp(2.25rem,9vw,4.5rem)" }}
                      >
                        {next.name}
                      </h2>
                      <p className="mt-4 max-w-[44ch] text-lg text-muted-foreground sm:text-xl">
                        {next.tagline}
                      </p>
                    </div>
                    <ArrowRight className="hidden h-12 w-12 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent-hi sm:block" />
                  </div>
                </Link>
              </FadeUp>
            ) : null}

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
                  href="/work"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-border px-9 text-base font-semibold text-neutral-100 transition-colors hover:bg-white/5"
                >
                  All work
                </Link>
              </div>
            </div>
          </CaseContainer>
        </section>
      </article>
    </main>
  );
}
