export type ProductCategory = "women-unstitched" | "women-stitched" | "men-unstitched";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  tags: string[];
  price: number;
  fabricLabel: string;
  description: string;
  image: string;
  inStock: boolean;
}

export const CATEGORIES: ProductCategory[] = [
  "women-unstitched",
  "women-stitched",
  "men-unstitched",
];

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "women-unstitched": "Women's Unstitched",
  "women-stitched": "Women's Stitched",
  "men-unstitched": "Men's Unstitched",
};

/**
 * Shown until a Google Sheet is configured in src/config/shop.ts (or if it
 * fails to load) so the catalog is never blank. Swap these for real products
 * either by editing the sheet, or by editing this file directly.
 *
 * These render on the LIVE site, so keep every string customer-facing:
 * no instructions aimed at the shop owner. The "— Sample" suffix in each
 * name is deliberate — it stops a visitor ordering an item that doesn't
 * exist. Delete these entries entirely once real products are in.
 */
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "wu-1",
    name: "Embroidered Lawn (3pc) — Sample",
    category: "women-unstitched",
    tags: [],
    price: 4500,
    fabricLabel: "Lawn",
    description:
      "Sample listing — real stock is being added. Message us on WhatsApp and we'll tell you what's available right now.",
    image: "/products/women-unstitched-1.png",
    inStock: true,
  },
  {
    id: "wu-2",
    name: "Printed Cotton (2pc) — Sample",
    category: "women-unstitched",
    tags: [],
    price: 3200,
    fabricLabel: "Cotton",
    description:
      "Sample listing — real stock is being added. Message us on WhatsApp and we'll tell you what's available right now.",
    image: "/products/women-unstitched-2.png",
    inStock: true,
  },
  {
    id: "ws-1",
    name: "Formal Chiffon Dress — Sample",
    category: "women-stitched",
    tags: ["fancy"],
    price: 8900,
    fabricLabel: "Chiffon",
    description:
      "Sample listing — real stock is being added. Message us on WhatsApp and we'll tell you what's available right now.",
    image: "/products/women-stitched-1.png",
    inStock: true,
  },
  {
    id: "ws-2",
    name: "Casual Stitched Suit — Sample",
    category: "women-stitched",
    tags: [],
    price: 5600,
    fabricLabel: "Cambric",
    description:
      "Sample listing — real stock is being added. Message us on WhatsApp and we'll tell you what's available right now.",
    image: "/products/women-stitched-2.png",
    inStock: true,
  },
  {
    id: "mu-1",
    name: "Cotton Shalwar Qameez Fabric — Sample",
    category: "men-unstitched",
    tags: [],
    price: 2800,
    fabricLabel: "Cotton",
    description:
      "Sample listing — real stock is being added. Message us on WhatsApp and we'll tell you what's available right now.",
    image: "/products/men-unstitched-1.png",
    inStock: true,
  },
  {
    id: "mu-2",
    name: "Wash & Wear Fabric — Sample",
    category: "men-unstitched",
    tags: [],
    price: 3100,
    fabricLabel: "Wash & Wear",
    description:
      "Sample listing — real stock is being added. Message us on WhatsApp and we'll tell you what's available right now.",
    image: "/products/men-unstitched-2.png",
    inStock: false,
  },
];
