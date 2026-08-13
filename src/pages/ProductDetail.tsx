import { Link, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { buildWhatsAppOrderLink } from "../lib/whatsapp";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="aspect-[4/5] animate-pulse rounded-2xl bg-surface" />
          <div className="space-y-3">
            <div className="h-6 w-2/3 animate-pulse rounded bg-surface" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-surface" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold">Product not found</h1>
        <p className="mt-2 text-sm text-ink-soft">It may have been removed or the link is incorrect.</p>
        <Link to="/catalog" className="mt-6 inline-block text-sm font-bold text-navy hover:underline">
          ← Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/catalog" className="text-sm font-bold text-navy hover:underline">
        ← Back to catalog
      </Link>

      <div className="mt-4 grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-paper">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {!product.inStock && (
            <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold text-white">
              Out of stock
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {product.tags.includes("fancy") && (
            <span className="inline-block w-fit rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-white">
              Fancy
            </span>
          )}
          <h1 className="text-2xl font-extrabold sm:text-3xl">{product.name}</h1>
          {product.fabricLabel && <p className="text-sm font-bold text-ink-soft">Fabric: {product.fabricLabel}</p>}
          <p className="text-2xl font-extrabold text-navy">Rs. {product.price.toLocaleString("en-PK")}</p>
          {product.description && <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>}

          <div className="mt-2">
            {product.inStock ? (
              <WhatsAppButton href={buildWhatsAppOrderLink(product)} className="w-full sm:w-auto" />
            ) : (
              <p className="text-sm font-bold text-ink-soft">Currently out of stock — check back soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
