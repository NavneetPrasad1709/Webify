"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { siteConfig, mailtoHref } from "@/lib/site";
import "./sterling-gate-kinetic-navigation.css";

// Register GSAP plugins once (SSR-guarded).
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Sterling Gate - kinetic fullscreen navigation (canonical 21st.dev reference,
 * ported to our multi-page Next app):
 *  - Webify wordmark + the "click me" hint (Caveat) + Menu/Close toggle.
 *  - Right-drawer menu (fullscreen on mobile) with staggered backdrop panels,
 *    rotating link reveals, and per-link ambient background shapes on hover.
 *  - Next <Link> routing, focus management, Escape-to-close, and a full
 *    prefers-reduced-motion path (snaps to end state, no tweening).
 * Styling lives in ./sterling-gate-kinetic-navigation.css; GSAP owns the
 * transforms (no competing CSS transform defaults on the animated nodes).
 */
export function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const hasInteracted = useRef(false);
  const firstRun = useRef(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ---- Setup: custom ease + per-link ambient-shape hover --------------------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduced = prefersReducedMotion();

    // Register the bespoke ease once. Scoped to this nav's own timelines below -
    // NOT via global gsap.defaults(), which would leak onto every other tween.
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
      }
    } catch {
      /* CustomEase unavailable - timelines fall back to a built-in ease. */
    }

    // Collect listener removers so cleanup never touches a stale ref.
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const menuItems = container.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = container.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.bg-shape-${shapeIndex}`);
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer
            ?.querySelectorAll(".bg-shape")
            .forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");

          if (reduced) {
            gsap.set(shapeEls, { scale: 1, opacity: 1, rotation: 0, overwrite: "auto" });
            return;
          }
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
            },
          );
        };

        const onLeave = () => {
          if (reduced) {
            gsap.set(shapeEls, { opacity: 0, overwrite: "auto" });
            shape.classList.remove("active");
            return;
          }
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
            onComplete: () => shape.classList.remove("active"),
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        });
      });
    }, container);

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // ---- Open / close timeline ------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduced = prefersReducedMotion();

    // First mount: the menu starts hidden via CSS (data-nav="closed"), so there
    // is nothing to animate closed - skip the timeline and the stray inline
    // styles it would otherwise write on every page load.
    const isFirst = firstRun.current;
    firstRun.current = false;
    if (isFirst && !isMenuOpen) {
      container.querySelector(".nav-overlay-wrapper")?.setAttribute("data-nav", "closed");
      return;
    }

    const ease = gsap.parseEase("main") ? "main" : "power2.out";

    const ctx = gsap.context(() => {
      const navWrap = container.querySelector(".nav-overlay-wrapper");
      const menu = container.querySelector(".menu-content");
      const overlay = container.querySelector(".overlay");
      const bgPanels = container.querySelectorAll(".backdrop-layer");
      const menuLinks = container.querySelectorAll(".nav-link");
      const fadeTargets = container.querySelectorAll("[data-menu-fade]");
      const menuButton = container.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      if (isMenuOpen) {
        navWrap?.setAttribute("data-nav", "open");

        if (reduced) {
          // a11y: jump straight to the open state, no tweening.
          gsap.set(navWrap, { display: "block" });
          gsap.set(menu, { xPercent: 0 });
          if (menuButtonTexts) gsap.set(menuButtonTexts, { yPercent: -100 });
          if (menuButtonIcon) gsap.set(menuButtonIcon, { rotate: 315 });
          gsap.set(overlay, { autoAlpha: 1 });
          gsap.set(bgPanels, { xPercent: 0 });
          gsap.set(menuLinks, { yPercent: 0, rotate: 0 });
          if (fadeTargets.length) gsap.set(fadeTargets, { autoAlpha: 1, yPercent: 0 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease, duration: 0.7 } });
        tl.set(navWrap, { display: "block" }).set(menu, { xPercent: 0 }, "<");
        if (menuButtonTexts)
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 });
        if (menuButtonIcon) tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<");
        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(
            menuLinks,
            { yPercent: 140, rotate: 10 },
            { yPercent: 0, rotate: 0, stagger: 0.05 },
            "<+=0.35",
          );
        if (fadeTargets.length)
          tl.fromTo(
            fadeTargets,
            { autoAlpha: 0, yPercent: 50 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" },
            "<+=0.2",
          );
      } else {
        navWrap?.setAttribute("data-nav", "closed");

        if (reduced) {
          gsap.set(overlay, { autoAlpha: 0 });
          gsap.set(menu, { xPercent: 120 });
          if (menuButtonTexts) gsap.set(menuButtonTexts, { yPercent: 0 });
          if (menuButtonIcon) gsap.set(menuButtonIcon, { rotate: 0 });
          gsap.set(navWrap, { display: "none" });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease, duration: 0.7 } });
        tl.to(overlay, { autoAlpha: 0 }).to(menu, { xPercent: 120 }, "<");
        if (menuButtonTexts) tl.to(menuButtonTexts, { yPercent: 0 }, "<");
        if (menuButtonIcon) tl.to(menuButtonIcon, { rotate: 0 }, "<");
        tl.set(navWrap, { display: "none" });
      }
    }, container);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // ---- Focus management: into the menu on open, back to the toggle on close -
  useEffect(() => {
    if (isMenuOpen) {
      hasInteracted.current = true;
      // Defer one frame so the wrapper's display:none is cleared before focus().
      const id = requestAnimationFrame(() => {
        containerRef.current
          ?.querySelector<HTMLAnchorElement>(".menu-list .nav-link")
          ?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
    if (hasInteracted.current) closeBtnRef.current?.focus();
  }, [isMenuOpen]);

  // ---- Focus containment: make the rest of the page inert while open --------
  // Keeps Tab/Shift+Tab (and assistive tech) inside the nav's header + menu so
  // the page/footer behind the overlay can't be reached or activated.
  useEffect(() => {
    const root = containerRef.current;
    const parent = root?.parentElement;
    if (!root || !parent) return;
    const siblings = Array.from(parent.children).filter((el) => el !== root);
    siblings.forEach((el) =>
      isMenuOpen ? el.setAttribute("inert", "") : el.removeAttribute("inert"),
    );
    return () => siblings.forEach((el) => el.removeAttribute("inert"));
  }, [isMenuOpen]);

  // ---- Keyboard: Escape closes; Tab wraps within the open menu --------------
  useEffect(() => {
    if (!isMenuOpen) return;
    const root = containerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="dark">
      <div className="site-header-wrapper">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row" aria-label="Masthead">
              <Link href="/" aria-label="Webify home" className="nav-logo-row w-inline-block">
                {/* Heavy wordmark: WEBIFY + accent asterisk. */}
                <span className="logo-text">
                  Webify<span className="logo-star">*</span>
                </span>
              </Link>

              <div className="nav-row__right">
                {/* Handwritten hint (intentional). Decorative + mouse-clickable;
                    aria-hidden so AT isn't given a duplicate of the real toggle
                    below - keyboard/AT users operate the Menu button. */}
                <div
                  className="nav-toggle-label"
                  onClick={toggleMenu}
                  aria-hidden="true"
                  style={{ cursor: "pointer", pointerEvents: "auto" }}
                >
                  <span className="toggle-text">click me</span>
                </div>

                {/* Primary Menu / Close toggle. */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="nav-close-btn"
                  onClick={toggleMenu}
                  aria-controls="primary-navigation"
                  aria-expanded={isMenuOpen}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  style={{ pointerEvents: "auto" }}
                >
                  <div className="menu-button-text">
                    <p className="p-large">Menu</p>
                    <p className="p-large">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor" />
                      <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
                      <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
                      <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
                      <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
                      <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container">
        <div
          id="primary-navigation"
          data-nav="closed"
          className="nav-overlay-wrapper"
          aria-hidden={!isMenuOpen}
        >
          {/* Backdrop - click to close (Escape + Close button also close). */}
          <div className="overlay" onClick={closeMenu} aria-hidden="true" />

          <nav className="menu-content" aria-label="Primary">
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              {/* Per-link ambient shapes (revealed on hover via data-shape). */}
              <div className="ambient-background-shapes" aria-hidden="true">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(236,72,153,0.1)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(99,102,241,0.15)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(99,102,241,0.2)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(139,92,246,0.15)" strokeWidth="40" fill="none" />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(139,92,246,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(236,72,153,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(99,102,241,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(236,72,153,0.3)" />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(99,102,241,0.12)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(236,72,153,0.1)" />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(99,102,241,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(139,92,246,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(236,72,153,0.1)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                <li className="menu-list-item" data-shape="1">
                  <Link href="/about" onClick={closeMenu} className="nav-link w-inline-block">
                    <p className="nav-link-text">About us</p>
                    <div className="nav-link-hover-bg" />
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <Link href="/work" onClick={closeMenu} className="nav-link w-inline-block">
                    <p className="nav-link-text">Our work</p>
                    <div className="nav-link-hover-bg" />
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <Link href="/services" onClick={closeMenu} className="nav-link w-inline-block">
                    <p className="nav-link-text">Services</p>
                    <div className="nav-link-hover-bg" />
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="4">
                  <Link href="/case-studies" onClick={closeMenu} className="nav-link w-inline-block">
                    <p className="nav-link-text">Case Studies</p>
                    <div className="nav-link-hover-bg" />
                  </Link>
                </li>
                <li className="menu-list-item" data-shape="5">
                  <Link href="/contact" onClick={closeMenu} className="nav-link w-inline-block">
                    <p className="nav-link-text">Contact us</p>
                    <div className="nav-link-hover-bg" />
                  </Link>
                </li>
              </ul>

              {/* Menu footer - brand line + direct contact (eye-pleasing finish). */}
              <div className="menu-footer" data-menu-fade>
                <p className="menu-footer-tagline">Senior-led AI &amp; software product team.</p>
                <div className="menu-footer-row">
                  <a className="menu-footer-link" href={mailtoHref("Project enquiry")}>
                    {siteConfig.email}
                  </a>
                  <span className="menu-footer-meta">India &amp; worldwide</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
