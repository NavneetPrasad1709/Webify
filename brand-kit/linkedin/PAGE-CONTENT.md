# LinkedIn company page: fields to paste

Page is live at **linkedin.com/company/webify-co**. What follows is everything
still to fill in, ready to copy.

Nothing here claims anything Webify cannot show. That matters because the first
thing a prospect does after a cold message is open the page looking for the gap
between the pitch and the proof, and one unverifiable line costs the rest of
the page its credibility.

## About the email requirement

Page creation does **not** need a company-domain email. That requirement
applies later, to the verified badge, job posting and the My Company tab. The
page works without it.

It is still worth fixing, because every address on webify.org.in hard bounces
with `550 5.1.1`, so anyone who emails the address printed on the site gets
nothing. See `brand-kit/README.md`.

---

## Identity

| Field | Value |
| --- | --- |
| Name | `Webify` |
| LinkedIn public URL | `webify-co` (`webify` was taken) |
| Website | `https://www.webify.org.in` |
| Industry | `IT Services and IT Consulting` |
| Company size | see the note below |
| Company type | `Privately Held`, or `Self-Employed` if solo |
| Founded | `2026` |
| Location | `Tech Zone IV, Greater Noida, Uttar Pradesh 201318` |
| Logo | `logo-300x300.png` in this folder |
| Cover | `cover-1128x191.png` in this folder |

**Use the `www` host.** The apex 308-redirects to it, so `https://webify.org.in/`
costs an extra hop and does not match the canonical the rest of the site
declares.

**Company size is a decision, not a field.** The site says "team" on eleven
surfaces and names one person. Pick the answer you can defend on a call and
make the site agree with it. "1 employee" beside a named founder converts
better than an unverifiable "2-10", because a prospect who finds one person
behind a plural claim stops believing everything else on the page.

---

## Tagline

Shows under the name everywhere the page appears. 120 characters maximum.
This one is 104.

```
Senior-led web design and development. You talk to whoever builds it. Websites, SaaS products, web apps.
```

---

## About

2,000 characters maximum. This one is 1,563.

The standard claimed here is high, and every line of it can be checked in ten
seconds by anyone who opens devtools on webify.org.in. That is the whole
difference between this and "Apple-level UI, Amazon-level security": naming the
practice lands harder than borrowing a famous company's reputation, and it
survives the check a serious buyer runs before replying.

```
We build websites, SaaS products and web apps for founders and small teams, to a standard most sites this size never get.

What that means in practice.

Interface. Type, spacing and motion decided rather than defaulted. Every screen tested on a real device, not scaled down in a browser window. Contrast measured against WCAG rather than eyeballed.

Engineering. Next.js, React and TypeScript on Vercel's edge network. Security headers on every route: Content Security Policy, HSTS with preload, frame denial, nosniff, a locked-down permissions policy. Form endpoints with input validation, per-IP rate limiting, header-injection stripping and bot traps, because a contact form is the most attacked thing on a small site.

Performance measured, not claimed. We report the real payload and load time of your deployed site, before and after, and we tell you the number even when it is not flattering.

How we work.

You talk to whoever builds it. The person who writes your scope is on the call when you question it.

A staging URL in the first week, updated as we build, so you watch it happen instead of waiting for a status email.

You own everything. Repo, files and assets, from day one.

Hours: 6:00 pm to 11:00 pm IST is held for calls. That is 8:30 am to 1:30 pm in New York and the start of the working day in San Francisco.

Recent work, all live and open in a new tab:
https://saas.webify.org.in
https://webify-dentist.vercel.app
https://webify-luxory-homes.vercel.app

Founded 2026. Taking a small number of founding projects.

https://www.webify.org.in
```

---

## Specialties

Up to 20. These feed LinkedIn's own search, so they are written the way a
buyer types, not the way a developer talks.

```
Web Design
Web Development
Next.js Development
React Development
SaaS Product Design
Web Application Development
UI/UX Design
Landing Page Design
Ecommerce Development
Shopify Development
WordPress Development
CRM Development
Dashboard Design
Website Redesign
Technical SEO
Website Performance Optimization
Branding
Design Systems
MVP Development
Remote Development Team
```

---

## Custom button

Edit page → Buttons.

| Field | Value |
| --- | --- |
| Button | `Visit website` |
| URL | `https://www.webify.org.in` |

`Contact us` would be the obvious pick and is the wrong one while the domain
mailbox is down.

---

## First three posts

Post from your **personal profile**, then reshare to the page. Personal reach
is many times page reach, and a page with one follower has no distribution at
all on day one.

**1. The teardown.** Pick one live build and write what was hard and what you
decided. Screenshot, three paragraphs, link last. This is the post that proves
you can think, which is the only thing a stranger is trying to work out.

**2. The number.** "This site shipped 931 kB of JavaScript on every route. Here
is what came out and why." The real before and after figures are in AUDIT.md.
Specific numbers travel; opinions do not.

**3. The offer.** Founding-client terms, stated plainly, and what you want back:
an honest testimonial and permission to show the work. No countdown, no
scarcity theatre.

---

## What this page will and will not do

It will not bring clients. Nobody browses company pages. It is what a prospect
opens **after** a message, a proposal or a profile has already interested them,
and its entire job is to survive that check.

The client comes from the personal profile and from outbound. Finish the page
in an hour, then spend the rest of the week on the two things that actually
produce conversations.
