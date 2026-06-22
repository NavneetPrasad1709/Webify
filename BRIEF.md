Note: I'm using a fixed/locked visual reference for sections I provide 
separately — do NOT generate a new design system, color palette, or 
typography pairing for those. For anything I'm NOT giving you a 
reference for, use the direction below.

PROJECT CONTEXT

We're building a website for an AI-First Product Engineering Studio. 
Direct competitor: olive.in (Delhi-based web agency). Olive wins on 
scale/credibility (100+ team, 1500+ clients, big names like Reliance/
Tata) but their site is generic — keyword-stuffed copy, numbered 
service lists, no emotion, no motion, feels like 2015. We will beat 
them on craft, not claim bigger numbers we don't have.

INSPIRATION (study the approach, don't copy the UI):
- Wix Studio template gallery — clean structure, confident whitespace, 
  modern type pairing
- Apple Vision Pro website — product-launch pacing, one idea per scroll 
  beat, restrained motion that always serves the story
- Awwwards-tier sites generally — intentional micro-interactions, 
  nothing decorative without purpose
- Framer templates — fast-feeling, modern component patterns

REFERENCE SITE TEARDOWN (what to take from each):

1. elvalabs.ai — TAKE: the way each scroll section reveals ONE short, 
   emotional line at a time instead of paragraphs. Full-bleed video/
   visual storytelling. Minimal persistent nav that stays out of the 
   way. Confident use of negative space and dark backgrounds for mood.
   DON'T COPY: they tell mobile users to switch to desktop for "the 
   full experience" — we do NOT do this. Our cinematic experience must 
   work fully on mobile, just adapted (lighter effects, same emotional 
   pacing).

2. igniteagency.com — TAKE: bold, opinionated headline copy that 
   doesn't sound like every agency ("Brutal." instead of "We build 
   websites"). Case studies shown as short video loops, not static 
   screenshots. Testimonials that quote a specific outcome, not vague 
   praise. Team section with real personality in the bios, not generic 
   corporate titles. Multiple clearly-targeted CTAs through the page 
   matched to where the visitor is in their decision.
   DON'T COPY: their logo-wall and structure is fairly traditional — 
   we want more motion/cinematic pacing than they have.

3. olive.in (what to beat) — AVOID: numbered list of 8 generic services 
   with stock "open icon" links, SEO-keyword-stuffed paragraph copy 
   repeating "web design company in Delhi" unnaturally, static project 
   thumbnails with no story, credibility based only on numbers with no 
   narrative behind them.

SYNTHESIS — what our site should actually feel like:
Apple-level restraint and pacing + Elva's emotional, one-line-at-a-time 
scroll storytelling + Ignite's confident copywriting and outcome-proof 
case studies — built mobile-first, fully responsive, with real project 
assets (not stock imagery).

CONTENT STRATEGY:
Write content (not placeholder copy) that positions me as the clear 
hire over agencies like Olive for both Indian and international 
(US/UK/Europe/UAE/Singapore/Australia) clients. Every section should 
answer: what does this audience doubt about hiring an independent 
studio over a big agency, and what removes that doubt here? No vague 
corporate filler — every line earns its place. Headlines should be 
specific and outcome-oriented, not generic taglines.

EXPERIENCE REQUIREMENTS:
- Real images/screenshots only — use [REPLACE: description] placeholder 
  tags for assets I need to supply; never generate fake stock-style 
  images or fake UI mockups
- 3D environments where they reinforce the message (React Three Fiber/
  Drei) — not decoration for its own sake
- Cinematic scroll animations: scene-to-scene transitions, one idea 
  revealed at a time, GSAP ScrollTrigger / Framer Motion / Lenis smooth 
  scroll
- Interactive storytelling — progressive reveal on scroll/hover/tap 
  rather than dumping all content at once
- Flag opportunities for AI-powered personalization (e.g. geo-aware 
  messaging for Indian vs international visitors) — implement if 
  straightforward, otherwise note as a recommendation
- The interface should make someone feel something — ambition, trust, 
  confidence — while staying genuinely fast and usable

NON-NEGOTIABLES:
- Mobile-first, fully responsive (375 / 768 / 1024 / 1440 breakpoints), 
  cinematic experience must work fully on mobile — no "view on desktop" 
  cop-outs
- 90+ Lighthouse, LCP < 2.5s, CLS < 0.1, INP < 200ms
- WCAG basics: semantic HTML, keyboard nav, visible focus states, 
  prefers-reduced-motion respected
- No stock photography, no fake dashboard mockups, no lorem ipsum

Acknowledge this brief, then wait for me to send the first section/page.



## Reminder line for long sessions

```
Reminder: keep content strategic and conversion-focused (Indian + 
international clients, positioning me as the clear hire), real assets 
only — flag what real images/data you need from me instead of inventing 
placeholders that look real.




```
Webify sitemap (multi-page company site)


🏠 / — Home
Top → bottom:

H1 Nav ✅
H2 Hero + 3D ✅
H3 Services overview (3–6 cards → link to /services) ⬜
H4 Proof strip ✅
H5 Featured work (3 projects → /work) ⬜ needs real assets
H6 How we work ✅
H7 Anti-agency comparison ✅
H9 Final CTA ✅
H10 Footer ✅


🛠️ /services — Services
S1 Services hero
S2 Service blocks — AI products, web apps, mobile, design/UX, MVP sprints, integrations (mirror Olive's 8, sharpened to what you actually do)
S3 Capabilities / tech stack strip
S4 Engagement models + pricing clarity (India screens hard for this)
S5 Process timeline
S6 CTA band



💼 /work — Portfolio index
W1 Work hero
W2 Project grid (filterable: AI / web / mobile)
W3 CTA



📄 /work/[slug] — Case study template
W4 Problem → approach → build → outcome → metrics → next project
👤 /about — About
A1 Founder story / face (fuels "you talk to the senior")
A2 Philosophy / why senior-led beats agency
A3 How you work / values
A4 Optional: small team / network
A5 CTA



✉️ /contact — Contact
C1 Geo-aware form (India vs intl)
C2 Calendar embed + direct email
C3 FAQ (timeline, ownership, pricing, comms)



🧩 Shared (build once, used everywhere)
G1 Shared layout: persistent Nav + Footer across all pages (right now Nav links are anchors — needs to become real routes)
G2 Route-transition animations (premium page-to-page motion)
Two things I need from you before some pages are real:

Work/case studies (W)* — real project screenshots, names, metrics.
Testimonials (H8) — real client quotes/logos. Everything else I build now with [REPLACE:] slots.


## prompt for component
I'm giving you a UI component below. The design is final — do NOT 
change layout, styling, spacing, colors, animations, or structure in 
any way. 

YOUR JOB: wire it up only.

WHAT "WIRE IT UP" MEANS:
- Connect it to real state/data (props, hooks, context, API calls — 
  whatever fits our stack)
- Make all interactive elements actually work: buttons, forms, toggles, 
  tabs, dropdowns, modals, etc.
- Add proper TypeScript types for props and data
- Add form validation if it's a form (using our stack: React Hook Form 
  + Zod)
- Connect it to [Sanity CMS / Supabase / API endpoint — specify which] 
  if it needs real data
- Handle loading, empty, and error states — but ONLY using elements/
  patterns already present in the design. If the design has no loading 
  state, build a minimal one that matches its existing visual language 
  — don't invent new UI patterns.
- Make sure it's accessible: keyboard navigation, focus management, 
  ARIA attributes where needed — these are functional fixes, not 
  design changes, so apply them even if not visually obvious
- Fit it into our existing component structure/file naming conventions 
  — check the codebase first

WHAT NOT TO DO:
- Don't redesign anything, even if you think it could be better
- Don't change copy/content unless I ask
- Don't add animations that aren't already there
- Don't restructure the JSX/markup unless required to make it functional
- Don't swap out libraries already used in the component

If the component is missing something it NEEDS to function (e.g. no 
way to show a validation error, no disabled state for a button), point 
it out and propose the minimal addition before building it — don't 
just add UI on your own judgment.

COMPONENT NAME: [choose by yourself]

COMPONENT CODE:
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
sterling-gate-kinetic-navigation.tsx

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function Component() {
  // We need a ref for the parent container to scope GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing
    try {
        if (!gsap.parseEase("main")) {
            CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
            gsap.defaults({ ease: "main", duration: 0.7 });
        }
    } catch (e) {
        console.warn("CustomEase failed to load, falling back to default.", e);
        gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // 1. Arrow Animation (Removed from indicator, but keeping logic if arrow existed/restored elsewhere)
      // Since arrow is removed from JSX, this selector won't find anything, which is fine (safe check).
      const arrowLine = document.querySelector(".arrow-line");
      if (arrowLine) {
        const pathLength = (arrowLine as SVGPathElement).getTotalLength();
        gsap.set(arrowLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        const arrowTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        arrowTl
          .to(arrowLine, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
          .to({}, { duration: 1.2 })
          .to(arrowLine, { strokeDashoffset: -pathLength, duration: 0.6, ease: "power2.in" })
          .set(arrowLine, { strokeDashoffset: pathLength });
      }

      // 2. Shape Hover
      // Updated Selectors: .menu-list-item -> .menu-list-item, .abstract-shapes -> .ambient-background-shapes
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        // Updated Selector: .shape -> .bg-shape
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        
        if (!shape) return;

        // Updated Selector: .shape-el -> .shape-element
        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
             if (shapesContainer) {
                 // Updated Selector: .shape -> .bg-shape
                 shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
             }
             shape.classList.add("active");
             
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        
        const onLeave = () => {
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => shape.classList.remove("active"),
                overwrite: "auto"
            });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        (item as any)._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });
      
    }, containerRef);

    return () => {
        ctx.revert();
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
            items.forEach((item: any) => item._cleanup && item._cleanup());
        }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
      if (!containerRef.current) return;
      
      const ctx = gsap.context(() => {
        // Updated Selectors: .nav -> .nav-overlay-wrapper, .menu -> .menu-content
        const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current!.querySelector(".menu-content");
        const overlay = containerRef.current!.querySelector(".overlay");
        // Updated Selector: .bg-panel -> .backdrop-layer
        const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
        // Updated Selector: .menu-link -> .nav-link
        const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
        const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
        
        // Updated Selector: .menu-button -> .nav-close-btn
        const menuButton = containerRef.current!.querySelector(".nav-close-btn");
        const menuButtonTexts = menuButton?.querySelectorAll("p");
        // Updated Selector: .menu-button-icon -> .menu-button-icon (unchanged in CSS/JSX?) No, wait, CSS had .menu-button-icon
        const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

        const tl = gsap.timeline();
        
        if (isMenuOpen) {
            // OPEN
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            
            tl.set(navWrap, { display: "block" })
              .set(menu, { xPercent: 0 }, "<")
              // Animate Button Text Swapping if it exists
              .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
              .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
              
              .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
              .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
              .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
              
            if (fadeTargets.length) {
                // Keep clearProps: "all" for blog entry fix
                tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
            }

        } else {
            // CLOSE
            if (navWrap) navWrap.setAttribute("data-nav", "closed");

            tl.to(overlay, { autoAlpha: 0 })
              .to(menu, { xPercent: 120 }, "<")
              // Animate Button Text and Icon Back
              .to(menuButtonTexts, { yPercent: 0 }, "<")
              .to(menuButtonIcon, { rotate: 0 }, "<")

              .set(navWrap, { display: "none" });
        }

      }, containerRef);
      
      return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef}>
        <div className="site-header-wrapper">
          <header className="header">
            <div className="container is--full">
              <nav className="nav-row">
                <a href="#" aria-label="home" className="nav-logo-row w-inline-block"></a>
                <div className="nav-row__right">
                  {/* Clean Menu Indicator (Arrow Removed) */}
                  <div className="nav-toggle-label" onClick={toggleMenu} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
                    <span className="toggle-text">click me</span>
                  </div>
                  
                  {/* Restored Menu Button */}
                  <button role="button" className="nav-close-btn" onClick={toggleMenu} style={{ pointerEvents: 'auto' }}>
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
                      >
                        <path
                          d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </header>
        </div>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          {/* Overlay must stay above or below depending on desired clickability. 
              The original has it cover content. */}
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              {/* Abstract shapes container */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(236,72,153,0.1)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(99,102,241,0.15)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(99,102,241,0.2)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(139,92,246,0.15)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
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
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(99,102,241,0.12)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(236,72,153,0.1)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(99,102,241,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(139,92,246,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(236,72,153,0.1)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                <li className="menu-list-item" data-shape="1">
                  <a href="#" className="nav-link w-inline-block">
                    <p className="nav-link-text">About us</p>
                    <div className="nav-link-hover-bg"></div>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <a href="#" className="nav-link w-inline-block">
                    <p className="nav-link-text">Our work</p>
                    <div className="nav-link-hover-bg"></div>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <a href="#" className="nav-link w-inline-block">
                    <p className="nav-link-text">Services</p>
                    <div className="nav-link-hover-bg"></div>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="4">
                  <a href="#" className="nav-link w-inline-block">
                    <p className="nav-link-text" data-menu-fade>Blog</p>
                    <div className="nav-link-hover-bg"></div>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="5">
                  <a href="#" className="nav-link w-inline-block">
                    <p className="nav-link-text">Contact us</p>
                    <div className="nav-link-hover-bg"></div>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}


demo.tsx
import { Component } from "@/components/ui/sterling-gate-kinetic-navigation";

export default function DemoOne() {
  return <Component />;
}

```

Install NPM dependencies:
```bash
gsap
```

Extend existing Tailwind 4 index.css with this code (or if project uses Tailwind 3, extend tailwind.config.js or globals.css):
```css
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --color-primary: #6366f1;
  --color-dark: #131313;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-800: #262626;
  --size-container: 1400px;
  --container-padding: 2em;
  --section-padding: 4em;
  --gap: 1.5em;
  --cubic-default: cubic-bezier(0.65, 0.05, 0, 1);
}

```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
