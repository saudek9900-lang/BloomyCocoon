# P3-10c (C1): Cart polish

Branch: ui/c1-cart. PR title: "C1: Cart polish". WAITING for Saud's decisions and for B1 to be merged. Model: Sonnet 5.5, medium thinking. Source: docs/claude/ui-phase-bc-proposal.md (section 3). Risk medium: test at 375 and 768.

## Needs from Saud (STOP and ask if missing)
- Wording for how advance amounts are shown (they must not look final).
- Decision on "Popular" / "Bestseller" style claims (no sales data).
- Should the floating WhatsApp button hide on /cart.

## Steps
1. Toast never covers the drawer's main button; fix the "Full Page" button wrap and the delivery line.
2. /cart tap targets to 44px (breadcrumb, Continue Shopping, product link, note input, add-on checkboxes). Footer links are a separate decision.
3. Advance amounts shown so they do not look final (page and WhatsApp message).
4. Empty cart picks built from the catalog; drop badge claims that have no data.
5. Floating WhatsApp button on /cart per Saud's decision.

## Verify
- 375px and 768px, no horizontal scroll. npm run build and npm run test:jsonld pass.
