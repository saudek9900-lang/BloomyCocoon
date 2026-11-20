// Guard for the cart drawer and /cart page: toast never covers the drawer's main button, header does not wrap,
// 44px tap targets on /cart, advance amounts labelled as estimates, no popularity claims in the empty cart,
// floating WhatsApp button hidden on /cart.
// Usage: npm run build && npm run test:cart   (needs Playwright; Chromium must be installed)
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { console.error('Playwright is not installed. Install it to run this check.'); process.exit(2); }

const PORT = 4185;
const BASE = `http://127.0.0.1:${PORT}`;
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], { stdio: 'ignore' });
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop);
async function waitUp() {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(`${BASE}/cart`)).ok) return; } catch {} await new Promise((r) => setTimeout(r, 500)); }
  throw new Error('preview server did not start (run npm run build first)');
}
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); };

const toastCoversButton = (page) => page.evaluate(() => {
  const t = document.querySelector('.toast.show');
  const b = document.querySelector('#sideCart .checkout-btn');
  if (!t || !b) return false;
  const a = t.getBoundingClientRect();
  const d = b.getBoundingClientRect();
  return !(a.bottom < d.top || a.top > d.bottom || a.right < d.left || a.left > d.right);
});

try {
  await waitUp();
  const browser = await chromium.launch();

  for (const width of [375, 768]) {
    const ctx = await browser.newContext({ viewport: { width, height: 812 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`${BASE}/collections`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.click('#collection-product-grid .product-card [data-add-to-cart]');
    await page.waitForTimeout(500);

    if (width === 375) {
      check(await page.evaluate(() => document.getElementById('sideCart').classList.contains('cart-visible')), 'drawer opens after add to cart');
      check(!(await toastCoversButton(page)), 'drawer: no toast covers the main "Continue on WhatsApp" button after add');
      const fp = await page.$eval('#sideCart a[aria-label="Open full cart page"]', (e) => Math.round(e.getBoundingClientRect().height));
      check(fp <= 48, `drawer: "Full Page" button does not wrap (height ${fp}px)`);
      await page.click('#sideCart [data-remove-btn]').catch(() => {});
      await page.waitForTimeout(400);
      check(!(await toastCoversButton(page)), 'drawer: no toast covers the main button after remove');
      // put an item back so the /cart checks below have something to measure
      await page.goto(`${BASE}/collections`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      await page.click('#collection-product-grid .product-card [data-add-to-cart]');
      await page.waitForTimeout(500);
    }

    await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const targets = await page.evaluate(() => {
      const root = document.querySelector('#screen-cart');
      const h = (el) => (el ? Math.round(el.getBoundingClientRect().height) : 0);
      return {
        home: h(root.querySelector('#cart-breadcrumbs a[href="/"]')),
        collection: h(root.querySelector('#cart-breadcrumbs a[href="/collections"]')),
        cont: h([...root.querySelectorAll('a')].find((a) => a.textContent.includes('Continue Shopping'))),
        product: h(root.querySelector('.cart-page-item-card a.font-headline-sm')),
        note: h(root.querySelector('input[data-item-note]')),
        addonRows: [...root.querySelectorAll('.gift-addon-item label')].map((l) => h(l)),
      };
    });
    check(targets.home >= 44 && targets.collection >= 44, `/cart @${width}: breadcrumb links are 44px (${targets.home}, ${targets.collection})`);
    check(targets.cont >= 44, `/cart @${width}: Continue Shopping is 44px (${targets.cont})`);
    check(targets.product >= 44, `/cart @${width}: product name link has a 44px tap area (${targets.product})`);
    check(targets.note >= 44, `/cart @${width}: item note input is 44px (${targets.note})`);
    check(targets.addonRows.length === 2 && targets.addonRows.every((x) => x >= 44), `/cart @${width}: gift add-on rows are 44px (${targets.addonRows.join(',')})`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)), `/cart @${width}: no horizontal scroll`);
    if (width === 375) {
      check(await page.evaluate(() => document.getElementById('whatsapp-global-float').classList.contains('whatsapp-hidden')), '/cart: floating WhatsApp button is hidden');
      const adv = await page.$$eval('#screen-cart .cart-advance-amount', (els) => els.map((e) => e.textContent.trim()));
      check(adv.length > 0 && adv.every((t) => t.startsWith('approx. ')), `/cart: advance amount is labelled approx. (${adv.join(',')})`);
      const txt = await page.innerText('#screen-cart');
      check(/About 50% advance\. Exact amount confirmed on WhatsApp\./.test(txt), '/cart: estimate wording is shown');
      const msg = await page.evaluate(() => window.buildCartWhatsAppMessage());
      check(/approx\. ₹/.test(msg) && /estimates/.test(msg), 'WhatsApp message labels advance and balance as approx.');
    }
    check(errors.length === 0, `cart @${width}: no script errors`);
    await ctx.close();
  }

  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const txt = (await page.innerText('#screen-cart')).replace(/Anniversary Gifts/g, '');
    check(!/Popular|Bestseller|Pocket Love|Anniversary/.test(txt), 'empty cart: no Popular / Bestseller style claims');
    check(/You may like/.test(txt), 'empty cart: heading is "You may like"');
    check((await page.$$('#screen-cart [data-add-to-cart]')).length === 4, 'empty cart: 4 picks from the catalog');
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
console.log('\nAll cart checks passed.');
