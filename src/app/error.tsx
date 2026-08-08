"use client";

import Link from "next/link";
import { useEffect } from "react";
import { track } from "@vercel/analytics";
import PillButton from "@/components/ui/PillButton";
import { BOOKING_URL } from "@/lib/site";

/* Route-level boundary. Without it a client-side throw drops the visitor on
   Next's unbranded error screen, which on a site whose entire pitch is build
   quality is the most expensive page we could possibly show. Errors inside
   the root layout itself (Nav, Preloader, SmoothScroll) escape this one and
   are caught by global-error.tsx instead. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vercel's dashboard sees the exception; this makes it show up beside the
    // funnel events so a spike is visible next to the lead count.
    track("route_error", { digest: error.digest ?? "none" });
  }, [error.digest]);

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-white px-6 pb-24 pt-32 text-ink md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
        <p className="eyebrow text-gray-mid">Something broke</p>
        <h1 className="display-2 mt-4">This page did not load</h1>
        <p className="mt-6 max-w-[46ch] text-base font-medium leading-relaxed text-black">
          The fault is ours, not yours. Try again, and if it keeps happening
          book a call and tell us what you were doing when it broke. We would
          genuinely like to know.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <PillButton tone="blue" onClick={reset}>
            Try Again
          </PillButton>
          <PillButton tone="dark" href="/">
            Back to Home
          </PillButton>
        </div>
        <p className="mt-6 text-sm font-medium text-black">
          Still stuck?{" "}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Book a 20 minute call
          </a>{" "}
          or{" "}
          <Link href="/contact" className="underline underline-offset-2">
            send us a message
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
