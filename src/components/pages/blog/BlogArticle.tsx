"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, revealFrom, revealTo } from "@/lib/anim";
import type { ArticleBlock, BlogPost } from "@/lib/pages/blog";
import PillButton from "@/components/ui/PillButton";

export interface BlogArticleProps {
  post: BlogPost;
  next: BlogPost;
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "lede":
      return (
        <h2 className="article-block max-w-[720px] mx-auto text-[20px] md:text-[24px] font-bold tracking-tight leading-snug">
          {block.text}
        </h2>
      );
    case "h2":
      return (
        <h3 className="article-block max-w-[720px] mx-auto mt-12 text-[22px] md:text-[26px] font-bold tracking-tight leading-tight">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="article-block max-w-[720px] mx-auto mt-4 text-[15px] md:text-base leading-[1.8] text-black font-medium">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote className="article-block max-w-[720px] mx-auto mt-8 border-l-4 border-primary pl-6 text-lg md:text-xl font-semibold leading-relaxed">
          {block.text}
        </blockquote>
      );
    case "list":
      return block.ordered ? (
        <ol className="article-block max-w-[720px] mx-auto mt-5 list-decimal pl-5 space-y-2 text-[15px] md:text-base leading-[1.8] text-black font-medium">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="article-block max-w-[720px] mx-auto mt-5 list-disc pl-5 space-y-2 text-[15px] md:text-base leading-[1.8] text-black font-medium">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <div className="article-image mt-14 mb-14 overflow-hidden rounded-2xl">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            decoding="async"
            className="parallax-img w-full aspect-[16/9] object-cover scale-110"
          />
        </div>
      );
  }
}

export default function BlogArticle({ post, next }: BlogArticleProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".article-header > *",
        revealFrom,
        { ...revealTo, stagger: 0.12, delay: 0.15 }
      );

      // Hero image entrance
      gsap.fromTo(
        ".article-hero",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.35 }
      );

      // Parallax drift on hero + inline images (Webflow image-parallax feel)
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Body blocks blur-in as they enter
      gsap.utils.toArray<HTMLElement>(".article-block").forEach((el) => {
        gsap.fromTo(el, revealFrom, {
          ...revealTo,
          duration: 0.9,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-ink px-5 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title + author meta */}
        <div className="article-header mx-auto max-w-[720px]">
          <h1 className="max-w-3xl text-[34px] md:text-[52px] font-bold tracking-tight leading-[1.05]">
            {post.title}
          </h1>
          <div className="mt-8 md:mt-10 flex items-center justify-between gap-4 border-y border-border-soft py-4 text-sm">
            <p>
              <span className="font-bold">Author:</span>{" "}
              <span className="font-medium text-black">{post.author}</span>
            </p>
            <p className="font-medium text-black">{post.date}</p>
          </div>
        </div>

        {/* Hero image */}
        <div className="article-hero mt-6 md:mt-8 mb-14 overflow-hidden rounded-2xl">
          <img
            src={post.hero}
            alt={post.title}
            className="parallax-img w-full aspect-[16/9] object-cover scale-110"
          />
        </div>

        {/* Article body */}
        <article>
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        {/* Soft conversion step for readers who made it to the end */}
        <div className="mx-auto mt-16 flex max-w-[720px] flex-col items-start gap-5 border-t border-border-soft pt-10">
          <p className="text-base font-medium text-black">
            Building something this applies to? A senior replies within 24
            hours with an honest scope and fixed quote.
          </p>
          <PillButton tone="blue" href="/contact">
            Start a Project
          </PillButton>
        </div>

        {/* Next article */}
        <div className="mx-auto mt-14 max-w-[720px] border-t border-border-soft pt-8">
          <p className="eyebrow mb-3">NEXT ARTICLE</p>
          <Link
            href={`/blog/${next.slug}`}
            className="text-[24px] md:text-[30px] font-bold tracking-tight hover:text-primary transition-colors"
          >
            {next.title}
          </Link>
        </div>
      </div>
    </section>
  );
}
