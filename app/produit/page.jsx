"use client";
// TGT PROPRETÉ — Fiche produit (template unique) · URL : /produit?id=speed-flash-tgt
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SEED } from "../../data/products";
import { useCart } from "../../components/CartProvider";
import QtyStepper from "../../components/QtyStepper";
import ProductCard from "../../components/ProductCard";
import { BagIcon, CheckIcon, StarIcon, WhatsAppIcon } from "../../components/Icons";
import { CATEGORIES, TARGETS } from "../../lib/site";
import { eur, mailtoUrl, priceInfo, splitName, whatsappProductText, whatsappUrl } from "../../lib/order";

export default function ProduitPage() {
  // Suspense obligatoire avec useSearchParams
  return (
    <Suspense fallback={<main className="min-h-[60vh]" />}>
      <ProduitContent />
    </Suspense>
  );
}

const Block = ({ title, tone = "white", children }) => (
  <section className={`rounded-3xl p-7 md:p-8 ${tone === "warn" ? "border border-amber-300 bg-amber-50/70" : "bg-white shadow-card"}`}>
    <h2 className="font-serif text-[32px] font-semibold leading-none">{title}</h2>
    <div className="mb-5 mt-4 h-0.5 w-10 bg-gold" />
    {children}
  </section>
);

function ProduitContent() {
  const id = useSearchParams().get("id");
  const { add, qtyOf } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const p = SEED.find((x) => String(x.id) === String(id));

  useEffect(() => {
    document.title = p ? `${splitName(p.name).title} — TGT Propreté` : "Produit — TGT Propreté";
    setImgError(false); setQty(1);
  }, [p]);

  if (!p) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="display text-5xl">Produit introuvable</h1>
        <p className="mt-4 text-ink/65">Ce produit n'existe pas ou n'est plus au catalogue.</p>
        <a href="/#catalogue" className="btn btn-gold mt-8">Voir le catalogue</a>
      </main>
    );
  }

  const { title, subtitle } = splitName(p.name);
  const cat = CATEGORIES.find((c) => c.id === p.category);
  const price = priceInfo(p);
  const oos = !p.available;
  const technical = Object.entries(p.technical ?? {});
  const related = SEED.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  const inCart = qtyOf(p.id);

  const onAdd = () => { add(p.id, qty, title); setAdded(true); setQty(1); setTimeout(() => setAdded(false), 1600); };

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
      <nav aria-label="Fil d'Ariane" className="text-sm text-ink/55">
        <a href="/#catalogue" className="font-semibold text-gold-deep hover:underline">← Catalogue</a>
        {cat && <span> / {cat.label}</span>}
      </nav>

      <section className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Visuel */}
        <div className={`relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_30%,#F4EBCB_0%,#fff_70%)] ${p.featured && !oos ? "ring-2 ring-gold" : "ring-1 ring-ink/10"}`}>
          {!imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={title} onError={() => setImgError(true)} className={`absolute inset-0 h-full w-full object-contain p-10 drop-shadow-[0_24px_24px_rgba(15,31,61,.25)] ${oos ? "opacity-40 grayscale" : ""}`} />
          ) : <span className="text-9xl" aria-hidden="true">{p.icon}</span>}
          {(oos || p.badge || p.featured) && (
            <span className={`absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold shadow-md ${oos ? "bg-ink/80 text-white" : "bg-gradient-to-br from-gold to-gold-deep text-navy-900"}`}>
              {!oos && <StarIcon size={13} />} {oos ? "Rupture de stock" : p.badge || "Sélection TGT"}
            </span>
          )}
        </div>

        {/* Infos + achat */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <div>
            <h1 className="display text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.02]">{title}</h1>
            {subtitle && <p className="mt-3 text-xl font-medium text-ink/60">{subtitle}</p>}
          </div>
          <p className="text-lg leading-relaxed text-ink/75">{p.description}</p>
          <p className="text-[15px] text-ink/60">📦 <b className="font-semibold text-ink">Conditionnement :</b> {p.format}</p>

          {p.targets?.length > 0 && (
            <div className="flex flex-wrap gap-2 text-sm">
              {p.targets.map((tid) => { const t = TARGETS.find((x) => x.id === tid); return t ? <span key={tid} className="rounded-full border border-ink/15 bg-white px-3.5 py-1.5">{t.icon} {t.label}</span> : null; })}
            </div>
          )}

          <div className="rounded-3xl border border-gold/40 bg-white p-6 shadow-card">
            {price.amount != null ? (
              <p className="leading-none"><span className="font-serif text-5xl font-bold text-navy">{eur(price.amount)}</span><span className="ml-2 font-semibold text-ink/60">HT</span>{price.unit && <span className="ml-2 text-ink/55">/ {price.unit}</span>}</p>
            ) : <p className="font-serif text-4xl font-bold text-navy">Sur devis</p>}
            <p className="mt-1.5 text-[13px] text-ink/50">{price.amount != null ? `Soit ${eur(price.amount * 1.2)} TTC` : "Réponse rapide à votre demande"}</p>

            <div className="mt-5 grid gap-3">
              {oos ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={mailtoUrl(`Alerte retour en stock — ${title}`, `Bonjour TGT Propreté,\n\nMerci de me prévenir dès que « ${p.name} » est de nouveau disponible.`)} className="btn btn-gold">M'alerter du retour en stock</a>
                  <a href={whatsappUrl(whatsappProductText(title))} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><WhatsAppIcon size={18} /> Demander un devis</a>
                </div>
              ) : price.amount == null ? (
                <a href={mailtoUrl(`Demande de devis — ${title}`, `Bonjour TGT Propreté,\n\nPouvez-vous m'établir un devis pour « ${p.name} » ?`)} className="btn btn-gold">Demander un devis</a>
              ) : (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <QtyStepper value={qty} onChange={setQty} label={`Quantité ${title}`} />
                    <button onClick={onAdd} className={`btn h-11 flex-1 py-0 text-base ${added ? "bg-emerald-600 text-white" : "btn-gold"}`}>
                      {added ? <><CheckIcon size={16} /> Ajouté au panier</> : <><BagIcon size={19} /> Ajouter au panier</>}
                    </button>
                  </div>
                  {inCart > 0 && <p className="text-sm text-emerald-700">✓ {inCart} déjà dans votre panier</p>}
                  <a href={whatsappUrl(whatsappProductText(title))} target="_blank" rel="noopener noreferrer" className="btn border border-[#25D366]/50 text-[#178a42] hover:bg-[#25D366] hover:text-white"><WhatsAppIcon size={18} /> Poser une question sur WhatsApp</a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Détails */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {p.features?.length > 0 && (
          <Block title="Caractéristiques">
            <ul className="grid gap-3 text-[15px] leading-relaxed text-ink/80">
              {p.features.map((f, i) => <li key={i} className="flex gap-3"><span className="mt-1.5 shrink-0"><StarIcon size={12} color="#C9A84C" /></span>{f}</li>)}
            </ul>
          </Block>
        )}
        {p.usage?.length > 0 && (
          <Block title="Utilisation">
            <ol className="grid gap-3.5 text-[15px] leading-relaxed text-ink/80">
              {p.usage.map((u, i) => <li key={i} className="flex gap-3.5"><span className="w-6 shrink-0 font-serif text-3xl font-bold leading-none text-gold-deep">{i + 1}</span>{u}</li>)}
            </ol>
          </Block>
        )}
        {p.precautions?.length > 0 && (
          <Block title="Précautions d'emploi" tone="warn">
            <ul className="grid gap-3 text-[15px] leading-relaxed text-ink/85">
              {p.precautions.map((x, i) => <li key={i} className="flex gap-3"><span aria-hidden="true">⚠️</span>{x}</li>)}
            </ul>
          </Block>
        )}
        {(technical.length > 0 || p.pdf) && (
          <Block title="Fiche technique">
            {technical.length > 0 && (
              <dl className="text-[15px]">
                {technical.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-ink/10 py-2.5 last:border-0"><dt className="font-semibold">{k}</dt><dd className="text-right text-ink/70">{v}</dd></div>
                ))}
              </dl>
            )}
            {p.pdf && <a href={p.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6 text-sm">📄 Télécharger la fiche technique (PDF)</a>}
          </Block>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-20" aria-labelledby="assoc">
          <h2 id="assoc" className="display text-4xl">Dans la même catégorie</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">{related.map((r, i) => <ProductCard key={r.id} p={r} index={i} />)}</div>
        </section>
      )}
    </main>
  );
}
