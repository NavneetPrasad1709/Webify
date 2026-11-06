# Bing AI Performance report

## Status

**Not inspected.** It lives inside Bing Webmaster Tools and needs your
login; no browser access was available in this session. No citation numbers
are reported here because none were seen.

## What it is

A report in Bing Webmaster Tools showing how often your pages are cited in
Microsoft Copilot and supported partner AI experiences, which pages are
cited, and the "grounding queries" behind those citations. The data is
sampled and aggregated. It does **not** cover ChatGPT, Gemini or Perplexity,
and there is no public API for it; use the in-tool export.

## How to read it (monthly)

1. Bing Webmaster Tools > webify.org.in > **AI Performance**.
2. Set the range to the last 3 months. Export CSV.
3. Save as `reports/seo/bing-ai-performance-<YYYY-MM>.csv` (gitignored).
4. Note in AI_VISIBILITY_TRACKER.md: total citations, top cited pages, top
   grounding queries.
5. For each grounding query with citations but no matching section on the
   cited page, add a direct answer to that page or plan an article.

A new site with little traffic may show no data at first. That means "not
yet cited or not enough data", not a measured zero.
