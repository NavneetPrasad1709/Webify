"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/anim";
import RollingText from "@/components/ui/RollingText";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/service" },
  { label: "Projects", href: "/project" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/* Overlay link: the shared RollingText letter-roll, white copy rolling out,
   cobalt copy rolling in. */
function RollLink({
  label,
  href,
  tabIndex,
  onClick,
}: {
  label: string;
  href: string;
  tabIndex: number;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      tabIndex={tabIndex}
      data-nav-line
      className="display-2 group block text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <RollingText label={label} secondClassName="text-primary" />
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Initial guess (SSR-safe): homepage opens on a dark hero. After mount,
  // the scroll sampler below reads the actual background behind the logo.
  const [darkBg, setDarkBg] = useState(pathname === "/");
  const onDark = open || darkBg;
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);
  const hasOpenedRef = useRef(false);
  const hiddenRef = useRef(false);

  // Sample the page background under the logo so the logo always contrasts -
  // works across every section of every page, no per-section markers needed.
  useLayoutEffect(() => {
    let raf = 0;
    const sample = () => {
      raf = 0;
      const stack = document.elementsFromPoint(72, 44);
      for (const el of stack) {
        if (navRef.current?.contains(el)) continue;
        if (el.closest("[data-preloader]")) continue; // ink intro veil - not the page
        let node: Element | null = el;
        while (node) {
          const bg = getComputedStyle(node).backgroundColor;
          const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (m && (m[4] === undefined || parseFloat(m[4]) > 0.5)) {
            const lum = 0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3];
            setDarkBg(lum < 130);
            return;
          }
          node = node.parentElement;
        }
      }
      setDarkBg(false);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sample);
    };
    sample();
    // re-sample once the preloader veil has lifted
    const settle = setTimeout(sample, 1900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(settle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Park the ink curtain offstage left; the open/close timelines below
      // own every subsequent move.
      gsap.set(overlayRef.current, { xPercent: -100, autoAlpha: 0 });

      // Hide nav when scrolling down past 120px, reveal on any upward scroll.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (openRef.current) return;
          const shouldHide = self.direction === 1 && window.scrollY > 120;
          if (shouldHide === hiddenRef.current) return;
          hiddenRef.current = shouldHide;
          gsap.to(navRef.current, {
            yPercent: shouldHide ? -120 : 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    openRef.current = open;
    document.body.style.overflow = open ? "hidden" : "";

    const overlay = overlayRef.current;
    if (overlay) {
      const lines = overlay.querySelectorAll("[data-nav-line]");
      const meta = overlay.querySelector("[data-nav-meta]");
      // Guard against rapid toggling: retire whatever choreography is mid-flight
      // and let the new timeline pick elements up from their current positions.
      tlRef.current?.kill();

      if (open) {
        hasOpenedRef.current = true;
        // Always surface the bar while the menu is open.
        hiddenRef.current = false;
        gsap.to(navRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        // ENTRANCE - template grammar: ink curtain wipes in from the left,
        // links rise through their line masks top-down, meta fades in last.
        tlRef.current = gsap
          .timeline({ defaults: { overwrite: "auto" } })
          .set(overlay, { autoAlpha: 1 }, 0)
          .set(lines, { yPercent: 110 }, 0)
          .set(meta, { autoAlpha: 0, y: 12 }, 0)
          .to(overlay, { xPercent: 0, duration: 0.45, ease: "power3.out" }, 0)
          .to(lines, {
            yPercent: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.07,
          })
          .to(
            meta,
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
            "-=0.3", // ~0.2s after the last link line starts rising
          );
      } else if (hasOpenedRef.current) {
        // EXIT - inverted grammar: links drop out of their masks bottom-first,
        // meta fades concurrently, and only then the curtain wipes out left.
        tlRef.current = gsap
          .timeline({ defaults: { overwrite: "auto" } })
          .to(lines, {
            yPercent: 110,
            duration: 0.25,
            ease: "power2.in",
            stagger: { each: 0.05, from: "end" },
          })
          .to(meta, { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, 0)
          .to(overlay, { xPercent: -100, duration: 0.4, ease: "power3.in" })
          .set(overlay, { autoAlpha: 0 });
      }
    }

    // Focus management: move focus into the open menu, trap Tab inside it,
    // and hand focus back to the hamburger on close.
    if (open) {
      requestAnimationFrame(() => {
        overlayRef.current
          ?.querySelector<HTMLElement>("[data-nav-line]")
          ?.focus();
      });
    } else if (hasOpenedRef.current) {
      toggleRef.current?.focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && openRef.current && overlayRef.current) {
        const focusables = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>("a[href], button")
        ).filter((el) => el.tabIndex !== -1);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (!active || !overlayRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-10"
      >
        <Link href="/" onClick={() => setOpen(false)}>
          <span className="flex items-center">
            <img
              src={onDark ? "/assets/webify-logo-white.png" : "/assets/webify-logo-black.png"}
              alt="Webify"
              className="h-10 w-auto object-contain md:h-11"
            />
          </span>
        </Link>

        {/* Desktop inline nav: wayfinding stays visible, never behind a hamburger.
            Self-contained dark glass pill so it reads on light pages too. */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-ink/60 px-2 py-2 backdrop-blur lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                pathname === link.href ? "bg-white/10" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-1 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile: persistent conversion affordance beside the hamburger, so
            contact is never buried behind the menu */}
        <div className="flex items-center gap-2 lg:hidden">
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="rounded-full bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Let&apos;s Talk
        </Link>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-overlay"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-fill-dark/90 backdrop-blur"
        >
          <span
            className={`absolute h-0.5 w-[18px] bg-white transition-transform duration-300 ease-out ${
              open ? "rotate-45" : "-translate-y-[3px]"
            }`}
          />
          <span
            className={`absolute h-0.5 w-[18px] bg-white transition-transform duration-300 ease-out ${
              open ? "-rotate-45" : "translate-y-[3px]"
            }`}
          />
        </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="nav-overlay"
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Menu"
        aria-hidden={!open}
        className="invisible fixed inset-0 z-40 overflow-hidden bg-ink"
      >
        {/* Brand watermark behind the menu links */}
        <img
          src="/assets/webify-icon-dark.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[10%] -right-[6%] h-[70vh] w-auto opacity-[0.05]"
        />
        <nav className="flex h-full flex-col items-start justify-center gap-3 px-5 md:px-10">
          {NAV_LINKS.map((link) => (
            // Per-line clip mask: the link rises through this window on open
            // and drops back down through it on close.
            <span key={link.label} className="block overflow-hidden">
              <RollLink
                label={link.label}
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              />
            </span>
          ))}
        </nav>

        {/* Meta block: quiet two-tier contact facts, bottom-left of the curtain */}
        <div
          data-nav-meta
          className="absolute bottom-10 left-5 flex flex-col gap-5 md:left-10"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-gray-soft">
              EMAIL
            </p>
            <a
              href="mailto:contact@webify.org.in?subject=Project%20inquiry"
              tabIndex={open ? 0 : -1}
              className="-my-2 inline-flex min-h-11 items-center text-[15px] font-medium text-white"
            >
              contact@webify.org.in
            </a>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-gray-soft">
              LOCATION
            </p>
            <p className="mt-1 text-[15px] font-medium text-white">
              Remote-first, worldwide
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
