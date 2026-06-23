"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { X, Check, ArrowRight } from "lucide-react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { mailtoHref, whatsappHref } from "@/lib/site";

/**
 * Site-wide contact popup. A capture-phase click listener intercepts ANY link to
 * /contact and opens this modal instead of navigating - so every "Book a call" /
 * "Start a project" CTA across the site opens the same simple form, with no
 * per-button wiring. If JS is off (or the listener misses), the link still works
 * and lands on the real /contact page. Kept deliberately minimal (name + email +
 * one note) so a visitor can fill it in seconds.
 */
const initial: ContactState = { ok: false, message: "" };

const fieldCls =
  "w-full rounded-xl border border-[#131313]/15 bg-[#f6f6f4] px-4 py-3 text-base text-[#131313] placeholder:text-[#131313]/45 transition-colors focus:border-[#131313] focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#131313] px-6 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
      {!pending && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </button>
  );
}

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(submitContact, initial);
  const nameRef = useRef<HTMLInputElement>(null);
  const wa = whatsappHref("Hi Webify - I'd like to talk about a project.");

  // Opt-in only: a CTA opens the popup by dispatching `webify:open-contact`
  // (see the sticky CTA). Regular "Contact us" / "Book a call" links still
  // navigate to the full /contact page - the popup never hijacks navigation.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("webify:open-contact", onOpen);
    return () => window.removeEventListener("webify:open-contact", onOpen);
  }, []);

  // Escape to close + focus the first field on open.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => nameRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Webify"
    >
      <div
        className="animate-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div className="animate-modal-in relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] sm:p-8">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#131313]/50 transition-colors hover:bg-[#131313]/5 hover:text-[#131313]"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        {state.ok ? (
          <div className="py-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c4f24a] text-[#131313]">
              <Check className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-[#131313]">Message received 🎉</h2>
            <p className="mt-2 text-[#131313]/70">{state.message}</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 text-sm font-semibold text-[#131313] underline-offset-4 hover:underline"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <span className="text-xl font-black uppercase tracking-tight text-[#131313]">
              Webify<span className="text-[#4ade80]">*</span>
            </span>
            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] text-[#131313] sm:text-3xl">
              Let&apos;s build your idea.
            </h2>
            <p className="mt-2 text-[#131313]/65">
              Tell us what you&apos;re building - a senior replies within 24h. No
              obligation.
            </p>

            <form action={formAction} className="mt-6 space-y-3.5" noValidate>
              {!state.ok && state.message ? (
                <p role="alert" className="rounded-lg bg-[#131313] px-4 py-2.5 text-sm font-medium text-[#c4f24a]">
                  {state.message}
                </p>
              ) : null}
              <div>
                <input ref={nameRef} name="name" required placeholder="Your name" autoComplete="name" className={fieldCls} />
                {state.errors?.name ? <p className="mt-1 text-xs text-red-700">{state.errors.name}</p> : null}
              </div>
              <div>
                <input name="email" type="email" required placeholder="you@company.com" autoComplete="email" className={fieldCls} />
                {state.errors?.email ? <p className="mt-1 text-xs text-red-700">{state.errors.email}</p> : null}
              </div>
              <textarea name="message" rows={3} placeholder="What you're building (optional)" className={`${fieldCls} resize-y`} />

              {/* Honeypot */}
              <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="modal_company_website">Leave empty</label>
                <input id="modal_company_website" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>

              <SubmitButton />
            </form>

            <p className="mt-4 text-center text-sm text-[#131313]/55">
              or{" "}
              <a href={mailtoHref("Project enquiry")} className="font-semibold text-[#131313] underline-offset-4 hover:underline">
                email us
              </a>
              {wa ? (
                <>
                  {" · "}
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#131313] underline-offset-4 hover:underline">
                    WhatsApp
                  </a>
                </>
              ) : null}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
