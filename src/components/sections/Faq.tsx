"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, revealFrom, revealTo } from "@/lib/anim";
import { faqs } from "@/lib/data";
import PillButton from "@/components/ui/PillButton";

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-head", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(
        ".faq-item",
        revealFrom,
        {
          ...revealTo,
          stagger: 0.08,
          scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    bodyRefs.current.forEach((body, i) => {
      if (!body) return;
      gsap.to(body, {
        height: open === i ? "auto" : 0,
        duration: 0.45,
        ease: "power2.inOut",
      });
    });
    iconRefs.current.forEach((icon, i) => {
      if (!icon) return;
      gsap.to(icon, {
        rotate: open === i ? 45 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    if (open !== null) {
      const inner = bodyRefs.current[open]?.firstElementChild;
      if (inner)
        gsap.fromTo(
          inner,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.4, delay: 0.15, ease: "power2.out" }
        );
    }
    gsap.delayedCall(0.6, () => ScrollTrigger.refresh());
  }, [open]);

  return (
    <section ref={sectionRef} className="bg-white text-ink pt-12 md:pt-16 pb-24 md:pb-32 px-5 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12">
        <div className="faq-head md:sticky md:top-28 self-start">
          <p className="eyebrow text-gray-mid">FAQ</p>
          <h2 className="display-2 mt-4">
            FREQUENTLY
            <br />
            ASKED QUESTIONS
          </h2>

          <div className="mt-12">
            <p className="eyebrow text-gray-mid">Still have questions?</p>
            <p className="mt-3 text-base font-medium text-ink">
              Talk to a human. We reply within 24 hours.
            </p>
            <PillButton href="/contact" className="mt-6">
              Let&apos;s Talk
            </PillButton>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="faq-item rounded-card bg-fill-light mb-4 overflow-hidden">
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="group w-full flex justify-between items-center gap-6 px-6 md:px-8 py-6 text-left transition-colors duration-300 hover:bg-fill-light-2"
              >
                <span className="text-base md:text-lg font-semibold">{faq.q}</span>
                <span
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  className="relative flex items-center justify-center w-8.5 h-8.5 rounded-full bg-white transition-colors duration-300 group-hover:bg-primary shrink-0"
                  aria-hidden="true"
                >
                  <span className="absolute w-3.5 h-0.5 bg-ink transition-colors duration-300 group-hover:bg-white" />
                  <span className="absolute w-0.5 h-3.5 bg-ink transition-colors duration-300 group-hover:bg-white" />
                </span>
              </button>
              <div
                ref={(el) => {
                  bodyRefs.current[i] = el;
                }}
                className="overflow-hidden"
                style={{ height: i === 0 ? "auto" : 0 }}
              >
                <p className="px-6 md:px-8 pb-7 text-black font-medium text-[15px] leading-relaxed max-w-[60ch]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
