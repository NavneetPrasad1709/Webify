"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { socialLinks } from "@/lib/data";
import PillButton from "@/components/ui/PillButton";
import RollingText from "@/components/ui/RollingText";

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
  const sectionRef = useRef<HTMLElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const tickerListRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardFloatRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [word, setWord] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Line-mask reveals: headline + bottom statement rise out of clip wrappers. */
      gsap.fromTo(
        ".hero-line",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.12 }
      );

      /* Continuous vertical ticker (template style): two stacked copies,
         wrapper glides one copy-height forever. */
      gsap.to(tickerListRef.current, {
        yPercent: -50,
        duration: 9,
        ease: "none",
        repeat: -1,
      });

      /* Card blur-in, then gentle idle float on a nested wrapper. */
      gsap.fromTo(cardRef.current, revealFrom, { ...revealTo, delay: 0.6 });
      gsap.fromTo(
        cardFloatRef.current,
        { y: -8 },
        { y: 8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 }
      );

      /* Social pills stagger in. */
      const pills = socialRef.current
        ? Array.from(socialRef.current.children)
        : [];
      gsap.fromTo(
        pills,
        revealFrom,
        { ...revealTo, delay: 1.0, stagger: 0.08 }
      );

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
      className="relative min-h-svh overflow-hidden bg-ink"
    >
      {/* Background: hero video + vignette + top gradient */}
      <div ref={shardsRef} className="absolute -inset-y-12 inset-x-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0d0d0d_100%)]"
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
              className="inline-block whitespace-nowrap text-[clamp(40px,8.6vw,124px)]"
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
              Studio
            </h2>
            <div className="mt-6">
              <PillButton tone="blue" href="/contact">
                <RollingText label="Start a Project" />
              </PillButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-left: honest studio statement, line-mask reveal like the headline */}
      <p className="absolute bottom-10 left-5 z-10 max-w-xs text-[13px] font-bold uppercase leading-snug text-white md:bottom-12 md:left-10">
        <span className="block overflow-hidden">
          <span className="hero-line block">
            WEBIFY is a SENIOR-LED STUDIO
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-line block">
            BUILT FOR CLARITY, SPEED, AND EXECUTION.
          </span>
        </span>
      </p>

      {/* Bottom-right: social pills (template home-button-wrapper) */}
      <div
        ref={socialRef}
        className="absolute bottom-10 right-10 z-10 hidden items-center gap-2 lg:flex"
      >
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[.06] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition-colors duration-300 hover:bg-white/15"
          >
            <img src={s.icon} alt="" className="h-3.5 w-3.5 object-contain" />
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
