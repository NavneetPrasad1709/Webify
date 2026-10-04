"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { team } from "@/lib/pages/about";

/* The studio's real trust anchor: with zero clients, the people behind the
   work are the only verifiable proof, so each one is named, shown, and
   reachable. Rows alternate sides on desktop so the page keeps moving. */
export default function Team() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-member]").forEach((row) => {
        const trigger = { trigger: row, start: "top 75%" };
        gsap.fromTo(row.querySelector("[data-member-photo]"), revealFrom, {
          ...revealTo,
          scrollTrigger: trigger,
        });
        gsap.fromTo(row.querySelectorAll("[data-member-copy] > *"), revealFrom, {
          ...revealTo,
          stagger: 0.1,
          scrollTrigger: trigger,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white px-5 py-24 text-ink md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow text-gray-mid">{team.tag}</p>

        <div className="mt-10 space-y-20 md:mt-14 md:space-y-28">
          {team.members.map((m, i) => (
            <div
              key={m.name}
              data-member
              className={`grid items-center gap-12 md:gap-16 ${
                i % 2 === 0
                  ? "md:grid-cols-[minmax(0,440px)_1fr]"
                  : "md:grid-cols-[1fr_minmax(0,440px)]"
              }`}
            >
              <div
                data-member-photo
                className={`relative aspect-[5/6] overflow-hidden rounded-card bg-fill-light ${
                  i % 2 === 0 ? "" : "md:order-2"
                }`}
              >
                <Image
                  src={m.image}
                  alt={m.imageAlt}
                  fill
                  sizes="(min-width: 768px) 440px, 100vw"
                  className="object-cover object-top"
                />
              </div>

              <div data-member-copy>
                <h2 className="display-2 text-ink">{m.name}</h2>
                <p className="mt-2 text-base font-semibold text-primary">
                  {m.role}
                </p>
                <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.7] font-medium text-black md:text-base">
                  {m.bio}
                </p>
                {(m.address || m.reach) && (
                  <div className="mt-8 space-y-1 text-[15px] font-medium text-black">
                    {m.address && <p>{m.address}</p>}
                    {m.reach && <p>{m.reach}</p>}
                  </div>
                )}
                {m.email && (
                  <a
                    href={`mailto:${m.email}?subject=Project%20inquiry`}
                    className="mt-6 inline-block text-[15px] font-semibold text-ink underline underline-offset-4 transition-colors duration-300 hover:text-primary"
                  >
                    {m.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
