import type { MetadataRoute } from "next";
import { services } from "@/lib/pages/service";
import { projectDetails } from "@/lib/pages/project";
import { posts } from "@/lib/pages/blog";

const BASE = "https://webify.org.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/service`, priority: 0.9 },
    { url: `${BASE}/contact`, priority: 0.9 },
    { url: `${BASE}/project`, priority: 0.8 },
    { url: `${BASE}/about`, priority: 0.7 },
    { url: `${BASE}/blog`, priority: 0.6 },
    { url: `${BASE}/privacy`, priority: 0.2 },
    { url: `${BASE}/terms`, priority: 0.2 },
  ];

  return [
    ...staticRoutes,
    ...services.map((s) => ({ url: `${BASE}/service/${s.slug}`, priority: 0.8 })),
    ...projectDetails.map((p) => ({ url: `${BASE}/project/${p.slug}`, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, priority: 0.5 })),
  ];
}
