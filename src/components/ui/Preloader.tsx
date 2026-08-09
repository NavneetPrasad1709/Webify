"use client";

import { useLayoutEffect, useRef } from "react";

/** Must match the total of the wf-veil-lift fallback in globals.css. */
const VEIL_FALLBACK_MS = 1600;

/**
 * Brand intro on page load: icon breathes in, wordmark follows, veil lifts.
 *
 * Every frame of that is CSS. This component only decides whether the intro
 * should play at all, which is the one thing CSS cannot know. It deliberately
 * imports no animation library: mounted in the root layout, a gsap import
 * here pulled 121 kB in front of first paint on every route on the site.
 */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

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

    /* The intro used to be skipped for anyone arriving from another site,
       which meant almost nobody ever saw it, since almost nobody types this
       address. That skip existed because the veil could once hang until the
       JavaScript bundle arrived. It cannot any more: the whole sequence is
       CSS and clears on a wall clock at VEIL_FALLBACK_MS whatever happens to
       the bundle, so the worst case is bounded and the brand moment is worth
       the second and a half.

       Once per session still holds. Replaying it on every page load would
       turn a first impression into a toll gate, which is why a plain refresh
       in the same tab shows no intro: open a new tab to see it again. */

    // Past the CSS fallback the veil has already lifted on its own; hiding it
    // now simply removes it from the tree.
    const tooLate = performance.now() > VEIL_FALLBACK_MS;

    if (seen || tooLate) {
      veil.style.animation = "none";
      veil.style.display = "none";
      return;
    }

    /* Let the veil's own animation finish, then take it out of the layout so
       it can never intercept a click.

       The target check is the whole point. animationend bubbles, so the icon
       and the wordmark inside the veil were each firing this listener as they
       finished, and with `once` the first of them tore the veil down at about
       0.8s: the lift never played and the intro looked like a flicker. The
       check is on the element rather than the animation name because the CSS
       minifier is free to rename keyframes. */
    const done = (event: AnimationEvent) => {
      if (event.target !== veil) return;
      veil.style.display = "none";
      veil.removeEventListener("animationend", done);
    };
    veil.addEventListener("animationend", done);
    return () => veil.removeEventListener("animationend", done);
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
          data-intro-icon
          src="/assets/brand/webify-icon-dark-384.webp"
          alt=""
          width={384}
          height={323}
          fetchPriority="high"
          className="h-36 w-auto md:h-48"
        />
        <img
          data-intro-word
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
