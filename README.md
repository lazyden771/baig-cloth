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

## Before you go live: 2 things to fill in

### 1. Your real shop details

Open **`src/config/shop.ts`** and fill in every line marked `// TODO`:

- `whatsappNumber` — your WhatsApp number, digits only, no `+`, no spaces
  (example: a Pakistani number `0300-1234567` becomes `923001234567`).
- `phoneDisplay`, `address`, `city` — shown on the site's footer and About page.
- `instagram` / `facebook` — optional, leave blank to hide them.

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

## Project structure

- `src/config/shop.ts` — shop name, contact info, Google Sheet link.
- `src/data/products.ts` — the fallback sample products, shown until the
  Google Sheet is connected.
- `src/hooks/useProducts.ts` — fetches and reads the Google Sheet.
- `src/lib/whatsapp.ts` — builds the "Order on WhatsApp" links.
- `src/pages/` — Home, Catalog, Product detail, About.
- `src/components/` — Nav, Footer, product card, category tile, etc.
- `public/brand-mark.svg` / `favicon.svg` — the real shop logo, extracted
  from `baig cloth logo/baig cloth logo.pdf` as vector art (not redrawn).
- `public/products/` — placeholder sample product images, clearly labeled
  "SAMPLE IMAGE" — replace via the Google Sheet once you have real photos.

## What's not built yet

- Online payment / cart checkout — v1 is a catalog + WhatsApp ordering only.
- A real About page story, address, and phone number — currently placeholders.
