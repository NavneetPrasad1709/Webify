"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";

export default function NotFoundSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-404-reveal]",
        { y: 40, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="flex min-h-screen items-center justify-center bg-white px-6 pt-32 pb-24 md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-[40rem] flex-col items-center text-center">
        <img
          src="/assets/webify-icon-light.png"
          alt=""
          aria-hidden="true"
          data-404-reveal
          className="mb-6 h-12 w-auto opacity-0"
        />
        <img
          src="/assets/404/404.svg"
          alt="404"
          data-404-reveal
          className="w-[200px] max-w-full opacity-0 md:w-[249px]"
        />
        <div data-404-reveal className="mt-8 flex flex-col items-center opacity-0 md:mt-10">
          <h5 className="text-center text-2xl font-bold tracking-tight text-ink md:text-[32px] md:leading-tight">
            Oops! This Page Lost Its Power.
          </h5>
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
