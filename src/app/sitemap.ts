import type { MetadataRoute } from "next";
import { services } from "@/lib/pages/service";
import { projectDetails } from "@/lib/pages/project";
import { posts } from "@/lib/pages/blog";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

/* Google ignores <priority> outright and reads <lastmod>, so a sitemap that
   sets only the former tells it nothing. Content routes carry their own real
   date; everything else falls back to the build date, which is honest for a
   site whose static pages change when it is deployed. */
const BUILD_DATE = new Date();

function postDate(date: string): Date {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? BUILD_DATE : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1, lastModified: BUILD_DATE },
    { url: `${BASE}/service`, priority: 0.9, lastModified: BUILD_DATE },
    { url: `${BASE}/contact`, priority: 0.9, lastModified: BUILD_DATE },
    { url: `${BASE}/project`, priority: 0.8, lastModified: BUILD_DATE },
    { url: `${BASE}/about`, priority: 0.7, lastModified: BUILD_DATE },
    { url: `${BASE}/blog`, priority: 0.6, lastModified: BUILD_DATE },
    { url: `${BASE}/privacy`, priority: 0.2, lastModified: BUILD_DATE },
    { url: `${BASE}/terms`, priority: 0.2, lastModified: BUILD_DATE },
  ];

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: `${BASE}/service/${s.slug}`,
      priority: 0.8,
      lastModified: BUILD_DATE,
    })),
    ...projectDetails.map((p) => ({
      url: `${BASE}/project/${p.slug}`,
      priority: 0.6,
      lastModified: BUILD_DATE,
    })),
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      priority: 0.5,
      lastModified: postDate(p.date),
    })),
  ];
}
