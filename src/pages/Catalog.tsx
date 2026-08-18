import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, CATEGORY_LABELS, type ProductCategory } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

type CategoryFilter = "all" | ProductCategory;

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") as CategoryFilter) || "all";
  const [category, setCategory] = useState<CategoryFilter>(
    initialCategory === "all" || CATEGORIES.includes(initialCategory as ProductCategory)
      ? initialCategory
      : "all",
  );
  const [fancyOnly, setFancyOnly] = useState(false);
  const { products, loading, usingFallback } = useProducts();

  function selectCategory(next: CategoryFilter) {
    setCategory(next);
    if (next === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", next);
    }
    setSearchParams(searchParams, { replace: true });
  }

  const visible = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (fancyOnly && !p.tags.includes("fancy")) return false;
      return true;
    });
  }, [products, category, fancyOnly]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold sm:text-3xl">Catalog</h1>

      {/*
        Dev-only reminder that the Google Sheet isn't wired up yet. Customers
        must never see this — it used to render in production and told them to
        "add your own in the Google Sheet".
      */}
      {usingFallback && import.meta.env.DEV && (
        <p className="mt-2 rounded-lg bg-paper px-3 py-2 text-xs text-ink-soft">
          Dev note: showing sample products from src/data/products.ts. Set
          productsSheetCsvUrl in src/config/shop.ts to load the real catalog.
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <FilterButton active={category === "all"} onClick={() => selectCategory("all")}>
          All
        </FilterButton>
        {CATEGORIES.map((cat) => (
          <FilterButton key={cat} active={category === cat} onClick={() => selectCategory(cat)}>
            {CATEGORY_LABELS[cat]}
          </FilterButton>
        ))}
        <label className="ml-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink-soft">
          <input
            type="checkbox"
            checked={fancyOnly}
            onChange={(e) => setFancyOnly(e.target.checked)}
            className="h-4 w-4 accent-navy"
          />
          Fancy only
        </label>
      </div>

      {loading ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-surface" />
          ))}
        </div>
      ) : visible.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-ink-soft">No products match these filters yet.</p>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 text-sm font-bold transition-colors ${
        active ? "border-navy bg-navy text-white" : "border-line bg-surface text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
