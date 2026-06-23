import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent-hi">
        404
      </p>
      <h1 className="mt-5 max-w-[16ch] text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl">
        This page took a different route.
      </h1>
      <p className="mt-5 max-w-[44ch] text-base text-white/65 sm:text-lg">
        The link is broken or the page has moved. Let&apos;s get you back to
        something useful.
      </p>
      <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-white px-7 text-base font-semibold text-black transition-transform duration-[--dur] ease-[--ease-out] hover:scale-[1.02] sm:w-auto"
        >
          Back to home
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-12 w-full items-center justify-center rounded-pill border border-border px-7 text-base font-medium text-white/80 transition-colors duration-[--dur] hover:text-white sm:w-auto"
        >
          Book a free call
        </Link>
      </div>
    </main>
  );
}
