import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getServicePage, getServiceSlugs } from "@/lib/service-pages";
import { Faq } from "@/components/sections/faq/faq";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      type: "website",
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${siteConfig.url}/services/${page.slug}`,
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) notFound();

  const url = `${siteConfig.url}/services/${page.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.eyebrow,
        serviceType: page.eyebrow,
        description: page.metaDescription,
        url,
        provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Services", item: `${siteConfig.url}/services` },
          { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
        ],
      },
    ],
  };

  return (
    <main className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(55%_45%_at_60%_-8%,var(--accent-glow),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[var(--size-container)] px-6 sm:px-10 lg:px-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          <Link href="/services" className="transition-colors hover:text-neutral-200">
            Services
          </Link>
          <span aria-hidden className="mx-2 text-neutral-700">/</span>
          <span className="text-neutral-300">{page.eyebrow}</span>
        </nav>

        {/* Hero */}
        <header className="mt-10 max-w-[24ch]">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-hi sm:text-xs">
            {page.eyebrow}
          </p>
          <h1 className="mt-5 text-balance text-[clamp(2.75rem,7.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-50">
            {page.h1Lead} <span className="script-accent">{page.h1Accent}</span>
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-neutral-300 sm:text-xl">
            {page.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
            >
              Book a free call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="/work"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--hairline-strong)] px-8 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/5"
            >
              See the work
            </Link>
          </div>
        </header>

        {/* Body sections */}
        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-16">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="max-w-[20ch] text-balance text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-50">
                {s.heading}
              </h2>
              <div className="mt-5 space-y-4">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="text-pretty text-lg leading-relaxed text-neutral-300">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* What's included */}
        <section className="mt-24 sm:mt-28">
          <h2 className="text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-[-0.02em] text-neutral-50">
            What&apos;s <span className="script-accent">included</span>.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {page.includes.map((it) => (
              <div
                key={it.title}
                className="rounded-3xl border border-[var(--hairline)] bg-[var(--surface-1)] p-7 transition-colors duration-300 hover:border-[color-mix(in_oklab,var(--accent)_40%,transparent)] hover:bg-[var(--surface-2)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--hairline-strong)] bg-[var(--accent-glow)] text-accent-hi">
                  <Check className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-neutral-50">{it.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-neutral-400">{it.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-24 sm:mt-28">
          <h2 className="text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-[-0.02em] text-neutral-50">
            How we <span className="script-accent">work</span>.
          </h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {page.process.map((step) => (
              <li key={step.n} className="bg-[var(--surface-1)] p-7 sm:p-8">
                <span className="nums text-sm font-semibold text-accent-hi">{step.n}</span>
                <h3 className="mt-4 text-xl font-semibold text-neutral-50">{step.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-neutral-400">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Stack */}
        <section className="mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">Tools we use</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {page.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-1)] px-4 py-2 text-sm text-neutral-300"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <Faq items={page.faq} heading={`${page.eyebrow} - questions, answered`} />
        </div>

        {/* CTA */}
        <section className="mt-24 sm:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--hairline-strong)] bg-[var(--surface-1)] p-8 text-center sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,var(--accent-glow),transparent_60%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[20ch] text-balance text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-neutral-50">
                Let&apos;s build your <span className="script-accent">{page.eyebrow.toLowerCase()}</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-[48ch] text-pretty leading-relaxed text-neutral-300">
                Book a free 30-minute call with the senior team that would build it - no
                pitch deck, no pressure.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-9 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Book a free call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
