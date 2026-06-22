import { Mail, MessageCircle, Phone, CalendarClock } from "lucide-react";
import { siteConfig, mailtoHref, whatsappHref, telHref } from "@/lib/site";

/**
 * Direct contact channels - each renders ONLY when its value is configured in
 * site.ts (or its env var), so no dead/fake button ever ships. Email is always
 * shown because the public mailbox always exists.
 */
export function ContactChannels({ className = "" }: { className?: string }) {
  const wa = whatsappHref("Hi Webify - I'd like to talk about a project.");
  const tel = telHref();

  const item =
    "inline-flex items-center gap-2.5 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-1)] px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/[0.06]";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={mailtoHref("Project enquiry")} className={item}>
        <Mail className="h-4 w-4 text-accent-hi" aria-hidden />
        {siteConfig.email}
      </a>
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={item}>
          <MessageCircle className="h-4 w-4 text-accent-hi" aria-hidden />
          WhatsApp
        </a>
      ) : null}
      {tel ? (
        <a href={tel} className={item}>
          <Phone className="h-4 w-4 text-accent-hi" aria-hidden />
          {siteConfig.phone}
        </a>
      ) : null}
      {siteConfig.calUrl ? (
        <a href={siteConfig.calUrl} target="_blank" rel="noopener noreferrer" className={item}>
          <CalendarClock className="h-4 w-4 text-accent-hi" aria-hidden />
          Book a time
        </a>
      ) : null}
    </div>
  );
}
