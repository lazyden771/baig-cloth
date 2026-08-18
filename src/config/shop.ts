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

  // Shown on the footer and the About page. If either is blanked out, the
  // "Visit" block hides itself rather than showing a half-empty address.
  address: "Backside of Taj Mahal, Landa Bazaar",
  city: "Jaranwala, Pakistan",

  instagram: "", // TODO (optional) e.g. "https://instagram.com/baigcloth"
  facebook: "", // TODO (optional)

  /**
   * Paste a Google Sheet's "Publish to web -> CSV" link here to manage
   * products from a spreadsheet instead of code. Leave empty to use the
   * sample products in src/data/products.ts. See README.md for setup steps.
   */
  productsSheetCsvUrl: "",
};
