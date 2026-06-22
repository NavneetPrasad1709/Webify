import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getCaseStudySlugs } from "@/lib/case-studies";

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
  const caseStudyRoutes = getCaseStudySlugs().map((slug) => `/case-studies/${slug}`);

  return [...staticRoutes, ...caseStudyRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
