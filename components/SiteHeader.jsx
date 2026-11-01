"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { BagIcon, CloseIcon, PhoneIcon } from "./Icons";
import { PHONE, PHONE_LINK } from "../lib/site";

const NAV = [
  ["Catalogue", "/#catalogue"],
  ["Engagements", "/#engagements"],
  ["Commander", "/#commander"],
  ["Contact", "/#contact"],
];

export default function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const { count, setOpen, bumpKey } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-navy/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-5 ">
        <a href="/" className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="TGT Propreté — accueil">
          <img src="/images/hero/logosvg.svg" alt="TGT Propreté" className="h-14 w-auto rounded-full object-contain sm:h-16 lg:h-20" />
          <span className="font-serif text-[20px] font-semibold leading-none tracking-[0.08em] sm:text-[26px] sm:tracking-[0.12em]">
            TGT<span className="ml-2 text-gold">Propreté</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/85 transition-colors hover:text-gold">{label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={`tel:${PHONE_LINK}`} className="hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-medium transition hover:border-gold hover:text-gold xl:inline-flex">
            <PhoneIcon size={14} /> {PHONE}
          </a>

          <button onClick={() => setOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full bg-gold text-navy-900 shadow-[0_8px_20px_-8px_rgba(201,168,76,.9)] transition hover:-translate-y-0.5 hover:brightness-110" aria-label={`Ouvrir le panier (${count} article${count > 1 ? "s" : ""})`}>
            <BagIcon />
            {count > 0 && (
              <span key={bumpKey} className="anim-bump absolute -right-1.5 -top-1.5 grid min-h-[22px] min-w-[22px] place-items-center rounded-full border-2 border-navy bg-white px-1 text-[11px] font-bold text-navy-900">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>

          <button onClick={() => setMenu(!menu)} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 lg:hidden" aria-label="Menu" aria-expanded={menu} aria-controls="menu-mobile">
            {menu ? <CloseIcon /> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>}
          </button>
        </div>
      </div>

      {menu && (
        <nav id="menu-mobile" className="anim-fade grid gap-1 border-t border-white/10 bg-navy-900 px-5 py-4 lg:hidden" aria-label="Navigation mobile">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenu(false)} className="rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white/90 hover:bg-white/5">{label}</a>
          ))}
          <a href={`tel:${PHONE_LINK}`} className="mt-1 rounded-lg px-3 py-3 font-semibold text-gold">{PHONE}</a>
        </nav>
      )}
    </header>
  );
}
