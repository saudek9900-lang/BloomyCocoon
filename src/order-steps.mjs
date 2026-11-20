// Single source of truth for the "How ordering works" steps, the cart drawer line and the product trust strip.
// Used at build time (scripts/generate-route-html.mjs) and at runtime (app.js) so the wording never drifts.

export const ORDER_STEPS = [
  { icon: 'shopping_bag', text: 'Add your gifts to the cart.' },
  { icon: 'chat', text: 'Send your order to us on WhatsApp.' },
  { icon: 'receipt_long', text: 'We confirm the final price, delivery charge and date with you.' },
  { icon: 'account_balance_wallet', text: 'Pay a 50% advance by UPI or Google Pay.' },
  { icon: 'photo_camera', text: 'We send you a photo of your finished gift to approve.' },
  { icon: 'local_shipping', text: 'Pay the balance, and we dispatch your gift.' },
];

export const ORDER_STEPS_HEADING = 'How ordering works';

export const ORDER_DRAWER_LINE = 'About 50% advance. Exact amount confirmed on WhatsApp. You approve a photo before paying the rest.';

export const TRUST_ITEMS = [
  { icon: 'verified', text: 'Handmade in Mampad, Kerala' },
  { icon: 'account_balance_wallet', text: '50% advance after WhatsApp confirmation' },
  { icon: 'photo_camera', text: 'Photo approval before dispatch' },
  { icon: 'schedule', text: 'Made and delivered in 1–2 weeks' },
];

export const WHATSAPP_DISPLAY_NUMBER = '+91 90611 74579';

function escapeText(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function getOrderStepsHtml({ heading = true } = {}) {
  const items = ORDER_STEPS.map((step, index) => `
      <li class="flex items-start gap-3 rounded-2xl bg-surface-container-low border border-outline-variant/15 p-4">
        <span class="w-9 h-9 shrink-0 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-md text-sm font-bold" aria-hidden="true">${index + 1}</span>
        <span class="flex items-start gap-2 pt-1.5 font-body-md text-sm md:text-base text-on-surface">
          <span class="material-symbols-outlined text-secondary text-[20px] shrink-0" aria-hidden="true">${step.icon}</span>
          <span>${escapeText(step.text)}</span>
        </span>
      </li>`).join('');
  return `${heading ? `<h2 class="font-headline-md text-2xl text-center mb-6 text-primary">${escapeText(ORDER_STEPS_HEADING)}</h2>` : ''}
    <ol class="order-steps-list grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">${items}
    </ol>`;
}

export function getTrustStripHtml() {
  const items = TRUST_ITEMS.map((item) => `
      <li class="flex items-center gap-1.5"><span class="material-symbols-outlined text-secondary text-[16px]" aria-hidden="true">${item.icon}</span><span>${escapeText(item.text)}</span></li>`).join('');
  return `<ul class="product-trust-strip flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-on-surface-variant list-none p-0">${items}
    </ul>`;
}

// Build time: fill placeholders in an HTML string.
export function fillOrderPlaceholders(html) {
  return html
    .replace(/<div data-order-steps(?:="(no-heading)")?><\/div>/g, (_m, variant) => `<div data-order-steps${variant ? '="no-heading"' : ''}>${getOrderStepsHtml({ heading: !variant })}</div>`)
    .replace(/<div data-trust-strip><\/div>/g, () => `<div data-trust-strip>${getTrustStripHtml()}</div>`);
}

// Run time: fill any placeholder that is still empty (for example when running the unbuilt app).
export function hydrateOrderPlaceholders(root = document) {
  root.querySelectorAll('[data-order-steps]').forEach((el) => {
    if (el.children.length === 0) el.innerHTML = getOrderStepsHtml({ heading: el.getAttribute('data-order-steps') !== 'no-heading' });
  });
  root.querySelectorAll('[data-trust-strip]').forEach((el) => {
    if (el.children.length === 0) el.innerHTML = getTrustStripHtml();
  });
}
