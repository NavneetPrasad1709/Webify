"use client";

import type React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./statement.css";

/**
 * H4 - "What we build" manifesto. One section that combines two references:
 *  - Magic UI text-reveal: the statement fills word-by-word as you scroll
 *    (GSAP ScrollTrigger scrub + CSS sticky - Lenis-safe, accumulates).
 *  - 21st.dev hover-preview: the three product terms are hover links that
 *    reveal a cursor-following high-res image card (touch → inline gallery).
 *
 * Preview images are illustrative high-res Unsplash visuals - swap for owned art.
 */
type Preview = { image: string; title: string; subtitle: string };

const PREVIEWS: Record<string, Preview> = {
  ai: {
    image:
      "https://images.unsplash.com/photo-1695144244472-a4543101ef35?w=1600&h=1200&fit=crop&q=85",
    title: "AI products",
    subtitle: "Models, agents & AI-native interfaces",
  },
  web: {
    image:
      "https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?w=1600&h=1200&fit=crop&q=85",
    title: "Web platforms",
    subtitle: "Sites & web apps that convert",
  },
  mobile: {
    image:
      "https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=1600&h=1200&fit=crop&q=85",
    title: "Mobile apps",
    subtitle: "iOS & Android people keep",
  },
};

// The manifesto, with the three product terms woven in as hover anchors.
const PARTS: Array<string | { term: string; label: string }> = [
  "Great products aren't briefed into existence. They're designed, engineered and shipped end to end - from",
  { term: "ai", label: "AI products" },
  "to",
  { term: "web", label: "web platforms" },
  "to",
  { term: "mobile", label: "mobile apps" },
  "- built by senior people obsessed with the outcome.",
];

type Token = { text: string; term?: string };
const TOKENS: Token[] = PARTS.flatMap((part) =>
  typeof part === "string"
    ? part
        .split(" ")
        .filter(Boolean)
        .map((w) => ({ text: w }))
    : [{ text: part.label, term: part.term }],
);

function HoverLink({
  previewKey,
  children,
  onStart,
  onMove,
  onEnd,
}: {
  previewKey: string;
  children: React.ReactNode;
  onStart: (key: string, e: React.MouseEvent) => void;
  onMove: (e: React.MouseEvent) => void;
  onEnd: () => void;
}) {
  return (
    <span
      className="tr-word hover-link"
      onMouseEnter={(e) => onStart(previewKey, e)}
      onMouseMove={onMove}
      onMouseLeave={onEnd}
    >
      {children}
    </span>
  );
}

export function StatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Preview | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  // Preload preview images so the first hover is instant.
  useEffect(() => {
    Object.values(PREVIEWS).forEach((d) => {
      const img = new window.Image();
      img.src = d.image;
    });
  }, []);

  // Scroll-driven word reveal (GSAP ScrollTrigger, synced to Lenis).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const words = container.querySelectorAll<HTMLElement>(".tr-word");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        duration: 0.5,
        stagger: 0.5,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const update = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 320;
    const cardHeight = 280;
    const offsetY = 20;
    let x = e.clientX - cardWidth / 2;
    let y = e.clientY - cardHeight - offsetY;
    if (x + cardWidth > window.innerWidth - 20) x = window.innerWidth - cardWidth - 20;
    if (x < 20) x = 20;
    if (y < 20) y = e.clientY + offsetY;
    setPos({ x, y });
  }, []);

  const onStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActive(PREVIEWS[key]);
      setVisible(true);
      update(e);
    },
    [update],
  );
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (visible) update(e);
    },
    [visible, update],
  );
  const onEnd = useCallback(() => setVisible(false), []);

  return (
    <section className="statement-section" aria-label="What we build">
      <div className="stmt-grain" aria-hidden />

      <div ref={containerRef} className="stmt-scroll">
        <div className="stmt-sticky">
          <div className="stmt-glow" aria-hidden />
          <div className="stmt-content">
            <p className="stmt-kicker">What we build</p>
            <p className="text-block">
              {TOKENS.map((tok, i) =>
                tok.term ? (
                  <HoverLink
                    key={i}
                    previewKey={tok.term}
                    onStart={onStart}
                    onMove={onMove}
                    onEnd={onEnd}
                  >
                    {tok.text}
                  </HoverLink>
                ) : (
                  <span key={i} className="tr-word">
                    {tok.text}
                  </span>
                ),
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Touch fallback - hover doesn't exist, so the imagery shows inline. */}
      <div className="stmt-gallery">
        {Object.values(PREVIEWS).map((d) => (
          <figure key={d.title}>
            <Image
              src={d.image}
              alt={d.title}
              width={1200}
              height={900}
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <figcaption>
              <span className="t">{d.title}</span>
              <span className="s">{d.subtitle}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {active && (
        <div
          className={`statement-preview-card ${visible ? "visible" : ""}`}
          style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
          aria-hidden
        >
          <div className="inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt={active.title} />
            <div className="t">{active.title}</div>
            <div className="s">{active.subtitle}</div>
          </div>
        </div>
      )}
    </section>
  );
}
