import PillButton from "@/components/ui/PillButton";

export default function CtaBand() {
  return (
    <section className="bg-white px-5">
      {/* Inset rounded card seam between the light bands */}
      <div className="mx-auto max-w-[1400px] rounded-card-lg bg-ink px-5 py-20 text-center text-white md:py-24">
        <p className="eyebrow text-gray-soft">READY WHEN YOU ARE</p>
        <h2 className="display-2 mt-4 text-white">START A PROJECT TODAY</h2>
        <p className="mx-auto mt-6 max-w-md text-base text-white">
          Tell us what you are building. We will map the fastest route to launch,
          no pitch deck, no obligation.
        </p>
        <div className="mt-8 flex justify-center">
          <PillButton tone="blue" href="/contact">
            Start a Project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
