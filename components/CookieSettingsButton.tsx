"use client";

// Client component (like ConsentBanner) rendered inside the server-rendered
// Footer. Lets a visitor reopen the consent banner at any time by clearing
// the vg_consent cookie and dispatching the shared reopen event ConsentBanner
// listens for — a plain DOM CustomEvent, not a state library.
import { CONSENT_REOPEN_EVENT, GA_ENABLED } from "@/components/ConsentBanner";

export default function CookieSettingsButton({ label }: { label: string }) {
  // Mirrors ConsentBanner: without analytics there is no choice to change.
  if (!GA_ENABLED) return null;
  return (
    <button
      type="button"
      className="cookie-settings"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
    >
      {label}
    </button>
  );
}
