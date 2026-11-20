# P3-11: Return-gifts FAQ update (bulk orders)

Branch: content/p3-11-return-faq. PR title: "P3-11: Return gifts bulk order FAQ". Priority task. Model: Sonnet 5.5, low or medium thinking (small edit).

## Steps
1. On /return-gifts, update the FAQ answer about minimum quantity to say: bulk orders are welcome, there is no minimum order quantity, and the final price is confirmed on WhatsApp (owner-answers Q5).
2. Check the same fact is not contradicted elsewhere on /return-gifts, in route-content.mjs FAQ data, and in llms.txt. Fix any contradiction to match Q5.
3. Do NOT add pack sizes, pack prices or discounts. Q5 gives none.

## Verify
- Old vs new text in the PR. npm run build and npm run test:jsonld pass. FAQPage JSON-LD still matches the visible FAQ.
