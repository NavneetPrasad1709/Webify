"use client";

import { useEffect, useRef } from "react";
import type { VideoHTMLAttributes } from "react";

/* Deferred looping video. The poster paints immediately; the file itself only
   downloads when the element nears the viewport (preload="none" + play() on
   intersection). Playback pauses off-screen, and visitors with save-data or
   reduced-motion keep the static poster. */
type Props = VideoHTMLAttributes<HTMLVideoElement> & { src: string };

export default function LazyVideo({ src, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} src={src} muted loop playsInline preload="none" {...rest} />
  );
}
