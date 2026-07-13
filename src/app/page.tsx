import Hero from "@/components/sections/Hero";
import { faqs } from "@/lib/data";
import Credibility from "@/components/sections/Credibility";
import ServicesAccordion from "@/components/sections/ServicesAccordion";
import Work from "@/components/sections/Work";
import ServicesBand from "@/components/sections/ServicesBand";
import Impacts from "@/components/sections/Impacts";
import Approach from "@/components/sections/Approach";
import Brands from "@/components/sections/Brands";
import FoundingOffers from "@/components/sections/FoundingOffers";
import CtaBand from "@/components/sections/CtaBand";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Blog from "@/components/sections/Blog";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <Credibility />
      <ServicesAccordion />
      <Work />
      <ServicesBand />
      <Impacts />
      <Brands />
      <Approach />
      <FoundingOffers />
      <Pricing />
      <Faq />
      <Blog />
      <CtaBand />
    </main>
  );
}
