"use client";

/* Client component by necessity: open/closed state, streamed messages and
   focus management. Mounted only on the landing page, only when
   GEMINI_API_KEY is set (see app/[lang]/page.tsx). Styles are the
   self-contained ./chat-widget.css — no brand tokens on purpose. */
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import "./chat-widget.css";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["chat"];
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: next.slice(-12) }),
      });
      if (res.status === 429) throw new Error("rate");
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages([...next, { role: "assistant", content: "" }]);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      // Empty body = provider failed before the first byte (route.ts).
      if (acc === "") throw new Error("empty");
    } catch (err) {
      const msg = (err as Error).message === "rate" ? dict.rateLimited : dict.error;
      setMessages([...next, { role: "assistant", content: msg }]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label={dict.title}>
          <header className="chat-head">
            <div>
              <strong>{dict.title}</strong>
              <small>{dict.subtitle}</small>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={dict.close}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className="chat-log" ref={logRef} aria-live="polite">
            <div className="chat-bubble" data-role="assistant">{dict.greeting}</div>
            {messages.map((m, i) => (
              <div key={i} className="chat-bubble" data-role={m.role}>
                {m.content}
              </div>
            ))}
            {busy && messages.at(-1)?.role === "user" && (
              <div className="chat-bubble" data-role="assistant">
                <span className="chat-typing" aria-hidden="true">
                  <span /><span /><span />
                </span>
              </div>
            )}
            {messages.length === 0 && (
              <div className="chat-chips">
                {dict.suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="chat-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={dict.placeholder}
                maxLength={1000}
                aria-label={dict.placeholder}
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label={dict.send}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            <p>
              {dict.disclaimer}{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-track="chat_talk_to_human">
                {dict.talkToHuman}
              </a>
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        onClick={() =>
          setOpen((v) => {
            if (!v) trackEvent("chat_open", { lang });
            return !v;
          })
        }
        aria-expanded={open}
        aria-label={open ? dict.close : dict.open}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M3 6.5A2.5 2.5 0 015.5 4h9A2.5 2.5 0 0117 6.5v5a2.5 2.5 0 01-2.5 2.5H8l-4 3v-3h-.5A.5.5 0 013 13.5v-7z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}
