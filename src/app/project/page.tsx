import type { Metadata } from "next";
import ProjectsIndex from "@/components/pages/project/ProjectsIndex";

export const metadata: Metadata = {
  title: "Web Design and Development Concept Projects",
  description:
    "Concept builds by Webify: deployed websites and product interfaces for SaaS, healthcare, and real estate. Every project is live, click through and use it.",
};

export default function ProjectPage() {
  return (
    <main id="main">
      <ProjectsIndex />
    </main>
  );
}
