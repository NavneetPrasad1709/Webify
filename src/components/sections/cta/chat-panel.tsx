"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { FadeUp } from "./fade-up";
import { Sparkles, ArrowUp } from "lucide-react";

type Message = { role: "assistant" | "user"; text: string };

const SEED_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Welcome to the Vibe Design course! I'll guide you through building stunning websites with AI. What would you like to learn first?",
  },
  {
    role: "user",
    text: "I want to learn how to build a hero section with a cinematic video background using AI.",
  },
  {
    role: "assistant",
    text: "Great choice! In this course, you'll learn how to create full-screen looping videos, liquid glass nav bars, email signups, and manifesto buttons - all with AI assistance. Let's dive in!",
  },
];

export function ChatPanel({
  initialScroll = "top",
  animateMessagesIn = false,
}: {
  initialScroll?: "top" | "bottom";
  animateMessagesIn?: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = initialScroll === "bottom" ? el.scrollHeight : 0;
  }, [initialScroll]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      {
        role: "assistant",
        text: "Love it - let's build that. I'll walk you through it step by step inside the course.",
      },
    ]);
    setDraft("");
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
      const ta = textareaRef.current;
      if (ta) ta.style.height = "auto";
      textareaRef.current?.focus();
    });
  };

  const autosize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  };

  return (
    <div
      className="flex h-full flex-col rounded-2xl border border-white/10"
      style={{
        background: "rgba(8,8,10,0.6)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5">
          <Sparkles className="h-3.5 w-3.5 text-white/70" strokeWidth={1.75} aria-hidden />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium text-white">Vibe Design course</p>
          <p className="text-[11px] text-white/40">Learn how to build website with AI</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="scrollbar-hide flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((m, i) => {
          const bubble = (
            <div className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-white/15 text-white/90"
                    : "border border-white/5 bg-white/5 text-white/70",
                )}
              >
                {m.text}
              </div>
            </div>
          );
          return animateMessagesIn && i < SEED_MESSAGES.length ? (
            <FadeUp key={i} delay={i * 0.12} y={16}>
              {bubble}
            </FadeUp>
          ) : (
            <div key={i}>{bubble}</div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3">
        <div className="liquid-glass flex items-end gap-2 rounded-2xl p-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={draft}
            placeholder="Ask about the course..."
            aria-label="Ask about the course"
            onChange={(e) => {
              setDraft(e.target.value);
              autosize(e.currentTarget);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            className="scrollbar-hide max-h-28 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-white outline-none placeholder:text-white/40"
          />
          <button
            type="button"
            onClick={send}
            aria-label="Send message"
            className="rounded-xl bg-white p-2 text-black"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
