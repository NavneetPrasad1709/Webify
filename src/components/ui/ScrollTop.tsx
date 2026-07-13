"use client";

import { useEffect, useState } from "react";

/** Floating back-to-top button - the brand icon in a cobalt circle. */
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
      className={`fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-primary shadow-[0_8px_24px_rgba(0,81,255,.35)] transition-all duration-300 hover:bg-[#0041cc] md:flex ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <img src="/assets/webify-icon-dark.png" alt="" className="h-5 w-auto" />
    </button>
  );
}
