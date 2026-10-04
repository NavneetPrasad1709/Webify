import { services } from "@/lib/pages/service";
import { projectDetails } from "@/lib/pages/project";
import { posts } from "@/lib/pages/blog";
import { BOOKING_URL, SITE_URL } from "@/lib/site";

/* llms.txt: a plain-text map of the site for AI answer engines (ChatGPT,
   Perplexity, Google AI Overviews). Built from the same data as the pages,
   so it never drifts from what the site actually says. */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Webify",
    "",
    "> Senior-led web, software and AI development company. Webify designs and builds websites, custom software, SaaS platforms, AI chatbots and agents, mobile apps, e-commerce stores and CRM systems for founders and small teams worldwide. Fixed-price projects, remote delivery, evening IST hours held for US calls.",
    "",
    "- Founder: Navneet Prasad (Founder & Lead Engineer)",
    "- Chief Marketing Officer: Mayank Gautam",
    "- Location: Tech Zone IV, Greater Noida, Uttar Pradesh 201318, working with clients worldwide",
    "- Contact: contact@webify.org.in",
    `- Book a 20 minute call: ${BOOKING_URL}`,
    "",
    "## Services",
    ...services.map(
      (s) => `- [${s.title}](${SITE_URL}/service/${s.slug}): ${s.blurb}`
    ),
    "",
    "## Projects",
    ...projectDetails.map(
      (p) => `- [${p.name}](${SITE_URL}/project/${p.slug})`
    ),
    "",
    "## Articles",
    ...posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})`),
    "",
    "## Company",
    `- [About and team](${SITE_URL}/about)`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
