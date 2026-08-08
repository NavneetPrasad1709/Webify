import type { Metadata } from "next";
import AboutHero from "@/components/pages/about/AboutHero";
import AboutIntro from "@/components/pages/about/AboutIntro";
import Founder from "@/components/pages/about/Founder";
import Journey from "@/components/pages/about/Journey";
import Methodology from "@/components/pages/about/Methodology";
import Values from "@/components/pages/about/Values";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About the Team Behind Your Build",
  description:
    "Webify is a senior-led design and engineering company. Meet the founder, read how we scope and ship, and see exactly who you would be working with.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <AboutHero />
      <AboutIntro />
      <Founder />
      <Journey />
      <Methodology />
      <Values />
      <CtaBand />
    </main>
  );
}
