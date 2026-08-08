"use client";

import { useRef } from "react";
import PillButton from "@/components/ui/PillButton";
import { useReveal } from "@/lib/reveal";

/* Next includes the not-found boundary in every route's client tree, so this
   component's imports are the whole site's imports. Its gsap import was the
   last thing pulling 121 kB of animation library onto /privacy and /terms,
   pages that render no animation at all. Three staggered fades do not need a
   timeline engine. */
export default function NotFoundSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      className="flex min-h-screen items-center justify-center bg-white px-6 pt-32 pb-24 md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
        <img
          src="/assets/brand/webify-icon-light-384.webp"
          alt=""
          aria-hidden="true"
          width={384}
          height={323}
          data-reveal=""
          className="mb-6 h-12 w-auto"
        />
        <img
          src="/assets/404/404.svg"
          alt="404"
          data-reveal=""
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          className="w-[200px] max-w-full md:w-[249px]"
        />
        <div
          data-reveal=""
          style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
          className="mt-8 flex flex-col items-center md:mt-10"
        >
          <h1 className="text-center text-2xl font-bold tracking-tight text-ink md:text-[32px] md:leading-tight">
            This page does not exist.
          </h1>
          <div className="mt-8">
            <PillButton href="/" tone="blue">
              Back to Homepage
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
