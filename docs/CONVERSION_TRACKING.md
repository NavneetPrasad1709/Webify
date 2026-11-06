# Conversion tracking

Analytics: Vercel Web Analytics (`@vercel/analytics`), already installed and
disclosed in the privacy policy. No GA4 is configured; none was added.
Custom events appear in Vercel > project `webify` > Analytics > Events.

## Events

| Event | Fires when | Properties | Is it a lead? |
| --- | --- | --- | --- |
| `lead_submitted` | Server confirmed delivery of a form submission | `source`, `topic`, `timeline`, `via` (resend/web3forms), `ai` (AI source or none) | **Yes, the only lead event** |
| `lead_failed` | Delivery failed; visitor shown fallback | as above | No |
| `form_start` (new) | First focus on any form field in a session | `from` | No |
| `booking_click` (new) | Click on any Cal.com link | `from`, `label` | No (intent) |
| `cta_click` (new) | Click on any link to /contact | `from`, `label` | No (intent) |
| `work_click` (new) | Click on any link to /project | `from`, `href` | No |
| `ai_referral` | Session starts from ChatGPT (`utm_source=chatgpt.com`), Perplexity, Gemini, Copilot or Claude | `source`, `path` | No |
| `lead_popup_open`, `lead_popup_auto_open` | Floating lead panel opens | `path` | No |
| `route_error` | Error boundary shown | `digest` | No |

New events come from one delegated listener in
`src/components/ui/AiReferral.tsx`; no component markup changed.

## Funnel to watch weekly

1. Visitors (Vercel Analytics)
2. `cta_click` + `booking_click`
3. `form_start`
4. `lead_submitted`

A booking made on Cal.com is not visible to the site. Count bookings from
Cal.com's own dashboard and add them to the weekly number by hand.

## Caveats

- Custom events need a Vercel plan that includes them; if the Events tab is
  empty after a few days of traffic, check the plan.
- Ad blockers hide some analytics; treat numbers as a floor.
- Not yet verified with live traffic: deploy, click a CTA yourself, and
  confirm the event appears.
