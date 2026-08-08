import type { Metadata } from "next";
import ServiceHero from "@/components/pages/service/ServiceHero";
import ServiceListing from "@/components/pages/service/ServiceListing";
import TechStack from "@/components/pages/service/TechStack";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Web Design & Development Services in Delhi NCR",
  description:
    "Website development, e-commerce stores, CRM systems, branding, and SEO. Fixed-price projects from Webify, a studio in Greater Noida serving Delhi NCR.",
};

export default function ServicePage() {
  return (
    <main id="main">
      <ServiceHero />
      <ServiceListing />
      <TechStack />
      <Faq />
      <CtaBand />
    </main>
  );
}
