"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Check,
  AlertCircle,
  User,
  Mail,
  Building2,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { submitContact, type ContactState } from "./actions";

const initial: ContactState = { ok: false, message: "" };

const fieldBase =
  "w-full rounded-xl border border-white/20 bg-white/[0.07] py-3.5 text-base text-neutral-50 placeholder:text-neutral-400 transition-all duration-200 focus:border-[var(--accent)] focus:bg-white/[0.11] focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-[var(--accent-glow)]";
const withIcon = `${fieldBase} pl-11 pr-4`;
const plain = `${fieldBase} px-4`;
const labelCls = "mb-2 block text-base font-medium text-neutral-200";
const iconCls =
  "pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-base font-semibold text-black transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {pending ? "Sending…" : "Send & book my call"}
        {!pending && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        )}
      </span>
      <span className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div
        role="status"
        className="flex items-start gap-4 rounded-2xl border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[linear-gradient(155deg,var(--surface-1),var(--accent-glow))] p-8"
      >
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-xl font-semibold text-neutral-50">Message received</p>
          <p className="mt-1.5 text-neutral-300">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {!state.ok && state.message ? (
        <p
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <div className="relative">
            <User className={iconCls} aria-hidden />
            <input id="name" name="name" autoComplete="name" required className={withIcon} placeholder="Your name" />
          </div>
          {state.errors?.name ? (
            <p className="mt-1.5 text-xs text-red-300">{state.errors.name}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <div className="relative">
            <Mail className={iconCls} aria-hidden />
            <input id="email" name="email" type="email" autoComplete="email" required className={withIcon} placeholder="you@company.com" />
          </div>
          {state.errors?.email ? (
            <p className="mt-1.5 text-xs text-red-300">{state.errors.email}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company <span className="font-normal text-neutral-500">(optional)</span>
          </label>
          <div className="relative">
            <Building2 className={iconCls} aria-hidden />
            <input id="company" name="company" autoComplete="organization" className={withIcon} placeholder="Company / project" />
          </div>
        </div>
        <div>
          <label htmlFor="budget" className={labelCls}>
            Budget <span className="font-normal text-neutral-500">(optional)</span>
          </label>
          <div className="relative">
            <Wallet className={iconCls} aria-hidden />
            <select id="budget" name="budget" className={withIcon} defaultValue="">
              <option value="" disabled>
                Select a range
              </option>
              <option>Under $5k</option>
              <option>$5k-$15k</option>
              <option>$15k-$50k</option>
              <option>$50k+</option>
              <option>Not sure yet</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${plain} resize-y`}
          placeholder="A sentence or two on the product, the goal, and your timeline."
        />
        {state.errors?.message ? (
          <p className="mt-1.5 text-xs text-red-300">{state.errors.message}</p>
        ) : null}
      </div>

      {/* Honeypot - visually hidden, off-screen, not tabbable. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col items-stretch gap-4 pt-1 sm:flex-row sm:items-center">
        <SubmitButton />
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500 sm:text-left">
          Free · No obligation · Reply within 24h
        </p>
      </div>
    </form>
  );
}
