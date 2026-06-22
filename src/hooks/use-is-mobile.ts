"use client";

import { useEffect, useState } from "react";

/** SSR-safe media-query hook (starts false to match server render). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True below Tailwind's md breakpoint (max-width: 767px). */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

/** True at Tailwind's lg breakpoint and up (min-width: 1024px). */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}
