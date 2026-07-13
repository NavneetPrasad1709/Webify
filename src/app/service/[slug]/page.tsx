import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSingle from "@/components/pages/service/ServiceSingle";
import { services, getService } from "@/lib/pages/service";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.blurb,
  };
}

export default async function ServiceSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.blurb,
    url: `https://webify.org.in/service/${service.slug}`,
    provider: { "@id": "https://webify.org.in/#organization" },
    areaServed: "Worldwide",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceSingle service={service} />
    </main>
  );
}
