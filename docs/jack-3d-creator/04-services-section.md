# Services Section

A full-bleed white panel that lists the studio's five core offerings as a large, numbered vertical list. It sits in the page flow as the fourth section (HeroSection → MarqueeSection → AboutSection → **ServicesSection** → ProjectsSection) and visually breaks from the surrounding `#0C0C0C` dark theme with a white background and rounded top corners.

## Layout & structure

```
<section>  (white #FFFFFF, rounded top corners, large padding)
└── container
    ├── <h2> "Services"            (centered, font-black, uppercase, huge clamp size)
    └── list wrapper               (max-w-5xl, mx-auto, vertical stack)
        └── for each of 5 services:
            <FadeUp delay={i * 0.1}>          (staggered scroll reveal)
              └── item row         (flex, horizontal; top border 1px on every item)
                  ├── number       ("01"…"05", font-black, huge clamp, #0C0C0C, left)
                  └── text column  (stacked, right)
                      ├── name     (font-medium, uppercase, clamp)
                      └── desc      (font-light, leading-relaxed, max-w-2xl, opacity 0.6)
```

Visual hierarchy:

- The section is a self-contained white card with `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`, so its rounded top edge overlaps the preceding dark section.
- The `Services` heading is the dominant element — centered, oversized, black weight.
- Below it, five rows are stacked vertically inside a centered `max-w-5xl` column. Each row places a giant index number on the left and the service name + description stacked on the right.
- A 1px hairline border `rgba(12,12,12,0.15)` separates the items (rendered as a top border on each row, giving the list a ruled-ledger feel).

## Specs

### Section container

| Property | Value |
| --- | --- |
| Background color | `#FFFFFF` |
| Rounded top corners | `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]` |
| Horizontal padding | `px-5 sm:px-8 md:px-10` |
| Vertical padding | `py-20 sm:py-24 md:py-32` |

### Heading — "Services"

| Property | Value |
| --- | --- |
| Text | `Services` |
| Color | `#0C0C0C` |
| Weight | `font-black` |
| Case | `uppercase` |
| Alignment | centered (`text-center`) |
| Font size | `clamp(3rem, 12vw, 160px)` |
| Margin bottom | `mb-16 sm:mb-20 md:mb-28` |

### List wrapper

| Property | Value |
| --- | --- |
| Max width | `max-w-5xl` |
| Centering | `mx-auto` |
| Layout | vertical list (flex column) |

### Service item (row)

| Property | Value |
| --- | --- |
| Layout | horizontal (flex, items aligned to top) |
| Separator | `1px` top border, color `rgba(12,12,12,0.15)` on every item |
| Vertical padding | `py-8 sm:py-10 md:py-12` |
| Gap (number ↔ text) | horizontal gap between number and text column |

### Number (left)

| Property | Value |
| --- | --- |
| Values | `01`, `02`, `03`, `04`, `05` |
| Weight | `font-black` |
| Color | `#0C0C0C` |
| Font size | `clamp(3rem, 10vw, 140px)` |

### Name (right, top)

| Property | Value |
| --- | --- |
| Weight | `font-medium` |
| Case | `uppercase` |
| Font size | `clamp(1rem, 2.2vw, 2.1rem)` |

### Description (right, bottom)

| Property | Value |
| --- | --- |
| Weight | `font-light` |
| Line height | `leading-relaxed` |
| Max width | `max-w-2xl` |
| Font size | `clamp(0.85rem, 1.6vw, 1.25rem)` |
| Opacity | `0.6` |

### Content — the 5 services (verbatim)

| # | Name | Description |
| --- | --- | --- |
| `01` | `3D Modeling` | Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations. |
| `02` | `Rendering` | High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life. |
| `03` | `Motion Design` | Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences. |
| `04` | `Branding` | Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence. |
| `05` | `Web Design` | Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience. |

There are no images in this section.

## Animations

Each service row is wrapped in the shared `FadeUp` scroll-reveal component, with a **staggered delay of `i * 0.1`** (item index × 0.1s): row 01 → `delay 0`, 02 → `0.1`, 03 → `0.2`, 04 → `0.3`, 05 → `0.4`.

`FadeUp` (from the shared components folder) uses these exact Framer Motion settings:

| Setting | Value |
| --- | --- |
| `initial` | `{ opacity: 0, y: 24 }` (default `y` offset = 24) |
| `whileInView` | `{ opacity: 1, y: 0 }` |
| `viewport` | `{ once: true, amount: 0.3 }` (fires once, when 30% in view) |
| `transition.duration` | `0.6` |
| `transition.delay` | `delay` prop (here `i * 0.1`) |
| `transition.ease` | `[0.22, 1, 0.36, 1]` |

So each item rises 24px and fades in over 0.6s as it scrolls into view, one after another. The heading itself is static (no entrance animation specified); only the list items animate.

> Note: the brief refers to a `FadeIn` component, but the actual shared reveal primitive in this codebase is `FadeUp` (`src/components/sections/cta/fade-up.tsx`). It accepts a `delay` prop and is used here for the staggered reveal. If a literal `FadeIn` (opacity-only, no Y offset) is required, pass `y={0}`.

## Code reference

```tsx
// src/components/sections/services/services-section.tsx
"use client";

import { FadeUp } from "@/components/sections/cta/fade-up";

type Service = {
  number: string;
  name: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    name: "3D Modeling",
    description:
      "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
  },
  {
    number: "02",
    name: "Rendering",
    description:
      "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
  },
  {
    number: "03",
    name: "Motion Design",
    description:
      "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    number: "04",
    name: "Branding",
    description:
      "Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.",
  },
  {
    number: "05",
    name: "Web Design",
    description:
      "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
];

export function ServicesSection() {
  return (
    <section
      className="
        rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10
        py-20 sm:py-24 md:py-32
      "
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Heading */}
      <h2
        className="
          text-center font-black uppercase
          mb-16 sm:mb-20 md:mb-28
        "
        style={{
          color: "#0C0C0C",
          fontSize: "clamp(3rem, 12vw, 160px)",
        }}
      >
        Services
      </h2>

      {/* List */}
      <div className="mx-auto flex max-w-5xl flex-col">
        {SERVICES.map((service, i) => (
          <FadeUp key={service.number} delay={i * 0.1}>
            <div
              className="
                flex items-start gap-5 sm:gap-8 md:gap-12
                py-8 sm:py-10 md:py-12
              "
              style={{ borderTop: "1px solid rgba(12,12,12,0.15)" }}
            >
              {/* Number (left) */}
              <span
                className="font-black leading-none"
                style={{
                  color: "#0C0C0C",
                  fontSize: "clamp(3rem, 10vw, 140px)",
                }}
              >
                {service.number}
              </span>

              {/* Name + description (right) */}
              <div className="flex flex-col">
                <h3
                  className="font-medium uppercase"
                  style={{
                    color: "#0C0C0C",
                    fontSize: "clamp(1rem, 2.2vw, 2.1rem)",
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: "#0C0C0C",
                    fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// Shared reveal primitive used above (for reference)
// src/components/sections/cta/fade-up.tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Scroll-in reveal: rises + fades once when 30% in view. */
export function FadeUp({
  children,
  delay = 0,
  y,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y ?? 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```
