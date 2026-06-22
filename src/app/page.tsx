import { StellarHero } from "@/components/sections/hero/stellar-hero";
import { ServicesSection } from "@/components/sections/services/services-section";
import { StatementSection } from "@/components/sections/statement/statement-section";
import { ProjectsSection } from "@/components/sections/projects/projects-section";
import { Process } from "@/components/sections/process/process";
import { ShowcaseSection } from "@/components/sections/showcase/showcase-section";
import { WaveSection } from "@/components/sections/wave/wave-section";
import { CtaSection } from "@/components/sections/cta/cta-section";

/**
 * Home (/) - sitemap H2..H10.
 * H2 hero = full-viewport HLS background video (hero-section).
 */
export default function HomePage() {
  return (
    <>
      {/* H2 - Hero (Stellar-style, dark) */}
      <StellarHero />

      {/* H3 - Services overview */}
      <ServicesSection />

      {/* H4 - What we build (scroll-reveal manifesto + hover-preview terms) */}
      <StatementSection />

      {/* H5 - Featured work (sticky-stacking deck) */}
      <ProjectsSection />

      {/* H6 - How we work */}
      <Process />

      {/* H7 - Recent work (zoom parallax) */}
      <ShowcaseSection />

      {/* H8 - Craft interstitial (interactive wave) */}
      <WaveSection />

      {/* H9 - Final CTA */}
      <CtaSection />
    </>
  );
}
