# Keyword research and keyword-to-URL map

## Evidence and limitations

No keyword tool (Ahrefs, Semrush, Google Keyword Planner) or Search Console
data was available in this session. **No search volumes, difficulty, CPC or
rankings are stated here.** Keywords were chosen from:

1. The buyer questions in the owner's brief.
2. The services Webify actually sells (`src/lib/pages/service.ts`).
3. Common commercial modifiers ("company", "agency", "cost", "in India").

Validate priorities once Search Console has 4 to 8 weeks of query data
(`npm run seo:report`), and with Google Keyword Planner (free with a Google
Ads account).

## Map: one primary intent per URL

| Primary phrase | Intent | Audience | Priority | Target URL |
| --- | --- | --- | --- | --- |
| SaaS development company | Commercial | Founders, product teams | High | /service/saas-development |
| MVP development company / agency | Commercial | Early founders | High | /service/saas-development |
| How long does it take to build a SaaS MVP | Informational | Founders | Medium | /blog/what-a-saas-mvp-needs-on-day-one |
| What should an MVP include | Informational | Founders | Medium | /blog/what-a-saas-mvp-needs-on-day-one |
| Custom software development company | Commercial | SMB owners, ops leads | High | /service/custom-software |
| Business management software development | Commercial | SMB owners | Medium | /service/custom-software |
| AI automation agency / AI development company | Commercial | SMBs, operators | High | /service/ai-development |
| AI chatbot trained on our data | Commercial | Support teams | Medium | /service/ai-development (FAQ) |
| Custom CRM development | Commercial | Sales teams | Medium | /service/crm-system |
| Custom CRM vs ready-made CRM | Informational | Sales leads | Medium | /service/crm-system (FAQ), future article |
| Website development company | Commercial | All | Medium (very competitive) | /service/website-development |
| Web application development company | Commercial | Product teams | Medium | /service/custom-software |
| Mobile app development company | Commercial | Founders | Low to medium | /service/app-development |
| Software development company India | Commercial, regional | Indian SMBs, foreign buyers | Medium | / (homepage) |
| SaaS / custom software / AI automation "in India" | Commercial, regional | As above | Medium | Matching service page; "India" is in the homepage description and schema, not repeated in every title |
| Webify / Webify agency | Navigational | Anyone who heard the name | High | / |

## Cannibalisation rules applied

- SaaS (product sold to customers) and custom software (internal business
  system) now have separate pages and separate titles. Custom-software's item
  "Web Applications & SaaS Platforms" was renamed "Web Applications & Business
  Systems".
- "Web application development" is served by custom-software, not a new page.
  A separate page would be near-duplicate content.
- No country landing pages (no local teams outside India).

## Long-tail questions to answer next (see SEO_CONTENT_STRATEGY.md)

How much does SaaS development cost; custom software cost factors; how to
choose a software development company; questions to ask before hiring an
agency; custom CRM vs HubSpot-style CRMs; AI automation for small business;
how to outsource product development safely.

Cost-factor answers already live as FAQs on 7 service pages (no prices,
consistent with the no-public-prices rule until 10 projects ship).
