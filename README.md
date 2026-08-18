# Baig Cloth — Website

A catalog website for Baig Cloth. Customers browse products and order by
messaging the shop on WhatsApp — there's no online payment/checkout.

## Running it locally

```
npm install
npm run dev
```

Then open the address it prints (usually `http://localhost:5173`).

To build the finished site for hosting:

```
npm run build
```

This creates a `dist` folder — that's what you upload to your hosting
provider (Netlify, Vercel, GitHub Pages, or any web host).

## Before you go live: 3 things to fill in

### 1. Your real shop details

Open **`src/config/shop.ts`**:

- `whatsappNumber` — ✅ already set to `923265382969`. This is the number
  every "Order on WhatsApp" button messages, so double-check it's the one
  you want orders arriving on. Digits only, no `+`, no spaces (a Pakistani
  number `0300-1234567` becomes `923001234567`).
- `phoneDisplay` — ✅ already set to `+92 326 5382969`.
- `address`, `city` — ⚠️ **blank, and you should fill them in.** They used to
  contain made-up values ("Main Bazaar Road", "Your City, Pakistan") that
  customers could see, so they're now empty — the "Visit" block on the footer
  and About page simply hides itself until you add the real address. A local
  shop with an address on the site gets found far more often, so this is worth
  doing early.
- `instagram` / `facebook` — optional, leave blank to hide them.
- Your **About page story** — `src/pages/About.tsx` currently has two honest
  but generic paragraphs. Replacing them with your own story (how long you've
  been trading, what makes your fabric or stitching different) is one of the
  cheapest ways to win a customer's trust.

### 2. Your real products (no coding needed)

The site can read its product list from a **Google Sheet**, so you (or
anyone) can add, edit, or remove products just by editing a spreadsheet —
no code, no re-deploying.

**Set it up once:**

1. Make a copy of this Google Sheet template (or create your own sheet with
   these exact column headers in row 1):

   ```
   id | name | category | tags | price | fabricLabel | description | image | inStock
   ```

   - `category` must be exactly one of: `women-unstitched`, `women-stitched`, `men-unstitched`
   - `tags` — put `fancy` here for fancy/party-wear pieces, otherwise leave blank
   - `price` — numbers only, e.g. `4500`
   - `image` — a direct link to a photo (see note below)
   - `inStock` — `yes` or `no`

2. Add one row per product.
3. In Google Sheets: **File → Share → Publish to web**. Choose the sheet
   (not the whole workbook if you have more than one tab), set the format
   to **CSV**, and click **Publish**. Copy the link it gives you.
4. Paste that link into `src/config/shop.ts` as `productsSheetCsvUrl`.
5. Rebuild/redeploy the site. From then on, editing the sheet updates the
   site the next time someone loads the page — no rebuild needed for
   content changes, since the site fetches the sheet directly.

**About product photos:** Google Sheets cells can't hold an image file
directly — the `image` column needs a URL that points to a photo hosted
somewhere public (e.g. a link from Google Drive set to "Anyone with the
link", Imgur, or wherever you host images). Until real photos are ready,
leave the sheet empty or unpublished and the site shows the built-in
placeholder products automatically — it will never show a blank page.

### 3. Your hero banners (the big rotating pictures at the top)

The home page shows a slideshow that changes banner every 5 seconds. Right now
it shows five plain "SAMPLE BANNER" placeholders. To use your own:

1. **Export each banner at 1712 x 945 pixels** (or any 16:9 size — 1920 x 1080
   works too). The slideshow frame is 16:9, so anything much taller or squarer
   will get its edges trimmed.
2. **Name the files exactly** `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`,
   `hero-4.jpg`, `hero-5.jpg` — the number decides the order they appear in.
3. Upload them into the **`public/hero/`** folder. On GitHub: open the
   `public/hero` folder, click **Add file → Upload files**, drag the five files
   in, then click **Commit changes**.
4. Open **`src/data/hero.ts`** and change the five `.svg` endings to `.jpg`:

   ```ts
   src: "/hero/hero-1.svg",   ->   src: "/hero/hero-1.jpg",
   ```

   That's the only code edit needed.
5. While you're in that file, check each `alt` line still matches its banner.
   That text is how Google and blind visitors understand the picture — and
   because your headline is printed *inside* the artwork, this is the only
   place a search engine can read it. Keep the wording in step.
6. Fewer or more than five banners? Delete or copy a whole `{ ... },` block.
   An empty list makes the top of the page fall back to the plain logo
   layout — it won't break.

**Three things worth knowing about banners with text printed on them:**

- **On a phone the printed text will be tiny.** A 16:9 banner on a 390px-wide
  screen is only about 200px tall, so small print becomes unreadable — and
  most of your visitors will be on a phone. The fix is a second, taller crop
  of each banner for mobile. Worth doing once the basics are live.
- **Google cannot read text inside an image.** "Effortless Elegance" and
  "20% OFF" are invisible to search engines unless they also appear in the
  `alt` line or on the page.
- **A printed "20% OFF / LIMITED TIME ONLY" ties you to that offer.** When the
  sale ends, every banner has to be re-exported. Keeping the discount out of
  the artwork — and putting it in normal text on the page — makes changing the
  offer a five-second edit instead of a redesign.

**Tip:** keep each file under about 400 KB. Banners straight out of a design
tool are often several MB, which is slow to load on mobile data.

## Putting it online

`npm run build` produces a `dist` folder that works on Netlify, Vercel,
Cloudflare Pages, or GitHub Pages. The files that make shared links work are
already in place, so you shouldn't need to configure anything:

- `public/_redirects` (Netlify) and `vercel.json` (Vercel) tell the host to
  serve the site for every address.
- The build also writes `dist/404.html`, which is what makes GitHub Pages
  handle links like `/product/wu-1`.

Without those, a link you send someone on WhatsApp — say
`yoursite.com/product/wu-1` — would show the host's "page not found" error
instead of the product.

### The WhatsApp preview picture — one file to upload

When you share the site link on WhatsApp or Facebook, it shows a preview card.
The title and description are already set up. The **picture** needs one file
that isn't in the repo yet: **`public/og-image.png`**.

It was sent to you in chat — upload it the same way as the hero photos: open
the `public` folder on GitHub, click **Add file → Upload files**, drag
`og-image.png` in, and **Commit changes**. Keep that exact file name.

Until it's uploaded, shared links still show a proper title and description,
just no picture — nothing breaks.

It must be a **PNG or JPG at 1200 × 630 pixels** (SVG doesn't work for this).
Once you have real photos, replacing it with a nice shot of your fabric at
that size will make shared links look considerably better than a logo card.

**After your first deploy,** send yourself the site link on WhatsApp to check
the card appears. Netlify, Vercel and Cloudflare Pages handle the addressing
automatically. If the picture is still missing, open `index.html` and replace
both `content="/og-image.png"` values with your full address, e.g.
`content="https://yoursite.com/og-image.png"`, then redeploy.

## What's not built yet

- Online payment / cart checkout — v1 is a catalog + WhatsApp ordering only.
- A real About page story and the shop's address — see section 1 above.
- Per-page titles for Google, a sitemap, and click tracking on the WhatsApp
  buttons. Worth doing once the site is live and has real products.
