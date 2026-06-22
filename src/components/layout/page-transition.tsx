"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * G2 — premium page-to-page route transition.
 *
 * Restrained fade + slight rise on enter / fall on exit (Apple-style: motion
 * that serves orientation, not decoration). Collapses to an instant swap when
 * the user prefers reduced motion. Keyed on pathname so each route animates in.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="flex flex-1 flex-col"
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -12 }}
        transition={{
          duration: reduce ? 0 : 0.45,
          ease: [0.65, 0.05, 0, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
