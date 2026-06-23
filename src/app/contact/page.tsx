import type { Metadata } from "next";
import { Sparkles, Clock, UserCheck, ShieldCheck } from "lucide-react";
import { ContactForm } from "./contact-form";
import { ContactChannels } from "@/components/sections/contact/contact-channels";
import { Faq } from "@/components/sections/faq/faq";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building. Book a free 30-minute scoping call with the senior team that would build it - no obligation, reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

const TRUST = [
  { icon: Clock, label: "Reply within 24h" },
  { icon: UserCheck, label: "Senior-led, end to end" },
  { icon: ShieldCheck, label: "You own the code & IP" },
];

const STEPS = [
  {
    n: "01",
    title: "Send the brief",
    body: "A sentence or two on the product, the goal, and your timeline. Takes 2 minutes.",
  },
  {
    n: "02",
    title: "We reply within 24h",
    body: "A senior reads it - not a bot, not a sales rep. You'll hear back fast.",
  },
  {
    n: "03",
    title: "Free 30-min call",
    body: "We scope it, give you a rough price, and tell you honestly if we're the right fit.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How do we start working together?",
    a: "Send the form or book a call. We'll spend 30 minutes pressure-testing the idea, then come back with a clear scope and an indicative price - usually within 48 hours.",
  },
  {
    q: "What does a typical engagement cost?",
    a: "It depends on scope, but most projects start as a fixed-scope build or an MVP sprint with the price agreed up front before any work begins. We invoice in ₹ or $ and can issue GST-compliant invoices for Indian clients.",
  },
  {
    q: "Who actually does the work?",
    a: "The senior who scopes your project is the one who builds it. No account managers, no junior hand-offs, and no relay of meetings between you and the person writing the code.",
  },
  {
    q: "Do we own the code and IP?",
    a: "Yes - completely. Your repositories, your accounts, your data, your IP, from day one. No proprietary lock-in and nothing held hostage when the engagement ends.",
  },
  {
    q: "Do you work with teams outside India?",
    a: "Yes. We work with founders and teams in India and worldwide, async-first, and overlap working hours where it matters.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact - Webify",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.email,
      url: siteConfig.url,
    },
  };

  return (
    <main className="relative overflow-hidden pb-28 pt-32 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(60%_45%_at_50%_-8%,var(--accent-glow),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-[35vh] h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-[20vh] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.1),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[var(--size-container)] px-6 sm:px-10">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl text-center">
          <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-1)] px-4 py-1.5 text-xs font-medium text-neutral-300">
            <Sparkles className="h-3.5 w-3.5 text-accent-hi" aria-hidden />
            Free · No obligation · 30-minute call
          </span>

          <h1 className="animate-fade-in-up mx-auto mt-6 max-w-[16ch] text-balance text-[clamp(2.75rem,8.5vw,5.5rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-neutral-50 [animation-delay:0.1s]">
            Tell us what you&apos;re <span className="script-accent">building</span>.
          </h1>

          <p className="animate-fade-in-up mx-auto mt-6 max-w-[52ch] text-xl leading-relaxed text-neutral-300 sm:text-2xl [animation-delay:0.2s]">
            Book a free 30-minute scoping call with the senior team that would build
            it. We&apos;ll map the work, flag the risks, and give you an honest answer
            on whether we&apos;re the right fit - no pitch deck, no pressure.
          </p>

          <ul className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-base text-neutral-300 sm:text-lg [animation-delay:0.3s]">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent-hi" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </section>

        {/* ── The form (centerpiece) ───────────────────────────────────── */}
        <section className="mx-auto mt-12 max-w-2xl sm:mt-14">
          <div className="relative rounded-[2.4rem] bg-[linear-gradient(135deg,rgba(99,102,241,0.95),rgba(139,92,246,0.75),rgba(34,211,238,0.55))] p-[1.5px] shadow-[0_50px_140px_-40px_rgba(99,102,241,0.6)]">
            <div className="relative overflow-hidden rounded-[2.3rem] bg-[linear-gradient(160deg,#181840_0%,#0f0f1d_55%,#1d1236_100%)] p-7 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_-5%,rgba(99,102,241,0.28),transparent_70%)]"
              />
              <div className="relative">
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-hi">
                  Start your project
                </p>
                <p className="mb-6 text-2xl font-semibold text-neutral-50 sm:text-3xl">
                  Send it over - we&apos;ll take it from here.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Alternative channels */}
          <div className="mt-8 text-center">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              Not into forms? Reach us directly
            </p>
            <ContactChannels className="justify-center" />
          </div>
        </section>

        {/* ── What happens next ────────────────────────────────────────── */}
        <section className="mx-auto mt-24 max-w-5xl sm:mt-28">
          <h2 className="text-center text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-[-0.02em] text-neutral-50">
            What happens <span className="script-accent">next</span>.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="group rounded-3xl border border-[var(--hairline)] bg-[var(--surface-1)] p-7 transition-colors duration-300 hover:border-[color-mix(in_oklab,var(--accent)_40%,transparent)] hover:bg-[var(--surface-2)]"
              >
                <span className="nums text-4xl font-bold text-[color-mix(in_oklab,var(--accent-hi)_70%,transparent)]">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-neutral-50 sm:text-2xl">{s.title}</h3>
                <p className="mt-2 text-pretty text-base leading-relaxed text-neutral-400 sm:text-lg">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl">
          <Faq items={FAQ_ITEMS} />
        </div>
      </div>
    </main>
  );
}
