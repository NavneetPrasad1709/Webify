# AGENTS.md — Webify (webify.org.in)

This is the single source of truth for any AI coding agent (Claude Code, Antigravity, Cursor, Codex, etc.) working on this repo. CLAUDE.md and GEMINI.md just point here — do not duplicate rules elsewhere.

## Project

- Web/software agency site — Next.js (TypeScript), Tailwind, ESLint, deployed for webify.org.in.
- Business goal: rank #1 on Google for web agency / software development searches in Delhi–NCR/Ghaziabad, and convert visitors into client leads.
- Audience: local business owners (restaurants, real estate, agri-machinery, etc.) and startups looking for a web/software partner.

## Commands

```
npm install
npm run dev       # local dev server
npm run build     # production build — must pass with zero errors before any fix is considered done
npm run lint       # ESLint — must be clean before any fix is considered done
```

## Audit Scope (in priority order)

When asked to "audit" or "fix the site", work through these categories. For each, produce a report first (Critical / High / Medium / Low, with file path + line + fix), then implement fixes only after the report is reviewed — unless explicitly told to "just fix it."

### 1. Technical SEO
- Every page: unique `<title>` (50–60 chars) and meta description (140–160 chars) with target keyword + city name.
- `sitemap.xml` and `robots.txt` present, correct, submitted-ready.
- Canonical tags on every route; no duplicate-content traps (trailing slash, www vs non-www, http vs https).
- Structured data (schema.org JSON-LD): `Organization`, `LocalBusiness`, `Service`, `FAQPage` where relevant, `BreadcrumbList`.
- Semantic heading hierarchy (one `<h1>` per page, logical `<h2>/<h3>` nesting).
- All images: descriptive `alt` text, correct dimensions, next/image used (no raw `<img>` for content images).
- Internal linking between service pages, portfolio/case studies, and blog (if any).

### 2. Local SEO (this is the highest-leverage item for "clients aayen")
- NAP (Name, Address, Phone) identical across site footer, contact page, and Google Business Profile.
- `LocalBusiness` schema with correct address, geo-coordinates, service area, opening hours.
- Location-specific landing content: Delhi / Ghaziabad / NCR service pages or sections, not just a generic "Contact" page.
- Clear service+location keyword targeting in H1/H2s (e.g. "Web Development Agency in Ghaziabad").
- Prominent, click-to-call phone number and WhatsApp link above the fold on mobile.

### 3. Performance / Core Web Vitals
- Flag every video file served unoptimized (repo has several .mp4 portfolio videos — these must be compressed, served via next/image poster + lazy-loaded video, or moved to a CDN/streaming service, not shipped raw).
- LCP element identified per page — must load fast (preloaded hero image/video poster, no render-blocking scripts above the fold).
- CLS: reserved dimensions for all media, no layout shift from fonts/ads.
- INP: audit heavy client-side JS, unnecessary re-renders, unused dependencies in `node_modules`/bundle.
- Font loading strategy (next/font, no FOIT).
- Run and report Lighthouse/PageSpeed scores (mobile + desktop) before and after fixes.

### 4. Conversion / On-page content
- Every service page ends with a clear CTA (call, WhatsApp, form).
- Portfolio/case studies show real results (client name if permitted, problem → solution → outcome).
- Trust signals: testimonials, client logos, years in business, certifications.
- Contact form validates properly and actually delivers (check the backend/email integration).

### 5. Security & Production Readiness
- No secrets/API keys committed (`.env` must be gitignored — verify `.gitignore` actually covers it).
- Security headers (CSP, X-Frame-Options, Referrer-Policy, Strict-Transport-Security) set in `next.config.ts`.
- Dependency audit (`npm audit`) — flag high/critical vulnerabilities.
- Proper custom 404 and error pages.
- HTTPS enforced, no mixed content.

### 6. Code Quality
- `npm run build` and `npm run lint` clean — this is non-negotiable before marking any task done.
- TypeScript strict mode, no `any` left unaddressed without reason.
- Consistent component structure under `src/`.
- Basic accessibility: color contrast, keyboard navigation, ARIA labels on interactive elements.

## Output format for audits

Always structure findings as:
```
## [Category]
- **[Severity]** Issue — file/path:line — why it matters — suggested fix
```

Do not silently "improve" things outside the requested scope in the same pass — call them out separately so they can be approved.

## What AI agents cannot fix (flag, don't attempt)
- Backlinks / off-page SEO — needs manual outreach, not code.
- Google Business Profile setup/verification — manual, outside repo.
- Actual Google Search Console submission and monitoring — manual step, but remind the user to do it.
