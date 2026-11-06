# AI visibility tracker

No AI platform offers an API that reports who it recommends, so this is a
manual monthly test. **No test has been run yet; there is no baseline.** Do
not record a result you did not see.

## How to test (30 minutes, first Monday of each month)

1. Use a logged-out or fresh browser profile so personal history does not bias answers.
2. Ask each question below, word for word, on each platform.
3. Record the row. Screenshot anything where Webify appears.

Platforms: ChatGPT (search on), Perplexity, Gemini, Microsoft Copilot, Google
(note whether an AI Overview appears).

## Question set

1. Which company can build my SaaS product?
2. I need someone to build my startup MVP. Who should I hire?
3. Best custom software development company in India
4. Which agency can build a web application for my business?
5. Best AI automation agency for small businesses
6. I want to build a custom CRM for my company. Who can do it?
7. Who can develop an AI chatbot trained on our documents?
8. Software development company for startups in India
9. How much does it cost to build a SaaS MVP? (informational; watch for citations)
10. What should a SaaS MVP include? (target of the new article)

## Log

| Date | Platform | Q# | Webify mentioned? | Cited URL | Competitors named | Relevant? | Change vs last |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

## Signals that complement this log

- Vercel Analytics custom event `ai_referral` (added this release): fires once
  per session when a visitor arrives with `utm_source=chatgpt.com` or from
  perplexity.ai, gemini.google.com, copilot.microsoft.com or claude.ai.
- `lead_submitted` events now carry an `ai` property, so AI-referred
  enquiries can be counted.
- Bing Webmaster Tools AI Performance report (Copilot and partner experiences
  only; sampled). See AI_PERFORMANCE_REPORT.md.
