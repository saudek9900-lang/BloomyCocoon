import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  ROUTE_CONTENT,
  ROUTE_SCHEMA_ID,
  STATIC_ROUTE_SCREEN_IDS,
  OCCASION_PRODUCTS,
  CATEGORY_PAGES,
  getCategoryLabel,
  getCategoryPath,
  getRouteMetadata,
  getRouteSchemaGraph,
  getProductRouteMetadata,
  getProductSchemaGraph,
} from '../src/route-content.mjs';
import {
  renderCollectionProductsHtml,
  getProductImage,
  getResponsiveWebpSrcset,
} from '../src/product-cards.mjs';
import { generateSitemapXml, generateLlmsFullTxt } from '../src/sitemap-generator.mjs';
import { generateGoogleMerchantXml } from '../src/merchant-feed-generator.mjs';

const DIST_DIR = path.resolve('dist');
const PUBLIC_DIR = path.resolve('public');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const CATALOG_PATH = path.resolve('src/catalog.json');
const hasPublicWebp = (relPath) => existsSync(path.join(PUBLIC_DIR, String(relPath || '').replace(/^\/+/, '')));
const catalog = JSON.parse(await readFile(CATALOG_PATH, 'utf8'));
const preRenderedProductsHtml = renderCollectionProductsHtml(catalog);

const OCCASION_GRID_MAP = {
  'screen-anniversary-gifts': 'anniversary-product-grid',
  'screen-birthday-gifts': 'birthday-product-grid',
  'screen-baby-shower-gifts': 'baby-shower-product-grid',
  'screen-return-gifts': 'return-gifts-product-grid',
};

const CATEGORY_GRID_MAP = {
  'screen-crochet-bouquets': 'crochet-bouquets-product-grid',
  'screen-crochet-plushies': 'crochet-plushies-product-grid',
  'screen-crochet-keychains': 'crochet-keychains-product-grid',
  'screen-crochet-baby-gifts': 'crochet-baby-gifts-product-grid',
  'screen-crochet-accessories': 'crochet-accessories-product-grid',
  'screen-crochet-home-decor': 'crochet-home-decor-product-grid',
  'screen-crochet-gift-combos': 'crochet-gift-combos-product-grid',
};

function injectPreRenderedProducts(html) {
  const pattern = /(<div\b[^>]*\bid=["']collection-product-grid["'][^>]*>)([\s\S]*?)(<\/div>)/i;
  if (!pattern.test(html)) {
    throw new Error('Could not find #collection-product-grid in HTML.');
  }
  let next = html.replace(pattern, `$1\n${preRenderedProductsHtml}\n$3`);

  for (const [screenId, gridId] of Object.entries(OCCASION_GRID_MAP)) {
    const productIds = OCCASION_PRODUCTS[screenId];
    if (!productIds) continue;
    const occasionCatalog = catalog.filter((p) => productIds.includes(p.id));
    const occasionHtml = renderCollectionProductsHtml(occasionCatalog);
    const gridPattern = new RegExp(`(<div\\b[^>]*\\bid=["']${gridId}["'][^>]*>)([\\s\\S]*?)(<\\/div>)`, 'i');
    if (gridPattern.test(next)) {
      next = next.replace(gridPattern, `$1\n${occasionHtml}\n$3`);
    }
  }

  for (const [screenId, gridId] of Object.entries(CATEGORY_GRID_MAP)) {
    const categoryId = CATEGORY_PAGES[screenId];
    if (!categoryId) continue;
    const categoryCatalog = catalog.filter((p) => p.category === categoryId);
    const categoryHtml = renderCollectionProductsHtml(categoryCatalog);
    const gridPattern = new RegExp(`(<div\\b[^>]*\\bid=["']${gridId}["'][^>]*>)([\\s\\S]*?)(<\\/div>)`, 'i');
    if (gridPattern.test(next)) {
      next = next.replace(gridPattern, `$1\n${categoryHtml}\n$3`);
    }
  }

  return next;
}

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

function stripIconText(value) {
  return String(value)
    .replace(/<span\b(?=[^>]*\bclass=["'][^"']*\bmaterial-symbols(?:-outlined)?\b)[^>]*>[\s\S]*?<\/span>/gi, ' ')
    .replace(/\b(?:expand_more|keyboard_arrow_\w+|chevron_\w+|chevron)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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
  next = next.replace(
    /<link\s+rel=["']alternate["']\s+hreflang=["']en-IN["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="alternate" hreflang="en-IN" href="${canonical}">`,
  );
  next = next.replace(
    /<link\s+rel=["']alternate["']\s+hreflang=["']x-default["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${canonical}">`,
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
  if (metadata.image) {
    next = next.replace(
      /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:image" content="${escapeHtml(metadata.image)}">`,
    );
    next = next.replace(
      /<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:image" content="${escapeHtml(metadata.image)}">`,
    );
  }
  next = next.replace(/\s*<meta\s+property=["']product:[^"']+["'][^>]*>/gi, '');
  const ogType = metadata.isProduct ? 'product' : 'website';
  let ogTypeMarkup = `<meta property="og:type" content="${ogType}">`;
  if (metadata.isProduct) {
    const productTags = [
      `    <meta property="product:price:amount" content="${metadata.price}">`,
      `    <meta property="product:price:currency" content="INR">`,
      `    <meta property="product:availability" content="in stock">`,
      `    <meta property="product:condition" content="new">`,
      `    <meta property="product:retailer_item_id" content="${escapeHtml(metadata.id)}">`,
      `    <meta property="product:brand" content="BloomyCocoon">`,
      `    <meta property="product:category" content="${escapeHtml(metadata.category)}">`,
    ].join('\n');
    ogTypeMarkup += `\n${productTags}`;
  }
  next = next.replace(
    /<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/i,
    ogTypeMarkup,
  );
  if (metadata.robots) {
    next = next.replace(
      /<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="robots" content="${escapeHtml(metadata.robots)}">`,
    );
  }
  return next;
}

function isolateScreen(html, activeScreenId) {
  const screenBounds = [];
  const regex = /<section\b[^>]*\bid=["'](screen-[^"']+)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const id = match[1];
    const start = match.index;
    let depth = 0;
    const tagRegex = /<\/?section\b[^>]*>/gi;
    tagRegex.lastIndex = start;
    let tagMatch;
    let end = -1;
    while ((tagMatch = tagRegex.exec(html)) !== null) {
      if (tagMatch[0].startsWith('</')) {
        depth--;
        if (depth === 0) {
          end = tagMatch.index + tagMatch[0].length;
          break;
        }
      } else {
        depth++;
      }
    }
    if (end > start) {
      screenBounds.push({ id, start, end });
    }
  }

  screenBounds.sort((a, b) => b.start - a.start);

  let next = html;
  for (const screen of screenBounds) {
    if (screen.id !== activeScreenId) {
      next = next.slice(0, screen.start) + next.slice(screen.end);
    } else {
      const screenChunk = next.slice(screen.start, screen.end);
      const updatedChunk = screenChunk.replace(
        /(<section\b[^>]*\bclass=["'])([^"']*)(["'][^>]*>)/i,
        (m, prefix, classList, suffix) => {
          const classes = classList
            .split(/\s+/)
            .filter(Boolean)
            .filter((c) => c !== 'hidden' && c !== 'active');
          classes.push('active');
          return `${prefix}${classes.join(' ')}${suffix}`;
        }
      );
      next = next.slice(0, screen.start) + updatedChunk + next.slice(screen.end);
    }
  }

  return next;
}

function restoreFaqFocusOutline(html) {
  return html.replace(
    /(<summary\b[^>]*\bclass=["'][^"']*)\s+focus:outline-none\b/gi,
    '$1',
  );
}

function extractFaqItems(html) {
  const items = [];
  const faqPattern = /<details\b[^>]*class=["'][^"']*\bfaq-details\b[^"']*["'][^>]*>([\s\S]*?)<\/details>/gi;
  for (const match of html.matchAll(faqPattern)) {
    const detailsHtml = match[1];
    const summaryMatch = detailsHtml.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    const answerMatch = detailsHtml.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    const question = summaryMatch ? stripTags(stripIconText(summaryMatch[1])) : '';
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

function extractFaqItemsForScreen(html, screenId) {
  const screenStart = html.indexOf(`id="${screenId}"`);
  if (screenStart === -1) return [];
  const nextScreen = html.indexOf('<section class="screen', screenStart + 1);
  const screenChunk = nextScreen !== -1 ? html.slice(screenStart, nextScreen) : html.slice(screenStart);
  return extractFaqItems(screenChunk);
}

function insertRouteSchema(html, screenId, baseHtml) {
  const route = ROUTE_CONTENT[screenId];
  const faqItems = extractFaqItemsForScreen(baseHtml, screenId);
  if (route.schemaType === 'FAQPage' && faqItems.length === 0) {
    throw new Error('Could not extract visible FAQ items from built HTML.');
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': getRouteSchemaGraph(screenId, { faqItems, products: catalog, hasWebp: hasPublicWebp }),
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

async function writeRouteHtml(baseHtml, screenId) {
  const route = ROUTE_CONTENT[screenId];
  const routeHtml = insertRouteSchema(
    updateMetadata(ensureUnifiedFooter(isolateScreen(baseHtml, screenId)), getRouteMetadata(screenId)),
    screenId,
    baseHtml,
  );
  const outputDir = path.join(DIST_DIR, route.outputDir);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), routeHtml);
}

function injectProductDetail(html, product, catalog) {
  const image = getProductImage(product);
  const webpSrcset = getResponsiveWebpSrcset(image);
  const safePrice = Number(product.startingPrice) || 149;
  const categoryLabel = getCategoryLabel(product.category);
  const categoryPath = getCategoryPath(product.category);
  const waMessage = encodeURIComponent(`Hi BloomyCocoon, I would like to order the ${product.name} (Starting from ₹${safePrice}). What colors and custom options are available?`);

  // Find 4 related products
  const sameCategory = catalog.filter((p) => p.id !== product.id && p.category === product.category);
  const otherCategory = catalog.filter((p) => p.id !== product.id && p.category !== product.category);
  const relatedProducts = [...sameCategory, ...otherCategory].slice(0, 4);
  const relatedHtml = renderCollectionProductsHtml(relatedProducts);

  let next = html;

  // 1. Breadcrumbs
  const breadcrumbNav = `<nav aria-label="Breadcrumb" class="mb-6 text-xs text-on-surface-variant flex items-center flex-wrap gap-1.5" id="detail-breadcrumbs" itemscope itemtype="https://schema.org/BreadcrumbList">
                    <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a href="/" itemprop="item" class="hover:text-secondary transition-colors"><span itemprop="name">Home</span></a>
                        <meta itemprop="position" content="1">
                    </span>
                    <span class="text-outline-variant" aria-hidden="true">/</span>
                    <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a href="/collections" itemprop="item" class="hover:text-secondary transition-colors"><span itemprop="name">Handmade Collection</span></a>
                        <meta itemprop="position" content="2">
                    </span>
                    <span class="text-outline-variant" aria-hidden="true">/</span>
                    <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a href="${escapeHtml(categoryPath)}" id="detail-breadcrumb-cat" itemprop="item" class="hover:text-secondary transition-colors"><span itemprop="name">${escapeHtml(categoryLabel)}</span></a>
                        <meta itemprop="position" content="3">
                    </span>
                    <span class="text-outline-variant" aria-hidden="true">/</span>
                    <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <span id="detail-breadcrumb-name" itemprop="name" class="text-on-surface font-semibold truncate max-w-[200px]">${escapeHtml(product.name)}</span>
                        <meta itemprop="position" content="4">
                    </span>
                </nav>`;
  next = next.replace(/<nav\b[^>]*\bid=["']detail-breadcrumbs["'][^>]*>[\s\S]*?<\/nav>/i, breadcrumbNav);

  // 2. Picture
  const webpFull = `/${image.replace(/^\//, '').replace(/\.png$/i, '.webp')}`;
  const webpThumb = `/${image.replace(/^\//, '').replace(/\.png$/i, '-320.webp')}`;
  const pictureMarkup = `<picture id="detail-product-picture" class="contents">
                                <source srcset="${escapeHtml(webpSrcset)}" sizes="(min-width: 768px) 50vw, 92vw" type="image/webp">
                                <img id="detail-product-img" src="${escapeHtml(webpFull)}" alt="${escapeHtml(product.name)} - Handmade crochet gift by BloomyCocoon" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" width="600" height="450" loading="eager" fetchpriority="high" decoding="async">
                            </picture>`;
  next = next.replace(/<picture\b[^>]*\bid=["']detail-product-picture["'][^>]*>[\s\S]*?<\/picture>/i, pictureMarkup);

  // 3. Badge
  const badgeClass = product.badge
    ? 'absolute top-4 left-4 bg-secondary text-white text-xs font-label-md px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm'
    : 'absolute top-4 left-4 bg-secondary text-white text-xs font-label-md px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm hidden';
  const badgeMarkup = `<span id="detail-product-badge" class="${badgeClass}">${escapeHtml(product.badge || '')}</span>`;
  next = next.replace(/<span\b[^>]*\bid=["']detail-product-badge["'][^>]*>[\s\S]*?<\/span>/i, badgeMarkup);

  // 4. Category
  next = next.replace(
    /(<span\b[^>]*\bid=["']detail-product-category["'][^>]*>)([\s\S]*?)(<\/span>)/i,
    `$1${escapeHtml(categoryLabel)}$3`
  );

  // 5. Name
  next = next.replace(
    /(<h1\b[^>]*\bid=["']detail-product-name["'][^>]*>)([\s\S]*?)(<\/h1>)/i,
    `$1${escapeHtml(product.name)}$3`
  );

  // 6. Price
  next = next.replace(
    /(<span\b[^>]*\bid=["']detail-product-price["'][^>]*>)([\s\S]*?)(<\/span>)/i,
    `$1Starting from ₹${safePrice}$3`
  );

  // 7. Description
  next = next.replace(
    /(<p\b[^>]*\bid=["']detail-product-desc["'][^>]*>)([\s\S]*?)(<\/p>)/i,
    `$1${escapeHtml(product.description || '')}$3`
  );

  // 8. Add to Cart button
  next = next.replace(
    /<button\b[^>]*\bid=["']detail-add-to-cart-btn["'][^>]*>([\s\S]*?)<\/button>/i,
    `<button type="button" id="detail-add-to-cart-btn" data-add-to-cart="${escapeHtml(product.id)}" aria-controls="sideCart" onclick="handleDetailAddToCart()" class="flex-1 min-h-[48px] bg-secondary text-white py-3 px-6 rounded-full font-label-md text-sm md:text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"><span class="material-symbols-outlined text-[20px]" aria-hidden="true">add_shopping_cart</span><span id="detail-add-to-cart-text">Add to Cart</span></button>`
  );

  // 9. WhatsApp button
  next = next.replace(
    /<a\b[^>]*\bid=["']detail-whatsapp-btn["'][^>]*>([\s\S]*?)<\/a>/i,
    `<a id="detail-whatsapp-btn" href="https://wa.me/919061174579?text=${waMessage}" target="_blank" rel="noopener" class="min-h-[48px] bg-[#075E54] text-white py-3 px-6 rounded-full font-label-md text-sm md:text-base flex items-center justify-center gap-2 hover:bg-[#064e46] active:scale-95 transition-all shadow-sm cursor-pointer"><span class="material-symbols-outlined text-[20px]" aria-hidden="true">chat</span><span>Order on WhatsApp</span></a>`
  );

  // 10. Sticky Mobile Bar
  next = next.replace(
    /<img\b[^>]*\bid=["']detail-sticky-img["'][^>]*>/i,
    `<img id="detail-sticky-img" src="${escapeHtml(webpThumb)}" alt="${escapeHtml(product.name)}" class="w-11 h-11 rounded-xl object-cover border border-outline-variant/20 shrink-0" width="44" height="44" loading="lazy" decoding="async">`
  );
  next = next.replace(
    /(<span\b[^>]*\bid=["']detail-sticky-name["'][^>]*>)([\s\S]*?)(<\/span>)/i,
    `$1${escapeHtml(product.name)}$3`
  );
  next = next.replace(
    /(<span\b[^>]*\bid=["']detail-sticky-price["'][^>]*>)([\s\S]*?)(<\/span>)/i,
    `$1Starting from ₹${safePrice}$3`
  );
  next = next.replace(
    /<a\b[^>]*\bid=["']detail-sticky-wa-btn["'][^>]*>([\s\S]*?)<\/a>/i,
    `<a id="detail-sticky-wa-btn" href="https://wa.me/919061174579?text=${waMessage}" target="_blank" rel="noopener" class="bg-[#075E54] hover:bg-[#064e46] text-white w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-all shadow-xs min-h-[44px] min-w-[44px]" aria-label="Order on WhatsApp"><span class="material-symbols-outlined text-[20px]" aria-hidden="true">chat</span></a>`
  );

  // 11. Lightbox Image
  next = next.replace(
    /<img\b[^>]*\bid=["']lightbox-img["'][^>]*>/i,
    `<img id="lightbox-img" src="${escapeHtml(webpFull)}" alt="${escapeHtml(product.name)} - Handcrafted crochet stitch detail" class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl transition-transform duration-300" loading="lazy" decoding="async">`
  );

  // 12. Related products grid
  next = next.replace(
    /(<div\b[^>]*\bid=["']detail-related-products-grid["'][^>]*>)([\s\S]*?)(<\/div>)/i,
    `$1\n${relatedHtml}\n$3`
  );

  return next;
}

const UNIFIED_FOOTER_HTML = `<footer class="bg-surface-container py-10 md:py-xl mt-10 md:mt-xl border-t border-outline-variant/10">
                <div class="max-w-container-max mx-auto px-4 sm:px-6 md:px-lg flex flex-col items-center gap-base text-center">
                    <a data-nav-logo class="nav-logo cursor-pointer flex items-center justify-center gap-0 mb-sm" href="/">
                        <span class="font-display-lg text-[36px] md:text-[38px] tracking-tight text-secondary font-serif">
                            <span class="italic font-normal">Bloomy</span><span class="font-bold">Cocoon</span>
                        </span>
                    </a>
                    <p class="font-body-md text-on-surface-variant max-w-2xl">BloomyCocoon — handmade crochet gifts from Mampad, Malappuram, Kerala. Delivering across Kerala and India.</p>
                    <nav class="flex flex-wrap justify-center gap-6 md:gap-lg my-md" aria-label="Footer navigation">
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/">Home</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/collections">Handmade Collection</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/custom-order">Custom Orders</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/anniversary-gifts">Anniversary Gifts</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/birthday-gifts">Birthday Gifts</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/baby-shower-gifts">Baby Shower Gifts</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/return-gifts">Return Gifts</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/about">About Us</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/faq">FAQ</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/contact">Contact Us</a>
                        <a data-policy-footer-links class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/shipping-delivery">Shipping &amp; Delivery</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/returns-cancellations">Returns &amp; Cancellations</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/privacy-policy">Privacy Policy</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/order-terms">Order Terms</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="/crochet-care">Crochet Care</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" target="_blank" rel="noopener" href="https://www.instagram.com/bloomy_cocoon_/">Instagram</a>
                        <a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" target="_blank" rel="noopener" href="https://wa.me/919061174579" data-whatsapp-message="Hi BloomyCocoon, I would like to enquire about your handmade crochet gifts.">WhatsApp</a>
                    </nav>
                    <p class="font-caption text-caption text-on-surface-variant">© 2026 BloomyCocoon. Crafted for your moments.</p>
                </div>
            </footer>`;

function ensureUnifiedFooter(html) {
  return html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, UNIFIED_FOOTER_HTML);
}

function insertProductSchema(html, product, baseHtml) {
  const faqItems = extractFaqItemsForScreen(baseHtml, 'screen-product-detail');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': getProductSchemaGraph(product, { faqItems, hasWebp: hasPublicWebp }),
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

function injectHomeHeroPreload(html) {
  const heroMatch = html.match(
    /<picture\b[^>]*>\s*<source\b[^>]*\bsrcset=["']([^"']*hero_crochet_scene[^"']*)["'][^>]*\bsizes=["']([^"']+)["'][^>]*>\s*<img\b[^>]*\bfetchpriority=["']high["']/i
  );
  if (!heroMatch) return html;
  const [, heroSrcset, heroSizes] = heroMatch;
  const preloadTag = `    <link rel="preload" as="image" imagesrcset="${escapeHtml(heroSrcset)}" imagesizes="${escapeHtml(heroSizes)}" fetchpriority="high">`;
  return replaceOne(html, /<\/head>/i, `${preloadTag}\n</head>`, 'closing head tag for hero preload');
}

async function writeProductHtml(baseHtml, product, catalog) {
  const metadata = getProductRouteMetadata(product);
  metadata.isProduct = true;
  const detailHtml = injectProductDetail(baseHtml, product, catalog);
  const initialHtml = ensureUnifiedFooter(isolateScreen(detailHtml, 'screen-product-detail'));
  const metaHtml = updateMetadata(initialHtml, metadata);
  const finalHtml = insertProductSchema(metaHtml, product, baseHtml);
  const outputDir = path.join(DIST_DIR, 'products', product.id);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), finalHtml);
}

const rawBaseHtml = restoreFaqFocusOutline(await readFile(INDEX_PATH, 'utf8'));
const baseHtml = injectPreRenderedProducts(rawBaseHtml);
await writeFile(
  INDEX_PATH,
  injectHomeHeroPreload(
    insertRouteSchema(
      updateMetadata(ensureUnifiedFooter(isolateScreen(baseHtml, 'screen-home')), getRouteMetadata('screen-home')),
      'screen-home',
      baseHtml,
    ),
  ),
);

for (const screenId of STATIC_ROUTE_SCREEN_IDS) {
  await writeRouteHtml(baseHtml, screenId);
}

console.log(`Generated route HTML for ${STATIC_ROUTE_SCREEN_IDS.map((screenId) => ROUTE_CONTENT[screenId].path).join(', ')}`);

for (const product of catalog) {
  await writeProductHtml(baseHtml, product, catalog);
}
console.log(`Generated route HTML for ${catalog.length} standalone product pages under /products/`);

// Generate sitemap.xml with image entries
const sitemapXml = generateSitemapXml(catalog);
await writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml);
await writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
console.log('Generated sitemap.xml with product image entries');

// Generate llms-full.txt with complete catalog
const baseLlms = await readFile(path.join(PUBLIC_DIR, 'llms.txt'), 'utf8');
const llmsFullTxt = generateLlmsFullTxt(catalog, baseLlms);
await writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt);
await writeFile(path.join(DIST_DIR, 'llms-full.txt'), llmsFullTxt);
console.log('Generated llms-full.txt with 69 catalog products');

// Generate Google Merchant Center XML feed
const merchantXml = generateGoogleMerchantXml(catalog);
await writeFile(path.join(PUBLIC_DIR, 'google-merchant-feed.xml'), merchantXml);
await writeFile(path.join(DIST_DIR, 'google-merchant-feed.xml'), merchantXml);
console.log('Generated google-merchant-feed.xml for 69 catalog products');
