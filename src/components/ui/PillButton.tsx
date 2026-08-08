"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";

const tones = {
  blue: "bg-primary text-white hover:bg-primary-deep",
  white: "bg-white text-ink hover:bg-fill-light",
  dark: "bg-fill-dark text-white hover:bg-fill-dark-2",
} as const;

/* One pill geometry for every CTA on the site. Interactive states:
   hover (tone), focus-visible ring, active press, disabled (button only).

   The magnetic hover is written by hand rather than with gsap on purpose:
   this component is used by the Footer, the Footer renders on every route,
   and that one import was pulling 121 kB of animation library onto pages
   that animate nothing. A transform and a transition do the same job. */
const base =
  "group inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold will-change-transform " +
  "transition-[background-color,color,scale,transform] duration-300 active:scale-[0.97] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:pointer-events-none disabled:opacity-50";

type Props = {
  children: ReactNode;
  tone?: keyof typeof tones;
  /** Internal path renders next/link; mailto/external renders <a>; omit for <button>. */
  href?: string;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export default function PillButton({
  children,
  tone = "blue",
  href,
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // Subtle magnetic hover, fine pointers only (no-op on touch devices, and
  // skipped entirely when the visitor asks for reduced motion).
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.15;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    el.style.transitionTimingFunction = "cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    // Overshoot on the way back, which is what the old elastic ease bought.
    el.style.transitionTimingFunction = "cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.transform = "";
  };

  const cls = `${base} ${tones[tone]} ${className}`;
  const shared = {
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    className: cls,
  };

  if (href && href.startsWith("/")) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...shared}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...shared}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      {...shared}
    >
      {children}
    </button>
  );
}
