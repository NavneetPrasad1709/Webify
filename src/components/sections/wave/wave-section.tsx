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

      <div className="relative z-10 mx-auto flex w-[70vw] flex-col items-end">
        <WavePath className="mb-12 text-white/40" />

        <div className="flex w-full flex-col items-end gap-2 text-right md:flex-row md:items-start md:justify-end md:gap-10 md:text-left">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-white/40 md:mt-3 md:shrink-0">
            The craft
          </p>
          <p className="text-balance text-xl leading-[1.3] text-white/80 md:w-3/4 md:text-4xl">
            Great products are felt before they&apos;re understood. We sweat the
            details others skip - the motion, the milliseconds, the moments that
            make software feel inevitable.
          </p>
        </div>
      </div>
    </section>
  );
}
