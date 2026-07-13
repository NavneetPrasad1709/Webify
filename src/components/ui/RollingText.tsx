/* The site's one letter-roll hover affordance (the studio's no-arrow rule
   substitute): two stacked copies of each character roll up through a clip
   window on hover or keyboard focus, cascading left to right.

   Requires a `group` class on the interactive ancestor (link or button).
   Consumed by Nav overlay links, Work/Projects "View" pills, accordion CTAs,
   and hero/footer pills, replacing three drifted per-file implementations. */
export default function RollingText({
  label,
  delayStep = 22,
  em = 1.28,
  secondClassName = "",
}: {
  label: string;
  /** Per-character cascade delay in ms. */
  delayStep?: number;
  /** Clip-window height in em (matches the consumer's line-height). */
  em?: number;
  /** Extra classes on the incoming copy (e.g. text-primary for a color roll). */
  secondClassName?: string;
}) {
  const h = `${em}em`;
  const roll =
    "transition-transform duration-300 ease-out group-hover:-translate-y-full " +
    "group-focus-visible:-translate-y-full";
  let letterIndex = 0;

  return (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.32em]">
        {label.split(" ").map((word, wi) => (
          <span key={wi} className="flex">
            {word.split("").map((ch, ci) => {
              const delay = `${letterIndex++ * delayStep}ms`;
              return (
                <span
                  key={ci}
                  className="relative inline-block overflow-hidden"
                  style={{ height: h, lineHeight: h }}
                >
                  <span
                    className={`block ${roll}`}
                    style={{ transitionDelay: delay, height: h, lineHeight: h }}
                  >
                    {ch}
                  </span>
                  <span
                    className={`absolute left-0 top-full block ${roll} ${secondClassName}`}
                    style={{ transitionDelay: delay, height: h, lineHeight: h }}
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}
