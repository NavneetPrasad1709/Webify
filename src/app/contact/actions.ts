"use server";

import { z } from "zod";
import { siteConfig } from "@/lib/site";

/**
 * Contact form Server Action.
 *
 * Validates with Zod, blocks bots with a honeypot, and delivers via the Resend
 * REST API (no SDK dependency). Set RESEND_API_KEY + CONTACT_TO_EMAIL + EMAIL_FROM
 * to go live; until then it fails gracefully and points the visitor at the email.
 */

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email."),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  // Honeypot: real users never fill this hidden field.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    company_website: String(formData.get("company_website") ?? ""),
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Please fix the highlighted fields.", errors };
  }

  // Honeypot tripped — pretend success, send nothing.
  if (parsed.data.company_website) {
    return { ok: true, message: "Thanks - we'll be in touch shortly." };
  }

  const { name, email, message } = parsed.data;
  const help = formData.getAll("help").map(String).filter(Boolean);

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
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry - ${name}`,
        html: `
          <h2>New website enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${help.length ? `<p><strong>How we can help:</strong> ${help.map(escapeHtml).join(", ")}</p>` : ""}
          ${message ? `<p><strong>Message:</strong></p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>` : ""}
        `,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, message: `Something went wrong - please email ${siteConfig.email} directly.` };
    }
  } catch {
    return { ok: false, message: `Something went wrong - please email ${siteConfig.email} directly.` };
  }

  return { ok: true, message: "Thanks - your message is in. We reply within 24 hours." };
}
