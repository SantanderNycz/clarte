// ─── I18N — FR (default) / PT / EN ──────────────────────
// Dictionary, SEO metadata, and language-apply logic.
// FR is the default per project brief; session storage persists choice.

export const I18N = {
  fr: {
    announce: "Livraison offerte dès 120 € &nbsp;·&nbsp; Formules exclusivement véganes &nbsp;·&nbsp; Fabriqué en Provence",
    nav: { collections: "Collections", ritual: "Rituel", philosophy: "Philosophie", journal: "Journal" },
    hero: {
      eyebrow: "Collection Été 2025",
      title: "La clarté,<br>révélée.",
      tagline: "Des formules d'exception qui célèbrent la peau dans son état le plus pur. Rien de superflu, tout de l'essentiel.",
      cta1: "Découvrir",
      cta2: "Notre approche",
      scroll: "Défiler"
    },
    philosophy: {
      label: "Philosophie",
      heading: "Moins, mais infiniment mieux.",
      copy1: "Chez Clarté, chaque formule naît d'une contrainte radicale : n'y faire entrer que ce qui transforme véritablement. Pas d'effet de volume, pas de promesses vides. Uniquement la science au service de l'essentiel.",
      copy2: "Nos laboratoires en Haute-Provence sélectionnent des actifs botaniques à haute concentration, récoltés en cycle lunaire, préservés à froid. Chaque flacon est le résultat de trois années de recherche avant d'atteindre votre peau.",
      link: "Lire notre manifeste →"
    },
    quote: { text: "La beauté n'est pas une promesse. C'est une révélation.", cite: "— Clarté, Manifeste 1998" },
    collections: {
      eyebrow: "Nos lignes",
      heading: "Trois rituels,<br>une seule clarté.",
      line1: "Ligne I", line2: "Ligne II", line3: "Ligne III",
      explore: "Explorer →"
    },
    products: {
      eyebrow: "Sélection",
      heading: "Pièces d'exception",
      viewall: "Voir tout",
      badge_new: "Nouveau",
      badge_best: "Bestseller",
      p1: { name: "Sérum Lumière", desc: "Vitamine C stabilisée 20% · Acide férulique" },
      p2: { name: "Huile Précieuse", desc: "Bakuchiol · Squalane · Rosier muscat" },
      p3: { name: "Masque Argile", desc: "Kaolin purifié · Eau thermale · Niacinamide" },
      p4: { name: "Élixir Réparateur", desc: "Rétinol 0.5% encapsulé · Céramides" }
    },
    editorial: {
      eyebrow: "Savoir-faire",
      heading: "Formulé pour durer.<br>Conçu pour émouvoir.",
      copy: "Nos actifs traversent trois années de recherche avant d'atteindre votre peau. Chaque texture, chaque fragrance, chaque concentration est le résultat d'une obsession : la permanence du soin.",
      stat1: "Actifs botaniques",
      stat2_n: "3 ans",
      stat2: "De R&D par formule",
      stat3: "Perturbateurs endocriniens",
      cta: "Découvrir le laboratoire"
    },
    ritual: {
      eyebrow: "Mode d'emploi",
      heading: "Le rituel Clarté",
      step1: { title: "Purifier", body: "Commencez par un nettoyage doux qui préserve le film hydrolipidique naturel de la peau." },
      step2: { title: "Activer", body: "Appliquez le sérum Essence en mouvements ascendants. Les actifs pénètrent en 90 secondes." },
      step3: { title: "Sceller", body: "Le baume Rituel fixe les soins et crée une barrière protectrice invisible sur l'épiderme." },
      step4: { title: "Révéler", body: "Le lendemain matin, la peau retrouve son éclat naturel. Le rituel Nuit a accompli son œuvre." }
    },
    newsletter: {
      heading: "Rejoindre l'univers Clarté",
      sub: "Accédez en avant-première aux nouvelles formules, aux éditions limitées et aux conseils exclusifs de nos laboratoires.",
      placeholder: "Votre adresse e-mail",
      submit: "S'inscrire"
    },
    footer: {
      desc: "Soin de prestige formulé en Haute-Provence. Des actifs d'exception au service d'une peau révélée.",
      col1: "Collections", col2: "La maison", col3: "Service",
      limited: "Édition limitée",
      lab: "Laboratoire", ingredients: "Ingrédients",
      account: "Mon compte", shipping: "Livraison & retours", faq: "FAQ", contact: "Contact",
      legal: "© 2025 Clarté. Tous droits réservés.",
      credit: "Développé par Void Studio",
      locale: "FR · EUR €"
    },
    marquee: ["Actifs botaniques", "Formules végan certifiées", "Provençal depuis 1998", "Sans perturbateurs endocriniens", "Emballages recyclables", "Dermatologiquement testé"]
  },

  pt: {
    announce: "Envio grátis a partir de 120 € &nbsp;·&nbsp; Fórmulas exclusivamente veganas &nbsp;·&nbsp; Fabricado na Provença",
    nav: { collections: "Coleções", ritual: "Ritual", philosophy: "Filosofia", journal: "Jornal" },
    hero: {
      eyebrow: "Coleção Verão 2025",
      title: "A clareza,<br>revelada.",
      tagline: "Fórmulas de exceção que celebram a pele no seu estado mais puro. Nada de supérfluo, apenas o essencial.",
      cta1: "Descobrir",
      cta2: "Nossa abordagem",
      scroll: "Deslizar"
    },
    philosophy: {
      label: "Filosofia",
      heading: "Menos, mas infinitamente melhor.",
      copy1: "Na Clarté, cada fórmula nasce de uma restrição radical: incluir apenas aquilo que verdadeiramente transforma. Sem efeito de volume, sem promessas vazias. Apenas ciência ao serviço do essencial.",
      copy2: "Os nossos laboratórios na Alta Provença selecionam ativos botânicos de alta concentração, colhidos em ciclo lunar e preservados a frio. Cada frasco é o resultado de três anos de investigação antes de chegar à sua pele.",
      link: "Ler o nosso manifesto →"
    },
    quote: { text: "A beleza não é uma promessa. É uma revelação.", cite: "— Clarté, Manifesto 1998" },
    collections: {
      eyebrow: "As nossas linhas",
      heading: "Três rituais,<br>uma única clareza.",
      line1: "Linha I", line2: "Linha II", line3: "Linha III",
      explore: "Explorar →"
    },
    products: {
      eyebrow: "Seleção",
      heading: "Peças de exceção",
      viewall: "Ver tudo",
      badge_new: "Novo",
      badge_best: "Mais vendido",
      p1: { name: "Sérum Luminosidade", desc: "Vitamina C estabilizada 20% · Ácido ferúlico" },
      p2: { name: "Óleo Precioso", desc: "Bakuchiol · Esqualano · Roseira-brava" },
      p3: { name: "Máscara de Argila", desc: "Caulino purificado · Água termal · Niacinamida" },
      p4: { name: "Elixir Reparador", desc: "Retinol 0,5% encapsulado · Ceramidas" }
    },
    editorial: {
      eyebrow: "Saber-fazer",
      heading: "Formulado para durar.<br>Concebido para emocionar.",
      copy: "Os nossos ativos atravessam três anos de investigação antes de chegar à sua pele. Cada textura, cada fragrância, cada concentração é o resultado de uma obsessão: a permanência do cuidado.",
      stat1: "Ativos botânicos",
      stat2_n: "3 anos",
      stat2: "De I&D por fórmula",
      stat3: "Disruptores endócrinos",
      cta: "Descobrir o laboratório"
    },
    ritual: {
      eyebrow: "Modo de utilização",
      heading: "O ritual Clarté",
      step1: { title: "Purificar", body: "Comece com uma limpeza suave que preserva o filme hidrolipídico natural da pele." },
      step2: { title: "Ativar", body: "Aplique o sérum Essence com movimentos ascendentes. Os ativos penetram em 90 segundos." },
      step3: { title: "Selar", body: "O bálsamo Rituel fixa os cuidados e cria uma barreira protetora invisível sobre a epiderme." },
      step4: { title: "Revelar", body: "Na manhã seguinte, a pele recupera o seu brilho natural. O ritual Nuit cumpriu a sua função." }
    },
    newsletter: {
      heading: "Juntar-se ao universo Clarté",
      sub: "Tenha acesso em primeira mão às novas fórmulas, edições limitadas e conselhos exclusivos dos nossos laboratórios.",
      placeholder: "O seu endereço de e-mail",
      submit: "Subscrever"
    },
    footer: {
      desc: "Cuidado de prestígio formulado na Alta Provença. Ativos de exceção ao serviço de uma pele revelada.",
      col1: "Coleções", col2: "A maison", col3: "Serviço",
      limited: "Edição limitada",
      lab: "Laboratório", ingredients: "Ingredientes",
      account: "A minha conta", shipping: "Envio & devoluções", faq: "Perguntas frequentes", contact: "Contacto",
      legal: "© 2025 Clarté. Todos os direitos reservados.",
      credit: "Desenvolvido por Void Studio",
      locale: "PT · EUR €"
    },
    marquee: ["Ativos botânicos", "Fórmulas veganas certificadas", "Provençal desde 1998", "Sem disruptores endócrinos", "Embalagens recicláveis", "Testado dermatologicamente"]
  },

  en: {
    announce: "Free shipping from € 120 &nbsp;·&nbsp; Exclusively vegan formulas &nbsp;·&nbsp; Made in Provence",
    nav: { collections: "Collections", ritual: "Ritual", philosophy: "Philosophy", journal: "Journal" },
    hero: {
      eyebrow: "Summer Collection 2025",
      title: "Clarity,<br>revealed.",
      tagline: "Exceptional formulas that celebrate skin in its purest state. Nothing superfluous, only the essential.",
      cta1: "Discover",
      cta2: "Our approach",
      scroll: "Scroll"
    },
    philosophy: {
      label: "Philosophy",
      heading: "Less, but infinitely better.",
      copy1: "At Clarté, every formula is born from a radical constraint: only including what truly transforms. No filler, no empty promises. Only science in service of the essential.",
      copy2: "Our laboratories in Haute-Provence select highly concentrated botanical actives, harvested on a lunar cycle and cold-preserved. Every bottle is the result of three years of research before it reaches your skin.",
      link: "Read our manifesto →"
    },
    quote: { text: "Beauty is not a promise. It is a revelation.", cite: "— Clarté, Manifesto 1998" },
    collections: {
      eyebrow: "Our lines",
      heading: "Three rituals,<br>one clarity.",
      line1: "Line I", line2: "Line II", line3: "Line III",
      explore: "Explore →"
    },
    products: {
      eyebrow: "Selection",
      heading: "Exceptional pieces",
      viewall: "View all",
      badge_new: "New",
      badge_best: "Bestseller",
      p1: { name: "Lumière Serum", desc: "20% stabilized vitamin C · Ferulic acid" },
      p2: { name: "Precious Oil", desc: "Bakuchiol · Squalane · Rosehip" },
      p3: { name: "Clay Mask", desc: "Purified kaolin · Thermal water · Niacinamide" },
      p4: { name: "Repair Elixir", desc: "0.5% encapsulated retinol · Ceramides" }
    },
    editorial: {
      eyebrow: "Craftsmanship",
      heading: "Formulated to last.<br>Designed to move.",
      copy: "Our actives undergo three years of research before reaching your skin. Every texture, every fragrance, every concentration is the result of one obsession: lasting care.",
      stat1: "Botanical actives",
      stat2_n: "3 years",
      stat2: "Of R&D per formula",
      stat3: "Endocrine disruptors",
      cta: "Discover the laboratory"
    },
    ritual: {
      eyebrow: "How to use",
      heading: "The Clarté ritual",
      step1: { title: "Purify", body: "Begin with a gentle cleanse that preserves the skin's natural hydrolipidic film." },
      step2: { title: "Activate", body: "Apply Essence serum in upward motions. Actives penetrate within 90 seconds." },
      step3: { title: "Seal", body: "Rituel balm locks in care and creates an invisible protective barrier on the skin." },
      step4: { title: "Reveal", body: "By the next morning, skin regains its natural glow. The Nuit ritual has done its work." }
    },
    newsletter: {
      heading: "Join the Clarté universe",
      sub: "Get early access to new formulas, limited editions and exclusive advice from our laboratories.",
      placeholder: "Your email address",
      submit: "Subscribe"
    },
    footer: {
      desc: "Prestige skincare formulated in Haute-Provence. Exceptional actives in service of revealed skin.",
      col1: "Collections", col2: "The house", col3: "Service",
      limited: "Limited edition",
      lab: "Laboratory", ingredients: "Ingredients",
      account: "My account", shipping: "Shipping & returns", faq: "FAQ", contact: "Contact",
      legal: "© 2025 Clarté. All rights reserved.",
      credit: "Developed by Void Studio",
      locale: "EN · EUR €"
    },
    marquee: ["Botanical actives", "Certified vegan formulas", "Provençal since 1998", "No endocrine disruptors", "Recyclable packaging", "Dermatologically tested"]
  }
};

// SEO metadata per language — swapped on language change
export const SEO_I18N = {
  fr: {
    title: "Clarté — Soin de Prestige | Skincare Formulé en Provence",
    description: "Clarté révèle l'éclat naturel de la peau grâce à des formules de soin premium, véganes et concentrées en actifs botaniques. Sérums, huiles et rituels conçus en Haute-Provence."
  },
  pt: {
    title: "Clarté — Cuidado de Prestígio | Skincare Formulado na Provença",
    description: "A Clarté revela o brilho natural da pele com fórmulas de cuidado premium, veganas e concentradas em ativos botânicos. Sérums, óleos e rituais concebidos na Alta Provença."
  },
  en: {
    title: "Clarté — Prestige Skincare | Formulated in Provence",
    description: "Clarté reveals skin's natural radiance through premium, vegan formulas concentrated in botanical actives. Serums, oils and rituals crafted in Haute-Provence."
  }
};

// dot-path getter: "products.p1.name" → obj.products.p1.name
function i18nGet(dict, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : null, dict);
}

export function buildMarquee(lang) {
  const items = I18N[lang].marquee;
  const track = document.getElementById('marquee-track');
  if (!track) return;
  // duplicate list twice for seamless infinite scroll
  const doubled = [...items, ...items];
  track.innerHTML = doubled.map(text =>
    `<span class="marquee-item">${text}<span class="marquee-dot"></span></span>`
  ).join('');
}

export function applyLanguage(lang) {
  const dict = I18N[lang];
  if (!dict) return;

  // text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = i18nGet(dict, el.getAttribute('data-i18n'));
    if (val !== null) el.textContent = val;
  });

  // innerHTML (for entries containing <br>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = i18nGet(dict, el.getAttribute('data-i18n-html'));
    if (val !== null) el.innerHTML = val;
  });

  // placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = i18nGet(dict, el.getAttribute('data-i18n-placeholder'));
    if (val !== null) el.setAttribute('placeholder', val);
  });

  // announcement bar uses innerHTML (contains &nbsp; separators)
  const announce = document.querySelector('.announcement-bar');
  if (announce) announce.innerHTML = dict.announce;

  // footer locale code
  const footerLocale = document.getElementById('footer-locale');
  if (footerLocale) footerLocale.textContent = dict.footer.locale;

  // marquee rebuild
  buildMarquee(lang);

  // html lang attribute (accessibility + SEO)
  document.documentElement.setAttribute('lang', lang);

  // SEO: title + meta description swap
  const seo = SEO_I18N[lang];
  if (seo) {
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', lang === 'fr' ? 'fr_FR' : lang === 'pt' ? 'pt_PT' : 'en_US');
  }

  // active state on switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // persist choice for this session
  try { sessionStorage.setItem('clarte_lang', lang); } catch (e) {}
}
