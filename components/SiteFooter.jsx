import { EMAIL, PHONE, PHONE_LINK, WHATSAPP_DISPLAY } from "../lib/site";
import { WHATSAPP_GENERIC, whatsappUrl } from "../lib/order";

export default function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-3xl font-semibold tracking-[0.1em] text-white">TGT<span className="ml-2 text-gold">Propreté</span></p>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed">Produits d'entretien professionnels pour restaurateurs, commerces, bureaux et chantiers. Livraison en Île-de-France.</p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-white">Nous joindre</p>
          <ul className="grid gap-2.5 text-[15px]">
            <li><a className="transition-colors hover:text-gold" href={`tel:${PHONE_LINK}`}>{PHONE}</a></li>
            <li><a className="transition-colors hover:text-gold" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a className="transition-colors hover:text-gold" href={whatsappUrl(WHATSAPP_GENERIC)} target="_blank" rel="noopener noreferrer">WhatsApp · {WHATSAPP_DISPLAY}</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-white">Navigation</p>
          <ul className="grid gap-2.5 text-[15px]">
            <li><a className="transition-colors hover:text-gold" href="/#catalogue">Catalogue</a></li>
            <li><a className="transition-colors hover:text-gold" href="/#commander">Comment commander</a></li>
            <li><a className="transition-colors hover:text-gold" href="/#contact">Demander un devis</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-sm text-white/50">© {new Date().getFullYear()} TGT Propreté · Tarifs indiqués hors taxes</p>
      </div>
    </footer>
  );
}
