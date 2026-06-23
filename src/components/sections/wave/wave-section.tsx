import { WavePath } from "@/components/ui/wave-path";

/**
 * Craft interstitial before the CTA. An interactive line that bends to the
 * cursor, paired with a short statement of craft. Dark + indigo glow.
 */
export function WaveSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-[clamp(7rem,16vw,12rem)]"
      aria-label="Our craft"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-[40px] [background:radial-gradient(ellipse_at_center,var(--accent-glow),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 sm:px-10 lg:px-16">
        <WavePath className="mb-8 w-full text-white/40 sm:mb-12" />

        <div className="flex w-full flex-col items-start gap-4 text-left sm:gap-6">
          <p className="inline-flex items-center gap-2.5 font-mono text-[0.78rem] uppercase tracking-[0.24em] text-white/55 sm:text-sm">
            <span className="h-2 w-2 shrink-0 rotate-45 bg-[var(--accent)]" aria-hidden />
            The craft
          </p>
          <p className="text-balance font-medium leading-[1.14] tracking-[-0.015em] text-white/90 text-[clamp(2.25rem,6.5vw,4.75rem)]">
            Great products are felt before they&apos;re understood. We sweat the
            details others skip - the motion, the milliseconds, the moments that
            make software feel <span className="script-accent">inevitable.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
