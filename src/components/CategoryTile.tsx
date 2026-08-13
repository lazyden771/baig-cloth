import { Link } from "react-router-dom";
import { CATEGORY_LABELS, type ProductCategory } from "../data/products";

export function CategoryTile({
  category,
  description,
}: {
  category: ProductCategory;
  description: string;
}) {
  return (
    <Link
      to={`/catalog?category=${category}`}
      className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-lg"
    >
      <div>
        <h3 className="text-xl font-extrabold">{CATEGORY_LABELS[category]}</h3>
        <p className="mt-2 text-sm text-ink-soft">{description}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-navy">
        Browse
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
