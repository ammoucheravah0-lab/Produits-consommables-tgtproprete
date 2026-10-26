"use client";
// TGT PROPRETÉ — Page produit UNIQUE (template)
// URL : /produit?id=degraissant-haccp-cuisine-pro
// Emplacement : app/produit/page.jsx
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SEED } from "../../data/products";

/* ---------- Charte (identique à la page d'accueil) ---------- */
const NAVY = "rgb(26, 26, 46)";
const GOLD = "rgb(201, 168, 76)";
const GOLD_DARK = "rgb(158, 128, 45)";
const GOLD_SOFT = "rgba(201, 168, 76, 0.14)";
const BG = "#FBFAF7";
const EMAIL = "Contact@tgtproprete.fr";
const PHONE = "+33 7 52 08 11 44";
const PHONE_LINK = "+33752081144";

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

const mailto = (kind, name, details = "") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`${kind} - ${name}`)}&body=${encodeURIComponent(
    `Bonjour TGT Propreté,\n\nProduit concerné : ${name}\n${details}\n\nMerci de me recontacter.`
  )}`;

const gradient = `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`;
const goldBtn = "rounded-full px-6 py-3 font-semibold text-center transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0";

const Star = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={GOLD} aria-hidden="true">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);

/* =====================================================================
   PAGE (enveloppée dans Suspense : obligatoire avec useSearchParams)
   ===================================================================== */
export default function ProduitPage() {
  return (
    <Suspense fallback={null}>
      <ProduitContent />
    </Suspense>
  );
}

function ProduitContent() {
  const id = useSearchParams().get("id");
  const products = SEED;
  const [imgError, setImgError] = useState(false);

  const p = products.find((x) => String(x.id) === String(id));

  useEffect(() => {
    document.title = p ? `${p.name} — TGT Propreté` : "Produit — TGT Propreté";
    setImgError(false);
  }, [p]);

  const cat = p && CATEGORIES.find((c) => c.id === p.category);
  const oos = p && !p.available;
  const imgSrc = p && (p.image || (/^https?:\/\//.test(p.icon) ? p.icon : ""));
  const fallbackIcon = p && (/^https?:\/\//.test(p.icon) ? "🧴" : p.icon);
  const features = p?.features ?? [];
  const usage = p?.usage ?? [];
  const precautions = p?.precautions ?? [];
  const technical = Object.entries(p?.technical ?? {});

  return (
    <div className="min-h-screen" style={{ background: BG, color: NAVY, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        html{scroll-behavior:smooth;scroll-padding-top:90px}
        .serif{font-family:'Cormorant Garamond',Georgia,serif}
        :focus-visible{outline:2px solid ${NAVY};outline-offset:2px}
        .card-hover{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .35s}
        .card-hover:hover{transform:translateY(-6px);box-shadow:0 24px 48px -18px rgba(26,26,46,.22)}
        ::selection{background:${GOLD};color:#fff}
      `}</style>

      {/* ===== HEADER (identique) ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b" style={{ borderColor: "rgba(201,168,76,.45)" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <a href="/" className="serif text-2xl font-bold tracking-wide">
            TGT <span style={{ color: GOLD_DARK }}>Propreté</span>
          </a>
          <nav className="hidden md:flex gap-7 text-sm font-medium">
            <a href="/#echantillon" className="hover:text-[rgb(158,128,45)] transition-colors">Échantillon offert</a>
            <a href="/#catalogue" className="hover:text-[rgb(158,128,45)] transition-colors">Catalogue</a>
            <a href="/#engagements" className="hover:text-[rgb(158,128,45)] transition-colors">Engagements</a>
            <a href="/#contact" className="hover:text-[rgb(158,128,45)] transition-colors">Contact</a>
          </nav>
          <a href={`tel:${PHONE_LINK}`} className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2 text-white shadow-md transition hover:brightness-110 hover:-translate-y-0.5" style={{ background: gradient }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>
            <span className="hidden sm:inline">{PHONE}</span>
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10 md:py-14">
        <a href="/#catalogue" className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline" style={{ color: GOLD_DARK }}>
          ← Retour au catalogue
        </a>

        {/* ----- Produit introuvable ----- */}
        {!p && (
          <div className="mt-10 rounded-2xl bg-white border p-8 text-center" style={{ borderColor: "rgba(26,26,46,.12)" }}>
            <h1 className="serif text-4xl font-bold">Produit introuvable</h1>
            <p className="mt-3 text-[rgba(26,26,46,.7)]">Ce produit n'existe pas ou n'est plus au catalogue.</p>
            <a href="/#catalogue" className={`${goldBtn} inline-block mt-6 text-white`} style={{ background: gradient }}>Voir le catalogue</a>
          </div>
        )}

        {/* ----- Fiche produit ----- */}
        {p && (
          <>
            <section className="mt-8 grid lg:grid-cols-2 gap-10 items-start">
              {/* Image */}
              <div className="relative rounded-3xl border bg-white overflow-hidden grid place-items-center aspect-square text-9xl"
                style={{ borderColor: p.featured ? GOLD : "rgba(26,26,46,.12)", borderWidth: p.featured ? 2 : 1, background: `radial-gradient(circle at 30% 20%, ${GOLD_SOFT}, #fff 70%)` }}>
                <div className="h-full w-full grid place-items-center" style={{ opacity: oos ? 0.45 : 1 }}>
                  {imgSrc && !imgError
                    ? <img src={imgSrc} alt={p.name} onError={() => setImgError(true)} className="h-full w-full object-contain p-6" />
                    : <span aria-hidden="true">{fallbackIcon}</span>}
                </div>
                {p.featured && !oos && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border shadow-sm" style={{ background: "#fff", borderColor: GOLD, color: GOLD_DARK }}>
                    <Star size={11} /> Produit Efficace
                  </span>
                )}
              </div>

              {/* Infos */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  {oos && <span className="rounded-full px-2.5 py-1 bg-orange-50 text-orange-800 border border-orange-300">Rupture de stock · Victime de son succès</span>}
                  <span className="rounded-full px-2.5 py-1 bg-[rgba(26,26,46,.06)]">{cat?.label}</span>
                </div>
                <h1 className="serif text-4xl md:text-5xl font-bold leading-[1.1]">{p.name}</h1>
                <p className="text-lg text-[rgba(26,26,46,.75)] leading-relaxed">{p.description}</p>
                <p className="text-sm font-semibold"><span className="opacity-60 font-medium">Formats :</span> {p.format}</p>

                {p.targets?.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-sm">
                    {p.targets.map((tid) => {
                      const t = TARGETS.find((x) => x.id === tid);
                      return t ? <span key={tid} className="rounded-full border px-3 py-1" style={{ borderColor: "rgba(26,26,46,.15)", background: "#fff" }}>{t.icon} {t.label}</span> : null;
                    })}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {oos ? (
                    <>
                      <span aria-disabled="true" className="rounded-full py-3 text-center font-semibold bg-[rgba(26,26,46,.07)] text-[rgba(26,26,46,.4)] cursor-not-allowed">Indisponible</span>
                      <a href={mailto("Alerte retour en stock", p.name)} className="rounded-full py-3 text-center font-semibold border-2 transition hover:bg-[rgba(201,168,76,.12)]" style={{ borderColor: GOLD }}>M'alerter</a>
                    </>
                  ) : (
                    <>
                      <a href={mailto("Commande", p.name)} className={`${goldBtn} text-white`} style={{ background: gradient }}>Commander</a>
                      <a href={mailto("Demande de devis", p.name)} className={`${goldBtn} border-2 bg-white`} style={{ borderColor: GOLD }}>Demander un devis</a>
                    </>
                  )}
                </div>
                <a href={mailto("Demande d'échantillon", p.name)} className="text-sm font-semibold underline underline-offset-4" style={{ color: GOLD_DARK }}>
                  Je veux tester ce produit : échantillon offert →
                </a>
              </div>
            </section>

            {/* Sections de détail (masquées si vides) */}
            <section className="mt-14 grid md:grid-cols-2 gap-6">
              {features.length > 0 && (
                <div className="rounded-2xl bg-white p-6 border" style={{ borderColor: "rgba(26,26,46,.1)" }}>
                  <h2 className="serif text-3xl font-semibold">Caractéristiques</h2>
                  <div className="w-8 h-0.5 mt-3 mb-4" style={{ background: GOLD }} />
                  <ul className="grid gap-2.5 text-sm leading-relaxed text-[rgba(26,26,46,.8)]">
                    {features.map((f, i) => (
                      <li key={i} className="flex gap-3"><span className="mt-1 shrink-0"><Star size={12} /></span><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {usage.length > 0 && (
                <div className="rounded-2xl bg-white p-6 border" style={{ borderColor: "rgba(26,26,46,.1)" }}>
                  <h2 className="serif text-3xl font-semibold">Utilisation</h2>
                  <div className="w-8 h-0.5 mt-3 mb-4" style={{ background: GOLD }} />
                  <ol className="grid gap-3 text-sm leading-relaxed text-[rgba(26,26,46,.8)]">
                    {usage.map((u, i) => (
                      <li key={i} className="flex gap-3"><span className="serif text-2xl font-bold leading-none w-6 shrink-0" style={{ color: GOLD_DARK }}>{i + 1}</span><span>{u}</span></li>
                    ))}
                  </ol>
                </div>
              )}

              {precautions.length > 0 && (
                <div className="rounded-2xl p-6 border bg-orange-50/60 border-orange-300">
                  <h2 className="serif text-3xl font-semibold">Précautions d'emploi</h2>
                  <div className="w-8 h-0.5 mt-3 mb-4" style={{ background: GOLD }} />
                  <ul className="grid gap-2.5 text-sm leading-relaxed text-[rgba(26,26,46,.85)]">
                    {precautions.map((x, i) => (
                      <li key={i} className="flex gap-3"><span aria-hidden="true">⚠️</span><span>{x}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {(technical.length > 0 || p.pdf) && (
                <div className="rounded-2xl bg-white p-6 border" style={{ borderColor: "rgba(26,26,46,.1)" }}>
                  <h2 className="serif text-3xl font-semibold">Fiche technique</h2>
                  <div className="w-8 h-0.5 mt-3 mb-4" style={{ background: GOLD }} />
                  {technical.length > 0 && (
                    <dl className="text-sm">
                      {technical.map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 py-2 border-b last:border-0" style={{ borderColor: "rgba(26,26,46,.08)" }}>
                          <dt className="font-semibold">{k}</dt>
                          <dd className="text-right text-[rgba(26,26,46,.75)]">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {p.pdf && (
                    <a href={p.pdf} target="_blank" rel="noopener noreferrer" className={`${goldBtn} inline-block mt-5 border-2 bg-white text-sm`} style={{ borderColor: GOLD }}>
                      📄 Télécharger la fiche technique (PDF)
                    </a>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="border-t text-sm" style={{ borderColor: "rgba(26,26,46,.1)", color: "rgba(26,26,46,.6)" }}>
        <div className="max-w-6xl mx-auto px-5 py-6">
          © {new Date().getFullYear()} TGT Propreté · {EMAIL} · {PHONE}
        </div>
      </footer>
    </div>
  );
}
