# Reusable Components

A reference for the shared, presentational building blocks used across the **Jack — 3D Creator** landing page. Every component here is framework-agnostic within the project stack (React `^18.3.1`, TypeScript, Tailwind CSS `^3.4.1`, Framer Motion `^12.38.0`, Lucide React `^0.344.0`, Vite) and is consumed by the page sections (`HeroSection`, `MarqueeSection`, `AboutSection`, `ServicesSection`, `ProjectsSection`).

These components fall into two groups:

- **UI primitives** — `ContactButton`, `LiveProjectButton`. Styled, ready-to-drop buttons.
- **Motion / interaction utilities** — `FadeIn`, `Magnet`, `AnimatedText`. Headless wrappers that add scroll reveals, magnetic hover, and per-character text reveals.

All snippets are complete and compile as-is. Each utility component is self-contained — copy the file, import, and use.

---

## ContactButton

Primary call-to-action pill. A vivid multi-stop gradient rounded-full button with a glowing inset/outer shadow and an inset white hairline outline. Used in the hero and contact prompts.

### Props

| Prop        | Type                                  | Default        | Description                                              |
| ----------- | ------------------------------------- | -------------- | ------------------------------------------------------- |
| `label`     | `string`                              | `"Contact Me"` | Visible button text (rendered uppercase via CSS).       |
| `onClick`   | `() => void`                          | `undefined`    | Click handler.                                          |
| `href`      | `string`                              | `undefined`    | When set, renders an `<a>` instead of a `<button>`.     |
| `className` | `string`                              | `undefined`    | Extra classes appended to the base styles.              |
| `type`      | `"button" \| "submit" \| "reset"`     | `"button"`     | Native button type (ignored when `href` is provided).   |

### Spec

| Property        | Value                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------- |
| Shape           | `rounded-full`                                                                                 |
| Background      | `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)`                   |
| Box shadow      | `0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset`                                  |
| Outline         | `2px solid #fff` with `outline-offset: -3px`                                                    |
| Text            | white, `font-medium`, `uppercase`, `tracking-widest`                                            |
| Padding         | `px-8 py-3` · `sm:px-10 sm:py-3.5` · `md:px-12 md:py-4`                                          |
| Font size       | `text-xs` · `sm:text-sm` · `md:text-base`                                                        |

### Implementation

```tsx
// src/components/ui/ContactButton.tsx
import type { CSSProperties, MouseEventHandler } from "react";

const CONTACT_BUTTON_STYLE: CSSProperties = {
  background:
    "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
  boxShadow:
    "0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset",
  outline: "2px solid #fff",
  outlineOffset: "-3px",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest " +
  "px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base " +
  "transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95";

type ContactButtonProps = {
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function ContactButton({
  label = "Contact Me",
  onClick,
  href,
  className,
  type = "button",
}: ContactButtonProps) {
  const classes = className ? `${BASE_CLASSES} ${className}` : BASE_CLASSES;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        style={CONTACT_BUTTON_STYLE}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      style={CONTACT_BUTTON_STYLE}
    >
      {label}
    </button>
  );
}
```

---

## LiveProjectButton

Secondary, ghost/outline pill used on project cards to link out to a live deployment. Transparent fill with the accent border and text; a faint accent wash appears on hover.

### Props

| Prop        | Type                                  | Default          | Description                                            |
| ----------- | ------------------------------------- | ---------------- | ----------------------------------------------------- |
| `label`     | `string`                              | `"Live Project"` | Visible button text (rendered uppercase via CSS).     |
| `href`      | `string`                              | `undefined`      | When set, renders an `<a>` (typically `target="_blank"`). |
| `onClick`   | `() => void`                          | `undefined`      | Click handler.                                        |
| `className` | `string`                              | `undefined`      | Extra classes appended to the base styles.            |
| `type`      | `"button" \| "submit" \| "reset"`     | `"button"`       | Native button type (ignored when `href` is provided). |

### Spec

| Property   | Value                                                  |
| ---------- | ------------------------------------------------------ |
| Shape      | `rounded-full`                                         |
| Border     | `border-2 border-[#D7E2EA]`                            |
| Text       | `text-[#D7E2EA]`, `font-medium`, `uppercase`, `tracking-widest` |
| Hover      | `hover:bg-[#D7E2EA]/10`                                |
| Padding    | `px-8 py-3` · `sm:px-10 sm:py-3.5`                      |
| Font size  | `text-sm` · `sm:text-base`                              |

### Implementation

```tsx
// src/components/ui/LiveProjectButton.tsx
import type { MouseEventHandler } from "react";

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] " +
  "text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 " +
  "px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base " +
  "transition-colors duration-300 ease-out";

type LiveProjectButtonProps = {
  label?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function LiveProjectButton({
  label = "Live Project",
  href,
  onClick,
  className,
  type = "button",
}: LiveProjectButtonProps) {
  const classes = className ? `${BASE_CLASSES} ${className}` : BASE_CLASSES;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
```

---

## FadeIn

Scroll-triggered reveal wrapper. Animates children from a translated, transparent state to their resting position once they scroll into view. Polymorphic via the `as` prop, so it can wrap any element type (`div`, `section`, `h2`, `span`, …) while keeping its motion behavior.

The reveal fires the first time the element enters the viewport (`once: true`) with a small `50px` margin and `amount: 0` (any sliver of the element counts as in-view).

### Props

| Prop       | Type                          | Default              | Description                                              |
| ---------- | ----------------------------- | -------------------- | ------------------------------------------------------- |
| `children` | `ReactNode`                   | —                    | Content to reveal.                                      |
| `as`       | `ElementType`                 | `"div"`              | Element/tag to render (made motion-aware via `motion.create()`). |
| `delay`    | `number`                      | `0`                  | Delay (seconds) before the animation starts.            |
| `duration` | `number`                      | `0.7`                | Animation duration in seconds.                          |
| `x`        | `number`                      | `0`                  | Initial horizontal offset (px) animated to `0`.         |
| `y`        | `number`                      | `30`                 | Initial vertical offset (px) animated to `0`.           |
| `className`| `string`                      | `undefined`          | Forwarded to the rendered element.                      |
| `...rest`  | element props                 | —                    | Any remaining props are spread onto the element.        |

### Spec

| Property        | Value                                          |
| --------------- | ---------------------------------------------- |
| Initial state   | `{ opacity: 0, x, y }`                          |
| Animate state   | `{ opacity: 1, x: 0, y: 0 }`                    |
| Trigger         | `whileInView`                                  |
| Viewport        | `{ once: true, margin: "50px", amount: 0 }`    |
| Easing          | `[0.25, 0.1, 0.25, 1]`                          |

### Implementation

```tsx
// src/components/motion/FadeIn.tsx
import { useMemo } from "react";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { motion } from "framer-motion";

type FadeInProps<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
} & Omit<
  ComponentProps<T>,
  "children" | "as" | "delay" | "duration" | "x" | "y" | "className"
>;

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function FadeIn<T extends ElementType = "div">({
  children,
  as,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  ...rest
}: FadeInProps<T>) {
  // motion.create() upgrades any element type into a motion-aware component.
  const MotionComponent = useMemo(
    () => motion.create((as ?? "div") as ElementType),
    [as],
  );

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
```

> **Note** — `motion.create()` is the current Framer Motion factory for turning arbitrary elements/components into motion-aware ones (it replaces the deprecated `motion()` call form). Memoizing the result keeps React from re-creating the component on every render.

---

## Magnet

Magnetic hover effect. The wrapped content tracks the cursor: while the pointer is within `padding` pixels of the element's edges, the content translates toward the cursor by an amount scaled down by `strength`. The transition eases in quickly on activation and eases out slowly when the cursor leaves, snapping the translation back to `0,0`.

Great for CTA buttons and small interactive accents in the hero.

### Props

| Prop                  | Type        | Default                          | Description                                                            |
| --------------------- | ----------- | -------------------------------- | --------------------------------------------------------------------- |
| `children`            | `ReactNode` | —                                | Content that will follow the cursor.                                  |
| `padding`             | `number`    | `100`                            | Activation radius in px around the element edges.                     |
| `strength`            | `number`    | `2`                              | Divisor applied to the offset — higher means subtler movement.        |
| `activeTransition`    | `string`    | `"transform 0.3s ease-out"`      | CSS transition used while magnetically engaged.                       |
| `inactiveTransition`  | `string`    | `"transform 0.6s ease-in-out"`   | CSS transition used when resetting to origin.                         |
| `className`           | `string`    | `undefined`                      | Forwarded to the wrapper element.                                     |

### Spec

| Property          | Value                                                          |
| ----------------- | ------------------------------------------------------------- |
| Transform         | `translate3d(x / strength, y / strength, 0)`                   |
| Active region     | cursor within `padding` px of any edge (center-relative test) |
| `will-change`     | `transform`                                                    |
| Reset             | `translate3d(0, 0, 0)` on `mouseleave` / when inactive         |

### Implementation

```tsx
// src/components/motion/Magnet.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

export function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = event.clientX - centerX;
      const distY = event.clientY - centerY;

      // Within `padding` px of the element's edges?
      const withinX = Math.abs(distX) < rect.width / 2 + padding;
      const withinY = Math.abs(distY) < rect.height / 2 + padding;

      if (withinX && withinY) {
        setIsActive(true);
        setOffset({ x: distX / strength, y: distY / strength });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    },
    [padding, strength],
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const style: CSSProperties = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: isActive ? activeTransition : inactiveTransition,
    willChange: "transform",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
```

---

## AnimatedText

Character-by-character scroll reveal. As the paragraph scrolls through the viewport, each character brightens from `opacity 0.2` to `opacity 1` in sequence, producing a "filling-in" read-along effect.

It works by laying out the real text as invisible placeholder spans (so spacing, wrapping, and layout are exact — spaces are preserved with `&nbsp;`), then stacking an absolutely-positioned `motion.span` over each character. Each overlay's opacity is driven by a `useTransform` window keyed to that character's fractional position within the scroll range.

### Props

| Prop        | Type            | Default     | Description                                              |
| ----------- | --------------- | ----------- | ------------------------------------------------------- |
| `text`      | `string`        | —           | The text to reveal one character at a time.             |
| `className` | `string`        | `undefined` | Forwarded to the paragraph wrapper.                     |
| `style`     | `CSSProperties` | `undefined` | Inline styles passed through to the wrapper.            |

### Spec

| Property          | Value                                                            |
| ----------------- | --------------------------------------------------------------- |
| Scroll source     | `useScroll({ target: paragraphRef, offset })`                    |
| Scroll offset     | `["start 0.8", "end 0.2"]`                                        |
| Per-char opacity  | `0.2 → 1`                                                        |
| Placeholder span  | `opacity: 0` (layout only); spaces via `&nbsp;`                  |
| Overlay span      | absolutely positioned `motion.span`, opacity from `useTransform` |

### Implementation

```tsx
// src/components/motion/AnimatedText.tsx
import { useRef } from "react";
import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

type CharProps = {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function Char({ char, progress, range }: CharProps) {
  // Brighten this character from 0.2 -> 1 across its slice of the scroll range.
  const opacity = useTransform(progress, range, [0.2, 1]);
  const display = char === " " ? " " : char;

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder preserves layout, spacing and wrapping. */}
      <span style={{ opacity: 0 }}>{display}</span>
      {/* Animated overlay stacked exactly on top of the placeholder. */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0"
        style={{ opacity }}
      >
        {display}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = Array.from(text);

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = (i + 1) / chars.length;
        return (
          <Char
            key={`${char}-${i}`}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}
```

> **Accessibility** — the visible placeholder layer carries the real, selectable text; the animated overlays are marked `aria-hidden` so screen readers and copy-paste read the sentence once, cleanly.

---

## Usage notes

- **Theme alignment** — buttons and text utilities assume the dark canvas (`#0C0C0C`) and the accent color `#D7E2EA`. `LiveProjectButton` is built directly around the accent; `ContactButton` carries its own gradient identity.
- **Fonts** — text inherits `'Kanit', sans-serif` from the document; no component hard-codes a family.
- **Reduced motion** — `FadeIn`, `Magnet`, and `AnimatedText` are motion-heavy. For production, gate them behind a `prefers-reduced-motion` check (e.g. Framer Motion's `useReducedMotion`) and render the static, resolved state when motion is disabled.
- **`"use client"`** — these snippets target a Vite SPA, so no directive is needed. If ported into a React Server Components environment, add `"use client";` to every file here, since each relies on hooks, effects, or browser events.
