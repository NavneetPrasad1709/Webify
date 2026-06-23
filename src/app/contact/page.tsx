import type { Metadata } from "next";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { ContactForm } from "./contact-form";
import { siteConfig, mailtoHref, whatsappHref, telHref } from "@/lib/site";

const SOCIAL_GLYPHS: Record<string, string> = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
};

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Got ideas? We've got the skills. Tell us what you're building - a senior team replies within 24 hours. No obligation, no pitch deck.",
  alternates: { canonical: "/contact" },
};

type Info = { icon: typeof Mail; title: string; body: string; value: string; href: string };

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

  const info: Info[] = [
    {
      icon: Mail,
      title: "Chat to us",
      body: "Our team is here to help.",
      value: siteConfig.email,
      href: mailtoHref("Project enquiry"),
    },
  ];
  if (siteConfig.whatsapp) {
    info.push({
      icon: MessageSquare,
      title: "WhatsApp us",
      body: "Quick questions? Message us.",
      value: "Open WhatsApp",
      href: whatsappHref("Hi Webify - I'd like to talk about a project."),
    });
  }
  if (siteConfig.phone) {
    info.push({
      icon: Phone,
      title: "Call us",
      body: "We work across time zones.",
      value: siteConfig.phone,
      href: telHref(),
    });
  }

  const socials = [
    { label: "LinkedIn", href: siteConfig.socials.linkedin, path: SOCIAL_GLYPHS.linkedin },
    { label: "GitHub", href: siteConfig.socials.github, path: SOCIAL_GLYPHS.github },
    { label: "X", href: siteConfig.socials.x, path: SOCIAL_GLYPHS.x },
  ].filter((s) => s.href);

  return (
    <main className="min-h-screen w-full bg-[#e9eaec] px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="animate-zoom-in mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#131313]/12 bg-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.35)] lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left - info */}
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-10">
          <div>
            {/* Logo */}
            <span className="text-2xl font-black uppercase tracking-tight text-[#131313]">
              Webify<span className="text-[#4ade80]">*</span>
            </span>

            <ul className="mt-12 space-y-9">
              {info.map((it) => (
                <li key={it.title}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#131313]/15 text-[#131313]">
                    <it.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-3 text-base font-bold text-[#131313]">{it.title}</p>
                  <p className="text-[15px] text-[#131313]/55">{it.body}</p>
                  <a
                    href={it.href}
                    target={it.href.startsWith("http") ? "_blank" : undefined}
                    rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-1 inline-block text-[15px] font-semibold text-[#131313] underline-offset-4 hover:underline"
                  >
                    {it.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {socials.length ? (
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#131313]/15 text-[#131313] transition-colors hover:bg-[#131313] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
                    <path d={s.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Right - green form panel */}
        <div className="bg-[#c4f24a] p-6 sm:p-12">
          <h1 className="max-w-[16ch] text-balance text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#131313]">
            Got ideas? We&apos;ve got the skills. Let&apos;s team up.
          </h1>
          <p className="mt-4 max-w-[44ch] text-base font-medium text-[#131313]/75 sm:text-lg">
            Tell us more about yourself and what you&apos;ve got in mind. A senior
            team replies within 24 hours - no obligation, no pitch deck.
          </p>

          <div className="mt-9">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
