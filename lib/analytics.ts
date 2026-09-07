/**
 * Client-side event helper for GA4. Safe to call anywhere in the browser:
 * it is a no-op until ConsentBanner has mounted gtag.js (production build,
 * real NEXT_PUBLIC_GA_ID, visitor accepted the vg_consent cookie). Nothing
 * here decides *whether* analytics run — that gate lives in ConsentBanner.
 *
 * Events fired today:
 *   cta_click { cta, lang }   any <a>/<button data-track="…"> (delegated in ConsentBanner)
 *   chat_open { lang }        ChatWidget FAB opened
 * In GA4, mark cta_click as a key event (Admin → Events) to use it as a conversion.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
