import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Preloader from "@/components/ui/Preloader";
import ScrollTop from "@/components/ui/ScrollTop";

// Inter Display — self-hosted. One variable file (opsz 14-32, wght 100-900)
// covers every weight; we pin opsz to 32 (the Display optical master) in
// globals.css. Self-hosting removes the external request and layout shift.
const interDisplay = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter-display",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const description =
  "Webify is a senior-led design and engineering company shipping brand systems, product design, and web experiences built for clarity, pace, and scale.";

export const metadata: Metadata = {
  metadataBase: new URL("https://webify.org.in"),
  title: {
    default: "Webify | Senior-Led Design & Engineering Company",
    template: "%s | Webify",
  },
  description,
  alternates: { canonical: "./" },
  openGraph: {
    siteName: "Webify",
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Webify | Senior-Led Design & Engineering Company",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0051ff",
};

/* Organization + WebSite structured data, rendered once site-wide. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://webify.org.in/#organization",
      name: "Webify",
      url: "https://webify.org.in",
      logo: "https://webify.org.in/icon.png",
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
      areaServed: "Worldwide",
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
