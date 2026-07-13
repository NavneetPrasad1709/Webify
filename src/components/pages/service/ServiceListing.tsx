"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";
import { services, listingIncludedLabel } from "@/lib/pages/service";

export default function ServiceListing() {
  const sectionRef = useRef<HTMLElement>(null);

  // Play card loops only while on screen - nine autoplaying videos at once is
  // needless load. Reduced-motion users keep the static poster.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vids = sectionRef.current?.querySelectorAll<HTMLVideoElement>(
      "[data-svc-video]"
    );
    if (!vids?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { rootMargin: "100px 0px", threshold: 0.2 }
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cards - blur-in on scroll (source: y 40px / blur 5px)
      gsap.utils.toArray<HTMLElement>("[data-svc-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, filter: "blur(5px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 80%" },
          }
        );

        // Image parallax while the card travels through view
        const img = card.querySelector<HTMLElement>("[data-svc-img]");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white pb-16 pt-16 text-ink md:pb-24 md:pt-24"
    >
      <div className="mx-auto w-[min(94%,1320px)]">
        {/* Service cards */}
        <div className="flex flex-col gap-4">
          {services.map((s, i) => (
            <article
              key={s.slug}
              data-svc-card
              className="grid grid-cols-1 gap-10 rounded-card bg-fill-light p-6 md:grid-cols-[1.7fr_1fr] md:gap-14 md:p-[30px]"
            >
              {/* Left - title row (with counter) + media */}
              <div className="w-full max-w-[550px]">
                <div className="mb-6 flex items-start justify-between gap-5 md:mb-[30px]">
                  <Link href={`/service/${s.slug}`} className="group/title block">
                    <h2 className="text-[26px] font-bold uppercase leading-none tracking-[-0.02em] transition-colors duration-300 group-hover/title:text-primary md:text-[36px]">
                      {s.title}
                    </h2>
                  </Link>
                  {/* Counter: index + nine-segment progress, current in cobalt */}
                  <div className="flex shrink-0 items-center gap-3 pt-1">
                    <span className="font-mono text-lg leading-none text-ink md:text-xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="hidden items-end gap-[5px] sm:flex"
                      aria-hidden="true"
                    >
                      {services.map((_, j) => (
                        <span
                          key={j}
                          className={`w-[2px] rounded-full transition-all duration-300 ${
                            j === i ? "h-5 bg-primary" : "h-3 bg-ink/15"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/service/${s.slug}`}
                  aria-label={s.title}
                  className="block h-[260px] overflow-hidden rounded-2xl md:h-[350px]"
                >
                  {s.video ? (
                    <video
                      data-svc-img
                      data-svc-video
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={s.listingImage}
                      src={s.video}
                      className="h-full w-full object-cover will-change-transform"
                    />
                  ) : (
                    <img
                      data-svc-img
                      src={s.listingImage}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover will-change-transform"
                    />
                  )}
                </Link>
              </div>

              {/* Right - description, included list, CTA */}
              <div>
                <p className="leading-[1.3] text-black font-medium">{s.blurb}</p>
                {s.items.length > 0 && (
                  <>
                    <p className="mt-6 font-medium text-ink md:mt-[30px]">
                      {s.itemsLabel ?? listingIncludedLabel}
                    </p>
                    <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 text-black font-medium">
                      {s.items.map((item) => (
                        <li key={item} className="leading-[1.3]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <div className="mt-6 md:mt-[30px]">
                  <PillButton tone="dark" href={`/service/${s.slug}`}>
                    View Service
                  </PillButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
