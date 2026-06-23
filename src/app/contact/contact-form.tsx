"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";
import { submitContact, type ContactState } from "./actions";

const initial: ContactState = { ok: false, message: "" };

const HELP_OPTIONS = [
  "Web development",
  "Mobile app",
  "AI solutions",
  "SaaS development",
  "Digital marketing",
  "SEO",
  "Branding",
  "Other",
];

const labelCls = "mb-1.5 block text-sm font-semibold text-[#131313]";
const fieldCls =
  "w-full border-b-2 border-[#131313]/25 bg-transparent pb-2 pt-1 text-base text-[#131313] placeholder:text-[#131313]/45 transition-colors focus:border-[#131313] focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-xl bg-[#131313] px-6 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Let's get started!"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="flex items-start gap-4 rounded-2xl border-2 border-[#131313]/15 bg-[#131313] p-7 text-white" role="status">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c4f24a] text-[#131313]">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-lg font-semibold">Message received</p>
          <p className="mt-1 text-white/80">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {!state.ok && state.message ? (
        <p role="alert" className="rounded-lg bg-[#131313] px-4 py-2.5 text-sm font-medium text-[#c4f24a]">
          {state.message}
        </p>
      ) : null}

      <div>
        <label htmlFor="name" className={labelCls}>
          Your name
        </label>
        <input id="name" name="name" autoComplete="name" required placeholder="Jane Doe" className={fieldCls} />
        {state.errors?.name ? <p className="mt-1 text-xs font-medium text-red-800">{state.errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" className={fieldCls} />
        {state.errors?.email ? <p className="mt-1 text-xs font-medium text-red-800">{state.errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Tell us a little about the project
        </label>
        <textarea id="message" name="message" rows={3} placeholder="What you're building, the goal, and your timeline…" className={`${fieldCls} resize-y`} />
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-[#131313]">How can we help?</legend>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {HELP_OPTIONS.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2.5 text-[15px] text-[#131313]">
              <input
                type="checkbox"
                name="help"
                value={opt}
                className="h-4 w-4 shrink-0 rounded border-2 border-[#131313]/40 accent-[#131313]"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />
    </form>
  );
}
