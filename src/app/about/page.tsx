import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Mail } from "lucide-react";
import { FadeUp } from "@/components/sections/cta/fade-up";
import { SparklesTitle } from "@/components/ui/sparkles-title";
import { Magnetic } from "@/components/ui/magnetic";
import { StatCounter } from "@/components/sections/about/stat-counter";
import { siteConfig, mailtoHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior-led, end to end. The people who design and build your product are the people you talk to - no account managers, no junior hand-offs, no agency overhead.",
  alternates: { canonical: "/about" },
};

const STATS = [
  { value: 100, suffix: "%", label: "Code, repos & IP you own" },
  { value: 24, suffix: "h", label: "Typical first response" },
  { value: 1, suffix: "", label: "Senior on it - the one you talk to" },
  { value: 0, suffix: "", label: "Account managers between us" },
];

const PROCESS = [
  {
    n: "01",
    title: "Scope & strategy",
    body: "We get on a call, pressure-test the idea, and lock the one outcome that matters - with a clear plan and a fixed first milestone.",
  },
  {
    n: "02",
    title: "Design & prototype",
    body: "We design the core flow and put a clickable prototype in front of you fast - so we're aligned before a line of production code.",
  },
  {
    n: "03",
    title: "Build in the open",
    body: "Senior-built, shipped in weekly increments you can actually use, with a direct line the whole way. No status-report theatre.",
  },
  {
    n: "04",
    title: "Ship & iterate",
    body: "We launch, watch real usage, and iterate on what moves the numbers. You own everything, from day one.",
  },
];

const VALUES = [
  {
    title: "You talk to the builder",
    body: "No account managers, no telephone game. The senior who scopes the work is the one who writes the code and answers your messages.",
  },
  {
    title: "Outcomes over output",
    body: "Judged on what ships and what it moves - activation, revenue, speed - not on slide decks or hours logged.",
  },
  {
    title: "You own everything",
    body: "Your code, your repos, your accounts, your data. No proprietary lock-in and no hostage situations when the engagement ends.",
  },
  {
    title: "Fast, and in the open",
    body: "Working software every week, progress you can see, and a direct line - not a status report filtered through three layers.",
  },
];

const AGENCY = [
  "Your project routed to whoever's free - often the most junior",
  "Senior in the pitch, juniors on the build",
  "Updates filtered through an account manager",
  "Scope padded to keep a large team billable",
  "Code and accounts you don't fully control",
];

const SENIOR = [
  "One senior, accountable end to end",
  "The person who pitched is the person who builds",
  "A direct line - Slack, call, or email",
  "Lean scope, priced to the outcome",
  "Full ownership: your repos, your accounts, day one",
];

/** /about - studio story + philosophy, built to convert (A1..A5 + trust + process). */
export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About - Webify",
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      description: siteConfig.description,
      knowsAbout: ["AI products", "Web apps", "Mobile apps", "Product design"],
    },
  };

  return (
    <main className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      {/* Ambient hero glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(60%_55%_at_72%_-5%,var(--accent-glow),transparent_70%)]"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative mx-auto w-full max-w-[var(--size-container)] px-6 sm:px-10 lg:px-16">
        {/* A1 - Studio hero */}
        <section aria-label="About Webify">
          <div className="grid gap-10 md:grid-cols-[1.45fr_1fr] md:items-center md:gap-16">
            <div>
              <FadeUp>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-1)] px-3.5 py-1.5 text-xs font-medium text-neutral-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-script)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-script)]" />
                  </span>
                  Currently taking on new projects
                </span>
              </FadeUp>

              <FadeUp delay={0.05}>
                <SparklesTitle
                  as="h1"
                  className="mt-6 max-w-[16ch] text-balance text-[clamp(2.5rem,8vw,5.25rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-neutral-50"
                  beamClassName="mx-0 mr-auto mt-2 max-w-[20rem]"
                  density={50}
                >
                  The senior who <span className="script-accent">builds</span> it is who you talk to.
                </SparklesTitle>
              </FadeUp>

              <FadeUp delay={0.12}>
                <p className="mt-4 max-w-[52ch] text-pretty text-lg leading-relaxed text-neutral-300 sm:text-xl">
                  Webify is a senior-led AI &amp; product engineering studio. You
                  don&apos;t get a sales team and a bench of juniors - you get senior
                  people who have designed, built, and shipped real products, working
                  on yours directly.
                </p>
              </FadeUp>

              <FadeUp delay={0.18}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <Link
                      href="/contact"
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
                    >
                      Book a free call
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link
                      href="/work"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--hairline-strong)] px-8 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/5"
                    >
                      See the work
                    </Link>
                  </Magnetic>
                </div>
              </FadeUp>

              <FadeUp delay={0.24}>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  Free 30-min call · No obligation · Reply within 24h
                </p>
              </FadeUp>
            </div>

            {/* Studio statement card (brand-led; no stock faces, no placeholder). */}
            <FadeUp delay={0.12}>
              <figure className="relative">
                <div className="relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-[var(--hairline)] bg-[var(--surface-1)] p-8 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,var(--accent-glow),transparent_60%)]" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hairline-strong)] text-xl font-black text-neutral-50">
                    W
                  </span>
                  <blockquote className="relative text-balance text-2xl font-semibold leading-[1.15] tracking-[-0.01em] text-neutral-100 sm:text-3xl">
                    We&apos;d rather ship one thing that <span className="script-accent">works</span> than pitch ten that don&apos;t.
                  </blockquote>
                </div>
                <figcaption className="absolute -bottom-5 left-4 right-4 flex items-center justify-between rounded-2xl border border-[var(--hairline-strong)] bg-[var(--surface-2)]/90 px-5 py-3.5 backdrop-blur-md">
                  <span className="text-base font-semibold text-neutral-100">Webify</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-hi">
                    Senior-led studio
                  </span>
                </figcaption>
              </figure>
            </FadeUp>
          </div>
        </section>

        {/* Trust / commitments band */}
        <section aria-label="What you can count on" className="mt-20 sm:mt-28">
          <FadeUp>
            <dl className="grid grid-cols-2 gap-8 rounded-[2rem] border border-[var(--hairline)] bg-[var(--surface-1)] p-8 sm:gap-10 sm:p-12 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </section>

        {/* A2 - Philosophy: why senior-led beats agency */}
        <section
          aria-label="Philosophy"
          className="mt-24 border-t border-[var(--hairline)] pt-16 sm:mt-32 sm:pt-24"
        >
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Philosophy
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="mt-5 max-w-[20ch] text-balance text-[clamp(1.875rem,5.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-neutral-50">
              Why senior-led <span className="script-accent">beats</span> the agency.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-neutral-300">
              Big agencies win on scale and logos. They lose on the thing that
              actually decides whether your product is good: who is doing the work,
              and how directly you can reach them. Here&apos;s the difference, plainly.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
            <FadeUp>
              <div className="h-full rounded-3xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 transition-colors duration-300 hover:border-[var(--hairline-strong)] sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  The agency model
                </p>
                <ul className="mt-6 space-y-3.5">
                  {AGENCY.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-neutral-400">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-neutral-600" aria-hidden />
                      <span className="text-pretty leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="h-full rounded-3xl border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] bg-[linear-gradient(155deg,var(--surface-1),var(--accent-glow))] p-6 shadow-[0_30px_80px_-50px_var(--accent)] sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-hi">
                  Senior-led (here)
                </p>
                <ul className="mt-6 space-y-3.5">
                  {SENIOR.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-neutral-200">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-hi" aria-hidden />
                      <span className="text-pretty leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* A3a - How we work (process timeline) */}
        <section
          aria-label="How we work"
          className="mt-24 border-t border-[var(--hairline)] pt-16 sm:mt-32 sm:pt-24"
        >
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              How we work
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="mt-5 max-w-[24ch] text-balance text-[clamp(1.875rem,5.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-neutral-50">
              A simple, senior process - start to <span className="script-accent">ship</span>.
            </h2>
          </FadeUp>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.08}>
                <li className="group h-full bg-[var(--surface-1)] p-7 transition-colors duration-300 hover:bg-[var(--surface-2)] sm:p-8">
                  <span className="nums text-sm font-semibold text-accent-hi">{step.n}</span>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-neutral-50">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-neutral-400">
                    {step.body}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </section>

        {/* A3b - Values */}
        <section aria-label="Values" className="mt-24 sm:mt-32">
          <FadeUp>
            <h2 className="max-w-[22ch] text-balance text-[clamp(1.875rem,5.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-neutral-50">
              A few principles we don&apos;t <span className="script-accent">bend</span> on.
            </h2>
          </FadeUp>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6">
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 transition-colors duration-300 hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-2)] sm:p-8">
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-neutral-50">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-pretty leading-relaxed text-neutral-400">{v.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* A4 - Small team / network */}
        <section
          aria-label="Team and network"
          className="mt-24 border-t border-[var(--hairline)] pt-16 sm:mt-32 sm:pt-24"
        >
          <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:gap-16">
            <FadeUp>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                  Team &amp; network
                </p>
                <h2 className="mt-5 text-balance text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-50">
                  Lean by default. Deep when it <span className="script-accent">counts</span>.
                </h2>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="space-y-5">
                <p className="max-w-[58ch] text-pretty text-lg leading-relaxed text-neutral-300">
                  Most projects ship with one senior - and that&apos;s the point. But
                  when a build needs a specialist, we bring in collaborators we&apos;ve
                  shipped with before and trust completely, so you get depth without
                  agency bloat.
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {["Motion & 3D", "Native mobile", "ML / MLOps", "Brand & identity", "QA & accessibility"].map(
                    (area) => (
                      <li
                        key={area}
                        className="rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-1)] px-3.5 py-1.5 text-sm text-neutral-300"
                      >
                        {area}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* A5 - Final CTA */}
        <section aria-label="Start a project" className="mt-24 sm:mt-32">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--hairline-strong)] bg-[var(--surface-1)] p-8 sm:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_85%_0%,var(--accent-glow),transparent_60%)]"
              />
              <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-balance text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-neutral-50">
                    Let&apos;s <span className="script-accent">build</span> the thing.
                  </h2>
                  <p className="mt-4 max-w-[48ch] text-pretty leading-relaxed text-neutral-300">
                    Tell us what you&apos;re working on. We&apos;ll scope it together,
                    and tell you honestly whether we&apos;re the right fit to build it
                    - no pressure, no pitch deck.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <Magnetic>
                    <Link
                      href="/contact"
                      className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-9 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
                    >
                      Book a free call
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Magnetic>
                  <a
                    href={mailtoHref("Project enquiry")}
                    className="group inline-flex items-center gap-2 px-1 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>
      </div>
    </main>
  );
}
