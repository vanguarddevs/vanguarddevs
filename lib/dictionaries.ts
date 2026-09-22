import type { Locale } from "./i18n";

export interface CaseItem {
  name: string;
  tag: string;
  body: string;
  /** Empty string for anonymized or unreleased work — Cases.tsx skips the link when url is "" (all current cases have one). */
  url: string;
  /** Ghosted screenshot bleeding out of the card's corner (public/cases/*). Decorative, alt="". */
  image: string;
  testimonial?: { quote: string; by: string };
}

export interface IndustryItem {
  name: string;
  body: string;
}

export interface PackageItem {
  title: string;
  /** Not rendered on the page (owner's call) — only the chat prompt
      (lib/chat-prompt.ts) exposes it, so the bot can quote it. */
  price: string;
  body: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  nav: {
    cases: string;
    industries: string;
    process: string;
    services: string;
    cta: string;
    ariaMain: string;
    ariaLang: string;
    menuLabel: string;
  };
  hero: {
    ariaLabel: string;
    headlineStart: string;
    headlineAccent: string;
    sub: string;
    /** Mono trust line under the CTAs. Only facts already stated in about.bio. */
    trustLine: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  cases: {
    heading: string;
    items: CaseItem[];
  };
  industries: {
    heading: string;
    intro: string;
    items: IndustryItem[];
  };
  process: {
    heading: string;
    steps: { title: string; body: string }[];
  };
  /* "What we do" — the packages section (components/Services.tsx). */
  services: {
    heading: string;
    packagesIntro: string;
    venezuelaIntro: string;
    venezuelaCta: string;
    packages: PackageItem[];
  };
  /* Not rendered as a section (the founder section was removed 2026-09);
     feeds the chat system prompt (lib/chat-prompt.ts) and the Person JSON-LD. */
  about: {
    photoLabel: string;
    bio: string;
  };
  contact: {
    heading: string;
    secLabel: string;
    cta: string;
    /** Booking/Calendly label. Rendered only on /en; /es keeps WhatsApp as primary CTA.
        The ES string exists purely for Dictionary type parity. */
    bookingCta: string;
    socialLinkedin: string;
    socialInstagram: string;
  };
  footer: {
    /** Label for the JODAZ_URL link — the founder's real name, per the copy rules. */
    founderLink: string;
    privacyLink: string;
    cookieSettings: string;
  };
  cookieBanner: {
    message: string;
    accept: string;
    reject: string;
    policyLinkLabel: string;
  };
  privacy: {
    meta: {
      title: string;
      description: string;
    };
    title: string;
    sections: { heading: string; body: string }[];
  };
  notFound: {
    badge: string;
    stackLine1: string;
    stackLine2: string;
    cta: string;
  };
  /* Landing-page chat widget (components/ChatWidget.tsx). Only UI chrome lives
     here — what the bot *knows* is derived from this same dictionary in
     lib/chat-prompt.ts, never typed by hand. */
  chat: {
    title: string;
    subtitle: string;
    greeting: string;
    suggestions: string[];
    placeholder: string;
    send: string;
    open: string;
    close: string;
    disclaimer: string;
    talkToHuman: string;
    error: string;
    rateLimited: string;
  };
}

const es: Dictionary = {
  meta: {
    title: "Desarrollo de MVPs, SaaS y producto fintech | VanguardDevs",
    description:
      "Estudio de producto para fintech, insurtech y ecommerce: MVPs, SaaS, tiendas online, landing pages e infraestructura embebida. En semanas, no meses. USA, UK y LATAM.",
    ogAlt: "VanguardDevs — Desarrollo de MVPs, SaaS y producto fintech",
  },
  nav: {
    cases: "Proyectos",
    industries: "Industrias",
    process: "La hoja de ruta",
    services: "Qué hacemos por ti",
    cta: "Empieza ahora",
    ariaMain: "Principal",
    ariaLang: "Idioma / Language",
    menuLabel: "Menú",
  },
  hero: {
    ariaLabel: "Introducción",
    headlineStart: "Productos donde el dinero tiene que cuadrar,",
    headlineAccent: "lanzados en semanas.",
    sub: "MVPs, SaaS multi-tenant e infraestructura fintech embebida para startups en USA, UK y LATAM — alcance fijo, lanzado en 4-6 semanas.",
    trustLine: "8 años full-stack · fintech, insurtech y ecommerce · USA, UK y LATAM",
    ctaPrimary: "Empieza ahora",
    ctaSecondary: "Ver proyectos",
  },
  cases: {
    heading: "Casos de estudio",
    items: [
      {
        name: "ZonaCrono",
        tag: "SaaS de inscripciones para eventos deportivos",
        body: "Los organizadores gestionaban inscripciones por WhatsApp y planillas: caos, errores y horas perdidas. Solución: inscripción y pago online. Resultado: en producción, con organizadores que pagan por usarlo.",
        url: "https://zonacrono.com",
        image: "/cases/zonacrono.webp",
      },
      {
        name: "Akomo",
        tag: "Datos de tipo de cambio",
        body: "El bolívar opera con dos tasas de cambio a la vez, sin una fuente única que registre ambas en el tiempo. Akomo registra el bolívar (VES) frente a USD, EUR y USDT desde el BCV y Binance P2P.",
        url: "https://akomo.xyz",
        // Owner's call: reuse the ZonaCrono shot until Akomo has a public UI.
        image: "/cases/zonacrono.webp",
      },
      {
        name: "CocoVel by Farca",
        tag: "Sitio de marca — aceite de coco",
        body: "Sitio de marca para CocoVel, el aceite de coco que elabora la familia Farca: historia, fichas de producto, el proceso, recetas y canal mayorista, con pedidos por WhatsApp.",
        url: "https://farca.vanguarddevs.com",
        image: "/cases/farca.webp",
      },
      {
        name: "Murciélago Fest",
        tag: "Sitio de festival — rock y metal",
        body: "Sitio del Murciélago Fest, festival de rock y metal, para su Capítulo 02: cartel, galería, convocatoria abierta a bandas y emprendedores, y patrocinantes.",
        url: "https://murcielagofest.vanguarddevs.com",
        image: "/cases/murcielagofest.webp",
      },
    ],
  },
  industries: {
    heading: "Industrias",
    intro: "Producto y arquitectura para fintech, insurtech y ecommerce.",
    items: [
      {
        name: "Fintech",
        body: "Plataforma de cashback multi-tenant con ledger de doble entrada, API para partners y redención contra un proveedor externo.",
      },
      {
        name: "Insurtech",
        body: "Plataforma de retención embebida dentro de los portales de aseguradoras del Reino Unido.",
      },
      // Ecommerce dropped until there is a real project to describe — the
      // section never ships a [PLACEHOLDER] card.
    ],
  },
  process: {
    heading: "La hoja de ruta",
    steps: [
      {
        title: "Reconocimiento",
        body: "Cuenta tu idea una sola vez. Recibe un mapa de tu negocio, tu stack y tus restricciones antes de cualquier propuesta. Sin pitch decks — hallazgos.",
      },
      {
        title: "Plano",
        body: "Aprueba un plan, no una promesa: alcance fijo, cronograma real y la arquitectura exacta que se va a construir. Sabes qué recibes y cuándo, antes de pagar.",
      },
      {
        title: "Construcción",
        body: "Usa tu producto desde la primera semana. Entregas que puedes tocar y probar, no reportes de estatus. Revisas cada avance con quien lo construye.",
      },
      {
        title: "Avance",
        body: "Lanza, mide, endurece. El go-live no es una despedida: soporte e iteración son parte del trabajo, no un extra.",
      },
    ],
  },
  services: {
    heading: "Qué hacemos por ti",
    packagesIntro: "Paquetes con resultado definido, no horas.",
    venezuelaIntro: "¿Eres de Venezuela 🇻🇪?",
    venezuelaCta: "Pregunta por un precio especial para ti",
    packages: [
      {
        title: "MVP funcional",
        price: "desde $1.800",
        body: "Tu idea convertida en producto real en 4-6 semanas: diseño, desarrollo, despliegue, integraciones de pago o de terceros y 30 días de soporte. Alcance fijo, fecha de lanzamiento clara y trato directo con quien lo construye.",
      },
      {
        title: "Landing page / sitio de producto / Ecommerce",
        price: "desde $300",
        body: "Una página diseñada para convertir: presenta tu producto, capta usuarios o valida tu idea antes de construirla. Diseño a medida, analítica y despliegue incluidos. Landing o tienda online lista y publicada en días, no meses.",
      },
      {
        title: "Iteración continua",
        price: "desde $300/mes",
        body: "Tu producto no se detiene después del lanzamiento: mejoras, soporte y nuevas funcionalidades cada mes, con horas de dedicación garantizadas y prioridad en la agenda.",
      },
    ],
  },
  about: {
    photoLabel: "Jesus O., fundador de VanguardDevs",
    bio: "Jesus O. es el fundador de VanguardDevs, estudio de producto especializado en MVPs, SaaS y ecommerce. Ocho años como desarrollador full-stack, con foco en fintech, insurtech y ecommerce, trabajando en remoto para clientes del Reino Unido, Estados Unidos y LATAM desde Venezuela. A diferencia de una agencia tradicional, trabajas directamente con él — quien diseña la solución es quien la construye. Tiene producto propio en producción y con clientes que pagan (ZonaCrono, plataforma de inscripciones deportivas). Su enfoque: lanzar rápido, validar con usuarios reales, iterar.",
  },
  contact: {
    heading: "Contacto",
    secLabel: "¿Estás listo?",
    cta: "Empieza ahora",
    // Solo se renderiza en /en; en /es el CTA primario sigue siendo WhatsApp.
    bookingCta: "Agenda una llamada",
    socialLinkedin: "LinkedIn",
    socialInstagram: "Instagram",
  },
  footer: {
    founderLink: "Jesus O.",
    privacyLink: "Privacidad",
    cookieSettings: "Cookies",
  },
  cookieBanner: {
    message:
      "Este sitio usa una cookie de analítica opcional (Google Analytics) solo si la aceptas.",
    accept: "Aceptar",
    reject: "Rechazar",
    policyLinkLabel: "Política de privacidad",
  },
  /* DRAFT — pending owner/legal review, not verbatim owner-supplied copy.
     Describes the site's actual, current data practices (no forms, optional
     GA4 gated by consent, no other collection) in the required impersonal
     voice. See docs/plans/analytics-cookie-consent.md. */
  privacy: {
    meta: {
      title: "Política de privacidad — VanguardDevs",
      description:
        "Cómo vanguarddevs.com usa cookies de analítica opcionales y por qué no recopila datos personales a través de formularios.",
    },
    title: "Política de privacidad",
    sections: [
      {
        heading: "Alcance",
        body: "Esta política describe qué datos recopila el sitio vanguarddevs.com y cómo los usa. El sitio no tiene formularios: todo contacto ocurre a través de enlaces externos (WhatsApp, correo, LinkedIn, Instagram), cada uno regido por la política de privacidad de su propio proveedor.",
      },
      {
        heading: "Cookies y analítica",
        body: "El sitio guarda una cookie técnica (vg_consent) para recordar, por unos 180 días, si aceptaste o rechazaste las cookies de analítica. Al aceptar, se activa Google Analytics 4 para registrar visitas de página; al rechazar, ningún script de analítica se carga y no se establece ninguna cookie adicional.",
      },
      {
        heading: "Datos que no se recopilan",
        body: "Más allá de la cookie de consentimiento y, si aceptaste, las cookies de Google Analytics 4, el sitio no recopila datos personales: no hay formularios, cuentas de usuario ni almacenamiento de información enviada por quienes lo visitan.",
      },
      {
        heading: "Proveedores externos",
        body: "Cuando las cookies de analítica están activas, Google LLC procesa datos de uso agregados como proveedor de Google Analytics 4, bajo su propia política de privacidad. Los enlaces de contacto (WhatsApp, LinkedIn, Instagram) llevan a servicios de terceros ajenos a esta política.",
      },
      {
        heading: "Tus derechos",
        body: "VanguardDevs opera bajo la jurisdicción de la República Bolivariana de Venezuela. De acuerdo con el artículo 28 de la Constitución de la República Bolivariana de Venezuela, quienes visitan el sitio tienen derecho de hábeas data: acceder a la información que se recopile sobre sí mismos, conocer la finalidad y el uso que se le da, y solicitar su corrección, actualización o eliminación cuando sea inexacta o afecte ilegítimamente sus derechos.",
      },
      {
        heading: "Cambios a esta política",
        body: "Esta política puede actualizarse para reflejar cambios en las prácticas del sitio. Última actualización: 6 de julio de 2026.",
      },
      {
        heading: "Contacto",
        body: "Para consultas sobre esta política, contacta a VanguardDevs por cualquiera de los canales listados en la sección de contacto del sitio.",
      },
    ],
  },
  notFound: {
    badge: "ERR_RUTA_NO_COMPILA",
    stackLine1: "at resolve(esta/ruta) — ausente del árbol de rutas",
    stackLine2: "at build(vanguarddevs.com) — nunca llegó a producción",
    cta: "Volver al inicio",
  },
  /* DRAFT — UI copy taken from the owner's widget/ drop, adjusted only for the
     impersonal-voice and real-name rules; pending owner review. */
  chat: {
    title: "VanguardDevs",
    subtitle: "Asistente · respuestas en segundos",
    greeting:
      "Hola 👋 Pregunta por MVPs, SaaS, tiendas online, landing pages, precios o tiempos de entrega.",
    suggestions: [
      "¿Cuánto cuesta un MVP?",
      "¿Cuánto cuesta una landing o tienda online?",
      "¿Cómo es el proceso?",
    ],
    placeholder: "Escribe tu pregunta",
    send: "Enviar mensaje",
    open: "Abrir chat",
    close: "Cerrar chat",
    disclaimer: "Respuestas generadas por IA.",
    talkToHuman: "Hablar con Jesus O.",
    error: "No hay respuesta disponible ahora mismo. Escribe por WhatsApp.",
    rateLimited: "Demasiados mensajes. Espera un momento.",
  },
};

const en: Dictionary = {
  meta: {
    title: "MVP, SaaS & fintech product development studio | VanguardDevs",
    description:
      "Product studio for fintech, insurtech and ecommerce: MVPs, SaaS, online stores, landing pages and embedded infrastructure. Shipped in weeks, not months. USA, UK and LATAM.",
    ogAlt: "VanguardDevs — MVP, SaaS & fintech product development studio",
  },
  nav: {
    cases: "Projects",
    industries: "Industries",
    process: "The roadmap",
    services: "What we do",
    cta: "Start now",
    ariaMain: "Main",
    ariaLang: "Idioma / Language",
    menuLabel: "Menu",
  },
  hero: {
    ariaLabel: "Intro",
    headlineStart: "Products where the money has to balance,",
    headlineAccent: "shipped in weeks.",
    sub: "MVPs, multi-tenant SaaS and embedded fintech infrastructure for startups in the US, UK and LATAM — fixed scope, shipped in 4-6 weeks.",
    trustLine: "8 years full-stack · fintech, insurtech & ecommerce · USA, UK & LATAM",
    ctaPrimary: "Start now",
    ctaSecondary: "See projects",
  },
  cases: {
    heading: "Case studies",
    items: [
      {
        name: "ZonaCrono",
        tag: "Registration SaaS for sport events",
        body: "Organizers ran registrations through WhatsApp and spreadsheets: chaos, errors and lost hours. Solution: online registration and payment. Result: in production, with paying organizers.",
        url: "https://zonacrono.com",
        image: "/cases/zonacrono.webp",
      },
      {
        name: "Akomo",
        tag: "Exchange-rate data",
        body: "The bolívar runs on two exchange rates at once, with no single source recording both over time. Akomo tracks the bolívar (VES) against USD, EUR and USDT from the central bank (BCV) and Binance P2P.",
        url: "https://akomo.xyz",
        // Owner's call: reuse the ZonaCrono shot until Akomo has a public UI.
        image: "/cases/zonacrono.webp",
      },
      {
        name: "CocoVel by Farca",
        tag: "Brand site — coconut oil",
        body: "Brand site for CocoVel, the Farca family's coconut oil — its story, product sheets, process, recipes and a wholesale channel, with orders taken over WhatsApp.",
        url: "https://farca.vanguarddevs.com",
        image: "/cases/farca.webp",
      },
      {
        name: "Murciélago Fest",
        tag: "Festival site — rock and metal",
        body: "Site for Murciélago Fest, a rock and metal festival, built for its second edition — line-up, gallery, open calls for bands and vendors, and sponsors.",
        url: "https://murcielagofest.vanguarddevs.com",
        image: "/cases/murcielagofest.webp",
      },
    ],
  },
  industries: {
    heading: "Industries",
    intro: "Product and architecture for fintech, insurtech and ecommerce.",
    items: [
      {
        name: "Fintech",
        body: "A multi-tenant cashback platform with a double-entry ledger, a partner API and redemption against an external provider.",
      },
      {
        name: "Insurtech",
        body: "A retention platform embedded inside UK insurer portals.",
      },
      // Ecommerce dropped until there is a real project to describe — the
      // section never ships a [PLACEHOLDER] card.
    ],
  },
  process: {
    heading: "The roadmap",
    steps: [
      {
        title: "Recon",
        body: "Walk through the idea once. Get a map of your business, your stack and your constraints before any proposal. No pitch decks — findings.",
      },
      {
        title: "Blueprint",
        body: "Approve a plan, not a promise: fixed scope, a real timeline and the exact architecture that will be built. You know what you get and when, before you pay.",
      },
      {
        title: "Build",
        body: "Use your product from week one. Deliverables you can click through, not status reports. You review every increment with the person who builds it.",
      },
      {
        title: "Launch",
        body: "Launch, measure, harden. Go-live is not a goodbye: support and iteration are part of the job, not an extra.",
      },
    ],
  },
  services: {
    heading: "What we do",
    packagesIntro: "Packages with a defined outcome, not hours.",
    venezuelaIntro: "Are you from Venezuela 🇻🇪?",
    venezuelaCta: "Ask about a special price for you",
    packages: [
      {
        title: "Functional MVP",
        price: "from $1,800",
        body: "Your idea turned into a real product in 4-6 weeks: design, development, deployment, payment or third-party integrations, and 30 days of support. Fixed scope, a clear launch date, and you deal directly with the person who builds it.",
      },
      {
        title: "Landing page / product site / Ecommerce",
        price: "from $300",
        body: "A page designed to convert: showcase your product, capture users, or validate your idea before you build it. Custom design, analytics, and deployment included. Landing or online store, live and published in days, not months.",
      },
      {
        title: "Ongoing iteration",
        price: "from $300/mo",
        body: "Your product doesn't stop after launch: improvements, support, and new features every month, with guaranteed dedicated hours and priority scheduling.",
      },
    ],
  },
  about: {
    photoLabel: "Jesus O., founder of VanguardDevs",
    bio: "Jesus O. is the founder of VanguardDevs, a product studio specialized in MVPs, SaaS and ecommerce. Eight years as a full-stack developer, focused on fintech, insurtech and ecommerce, working remotely for clients in the UK, the USA and LATAM from Venezuela. Unlike a traditional agency, you work directly with him — the person who designs the solution is the one who builds it. He runs his own product in production with paying customers (ZonaCrono, a sports registration platform). His approach: launch fast, validate with real users, iterate.",
  },
  contact: {
    heading: "Contact",
    secLabel: "Are you ready?",
    cta: "Start now",
    // Rendered on /en only — the booking link is the primary CTA here; /es keeps WhatsApp.
    bookingCta: "Book a call",
    socialLinkedin: "LinkedIn",
    socialInstagram: "Instagram",
  },
  footer: {
    founderLink: "Jesus O.",
    privacyLink: "Privacy",
    cookieSettings: "Cookies",
  },
  cookieBanner: {
    message:
      "This site uses an optional analytics cookie (Google Analytics) only if you accept it.",
    accept: "Accept",
    reject: "Reject",
    policyLinkLabel: "Privacy policy",
  },
  /* DRAFT — pending owner/legal review, not verbatim owner-supplied copy.
     Describes the site's actual, current data practices (no forms, optional
     GA4 gated by consent, no other collection) in the required impersonal
     voice. See docs/plans/analytics-cookie-consent.md. */
  privacy: {
    meta: {
      title: "Privacy policy — VanguardDevs",
      description:
        "How vanguarddevs.com uses optional analytics cookies and why it doesn't collect personal data through forms.",
    },
    title: "Privacy policy",
    sections: [
      {
        heading: "Scope",
        body: "This policy describes what data the vanguarddevs.com site collects and how it is used. The site has no forms: all contact happens through external links (WhatsApp, email, LinkedIn, Instagram), each governed by its own provider's privacy policy.",
      },
      {
        heading: "Cookies and analytics",
        body: "The site stores a technical cookie (vg_consent) to remember, for about 180 days, whether analytics cookies were accepted or rejected. Accepting activates Google Analytics 4 to record pageviews; rejecting means no analytics script loads and no additional cookie is set.",
      },
      {
        heading: "Data not collected",
        body: "Beyond the consent cookie and, if accepted, the Google Analytics 4 cookies, the site does not collect personal data: there are no forms, user accounts, or storage of information submitted by visitors.",
      },
      {
        heading: "Third-party providers",
        body: "When analytics cookies are active, Google LLC processes aggregated usage data as the Google Analytics 4 provider, under its own privacy policy. The contact links (WhatsApp, LinkedIn, Instagram) lead to third-party services outside the scope of this policy.",
      },
      {
        heading: "Your rights",
        body: "VanguardDevs operates under the jurisdiction of the Bolivarian Republic of Venezuela. Under Article 28 of the Constitution of the Bolivarian Republic of Venezuela, visitors have habeas data rights: to access information collected about themselves, to know its purpose and use, and to request its correction, update, or deletion when it is inaccurate or unlawfully affects their rights.",
      },
      {
        heading: "Changes to this policy",
        body: "This policy may be updated to reflect changes in the site's practices. Last updated: July 6, 2026.",
      },
      {
        heading: "Contact",
        body: "For questions about this policy, contact VanguardDevs through any of the channels listed in the site's contact section.",
      },
    ],
  },
  notFound: {
    badge: "ERR_ROUTE_NOT_COMPILED",
    stackLine1: "at resolve(this/path) — missing from the route tree",
    stackLine2: "at build(vanguarddevs.com) — never shipped to production",
    cta: "Back to homepage",
  },
  /* DRAFT — English rewrite of the ES chat chrome; pending owner review. */
  chat: {
    title: "VanguardDevs",
    subtitle: "Assistant · answers in seconds",
    greeting:
      "Hi 👋 Ask about MVPs, SaaS, online stores, landing pages, pricing or delivery times.",
    suggestions: [
      "How much is an MVP?",
      "How much is a landing page or online store?",
      "How does the process work?",
    ],
    placeholder: "Type your question",
    send: "Send message",
    open: "Open chat",
    close: "Close chat",
    disclaimer: "AI-generated answers.",
    talkToHuman: "Talk to Jesus O.",
    error: "No answer available right now. Reach out on WhatsApp.",
    rateLimited: "Too many messages. Give it a moment.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
