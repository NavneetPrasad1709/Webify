"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RollingText from "@/components/ui/RollingText";
import { BOOKING_URL } from "@/lib/site";

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
  index,
  tabIndex,
  onClick,
}: {
  label: string;
  href: string;
  index: number;
  tabIndex: number;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      tabIndex={tabIndex}
      data-nav-line
      style={{ "--nav-i": index } as React.CSSProperties}
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
  const [barHidden, setBarHidden] = useState(false);
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

  /* Hide the bar on the way down past 120px, bring it back on any upward
     scroll. This used to be a ScrollTrigger, which is a heavy dependency for
     comparing two numbers, and it is the reason gsap loaded on every route. */
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    const evaluate = () => {
      raf = 0;
      const y = window.scrollY;
      const goingDown = y > lastY;
      lastY = y;
      if (openRef.current) return;
      const shouldHide = goingDown && y > 120;
      if (shouldHide === hiddenRef.current) return;
      hiddenRef.current = shouldHide;
      setBarHidden(shouldHide);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    openRef.current = open;
    document.body.style.overflow = open ? "hidden" : "";
    // Lets the floating lead panel hide itself rather than hover over the
    // menu curtain, which sits below it in the stacking order.
    document.documentElement.dataset.menuOpen = open ? "true" : "false";

    /* The curtain, the per-line masks and the meta block are all driven by
       the data-open attribute in globals.css. Expressing the choreography as
       transitions rather than a timeline means the whole menu costs nothing
       on routes nobody opens it on, which is all of them until a click. */
    if (open) {
      hasOpenedRef.current = true;
      // The bar is forced visible while the menu is open by the render below;
      // this only keeps the scroll tracker's view of it in step.
      hiddenRef.current = false;
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
        data-nav-bar
        data-hidden={barHidden && !open}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-10"
      >
        <Link href="/" onClick={() => setOpen(false)}>
          <span className="flex items-center">
            <img
              src={onDark ? "/assets/brand/webify-logo-white-480.webp" : "/assets/brand/webify-logo-black-480.webp"}
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
            Let’s Talk
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
          Let’s Talk
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
        data-nav-overlay
        data-open={open}
        className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-ink"
      >
        {/* Brand watermark behind the menu links */}
        <img
          src="/assets/brand/webify-icon-dark-384.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[10%] -right-[6%] h-[70vh] w-auto opacity-[0.05]"
        />
        <nav className="flex flex-1 flex-col items-start justify-center gap-3 overflow-y-auto px-5 pt-24 pb-6 md:px-10">
          {NAV_LINKS.map((link, i) => (
            // Per-line clip mask: the link rises through this window on open
            // and drops back down through it on close.
            <span key={link.label} className="block overflow-hidden">
              <RollLink
                label={link.label}
                href={link.href}
                index={i}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              />
            </span>
          ))}
        </nav>

        {/* Meta block: quiet two-tier contact facts, bottom-left of the curtain */}
        <div
          data-nav-meta
          className="flex shrink-0 flex-col gap-3.5 px-5 pb-8 md:gap-5 md:px-10 md:pb-10"
        >
          <div>
            <p className="font-mono text-[12px] uppercase tracking-widest text-gray-soft">
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
            <p className="font-mono text-[12px] uppercase tracking-widest text-gray-soft">
              TALK
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="-my-2 inline-flex min-h-11 items-center text-[15px] font-medium text-white"
            >
              Book a 20 minute call
            </a>
          </div>
          <div>
            <p className="font-mono text-[12px] uppercase tracking-widest text-gray-soft">
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
