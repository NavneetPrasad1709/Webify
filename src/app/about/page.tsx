import type { Metadata } from "next";
import AboutHero from "@/components/pages/about/AboutHero";
import AboutIntro from "@/components/pages/about/AboutIntro";
import Team from "@/components/pages/about/Team";
import Journey from "@/components/pages/about/Journey";
import Methodology from "@/components/pages/about/Methodology";
import Values from "@/components/pages/about/Values";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About the Team Behind Your Build",
  description:
    "Webify is a senior-led design and engineering company. Meet the team, read how we scope and ship, and see exactly who you would be working with.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <AboutHero />
      <AboutIntro />
      <Team />
      <Journey />
      <Methodology />
      <Values />
      <CtaBand />
    </main>
  );
}
