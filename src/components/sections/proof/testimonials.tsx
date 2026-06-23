import { FadeUp } from "@/components/sections/cta/fade-up";
import { TESTIMONIALS, hasRealTestimonials } from "@/lib/proof";

/**
 * Social-proof section — testimonial cards. Renders a visible "sample" marker
 * (and a per-card "Placeholder" chip) until real, permissioned quotes replace
 * the placeholders in src/lib/proof.ts, so nothing fake ever ships unnoticed.
 */
export function Testimonials() {
  return (
    <section
      aria-label="What clients say"
      className="px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-hi">
            Client stories
          </p>
          <h2 className="mt-4 max-w-[20ch] text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Teams that shipped with us.
          </h2>
          {!hasRealTestimonials && (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
              Sample testimonials — replace with real client quotes before launch
            </p>
          )}
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <figure className="relative flex h-full flex-col rounded-card border border-border bg-card p-6 shadow-e1 sm:p-7">
                {t.placeholder && (
                  <span className="absolute right-4 top-4 rounded-pill border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/35">
                    Placeholder
                  </span>
                )}
                <blockquote className="text-pretty text-base leading-relaxed text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-hi"
                  >
                    {t.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">
                      {t.author}
                    </span>
                    <span className="block truncate text-sm text-white/50">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
