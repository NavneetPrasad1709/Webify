import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Preloader from "@/components/ui/Preloader";
import ScrollTop from "@/components/ui/ScrollTop";
import { SITE_URL } from "@/lib/site";

// Inter Display — next/font self-hosts a latin-subset variable file (wght +
// opsz axes) at build time, ~90 kB vs the 344 kB full InterVariable.woff2 it
// replaces. opsz stays pinned to 32 (the Display optical master) in
// globals.css, so rendering is unchanged.
const interDisplay = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter-display",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

/* Both weights are genuinely used, but only for eyebrows and micro-labels
   that are never the LCP element, so they do not belong on the critical
   path. display: swap keeps them rendering in the fallback until they land. */
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
  preload: false,
});

/* The buyer is a founder or small team hiring a remote partner, usually on a
   US clock, so the title sells the service rather than a city: a location
   qualifier here narrows the page for every visitor who did not arrive from
   a local search. Location targeting belongs on pages built for it. */
const defaultTitle = "Webify | Web Design and Development Company for Startups";
const description =
  "Senior-led design and engineering for websites, SaaS products and web apps. Fixed-price projects, remote delivery, and evening IST hours held for US calls.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Webify",
  },
  description,
  alternates: { canonical: "./" },
  /* Deliberately no title or description here. Next inherits each route's own
     metadata into its Open Graph card when this object omits them; setting
     them once at the root made all 24 nested pages share the homepage card,
     which matters because most visitors arrive through a pasted link. `url`
     stays out for the same reason: a static value would pin every card to
     the homepage. */
  openGraph: {
    siteName: "Webify",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0051ff",
};

/* Organization + LocalBusiness (ProfessionalService) + WebSite structured
   data, rendered once site-wide. No telephone: the business publishes email
   only. No openingHours: remote-first, no storefront hours to claim. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "Webify",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image.png`,
      email: "contact@webify.org.in",
      description,
      foundingDate: "2026",
      founder: {
        "@type": "Person",
        name: "Navneet Prasad",
        jobTitle: "Founder",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tech Zone IV",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201318",
        addressCountry: "IN",
      },
      // Approximate Tech Zone IV pin. Replace with the exact Google Business
      // Profile marker coordinates once the GBP listing is live.
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.6026,
        longitude: 77.4358,
      },
      areaServed: [
        { "@type": "City", name: "Greater Noida" },
        { "@type": "City", name: "Noida" },
        { "@type": "City", name: "Ghaziabad" },
        { "@type": "City", name: "Delhi" },
        "Worldwide",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Project inquiries",
        email: "contact@webify.org.in",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      name: "Webify",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interDisplay.variable} ${dmMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Preloader />
          <Nav />
          {children}
          <Footer />
          <ScrollTop />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
