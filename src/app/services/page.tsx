import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { SparklesTitle } from "@/components/ui/sparkles-title";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI products, web apps, mobile, design & UX, MVP sprints, integrations, automation, and technical strategy - senior-led, end to end. Clear engagement models and transparent pricing.",
};

/** A single capability / step block (mirrors the story-scroll block layout). */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-[180px] flex-1">
      <p className="mb-2.5 text-base font-bold uppercase tracking-wider">{title}</p>
      <p className="text-[clamp(1rem,1.6vw,1.3rem)] leading-relaxed opacity-85">{children}</p>
    </div>
  );
}

const HEADING =
  "text-[clamp(3rem,11vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight";

/**
 * /services - S1..S6 delivered through the story-scroll (FlowArt) engine:
 * stacked full-screen panels that rotate up and pin over one another.
 * S1 hero · S2 service blocks · S3 capabilities/stack · S4 engagement+pricing ·
 * S5 process · S6 CTA. Big headings carry the SparklesTitle treatment.
 */
export default function ServicesPage() {
  return (
    <FlowArt aria-label="Webify services">
      {/* S1 - Services hero */}
      <FlowSection aria-label="Services" style={{ backgroundColor: "#4f46e5", color: "#fff" }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">01 - Services</p>
        <hr className="my-[2vw] border-none border-t border-white/40" />
        <SparklesTitle
          as="h1"
          className={HEADING}
          sparkleColor="#ffffff"
          density={50}
          beamClassName="mx-0 mr-auto mt-2 max-w-[24rem]"
        >
          What We
          <br />
          <span className="script-accent">Build</span>
        </SparklesTitle>
        <hr className="my-[2vw] border-none border-t border-white/40" />
        <p className="mt-auto max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Senior-led product teams that design, build, and ship AI products, web
          platforms, and mobile apps - end to end. No account managers, no junior
          hand-offs. You work directly with the people who build.
        </p>
      </FlowSection>

      {/* S2 - Service blocks (8) */}
      <FlowSection aria-label="What we do" style={{ backgroundColor: "#0a0a0a", color: "#fff" }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">02 - What we do</p>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <SparklesTitle
          as="h2"
          className={HEADING}
          sparkleColor="#818cf8"
          density={50}
          beamClassName="mx-0 mr-auto mt-2 max-w-[24rem]"
        >
          Eight
          <br />
          Ways
          <br />
          We <span className="script-accent">Ship</span>
        </SparklesTitle>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <div className="flex flex-wrap gap-[3vw]">
          <Block title="AI Products">
            LLM apps, agents, RAG, and ML features wired into real products people use.
          </Block>
          <Block title="Web Apps">
            Next.js platforms, SaaS, dashboards, and sites engineered to perform.
          </Block>
          <Block title="Mobile Apps">
            iOS &amp; Android with React Native - one codebase, a native feel.
          </Block>
          <Block title="Design &amp; UX">
            Product design and design systems that make software feel inevitable.
          </Block>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <div className="flex flex-wrap gap-[3vw]">
          <Block title="MVP Sprints">
            0→1 in weeks. A working, demo-able, fundable product - fast.
          </Block>
          <Block title="Integrations &amp; APIs">
            Payments, data pipelines, and third-party systems wired in cleanly.
          </Block>
          <Block title="AI Automation">
            Internal tools and workflows that buy back your team&apos;s time.
          </Block>
          <Block title="Tech Strategy">
            Architecture, audits, and fractional-CTO guidance as you scale.
          </Block>
        </div>
      </FlowSection>

      {/* S3 - Capabilities / tech stack */}
      <FlowSection aria-label="Capabilities" style={{ backgroundColor: "#f4f1ea", color: "#0a0a0a" }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">03 - Capabilities</p>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <SparklesTitle
          as="h2"
          className={HEADING}
          sparkleColor="#4f46e5"
          density={50}
          beamClassName="mx-0 mr-auto mt-2 max-w-[24rem]"
        >
          The
          <br />
          <span className="script-accent script-accent-ink">Stack</span>
        </SparklesTitle>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <p className="max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Modern where it matters, boring where it counts - tooling chosen to ship
          fast and scale calmly.
        </p>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div className="flex flex-wrap gap-[3vw]">
          <Block title="Frontend">Next.js, React, TypeScript, Tailwind, GSAP.</Block>
          <Block title="Backend">Node, Python, Postgres, Redis, REST &amp; tRPC.</Block>
          <Block title="AI / ML">OpenAI, Anthropic, LangChain, vector DBs, fine-tuning.</Block>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div className="flex flex-wrap gap-[3vw]">
          <Block title="Mobile">React Native, Expo, native modules.</Block>
          <Block title="Infra">Vercel, AWS, Docker, CI/CD, observability.</Block>
          <Block title="Quality">Typed end to end, tested, monitored.</Block>
        </div>
      </FlowSection>

      {/* S4 - Engagement models + pricing clarity */}
      <FlowSection aria-label="Engagement and pricing" style={{ backgroundColor: "#1d4ed8", color: "#fff" }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">04 - Engagement &amp; pricing</p>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <SparklesTitle
          as="h2"
          className={HEADING}
          sparkleColor="#ffffff"
          density={50}
          beamClassName="mx-0 mr-auto mt-2 max-w-[24rem]"
        >
          How
          <br />
          We
          <br />
          <span className="script-accent">Engage</span>
        </SparklesTitle>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <p className="max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Clear scope, clear pricing. You always know what you&apos;re paying for -
          and why.
        </p>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <div className="flex flex-wrap gap-[3vw]">
          <Block title="MVP Sprint">
            A working product in 4-6 weeks. Fixed scope, fixed price, agreed before
            we start.
          </Block>
          <Block title="Fixed-scope Project">
            A defined deliverable, milestone-based and milestone-billed. No surprises.
          </Block>
          <Block title="Dedicated Team">
            A senior pod on a monthly retainer, running your roadmap with you.
          </Block>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <p className="mt-auto max-w-[55ch] text-[clamp(0.95rem,1.6vw,1.25rem)] leading-relaxed opacity-90">
          Indicative ranges up front, a fixed quote within 48 hours, and
          GST-compliant invoicing for Indian clients. Pricing in ₹ or $.
        </p>
      </FlowSection>

      {/* S5 - Process timeline */}
      <FlowSection aria-label="Process" style={{ backgroundColor: "#0a0a0a", color: "#fff" }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">05 - Process</p>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <SparklesTitle
          as="h2"
          className={HEADING}
          sparkleColor="#818cf8"
          density={50}
          beamClassName="mx-0 mr-auto mt-2 max-w-[24rem]"
        >
          How
          <br />
          It
          <br />
          <span className="script-accent">Works</span>
        </SparklesTitle>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <p className="max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          A tight, senior-led loop - you see working software every single week.
        </p>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <div className="flex flex-wrap gap-[3vw]">
          <Block title="01 - Discovery">
            We pressure-test the idea, scope the build, and agree on what success looks like.
          </Block>
          <Block title="02 - Design">
            Flows, UI, and a clickable prototype - so we&apos;re aligned before code.
          </Block>
          <Block title="03 - Build">
            Weekly shippable increments. You always have something real to click.
          </Block>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <div className="flex flex-wrap gap-[3vw]">
          <Block title="04 - Launch">
            Hardening, QA, and a calm production release - on infra built to last.
          </Block>
          <Block title="05 - Scale">
            Measure, iterate, and grow. We stay on as long as you need us.
          </Block>
        </div>
      </FlowSection>

      {/* S6 - CTA band */}
      <FlowSection aria-label="Start a project" style={{ backgroundColor: "#4f46e5", color: "#fff" }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">06 - Start</p>
        <hr className="my-[2vw] border-none border-t border-white/40" />
        <SparklesTitle
          as="h2"
          className={HEADING}
          sparkleColor="#ffffff"
          density={50}
          beamClassName="mx-0 mr-auto mt-2 max-w-[24rem]"
        >
          Ready
          <br />
          To
          <br />
          <span className="script-accent">Build?</span>
        </SparklesTitle>
        <hr className="my-[2vw] border-none border-t border-white/40" />
        <div className="mt-auto flex flex-col gap-6">
          <p className="max-w-[55ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
            Tell us what you&apos;re building. We&apos;ll scope it, price it, and ship
            a working prototype - fast.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white px-7 py-3 text-base font-semibold text-[#1a1a2e] transition-transform duration-300 hover:scale-105"
            >
              Book a call
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-white/40 px-7 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              See our work
            </Link>
          </div>
        </div>
      </FlowSection>
    </FlowArt>
  );
}
