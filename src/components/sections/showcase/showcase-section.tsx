import { ZoomParallax } from "@/components/ui/zoom-parallax";

/**
 * H7 — "Recent work" glimpse. A zoom-parallax cluster of product/brand shots
 * that expand as you scroll. [REPLACE:] images are high-res placeholders — swap
 * for real Webify client/product captures when available.
 */
const WORK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=85",
    alt: "[REPLACE:] Recent product — hero screen",
  },
  {
    src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=900&h=900&fit=crop&crop=entropy&auto=format&q=85",
    alt: "[REPLACE:] Brand system — colour & motion",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=900&fit=crop&crop=entropy&auto=format&q=85",
    alt: "[REPLACE:] App interface — dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=85",
    alt: "[REPLACE:] Marketing site — landing",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=900&fit=crop&crop=entropy&auto=format&q=85",
    alt: "[REPLACE:] Mobile app — onboarding",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=85",
    alt: "[REPLACE:] Product detail — feature",
  },
  {
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=85",
    alt: "[REPLACE:] Identity — brand mark",
  },
];

export function ShowcaseSection() {
  return (
    <section className="text-white" aria-label="Recent work">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-[clamp(1.5rem,4vw,3rem)] pt-[clamp(6rem,12vw,10rem)] sm:px-10 lg:px-16">
        <p className="mb-5 inline-flex items-center font-mono text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/45">
          <span className="mr-3 inline-block h-[0.55em] w-[0.55em] rotate-45 rounded-[1px] bg-[#6366f1]" />
          Selected work
        </p>
        <h2 className="max-w-[18ch] text-[clamp(2.25rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
          A glimpse of what we&apos;ve{" "}
          <span className="script-accent">shipped.</span>
        </h2>
      </div>

      <ZoomParallax images={WORK_IMAGES} />
    </section>
  );
}
