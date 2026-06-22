import type { ReactNode } from "react";
import { SparklesTitle } from "@/components/ui/sparkles-title";

/**
 * Shared mobile-first page header for interior routes. Keeps every section's
 * top consistent (fluid type, breathing room, edge padding) until the real
 * section references land.
 */
export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-[70svh] w-full max-w-[var(--size-container)] flex-col justify-center px-6 pb-20 pt-32 sm:px-10 sm:pt-40">
      <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400 sm:text-xs">
        {eyebrow}
      </p>
      <SparklesTitle
        as="h1"
        className="mt-6 max-w-[18ch] text-balance text-[clamp(2.5rem,8.5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.025em]"
        beamClassName="mx-0 mr-auto mt-3 max-w-[22rem]"
      >
        {title}
      </SparklesTitle>
      {children ? (
        <div className="mt-7 max-w-[50ch] text-lg leading-relaxed text-neutral-300 sm:text-xl">
          {children}
        </div>
      ) : null}
    </main>
  );
}
