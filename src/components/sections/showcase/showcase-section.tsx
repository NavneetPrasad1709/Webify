import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { SparklesTitle } from "@/components/ui/sparkles-title";

/**
 * H7 - Craft glimpse. A zoom-parallax cluster of interface/product visuals that
 * expand as you scroll. Images are illustrative of the kind of work we build
 * (not specific client captures) - swap for real production shots once a public
 * engagement exists.
 */
const WORK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=85",
    alt: "Product interface - illustrative",
  },
  {
    src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1400&h=1400&fit=crop&crop=entropy&auto=format&q=85",
    alt: "Brand system - colour & motion, illustrative",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&h=1400&fit=crop&crop=entropy&auto=format&q=85",
    alt: "App dashboard - illustrative",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=85",
    alt: "Marketing site layout - illustrative",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=1400&fit=crop&crop=entropy&auto=format&q=85",
    alt: "Mobile onboarding flow - illustrative",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=85",
    alt: "Product feature detail - illustrative",
  },
  {
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=85",
    alt: "Brand identity mark - illustrative",
  },
];

export function ShowcaseSection() {
  return (
    <section className="text-white" aria-label="Recent work">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-32 lg:px-16">
        <p className="mb-5 inline-flex items-center font-mono text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/60">
          <span className="mr-3 inline-block h-[0.55em] w-[0.55em] rotate-45 rounded-[1px] bg-[#6366f1]" />
          The craft
        </p>
        <SparklesTitle
          as="h2"
          className="max-w-[18ch] text-[clamp(2.25rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
          beamClassName="mx-0 mr-auto mt-1 max-w-[22rem]"
          density={32}
        >
          Interfaces we love to <span className="script-accent">build.</span>
        </SparklesTitle>
      </div>

      <ZoomParallax images={WORK_IMAGES} />
    </section>
  );
}
