"use client";
import { useEffect, useState } from "react";

// Placé AU-DESSUS du bouton WhatsApp (bottom-24) pour que les deux ne se chevauchent pas.
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Retour en haut"
      className="anim-fade fixed bottom-24 right-[30px] z-40 grid h-11 w-11 place-items-center rounded-full border border-gold/60 bg-white text-navy shadow-card transition hover:-translate-y-0.5 hover:bg-gold-soft">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
