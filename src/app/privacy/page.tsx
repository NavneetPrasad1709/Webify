import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Webify collects, uses, and protects the information you share with us.",
  alternates: { canonical: "/privacy" },
};

// Functional baseline policy - accurate to how the site works today. Have
// counsel review before relying on it for a regulated/enterprise engagement.
const UPDATED = "June 2026";

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--size-container)] px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <article className="mx-auto max-w-[70ch]">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400">Legal</p>
        <h1 className="mt-5 text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-neutral-50">
          Privacy Policy
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Last updated {UPDATED}
        </p>

        <div className="mt-12 space-y-8 leading-relaxed text-neutral-300 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-100 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <section>
            <h2>Who we are</h2>
            <p>
              {siteConfig.name} is a senior-led software and AI product engineering
              studio. This policy explains what information we collect through{" "}
              {siteConfig.url.replace(/^https?:\/\//, "")} and how we use it.
            </p>
          </section>
          <section>
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Information you give us.</strong> When you submit the contact
                form or email us, we receive your name, email address, and anything
                you choose to include (company, budget, project details).
              </li>
              <li>
                <strong>Basic usage data.</strong> Standard server and analytics logs
                (such as pages viewed and approximate region) that help us keep the
                site fast and secure.
              </li>
            </ul>
          </section>
          <section>
            <h2>How we use it</h2>
            <p>
              Solely to respond to your enquiry, scope potential work, and improve the
              site. We do not sell your data, and we do not send marketing email
              without your consent.
            </p>
          </section>
          <section>
            <h2>Who we share it with</h2>
            <p>
              Only the service providers that operate this site and our email (for
              example, our hosting and transactional-email providers), strictly to
              deliver your message to us. They process data on our behalf under their
              own security commitments.
            </p>
          </section>
          <section>
            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct, or delete the personal information you
              have shared at any time by emailing{" "}
              <a className="text-accent-hi underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>
              Questions about this policy? Email{" "}
              <a className="text-accent-hi underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
