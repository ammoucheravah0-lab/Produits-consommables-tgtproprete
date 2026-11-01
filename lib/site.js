// lib/site.js — constantes uniques du site (contacts, référentiels, photo d'accueil)

export const EMAIL = "Contact@tgtproprete.fr";
export const PHONE = "+33 7 52 08 11 44";
export const PHONE_LINK = "+33752081144";

/* ---------------------------------------------------------------------
   📱 WHATSAPP — C'EST ICI QUE SE TROUVE LE NUMÉRO
   Format international, chiffres uniquement : pas de "+", d'espace ni de "0" initial.
   +44 7597238174  →  "447597238174"
   Pour changer de numéro, modifiez UNIQUEMENT cette ligne.
   --------------------------------------------------------------------- */
export const WHATSAPP_NUMBER = "447597238174";
export const WHATSAPP_DISPLAY = "+44 7597 238174";

/* Photo d'arrière-plan de l'accueil : déposez votre image dans
   public/images/hero/accueil.jpg (1920×1080 mini, JPG optimisé < 400 Ko).
   Tant qu'elle n'existe pas, le dégradé bleu nuit s'affiche à la place. */
export const HERO_IMAGE = "/images/hero/accueil.jpg";

export const TVA_RATE = 0.2;

export const CATEGORIES = [
  { id: "sols", label: "Sols" },
  { id: "degraissants", label: "Dégraissants" },
  { id: "vitres", label: "Vitres" },
  { id: "surfaces", label: "Surfaces & Inox" },
  { id: "sanitaires", label: "Sanitaires" },
  { id: "desodorisants", label: "Désodorisants" },
  { id: "consommables", label: "Consommables" },
];

export const TARGETS = [
  { id: "restaurateurs", label: "Restaurateurs", icon: "🍽️" },
  { id: "commerces", label: "Commerces", icon: "🛍️" },
  { id: "bureaux", label: "Bureaux", icon: "🏢" },
  { id: "chantiers", label: "Chantiers", icon: "🏗️" },
];
