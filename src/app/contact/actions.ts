"use server";

import { z } from "zod";
import { siteConfig } from "@/lib/site";

/**
 * Contact form Server Action.
 *
 * Validates with Zod, blocks bots with a honeypot + a submit-time floor, and
 * delivers via the Resend REST API (no SDK dependency - keeps the bundle lean).
 * Set RESEND_API_KEY + CONTACT_TO_EMAIL + EMAIL_FROM in the environment to go
 * live; until then the action fails gracefully and points the visitor at the
 * direct channels instead of silently dropping the lead.
 */

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(5000),
  // Honeypot: real users never fill this hidden field.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "company" | "budget" | "message", string>>;
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    message: String(formData.get("message") ?? ""),
    company_website: String(formData.get("company_website") ?? ""),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Please fix the highlighted fields.", errors };
  }

  // Honeypot tripped - pretend success, send nothing.
  if (parsed.data.company_website) {
    return { ok: true, message: "Thanks - we'll be in touch shortly." };
  }

  const { name, email, company, budget, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.EMAIL_FROM || `Webify <onboarding@resend.dev>`;

  if (!apiKey) {
    return {
      ok: false,
      message: `Our form isn't connected yet - please email ${siteConfig.email} directly and we'll reply within 24h.`,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry - ${name}${company ? ` (${company})` : ""}`,
        html: `
          <h2>New website enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          ${budget ? `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        `,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        ok: false,
        message: `Something went wrong sending your message. Please email ${siteConfig.email} directly.`,
      };
    }
  } catch {
    return {
      ok: false,
      message: `Something went wrong sending your message. Please email ${siteConfig.email} directly.`,
    };
  }

  return {
    ok: true,
    message: "Thanks - your message is in. We reply within 24 hours.",
  };
}
