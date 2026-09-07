# VanguardDevs — vanguarddevs.com

Bilingual (ES/EN) site for VanguardDevs, a boutique product studio founded by
Jesus O., positioned on fintech / insurtech / lending: MVPs, multi-tenant SaaS
and embedded infrastructure (widgets, SDKs, partner APIs) for clients in the
USA, UK and LATAM. Built with Next.js App Router. The original static design
lives in `design-reference/`. Copy voice is fully impersonal — no first person
("I" or "we") anywhere; VanguardDevs or the product is the subject.

Landing page (`/es`, `/en`): Hero → Case studies (`#cases`) → Process + packages
(`#process`) → Contact (`#contact`). Primary CTA is WhatsApp on `/es`; on `/en`
it switches to a booking link once `BOOKING_URL` is filled in. No forms.

`components/Industries.tsx` is built and compiles but is intentionally not
mounted; re-add it to `app/[lang]/page.tsx` (and its `#industries` link to
`Header.tsx`) to bring the section back.

Pending `[PLACEHOLDER]`s before launch (search the codebase for `PLACEHOLDER`):
the Calendly/booking URL (`BOOKING_URL` in `lib/site.ts`, which gates the English
primary CTA), two client testimonials, two package prices, the Akomo case body
and the `lending` industry line (`lib/dictionaries.ts`).
Also pending: the real GA4 measurement ID (`NEXT_PUBLIC_GA_ID` in `.env.example`),
the legal entity name and jurisdiction backing the privacy policy, a
dedicated DPO/privacy contact (may reuse `CONTACT_EMAIL` or need its own),
the GA4 and cookie-consent record retention periods, and the privacy
policy's effective/last-updated date — all in the draft copy under
`lib/dictionaries.ts`'s `privacy` key (see `docs/plans/analytics-cookie-consent.md`).

## Run

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (fully static pages)
```

## Architecture

- `app/[lang]/` — one statically generated page per locale (`/es`, `/en`).
  Spanish is the default/x-default locale per brand guidelines.
- `middleware.ts` — 307-redirects any unprefixed path to its locale version
  (`/` → `/es`, `/privacy` → `/es/privacy`) based on `Accept-Language` (Spanish wins
  on ambiguity). `/es/*` and `/en/*` pass through; the matcher skips Next
  internals and anything with a file extension, which is what keeps
  `robots.txt`, `sitemap.xml` and `/public` assets out of it.
- `lib/dictionaries.ts` — all copy for both languages, typed. Edit content here.
- `app/globals.css` — the brand system (Fog / Obsidian / Voltage Violet), built
  on hairline rules and generous whitespace, with contrast carried by type scale
  rather than heavy borders. All colour goes through semantic tokens; body text
  must clear 4.5:1 on both `--paper` and the `--tint` hover surface. The site has
  no dark mode.
- `lib/fonts.ts` — self-hosted fonts (Anton, Archivo, IBM Plex Mono) via `next/font` —
  no external font requests, zero layout shift. Shared by the `[lang]` layout and the
  root 404 fallback (see below).
- 404s: a single file, `app/global-not-found.tsx` (Next's `experimental.globalNotFound`),
  rendering `components/NotFound.tsx` (glitch/terminal-styled body, shown bilingually
  since a not-found page can't access the locale). It is the one place outside `[lang]`
  that renders its own `<html>`/`<body>`, hard-coded to `lang="es"` — this app has no
  root `app/layout.tsx`, and a plain `app/not-found.tsx` would demand one; see
  CLAUDE.md for why the alternatives cost more than they're worth.

## SEO checklist (implemented)

- Server-rendered content per language at its own URL — no client-side language
  toggle, so crawlers index both versions.
- `hreflang` alternates + `x-default` in both `<head>` and `sitemap.xml`.
- Per-locale canonical URLs, titles, descriptions, Open Graph + Twitter cards.
- JSON-LD structured data: `ProfessionalService` (with service offers and
  areaServed), `WebSite`, `WebPage`.
- `sitemap.xml` and `robots.txt` generated from code (`app/sitemap.ts`, `app/robots.ts`).
- Per-locale Open Graph image generated at build (`app/[lang]/opengraph-image.tsx`).
- Titles and descriptions carry the positioning keywords (fintech, insurtech,
  multi-tenant SaaS, MVP).
- Static generation (SSG) for both pages → fast TTFB and Core Web Vitals;
  zero client-side JS required for any content.
- `sitemap.xml` entries carry `lastModified` (build time).
- Security headers (HSTS, nosniff, frame denial, referrer/permissions policy,
  CSP in report-only) from `next.config.ts`.
- `www.vanguarddevs.com` 301s to the apex at Cloudflare (Redirect Rule); the
  apex DNS record stays DNS-only so Vercel issues the certificate.

## Post-launch (manual steps)

1. Deploy (Vercel is the zero-config path) and point `vanguarddevs.com` at it.
2. Verify the domain in Google Search Console and submit `sitemap.xml`.
3. Set up a Google Business Profile (helps for "desarrollo de software Venezuela"
   style local queries) and link it to the site.
4. Keep publishing: the fastest ranking lever for a new domain is content —
   consider a `/notes` or case-study section fed by the Instagram "Field notes"
   pillar (P2 in the brand guide). Deferred by the owner for now.
5. Collect the two client testimonials — the render path is already wired, so
   they only need pasting into the `testimonial` fields in `lib/dictionaries.ts`.
