"use client";

// The site's second documented client-component exception (alongside
// components/reactbits/DotField). Reading the consent cookie server-side in
// app/[lang]/layout.tsx would force /es and /en off static generation
// (conflicts with dynamicParams = false + generateStaticParams). Gating GA
// behind consent has to happen in the browser, so this banner — and the
// gtag.js snippet it conditionally mounts — run as client JS.
import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useState } from "react";
import CookieIcon from "@/components/icons/CookieIcon";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

const CONSENT_COOKIE = "vg_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180; // ~180 days

// Dispatched by CookieSettingsButton (rendered in the footer) so a visitor
// can reopen the banner and change an earlier choice. A tiny custom DOM
// event is the simplest pub/sub available without pulling in a state
// library the repo otherwise doesn't have.
export const CONSENT_REOPEN_EVENT = "vg:reopen-consent-banner";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// Exported so CookieSettingsButton can hide itself when there is nothing to
// consent to. Inlined at build time: setting the var in Vercel without a
// fresh production build leaves this false.
export const GA_ENABLED =
  process.env.NODE_ENV === "production" &&
  Boolean(GA_ID) &&
  GA_ID !== "PLACEHOLDER";

function readCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row === name || row.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

function writeCookie(name: string, value: string) {
  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    "path=/",
    `Max-Age=${CONSENT_MAX_AGE}`,
    "SameSite=Lax",
    "Secure",
  ].join("; ");
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; Max-Age=0; SameSite=Lax; Secure`;
}

export default function ConsentBanner({
  lang,
  message,
  accept,
  reject,
  policyLinkLabel,
}: {
  lang: Locale;
  message: string;
  accept: string;
  reject: string;
  policyLinkLabel: string;
}) {
  const [visible, setVisible] = useState(false);
  const [granted, setGranted] = useState(false);
  const headingId = useId();

  useEffect(() => {
    const consent = readCookie(CONSENT_COOKIE);
    setGranted(consent === "granted");
    setVisible(consent !== "granted" && consent !== "denied");

    function reopen() {
      clearCookie(CONSENT_COOKIE);
      setGranted(false);
      setVisible(true);
    }

    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  // CTA click tracking, delegated from the document so the server-rendered
  // sections (Header/Hero/Contact/Services) stay free of client JS: any
  // <a> or <button> carrying data-track="name" reports a cta_click. No-op
  // until gtag is mounted (see lib/analytics.ts).
  useEffect(() => {
    if (!GA_ENABLED) return;
    function onClick(event: MouseEvent) {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!target?.dataset.track) return;
      trackEvent("cta_click", { cta: target.dataset.track, lang });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [lang]);

  function handleAccept() {
    writeCookie(CONSENT_COOKIE, "granted");
    setGranted(true);
    setVisible(false);
  }

  function handleReject() {
    writeCookie(CONSENT_COOKIE, "denied");
    setGranted(false);
    setVisible(false);
  }

  // No analytics configured = no cookie will ever be set = nothing to ask
  // consent for. Rendering the banner anyway was a prompt about nothing that
  // also sat on top of the hero CTAs.
  if (!GA_ENABLED) return null;

  return (
    <>
      {granted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {visible && (
        <div
          className="consent-banner"
          role="dialog"
          aria-labelledby={headingId}
        >
          <CookieIcon aria-hidden="true" />
          <p id={headingId}>
            {message}{" "}
            <Link href={`/${lang}/privacy`}>{policyLinkLabel}</Link>
          </p>
          <div className="consent-actions">
            <button type="button" className="btn" onClick={handleReject}>
              {reject}
            </button>
            <button
              type="button"
              className="btn solid"
              onClick={handleAccept}
            >
              {accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
