/**
 * Contact form lead intake.
 *
 * Delivery: set ONE of these env vars and leads are emailed to the studio
 * inbox; with neither set the route returns 503 so the form shows its
 * honest "email us directly" fallback instead of a false success.
 *   - RESEND_API_KEY        (resend.com; sends via the Resend API)
 *   - WEB3FORMS_ACCESS_KEY  (web3forms.com; forwards to the account inbox)
 *
 * Abuse protection: field allowlist + validation, a honeypot field bots
 * fill ("website"), and per-IP rate limiting (in-memory per instance).
 */

const INBOX = "contact@webify.org.in";

const LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const LIMIT_MAX = 5; // submissions per IP per window
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
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
  if (!lead.firstName || !lead.companyName) return null;
  if (!EMAIL_RE.test(lead.email)) return null;
  if (lead.message.length < 10) return null;
  return lead;
}

function leadText(lead: Lead): string {
  return [
    `Name: ${lead.firstName}`,
    `Company: ${lead.companyName}`,
    lead.projectType && `Needs: ${lead.projectType}`,
    lead.timeline && `Timeline: ${lead.timeline}`,
    `Email: ${lead.email}`,
    "",
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");
}

async function deliver(lead: Lead): Promise<"sent" | "unconfigured" | "failed"> {
  const subject = `New project inquiry from ${lead.firstName} (${lead.companyName})`;

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Webify Leads <onboarding@resend.dev>",
        to: [INBOX],
        reply_to: lead.email,
        subject,
        text: leadText(lead),
      }),
    });
    return res.ok ? "sent" : "failed";
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

export async function POST(req: Request) {
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
