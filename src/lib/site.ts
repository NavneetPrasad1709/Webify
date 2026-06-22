/**
 * Single source of truth for Webify's real business facts.
 *
 * IMPORTANT: every NEXT_PUBLIC_* value is read with a STATIC member expression
 * (process.env.NEXT_PUBLIC_FOO) — not process.env[key] — because Next only
 * inlines public env vars into the client bundle when they're accessed
 * statically. Dynamic access leaves them undefined on the client, which causes
 * server/client hydration mismatches for anything that renders conditionally
 * (the WhatsApp button, phone link, socials, etc.).
 *
 * Channel fields are EMPTY by default — the UI renders a channel only when its
 * value is set, so nothing fake or broken ships.
 *
 * Public (client-safe): NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CONTACT_EMAIL,
 *   NEXT_PUBLIC_WHATSAPP (digits, e.g. 919876543210), NEXT_PUBLIC_PHONE,
 *   NEXT_PUBLIC_CAL_URL, NEXT_PUBLIC_CITY/REGION/COUNTRY,
 *   NEXT_PUBLIC_LINKEDIN/GITHUB/X.
 * Server-only: RESEND_API_KEY, CONTACT_TO_EMAIL, EMAIL_FROM.
 */

const clean = (v: string | undefined, fallback = "") => (v ?? "").trim() || fallback;

export const siteConfig = {
  name: "Webify",
  /** Production origin — drives canonical, OpenGraph, sitemap, robots, schema. */
  url: clean(process.env.NEXT_PUBLIC_SITE_URL, "https://www.webify.org.in").replace(/\/$/, ""),
  /** Public contact mailbox (must be a real, monitored inbox on the live domain). */
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "contact@webify.org.in"),
  description:
    "Senior-led AI & software product engineering. We design, build, and ship AI products, web apps, and mobile apps for ambitious teams - in India and worldwide. You work directly with the people who build.",
  tagline: "AI-first product engineering, senior-led, end to end.",

  /* --- Synchronous channels (render only when set) --- */
  whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP), // digits only, e.g. 919876543210
  phone: clean(process.env.NEXT_PUBLIC_PHONE), // display + tel:, e.g. +91 98765 43210
  calUrl: clean(process.env.NEXT_PUBLIC_CAL_URL), // booking embed/link

  /* --- Business identity (used in LocalBusiness schema; render only when set) --- */
  location: {
    city: clean(process.env.NEXT_PUBLIC_CITY),
    region: clean(process.env.NEXT_PUBLIC_REGION),
    country: clean(process.env.NEXT_PUBLIC_COUNTRY, "India"),
  },

  /* --- Socials (render only when set) --- */
  socials: {
    linkedin: clean(process.env.NEXT_PUBLIC_LINKEDIN),
    github: clean(process.env.NEXT_PUBLIC_GITHUB),
    x: clean(process.env.NEXT_PUBLIC_X),
  },
} as const;

/** mailto: link with an optional subject. */
export const mailtoHref = (subject?: string) =>
  `mailto:${siteConfig.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

/** wa.me link (empty string if WhatsApp isn't configured). */
export const whatsappHref = (message?: string) =>
  siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}${
        message ? `?text=${encodeURIComponent(message)}` : ""
      }`
    : "";

/** tel: link (empty string if no phone is configured). */
export const telHref = () =>
  siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}` : "";

/** True when at least one social profile URL is configured. */
export const hasSocials = Object.values(siteConfig.socials).some(Boolean);

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "/") =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
