# P1-3: Order steps and trust strip

Branch: ux/p1-3-order-steps. PR title: "P1-3: Order steps and trust strip". One commit per step.

## Why
Orders finish on WhatsApp with a 50% advance. Indian buyers are wary of paying unknown sellers in advance. Product, cart and custom-order pages do not explain the steps (checked 2026-11-20: "photo approval" appears 0 times on product pages and /cart). A clear steps block and honest trust signals reduce drop-off.

## Steps
O1 One shared "How ordering works" component with exactly these 6 steps (approved wording):
  1. Add your gifts to the cart.
  2. Send your order to us on WhatsApp.
  3. We confirm the final price, delivery charge and date with you.
  4. Pay a 50% advance by UPI or Google Pay.
  5. We send you a photo of your finished gift to approve.
  6. Pay the balance, and we dispatch your gift.
  Show it on: every product page (after the buttons/trust line, before the FAQs), the /cart page (near the WhatsApp button), and /custom-order. In the cart drawer show one line only: "50% advance only after we confirm on WhatsApp. You approve a photo before paying the rest." If the home page already has order steps with other wording, make them use this same component/wording.
O2 Trust strip on product pages near the price: "Handmade in Mampad, Kerala · 50% advance after WhatsApp confirmation · Photo approval before dispatch · Made and delivered in 1-2 weeks". Merge with the existing trust line from Prompt 3 U3; do not show both.
O3 FAQ: add to product FAQs and /faq: Q "Why do you ask for a 50% advance?" A "Each gift is made by hand for you. The advance lets us start making it, and you approve a photo of the finished gift before paying the balance." Include it in FAQPage JSON-LD where FAQs are built.
O4 If the WhatsApp number (+91 90611 74579, same as the wa.me links) is not visible as text on /contact and in the footer, add it there.

## Rules
- One source of truth for the steps text. No other new claims. Material Symbols icons only (no emoji). Tap targets 44px. Check 375px and 1440px.

## Verify (in the final report)
- Where each block appears (route list). Screenshots at 375px of a product page, /cart and /custom-order (not committed).
- npm run build and npm run test:jsonld pass. One H1, one canonical, one footer per page. No layout shift added (report CLS from a local Lighthouse run on one product page, before and after).
