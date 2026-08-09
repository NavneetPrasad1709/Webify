"use client";

import { useEffect, useState } from "react";

/* Floating back-to-top control.
   Deliberately quiet: the cobalt disc carrying the brand mark now belongs to
   the lead trigger in the opposite corner, and two identical circles on one
   screen would read as two of the same control. This is a utility, so it is
   smaller, dark, and reads as a surface rather than an action. */
export default function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 left-6 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-ink/75 text-white ring-1 ring-white/25 backdrop-blur transition-all duration-300 hover:bg-ink hover:ring-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
        <path
          d="M10 16V5M5 10l5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
