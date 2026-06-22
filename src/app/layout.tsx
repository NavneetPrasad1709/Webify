import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./starfield.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PageTransition } from "@/components/layout/page-transition";
import { Component as SiteNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import { SiteFooter } from "@/components/layout/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // let content extend into the safe areas; we pad with env() insets
  viewportFit: "cover",
  themeColor: "#131313",
};

const SITE_URL = "https://webify.dev"; // [REPLACE: production domain]
const SITE_DESC =
  "Senior-led AI & software product engineering. We design, build, and ship AI products, web apps, and mobile apps for ambitious teams — in India and worldwide. You work directly with the people who build.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Webify — Senior-led AI & Software Product Engineering",
    template: "%s — Webify",
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
    title: "Webify — Senior-led AI & Software Product Engineering",
    description: SITE_DESC,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webify — Senior-led AI & Software Product Engineering",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
              name: "Webify",
              url: SITE_URL,
              description: SITE_DESC,
              areaServed: ["IN", "Worldwide"],
              knowsAbout: ["AI products", "Web apps", "Mobile apps", "Product design"],
            }),
          }}
        />

        <SmoothScroll>
          {/* G1 — persistent nav across every route (Sterling Gate kinetic menu) */}
          <SiteNavigation />
          {/* G2 — route-transition wrapper around page content only */}
          <PageTransition>{children}</PageTransition>
          {/* G1 — persistent footer (placeholder until H10 reference) */}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
