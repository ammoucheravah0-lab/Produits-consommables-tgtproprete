// lib/order.js — prix, totaux et texte de commande.
// Aucun "use client" : utilisé à la fois par le navigateur ET par la route API serveur.
import { SEED } from "../data/products";
import { EMAIL, TVA_RATE, WHATSAPP_NUMBER } from "./site";

/** "20,90 € HT / bidon de 5 L" → { amount: 20.9, unit: "bidon de 5 L" } ; "Sur devis" → amount null */
export function priceInfo(p) {
  const m = /(\d+(?:[.,]\d+)?)\s*€/.exec(p?.price || "");
  if (!m) return { amount: null, unit: "", label: p?.price || "Sur devis" };
  const unit = (/\/\s*(.+)$/.exec(p.price)?.[1] || "").trim();
  return { amount: parseFloat(m[1].replace(",", ".")), unit, label: p.price };
}

export const eur = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

/** Sépare "SOL+ Zéro danger • Détergent…" en { title, subtitle } */
export function splitName(name = "") {
  const [title, ...rest] = name.split("•");
  return { title: title.trim(), subtitle: rest.join("•").trim() };
}

/** lines : [{ id, qty }] → lignes enrichies + totaux. Les ids inconnus sont ignorés (sécurité serveur). */
export function buildOrder(lines) {
  const items = [];
  for (const l of lines || []) {
    const p = SEED.find((x) => x.id === l.id);
    const qty = Math.max(1, Math.min(999, parseInt(l.qty, 10) || 0));
    if (!p || !p.available || !qty) continue;
    const { amount, unit } = priceInfo(p);
    items.push({ id: p.id, name: splitName(p.name).title, fullName: p.name, qty, unitPrice: amount, unit, lineTotal: amount == null ? null : amount * qty });
  }
  const totalHT = items.reduce((s, i) => s + (i.lineTotal || 0), 0);
  return {
    items,
    count: items.reduce((s, i) => s + i.qty, 0),
    totalHT,
    tva: totalHT * TVA_RATE,
    totalTTC: totalHT * (1 + TVA_RATE),
    hasQuote: items.some((i) => i.unitPrice == null),
  };
}

const customerBlock = (c = {}) =>
  [
    `Nom : ${c.name || "—"}`,
    `Société : ${c.company || "—"}`,
    `E-mail : ${c.email || "—"}`,
    `Téléphone : ${c.phone || "—"}`,
    `Adresse de livraison : ${c.address || "—"}`,
  ].join("\n");

/** Texte brut de la commande (mailto, WhatsApp, corps d'e-mail serveur). */
export function orderText(order, customer, { ref = "" } = {}) {
  const lines = order.items.map(
    (i) => `• ${i.qty} × ${i.name}${i.unit ? ` (${i.unit})` : ""}` + (i.lineTotal != null ? ` — ${eur(i.lineTotal)} HT` : " — sur devis")
  );
  const total = [
    `Total HT : ${eur(order.totalHT)}${order.hasQuote ? " (hors articles sur devis)" : ""}`,
    `TVA 20 % : ${eur(order.tva)}`,
    `Total TTC : ${eur(order.totalTTC)}`,
  ];
  return [
    `Bonjour TGT Propreté,`,
    ``,
    `Je souhaite passer la commande suivante${ref ? ` (réf. ${ref})` : ""} :`,
    ``,
    ...lines,
    ``,
    ...total,
    ``,
    `— Mes coordonnées —`,
    customerBlock(customer),
    customer?.message ? `\nMessage : ${customer.message}` : "",
    ``,
    `Merci de me confirmer la disponibilité et la livraison.`,
  ].join("\n");
}

export const mailtoUrl = (subject, body, to = EMAIL) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** Lien WhatsApp avec message pré-rempli (le client n'a plus qu'à appuyer sur Envoyer). */
export const whatsappUrl = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_GENERIC =
  "Bonjour TGT Propreté, je souhaite des informations sur vos produits d'entretien professionnels.\n\nMon activité : \nMa société : \nMa ville : ";

export const whatsappProductText = (name) =>
  `Bonjour TGT Propreté, je suis intéressé par le produit « ${name} ».\n\nPouvez-vous me donner un tarif et les délais de livraison ?\n\nMa société : \nMa ville : `;
