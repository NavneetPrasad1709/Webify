import { FadeUp } from "@/components/sections/cta/fade-up";
import { METRICS, CLIENT_LOGOS, hasRealLogos } from "@/lib/proof";

/**
 * Trust bar — sits directly under the hero. TRUE metrics (ship as-is) plus a
 * client-logo strip that renders a visible "sample" marker until real logos
 * replace the placeholders in src/lib/proof.ts.
 */
export function TrustBar() {
  return (
    <section
      aria-label="Why teams pick Webify"
      className="px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-white/45">
            Why teams pick Webify
          </p>
        </FadeUp>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-12 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.06}>
              <div className="text-center">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="nums block text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    {m.value}
                  </span>
                  <span className="mt-2 block text-pretty text-sm text-white/55">
                    {m.label}
                  </span>
                </dd>
              </div>
            </FadeUp>
          ))}
        </dl>

        <FadeUp delay={0.1}>
          <div className="mt-12 border-t border-border pt-8 sm:mt-16">
            {!hasRealLogos && (
              <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                Sample — replace with real client logos before launch
              </p>
            )}
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
              {CLIENT_LOGOS.map((l) => (
                <li
                  key={l.name}
                  className={`text-lg font-semibold tracking-tight ${
                    l.placeholder ? "text-white/25" : "text-white/60"
                  }`}
                >
                  {l.name}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
