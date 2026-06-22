# Hero Section

The Hero section is the full-viewport opening of the "Jack — 3D Creator" single-page portfolio. It stacks a top navbar, a massive gradient-text headline ("Hi, i'm jack"), and a bottom bar (descriptive blurb + Contact button), with a magnet-reactive centered portrait floating over the whole thing. Every child enters with a staggered FadeIn rise on mount.

## Layout & structure

```
<section>                              h-screen, flex flex-col, relative, overflowX: clip
│
├── <nav>                              top navbar — flex justify-between, 4 links
│     ├── a "About"
│     ├── a "Price"
│     ├── a "Projects"
│     └── a "Contact"
│
├── (flex-1 spacer — pushes heading/bottom bar apart, lets portrait center)
│
├── <div> heading wrapper             overflow-hidden
│     └── <h1.hero-heading>           "Hi, i'm jack" — gradient text, 14–17.5vw
│
├── <div> bottom bar                  flex justify-between items-end
│     ├── <p>  left blurb             "a 3d creator driven by…", max-w clamps
│     └── <ContactButton/>            right — label "Contact Me"
│
└── <Magnet> portrait                 absolute, centered horizontally, z-10
      └── <img>                       Rectangle_40443… portrait PNG
```

Key relationships:

- The `<section>` is the flex column. The navbar sits at the top, the heading + bottom bar sit at the bottom of the flow, and the natural vertical space between them is where the absolutely-positioned portrait centers.
- The portrait is **absolutely positioned and centered** (`left-1/2 -translate-x-1/2`) so it overlaps the heading/blurb visually without affecting layout flow. `z-10` lifts it above the text.
- On mobile the portrait is vertically centered (`top-1/2 -translate-y-1/2`); from `sm:` up it is pinned to the bottom (`sm:top-auto sm:translate-y-0 sm:bottom-0`).
- The `<h1>` lives inside an `overflow-hidden` wrapper so its FadeIn rise (y: 40 → 0) clips cleanly with no overflow flash.

## Specs

### Section wrapper

| Property | Value |
| --- | --- |
| Height | `h-screen` |
| Display | `flex flex-col` |
| Position | `relative` |
| Horizontal overflow | `overflowX: 'clip'` (inline style) |

### Navbar

| Property | Value |
| --- | --- |
| Layout | `flex justify-between` |
| Links (in order) | `About`, `Price`, `Projects`, `Contact` |
| Text color | `#D7E2EA` |
| Weight | `font-medium` |
| Case | `uppercase` |
| Tracking | `tracking-wider` |
| Font size | `text-sm md:text-lg lg:text-[1.4rem]` |
| Padding | `px-6 md:px-10 pt-6 md:pt-8` |
| Hover | `hover:opacity-70 transition-opacity duration-200` |

### Hero heading (`h1.hero-heading`)

| Property | Value |
| --- | --- |
| Text content | `Hi, i&apos;m jack` (lowercase "i", curly apostrophe via `&apos;`) |
| Class | `.hero-heading` (gradient text — see below) |
| Weight | `font-black` |
| Case | `uppercase` |
| Tracking | `tracking-tight` |
| Line height | `leading-none` |
| Wrapping | `whitespace-nowrap` |
| Width | `w-full` |
| Font size | `text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]` |
| Margin top | `mt-6 sm:mt-4 md:-mt-5` |
| Container | wrapped in `overflow-hidden` |

`.hero-heading` gradient (global CSS):

```css
.hero-heading {
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Bottom bar

| Property | Value |
| --- | --- |
| Layout | `flex justify-between items-end` |
| Padding bottom | `pb-7 sm:pb-8 md:pb-10` |

**Left blurb (`<p>`):**

| Property | Value |
| --- | --- |
| Text | `a 3d creator driven by crafting striking and unforgettable projects` |
| Color | `#D7E2EA` |
| Weight | `font-light` |
| Case | `uppercase` |
| Tracking | `tracking-wide` |
| Line height | `leading-snug` |
| Font size | `clamp(0.75rem, 1.4vw, 1.5rem)` |
| Max width | `max-w-[160px] sm:max-w-[220px] md:max-w-[260px]` |

**Right (`<ContactButton/>`):**

| Property | Value |
| --- | --- |
| Component | `<ContactButton/>` |
| Label | `Contact Me` |

### Hero portrait

| Property | Value |
| --- | --- |
| Wrapper | `<Magnet>` |
| Image URL | `https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png` |
| Position | `absolute left-1/2 -translate-x-1/2 z-10` |
| Width | `w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]` |
| Vertical (mobile) | `top-1/2 -translate-y-1/2` |
| Vertical (`sm`+) | `sm:top-auto sm:translate-y-0 sm:bottom-0` |

**`<Magnet>` props:**

| Prop | Value |
| --- | --- |
| `padding` | `150` |
| `strength` | `3` |
| `activeTransition` | `"transform 0.3s ease-out"` |
| `inactiveTransition` | `"transform 0.6s ease-in-out"` |

## Animations

All mount entrances use the shared `FadeIn` wrapper (fade + vertical rise). Each element fades from `opacity: 0` at its `y` offset to `opacity: 1, y: 0`.

| Element | `delay` | `y` (start offset) |
| --- | --- | --- |
| Navbar | `0` | `-20` |
| Hero heading | `0.15` | `40` |
| Left blurb text | `0.35` | `20` |
| Contact button | `0.5` | `20` |
| Portrait | `0.6` | `30` |

Shared `FadeIn` transition (matching the project's `FadeUp` convention):

- `initial`: `{ opacity: 0, y }`
- `animate`: `{ opacity: 1, y: 0 }`
- `transition`: `{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }`

The heading's rise is clipped by its `overflow-hidden` wrapper (y: 40 → 0 slides up from below the clip line). The portrait additionally has continuous magnet-driven `transform` motion governed by `<Magnet>`'s `activeTransition` / `inactiveTransition` (`transform 0.3s ease-out` while pointer is within `padding: 150`, easing back over `transform 0.6s ease-in-out` when it leaves).

## Code reference

```tsx
"use client";

import { FadeIn } from "@/components/sections/cta/fade-up"; // shared mount-rise wrapper
import { ContactButton } from "@/components/ui/contact-button";
import { Magnet } from "@/components/ui/magnet";

const NAV_LINKS = ["About", "Price", "Projects", "Contact"] as const;

const PORTRAIT_SRC =
  "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";

export function HeroSection() {
  return (
    <section
      className="relative flex h-screen flex-col"
      style={{ overflowX: "clip" }}
    >
      {/* NAVBAR */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 pt-6 md:px-10 md:pt-8">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="font-medium uppercase tracking-wider text-sm transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
              style={{ color: "#D7E2EA" }}
            >
              {label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* spacer pushes heading + bottom bar to the bottom */}
      <div className="flex-1" />

      {/* HERO HEADING */}
      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading w-full whitespace-nowrap font-black uppercase leading-none tracking-tight text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{
              color: "#D7E2EA",
              fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
            }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton label="Contact Me" />
        </FadeIn>
      </div>

      {/* HERO PORTRAIT — magnet-reactive, absolutely centered */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={PORTRAIT_SRC}
            alt="Jack — 3D creator portrait"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
          />
        </Magnet>
      </FadeIn>
    </section>
  );
}
```

> Note: the project's shared reveal helper is exported as `FadeUp` from `@/components/sections/cta/fade-up`. This spec references it as `FadeIn`; alias the import (`import { FadeUp as FadeIn } from "@/components/sections/cta/fade-up"`) or rename to match your component set. Its signature is `{ children, delay?, y?, className? }` with `initial={{ opacity: 0, y }}` → `animate/whileInView={{ opacity: 1, y: 0 }}` and `transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}`. For Hero mount entrances, swap `whileInView`/`viewport` for `animate` so they fire immediately on load rather than on scroll.
