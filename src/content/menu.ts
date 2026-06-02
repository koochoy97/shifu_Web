// Todo el contenido del menú vive aquí. Edita este archivo para cambiar la web.

export const brand = {
  name: "SHIFU",
  tagline: "Wontons tradicionales · 100% cerdo",
  heroTitle: "Tu antojo chino, listo al toque.",
  heroSub:
    "Wontons tradicionales hechos a mano. Hierves agua y en 7 minutos los tienes listos.",
  // Tres atributos cortos que reemplazan el "+1,200 pedidos" del hero.
  heroBadges: [
    { icon: "🥟", label: "100% cerdo" },
    { icon: "❄️", label: "Congelados crudos" },
    { icon: "⏱️", label: "Listos en 7 min" },
  ],
};

export const contact = {
  phone: "+51 956 259 597",
  phoneRaw: "+51956259597",
  whatsappMessage: "Hola, vi su menú de Shifu y quiero pedir.",
  instagram: "shifu_pe",
  instagramUrl: "https://www.instagram.com/shifu_pe/",
  hours: "Despachos casi todos los días",
};

// El gran diferenciador, en frase única bajo el hero.
export const diff = {
  pill: "A diferencia del chifa: estos sí tienen relleno de verdad.",
};

export const gallery = [
  {
    src: "/images/wontons-hero.jpeg",
    alt: "Wontons humeantes en bowl de porcelana",
  },
  {
    src: "/images/wontons-top.jpeg",
    alt: "Vista cenital de wontons artesanales",
  },
];

// Solo un relleno por ahora. Cuando agregues más, sumas al array.
export const filling = {
  title: "Wontons que sí tienen relleno",
  body: "100% cerdo, marinado a la antigua. Masa fina, relleno generoso.",
  image: "/images/wontons-raw.jpeg",
  imageAlt: "Proceso: cerdo molido y wontons recién armados a mano",
};

export const pricing = [
  {
    name: "Para probar",
    units: 12,
    price: "S/ 17",
    description: "Si nunca los has probado, empieza por acá.",
    badge: null,
  },
  {
    name: "Para compartir",
    units: 20,
    price: "S/ 27",
    description: "Cena para dos o entrada para varios.",
    badge: "MÁS PEDIDO",
  },
  {
    name: "Para tu freezer",
    units: 30,
    price: "S/ 38",
    description: "El tuyo cuando se te antoje. Te dura semanas.",
    badge: null,
  },
];

// Lo que llega físicamente. Cuando lances la salsa, descomenta la línea.
export const included = [
  { icon: "🥟", label: "Wontons sellados al vacío" },
  { icon: "📜", label: "Instrucciones para cocinarlos" },
  // { icon: "🌶️", label: "Salsa Shifu (próximamente)" },
];

export const howToCook = {
  heading: "Cómo se preparan",
  subtitle: "Es muy fácil. En serio.",
  steps: [
    {
      step: 1,
      title: "Hierves agua",
      detail: "Una olla con bastante agua. Le echas una pizca de sal.",
    },
    {
      step: 2,
      title: "Echas los wontons congelados",
      detail: "Directo del freezer al agua. No los descongeles.",
    },
    {
      step: 3,
      title: "Listos cuando floten",
      detail: "Como 7 minutos. Cuando suben a la superficie, ya están.",
    },
  ],
};

export const delivery = {
  heading: "Delivery",
  title: "Llegamos a todo Lima",
  body:
    "El costo depende de tu zona. Escríbenos con tu dirección y te lo decimos al toque.",
};

export const faq = [
  {
    q: "¿De qué están hechos?",
    a: "Cerdo con sazón china.",
  },
  {
    q: "¿Cómo se preparan?",
    a: "Hierves agua, echas los wontons congelados (no descongelar), y los sacas cuando floten. Como 7 minutos. Eso es todo.",
  },
];

export const closing = {
  headline: "Ya sabes todo. Ahora escríbenos.",
  line: "Te respondemos al toque por WhatsApp o Instagram.",
};
