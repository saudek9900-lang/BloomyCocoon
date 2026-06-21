import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_ORIGIN = 'https://www.bloomycocoon.com';
const DIST_DIR = path.resolve('dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const ROUTE_SCHEMA_ID = 'catalog-faq-schema';

const homeMetadata = {
  title: 'Handmade Crochet Gifts in Kerala & India | BloomyCocoon',
  description:
    'BloomyCocoon creates handmade crochet bouquets, plushies, keychains, accessories, baby gifts, home decor and custom crochet gifts from Mampad, Malappuram, Kerala, with delivery across Kerala and India.',
  canonical: `${SITE_ORIGIN}/`,
};

const routes = [
  {
    path: '/collections',
    outputDir: 'collections',
    title: 'Crochet Bouquets, Plushies, Keychains & Handmade Gifts | BloomyCocoon',
    description:
      'Explore BloomyCocoon handmade crochet gifts including bouquets, plushies, keychains, baby gifts, accessories, home decor and gift combos. Prices are starting from and final orders are confirmed on WhatsApp.',
    schemaType: 'CollectionPage',
    breadcrumbName: 'Handmade Collection',
  },
  {
    path: '/custom-order',
    outputDir: 'custom-order',
    title: 'Custom Crochet Gifts in Kerala | BloomyCocoon',
    description:
      'Create a custom crochet gift with BloomyCocoon. Share your colour, size, flower, plushie, name, packaging and delivery preferences, then confirm the final quote on WhatsApp.',
    schemaType: 'Service',
    breadcrumbName: 'Custom Orders',
  },
  {
    path: '/about',
    outputDir: 'about',
    title: 'About BloomyCocoon | Handmade Crochet Brand from Malappuram, Kerala',
    description:
      'Learn about BloomyCocoon, a soft and cozy handmade crochet gifting brand from Mampad, Malappuram, Kerala, making delicate custom gifts for birthdays, couples, babies and special moments.',
    schemaType: 'AboutPage',
    breadcrumbName: 'About BloomyCocoon',
  },
  {
    path: '/faq',
    outputDir: 'faq',
    title: 'BloomyCocoon FAQ | Crochet Orders, Delivery & Care',
    description:
      'Find answers about BloomyCocoon crochet orders, custom gifts, starting prices, WhatsApp confirmation, payment, delivery across Kerala and India, timelines and handmade product care.',
    schemaType: 'FAQPage',
    breadcrumbName: 'BloomyCocoon FAQ',
  },
  {
    path: '/contact',
    outputDir: 'contact',
    title: 'Contact BloomyCocoon | WhatsApp Crochet Gift Orders',
    description:
      'Contact BloomyCocoon for handmade crochet bouquets, plushies, baby gifts, keychains, accessories and custom crochet gifts. Orders and final quotes are confirmed on WhatsApp.',
    schemaType: 'ContactPage',
    breadcrumbName: 'Contact BloomyCocoon',
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function decodeHtml(value) {
  return String(value)
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(value) {
  return decodeHtml(String(value).replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function replaceOne(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${label} in built HTML.`);
  }
  return html.replace(pattern, replacement);
}

function removeRouteSchema(html) {
  const pattern = new RegExp(
    String.raw`\s*<script\b(?=[^>]*\bid=["']${ROUTE_SCHEMA_ID}["'])(?=[^>]*\btype=["']application/ld\+json["'])[^>]*>[\s\S]*?<\/script>`,
    'i',
  );
  return html.replace(pattern, '');
}

function updateMetadata(html, metadata) {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonical = escapeHtml(metadata.canonical);

  let next = removeRouteSchema(html);
  next = replaceOne(next, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`, 'title');
  next = replaceOne(
    next,
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="description" content="${description}">`,
    'meta description',
  );
  next = replaceOne(
    next,
    /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="canonical" href="${canonical}">`,
    'canonical link',
  );
  next = replaceOne(
    next,
    /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:url" content="${canonical}">`,
    'og:url',
  );
  next = replaceOne(
    next,
    /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:title" content="${title}">`,
    'og:title',
  );
  next = replaceOne(
    next,
    /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:description" content="${description}">`,
    'og:description',
  );
  next = replaceOne(
    next,
    /<meta\s+property=["']twitter:url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="twitter:url" content="${canonical}">`,
    'twitter:url',
  );
  next = replaceOne(
    next,
    /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:title" content="${title}">`,
    'twitter:title',
  );
  next = replaceOne(
    next,
    /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:description" content="${description}">`,
    'twitter:description',
  );
  return next;
}

function getBreadcrumbList(route) {
  const canonical = `${SITE_ORIGIN}${route.path}`;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: route.breadcrumbName,
        item: canonical,
      },
    ],
  };
}

function extractFaqItems(html) {
  const items = [];
  const faqPattern = /<details\b[^>]*class=["'][^"']*\bfaq-details\b[^"']*["'][^>]*>([\s\S]*?)<\/details>/gi;
  for (const match of html.matchAll(faqPattern)) {
    const detailsHtml = match[1];
    const summaryMatch = detailsHtml.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    const answerMatch = detailsHtml.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    const question = summaryMatch ? stripTags(summaryMatch[1]) : '';
    const answer = answerMatch ? stripTags(answerMatch[1]) : '';
    if (!question || !answer) continue;
    items.push({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    });
  }
  return items;
}

function getRoutePageSchema(route, baseHtml) {
  const canonical = `${SITE_ORIGIN}${route.path}`;
  if (route.schemaType === 'FAQPage') {
    const faqItems = extractFaqItems(baseHtml);
    if (faqItems.length === 0) {
      throw new Error('Could not extract visible FAQ items from built HTML.');
    }
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
      description: route.description,
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
    description: route.description,
    isPartOf: {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    about: {
      '@id': route.path === '/about' ? `${SITE_ORIGIN}/#organization` : `${SITE_ORIGIN}/#localbusiness`,
    },
  };

  if (route.schemaType === 'CollectionPage') {
    page.mainEntity = {
      '@type': 'ItemList',
      name: 'BloomyCocoon handmade crochet gift categories',
      itemListElement: [
        'Bouquets',
        'Plushies',
        'Keychains',
        'Baby Gifts',
        'Accessories',
        'Home Decor',
        'Gift Combos',
      ].map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
      })),
    };
  }

  return page;
}

function insertRouteSchema(html, route, baseHtml) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [getBreadcrumbList(route), getRoutePageSchema(route, baseHtml)],
  };
  const script = [
    `    <script type="application/ld+json" id="${ROUTE_SCHEMA_ID}">`,
    JSON.stringify(schema, null, 2)
      .split('\n')
      .map((line) => `    ${line}`)
      .join('\n'),
    '    </script>',
  ].join('\n');

  return replaceOne(html, /<\/head>/i, `${script}\n</head>`, 'closing head tag');
}

async function writeRouteHtml(baseHtml, route) {
  const metadata = {
    title: route.title,
    description: route.description,
    canonical: `${SITE_ORIGIN}${route.path}`,
  };
  const routeHtml = insertRouteSchema(updateMetadata(baseHtml, metadata), route, baseHtml);
  const outputDir = path.join(DIST_DIR, route.outputDir);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), routeHtml);
}

const baseHtml = await readFile(INDEX_PATH, 'utf8');
await writeFile(INDEX_PATH, updateMetadata(baseHtml, homeMetadata));

for (const route of routes) {
  await writeRouteHtml(baseHtml, route);
}

console.log(`Generated route HTML for ${routes.map((route) => route.path).join(', ')}`);
