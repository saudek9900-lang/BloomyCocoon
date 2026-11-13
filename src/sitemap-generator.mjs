import { execSync } from 'node:child_process';
import { existsSync, statSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { CATEGORY_PAGES, OCCASION_PRODUCTS } from './route-content.mjs';

const SITE_ORIGIN = 'https://www.bloomycocoon.com';
const EXISTING_ROUTES_LASTMOD = '2026-11-10';

function getBlogPostsSync() {
  const blogDir = path.resolve('content/blog');
  if (!existsSync(blogDir)) return [];
  try {
    const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));
    const posts = [];
    for (const file of files) {
      const content = readFileSync(path.join(blogDir, file), 'utf8');
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
      if (!match) continue;
      const yaml = match[1];
      const title = yaml.match(/^title:\s*(.*)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
      const slug = yaml.match(/^slug:\s*(.*)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
      const date = yaml.match(/^date:\s*(.*)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
      const image = yaml.match(/^image:\s*(.*)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
      if (slug && date) {
        posts.push({ title: title || slug, slug, date, image });
      }
    }
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
  } catch {
    return [];
  }
}

function resolveSitemapImageUrl(relPath) {
  const clean = String(relPath || '').replace(/^\/+/, '');
  const webpCandidate = clean.replace(/\.png$/i, '.webp');
  if (webpCandidate !== clean && existsSync(path.resolve('public', webpCandidate))) {
    return `${SITE_ORIGIN}/${webpCandidate}`;
  }
  return `${SITE_ORIGIN}/${clean}`;
}

function getFileLastModDate(filePath, defaultDate = EXISTING_ROUTES_LASTMOD) {
  try {
    const gitDate = execSync(`git log -1 --format=%cs -- "${filePath}"`, { encoding: 'utf8' }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(gitDate)) {
      return gitDate;
    }
  } catch {}
  try {
    const stat = statSync(filePath);
    return stat.mtime.toISOString().split('T')[0];
  } catch {}
  return defaultDate;
}

const CORE_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily', image: 'images/hero_crochet_scene.png', title: 'BloomyCocoon Handmade Crochet Gifts', sourceFile: 'index.html' },
  { path: '/collections', priority: '0.9', changefreq: 'daily', sourceFile: 'src/catalog.json' },
  { path: '/crochet-bouquets', priority: '0.85', changefreq: 'weekly', categoryKey: 'screen-crochet-bouquets', sourceFile: 'src/route-content.mjs' },
  { path: '/crochet-plushies', priority: '0.85', changefreq: 'weekly', categoryKey: 'screen-crochet-plushies', sourceFile: 'src/route-content.mjs' },
  { path: '/crochet-keychains', priority: '0.85', changefreq: 'weekly', categoryKey: 'screen-crochet-keychains', sourceFile: 'src/route-content.mjs' },
  { path: '/crochet-baby-gifts', priority: '0.85', changefreq: 'weekly', categoryKey: 'screen-crochet-baby-gifts', sourceFile: 'src/route-content.mjs' },
  { path: '/crochet-accessories', priority: '0.85', changefreq: 'weekly', categoryKey: 'screen-crochet-accessories', sourceFile: 'src/route-content.mjs' },
  { path: '/crochet-home-decor', priority: '0.85', changefreq: 'weekly', categoryKey: 'screen-crochet-home-decor', sourceFile: 'src/route-content.mjs' },
  { path: '/crochet-gift-combos', priority: '0.85', changefreq: 'weekly', categoryKey: 'screen-crochet-gift-combos', sourceFile: 'src/route-content.mjs' },
  { path: '/anniversary-gifts', priority: '0.85', changefreq: 'weekly', occasionKey: 'screen-anniversary-gifts', sourceFile: 'src/route-content.mjs' },
  { path: '/birthday-gifts', priority: '0.85', changefreq: 'weekly', occasionKey: 'screen-birthday-gifts', sourceFile: 'src/route-content.mjs' },
  { path: '/baby-shower-gifts', priority: '0.85', changefreq: 'weekly', occasionKey: 'screen-baby-shower-gifts', sourceFile: 'src/route-content.mjs' },
  { path: '/return-gifts', priority: '0.85', changefreq: 'weekly', occasionKey: 'screen-return-gifts', sourceFile: 'src/route-content.mjs' },
  { path: '/custom-order', priority: '0.8', changefreq: 'weekly', sourceFile: 'index.html' },
  { path: '/about', priority: '0.7', changefreq: 'monthly', image: 'images/about_process.png', title: 'About BloomyCocoon Handcrafted Gifts', sourceFile: 'index.html' },
  { path: '/faq', priority: '0.7', changefreq: 'weekly', sourceFile: 'index.html' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly', image: 'images/contact_workspace.png', title: 'BloomyCocoon Workspace', sourceFile: 'index.html' },
  { path: '/shipping-delivery', priority: '0.5', changefreq: 'monthly', sourceFile: 'index.html' },
  { path: '/returns-cancellations', priority: '0.5', changefreq: 'monthly', sourceFile: 'index.html' },
  { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly', sourceFile: 'index.html' },
  { path: '/order-terms', priority: '0.5', changefreq: 'monthly', sourceFile: 'index.html' },
  { path: '/crochet-care', priority: '0.5', changefreq: 'monthly', sourceFile: 'index.html' },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml(catalog, defaultDate = EXISTING_ROUTES_LASTMOD, blogPosts = []) {
  // Existing routes keep their stable committed lastmod
  const existingRouteLastMod = EXISTING_ROUTES_LASTMOD;

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  for (const route of CORE_ROUTES) {
    const routeLastMod = existingRouteLastMod;

    xml += '  <url>\n';
    xml += `    <loc>${SITE_ORIGIN}${route.path}</loc>\n`;
    xml += `    <lastmod>${routeLastMod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;

    if (route.image) {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${resolveSitemapImageUrl(route.image)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(route.title)}</image:title>\n`;
      xml += '    </image:image>\n';
    }

    if (route.path === '/collections' && Array.isArray(catalog)) {
      for (const product of catalog) {
        if (product.image) {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${resolveSitemapImageUrl(product.image)}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(`${product.name} - Handmade Crochet ${product.category}`)}</image:title>\n`;
          xml += '    </image:image>\n';
        }
      }
    }

    if (route.categoryKey && Array.isArray(catalog) && CATEGORY_PAGES[route.categoryKey]) {
      const targetCategory = CATEGORY_PAGES[route.categoryKey];
      for (const product of catalog) {
        if (product.category === targetCategory && product.image) {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${resolveSitemapImageUrl(product.image)}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(`${product.name} - Handmade Crochet Gift`)}</image:title>\n`;
          xml += '    </image:image>\n';
        }
      }
    }

    if (route.occasionKey && Array.isArray(catalog) && OCCASION_PRODUCTS[route.occasionKey]) {
      const allowedIds = OCCASION_PRODUCTS[route.occasionKey];
      for (const product of catalog) {
        if (allowedIds.includes(product.id) && product.image) {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${resolveSitemapImageUrl(product.image)}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(`${product.name} - Handmade Crochet Gift`)}</image:title>\n`;
          xml += '    </image:image>\n';
        }
      }
    }

    xml += '  </url>\n';
  }

  if (Array.isArray(catalog)) {
    for (const product of catalog) {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_ORIGIN}/products/${product.id}</loc>\n`;
      xml += `    <lastmod>${existingRouteLastMod}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.80</priority>\n';
      if (product.image) {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${resolveSitemapImageUrl(product.image)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(`${product.name} - Handmade Crochet Gift`)}</image:title>\n`;
        xml += '    </image:image>\n';
      }
      xml += '  </url>\n';
    }
  }

  // Blog index and individual posts
  const posts = (Array.isArray(blogPosts) && blogPosts.length > 0) ? blogPosts : getBlogPostsSync();
  const blogLastMod = posts.length > 0 ? posts[0].date : defaultDate;

  xml += '  <url>\n';
  xml += `    <loc>${SITE_ORIGIN}/blog</loc>\n`;
  xml += `    <lastmod>${blogLastMod}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.80</priority>\n';
  xml += '  </url>\n';

  for (const post of posts) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_ORIGIN}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.70</priority>\n';
    if (post.image) {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${resolveSitemapImageUrl(post.image)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(post.title)}</image:title>\n`;
      xml += '    </image:image>\n';
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
      full += `- [${item.name}](${SITE_ORIGIN}/products/${item.id}) (Starting from ₹${item.startingPrice}): ${item.description}\n`;
    }
    full += '\n';
  }

  return full;
}
