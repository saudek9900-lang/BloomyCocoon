export const SITE_ORIGIN = 'https://www.bloomycocoon.com';
export const CANONICAL_URL = `${SITE_ORIGIN}/`;
export const ROUTE_SCHEMA_ID = 'catalog-faq-schema';

export const ENTITY_DESCRIPTION = 'BloomyCocoon is a handmade crochet gifting brand from Mampad, Malappuram, Kerala, India, offering custom crochet bouquets, plushies, keychains, accessories, home decor, and personalized handmade gifts through WhatsApp-based ordering.';
export const PAYMENT_DESCRIPTION = 'Payment is confirmed through WhatsApp, mostly through UPI, with 50% advance and the remaining 50% after completion before delivery.';
export const FINAL_PRICE_NOTE = 'Final price may vary based on size, color, custom name, flowers, packaging, and delivery. Final price is confirmed on WhatsApp.';

export const ROUTE_CONTENT = {
  'screen-home': {
    path: '/',
    outputDir: '',
    title: 'Handmade Crochet Gifts in Kerala & India | BloomyCocoon',
    description: 'Handmade crochet gifts from Mampad, Malappuram, Kerala, India. Explore crochet bouquets, plushies, keychains, baby gifts and custom crochet gifts with delivery across Kerala and India.',
    schemaType: 'WebPage',
    breadcrumbName: 'Home',
  },
  'screen-collection': {
    path: '/collections',
    outputDir: 'collections',
    title: 'Crochet Bouquets, Plushies, Keychains & Handmade Gifts | BloomyCocoon',
    description: 'Browse handmade crochet bouquets, plushies, keychains, baby gifts, accessories, home decor and gift combos from BloomyCocoon in Kerala, with custom orders available across India.',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Handmade Collection',
  },
  'screen-custom-orders': {
    path: '/custom-order',
    outputDir: 'custom-order',
    title: 'Custom Crochet Gifts in Kerala | BloomyCocoon',
    description: 'Create custom crochet bouquets, plushies, keychains, baby gifts and handmade gift combos with BloomyCocoon. Share your idea and finalize your order on WhatsApp.',
    schemaType: 'Service',
    breadcrumbName: 'Custom Orders',
  },
  'screen-about': {
    path: '/about',
    outputDir: 'about',
    title: 'About BloomyCocoon | Handmade Crochet Brand from Malappuram, Kerala',
    description: 'Meet BloomyCocoon, a handmade crochet gifting brand from Mampad, Malappuram, Kerala, India, offering custom crochet bouquets, plushies, keychains, accessories, home decor and personalized handmade gifts.',
    schemaType: 'AboutPage',
    breadcrumbName: 'About BloomyCocoon',
  },
  'screen-faq': {
    path: '/faq',
    outputDir: 'faq',
    title: 'BloomyCocoon FAQ | Crochet Orders, Delivery & Care',
    description: 'Find answers about custom crochet orders, WhatsApp ordering, delivery across Kerala and India, production time, Starting from prices and crochet gift care.',
    schemaType: 'FAQPage',
    breadcrumbName: 'BloomyCocoon FAQ',
  },
  'screen-contact': {
    path: '/contact',
    outputDir: 'contact',
    title: 'Contact BloomyCocoon | WhatsApp Crochet Gift Orders',
    description: 'Contact BloomyCocoon for handmade crochet gifts and custom orders. Based in Mampad, Malappuram, Kerala and delivering across India.',
    schemaType: 'ContactPage',
    breadcrumbName: 'Contact BloomyCocoon',
  },
  'screen-shipping-delivery': {
    path: '/shipping-delivery',
    outputDir: 'shipping-delivery',
    title: 'Shipping & Delivery | BloomyCocoon',
    description: 'Learn how BloomyCocoon confirms delivery charges on WhatsApp and delivers handmade crochet gifts across Kerala and India after production is complete.',
    schemaType: 'WebPage',
    breadcrumbName: 'Shipping & Delivery',
  },
  'screen-returns-cancellations': {
    path: '/returns-cancellations',
    outputDir: 'returns-cancellations',
    title: 'Returns & Cancellations | BloomyCocoon',
    description: 'Read BloomyCocoon’s cancellation and damage-support information for handmade crochet gifts ordered through WhatsApp.',
    schemaType: 'WebPage',
    breadcrumbName: 'Returns & Cancellations',
  },
  'screen-privacy-policy': {
    path: '/privacy-policy',
    outputDir: 'privacy-policy',
    title: 'Privacy Policy | BloomyCocoon',
    description: 'Understand how BloomyCocoon uses enquiry and order details to respond to customers and fulfil handmade crochet gift orders.',
    schemaType: 'WebPage',
    breadcrumbName: 'Privacy Policy',
  },
  'screen-order-terms': {
    path: '/order-terms',
    outputDir: 'order-terms',
    title: 'Order Terms | BloomyCocoon',
    description: 'Review BloomyCocoon’s Starting from pricing, WhatsApp confirmation, advance payment and handmade custom-order terms.',
    schemaType: 'WebPage',
    breadcrumbName: 'Order Terms',
  },
  'screen-crochet-care': {
    path: '/crochet-care',
    outputDir: 'crochet-care',
    title: 'Crochet Care Guide | BloomyCocoon',
    description: 'Simple care guidance to help preserve BloomyCocoon handmade crochet gifts, bouquets, plushies and keepsakes.',
    schemaType: 'WebPage',
    breadcrumbName: 'Crochet Care Guide',
  },
  'screen-anniversary-gifts': {
    path: '/anniversary-gifts',
    outputDir: 'anniversary-gifts',
    title: 'Handmade Crochet Anniversary Gifts & Bouquets in Kerala | BloomyCocoon',
    description: 'Celebrate love with everlasting handmade crochet anniversary flower bouquets, couple gift combos and romantic keepsakes from BloomyCocoon in Kerala. Custom orders on WhatsApp.',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Anniversary Gifts',
  },
  'screen-birthday-gifts': {
    path: '/birthday-gifts',
    outputDir: 'birthday-gifts',
    title: 'Handmade Crochet Birthday Gifts in Kerala & India | BloomyCocoon',
    description: 'Discover heartwarming handmade crochet birthday gifts, custom plushies, flower boxes and note-card combos from BloomyCocoon in Kerala. WhatsApp ordering and delivery across India.',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Birthday Gifts',
  },
  'screen-baby-shower-gifts': {
    path: '/baby-shower-gifts',
    outputDir: 'baby-shower-gifts',
    title: 'Handmade Crochet Baby Shower & Newborn Gifts in Kerala | BloomyCocoon',
    description: 'Soft, skin-safe handmade crochet baby booties, caps, rattles, name garlands and newborn gift hampers from BloomyCocoon in Mampad, Kerala. Delivery across India.',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Baby Shower Gifts',
  },
  'screen-return-gifts': {
    path: '/return-gifts',
    outputDir: 'return-gifts',
    title: 'Handmade Crochet Return Gifts & Favors in Kerala | BloomyCocoon',
    description: 'Charming handmade crochet return gifts, keychains, single flower stems and party favors starting from ₹149 for birthdays and weddings in Kerala. Bulk quotes on WhatsApp.',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Return Gifts & Favors',
  },
};

export const OCCASION_PRODUCTS = {
  'screen-anniversary-gifts': [
    'couple-bouquet-combo',
    'anniversary-gift-box',
    'rose-bouquet',
    'tulip-bouquet',
    'custom-premium-bouquet',
    'couple-keychain-set',
    'couple-keychain-combo',
    'lavender-bouquet',
    'heart-keychain',
    'custom-crochet-hamper',
  ],
  'screen-birthday-gifts': [
    'birthday-mini-gift-box',
    'plushie-flower-combo',
    'mini-bouquet-note-card',
    'single-sunflower-stem',
    'bunny-plushie',
    'mini-teddy-plushie',
    'cat-plushie',
    'strawberry-keychain',
    'crochet-tote-bag',
    'custom-animal-plushie',
    'custom-crochet-hamper',
  ],
  'screen-baby-shower-gifts': [
    'baby-shower-mini-set',
    'newborn-gift-hamper',
    'baby-booties-cap-set',
    'baby-booties',
    'baby-cap',
    'baby-mittens',
    'baby-rattle',
    'baby-name-garland',
    'baby-bunny-plushie',
    'baby-bear-plushie',
    'baby-gift-combo',
  ],
  'screen-return-gifts': [
    'single-crochet-rose',
    'single-crochet-tulip',
    'strawberry-keychain',
    'heart-keychain',
    'flower-keychain',
    'crochet-bow-clip',
    'crochet-scrunchie',
    'crochet-coaster',
    'crochet-bracelet',
    'mini-pocket-plushies',
    'keychain-flower-combo',
  ],
};

export const ROUTE_SCREEN_IDS = Object.keys(ROUTE_CONTENT);
export const STATIC_ROUTE_SCREEN_IDS = ROUTE_SCREEN_IDS.filter(screenId => screenId !== 'screen-home');

const CATEGORY_LIST = [
  'Bouquets',
  'Plushies',
  'Keychains',
  'Baby Gifts',
  'Accessories',
  'Home Decor',
  'Gift Combos',
];

export function getRouteContent(screenId) {
  return ROUTE_CONTENT[screenId] || ROUTE_CONTENT['screen-home'];
}

export function getRouteCanonical(screenId) {
  const route = getRouteContent(screenId);
  return `${SITE_ORIGIN}${route.path}`;
}

export function getRouteMetadata(screenId) {
  const route = getRouteContent(screenId);
  return {
    title: route.title,
    description: route.description,
    canonical: getRouteCanonical(screenId),
  };
}

export function getBreadcrumbList(screenId) {
  const route = getRouteContent(screenId);
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: CANONICAL_URL,
    },
  ];

  if (screenId !== 'screen-home') {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: route.breadcrumbName,
      item: getRouteCanonical(screenId),
    });
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${getRouteCanonical(screenId)}#breadcrumb`,
    itemListElement,
  };
}

const CATEGORY_LABELS = {
  bouquets: 'Bouquets',
  plushies: 'Plushies',
  keychains: 'Keychains',
  'baby-gifts': 'Baby Gifts',
  accessories: 'Accessories',
  'home-decor': 'Home & Decor',
  'gift-combos': 'Gift Combos',
};

export function getProductSchema(product) {
  const productUrl = `${SITE_ORIGIN}/collections#${product.id}`;
  const imageUrl = product.image ? `${SITE_ORIGIN}/${product.image}` : `${SITE_ORIGIN}/images/hero_crochet_scene.png`;
  const safePrice = Number(product.startingPrice) || 149;

  return {
    '@type': 'Product',
    '@id': `${productUrl}-product`,
    name: product.name,
    description: product.description || `Handmade crochet ${product.name} crafted in Kerala by BloomyCocoon.`,
    image: imageUrl,
    sku: product.id,
    category: CATEGORY_LABELS[product.category] || 'Handmade',
    brand: {
      '@type': 'Brand',
      name: 'BloomyCocoon',
    },
    offers: {
      '@type': 'Offer',
      price: String(safePrice),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      priceValidUntil: '2027-12-31',
      seller: {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
      },
    },
  };
}

export function getRoutePageSchema(screenId, { faqItems = [], products = [] } = {}) {
  const route = getRouteContent(screenId);
  const canonical = getRouteCanonical(screenId);

  if (route.schemaType === 'FAQPage') {
    return {
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      url: canonical,
      name: route.title,
      description: route.description,
      mainEntity: faqItems,
    };
  }

  if (route.schemaType === 'Service') {
    return {
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: route.title,
      description: `${route.description} ${PAYMENT_DESCRIPTION}`,
      areaServed: ['Kerala', 'India'],
      provider: {
        '@id': `${SITE_ORIGIN}/#localbusiness`,
      },
      serviceType: 'Custom crochet gifts',
    };
  }

  const page = {
    '@type': route.schemaType,
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: route.title,
    description: route.schemaType === 'AboutPage' ? ENTITY_DESCRIPTION : route.description,
    isPartOf: {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    about: {
      '@id': route.schemaType === 'AboutPage' ? `${SITE_ORIGIN}/#organization` : `${SITE_ORIGIN}/#localbusiness`,
    },
  };

  if (route.schemaType === 'CollectionPage') {
    const isOccasion = Boolean(OCCASION_PRODUCTS[screenId]);
    const filteredProducts = isOccasion
      ? products.filter(p => OCCASION_PRODUCTS[screenId].includes(p.id))
      : products;

    if (filteredProducts && filteredProducts.length > 0) {
      page.mainEntity = {
        '@type': 'ItemList',
        name: isOccasion ? route.title : 'BloomyCocoon Handmade Crochet Gift Collection',
        description: route.description,
        numberOfItems: filteredProducts.length,
        itemListElement: filteredProducts.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: getProductSchema(product),
        })),
      };
    } else {
      page.mainEntity = {
        '@type': 'ItemList',
        name: 'BloomyCocoon handmade crochet gift categories',
        itemListElement: CATEGORY_LIST.map((name, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
        })),
      };
    }
  }

  if (route.schemaType === 'ContactPage') {
    page.mainEntity = {
      '@id': `${SITE_ORIGIN}/#localbusiness`,
    };
  }

  return page;
}

export function getRouteSchemaGraph(screenId, options = {}) {
  const graph = [getBreadcrumbList(screenId), getRoutePageSchema(screenId, options)];
  if (options.faqItems && options.faqItems.length > 0 && ROUTE_CONTENT[screenId]?.schemaType !== 'FAQPage') {
    const canonical = getRouteCanonical(screenId);
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      url: canonical,
      name: `${ROUTE_CONTENT[screenId]?.title || 'Gifting'} FAQ`,
      mainEntity: options.faqItems,
    });
  }
  return graph;
}

