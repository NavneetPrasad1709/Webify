# SEO automation: weekly Search Console report

`scripts/seo-report.mjs` pulls the last 7 settled days of Search Console data
(and the 7 before, for comparison) and writes:

```
reports/seo/<date>/weekly-search-performance.json
reports/seo/<date>/weekly-search-performance.csv
reports/seo/<date>/sitemap-status.json
reports/seo/<date>/weekly-seo-summary.md
```

Read-only scope (`webmasters.readonly`). No dependencies. Credentials and
reports are gitignored (`.seo/`, `reports/seo/`), because this repository is
public.

**Status:** written and the no-credentials path tested. Not yet run against
real data: it needs the one-time consent below.

## One-time setup (about 10 minutes)

1. Go to https://console.cloud.google.com, create a project called
   "Webify SEO" (any name).
2. **APIs & Services > Library** > search "Google Search Console API" > Enable.
3. **APIs & Services > OAuth consent screen** > External > fill app name and
   your email > add yourself as a **Test user**.
4. **Credentials > Create credentials > OAuth client ID** > Application type
   **Desktop app** > Create > **Download JSON**.
5. Save that file as `D:\Webify pro\.seo\client_secret.json`. Never paste its
   contents into chat or commit it.
6. In the project folder run:
   ```
   npm run seo:report
   ```
   It prints a Google link. Open it, sign in with the Search Console owner
   account, approve read-only access. The report is written and a refresh
   token is saved to `.seo/token.json` for next time.

If your property is a URL-prefix property instead of a Domain property, run
with `GSC_PROPERTY=https://www.webify.org.in/ npm run seo:report`.

## Weekly automation (needs your approval first)

A Windows Task Scheduler job can run the report every Monday morning. Not
created, because it changes your operating system's scheduled tasks. When you
want it, ask and it will be created with a log file and duplicate-run guard.

## Bing

The Bing Webmaster API needs an API key from Bing Webmaster Tools (Settings >
API Access). Browser reporting is enough for a site this size, so no Bing
script was built. If you want one later, generate the key and store it in
`.seo/bing.json`.
