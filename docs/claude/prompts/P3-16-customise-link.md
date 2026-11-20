# P3-16: "Customise this" link on product pages (optional)

Branch: ui/p3-16-customise-link. PR title: "P3-16: Customise this link". Lane L4. Model: Sonnet 5.5, medium thinking. Optional, low priority. WAITING for Saud's decision on the link wording. Source: docs/claude/ui-phase-bc-proposal.md (B2 item 6, finding 2.8).

## Needs from Saud (STOP and ask if missing)
- Approved link wording (for example "Want it in other colours? Customise this").
- Which product categories should show it.

## Steps
1. Add one link on the product page that opens /custom-order with the type pre-filled (Bouquet, Plushie, Keychain, Coaster Set, Accessory or Other, matched from the product category).
2. /custom-order reads the type from the URL and selects it. A bad or missing value falls back to the current behaviour.
3. Keep /custom-order indexable as today. No new claims.

## Verify
- 375px and 768px, no horizontal scroll. npm run build, npm run test:jsonld and npm run test:forms pass.
