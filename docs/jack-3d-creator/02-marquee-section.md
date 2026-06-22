# Marquee Section

The Marquee Section is a scroll-driven horizontal showcase strip that sits directly below the Hero in the "Jack — 3D Creator" landing page. It renders two rows of looping preview GIFs that translate horizontally in opposite directions as the visitor scrolls the page, creating a parallax marquee effect tied to scroll position (not an autonomous animation loop).

## Layout & structure

- A full-width `<section>` with background `#0C0C0C` and vertical padding only (no horizontal padding — tiles intentionally bleed past the viewport edges).
- Inside, a vertical flex column with `gap-3` between the two rows. `overflow-x` is clipped so the off-screen tiles do not produce a horizontal scrollbar.
- **Row 1** (top): a horizontal flex track containing the **first 11 images**, with the source array **tripled** (concatenated three times) so the row is long enough to never reveal an empty edge while scrolling. It translates to the **right** as scroll offset grows.
- **Row 2** (bottom): a horizontal flex track containing the **remaining 10 images**, also **tripled**. It translates to the **left** (mirror of Row 1) as scroll offset grows.
- Each row uses `gap-3` between tiles and `will-change: transform` for compositing performance. The `transform: translateX(...)` is applied inline via React state derived from the scroll listener.
- Each tile is a fixed `420px × 270px` rounded image (`rounded-2xl`, `object-cover`, lazy-loaded).

DOM hierarchy:

```
section (bg #0C0C0C, pt-24 sm:pt-32 md:pt-40 pb-10, overflow-x clip)
└── div.flex.flex-col.gap-3
    ├── div.flex.gap-3  (Row 1, style: translateX(offset - 200), willChange: transform)
    │   └── img × 33   (11 images tripled — 420×270, rounded-2xl, object-cover, lazy)
    └── div.flex.gap-3  (Row 2, style: translateX(-(offset - 200)), willChange: transform)
        └── img × 30   (10 images tripled — 420×270, rounded-2xl, object-cover, lazy)
```

## Specs

### Container

| Property | Value |
| --- | --- |
| Element | `<section>` |
| Background | `#0C0C0C` |
| Padding (top) | `pt-24 sm:pt-32 md:pt-40` |
| Padding (bottom) | `pb-10` |
| Horizontal padding | none (tiles bleed off-screen) |
| Overflow-x | clipped (no horizontal scrollbar) |

### Rows wrapper

| Property | Value |
| --- | --- |
| Display | `flex flex-col` |
| Gap between rows | `gap-3` |

### Each row (track)

| Property | Value |
| --- | --- |
| Display | `flex` |
| Gap between tiles | `gap-3` |
| `willChange` | `'transform'` |
| Transform | inline `translateX(...)` (see Animations) |

### Each tile (image)

| Property | Value |
| --- | --- |
| Width | `420px` |
| Height | `270px` |
| Border radius | `rounded-2xl` |
| Object fit | `object-cover` |
| Loading | `loading="lazy"` |
| `flex-shrink` | `0` (tiles must not shrink — keeps fixed 420px width) |

### Scroll / offset math

| Param | Value |
| --- | --- |
| Offset formula | `(window.scrollY - sectionTop + window.innerHeight) * 0.3` |
| Multiplier | `0.3` |
| Row 1 translateX | `offset - 200` |
| Row 2 translateX | `-(offset - 200)` |
| Constant subtracted | `200` |
| Scroll listener option | `{ passive: true }` |

### Image set (21 GIFs from motionsites.ai — verbatim)

Row 1 uses images **1–11**; Row 2 uses images **12–21**.

```
https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif
https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif
https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif
https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif
https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif
https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif
https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif
https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif
https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif
https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif
https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif
https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif
https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif
https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif
https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif
https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif
https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif
https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif
https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif
https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif
https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif
```

**Row 1 (first 11):**

```
https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif
https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif
https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif
https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif
https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif
https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif
https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif
https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif
https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif
https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif
https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif
```

**Row 2 (remaining 10):**

```
https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif
https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif
https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif
https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif
https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif
https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif
https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif
https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif
https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif
https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif
```

## Animations

This section is **scroll-position-driven**, not a self-running keyframe/`animate` loop. There is no Framer Motion `whileInView`, `transition`, or easing here — the movement is computed every scroll tick from `window.scrollY` and written into the rows' inline `transform`.

| Aspect | Detail |
| --- | --- |
| Trigger | native `scroll` event on `window` |
| Listener registration | `window.addEventListener('scroll', handler, { passive: true })` |
| Cleanup | `window.removeEventListener('scroll', handler)` on unmount |
| Offset computation | `offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3` |
| `sectionTop` source | the section element's `offsetTop` (captured via ref) |
| Row 1 movement | `transform: translateX(${offset - 200}px)` → moves **right** as you scroll down |
| Row 2 movement | `transform: translateX(${-(offset - 200)}px)` → moves **left** as you scroll down |
| Easing | none (linear, frame-by-frame from scroll value) |
| Delay / duration | none (instantaneous response to scroll position) |
| Performance | `willChange: 'transform'` on each row; passive listener to avoid blocking scroll |
| Initial offset | computed once on mount so the rows are positioned before the first scroll event |

Note: the tripled arrays exist so that as the rows translate they never expose a gap at either edge — there is always off-screen content to slide into view in both directions.

## Code reference

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

/** First 11 images — Row 1 (scrolls right). */
const ROW_1_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];

/** Remaining 10 images — Row 2 (scrolls left). */
const ROW_2_IMAGES = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

// Triple each array for seamless edge-to-edge scrolling.
const ROW_1_TRIPLED = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
const ROW_2_TRIPLED = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

type MarqueeTileProps = {
  src: string;
  index: number;
};

function MarqueeTile({ src, index }: MarqueeTileProps) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="h-[270px] w-[420px] flex-shrink-0 rounded-2xl object-cover"
      aria-hidden={index >= 11 ? undefined : undefined}
    />
  );
}

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = sectionRef.current?.offsetTop ?? 0;
      // Scroll offset: tie horizontal travel to vertical scroll position.
      const next =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(next);
    };

    // Prime the initial position before the first scroll event.
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Row 1 → right, Row 2 → left (mirrored).
  const row1X = offset - 200;
  const row2X = -(offset - 200);

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-10 sm:pt-32 md:pt-40 [overflow-x:clip]"
      style={{ background: "#0C0C0C" }}
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — moves right */}
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${row1X}px)`,
            willChange: "transform",
          }}
        >
          {ROW_1_TRIPLED.map((src, i) => (
            <MarqueeTile key={`row1-${i}`} src={src} index={i} />
          ))}
        </div>

        {/* Row 2 — moves left */}
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${row2X}px)`,
            willChange: "transform",
          }}
        >
          {ROW_2_TRIPLED.map((src, i) => (
            <MarqueeTile key={`row2-${i}`} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarqueeSection;
```
