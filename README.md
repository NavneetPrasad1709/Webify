# Webify

Marketing site for Webify, a senior-led design and engineering studio.
Live at [webify.org.in](https://www.webify.org.in).

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- GSAP + ScrollTrigger for motion, Lenis for smooth scrolling
- Vercel Analytics (cookieless), deployed on Vercel

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (41 static pages)
npx tsc --noEmit && npx eslint .
```

## Environment

The contact form delivers leads when ONE of these is set (otherwise the
form shows its "email us directly" fallback):

| Variable | Provider | Where it runs |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | [web3forms.com](https://web3forms.com) | Browser. Free plan; the key is public by design and the free plan rejects server-side calls. |
| `RESEND_API_KEY` | [resend.com](https://resend.com) | Server (`/api/contact`). Used when no client key is set. |

`NEXT_PUBLIC_*` values are inlined at build time, so a redeploy is
required after changing the Web3Forms key.

## Where things live

- `src/app` — routes, metadata, sitemap/robots/manifest, `/api/contact`
- `src/lib/pages` — canonical page content (services, projects, blog, about, contact)
- `src/lib/data.ts` — homepage content (FAQ, pricing tiers, founding offers)
- `src/components/sections` — homepage/shared sections
- `src/components/pages` — per-route compositions
- `src/components/ui` — primitives (PillButton, RollingText, Marquee, Preloader)
- `public/assets` — media; brand masters live outside the repo at `D:\Webify pro`

## House rules

- Honest zero-client positioning: no fabricated testimonials, clients,
  stats, or people, anywhere.
- No arrows on buttons (letter-roll hover is the affordance), no em
  dashes in copy, no grey body text (pure white on dark, pure black on
  light).
- Fixed-price project model; public dollar amounts are withheld until
  the first 10 founding projects ship.
