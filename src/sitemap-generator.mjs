const SITE_ORIGIN = 'https://www.bloomycocoon.com';

const CORE_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily', image: 'images/hero_crochet_scene.png', title: 'BloomyCocoon Handmade Crochet Gifts' },
  { path: '/collections', priority: '0.9', changefreq: 'daily' },
  { path: '/custom-order', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly', image: 'images/about_process.png', title: 'About BloomyCocoon Handcrafted Gifts' },
  { path: '/faq', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly', image: 'images/contact_workspace.png', title: 'BloomyCocoon Workspace' },
  { path: '/shipping-delivery', priority: '0.5', changefreq: 'monthly' },
  { path: '/returns-cancellations', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/order-terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/crochet-care', priority: '0.5', changefreq: 'monthly' },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml(catalog, currentDate = '2026-11-10') {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  for (const route of CORE_ROUTES) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_ORIGIN}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;

    if (route.image) {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${SITE_ORIGIN}/${route.image}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(route.title)}</image:title>\n`;
      xml += '    </image:image>\n';
    }

    if (route.path === '/collections' && Array.isArray(catalog)) {
      for (const product of catalog) {
        if (product.image) {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${SITE_ORIGIN}/${product.image}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(`${product.name} - Handmade Crochet ${product.category}`)}</image:title>\n`;
          xml += '    </image:image>\n';
        }
      }
    }

    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

export function generateLlmsFullTxt(catalog, baseLlms) {
  let full = baseLlms.trim() + '\n\n## Complete Product Catalog\n\n';
  full += 'Below is the complete list of 69 handcrafted crochet gifts available at BloomyCocoon. All items are made slowly and customized on WhatsApp.\n\n';

  const categories = [...new Set(catalog.map((p) => p.category))];
  for (const cat of categories) {
    const formattedCat = cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ');
    full += `### ${formattedCat}\n\n`;
    const items = catalog.filter((p) => p.category === cat);
    for (const item of items) {
      full += `- **${item.name}** (Starting from ₹${item.startingPrice}): ${item.description}\n`;
      full += `  - URL: ${SITE_ORIGIN}/collections#${item.id}\n`;
    }
    full += '\n';
  }

  return full;
}
