import type { Metadata } from "next";
import ServiceHero from "@/components/pages/service/ServiceHero";
import ServiceListing from "@/components/pages/service/ServiceListing";
import TechStack from "@/components/pages/service/TechStack";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Web Design and Development Services, Fixed Price",
  description:
    "Websites, e-commerce, CRM systems, mobile apps, branding and SEO. Fixed-price projects scoped before work starts, built and delivered by a senior-led team.",
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
