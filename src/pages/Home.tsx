import { Link } from "react-router-dom";
import { SHOP } from "../config/shop";
import { buildWhatsAppGeneralLink } from "../lib/whatsapp";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { CategoryTile } from "../components/CategoryTile";
import { ProductCard } from "../components/ProductCard";
import { HeroCarousel } from "../components/HeroCarousel";
import { HERO_SLIDES } from "../data/hero";
import { useProducts } from "../hooks/useProducts";

export function Home() {
  const { products } = useProducts();
  const featured = products.slice(0, 3);
  // With no hero photos added yet, fall back to the centred logo-only hero.
  const hasHeroSlides = HERO_SLIDES.length > 0;

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div
          className={`grid items-center gap-10 ${
            hasHeroSlides ? "lg:grid-cols-[5fr_7fr] lg:gap-14" : ""
          }`}
        >
          <div className={hasHeroSlides ? "text-center lg:text-left" : "text-center"}>
            <img
              src="/brand-mark.svg"
              alt=""
              aria-hidden="true"
              className={`h-20 w-auto sm:h-24 ${hasHeroSlides ? "mx-auto lg:mx-0" : "mx-auto sm:h-40"}`}
            />
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">{SHOP.name}</h1>
            <p
              className={`mt-3 max-w-xl text-base text-ink-soft sm:text-lg ${
                hasHeroSlides ? "mx-auto lg:mx-0" : "mx-auto"
              }`}
            >
              {SHOP.tagline}
            </p>
            <div
              className={`mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center ${
                hasHeroSlides ? "lg:justify-start" : ""
              }`}
            >
              <Link
                to="/catalog"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-shade"
              >
                Browse Catalog
              </Link>
              <WhatsAppButton href={buildWhatsAppGeneralLink()} variant="outline" label="Chat on WhatsApp" />
            </div>
          </div>

          {hasHeroSlides && <HeroCarousel />}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-extrabold">Shop by category</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <CategoryTile category="women-unstitched" description="Lawn, cotton and printed fabric, ready to stitch to your measurements." />
          <CategoryTile category="women-stitched" description="Ready-to-wear formal and casual suits, including fancy/party wear." />
          <CategoryTile category="men-unstitched" description="Shalwar qameez fabric in cotton, wash & wear, and more." />
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-extrabold">Recently added</h2>
            <Link to="/catalog" className="text-sm font-bold text-navy hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="text-2xl font-extrabold">Have a question about fabric or fitting?</h2>
          <p className="max-w-md text-sm text-ink-soft">
            Message us directly on WhatsApp — we're happy to help you pick the right fabric and size.
          </p>
          <WhatsAppButton href={buildWhatsAppGeneralLink()} />
        </div>
      </section>
    </div>
  );
}
