# About Section

The **About Section** is a full-height, vertically and horizontally centered section that introduces the creator. It pairs a large gradient "About me" headline with a scroll-driven, character-by-character animated paragraph and a contact button, framed by four decorative 3D images anchored in the corners.

## Layout & structure

```
<section> (relative, min-h-screen, flex column, items-center, justify-center, overflow clipped)
│
├── Decorative 3D images (absolutely positioned, pointer-events none)
│     ├── Top-left      → Moon icon        (top-[4%]  left-[1%/2%/4%])
│     ├── Top-right     → Lego icon        (top-[4%]  right-[1%/2%/4%])
│     ├── Bottom-left   → 3D object (p59)   (bottom-[8%] left-[3%/6%/10%])
│     └── Bottom-right  → 3D group (Group_134) (bottom-[8%] right-[3%/6%/10%])
│
└── Centered content column (relative, z-10, flex column, items-center, text-center)
      ├── <h2> "About me"            → .hero-heading gradient, font-black, uppercase
      │     (gap-10 sm:gap-14 md:gap-16 below)
      ├── <AnimatedText> paragraph   → per-character scroll opacity, max-w-[560px]
      │     (gap-16 sm:gap-20 md:gap-24 below)
      └── <ContactButton/>
```

- The four corner images sit on the absolute layer behind the content; the content column carries `z-10` so it always renders above them.
- The content is a single vertical flex stack, center-aligned, with two distinct vertical gaps: a smaller gap between the heading and the paragraph, and a larger gap between the paragraph and the contact button.
- Corner images animate in from the outside edge: left-side images slide in from the left (`x -80`), right-side images slide in from the right (`x +80`).

## Specs

### Section container

| Property | Value |
| --- | --- |
| Min height | `min-h-screen` |
| Horizontal padding | `px-5 sm:px-8 md:px-10` |
| Vertical padding | `py-20` |
| Layout | `relative flex flex-col items-center justify-center` |
| Overflow | clipped (`overflow-hidden` / `overflowX: 'clip'` inherited from wrapper) |
| Text alignment | `text-center` |

### Decorative 3D images

| Position | Image URL | Width classes | Position classes | FadeIn delay | x | y | duration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Top-left (Moon icon) | `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png` | `w-[120px] sm:w-[160px] md:w-[210px]` | `top-[4%] left-[1%] sm:left-[2%] md:left-[4%]` | `0.1` | `-80` | `0` | `0.9` |
| Bottom-left (3D object) | `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png` | `w-[100px] sm:w-[140px] md:w-[180px]` | `bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]` | `0.25` | `-80` | `0` | `0.9` |
| Top-right (Lego icon) | `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png` | `w-[120px] sm:w-[160px] md:w-[210px]` | `top-[4%] right-[1%] sm:right-[2%] md:right-[4%]` | `0.15` | `80` | `0` | `0.9` |
| Bottom-right (3D group) | `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png` | `w-[130px] sm:w-[170px] md:w-[220px]` | `bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]` | `0.3` | `80` | `0` | `0.9` |

- All decorative images are `absolute`, with `pointer-events-none` and `select-none` so they never block interaction.
- Width is set responsively; height is `auto` (intrinsic aspect ratio preserved).

### Heading — "About me"

| Property | Value |
| --- | --- |
| Tag / text | `<h2>` — `About me` |
| Class | `.hero-heading` (gradient text) |
| Gradient | `background: linear-gradient(180deg,#646973 0%,#BBCCD7 100%)` |
| Clip | `-webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;` |
| Weight | `font-black` |
| Case | `uppercase` |
| Line height | `leading-none` |
| Tracking | `tracking-tight` |
| Alignment | centered (`text-center`) |
| Font size | `clamp(3rem, 12vw, 160px)` |
| Font family | `'Kanit', sans-serif` (inherited) |

### Animated paragraph

| Property | Value |
| --- | --- |
| Component | `<AnimatedText>` |
| Text | `With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!` |
| Color | `#D7E2EA` |
| Weight | `font-medium` |
| Alignment | `text-center` |
| Line height | `leading-relaxed` |
| Max width | `max-w-[560px]` |
| Font size | `clamp(1rem, 2vw, 1.35rem)` |
| Per-character opacity | `0.2 → 1` (driven by scroll progress) |
| `useScroll` offset | `['start 0.8', 'end 0.2']` |

### Contact button

| Property | Value |
| --- | --- |
| Component | `<ContactButton/>` |
| Position | Below the paragraph in the content column |

### Vertical gaps (content column)

| Gap | Value |
| --- | --- |
| Heading ↔ paragraph | `gap-10 sm:gap-14 md:gap-16` |
| Paragraph ↔ button | `gap-16 sm:gap-20 md:gap-24` |

> Because there are two different gaps in one column, implement them as two stacked groups (e.g. an inner heading+text group using the smaller gap, then the larger gap before the button) — see the code reference.

## Animations

### Corner images — `FadeIn`

Each image is wrapped in the shared `FadeIn` component. They share `y: 0` and `duration: 0.9`; the horizontal offset direction depends on the corner (left images come from `x: -80`, right images from `x: +80`). Stagger is achieved through ascending delays:

| Image | delay | x | y | duration |
| --- | --- | --- | --- | --- |
| Top-left (Moon) | `0.1` | `-80` | `0` | `0.9` |
| Top-right (Lego) | `0.15` | `80` | `0` | `0.9` |
| Bottom-left (p59) | `0.25` | `-80` | `0` | `0.9` |
| Bottom-right (Group_134) | `0.3` | `80` | `0` | `0.9` |

Each `FadeIn` animates from `{ opacity: 0, x, y }` to `{ opacity: 1, x: 0, y: 0 }`, triggered when the element enters the viewport.

### Heading — `FadeIn`

| Property | Value |
| --- | --- |
| delay | `0` |
| x | `0` (default) |
| y | `40` |
| Transition | from `{ opacity: 0, y: 40 }` → `{ opacity: 1, y: 0 }` |

### Paragraph — `AnimatedText` (scroll-driven)

- Uses `useScroll` on the paragraph container with `offset: ['start 0.8', 'end 0.2']`.
- The full string is split into characters; each character maps to a slice of the scroll progress (`useTransform`).
- Each character's `opacity` interpolates from `0.2` (un-revealed) to `1` (fully revealed) as the scroll progress sweeps across its slice, producing a left-to-right "reveal as you scroll" effect.
- This is a continuous scroll-linked animation (not a one-shot `whileInView`); opacity tracks the scroll position both forward and backward.

## Code reference

```tsx
// src/components/sections/AboutSection.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeIn } from '@/components/FadeIn';
import { ContactButton } from '@/components/ContactButton';

/* ------------------------------------------------------------------ */
/* Decorative corner images                                            */
/* ------------------------------------------------------------------ */

interface CornerImage {
  src: string;
  alt: string;
  className: string; // width + absolute positioning
  delay: number;
  x: number;
}

const CORNER_IMAGES: CornerImage[] = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Moon icon',
    className: 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Lego icon',
    className: 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: '3D object',
    className: 'w-[100px] sm:w-[140px] md:w-[180px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: '3D group',
    className: 'w-[130px] sm:w-[170px] md:w-[220px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    delay: 0.3,
    x: 80,
  },
];

/* ------------------------------------------------------------------ */
/* Scroll-driven, character-by-character animated paragraph            */
/* ------------------------------------------------------------------ */

const ABOUT_TEXT =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

function AnimatedChar({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <p
      ref={containerRef}
      className="max-w-[560px] text-center font-medium leading-relaxed flex flex-wrap justify-center"
      style={{ color: '#D7E2EA', fontSize: 'clamp(1rem,2vw,1.35rem)' }}
    >
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = (i + 1) / chars.length;
        return (
          <AnimatedChar
            key={`${char}-${i}`}
            char={char === ' ' ? ' ' : char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* About section                                                       */
/* ------------------------------------------------------------------ */

export function AboutSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 text-center sm:px-8 md:px-10">
      {/* Decorative 3D corner images */}
      {CORNER_IMAGES.map((img) => (
        <FadeIn
          key={img.alt}
          delay={img.delay}
          x={img.x}
          y={0}
          duration={0.9}
          className={`pointer-events-none absolute select-none ${img.className}`}
        >
          <img src={img.src} alt={img.alt} className="h-auto w-full" />
        </FadeIn>
      ))}

      {/* Centered content column */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Heading + paragraph group (smaller gap) */}
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText text={ABOUT_TEXT} />
        </div>

        {/* Larger gap before the contact button */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
```

```css
/* globals.css — gradient heading utility used by this section */
.hero-heading {
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

```tsx
// src/components/FadeIn.tsx — shared fade/slide-in wrapper referenced above
import { motion, type ReactNode } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  x = 0,
  y = 0,
  duration = 0.9,
  className,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

> Notes
> - The two column gaps are implemented as (a) a `gap-10 sm:gap-14 md:gap-16` flex group wrapping the heading + paragraph, and (b) an `mt-16 sm:mt-20 md:mt-24` margin before the `ContactButton`, matching `gap-16 sm:gap-20 md:gap-24`.
> - Corner images keep `pointer-events-none` and `select-none` so they never intercept clicks on the centered content.
> - The paragraph uses `flex flex-wrap justify-center` so individual `motion.span` characters wrap naturally while staying centered; spaces are rendered as non-breaking (` `) to preserve word spacing during the per-character reveal.
