/**
 * Accessible FAQ section. Uses native <details>/<summary> so it works without
 * JS, is keyboard-operable, and is announced correctly by screen readers. Emits
 * FAQPage structured data for the same Q&A (rich-result eligible).
 */
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function Faq({
  items,
  heading = "Questions, answered",
  eyebrow = "FAQ",
}: {
  items: FaqItem[];
  heading?: string;
  eyebrow?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section aria-label="Frequently asked questions" className="mt-20 sm:mt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
        {eyebrow}
      </p>
      <h2 className="mt-5 max-w-[18ch] text-balance text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-50">
        {heading}
      </h2>

      <div className="mt-10 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
        {items.map((it) => (
          <details key={it.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-neutral-100 [&::-webkit-details-marker]:hidden">
              {it.q}
              <Plus
                className="h-5 w-5 shrink-0 text-accent-hi transition-transform duration-300 group-open:rotate-45"
                aria-hidden
              />
            </summary>
            <p className="mt-3 max-w-[68ch] text-pretty leading-relaxed text-neutral-400">
              {it.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
