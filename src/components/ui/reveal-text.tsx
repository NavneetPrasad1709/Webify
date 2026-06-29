"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ElementType } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Word-by-word reveal: each word sits in an overflow-hidden wrapper and rises
 * from translateY(110%) → 0 with a stagger when the element enters view. Use on
 * section headings site-wide. Accessible (full text via aria-label, words
 * aria-hidden) and reduced-motion safe (renders static text).
 */
export function RevealText({
  text,
  as: Tag = "span" as ElementType,
  delay = 0,
  stagger = 0.05,
  duration = 0.9,
  className,
  wordClassName,
  once = true,
}: {
  text: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  wordClassName?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <Tag ref={ref as never} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="reveal-word">
          <motion.span
            className={wordClassName}
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{ duration, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
