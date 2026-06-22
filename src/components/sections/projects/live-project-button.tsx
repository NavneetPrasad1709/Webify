import { cn } from "@/lib/utils";

export function LiveProjectButton({
  href = "#",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
        "rounded-full border-2 border-[#D7E2EA]",
        "px-5 py-2 sm:px-6 sm:py-3",
        "text-xs uppercase tracking-widest text-[#D7E2EA]",
        "transition-colors hover:bg-[#D7E2EA] hover:text-[#0C0C0C]",
        className,
      )}
    >
      Live Project
    </a>
  );
}
