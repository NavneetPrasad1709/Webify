import type { ReactNode } from "react";
import Image from "next/image";
import { FadeUp } from "@/components/sections/cta/fade-up";
import type { CaseStudyImage, Metric } from "@/lib/work";
import { cn } from "@/lib/cn";

/**
 * Presentational building blocks for the /work/[slug] case-study template (W4),
 * built in the BOLD editorial language of the shared reference component:
 * oversized mono uppercase labels, font-black headings, large shadowed imagery,
 * generous spacing. Mobile-first responsive (everything scales via clamp()).
 *
 * Server components (no client JS) except where they compose <FadeUp/>, so the
 * page ships as static HTML for SEO + a fast LCP. Motion is scroll-reveal only
 * and respects prefers-reduced-motion (handled in FadeUp).
 */

/** Centered, generous content measure for the big type. */
export function CaseContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}

/** A big numbered section: oversized mono label → optional black title → body. */
export function CaseSection({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className="border-t border-border py-14 first:border-t-0 sm:py-20 md:py-24"
    >
      <CaseContainer>
        <FadeUp>
          <p
            className="flex items-baseline gap-4 font-mono uppercase tracking-[0.2em] text-muted-foreground"
            style={{ fontSize: "clamp(1.05rem,3.4vw,1.75rem)" }}
          >
            <span className="nums text-accent-hi">{index}</span>
            <span aria-hidden className="h-px flex-none translate-y-[-0.35em] bg-border w-8 sm:w-12" />
            {label}
          </p>
        </FadeUp>

        {title ? (
          <FadeUp delay={0.05}>
            <h2
              className="mt-6 max-w-[18ch] text-balance font-black leading-[1.04] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem,7vw,3.75rem)" }}
            >
              {title}
            </h2>
          </FadeUp>
        ) : null}

        <div className="mt-8 sm:mt-10">{children}</div>
      </CaseContainer>
    </section>
  );
}

/** Flowing prose - large, readable measure. */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-6">
      {paragraphs.map((p, i) => (
        <FadeUp key={i} delay={i * 0.06}>
          <p
            className="max-w-[60ch] text-pretty leading-relaxed text-neutral-300"
            style={{ fontSize: "clamp(1.1875rem,2.7vw,1.5rem)" }}
          >
            {p}
          </p>
        </FadeUp>
      ))}
    </div>
  );
}

/** Tech-stack chips - large, tactile. */
export function StackChips({ stack }: { stack: string[] }) {
  return (
    <FadeUp>
      <ul className="mt-10 flex flex-wrap gap-3" aria-label="Tools and technologies">
        {stack.map((t) => (
          <li
            key={t}
            className="rounded-full border border-border bg-white/[0.04] px-5 py-2.5 text-base font-medium text-neutral-200 sm:text-lg"
          >
            {t}
          </li>
        ))}
      </ul>
    </FadeUp>
  );
}

/** Headline metric figures - huge font-black numbers (W4 - metrics). */
export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
      {metrics.map((m, i) => (
        <FadeUp key={i} delay={i * 0.08} className="min-w-0">
          <div className="h-full rounded-3xl border border-border bg-white/[0.03] p-7 sm:p-8">
            <dt className="sr-only">{m.label}</dt>
            <dd
              className="nums break-words font-black leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.5rem,9vw,4.5rem)" }}
            >
              {m.value}
            </dd>
            <p aria-hidden className="mt-4 text-base leading-snug text-muted-foreground sm:text-lg">
              {m.label}
            </p>
          </div>
        </FadeUp>
      ))}
    </dl>
  );
}

/** A large figure with a 16:10 frame (reserves space → zero CLS) + deep shadow. */
export function CaseFigure({
  image,
  priority = false,
  sizes,
}: {
  image: CaseStudyImage;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <FadeUp>
      <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-white/[0.03] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] sm:rounded-3xl">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 100vw, 64rem"}
          className="object-cover"
        />
      </figure>
    </FadeUp>
  );
}
