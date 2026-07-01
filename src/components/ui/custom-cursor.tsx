"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor affordance. The NATIVE cursor is kept everywhere (familiar + easy to
 * read); this element is invisible by default and only fades in over interactive
 * elements - a hollow ring over links/buttons, and a violet "View ->" pill over
 * project cards (data-cursor="view") - so it's obvious what can be clicked.
 * Desktop / fine-pointer only (touch renders nothing). Position via rAF (lerp
 * 0.2); honors prefers-reduced-motion (snaps).
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerp = reduce ? 1 : 0.2;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const tick = () => {
      cx += (mx - cx) * lerp;
      cy += (my - cy) * lerp;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const view = t?.closest?.("[data-cursor='view']");
      const interactive = t?.closest?.("a, button, [role='button'], [data-cursor]");
      el.classList.toggle("is-view", !!view);
      el.classList.toggle("is-hover", !!interactive && !view);
    };
    const clear = () => el.classList.remove("is-hover", "is-view");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", clear);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", clear);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} aria-hidden className="custom-cursor">
      <span className="custom-cursor__label">View →</span>
    </div>
  );
}
