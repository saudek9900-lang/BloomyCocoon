import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  ROUTE_CONTENT,
  ROUTE_SCHEMA_ID,
  STATIC_ROUTE_SCREEN_IDS,
  getRouteMetadata,
  getRouteSchemaGraph,
} from '../src/route-content.mjs';

const DIST_DIR = path.resolve('dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

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

function setInitialScreen(html, activeScreenId) {
  return html.replace(/<section\b[^>]*\bclass=["'][^"']*\bscreen\b[^"']*["'][^>]*>/gi, (sectionTag) => {
    const idMatch = sectionTag.match(/\bid=["']([^"']+)["']/i);
    if (!idMatch || !ROUTE_CONTENT[idMatch[1]]) return sectionTag;

    const screenId = idMatch[1];
    return sectionTag.replace(/\bclass=(["'])([^"']*)\1/i, (classAttr, quote, classValue) => {
      const classes = classValue
        .split(/\s+/)
        .filter(Boolean)
        .filter((className) => className !== 'active' && className !== 'hidden');
      classes.push(screenId === activeScreenId ? 'active' : 'hidden');
      return `class=${quote}${classes.join(' ')}${quote}`;
    });
  });
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

function insertRouteSchema(html, screenId, baseHtml) {
  const route = ROUTE_CONTENT[screenId];
  const faqItems = route.schemaType === 'FAQPage' ? extractFaqItems(baseHtml) : [];
  if (route.schemaType === 'FAQPage' && faqItems.length === 0) {
    throw new Error('Could not extract visible FAQ items from built HTML.');
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': getRouteSchemaGraph(screenId, { faqItems }),
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
    updateMetadata(setInitialScreen(baseHtml, screenId), getRouteMetadata(screenId)),
    screenId,
    baseHtml,
  );
  const outputDir = path.join(DIST_DIR, route.outputDir);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), routeHtml);
}

const baseHtml = restoreFaqFocusOutline(await readFile(INDEX_PATH, 'utf8'));
await writeFile(
  INDEX_PATH,
  insertRouteSchema(
    updateMetadata(setInitialScreen(baseHtml, 'screen-home'), getRouteMetadata('screen-home')),
    'screen-home',
    baseHtml,
  ),
);

for (const screenId of STATIC_ROUTE_SCREEN_IDS) {
  await writeRouteHtml(baseHtml, screenId);
}

console.log(`Generated route HTML for ${STATIC_ROUTE_SCREEN_IDS.map((screenId) => ROUTE_CONTENT[screenId].path).join(', ')}`);
