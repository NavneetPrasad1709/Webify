"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, revealFrom, revealTo } from "@/lib/anim";
import { services } from "@/lib/pages/service";
import RollingText from "@/components/ui/RollingText";

function ArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-9 w-9 shrink-0 transition-transform duration-500 ease-out md:h-12 md:w-12 ${
        open ? "rotate-0" : "-rotate-45"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v16M5 13l7 7 7-7" />
    </svg>
  );
}

export default function ServicesAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-head", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: ".svc-head", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row, i) => {
        gsap.fromTo(row, revealFrom, {
          ...revealTo,
          delay: Math.min(i, 2) * 0.06,
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    bodyRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        height: i === open ? "auto" : 0,
        duration: 0.55,
        ease: "power3.inOut",
      });
    });

    // Focus-pull the open row's media in as the panel expands
    const openBody = open >= 0 ? bodyRefs.current[open] : null;
    const media = openBody?.querySelector<HTMLElement>(
      "[data-svc-media] video, [data-svc-media] img"
    );
    if (media) {
      gsap.fromTo(
        media,
        { filter: "blur(10px)", opacity: 0.6 },
        { filter: "blur(0px)", opacity: 1, duration: 0.55, ease: "power2.out" }
      );
    }

    gsap.delayedCall(0.6, () => ScrollTrigger.refresh());
  }, [open]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink px-5 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="svc-head">
          <p className="eyebrow text-white">What We Do</p>
          <h2 className="display-1 mt-4">Services</h2>
        </div>

        {/* group/list: hovering one row gently dims its siblings */}
        <div className="group/list mt-12 md:mt-16">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <article
                key={s.slug}
                className={`svc-row border-t border-white/10 transition-opacity duration-300 last:border-b hover:!opacity-100 ${
                  isOpen ? "" : "group-hover/list:opacity-40"
                }`}
              >
                {/* Header row */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center justify-between gap-5 rounded-lg py-6 pl-1 pr-2 text-left transition-colors duration-300 hover:bg-white/[.03] md:py-8"
                >
                  <span className="flex min-w-0 items-center gap-4 md:gap-7">
                    <span
                      className={`transition-colors duration-300 ${
                        isOpen ? "text-primary" : "text-white/50 group-hover:text-white"
                      }`}
                    >
                      <ArrowIcon open={isOpen} />
                    </span>
                    <span className="min-w-0 break-words text-[clamp(26px,4.2vw,52px)] font-semibold leading-[1.05] tracking-tight text-white">
                      {s.title}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 md:gap-4">
                    <span className="font-mono text-[21px] text-white md:text-2xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden items-center gap-[8px] sm:flex">
                      {services.map((_, j) => (
                        <span
                          key={j}
                          className={`w-[1.5px] rounded-full transition-all duration-300 ${
                            j === i ? "h-[30px] w-[3px] bg-primary" : "h-[18px] bg-white/25"
                          }`}
                        />
                      ))}
                    </span>
                  </span>
                </button>

                {/* Expanding body */}
                <div
                  ref={(el) => {
                    bodyRefs.current[i] = el;
                  }}
                  className="overflow-hidden"
                  style={{ height: i === 0 ? "auto" : 0 }}
                >
                  <div className="grid gap-8 pb-10 pl-1 md:grid-cols-[1fr_1.05fr] md:gap-12 md:pb-14 md:pl-16">
                    {/* Sub-services + CTA - CTA hugs the media's bottom edge
                        when a service has no sub-list */}
                    <div
                      className={`flex flex-col gap-8 ${
                        s.items.length > 0 ? "justify-between" : "justify-end"
                      }`}
                    >
                      {s.items.length > 0 && (
                        <ul className="grid gap-x-8 gap-y-0 sm:auto-rows-fr sm:grid-cols-2">
                          {s.items.map((item) => (
                            <li key={item} className="flex items-center">
                              <Link
                                href={`/service/${s.slug}`}
                                className="group/item flex origin-left items-start gap-3.5 py-2 text-[17px] font-medium leading-snug text-white transition-transform duration-300 hover:scale-[1.04] md:text-lg"
                              >
                                <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border border-white/50 transition-colors duration-300 group-hover/item:border-primary group-hover/item:bg-primary" />
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA pill: letter-roll affordance, no arrow per the studio rule */}
                      <Link
                        href={`/service/${s.slug}`}
                        className="group w-max rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-fill-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <RollingText label="View Service Details" em={1.3} />
                      </Link>
                    </div>

                    {/* Media - mounts only while open */}
                    <Link
                      href={`/service/${s.slug}`}
                      data-svc-media
                      className={`${s.video ? "" : "sheen "}group/media relative order-first block overflow-hidden rounded-xl bg-fill-dark md:order-none`}
                    >
                      {isOpen && s.video ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={s.listingImage}
                          src={s.video}
                          className="aspect-[8/5] w-full object-cover transition-transform duration-500 ease-out group-hover/media:scale-[1.03]"
                        />
                      ) : (
                        <img
                          src={s.listingImage}
                          alt={s.title}
                          className="aspect-[8/5] w-full object-cover transition-transform duration-500 ease-out group-hover/media:scale-[1.03]"
                        />
                      )}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
