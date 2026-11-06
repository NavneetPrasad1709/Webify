# AI crawler audit

## What was tested (6 Nov 2026, live site)

Each crawler user agent fetched `/`, `/service/custom-software`, `/robots.txt`
and `/sitemap.xml`.

| Crawler | Purpose | Result |
| --- | --- | --- |
| Googlebot | Google Search, AI Overviews, AI Mode | 200, full HTML |
| Google-Extended | Gemini training/grounding control token (not a separate crawler) | robots allows |
| Bingbot | Bing, Copilot, and the index several AI tools draw on | 200, full HTML |
| OAI-SearchBot | ChatGPT search results | 200, full HTML |
| GPTBot | OpenAI model training | 200, full HTML |
| PerplexityBot | Perplexity search | 200, full HTML |
| ClaudeBot | Anthropic | 200, full HTML |

The service page body text (H1 and content) was present in the raw HTML for
every agent. No 403, 429, CAPTCHA or JavaScript challenge was seen.

**Limitation:** these tests used crawler user-agent strings from an ordinary
IP. Vercel's firewall can treat real crawler IPs differently. Confirm in
Bing Webmaster Tools (URL Inspection / Site Scan) and Search Console (URL
Inspection, "Live test") that real crawlers get 200.

## robots.txt now

```
User-Agent: Googlebot, Bingbot, OAI-SearchBot, PerplexityBot  -> Allow: /  Disallow: /api/
User-Agent: *                                                 -> Allow: /  Disallow: /api/
Sitemap: https://www.webify.org.in/sitemap.xml
```

OAI-SearchBot is explicitly allowed, so ChatGPT search can find and cite
public pages.

## GPTBot: your decision

GPTBot collects content that may be used to train OpenAI models. It is
separate from OAI-SearchBot: blocking GPTBot does **not** remove you from
ChatGPT search.

- **Allow (current state):** your public marketing content may be used in
  training. For a marketing site that wants to be known, most agencies allow it.
- **Block:** add a `GPTBot` group with `Disallow: /` in `src/app/robots.ts`.
  No effect on ChatGPT search citations.

Nothing was changed for GPTBot. Same choice applies to Google-Extended (Gemini
training; blocking it does not affect Google Search or AI Overviews).

## llms.txt

`/llms.txt` already existed and lists the services. It is an optional,
unofficial convention; no major search engine has said it uses it for
ranking or citation. Kept as a low-cost experiment, not relied on.
