# Final website audit: verification of the external review

Date: 6 Nov 2026. An external review of the live site listed P0/P1 issues.
Each was checked against the live site (www.webify.org.in) and the code
before anything changed. Owner rule for this pass: **no UI changes**. Only
text, data and invisible code were touched.

Architecture, routes, design baseline and the full technical findings are
in `MASTER_WEBSITE_AUDIT.md` and `TECHNICAL_SEO_AUDIT.md`.

## Issue-by-issue verdict

| # | Reported issue | Verified on live site | Action |
| --- | --- | --- | --- |
| P0 | Homepage numbers $3,690 / $120,423 / 40,780 / 98,340 | **Already fixed.** 0 occurrences in live HTML (decorative mockup values, removed in commit f8bc172) | None |
| P0 | Project pages show 0 / 0% / 0-tap | **Confirmed.** Counters shipped "0" in HTML and counted up in JS, so crawlers, AI tools and slow phones saw 0 | Fixed: real values in HTML, browser rewinds to 0 only to animate; reduced-motion users see the final value. Same look |
| P0 | AI Development overview is generic branding text | **Already fixed.** Live page has its own "AI That Does One Job Well" overview | None |
| P0 | Custom Software overview is generic | **Already fixed.** Live page has "Stop Running The Business In Spreadsheets" | None |
| P0 | "Most of our clients have never met us" | **Already fixed.** 0 occurrences live | None |
| P0 | Homepage blog shows 2024 posts | **Not an issue.** Homepage sorts by date and shows the newest 3, including the 6 Nov 2026 article. The other two are the next newest | None |
| P1 | Founding / copyright years | Est. 2024 consistent everywhere (owner's choice). Copyright was a fixed "2024" | Copyright now "2024 to current year", computed at build |
| P1 | About page repeated principles | Each value appears twice in HTML because the marquee renders a second copy for the infinite scroll. The copy is already `aria-hidden` and `inert` (correct pattern) | Intentional, left unchanged |
| P1 | Team proof | Only Navneet Prasad and Mayank Gautam are verified on the site | Not changed. "5+ team" is not published until names and roles are supplied |
| P1 | AI privacy claim "Your data is not used to train public models" | Too broad as a blanket promise | Reworded: on the business API plans used, providers do not train on customer data by default, and exact terms are confirmed per project in writing. **Owner: confirm this matches each provider you use** |
| P1 | Time-zone claim | **Wrong today.** Said 6 to 11 pm IST = 8:30 am to 1:30 pm New York, true only in US summer time. In November it is 7:30 am to 12:30 pm. An earlier line also said "daytime hours for clients in India", but 6 to 11 pm is evening in India | Now states both seasons; India line removed |
| P1 | Contact form delivery | Tested on live (see below) | Validation and acceptance work; inbox delivery pending owner check |
| P1 | Budget qualification field | Would add a visible form field (UI change) and contradicts the no-public-prices rule | Not done; flagged for decision |
| P1 | Pricing clarity | Exclusions and payment terms were missing | Pricing FAQ now states milestone payments and that hosting, domains and third-party subscriptions are billed separately |
| P2 | Mobile homepage length | Already reduced 24.7% (live). Within the review's 25 to 35% band in practice | None this pass |
| P2 | Three service families | Grouping the /service listing would change its layout | Not done (UI rule). Homepage already leads with 6 core services |

## Contact form test (live, 6 Nov 2026)

| Case | Expected | Result |
| --- | --- | --- |
| Missing name | Reject | 400 |
| Invalid email | Reject | 400 |
| Message under 10 chars | Reject | 400 |
| Non-JSON body | Reject | 415 |
| Honeypot filled (bot) | Fake success, nothing sent | 200 (by design) |
| Real submission, marked "Claude audit test" | Accepted by Resend | 200: **accepted** by Resend. Inbox delivery **not verified** (pending owner check) |

Server returns non-2xx on delivery failure, and the form then shows its
fallback; there is no fake success for humans. **Unverified:** that the
test email reached the inbox. Resend's 200 means accepted, not delivered, and
the key in this repo is send-only. Check the lead inbox for "Claude audit test".

Booking link (Cal.com) returns 200.

## Verified unchanged

Homepage heights after this pass vs the deployed version: 0 px difference at
390, 768 and 1440; 23 to 26 px at 360, 375 and 430 (one sentence re-wrapping).
No horizontal overflow at any width.

> Correction (6 Nov 2026): an earlier version of this table said "accepted and delivered". An HTTP 200 from Resend means the message was accepted for sending, not that it reached an inbox. See FINAL_OWNER_VERIFICATION.md.
