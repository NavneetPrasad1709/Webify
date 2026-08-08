/**
 * Contact form lead intake.
 *
 * Delivery: set ONE of these env vars and leads are emailed to the studio
 * inbox; with neither set the route returns 503 so the form shows its
 * honest "email us directly" fallback instead of a false success.
 *   - RESEND_API_KEY        (resend.com; sends via the Resend API)
 *   - WEB3FORMS_ACCESS_KEY  (web3forms.com; PAID plans only, see below)
 *
 * Note: Web3Forms rejects server-side submissions on its free plan ("use our
 * API in client side"), so the contact form posts to Web3Forms directly from
 * the browser using NEXT_PUBLIC_WEB3FORMS_KEY and never reaches this route.
 * This route stays the delivery path for Resend, and for Web3Forms Pro
 * (which allows server-side calls from an allowlisted IP).
 *
 * Abuse protection: field allowlist + validation, a honeypot field bots
 * fill ("website"), and per-IP rate limiting (in-memory per instance).
 */

import { BOOKING_URL, SITE_URL } from "@/lib/site";
import {
  clientConfirmationEmail,
  leadNotificationEmail,
  type LeadEmail,
} from "@/lib/emails";

/**
 * The address printed on the site. Mail to it only arrives once the domain
 * has working email hosting.
 */
const PUBLIC_INBOX = "contact@webify.org.in";

/**
 * Where leads are actually delivered, and the address clients reply to.
 * Deliberately separate from PUBLIC_INBOX: a hard-bouncing recipient loses
 * the lead silently, because Resend accepts the send and only later drops it
 * (the API still answers 200, so the route cannot detect it at request time).
 * Comma-separated; set LEAD_INBOX to a mailbox that receives, and point it
 * back at the public address once the domain's email is live.
 */
const INBOX_LIST = (process.env.LEAD_INBOX ?? PUBLIC_INBOX)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);
const INBOX = INBOX_LIST[0] ?? PUBLIC_INBOX;

const LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const LIMIT_MAX = 5; // submissions per IP per window
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  // Fluid Compute keeps an instance alive across many requests, so an
  // unpruned map grows with every distinct IP for the life of the process.
  for (const [key, seen] of hits) {
    if (now - seen.windowStart > LIMIT_WINDOW_MS) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > LIMIT_WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT_MAX;
}

type Lead = {
  firstName: string;
  companyName: string;
  projectType: string;
  email: string;
  timeline: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strip line breaks so user input can never inject email headers. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

function parseLead(data: Record<string, unknown>): Lead | null {
  const field = (key: string, max: number) => {
    const v = data[key];
    return typeof v === "string" ? oneLine(v).slice(0, max) : "";
  };
  const lead: Lead = {
    firstName: field("first-name", 100),
    companyName: field("company-name", 100),
    projectType: field("project-type", 200),
    email: field("email", 254),
    timeline: field("timeline", 60),
    message:
      typeof data.message === "string" ? data.message.trim().slice(0, 5000) : "",
  };
  // Company is deliberately optional: requiring it turns away the unregistered
  // founder this site exists to reach. Name and a reachable address are enough.
  if (!lead.firstName) return null;
  if (!EMAIL_RE.test(lead.email)) return null;
  if (lead.message.length < 10) return null;
  return lead;
}

function leadText(lead: Lead): string {
  return [
    `Name: ${lead.firstName}`,
    lead.companyName && `Company: ${lead.companyName}`,
    lead.projectType && `Needs: ${lead.projectType}`,
    lead.timeline && `Timeline: ${lead.timeline}`,
    `Email: ${lead.email}`,
    "",
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Shape the templates expect, with sensible text for skipped fields. */
function toEmailLead(lead: Lead): LeadEmail {
  return {
    firstName: lead.firstName,
    companyName: lead.companyName || "Not specified",
    email: lead.email,
    projectType: lead.projectType || "Not specified",
    timeline: lead.timeline || "Not specified",
    message: lead.message,
  };
}

function acknowledgementText(lead: Lead): string {
  return [
    `Hi ${lead.firstName},`,
    "",
    "Thanks for getting in touch. Your message reached us, and a senior team member replies within 24 hours.",
    "",
    `If you would rather talk sooner, pick a time for a free 20 minute intro call: ${BOOKING_URL}`,
    "",
    "What you sent:",
    lead.message,
    "",
    "Navneet Prasad",
    "Founder, Webify",
    INBOX,
  ].join("\n");
}

async function deliver(lead: Lead): Promise<"sent" | "unconfigured" | "failed"> {
  const subject = lead.companyName
    ? `New project inquiry from ${lead.firstName} (${lead.companyName})`
    : `New project inquiry from ${lead.firstName}`;

  if (process.env.RESEND_API_KEY) {
    const send = (payload: Record<string, unknown>) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

    // 1) The lead itself. This one decides whether the request succeeded.
    const res = await send({
      // webify.org.in is a verified Resend domain, so leads arrive from the
      // studio's own address instead of a third-party sender.
      from: "Webify Leads <leads@webify.org.in>",
      to: INBOX_LIST,
      reply_to: lead.email,
      subject,
      text: leadText(lead),
      html: leadNotificationEmail(toEmailLead(lead), SITE_URL),
    });
    if (!res.ok) return "failed";

    // 2) Confirmation to the sender. Best effort: a failed acknowledgement
    //    must never lose a lead that already arrived.
    try {
      await send({
        from: "Webify <hello@webify.org.in>",
        to: [lead.email],
        reply_to: INBOX,
        subject: "Thanks for reaching out to Webify",
        text: acknowledgementText(lead),
        html: clientConfirmationEmail(
          toEmailLead(lead),
          SITE_URL,
          BOOKING_URL,
          INBOX
        ),
      });
    } catch {
      // ignore
    }

    return "sent";
  }

  if (process.env.WEB3FORMS_ACCESS_KEY) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: "Webify Website",
        email: lead.email,
        message: leadText(lead),
      }),
    });
    if (!res.ok) return "failed";
    const body = (await res.json()) as { success?: boolean };
    return body.success ? "sent" : "failed";
  }

  return "unconfigured";
}

/** Nothing legitimate this form sends comes close to this. */
const MAX_BODY_BYTES = 16 * 1024;

export async function POST(req: Request) {
  // Reject before parsing. Buffering an arbitrarily large body first would
  // let an attacker spend the server's memory at no cost to themselves, and
  // it happens ahead of the rate limiter, which cannot help here.
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return Response.json({ ok: false }, { status: 415 });
  }
  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false }, { status: 413 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: humans never see this field; bots fill it. Answer with a fake
  // success so scripts have nothing to learn from.
  if (typeof data.website === "string" && data.website.length > 0) {
    return Response.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const lead = parseLead(data);
  if (!lead) {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    const outcome = await deliver(lead);
    if (outcome === "sent") return Response.json({ ok: true });
    if (outcome === "unconfigured") {
      console.error("[contact-lead] no delivery provider configured; lead NOT delivered");
      return Response.json({ ok: false }, { status: 503 });
    }
    return Response.json({ ok: false }, { status: 502 });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
