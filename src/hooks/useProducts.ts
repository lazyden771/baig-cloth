import { useEffect, useState } from "react";
import Papa from "papaparse";
import { SHOP } from "../config/shop";
import { FALLBACK_PRODUCTS, type Product, type ProductCategory } from "../data/products";

const VALID_CATEGORIES: ProductCategory[] = [
  "women-unstitched",
  "women-stitched",
  "men-unstitched",
];

function parsePrice(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function parseInStock(raw: string): boolean {
  const normalized = raw.trim().toLowerCase();
  return !["no", "false", "0", "out of stock"].includes(normalized);
}

function rowToProduct(row: Record<string, string>, index: number): Product | null {
  const name = (row.name ?? "").trim();
  const category = (row.category ?? "").trim() as ProductCategory;
  if (!name || !VALID_CATEGORIES.includes(category)) return null;

  return {
    id: (row.id ?? "").trim() || `sheet-${index}`,
    name,
    category,
    tags: (row.tags ?? "")
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
    price: parsePrice(row.price ?? ""),
    fabricLabel: (row.fabricLabel ?? "").trim(),
    description: (row.description ?? "").trim(),
    image: (row.image ?? "").trim() || "/products/women-unstitched-1.png",
    inStock: parseInStock(row.inStock ?? "yes"),
  };
}

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  usingFallback: boolean;
}

/**
 * Loads the catalog from the published Google Sheet CSV configured in
 * src/config/shop.ts. Falls back to the sample products (src/data/products.ts)
 * if no sheet is configured yet, or if the fetch/parse fails, so the
 * catalog is never blank.
 */
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(Boolean(SHOP.productsSheetCsvUrl));
  const [usingFallback, setUsingFallback] = useState(!SHOP.productsSheetCsvUrl);

  useEffect(() => {
    if (!SHOP.productsSheetCsvUrl) return;

    let cancelled = false;
    setLoading(true);

    fetch(SHOP.productsSheetCsvUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
        return res.text();
      })
      .then((csvText) => {
        if (cancelled) return;
        const parsed = Papa.parse<Record<string, string>>(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        const rows = (parsed.data ?? [])
          .map((row, i) => rowToProduct(row, i))
          .filter((p): p is Product => p !== null);

        if (rows.length > 0) {
          setProducts(rows);
          setUsingFallback(false);
        } else {
          setProducts(FALLBACK_PRODUCTS);
          setUsingFallback(true);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setProducts(FALLBACK_PRODUCTS);
        setUsingFallback(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, usingFallback };
}
