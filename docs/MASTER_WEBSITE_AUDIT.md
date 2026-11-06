# Master website audit

Date: 6 Nov 2026. Scope: codebase at `main` plus the live site www.webify.org.in.
Every finding below was observed directly; anything that needs an account login
is listed as a limitation, not guessed.

## 1. Architecture

- Next.js 16 App Router, TypeScript, Tailwind, GSAP + Lenis for motion, hosted on
  Vercel (project `webify`). Lead delivery: Resend server route with a
  Web3Forms browser fallback. Booking: Cal.com.
- **Rendering:** every public page is statically prerendered at build time
  (79 static pages incl. OG images). `/contact` is rendered per request because
  it reads `?topic=`. Crawlers receive full HTML; no content depends on
  client-side rendering. Verified by fetching pages with Googlebot, Bingbot,
  OAI-SearchBot, GPTBot, PerplexityBot and ClaudeBot user agents (all 200, full
  text present).

## 2. Route inventory (36 indexable URLs in the sitemap)

| Group | Routes |
| --- | --- |
| Core | `/`, `/service`, `/project`, `/about`, `/blog`, `/contact` |
| Legal | `/privacy`, `/terms` |
| Services (12) | website-development, **saas-development (new)**, custom-software, ai-development, branding-design, crm-system, e-commerce, landing-page, website-support, redesign, app-development, seo |
| Live builds (3) | vexel-ai, dental-health, evergreen-studio |
| Blog (13) | incl. **what-a-saas-mvp-needs-on-day-one (new)** |
| Other | `/robots.txt`, `/sitemap.xml`, `/llms.txt`, IndexNow key file, custom 404 |

## 3. Design preservation baseline

Full-page screenshots of the live site at 360/375/390/430/768/1440 px are in
`docs/screenshots/before/` (local only, gitignored for size) with measured
section heights in `metrics.json` (committed). "After" equivalents are in
`docs/screenshots/after/`. Section crops of every edited section at 360 and
1440 px are in `docs/screenshots/sections/`. No colours, fonts, components,
radii, shadows or animations were changed.

## 4. Mobile content length

Live homepage at 375 px: **23,053 px** (about 29 phone screens). Cause was
content, not layout: the same five promises (direct access, founding rates,
24h reply, 30-day support, ownership) appeared 4 to 6 times each across
sections. Details and results: `MOBILE_CONTENT_OPTIMISATION.md`.

## 5. Content duplication found

| Content | Where it repeated (before) |
| --- | --- |
| Work directly with builders | Hero ticker, Credibility, Founding Offers, Working Remotely, Impacts stat, Services Band, Pricing |
| Founding rates, 12 months | Founding Offers card + footer, Pricing eyebrow + intro + footnote, FAQ |
| 30-day support | Impacts, Founding Offers, Pricing card + footnote, FAQ |
| You own everything | Credibility, Brands, Founding Offers, Pricing footnote |
| Shared service overview | All 11 service pages used one branding-agency paragraph (fixed earlier this week) |
| Tech stack | Homepage Brands section and /service TechStack |

Also found: Working Remotely said "Most of our clients have never met us",
which implied past clients. Rewritten.

## 6. Technical SEO

All 36 sitemap URLs: 200, unique titles, unique descriptions, correct
canonical (www), exactly one H1, OG image, no `<img>` without alt, valid
JSON-LD, no `noindex`. 69 internal links checked, 0 broken. Full table:
`TECHNICAL_SEO_AUDIT.md`.

## 7. Indexability

Nothing blocks indexing. robots.txt allows everything except `/api/`.
`http://webify.org.in` takes two 308 hops to reach `https://www.` (minor).
Google domain verification TXT record exists on webify.org.in.

## 8. International SEO

Single English site serving India and worldwide; no regional variants exist,
so hreflang is correctly absent. Pricing now states USD or INR. Working-hours
claim (6 to 11 pm IST = 8:30 am to 1:30 pm New York) is arithmetically correct
for US Eastern daylight time; it shifts by an hour in US winter. No fake
foreign offices. Schema `areaServed` now lists India, US, UK, UAE alongside
the Delhi-NCR cities.

## 9. AI crawler accessibility

All tested AI and search crawlers receive 200 with full content; no WAF,
CAPTCHA or JS challenge observed from this network. Caveat: tests used crawler
user agents from a residential IP, not the crawlers' real IP ranges. See
`AI_CRAWLER_AUDIT.md`.

## 10. Structured data

Sitewide: Organization + ProfessionalService (with founder Person, employee,
address, areaServed, knowsAbout), WebSite. Service pages: Service, FAQPage,
BreadcrumbList. Blog: Article + BreadcrumbList with named author. Projects:
CreativeWork + BreadcrumbList. No reviews or ratings (correct, none exist).
Open item: `sameAs` points at `linkedin.com/company/webify-co`, which could not
be verified (LinkedIn blocks automated checks). Confirm or remove.

## 11. Conversion

Booking link is in nav, footer, service and project pages. CTA labels unified
to "Discuss Your Project" (primary) and "Explore Our Work" (portfolio). Lead
events now record whether the session came from an AI answer engine.

## 12. Performance (Lighthouse, mobile, simulated)

Live: performance 59, SEO 100, accessibility 93, best practices 93, LCP 3.2 s,
TBT 3.6 s, CLS 0. The LCP element is the hero card heading, which waits for a
0.6 s reveal animation; TBT comes from ~12 s of main-thread work (GSAP, Lenis,
large client bundles). Both are design/animation changes, so they were
documented, not changed. See `IMPLEMENTATION_REPORT.md` for the proposal.

## Limitations

- No access to Search Console, Bing Webmaster Tools, Vercel Analytics or a
  keyword tool in this session. No search volumes, rankings or traffic numbers
  are claimed anywhere in these docs.
- PageSpeed Insights API quota was exhausted; Lighthouse 12.8.2 was run
  locally instead (lab data only, no field data).
- Browser automation of your Google/Microsoft accounts was not available.

## Priority plan

| P | Item | Status |
| --- | --- | --- |
| P0 | Shorten mobile homepage by removing duplication | Done, 24.7% shorter |
| P0 | Fix misleading copy and counters | Done |
| P0 | Distinct service messaging | Done (12 pages) |
| P0 | Indexability, robots, sitemap, OAI-SearchBot | Verified, robots made explicit |
| P0 | Homepage positioning | Done |
| P1 | SaaS Development page + keyword map | Done |
| P1 | Schema enrichment | Done |
| P1 | Search Console / Bing reporting | Script ready, needs your OAuth consent |
| P1 | LCP / TBT | Proposal, needs approval (touches animation) |
| P2 | Content clusters, authority, AI tracking | Plans in docs, execution ongoing |
