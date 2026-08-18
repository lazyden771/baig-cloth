import { Link } from "react-router-dom";
import { buildWhatsAppGeneralLink } from "../lib/whatsapp";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">Page not found</p>
      <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
        We couldn't find that page
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        The link may be out of date, or the item may no longer be available. Browse the
        catalog to see what's in stock, or message us and we'll help you find it.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/catalog"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-shade"
        >
          Browse Catalog
        </Link>
        <WhatsAppButton href={buildWhatsAppGeneralLink()} variant="outline" label="Ask on WhatsApp" />
      </div>
    </div>
  );
}
