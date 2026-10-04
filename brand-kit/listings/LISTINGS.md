# Search and directory listings: fields to paste

Everything needed to put Webify into Google, Bing and the four agency
directories that buyers actually browse. Each section is paste-ready.

What is already done in code, with no login needed:

- Sitemap at `https://www.webify.org.in/sitemap.xml`, robots.txt, canonical
  URLs, per-page titles, descriptions and social cards.
- Structured data on every page: Organization, Service, FAQPage, Article,
  BreadcrumbList.
- `llms.txt` at `https://www.webify.org.in/llms.txt` for AI answer engines.
- **IndexNow is live.** Every URL in the sitemap has been submitted to Bing,
  Yandex, Seznam and Naver. Bing's index also feeds ChatGPT search, DuckDuckGo
  and Yahoo. Re-run `npm run indexnow` after any deploy that adds pages.

What cannot be done from code: anything that needs your Google login, a
verification code sent to your phone or address, or a sign-up email.

## Before you start: which email to sign up with

Every address on webify.org.in still hard bounces (see `brand-kit/README.md`).
Directories send a verification email, so sign up with the inbox that works
today and change it to `contact@webify.org.in` once the Zoho fix is done.

---

## 1. Google Search Console (5 minutes, do this first)

This is what gets the new pages into Google fastest.

1. Open https://search.google.com/search-console and sign in.
2. **Add property** → choose **URL prefix** → enter
   `https://www.webify.org.in` (with `www`).
3. Pick the **HTML tag** method. Google shows something like
   `<meta name="google-site-verification" content="AbC123..." />`.
4. **Send Claude the `content` value.** It goes into the site metadata and is
   live after one deploy. Then click **Verify**.
5. **Sitemaps** → submit `sitemap.xml`.
6. **URL Inspection** → paste each of these and click **Request indexing**:
   - `https://www.webify.org.in/`
   - `https://www.webify.org.in/service/custom-software`
   - `https://www.webify.org.in/service/ai-development`
   - `https://www.webify.org.in/service/website-development`
   - `https://www.webify.org.in/about`

## 2. Bing Webmaster Tools (2 minutes, after step 1)

1. Open https://www.bing.com/webmasters.
2. Choose **Import from Google Search Console**. It copies the site and the
   sitemap across with no second verification.

---

## 3. Google Business Profile

The one place a new domain can show up within weeks, for searches near
Greater Noida and Noida.

**Decide one thing first: storefront or service area.** If clients cannot walk
into Tech Zone IV and meet you there, choose **"I deliver goods and services
to my customers"** and **hide the address**. Google suspends profiles that list
an address the business does not actually receive visitors at. Verification
is by video, phone or postcard, sent to you.

| Field | Value |
| --- | --- |
| Business name | `Webify` (nothing added, Google suspends keyword-stuffed names) |
| Primary category | `Website designer` |
| Additional categories | `Software company`, `Internet marketing service` |
| Website | `https://www.webify.org.in` |
| Appointment link | `https://cal.com/navneet-prasad-geein6/intro` |
| Phone | leave empty (none is published, and none may be invented) |
| Service areas | `Greater Noida`, `Noida`, `Ghaziabad`, `Delhi` |
| Hours | your real hours; the site promises evening IST calls for US clients |
| Opening date | `2024` |
| Logo | `brand-kit/linkedin/logo-300x300.png` |
| Cover | `brand-kit/linkedin/cover-1128x191.png` |

### Description (750 characters maximum, this is 687)

```
Webify is a senior-led web, software and AI development company. We design and build websites, custom software, SaaS platforms, AI chatbots and agents, mobile apps, e-commerce stores and CRM systems for founders and growing businesses.

Every project is a fixed quote agreed in writing before work starts, so there is no hourly billing and no surprises. You work directly with the people doing the work, with no account managers and no handoffs.

How we work: a written scope and quote within 3 working days, weekly progress on a live staging link, two revision rounds per deliverable, and 30 days of post-launch support included.

Book a 20 minute call or send a brief at webify.org.in.
```

### Services (add each one, with its page as the link)

| Service | Link |
| --- | --- |
| Website Development | `/service/website-development` |
| Custom Software Development | `/service/custom-software` |
| AI Development | `/service/ai-development` |
| Application Development | `/service/app-development` |
| E-commerce Development | `/service/e-commerce` |
| CRM Development | `/service/crm-system` |
| Branding and UI/UX Design | `/service/branding-design` |
| Landing Page Design | `/service/landing-page` |
| Website Redesign | `/service/redesign` |
| Website Support and Maintenance | `/service/website-support` |
| Search Engine Optimization | `/service/seo` |

Prefix each link with `https://www.webify.org.in`.

### First posts

Post once a week; profiles that post rank better locally. Start with the three
live builds, one per week, each linking to its page under `/project/`.

---

## 4. Agency directories

Clutch, GoodFirms, DesignRush and Sortlist rank their listings by verified
client reviews, so a profile with none will not top their category pages yet.
They are still worth creating now. Each one is a trusted backlink to the site,
which helps it rank in Google, and they are where a buyer checks that the
company is real. Ask every finished project for a review on one of them.

### Shared fields

| Field | Value |
| --- | --- |
| Company name | `Webify` |
| Website | `https://www.webify.org.in` |
| Founded | `2024` |
| Team size | `2-9` (Navneet and Mayank are both named on the site) |
| Headquarters | `Greater Noida, Uttar Pradesh` |
| Logo | `brand-kit/linkedin/logo-300x300.png` |
| Portfolio | Vexel AI, Dental Health, EverGreen Studio, each linked to `/project/<slug>` and to its live URL |
| Key people | Navneet Prasad, Founder & Lead Engineer; Mayank Gautam, Chief Marketing Officer |

**Pricing fields are a decision for you.** Clutch and GoodFirms require a
minimum project size and an hourly-rate band, and both are shown publicly.
The current rule is no public dollar amounts until the first ten founding
projects ship. Either pick the bands you are willing to show, or leave these
two directories until then and do DesignRush and Sortlist first, which let
you leave pricing undisclosed.

### Service focus (where a percentage split is asked)

| Service | Share |
| --- | --- |
| Web development | 35% |
| Custom software development | 25% |
| AI development | 15% |
| Mobile app development | 10% |
| UI/UX design | 10% |
| SEO | 5% |

### Tagline (90 characters)

```
Senior-led web, software and AI development. Fixed-price, built by the people you talk to.
```

### Short description (160 characters maximum, this is 139)

```
Senior-led web, software and AI development. Websites, custom software, SaaS and AI chatbots, fixed-price, built by the people you talk to.
```

### Full description

```
Webify is a senior-led web, software and AI development company working with founders and growing teams worldwide.

We design and build marketing websites, custom software, SaaS platforms, AI chatbots and agents, mobile apps, e-commerce stores and CRM systems. Every project is a fixed quote agreed in writing before work starts, so there is no hourly billing and no surprises.

You work directly with the people doing the work. Navneet Prasad, founder and lead engineer, sets the architecture on every project and builds with Next.js, React, Node.js and modern AI models. Mayank Gautam, Chief Marketing Officer, makes sure each launch is found on Google, cited in AI answers, and chosen once a visitor lands.

How we work:
- A written scope and fixed quote within 3 working days
- Weekly progress on a live staging link, not status emails
- Two structured revision rounds per deliverable
- 30 days of post-launch support included
- Evening IST hours held for calls across US timezones
- You own the code, the data and every account from day one

Our live concept builds are open to click through at webify.org.in/project.
```

### Where to sign up

| Directory | Sign-up page |
| --- | --- |
| Clutch | https://clutch.co/get-listed |
| GoodFirms | https://www.goodfirms.co/get-listed |
| DesignRush | https://www.designrush.com/agency/get-listed |
| Sortlist | https://www.sortlist.com/agency-signup |
