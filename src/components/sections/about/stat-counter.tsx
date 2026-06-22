"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up stat that animates from 0 → value when it scrolls into view
 * (IntersectionObserver + rAF, eased). Honors prefers-reduced-motion by showing
 * the final value immediately. setState only ever fires from the IO callback /
 * rAF — never synchronously in the effect body.
 */
export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        if (reduce) {
          setN(value);
          return;
        }
        let start: number | undefined;
        const tick = (t: number) => {
          if (start === undefined) start = t;
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref}>
      <div
        className="nums font-semibold leading-none tracking-[-0.03em] text-neutral-50"
        style={{ fontSize: "clamp(2.5rem,6vw,3.75rem)" }}
      >
        {prefix}
        {n}
        {suffix}
      </div>
      <div className="mt-3 text-sm leading-snug text-neutral-400 sm:text-base">{label}</div>
    </div>
  );
}
