import PillButton from "@/components/ui/PillButton";
import { BOOKING_URL } from "@/lib/site";

/* Almost nobody arrives here from search. They arrive from a profile, a
   message or a proposal, usually on a US clock, and they are silently asking
   four questions before they will book anything: is this real, who actually
   does the work, how do we talk across timezones, and what does it cost.
   This block answers all four in plain crawlable text before they have to ask.
   Server component on purpose; ships zero JS. */

const answers = [
  {
    label: "Hours",
    heading: "Your morning, our evening",
    body: "Calls run 6:00 pm to 11:00 pm IST. That lands between 8:30 am and 1:30 pm in New York, and the start of the working day in San Francisco. You brief us at the end of your day and read the update at the start of the next one.",
  },
  {
    label: "Who builds it",
    heading: "The people who scoped it",
    body: "You talk to the developers and designers doing the work, not an account layer that relays it. The person who writes your scope is on the call when you question it.",
  },
  {
    label: "Between calls",
    heading: "A live URL, not a status email",
    body: "You get a staging link in the first week and it updates as we build. Progress is something you check, not something you have to ask for.",
  },
  {
    label: "Money",
    heading: "Fixed price, quoted in USD",
    body: "The number is agreed before any work starts. If the scope genuinely changes, it gets re-quoted and you approve it. Nothing is billed by surprise.",
  },
];

export default function WorkingRemotely() {
  return (
    <section className="bg-white px-5 pb-6 text-ink">
      <div className="mx-auto max-w-[1400px] rounded-card-lg bg-fill-light px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[70ch] text-center">
          <p className="eyebrow mb-5 text-ink">Working with us</p>
          <h2 className="display-2 mx-auto max-w-[18ch] text-ink">
            Remote, and specific about it
          </h2>
          <p className="mx-auto mt-7 max-w-[58ch] text-base font-medium leading-relaxed text-black md:text-lg">
            Most of our clients have never met us in person and never need to.
            Here is exactly how that works, before you have to ask.
          </p>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-card bg-border-soft md:grid-cols-2">
          {answers.map((a) => (
            <div key={a.label} className="bg-white p-8 md:p-10">
              <dt className="eyebrow text-black">{a.label}</dt>
              <p className="mt-4 text-xl font-extrabold tracking-tight text-ink md:text-2xl">
                {a.heading}
              </p>
              <dd className="mt-3 max-w-[46ch] text-base font-medium leading-relaxed text-black">
                {a.body}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mx-auto mt-12 max-w-[58ch] text-center text-base font-medium leading-relaxed text-black">
          Webify is based in Tech Zone IV, Greater Noida, and works remotely
          with clients worldwide.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <PillButton tone="blue" href={BOOKING_URL}>
            Book a 20 Minute Call
          </PillButton>
          <PillButton tone="dark" href="/contact">
            Start a Project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
