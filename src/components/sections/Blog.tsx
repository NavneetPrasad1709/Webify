"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { posts } from "@/lib/pages/blog";
import PillButton from "@/components/ui/PillButton";

/* Newest three articles, derived from the canonical blog data. */
const latest = [...posts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header blur-in
      gsap.fromTo(
        ".blog-header",
        revealFrom,
        {
          ...revealTo,
          scrollTrigger: { trigger: ".blog-header", start: "top 85%" },
        }
      );

      // Cards blur-in stagger
      gsap.fromTo(
        ".blog-card",
        revealFrom,
        {
          ...revealTo,
          stagger: 0.12,
          scrollTrigger: { trigger: ".blog-grid", start: "top 80%" },
        }
      );

      // Focus-pull: each card image resolves from blur as its card enters
      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card) => {
        const img = card.querySelector<HTMLElement>("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { filter: "blur(10px)" },
          {
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white text-ink px-5 md:px-10 py-24 md:py-32">
      {/* Header row */}
      <div className="blog-header max-w-6xl mx-auto flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="eyebrow text-gray-mid">BLOG</p>
          <h2 className="display-2 mt-4">
            <span className="block">IDEAS THAT</span>
            <span className="block">
              <span className="text-primary">MOVE</span> REVENUE
            </span>
          </h2>
        </div>

        <PillButton tone="dark" href="/blog">
          All Articles
        </PillButton>
      </div>

      {/* Cards grid */}
      <div className="blog-grid max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-5">
        {latest.map((p) => (
          // Whole card is the link (title and description clicks work too),
          // matching the /blog index card pattern.
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="blog-card group bg-fill-light rounded-card p-4 flex flex-col"
          >
            <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={p.thumb}
                alt={p.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </span>
            <p className="mt-5 text-sm">
              <span className="font-bold">Published</span>{" "}
              <span className="font-medium text-black">{p.date}</span>
            </p>
            <h3 className="mt-2 text-[22px] font-extrabold tracking-tight leading-snug transition-colors duration-300 group-hover:text-primary">
              {p.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-black font-medium">{p.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
