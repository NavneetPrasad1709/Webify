import type { Metadata } from "next";
import AboutHero from "@/components/pages/about/AboutHero";
import AboutIntro from "@/components/pages/about/AboutIntro";
import Founder from "@/components/pages/about/Founder";
import Journey from "@/components/pages/about/Journey";
import Methodology from "@/components/pages/about/Methodology";
import Values from "@/components/pages/about/Values";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About Our Web Design Studio in Greater Noida",
  description:
    "Webify is a web design and development studio in Greater Noida. Meet the founder, read the working method, and see where the company is headed next.",
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
