"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";
import { gsap } from "@/lib/anim";

const tones = {
  blue: "bg-primary text-white hover:bg-primary-deep",
  white: "bg-white text-ink hover:bg-fill-light",
  dark: "bg-fill-dark text-white hover:bg-fill-dark-2",
} as const;

/* One pill geometry for every CTA on the site. Interactive states:
   hover (tone), focus-visible ring, active press, disabled (button only). */
const base =
  "group inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-[background-color,color,scale] duration-300 active:scale-[0.97] " +
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

  // Subtle magnetic hover, fine pointers only (no-op on touch devices).
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || !window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.15,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
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
