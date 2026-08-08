import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSingle from "@/components/pages/service/ServiceSingle";
import { services, getService } from "@/lib/pages/service";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const metaTitles: Record<string, string> = {
  "website-development": "Website Development Company in Greater Noida",
  "branding-design": "Branding and UI/UX Design Services in Delhi NCR",
  "crm-system": "Custom CRM Development Company in Delhi NCR",
  "e-commerce": "E-commerce Website Development in Delhi NCR",
  "landing-page": "Landing Page Design & Development in Delhi NCR",
  "website-support": "Website Support and Maintenance in Delhi NCR",
  redesign: "Website Redesign Services in Greater Noida",
  "app-development": "Mobile App Development Company in Delhi NCR",
  seo: "SEO Services in Greater Noida and Delhi NCR",
};

const areaClauses = [
  "Built by Webify in Greater Noida, serving businesses across Delhi NCR.",
  "Built by Webify, serving Greater Noida and Delhi NCR.",
  "Serving Greater Noida and Delhi NCR.",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };
  const clause =
    areaClauses.find((c) => service.blurb.length + 1 + c.length <= 160) ??
    areaClauses[areaClauses.length - 1];
  return {
    title: metaTitles[service.slug] ?? service.title,
    description: `${service.blurb} ${clause}`,
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
    url: `${SITE_URL}/service/${service.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["Greater Noida", "Noida", "Ghaziabad", "Delhi", "Worldwide"],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceSingle service={service} />
    </main>
  );
}
