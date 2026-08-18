import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SHOP } from "../config/shop";
import { buildWhatsAppGeneralLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/about", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5">
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <img src="/brand-mark.svg" alt="" aria-hidden="true" className="h-9 w-auto" />
          <span className="text-lg font-extrabold tracking-tight">{SHOP.name}</span>
        </NavLink>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative py-1 text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? "text-navy after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-navy"
                    : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <WhatsAppButton
            href={buildWhatsAppGeneralLink()}
            label="Order on WhatsApp"
            size="sm"
            className="ml-1"
          />
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-surface px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-base font-bold ${
                      isActive ? "bg-paper text-navy" : "text-ink-soft"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Close the sheet on tap so the menu isn't still open on return. */}
          <div className="mt-3 border-t border-line pt-3" onClick={() => setOpen(false)}>
            <WhatsAppButton href={buildWhatsAppGeneralLink()} className="w-full" />
          </div>
        </nav>
      )}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
