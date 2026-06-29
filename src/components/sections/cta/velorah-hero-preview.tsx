import { cn } from "@/lib/cn";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const NAV_ITEMS = ["Home", "Studio", "About", "Journal", "Reach Us"];

/** Stylized illustrative website preview shown inside the dashboard mock. */
export function VelorahHeroPreview() {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: "hsl(201 100% 13%)" }}
    >
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
        <span
          className="text-sm tracking-tight text-white sm:text-base md:text-lg"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Velorah<sup className="text-[0.5em]">®</sup>
        </span>
        <div className="hidden items-center gap-4 md:flex">
          {NAV_ITEMS.map((item, i) => (
            <span
              key={item}
              className={cn(
                "text-[9px] lg:text-[10px]",
                i === 0
                  ? "text-white"
                  : "cursor-pointer text-white/60 transition-colors hover:text-white",
              )}
            >
              {item}
            </span>
          ))}
        </div>
        <span className="liquid-glass rounded-full px-2.5 py-1 text-[9px] text-white sm:px-3 sm:text-[10px]">
          Begin Journey
        </span>
      </div>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center px-3 pt-3 pb-6 text-center sm:px-4 sm:pt-5 md:pt-7">
        <h1
          className="animate-fade-rise max-w-[90%] text-lg font-normal leading-[0.95] tracking-[-0.03em] text-white sm:text-2xl md:text-3xl lg:text-4xl"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Where <em className="not-italic text-white/55">dreams</em> rise{" "}
          <em className="not-italic text-white/55">through the silence.</em>
        </h1>
        <p className="animate-fade-rise-delay mt-2 max-w-[80%] text-[9px] leading-relaxed text-white/60 sm:mt-3 sm:max-w-sm sm:text-[11px] md:mt-4 md:max-w-md md:text-xs">
          We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>
        <button
          type="button"
          className="animate-fade-rise-delay-2 liquid-glass mt-3 rounded-full px-4 py-1.5 text-[9px] text-white sm:mt-4 sm:px-5 sm:py-2 sm:text-[10px] md:mt-5 md:px-6 md:py-2.5"
        >
          Begin Journey
        </button>
      </div>
    </div>
  );
}
