import type { Metadata } from "next";
import ProjectsIndex from "@/components/pages/project/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Concept builds by Webify: brand systems, product interfaces, and websites for SaaS, fintech, and e-commerce teams.",
};

export default function ProjectPage() {
  return (
    <main>
      <ProjectsIndex />
    </main>
  );
}
