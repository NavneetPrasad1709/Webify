import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getCaseStudySlugs } from "@/lib/case-studies";
import { getCaseStudySlugs as getWorkSlugs } from "@/lib/work";
import { getServiceSlugs } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/case-studies",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];
  const serviceRoutes = getServiceSlugs().map((slug) => `/services/${slug}`);
  const caseStudyRoutes = getCaseStudySlugs().map((slug) => `/case-studies/${slug}`);
  const workRoutes = getWorkSlugs().map((slug) => `/work/${slug}`);

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...workRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
