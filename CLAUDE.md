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
public/hero/hero-*.svg                SAMPLE placeholder hero slides, not real photos
src/config/shop.ts                    ⚠ address/city still TODO (WhatsApp number IS real)
src/data/products.ts                  fallback sample products (shown until the Google Sheet is set up)
src/data/hero.ts                      hero slideshow list (src/alt/caption/href per slide)
src/components/HeroCarousel.tsx       auto-advancing hero slideshow (see notes below)
src/hooks/useProducts.ts              fetches + parses the Google Sheet CSV (papaparse), falls back to products.ts
src/lib/whatsapp.ts                   builds the wa.me order links
src/components/                       Nav, Footer, Layout, ProductCard, CategoryTile, WhatsAppButton
src/pages/                            Home, Catalog, ProductDetail, About
src/index.css                         Tailwind v4 entry + @theme color tokens (the design system lives here)
```

## What's real vs placeholder — check before claiming the site is "done"

- ✅ `whatsappNumber` / `phoneDisplay` in `src/config/shop.ts` are **real**
  (`923265382969` / `+92 326 5382969`), set deliberately in commits
  `b61f278` and `c5a85f8`. Orders reach the shop today. The `// TODO`
  comments next to those two lines are stale — ignore them.
- ❌ `address` and `city` in `shop.ts` are still fake ("Main Bazaar Road",
  "Your City, Pakistan") and they render on the Footer and About page.
- ❌ `public/products/*.png` — sample/placeholder images, not real Baig
  Cloth stock photos.
- ❌ `public/hero/hero-*.svg` — placeholder hero slides. The owner's real
  photos live on their Windows PC at
  `C:\Users\aneeq\Downloads\BG\bg hero section images`, which a remote
  session cannot reach — they have to be uploaded to `public/hero/` from
  the owner's own machine (README has click-by-click steps).
- ❌ `productsSheetCsvUrl` in `shop.ts` is empty — no Google Sheet is
  connected yet, so the site currently always shows the hardcoded sample
  products from `src/data/products.ts`. The README has full non-technical
  setup instructions for the owner to publish their own sheet.
- ❌ No hosting/deployment yet — the site only runs locally (`npm run
  dev`) or as a local `npm run build` output. Nothing is live on the
  internet for real customers yet.
- ✅ Site structure, routing, responsive layout (mobile + desktop),
  category browsing, product detail pages, WhatsApp order-link generation,
  the hero slideshow, and the real brand identity are all built and verified
  working (typecheck + Playwright screenshots at mobile and desktop widths,
  checked for console errors).

## Hero slideshow notes

`HeroCarousel.tsx` — a translateX flex track, not a library. Things that are
load-bearing, learned the hard way:

- The carousel root needs **`min-w-0`**. As a CSS grid item its default
  `min-width: auto` sizes the column to all four slides side by side, which
  pushed the whole mobile page off screen. Verified fixed by asserting
  `document.documentElement.scrollWidth === window.innerWidth` at 390 /
  768 / 1440.
- Non-active slides get `aria-hidden` **and `inert`** (React 19 supports the
  bare attribute). Without `inert`, the links inside off-screen slides stay
  tabbable and focusing one scrolls the `overflow-hidden` frame, permanently
  desyncing it from the transform. Verified: only the active slide's link is
  a tab stop, and `scrollLeft` stays 0.
- Autoplay pauses on hover/focus, on `visibilitychange`, and is disabled
  outright under `prefers-reduced-motion` (the global rule in `index.css`
  kills the transition but not the timer).
- Layout is text-beside-frame, **not** text-over-photo, deliberately: the
  owner's photos were unseen when this was built, so headline contrast over
  them couldn't be guaranteed. Revisit once real photos are in.

## Known issues, not yet fixed (from the 2026-08-17 audit)

Full detail was given to the owner in that session; the short list:

1. **No SPA rewrite config** (`_redirects` / `vercel.json` / `404.html`) —
   every shared `/product/:id` link will hard-404 on Netlify/Vercel/Pages.
   `vite preview` masks this by serving 200 for everything.
2. **No `path="*"` route** — an unknown URL renders a completely blank page
   (verified `body` innerText length 0), because the pathless layout route
   matches nothing.
3. **No OG/Twitter meta tags** — links shared on WhatsApp, the one
   distribution channel, get no preview card.
4. Catalog-page notice leaks internal jargon ("Add your own in the Google
   Sheet") to customers; About page still says "Add a short story here".
5. `useProducts()` is called separately in Home/Catalog/ProductDetail — no
   cache, so the sheet is re-fetched on every navigation.
6. Catalog filter state reads `?category=` only on mount, so back/forward
   and nav clicks desync the chips from the URL.
7. `useProducts.ts` fallback image is a women's photo regardless of
   category; `parseInStock` fails open (only `no/false/0/out of stock`
   count as unavailable).
8. Every page shares the `<title>` "Baig Cloth"; no sitemap, robots.txt, or
   `LocalBusiness` schema; no analytics on the WhatsApp click, which is the
   site's only conversion event.

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

1. Get the owner's real `address` / `city` into `shop.ts` (the WhatsApp
   number is already real).
2. Get real product photos + set up the Google Sheet, or add real
   products directly to `src/data/products.ts`. Real hero photos into
   `public/hero/` + `src/data/hero.ts`.
3. Deployment (Netlify/Vercel/GitHub Pages) — not set up yet. Whichever is
   picked, it needs the SPA rewrite from "Known issues" #1 or every shared
   product link 404s.

## Remote-session gotchas (self-hosted runner)

- The runner's local git credential is a **read-only** token for a different
  account (`allomorphy`) — `git push` fails with 403 "Permission denied".
  The **github MCP server is authenticated as `lazyden771`** and does have
  write access, so push via `mcp__github__create_branch` +
  `mcp__github__push_files` instead. Local commits still work fine for
  staging/diffing.
- Playwright: browsers are cached at `~/.cache/ms-playwright/` but
  `playwright-core` is not in this project's `node_modules`. What works is
  importing it from another project on the box and pointing at the cached
  binary explicitly:
  `chromium.launch({ executablePath: '/home/ubuntu/.cache/ms-playwright/chromium-1140/chrome-linux/chrome' })`.
  Don't `hover()` the carousel track — its bounding box centre lies outside
  the visible frame, so actionability waits skew the result; hover the
  active `img` instead.
- Assert `document.documentElement.scrollWidth === window.innerWidth` on any
  layout change. That is what caught the mobile overflow the screenshots
  made obvious only after the fact.
