"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/* Records one "ai_referral" event per session when a visitor arrives from an
   AI answer engine, so AI-referred visits and leads can be told apart in
   Vercel Analytics. ChatGPT appends utm_source=chatgpt.com to cited links;
   the others are recognised by referrer host. Renders nothing. */
const AI_HOSTS: [RegExp, string][] = [
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, "chatgpt"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/(^|\.)gemini\.google\.com$/, "gemini"],
  [/(^|\.)copilot\.microsoft\.com$/, "copilot"],
  [/(^|\.)claude\.ai$/, "claude"],
];

export default function AiReferral() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("wf-ai-ref")) return;
      const params = new URLSearchParams(window.location.search);
      const utm = (params.get("utm_source") || "").toLowerCase();
      let host = "";
      try {
        host = document.referrer ? new URL(document.referrer).hostname : "";
      } catch {}
      const source =
        AI_HOSTS.find(([re]) => re.test(utm))?.[1] ??
        AI_HOSTS.find(([re]) => re.test(host))?.[1];
      if (!source) return;
      sessionStorage.setItem("wf-ai-ref", source);
      track("ai_referral", { source, path: window.location.pathname });
    } catch {
      // Storage blocked: skip tracking rather than risk double counting.
    }
  }, []);
  return null;
}
