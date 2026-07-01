"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor. Desktop / fine-pointer only (touch keeps its native cursor and
 * this renders nothing). A 30px outline ring lags the mouse (lerp 0.15) while a
 * 5px dot tracks tighter (lerp 0.35) - the classic two-part studio cursor. The
 * ring grows to 58px over links/buttons and becomes a 96px "View ->" pill over
 * elements marked data-cursor="view". Over a data-cursor="hide" zone (e.g. the
 * mask-reveal band) it fades out so the section's own effect owns the pointer.
 * Honors prefers-reduced-motion (snaps). All position via rAF transform.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ringLerp = reduce ? 1 : 0.15;
    const dotLerp = reduce ? 1 : 0.35;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let dx = mx;
    let dy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      ring.classList.remove("is-hidden");
      dot.classList.remove("is-hidden");
    };
    const tick = () => {
      rx += (mx - rx) * ringLerp;
      ry += (my - ry) * ringLerp;
      dx += (mx - dx) * dotLerp;
      dy += (my - dy) * dotLerp;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const hideZone = t?.closest?.("[data-cursor='hide']");
      const view = t?.closest?.("[data-cursor='view']");
      const interactive = t?.closest?.(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor]",
      );
      ring.classList.toggle("is-hidden-zone", !!hideZone);
      dot.classList.toggle("is-hidden-zone", !!hideZone);
      ring.classList.toggle("is-view", !!view && !hideZone);
      ring.classList.toggle("is-hover", !!interactive && !view && !hideZone);
    };
    const hide = () => {
      ring.classList.add("is-hidden");
      dot.classList.add("is-hidden");
    };

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
    <>
      <div ref={ringRef} aria-hidden className="custom-cursor is-hidden">
        <span className="custom-cursor__label">View →</span>
      </div>
      <div ref={dotRef} aria-hidden className="custom-cursor-dot is-hidden" />
    </>
  );
}
