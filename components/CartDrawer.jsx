"use client";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";
import { ArrowIcon, BagIcon, CheckIcon, CloseIcon, TrashIcon, WhatsAppIcon } from "./Icons";
import { SEED } from "../data/products";
import { eur, mailtoUrl, orderText, whatsappUrl } from "../lib/order";
import { PHONE, PHONE_LINK } from "../lib/site";

const CUSTOMER_KEY = "tgt-customer-v1";
const EMPTY = { name: "", company: "", email: "", phone: "", address: "", message: "" };

export default function CartDrawer() {
  const { open, setOpen, order, lines, setQty, remove, clear, toast } = useCart();
  const [step, setStep] = useState("cart"); // cart | form | done
  const [form, setForm] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { mode: "sent" | "mailto", ref }
  const closeRef = useRef(null);

  /* Coordonnées mémorisées pour les commandes suivantes */
  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "null"); if (s) setForm((f) => ({ ...f, ...s, message: "" })); } catch {}
  }, []);

  /* Échap + blocage du scroll + focus */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, setOpen]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const customer = form;
  const subject = `Commande TGT Propreté — ${order.count} article${order.count > 1 ? "s" : ""}${form.company ? ` — ${form.company}` : ""}`;

  const remember = () => { try { const { message, ...rest } = form; localStorage.setItem(CUSTOMER_KEY, JSON.stringify(rest)); } catch {} };

  const openMailClient = () => { window.location.href = mailtoUrl(subject, orderText(order, customer)); };

  const submit = async (e) => {
    e.preventDefault();
    if (sending || !order.items.length) return;
    setSending(true); setError("");
    remember();
    try {
      const res = await fetch("/api/commande", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ customer, items: lines, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        clear(); setResult({ mode: "sent", ref: data.ref }); setStep("done");
      } else if (data.fallback || res.status >= 500) {
        // Envoi automatique non configuré/indisponible → on ouvre le client mail pré-rempli
        openMailClient(); setResult({ mode: "mailto" }); setStep("done");
      } else {
        setError(data.error || "Impossible d'envoyer la commande. Vérifiez les champs et réessayez.");
      }
    } catch {
      openMailClient(); setResult({ mode: "mailto" }); setStep("done");
    } finally { setSending(false); }
  };

  const waOrder = () => { remember(); return whatsappUrl(orderText(order, customer)); };
  const close = () => { setOpen(false); if (step === "done") { setStep("cart"); setResult(null); } };

  return (
    <>
      {/* Toast « ajouté au panier » */}
      {toast && !open && (
        <div role="status" className="anim-toast fixed bottom-24 left-1/2 z-[55] flex w-[calc(100%-2.5rem)] max-w-sm items-center justify-between gap-4 rounded-2xl bg-navy px-5 py-3.5 text-sm text-white shadow-lift sm:bottom-6">
          <span className="flex items-center gap-2.5"><span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-navy-900"><CheckIcon size={13} /></span>{toast}</span>
          <button onClick={() => setOpen(true)} className="whitespace-nowrap font-semibold text-gold hover:underline">Voir le panier</button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Panier">
          <div className="anim-fade absolute inset-0 bg-navy-900/60 backdrop-blur-[2px]" onClick={close} />
          <aside className="anim-drawer absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-paper shadow-2xl">
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-5">
              <div>
                <h2 className="display text-3xl leading-none">{step === "form" ? "Vos coordonnées" : step === "done" ? "Commande" : "Mon panier"}</h2>
                {step === "cart" && order.count > 0 && <p className="mt-1 text-sm text-ink/55">{order.count} article{order.count > 1 ? "s" : ""}</p>}
              </div>
              <button ref={closeRef} onClick={close} className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 transition hover:bg-mist" aria-label="Fermer le panier"><CloseIcon /></button>
            </div>

            {/* ===== ÉTAPE 1 : RÉCAP ===== */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {order.items.length === 0 ? (
                    <div className="grid h-full place-content-center justify-items-center gap-4 text-center">
                      <span className="grid h-20 w-20 place-items-center rounded-full bg-gold-soft text-gold-deep"><BagIcon size={34} /></span>
                      <p className="display text-3xl">Votre panier est vide</p>
                      <p className="max-w-[260px] text-[15px] text-ink/60">Ajoutez des produits depuis le catalogue pour préparer votre commande.</p>
                      <a href="/#catalogue" onClick={() => setOpen(false)} className="btn btn-gold mt-2">Parcourir le catalogue</a>
                    </div>
                  ) : (
                    <ul className="divide-y divide-ink/10">
                      {order.items.map((i) => {
                        const p = SEED.find((x) => x.id === i.id);
                        return (
                          <li key={i.id} className="flex gap-4 py-5">
                            <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1.5 shadow-card">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p?.image} alt="" className="max-h-full max-w-full object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <a href={`/produit?id=${encodeURIComponent(i.id)}`} className="font-serif text-xl font-semibold leading-tight hover:text-gold-deep">{i.name}</a>
                                <button onClick={() => remove(i.id)} className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/40 transition hover:bg-red-50 hover:text-red-600" aria-label={`Retirer ${i.name}`}><TrashIcon /></button>
                              </div>
                              <p className="text-[13px] text-ink/55">{i.unitPrice != null ? `${eur(i.unitPrice)} HT${i.unit ? ` / ${i.unit}` : ""}` : "Sur devis"}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <QtyStepper compact value={i.qty} onChange={(n) => setQty(i.id, n)} label={`Quantité ${i.name}`} />
                                <span className="text-[17px] font-semibold">{i.lineTotal != null ? eur(i.lineTotal) : "—"}</span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {order.items.length > 0 && (
                  <div className="border-t border-ink/10 bg-white px-6 pb-6 pt-5">
                    <dl className="grid gap-1.5 text-[15px]">
                      <div className="flex justify-between"><dt className="text-ink/65">Total HT</dt><dd className="font-semibold">{eur(order.totalHT)}</dd></div>
                      <div className="flex justify-between"><dt className="text-ink/65">TVA 20 %</dt><dd>{eur(order.tva)}</dd></div>
                      <div className="mt-1 flex items-baseline justify-between border-t border-ink/10 pt-3"><dt className="font-semibold">Total TTC estimé</dt><dd className="font-serif text-3xl font-bold text-navy">{eur(order.totalTTC)}</dd></div>
                    </dl>
                    <p className="mt-3 text-[13px] leading-relaxed text-ink/55">
                      {order.hasQuote && "Les articles sur devis ne sont pas inclus dans le total. "}Montant indicatif : disponibilité et livraison sont confirmées avec vous avant expédition.
                    </p>
                    <button onClick={() => { setError(""); setStep("form"); }} className="btn btn-gold mt-4 w-full py-3.5 text-base">Valider ma commande <ArrowIcon /></button>
                    <button onClick={clear} className="mt-2 w-full py-2 text-sm font-medium text-ink/50 transition hover:text-red-600">Vider le panier</button>
                  </div>
                )}
              </>
            )}

            {/* ===== ÉTAPE 2 : COORDONNÉES ===== */}
            {step === "form" && (
              <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <button type="button" onClick={() => setStep("cart")} className="mb-4 text-sm font-semibold text-gold-deep hover:underline">← Modifier mon panier</button>

                  <div className="mb-5 rounded-2xl border border-gold/40 bg-gold-soft px-4 py-3 text-sm">
                    <b>{order.count} article{order.count > 1 ? "s" : ""}</b> · {eur(order.totalHT)} HT{order.hasQuote ? " + devis" : ""}
                  </div>

                  <div className="grid gap-3.5">
                    <label className="grid gap-1.5 text-sm font-medium">Nom et prénom *
                      <input className="field" required autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} /></label>
                    <label className="grid gap-1.5 text-sm font-medium">Société *
                      <input className="field" required autoComplete="organization" value={form.company} onChange={(e) => set("company", e.target.value)} /></label>
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <label className="grid gap-1.5 text-sm font-medium">E-mail *
                        <input className="field" type="email" required autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></label>
                      <label className="grid gap-1.5 text-sm font-medium">Téléphone *
                        <input className="field" type="tel" required autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></label>
                    </div>
                    <label className="grid gap-1.5 text-sm font-medium">Adresse de livraison *
                      <textarea className="field" rows={2} required autoComplete="street-address" placeholder="N°, rue, code postal, ville" value={form.address} onChange={(e) => set("address", e.target.value)} /></label>
                    <label className="grid gap-1.5 text-sm font-medium">Message <span className="font-normal text-ink/45">(horaires de livraison, accès…)</span>
                      <textarea className="field" rows={2} value={form.message} onChange={(e) => set("message", e.target.value)} /></label>
                    {/* Anti-spam : champ invisible, les robots le remplissent */}
                    <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>
                  {error && <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                </div>

                <div className="border-t border-ink/10 bg-white px-6 pb-6 pt-4">
                  <button type="submit" disabled={sending} className="btn btn-gold w-full py-3.5 text-base disabled:opacity-60">{sending ? "Envoi en cours…" : "Envoyer ma commande"}</button>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => { if (form.name && form.email) { remember(); openMailClient(); } else setError("Renseignez au moins votre nom et votre e-mail."); }} className="btn btn-outline px-3 py-2.5 text-sm">✉️ Par e-mail</button>
                    <a href={waOrder()} target="_blank" rel="noopener noreferrer" className="btn px-3 py-2.5 text-sm text-white bg-[#25D366] hover:bg-[#1ebe5a] hover:-translate-y-0.5"><WhatsAppIcon size={18} /> WhatsApp</a>
                  </div>
                  <p className="mt-3 text-center text-xs text-ink/50">Aucun paiement en ligne : nous confirmons votre commande avec vous.</p>
                </div>
              </form>
            )}

            {/* ===== ÉTAPE 3 : CONFIRMATION ===== */}
            {step === "done" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-gold text-navy-900 shadow-lift"><CheckIcon size={36} /></span>
                {result?.mode === "sent" ? (
                  <>
                    <p className="display text-4xl">Commande envoyée</p>
                    {result.ref && <p className="rounded-full border border-gold/50 bg-gold-soft px-4 py-1.5 text-sm font-semibold">Référence {result.ref}</p>}
                    <p className="text-[15px] leading-relaxed text-ink/70">Un e-mail récapitulatif vous a été adressé. Nous revenons vers vous rapidement pour confirmer la disponibilité et la livraison.</p>
                  </>
                ) : (
                  <>
                    <p className="display text-4xl">Dernière étape</p>
                    <p className="text-[15px] leading-relaxed text-ink/70">Votre messagerie s'est ouverte avec la commande pré-remplie : <b>appuyez sur « Envoyer »</b> pour la transmettre. Votre panier est conservé.</p>
                    <button onClick={openMailClient} className="btn btn-outline">Rouvrir l'e-mail</button>
                  </>
                )}
                <p className="text-sm text-ink/55">Une urgence ? <a className="font-semibold text-gold-deep underline" href={`tel:${PHONE_LINK}`}>{PHONE}</a></p>
                <button onClick={() => { close(); }} className="btn btn-gold mt-2">Fermer</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
