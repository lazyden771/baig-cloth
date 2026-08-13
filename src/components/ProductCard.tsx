import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { buildWhatsAppOrderLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-paper"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold text-white">
            Out of stock
          </span>
        )}
        {product.tags.includes("fancy") && (
          <span className="absolute right-3 top-3 rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-white">
            Fancy
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/product/${product.id}`} className="font-extrabold leading-snug hover:text-navy">
          {product.name}
        </Link>
        {product.fabricLabel && <p className="text-sm text-ink-soft">{product.fabricLabel}</p>}
        <p className="text-lg font-extrabold text-navy">Rs. {product.price.toLocaleString("en-PK")}</p>
        <WhatsAppButton href={buildWhatsAppOrderLink(product)} className="mt-auto w-full" />
      </div>
    </div>
  );
}
