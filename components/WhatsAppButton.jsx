"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { WhatsAppIcon } from "./Icons";
import { SEED } from "../data/products";
import { WHATSAPP_GENERIC, eur, splitName, whatsappProductText, whatsappUrl } from "../lib/order";

/**
 * Bouton WhatsApp flottant (bas droite).
 *
 * 📱 LE NUMÉRO N'EST PAS DANS CE FICHIER → il se règle à un seul endroit :
 *    lib/site.js  →  export const WHATSAPP_NUMBER = "447597238174";
 *
 * Le message est pré-rempli automatiquement selon le contexte :
 *   1. panier non vide        → liste des produits + quantités + total
 *   2. sur une fiche produit  → « Je suis intéressé par le produit X »
 *   3. sinon                  → message d'accueil à compléter
 */
export default function WhatsAppButton() {
  const { order } = useCart();
  const pathname = usePathname();
  const [href, setHref] = useState(() => whatsappUrl(WHATSAPP_GENERIC));

  useEffect(() => {
    let text = WHATSAPP_GENERIC;
    if (order.items.length) {
      text =
        "Bonjour TGT Propreté, je souhaite commander :\n\n" +
        order.items.map((i) => `• ${i.qty} × ${i.name}${i.unit ? ` (${i.unit})` : ""}`).join("\n") +
        `\n\nTotal estimé : ${eur(order.totalHT)} HT${order.hasQuote ? " (hors articles sur devis)" : ""}` +
        "\n\nMa société : \nAdresse de livraison : ";
    } else if (pathname?.startsWith("/produit")) {
      const id = new URLSearchParams(window.location.search).get("id");
      const p = SEED.find((x) => x.id === id);
      if (p) text = whatsappProductText(splitName(p.name).title);
    }
    setHref(whatsappUrl(text));
  }, [order, pathname]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,.75)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#1ebe5a] hover:shadow-[0_18px_34px_-10px_rgba(37,211,102,.9)] active:scale-95"
    >
      <WhatsAppIcon size={30} />
      <span className="pointer-events-none absolute right-[calc(100%+12px)] hidden whitespace-nowrap rounded-full bg-navy px-4 py-2 text-sm font-medium opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block sm:translate-x-2">
        Une question ? Écrivez-nous
      </span>
    </a>
  );
}
