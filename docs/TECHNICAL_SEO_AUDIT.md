# Technical SEO audit

Crawled every URL in `/sitemap.xml` from a local production build (6 Nov 2026),
plus live checks of redirects, robots.txt and crawler responses.

## Checklist

| Check | Result |
| --- | --- |
| robots.txt | Valid. Allows all, disallows `/api/`, names Googlebot, Bingbot, OAI-SearchBot, PerplexityBot explicitly (added), points to sitemap |
| XML sitemap | Valid, 37 URLs, all 200, all canonical www URLs, no redirects or noindex URLs inside; new SaaS page and article included automatically |
| Status codes | All sitemap URLs 200; unknown URL returns a real 404 with the custom page |
| Redirects | apex to www and http to https are 308. `http://webify.org.in` takes 2 hops (http to https apex to www). Minor; fix in Vercel domain settings if wanted |
| Trailing slash | `/service/` 308s to `/service` (one canonical form) |
| Canonical tags | Present and correct on all 37 |
| noindex | None anywhere |
| Titles | Unique on all 37; 23 to 64 characters |
| Meta descriptions | Unique on all 37; 120 to 171 characters |
| H1 | Exactly one per page |
| Image alt | 0 images without alt |
| Open Graph | Per-route OG image on every page |
| Structured data | Valid JSON on every page; types listed in MASTER_WEBSITE_AUDIT.md |
| Internal links | 69 unique internal links, 0 broken |
| HTTPS / HSTS | HTTPS enforced, HSTS and security headers set in next.config.ts |
| Rendering | Static HTML; content readable without JavaScript |
| Mobile | No horizontal overflow at 360 to 430 px |
| Staging URLs | No `*.vercel.app` URLs in the sitemap or canonicals |

## Changes made

| File | Change |
| --- | --- |
| `src/app/layout.tsx` | Homepage title "Webify \| SaaS, Custom Software and AI Automation Company"; new description naming India and worldwide; founder `jobTitle` and `url`; `areaServed` countries; `knowsAbout` adds MVP, AI automation, workflow automation; AI referral tracker mounted |
| `src/app/service/[slug]/page.tsx` | Titles for new SaaS page; custom-software and AI titles retargeted to avoid overlap |
| `src/app/project/[slug]/page.tsx` | Project titles say "Live Build" instead of "Case Study" (they are self-initiated) |
| `src/lib/pages/project.ts` | Vexel AI mapped to SaaS Development |
| `src/app/robots.ts` | Explicit crawler groups |
| `src/lib/pages/service.ts` | New SaaS Development page, 7 new cost-factor FAQs (FAQPage schema picks them up) |
| `src/lib/pages/blog.ts` | New article with Article schema, named author, real date |
| `src/components/sections/Nav.tsx` | Menu watermark distortion fixed (`object-contain`), flagged by Lighthouse |

## Lighthouse (lab, mobile simulated, Lighthouse 12.8.2)

| Run | Perf | SEO | A11y | Best practices | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Live, before | 59 | 100 | 93 | 93 | 3.2 s | 3,640 ms | 0 |
| Local, after | 53 | 100 | 93 | 89 | 4.4 s | 2,350 ms | 0 |
| Live, desktop | 76 | 100 | 93 | 96 | 0.8 s | 420 ms | 0 |
| Local, desktop | 86 | 100 | 93 | 93 | 0.9 s | 260 ms | 0 |

Read with care: "before" ran against Vercel's CDN, "after" against a local
`next start` without CDN or compression, so the two are not equal conditions.
The best-practices drop is a local-only console error (`/_vercel/insights`
does not exist off Vercel). Re-run PageSpeed Insights on the live URL after
deploy for a fair comparison.

## Open issues (not fixed, need a decision)

1. **LCP on mobile.** The LCP element is the hero card heading, revealed by a
   GSAP blur-in with a 0.6 s delay. Removing the delay (or starting the card
   visible) would likely cut LCP by roughly that delay. This changes an
   animation, so it needs your approval.
2. **Total Blocking Time.** About 12 s of main-thread work on a simulated slow
   phone, mostly GSAP, Lenis and client components. Fix is a dedicated pass
   (server components for static sections, lazy animation), already listed in
   AUDIT.md.
3. **`sameAs` LinkedIn company URL** is unverified.
4. **Two-hop apex redirect** from `http://webify.org.in`.
