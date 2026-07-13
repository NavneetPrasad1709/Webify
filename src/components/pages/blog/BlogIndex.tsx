"use client";

import Image from "next/image";
import Link from "next/link";
import PillButton from "@/components/ui/PillButton";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import { blogCategories, posts } from "@/lib/pages/blog";

export default function BlogIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const [category, setCategory] = useState<string>("All");

  const visible =
    category === "All" ? posts : posts.filter((p) => p.category === category);

  // Entrance reveal for the page header + tab row
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-index-header > *",
        revealFrom,
        { ...revealTo, stagger: 0.1, delay: 0.15 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Card reveal - re-runs whenever the active category changes
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-index-card",
        revealFrom,
        { ...revealTo, duration: 0.8, stagger: 0.08 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [category]);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-ink px-5 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32"
    >
      {/* Header */}
      <div className="blog-index-header max-w-6xl mx-auto flex flex-col items-center text-center">
        <p className="eyebrow text-gray-mid">BLOG</p>
        <h1 className="display-1 mt-5">
          <span className="block">News &amp;</span>
          <span className="block">Insights</span>
        </h1>

        {/* Category filter tabs */}
        <div className="mt-10 md:mt-14 flex flex-wrap justify-center gap-2">
          {blogCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors duration-300 cursor-pointer ${
                category === c
                  ? "bg-ink text-white"
                  : "bg-fill-light text-gray-deep hover:bg-border-soft hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Post grid */}
      <div
        key={category}
        className="max-w-6xl mx-auto mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="blog-index-card group block bg-fill-light rounded-card p-4"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={p.thumb}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex items-center gap-2 mt-5 text-sm">
              <span className="font-bold">Published</span>
              <span className="font-medium text-black">{p.date}</span>
            </div>
            <h2 className="mt-2 text-[22px] font-extrabold tracking-tight leading-snug">
              {p.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-black font-medium">{p.description}</p>
          </Link>
        ))}
      </div>

      {/* Closing conversion step */}
      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-5 text-center md:mt-24">
        <p className="max-w-md text-base font-medium text-black">
          Reading up before a build of your own? Tell us what you are making.
        </p>
        <PillButton tone="dark" href="/contact">
          Start a Project
        </PillButton>
      </div>
    </section>
  );
}
