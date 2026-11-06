/**
 * Resend delivery webhook: makes sure a bounced lead email is never silent.
 *
 * Register in Resend > Webhooks with this URL:
 *   https://www.webify.org.in/api/resend-webhook
 * Events: email.delivered, email.bounced, email.delivery_delayed,
 *         email.suppressed, email.complained
 *
 * Env (server-side only, never NEXT_PUBLIC_):
 *   RESEND_WEBHOOK_SECRET    signing secret shown by Resend for this endpoint (whsec_...)
 *   WEBIFY_LEAD_ALERT_EMAIL  where alerts go; must be a DIFFERENT mailbox from
 *                            LEAD_INBOX, or a bounce alert can bounce the same way
 *   RESEND_API_KEY           existing send-only key, reused to send alerts
 *
 * Response codes drive Resend's retries: 2xx = done, 4xx = do not retry
 * (bad signature / malformed), 5xx = retry later (temporary failure).
 */

import {
  claimAlert,
  getLead,
  markProcessed,
  recordEvent,
  storageConfigured,
  wasProcessed,
  type StoredLead,
} from "@/lib/lead-store";
import { maskEmail, readTags, verifyResendSignature } from "@/lib/resend-webhook";

const RESEND_API = process.env.RESEND_API_URL || "https://api.resend.com";
const MAX_BODY = 256 * 1024;

const HANDLED = new Set([
  "email.delivered",
  "email.bounced",
  "email.delivery_delayed",
  "email.suppressed",
  "email.complained",
]);

/* Fallback dedupe when no Blob store is connected: per instance, best effort. */
const seen = new Set<string>();
const alerted = new Set<string>();

type ResendEvent = {
  type: string;
  created_at?: string;
  data?: {
    email_id?: string;
    to?: string[] | string;
    subject?: string;
    tags?: unknown;
    bounce?: { type?: string; subType?: string; message?: string };
  };
};

async function sendAlert(subject: string, text: string): Promise<boolean> {
  const to = (process.env.WEBIFY_LEAD_ALERT_EMAIL ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  if (to.length === 0 || !process.env.RESEND_API_KEY) {
    console.error("[resend-webhook] alert NOT sent: WEBIFY_LEAD_ALERT_EMAIL or RESEND_API_KEY missing");
    return true; // configuration gap: retrying will not fix it; logged loudly
  }
  const res = await fetch(`${RESEND_API}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Webify Alerts <alerts@webify.org.in>",
      to,
      subject,
      text,
      // Tagged so this route ignores events about its own alerts (no loops).
      tags: [{ name: "kind", value: "alert" }],
    }),
  });
  return res.ok;
}

function leadBlock(lead: StoredLead | null): string {
  if (!lead) return "The lead record could not be loaded. Check the Blob store for this lead id.";
  return [
    `Name: ${lead.firstName}`,
    `Email: ${lead.email}`,
    lead.companyName && `Company: ${lead.companyName}`,
    lead.projectType && `Needs: ${lead.projectType}`,
    lead.timeline && `Timeline: ${lead.timeline}`,
    `Received: ${lead.receivedAt}`,
    "",
    lead.message,
  ]
    .filter((l) => l !== "")
    .join("\n");
}

export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[resend-webhook] RESEND_WEBHOOK_SECRET is not set");
    return Response.json({ ok: false }, { status: 500 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return Response.json({ ok: false }, { status: 413 });

  const svix = {
    id: req.headers.get("svix-id"),
    timestamp: req.headers.get("svix-timestamp"),
    signature: req.headers.get("svix-signature"),
  };
  if (!verifyResendSignature(raw, svix, secret)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const eventId = svix.id as string;

  let event: ResendEvent;
  try {
    event = JSON.parse(raw);
    if (typeof event?.type !== "string") throw new Error("no type");
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!HANDLED.has(event.type)) return Response.json({ ok: true, ignored: event.type });

  const tags = readTags(event.data?.tags);
  const kind = tags.kind ?? "unknown";
  const leadId = tags.lead && /^[a-zA-Z0-9_-]{8,64}$/.test(tags.lead) ? tags.lead : null;
  if (kind === "alert") return Response.json({ ok: true, ignored: "alert" });

  const emailId = event.data?.email_id ?? "unknown";
  const recipients = ([] as string[]).concat(event.data?.to ?? []);
  const stored = storageConfigured();

  // Idempotency: an event id that was fully handled before is acknowledged.
  try {
    if (stored ? await wasProcessed(eventId) : seen.has(eventId)) {
      return Response.json({ ok: true, duplicate: true });
    }
  } catch (err) {
    console.error("[resend-webhook] storage unavailable, asking Resend to retry", err);
    return Response.json({ ok: false }, { status: 503 });
  }

  console.info(
    `[resend-webhook] ${event.type} email=${emailId} kind=${kind} lead=${leadId ?? "-"} to=${recipients.map(maskEmail).join(",")}`
  );

  try {
    if (stored) {
      await recordEvent(leadId ?? `unlinked/${emailId}`, {
        type: event.type,
        emailId,
        kind,
        recipients,
        at: event.created_at ?? new Date().toISOString(),
        bounce: event.data?.bounce ?? null,
      });
    }

    const lead = stored && leadId ? await getLead(leadId) : null;
    const isNotify = kind === "lead_notify";
    const who = isNotify ? "LEAD NOTIFICATION" : kind === "lead_autoreply" ? "Visitor confirmation" : "Email";
    let alertOk = true;

    switch (event.type) {
      case "email.bounced":
      case "email.suppressed": {
        const verb = event.type === "email.bounced" ? "BOUNCED" : "was SUPPRESSED";
        const reason = event.data?.bounce?.message ?? "No reason given by Resend.";
        const body = isNotify
          ? `A website lead did not reach the lead inbox. The lead is below so it is not lost.\n\nReason: ${reason}\nResend email id: ${emailId}\n\n${leadBlock(lead)}\n\nFix: check LEAD_INBOX in Vercel, and remove the address from Resend's suppression list if it is listed.`
          : kind === "lead_autoreply"
            ? `The confirmation email to a visitor ${verb.toLowerCase()}. Their address may be mistyped; the lead itself was delivered separately.\n\nReason: ${reason}\nResend email id: ${emailId}\n\n${leadBlock(lead)}`
            : `An email ${verb.toLowerCase()}.\nReason: ${reason}\nResend email id: ${emailId}\nRecipients: ${recipients.join(", ")}`;
        alertOk = await sendAlert(`[Webify] ${who} ${verb}`, body);
        break;
      }
      case "email.complained":
        alertOk = await sendAlert(
          `[Webify] Spam complaint on ${who.toLowerCase()}`,
          `A recipient marked an email as spam. Investigate before sending more.\nResend email id: ${emailId}\nRecipients: ${recipients.join(", ")}`
        );
        break;
      case "email.delivery_delayed": {
        // One alert per email, however many delay events Resend sends.
        const first = stored ? await claimAlert(`delayed-${emailId}`) : !alerted.has(emailId);
        if (!stored) alerted.add(emailId);
        if (first && isNotify) {
          alertOk = await sendAlert(
            "[Webify] Lead notification delayed",
            `Resend reports a delivery delay for a lead notification. It may still arrive; the lead is below in case it does not.\nResend email id: ${emailId}\n\n${leadBlock(lead)}`
          );
        }
        break;
      }
      case "email.delivered":
        // Recorded above. This is the only state that means "reached the
        // receiving server"; the original send's HTTP 200 does not.
        break;
    }

    if (!alertOk) {
      console.error("[resend-webhook] alert send failed, asking Resend to retry");
      return Response.json({ ok: false }, { status: 502 });
    }

    if (stored) await markProcessed(eventId);
    else seen.add(eventId);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[resend-webhook] processing failed, asking Resend to retry", err);
    return Response.json({ ok: false }, { status: 503 });
  }
}
