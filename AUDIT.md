  # Webify: Enterprise Website Audit & Growth Roadmap

**Audit date:** 12 July 2026
**Scope:** Full codebase and content audit of the production site (`rekolet/`, Next.js 16, deployed at webify.org.in) across 10 dimensions, plus a production build/QA pass and a live competitor benchmark against TCS, Infosys, Accenture, IBM, Deloitte Digital, Capgemini, and three world-class small studios (Instrument, Locomotive, Basic/Dept).
**Method:** 22 independent audit agents. Every dimension was audited, then adversarially re-verified against the actual source files. Findings marked VERIFIED were independently confirmed; five dimensions (Performance, Content, Accessibility, Mobile, Code) carry first-pass findings that were file-cited but not double-checked. The production build was compiled, served, and every route exercised with real HTTP requests.

---

## Current Website Score

# 44 / 100

**The verdict in one paragraph:** Webify has a genuinely rare foundation. The honest zero-client positioning is executed with real discipline (concept work labeled at every surface, founding-offer cards instead of fake testimonials, transparent pricing no competitor publishes), the motion design is coherent, the build passes cleanly, and every route returns 200. But the site is currently a beautiful funnel that ends in a hole: the contact API silently discards every lead while telling the visitor "your message is in." Around that critical failure sit contradictions of the studio's own business model (a FAQ still selling the dead template's subscriptions), one surviving credibility fabrication (a stock portrait captioned "Webify team member"), an unverified registered-trademark claim, zero SEO infrastructure, zero analytics, zero legal pages, and a few hundred smaller craft defects. None of this is hard to fix. Almost all of it is content and wiring, not redesign.

---

## Department-wise Scores

| Department | Score | Status |
|---|---|---|
| Trust | 3.5 / 10 | Honest posture is strong; functional and legal trust infrastructure is at prototype level |
| Conversion (CRO) | 3.5 / 10 | Good skeleton, broken last mile: leads discarded, no analytics, pricing buried |
| SEO | 3 / 10 | Solid on-page basics; the entire technical layer (sitemap, robots, OG, JSON-LD, canonicals) is absent |
| Accessibility | 4 / 10 | Real intent in places; systemic WCAG 2.2 AA failures (motion, contrast, focus, announcements) |
| Corporate Identity | 4 / 10 | Anonymous company: no founder, no entity, no location, five competing descriptors |
| Branding | 4.5 / 10 | Token-driven system with craft; undermined by the ® claim, logo defects, and template remnants |
| Performance | 4.5 / 10 | Disciplined media; structural problems: 5x JS budget, no next/image, JS-gated preloader |
| Content | 4.5 / 10 | Unusually honest copy layer; contradicts its own business model and keeps template residue |
| Technical Quality | 5 / 10 | Strict TS, clean build, exemplary GSAP hygiene; stub API, no security headers, lint gate fails |
| UI | 5.5 / 10 | Crafted, motion-coherent; violates its own design rules in dozens of confirmed places |
| UX | 5 / 10 | Clear journey design; dead ends on project/about pages, ten different CTA labels |
| Mobile | 6 / 10 | Genuinely mobile-aware; two device-class content losses and several collision bugs |
| Desktop | 6.5 / 10 | The strongest surface: hero, nav, and motion choreography land as intended |

**Build/QA:** production build passes (35/35 static pages, tsc clean, all 30 routes return 200, all 67 asset references resolve, 404s work). ESLint fails with 1 error and 29 warnings. First-load JS is 763-832 kB raw on every route, roughly 5x a 150 kB budget.

---

## What Is Already Genuinely Good (protect these)

Do not lose these while fixing the rest. Verified strengths:

- **Honesty architecture.** Concept work carries a "Concept Build" chip on the homepage and "Self-initiated concept" typing on every project page. A guard comment in `about.ts` forbids invented people. Stats are controllable commitments (24h reply, 2 revision rounds, 30-day support), not invented metrics. Zero "trusted by" claims sitewide. No competitor in the benchmark set, enterprise or studio, does this.
- **Transparent pricing.** Honest "from" floors with typical ranges, ship timelines, itemized inclusions, featured middle tier, risk-reversal footnote. None of the nine benchmarked companies publish prices at all. This is a weapon (see Roadmap Phase 5).
- **Brand color continuity.** The favicon background pixel-samples at exactly `--color-primary` (#0051ff). Token-driven type/color/radius system in `globals.css` applied consistently.
- **Smart logo engineering.** The nav samples background luminance and swaps white/black logo variants live. The preloader choreographs icon and wordmark with documented optical centering.
- **Motion grammar.** Shared `revealFrom/revealTo` blur-rise language across all sections; `gsap.context()` + revert cleanup in every animated component (no leaks on route change).
- **Media discipline.** All 12 videos total ~10 MB, 720p, well compressed, with posters. `ServiceListing` is a model pattern: `preload="none"` + poster + IntersectionObserver play/pause.
- **Contact page journey.** The four-step "What happens next" strip (intro call in 48h, fixed quote in 3 working days, weekly sprints, 30-day support) is an excellent friction reducer.
- **Technical correctness.** Strict TypeScript with zero `any`. All three dynamic routes handle Next.js 16 async params, `generateStaticParams`, and unknown-slug 404s correctly. Self-hosted variable font with `display: swap`. No secrets committed.
- **Copy discipline.** The no-em-dash rule is fully honored. Blog posts (7 of 8) have real substance. Clean kebab-case slugs. High alt-text discipline.

---

## 1. Complete Website Audit: Branding & Corporate Identity (4.5/10)

The identity system skeleton is strong (tokens, adaptive logo, branded preloader), but no enterprise brand review would pass it today:

- A stock corporate headshot is captioned "Webify team member ready to talk" on the contact page. This is the one surviving fabrication on the site and it sits on the highest-intent page.
- The ® symbol is baked into the logo artwork and appears in copy across Hero, Footer, About, and data files. There is no evidence of registration; falsely representing a mark as registered is an offence under s.107 of the Indian Trade Marks Act 1999, and "Webify" has prior commercial use (IBM acquired Webify Solutions in 2006). This needs a decision, not a shrug.
- Six surfaces carry five different brand descriptors: "Web & Software Co." (logo tagline), "Digital Product & Web Engineering" (metadata), "Webify - Creative Agency" (template-era alt text in both Nav and Footer), "Senior-Led Design & Engineering Company" (hero card), "design-led studio" (copy). It reads as five companies.
- Logo craft defects: the tagline collides with the y descender in the master lockup; the icon (organic brush W with a baked-in drop shadow) and the wordmark (hard geometric grotesque) share no construction logic; icon variants have mismatched trim boxes; logo black is #101010 while the UI ink token is #000000; there are no SVG masters.
- The full lockup renders at 40px in the nav, making the tagline a 6px illegible smudge.
- Template identity still ships: the package is named "rekolet", and `public/` serves the template's own logos plus Next.js starter SVGs.
- Sharing brand layer is absent: no Open Graph, no Twitter card, no OG image, no manifest, no theme-color. Every link shared to LinkedIn/X/WhatsApp renders as a bare unbranded link.

## 2. UI/UX Audit (5.5/10)

Genuinely crafted, but the site violates its own documented rules in dozens of confirmed places:

- **Arrows on CTAs** despite the explicit no-arrow rule (which `Work.tsx` documents and honors): ServicesAccordion split CTA, ProjectsIndex "View" pill, ProjectSingle next-project link, and the contact page's ArrowBadge on every channel card.
- **Grey body text** despite the pure-white/pure-black standard: footer nav links at 80% ink, copyright bar in gray-deep, founding-offer card bodies in gray-soft, Approach body copy, blog meta text, scrub-word animations that start copy as grey.
- **Consistency drift:** six different container widths and two gutter systems; radius tokens bypassed by one-off `rounded-[30px]` values; three duplicate letter-roll implementations; two drifted pill-button geometries; page top padding varies between pages.
- **Interaction gaps:** PillButton has no focus-visible, active, or disabled states; the mobile menu has no focus trap; Values tooltips are clipped and unreachable on touch/keyboard; the Marquee `pauseOnHover` prop is dead code.
- **Journey dead ends:** /project index and detail pages have no conversion CTA at all; /about ends on a values marquee with no closing CTA; the homepage's final section after the CTA band is blog cards, leaking end-of-page attention.
- **Ten different labels** for the one conversion action (Let's Talk, Let's Work, Book a Call, Book a scoping call, Start a Project, Talk Through Your Build, and more) dilute CTA recognition.
- All internal navigation uses raw `<a>` tags, so every click is a full page reload (also the ESLint error).

## 3. Enterprise-Level Design Comparison

See the full benchmark in section 10. Short version: your visual language is already in the same family as Instrument and Locomotive (the correct aspirational tier for a founding studio). What TCS/Accenture/IBM do that you structurally cannot yet (industry pages, analyst badges, research institutes, investor relations) is mostly enterprise theater at your size; what they do that you must copy is: never contradict yourself, never fabricate, always have a legal layer, always be shareable, and always route the visitor to a next step.

## 4. Corporate Trust Audit (3.5/10)

- **The company is legally anonymous.** No founder name or face, no legal entity, no registration info, no physical location ("India" appears nowhere on the site despite being brand fact). With zero clients, the founder is the only possible trust anchor, and the site hides them.
- **No privacy policy, no terms, no cookie/data notice** while the form collects PII from worldwide (including EU) visitors and literally promises "Your details stay private." This is GDPR/DPDP exposure, not theater.
- **Fabrications to remove:** the contact-page stock portrait captioned as a team member; invented animated percentages (48%, 59%, 45%) on every service page presented as data; stock photos of strangers under "Founding clients" and "A senior-only studio" pills on the About journey; present-tense claims of an existing worldwide client base ("We partner with founders..." framing in `impactsParagraph` and FAQ 1).
- **Dead credibility props:** four social pills all `href="#"`; nine fake team headshots, three testimonial avatars, and fake client-logo SVGs still publicly served in `public/assets` (one accidental import away from a critical violation).
- **Missing honest trust elements:** founder identity block, entity/location line, privacy/terms, a real booking calendar, verifiable anything (GitHub, LinkedIn, Awwwards submissions).
Founder name - Navneet prasad image - Founder.png i attached firs check and than use 
location - Tech Zone IV, Greater Noida, Uttar Pradesh 201318
India mention karne ki zarrorrat nahi hai hum globally client target kar rahe hai 

## 5. Conversion Optimization Audit (3.5/10)

- **Critical:** every lead submitted through the only conversion form is `console.log`ged and discarded while the UI confirms success and promises a 24-hour senior reply. On serverless hosting the log is ephemeral. This single defect nullifies the entire funnel.
- **The business model contradicts itself three ways on one site:** Pricing section says fixed-price projects; FAQ 4 says "flat monthly subscriptions... pause or cancel... annual billing takes 20% off" and FAQ 5 offers nonexistent "Growth or Scale" plans; the About Retention card sells "month-to-month engagements." A careful buyer cannot tell what they are buying.
- **Pricing is unreachable:** `id="pricing"` has zero inbound links sitewide; it is the 10th of 13 homepage sections; no nav/footer link; the nine service pages never mention price.
- **"Book a Call" has no calendar** anywhere (all booking CTAs are mailto links, one with a phone icon on a brand with no phone).
- **Zero analytics.** No pageview, event, or form tracking of any kind. The site cannot answer which page produces leads.
- **Friction and leaks:** ServicesBand's three qualification rows and "Start a project" pill open the mail client instead of /contact; no budget/timeline fields (ironically your own Arcstone concept sells exactly that pattern); submit button has no pending state (double-submit risk); message field optional; mobile header has no CTA (hamburger only, and the nav auto-hides on scroll); no email capture anywhere so the blog generates zero leads from not-ready-yet visitors; "BE ONE OF OUR FIRST CLIENTS" section has no button; timeline claims disagree (FAQ 6-10 weeks vs pricing card 4-8 weeks); "No retainers" header contradicted by the retainer footnote 80 lines later.

## 6. Technical Audit (5/10; build passes)

- **Security:** `/api/contact` accepts any JSON with no validation, rate limiting, honeypot, or bot protection; POST with an empty body returns `{ok:true}`. No security headers at all (no CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- **Confirmed rendering bug:** `SplitWords` in `lib/anim.tsx` collapses inter-word spaces; the homepage "How we operate" paragraph renders with words run together.
- **Architecture:** 34 of 36 components are client components; first-load JS is 763-832 kB raw on every route (~257 kB gzip), about 5x budget; zero code-splitting; no `next/image` anywhere (27 raw `<img>` tags, 4020x2100 sources served raw with no srcset); raw `<a>` navigation defeats the router.
- **Hygiene:** ESLint 1 error / 29 warnings; duplicate content models (`data.ts` duplicates projects/blog from `lib/pages` with fragile regex-derived slugs, and the homepage blog teaser shows the three oldest posts); the entire application sits on a single create-next-app commit (no history, no remote, no CI); unused imports; `Testimonials.tsx` misnamed; no cache-control headers for 14 MB of static media.
- **SEO infrastructure: none.** No sitemap.ts, no robots.ts (both 404 in the build test), no metadataBase, no canonicals, no JSON-LD (Organization, Service, Article, FAQPage all absent), no title template, all nine service pages share one meta description.

## 7. Visual Design Audit

Covered across sections 1-2. Additional specifics: heading hierarchy is broken on four pages (404 has no h1; contact routing cards use h6; blog lede is an h2 while real section headings are h3); one-off inline font sizes bypass the display scale; the grain overlay adds a permanent compositing layer; four services reuse project cover art, blurring the work/services distinction; the hero's rotating word can clip at 320-375px widths.

## 8. Content Audit (4.5/10)

- **Contradictions are the top issue** (business model x3, timelines, "No retainers", reply-time 24h vs 48h drift).
- **Template residue:** the scope-estimator line "Enter your goals..." on all nine service pages (nothing to enter, no estimator exists); "Story Builders" About hero and generic intro; 404 copy "Oops! This Page Lost Its Power."; "PORTFOLIO PROJECT" ungrammatical eyebrow; sixteen "Core Principles" where row two repeats row one's descriptions verbatim; legacy-tech sub-service lists (a 13-industry CRM directory) that read as SEO keyword stuffing and strain credibility for a founding studio.
- **Unsupported claims:** hero rotates "AI Solutions" with no AI service anywhere; "proven process" claim with zero clients; blog post 2 contains an invented "20-30%" statistic; "Best fit for most" badge implies a client base that does not exist.
- **Small defects:** "dsigning" misspelled in two live asset filenames/URLs; blog categories misassigned on four posts; apostrophe glyphs inconsistent; contact meta description says "talk to sales" against the no-sales-layer promise; nav says "Service/Project" while everything else is plural.

### Copy rewrites (drop-in replacements)

**FAQ 4 (pricing)** replace with:
> Every project is a fixed quote, agreed in writing before work starts. Launch sites begin at $2,400, full websites at $6,000, and products at $15,000. Founding clients keep their launch pricing for 12 months. No hourly billing, no surprises.

**FAQ 5 (after launch)** replace with:
> We do not disappear at go-live. Every project includes a 30-day support window for fixes and refinements. After your first project ships, you can move to a light care retainer for ongoing iterations and monitoring.

**About Retention card** replace with:
> Retention. Earned, not contracted. We win the next project by how the first one ships: honest scope, weekly progress, and a build you fully own.

**Service processNote (all nine pages)** replace with:
> Tell us what you are building. A senior replies within 24 hours with an honest scope, timeline, and fixed quote.

**404 copy** replace with:
> This page does not exist.

**Pricing header** replace "No retainers, no hourly surprises." with:
> Fixed project quotes, agreed in writing before we start. No hourly surprises.

## 9. Mobile Experience Audit (6/10)

The strongest weak area: real hamburger menu, fluid clamp() type, iOS-safe 16px inputs, pointer-gated cursor effects. Remaining defects:

- ServicesBand body copy and diagrams are unreachable on ALL touch tablets (hover-gated behind `md:hidden`).
- Nav overlay contact meta collides with menu links on short/landscape viewports with no scroll fallback; the body scroll lock is unreliable on iOS and does not stop Lenis.
- About Journey images overlap the year headings on phones (verified against actual image dimensions); About values descriptions are completely inaccessible on phones.
- Hero: rotating word clips at 320-375px; the bottom statement can collide with the card on short viewports; the ticker can overlap the headline at 1024-1150px; ~2.6 MB of autoplay video downloads on the mobile homepage with no save-data gate.
- Smaller: no back-to-top on phones, no autocomplete attributes on the form, footer links under 44px touch target, orbit tool names hover-only, vh-based heights jump as browser toolbars collapse, global `overflow-x: clip` masks bugs instead of fixing them.

## 10. Competitor Benchmark

**Enterprise six (TCS, Infosys, Accenture, IBM, Deloitte Digital, Capgemini):** their trust is institutional (Fortune rankings, analyst badges, scale stats, investor relations, research institutes). Their conversion is soft content gravity, not CTA pressure. None publish pricing. Deloitte Digital notably puts the contact form in the hero and humanizes with employee profiles. IBM ships a dedicated /trust page. All have exhaustive legal/privacy layers, industry pages, careers, insights hubs.

**Realistic tier (Instrument, Locomotive, Basic/Dept):** this is your actual bar.
- Instrument: Work/Services/About/Careers/Latest/Contact nav, filterable work grid, "Start a Project" CTA, named newsletter.
- Locomotive: technical craft as marketing (they authored locomotive-scroll, published on Medium/GitHub), trust via provenance ("Founded 2008", named clients), personal tone, direct email/phone conversion.
- Basic/Dept: awards immediately under the hero reel, owned media (podcast with 45k listens/episode), and, crucially, their primary CTA is a plain mailto, proving email-first conversion is legitimate at studio scale when everything around it is credible.

**What Webify is missing that actually matters now:** legal/privacy layer (critical), a real founder identity (critical for a zero-client studio), working lead delivery, OG/social metadata, SEO infrastructure (you literally sell SEO as a service), a booking calendar, owned-audience capture (newsletter), named bylines on blog posts, and internal linking between services/projects/blog.

**What is enterprise theater to skip for now:** careers page, press/awards section (nothing to claim yet; earn Awwwards badges instead), industry landing pages (later SEO play), accessibility statement, region selectors, trust/security pages.

**How to surpass them (realistic, compounding moves):**
1. Win on measurable speed and publish it. Enterprise homepages ship megabytes of consent managers and trackers. After the JS diet, put your Lighthouse scores on the site.
2. Weaponize pricing transparency. Nobody in the benchmark set publishes prices. You already do. Make "Fixed quotes, published floors, no discovery-call gatekeeping" a headline differentiator.
3. Make the founder the trust element. Name, face, two-line bio, real LinkedIn/GitHub, real calendar link. Deloitte spends millions humanizing; you can do it with one honest photo.
4. Turn the site itself into the flagship case study. Teardown series: the luminance-sampling nav, the GSAP choreography, the performance budget. This is Locomotive's exact playbook.
5. Earn badges instead of renting logos: submit the six concept builds to Awwwards, CSSDA, FWA.
6. Own one or two verticals deeply (SaaS dashboards, fintech onboarding) with genuinely useful public teardowns instead of 15 shallow industries.
7. Beat enterprise speed-to-conversation: same-day scoped mini-proposals vs their weeks of RFP routing.
8. Make the absence of sludge explicit once true: "No cookies. No trackers. No account managers."
9. Compound an owned audience before clients exist: a named newsletter fed by bylined posts.

---

## All Issues (Complete Checklist)

### Critical (fix immediately, before anything else)

- [ ] **Wire real lead delivery.** IN PROGRESS (13 Jul 2026): route is production-ready with validation/honeypot/rate-limit and Resend + Web3Forms support; returns honest 503 until the owner provides RESEND_API_KEY or WEB3FORMS_ACCESS_KEY. `/api/contact` only console.logs and discards every submission while the UI confirms success (`src/app/api/contact/route.ts:5-13`). Send via Resend/SES to contact@webify.org.in, persist a backup copy, return non-2xx on transport failure so the existing error fallback triggers.
- [x] **Remove the fake team member.** Stock/AI portrait captioned "Webify team member ready to talk" on the contact page (`ContactSection.tsx:211-217`). Replace with honest imagery or a real founder photo with a real name.
- [x] **Fix the business-model contradictions.** FAQ 4 sells subscriptions, FAQ 5 offers nonexistent "Growth/Scale" plans (`src/lib/data.ts:148-155`), About Retention card sells month-to-month (`src/lib/pages/about.ts:31-38`). Use the rewrites above.
- [x] **Delete the invented percentage stats** (48%, 59%, 45%) animating as data on all nine service pages (`src/lib/pages/service.ts:358-376`). Replace with your real commitments (24h reply, 2 rounds, 30-day support).
- [x] **Add /privacy and /terms pages** and link them from the footer and the form's "your details stay private" microcopy. You collect PII from EU visitors with no legal layer (GDPR/DPDP exposure).
- [ ] **Fix the JS-gated preloader.** The server-rendered opaque overlay hides all content on every route until hydration; without JS the page is permanently black (`Preloader.tsx:50`). Add a noscript/CSS fallback that always lifts the veil.
- [x] **Fix the SplitWords space-collapse bug.** The homepage Impacts paragraph renders with words run together (`src/lib/anim.tsx:23`).
- [x] **Resolve the ® question.** Verify actual trademark registration; if unregistered, strip ® from all copy and re-export the logo artwork without it (s.107 Trade Marks Act exposure; also check clearance given prior "Webify" use).

### High Priority

**Trust & identity**
- [x] Add a founder identity block: name, photo, two-line bio, LinkedIn/GitHub (About page + footer).
- [x] Add entity/location line: "Based in India, working worldwide" plus legal/trading name.
- [x] Fix or remove the four dead social pills (`href="#"`, `data.ts:4-9`); real profiles or nothing.
- [x] Delete fabrication assets from `public/`: 9 fake team photos, 3 testimonial avatars, client-logo SVGs, rekolet logos, 5 Next starter SVGs.
- [x] Remove present-tense client-base claims ("We partner with founders...", FAQ 1 "we work with clients worldwide") or reframe as capability and intent.
- [x] PARTIAL: journey label pills moved off the stock photos (claims no longer overlay strangers). Replacing the photos themselves still needs real studio imagery from the owner.
- [x] Pick ONE brand descriptor; fix "Creative Agency" alt text in Nav and Footer; align metadata, hero, and logo tagline.

**Conversion**
- [ ] Add a real booking calendar (Cal.com) behind every "Book a Call" CTA, or change the verbs to match reality.
- [ ] Add privacy-friendly analytics (Plausible/Fathom/Umami) plus events on form success and CTA clicks.
- [ ] DEFERRED (owner, 13 Jul 2026): public dollar amounts withheld until the first 10 founding projects ship. Pricing section now shows "Fixed Quote" tiers with a Founding 10 framing. Revisit nav link + price anchors when real floors are published.
- [x] Add server-side validation, honeypot, and rate limiting to `/api/contact` (zod schema, field allowlist, length caps).
- [x] Standardize on two CTA labels (one primary, one soft) instead of ten.
- [x] Add a mobile header CTA (compact pill beside the hamburger).
- [x] Route ServicesBand rows and "Start a project" to /contact (optionally with ?topic=) instead of mailto.

**SEO (all absent today)**
- [x] Add `src/app/sitemap.ts` generated from the three content arrays.
- [x] Add `src/app/robots.ts` (allow all, disallow /api/, point to sitemap).
- [x] Set `metadataBase`, add openGraph + twitter blocks, design a 1200x630 OG image.
- [x] Add JSON-LD: Organization + WebSite in layout; Service, Article, BreadcrumbList, FAQPage per page type.
- [ ] Add title template (`%s | Webify`) and rewrite titles around winnable keywords ("Fixed-Price Web Design & Development" beats "Service - Webify").
- [x] Add canonicals (`alternates: { canonical: './' }` after metadataBase).
- [x] Unique meta description per service page (use each `service.blurb`; the copy already exists).

**Performance**
- [x] PARTIAL: blog cards, index thumbs, and founder photo on next/image (fill + sizes); GSAP-animated media kept as <img> with lazy/priority hints (converting them needs visual QA of the parallax effects). Remaining: hero-adjacent and service imagery.
- [x] Replace all internal `<a>` with `next/link` (also fixes the ESLint error and full-page reloads).
- [ ] Cut first-load JS from ~800 kB toward 150 kB: server components for static sections, dynamic imports below the fold, isolate animation in leaf client components.
- [ ] Gate the About page's ~2.1 MB of autoplay video with the ServiceListing pattern; serve a smaller mobile hero rendition and respect save-data.
- [ ] Subset the 344 kB Inter variable font to latin (~230 kB saving on the critical path).

**Accessibility (WCAG 2.2 AA)**
- [ ] Add a pause/stop control for autoplaying content (~14 videos/marquees/tickers; SC 2.2.2).
- [ ] Fix contrast on blue sections (measured 1.53:1 to 3.56:1; use pure white on #0051ff; SC 1.4.3).
- [ ] Honor `prefers-reduced-motion` in Lenis, CSS marquees, and remaining GSAP timelines (use `gsap.matchMedia()`).
- [ ] Add a skip-to-content link.
- [x] Trap focus in the mobile menu; set page content inert while open; restore focus on close.
- [ ] Announce form success/error with `role="status"` / `role="alert"` (SC 4.1.3).

**Mobile**
- [ ] Make ServicesBand content reachable on touch tablets (capability query, not width query).
- [ ] Fix the nav overlay collision on short/landscape viewports (scrollable flex column).

**Process**
- [x] PARTIAL: full working state committed, CI workflow at .github/workflows/ci.yml (runs tsc + eslint + build on push/PR). Remote still needed: owner must create the GitHub repo.
- [ ] Fix the ESLint gate (1 error, 29 warnings).

### Medium Priority

**Brand & assets**
- [x] Rename the package from "rekolet" to "webify"; regenerate lockfile.
- [ ] Export a wordmark-only logo variant for nav/footer size; reserve the full lockup for large use.
- [ ] Rework the lockup so the tagline clears the y descender; define clear-space and minimum-size rules.
- [ ] Re-export the icon flat (remove the baked drop shadow); align icon and wordmark languages or scope the icon to app-icon use only.
- [ ] Re-export icon variants with identical trim boxes; align logo black (#101010) with the ink token (#000000).
- [ ] Create SVG masters for wordmark and icon.
- [x] Add `manifest.ts` (name, theme #0051ff) and themeColor viewport export.

**Copy & content**
- [x] Remove "AI Solutions" from the hero rotator (or add a real AI service).
- [x] Replace the scope-estimator line on all nine service pages (rewrite above).
- [x] PARTIAL: all 16 texts now distinct and matched to their headings. Cutting the count to 4-6 is an editorial call for the owner.
- [x] Align timeline claims (FAQ vs pricing card vs service page) to one source of truth.
- [x] Fix the "No retainers" header contradiction (rewrite above).
- [x] Rewrite the shared service-overview body and its "proven process" claim.
- [x] Rewrite the About hero ("Story Builders") and intro in the studio voice.
- [x] Trim the legacy-tech sub-service directory to what you actually build with.
- [x] Fix blog post 2's invented "20-30%" statistic; reassign the four misassigned blog categories.
- [ ] Reframe "Craft at a Glance" so it does not imply existing client engagements.
- [x] RESOLVED differently (owner, 13 Jul 2026): owner prefers not to lead with "India" since targeting is global. Full studio address (Tech Zone IV, Greater Noida, UP 201318) now in the footer, founder block, legal pages, and JSON-LD instead.
- [x] Change "Best fit for most" to an honest recommendation ("Our recommended starting point").
- [x] Fix the contact meta description ("talk to sales" contradicts the no-sales-layer promise).

**UX & UI**
- [x] Enforce the no-arrow rule: ServicesAccordion, ProjectsIndex, ProjectSingle, ContactSection ArrowBadge.
- [x] Sweep grey body text to pure white/black per the standard (footer links, offer cards, Approach, blog meta, scrub-words).
- [x] Add a conversion CTA to /project index, project detail pages, and the end of /about.
- [x] Add "Claim founding-client rates" CTA after the founding-offers grid.
- [x] Move CtaBand after Blog so the homepage ends on the ask.
- [x] Add submit pending state (disabled + "Sending..."); make the message field required.
- [x] PARTIAL: optional timeline select added. Budget select deliberately skipped while public pricing is withheld (would leak price levels).
- [ ] Add email capture (end of articles + footer) once delivery infrastructure exists.
- [ ] Consolidate to one container utility; snap arbitrary radii to tokens.
- [x] Extract one RollingText component; render all CTA pills through PillButton; add focus/active/disabled states to PillButton.
- [x] Fix Values tooltips (click-to-expand or static grid; currently clipped and touch/keyboard-unreachable).
- [ ] Give /service its own FAQ set (currently verbatim duplicate of home).
- [x] Wrap whole home blog cards in the link (currently image-only).

**Technical**
- [x] Add security headers in `next.config.ts` (CSP, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy).
- [x] Delete duplicate content models in `data.ts`; import canonical slugs from `lib/pages`; fix the stale homepage blog teaser (shows the three oldest posts).
- [ ] Replace Nav's per-scroll-frame `elementsFromPoint` + `getComputedStyle` sampling with ScrollTrigger section markers.
- [ ] Replace paint-heavy scrubbed filters (blur/brightness) with compositor-friendly opacity overlays.
- [x] Add `loading="lazy"` to below-fold images (until next/image lands).
- [ ] Expose the Lenis instance; make ScrollTop use `lenis.scrollTo(0)`; stop Lenis when the mobile menu opens; skip Lenis under reduced motion.
- [x] PARTIAL: hero word clamp floor lowered to 30px; Journey overlap fixed (label pill in flow). Hero statement/card collision on short viewports still open.
- [ ] Darken gray-mid token to pass 4.5:1; fix placeholder contrast; mirror hover reveals with focus.
- [x] Main landmarks added to /project, /project/[slug], 404; heading hierarchy fixed (404 h1, contact cards h2, blog lede p + sections h2, Journey years h3, FoundingOffers single h2).
- [x] Fix inverted blog article heading semantics (lede as `<p>`, sections as `<h2>`).
- [ ] Add internal linking: related work on service pages, service-used on projects, contextual links in posts.

### Low Priority

- [x] Rename `Testimonials.tsx` to `FoundingOffers.tsx`; remove unused imports; refresh stale comments.
- [x] Standardize "Services"/"Projects" plural across nav, footer, metadata.
- [ ] Remove or wire the dead anchors (#pricing, #contact, #work).
- [x] Rename the "dsigning" asset files; fix the reused blog hero image in post 2.
- [ ] Machine-readable blog dates (`<time dateTime>`, ISO in data, Article JSON-LD dates).
- [ ] Blog category filter into the URL (?category=).
- [ ] Footer services column: generate from the services array (currently lists 5 of 9).
- [x] `generateMetadata` fallback titles for unknown slugs ("Project Not Found - Webify").
- [x] Cache-Control headers for /assets (max-age=31536000 immutable).
- [ ] Stop the Brands orbit rAF when off-screen; remove its dead animation classes and false cursor-pointer.
- [x] fetchPriority="high" + preload for each page's LCP image.
- [x] Pre-render the grain overlay to a tiled image; consider disabling on small screens.
- [ ] Reserve width for the rotating hero word (micro-CLS); preload both nav logo variants.
- [ ] Instantiate Lenis only for fine pointers.
- [ ] aria-controls on accordions; aria-current on nav links; aria-label on the overlay nav; sr-only names in repeated "View" links; aria-hidden on decorative videos; aria-live count on blog filter.
- [ ] Visible required-field markers; autocomplete attributes (given-name, organization, email).
- [ ] Focus-visible outlines on form fields (replace outline-none border-color-only); scroll-padding-top for the fixed header.
- [ ] Show ScrollTop on mobile; footer link touch targets to 44px; orbit tool names visible on touch.
- [ ] svh instead of vh for media heights.
- [ ] Count-up numbers render real values without JS (animate from 0 on trigger instead).
- [ ] Nav active state for nested routes (startsWith matching); mobile overlay active-route indication.
- [ ] Guard sessionStorage in try/catch; remove suppressHydrationWarning from body and fix root causes.
- [x] Typographic apostrophes everywhere; blog index eyebrow duplicating the h1; "PORTFOLIO PROJECT" eyebrow; 404 heading to h1; Methodology grammar alignment.
- [x] Reply-time copy: "Reply within 24 hours, intro call within 48."
- [x] PARTIAL: phone icon swapped for a calendar glyph. Location card still links to /about (kept: it now lands on the founder block, a reasonable destination).
- [ ] Hero: surface the outcome visibly (the "win clients" claim lives only in sr-only text); align sr-only and visible claims.
- [ ] Four services reusing project artwork: source distinct service imagery.
- [ ] Global overflow-x: clip: keep, but fix the offenders it hides.
- [ ] Marquee hover color on non-interactive Credibility text: remove or make real links.
- [ ] Preloader: shorten under 1s; skip for deep-link/paid arrivals once analytics exists.

---

## Enterprise Roadmap

### Phase 1: Foundation (Week 1; effort: 2-3 days; impact: existential)
Fix everything that loses leads or lies. Wire lead delivery + validation + spam protection. Remove the stock "team member" portrait. Fix the FAQ/About business-model copy. Delete the invented percentages. Resolve ®. Fix the preloader no-JS black screen and the SplitWords bug. Commit the repo, add CI.
**Expected impact:** the funnel actually works; the honesty positioning becomes true everywhere.

### Phase 2: Branding (Weeks 2-3; effort: 3-5 days design + sweep; impact: high)
One descriptor everywhere. Wordmark-only nav variant. Rework the lockup (descender, clear space), flat icon re-export, SVG masters, one black. Delete all template/fabrication assets, rename the package. OG image + manifest + theme color. Fix "Creative Agency" alts.
**Expected impact:** coherent first impression on every surface including shares and browser chrome.

### Phase 3: Website Excellence (Weeks 3-6; effort: 1-2 weeks eng; impact: high)
next/link + next/image migrations. Server-component restructure toward the 150 kB budget. Reduced-motion + contrast + focus + skip-link + focus-trap accessibility pass. Grey-text and arrow-rule sweeps. Container/radius consolidation. Mobile collision fixes. Security headers. Cache headers.
**Expected impact:** Core Web Vitals you can publish; WCAG AA defensible; the craft claim becomes verifiable.

### Phase 4: Trust & Authority (Weeks 4-8; effort: 2-4 days + ongoing; impact: very high for a zero-client studio)
Founder identity block with real photo, bio, LinkedIn/GitHub. "Based in India, working worldwide." Privacy + Terms. Real social profiles (or remove pills). Bylines on blog posts. Submit the six concept builds to Awwwards/CSSDA/FWA. Publish the site teardown series (nav luminance sampling, GSAP choreography, performance budget).
**Expected impact:** replaces the missing client logos with the only honest trust currency available: a real person and verifiable craft.

### Phase 5: Lead Generation (Weeks 6-10; effort: 3-5 days; impact: very high)
Cal.com behind every Book a Call. Analytics + form/CTA events. Pricing in the nav; "From $2,400" anchors on service pages. Budget/timeline selects. Newsletter capture (end of articles + footer). CTAs on project pages and /about. Mobile header CTA. Route ServicesBand to /contact.
**Expected impact:** every page has a next step; you can finally measure which ones work.

### Phase 6: Marketing (Months 2-4; effort: ongoing, ~1 day/week; impact: compounding)
Full SEO layer (sitemap, robots, JSON-LD, titles, canonicals, internal linking). Keyword-real titles around "fixed-price" modifiers. Pick 1-2 verticals from the Credibility marquee and publish genuinely useful public-product teardowns. Named newsletter. Syndicate bylined posts to the real social profiles.
**Expected impact:** organic discovery starts compounding; the studio owns an audience before it owns a client list.

### Phase 7: Automation (Months 3-5; effort: 2-4 days; impact: medium)
Lead persistence + CRM (even a structured inbox/sheet). Auto-acknowledgment email restating the 24h/48h promises. Same-day scoped mini-proposal template. Pre-deploy check that fails on unreferenced person/logo assets. CI gates: tsc, eslint, build, Lighthouse budget.
**Expected impact:** the 24-hour promise survives busy weeks; regressions cannot ship.

### Phase 8: Scaling (Months 4-8; effort: content-led; impact: high)
Convert the first real projects into full case studies with real metrics (replacing concept builds one by one, keeping the honest labeling pattern). First real testimonials. Publish Lighthouse scores and the "No cookies. No trackers. No account managers." trust block once verifiably true.
**Expected impact:** the zero-client story graduates into an early-proof story without ever having faked anything.

### Phase 9: Enterprise Readiness (Months 8-14; effort: moderate; impact: unlocks bigger buyers)
Security/practices page (real posture: headers, data handling, ownership handover). Accessibility statement backed by the Phase 3 work. Industry landing pages for the 1-2 proven verticals. Careers page only when hiring is real. Formal trademark registration if the name clears.
**Expected impact:** passes the checklists procurement teams and enterprise buyers actually run.

### Phase 10: Becoming a Global Software Brand (Year 2+; impact: the long game)
Owned research (annual "State of fixed-price web engineering" style report: Capgemini's institute pattern at studio scale). Open-source a tool from client work (Locomotive's playbook). Speaking, podcasts, awards juries. Selective team growth with real people on the site. The site remains the flagship case study at every stage.
**Expected impact:** brand gravity: inbound arrives because of what the studio publishes and ships, not because of ads.

---

## Progress Tracker

### Now (Phase 1)
- [ ] Wire contact form delivery (email + backup persistence)
- [x] Add validation, honeypot, rate limiting to the API
- [x] Remove the stock "team member" portrait
- [x] Rewrite FAQ 4/5 and the About Retention card
- [x] Delete the 48/59/45% service-page stats
- [x] Resolve the ® claim
- [ ] Fix the preloader no-JS black screen
- [x] Fix the SplitWords spacing bug
- [x] Ship /privacy and /terms
- [ ] Commit the repo, add remote + CI

### Next (Phases 2-3)
- [x] One brand descriptor everywhere; fix "Creative Agency" alts
- [ ] Wordmark-only nav logo; reworked lockup; SVG masters
- [x] Delete all template/fake assets; rename package to "webify"
- [x] OG image + full social metadata + manifest
- [x] next/link migration (fixes ESLint error)
- [x] next/image migration (partial: safe content images; GSAP media pending visual QA)
- [ ] First-load JS diet toward 150 kB
- [ ] Accessibility pass (skip link, focus trap, contrast, motion pause, announcements)
- [x] Grey-text sweep and arrow-rule sweep
- [ ] Mobile collision fixes (nav overlay, Journey, hero word)
- [ ] Security + cache headers

### Then (Phases 4-6)
- [x] Founder identity block + "Based in India, working worldwide"
- [x] Real social profiles or remove the pills
- [ ] Cal.com booking behind Book a Call
- [ ] Analytics + conversion events
- [ ] Pricing in the nav + price anchors on service pages (DEFERRED until dollar amounts return after the first 10 projects)
- [x] CTAs on /project, /about; mobile header CTA
- [x] sitemap.ts + robots.ts + JSON-LD + title template + canonicals
- [ ] Internal linking between services, projects, blog
- [ ] Newsletter capture + bylined posts
- [ ] Awwwards/CSSDA/FWA submissions
- [ ] Site teardown article series

### Ongoing
- [ ] Replace concept builds with real case studies as projects ship
- [ ] Publish performance scores once the JS diet lands
- [ ] Quarterly re-audit against this checklist

---

## Final Goal

Webify does not become TCS by imitating TCS. It becomes a world-class technology brand by being everything the enterprise six structurally cannot be: fast (publish the scores), transparent (pricing on the page), human (the founder is the trust element), honest (the discipline is already in the codebase; finish enforcing it), and craft-proven (the site itself, torn down in public, is the first case study). Fix the funnel this week, fix the contradictions this month, then let every published project, teardown, and badge compound. The benchmark to beat next year is not Accenture's homepage; it is Instrument's, and this codebase is closer to that than its current 44/100 suggests.
