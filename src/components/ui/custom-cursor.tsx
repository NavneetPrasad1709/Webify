"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Textura-style custom cursor. Desktop / fine-pointer only (touch keeps its
 * native cursor and this renders nothing). A 12px dot lags the mouse (lerp 0.15
 * via rAF — no framer-motion for perf), expands to 48px with mix-blend-difference
 * over links/buttons, and becomes a "View →" pill over elements marked
 * data-cursor="view" (e.g. project cards). Honors prefers-reduced-motion (snaps).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerp = reduce ? 1 : 0.15;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.classList.remove("is-hidden");
    };
    const tick = () => {
      cx += (mx - cx) * lerp;
      cy += (my - cy) * lerp;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const view = t?.closest?.("[data-cursor='view']");
      const interactive = t?.closest?.(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor]",
      );
      dot.classList.toggle("is-view", !!view);
      dot.classList.toggle("is-hover", !!interactive && !view);
    };
    const hide = () => dot.classList.add("is-hidden");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", hide);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", hide);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={dotRef} aria-hidden className="custom-cursor is-hidden">
      <span className="custom-cursor__label">View →</span>
    </div>
  );
}
