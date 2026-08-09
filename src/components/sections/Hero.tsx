"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";
import RollingText from "@/components/ui/RollingText";
import LazyVideo from "@/components/ui/LazyVideo";

/* Rotating build targets - each must read naturally after "We Build". */
/* Only build targets the studio actually sells (see /service). */
const ROTATING = [
  "Websites",
  "SaaS Products",
  "Web Apps",
  "Dashboards",
  "Landing Pages",
];

/* Honest operating promises - loop in the template-style vertical ticker. */
const TICKER = [
  "Senior-led, end to end",
  "Reply within 24 hours",
  "You own everything",
  "Remote-first, worldwide",
];

export default function Hero() {
  // The poster is the homepage LCP image: hint it into the head early.
  preload("/assets/hero-poster.jpg", { as: "image", fetchPriority: "high" });

  const sectionRef = useRef<HTMLElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const tickerListRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardFloatRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [word, setWord] = useState(0);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      /* Line-mask reveals: headline + bottom statement rise out of clip wrappers. */
      gsap.fromTo(
        ".hero-line",
        { yPercent: 110 },
        { yPercent: 0, duration: reduce ? 0 : 1.2, ease: "power4.out", stagger: reduce ? 0 : 0.12 }
      );

      /* Continuous vertical ticker (template style): two stacked copies,
         wrapper glides one copy-height forever. Both of the infinite loops
         below run for the life of the page, so reduced motion has to park
         them at rest rather than merely shorten them. */
      if (reduce) {
        gsap.set(tickerListRef.current, { yPercent: 0 });
        gsap.set(cardFloatRef.current, { y: 0 });
      } else {
        gsap.to(tickerListRef.current, {
          yPercent: -50,
          duration: 9,
          ease: "none",
          repeat: -1,
        });
      }

      /* Card blur-in, then gentle idle float on a nested wrapper. */
      gsap.fromTo(cardRef.current, revealFrom, { ...revealTo, delay: reduce ? 0 : 0.6 });
      if (!reduce) {
        gsap.fromTo(
          cardFloatRef.current,
          { y: -8 },
          { y: 8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 }
        );
      }

      /* Scroll parallax - layers depart at different rates. */
      const scrub = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(headRef.current, { yPercent: -25, ease: "none", scrollTrigger: { ...scrub } });
      gsap.to(tickerRef.current, { y: -60, ease: "none", scrollTrigger: { ...scrub } });
      gsap.to(cardWrapRef.current, { y: -80, ease: "none", scrollTrigger: { ...scrub } });
      gsap.to(shardsRef.current, { y: 40, ease: "none", scrollTrigger: { ...scrub } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Headline word rotator: current word slides up out through the line's clip
     window, the next rises in from below. Skipped for reduced motion. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = wordRef.current;
    if (!el) return;
    let i = 0;
    const id = window.setInterval(() => {
      gsap
        .timeline()
        .to(el, {
          yPercent: -112,
          filter: "blur(6px)",
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .add(() => {
          i = (i + 1) % ROTATING.length;
          setWord(i);
        })
        .fromTo(
          el,
          { yPercent: 112, filter: "blur(6px)", autoAlpha: 0 },
          { yPercent: 0, filter: "blur(0px)", autoAlpha: 1, duration: 0.55, ease: "power3.out" }
        );
    }, 3400);
    return () => {
      window.clearInterval(id);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink"
    >
      {/* Background: hero video + vignette + top gradient. The poster is the
          LCP image, so it is preloaded; the 1.9 MB video only starts fetching
          after hydration via LazyVideo. */}
      <div ref={shardsRef} className="absolute -inset-y-12 inset-x-0" aria-hidden="true">
        <LazyVideo
          src="/assets/hero.mp4"
          poster="/assets/hero-poster.jpg"
          className="h-full w-full object-cover"
        />
      </div>
      {/* The vignette is an ellipse, so on a tall narrow viewport it reaches
          full black barely past the headline and crushes the whole lower half
          of the frame. That is what read as blank space on a phone: not an
          empty layout, an invisible video. Mobile gets a gentler falloff that
          keeps the footage legible; desktop keeps the original. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(13,13,13,0.85)_100%)] lg:bg-[radial-gradient(ellipse_at_center,transparent_40%,#0d0d0d_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent"
        aria-hidden="true"
      />

      {/* Headline - static claim + rotating build target */}
      <h1
        ref={headRef}
        className="display-1 relative z-10 px-5 pt-32 text-white md:px-10 md:pt-40"
      >
        <span className="sr-only">
          We build websites, SaaS products, web apps, dashboards, and landing
          pages.
        </span>
        <span aria-hidden="true" className="block overflow-hidden">
          <span className="hero-line block">We Build</span>
        </span>
        <span aria-hidden="true" className="block overflow-hidden">
          <span className="hero-line block">
            <span
              ref={wordRef}
              className="inline-block whitespace-nowrap text-[clamp(30px,8.6vw,124px)]"
            >
              {ROTATING[word]}
              <span className="text-primary">.</span>
            </span>
          </span>
        </span>
      </h1>

      {/* Vertical promise ticker - template-style continuous scroll beside line one */}
      <div
        ref={tickerRef}
        className="absolute left-[47%] top-[21%] z-10 hidden lg:block"
        aria-hidden="true"
      >
        <div className="flex items-stretch gap-4">
          <span className="w-[2px] rounded-full bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="h-[84px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_42%,black_58%,transparent)]">
            <div ref={tickerListRef}>
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {TICKER.map((item) => (
                    <p
                      key={item}
                      className="flex h-7 items-center gap-2.5 text-lg font-medium leading-7 text-white"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating card - flows below headline on mobile, floats top-right on lg+ */}
      <div
        ref={cardWrapRef}
        className="relative z-10 mx-5 mt-8 max-w-sm lg:absolute lg:right-10 lg:top-36 lg:mx-0 lg:mt-0"
      >
        <div ref={cardRef}>
          <div
            ref={cardFloatRef}
            className="rounded-card bg-fill-dark/80 p-6 backdrop-blur"
          >
            <h2 className="text-[26px] font-semibold leading-snug tracking-tight text-white">
              Webify <span className="text-gray-soft">is a</span> Senior-Led{" "}
              <span className="text-gray-soft">Design &amp; Engineering</span>{" "}
              Company
            </h2>
            <div className="mt-6">
              <PillButton tone="blue" href="/contact">
                <RollingText label="Start a Project" />
              </PillButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile only: the full build list, with the row the headline is
          currently showing lit up.

          The headline cycles through these five one at a time, which means a
          phone visitor sees a fifth of what we do and has to wait sixteen
          seconds for the rest. Desktop fills this area with the promise
          ticker; mobile had nothing there at all, which is what made the
          lower half read as dead space. Showing the whole list and marking the
          live one turns the rotation from something you wait through into
          something you can read at a glance. */}
      <div className="relative z-10 mt-auto px-5 pb-8 pt-12 lg:hidden">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow text-lime">What we build</p>
          <p
            aria-hidden="true"
            className="font-mono text-[11px] tabular-nums tracking-widest text-white"
          >
            {String(word + 1).padStart(2, "0")}
            <span className="text-white/55">
              {" / "}
              {String(ROTATING.length).padStart(2, "0")}
            </span>
          </p>
        </div>

        <ul className="mt-5">
          {ROTATING.map((item, i) => {
            const live = i === word;
            return (
              <li key={item} className="relative">
                {/* A rule down the left rather than a bullet: it gives the
                    stack a spine, and lighting one segment reads as position
                    in a sequence instead of as decoration. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-[2px] transition-colors duration-500 ${
                    live ? "bg-lime" : "bg-white/15"
                  }`}
                />
                <span
                  className={`block py-3 pl-4 text-[17px] font-semibold tracking-tight transition-[color,transform,letter-spacing] duration-500 ease-out ${
                    live
                      ? "translate-x-1.5 text-white"
                      : "translate-x-0 text-white/70"
                  }`}
                >
                  {item}
                </span>
                {/* The bar under the live row runs down the same clock as the
                    headline rotation, so the next item is visibly on its way
                    rather than arriving out of nowhere. Keyed on `word` so
                    React remounts it and the animation restarts each turn. */}
                {live ? (
                  <span
                    key={word}
                    data-hero-progress
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-lime/70"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom-left: honest studio statement, line-mask reveal like the headline */}
      <p className="relative z-10 mb-10 max-w-xs px-5 text-[13px] font-bold uppercase leading-snug text-white lg:absolute lg:bottom-12 lg:left-10 lg:mb-0 lg:px-0">
        <span className="block overflow-hidden">
          <span className="hero-line block">
            WEBIFY is a SENIOR-LED COMPANY
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-line block">
            BUILT FOR CLARITY, SPEED, AND EXECUTION.
          </span>
        </span>
      </p>
    </section>
  );
}
