# Baig Cloth — project context for Claude

Read this before doing anything else in this repo. It's a handoff note,
not user-facing docs (that's README.md).

## What this is

A digital-catalog website for **Baig Cloth**, a real clothing shop (owner:
lazyden771 on GitHub) selling:
- Women's unstitched fabric (traditional + fancy/party wear)
- Women's stitched/ready-to-wear
- Men's unstitched shalwar qameez fabric

It is **not** an online store with checkout — v1 is browse-the-catalog,
then order by messaging the shop on WhatsApp (a `wa.me` deep link
pre-filled with the product name/price). A cart/payment system may come
later but was explicitly deferred, not forgotten.

GitHub: https://github.com/lazyden771/baig-cloth (private repo).

## Stack

React + Vite + TypeScript + Tailwind CSS v4 (via `@tailwindcss/vite`,
theme tokens live in `src/index.css`'s `@theme` block — there is no
`tailwind.config.js`, that's expected with v4's CSS-first config).
No backend/database. React Router for pages.

## Brand identity — don't re-derive this, it's already settled

The owner supplied the real shop logo as a PDF
(`baig cloth logo/baig cloth logo.pdf`) — a black "BC" monogram bracketed
by two thin navy arcs, on white. Colors were **sampled directly from the
PDF's vector fill data** with `pymupdf` (not eyeballed, not invented):
navy `#223c80`, ink `#020202`. These are wired into `src/index.css` as
`--color-navy` / `--color-navy-shade` / `--color-navy-tint` / `--color-ink`
/ `--color-ink-soft` / `--color-paper` / `--color-surface` / `--color-line`.

`public/brand-mark.svg` and `public/favicon.svg` are the real logo,
extracted as cropped vector SVG (same pymupdf approach) — not redrawn by
hand. If the logo ever needs re-extracting (e.g. higher res, different
crop), the approach is: `pymupdf.open(pdf_path)`, `page.get_drawings()` to
read exact fill colors and bounding box, `page.get_svg_image()` for the
vector, crop the `viewBox` to the content bbox with some padding.

Design direction (from the `frontend-design` skill + `ui-ux-pro-max`
plugin, both installed specifically for this project — use them for any
further visual work): confident/geometric sans typography (Manrope), flat
white/paper surfaces with hairline borders instead of glassmorphism, the
real monogram + its own arcs as the **one** signature element — not
repeated as a decorative motif elsewhere. Do not add a gradient background,
glass blur, or a second competing accent color; that was tried once
(reverted) in an earlier, unrelated project and deliberately not repeated
here.

Reference used for critique/direction during design: nishatlinen.com was
discussed as an example of a *generic* templated competitor site to
differentiate from — sale-banner hero, generic mega-nav, brand color
confined to the logo only. Baig Cloth's design should keep avoiding those
defaults.

## File map

```
baig cloth logo/baig cloth logo.pdf   the real logo, source of truth for brand colors
public/brand-mark.svg, favicon.svg    extracted vector logo (see above)
public/products/*.png                 SAMPLE placeholder product photos, not real stock
src/config/shop.ts                    ⚠ shop name/WhatsApp number/address — all TODO placeholders
src/data/products.ts                  fallback sample products (shown until the Google Sheet is set up)
src/hooks/useProducts.ts              fetches + parses the Google Sheet CSV (papaparse), falls back to products.ts
src/lib/whatsapp.ts                   builds the wa.me order links
src/components/                       Nav, Footer, Layout, ProductCard, CategoryTile, WhatsAppButton
src/pages/                            Home, Catalog, ProductDetail, About
src/index.css                         Tailwind v4 entry + @theme color tokens (the design system lives here)
```

## What's real vs placeholder — check before claiming the site is "done"

- ❌ `src/config/shop.ts` — WhatsApp number, phone, address, city are all
  fake placeholders marked `// TODO`. Orders will not reach the real shop
  until `whatsappNumber` is set for real.
- ❌ `public/products/*.png` — sample/placeholder images, not real Baig
  Cloth stock photos.
- ❌ `productsSheetCsvUrl` in `shop.ts` is empty — no Google Sheet is
  connected yet, so the site currently always shows the hardcoded sample
  products from `src/data/products.ts`. The README has full non-technical
  setup instructions for the owner to publish their own sheet.
- ❌ No hosting/deployment yet — the site only runs locally (`npm run
  dev`) or as a local `npm run build` output. Nothing is live on the
  internet for real customers yet.
- ✅ Site structure, routing, responsive layout (mobile + desktop),
  category browsing, product detail pages, WhatsApp order-link generation,
  and the real brand identity are all built and verified working (typecheck
  + Playwright screenshots at mobile and desktop widths, checked for
  console errors).

## Working notes

- Dev server: `npm run dev` (Vite, default port 5173).
- Verification pattern used so far: `npm run build` for typecheck, then a
  headless Playwright screenshot pass (`npx playwright screenshot ...`,
  since `chromium-cli` isn't installed in this environment) at mobile
  (~390px) and desktop (~1440px) widths — actually look at the screenshot,
  don't just trust that the command exited 0.
- Git: `user.email` was a placeholder on this machine and was set to
  `lazyden771@users.noreply.github.com` for commits in this repo.
- `.gitignore` excludes `node_modules/`, `dist/`, `*.tsbuildinfo`, `.env`,
  `*.code-workspace`, and the stray empty `bg` file — those are local
  clutter, not project content.
- The owner is not very technical (needed help with basic VS Code/terminal
  steps) — when asking them to do something manually (publish a Google
  Sheet, click a GitHub button), give exact click-by-click steps, not
  assumed CLI/git fluency.

## Natural next steps (only if asked — don't assume scope)

1. Get the owner's real WhatsApp number/address into `shop.ts`.
2. Get real product photos + set up the Google Sheet, or add real
   products directly to `src/data/products.ts`.
3. Deployment (Netlify/Vercel/GitHub Pages) — not set up yet.
