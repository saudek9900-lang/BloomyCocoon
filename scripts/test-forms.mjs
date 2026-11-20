// Guard for the custom-order and contact flows: WhatsApp opens from the tap itself, honest wording, no email field,
// 44px swatches, floating button label matches its aria-label, no horizontal scroll.
// Usage: npm run build && npm run test:forms   (needs Playwright; Chromium must be installed)
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { console.error('Playwright is not installed. Install it to run this check.'); process.exit(2); }

const PORT = 4182;
const BASE = `http://127.0.0.1:${PORT}`;
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], { stdio: 'ignore' });
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop);
async function waitUp() {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(`${BASE}/custom-order`)).ok) return; } catch {} await new Promise((r) => setTimeout(r, 500)); }
  throw new Error('preview server did not start (run npm run build first)');
}
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); };

async function open(browser, path, width = 375) {
  const ctx = await browser.newContext({ viewport: { width, height: 812 } });
  await ctx.addInitScript(() => {
    window.__opened = [];
    window.open = (url) => { window.__opened.push({ url: String(url), at: performance.now() }); return null; };
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  return { page, errors, ctx };
}

try {
  await waitUp();
  const browser = await chromium.launch();

  for (const width of [375, 768]) {
    const { page, errors, ctx } = await open(browser, '/custom-order', width);
    check(errors.length === 0, `custom order @${width}: no script errors`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)), `custom order @${width}: no horizontal scroll`);
    if (width === 375) {
      // step 1 -> 3
      await page.click('#step-card-1 button:has-text("Bouquet")').catch(() => {});
      await page.evaluate(() => window.nextOrderStep && window.nextOrderStep());
      await page.waitForTimeout(300);
      const swatches = await page.$$eval('.color-swatch-btn', (els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
      check(swatches.length === 6 && swatches.every((h) => h >= 44), `custom order: colour swatches are 44px tall (${swatches.join(',')})`);
      await page.evaluate(() => window.nextOrderStep && window.nextOrderStep());
      await page.waitForTimeout(300);
      check((await page.textContent('#step-card-3')).includes('send reference photos in the WhatsApp chat'), 'custom order: reference photo line is shown');
      await page.fill('#order-name', 'Test');
      await page.click('#step-card-3 button:has-text("Order on WhatsApp")');
      const opened = await page.evaluate(() => window.__opened);
      check(opened.length === 1 && opened[0].url.includes('wa.me'), 'custom order: WhatsApp opens immediately from the tap (no delay)');
      const success = await page.textContent('#custom-order-success');
      check(/Your request is ready/.test(success) && /Tap Send in WhatsApp to share it with us/.test(success), 'custom order: success wording is the approved one');
      check(!/submitted|Hand-Stitched/i.test(await page.content().then((c) => c.replace(/custom_order_submit|submitCustomRequest/g, ''))), 'custom order: no "submitted" wording left');
      check((await page.getAttribute('#custom-order-wa-link', 'href')).includes('text='), 'custom order: fallback WhatsApp link carries the message');
      check(!(await page.content()).includes('Custom Build'), 'custom order: no "Custom Build" label');
    }
    await ctx.close();
  }

  {
    const { page, errors, ctx } = await open(browser, '/contact');
    check(errors.length === 0, 'contact: no script errors');
    check((await page.$('#contact-email')) === null, 'contact: email field is gone');
    check((await page.textContent('form button[type="submit"]')).trim() === 'Message us on WhatsApp', 'contact: button says "Message us on WhatsApp"');
    await page.fill('#contact-name', 'Test');
    await page.fill('#contact-message', 'Hello there');
    await page.click('form button[type="submit"]');
    const opened = await page.evaluate(() => window.__opened);
    check(opened.length === 1 && decodeURIComponent(opened[0].url).includes('Customer name: Test') && !/Email:/.test(decodeURIComponent(opened[0].url)), 'contact: opens WhatsApp with name and message, no email line');
    const floatInfo = await page.evaluate(() => {
      const el = document.getElementById('whatsapp-global-float');
      return { aria: el.getAttribute('aria-label'), text: el.querySelector('.whatsapp-label-text')?.textContent.trim() };
    });
    check(floatInfo.aria === floatInfo.text, `floating button: aria-label matches visible text ("${floatInfo.aria}" / "${floatInfo.text}")`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)), 'contact: no horizontal scroll');
    await ctx.close();
  }

  await browser.close();
} catch (e) {
  failures.push(String(e)); console.error(e);
} finally { stop(); }
if (failures.length) { console.error(`\n${failures.length} check(s) failed`); process.exit(1); }
console.log('\nAll form checks passed.');
