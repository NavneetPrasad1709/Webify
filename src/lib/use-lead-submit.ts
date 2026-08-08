"use client";

import { useCallback, useState } from "react";
import { track } from "@vercel/analytics";

/* Web3Forms access key, required in the browser: the free plan rejects
   server-side submissions. Safe to keep in source. Web3Forms issues it as a
   public key ("you can use it in client side code"), and a NEXT_PUBLIC_ env
   var would be inlined into this same public bundle anyway, so the exposure
   is identical while the literal removes a deploy-time dependency. The env
   var still wins if set, so rotating the key needs no code change. */
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "0ee32ca7-b451-4557-9a79-09149da9db82";

export type LeadFields = Record<string, string>;

/**
 * The one delivery pipeline every lead form on the site runs through.
 *
 * It lives here rather than in the contact page because there is now more
 * than one way to send a lead, and two copies of this would drift: the
 * honeypot, the 4xx gating, the fallback and the analytics properties all
 * have to behave identically or the numbers stop meaning anything.
 *
 * `source` is recorded on every event, which is the only way to tell whether
 * the popup or the contact page is actually producing work.
 */
export function useLeadSubmit(source: string) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const reset = useCallback(() => {
    setSubmitted(false);
    setError(false);
  }, []);

  const submit = useCallback(
    async (data: LeadFields) => {
      setError(false);
      setSending(true);

      // Honeypot: bots fill this, humans never see it. Show success and drop it.
      if (data.website) {
        setSubmitted(true);
        setSending(false);
        return;
      }

      // Declared out here so the catch block can report how the send died.
      // 0 means the request never reached the server at all.
      let status = 0;
      let usedFallback = false;

      try {
        let ok = false;

        // 1) Preferred path: the server route, which sends through Resend from
        //    the studio's own verified domain. Returns 503 when unconfigured.
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          status = res.status;
          ok = res.ok;
        } catch {
          ok = false;
        }

        // A 4xx is the server rejecting this submission on purpose: a honeypot
        // hit, a validation failure, or the rate limiter. Retrying it through
        // Web3Forms would let the browser overrule every protection the route
        // exists to apply, so only transport failures and 5xx fall through.
        const serverRejected = status >= 400 && status < 500;

        // 2) Fallback: post to Web3Forms from the browser, so a missing or
        //    broken server key never silently costs a lead.
        if (!ok && !serverRejected && WEB3FORMS_KEY) {
          // Web3Forms accepts submissions from the browser only (its free plan
          // rejects server-side calls), and its access key is public by design.
          // JSON is required: the endpoint rejects multipart form data.
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: WEB3FORMS_KEY,
              subject: data["company-name"]
                ? `New project inquiry from ${data["first-name"]} (${data["company-name"]})`
                : `New project inquiry from ${data["first-name"]}`,
              from_name: "Webify Website",
              // Web3Forms uses this as the reply-to, so replies reach the lead.
              email: data.email,
              Name: data["first-name"],
              Company: data["company-name"] || "Not specified",
              "What they need": data["project-type"] || "Not specified",
              Timeline: data.timeline || "Not specified",
              Message: data.message,
              Source: source,
              botcheck: "",
            }),
          });
          ok = res.ok && (await res.json()).success === true;
          if (ok) usedFallback = true;
        }

        if (!ok) throw new Error("delivery failed");
        setSubmitted(true);
        // Properties matter more than the event: without them there is no way
        // to tell which page, service or delivery path produced a lead.
        track("lead_submitted", {
          source,
          topic: data["project-type"] || "none",
          timeline: data.timeline || "none",
          via: usedFallback ? "web3forms" : "resend",
        });
      } catch {
        setError(true);
        // A lead that fails both paths is otherwise invisible: the visitor sees
        // an error and the studio never learns anyone tried.
        track("lead_failed", {
          source,
          stage: status === 0 ? "network" : String(status),
        });
      } finally {
        setSending(false);
      }
    },
    [source]
  );

  return { submit, submitted, sending, error, reset };
}
