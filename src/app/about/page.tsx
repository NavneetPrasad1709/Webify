import type { Metadata } from "next";
import AboutHero from "@/components/pages/about/AboutHero";
import AboutIntro from "@/components/pages/about/AboutIntro";
import Founder from "@/components/pages/about/Founder";
import Journey from "@/components/pages/about/Journey";
import Methodology from "@/components/pages/about/Methodology";
import Values from "@/components/pages/about/Values";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Every project tells a story, and at Webify, we make sure it’s unforgettable. The method, principles, and road ahead for the company.",
};

export default function AboutPage() {
  return (
    <main>
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
