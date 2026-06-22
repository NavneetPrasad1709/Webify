"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ZoomImage {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Up to 7 images for the zoom-parallax cluster. */
  images: ZoomImage[];
}

const SCALES = [4, 5, 6, 5, 6, 8, 9];

/** Per-image inner offset + size - verbatim from the reference layout. */
const POS: Record<number, string> = {
  1: "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]",
  2: "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]",
  3: "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]",
  4: "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]",
  5: "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]",
  6: "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]",
};

/** SSR-safe prefers-reduced-motion subscription (no setState-in-effect). */
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * ZoomParallax (sshahaider/zoom-parallax). A pinned cluster of images that zoom
 * apart as the section scrolls - the centre fills the screen while the others
 * sweep past the edges.
 *
 * Driven by GSAP ScrollTrigger (synced to our Lenis smooth-scroll) instead of
 * framer's useScroll, which desyncs under Lenis. The reference demo also created
 * its own Lenis instance - omitted here; the app already provides one.
 * Reduced-motion falls back to a static grid.
 */
export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pics = images.slice(0, 7);

  useEffect(() => {
    if (reduced) return;
    const el = container.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".zp-item", el);
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { scale: 1 },
          {
            scale: SCALES[i % SCALES.length],
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, [images, reduced]);

  if (reduced) {
    return (
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-6 py-16 sm:grid-cols-3 sm:px-10">
        {pics.map(({ src, alt }, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={alt ?? `Recent work ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {pics.map(({ src, alt }, index) => (
          <div
            key={index}
            className={`zp-item absolute top-0 flex h-full w-full items-center justify-center ${POS[index] ?? ""}`}
          >
            <div className="relative h-[25vh] w-[25vw]">
              <Image
                src={src}
                alt={alt ?? `Recent work ${index + 1}`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
