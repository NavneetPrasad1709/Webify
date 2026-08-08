# AGENTS.md — Webify (webify.org.in)

This is the single source of truth for any AI coding agent (Claude Code, Antigravity, Cursor, Codex, etc.) working on this repo. CLAUDE.md and GEMINI.md just point here — do not duplicate rules elsewhere.

## Project

- Web/software agency site — Next.js (TypeScript), Tailwind, ESLint, deployed for webify.org.in.
- Business goal: **turn a stranger who lands here from somewhere else into a booked call.** Almost nobody finds this site by searching. They arrive from an Upwork or Contra profile, a LinkedIn message, a cold email, a Dribbble shot, a proposal link, or a referral. The site's job is to survive the ten seconds that follow.
- Primary audience: **US and other English-speaking founders and small teams** hiring a remote web/software partner. They are comparing Webify against a US agency at three times the price and against a cheaper freelancer, and they are silently asking four questions: is this real, who actually does the work, how do we communicate across timezones, and what does it cost.
- Secondary audience: Delhi–NCR business owners. Local search is the one place a new domain can realistically rank inside months rather than years, so it stays as near-term revenue, but it is no longer what the site is built around.
- **Do not rebuild the site around organic search.** A new domain takes 12–18 months to rank for competitive terms like "web design company" and 4–6 months for long tail. Treat SEO as compounding background work, never as the reason a page exists.

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
- Every page: unique `<title>` (50–60 chars) and meta description (140–160 chars) built around the service and the buyer's problem. A city name belongs only on pages that genuinely target a location; on global routes it narrows the page for no gain.
- Open Graph and Twitter cards must be **per route**, not inherited from the homepage. Most traffic arrives through a pasted link in a DM, a proposal or a Slack channel, so the card is often the first thing a prospect sees.
- `sitemap.xml` and `robots.txt` present, correct, submitted-ready.
- Canonical tags on every route; no duplicate-content traps (trailing slash, www vs non-www, http vs https).
- Structured data (schema.org JSON-LD): `Organization`, `LocalBusiness`, `Service`, `FAQPage` where relevant, `BreadcrumbList`.
- Semantic heading hierarchy (one `<h1>` per page, logical `<h2>/<h3>` nesting).
- All images: descriptive `alt` text, correct dimensions, next/image used (no raw `<img>` for content images).
- Internal linking between service pages, portfolio/case studies, and blog (if any).

### 2. Landing-from-elsewhere readiness (this is the highest-leverage item for "clients aayen")

Every visitor is assumed to arrive cold from a profile, a message or a proposal, on a US timezone, on the first click after reading two lines about Webify somewhere else. Optimise for that visitor before anything else.

- **Speed is a trust signal, not a metric.** A studio selling fast websites cannot open with a blank or blocked screen. No render-blocking veil that only JS can clear, nothing above the fold waiting on hydration.
- **Booking beats forms.** A short intro call is the lowest-commitment yes a remote prospect can give. The booking link belongs in the nav, the footer, every service and project page, and the form success state, not on one page below the fold.
- **Answer the offshore objections on the page, unprompted.** Working-hours overlap with US timezones stated in plain numbers, who personally does the work and who the client talks to, how progress is visible between calls, and what happens if it goes wrong. A prospect who has to ask these has already discounted you.
- **Currency and scope framing.** Fixed-price projects, quoted in USD for international clients. No public amounts until the first ten projects ship (see the pricing rule below), but never leave a US visitor unsure whether they are looking at a $2k or a $50k studio.
- **Proof over adjectives.** Live URLs a prospect can open in a new tab, the stack used, what was hard. Three real builds beat a page of claims.

Local SEO stays in scope as secondary work, not as the site's spine:

- `LocalBusiness` schema with correct address and service area; NAP identical across footer, contact page and Google Business Profile.
- Google Business Profile is still worth creating: it is free, and Delhi–NCR is the only market where this domain can rank in months.
- Location landing content is allowed, but it must not push the global positioning below the fold on any shared route.
- No phone number until one is actually published (there is none today, and inventing one is forbidden).

### 3. Performance / Core Web Vitals
- Flag every video file served unoptimized (repo has several .mp4 portfolio videos — these must be compressed, served via next/image poster + lazy-loaded video, or moved to a CDN/streaming service, not shipped raw).
- LCP element identified per page — must load fast (preloaded hero image/video poster, no render-blocking scripts above the fold).
- CLS: reserved dimensions for all media, no layout shift from fonts/ads.
- INP: audit heavy client-side JS, unnecessary re-renders, unused dependencies in `node_modules`/bundle.
- Font loading strategy (next/font, no FOIT).
- Run and report Lighthouse/PageSpeed scores (mobile + desktop) before and after fixes.

### 4. Conversion / On-page content
- Every service page ends with a clear CTA: book a call first, form second.
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
