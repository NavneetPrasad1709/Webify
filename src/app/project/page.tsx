import type { Metadata } from "next";
import ProjectsIndex from "@/components/pages/project/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Live builds by Webify: real, deployed websites and product interfaces across SaaS, healthcare, and real estate. Click through and use them.",
};

export default function ProjectPage() {
  return (
    <main>
      <ProjectsIndex />
    </main>
  );
}
