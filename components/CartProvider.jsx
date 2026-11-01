"use client";
// Panier global : stocké dans le navigateur (localStorage), partagé entre toutes les pages et onglets.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { buildOrder } from "../lib/order";

const KEY = "tgt-cart-v1";
const CartCtx = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
};

const sanitize = (raw) =>
  Array.isArray(raw)
    ? raw.filter((l) => l && typeof l.id === "string").map((l) => ({ id: l.id, qty: Math.max(1, Math.min(999, parseInt(l.qty, 10) || 1)) }))
    : [];

export default function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [ready, setReady] = useState(false); // évite d'écraser le panier avant la lecture
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [bumpKey, setBumpKey] = useState(0);
  const toastTimer = useRef(null);

  /* Lecture initiale + synchro entre onglets */
  useEffect(() => {
    const read = () => {
      try { setLines(sanitize(JSON.parse(localStorage.getItem(KEY) || "[]"))); } catch { setLines([]); }
    };
    read();
    setReady(true);
    const onStorage = (e) => { if (e.key === KEY) read(); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* Sauvegarde */
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* navigation privée : on continue en mémoire */ }
  }, [lines, ready]);

  const flash = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const add = useCallback((id, qty = 1, label = "") => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id);
      return found
        ? ls.map((l) => (l.id === id ? { ...l, qty: Math.min(999, l.qty + qty) } : l))
        : [...ls, { id, qty: Math.min(999, qty) }];
    });
    setBumpKey((k) => k + 1);
    flash(label ? `${label} ajouté au panier` : "Ajouté au panier");
  }, [flash]);

  const setQty = useCallback((id, qty) => {
    setLines((ls) => (qty < 1 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty: Math.min(999, qty) } : l))));
  }, []);
  const remove = useCallback((id) => setLines((ls) => ls.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const order = useMemo(() => buildOrder(lines), [lines]);

  const value = useMemo(
    () => ({ lines, order, count: order.count, ready, open, setOpen, add, setQty, remove, clear, toast, bumpKey, qtyOf: (id) => lines.find((l) => l.id === id)?.qty || 0 }),
    [lines, order, ready, open, add, setQty, remove, clear, toast, bumpKey]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
