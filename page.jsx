"use client";
// TGT PROPRETÉ — Page d'accueil + catalogue
// Les produits sont dans data/products.js ; la fiche détaillée est app/produit/page.jsx (?id=...)
import { useEffect, useMemo, useRef, useState } from "react";
import { SEED } from "./data/products";

/* =====================================================================
   1. CHARTE & CONSTANTES
   ===================================================================== */
const NAVY = "rgb(26, 26, 46)";
const GOLD = "rgb(201, 168, 76)";
const GOLD_DARK = "rgb(158, 128, 45)";
const GOLD_SOFT = "rgba(201, 168, 76, 0.14)";
const BG = "#FBFAF7";
const EMAIL = "Contact@tgtproprete.fr";
const PHONE = "+33 7 52 08 11 44";
const PHONE_LINK = "+33752081144";

/* =====================================================================
   2. RÉFÉRENTIELS
   ===================================================================== */
const CATEGORIES = [
  { id: "sols", label: "Sols" },
  { id: "degraissants", label: "Dégraissants" },
  { id: "vitres", label: "Vitres & Surfaces" },
  { id: "sanitaires", label: "Sanitaires" },
  { id: "desodorisants", label: "Désodorisants" },
  { id: "consommables", label: "Consommables" },
];
const TARGETS = [
  { id: "restaurateurs", label: "Restaurateurs", icon: "🍽️" },
  { id: "commerces", label: "Commerces & Boutiques", icon: "🛍️" },
  { id: "bureaux", label: "Bureaux", icon: "🏢" },
  { id: "chantiers", label: "Chantiers", icon: "🏗️" },
];

/* =====================================================================
   4. OUTILS
   ===================================================================== */
const mailto = (kind, name, details = "") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`${kind} — ${name}`)}&body=${encodeURIComponent(
    `Bonjour TGT Propreté,\n\nProduit concerné : ${name}\n${details}\n\nMerci de me recontacter.`
  )}`;

const Star = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={GOLD} aria-hidden="true">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);

const goldBtn = "rounded-full px-6 py-3 font-semibold text-center transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0";

/* Animation d'apparition au scroll (légère, sans dépendance) */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* =====================================================================
   5. COMPOSANT PRINCIPAL
   ===================================================================== */
export default function TgtProprete() {
  const products = SEED;
  const [target, setTarget] = useState("all");
  const [category, setCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  /* Bouton retour en haut */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = useMemo(
    () => products.filter((p) => (target === "all" || p.targets.includes(target)) && (category === "all" || p.category === category)),
    [products, target, category]
  );
  const showAll = () => { setTarget("all"); setCategory("all"); };
  const filtered = target !== "all" || category !== "all";

  const chip = (on) => ({
    background: on ? NAVY : "#fff",
    color: on ? "#fff" : NAVY,
    borderColor: on ? NAVY : "rgba(26,26,46,.18)",
  });

  return (
    <div className="min-h-screen" style={{ background: BG, color: NAVY, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        html{scroll-behavior:smooth;scroll-padding-top:90px}
        .serif{font-family:'Cormorant Garamond',Georgia,serif}
        :focus-visible{outline:2px solid ${NAVY};outline-offset:2px}
        .reveal{opacity:0;transform:translateY(22px);transition:opacity .65s ease,transform .65s cubic-bezier(.22,1,.36,1)}
        .reveal.is-visible{opacity:1;transform:none}
        .hero-blob{position:absolute;border-radius:9999px;filter:blur(70px);opacity:.5;pointer-events:none}
        .card-hover{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .35s}
        .card-hover:hover{transform:translateY(-6px);box-shadow:0 24px 48px -18px rgba(26,26,46,.22)}
        ::selection{background:${GOLD};color:#fff}
      `}</style>

      {/* ===== HEADER COLLANT ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b" style={{ borderColor: "rgba(201,168,76,.45)" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <a href="#top" className="serif text-2xl font-bold tracking-wide">
            TGT <span style={{ color: GOLD_DARK }}>Propreté</span>
          </a>
          <nav className="hidden md:flex gap-7 text-sm font-medium">
            <a href="#echantillon" className="hover:text-[rgb(158,128,45)] transition-colors">Échantillon offert</a>
            <a href="#catalogue" className="hover:text-[rgb(158,128,45)] transition-colors">Catalogue</a>
            <a href="#engagements" className="hover:text-[rgb(158,128,45)] transition-colors">Engagements</a>
            <a href="#contact" className="hover:text-[rgb(158,128,45)] transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${PHONE_LINK}`} className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2 text-white shadow-md transition hover:brightness-110 hover:-translate-y-0.5" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>
              {PHONE}
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 grid place-items-center rounded-lg border" style={{ borderColor: "rgba(26,26,46,.15)" }} aria-label="Menu" aria-expanded={menuOpen}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round"><path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t bg-white px-5 py-4 grid gap-3 text-sm font-medium" style={{ borderColor: "rgba(201,168,76,.35)" }}>
            <a href="#echantillon" onClick={() => setMenuOpen(false)}>Échantillon offert</a>
            <a href="#catalogue" onClick={() => setMenuOpen(false)}>Catalogue</a>
            <a href="#engagements" onClick={() => setMenuOpen(false)}>Engagements</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href={`tel:${PHONE_LINK}`} className="font-semibold" style={{ color: GOLD_DARK }}>{PHONE}</a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* ===== HERO + ÉCHANTILLON OFFERT ===== */}
        <section id="echantillon" className="relative overflow-hidden">
          <div className="hero-blob w-[420px] h-[420px] -top-32 -left-32" style={{ background: GOLD_SOFT }} />
          <div className="hero-blob w-[380px] h-[380px] top-40 -right-24" style={{ background: "rgba(26,26,46,.07)" }} />
          <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-16 md:pt-24 grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide uppercase" style={{ borderColor: GOLD, background: GOLD_SOFT, color: GOLD_DARK }}>
                  <Star size={12} /> Produits professionnels · Livraison Île-de-France
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="serif mt-5 text-5xl md:text-6xl font-bold leading-[1.05]">
                  Testez nos produits chez vous, <span style={{ color: GOLD_DARK }}>sans aucun engagement.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg text-[rgba(26,26,46,.75)] max-w-2xl leading-relaxed">
                  Le gérant de TGT Propreté <strong>se déplace lui-même chez vous</strong>, partout en Île-de-France, avec un échantillon gratuit du produit de votre choix. Vous le testez par vous-même avant d'acheter.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-4 text-[rgba(26,26,46,.75)] max-w-2xl leading-relaxed">
                  Satisfait ? Nous lançons ensemble un partenariat aux meilleurs tarifs, <em className="font-semibold not-italic text-lg" style={{ color: GOLD_DARK }}>rentable pour les deux côtés</em>, avec la garantie d'un stock toujours suffisant. Sinon, l'échantillon reste offert, sans engagement.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p className="mt-4 font-semibold">Un appel → <a href={`tel:${PHONE_LINK}`} className="underline decoration-2 underline-offset-4" style={{ color: GOLD_DARK }}>{PHONE}</a>, votre adresse, et c'est parti. Alors, à vous de jouer !</p>
              </Reveal>
              <Reveal delay={340}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className={`${goldBtn} text-white`} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}>Avoir un échantillon</a>
                  <a href="#catalogue" className={`${goldBtn} border bg-white`} style={{ borderColor: GOLD }}>Voir le catalogue</a>
                </div>
              </Reveal>
            </div>

            {/* Les 3 étapes */}
            <ol className="lg:col-span-2 grid gap-4">
              {[
                ["Vous nous appelez", `Au ${PHONE}, indiquez votre adresse et le produit qui vous intéresse.`],
                ["Le gérant se déplace", "Il vous remet l'échantillon gratuit directement chez vous, avec conseils d'utilisation."],
                ["Vous testez, vous décidez", "Satisfait : partenariat aux meilleurs tarifs. Sinon : aucun engagement."],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 120}>
                  <li className="flex gap-4 rounded-2xl bg-white p-5 border card-hover" style={{ borderColor: "rgba(201,168,76,.5)" }}>
                    <span className="serif text-4xl font-bold leading-none w-10 shrink-0" style={{ color: GOLD_DARK }}>{i + 1}</span>
                    <span><b className="block mb-1">{t}</b><span className="text-sm text-[rgba(26,26,46,.7)] leading-relaxed">{d}</span></span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== CATALOGUE ===== */}
        <section id="catalogue" className="bg-white border-y" style={{ borderColor: "rgba(26,26,46,.08)" }}>
          <div className="max-w-6xl mx-auto px-5 py-16">
            <Reveal>
              <h2 className="serif text-4xl md:text-5xl font-bold">Trouvez le bon produit pour votre activité</h2>
            </Reveal>

            {/* Cibles */}
            <Reveal delay={80}>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3" role="group" aria-label="Filtrer par secteur d'activité">
                {[{ id: "all", label: "Tous les produits", icon: "🗂️" }, ...TARGETS].map((t) => {
                  const on = target === t.id;
                  return (
                    <button key={t.id} onClick={() => setTarget(t.id)} aria-pressed={on}
                      className="card-hover rounded-xl p-4 text-left border-2"
                      style={{ borderColor: on ? GOLD : "rgba(26,26,46,.12)", background: on ? GOLD_SOFT : "#fff" }}>
                      <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                      <span className="block mt-2 font-semibold text-sm">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Catégories */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Catégories">
              {[{ id: "all", label: "Toutes les catégories" }, ...CATEGORIES].map((c) => (
                <button key={c.id} role="tab" aria-selected={category === c.id} onClick={() => setCategory(c.id)}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold border transition-all duration-300 hover:-translate-y-0.5" style={chip(category === c.id)}>
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm">
              <span className="text-[rgba(26,26,46,.6)]">{visible.length} produit{visible.length > 1 ? "s" : ""}</span>
              {filtered && <button onClick={showAll} className="font-semibold underline underline-offset-4" style={{ color: GOLD_DARK }}>Afficher tous les produits</button>}
            </div>

            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
                  <ProductCard p={p} />
                </Reveal>
              ))}
            </div>
            {visible.length === 0 && (
              <p className="mt-10">Aucun produit pour cette sélection. <button onClick={showAll} className="font-semibold underline underline-offset-4" style={{ color: GOLD_DARK }}>Voir toute la gamme</button></p>
            )}
          </div>
        </section>

        {/* ===== ENGAGEMENTS ===== */}
        <section id="engagements" className="max-w-6xl mx-auto px-5 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["🚚", "Livraison en Île-de-France", "Bidons et cartons livrés sur votre site, dans toute la région."],
            ["🧪", "Formules de chimistes", "Concentrés puissants, pensés pour un usage intensif."],
            ["📦", "Stock toujours suffisant", "Nous anticipons vos besoins : vous n'avez plus à y penser."],
            ["🤝", "Conseil d'experts", "Dosage, supports, protocoles : nous vous accompagnons."],
          ].map(([icon, t, d], i) => (
            <Reveal key={t} delay={i * 90}>
              <div className="h-full rounded-2xl bg-white p-6 border card-hover" style={{ borderColor: "rgba(26,26,46,.1)" }}>
                <span className="text-3xl" aria-hidden="true">{icon}</span>
                <div className="w-8 h-0.5 mt-4 mb-4" style={{ background: GOLD }} />
                <h3 className="serif text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-[rgba(26,26,46,.7)] leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="max-w-6xl mx-auto px-5 pb-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center border-2" style={{ borderColor: GOLD, background: "#fff" }}>
              <div className="hero-blob w-72 h-72 -bottom-20 -right-16" style={{ background: GOLD_SOFT }} />
              <div className="relative">
                <h2 className="serif text-4xl font-bold">Planifiez la visite du gérant</h2>
                <p className="mt-3 text-[rgba(26,26,46,.75)] leading-relaxed">Appelez-nous ou laissez-nous vos coordonnées : nous passons vous remettre votre échantillon offert, sur le produit de votre choix.</p>
              </div>
              <ContactForm products={products} />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t text-sm" style={{ borderColor: "rgba(26,26,46,.1)", color: "rgba(26,26,46,.6)" }}>
        <div className="max-w-6xl mx-auto px-5 py-6 flex flex-wrap justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} TGT Propreté · {EMAIL} · {PHONE}</span>
        </div>
      </footer>

      {/* Bouton retour en haut */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full text-white shadow-xl grid place-items-center transition hover:brightness-110 hover:-translate-y-0.5"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </button>
      )}

    </div>
  );
}

/* =====================================================================
   6. MINI-FORMULAIRE DE CONTACT (mailto pré-rempli)
   ===================================================================== */
function ContactForm({ products }) {
  const [form, setForm] = useState({ name: "", company: "", product: "", message: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    const details = `\nNom : ${form.name}\nSociété : ${form.company}\nAdresse (Île-de-France) :\nTéléphone :\n\nMessage :\n${form.message}`;
    window.location.href = mailto("Demande d'échantillon", form.product || "Échantillon gratuit", details);
  };
  const input = "w-full rounded-xl px-4 py-3 text-sm bg-[#FBFAF7] border border-[rgba(26,26,46,.15)] focus:border-[rgb(201,168,76)] transition-colors placeholder:text-[rgba(26,26,46,.35)]";
  return (
    <form onSubmit={submit} className="relative grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input className={input} placeholder="Votre nom *" required value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input className={input} placeholder="Société / activité" value={form.company} onChange={(e) => set("company", e.target.value)} />
      </div>
      <select className={input} value={form.product} onChange={(e) => set("product", e.target.value)}>
        <option value="">Produit qui vous intéresse (optionnel)</option>
        {products.filter((p) => p.available).map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
      </select>
      <textarea className={input} rows={3} placeholder="Votre message (adresse, disponibilités…)" value={form.message} onChange={(e) => set("message", e.target.value)} />
      <button className={`${goldBtn} text-white`} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}>
        Envoyer ma demande d'échantillon
      </button>
      <p className="text-center text-sm text-[rgba(26,26,46,.6)]">Livraison et visites dans toute l'Île-de-France</p>
    </form>
  );
}

/* =====================================================================
   7. CARTE PRODUIT (Avec affichage du prix ajouté)
   ===================================================================== */
function ProductCard({ p }) {
  const cat = CATEGORIES.find((c) => c.id === p.category);
  const oos = !p.available;
  const [imgError, setImgError] = useState(false);
  const href = `/produit?id=${encodeURIComponent(p.id)}`;
  const iconIsUrl = /^https?:\/\//.test(p.icon);
  const imgSrc = p.image || (iconIsUrl ? p.icon : "");
  return (
    <article className="card-hover h-full rounded-2xl border bg-white flex flex-col overflow-hidden"
      style={{ borderColor: p.featured ? GOLD : "rgba(26,26,46,.12)", borderWidth: p.featured ? 2 : 1 }}>
      
      {/* Conteneur image ajusté à h-52 / sm:h-56 pour que l'image du produit s'affiche en entier */}
      <a href={href} aria-label={`Voir la fiche : ${p.name}`} className="relative h-52 sm:h-56 w-full flex items-center justify-center p-4 overflow-hidden"
        style={{ background: `radial-gradient(circle at 50% 30%, ${GOLD_SOFT}, #fff 75%)`, opacity: oos ? 0.45 : 1 }}>
        {imgSrc && !imgError
          ? <img src={imgSrc} alt={p.name} onError={() => setImgError(true)} className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105" />
          : <span className="text-6xl" aria-hidden="true">{iconIsUrl ? "🧴" : p.icon}</span>}
        {p.featured && !oos && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border shadow-sm" style={{ background: "#fff", borderColor: GOLD, color: GOLD_DARK }}>
            <Star size={11} /> Produit Efficace
          </span>
        )}
      </a>

      <div className="p-5 flex flex-col gap-3 grow">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {oos && <span className="rounded-full px-2.5 py-1 bg-orange-50 text-orange-800 border border-orange-300">Rupture de stock · Victime de son succès</span>}
          <span className="rounded-full px-2.5 py-1 bg-[rgba(26,26,46,.06)]">{cat?.label}</span>
        </div>
        <h3 className="serif text-2xl font-semibold leading-tight">
          <a href={href} className="hover:text-[rgb(158,128,45)] transition-colors">{p.name}</a>
        </h3>
        <p className="text-sm text-[rgba(26,26,46,.72)] leading-relaxed grow">{p.description}</p>
        <p className="text-xs font-semibold"><span className="opacity-60 font-medium">Formats :</span> {p.format}</p>

        {/* Case Prix ajoutée ici */}
        {p.price && (
          <div className="rounded-xl px-3.5 py-2 flex items-center justify-between border" style={{ borderColor: "rgba(201,168,76,.3)", background: GOLD_SOFT }}>
            <span className="text-xs font-semibold opacity-75">Tarif Pro :</span>
            <span className="text-sm font-bold" style={{ color: GOLD_DARK }}>{p.price}</span>
          </div>
        )}

        <a href={href} className="text-sm font-semibold underline underline-offset-4" style={{ color: GOLD_DARK }}>Voir la fiche détaillée →</a>
        <div className="grid grid-cols-2 gap-2 pt-1">
          {oos ? (
            <>
              <span aria-disabled="true" className="rounded-full py-2.5 text-center text-sm font-semibold bg-[rgba(26,26,46,.07)] text-[rgba(26,26,46,.4)] cursor-not-allowed">Indisponible</span>
              <a href={mailto("Alerte retour en stock", p.name)} className="rounded-full py-2.5 text-center text-sm font-semibold border-2 transition hover:bg-[rgba(201,168,76,.12)]" style={{ borderColor: GOLD }}>M'alerter</a>
            </>
          ) : (
            <>
              <a href={mailto("Commande", p.name)} className="rounded-full py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-110" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}>Commander</a>
              <a href={mailto("Demande de devis", p.name)} className="rounded-full py-2.5 text-center text-sm font-semibold border-2 transition hover:bg-[rgba(201,168,76,.12)]" style={{ borderColor: GOLD }}>Demander un devis</a>
            </>
          )}
        </div>
      </div>
    </article>
  );
}