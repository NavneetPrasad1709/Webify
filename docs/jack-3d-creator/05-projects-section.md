# Projects Section

The Projects section is the final section of the "Jack — 3D Creator" landing page. It presents three featured works as **sticky-stacking cards** that progressively scale down as the viewer scrolls past each one, producing a layered "deck" effect driven by Framer Motion's `useScroll` + `useTransform`.

## Layout & structure

```
<section>                                        // #0C0C0C, rounded-t corners, -mt pull-up, z-10
  ├─ <h2 class="hero-heading …">Project</h2>     // gradient heading, singular word
  └─ cards wrapper
       └─ for each PROJECT (index 0..2):
            <div class="h-[85vh]">               // tall spacer that drives the sticky scroll
              <motion.div sticky top-24 md:top-32 // the card itself, scaled via useTransform
                          style={{ scale, top }}>  // top = `${index * 28}px`
                ├─ TOP ROW (flex, between)
                │    ├─ left cluster
                │    │    ├─ Number   "01" / "02" / "03"   (huge, services-number style)
                │    │    ├─ category label  "Client" / "Personal"
                │    │    └─ project name     "Nextlevel Studio" …
                │    └─ <LiveProjectButton/>  ghost pill, "Live Project"
                └─ BOTTOM ROW (image grid)
                     ├─ LEFT column (40% width)
                     │    ├─ img col1.a   height clamp(130px,16vw,230px)
                     │    └─ img col1.b   height clamp(160px,22vw,340px)
                     └─ RIGHT column (60% width)
                          └─ img col2     tall, fills column height
              </motion.div>
            </div>
```

DOM/visual hierarchy notes:

- The outer `<section>` is pulled up over the previous (Services) section using negative top margin and `z-10` so its rounded top corners overlap the section above.
- Each card lives inside its **own** `h-[85vh]` container. The card is `sticky` so it pins at `top-24 md:top-32` while its `h-[85vh]` parent scrolls underneath — this is what lets later cards slide up and cover earlier ones.
- Cards share a vertical `top` stagger (`index * 28px`) so the stacked deck reveals a thin sliver of each card behind the topmost one.
- The bottom image grid is a two-column layout: a 40%-width left column with two stacked images and a 60%-width right column with one tall image.

## Specs

### Section wrapper

| Property | Value |
|---|---|
| Background | `#0C0C0C` (`bg-[#0C0C0C]`) |
| Rounded top corners | `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]` |
| Negative top margin (pull-up) | `-mt-10 sm:-mt-12 md:-mt-14` |
| Stacking context | `relative z-10` |
| Horizontal padding (suggested) | `px-4 sm:px-6 md:px-8` |

### Heading ("Project")

| Property | Value |
|---|---|
| Text | `Project` (singular) |
| Class | `.hero-heading` (gradient text) |
| Gradient | `linear-gradient(180deg,#646973 0%,#BBCCD7 100%)` via `-webkit-background-clip:text; -webkit-text-fill-color:transparent;` |
| Weight | `font-black` |
| Case | `uppercase` |
| Line height | `leading-none` |
| Tracking | `tracking-tight` |
| Alignment | `text-center` |
| Font size | `clamp(3rem, 12vw, 160px)` |
| Font family | `'Kanit', sans-serif` |

### Card container (per project)

| Property | Value |
|---|---|
| Scroll spacer height | `h-[85vh]` |
| Sticky positioning | `sticky top-24 md:top-32` |
| Per-card vertical offset | `top: ${index * 28}px` (inline style) → `0px`, `28px`, `56px` |
| Border radius | `rounded-[40px] sm:rounded-[50px] md:rounded-[60px]` |
| Border | `border-2 border-[#D7E2EA]` |
| Background | `#0C0C0C` (`bg-[#0C0C0C]`) |
| Padding | `p-4 sm:p-6 md:p-8` |
| Transform | `scale` from `useTransform` (see Animations) |
| Origin | `transformOrigin: 'top'` (so cards scale toward the pinned top edge) |

### Scale math

| Item | Value |
|---|---|
| Total cards | `totalCards = 3` |
| Per-card target scale | `targetScale = 1 - (totalCards - 1 - index) * 0.03` |
| → index 0 | `1 - (3 - 1 - 0) * 0.03 = 1 - 0.06 = 0.94` |
| → index 1 | `1 - (3 - 1 - 1) * 0.03 = 1 - 0.03 = 0.97` |
| → index 2 | `1 - (3 - 1 - 2) * 0.03 = 1 - 0.00 = 1.00` |
| `useTransform` input range | `[0, 1]` (scroll progress) |
| `useTransform` output range | `[1, targetScale]` |

### Top row

| Element | Specs |
|---|---|
| Number | Huge numeral, same style as services numbers: `font-black`, `leading-none`, `tracking-tight`, accent color `#D7E2EA` (e.g. `text-[#D7E2EA]`), fluid `clamp()` sizing |
| Category label | `Client` / `Personal`, uppercase, `tracking-widest`, smaller, color `#D7E2EA` |
| Project name | Project title text, color `#D7E2EA`, medium/bold weight |
| Live Project button | `<LiveProjectButton/>` — see below |

### `<LiveProjectButton/>` (ghost pill)

| Property | Value |
|---|---|
| Shape | `rounded-full` |
| Border | `border-2 border-[#D7E2EA]` |
| Case | `uppercase` |
| Tracking | `tracking-widest` |
| Text color | `#D7E2EA` |
| Background | transparent (ghost) |
| Label | `Live Project` |
| Padding (suggested) | `px-5 py-2` / `px-6 py-3` |

### Bottom image grid

| Element | Value |
|---|---|
| Left column width | `40%` (`w-[40%]` / `basis-[40%]`) |
| Right column width | `60%` (`w-[60%]` / `basis-[60%]`) |
| Image radius (all) | `rounded-[40px] sm:rounded-[50px] md:rounded-[60px]` |
| Left top image height | `clamp(130px, 16vw, 230px)` |
| Left bottom image height | `clamp(160px, 22vw, 340px)` |
| Right (col2) image | Tall — fills the column height (`h-full`), `object-cover` |
| Image fit | `object-cover` for all |
| Column gap | matching card gap (e.g. `gap-4 sm:gap-6 md:gap-8`) |

### Project data (verbatim)

**Project 01 — "Nextlevel Studio" — category: Client**

- Col1 img1: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85`
- Col1 img2: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85`
- Col2 img: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85`

**Project 02 — "Aura Brand Identity" — category: Personal**

- Col1 img1: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85`
- Col1 img2: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85`
- Col2 img: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85`

**Project 03 — "Solaris Digital" — category: Client**

- Col1 img1: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85`
- Col1 img2: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85`
- Col2 img: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85`

## Animations

The card-stacking effect is **scroll-linked** (not a one-shot reveal). Each card owns its own `useScroll` + `useTransform` pair.

### Per-card scroll-scale (the stacking)

| Param | Value |
|---|---|
| Hook | `useScroll` |
| `target` | the card's own container ref (the `h-[85vh]` element) |
| `offset` | `['start end', 'start start']` |
| Driven value | `scrollYProgress` (0 → 1) |
| Transform | `useTransform(scrollYProgress, [0, 1], [1, targetScale])` |
| `targetScale` | `1 - (totalCards - 1 - index) * 0.03` |
| Applied to | `style={{ scale }}` on the `motion.div` card |
| `transformOrigin` | `top` |

Meaning of `offset: ['start end', 'start start']`: progress is `0` when the **start** of the card crosses the **end** (bottom) of the viewport, and `1` when the **start** of the card crosses the **start** (top) of the viewport. So as a card scrolls toward the top and gets pinned, the *next* card scrolling in drives this card from `scale 1` down to its `targetScale`, shrinking it under the incoming card.

### Heading / content reveal (optional, consistent with site)

If wrapping content in the shared `FadeUp` reveal (matches the project's `FadeUp` component):

| Param | Value |
|---|---|
| `initial` | `{ opacity: 0, y: 24 }` (default `y`) |
| `whileInView` | `{ opacity: 1, y: 0 }` |
| `viewport` | `{ once: true, amount: 0.3 }` |
| `transition` | `{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }` |

> Note: The scale transform must **not** be wrapped in a `once`-fired reveal — it is continuous and tied directly to `scrollYProgress`.

## Code reference

A faithful, compileable TypeScript + TSX skeleton. Assumes shared components live in a components folder and the `.hero-heading` class + `'Kanit'` font are defined globally (per project global styles).

```tsx
// projects-section.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { LiveProjectButton } from "@/components/sections/projects/live-project-button";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type ProjectCategory = "Client" | "Personal";

interface Project {
  number: string;
  name: string;
  category: ProjectCategory;
  images: {
    col1a: string; // left column, top image
    col1b: string; // left column, bottom image
    col2: string;  // right column, tall image
  };
}

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Nextlevel Studio",
    category: "Client",
    images: {
      col1a:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1b:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    },
  },
  {
    number: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    images: {
      col1a:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1b:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    },
  },
  {
    number: "03",
    name: "Solaris Digital",
    category: "Client",
    images: {
      col1a:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1b:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2:
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function ProjectsSection() {
  return (
    <section
      className={cn(
        "relative z-10 bg-[#0C0C0C]",
        "-mt-10 sm:-mt-12 md:-mt-14",
        "rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]",
        "px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24"
      )}
    >
      <h2
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Project
      </h2>

      <div className="mx-auto mt-12 max-w-7xl">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Card (owns its own scroll-scale)                                    */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: Project;
  index: number;
  totalCards: number;
}) {
  const container = useRef<HTMLDivElement>(null);

  // Progress 0 -> 1 as the card scrolls from bottom of viewport to the top.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Later cards shrink less; the topmost (last) card stays at scale 1.
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={container} className="h-[85vh]">
      <motion.div
        style={{ scale, top: `${index * 28}px`, transformOrigin: "top" }}
        className={cn(
          "sticky top-24 md:top-32",
          "bg-[#0C0C0C] border-2 border-[#D7E2EA]",
          "rounded-[40px] sm:rounded-[50px] md:rounded-[60px]",
          "p-4 sm:p-6 md:p-8"
        )}
      >
        {/* Top row: number + meta + Live Project button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
            <span
              className="font-black leading-none tracking-tight text-[#D7E2EA]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 90px)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/70">
                {project.category}
              </span>
              <span className="text-lg font-semibold text-[#D7E2EA] sm:text-xl md:text-2xl">
                {project.name}
              </span>
            </div>
          </div>

          <LiveProjectButton />
        </div>

        {/* Bottom row: 40% / 60% image grid */}
        <div className="mt-6 flex gap-4 sm:gap-6 md:gap-8">
          {/* Left column — 40% */}
          <div className="flex w-[40%] flex-col gap-4 sm:gap-6 md:gap-8">
            <img
              src={project.images.col1a}
              alt={`${project.name} — image 1`}
              className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            <img
              src={project.images.col1b}
              alt={`${project.name} — image 2`}
              className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>

          {/* Right column — 60% */}
          <div className="w-[60%]">
            <img
              src={project.images.col2}
              alt={`${project.name} — cover`}
              className="h-full w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

```tsx
// live-project-button.tsx — ghost pill used in the card top row
import { cn } from "@/lib/cn";

export function LiveProjectButton({
  href = "#",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full border-2 border-[#D7E2EA]",
        "px-5 py-2 sm:px-6 sm:py-3",
        "text-xs uppercase tracking-widest text-[#D7E2EA]",
        "transition-colors hover:bg-[#D7E2EA] hover:text-[#0C0C0C]",
        className
      )}
    >
      Live Project
    </a>
  );
}
```

> **Implementation notes**
> - This codebase is **Next.js App Router**, so any file using `useScroll` / `useTransform` / `useRef` must start with the `"use client"` directive (as shown).
> - The `.hero-heading` gradient text class and the `'Kanit'` font family are defined in global styles (`globals.css`); the heading here just applies the class.
> - Use the shared `cn` helper from `@/lib/cn` (clsx + tailwind-merge) for class composition, consistent with the rest of the project.
> - Per-card scale values resolve to `0.94`, `0.97`, `1.00` for indices `0`, `1`, `2` respectively, and the per-card `top` offsets resolve to `0px`, `28px`, `56px`.
