import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/sections/cta/fade-up";
import { ZoomImage, ScrollZoom } from "@/components/sections/work/work-motion";
import { SHOWCASE_ROWS, PARTNER_QUOTES, PARTNERS, type ShowcaseTile } from "@/lib/work-showcase";

/**
 * /work — light "BRAND SELECTED WORKS" layout (Habito-style reference).
 *
 * Uses the site's global navbar + footer (no custom chrome). Every section has
 * scroll motion: images zoom-parallax (scrubbed scale, ZoomImage), the statement
 * zooms in (ScrollZoom), and blocks reveal on enter (FadeUp). All Lenis-synced
 * and reduced-motion safe. Mobile-first — stacks to one column, type via clamp().
 */

const ASPECT: Record<NonNullable<ShowcaseTile["shape"]>, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

/* ----------------------------------------------------------------- Hero --- */
export function WorkHero() {
  return (
    <section id="work-top" className="pt-28 sm:pt-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          {/* Showreel thumbnail */}
          <FadeUp>
            <div>
              <div className="relative w-44 sm:w-60">
                <ZoomImage
                  src={SHOWCASE_ROWS[0].items[0].image.src}
                  alt="[REPLACE: Webify showreel still]"
                  sizes="240px"
                  from={1.25}
                  className="aspect-video w-full rounded-xl border border-black/10 bg-black/5"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
                    <Play className="h-4 w-4 translate-x-px fill-current" aria-hidden />
                  </span>
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
                Webify Showreel
              </p>
            </div>
          </FadeUp>

          {/* Big title */}
          <FadeUp delay={0.05}>
            <h1
              className="text-left font-black uppercase leading-[0.9] tracking-tight text-[#0d0d0d] md:text-right"
              style={{ fontSize: "clamp(2.75rem,9vw,6rem)" }}
            >
              Brand
              <br />
              Selected
              <br />
              <span className="script-accent script-accent-ink">Works</span>
            </h1>
          </FadeUp>
        </div>

        {/* Subline + meta */}
        <div className="mt-12 flex flex-col gap-7 border-t border-black/10 pt-7 sm:mt-16 md:flex-row md:items-start md:justify-between">
          <FadeUp>
            <p className="max-w-[26ch] text-pretty text-lg font-medium leading-snug text-[#0d0d0d] sm:text-xl">
              Real work. Real impact. Senior-built products for today&apos;s
              digital teams.
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <dl className="flex flex-wrap items-start gap-x-12 gap-y-5">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
                  Clients
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-[#0d0d0d]">
                  India &amp; worldwide
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
                  Years
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-[#0d0d0d]">2023–2025</dd>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 self-end text-base font-semibold text-[#0d0d0d] transition-colors hover:text-black/60"
              >
                Explore plans
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
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

/* -------------------------------------------------------------- Gallery --- */
function ShowcaseCard({ item }: { item: ShowcaseTile }) {
  const inner = (
    <>
      <div className="mb-3 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-black/45 sm:text-[11px]">
        <span className="truncate font-semibold text-[#0d0d0d] group-hover:underline">
          {item.title}
        </span>
        <span className="shrink-0 whitespace-nowrap">
          {item.category} <span className="text-black/30">· {item.year}</span>
        </span>
      </div>
      <ZoomImage
        src={item.image.src}
        alt={item.image.alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`rounded-lg bg-black/5 ${ASPECT[item.shape ?? "square"]}`}
      />
    </>
  );

  return (
    <FadeUp className="group">
      {item.href ? (
        <Link href={item.href} className="block">
          {inner}
        </Link>
      ) : (
        <div>{inner}</div>
      )}
    </FadeUp>
  );
}

export function WorkShowcase() {
  return (
    <section aria-label="Selected work" className="pb-8">
      <Container>
        <div className="space-y-12 sm:space-y-16">
          {SHOWCASE_ROWS.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 ${
                row.cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
              }`}
            >
              {row.items.map((item, j) => (
                <ShowcaseCard key={`${i}-${j}`} item={item} />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- Testimonials --- */
export function WorkPartners() {
  const [featured, ...rest] = PARTNER_QUOTES;

  return (
    <section aria-label="Testimonials" className="border-t border-black/10 py-16 sm:py-24">
      <Container>
        <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
          <span>* Client reviews</span>
          <span className="hidden sm:block">Testimonials</span>
          <span>2023–2025</span>
        </div>

        <FadeUp>
          <h2
            className="mt-6 font-black uppercase leading-[0.95] tracking-tight text-[#0d0d0d]"
            style={{ fontSize: "clamp(2rem,7vw,4.5rem)" }}
          >
            Our partner says
          </h2>
        </FadeUp>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
          {/* Featured */}
          <FadeUp>
            <figure className="rounded-2xl border border-black/10 bg-white/50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 font-mono text-xs text-black/50">
                  {/* [REPLACE: client avatar] */}
                  ★
                </div>
                <figcaption className="text-sm">
                  <span className="block font-semibold text-[#0d0d0d]">{featured.client}</span>
                  <span className="text-black/50">{featured.company}</span>
                </figcaption>
              </div>
              <blockquote className="mt-6 text-pretty text-lg leading-relaxed text-[#1a1a1a]">
                {featured.feedback}
              </blockquote>
              {featured.services.length ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {featured.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-black/15 px-3.5 py-1.5 text-sm text-black/70"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              ) : null}
            </figure>
          </FadeUp>

          {/* Rows */}
          <FadeUp delay={0.06}>
            <div className="border-t border-black/10">
              {rest.map((q, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1.2fr_1fr_auto] items-center gap-4 border-b border-black/10 py-5"
                >
                  <span className="truncate text-sm font-medium text-[#0d0d0d] sm:text-base">
                    {q.client}
                  </span>
                  <span className="truncate text-sm text-black/55 sm:text-base">{q.company}</span>
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-black/45 sm:text-sm">{q.year}</span>
                    <span
                      aria-hidden
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-black/40"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- Logo wall --- */
export function WorkLogos() {
  return (
    <section aria-label="Partners" className="border-t border-black/10 py-12 sm:py-16">
      <Container>
        <FadeUp>
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-4 lg:grid-cols-6">
            {PARTNERS.map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="flex items-center justify-center bg-[#f3f2ee] px-3 py-8 text-base font-semibold text-black/55 transition-colors hover:text-black sm:py-10 sm:text-lg"
              >
                {p}
              </div>
            ))}
          </div>
        </FadeUp>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-black/40">
          {/* [REPLACE: real partner/client wordmarks (SVG)] */}
          Trusted by teams in India &amp; worldwide
        </p>
      </Container>
    </section>
  );
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
