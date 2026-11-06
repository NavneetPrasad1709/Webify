# Final owner verification

Date: 6 Nov 2026. Scope: close the outstanding production-readiness items.
No UI, layout, styling or DNS changes were made. Secrets were checked
without being printed.

Status key: **Verified complete** · **Pending owner action** · **Failed** ·
**Not accessible** · **Not applicable**

## Summary

| # | Item | Status |
| --- | --- | --- |
| 1a | Lead recipient configured | Verified complete |
| 1b | Sending domain SPF / DKIM / bounce MX | Verified complete |
| 1c | DMARC | Verified complete (present), weak policy, see note |
| 1d | Test email reached the inbox | **Pending owner action** |
| 1e | Resend delivery events (delivered / bounced) | Not accessible (send-only key) |
| 1f | Async bounce handling | **Failed** (gap, see below) |
| 2 | Resend API key security | Verified complete |
| 3 | AI privacy statement | Pending owner action (wording qualified) |
| 4 | Google Search Console | Not accessible (DNS verification record present) |
| 5 | Bing Webmaster Tools | Not accessible |
| 5b | Bing AI Performance | Not accessible |
| 6 | Report wording on delivery | Verified complete (corrected) |

## 1. Contact email delivery

**How a lead travels.** Browser form → `POST /api/contact` (server) → Resend
API → recipients in the `LEAD_INBOX` environment variable (set in Vercel;
falls back to contact@webify.org.in if unset). The visitor also gets a
confirmation email. If the server cannot hand the lead to Resend it returns
502/503 and the browser re-sends the lead through Web3Forms, so a server
failure does not lose the lead or show a fake success.

**DNS (checked against Google DNS 8.8.8.8):**

| Record | Value found | Verdict |
| --- | --- | --- |
| SPF, `send.webify.org.in` (Resend return path) | `v=spf1 include:amazonses.com ~all` | Correct for Resend |
| Bounce MX, `send.webify.org.in` | `feedback-smtp.us-east-1.amazonses.com` | Correct |
| DKIM, `resend._domainkey` | Public key present | Correct |
| SPF, root | `v=spf1 include:zohomail.in include:amazonses.com ~all` | Fine |
| DMARC, `_dmarc` | `v=DMARC1; p=none;` | Present but monitor-only, and no `rua` so no reports are collected |
| MX, root | Zoho (mx/mx2/mx3.zoho.in) | Inbound mail goes to Zoho |
| DKIM for Zoho | Not found at common selectors (`zmail`, `default`, `zoho`) | Only affects mail you send from Zoho; enable it in Zoho Mail admin |

**The four delivery states, and what this site can see today:**

| State | Meaning | Visible to the site? |
| --- | --- | --- |
| Accepted | Resend took the message (HTTP 200) | Yes, this is what the form test proved |
| Delivered | Receiving server accepted it | Only in the Resend dashboard |
| Bounced | Receiving server rejected it after acceptance | Only in the Resend dashboard |
| Failed | Resend refused it (HTTP 4xx/5xx) | Yes, server returns 502 and the form falls back |

**Gap (Failed):** a lead that Resend accepts and then bounces is lost
silently: the visitor saw success and nobody is alerted. This has happened
before on this domain (brand-kit/README.md records the earlier bounces). Fix options, both
need your approval:
- Resend webhook for `email.bounced` / `email.delivery_delayed` posting to a
  small route that emails a second inbox, or
- Check the Resend dashboard (Emails tab) weekly.

**Your action:**
1. Search your lead inbox, **including Spam and Promotions**, for
   "Claude audit test" (sent 6 Nov 2026).
2. Open https://resend.com/emails, find that message, and read its status:
   `delivered`, `bounced` or `delayed`.
3. Optional hardening: change DMARC to
   `v=DMARC1; p=quarantine; rua=mailto:contact@webify.org.in` after a week
   of clean reports. **DNS change: not made, needs your approval.**

## 2. Resend API key security: Verified complete

| Check | Result |
| --- | --- |
| Stored as server-side env var | Yes, `process.env.RESEND_API_KEY`, read only in `src/app/api/contact/route.ts` (server route) |
| `.env*` files tracked by git | None; `.env.local` is gitignored |
| Key in any committed file, any branch, full history | Not found (exact match and `re_` pattern) |
| Key in built frontend JS (`.next/static`) | Not found |
| Key in `public/` | Not found |
| `NEXT_PUBLIC_` exposure | None |
| Lead inbox address in the public repo | Not found |

No rotation needed. The Web3Forms access key **is** in client code on
purpose: Web3Forms keys are designed to be public and can only submit to
your form.

## 3. AI privacy statement: Pending owner action

The site itself uses no AI provider (no OpenAI, Anthropic or Google AI code
or packages). The statement is a promise about future client projects, which
the AI page says use Anthropic, OpenAI and Google.

Provider terms differ: the paid APIs of all three state that customer data is
not used for training by default, but Google's **free** Gemini API tier may
use data to improve products. The FAQ now reads:

> We build on paid business API plans, where Anthropic, OpenAI, and Google
> state that customer data is not used to train their models by default. Free
> consumer tiers can differ, so we confirm the exact provider terms for your
> project in writing before any data is shared.

**Your action:** confirm you will only use paid API plans for client data. If
you plan to use other providers or free tiers, say so and the line will be
changed. Provider terms change; re-check before each AI project.

## 4. Google Search Console: Not accessible

Evidence available without login: a `google-site-verification` TXT record
exists on webify.org.in, which is how a Domain property is verified. Sitemap
is valid (36 URLs, all 200). **Not verified:** that the property exists in
your account, sitemap submission, indexing status. No indexing is claimed.
Steps: `SEARCH_CONSOLE_SETUP.md`.

## 5. Bing Webmaster Tools: Not accessible

No Bing verification file or meta tag (normal if imported from Google). Import
status, sitemap status and AI Performance availability could not be checked.
No citation data is claimed. IndexNow submission of all 36 URLs returned
200 OK on 6 Nov 2026. Steps: `BING_WEBMASTER_SETUP.md`,
`AI_PERFORMANCE_REPORT.md`.

## Changes made in this pass

| File | Change |
| --- | --- |
| `src/lib/pages/service.ts` | AI data-training answer limited to paid plans, free tiers flagged (text only) |
| `docs/FINAL_WEBSITE_AUDIT.md` | "Accepted and delivered" corrected to "accepted by Resend; inbox delivery not verified" |
| `docs/FINAL_OWNER_VERIFICATION.md` | This file |
