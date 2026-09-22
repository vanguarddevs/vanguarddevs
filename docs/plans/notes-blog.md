# Spec: `/[lang]/notes` — bilingual notes (blog)

Status: **specified, not implemented.** Owner-approved direction (2026-09-07);
build waits for the first post so the section never ships empty.

## Why

The site is one URL per language, so it can rank for roughly one query per
language. Every note is a new keyword-bearing URL, in both languages where a
translation exists, that links back to the packages and cases. This is the
cheapest discoverability lever the README has flagged since launch.

## Non-goals

No CMS, no comments, no client-side JS for content, no tags/categories UI in
v1, no newsletter. Nothing that needs a database or an external service.

## Content model

```
content/notes/
  es/
    2026-09-reserva-atomica-cupos.mdx
  en/
    2026-09-atomic-slot-reservation.mdx
```

One file per note per language. Frontmatter (all required unless noted):

```yaml
title: "Reserva atómica de cupos: cerrar la carrera del checkout"
description: "…"            # ≤ 160 chars, becomes the meta description
date: 2026-09-14            # publish date, ISO
updated: 2026-09-20         # optional
slug: reserva-atomica-cupos # URL segment, per language
translationOf: atomic-slot-reservation   # optional: slug of the sibling note
                                         # in the other locale (drives hreflang)
draft: true                 # optional: excluded from build, sitemap, feed
```

Rules that carry over from `lib/dictionaries.ts`: impersonal voice, real
name "Jesus O.", never an invented number or client; EN is a rewrite for a
US/UK reader, not a translation. Owner writes posts; Claude may draft the
EN rewrite for approval.

## Routes (all SSG, `dynamicParams = false`)

| Route | Purpose |
| --- | --- |
| `/[lang]/notes` | list, newest first, title + description + date |
| `/[lang]/notes/[slug]` | the note |
| `/[lang]/notes/feed.xml` | RSS 2.0, per language, last 20 |

`generateStaticParams` walks `content/notes/<lang>/`. Unknown slug → the
existing `global-not-found`. Middleware needs no change (`/notes` without a
locale already redirects to `/es/notes`).

## Rendering

MDX via `@next/mdx` + `remark-gfm` — the one new dependency group. Server
components only; a note's body renders through the same brand CSS as
`/privacy` (`.legal-body` becomes a shared `.prose` class with `h2`, `h3`,
`p`, `ul/ol`, `blockquote`, `pre/code`, `a`, `img` rules — all tokens, no new
colours). Code blocks: plain `<pre>` in `--font-mono`; syntax highlighting is
out of scope for v1. Images live in `public/notes/<slug>/` with required
`alt` and explicit `width`/`height`.

Each note page ends with the shared contact strip (`SectionHead` + the
Contact component or a lighter `.sec-cta`) so every article has a CTA, and
links to the relevant package/case where the frontmatter names one
(`related: [mvp, zonacrono]`, optional).

## SEO wiring

- `generateMetadata`: title `"<note title> | VanguardDevs"`, description,
  canonical `/[lang]/notes/<slug>`, `alternates.languages` only when
  `translationOf` resolves (never a self-referencing hreflang pair to a
  missing translation), OG `type: "article"` with `publishedTime`/`modifiedTime`.
- OG image: reuse `app/[lang]/opengraph-image.tsx` pattern with the note
  title (a second `opengraph-image.tsx` under `notes/[slug]/`).
- JSON-LD per note: `Article` (`headline`, `datePublished`, `dateModified`,
  `inLanguage`, `author` → `#founder`, `publisher` → `#organization`,
  `mainEntityOfPage`) — reuses the `@id`s already emitted on the landing.
- `app/sitemap.ts`: append every non-draft note with its real
  `lastModified` (`updated ?? date`) and `changeFrequency: "monthly"`; the
  list pages weekly. Feed URLs are not listed in the sitemap.
- `robots.ts`: unchanged.
- Header/Footer: a `nav.notes` link (dictionary field) once at least one
  note exists in each language; until then only the footer links to it.

## Dictionary additions

`notes.heading`, `notes.intro`, `notes.readMore`, `notes.backToList`,
`notes.publishedOn`, `notes.updatedOn`, `nav.notes`, `notes.feedTitle`.

## Acceptance

- `npm run build` prerenders every note in both languages; `/es/notes`,
  `/en/notes` and both feeds exist as static files.
- Rich Results Test validates `Article` on a note; hreflang validator shows
  reciprocal pairs only where both languages exist.
- Lighthouse on a note page: no regression vs the landing (no client JS added).
- A `draft: true` note appears in dev only.

## First five topics (from copy already on the site)

1. Atomic slot reservation vs. overselling at checkout (ZonaCrono).
2. An append-only exchange-rate log as a product moat (Akomo).
3. RLS tenant isolation in multi-tenant SaaS (the cashback platform).
4. Cuánto cuesta un MVP en 2026 — and what "fixed scope" actually means.
5. Payment rails for LATAM founders selling in USD.

## Estimate

Platform: one batch (routes, MDX pipeline, prose CSS, metadata, sitemap,
feed, two placeholder-free sample notes supplied by the owner). Ongoing:
two notes a month, ES first, EN rewrite reviewed.
