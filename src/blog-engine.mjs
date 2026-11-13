import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import { ROUTE_SCHEMA_ID } from './route-content.mjs';

const SITE_ORIGIN = 'https://www.bloomycocoon.com';

// Configure marked for clean, semantic HTML output
marked.setOptions({
  gfm: true,
  breaks: false,
});

/**
 * Parses frontmatter (YAML-like) and markdown body.
 */
export function parseFrontmatter(markdownText) {
  const match = markdownText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Missing frontmatter delimiters (--- ... ---)');
  }

  const yamlContent = match[1];
  const body = match[2].trim();
  const data = {};
  let currentList = null;

  for (const rawLine of yamlContent.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    if (line.startsWith('- ') && currentList) {
      currentList.push(line.slice(2).trim().replace(/^['"]|['"]$/g, ''));
      continue;
    }

    const kvMatch = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      let val = kvMatch[2].trim();
      if (!val) {
        currentList = [];
        data[key] = currentList;
      } else {
        currentList = null;
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        } else if (val.startsWith('[') && val.endsWith(']')) {
          val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
        }
        data[key] = val;
      }
    }
  }

  // Validate required frontmatter fields
  const required = ['title', 'description', 'slug', 'date', 'image', 'related'];
  for (const req of required) {
    if (!data[req]) {
      throw new Error(`Missing required frontmatter field "${req}"`);
    }
  }

  return { data, content: body };
}

/**
 * Loads and parses all markdown blog posts from content/blog/
 */
export async function getAllBlogPosts(contentDir = path.resolve('content/blog')) {
  if (!existsSync(contentDir)) {
    return [];
  }

  const files = await readdir(contentDir);
  const mdFiles = files.filter((f) => f.endsWith('.md'));
  const posts = [];

  for (const file of mdFiles) {
    const filePath = path.join(contentDir, file);
    const raw = await readFile(filePath, 'utf8');
    const { data, content } = parseFrontmatter(raw);

    const expectedSlug = file.replace(/\.md$/, '');
    if (data.slug !== expectedSlug) {
      throw new Error(`Post slug "${data.slug}" in ${file} does not match filename without .md ("${expectedSlug}")`);
    }

    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.ceil(words / 200));
    const readingTime = `${readingMinutes} min read`;
    const parsedHtml = marked.parse(content);
    const htmlContent = parsedHtml.replace(/<img\s+(?![^>]*loading=)/gi, '<img loading="lazy" decoding="async" ');

    posts.push({
      ...data,
      wordCount: words,
      readingMinutes,
      readingTime,
      htmlContent,
      rawMarkdown: content,
      filePath,
    });
  }

  // Sort newest first by date
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Helper to escape HTML characters
 */
export function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Generate picture tag for responsive site images
 */
export function renderResponsivePicture(imagePath, altText, isAboveFold = false) {
  const cleanPath = String(imagePath || '').replace(/^\/+/, '');
  const baseNameMatch = cleanPath.match(/^images\/([^.]+)\.(png|webp)$/i);

  if (baseNameMatch) {
    const name = baseNameMatch[1];
    return `<picture class="contents">
        <source srcset="/images/${name}-320.webp 320w, /images/${name}-480.webp 480w, /images/${name}-640.webp 640w" sizes="(min-width: 1024px) 768px, 100vw" type="image/webp">
        <img src="/${cleanPath.replace(/\.webp$/i, '.png')}" alt="${escapeHtml(altText)}" class="w-full h-auto object-cover rounded-2xl shadow-sm border border-outline-variant/20" width="800" height="450" ${isAboveFold ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
    </picture>`;
  }

  return `<img src="/${cleanPath}" alt="${escapeHtml(altText)}" class="w-full h-auto object-cover rounded-2xl shadow-sm border border-outline-variant/20" width="800" height="450" ${isAboveFold ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

/**
 * Format YYYY-MM-DD date into friendly readable string (e.g. November 13, 2026)
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const mIdx = parseInt(month, 10) - 1;
  return `${months[mIdx] || month} ${parseInt(day, 10)}, ${year}`;
}

/**
 * Replace the metadata, open-graph, schema, and app-viewport content in baseHtml
 */
function applyBlogShell({
  baseHtml,
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'images/hero_crochet_scene.png',
  schemaGraph,
  screenId,
  mainContentHtml,
  unifiedFooterHtml,
}) {
  let next = baseHtml;

  // 1. Meta title & description
  next = next.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  next = next.replace(
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}">`
  );

  // 2. Canonical
  next = next.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`
  );

  // 3. Robots (ensure index, follow for blog pages)
  next = next.replace(
    /<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
  );

  // 4. OpenGraph tags
  next = next.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}">`
  );
  next = next.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}">`
  );
  next = next.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`
  );
  next = next.replace(
    /<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(ogType)}">`
  );
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_ORIGIN}/${ogImage.replace(/^\/+/, '').replace(/\.webp$/i, '.png')}`;
  next = next.replace(
    /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(fullOgImage)}">`
  );

  // 5. Twitter tags
  next = next.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`
  );
  next = next.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`
  );
  next = next.replace(
    /<meta\s+property=["']twitter:url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="twitter:url" content="${escapeHtml(canonicalUrl)}">`
  );
  next = next.replace(
    /<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(fullOgImage)}">`
  );

  // 6. Schema JSON-LD replacement
  const schemaBlock = `<script type="application/ld+json" id="${ROUTE_SCHEMA_ID}">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': schemaGraph }, null, 2)}
    </script>`;

  const schemaRegex = new RegExp(`<script\\b[^>]*\\bid=["'](?:${ROUTE_SCHEMA_ID}|route-schema)["'][^>]*>[\\s\\S]*?<\\/script>`, 'i');
  if (schemaRegex.test(next)) {
    next = next.replace(schemaRegex, schemaBlock);
  } else {
    next = next.replace('</head>', `    ${schemaBlock}\n</head>`);
  }

  // 7. Inject isolated screen into app-viewport
  const viewportPattern = /(<div\b[^>]*\bid=["']app-viewport["'][^>]*>)([\s\S]*?)(<\/div>\s*<!--\s*Global Floating WhatsApp Button)/i;
  const screenHtml = `\n        <section class="screen active" id="${screenId}">
            ${mainContentHtml}
            ${unifiedFooterHtml}
        </section>\n    `;

  if (viewportPattern.test(next)) {
    next = next.replace(viewportPattern, `$1${screenHtml}$3`);
  } else {
    // Fallback: replace within any app-viewport closing
    const altViewportPattern = /(<div\b[^>]*\bid=["']app-viewport["'][^>]*>)([\s\S]*?)(<\/div>)/i;
    next = next.replace(altViewportPattern, `$1${screenHtml}$3`);
  }

  return next;
}

/**
 * Generate Blog Index (/blog) HTML
 */
export function generateBlogIndexHtml({ baseHtml, posts, unifiedFooterHtml }) {
  const title = 'BloomyCocoon Blog: Handmade Crochet Gift Ideas and Guides';
  const intro = 'Gift ideas and simple guides on handmade crochet, from BloomyCocoon Studio.';
  const canonicalUrl = `${SITE_ORIGIN}/blog`;

  const schemaGraph = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_ORIGIN,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: canonicalUrl,
        },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description: intro,
      isPartOf: {
        '@id': `${SITE_ORIGIN}/#website`,
      },
      breadcrumb: {
        '@id': `${canonicalUrl}#breadcrumb`,
      },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ItemList',
      '@id': `${canonicalUrl}#itemlist`,
      itemListElement: posts.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: post.title,
        url: `${SITE_ORIGIN}/blog/${post.slug}`,
      })),
    },
  ];

  const postCardsHtml = posts.length > 0
    ? posts.map((post, idx) => {
        const isAboveFold = idx === 0;
        const formattedDate = formatDisplayDate(post.date);
        return `
      <article class="bg-surface-container-low rounded-2xl md:rounded-3xl border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
        <a href="/blog/${post.slug}" class="block relative aspect-[16/9] overflow-hidden bg-surface-container">
          ${renderResponsivePicture(post.image, post.title, isAboveFold)}
        </a>
        <div class="p-5 sm:p-6 md:p-8 flex flex-col justify-between flex-1">
          <div>
            <div class="flex items-center gap-2 text-xs font-label-md text-on-surface-variant mb-3 flex-wrap">
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]" aria-hidden="true">calendar_today</span>
                <time datetime="${post.date}">${formattedDate}</time>
              </span>
              <span>•</span>
              <span>By BloomyCocoon Studio</span>
              <span>•</span>
              <span>${escapeHtml(post.readingTime || '4 min read')}</span>
            </div>
            <h2 class="font-headline-sm text-xl md:text-2xl text-on-surface font-semibold group-hover:text-secondary transition-colors mb-3 leading-snug">
              <a href="/blog/${post.slug}">${escapeHtml(post.title)}</a>
            </h2>
            <p class="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">
              ${escapeHtml(post.description)}
            </p>
          </div>
          <div>
            <a href="/blog/${post.slug}" class="inline-flex items-center gap-2 font-label-md text-sm text-secondary font-semibold group-hover:translate-x-1 transition-transform">
              <span>Read article</span>
              <span class="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
        </div>
      </article>`;
      }).join('\n')
    : `
      <div class="col-span-full py-16 text-center max-w-md mx-auto">
        <span class="material-symbols-outlined text-outline-variant text-4xl mb-3" aria-hidden="true">article</span>
        <h2 class="font-headline-sm text-xl font-semibold text-on-surface mb-2">New Stories Coming Soon</h2>
        <p class="font-body-md text-sm text-on-surface-variant">We are preparing thoughtful crochet guides and handcrafted gift ideas. Check back soon!</p>
      </div>`;

  const mainContentHtml = `
    <main class="min-h-screen">
      <!-- Breadcrumbs and Header Hero -->
      <section class="bg-primary-container/40 py-12 md:py-16 border-b border-outline-variant/15 relative overflow-hidden">
        <div class="ceramic-texture absolute inset-0 pointer-events-none opacity-20"></div>
        <div class="relative max-w-container-max mx-auto px-4 sm:px-6 md:px-lg">
          <nav aria-label="Breadcrumb" class="mb-6 text-xs text-on-surface-variant flex items-center flex-wrap gap-1.5">
            <a href="/" class="hover:text-secondary transition-colors">Home</a>
            <span class="text-outline-variant" aria-hidden="true">/</span>
            <span class="text-on-surface font-semibold" aria-current="page">Blog</span>
          </nav>
          <div class="max-w-3xl">
            <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-primary mb-4">BloomyCocoon Blog</h1>
            <p class="font-body-lg text-base md:text-body-lg text-on-surface-variant leading-relaxed">${escapeHtml(intro)}</p>
          </div>
        </div>
      </section>

      <!-- Posts Grid -->
      <section class="py-12 md:py-20 max-w-container-max mx-auto px-4 sm:px-6 md:px-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          ${postCardsHtml}
        </div>
      </section>
    </main>`;

  return applyBlogShell({
    baseHtml,
    title,
    description: intro,
    canonicalUrl,
    ogType: 'website',
    ogImage: posts[0]?.image || 'images/hero_crochet_scene.png',
    schemaGraph,
    screenId: 'screen-blog',
    mainContentHtml,
    unifiedFooterHtml,
  });
}

/**
 * Helper to get clean human labels for related paths
 */
function getPathDisplayLabel(relPath) {
  const map = {
    '/crochet-bouquets': 'Handmade Crochet Bouquets',
    '/crochet-plushies': 'Crochet Plushies & Amigurumi',
    '/crochet-keychains': 'Crochet Keychains & Charms',
    '/crochet-baby-gifts': 'Crochet Baby Gifts & Sets',
    '/crochet-accessories': 'Crochet Accessories & Totes',
    '/crochet-home-decor': 'Crochet Home & Decor',
    '/crochet-gift-combos': 'Crochet Gift Combos & Hampers',
    '/anniversary-gifts': 'Curated Anniversary Gifts',
    '/birthday-gifts': 'Curated Birthday Gifts',
    '/baby-shower-gifts': 'Baby Shower & Newborn Gifts',
    '/return-gifts': 'Return Gifts & Small Celebrations',
    '/custom-order': 'Custom Crochet Orders',
    '/crochet-care': 'Crochet Care & Wash Guide',
    '/collections': 'Full Handmade Collection',
    '/about': 'About BloomyCocoon',
  };
  if (map[relPath]) return map[relPath];
  if (relPath.startsWith('/products/')) {
    const slug = relPath.replace('/products/', '');
    return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  return relPath.replace(/^\//, '').replace(/-/g, ' ');
}

/**
 * Generate Single Blog Post (/blog/<slug>) HTML
 */
export function generateBlogPostHtml({ baseHtml, post, allPosts, unifiedFooterHtml }) {
  const title = `${post.title} | BloomyCocoon Blog`;
  const description = post.description;
  const canonicalUrl = `${SITE_ORIGIN}/blog/${post.slug}`;
  const formattedDate = formatDisplayDate(post.date);

  const schemaGraph = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_ORIGIN,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${SITE_ORIGIN}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: canonicalUrl,
        },
      ],
    },
    {
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      isPartOf: {
        '@id': `${SITE_ORIGIN}/#website`,
      },
      mainEntityOfPage: canonicalUrl,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      author: {
        '@type': 'Organization',
        name: 'BloomyCocoon Studio',
        url: SITE_ORIGIN,
      },
      publisher: {
        '@type': 'Organization',
        name: 'BloomyCocoon',
        url: SITE_ORIGIN,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_ORIGIN}/icon-512.png`,
        },
      },
      image: `${SITE_ORIGIN}/${post.image.replace(/^\/+/, '').replace(/\.webp$/i, '.png')}`,
      inLanguage: 'en-IN',
    },
  ];

  // Related links block
  const relatedLinks = Array.isArray(post.related) ? post.related : [];
  const relatedListHtml = relatedLinks.map((relPath) => `
    <li>
      <a href="${relPath}" class="inline-flex items-center gap-2 text-secondary font-medium hover:underline">
        <span class="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
        <span>${escapeHtml(getPathDisplayLabel(relPath))}</span>
      </a>
    </li>`).join('\n');

  // More from blog (2 other posts)
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const otherPostsHtml = otherPosts.map((other) => `
    <article class="bg-surface rounded-2xl p-5 border border-outline-variant/20 shadow-sm flex flex-col justify-between">
      <div>
        <time datetime="${other.date}" class="text-xs text-on-surface-variant font-label-md block mb-1.5">${formatDisplayDate(other.date)}</time>
        <h4 class="font-headline-sm text-base font-semibold text-on-surface mb-2">
          <a href="/blog/${other.slug}" class="hover:text-secondary transition-colors">${escapeHtml(other.title)}</a>
        </h4>
        <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-4">${escapeHtml(other.description)}</p>
      </div>
      <a href="/blog/${other.slug}" class="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1">
        <span>Read article</span>
        <span class="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_forward</span>
      </a>
    </article>`).join('\n');

  const mainContentHtml = `
    <main class="min-h-screen">
      <!-- Article Header & Breadcrumbs -->
      <header class="bg-primary-container/40 py-10 md:py-14 border-b border-outline-variant/15 relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 md:px-lg">
          <nav aria-label="Breadcrumb" class="mb-5 text-xs text-on-surface-variant flex items-center flex-wrap gap-1.5">
            <a href="/" class="hover:text-secondary transition-colors">Home</a>
            <span class="text-outline-variant" aria-hidden="true">/</span>
            <a href="/blog" class="hover:text-secondary transition-colors">Blog</a>
            <span class="text-outline-variant" aria-hidden="true">/</span>
            <span class="text-on-surface font-semibold" aria-current="page">${escapeHtml(post.title)}</span>
          </nav>
          <div class="flex items-center gap-2 text-xs font-label-md text-on-surface-variant mb-3 flex-wrap">
            <span>By BloomyCocoon Studio</span>
            <span>•</span>
            <time datetime="${post.date}">${formattedDate}</time>
            <span>•</span>
            <span>${escapeHtml(post.readingTime || '4 min read')}</span>
          </div>
          <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-primary">${escapeHtml(post.title)}</h1>
        </div>
      </header>

      <!-- Article Content -->
      <article class="max-w-4xl mx-auto px-4 sm:px-6 md:px-lg py-10 md:py-14">
        <!-- Featured Image -->
        <div class="mb-8 md:mb-12 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
          ${renderResponsivePicture(post.image, post.title, true)}
        </div>

        <!-- Markdown Body -->
        <div class="blog-prose font-body-lg text-base md:text-lg text-on-surface leading-relaxed space-y-6">
          ${post.htmlContent}
        </div>

        <!-- End of Post Sections -->
        <div class="mt-12 md:mt-16 pt-10 border-t border-outline-variant/20 space-y-10">
          ${relatedLinks.length > 0 ? `
          <!-- Related Site Guides & Collections -->
          <div class="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/20">
            <h3 class="font-headline-sm text-lg md:text-xl font-bold text-on-surface mb-4">Related Collections &amp; Care Guides</h3>
            <ul class="space-y-2.5">
              ${relatedListHtml}
            </ul>
          </div>` : ''}

          <!-- Custom Orders CTA -->
          <div class="bg-secondary-container/60 rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto border border-secondary-fixed/40">
            <span class="material-symbols-outlined text-secondary text-3xl mb-2" aria-hidden="true">edit_note</span>
            <h3 class="font-headline-sm text-lg md:text-xl font-bold text-on-surface mb-2">Looking for a Custom Crochet Gift?</h3>
            <p class="font-body-md text-sm md:text-base text-on-surface-variant mb-5">Have a specific flower combination, custom plushie idea, or personalized color theme in mind? We craft custom keepsakes slowly for your meaningful celebrations.</p>
            <a href="/custom-order" class="inline-flex items-center gap-2 bg-secondary text-white font-label-md text-sm md:text-base py-3 px-6 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-sm">
              <span>Start Custom Order</span>
              <span class="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </a>
          </div>

          ${otherPosts.length > 0 ? `
          <!-- More from the Blog -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-headline-sm text-lg md:text-xl font-bold text-on-surface">More from BloomyCocoon Blog</h3>
              <a href="/blog" class="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1">
                <span>View all articles</span>
                <span class="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_forward</span>
              </a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${otherPostsHtml}
            </div>
          </div>` : `
          <div class="text-center pt-4">
            <a href="/blog" class="inline-flex items-center gap-2 text-secondary font-semibold hover:underline">
              <span class="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
              <span>Back to BloomyCocoon Blog</span>
            </a>
          </div>`}
        </div>
      </article>
    </main>`;

  return applyBlogShell({
    baseHtml,
    title,
    description,
    canonicalUrl,
    ogType: 'article',
    ogImage: post.image,
    schemaGraph,
    screenId: 'screen-blog-post',
    mainContentHtml,
    unifiedFooterHtml,
  });
}

