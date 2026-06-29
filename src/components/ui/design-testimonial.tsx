"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type Item = { quote: string; author: string; role: string; company: string };

/**
 * Placeholder client quotes — Webify keeps these clearly sample until real,
 * permissioned client testimonials replace them (we don't publish invented
 * clients). Pass real ones via the `items` prop.
 */
const DEFAULT_ITEMS: Item[] = [
  {
    quote: "They scoped, designed and shipped our MVP in weeks — and we own every line of it.",
    author: "Client Name",
    role: "Founder",
    company: "Startup",
  },
  {
    quote: "No hand-offs, no account managers. A senior team that moved fast and told us the truth.",
    author: "Client Name",
    role: "Head of Product",
    company: "SaaS Co.",
  },
  {
    quote: "We came with a half-formed idea and left with a product our customers use every day.",
    author: "Client Name",
    role: "CEO",
    company: "Concept",
  },
];

export function Testimonial({ items = DEFAULT_ITEMS }: { items?: Item[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Mouse position for the magnetic parallax on the oversized number.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    }
  };

  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, items.length]);

  const current = items[activeIndex];

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 sm:px-8">
      <div ref={containerRef} className="relative w-full max-w-5xl" onMouseMove={handleMouseMove}>
        {/* Oversized index number — bleeds off the left edge */}
        <motion.div
          className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none text-[11rem] font-bold leading-none tracking-tighter text-foreground/[0.03] sm:-left-8 sm:text-[20rem] md:text-[28rem]"
          style={{ x: reduce ? 0 : numberX, y: reduce ? 0 : numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content — asymmetric layout */}
        <div className="relative flex">
          {/* Left column — vertical label + progress (hidden on the smallest screens) */}
          <div className="hidden flex-col items-center justify-center border-r border-border pr-8 sm:flex sm:pr-16">
            <motion.span
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Testimonials
            </motion.span>

            <div className="relative mt-8 h-32 w-px bg-border">
              <motion.div
                className="absolute left-0 top-0 w-full origin-top bg-foreground"
                animate={{ height: `${((activeIndex + 1) / items.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center — main content */}
          <div className="flex-1 py-10 sm:pl-16 sm:py-12">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with word reveal */}
            <div className="relative mb-12 min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-3xl font-light leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="mr-[0.3em] inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
                        },
                        exit: { opacity: 0, y: -10, transition: { duration: 0.2, delay: i * 0.02 } },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex flex-wrap items-end justify-between gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="h-px w-8 bg-foreground"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-medium text-foreground">{current.author}</p>
                    <p className="text-sm text-muted-foreground">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-border transition-transform active:scale-95"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground transition-colors group-hover:text-foreground/30"
                  >
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-border transition-transform active:scale-95"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground transition-colors group-hover:text-foreground/30"
                  >
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker — subtle repeating company names */}
        <div className="pointer-events-none absolute -bottom-20 left-0 right-0 overflow-hidden opacity-[0.08]">
          <motion.div
            className="flex whitespace-nowrap text-6xl font-bold tracking-tight"
            animate={reduce ? undefined : { x: [0, -1000] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                {items.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
