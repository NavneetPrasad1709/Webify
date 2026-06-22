# Jack — 3D Creator — Section Docs

Documentation for **Jack — 3D Creator**, a single-page, dark-theme portfolio landing page. The page is a vertically scrolling experience built on React + Vite with TypeScript, styled with Tailwind CSS, and animated with Framer Motion. The background is a near-black `#0C0C0C`, type is set in **Kanit**, and section headings use a soft top-to-bottom metallic gradient via the `.hero-heading` class. The document title is `Jack — 3D Creator`.

This folder is the index. Each section of the page has its own doc (see the [File map](#file-map)), plus a shared doc covering the reusable building blocks.

## Tech stack

| Dependency | Version |
| --- | --- |
| react | ^18.3.1 |
| react-dom | ^18.3.1 |
| typescript | (project) |
| tailwindcss | ^3.4.1 |
| framer-motion | ^12.38.0 |
| lucide-react | ^0.344.0 |
| vite | (build tool) |

- **React** `^18.3.1`
- **react-dom** `^18.3.1`
- **TypeScript**
- **Tailwind CSS** `^3.4.1`
- **Framer Motion** `^12.38.0`
- **Lucide React** `^0.344.0`
- **Vite**

## Global styles

A global reset normalizes box sizing and removes default spacing. The `#0C0C0C` background is applied across `html`, `body`, `#root`, and the main wrapper so there is no flash of a lighter color anywhere. The main wrapper also sets `overflowX: 'clip'` to prevent horizontal scroll from off-canvas/animated elements. Type is set in **Kanit** (Google Fonts, weights **300–900**). Accent text across sections uses `#D7E2EA`.

```css
/* Global reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* #0C0C0C background on every wrapping layer */
html,
body,
#root {
  background: #0C0C0C;
}

body {
  font-family: 'Kanit', sans-serif;
}

/* Main wrapper */
main {
  background: #0C0C0C;
  overflow-x: clip; /* overflowX: 'clip' */
}

/* Gradient text for section headings (verbatim) */
.hero-heading {
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Load **Kanit** weights 300–900. Either link it in your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>
```

…or import it at the top of your CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
```

## Section order

The page renders these sections, top to bottom, in this exact order:

1. **Hero**
2. **Marquee**
3. **About**
4. **Services**
5. **Projects**

## File map

| Doc | Summary |
| --- | --- |
| [01-hero-section.md](01-hero-section.md) | Hero (navbar, giant heading, magnetic portrait) |
| [02-marquee-section.md](02-marquee-section.md) | Scroll-driven dual-row GIF marquee |
| [03-about-section.md](03-about-section.md) | About + scroll-reveal animated paragraph + corner 3D props |
| [04-services-section.md](04-services-section.md) | White services list (01–05) |
| [05-projects-section.md](05-projects-section.md) | Sticky-stacking project cards |
| [06-reusable-components.md](06-reusable-components.md) | ContactButton, LiveProjectButton, FadeIn, Magnet, AnimatedText |

## Responsive breakpoints

The layout is **mobile-first** — base styles target the smallest screens, and Tailwind breakpoints layer on enhancements as the viewport grows. Default Tailwind breakpoints are used:

| Prefix | Min width |
| --- | --- |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |

Fluid typography leans heavily on `clamp()` (e.g. `clamp(min, preferred-vw, max)`) so headings and body copy scale smoothly between breakpoints instead of stepping at each one.

## Getting started

Minimal **Vite + React + TS + Tailwind** setup:

1. **Scaffold and install dependencies**

   ```bash
   npm create vite@latest jack-3d-creator -- --template react-ts
   cd jack-3d-creator
   npm install
   npm install framer-motion@^12.38.0 lucide-react@^0.344.0
   npm install -D tailwindcss@^3.4.1 postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Configure Tailwind `content`** so it scans your source files (`tailwind.config.js`):

   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
     theme: {
       extend: {
         fontFamily: {
           kanit: ['Kanit', 'sans-serif'],
         },
       },
     },
     plugins: [],
   };
   ```

3. **Add Kanit** — drop the Google Fonts `<link>` (weights 300–900) into `index.html`'s `<head>`, or `@import` it at the top of your global CSS (see [Global styles](#global-styles)).

4. **Set up global CSS** (`src/index.css`) with the Tailwind directives, the reset, the `#0C0C0C` background targets, and the `.hero-heading` gradient:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   * {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
   }

   html,
   body,
   #root {
     background: #0C0C0C;
   }

   body {
     font-family: 'Kanit', sans-serif;
   }

   .hero-heading {
     background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
   }
   ```

5. **Set the document title** to `Jack — 3D Creator` in `index.html`, ensure the main wrapper applies `background: #0C0C0C` and `overflowX: 'clip'`, then run the dev server:

   ```bash
   npm run dev
   ```
