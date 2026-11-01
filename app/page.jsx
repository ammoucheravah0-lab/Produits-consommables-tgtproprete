"use client";
// TGT PROPRETÉ — Accueil + catalogue
// Produits : data/products.js · Fiche détaillée : app/produit/page.jsx · Panier : components/CartProvider.jsx
import { useMemo, useState } from "react";
import { SEED } from "../data/products";
import ProductCard from "../components/ProductCard";
import { ArrowIcon, PhoneIcon, StarIcon, WhatsAppIcon } from "../components/Icons";
import { CATEGORIES, EMAIL, HERO_IMAGE, PHONE, PHONE_LINK, TARGETS, WHATSAPP_DISPLAY } from "../lib/site";
import { WHATSAPP_GENERIC, mailtoUrl, priceInfo, whatsappUrl } from "../lib/order";

const norm = (s = "") => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const SORTS = [
  { id: "featured", label: "Mis en avant" },
  { id: "price-asc", label: "Prix croissant" },
  { id: "price-desc", label: "Prix décroissant" },
  { id: "name", label: "Nom A → Z" },
];

export default function Home() {
  const [target, setTarget] = useState("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  /* Produits correspondant à la cible + recherche (sert aussi aux compteurs de catégories) */
  const base = useMemo(() => {
    const q = norm(query.trim());
    return SEED.filter(
      (p) => (target === "all" || p.targets.includes(target)) && (!q || norm(`${p.name} ${p.description} ${p.format}`).includes(q))
    );
  }, [target, query]);

  const visible = useMemo(() => {
    const list = base.filter((p) => category === "all" || p.category === category);
    const price = (p) => priceInfo(p).amount ?? Infinity;
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => price(a) - price(b));
    else if (sort === "price-desc") sorted.sort((a, b) => (price(b) === Infinity ? -1 : price(b)) - (price(a) === Infinity ? -1 : price(a)));
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    else sorted.sort((a, b) => Number(b.available && b.featured) - Number(a.available && a.featured) || Number(b.available) - Number(a.available));
    return sorted;
  }, [base, category, sort]);

  const filtered = target !== "all" || category !== "all" || query;
  const reset = () => { setTarget("all"); setCategory("all"); setQuery(""); };
  const countFor = (cid) => base.filter((p) => cid === "all" || p.category === cid).length;

  return (
    <main id="top">
      {/* =================== HERO =================== */}
      {/* Calques : photo (z-0) → voile sombre (z-[1]) → contenu (z-10). Le texte reste lisible sur n'importe quelle photo. */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} aria-hidden="true" />
        <div
          className="absolute inset-0 z-[1]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 85% 0%, rgba(201,168,76,.22), transparent 60%), linear-gradient(180deg, rgba(10,22,48,.80) 0%, rgba(15,31,61,.68) 45%, rgba(10,22,48,.92) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-76px)] max-w-5xl flex-col items-center justify-center px-5 pb-8 pt-16 text-center md:pt-20">
          <p className="anim-rise inline-flex items-center gap-3 rounded-full border border-white/25 bg-navy-900/40 px-5 py-2 text-[13px] font-medium tracking-[0.12em] text-gold backdrop-blur-sm">
            <StarIcon size={12} color="#C9A84C" /> Produits professionnels · Île-de-France
          </p>

          <h1 className="hero-text-shadow anim-rise mt-7 font-serif text-[clamp(2.6rem,7.2vw,5.6rem)] font-medium leading-[1.04] tracking-tight" style={{ animationDelay: "90ms" }}>
            Les produits d'entretien
            <span className="block italic text-gold">des professionnels</span>
            livrés chez vous
          </h1>

          <p className="hero-text-shadow anim-rise mt-7 max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl" style={{ animationDelay: "180ms" }}>
            Sols, cuisines, sanitaires, vitres, consommables : une gamme concentrée pensée pour restaurateurs, commerces, bureaux et chantiers, avec des conseils adaptés à votre activité.
          </p>

          <div className="anim-rise mt-9 flex flex-wrap items-center justify-center gap-3.5" style={{ animationDelay: "270ms" }}>
            <a href="#catalogue" className="btn btn-gold px-8 py-3.5 text-base">Voir le catalogue <ArrowIcon /></a>
            <a href={whatsappUrl(WHATSAPP_GENERIC)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light px-8 py-3.5 text-base"><WhatsAppIcon size={20} /> Nous écrire sur WhatsApp</a>
          </div>
          <p className="hero-text-shadow anim-rise mt-5 text-[15px] text-white/80" style={{ animationDelay: "330ms" }}>
            Ou appelez-nous : <a href={`tel:${PHONE_LINK}`} className="font-semibold text-white underline decoration-gold decoration-2 underline-offset-4">{PHONE}</a>
          </p>

          {/* Réassurance */}
          <ul className="anim-rise mt-14 grid w-full grid-cols-2 gap-3 md:grid-cols-4" style={{ animationDelay: "420ms" }}>
            {[
              ["🚚", "Livraison", "dans toute l'Île-de-France"],
              ["📄", "Fiches techniques", "disponibles en PDF"],
              ["🧪", "Formules concentrées", "économiques à la dilution"],
              ["🤝", "Conseil d'experts", "dosage, supports, protocoles"],
            ].map(([i, t, d]) => (
              <li key={t} className="rounded-2xl border border-white/15 bg-navy-900/45 px-4 py-4 text-left backdrop-blur-md">
                <span className="text-2xl" aria-hidden="true">{i}</span>
                <p className="mt-2 text-[15px] font-semibold">{t}</p>
                <p className="text-[13px] leading-snug text-white/70">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =================== CATALOGUE =================== */}
      <section id="catalogue" className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-20">
          <div className="max-w-2xl">
            <h2 className="display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.05]">Le bon produit pour votre activité</h2>
            <p className="mt-4 text-lg text-ink/65">Choisissez votre secteur, filtrez par usage, ajoutez au panier : votre commande se prépare en quelques clics.</p>
          </div>

          {/* Secteur */}
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-5" role="group" aria-label="Filtrer par secteur d'activité">
            {[{ id: "all", label: "Tous les produits", icon: "🗂️" }, ...TARGETS].map((t) => {
              const on = target === t.id;
              const n = SEED.filter((p) => t.id === "all" || p.targets.includes(t.id)).length;
              return (
                <button key={t.id} onClick={() => { setTarget(t.id); setCategory("all"); }} aria-pressed={on}
                  className={`group flex min-w-0 items-center gap-2 rounded-2xl border-2 px-2.5 py-3.5 text-left sm:gap-3.5 sm:px-4 sm:py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card ${on ? "border-navy bg-navy text-white shadow-lift" : "border-ink/10 bg-white hover:border-gold"}`}>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl transition-colors sm:h-11 sm:w-11 sm:text-2xl ${on ? "bg-white/10" : "bg-gold-soft"}`} aria-hidden="true">{t.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold leading-tight sm:text-[15px]">{t.label}</span>
                    <span className={`text-[13px] ${on ? "text-white/65" : "text-ink/50"}`}>{n} produits</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Barre de filtres (collante sur ordinateur) */}
          <div className="z-30 mt-6 border-y border-ink/10 bg-paper/95 py-3.5 backdrop-blur md:sticky md:top-[76px]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="hide-scrollbar flex flex-1 gap-2 overflow-x-auto pb-1 md:pb-0" role="tablist" aria-label="Catégories">
                {[{ id: "all", label: "Tout" }, ...CATEGORIES].map((c) => {
                  const on = category === c.id; const n = countFor(c.id);
                  return (
                    <button key={c.id} role="tab" aria-selected={on} onClick={() => setCategory(c.id)} disabled={n === 0 && !on}
                      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${on ? "border-gold bg-gold text-navy-900 shadow-md" : "border-ink/15 bg-white hover:border-gold"}`}>
                      {c.label}<span className={`text-xs ${on ? "text-navy-900/70" : "text-ink/40"}`}>{n}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2.5">
                <label className="relative flex-1 md:w-60 md:flex-none">
                  <span className="sr-only">Rechercher un produit</span>
                  <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="field !rounded-full !py-2.5 pl-10" />
                </label>
                <label>
                  <span className="sr-only">Trier par</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="field !w-auto !rounded-full !py-2.5 pr-8 font-medium">
                    {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 text-sm" aria-live="polite">
            <span className="text-ink/55">{visible.length} produit{visible.length > 1 ? "s" : ""}</span>
            {filtered && <button onClick={reset} className="font-semibold text-gold-deep underline underline-offset-4">Réinitialiser les filtres</button>}
          </div>

          {/* Grille : la clé relance l'animation d'entrée à chaque changement de filtre */}
          <div key={`${target}-${category}-${query}-${sort}`} className="mt-6 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>

          {visible.length === 0 && (
            <div className="mt-6 rounded-3xl border border-dashed border-ink/20 bg-white px-6 py-16 text-center">
              <p className="display text-3xl">Aucun produit ne correspond</p>
              <p className="mt-2 text-ink/60">Essayez un autre mot-clé ou élargissez les filtres.</p>
              <button onClick={reset} className="btn btn-gold mt-6">Voir toute la gamme</button>
            </div>
          )}
        </div>
      </section>

      {/* =================== ENGAGEMENTS =================== */}
      <section id="engagements" className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="display max-w-2xl text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.05]">Un fournisseur sur qui vous pouvez compter</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["🚚", "Livraison en Île-de-France", "Bidons et cartons livrés directement sur votre site, dans toute la région."],
              ["🧪", "Formules de chimistes", "Concentrés puissants, pensés pour un usage intensif et un coût d'usage maîtrisé."],
              ["📦", "Approvisionnement suivi", "Nous anticipons vos besoins pour que vous n'ayez plus à y penser."],
              ["🤝", "Conseil d'experts", "Dosage, supports, protocoles d'hygiène : nous vous accompagnons."],
            ].map(([icon, t, d]) => (
              <div key={t} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:bg-white/[0.07]">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-3xl transition-transform duration-500 group-hover:scale-110" aria-hidden="true">{icon}</span>
                <h3 className="mt-6 font-serif text-[26px] font-semibold leading-tight">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== COMMENT COMMANDER (vraie séquence → numérotation légitime) =================== */}
      <section id="commander" className="bg-mist">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.05]">Commander en trois étapes</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Composez votre panier", "Ajoutez les produits et les quantités dont vous avez besoin depuis le catalogue."],
              ["Validez vos coordonnées", "Renseignez votre société et votre adresse de livraison. Envoi par e-mail ou WhatsApp, au choix."],
              ["Nous confirmons et livrons", "Nous vérifions la disponibilité avec vous, puis organisons la livraison en Île-de-France."],
            ].map(([t, d], i) => (
              <li key={t} className="relative rounded-3xl bg-white p-8 shadow-card">
                <span className="font-serif text-6xl font-bold leading-none text-gold">{i + 1}</span>
                <h3 className="mt-4 font-serif text-[26px] font-semibold leading-tight">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =================== CONTACT =================== */}
      <section id="contact" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid overflow-hidden rounded-[2rem] bg-navy text-white shadow-lift lg:grid-cols-5">
          <div className="p-8 md:p-12 lg:col-span-2">
            <h2 className="display text-[clamp(2rem,4vw,3rem)] leading-[1.05]">Parlons de vos besoins</h2>
            <p className="mt-4 leading-relaxed text-white/75">Une question sur un produit, un volume important, un devis ? Écrivez-nous : nous répondons rapidement.</p>
            <ul className="mt-8 grid gap-3 text-[15px]">
              <li><a href={`tel:${PHONE_LINK}`} className="flex items-center gap-3 rounded-2xl border border-white/15 px-4 py-3.5 transition hover:border-gold hover:bg-white/5"><PhoneIcon size={18} /> {PHONE}</a></li>
              <li><a href={whatsappUrl(WHATSAPP_GENERIC)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/15 px-4 py-3.5 transition hover:border-[#25D366] hover:bg-white/5"><WhatsAppIcon size={18} /> WhatsApp · {WHATSAPP_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-2xl border border-white/15 px-4 py-3.5 transition hover:border-gold hover:bg-white/5">✉️ {EMAIL}</a></li>
            </ul>
          </div>
          <div className="bg-white p-8 text-ink md:p-12 lg:col-span-3"><ContactForm /></div>
        </div>
      </section>
    </main>
  );
}

/* Formulaire de contact → ouvre le client mail pré-rempli */
function ContactForm() {
  const [f, setF] = useState({ name: "", company: "", phone: "", product: "", message: "" });
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    const body = `Bonjour TGT Propreté,\n\n${f.product ? `Produit concerné : ${f.product}\n` : ""}\n${f.message}\n\n— Mes coordonnées —\nNom : ${f.name}\nSociété : ${f.company}\nTéléphone : ${f.phone}`;
    window.location.href = mailtoUrl(`Demande de contact${f.product ? ` — ${f.product}` : ""}`, body);
  };
  return (
    <form onSubmit={submit} className="grid gap-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">Nom *<input className="field" required autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} /></label>
        <label className="grid gap-1.5 text-sm font-medium">Société<input className="field" autoComplete="organization" value={f.company} onChange={(e) => set("company", e.target.value)} /></label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">Téléphone<input className="field" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Produit concerné
        <select className="field" value={f.product} onChange={(e) => set("product", e.target.value)}>
          <option value="">Aucun en particulier</option>
          {SEED.filter((p) => p.available).map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">Votre message<textarea className="field" rows={4} placeholder="Votre activité, volumes, adresse de livraison…" value={f.message} onChange={(e) => set("message", e.target.value)} /></label>
      <button className="btn btn-gold mt-1 py-3.5 text-base">Envoyer ma demande</button>
    </form>
  );
}
