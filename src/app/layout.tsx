import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Preloader from "@/components/ui/Preloader";
import ScrollTop from "@/components/ui/ScrollTop";

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

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

/* 55-char title, 158-char description: target keyword + city, per the
   local-SEO goal in AGENTS.md. City names only; no country label in copy. */
const defaultTitle = "Webify | Web Design & Development Company in Delhi NCR";
const description =
  "Senior-led web design and development company in Greater Noida, building websites, SaaS products, and web apps for Delhi NCR businesses and clients worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL("https://webify.org.in"),
  title: {
    default: defaultTitle,
    template: "%s | Webify",
  },
  description,
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Webify",
    type: "website",
    locale: "en_US",
    url: "/",
    title: defaultTitle,
    description,
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
      "@id": "https://webify.org.in/#organization",
      name: "Webify",
      url: "https://webify.org.in",
      logo: "https://webify.org.in/icon.png",
      image: "https://webify.org.in/opengraph-image.png",
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
      url: "https://webify.org.in",
      publisher: { "@id": "https://webify.org.in/#organization" },
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
