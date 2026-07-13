import type { ReactNode } from "react";

/* Shared shell for the legal pages (/privacy, /terms): static, server-rendered,
   zero client JS. Follows the site's page conventions (pt-32 md:pt-40 hero,
   px-5 md:px-10 gutters, 820px prose measure, pure-black body text). */

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-10">
      <h2 className="text-[18px] font-extrabold tracking-tight text-ink md:text-[20px]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-[1.7] font-medium text-black md:text-base">
        {children}
      </div>
    </div>
  );
}

export default function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main>
      <section className="bg-white px-5 pb-24 pt-32 text-ink md:px-10 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[820px]">
          <p className="eyebrow text-gray-mid">{eyebrow}</p>
          <h1 className="display-2 mt-4 text-ink">{title}</h1>
          <p className="mt-4 text-sm font-medium text-black">
            Last updated: {updated}
          </p>
          {children}
        </div>
      </section>
    </main>
  );
}
