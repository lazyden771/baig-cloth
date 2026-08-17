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
- `address`, `city` — ⚠️ **still placeholders** ("Main Bazaar Road", "Your
  City, Pakistan") and they are visible to customers on the footer and the
  About page. Replace these before sharing the site with anyone.
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

### 3. Your hero photos (the big rotating pictures at the top)

The home page shows a slideshow that changes picture every 5 seconds. Right
now it's showing four plain coloured "SAMPLE IMAGE" placeholders. To use
your own photos:

1. Pick your photos. Anything from a phone camera is fine. **Portrait
   (tall) photos work best** — they're displayed taller than they are wide.
   Four to six photos is a good number.
2. Put the files into the **`public/hero/`** folder in this project. You can
   drag and drop them there in VS Code, or on GitHub: open the `public/hero`
   folder, click **Add file → Upload files**, drag your photos in, then
   click **Commit changes**.
3. Open **`src/data/hero.ts`**. You'll see one block per picture that looks
   like this:

   ```ts
   {
     src: "/hero/hero-1.svg",
     alt: "Sample image — replace with a photo of embroidered unstitched lawn fabric.",
     caption: "Women's Unstitched",
     href: "/catalog?category=women-unstitched",
   },
   ```

   Change it to match your photo:

   - `src` — `/hero/` followed by your exact file name, e.g.
     `"/hero/lawn-blue.jpg"`. Capital letters and spaces matter, so it's
     easiest to name your files without spaces.
   - `alt` — a short plain-English description of what's in the photo. This
     is what blind visitors hear and what Google Images reads, so describe
     the actual fabric, e.g. `"Blue embroidered lawn 3-piece suit"`.
   - `caption` — the small label under the photo. Delete this line if you
     don't want a label.
   - `href` — where clicking the photo takes the customer. Use
     `"/catalog?category=women-unstitched"`, `"/catalog?category=women-stitched"`,
     `"/catalog?category=men-unstitched"`, or just `"/catalog"`. Delete this
     line to make the photo non-clickable.

4. Add or delete blocks so there's exactly one per photo, in the order you
   want them shown. Keep the commas and curly brackets exactly as they are.
5. Rebuild/redeploy. If you empty the list completely, the top of the page
   goes back to the plain logo layout — it won't break.

**Tip:** resize photos to about 1200 pixels wide before uploading. Photos
straight from a phone can be 5 MB each, which makes the site slow to load
on mobile data.

## Project structure

- `public/hero/` — the home page slideshow photos.
- `src/data/hero.ts` — the list of slideshow photos and their captions.
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
