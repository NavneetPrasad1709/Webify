"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const SIZES = {
  sm: "h-9 px-6 text-xs font-medium",
  md: "h-11 px-8 text-sm font-medium",
  lg: "h-12 px-9 text-sm font-medium",
} as const;

/** Slides the current label up and reveals a duplicate from below on hover. */
function AnimatedText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block overflow-hidden align-middle">
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full"
      >
        {children}
      </span>
    </span>
  );
}

type Props = {
  children: ReactNode;
  size?: keyof typeof SIZES;
  className?: string;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

/** White pill, black text. Polymorphic (default link). */
export function PrimaryButton({
  children,
  size = "lg",
  className,
  as = "a",
  href,
  onClick,
  type = "button",
}: Props) {
  const classes = cn(
    "group inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-black leading-none transition-colors",
    SIZES[size],
    className,
  );
  const content = <AnimatedText>{children}</AnimatedText>;

  if (as === "button") {
    return (
      <button type={type} onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href ?? "#"} className={classes}>
      {content}
    </Link>
  );
}
