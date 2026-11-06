"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/* Site-wide analytics listener. Renders nothing.
 *
 * 1. "ai_referral" once per session when a visitor arrives from an AI answer
 *    engine. ChatGPT appends utm_source=chatgpt.com to cited links; the
 *    others are recognised by referrer host.
 * 2. One delegated click listener for intent events, so no component markup
 *    changes: "booking_click" (Cal.com), "cta_click" (any link to /contact),
 *    "work_click" (any link to /project). These are intent, never leads; a
 *    lead is only "lead_submitted", fired after the server confirms delivery.
 * 3. "form_start" the first time a visitor focuses a field in any form.
 */
const AI_HOSTS: [RegExp, string][] = [
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, "chatgpt"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/(^|\.)gemini\.google\.com$/, "gemini"],
  [/(^|\.)copilot\.microsoft\.com$/, "copilot"],
  [/(^|\.)claude\.ai$/, "claude"],
];

function detectAiReferral() {
  try {
    if (sessionStorage.getItem("wf-ai-ref")) return;
    const utm = (new URLSearchParams(window.location.search).get("utm_source") || "").toLowerCase();
    let host = "";
    try {
      host = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {}
    const source =
      AI_HOSTS.find(([re]) => re.test(utm))?.[1] ?? AI_HOSTS.find(([re]) => re.test(host))?.[1];
    if (!source) return;
    sessionStorage.setItem("wf-ai-ref", source);
    track("ai_referral", { source, path: window.location.pathname });
  } catch {
    // Storage blocked: skip rather than risk double counting.
  }
}

export default function AiReferral() {
  useEffect(() => {
    detectAiReferral();

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      // RollingText buttons repeat every letter in hidden spans; their real
      // label lives in the sr-only span.
      const raw =
        a.getAttribute("aria-label") ||
        a.querySelector(".sr-only")?.textContent ||
        a.textContent ||
        "";
      const label = raw.replace(/\s+/g, " ").trim().slice(0, 60);
      const from = window.location.pathname;
      if (href.includes("cal.com/")) track("booking_click", { from, label });
      else if (href.startsWith("/contact")) track("cta_click", { from, label });
      else if (href.startsWith("/project")) track("work_click", { from, href });
    };

    let started = false;
    const onFocus = (e: FocusEvent) => {
      if (started) return;
      const el = e.target as Element | null;
      if (!el?.closest?.("form") || !el.matches("input, textarea, select")) return;
      started = true;
      track("form_start", { from: window.location.pathname });
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
