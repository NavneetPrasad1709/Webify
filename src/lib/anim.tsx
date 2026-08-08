"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerScrollBridge } from "@/lib/scroll-bridge";

gsap.registerPlugin(ScrollTrigger);

/* Announce ScrollTrigger to SmoothScroll without SmoothScroll having to
   import gsap. Only routes that pull this module in pay for the library, and
   they are exactly the routes that animate. */
registerScrollBridge({
  update: () => ScrollTrigger.update(),
  refresh: () => ScrollTrigger.refresh(),
});

export { gsap, ScrollTrigger };

/** Split a sentence into word spans; used by scrub + reveal effects. */
export function SplitWords({
  text,
  className = "",
  wordClassName = "",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        // Regular space OUTSIDE the inline-block span: keeps the visual gap
        // AND the soft-wrap opportunity between words (an NBSP inside the
        // span prevents line breaks between the word blocks).
        <span key={i}>
          <span className={`inline-block ${wordClassName}`}>{word}</span>
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/** Standard blur-in reveal config used across sections. */
export const revealFrom: gsap.TweenVars = {
  y: 60,
  opacity: 0,
  filter: "blur(10px)",
};

export const revealTo: gsap.TweenVars = {
  y: 0,
  opacity: 1,
  filter: "blur(0px)",
  duration: 1,
  ease: "power3.out",
};
