# SEO performance dashboard

**Status: no performance data collected yet.** Every value below is blank
until a real source fills it. Blank means "not measured", never zero.

## Sources

| Metric | Source | How |
| --- | --- | --- |
| Impressions, clicks, CTR, position, queries, pages, countries, devices | Google Search Console | `npm run seo:report` (after one-time OAuth, see SEO_AUTOMATION_SETUP.md) |
| Indexed pages | Search Console > Pages | Manual monthly |
| Sitemap status | Search Console API | Included in the report |
| Bing clicks, impressions, backlinks | Bing Webmaster Tools | Manual monthly |
| AI citations (Copilot/partners) | Bing Webmaster > AI Performance | Manual export monthly |
| AI referral sessions | Vercel Analytics, event `ai_referral` | Dashboard > Events |
| Leads, and AI-referred leads | Vercel Analytics, event `lead_submitted` (property `ai`) | Dashboard > Events |
| Brand searches | Search Console query "webify" | In the report |
| Core Web Vitals (field) | PageSpeed Insights / Search Console CWV | Monthly; site may not have enough traffic for field data yet |

## Monthly snapshot

| Month | GSC clicks | GSC impressions | Avg pos | Indexed pages | Bing clicks | AI referral sessions | Leads (all / AI) | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Nov 2026 | | | | | | | | Baseline month, changes deployed |

## Lab performance baseline (Lighthouse 12.8.2, 6 Nov 2026, live site)

Mobile: performance 59, LCP 3.2 s, TBT 3,640 ms, CLS 0. Desktop: performance
76, LCP 0.8 s, TBT 420 ms, CLS 0. Lab data, not field data.
