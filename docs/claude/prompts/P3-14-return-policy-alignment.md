# P3-14: Return policy alignment

Branch: content/p3-14-return-policy. PR title: "P3-14: Return policy alignment". Lane L2. Model: Sonnet 5.5, medium thinking. WAITING until owner-answers Q15 is filled. Source: docs/claude/audits/2026-11-20-seo-audit.md (finding M3).

## Steps
R1 If Q15 is TODO, STOP and tell Saud.
R2 Make the /returns-cancellations page text, the damage FAQ answers and the product JSON-LD `hasMerchantReturnPolicy` all say what Q15 says. Today the JSON-LD says `MerchantReturnNotPermitted` while the page says "repair or replacement where feasible".
R3 If Q15 changes the JSON-LD category, change it in the one place that generates it, for all 69 products.
R4 Keep the Q6 wording (send an unboxing video, or raise a query within 2 days of delivery).
R5 No new promises about refunds, shipping or timelines.

## Verify
- Old vs new text in the PR. npm run build and npm run test:jsonld pass.
- No shippingDetails, aggregateRating or review added.
