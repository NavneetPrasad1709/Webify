import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectSingle from "@/components/pages/project/ProjectSingle";
import { getNextProject, getProject, projectDetails } from "@/lib/pages/project";
import { getService } from "@/lib/pages/service";
import { SITE_URL } from "@/lib/site";

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

  /* These are the only proof pages on the site, so they are worth composing
     properly: the bare project name gave a 17-character title with no idea
     what was built. */
  const service = getService(project.serviceSlug);
  const title = service
    ? `${project.name} | ${service.title} Case Study`
    : `${project.name} | Live Build`;

  return {
    title,
    description: project.description.slice(0, 158),
    alternates: { canonical: `/project/${project.slug}` },
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

  const url = `${SITE_URL}/project/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.name,
        description: project.description,
        url,
        image: `${SITE_URL}${project.image}`,
        creator: { "@id": `${SITE_URL}/#organization` },
        // The deployed build itself, so the schema points at the proof
        // rather than only at the page describing it.
        sameAs: project.liveUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${SITE_URL}/project`,
          },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectSingle project={project} next={getNextProject(slug)} />
    </main>
  );
}
