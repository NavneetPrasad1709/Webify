"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { founder } from "@/lib/pages/about";

/* The studio's real trust anchor: with zero clients, the founder is the only
   verifiable human behind the work, so he is named, shown, and reachable. */
export default function Founder() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-founder-photo]", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.fromTo(
        "[data-founder-copy] > *",
        revealFrom,
        {
          ...revealTo,
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white px-5 py-24 text-ink md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,440px)_1fr] md:gap-16">
        <div
          data-founder-photo
          className="relative z-[35] aspect-[5/6] overflow-hidden rounded-card bg-fill-light"
        >
          <Image
            src={founder.image}
            alt={founder.imageAlt}
            fill
            sizes="(min-width: 768px) 440px, 100vw"
            className="object-cover"
          />
        </div>

        <div data-founder-copy>
          <p className="eyebrow text-gray-mid">{founder.tag}</p>
          <h2 className="display-2 mt-4 text-ink">{founder.name}</h2>
          <p className="mt-2 text-base font-semibold text-primary">
            {founder.role}
          </p>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.7] font-medium text-black md:text-base">
            {founder.bio}
          </p>
          <div className="mt-8 space-y-1 text-[15px] font-medium text-black">
            <p>{founder.address}</p>
            <p>{founder.reach}</p>
          </div>
          <a
            href={`mailto:${founder.email}?subject=Project%20inquiry`}
            className="mt-6 inline-block text-[15px] font-semibold text-ink underline underline-offset-4 transition-colors duration-300 hover:text-primary"
          >
            {founder.email}
          </a>
        </div>
      </div>
    </section>
  );
}
