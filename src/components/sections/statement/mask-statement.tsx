"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./mask-statement.css";

/**
 * Mask-reveal statement band (adapted from olivierlarose/cursor-hover-mask).
 *
 * A ghost-outline line sits on the dark canvas; a circular "spotlight" that
 * follows the cursor reveals the SAME line filled with a violet->green gradient,
 * and growing when you hover the words. It's a live proof-of-craft moment for a
 * studio whose flagship is interactive/animated web.
 *
 * Desktop / fine-pointer only. On touch or prefers-reduced-motion the mask +
 * hint don't render and the line shows as a clean, readable static statement
 * (see mask-statement.css). data-cursor="hide" tells the global cursor to fade
 * out here so the spotlight owns the pointer.
 */
const KICKER = "The craft";
const LINE = "We build the web others can't.";

export function MaskStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!enabled) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const size = hovered ? 560 : 90;
  const maskPos = `${pos.x - size / 2}px ${pos.y - size / 2}px`;
  // Vendor-prefixed mask props aren't in framer's literal type; a plain object
  // (not an inline literal) skips the excess-property check and animates fine.
  const maskAnimate = {
    WebkitMaskPosition: maskPos,
    maskPosition: maskPos,
    WebkitMaskSize: `${size}px`,
    maskSize: `${size}px`,
  };

  return (
    <section
      ref={sectionRef}
      data-cursor="hide"
      onMouseMove={onMove}
      aria-label="Studio statement"
      className="mask-statement"
    >
      <p className="mask-statement__kicker">{KICKER}</p>

      {/* Base: ghost outline (always visible, the readable text for SR/SEO). */}
      <div className="mask-statement__body">
        <p>{LINE}</p>
      </div>

      {/* Spotlight: same line filled with gradient, revealed inside a cursor circle. */}
      {enabled && (
        <motion.div
          className="mask-statement__mask"
          aria-hidden
          animate={maskAnimate}
          transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
        >
          <p
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {LINE}
          </p>
        </motion.div>
      )}

      {enabled && (
        <span className="mask-statement__hint" aria-hidden>
          <span className="dot" />
          move your cursor
        </span>
      )}
    </section>
  );
}
