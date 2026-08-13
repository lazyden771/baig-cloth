import { SHOP } from "../config/shop";
import { buildWhatsAppGeneralLink } from "../lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src="/brand-mark.svg" alt="" aria-hidden="true" className="h-8 w-auto" />
            <span className="text-lg font-extrabold">{SHOP.name}</span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">{SHOP.tagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Visit</h4>
          <p className="mt-2 text-sm">{SHOP.address}</p>
          <p className="text-sm">{SHOP.city}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Contact</h4>
          <p className="mt-2 text-sm">{SHOP.phoneDisplay}</p>
          <a
            href={buildWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-bold text-navy hover:underline"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-ink-soft">
        &copy; {new Date().getFullYear()} {SHOP.name}. All rights reserved.
      </div>
    </footer>
  );
}
