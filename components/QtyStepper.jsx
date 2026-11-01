"use client";
// Sélecteur de quantité − / + (saisie directe possible)
export default function QtyStepper({ value, onChange, min = 1, label = "Quantité", compact = false }) {
  const h = compact ? "h-9" : "h-11";
  const btn = `${h} ${compact ? "w-9" : "w-11"} grid place-items-center text-lg font-semibold text-navy transition-colors hover:bg-gold-soft active:bg-gold/30 disabled:cursor-not-allowed disabled:opacity-30`;
  return (
    <div className={`inline-flex ${h} items-stretch overflow-hidden rounded-full border border-ink/20 bg-white`} role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Diminuer la quantité">−</button>
      <input
        value={value}
        onChange={(e) => { const n = parseInt(e.target.value.replace(/\D/g, ""), 10); onChange(Number.isNaN(n) ? min : Math.max(min, Math.min(999, n))); }}
        inputMode="numeric" aria-label={label}
        className={`${compact ? "w-9 text-sm" : "w-12 text-[15px]"} border-x border-ink/10 bg-transparent text-center font-semibold focus:outline-none`}
      />
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label="Augmenter la quantité">+</button>
    </div>
  );
}
