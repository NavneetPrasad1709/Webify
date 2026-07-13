"use client";

import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { gsap } from "@/lib/anim";
import PillButton from "@/components/ui/PillButton";
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

const fieldClasses =
  "w-full min-h-[54px] rounded-lg border border-border-soft bg-fill-light px-4 py-3.5 text-base text-ink placeholder:text-gray-deep outline-none transition-colors duration-300 focus:border-primary";

export default function ContactSection({
  defaultTopic = "",
}: {
  /** Prefills "What do you need?" from /contact?topic= links. */
  defaultTopic?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headline load-in
      gsap.fromTo(
        ".contact-title",
        { y: 40, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.1 }
      );

      // Contact channel cards - blur rise, staggered
      gsap.fromTo(
        ".channel-card",
        { y: 40, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".channel-grid", start: "top 85%" },
        }
      );

      // Portrait image - slides down into its clipped frame
      gsap.fromTo(
        ".contact-img",
        { yPercent: -120, scale: 1.2 },
        {
          yPercent: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-content", start: "top 75%" },
        }
      );

      // Form fields - fade in, staggered
      gsap.fromTo(
        ".field-wrap",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
        }
      );

      // Routing cards
      gsap.fromTo(
        ".routing-card",
        { y: 40, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".routing-grid", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setError(false);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      track("lead_submitted");
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section ref={sectionRef} className="bg-white text-ink px-5 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mx-auto mb-14 md:mb-24 flex max-w-[775px] flex-col items-center gap-5 text-center">
          <p className="eyebrow">CONTACT</p>
          <h1 className="contact-title display-1">REACH OUT TODAY</h1>
          <p className="max-w-md text-base text-black font-medium">
            Tell us about your project. Navneet, the founder, replies within 24
            hours.
          </p>
        </div>

        {/* Contact channels: whole card is the action; hover lift + cobalt
            title shift replace the retired arrow badge (no-arrow rule) */}
        <div className="channel-grid grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactChannels.map((c) => {
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
              <Link key={c.label} href={c.href} className={cardClasses}>
                {inner}
              </Link>
            ) : (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                className={cardClasses}
              >
                {inner}
              </a>
            );
          })}
        </div>

        {/* What happens next - process strip */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["01", "Intro call", "Reply in 24 hours, call within 48"],
            ["02", "Scope + quote", "Fixed price within 3 working days"],
            ["03", "Design + build", "Weekly sprints with a shared board"],
            ["04", "Launch", "30-day post-launch support included"],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-xl bg-fill-light p-5">
              <p className="eyebrow text-gray-mid">{n}</p>
              <p className="mt-2 font-semibold text-ink">{t}</p>
              <p className="mt-1 text-sm text-black font-medium">{d}</p>
            </div>
          ))}
        </div>

        {/* Image + form */}
        <div className="contact-content mt-16 md:mt-28 flex flex-col items-stretch justify-between gap-12 lg:flex-row lg:gap-[70px]">
          <div className="w-full max-w-full overflow-hidden rounded-xl bg-fill-light lg:max-w-[548px] self-stretch">
            <img
              src="/assets/about/founder.webp"
              alt="Navneet Prasad, founder of Webify"
              loading="lazy"
              decoding="async"
              className="contact-img h-64 w-full object-cover sm:h-96 lg:h-full"
            />
          </div>

          <div className="flex w-full items-center lg:max-w-[818px]">
            <div className="w-full">
              {submitted ? (
                <div
                  role="status"
                  className="rounded-lg bg-fill-light p-8 text-center text-base font-medium text-ink"
                >
                  {successMessage}
                </div>
              ) : (
                <form
                  className="contact-form grid w-full grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 md:gap-y-[30px]"
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
                      <label htmlFor={f.id} className="mb-3 block font-semibold">
                        {f.label}
                        {f.required && (
                          <span className="text-primary" aria-hidden="true"> *</span>
                        )}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        maxLength={256}
                        placeholder={f.placeholder}
                        required={f.required}
                        defaultValue={f.id === "project-type" ? defaultTopic : undefined}
                        className={fieldClasses}
                      />
                    </div>
                  ))}

                  <div className="field-wrap md:col-span-2">
                    <label htmlFor={timelineField.id} className="mb-3 block font-semibold">
                      {timelineField.label}
                    </label>
                    <select
                      id={timelineField.id}
                      name={timelineField.id}
                      defaultValue=""
                      className={`${fieldClasses} cursor-pointer`}
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
                    <label htmlFor={messageField.id} className="mb-3 block font-semibold">
                      {messageField.label}
                      <span className="text-primary" aria-hidden="true"> *</span>
                    </label>
                    <textarea
                      id={messageField.id}
                      name={messageField.id}
                      required
                      minLength={10}
                      maxLength={5000}
                      placeholder={messageField.placeholder}
                      className={`${fieldClasses} min-h-[146px] resize-y`}
                    />
                  </div>

                  <div className="field-wrap mt-2.5 md:col-span-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="block w-full min-h-[50px] cursor-pointer rounded-full bg-primary px-5 py-[15px] font-semibold text-white transition-colors duration-300 hover:bg-ink disabled:pointer-events-none disabled:opacity-60"
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                    {error ? (
                      <p role="alert" className="mt-3 text-center text-sm font-semibold text-ink">
                        Something went wrong. Email us directly at contact@webify.org.in.
                      </p>
                    ) : (
                      <p className="mt-3 text-center text-sm text-black font-medium">
                        We reply within 24 hours. Your details stay private and
                        are never shared:{" "}
                        <Link
                          href="/privacy"
                          className="underline underline-offset-2 transition-colors duration-300 hover:text-primary"
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

        {/* Sales / support routing */}
        <div className="routing-grid mt-16 md:mt-28 grid grid-cols-1 gap-4 md:grid-cols-2">
          {routingCards.map((card) => (
            <div
              key={card.number}
              className="routing-card flex flex-col items-start justify-between gap-10 md:gap-[60px] rounded-2xl bg-fill-light p-6 md:p-[30px]"
            >
              <p className="text-base text-ink">{card.number}</p>
              <div className="flex flex-col items-start gap-6 md:gap-[30px]">
                <div className="flex flex-col gap-4">
                  <h6 className="text-[22px] md:text-[26px] lg:text-[30px] font-semibold leading-tight tracking-[-0.02em]">
                    {card.title}
                  </h6>
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
