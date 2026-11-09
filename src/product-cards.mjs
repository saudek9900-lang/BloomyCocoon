const responsiveImageWidths = [320, 480, 640];
const responsiveImagePaths = new Set([
  'images/hero_crochet_scene.png',
  'images/mixed_luxury_bouquet.png',
  'images/mixed_luxury_bouquet_custom-premium-bouquet.png',
  'images/mixed_luxury_bouquet_couple-bouquet-combo.png',
  'images/crochet_cat_plushie.png',
  'images/crochet_cat_plushie_cat-plushie.png',
  'images/strawberry_keychain.png',
  'images/strawberry_keychain_strawberry-keychain.png',
  'images/crochet_tote_bag.png',
  'images/crochet_tote_bag_crochet-tote-bag.png',
  'images/crochet_wall_hanging.png',
  'images/crochet_wall_hanging_wall-hanging.png',
  'images/about_process.png',
  'images/yarn_storage.png',
  'images/contact_workspace.png'
]);

const collectionCategories = [
  { id: 'bouquets', label: 'Bouquets' },
  { id: 'plushies', label: 'Plushies' },
  { id: 'keychains', label: 'Keychains' },
  { id: 'baby-gifts', label: 'Baby Gifts' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'home-decor', label: 'Home & Decor' },
  { id: 'gift-combos', label: 'Gift Combos' }
];

const categoryFallbackImages = {
  bouquets: 'images/mixed_luxury_bouquet.png',
  plushies: 'images/cozy_bear_plushie.png',
  keychains: 'images/mini_animal_keychain.png',
  'baby-gifts': 'images/crochet_bunny_plush.png',
  accessories: 'images/crochet_tote_bag.png',
  'home-decor': 'images/crochet_wall_hanging.png',
  'gift-combos': 'images/hero_crochet_scene.png',
  default: 'images/hero_crochet_scene.png'
};

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getSafePrice(price) {
  const num = Number(price);
  return Number.isFinite(num) && num > 0 ? num : 0;
}

function formatPrice(price) {
  return getSafePrice(price).toLocaleString('en-IN');
}

function formatStartingPrice(price) {
  const safePrice = getSafePrice(price);
  return safePrice > 0 ? `₹${formatPrice(safePrice)}` : 'Confirm on WhatsApp';
}

function getProductImage(product) {
  return product.image || categoryFallbackImages[product.category] || categoryFallbackImages.default;
}

function getWebpImagePath(imagePath) {
  return imagePath.replace(/\.png$/i, '.webp');
}

function getResponsiveWebpSrcset(imagePath) {
  const webpPath = getWebpImagePath(imagePath);
  if (!responsiveImagePaths.has(imagePath)) return webpPath;
  const basePath = webpPath.replace(/\.webp$/i, '');
  return [
    ...responsiveImageWidths.map(width => `${basePath}-${width}.webp ${width}w`),
    `${webpPath} 1024w`
  ].join(', ');
}

function getProductImageSizes(isFeatured) {
  return isFeatured ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw';
}

function getProductCategoryIds(product) {
  return [product.category, ...(product.filterCategories || [])];
}

function getCategoryLabel(catId) {
  const cat = collectionCategories.find(c => c.id === catId);
  return cat ? cat.label : 'Handmade';
}

function getProductAltText(product) {
  const categoryAlt = {
    bouquets: 'Handmade crochet bouquet for gifting in Kerala',
    plushies: 'Crochet plushie handmade gift by BloomyCocoon',
    keychains: 'Handmade crochet keychain for small gifts in India',
    'baby-gifts': 'Baby crochet gift handmade in Kerala',
    accessories: 'Handmade crochet accessory by BloomyCocoon',
    'home-decor': 'Crochet home decor piece by BloomyCocoon',
    'gift-combos': 'Handmade crochet gift combo for birthdays and anniversaries'
  };
  return `${product.name} - ${categoryAlt[product.category] || 'Handmade crochet gift by BloomyCocoon'}`;
}

export function getProductCardMarkup(product) {
  const image = getProductImage(product);
  const fallbackImage = categoryFallbackImages[product.category] || categoryFallbackImages.default;
  const badgeMarkup = product.badge
    ? `<span class="bg-[#fbd8d0] text-[#775d56] px-3 py-1 rounded-full font-label-md text-xs">${escapeHTML(product.badge)}</span>`
    : '';
  const filterCategories = getProductCategoryIds(product).join(' ');
  const categoryLabel = getCategoryLabel(product.category);
  const productAlt = getProductAltText(product);

  if (product.featured) {
    const tagMarkup = product.tag
      ? `<span class="bg-[#A8B5A2] text-white px-4 py-1 rounded-full font-label-md text-sm">${escapeHTML(product.tag)}</span>`
      : '';
    return `
      <article data-product-id="${product.id}" data-category="${product.category}" data-filter-categories="${filterCategories}" class="col-span-2 md:col-span-8 group product-card relative overflow-hidden bg-primary-container rounded-xl soft-glow transition-all duration-500">
        <div class="relative h-[260px] md:h-[420px] overflow-hidden cursor-pointer group/img" onclick="openQuickLook('${product.id}')" role="button" tabindex="0" aria-label="Quick look at ${escapeHTML(product.name)}">
          <picture class="contents">
            <source srcset="${escapeHTML(getResponsiveWebpSrcset(image))}" sizes="${getProductImageSizes(true)}" type="image/webp">
            <img alt="${escapeHTML(productAlt)}" class="product-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105" src="${escapeHTML(image)}" data-fallback-src="${escapeHTML(fallbackImage)}" loading="lazy" decoding="async" width="800" height="500">
          </picture>
          <div class="absolute inset-0 bg-secondary/15 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span class="bg-surface/90 backdrop-blur-xs text-secondary text-xs font-label-md px-3.5 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px]">visibility</span>
              <span>Quick Look</span>
            </span>
          </div>
          <div class="absolute top-md right-md flex flex-col gap-2 items-end pointer-events-none">
            ${product.badge ? `<span class="bg-secondary text-on-secondary px-4 py-1 rounded-full font-label-md text-sm uppercase tracking-wider">${escapeHTML(product.badge)}</span>` : ''}
            ${tagMarkup}
          </div>
        </div>
        <div class="p-6 md:p-lg">
          <div class="flex justify-between items-end flex-wrap gap-4">
            <div class="max-w-xl">
              <span class="text-caption text-on-surface-variant font-label-md uppercase tracking-wide">${escapeHTML(categoryLabel)}</span>
              <h3 class="font-headline-md text-2xl md:text-headline-md text-secondary mb-xs cursor-pointer hover:underline" onclick="openQuickLook('${product.id}')">${escapeHTML(product.name)}</h3>
              <p class="font-body-md text-on-surface-variant">${escapeHTML(product.description)}</p>
            </div>
            <div class="text-right">
              <span class="font-headline-sm text-secondary block font-bold">Starting from ${formatStartingPrice(product.startingPrice)}</span>
              <button data-add-to-cart="${product.id}" aria-label="Add ${escapeHTML(product.name)} to cart" class="mt-base flex items-center gap-xs text-secondary font-label-md group/btn bg-white/70 hover:bg-secondary hover:text-white px-4 py-2 rounded-full transition-colors border border-secondary shadow-sm">
                Add to Cart <span class="material-symbols-outlined" data-icon="add">add</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  return `
    <article data-product-id="${product.id}" data-category="${product.category}" data-filter-categories="${filterCategories}" class="col-span-1 md:col-span-4 group product-card bg-surface-container-low rounded-xl soft-glow transition-all duration-500">
      <div class="relative h-[180px] md:h-[260px] overflow-hidden rounded-t-xl bg-surface-container cursor-pointer group/img" onclick="openQuickLook('${product.id}')" role="button" tabindex="0" aria-label="Quick look at ${escapeHTML(product.name)}">
        <picture class="contents">
          <source srcset="${escapeHTML(getResponsiveWebpSrcset(image))}" sizes="${getProductImageSizes(false)}" type="image/webp">
          <img alt="${escapeHTML(productAlt)}" class="product-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105" src="${escapeHTML(image)}" data-fallback-src="${escapeHTML(fallbackImage)}" loading="lazy" decoding="async" width="400" height="500">
        </picture>
        <div class="absolute inset-0 bg-secondary/15 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span class="bg-surface/90 backdrop-blur-xs text-secondary text-xs font-label-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">visibility</span>
            <span>Quick Look</span>
          </span>
        </div>
        <div class="absolute top-base left-base pointer-events-none">
          ${badgeMarkup}
        </div>
      </div>
      <div class="p-md">
        <span class="text-caption text-on-surface-variant font-label-md uppercase tracking-wide">${escapeHTML(categoryLabel)}</span>
        <h3 class="font-headline-sm text-headline-sm text-secondary mb-xs cursor-pointer hover:underline" onclick="openQuickLook('${product.id}')">${escapeHTML(product.name)}</h3>
        <p class="product-card-description text-caption text-on-surface-variant mb-sm">${escapeHTML(product.description)}</p>
        <div class="flex justify-between items-center gap-2 pt-1 border-t border-outline-variant/10 mt-2">
          <span class="font-body-md text-on-surface font-bold text-sm md:text-base">Starting from ${formatStartingPrice(product.startingPrice)}</span>
          <button data-add-to-cart="${product.id}" aria-label="Add ${escapeHTML(product.name)} to cart" class="min-w-[44px] min-h-[44px] px-3 py-2 rounded-full border border-secondary flex items-center justify-center gap-1 text-secondary font-label-md text-xs hover:bg-secondary hover:text-white active:scale-95 transition-all shadow-xs">
            <span class="material-symbols-outlined text-[18px]" data-icon="add">add</span>
            <span class="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderCollectionProductsHtml(catalog) {
  return catalog.map(getProductCardMarkup).join('\n');
}
