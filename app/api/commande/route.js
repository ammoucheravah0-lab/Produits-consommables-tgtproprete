// app/api/commande/route.js — reçoit la commande du panier et l'envoie par e-mail (via Resend).
// Sans RESEND_API_KEY, répond { fallback: true } : le site ouvre alors le client mail pré-rempli.
// Les prix et noms sont recalculés ICI à partir de data/products.js : on ne fait jamais confiance au navigateur.
import { buildOrder, orderText, eur } from "../../../lib/order";
import { EMAIL } from "../../../lib/site";

const hits = new Map(); // anti-abus mémoire : 6 commandes / 10 min / IP
const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clip = (v, n) => String(v ?? "").trim().slice(0, n);

async function sendMail({ from, to, subject, text, html, replyTo }) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify({ from, to: [to], subject, text, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!r.ok) throw new Error(`resend ${r.status}`);
}

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (recent.length >= 6) return Response.json({ error: "Trop de commandes envoyées. Appelez-nous pour finaliser." }, { status: 429 });

  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Requête invalide." }, { status: 400 }); }

  if (body?.website) return Response.json({ ok: true, ref: "CMD-OK" }); // honeypot : on fait semblant

  const c = body?.customer || {};
  const customer = {
    name: clip(c.name, 120), company: clip(c.company, 120), email: clip(c.email, 160),
    phone: clip(c.phone, 40), address: clip(c.address, 300), message: clip(c.message, 800),
  };
  if (!customer.name || !customer.company || !customer.address || customer.phone.length < 6 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customer.email))
    return Response.json({ error: "Merci de renseigner tous les champs obligatoires (e-mail valide inclus)." }, { status: 400 });

  const order = buildOrder(Array.isArray(body?.items) ? body.items.slice(0, 60) : []);
  if (!order.items.length) return Response.json({ error: "Votre panier est vide ou ses produits ne sont plus disponibles." }, { status: 400 });

  if (!process.env.RESEND_API_KEY) return Response.json({ fallback: true }, { status: 503 });

  hits.set(ip, [...recent, now]);
  const d = new Date();
  const ref = `CMD-${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const from = process.env.ORDER_FROM_EMAIL || "TGT Propreté <commandes@tgtproprete.fr>";
  const to = process.env.ORDER_TO_EMAIL || EMAIL;

  const rows = order.items.map((i) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${esc(i.fullName)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${i.qty}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${i.lineTotal != null ? eur(i.lineTotal) + " HT" : "Sur devis"}</td></tr>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#1a1a2e;max-width:640px">
    <h2 style="color:#0f1f3d">Commande ${ref}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px"><tr style="background:#f3f0e7"><th style="padding:8px 12px;text-align:left">Produit</th><th>Qté</th><th style="text-align:right;padding:8px 12px">Total</th></tr>${rows}</table>
    <p style="font-size:15px"><b>Total HT :</b> ${eur(order.totalHT)}${order.hasQuote ? " (hors articles sur devis)" : ""}<br><b>TVA 20 % :</b> ${eur(order.tva)}<br><b>Total TTC :</b> ${eur(order.totalTTC)}</p>
    <h3>Client</h3><p style="font-size:14px;line-height:1.6">${esc(customer.name)} — ${esc(customer.company)}<br>${esc(customer.email)} · ${esc(customer.phone)}<br>${esc(customer.address).replace(/\n/g, "<br>")}</p>
    ${customer.message ? `<p style="font-size:14px"><b>Message :</b> ${esc(customer.message).replace(/\n/g, "<br>")}</p>` : ""}</div>`;

  try {
    await sendMail({ from, to, subject: `Nouvelle commande ${ref} — ${customer.company}`, text: orderText(order, customer, { ref }), html, replyTo: customer.email });
  } catch {
    return Response.json({ fallback: true }, { status: 502 });
  }
  // Accusé de réception au client (non bloquant si l'envoi échoue)
  sendMail({
    from, to: customer.email, subject: `Votre commande TGT Propreté ${ref}`,
    text: `Bonjour ${customer.name},\n\nNous avons bien reçu votre commande ${ref}. Nous revenons vers vous rapidement pour confirmer disponibilité et livraison.\n\n${orderText(order, customer, { ref })}`,
    html: `<p style="font-family:Arial,sans-serif">Bonjour ${esc(customer.name)},<br><br>Nous avons bien reçu votre commande <b>${ref}</b>. Nous revenons vers vous rapidement pour confirmer disponibilité et livraison.</p>${html}`,
    replyTo: to,
  }).catch(() => {});

  return Response.json({ ok: true, ref });
}
