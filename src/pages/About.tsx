import { SHOP } from "../config/shop";
import { buildWhatsAppGeneralLink } from "../lib/whatsapp";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-extrabold sm:text-3xl">About {SHOP.name}</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        {/* TODO: replace with the shop's real story. */}
        Add a short story here about {SHOP.name} — how long you've been in business, what makes your
        fabric selection or stitching different, and anything customers should know before ordering.
      </p>

      <div className="mt-10 grid gap-6 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Visit the shop</h2>
          <p className="mt-2 text-sm">{SHOP.address}</p>
          <p className="text-sm">{SHOP.city}</p>
        </div>
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
