// data/products.js — SOURCE UNIQUE des produits TGT Propreté
// Optimisé pour une conversion B2B maximale, un rendu visuel moderne et un SEO percutant.

const P = (id, name, category, targets, icon, format, description, extra = {}) => ({
  id,
  name,
  category,
  targets,
  icon,
  image: `/images/produits/${id}.png`,
  format,
  description,
  price: "",
  featured: false,
  available: true,
  badge: "", // Ex: "Best-seller", "Conforme HACCP", "Éco-responsable"
  features: [],
  usage: [],
  precautions: [],
  technical: {},
  pdf: "",
  ...extra,
});

export const SEED = [
  P("speed-flash-tgt", "Speed Flash • Dégraissant HACCP Cuisine Pro", "degraissants", ["restaurateurs"], "🍳", "Bidon 5 L · Carton 5 L x 4",
    "La formule absolue pour les cuisines professionnelles : élimine instantanément les graisses cuites et incrustées sur les plans de travail, hottes et bacs de plonge, en conformité totale avec les exigences HACCP.",
    {
      price: "20,90 € HT / bidon de 5 L",
      featured: true,
      badge: "Conforme HACCP",
      features: [
        "Attaque instantanément les graisses cuites sur plans de travail, hottes et plonge",
        "Formulation stricte répondant aux protocoles d'hygiène HACCP en restauration",
        "Formule ultra-concentrée garantissant un rendement exceptionnel à la dilution",
      ],
      usage: [
        "Diluer selon le niveau d'encrassement (se référer au protocole technique)",
        "Vaporiser directement sur la zone à traiter",
        "Laisser agir quelques secondes pour dissoudre les corps gras",
        "Essuyer à l'aide d'une lavette propre ou d'une éponge humide",
      ],
      precautions: [
        "Port de gants de protection recommandé",
        "Ne jamais mélanger avec d'autres produits chimiques",
        "Tenir hors de portée des enfants",
        "Stocker dans l'emballage d'origine à l'abri de la lumière (5°C à 30°C)",
      ],
      technical: { "Aspect": "Liquide jaune", "pH à l'état pur": "12.5", "Parfum": "Citron", "Conditionnement": "Bidon 5 L ou 750 ML" },
      pdf: "/images/ft-produits/FT-SPEED-FLASH-tgtproprete.pdf",
    }),

  P("sol-imperiale-tgt", "SOL+ Zéro danger • Détergent Désodorisant Toutes Surfaces", "sols", ["chantiers", "restaurateurs", "commerces", "bureaux"], "🔥", "Bidon 5 L · Carton 5 L x 4",
    "Détergent désodorisant polyvalent à pH neutre pour un entretien quotidien sans risque de toutes les surfaces lavables. Laisse une rémanence parfumée longue durée dans vos espaces professionnels.",
    {
      price: "11,99 € HT / bidon de 5 L",
      featured: true,
      badge: "Polyvalent",
      features: [
        "Nettoie et désodorise en un seul geste tous types de sols et surfaces lavables",
        "Formule douce sans danger pour les surfaces modernes, stratifiées ou peintes",
        "Laisse une agréable sensation de propreté durable dans les locaux",
      ],
      usage: [
        "Diluer de 1% à 5% selon le degré de salissure des sols",
        "Pour les surfaces modernes ou stratifiées, adapter la dilution jusqu'à 10%",
        "Ne nécessite pas de rincage sur les sols courants",
      ],
      precautions: [
        "Ne pas avaler",
        "Ne pas mélanger à d'autres produits",
        "Tenir hors de portée des enfants",
        "Stocker entre 5°C et 30°C",
        "En cas de contact oculaire, rincer abondamment à l'eau claire",
      ],
      technical: { "Aspect": "Liquide translucide coloré", "pH à l'état pur": "7.5 +/- 0.5", "Densité": "1,001 g/cm³", "Conditionnement": "Bidon 5 L · Carton 5 L x 4" },
      pdf: "/images/ft-produits/FT-SOL-ZERO-PICTO-tgtproprete.pdf",
    }),

  P("si-four-tgtproprete", "FOUR 2+ • Décapant Surpuissant Fours et Grills", "degraissants", ["restaurateurs"], "🔥", "Bidon 5 L · Carton 5 L x 4",
    "Solution dégraissante surpuissante conçue pour dissoudre les graisses cuites et caramélisées les plus tenaces sur les fours, hottes, grils et systèmes d'extraction de cuisine professionnelle.",
    {
      price: "Sur devis",
      featured: true,
      badge: "Action Intensive",
      available: false,
      features: [
        "Pénètre, dissout et émulsionne instantanément les graisses cuites ou carbonisées",
        "Spécialement adapté pour les fours professionnels, gaines, hottes et grils",
        "Conforme aux dispositions réglementaires pour le contact alimentaire",
      ],
      usage: [
        "Application par pulvérisation sur surfaces froides ou tièdes (maximum 60°C)",
        "Laisser agir entre 10 et 20 minutes selon l'épaisseur de la suie ou de la graisse",
        "Rincer minutieusement à l'eau tiède et potable",
      ],
      precautions: [
        "Produit hautement corrosif : port de gants et de lunettes de protection obligatoire",
        "Éviter tout contact avec l'aluminium, le cuivre et les surfaces peintes",
        "Ne pas mélanger avec d'autres produits",
      ],
      technical: { "Aspect": "Liquide marron", "pH à l'état pur": "> 13", "Odeur": "Alcaline", "Conditionnement": "4 Bidons de 5 L" },
      pdf: "/images/ft-produits/FT-SI-FOUR-tgtproprete.pdf",
    }),

  P("si-clean-tgt", "CLEAN • Dégraissant Polyvalent Industriel Basique", "sols", ["chantiers", "commerces"], "🧽", "Bidon 5 L · Carton 5 L x 4",
    "Nettoyant dégraissant alcalin de grande efficacité pour la rénovation des sols fortement encrassés et des zones industrielles à trafic intense. Idéal en autolaveuse.",
    {
      price: "18,99 € HT / bidon de 5 L",
      featured: false,
      badge: "Industriel",
      features: [
        "Permet la rénovation en profondeur des sols bruts, carrelages et ciments peints",
        "Formule peu moussante étudiée pour l'utilisation en autolaveuse et monobrosse",
        "Conforme aux exigences de nettoyage des industries agroalimentaires",
      ],
      usage: [
        "Usage manuel : diluer de 3% à 7% avec un balai Faubert ou une brosse",
        "Usage mécanique : diluer de 1% à 3% pour un passage en autolaveuse",
      ],
      precautions: [
        "Produit corrosif : équipement de protection individuel requis",
        "Rincer immédiatement en cas de projection cutanée ou oculaire",
      ],
      technical: { "Aspect": "Liquide jaune", "pH à l'état pur": "> 13", "Odeur": "Caractéristique", "Conditionnement": "Carton de 4 Bidons de 5 L" },
      pdf: "/images/ft-produits/FT-SI-CLEAN-tgtproprete.pdf",
    }),

  P("sanigel-tgt", "SANIGEL • Détartrant Gel Surpuissant 3 en 1", "sanitaires", ["commerces", "bureaux"], "🚽", "Bidon 5 L · Carton 5 L x 4",
    "Gel détartrant et rénovant ultra-adhérent pour sanitaires. Élimine efficacement le tartre incrusté, les traces de rouille et redonne tout son éclat à la céramique et à l'inox.",
    {
      price: "25,99 € HT / bidon de 5 L",
      featured: true,
      badge: "Action Gel",
      features: [
        "Texture visqueuse en gel adhérant durablement aux parois verticales et cuvettes de WC",
        "Éradique le tartre, les voiles de savon et la rouille tout en faisant briller",
        "Préserve les éléments chromés et la robinetterie professionnelle",
      ],
      usage: [
        "Remise en état : appliquer pur sur les parois, laisser agir 5 minutes puis frotter et rincer",
        "Entretien régulier : diluer à l'aide d'une lavette humide",
        "Cuvettes et urinoirs : appliquer sous les rebords, laisser agir et brosser",
      ],
      precautions: [
        "Porter des gants de protection",
        "Ne jamais mélanger avec de l'eau de Javel ou des produits chlorés",
      ],
      technical: { "Aspect": "Liquide visqueux rose", "pH à l'état pur": "1 +/- 0.5", "Parfum": "Pin frais", "Conditionnement": "12 Flacons de 1 L" },
      pdf: "/images/ft-produits/FT-SANIGEL-tgtproprete.pdf",
    }),

  P("si-calc-tgt", "CALC • Détartrant Rénovant Sanitaires Liquide", "sanitaires", ["commerces", "bureaux"], "🚿", "Bidon 5 L · Carton 5 L x 4",
    "Détartrant liquide concentré multi-surfaces pour l'entretien et la désincrustation des sanitaires, douches et carrelages de collectivités. Laisse un parfum floral discret.",
    {
      price: "17,99 € HT / bidon de 5 L",
      featured: false,
      features: [
        "Élimine rapidement le voile calcaire et les salissures minérales",
        "Redonne de l'éclat aux surfaces sanitaires sans altérer les métaux",
        "Polyvalent : utilisable en traitement de choc ou en entretien quotidien dilué",
      ],
      usage: [
        "Traitement de choc : appliquer pur, laisser agir 5 minutes et rincer abondamment",
        "Entretien courant : dilution de 1% à 5% dans l'eau de lavage",
      ],
      precautions: [
        "Port de gants recommandé",
        "Tenir hors de portée des enfants",
      ],
      technical: { "Aspect": "Liquide rose", "pH à l'état pur": "1 +/- 0.5", "Parfum": "Floral", "Conditionnement": "Bidons de 5 L ou Flacons de 1 L" },
      pdf: "/images/ft-produits/FT-SI-CALC-tgtproprete.pdf",
    }),

  P("si-deo-tgt", "DEO • Désodorisant d'Ambiance Longue Durée sans CMR", "desodorisants", ["bureaux", "commerces", "restaurateurs"], "🌿", "15 Sprays de 250 ml",
    "Parfum d'ambiance professionnel de haute qualité, exempt de substances CMR. Neutralise les odeurs indésirables et parfume durablement les halls, bureaux et espaces d'accueil.",
    {
      price: "6,99 € HT / Spray de 250 ml",
      featured: true,
      badge: "Sans CMR",
      features: [
        "Parfume l'atmosphère de manière durable pendant plusieurs heures",
        "Formule professionnelle garantie sans agents CMR pour la sécurité des usagers",
        "Large déclinaison de senteurs raffinées (Lounge, Citron, Vent frais, etc.)",
      ],
      usage: [
        "Produit prêt à l'emploi en flacon pulvérisateur",
        "Vaporiser vers le haut au centre de la pièce selon le volume à traiter",
      ],
      precautions: [
        "Liquide et vapeurs très inflammables : respecter les consignes de stockage",
        "Éviter la pulvérisation directe sur les surfaces délicates",
      ],
      technical: { "Aspect": "Liquide", "pH à l'état pur": "7.5 +/- 0.5", "Point éclair": "4,5 °C", "Conditionnement": "12 Sprays de 250 ml" },
      pdf: "/images/ft-produits/FT-SI-DEO-tgtproprete.pdf",
    }),

  P("si-menage-tgt", "MENAGE • Nettoyant Antistatique Multi-Usages", "surfaces", ["bureaux", "commerces", "restaurateurs"], "🧽", "Bidon 5 L · Carton 5 L x 4",
    "Solution hydro-alcoolique antistatique idéale pour l'entretien du mobilier de bureau, écrans informatiques, téléphones et surfaces stratifiées. Sèche instantanément sans laisser de trace.",
    {
      price: "13,99 € HT / bidon de 5 L",
      featured: false,
      features: [
        "Propriété antistatique réduisant le dépôt de poussière sur le mobilier",
        "Élimine les traces de doigts, taches d'encre et salissures légères",
        "Séchage ultra-rapide sans aucune trace ni auréole résiduelle",
      ],
      usage: [
        "Appliquer directement sur un chiffon propre ou une lavette microfibre",
        "Nettoyer la surface puis essuyer avec un chiffon sec",
      ],
      precautions: [
        "Contient des composants inflammables : stocker loin des flammes",
        "Tenir hors de portée des enfants",
      ],
      technical: { "Aspect": "Liquide incolore", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Menthe", "Conditionnement": "Bidon 5 L" },
      pdf: "/images/ft-produits/FT-SI-MENAGE-tgtproprete.pdf",
    }),

  P("si-inox-tgt", "SINOX • Nettoyant Lustrant Protecteur Inox", "surfaces", ["restaurateurs", "commerces"], "✨", "12 Aérosols de 500 ml",
    "Fluide spécial pour l'entretien et la mise en valeur des surfaces en acier inoxydable, chrome et métaux alliés. Laisse un film protecteur hydrophobe anti-traces.",
    {
      price: "9,99 € HT / aérosol",
      featured: false,
      badge: "Brillance Pro",
      features: [
        "Dépose un film protecteur invisible qui retarde l'adhérence des salissures",
        "Protège durablement l'inox contre l'oxydation, les traces d'eau et la corrosion",
        "Conforme aux critères de contact alimentaire occasionnel",
      ],
      usage: [
        "Agiter l'aérosol avant application",
        "Vaporiser uniformément à 15-20 cm de la surface",
        "Lustrer avec un chiffon doux non pelucheux dans le sens du brossage du métal",
      ],
      precautions: [
        "Récipient sous pression : protéger des rayons solaires",
        "Utiliser dans des zones correctement ventilées",
      ],
      technical: { "Aspect": "Liquide fluide en aérosol", "Point éclair": "70 °C", "Conditionnement": "12 Aérosols de 500 ml" },
      pdf: "/images/ft-produits/FT-SINOX-tgtproprete.pdf",
    }),

  P("si-odor-pin-tgt", "ODOR+ PIN • Détergent Surodorant Assainissant", "desodorisants", ["bureaux", "commerces", "restaurateurs"], "🌲", "Bidon 5 L · Carton 5 L x 4",
    "Détergent surodorant surconcentré à fort pouvoir rémanent. Conçu spécialement pour éliminer les sources de mauvaises odeurs dans les locaux à poubelles, sanitaires et halls.",
    {
      price: "18,99 € HT / bidon de 5 L",
      featured: false,
      features: [
        "Détruit en profondeur les souillures organiques et neutralise les effluves nauséabondes",
        "Parfum pin et eucalyptus longue rémanence très apprécié en collectivités",
        "Idéal pour les containers à déchets, gaines d'ordures et vestiaires",
      ],
      usage: [
        "Nettoyage manuel : diluer de 2% à 5%, laisser agir 5 minutes puis rincer à l'eau claire",
        "Application haute pression : diluer de 1% à 3%",
      ],
      precautions: [
        "Éviter le contact direct prolongé avec la peau",
        "Ne pas mélanger avec d'autres agents chimiques",
      ],
      technical: { "Aspect": "Liquide vert", "pH à l'état pur": "7 +/- 0.5", "Parfum": "Pin et eucalyptus", "Conditionnement": "Bidon 5 L" },
      pdf: "/images/ft-produits/FT-SI-ODOR-PIN-tgtproprete.pdf",
    }),

  P("si-vitres-zero-picto-tgt", "VITRES ZERO • Nettoyant Polish Vitres et Miroirs", "vitres", ["bureaux", "commerces"], "🪟", "12 Pulvérisateurs de 750 ml · 4 Bidons de 5 L",
    "Formule professionnelle haute performance pour le nettoyage des vitres, glaces, pare-brises et écrans. Sèche instantanément sans laisser aucune trace.",
    {
      price: "13,20 € HT / bidon de 5 L",
      featured: false,
      features: [
        "Élimine efficacement les voiles gras, traces de doigts et pollutions urbaines",
        "Séchage rapide garantissant un résultat totalement net et sans reflets",
        "Conforme à la réglementation relative au contact alimentaire",
      ],
      usage: [
        "Produit prêt à l'emploi",
        "Vaporiser sur la surface vitrée et nettoyer à l'aide d'une raclette ou d'un tissu microfibre sec",
      ],
      precautions: [
        "Conserver à l'abri du gel et des fortes chaleurs",
        "Tenir hors de portée des enfants",
      ],
      technical: { "Aspect": "Liquide bleu", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Frais", "Conditionnement": "Pulvérisateurs ou Bidons 5 L" },
      pdf: "/images/ft-produits/FT-VITRES-ZERO-PICTO-tgtproprete.pdf",
    }),

  P("si-plonge-tgt", "PLONGE • Dégraissant Manuel Vaisselle et Matériel", "degraissants", ["restaurateurs"], "🍽️", "12 Flacons de 1 L · 4 Bidons de 5 L",
    "Liquide vaisselle dégraissant concentré pour le lavage manuel de la verrerie et des ustensiles de cuisine. Efficace même en eau dure, il garantit un séchage étincelant.",
    {
      price: "11,50 € HT / bidon de 5 L",
      featured: true,
      badge: "Spécial Vaisselle",
      features: [
        "Élimine sans effort les souillures alimentaires séchées et les graisses cuites",
        "Facilite l'égouttage et procure un séchage sans traces blanches",
        "Formule douce pour les mains lors d'usages répétés en restauration",
      ],
      usage: [
        "Verser 10 à 20 ml de produit pour 5 litres d'eau tiède",
        "Laver la vaisselle puis rincer soigneusement à l'eau potable",
      ],
      precautions: [
        "Ne pas avaler",
        "En cas de contact avec les yeux, rincer abondamment à l'eau claire",
      ],
      technical: { "Aspect": "Liquide visqueux orangé", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Agrumes", "Conditionnement": "Flacons 1 L ou Bidons 5 L" },
      pdf: "/images/ft-produits/FT-SI-PLONGE-tgtproprete.pdf",
    }),

  P("creme-mains-base-tgt", "CRÈME MAINS • Savon Liquide Nacré Douceur", "consommables", ["bureaux", "commerces", "restaurateurs"], "🧼", "Bidon de 5 L",
    "Savon liquide nacré formulé pour le lavage fréquent des mains. Respecte l'épiderme tout en garantissant une hygiène parfaite dans tous les distributeurs sanitaires.",
    {
      price: "10,99 € HT / bidon de 5 L",
      featured: true,
      features: [
        "Texture onctueuse et parfum délicat adaptée aux lavages très fréquents",
        "Excellente tolérance cutanée testée pour un usage professionnel intensif",
        "Compatible avec tous les types de distributeurs de savon mural",
      ],
      usage: [
        "Appliquer une dose de savon sur mains mouillées",
        "Frotter énergiquement pendant 30 secondes puis rincer à l'eau claire",
      ],
      precautions: [
        "Réservé à l'hygiène corporelle externe",
        "Éviter le contact direct avec les yeux",
      ],
      technical: { "Aspect": "Liquide nacré", "Conditionnement": "Bidon de 5 L" },
    }),

  P("2d-fraicheur-imperiale-tgt", "ODOR 2D • Détergent Désodorisant Neutre Senteurs", "sols", ["bureaux", "commerces"], "🌸", "Bidon 5 L · Carton 5 L x 4",
    "Détergent d'entretien quotidien à pH neutre pour sols protégés. Combine un nettoyage efficace et une rémanence olfactive exceptionnelle sans altérer les émulsions.",
    {
      price: "9,99 € HT / bidon de 5 L",
      featured: false,
      features: [
        "pH neutre respectueux des sols protégés par des émulsions acryliques",
        "Parfums rémanents longue durée testés pour neutraliser les odeurs de passage",
        "Nettoie sans laisser de film collant et ne nécessite pas de rinçage",
      ],
      usage: [
        "Lavage manuel : diluer de 1% à 5% dans l'eau",
        "Lavage mécanique en autolaveuse : dilution recommandée à 2%",
      ],
      precautions: [
        "Ne pas mélanger avec d'autres produits chimiques",
        "Stocker à l'abri du gel",
      ],
      technical: { "Aspect": "Liquide translucide coloré", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Multiples senteurs", "Conditionnement": "Bidon 5 L" },
      pdf: "/images/ft-produits/FT-SI-ODOR-2D-tgtproprete.pdf",
    }),

  P("détergent-triple-action-tgt", "ODOR 3D TRIPLE ACTION • Désinfectant Neutre", "sols", ["bureaux", "commerces", "restaurateurs", "chantiers"], "✨", "Bidon 5 L · Carton 5 L x 4",
    "Détergent, désodorisant et désinfectant à large spectre. Nettoie, assainit et parfume toutes les surfaces lavables en un seul passage en respectant les normes en vigueur.",
    {
      price: "11,99 € HT / bidon de 5 L",
      featured: true,
      badge: "Triple Action",
      features: [
        "Action combinée : détergent, désodorisant et désinfectant microbiologique",
        "pH neutre idéal pour l'entretien des sols brillants et protégés",
        "Conforme aux normes de désinfection EN1040",
      ],
      usage: [
        "Application manuelle ou mécanique : diluer à 2% pour assurer l'effet désinfectant",
        "Ne nécessite pas de rinçage en entretien courant de sols",
      ],
      precautions: [
        "Respecter les dosages préconisés pour garantir l'efficacité biocide",
        "Conserver hors de portée des enfants",
      ],
      technical: { "Aspect": "Liquide translucide coloré", "pH à l'état pur": "7.5 +/- 0.5", "Parfum": "Senteurs variées", "Conditionnement": "Carton de 4 Bidons de 5 L" },
      pdf: "/images/ft-produits/FT-SI-ODOR-3D-TRIPLE-ACTION-tgtproprete.pdf",
    }),

  P("maxi-jumbo380-tgt", "Papier Hygiénique Maxi Jumbo Pro", "consommables", ["bureaux", "commerces", "restaurateurs"], "🧻", "Carton de 6 bobines jumbo",
    "Bobines de papier hygiénique grand format spécialement étudiées pour les distributeurs collectifs à fort trafic. Ouate douce, résistante et économique.",
    {
      price: "21,90 € HT / pack de 6 bobines",
      featured: true,
      badge: "Grand Format",
      features: [
        "Grande capacité réduisant la fréquence des recharges dans les sanitaires collectifs",
        "Ouate pure ouate confortable, double épaisseur résistante",
        "Mandrin standard compatible avec la quasi-totalité des dérouleurs jumbo",
      ],
      usage: [
        "Mettre en place la bobine dans le distributeur mural adapté en s'assurant du libre déroulement",
      ],
      precautions: [
        "Stocker dans un endroit sec à l'abri de l'humidité",
      ],
      technical: { "Matière": "Ouate de cellulose", "Format": "Maxi Jumbo 380m", "Conditionnement": "Carton de 6 bobines" },
    }),

  P("Papiershygnq-rouleau-tgt", "Papier Hygiénique Rouleau Standard", "consommables", ["bureaux", "commerces", "restaurateurs"], "🧻", "Pack de 28 rouleaux",
    "Rouleaux de papier hygiénique standard en pure ouate confortable, parfaitement adaptés aux exigences des sanitaires de bureaux et structures professionnelles.",
    {
      price: "10,99 € HT / pack de 28 rouleaux",
      featured: false,
      features: [
        "Confort optimal et bonne résistance à l'usage",
        "Conditionnement économique en pack de 28 rouleaux pour la gestion des stocks",
      ],
      usage: [
        "Utilisation sur dérouleur individuel classique",
      ],
      precautions: [
        "Conserver à l'abri de l'humidité avant utilisation",
      ],
      technical: { "Conditionnement": "Pack de 28 rouleaux", "Qualité": "Double épaisseur" },
    }),

  P("bobine-essuyage-micro-gaufrée", "Bobine d'Essuyage Micro-Gaufrée Pro", "consommables", ["bureaux", "commerces", "restaurateurs"], "🧻", "Carton de 6 bobines",
    "Bobine d'essuyage professionnelle dotée d'une texture micro-gaufrée pour une absorption rapide et maximale des liquides. Idéale pour les ateliers, cuisines et commerces.",
    {
      price: "15,99 € HT / pack de 6 bobines",
      featured: true,
      badge: "Ultra Absorbant",
      features: [
        "Texture micro-gaufrée augmentant considérablement la vitesse d'absorption",
        "Résistance accrue à l'état humide pour éviter l'effritement du papier",
        "Polyvalente pour le séchage des mains et le nettoyage des surfaces",
      ],
      usage: [
        "Installer sur dévidoir mural ou sur un support mobile d'atelier",
        "Prélever le nombre de formats nécessaires à l'essuyage",
      ],
      precautions: [
        "Stocker au sec",
      ],
      technical: { "Conditionnement": "Carton de 6 bobines", "Spécificité": "Micro-gaufré 2 plis" },
    }),

  P("bobine-essuietout-lisse", "Bobine d'Essuyage Lisse Pure Pâte", "consommables", ["bureaux", "commerces", "restaurateurs"], "🧻", "Carton de 6 bobines",
    "Bobine d'essuyage en pure pâte de cellulose à surface parfaitement lisse. Spécialement conçue pour un essuyage de précision sans laisser de peluches ni de traces sur les vitres.",
    {
      price: "21,90 € HT / pack de 6 bobines",
      featured: true,
      badge: "Pure Pâte",
      features: [
        "Surface lisse garantie sans peluche, idéale pour les finitions de précision",
        "Excellente résistance mécanique même en milieu humide",
        "Parfaite pour les vitrages, miroirs et comptoirs brillants",
      ],
      usage: [
        "Utilisation sur mandrin dévidoir ou en découpe manuelle",
      ],
      precautions: [
        "Conserver à l'abri de l'humidité",
      ],
      technical: { "Conditionnement": "Carton de 6 bobines", "Matière": "Pure pâte lisse" },
    }),

  P("essuie-mains-plies-z", "Essuie-Mains Pliés en Z Pro", "consommables", ["bureaux", "commerces", "restaurateurs"], "🧻", "Carton de 20 paquets",
    "Feuilles d'essuie-mains pliées en Z à distribution séquentielle feuille à feuille. Hygiéniques, économiques et très absorbantes pour les distributeurs muraux.",
    {
      price: "Sur devis",
      featured: false,
      available: false,
      features: [
        "Distribution feuille à feuille limitant le gaspillage et garantissant une hygiène irréprochable",
        "Ouate gaufrée douce pour un séchage agréable des mains",
        "Compatibles avec la majorité des distributeurs muraux d'essuie-mains standard",
      ],
      usage: [
        "Insérer les paquets dans le distributeur mural prévu à cet effet",
        "Tirer délicatement sur la languette apparente",
      ],
      precautions: [
        "Maintenir dans un local sec",
      ],
      technical: { "Conditionnement": "Carton de 20 paquets", "Format": "Pliage en Z" },
    }),
];