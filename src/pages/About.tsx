import { SHOP } from "../config/shop";
import { buildWhatsAppGeneralLink } from "../lib/whatsapp";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function About() {
  const hasLocation = Boolean(SHOP.address || SHOP.city);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-extrabold sm:text-3xl">About {SHOP.name}</h1>

      {/*
        TODO (owner): replace the two paragraphs below with the shop's own
        story — how long you've been trading, what makes your fabric or
        stitching different, anything customers should know before ordering.
        What's here now is deliberately factual rather than invented.
      */}
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        {SHOP.name} sells women's unstitched fabric for traditional and fancy wear,
        ready-to-wear stitched suits, and men's unstitched shalwar qameez fabric.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        Browse the catalog, then message us on WhatsApp about anything you like — we'll
        confirm what's in stock, the price, and stitching or measurement options before
        you commit to an order.
      </p>

      <div
        className={`mt-10 grid gap-6 rounded-2xl border border-line bg-surface p-6 ${
          hasLocation ? "sm:grid-cols-2" : ""
        }`}
      >
        {hasLocation && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
              Visit the shop
            </h2>
            {SHOP.address && <p className="mt-2 text-sm">{SHOP.address}</p>}
            {SHOP.city && <p className="text-sm">{SHOP.city}</p>}
          </div>
        )}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Get in touch</h2>
          <p className="mt-2 text-sm">{SHOP.phoneDisplay}</p>
          <div className="mt-3">
            <WhatsAppButton href={buildWhatsAppGeneralLink()} />
          </div>
        </div>
      </div>
    </div>
  );
}
