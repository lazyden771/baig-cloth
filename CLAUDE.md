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
public/hero/hero-[1-5].svg            SAMPLE 16:9 banner placeholders, not the real creatives
public/og-image.png                   ⚠ NOT COMMITTED YET — see "Launch blockers" #3
public/_redirects, vercel.json        SPA deep-link config for Netlify / Vercel
vite.config.ts                        + dist/404.html emitter and og:image URL absolutiser
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
- ❌ `address` and `city` in `shop.ts` are **empty strings**, deliberately.
  They used to hold fake values that rendered to customers; Footer and About
  now hide the whole "Visit" block while they're blank. Don't invent values
  — ask the owner. Also blocks `LocalBusiness` schema / local SEO.
- ⚠️ `src/pages/About.tsx` has honest-but-generic copy (what the shop sells,
  how ordering works). It replaced text that literally read "Add a short
  story here about Baig Cloth". Still wants the owner's real story; don't
  fabricate one.
- ❌ `public/products/*.png` — sample/placeholder images, not real Baig
  Cloth stock photos.
- ❌ `public/hero/hero-[1-5].svg` — placeholder banners. The five real
  creatives were pasted into chat on 2026-08-18, but **image attachments
  arrive as model context, not as files** (`CLAUDE_STAGE_FILE_ROOT` →
  `.../cse_*.uploads` does not exist on this runner), so they could not be
  saved or committed. They also live on the owner's Windows PC at
  `C:\Users\aneeq\Downloads\BG\bg hero section images`, unreachable from a
  remote session. They must be uploaded as `hero-1.jpg` ... `hero-5.jpg` from
  the owner's own machine, then the five `.svg` in `src/data/hero.ts` swapped
  to `.jpg` (README step 3 has the click-by-click).
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
  `min-width: auto` sizes the column to all slides side by side, which pushed
  the whole mobile page off screen. It is no longer inside a grid, but keep
  the class — it costs nothing and protects against re-nesting. Verified by
  asserting `document.documentElement.scrollWidth === window.innerWidth` at
  390 / 768 / 1440; do that on any layout change here.
- Non-active slides get `aria-hidden` **and `inert`** (React 19 supports the
  bare attribute). Without `inert`, links inside off-screen slides stay
  tabbable and focusing one scrolls the `overflow-hidden` frame, permanently
  desyncing it from the transform. Verified: only the active slide's link is a
  tab stop, and `scrollLeft` stays 0.
- Autoplay pauses on hover/focus, on `visibilitychange`, and is disabled
  outright under `prefers-reduced-motion` (the global rule in `index.css`
  kills the transition but not the timer).

### The banner format drives the layout — don't "fix" it back

The owner's real creatives (supplied 2026-08-18) are **wide banners with the
headline, subcopy and "UP TO 20% OFF" baked into the artwork**, ~1712x945
(1.812). The hero was originally a portrait frame beside HTML headline text;
that was wrong for these and has been changed deliberately:

- Slides are `aspect-[16/9] object-cover`, full container width. 1.778 vs the
  source 1.812 trims ~0.95% per side; the artwork's text starts ~7.6% in, so
  it is safe. Do not switch to a fixed pixel height — that crops the
  typography.
- There is **no headline beside the banner** any more, and no caption bar, on
  purpose: the artwork already says "EFFORTLESS ELEGANCE" etc. and a second
  headline competed with it. The `h1` and CTAs now sit in a compact centred
  block *below* the slideshow.
- `alt` text repeats the baked-in wording, because that is the only
  machine-readable copy of it.

Known weaknesses of this creative approach, raised with the owner: the printed
copy is unreadable at mobile widths (~200px tall frame), invisible to Google,
and hard-codes a time-limited discount into five image files. Mobile-specific
crops, or moving the offer text into HTML, are the real fixes.

## Launch blockers — fixed 2026-08-17, don't re-fix

1. **SPA deep links.** `public/_redirects` (Netlify) + `vercel.json` (Vercel)
   + a `spaFallbackHtml` plugin in `vite.config.ts` that copies
   `dist/index.html` to `dist/404.html` (GitHub Pages). Note `vite preview`
   serves 200 for every path, so it *cannot* reproduce this class of bug —
   inspect the built `dist/` contents instead. If the site ever moves to a
   repo subpath (`user.github.io/baig-cloth/`), Vite `base` needs setting
   too; that isn't done.
2. **`path="*"` route** → `src/pages/NotFound.tsx`. Before this, an unknown
   URL rendered `body` innerText length 0 — a genuinely blank page.
3. **OG/Twitter tags** in `index.html`. `absoluteSocialUrls` in
   `vite.config.ts` rewrites `/og-image.png` to an absolute URL from
   `SITE_URL` / `URL` (Netlify) / `VERCEL_URL` / `CF_PAGES_URL`, because
   WhatsApp is unreliable with a relative og:image. Falls back to the
   relative path when no env var is set.

   ⚠️ **`public/og-image.png` itself is not in the repo.** It was generated
   (1200×630, by screenshotting an HTML card containing the real
   `brand-mark.svg` in headless Chrome — regenerate the same way) and sent to
   the owner to upload, because **a remote session cannot commit binary
   files**: the only writable path is the github MCP server, whose
   `push_files` / `create_or_update_file` take text content and base64 it
   themselves, so raw PNG bytes get mangled. The local git credential is
   read-only (`push: false`, confirmed via `gh api repos/... --jq
   .permissions`). Anything binary has to be uploaded by the owner through
   GitHub's web UI, or committed from a session that has a writable git
   remote. Until it lands the card degrades to title + description only.
4. **Customer-facing placeholder text.** The Catalog "Google Sheet" notice is
   now `import.meta.env.DEV`-only; About has real copy; the fake address is
   gone (see the placeholder section above).

## Known issues, still open (from the 2026-08-17 audit)

5. `useProducts()` is called separately in Home/Catalog/ProductDetail — no
   cache, so the sheet is re-fetched on every navigation.
6. Catalog filter state reads `?category=` only on mount, so back/forward
   and nav clicks desync the chips from the URL.
7. `useProducts.ts` fallback image is a women's photo regardless of
   category; `parseInStock` fails open (only `no/false/0/out of stock`
   count as unavailable). Duplicate sheet `id`s break React keys and make
   the detail page resolve the wrong product.
8. Only the homepage `<title>` is descriptive — every route still shares it.
   No sitemap, robots.txt, or `LocalBusiness` schema (that one is blocked on
   a real address); no analytics on the WhatsApp click, which is the site's
   only conversion event.
9. `papaparse` (~45 KB) sits in the initial bundle for a code path that
   usually doesn't run — `await import("papaparse")` inside the fetch would
   drop it from first load.
10. Client-only rendering: product pages exist only after JS runs, so they
    index poorly. Prerendering the routes at build time is the fix.

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
3. Deployment (Netlify/Vercel/GitHub Pages) — no host chosen yet, but the
   config each one needs is already committed (see "Launch blockers" #1).
   After the first deploy, confirm the WhatsApp preview card renders; if the
   host doesn't expose its domain as an env var, the `/og-image.png` values
   in `index.html` need the full URL.

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
- **A PAT pasted into chat is not usable from Bash.** The owner supplied a
  fine-grained token on 2026-08-18; the auto-mode classifier refused every
  command carrying it — both writing it to a `credential.helper store` file
  and putting it in a `git push https://x-access-token:...@github.com/...`
  URL. Don't burn turns retrying: the MCP push path above is the only one
  that works, and it still can't carry binary. Ask the owner to upload
  binaries via GitHub's web UI, or to run the push themselves.
- **Image attachments never reach the filesystem.** `CLAUDE_STAGE_FILE_ROOT`
  points at `.../cse_<id>.uploads`, which does not exist. Images pasted into
  chat arrive as model context only — they can be described, but their bytes
  cannot be saved or committed.
