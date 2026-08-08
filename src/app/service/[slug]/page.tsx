import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSingle from "@/components/pages/service/ServiceSingle";
import { services, getService } from "@/lib/pages/service";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/* Service first, location absent. These pages are read by founders comparing
   remote partners, most of them on a US clock and none of them searching for
   a city; a location qualifier in the title narrows the page for every one of
   them and wins nothing back, because a new domain will not rank for a
   competitive local term for a year regardless. */
const metaTitles: Record<string, string> = {
  "website-development": "Website Development Company for Startups and Teams",
  "branding-design": "Branding and UI/UX Design Services for Digital Products",
  "crm-system": "Custom CRM Development for Growing Teams",
  "e-commerce": "E-commerce Website Development, Designed to Convert",
  "landing-page": "Landing Page Design and Development for Campaigns",
  "website-support": "Website Support and Maintenance, Handled Monthly",
  redesign: "Website Redesign Services for Sites That Underperform",
  "app-development": "Mobile App Development Company for Product Teams",
  seo: "SEO Services That Compound Instead of Spiking",
};

const areaClauses = [
  "Fixed-price, remote delivery, with evening IST hours held for US calls.",
  "Fixed-price and remote, with hours held for US timezones.",
  "Fixed-price projects, delivered remotely.",
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
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.blurb,
        url: `${SITE_URL}/service/${service.slug}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: ["Worldwide", "Greater Noida", "Noida", "Ghaziabad", "Delhi"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/service`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${SITE_URL}/service/${service.slug}`,
          },
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
      <ServiceSingle service={service} />
    </main>
  );
}
