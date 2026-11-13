import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('dist/ does not exist. Run "npm run build" first.');
  process.exit(1);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(distDir, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '/index.html')) {
    filePath = filePath + '/index.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const indexPath = path.join(distDir, 'index.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(indexPath).pipe(res);
  }
});

const PORT = 4198;
await new Promise((resolve) => server.listen(PORT, resolve));

// Find chrome binary
const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
];
const chromePath = CHROME_PATHS.find((p) => fs.existsSync(p));
if (!chromePath) {
  console.error('Google Chrome binary not found. Skipping live browser test.');
  server.close();
  process.exit(0);
}

const CHROME_PORT = 9235;
const chromeProcess = spawn(
  chromePath,
  [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=/tmp/chrome-guard-profile-' + Date.now(),
    'about:blank',
  ],
  { stdio: 'ignore' }
);

let wsUrl = null;
for (let i = 0; i < 50; i++) {
  try {
    const res = await fetch(`http://localhost:${CHROME_PORT}/json/version`);
    const data = await res.json();
    wsUrl = data.webSocketDebuggerUrl;
    if (wsUrl) break;
  } catch (e) {
    await new Promise((r) => setTimeout(r, 100));
  }
}

if (!wsUrl) {
  console.error('Could not connect to Chrome debugging port.');
  chromeProcess.kill();
  server.close();
  process.exit(1);
}

const targetRes = await fetch(`http://localhost:${CHROME_PORT}/json/new?about:blank`, { method: 'PUT' });
const targetData = await targetRes.json();
const ws = new WebSocket(targetData.webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

let msgId = 1;
function sendCommand(method, params = {}) {
  const id = msgId++;
  return new Promise((resolve, reject) => {
    const handler = (evt) => {
      const resp = JSON.parse(evt.data);
      if (resp.id === id) {
        ws.removeEventListener('message', handler);
        if (resp.error) reject(resp.error);
        else resolve(resp.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await sendCommand('Page.enable');
await sendCommand('Runtime.enable');

async function evaluate(expression) {
  const res = await sendCommand('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return res.result?.value;
}

function getAllRoutes() {
  const routes = ['/'];
  const baseRoutes = [
    '/collections',
    '/custom-order',
    '/about',
    '/faq',
    '/contact',
    '/shipping-delivery',
    '/returns-cancellations',
    '/privacy-policy',
    '/order-terms',
    '/crochet-care',
    '/anniversary-gifts',
    '/birthday-gifts',
    '/baby-shower-gifts',
    '/return-gifts',
    '/crochet-bouquets',
    '/crochet-plushies',
    '/crochet-keychains',
    '/crochet-baby-gifts',
    '/crochet-accessories',
    '/crochet-home-decor',
    '/crochet-gift-combos',
    '/cart',
    '/workshops',
    '/blog'
  ];
  routes.push(...baseRoutes);

  const blogDir = path.join(distDir, 'blog');
  if (fs.existsSync(blogDir)) {
    for (const f of fs.readdirSync(blogDir)) {
      if (fs.statSync(path.join(blogDir, f)).isDirectory()) {
        routes.push(`/blog/${f}`);
      }
    }
  }

  const productsDir = path.join(distDir, 'products');
  if (fs.existsSync(productsDir)) {
    for (const f of fs.readdirSync(productsDir)) {
      if (fs.statSync(path.join(productsDir, f)).isDirectory()) {
        routes.push(`/products/${f}`);
      }
    }
  }

  return routes;
}

function getStaticTypes(route) {
  const file = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(file)) return ['NOT_FOUND'];
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/<script[^>]*type=["\x27]application\/ld\+json["\x27][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = [];
  for (const m of matches) {
    try {
      const data = JSON.parse(m[1]);
      if (Array.isArray(data)) {
        for (const item of data) if (item['@type']) types.push(item['@type']);
      } else if (data['@graph']) {
        for (const item of data['@graph']) if (item['@type']) types.push(item['@type']);
      } else if (data['@type']) {
        types.push(data['@type']);
      }
    } catch (e) {
      types.push('INVALID_JSON');
    }
  }
  return types.flat();
}

console.log('Running JSON-LD Render Regression Guard...');
const routes = getAllRoutes();
let hasFailures = false;

for (const route of routes) {
  const staticTypes = getStaticTypes(route);
  const url = `http://localhost:${PORT}${route}`;
  await sendCommand('Page.navigate', { url });

  await new Promise((r) => setTimeout(r, 200));
  await evaluate(`new Promise((resolve) => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => setTimeout(resolve, 150));
    } else {
      setTimeout(resolve, 250);
    }
  })`);

  const domTypes = await evaluate(`(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const results = [];
    for (const s of scripts) {
      try {
        const json = JSON.parse(s.textContent);
        if (Array.isArray(json)) {
          for (const item of json) results.push(item['@type']);
        } else if (json['@graph']) {
          for (const item of json['@graph']) results.push(item['@type']);
        } else if (json['@type']) {
          results.push(json['@type']);
        }
      } catch (e) {
        results.push('INVALID_JSON');
      }
    }
    return results.flat();
  })()`);

  const match = JSON.stringify(staticTypes) === JSON.stringify(domTypes);
  if (!match) {
    console.error(`FAIL: ${route}`);
    console.error(`  Expected (static): ${JSON.stringify(staticTypes)}`);
    console.error(`  Actual (rendered): ${JSON.stringify(domTypes)}`);
    hasFailures = true;
  }
}

ws.close();
chromeProcess.kill();
server.close();

if (hasFailures) {
  console.error('\nJSON-LD regression guard failed! Rendered types differ from static types.');
  process.exit(1);
} else {
  console.log(`\nSUCCESS: All ${routes.length} routes match between static HTML and live rendered DOM!`);
  process.exit(0);
}
