"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import Marquee from "@/components/ui/Marquee";
import PillButton from "@/components/ui/PillButton";
import { footerNav } from "@/lib/data";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        "[data-footer-marquee]",
        revealFrom,
        {
          ...revealTo,
          scrollTrigger: {
            trigger: "[data-footer-marquee]",
            start: "top 80%",
            once: true,
          },
        }
      );

      // Bottom card settles in as the footer arrives.
      if (!reduce) {
        gsap.fromTo(
          "[data-footer-bottom]",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-footer-bottom]", start: "top 96%", once: true },
          }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="bg-white px-5 pb-5 pt-5 text-ink">
      {/* Same container geometry as the CtaBand card above it, so the two
          rounded cards stack with aligned curves and an even white frame. */}
      <div id="contact" className="mx-auto max-w-[1400px] overflow-hidden rounded-card-lg bg-fill-light">
        {/* Giant marquee - edges melt into the card */}
        <div data-footer-marquee className="footer-marquee-fade py-14 md:py-20">
          <Marquee duration={28}>
            <span
              className="display-1 flex items-center gap-10 whitespace-nowrap px-8 text-ink"
              style={{ fontSize: "clamp(56px, 11vw, 150px)" }}
            >
              WORK WITH <span className="text-primary">WEBIFY</span>
              <img
                src="/assets/webify-icon-light.png"
                alt=""
                aria-hidden="true"
                className="inline-block h-[0.72em] w-auto"
              />
            </span>
            <span
              className="display-1 flex items-center gap-10 whitespace-nowrap px-8 text-ink"
              style={{ fontSize: "clamp(56px, 11vw, 150px)" }}
            >
              WORK WITH <span className="text-primary">WEBIFY</span>
              <img
                src="/assets/webify-icon-light.png"
                alt=""
                aria-hidden="true"
                className="inline-block h-[0.72em] w-auto"
              />
            </span>
          </Marquee>
        </div>

        {/* Primary CTA pill */}
        {/* Primary CTA pill */}
        <div className="flex justify-center pb-10">
          <PillButton tone="dark" href="/contact">
            Start a Project
          </PillButton>
        </div>

        {/* Middle grid: framed by a hairline, anchored left by a brand
            statement block */}
        <div className="mx-6 border-t border-border-soft md:mx-14">
          <div className="grid gap-12 pb-20 pt-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
            <div className="max-w-[34ch] sm:col-span-2 lg:col-span-1">
              <img
                src="/assets/webify-logo-black.png"
                alt="Webify"
                className="h-14 w-auto object-contain"
              />
              <p className="mt-7 text-base font-medium leading-relaxed text-black">
                Senior-led design and engineering company. Websites and products
                that grow revenue, built end to end by the founder.
              </p>
              <p className="eyebrow mt-7 text-ink">EST. 2026</p>
            </div>

            {footerNav.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-6 text-gray-deep">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="footer-navlink text-xl font-semibold">
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="eyebrow mb-6 text-gray-deep">CONTACT</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:contact@webify.org.in?subject=Project%20inquiry"
                    className="footer-navlink text-xl font-semibold"
                  >
                    <span>contact@webify.org.in</span>
                  </a>
                </li>
                <li>
                  <p className="text-base font-medium leading-7 text-ink">
                    Replies within 24 hours
                  </p>
                </li>
                <li>
                  <p className="text-base font-medium leading-7 text-ink">
                    Remote-first, worldwide
                  </p>
                </li>
                <li>
                  <p className="pt-2 font-mono text-[13px] leading-relaxed text-ink">
                    Tech Zone IV, Greater Noida,
                    <br />
                    Uttar Pradesh 201318
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar: the template's layered white card on the grey field */}
        <div className="px-4 pb-4 md:px-6 md:pb-6">
          <div
            data-footer-bottom
            className="flex flex-col justify-between gap-4 rounded-2xl bg-white px-6 py-5 text-[15px] font-medium text-black md:flex-row md:items-center md:px-8"
          >
            <p className="flex items-center gap-2.5">
              <img src="/assets/webify-icon-light.png" alt="" aria-hidden="true" className="h-5 w-auto" />
              &copy; 2026 Webify. All rights reserved.
            </p>
            <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/privacy" className="footer-navlink">
                <span>Privacy Policy</span>
              </Link>
              <Link href="/terms" className="footer-navlink">
                <span>Terms of Service</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
