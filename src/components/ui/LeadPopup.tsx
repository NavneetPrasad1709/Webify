"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { BOOKING_URL } from "@/lib/site";
import { useLeadSubmit } from "@/lib/use-lead-submit";

/**
 * Floating lead capture.
 *
 * The site's only form lives at the end of a page most visitors never reach.
 * Someone who arrived from a profile or a proposal link, read two sections and
 * decided we might be worth a conversation currently has to go looking for the
 * way to say so. This puts it one click away from anywhere.
 *
 * It runs the same delivery pipeline as the contact page through
 * useLeadSubmit, so there is one honeypot, one fallback rule and one set of
 * analytics properties. Only three fields are asked for: the API treats
 * company, service and timeline as optional, and a popup that wants six
 * answers is a popup nobody finishes.
 *
 * Restraint is deliberate. It opens itself once per session, only after the
 * visitor has read something, never on the contact page, and never again once
 * dismissed.
 */

const DISMISS_KEY = "wf-lead-popup";
const AUTO_OPEN_SCROLL = 0.4; // fraction of the page read
const AUTO_OPEN_DELAY_MS = 25000;

export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const autoOpenedRef = useRef(false);

  const { submit, submitted, sending, error } = useLeadSubmit("popup");

  // The contact page is this form, at full size. Two of them is noise.
  const enabled = pathname !== "/contact";

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Storage throws in lockdown modes. Losing the memory of a dismissal is
      // a far smaller problem than the exception it would otherwise raise.
    }
  }, []);

  /* Auto-open once, and only for someone who has actually engaged: either
     they have read 40% of the page or they have been here nearly half a
     minute. A popup that fires on arrival interrupts the one thing the site
     is trying to do. */
  useEffect(() => {
    if (!enabled) return;
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(DISMISS_KEY));
    } catch {
      seen = false;
    }
    if (seen) return;

    let timer = 0;
    const fire = () => {
      if (autoOpenedRef.current) return;
      autoOpenedRef.current = true;
      setOpen(true);
      track("lead_popup_auto_open", { path: pathname });
      cleanup();
    };

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= AUTO_OPEN_SCROLL) fire();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    timer = window.setTimeout(fire, AUTO_OPEN_DELAY_MS);
    return cleanup;
  }, [enabled, pathname]);

  /* Escape closes, Tab stays inside, and focus lands somewhere useful in both
     directions. A panel that traps a keyboard user is worse than no panel. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button, input, textarea"
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    // Locking scroll through an attribute keeps Nav's own body.overflow write
    // for the menu curtain from fighting this one.
    document.documentElement.dataset.popupOpen = "true";
    const id = requestAnimationFrame(() => firstFieldRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.dataset.popupOpen = "false";
      cancelAnimationFrame(id);
    };
  }, [open, dismiss]);

  // The form is replaced by the success message, so focus has to follow it.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    void submit(
      Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    );
  }

  /* The closed panel and the trigger are identical on the server and the
     first client paint, so there is nothing to defer: everything that could
     differ (the dismissal memory, the auto-open) happens inside effects. */
  if (!enabled) return null;

  const field =
    "w-full rounded-lg border border-white/20 bg-white/[0.06] px-3.5 py-3 text-[15px] text-white placeholder:text-white/45 transition-colors duration-200 hover:border-white/35 focus:border-primary-lite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-lite";

  return (
    <div data-lead-popup-root>
      {/* Blurs the page behind the panel, which turns a floating widget into
          something the visitor has to answer. Clicking it dismisses, so the
          interruption is never a trap. */}
      <div
        aria-hidden="true"
        data-lead-backdrop
        data-open={open}
        onClick={() => {
          dismiss();
          triggerRef.current?.focus();
        }}
        className="fixed inset-0 z-[88] bg-ink/50"
      />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex flex-col items-end gap-3 p-4 md:p-6">
      <div
        ref={panelRef}
        id="lead-popup"
        role="dialog"
        aria-modal={open}
        aria-label="Start a project"
        aria-hidden={!open}
        data-lead-popup
        data-open={open}
        className="pointer-events-auto w-full max-w-[22.5rem] overflow-hidden rounded-2xl border border-white/12 bg-ink shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
      >
        <div className="relative p-5 md:p-6">
          <button
            type="button"
            onClick={dismiss}
            tabIndex={open ? 0 : -1}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/55 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-lite"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {submitted ? (
            <div className="flex flex-col gap-4 py-2">
              <span className="w-max rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                Message sent
              </span>
              <p
                ref={successRef}
                tabIndex={-1}
                className="text-[19px] font-extrabold leading-tight tracking-tight text-white outline-none"
              >
                Got it. A senior replies within 24 hours.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-lite"
              >
                Skip the Wait, Book a Call
              </a>
            </div>
          ) : (
            <>
              <span className="inline-flex rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                Founding project spots
              </span>
              <p className="mt-3.5 pr-6 text-[19px] font-extrabold leading-[1.2] tracking-tight text-white">
                Tell us what you are building.
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
                Three fields, no sales call, no deck. A senior team member
                replies within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5">
                {/* Honeypot: invisible to humans, irresistible to bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="popup-website">Website</label>
                  <input
                    id="popup-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <label htmlFor="popup-first-name" className="sr-only">
                  First name
                </label>
                <input
                  ref={firstFieldRef}
                  id="popup-first-name"
                  name="first-name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="given-name"
                  placeholder="First name"
                  tabIndex={open ? 0 : -1}
                  className={field}
                />

                <label htmlFor="popup-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="popup-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="Email address"
                  tabIndex={open ? 0 : -1}
                  className={field}
                />

                <label htmlFor="popup-message" className="sr-only">
                  What you are building
                </label>
                <textarea
                  id="popup-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={3}
                  placeholder="What are you building?"
                  tabIndex={open ? 0 : -1}
                  className={`${field} resize-none`}
                />

                <button
                  type="submit"
                  disabled={sending}
                  tabIndex={open ? 0 : -1}
                  className="mt-1 min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-lite disabled:pointer-events-none disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>

                {error ? (
                  /* Deliberately not "email us instead": if this failed, the
                     mail path may be what failed. */
                  <p role="alert" className="text-center text-[12.5px] text-white">
                    Something went wrong on our side.{" "}
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={open ? 0 : -1}
                      className="text-primary-lite underline underline-offset-2"
                    >
                      Book a call instead
                    </a>
                    .
                  </p>
                ) : (
                  <p className="text-center text-[12.5px] text-white/60">
                    Takes 30 seconds. Or{" "}
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={open ? 0 : -1}
                      className="text-white/85 underline underline-offset-2 transition-colors duration-200 hover:text-white"
                    >
                      book a 20 minute call
                    </a>
                    .
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>

      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="lead-popup"
        onClick={() => {
          if (open) {
            dismiss();
          } else {
            setOpen(true);
            track("lead_popup_open", { path: pathname });
          }
        }}
        /* The mark alone said nothing: a brand icon in a circle reads as a
           watermark or a chat widget, not as a way to start a project. The
           disc keeps its identity as the left half of a pill, and the label
           does the explaining. Cobalt genuinely vanishes against the cobalt
           band, so the white ring is not decoration: it is what keeps this
           findable there, while reading as a rim on black and an invisible
           halo on white. */
        className="group pointer-events-auto relative flex h-12 items-center gap-2 rounded-full bg-primary py-1.5 pl-1.5 pr-4 ring-2 ring-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_12px_28px_rgba(0,81,255,0.42)] transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_18px_38px_rgba(0,81,255,0.55)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
          {open ? (
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-ink" aria-hidden="true">
              <path
                d="M4.5 4.5l11 11M15.5 4.5l-11 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <img
              src="/assets/brand/webify-icon-light-384.webp"
              alt=""
              aria-hidden="true"
              width={384}
              height={323}
              className="h-4 w-auto"
            />
          )}
          {/* Lime availability marker: the studio is open to work, which is
              the actual reason to press this. Ringed in the pill's own colour
              so it sits on the disc rather than floating over it, and sized
              as a detail rather than a badge asking to be cleared. */}
          {!open ? (
            <span
              data-lead-pulse
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex h-2 w-2"
            >
              <span className="absolute inset-0 rounded-full bg-lime ring-2 ring-primary group-hover:ring-primary-deep" />
            </span>
          ) : null}
        </span>
        {/* Sentence case, not tracked uppercase: same legibility in roughly
            30px less width, and it matches every other CTA on the site. */}
        <span className="whitespace-nowrap text-[13px] font-semibold text-white">
          {open ? "Close" : "Start a Project"}
        </span>
      </button>
      </div>
    </div>
  );
}
