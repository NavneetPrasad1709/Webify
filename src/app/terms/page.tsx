import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Webify website.",
  alternates: { canonical: "/terms" },
};

// Functional baseline terms for the marketing site. Project work is governed by
// the separate signed agreement for each engagement. Have counsel review.
const UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--size-container)] px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <article className="mx-auto max-w-[70ch]">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400">Legal</p>
        <h1 className="mt-5 text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-neutral-50">
          Terms of Service
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Last updated {UPDATED}
        </p>

        <div className="mt-12 space-y-8 leading-relaxed text-neutral-300 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-100 [&_p]:mt-3">
          <section>
            <h2>Acceptance</h2>
            <p>
              By using {siteConfig.url.replace(/^https?:\/\//, "")} you agree to these
              terms. If you do not agree, please do not use the site.
            </p>
          </section>
          <section>
            <h2>The website</h2>
            <p>
              This site presents information about {siteConfig.name} and its services.
              Content is provided for general information and may change without
              notice. Nothing here is a binding offer or a guarantee of a specific
              result.
            </p>
          </section>
          <section>
            <h2>Engagements</h2>
            <p>
              Any project we take on is governed by a separate written agreement that
              defines scope, price, timelines, ownership, and confidentiality for that
              engagement. Those terms - not this page - control the work we do
              together.
            </p>
          </section>
          <section>
            <h2>Intellectual property</h2>
            <p>
              The site&apos;s brand, text, and design are owned by {siteConfig.name}.
              Work product created for a client is owned by the client as set out in
              that engagement&apos;s agreement.
            </p>
          </section>
          <section>
            <h2>Liability</h2>
            <p>
              The site is provided &ldquo;as is.&rdquo; To the extent permitted by law,
              {" "}
              {siteConfig.name} is not liable for any loss arising from use of the
              site or reliance on its content.
            </p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Email{" "}
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
