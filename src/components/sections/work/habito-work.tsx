import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/sections/cta/fade-up";
import { ScrollZoom } from "@/components/sections/work/work-motion";
import { WorkCapabilitiesStack } from "@/components/sections/work/work-capabilities-stack";
import { SparklesTitle } from "@/components/ui/sparkles-title";

/**
 * /work - light "BRAND SELECTED WORKS" layout (Habito-style reference), reframed
 * to lead with capability + process while the public portfolio is being built.
 * All scroll motion is preserved (ScrollZoom statement, FadeUp reveals, the
 * brand marquee). The gallery/testimonial/logo-wall sections were removed rather
 * than ship placeholder client work; restore them when real captures exist.
 */

/* ----------------------------------------------------------------- Hero --- */
export function WorkHero() {
  return (
    <section id="work-top" className="pt-28 sm:pt-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          {/* Intro */}
          <FadeUp>
            <div className="max-w-[42ch]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
                The work
              </p>
              <p className="mt-4 text-pretty text-lg font-medium leading-snug text-[#0d0d0d] sm:text-xl">
                We&apos;re a senior-led studio shipping AI products, web platforms,
                and mobile apps end to end. Public case studies are on the way - until
                then, here&apos;s exactly what we build and how.
              </p>
              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-[#0d0d0d] transition-colors hover:text-black/60"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </FadeUp>

          {/* Big title */}
          <FadeUp delay={0.05}>
            <h1
              className="text-left font-black uppercase leading-[0.9] tracking-tight text-[#0d0d0d] md:text-right"
              style={{ fontSize: "clamp(2.75rem,9vw,6rem)" }}
            >
              What
              <br />
              We
              <br />
              <span className="script-accent script-accent-ink">Build</span>
            </h1>
          </FadeUp>
        </div>

        {/* Meta */}
        <div className="mt-12 flex flex-col gap-7 border-t border-black/10 pt-7 sm:mt-16 md:flex-row md:items-start md:justify-between">
          <FadeUp>
            <dl className="flex flex-wrap items-start gap-x-12 gap-y-5">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
                  Focus
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-[#0d0d0d]">
                  AI · Web · Mobile
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
                  Where
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-[#0d0d0d]">
                  India &amp; worldwide
                </dd>
              </div>
            </dl>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Statement --- */
export function WorkStatement() {
  return (
    <section className="py-16 sm:py-24 md:py-28">
      <Container>
        <ScrollZoom from={0.88}>
          <h2
            className="text-center font-black uppercase leading-[0.95] tracking-tight text-[#0d0d0d]"
            style={{ fontSize: "clamp(2.25rem,8vw,5.5rem)" }}
          >
            <span className="block">Crafting products</span>
            <span className="block">that ship, scale,</span>
            <span className="block">
              and <span className="script-accent script-accent-ink">endure.</span>
            </span>
          </h2>
        </ScrollZoom>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- Capabilities --- */
export function WorkShowcase() {
  return (
    <section aria-label="What we build" className="pb-8">
      <Container>
        <FadeUp>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
            Capabilities
          </p>
          <SparklesTitle
            as="h2"
            className="mt-4 max-w-[14ch] font-black uppercase leading-[0.95] tracking-tight text-[#0d0d0d] text-[clamp(2rem,7vw,4.5rem)]"
            beamClassName="mx-0 mr-auto mt-1 max-w-[22rem]"
            sparkleColor="#4f46e5"
            density={32}
          >
            Six ways we <span className="script-accent script-accent-ink">ship.</span>
          </SparklesTitle>
        </FadeUp>
      </Container>

      {/* Sticky-stacking capability deck (full-width; cards self-center). */}
      <WorkCapabilitiesStack />
    </section>
  );
}

/* --------------------------------------------------------------- CTA band --- */
export function WorkPartners() {
  return (
    <section aria-label="Start a project" className="border-t border-black/10 py-16 sm:py-24">
      <Container>
        <FadeUp>
          <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between">
            <h2
              className="max-w-[16ch] font-black uppercase leading-[0.95] tracking-tight text-[#0d0d0d]"
              style={{ fontSize: "clamp(2rem,7vw,4rem)" }}
            >
              Have something to <span className="script-accent script-accent-ink">build?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#0d0d0d] px-9 text-base font-semibold text-[#f3f2ee] transition-transform duration-300 hover:scale-105"
            >
              Book a call
            </Link>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- Spacer ----- */
export function WorkLogos() {
  return null;
}

/* -------------------------------------------------------------- Marquee --- */
function Clover() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="inline-block h-[0.7em] w-[0.7em] align-middle"
      aria-hidden
      role="presentation"
    >
      <g style={{ fill: "var(--accent-script, #4ade80)" }}>
        <circle cx="50" cy="28" r="22" />
        <circle cx="50" cy="72" r="22" />
        <circle cx="28" cy="50" r="22" />
        <circle cx="72" cy="50" r="22" />
      </g>
    </svg>
  );
}

export function WorkMarquee() {
  const unit = (
    <span className="mx-6 inline-flex items-center gap-6 sm:mx-10 sm:gap-10">
      <span
        className="font-black uppercase tracking-tight text-[#0d0d0d]"
        style={{ fontSize: "clamp(2.5rem,9vw,7rem)" }}
      >
        Webify Studio
      </span>
      <Clover />
    </span>
  );

  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-black/10 py-6 sm:py-10"
      style={{ ["--marquee-duration" as string]: "30s" }}
    >
      <div className="flex w-max animate-marquee-x whitespace-nowrap will-change-transform">
        <div className="flex">{[0, 1, 2, 3].map((k) => <span key={`a${k}`}>{unit}</span>)}</div>
        <div className="flex">{[0, 1, 2, 3].map((k) => <span key={`b${k}`}>{unit}</span>)}</div>
      </div>
    </section>
  );
}
