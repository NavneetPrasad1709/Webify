import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Search and AI-search crawlers are named explicitly so the intent survives
   any future tightening of the wildcard rule. OAI-SearchBot powers ChatGPT
   search results. GPTBot (model training) is a separate owner decision and
   is currently governed by the wildcard group, i.e. allowed; see
   docs/AI_CRAWLER_AUDIT.md before changing it. */
const PUBLIC = { allow: "/", disallow: "/api/" };

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "PerplexityBot"], ...PUBLIC },
      { userAgent: "*", ...PUBLIC },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
