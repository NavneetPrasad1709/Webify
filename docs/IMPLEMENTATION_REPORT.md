# Implementation report

Date: 6 Nov 2026. Not yet deployed. Build and lint pass (0 errors).

## Summary

| Goal | Outcome |
| --- | --- |
| Preserve UI | No colours, fonts, tokens, components, radii, shadows or animations changed. One reused PillButton added; one responsive hide class |
| Shorter mobile homepage | 23,053 to 17,359 px at 375 px (24.7%). 30 to 40% target not reached without removing buyer information |
| Remove duplication | Two duplicate sections off the homepage, five sections condensed |
| Distinct service messaging | 12 service pages each with own problem, approach, fit; 7 new cost-factor FAQs |
| Technical SEO | 37 URLs clean; titles, schema, robots refined |
| AI search readiness | All AI crawlers get 200; OAI-SearchBot explicit; AI referral and AI-lead tracking added |
| Conversion | Unified CTAs; misleading "clients" line removed |
| Reporting | Search Console report script ready; needs one-time consent |

## Content removed from the homepage

- **Founding Offers section:** moved to `/about`. Its four points (direct
  access, founding rates, 30-day support, ownership) already appeared in
  Credibility, Pricing, FAQ and Working Remotely.
- **Brands (tools and ownership) section:** same stack is on `/service`
  (TechStack); ownership is covered in Pricing, FAQ and service FAQs.
- **CTA band (homepage only):** was the middle of three consecutive CTAs.
- **Two How We Ship cards** ("Mobile-First By Default", "Future-Ready"): generic claims.
- **Five services** from the homepage accordion (all remain on /service and in the footer).
- **Third blog preview on phones** (kept on tablet and desktop).

## Content rewritten

- Hero H1 (screen-reader text), rotating words (SaaS Products, Custom
  Software, AI Automation, Web Apps, Websites), card ("Webify is a Product
  Engineering & AI Automation Company"), bottom line ("We build digital
  products that move businesses forward").
- Impacts positioning paragraph: product engineering and AI automation, 31 words.
- How We Ship: 4 numbered steps (scope in writing, design you approve, build
  on a live URL, launch and hand over).
- Pricing: 4 features per tier, Product tier names SaaS, AI and business
  systems, one-line intro and footnote, "USD or INR".
- FAQ: new "What does Webify build?", shorter answers, timelines now include SaaS.
- Working Remotely: one sentence per answer; India daytime hours mentioned;
  "Most of our clients have never met us" removed (implied clients that do
  not exist yet).
- CTAs: "Start a Project" to **Discuss Your Project** (21 places), "View All
  Projects" to **Explore Our Work**.
- Project titles say "Live Build" instead of "Case Study".

## Added

- `/service/saas-development`: full service page using the real Vexel AI
  build as its image and related project; 5 FAQs.
- `/blog/what-a-saas-mvp-needs-on-day-one`: original article, named author, real date.
- Cost-factor FAQs on SaaS, custom software, AI, CRM, e-commerce and app pages.
- `src/components/ui/AiReferral.tsx`: `ai_referral` analytics event; leads tagged with `ai`.
- `scripts/seo-report.mjs` + `npm run seo:report`.
- Schema: founder job title and URL, countries served, more `knowsAbout`.

## Also in this change set (from the earlier request, not yet deployed)

- Footer link hover overlap on two-line labels fixed.
- Scroll jitter: Lenis now runs on GSAP's ticker; scrubbed blur/brightness
  filters replaced with opacity.
- Header blink: both logo variants stay mounted; hide/show needs 12 px of
  travel; colour sampling skipped once scrolled.

## Verified

- `npm run build` and `npm run lint` (0 errors, 22 pre-existing warnings).
- TypeScript `tsc --noEmit` clean.
- Crawl of all 37 sitemap URLs: 200, unique titles/descriptions, canonicals,
  one H1, alt text, valid JSON-LD, 0 broken internal links.
- Live crawler-access test for 7 user agents.
- Before/after screenshots and heights at 360, 375, 390, 430, 768, 1440 px; no
  horizontal overflow.
- Visual check of edited sections at 360 and 1440 px (`docs/screenshots/sections/`).

## Not verified / needs you

1. **Deploy**, then run `npm run indexnow` once.
2. Search Console: confirm property, submit sitemap, request indexing
   (SEARCH_CONSOLE_SETUP.md).
3. Bing: import from Google (BING_WEBMASTER_SETUP.md).
4. OAuth consent for the weekly report (SEO_AUTOMATION_SETUP.md).
5. Decide: GPTBot allow or block (AI_CRAWLER_AUDIT.md).
6. Decide: approve removing the hero card's 0.6 s reveal delay to improve mobile LCP.
7. Confirm or remove the LinkedIn company URL in schema `sameAs`; send the
   founder's LinkedIn URL so it can be linked from /about and schema.
8. "Team: 5+ members" from the brief was **not** published: only two people
   are named on the site. Send names and roles to add them honestly.
9. Run the AI visibility test set once to set a baseline.
10. Re-run PageSpeed Insights on the live URL after deploy (API quota was
    exhausted today; the local Lighthouse runs are not like-for-like).
11. Manually check the hover roll on footer links and scroll smoothness on a
    real phone (headless browsers cannot judge feel).
