import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectSingle from "@/components/pages/project/ProjectSingle";
import { getNextProject, getProject, projectDetails } from "@/lib/pages/project";

export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectSingle project={project} next={getNextProject(slug)} />;
}
