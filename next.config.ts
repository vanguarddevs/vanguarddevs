import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Content-Security-Policy, shipped Report-Only first so a mistake here can
// only log to the console, never break the page. Promote to a real
// `Content-Security-Policy` header once a few days of production show no
// violations. What each source is for:
//   script-src  Next's inline bootstrap + the inline JSON-LD need
//               'unsafe-inline' (a nonce would cost static generation);
//               gtag.js comes from googletagmanager.com; dev needs eval.
//   connect-src /api/chat is same-origin; GA4 beacons go to
//               google-analytics.com / analytics.google.com.
//   img-src     GA's pixel fallback; data: for inline SVG/data URIs.
//   font-src    next/font self-hosts the Google fonts, so 'self' suffices.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Two years, this host only. Deliberately no includeSubDomains/preload:
  // sibling subdomains (jodaz., simplebodega.) are outside this repo and
  // not all are known to serve HTTPS. Add both once they do.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // A stray lockfile in the home dir made Next infer that as the workspace
  // root. Pin tracing to this project so the build stops warning.
  outputFileTracingRoot: __dirname,
  // app/global-not-found.tsx renders the 404 with its own <html>/<body>, so
  // the app can keep [lang]/layout.tsx as the only real root layout without
  // Next demanding an app/layout.tsx for the not-found boundary.
  experimental: { globalNotFound: true },
};

export default nextConfig;
