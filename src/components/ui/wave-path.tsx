"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type WavePathProps = React.ComponentProps<"div">;

/**
 * WavePath — a thin horizontal line that bends toward the cursor and springs
 * back via requestAnimationFrame (jhrealex/awwwards-style). Mouse-driven only,
 * so it's a static line on touch / reduced-motion (no auto animation).
 */
export function WavePath({ className, ...props }: WavePathProps) {
  const path = useRef<SVGPathElement>(null);
  const progress = useRef(0);
  const x = useRef(0.5);
  const time = useRef(Math.PI / 2);
  const reqId = useRef<number | null>(null);

  const setPath = (value: number) => {
    const width = window.innerWidth * 0.7;
    path.current?.setAttributeNS(
      null,
      "d",
      `M0 100 Q${width * x.current} ${100 + value}, ${width} 100`,
    );
  };

  useEffect(() => {
    setPath(progress.current);
    const onResize = () => setPath(progress.current);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (reqId.current) cancelAnimationFrame(reqId.current);
    };
  }, []);

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  const resetAnimation = () => {
    time.current = Math.PI / 2;
    progress.current = 0;
  };

  const animateOut = () => {
    const newProgress = progress.current * Math.sin(time.current);
    progress.current = lerp(progress.current, 0, 0.025);
    time.current += 0.2;
    setPath(newProgress);
    if (Math.abs(progress.current) > 0.75) {
      reqId.current = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const manageMouseEnter = () => {
    if (reqId.current) {
      cancelAnimationFrame(reqId.current);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementY, clientX } = e;
    const pathBound = path.current?.getBoundingClientRect();
    if (!pathBound) return;
    x.current = (clientX - pathBound.left) / pathBound.width;
    progress.current += movementY;
    setPath(progress.current);
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  return (
    <div className={cn("relative h-px w-[70vw]", className)} {...props}>
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
      />
      <svg className="absolute -top-[100px] h-[300px] w-full">
        <path ref={path} className="fill-none stroke-current" strokeWidth={2} />
      </svg>
    </div>
  );
}
