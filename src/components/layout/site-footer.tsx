"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import "./site-footer.css";

/**
 * H10 - Footer. Locked "Kresna" SaaS design spec, built verbatim (layout, values,
 * fonts, shadows, watermark, lucky badge), rebranded to Webify and wired into our
 * Next stack. Content swaps vs the original Kresna spec are marked [REBRAND].
 */

// [REBRAND: Kresna nav → Webify routes]. Internal links use real routes;
// Internal links use real routes; legal pages live at /privacy and /terms.
const NAV_COLUMN = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const SERVICES_COLUMN = [
  { label: "AI Development", href: "/services/ai-development" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps", href: "/services/mobile-app-development" },
  { label: "SEO", href: "/services/seo" },
];
const COMPANY_COLUMN: { label: string; href: string; external?: boolean }[] = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

// Official brand glyphs (simple-icons paths). Hrefs come from site.ts - only
// socials with a real configured URL render (no dead "#" links ship).
const SOCIAL_GLYPHS = {
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
} as const;

const SOCIALS = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, path: SOCIAL_GLYPHS.linkedin },
  { label: "X", href: siteConfig.socials.x, path: SOCIAL_GLYPHS.x },
  { label: "GitHub", href: siteConfig.socials.github, path: SOCIAL_GLYPHS.github },
].filter((s) => Boolean(s.href));

export function SiteFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Honor reduced-motion: pause the footer card video.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  // Watermark: fit the SVG viewBox to the rendered glyph bounds (after fonts load).
  useEffect(() => {
    const fit = () => {
      const svg = document.getElementById("footerWatermarkSvg");
      const text = document.getElementById("footerWatermarkText");
      if (!svg || !text) return;
      try {
        const b = (text as unknown as SVGGraphicsElement).getBBox();
        svg.setAttribute("viewBox", `${b.x} ${b.y} ${b.width} ${b.height}`);
      } catch {
        /* getBBox can throw if not yet rendered - ignore */
      }
    };
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(fit);
    } else {
      fit();
    }
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <section className="footer-section">
      <div className="footer-wrapper">
        {/* LEFT CARD - video background */}
        <div className="footer-left">
          <video
            ref={videoRef}
            className="footer-left-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            {/* Reference/stock footer clip - swap for an owned, self-hosted video. */}
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4"
              type="video/mp4"
            />
          </video>

          <div className="footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="" className="footer-logo-img" width={36} height={36} />
            <span className="footer-logo-name">Webify</span>
          </div>

          <div className="footer-tagline-container">
            <p className="footer-tagline">
              AI-first product engineering,
              <br />
              <span>senior-led, end to end.</span>
            </p>
          </div>

          <div className="footer-social-row">
            <span className="footer-social-label">
              {SOCIALS.length ? "Stay in touch!" : `Email us - ${siteConfig.email}`}
            </span>
            {SOCIALS.length ? (
              <div className="footer-social-icons">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    className="social-icon"
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* RIGHT CARD - light gray */}
        <div className="footer-right">
          {/* Floating "Feeling lucky?" badge */}
          <div className="footer-lucky-graphic" aria-hidden="true">
            <div className="lucky-cube">
              <span className="lucky-cube-mark">W</span>
            </div>
            <div className="lucky-text-row">
              <span className="lucky-arrow">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20 C 6 14, 10 9, 18 5" />
                  <path d="M18 5 L 12 5" />
                  <path d="M18 5 L 18 11" />
                </svg>
              </span>
              <span className="lucky-text">Feeling lucky?</span>
            </div>
          </div>

          <div className="footer-right-top">
            <div className="footer-nav-cols">
              <nav className="footer-col" aria-label="Navigation">
                <p className="footer-col-title">Navigation</p>
                {NAV_COLUMN.map((l) => (
                  <Link key={l.label} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </nav>
              <nav className="footer-col" aria-label="Services">
                <p className="footer-col-title">Services</p>
                {SERVICES_COLUMN.map((l) => (
                  <Link key={l.label} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </nav>
              <nav className="footer-col" aria-label="Company">
                <p className="footer-col-title">Company</p>
                {COMPANY_COLUMN.map((l) =>
                  l.href.startsWith("/") ? (
                    <Link key={l.label} href={l.href}>
                      {l.label}
                    </Link>
                  ) : (
                    <a key={l.label} href={l.href}>
                      {l.label}
                    </a>
                  ),
                )}
              </nav>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Webify. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="footer-watermark" aria-hidden="true">
        <svg
          id="footerWatermarkSvg"
          viewBox="62 95 876 175"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            id="footerWatermarkText"
            x="500"
            y="240"
            textAnchor="middle"
            fontSize="320"
          >
            Webify
          </text>
        </svg>
      </div>
    </section>
  );
}
