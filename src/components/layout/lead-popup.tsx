"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";
import { X, Check, Sparkles, ArrowRight } from "lucide-react";
import { submitLead, type LeadState } from "./lead-actions";
import { lockScroll, unlockScroll, isContactModalOpen } from "@/lib/overlay";

/**
 * First-visit lead magnet. Offers a free 5-minute teardown and captures an email
 * (+ optional site link) wired to Resend. Shows ONCE per visitor (localStorage),
 * never on /contact, and only on real intent: exit-intent on desktop, or a 55%
 * scroll / 25s fallback (covers mobile, which has no exit-intent). Accessible
 * dialog: Escape to close, focus moves to the email field, background inert.
 */
const SEEN_KEY = "webify_lead_seen";
const initial: LeadState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send me the teardown"}
      {!pending && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </button>
  );
}

export function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(submitLead, initial);
  const emailRef = useRef<HTMLInputElement>(null);

  // Decide when to surface the popup (once per visitor).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === "/contact") return;
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      return;
    }

    let fired = false;
    let engaged = false; // has the visitor shown any interest (scrolled)?
    const fire = () => {
      if (fired) return;
      // Never stack on top of the contact modal - one dialog at a time.
      if (isContactModalOpen()) return;
      fired = true;
      setOpen(true);
      cleanup();
    };
    const onMouseOut = (e: MouseEvent) => {
      // Cursor leaves through the top of the viewport = exit intent.
      if (!e.relatedTarget && e.clientY <= 0) fire();
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const ratio = window.scrollY / max;
      if (ratio > 0.1) engaged = true;
      if (ratio > 0.55) fire();
    };
    // If a CTA opens the contact modal, the popup stands down for this visit.
    const onContactOpen = () => {
      fired = true;
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      cleanup();
    };
    // Fallback timer fires only if the visitor actually engaged (scrolled) -
    // a blind timer on an idle page reads as spam.
    const timer = window.setTimeout(() => {
      if (engaged) fire();
    }, 40000);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("webify:open-contact", onContactOpen);
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("webify:open-contact", onContactOpen);
    }
    return cleanup;
  }, [pathname]);

  const markSeen = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const close = () => {
    setOpen(false);
    markSeen();
  };

  // Focus the email field + wire Escape-to-close when shown. Lock body scroll so
  // the page can't scroll behind the dialog on mobile.
  useEffect(() => {
    if (!open) return;
    lockScroll();
    const id = requestAnimationFrame(() => emailRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
    // close is stable enough for this open/escape lifecycle; re-running on every
    // render (its only other dep) would needlessly re-bind the listener.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Once submitted successfully, don't show again.
  useEffect(() => {
    if (state.ok) markSeen();
  }, [state.ok]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Free website teardown"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      <div className="animate-fade-in-up relative w-full max-w-md overflow-hidden rounded-card border border-border bg-card p-7 shadow-e2 sm:p-8">
        {/* accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_-10%,var(--accent-glow),transparent_60%)]"
        />
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="relative">
          {state.ok ? (
            <div className="py-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                <Check className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-neutral-50">On its way 🎉</h2>
              <p className="mt-2 text-neutral-300">{state.message}</p>
              <button
                onClick={close}
                className="mt-6 text-sm font-semibold text-accent-hi hover:text-white"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-300">
                <Sparkles className="h-3.5 w-3.5 text-accent-hi" aria-hidden />
                Free · No pitch · 5 min
              </span>

              <h2 className="mt-5 text-balance text-[clamp(1.6rem,5vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-50">
                Want a free <span className="script-accent">teardown</span> of your site?
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-neutral-300">
                Drop your email and your site or app link. We&apos;ll send back a
                5-minute Loom with the highest-impact fixes to win more customers -
                no strings, no sales call.
              </p>

              <form action={formAction} className="mt-6 space-y-3">
                {!state.ok && state.message ? (
                  <p role="alert" className="text-sm text-red-300">
                    {state.message}
                  </p>
                ) : null}
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-input border border-white/12 bg-white/3 px-4 py-3.5 text-base text-neutral-50 placeholder:text-neutral-500 transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-(--accent-glow)"
                />
                <input
                  name="website"
                  type="text"
                  inputMode="url"
                  placeholder="yoursite.com (optional)"
                  className="w-full rounded-input border border-white/12 bg-white/3 px-4 py-3.5 text-base text-neutral-50 placeholder:text-neutral-500 transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-(--accent-glow)"
                />
                {/* Honeypot */}
                <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="lead_company_website">Leave empty</label>
                  <input id="lead_company_website" name="company_website" tabIndex={-1} autoComplete="off" />
                </div>
                <SubmitButton />
                <p className="text-center text-[11px] text-neutral-500">
                  Reply within 24h. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
