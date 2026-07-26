import PillButton from "@/components/ui/PillButton";

/* Static local-reach block: the one place the homepage states, in plain
   crawlable text, where the studio is based and which cities it serves.
   Server component on purpose; this ships zero JS. */
export default function LocalReach() {
  return (
    <section className="bg-white px-5 pb-6 text-ink">
      <div className="mx-auto max-w-[1400px] rounded-card-lg bg-fill-light px-6 py-16 text-center md:py-24">
        <p className="eyebrow mb-5 text-ink">WHERE WE WORK</p>
        <h2 className="display-2 mx-auto max-w-[16ch] text-ink">
          Web development company in Greater Noida, Delhi NCR
        </h2>
        <p className="mx-auto mt-7 max-w-[58ch] text-base font-medium leading-relaxed text-black md:text-lg">
          Webify is based in Tech Zone IV, Greater Noida. We design and build
          websites, SaaS products, and web apps for businesses across Noida,
          Ghaziabad, and Delhi, and work remotely with clients worldwide.
        </p>
        <div className="mt-9 flex justify-center">
          <PillButton tone="dark" href="/contact">
            Start a Project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
