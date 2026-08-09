"use client";

import { FormEvent, useEffect, useRef } from "react";
import Link from "next/link";
import PillButton from "@/components/ui/PillButton";
import { BOOKING_URL } from "@/lib/site";
import { useReveal } from "@/lib/reveal";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import {
  contactChannels,
  formFields,
  messageField,
  routingCards,
  successMessage,
  timelineField,
} from "@/lib/pages/contact";

/* Inline icon set matching the template's contact cards. */
function ChannelIcon({ icon }: { icon: "calendar" | "email" | "location" }) {
  if (icon === "calendar") {
    return (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5 3.5c.83 0 1.5.67 1.5 1.5v1h8V5c0-.83.67-1.5 1.5-1.5S23 4.17 23 5v1h1.5A3.5 3.5 0 0 1 28 9.5v15a3.5 3.5 0 0 1-3.5 3.5h-17A3.5 3.5 0 0 1 4 24.5v-15A3.5 3.5 0 0 1 7.5 6H9V5c0-.83.67-1.5 1.5-1.5ZM25 13H7v11.5c0 .28.22.5.5.5h17a.5.5 0 0 0 .5-.5V13Zm-13.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          fill="#252525"
        />
      </svg>
    );
  }
  if (icon === "email") {
    return (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.00033 4C5.05481 4 2.66699 6.38781 2.66699 9.33333V22.6667C2.66699 25.6122 5.05481 28 8.00032 28H24.0003C26.9458 28 29.3337 25.6122 29.3337 22.6667V9.33333C29.3337 6.38781 26.9458 4 24.0003 4H8.00033ZM8.55503 9.83456C8.0955 9.52821 7.47463 9.65238 7.16828 10.1119C6.86193 10.5714 6.9861 11.1923 7.44563 11.4987L12.4872 14.8597C14.6146 16.278 17.3861 16.278 19.5134 14.8597L24.555 11.4987C25.0146 11.1923 25.1387 10.5714 24.8324 10.1119C24.526 9.65238 23.9052 9.52821 23.4456 9.83456L18.404 13.1956C16.9485 14.166 15.0522 14.166 13.5966 13.1956L8.55503 9.83456Z"
          fill="#252525"
        />
      </svg>
    );
  }
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 2.66699C22.6274 2.66699 28 7.97296 28 14.5186C28 21.0641 20.5 29.333 16 29.333C11.5 29.333 4.00003 21.0641 4 14.5186C4 7.97296 9.37258 2.66699 16 2.66699ZM16 10.667C13.7909 10.667 12 12.4579 12 14.667C12.0002 16.876 13.791 18.667 16 18.667C18.209 18.667 19.9998 16.876 20 14.667C20 12.4579 18.2091 10.667 16 10.667Z"
        fill="#252525"
      />
    </svg>
  );
}

/* Fields sit on the dark panel below, in the same language as the floating
   popup form: one visual idea for both places a lead can be typed. The UA
   outline is replaced rather than removed, so keyboard users keep a visible
   focus target, and the border clears the 3:1 minimum a control outline has
   to meet where the old #ececec token read at 1.18:1. */
const fieldClasses =
  "w-full min-h-[54px] rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3.5 text-base text-white placeholder:text-white/45 transition-colors duration-200 hover:border-white/35 focus:border-primary-lite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-lite";

const labelClasses =
  "mb-2.5 block font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white";

export default function ContactSection({
  defaultTopic = "",
}: {
  /** Prefills "What do you need?" from /contact?topic= links. */
  defaultTopic?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  /* Delivery is shared with the popup form so the honeypot, the fallback
     gating and the analytics properties cannot drift apart. */
  const { submit, submitted, sending, error } = useLeadSubmit("contact-page");

  // The form unmounts on success, so focus would otherwise fall back to
  // <body> and a keyboard user would lose their place entirely.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  /* Reveals run on IntersectionObserver, not GSAP. This is the page the whole
     site exists to deliver someone to, and it was carrying 121 kB of
     animation library for five fades and a stagger. Delays come from
     --reveal-delay on each element. */
  useReveal(sectionRef);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    void submit(
      Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    );
  }

  return (
    <section ref={sectionRef} className="bg-white text-ink px-5 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mx-auto mb-14 md:mb-24 flex max-w-[775px] flex-col items-center gap-5 text-center">
          <p className="eyebrow">CONTACT</p>
          <h1 data-reveal="" className="contact-title display-1">REACH OUT TODAY</h1>
          <p className="text-base text-black font-medium">
            Tell us about your project. Our team replies within 24 hours.
          </p>
        </div>

        {/* Contact channels: whole card is the action; hover lift + cobalt
            title shift replace the retired arrow badge (no-arrow rule) */}
        <div className="channel-grid grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactChannels.map((c, i) => {
            const inner = (
              <span className="flex items-center gap-5">
                <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-lg bg-white">
                  <ChannelIcon icon={c.icon} />
                </span>
                <span>
                  <span className="mb-1 block text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-primary md:text-xl">
                    {c.label}
                  </span>
                  <span className="block text-base text-ink">{c.value}</span>
                </span>
              </span>
            );
            const cardClasses =
              "channel-card group flex items-center justify-between rounded-2xl bg-fill-light p-5 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:p-6";
            return c.href.startsWith("/") ? (
              <Link key={c.label} href={c.href} data-reveal="" style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties} className={cardClasses}>
                {inner}
              </Link>
            ) : (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                data-reveal="" style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties} className={cardClasses}
              >
                {inner}
              </a>
            );
          })}
        </div>

        {/* How we work - a clear four-step flow so a new client understands
            the engagement at a glance. Cobalt numbered nodes on a connector
            line read as a sequence, not four loose cards. */}
        <div className="mt-16 md:mt-24">
          <div className="mb-10 flex flex-col items-center gap-3 text-center md:mb-14">
            <p className="eyebrow text-primary">HOW WE WORK</p>
            <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              From first message to launch, in four steps
            </h2>
          </div>

          <div className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
            {/* Connector line: runs through the node centers, desktop only */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 bg-border-soft lg:block"
            />
            {[
              ["01", "Intro call", "Reply in 24 hours, call within 48."],
              ["02", "Scope + quote", "Fixed price within 3 working days."],
              ["03", "Design + build", "Weekly sprints with a shared board."],
              ["04", "Launch", "30-day post-launch support included."],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-mono text-lg font-bold text-white shadow-[0_10px_30px_-8px_rgba(0,81,255,0.55)] ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-1">
                  {n}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{t}</h3>
                <p className="mt-2 max-w-[24ch] text-sm font-medium leading-relaxed text-black">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image + form */}
        <div className="contact-content mt-16 md:mt-28 flex flex-col items-stretch justify-between gap-12 lg:flex-row lg:gap-[70px]">
          <div className="w-full max-w-full overflow-hidden rounded-xl bg-fill-light lg:max-w-[548px] self-stretch">
            <img
              src="/assets/about/founder.webp"
              alt="Navneet Prasad, founder of Webify"
              loading="lazy"
              decoding="async"
              data-reveal=""
              className="contact-img h-64 w-full object-cover sm:h-96 lg:h-full"
            />
          </div>

          <div className="flex w-full items-center lg:max-w-[818px]">
            <div className="w-full">
              {/* Rendered unconditionally so the live region exists before its
                  content does. A region created in the same paint as its text
                  is frequently never announced. */}
              <p role="status" aria-live="polite" className="sr-only">
                {submitted ? successMessage : ""}
              </p>
              {/* The fields used to float loose on white, which left them
                  reading as scattered grey boxes beside a photo that did have
                  a card. Giving the form its own ink panel makes it the
                  heaviest object on the page, which is what it should be, and
                  the two columns finally balance. */}
              <div className="rounded-card bg-ink p-6 text-white sm:p-8 md:p-10">
                <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-white/15 pb-6">
                  <p className="eyebrow text-lime">Project brief</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white">
                    2 minutes
                  </p>
                </div>
                {submitted ? (
                <div className="flex flex-col items-center gap-6 py-6 text-center">
                  <span className="w-max rounded-full bg-lime px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                    Message sent
                  </span>
                  <p
                    ref={successRef}
                    tabIndex={-1}
                    className="max-w-[34ch] text-lg font-semibold leading-snug text-white outline-none"
                  >
                    {successMessage}
                  </p>
                  {/* The visitor has already said yes once. This is the
                      cheapest moment on the whole site to ask for the call. */}
                  <PillButton tone="blue" href={BOOKING_URL}>
                    Skip the Wait, Book a Call
                  </PillButton>
                </div>
              ) : (
                <form
                  className="contact-form grid w-full grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2"
                  onSubmit={handleSubmit}
                >
                  {/* Honeypot: invisible to humans, irresistible to bots */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {formFields.map((f) => (
                    <div key={f.id} className={`field-wrap ${f.full ? "md:col-span-2" : ""}`}>
                      <label htmlFor={f.id} className={labelClasses}>
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        maxLength={256}
                        placeholder={f.placeholder}
                        required={f.required}
                        autoComplete={f.autoComplete}
                        defaultValue={f.id === "project-type" ? defaultTopic : undefined}
                        className={fieldClasses}
                      />
                    </div>
                  ))}

                  <div className="field-wrap">
                    <label htmlFor={timelineField.id} className={labelClasses}>
                      {timelineField.label}
                    </label>
                    <select
                      id={timelineField.id}
                      name={timelineField.id}
                      defaultValue=""
                      /* The native dropdown paints its options with system colours, so
                         they have to be told about the dark panel or the list
                         opens as white text on white. */
                      className={`${fieldClasses} cursor-pointer [&>option]:bg-ink [&>option]:text-white`}
                    >
                      <option value="">{timelineField.placeholder}</option>
                      {timelineField.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field-wrap md:col-span-2">
                    <label htmlFor={messageField.id} className={labelClasses}>
                      {messageField.label}
                    </label>
                    <textarea
                      id={messageField.id}
                      name={messageField.id}
                      required
                      minLength={10}
                      maxLength={5000}
                      placeholder={messageField.placeholder}
                      className={`${fieldClasses} min-h-[150px] resize-none`}
                    />
                  </div>

                  <div className="field-wrap mt-2.5 md:col-span-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="block min-h-[54px] w-full cursor-pointer rounded-full bg-primary px-5 py-[15px] font-semibold text-white shadow-[0_10px_28px_rgba(0,81,255,0.35)] transition-[background-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-[0_16px_38px_rgba(0,81,255,0.5)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary-lite disabled:pointer-events-none disabled:opacity-60"
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                    {error ? (
                      /* Deliberately not "email us instead": if this failed,
                         the mail path may be what failed. The calendar is a
                         route that does not depend on our inbox at all. */
                      <p role="alert" className="mt-4 text-center text-sm font-semibold text-white">
                        Something went wrong on our side.{" "}
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-lite underline underline-offset-2"
                        >
                          Book a call instead
                        </a>{" "}
                        and we will pick it up there.
                      </p>
                    ) : (
                      <p className="mt-4 text-center text-[13px] leading-relaxed text-white/70">
                        We reply within 24 hours. Your details are used only to
                        reply, never sold or shared for marketing:{" "}
                        <Link
                          href="/privacy"
                          className="text-white underline underline-offset-2 transition-colors duration-300 hover:text-primary-lite"
                        >
                          privacy policy
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                </form>
              )}
              </div>
            </div>
          </div>
        </div>

        {/* Sales / support routing */}
        <div className="routing-grid mt-16 md:mt-28 grid grid-cols-1 gap-4 md:grid-cols-2">
          {routingCards.map((card, i) => (
            <div
              key={card.number}
              data-reveal=""
              style={{ "--reveal-delay": `${i * 140}ms` } as React.CSSProperties}
              className="routing-card flex flex-col items-start justify-between gap-10 md:gap-[60px] rounded-2xl bg-fill-light p-6 md:p-[30px]"
            >
              <p className="text-base text-ink">{card.number}</p>
              <div className="flex flex-col items-start gap-6 md:gap-[30px]">
                <div className="flex flex-col gap-4">
                  <h2 className="text-[22px] md:text-[26px] lg:text-[30px] font-semibold leading-tight tracking-[-0.02em]">
                    {card.title}
                  </h2>
                  <p className="max-w-[562px] text-base leading-relaxed text-ink">{card.text}</p>
                </div>
                <PillButton tone="dark" href={card.href}>
                  {card.cta}
                </PillButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
