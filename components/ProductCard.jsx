"use client";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";
import { BagIcon, CheckIcon, StarIcon, WhatsAppIcon } from "./Icons";
import { CATEGORIES } from "../lib/site";
import { eur, mailtoUrl, priceInfo, splitName, whatsappProductText, whatsappUrl } from "../lib/order";

export default function ProductCard({ p, index = 0 }) {
  const { add, qtyOf } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const { title, subtitle } = splitName(p.name);
  const cat = CATEGORIES.find((c) => c.id === p.category);
  const price = priceInfo(p);
  const oos = !p.available;
  const inCart = qtyOf(p.id);
  const href = `/produit?id=${encodeURIComponent(p.id)}`;
  const badge = oos ? "Rupture de stock" : p.badge || (p.featured ? "Sélection TGT" : "");

  const onAdd = () => {
    add(p.id, qty, title);
    setAdded(true); setQty(1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article
      className={`anim-card group flex h-full flex-col overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${p.featured && !oos ? "ring-2 ring-gold" : "ring-1 ring-ink/10"}`}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      {/* Visuel */}
      <a href={href} aria-label={`Voir la fiche : ${title}`} className="relative flex h-60 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#F4EBCB_0%,#fff_72%)] p-6">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={title} loading="lazy" onError={() => setImgError(true)}
            className={`max-h-full max-w-full object-contain drop-shadow-[0_14px_16px_rgba(15,31,61,.22)] transition-transform duration-500 group-hover:scale-[1.07] group-hover:-rotate-1 ${oos ? "opacity-40 grayscale" : ""}`} />
        ) : (
          <span className="text-7xl" aria-hidden="true">{p.icon}</span>
        )}
        {badge && (
          <span className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-md ${oos ? "bg-ink/80 text-white" : "bg-gradient-to-br from-gold to-gold-deep text-navy-900"}`}>
            {!oos && <StarIcon size={11} />} {badge}
          </span>
        )}
        {inCart > 0 && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white shadow-md">
            <CheckIcon size={11} /> {inCart} au panier
          </span>
        )}
      </a>

      {/* Contenu */}
      <div className="flex grow flex-col gap-3 p-6">
        <p className="text-[13px] font-medium text-gold-deep">{cat?.label}</p>
        <div>
          <h3 className="font-serif text-[28px] font-semibold leading-[1.05] tracking-tight"><a href={href} className="transition-colors hover:text-gold-deep">{title}</a></h3>
          {subtitle && <p className="mt-1.5 text-[15px] font-medium text-ink/60">{subtitle}</p>}
        </div>
        <p className="line-clamp-3 grow text-[15px] leading-relaxed text-ink/70">{p.description}</p>
        <p className="text-[13px] text-ink/55">📦 {p.format}</p>

        {/* Prix */}
        <div className="flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
          {price.amount != null ? (
            <p className="leading-none">
              <span className="font-serif text-4xl font-bold text-navy">{eur(price.amount)}</span>
              <span className="ml-1.5 text-sm font-semibold text-ink/60">HT</span>
              {price.unit && <span className="mt-1.5 block text-[13px] text-ink/55">/ {price.unit}</span>}
            </p>
          ) : (
            <p className="font-serif text-3xl font-bold text-navy">Sur devis</p>
          )}
          <a href={href} className="pb-0.5 text-sm font-semibold text-gold-deep underline-offset-4 hover:underline">Voir la fiche</a>
        </div>

        {/* Actions */}
        {oos ? (
          <div className="grid grid-cols-2 gap-2">
            <a href={mailtoUrl(`Alerte retour en stock — ${title}`, `Bonjour TGT Propreté,\n\nMerci de me prévenir dès que « ${p.name} » est de nouveau disponible.`)} className="btn btn-outline px-3 py-2.5 text-sm">M'alerter</a>
            <a href={mailtoUrl(`Demande de devis — ${title}`, `Bonjour TGT Propreté,\n\nPouvez-vous m'établir un devis pour « ${p.name} » ?`)} className="btn btn-outline px-3 py-2.5 text-sm">Devis</a>
          </div>
        ) : price.amount == null ? (
          <a href={mailtoUrl(`Demande de devis — ${title}`, `Bonjour TGT Propreté,\n\nPouvez-vous m'établir un devis pour « ${p.name} » ?`)} className="btn btn-gold w-full">Demander un devis</a>
        ) : (
          <div className="flex items-center gap-2.5">
            <QtyStepper value={qty} onChange={setQty} label={`Quantité ${title}`} />
            <button onClick={onAdd}
              className={`btn flex-1 py-0 h-11 ${added ? "bg-emerald-600 text-white" : "btn-gold"}`} aria-live="polite">
              {added ? <><CheckIcon size={15} /> Ajouté</> : <><BagIcon size={18} /> Ajouter</>}
            </button>
            <a href={whatsappUrl(whatsappProductText(title))} target="_blank" rel="noopener noreferrer" aria-label={`Poser une question sur ${title} via WhatsApp`}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#25D366]/50 text-[#1faa53] transition hover:bg-[#25D366] hover:text-white"><WhatsAppIcon size={20} /></a>
          </div>
        )}
      </div>
    </article>
  );
}
