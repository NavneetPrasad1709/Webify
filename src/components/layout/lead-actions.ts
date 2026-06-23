"use server";

import { z } from "zod";
import { siteConfig } from "@/lib/site";

/**
 * Lightweight lead capture for the first-visit popup (free-teardown offer).
 * Email + optional site link, honeypot-protected, delivered via the Resend REST
 * API. Fails gracefully (points the visitor at the real email) until
 * RESEND_API_KEY is configured.
 */

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email."),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  // Honeypot — real users never fill this hidden field.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadState = { ok: boolean; message: string };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = schema.safeParse({
    email: String(formData.get("email") ?? ""),
    website: String(formData.get("website") ?? ""),
    company_website: String(formData.get("company_website") ?? ""),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Please check your email." };
  }
  // Honeypot tripped — pretend success, send nothing.
  if (parsed.data.company_website) {
    return { ok: true, message: "Thanks - we'll be in touch shortly." };
  }

  const { email, website } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.EMAIL_FROM || "Webify <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      ok: false,
      message: `Almost there - email ${siteConfig.email} and we'll send your teardown.`,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New lead - free teardown request (${email})`,
        html: `
          <h2>New lead from the website popup</h2>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${website ? `<p><strong>Site / app:</strong> ${escapeHtml(website)}</p>` : ""}
          <p>They requested a free 5-minute teardown.</p>
        `,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, message: `Something went wrong - email ${siteConfig.email}.` };
    }
  } catch {
    return { ok: false, message: `Something went wrong - email ${siteConfig.email}.` };
  }

  return { ok: true, message: "On its way! We'll send your teardown within 24 hours." };
}
