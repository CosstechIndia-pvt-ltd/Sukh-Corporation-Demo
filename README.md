# Sukh Corporation — client demo

A static, client-facing real estate website for Sukh Corporation: 30 fictional listings across residential, commercial and farmland in 12 Indian cities, with search and filters, shortlist, compare, enquiry and five switchable colour themes. There is no backend; all data is local.

**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · Radix primitives (restyled) · zustand · react-hook-form + zod · Embla.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production
npm run typecheck && npm run lint
```

Node 20+ is required. Every page is statically generated (40 routes).

> If a dev server is already running in this folder, build to a separate directory so the two don't overwrite each other:
> `NEXT_DIST_DIR=.next-prod npm run build && NEXT_DIST_DIR=.next-prod npm start -- -p 3001`

## Where to edit things

| What | File |
|---|---|
| Listings (30 properties, images, advisor per listing) | `data/properties.ts` |
| Phone, WhatsApp number, email, offices, headline stats, disclaimer | `data/site.ts` |
| Cities, localities and city card images | `data/cities.ts` |
| Leadership team, advisors, milestones, awards | `data/team.ts` |
| Testimonials | `data/testimonials.ts` |
| Certifications (RERA per state, ISO, CREDAI, IGBC) | `data/certifications.ts` |
| Filter options, budget scales, sort order | `lib/filters.ts` |
| Price / area / date formatting (lakh–crore, Indian grouping) | `lib/format.ts` |
| EMI formula | `lib/emi.ts` |

**Contact numbers:** change `site.phone` and `site.whatsapp` in `data/site.ts`. `whatsapp.number` must be digits only, with the country code (e.g. `919713391199`). Every WhatsApp and call button reads from here. Each listing's advisor number lives in `data/team.ts` → `advisors`.

**Images** come from `images.unsplash.com` (allowed in `next.config.ts`). Add a photo by its Unsplash ID to the `I` map at the top of `data/properties.ts`. `SmartImage` shows a tinted placeholder while loading, and a monogram fallback if a URL ever fails.

## Themes

All colours are CSS variables defined in `app/globals.css`, under `:root[data-theme="…"]`. Components use only these tokens (`bg-surface`, `text-ink-muted`, `border-line`, `bg-primary`, …) and never raw colours.

**To add a theme:**

1. Copy one `:root[data-theme="…"]` block in `app/globals.css` and give it a new id. Set `--bg`, `--surface`, `--surface-2`, `--ink`, `--ink-muted`, `--line`, `--primary`, `--primary-ink`, `--accent`, `--accent-2`, `--highlight`, `--success`, `--danger`, `--scrim` (RGB triplet) and `color-scheme`.
2. Add `{ id, name, swatch: [primary, accent, highlight] }` to `THEMES` in `lib/themes.ts`, and the id to the allow-list inside `themeInitScript` in the same file.
3. Check contrast. `--ink-muted` should be about 74% ink mixed into bg, which gives at least 4.5:1 on bg, surface and accent-2. Gold text uses the derived `highlight-ink` token automatically.

The floating **Theme** pill (bottom-left) is a showcase control. To ship a single palette, remove `<ThemeSwitcher />` from `app/layout.tsx` and set `DEFAULT_THEME` in `lib/themes.ts`. The choice is saved in `localStorage`, and an inline `<head>` script applies it before first paint, so there is no flash of the wrong theme.

## Notes

- Filters, sort, view and pagination live in the URL (`/properties?type=sale&city=Pune&bhk=2`), so results are shareable and the back button works.
- Shortlist, compare and submitted enquiries are stored in `localStorage` only.
- Enquiry submission is simulated (about 900 ms), then shows a `SUKH-2026-XXXXX` reference.
- The location section uses a styled static map with an "Open map" link to OpenStreetMap, rather than an embed, to keep the page fast.
- `/shortlist` and `/compare` are marked `noindex` on purpose: they're per-visitor pages.
- All listings, people, certificate numbers and RERA IDs are fictional. Certification seals are original drawings, not real logos.
