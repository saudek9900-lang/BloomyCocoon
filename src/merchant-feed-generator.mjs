const SITE_ORIGIN = 'https://www.bloomycocoon.com';

const GOOGLE_PRODUCT_CATEGORIES = {
  bouquets: 'Home & Garden > Decor > Artificial Flora',
  plushies: 'Toys & Games > Toys > Stuffed Animals',
  keychains: 'Apparel & Accessories > Handbag & Wallet Accessories > Keychains',
  'baby-gifts': 'Baby & Toddler > Baby Toys & Activity Equipment',
  accessories: 'Apparel & Accessories > Clothing Accessories',
  'home-decor': 'Home & Garden > Decor',
  'gift-combos': 'Home & Garden > Decor > Artificial Flora',
};

const CATEGORY_LABELS = {
  bouquets: 'Bouquets',
  plushies: 'Plushies',
  keychains: 'Keychains',
  'baby-gifts': 'Baby Gifts',
  accessories: 'Accessories',
  'home-decor': 'Home & Decor',
  'gift-combos': 'Gift Combos',
};

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateGoogleMerchantXml(catalog) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n';
  xml += '  <channel>\n';
  xml += '    <title>BloomyCocoon Handmade Crochet Gifts</title>\n';
  xml += `    <link>${SITE_ORIGIN}</link>\n`;
  xml += '    <description>Handcrafted crochet bouquets, amigurumi plushies, keychains, and custom gifts made slowly in Kerala with soft milk cotton yarn. Pan-India delivery.</description>\n';

  for (const product of catalog) {
    const safePrice = Number(product.startingPrice) || 149;
    const priceFormatted = `${safePrice}.00 INR`;
    const productUrl = `${SITE_ORIGIN}/products/${product.id}`;
    const imageUrl = product.image ? `${SITE_ORIGIN}/${product.image}` : `${SITE_ORIGIN}/images/hero_crochet_scene.png`;
    const googleCategory = GOOGLE_PRODUCT_CATEGORIES[product.category] || 'Home & Garden > Decor > Artificial Flora';
    const categoryLabel = CATEGORY_LABELS[product.category] || 'Handmade Gift';
    const cleanDesc = (product.description || '').trim();
    const fullDesc = `${cleanDesc} Handcrafted in Kerala with soft milk cotton yarn. Custom colors and personalized options available on WhatsApp. Starting from ₹${safePrice}.`;
    const productTitle = `${product.name} - Handmade Crochet ${categoryLabel}`;

    xml += '    <item>\n';
    xml += `      <g:id>${escapeXml(product.id)}</g:id>\n`;
    xml += `      <g:title>${escapeXml(productTitle)}</g:title>\n`;
    xml += `      <g:description>${escapeXml(fullDesc)}</g:description>\n`;
    xml += `      <g:link>${escapeXml(productUrl)}</g:link>\n`;
    xml += `      <g:image_link>${escapeXml(imageUrl)}</g:image_link>\n`;
    xml += '      <g:condition>new</g:condition>\n';
    xml += '      <g:availability>in_stock</g:availability>\n';
    xml += `      <g:price>${priceFormatted}</g:price>\n`;
    xml += '      <g:brand>BloomyCocoon</g:brand>\n';
    xml += `      <g:mpn>${escapeXml(product.id)}</g:mpn>\n`;
    xml += '      <g:material>Milk Cotton Yarn</g:material>\n';
    xml += '      <g:identifier_exists>no</g:identifier_exists>\n';
    xml += '      <g:custom_label_0>Handmade in Kerala</g:custom_label_0>\n';
    xml += `      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>\n`;
    xml += `      <g:product_type>${escapeXml(`Handmade Crochet > ${categoryLabel}`)}</g:product_type>\n`;
    xml += '      <g:shipping>\n';
    xml += '        <g:country>IN</g:country>\n';
    xml += '        <g:service>Pan-India Standard Delivery</g:service>\n';
    xml += '        <g:price>0.00 INR</g:price>\n';
    xml += '      </g:shipping>\n';
    xml += '    </item>\n';
  }

  xml += '  </channel>\n';
  xml += '</rss>\n';
  return xml;
}
