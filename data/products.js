// data/products.js — SOURCE UNIQUE des produits TGT Propreté
// Utilisé par la page d'accueil (liste) ET par la page produit (template /produit?id=...)
//
// CHAMPS D'UN PRODUIT
//  id          : identifiant court, sans espace ni accent (sert dans l'URL : /produit?id=degraissant-haccp)
//  name        : nom affiché
//  category    : sols | degraissants | vitres | sanitaires | desodorisants | consommables
//  targets     : restaurateurs | commerces | bureaux | chantiers
//  icon        : emoji de secours (affiché si l'image est absente ou introuvable)
//  image       : CHEMIN DE L'IMAGE → ex. "/images/produits/degraissant-haccp.jpg"
//                (fichier à placer dans public/images/produits/). Laissez "" s'il n'y en a pas.
//  format      : formats disponibles
//  description : texte court (carte + haut de la fiche)
//  price       : prix affiché (ex. "15,90 €", "Sur devis", etc.)
//  featured    : badge « Produit Efficace »
//  available   : false = rupture de stock
//  --- Détails (page produit). Toute section vide est automatiquement masquée ---
//  features    : liste des caractéristiques
//  usage       : liste des étapes d'utilisation
//  precautions : liste des précautions
//  technical   : fiche technique { "Libellé": "Valeur" }
//  pdf         : chemin d'une fiche PDF (ex. "/fiches/degraissant-haccp.pdf") ou ""

const P = (id, name, category, targets, icon, format, description, extra = {}) => ({
  id, name, category, targets, icon, image: `/images/produits/${id}.png`, format, description,
  price: "",
  featured: false, available: true,
  features: [], usage: [], precautions: [], technical: {}, pdf: "",
  ...extra,
});

export const SEED = [
  P("speed-flash-tgt", "Speed Flash • Dégraissant HACCP Cuisine Pro", "degraissants", ["restaurateurs"], "🍳", "Bidon 5 L · Carton 5 L x 4",
    "Notre formule phare : attaque les graisses cuites sur plans de travail, hottes et plonge. Pensé pour les protocoles HACCP.",
    {
      price: "20,90 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Attaque les graisses cuites sur plans de travail, hottes et plonge",
        "Pensé pour les protocoles HACCP",
        "Formule concentrée, à diluer selon l'usage",
      ],
      usage: [
        "Diluer selon le dosage (voir étiquette • Fiche technique)",
        "Vaporiser sur la surface à nettoyer",
        "Laisser agir quelques secondes",
        "Essuyer a l’aide d’un chiffon propre ou d’une éponge humide",
      ],
      precautions: [
        "Port de gants recommandé",
        "Ne pas mélanger avec d'autres produits",
        "Tenir hors de portée des enfants",
        "Stocker le produit dans son emballage d’origine à l’abri de la lumière et à une température comprise entre 5° et 30°C.",
      ],

      technical: { "Aspect": " liquide jaune", "pH à l'état pur": "12.5", "Parfum": "Citron", "Conditionnement": "Bidon 5 L ou 750 ML" },
      pdf: "./images/ft-produits/FT-Speed-Flash-tgtproprete.pdf",
    }),
  P("sol-imperiale-tgt", "SOL+ Zéro danger • détergent désodorisant pour toutes surfaces lavables", "sols", ["chantiers", "restaurateurs", "commerces", "bureaux"], "🔥", "Bidon 5 L · Carton 5 L x 4",
    "Diluer selon le degré de salissures de 1 à 5 %, toutes surfaces lavables (surfaces modernes ou stratifiées, surfaces peintes, sols, sanitaires…).",
    {
      price: "11,99 € HT / bidon de 5 L",
      featured: true,
      features: ["Aspect : liquide translucide coloré selon les senteurs", "Odeur : selon les parfums disponibles", "pH à l'état pur : 7.5 +/-0.5", "Densité à 20 °C : 1,001 g/cm³ +/- 0.005", "Composition : tensio-actifs non-ioniques, séquestrant, solvant, parfum, colorant"],
      usage: ["Diluer selon le niveau de salissure 1 à 5 %.", "Diluer à 10 % pour le nettoyage des surfaces modernes", "SI SOL+ ne nécessite pas de rinçage."],
      precautions: ["Ne pas avaler. ", "Ne pas mélanger à d’autres produits.", "Tenir hors de portée des enfants.", "Stocker le produit dans son emballage d’origine à l’abri de la lumière et à une température comprise entre 5° et 30°C.", "En cas de projection oculaire, rincer abondamment à l’eau."],
      technical: { "Conditionnement": "Bidon 5 L · Carton 5 L x 4" },
    }),

  P("si-four-tgtproprete", "FOUR 2+ • Décapant Fours, Grills, hottes etc..", "degraissants", ["restaurateurs"], "🔥", "Bidon 5 L · Carton 5 L x 4",
    "Puissant dégraissant pour les gaines, les hottes, les grilles et les systèmes d'extraction en cuisine industrielle. Permet le dégraissage des fours très encrassés en pénétrant, dissolvant et émulsionnant les graisses végétales et animales ainsi que les souillures tenaces.",
    {
      price: "à venir",
      featured: true,
      features: [
        "Pénètre, dissout et émulsionne les graisses cuites, fraîches ou sèches",
        "Idéal pour gaines, hottes, grilles et fours très encrassés",
        "Conforme à l'arrêté du 08/09/99 (contact denrées alimentaires)",
      ],
      usage: [
        "En pulvérisation : produit prêt à l'emploi sur surfaces froides ou tièdes (max. 60°C)",
        "Laisser agir 10 à 20 minutes selon le taux d'encrassement",
        "En système canon à mousse : diluer de 5 à 10%",
        "Rincer soigneusement à l'eau tiède et potable",
      ],
      precautions: [
        "Produit corrosif : port de gants et de tenues de protection obligatoire",
        "Éviter toutes projections sur l'aluminium, le cuivre, les surfaces peintes et les mini-fours/micro-ondes",
        "Ne pas mélanger avec d'autres produits",
        "Tenir hors de portée des enfants et stocker entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide marron", "pH à l'état pur": "> 13", "Odeur": "Alcaline", "Conditionnement": "4 Bidons de 5 L" },
      pdf: "./images/ft-produits/FT-SI-FOUR-tgtproprete.pdf",

      available: false
    }),

  P("si-clean-tgt", "CLEAN • Puissant Dégraissant Polyvalent Industriel", ["sols", "degraissants"], ["chantiers", "commerces"], "🧽", "Bidon 5 L · Carton 5 L x 4",
    "Nettoyant et dégraissant surpuissant multi-surfaces pour la rénovation des sols et surfaces fortement encrassés (sols non protégés, murs, portes, carrelages, grès, ciment peint). Peu moussant, idéal pour les zones à fort passage.",
    {
      price: "18,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Permet la rénovation des sols et surfaces fortement encrassés",
        "Formule peu moussante, spécifiquement étudiée pour les autolaveuses et monobrosses en grandes surfaces",
        "Conforme à l'arrêté du 08/09/99 (contact denrées alimentaires)",
      ],
      usage: [
        "Application manuelle : diluer de 3 à 7% selon le degré de salissures (balai Faubert, brosse ou serpillère)",
        "Application mécanique : diluer de 1 à 3% en lavage avec une autolaveuse ou monobrosse",
      ],
      precautions: [
        "Produit corrosif : port de gants et de vêtements de protection obligatoire",
        "En cas de projection, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Tenir hors de portée des enfants et stocker entre 5° et 30°C dans l'emballage d'origine",
      ],

      technical: { "Aspect": "Liquide jaune", "pH à l'état pur": "> 13", "Odeur": "Caractéristique des bases", "Conditionnement": "4 Bidons de 5 L" },
      pdf: "./images/ft-produits/FT-SI-CLEAN-tgtproprete.pdf",
    }),

  P("sanigel-tgt", "SANIGEL • Puissant Détartrant en Gel 3 en 1", "sanitaires", ["commerces", "bureaux"], "🚽", "Bidon 5 L · Carton 5 L x 4",
    "Puissant détartrant rénovant concentré en gel pour les sanitaires, salles de bain, douches, WC et surfaces lavables (céramique, porcelaine, robinetterie, chrome, inox, carrelage). Élimine efficacement le calcaire, les traces de savon et de rouille tout en respectant les supports métalliques et en laissant une agréable odeur de pin frais.",
    {
      price: "25,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Élimine le calcaire, les traces de savon et de rouille en redonnant de la brillance",
        "Formule en gel idéale pour adhérer aux parois verticales et cuvettes de WC",
        "N'attaque pas les supports métalliques présents dans les sanitaires",
      ],
      usage: [
        "Remise en état : appliquer directement sur la surface à traiter (même verticale), laisser agir 5 minutes puis rincer soigneusement à l'eau",
        "Entretien quotidien : appliquer avec une lavette, une éponge ou un balai faubert humide, puis rincer",
        "Cuvettes de WC et urinoirs : laisser agir et frotter à l'aide d'une brosse",
      ],
      precautions: [
        "Port de gants recommandé ; en cas de projection, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Tenir hors de portée des enfants",
        "Stocker dans l'emballage d'origine à l'abri de la lumière entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide visqueux rose", "pH à l'état pur": "1 +/- 0.5", "Parfum": "Pin frais", "Conditionnement": "12 Flacons de 1 L" },
      pdf: "./images/ft-produits/FT-SANIGEL-tgtproprete.pdf",
    }),

  P("si-calc-tgt", "CALC • Détartrant Rénovant Sanitaires", "sanitaires", ["commerces", "bureaux"], "🚿", "Bidon 5 L · Carton 5 L x 4",
    "Puissant détartrant rénovant concentré pour les sanitaires, salles de bain, douches, WC et surfaces lavables (céramique, porcelaine, robinetterie, chrome, carrelage). Élimine efficacement le voile calcaire, les traces de savon et de rouille tout en redonnant de la brillance, sans attaquer les supports métalliques, et laisse une agréable odeur florale.",
    {
      price: "17,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Enlève le voile calcaire, les traces de savon et de rouille en redonnant de la brillance",
        "Respecte les supports métalliques présents dans les sanitaires",
        "Formule concentrée polyvalente pour la remise en état et l'entretien quotidien",
      ],
      usage: [
        "Remise en état : appliquer pur avec une éponge ou lavette, laisser agir 5 minutes, frotter légèrement et rincer soigneusement à l'eau",
        "Entretien quotidien : diluer à raison de 1 à 5% dans l'eau",
        "Lavage des carrelages : diluer de 2 à 5% dans l'eau puis rincer",
      ],
      precautions: [
        "Port de gants recommandé ; en cas de projection, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Tenir hors de portée des enfants",
        "Stocker dans l'emballage d'origine à l'abri de la lumière entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide rose", "pH à l'état pur": "1 +/- 0.5", "Parfum": "Floral", "Conditionnement": "12 Flacons de 1 L ou 4 Bidons de 5 L" },
      pdf: "./images/ft-produits/FT-SI-CALC-tgtproprete.pdf",
    }),

  P("si-deo-tgt", "DEO • Désodorisant d'Ambiance Longue Durée", "desodorisants", ["bureaux", "commerces", "restaurateurs"], "🌿", "15 Sprays de 250 ml",
    "Désodorisant d'atmosphère exempt de CMR qui permet de désodoriser efficacement les locaux durant plusieurs heures (bureaux, halls d'entrée, couloirs, salles de réunion, vestiaires, véhicules, salles d'attente, chambres). Disponible en plusieurs parfums (Dakkar, Lounge sans allergène, Citron, Coquelicot, Fleurs de coton, agrumes, Vent frais, Fraîcheur impériale).",
    {
      price: "6,99 € HT / Spray de 250 ml",
      featured: true,
      features: [
        "Désodorise durablement l'atmosphère durant plusieurs heures",
        "Formule exempte de CMR adaptée à tous types de locaux professionnels",
        "Large choix de parfums raffinés et frais disponibles",
      ],
      usage: [
        "Produit prêt à l'emploi",
        "Pulvériser directement dans l'atmosphère",
        "La quantité de produit pulvérisé s'adapte selon le volume de la pièce à traiter",
      ],
      precautions: [
        "Liquide inflammable : respecter les consignes de sécurité",
        "Port de gants recommandé ; en cas de projection, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Tenir hors de portée des enfants et stocker à l'abri de la lumière entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide", "pH à l'état pur": "7.5 +/- 0.5", "Point éclair": "4,5 °C", "Conditionnement": "12 Sprays de 250 ml" },
      pdf: "./images/ft-produits/FT-SI-DEO-tgtproprete.pdf",
    }),

  P("si-menage-tgt", "MENAGE • Détachant Nettoyant Multi-Usages", "surfaces", ["bureaux", "commerces", "restaurateurs"], "🧽", "Bidon 5 L · Carton 5 L x 4",
    "Solution hydro-alcoolique au pouvoir mouillant élevé recommandée pour l'entretien des surfaces modernes et stratifiées, mobilier de bureau, matériel informatique, téléphones, poignées de portes, peintures lavables et surfaces émaillées. Antistatique, il enlève les tâches d'encre, nettoie, dégraisse, désodorise, sèche rapidement sans laisser de trace ni auréole.",
    {
      price: "13,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Propriété antistatique : enlève les tâches d'encre, nettoie, dégraisse et désodorise",
        "Sèche rapidement sans laisser de trace ni d'auréole",
        "Conforme à l'arrêté du 08/09/99 relatif au contact des denrées alimentaires",
      ],
      usage: [
        "Produit prêt à l'emploi",
        "Appliquer directement sur la surface à l'aide d'un chiffon propre, d'une lingette ou d'une éponge sèche ou humide",
        "Essuyer avec un chiffon propre et sec",
      ],
      precautions: [
        "Liquide inflammable : port de gants recommandé et respect des consignes de sécurité",
        "En cas de projection, rincer abondamment à l'eau",
        "Ne pas mélanger à d'autres produits",
        "Conserver hors de la portée des enfants et stocker entre 5° et 30°C dans l'emballage d'origine",
      ],

      technical: { "Aspect": "Liquide incolore", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Menthe", "Conditionnement": "Bidon 5 L · Carton 5 L x 4" },
      pdf: "./images/ft-produits/FT-SI-MENAGE-tgtproprete.pdf",
    }),
  P("si-inox-tgt", "SINOX • Nettoyant Lustrant Inox", "surfaces", ["restaurateurs", "commerces"], "✨", "12 Aérosols de 500 ml",
    "Fluide nettoyant, lubrifiant et lustrant de surface pour l'entretien et la protection des métaux, alliages légers et inoxydables. Élimine rapidement les traces de doigts, salissures et auréoles tout en laissant un film protecteur hydrophobe qui retarde l'accrochage des salissures et protège contre l'oxydation, la corrosion et la rouille.",
    {
      price: "9,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Laisse un effet protecteur invisible hydrophobe qui retarde l'accrochage des salissures",
        "Protège contre l'oxydation, la corrosion et l'apparition de la rouille",
        "Constituants actifs conformes aux normes FDA pour contacts alimentaires occasionnels",
      ],
      usage: [
        "Aérosol utilisable en toutes positions : agiter avant chaque utilisation",
        "Vaporiser une fine couche à 15-20 cm de la surface à traiter",
        "Nettoyer avec un chiffon doux non pelucheux dans le sens du polissage",
        "Terminer en lustrant avec un chiffon sec et non pelucheux",
      ],
      precautions: [
        "Récipient sous pression : respecter les consignes de sécurité",
        "Port de gants recommandé ; en cas de projection, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Tenir hors de portée des enfants et stocker entre 5° et 30°C à l'abri de la lumière",
      ],

      technical: { "Aspect": "Liquide fluide en aérosol", "Odeur": "Faible de cire", "Point éclair": "70 °C", "Conditionnement": "12 Aérosols de 500 ml" },
      pdf: "./images/ft-produits/FT-SINOX-tgtproprete.pdf",
    }),
  P("si-odor-pin-tgt", "ODOR+ PIN • Détergent Assainissant Surodorant", "desodorisants", ["bureaux", "commerces", "restaurants"], "🌲", "Bidon 5 L · Carton 5 L x 4",
    "Détergent à haute concentration et à fort pouvoir rémanent qui détruit intégralement toutes les souillures et absorbe les mauvaises odeurs. Idéal pour le nettoyage de tous types de surfaces : locaux à poubelles, gaines, sanitaires, halls d'immeubles, ascenseurs et vestiaires.",
    {
      price: "18,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Détergent assainissant et surodorant à fort pouvoir rémanent",
        "Détruit intégralement les souillures et absorbe durablement les mauvaises odeurs",
        "Convient pour les locaux à poubelles, gaines, sanitaires, halls d'immeubles et ascenseurs",
      ],
      usage: [
        "Application manuelle : diluer de 2 à 5%, appliquer avec une éponge, lavette, balai brosse ou faubert, laisser agir 5 minutes puis rincer à l'eau claire",
        "Application mécanique : diluer de 1 à 3% pour une application haute pression en sortie de buse, laisser agir 5 minutes puis rincer soigneusement",
      ],
      precautions: [
        "Ne pas avaler ; en cas de projection oculaire, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Conserver hors de la portée des enfants",
        "Stocker dans l'emballage d'origine à l'abri de la lumière entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide vert", "pH à l'état pur": "7 +/- 0.5", "Parfum": "Pin et eucalyptus", "Conditionnement": "Bidon 5 L · Carton 5 L x 4" },
      pdf: "./images/ft-produits/FT-SI-ODOR-PIN-tgtproprete.pdf",
    }),
  P("si-vitres-zero-picto-tgt", "VITRES ZERO • Polish Nettoyant Vitres et Surfaces", "vitres", ["bureaux", "commerces"], "🪟", "12 Pulvérisateurs de 750 ml · 4 Bidons de 5 L",
    "Nettoyant polish prêt à l'emploi pour vitres, miroirs, pare-brises, écrans et surfaces plastiques, modernes, stratifiées ou peintes. Doté d'un haut pouvoir nettoyant, il sèche rapidement sans laisser de trace tout en laissant une agréable odeur de fraîcheur.",
    {
      price: "13,20 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Nettoyant sans trace pour vitres, miroirs, pare-brises et écrans",
        "Sèche rapidement sans laisser de trace ni auréole",
        "Conforme à l'arrêté du 08/09/99 relatif au contact des denrées alimentaires",
      ],
      usage: [
        "Produit prêt à l'emploi",
        "Vaporiser directement le produit pur à l'aide d'un pulvérisateur",
        "Passer la raclette ou essuyer avec un chiffon propre et sec",
      ],
      precautions: [
        "Port de gants recommandé ; en cas de projection, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Tenir hors de portée des enfants",
        "Stocker dans l'emballage d'origine à l'abri de la lumière entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide bleu", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Frais", "Conditionnement": "12 Pulvérisateurs de 750 ml, 12 Flacons de 1 L ou 4 Bidons de 5 L" },
      pdf: "./images/ft-produits/FT-VITRES-ZERO-PICTO-tgtproprete.pdf",
    }),
  P("si-plonge-tgt", "PLONGE • Dégraissant Concentré Vaisselle et Ustensiles", "degraissants", ["restaurateurs"], "🍽️", "12 Flacons de 1 L · 4 Bidons de 5 L",
    "Dégraissant concentré pour le lavage de la vaisselle, de la verrerie, des plans de travail et de tous les ustensiles au contact des denrées alimentaires, même en eau calcaire. S'utilise aussi sur les surfaces lavables et stratifiées pour éliminer les corps gras les plus tenaces, tout en facilitant le rinçage et le séchage sans traînées blanches.",
    {
      price: "11,50 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Élimine tous les corps gras, même les plus tenaces, sur la vaisselle et les plans de travail",
        "Facilite le rinçage et le séchage en évitant la formation de traînées blanches",
        "Conforme à l'arrêté du 08/09/99 relatif au contact des denrées alimentaires",
      ],
      usage: [
        "Diluer 10 à 20 ml de produit pour 5 L d'eau (de préférence tiède)",
        "Laver puis rincer soigneusement à l'eau potable",
        "Laisser égoutter et sécher",
      ],
      precautions: [
        "Ne pas avaler ; en cas de projection oculaire, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Conserver hors de la portée des enfants",
        "Stocker dans l'emballage d'origine à l'abri de la lumière entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide visqueux orangé", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Agrumes", "Conditionnement": "12 Flacons de 1 L ou 4 Bidons de 5 L" },
      pdf: "./images/ft-produits/FT-SI-PLONGE-tgtproprete.pdf",
    }),
  P("creme-mains-base-tgt", "CRÈME MAINS • Nettoyant Mains Nacré", "consommables", ["bureaux", "commerces", "restaurateurs"], "🧼", "Bidon de 5 L",
    "Crème liquide nettoyante formulée spécialement pour le lavage des mains et de la peau. Gel doux liquide, parfaitement toléré lors d'usages consécutifs et fréquents, prête à l'emploi et utilisable dans tous les distributeurs de savon.",
    {
      price: "10,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Formulé spécialement pour le lavage fréquent des mains et de la peau",
        "Gel doux liquide parfaitement toléré lors d'usages consécutifs",
        "Prêt à l'emploi, compatible avec tous les distributeurs de savon",
      ],
      usage: [
        "Verser à l'aide d'un distributeur la quantité de gel désirée",
        "Frotter soigneusement les mains",
        "Rincer à l'eau claire",
      ],
      precautions: [
        "Tenir hors de la portée des enfants",
        "En cas de projection oculaire, rincer abondamment à l'eau claire",
        "Ne pas mélanger à d'autres produits",
        "Stocker dans l'emballage d'origine à l'abri de la lumière et entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide nacré", "Conditionnement": "Bidon de 5 L" },
      pdf: "./images/ft-produits/FT-CREME-MAINS-tgtproprete.pdf",
    }),
  P("2d-fraicheur-imperiale-tgt", "ODOR 2D • Détergent Désodorisant pH Neutre", "sols", ["bureaux", "commerces"], "🌸", "Bidon 5 L · Carton 5 L x 4",
    "Détergent désodorisant pour toutes surfaces lavables (surfaces modernes, stratifiées, peintes, sols, sanitaires). Grâce à son pH neutre, il est parfaitement adapté pour le nettoyage des sols protégés par des émulsions. Offre une senteur longue rémanence disponible en de nombreux parfums (ou version sans parfum).",
    {
      price: "9,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "pH neutre parfaitement adapté pour le nettoyage des sols protégés par des émulsions",
        "Senteurs longue rémanence avec un large choix de parfums disponibles",
        "Conforme à l'arrêté du 08/09/99 pour le contact alimentaire (selon certains parfums)",
      ],
      usage: [
        "Application manuelle : diluer de 1 à 5% selon le degré de salissures (jusqu'à 10% pour les surfaces modernes)",
        "Application mécanique : diluer à 2% en autolaveuse",
        "Ne nécessite pas de rinçage",
      ],
      precautions: [
        "Ne pas avaler ; en cas de projection oculaire, rincer abondamment à l'eau",
        "Ne pas mélanger avec d'autres produits",
        "Conserver hors de la portée des enfants",
        "Stocker dans l'emballage d'origine à l'abri de la lumière entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide translucide coloré", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Multiples senteurs au choix", "Conditionnement": "12 Flacons de 1 L ou 4 Bidons de 5 L" },
      pdf: "./images/ft-produits/FT-SI-ODOR-2D-tgtproprete.pdf",
    }),
  P("détergent-triple-action-tgt", "ODOR 3D TRIPLE ACTION • Détergent Désodorisant Désinfectant pH Neutre", "sols", ["bureaux", "commerces", "restaurateurs", "chantiers"], "✨", "Bidon 5 L · Carton 5 L x 4",
    "Détergent désodorisant désinfectant parfumé pour toutes surfaces lavables (surfaces modernes ou stratifiées, surfaces peintes, sols, sanitaires). Grâce à son pH neutre, il est parfaitement adapté pour le nettoyage des sols protégés par des émulsions. Offre une senteur longue rémanence disponible en de nombreux parfums ou en version sans parfum.",
    {
      price: "11,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Action triple : détergent, désodorisant et désinfectant multi-usages",
        "pH neutre parfaitement adapté pour le nettoyage des sols protégés par des émulsions",
        "Conforme à la norme EN1040 pour la désinfection et à l'arrêté du 08/09/99 pour le contact alimentaire (selon les parfums)",
      ],
      usage: [
        "Application manuelle : diluer de 1 à 5% selon le degré de salissures",
        "Désinfection des surfaces : diluer à 2% (Norme EN1040)",
        "Application mécanique : diluer à 2% en autolaveuse (ne nécessite pas de rinçage)",
      ],
      precautions: [
        "Ne pas avaler ; en cas de projection oculaire, rincer abondamment à l'eau",
        "Ne pas mélanger à d'autres produits",
        "Conserver hors de la portée des enfants",
        "Stocker dans l'emballage d'origine à l'abri de la lumière et entre 5° et 30°C",
      ],

      technical: { "Aspect": "Liquide translucide coloré", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Multiples senteurs ou sans parfum", "Conditionnement": "4 Bidons de 5 L" },
      pdf: "./images/ft-produits/FT-SI-ODOR-3D-TRIPLE-ACTION-tgtproprete.pdf",
    }),
  P("maxi-jumbo380-tgt", "Papier Hygiénique Maxi Jumbo", "consommables", ["bureaux", "commerces", "restaurants"], "🧻", "Carton de 6 bobines",
    "Bobines grande capacité pour distributeurs collectifs, ouate douce et résistante.", { price: "22€ €  HT / bidon de 5 L" }),
  P("Papiershygnq-rouleau-tgt", "Papier Hygiénique rouleau", "consommables", ["bureaux", "commerces", "restaurants"], "🧻", "Pack de 28 rouleau",
    "Bobines grande capacité pour distributeurs collectifs, ouate douce et résistante.", { price: "10,99€  HT / bidon de 5 L" }),
  P("essuie-mains-rouleau", "Essuie-mains Rouleau", "consommables", ["bureaux", "commerces", "restaurateurs"], "🧻", "Carton de 6 rouleaux",
    "Rouleaux absorbants pour sanitaires et zones de passage intensif.", { price: "15,99 € HT / bidon de 5 L", available: false }),
  P("essuie-mains-plies-z", "Essuie-mains Pliés (Z)", "consommables", ["bureaux", "commerces", "restaurants"], "🧻", "Carton de 20 paquets",
    "Feuilles pliées, absorbantes et économiques pour distributeurs muraux.", { price: "A venir", available: false }),
];
