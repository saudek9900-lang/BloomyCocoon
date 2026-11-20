// Regression guard: /collections deep links (?category=, ?q=, ?search=, ?sort=) must load without script errors,
// keep search, filters and the cart drawer working, and sort correctly.
// Usage: npm run build && npm run test:collections   (needs Playwright; Chromium must be installed)
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { console.error('Playwright is not installed. Install it to run this check.'); process.exit(2); }

const PORT = 4179;
const BASE = `http://127.0.0.1:${PORT}`;
const catalog = JSON.parse(readFileSync(new URL('../src/catalog.json', import.meta.url), 'utf8'));
const byCat = (c) => catalog.filter((p) => p.category === c);

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], { stdio: 'ignore' });
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop);

async function waitUp() {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`${BASE}/collections`); if (r.ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('preview server did not start (run npm run build first)');
}

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); };

async function open(browser, path) {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  return { page, errors, ctx };
}
const visible = (page) => page.$$eval('#collection-product-grid .product-card', (els) => els.filter((e) => e.style.display !== 'none').map((e) => e.getAttribute('data-product-id')));

try {
  await waitUp();
  const browser = await chromium.launch();

  // 1. category deep link
  {
    const { page, errors, ctx } = await open(browser, '/collections?category=plushies');
    check(errors.length === 0, `category deep link: no script errors ${errors[0] ? '(' + errors[0] + ')' : ''}`);
    check(await page.evaluate(() => typeof window.filterCollectionCategory === 'function' && typeof window.handleCollectionSearch === 'function'), 'category deep link: filter and search functions exist');
    const ids = await visible(page).catch(() => []);
    check(ids.length === byCat('plushies').length, `category deep link: shows only plushies (${ids.length} of ${byCat('plushies').length})`);
    await page.click('#collection-product-grid .product-card:not([style*="display: none"]) [data-add-to-cart]').catch(() => {});
    await page.waitForTimeout(300);
    check(await page.evaluate(() => document.getElementById('sideCart')?.classList.contains('cart-visible')), 'category deep link: add to cart opens the cart drawer');
    await ctx.close();
  }

  // 2. search deep links (?q= and ?search=)
  for (const [qs, term] of [['q=berry', 'berry'], ['search=bear', 'bear']]) {
    const { page, errors, ctx } = await open(browser, `/collections?${qs}`);
    check(errors.length === 0, `?${qs}: no script errors`);
    check((await page.inputValue('#collection-search-input').catch(() => '')) === term, `?${qs}: search box is filled`);
    const n = (await visible(page).catch(() => [])).length;
    check(n > 0 && n < catalog.length, `?${qs}: results are filtered (${n} of ${catalog.length})`);
    await ctx.close();
  }

  // 3. sort deep link
  {
    const { page, errors, ctx } = await open(browser, '/collections?category=plushies&sort=price-desc');
    check(errors.length === 0, 'sort deep link: no script errors');
    const ids = await visible(page).catch(() => []);
    const prices = ids.map((id) => catalog.find((p) => p.id === id).startingPrice);
    check(prices.length > 1 && prices.every((p, i) => i === 0 || prices[i - 1] >= p), 'sort deep link: price high to low');
    await ctx.close();
  }

  // 4. plain /collections still works and sort + URL state sync
  {
    const { page, errors, ctx } = await open(browser, '/collections');
    check(errors.length === 0, 'plain /collections: no script errors');
    await page.selectOption('#collection-sort', 'price-asc').catch(() => {});
    await page.waitForTimeout(200);
    const ids = await visible(page).catch(() => []);
    const prices = ids.map((id) => catalog.find((p) => p.id === id).startingPrice);
    check(prices.length === catalog.length && prices.every((p, i) => i === 0 || prices[i - 1] <= p), 'sort control: price low to high');
    check(page.url().includes('sort=price-asc'), 'sort control: choice is kept in the URL');
    await page.fill('#collection-search-input', 'zzzz');
    await page.waitForTimeout(600);
    check(page.url().includes('q=zzzz'), 'search: query is kept in the URL');
    const msg = await page.textContent('#collection-empty-state');
    check(/zzzz/.test(msg || ''), 'empty state: shows what was searched');
    await ctx.close();
  }

  await browser.close();
} catch (e) {
  failures.push(String(e));
  console.error(e);
} finally {
  stop();
}
if (failures.length) { console.error(`\n${failures.length} check(s) failed`); process.exit(1); }
console.log('\nAll collection deep-link checks passed.');
