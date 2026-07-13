import { ReactNode } from "react";

/** Infinite marquee: children are duplicated once; CSS animates -50%. */
export default function Marquee({
  children,
  direction = "left",
  duration = 30,
  className = "",
  pauseOnHover = false,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
