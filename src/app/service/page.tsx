import type { Metadata } from "next";
import ServiceHero from "@/components/pages/service/ServiceHero";
import ServiceListing from "@/components/pages/service/ServiceListing";
import TechStack from "@/components/pages/service/TechStack";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Webify helps brands scale with high-performing websites, sleek UI/UX design, and powerful digital solutions built for growth.",
};

export default function ServicePage() {
  return (
    <main>
      <ServiceHero />
      <ServiceListing />
      <TechStack />
      <Faq />
      <CtaBand />
    </main>
  );
}
