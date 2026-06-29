import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Caveat, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./starfield.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PageTransition } from "@/components/layout/page-transition";
import { Component as SiteNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SiteFooter } from "@/components/layout/site-footer";
import { StickyCta } from "@/components/layout/sticky-cta";
import { LeadPopup } from "@/components/layout/lead-popup";
import { ContactModal } from "@/components/contact/contact-modal";
import { siteConfig, hasSocials } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Self-hosted via next/font (was a render-blocking CSS @import). Caveat drives
// the script accents (incl. the H1), so swap-loading it removes a network
// round-trip on the critical path and the resulting CLS.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // let content extend into the safe areas; we pad with env() insets
  viewportFit: "cover",
  themeColor: "#131313",
};

const SITE_URL = siteConfig.url;
const SITE_DESC = siteConfig.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Webify - Senior-led AI & Software Product Engineering",
    template: "%s - Webify",
  },
  description: SITE_DESC,
  applicationName: "Webify",
  keywords: [
    "AI product engineering",
    "software product studio",
    "web app development",
    "mobile app development",
    "senior-led development",
    "India",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Webify",
    title: "Webify - Senior-led AI & Software Product Engineering",
    description: SITE_DESC,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webify - Senior-led AI & Software Product Engineering",
    description: SITE_DESC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (ColorZilla → cz-shortcut-listen,
          Grammarly → data-gr-*) inject attributes on <body> before hydration. This
          ignores attribute-only diffs on this element; it does not affect children. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {/* Site-wide animated galaxy/starfield (CSS-only, GPU-composited) */}
        <div className="site-bg" aria-hidden="true">
          <div className="stars stars-sm" />
          <div className="stars stars-md" />
          <div className="stars stars-lg" />
        </div>
        {/* Textura-style custom cursor (desktop only; renders nothing on touch) */}
        <CustomCursor />
        {/* Preconnect to the media/font CDNs (Next hoists <link> to <head>) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.higgs.ai" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: SITE_URL,
              description: SITE_DESC,
              email: siteConfig.email,
              areaServed: ["IN", "Worldwide"],
              knowsAbout: ["AI products", "Web apps", "Mobile apps", "Product design"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: siteConfig.email,
                ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
                areaServed: ["IN", "Worldwide"],
              },
              ...(hasSocials
                ? { sameAs: Object.values(siteConfig.socials).filter(Boolean) }
                : {}),
            }),
          }}
        />

        <SmoothScroll>
          {/* G1 - persistent nav across every route (Sterling Gate kinetic menu) */}
          <SiteNavigation />
          {/* G2 - route-transition wrapper around page content only */}
          <PageTransition>{children}</PageTransition>
          {/* G1 - persistent footer */}
          <SiteFooter />
          {/* Persistent conversion affordance on every page (hidden on /contact) */}
          <StickyCta />
          {/* First-visit lead magnet (exit-intent / scroll, once per visitor) */}
          <LeadPopup />
          {/* Site-wide contact popup - opens from any /contact CTA */}
          <ContactModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
