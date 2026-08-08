"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/anim";

/** Must match the total of the wf-veil-lift fallback in globals.css. */
const VEIL_FALLBACK_MS = 1400;

/** Brand intro on page load: icon breathes in, wordmark follows, veil lifts. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const veil = ref.current;
    if (!veil) return;

    // Storage throws outright in Safari lockdown and some embedded webviews.
    // Losing the once-per-session guard is harmless; letting the exception
    // escape a root-layout effect takes the whole tree down.
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem("wf-intro"));
      sessionStorage.setItem("wf-intro", "1");
    } catch {
      seen = false;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Almost nobody reaches this site by typing the address. They arrive from
    // a profile, a proposal link or a campaign, already deciding whether we
    // are worth ten more seconds, and a logo animation spends those seconds
    // on us instead of on the work. The intro is for direct visits only.
    const params = new URLSearchParams(window.location.search);
    const fromCampaign = Array.from(params.keys()).some((k) =>
      k.startsWith("utm_")
    );
    const fromElsewhere =
      document.referrer !== "" &&
      !document.referrer.startsWith(window.location.origin);

    // If hydration took longer than the CSS fallback, the veil has already
    // lifted. Re-running the timeline here would pull it back over the page.
    const tooLate = performance.now() > VEIL_FALLBACK_MS;

    if (seen || reduce || fromCampaign || fromElsewhere || tooLate) {
      veil.style.animation = "none";
      veil.style.display = "none";
      return;
    }

    // Hand control to GSAP now that we know it arrived in time.
    veil.style.animation = "none";

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          iconRef.current,
          { scale: 0.7, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.24, ease: "power3.out" }
        )
        .fromTo(
          logoRef.current,
          { y: 26, autoAlpha: 0, filter: "blur(6px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.26, ease: "power3.out" },
          "-=0.1"
        )
        .to(
          ref.current,
          { yPercent: -100, duration: 0.34, ease: "power4.inOut" },
          "-=0.08"
        )
        .set(ref.current, { display: "none" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <noscript>
        <style>{`[data-preloader]{display:none !important}`}</style>
      </noscript>
      <div
        ref={ref}
        data-preloader
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 bg-ink"
        aria-hidden="true"
      >
        {/* Small WebP renditions, not the 119 kB and 51 kB masters: this is
            the first thing fetched on every cold visit and it renders at
            192 px at most. */}
        <img
          ref={iconRef}
          src="/assets/brand/webify-icon-dark-384.webp"
          alt=""
          width={384}
          height={323}
          fetchPriority="high"
          className="h-36 w-auto md:h-48"
        />
        <img
          ref={logoRef}
          src="/assets/brand/webify-logo-white-480.webp"
          alt=""
          width={480}
          height={176}
          className="h-20 w-auto max-w-[85vw] object-contain md:h-[120px]"
        />
      </div>
    </>
  );
}
