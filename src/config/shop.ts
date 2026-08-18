/**
 * Fill these in with your real shop details. This is the one file you need
 * to edit to take the site from "sample" to "live".
 */
export const SHOP = {
  name: "Baig Cloth",
  tagline: "Unstitched & stitched fabric for every occasion.",

  // WhatsApp number in international format, digits only, no "+", no spaces.
  // Example: Pakistan number 0300-1234567 -> "923001234567".
  // This is the real shop number — every order message goes here.
  whatsappNumber: "923265382969",

  // Shown on the Contact page. Can be the same number, formatted for reading.
  phoneDisplay: "+92 326 5382969",

  // TODO: the shop's real street address and city. Left blank on purpose —
  // the footer and About page hide the "Visit" block while these are empty,
  // which is better than showing a made-up address to customers.
  address: "",
  city: "",

  instagram: "", // TODO (optional) e.g. "https://instagram.com/baigcloth"
  facebook: "", // TODO (optional)

  /**
   * Paste a Google Sheet's "Publish to web -> CSV" link here to manage
   * products from a spreadsheet instead of code. Leave empty to use the
   * sample products in src/data/products.ts. See README.md for setup steps.
   */
  productsSheetCsvUrl: "",
};
