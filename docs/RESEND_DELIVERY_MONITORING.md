# Resend delivery monitoring and lead storage

Problem being solved: Resend can accept a lead notification (HTTP 200) and
bounce it minutes later. Until now nobody would have known and the lead was
gone. No UI or contact-form behaviour changed.

## How it works now

```
Form submit
  -> /api/contact
       1. lead saved to private Vercel Blob   (survives any email failure)
       2. notification emailed via Resend     tags: kind=lead_notify,   lead=<id>
       3. confirmation emailed to visitor     tags: kind=lead_autoreply, lead=<id>
       4. Resend email ids saved with the lead
Resend, later
  -> /api/resend-webhook  (signed)
       delivered          record only (the only state that means "reached the server")
       bounced/suppressed alert to WEBIFY_LEAD_ALERT_EMAIL, with the full stored lead
       complained         alert, investigate
       delivery_delayed   alert once per email (no repeats), lead included
```

## Files

| File | Purpose |
| --- | --- |
| `src/lib/lead-store.ts` | Private Blob storage: leads, sent ids, events, idempotency markers |
| `src/lib/resend-webhook.ts` | Svix signature verification (node:crypto), tag parsing, email masking for logs |
| `src/app/api/resend-webhook/route.ts` | Webhook endpoint |
| `src/app/api/contact/route.ts` | Stores lead first, tags emails, records Resend ids; `RESEND_API_URL` override for tests |
| `src/app/privacy/page.tsx` | Discloses the stored copy (two sentences, date updated) |
| `scripts/test-resend-webhook.mjs` | End-to-end test with a mock Resend (`npm run test:webhook`) |
| `package.json` | Adds `@vercel/blob` 2.8.2 and the test script |

## Security

- **Signature:** every request is checked against `svix-id`, `svix-timestamp`
  and `svix-signature` over the raw body (HMAC-SHA256 with the base64-decoded
  `whsec_` secret, constant-time compare). Timestamps more than 5 minutes off
  are rejected (replay protection).
- **Secrets:** only in server env vars; nothing is `NEXT_PUBLIC_`.
- **Existing key:** the send-only `RESEND_API_KEY` is reused, not broadened.
  The webhook is created in the Resend dashboard, which needs no API key.
- **Loops:** alert emails are tagged `kind=alert`, and events about them are ignored.
- **PII in logs:** only event type, email id, tag kind, lead id and masked
  recipients (`n***@domain`). Full lead data lives only in the private store.
- **Retries:** 2xx = handled, 4xx = invalid (no retry), 5xx = temporary
  (Resend retries). An event is marked processed only after it is fully
  handled, so a failed alert gets retried rather than skipped.
- **Duplicates:** processed event ids are stored; a repeated id returns 200
  without a second alert. Delay alerts are claimed once per email id.

## Test results (6 Nov 2026, mock Resend, no real email sent)

```
PASS  delivered: 200, no alert
PASS  bounced lead notification: 200 + one alert
PASS  duplicate event id: 200, no second alert
PASS  suppressed: 200 + one alert
PASS  delivery delayed twice: one alert only
PASS  complained: 200 + one alert
PASS  invalid signature: 401, no alert
PASS  stale timestamp (replay): 401
PASS  malformed payload: 400
PASS  event about an alert email: ignored, no loop
PASS  temporary failure: 5xx, then retry succeeds with one alert
PASS  contact form: 200, notification + confirmation tagged with the same lead id
12/12 passed.
```

**Not tested:** the Blob storage path. No store is connected yet, so the tests
ran in the fallback mode (in-memory dedupe, no stored lead). Run the live
check below once the store exists.

**Known limitations:**
- Without a Blob store, alerts cannot include the lead content and duplicate
  protection is per server instance only. The store is required, not optional.
- Delay alerts fire on the first delay event. There is no later check for
  "still undelivered after N hours" (that would need a scheduled job).
- If an alert email itself fails to send for a delay event, the one-time claim
  is already taken, so that specific delay alert is not retried. Bounce,
  suppression and complaint alerts are retried.

## Owner setup (about 10 minutes)

1. **Create the Blob store.** Vercel dashboard > project `webify` > Storage >
   Create > Blob > access **Private** > connect to all environments. Vercel
   adds `BLOB_STORE_ID` automatically (OIDC, no token to copy).
2. **Choose the alert address.** It must be a **different mailbox** from
   `LEAD_INBOX`; otherwise a broken inbox would bounce the alert too. Add
   `WEBIFY_LEAD_ALERT_EMAIL` in Vercel > Settings > Environment Variables
   (Production and Preview).
3. **Deploy** (push to main).
4. **Create the webhook.** Resend dashboard > Webhooks > Add endpoint:
   - URL: `https://www.webify.org.in/api/resend-webhook`
   - Events: `email.delivered`, `email.bounced`, `email.delivery_delayed`,
     `email.suppressed`, `email.complained`
   - Copy the signing secret (`whsec_...`) into Vercel as
     `RESEND_WEBHOOK_SECRET`, then redeploy.
5. **Live check.** Submit the contact form once. In Resend > Webhooks, the
   endpoint should show a `delivered` event with response 200. In Vercel >
   Storage > your store, a `leads/` file should appear.
6. Optional: in Resend, send a test to `bounced@resend.dev` with tags
   `kind=lead_notify` to see a real bounce alert.

Until steps 2 and 4 are done, the endpoint returns 500 to anything calling it
(no secret set) and nothing else changes: the form keeps working as before.
