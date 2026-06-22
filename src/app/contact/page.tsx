import type { Metadata } from "next";
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
    <main className="mx-auto w-full max-w-[var(--size-container)] px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Left - pitch + channels */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400 sm:text-xs">
            Contact
          </p>
          <h1 className="mt-6 max-w-[14ch] text-balance text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-neutral-50">
            Tell us what you&apos;re <span className="script-accent">building</span>.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-neutral-300">
            Book a free 30-minute scoping call with the senior team that would build
            it. We&apos;ll map the work, flag the risks, and give you an honest
            answer on whether we&apos;re the right fit - no pitch deck, no pressure.
          </p>

          <div className="mt-8">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              Prefer to reach out directly?
            </p>
            <ContactChannels />
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--hairline)] pt-8">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                Response time
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-neutral-100">Within 24 hours</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                Where
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-neutral-100">India &amp; worldwide</dd>
            </div>
          </dl>
        </div>

        {/* Right - the real form */}
        <div className="rounded-[2rem] border border-[var(--hairline)] bg-[var(--surface-1)] p-6 sm:p-9">
          <ContactForm />
        </div>
      </div>

      <Faq items={FAQ_ITEMS} />
    </main>
  );
}
