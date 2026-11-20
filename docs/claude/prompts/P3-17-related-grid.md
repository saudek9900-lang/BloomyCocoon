# P3-17: Fix the "You May Also Like" grid on product pages

Branch: ui/p3-17-related-grid. PR title: "P3-17: Related products grid fix". Lane L4. Model: Sonnet 5.5, medium thinking. READY. Source: docs/claude/audits/2026-11-20-ui-site-audit.md (U1).

## Problem
On all 69 product pages, the "You May Also Like" grid (`#detail-related-products-grid`, index.html ~5143) is `grid-cols-2 md:grid-cols-4`. The cards come from `getProductCardMarkup` (app.js ~3939, and src/product-cards.mjs), which use `md:col-span-4`, or `md:col-span-8` for featured products. Those spans assume a 12-column grid.
- At 1440 this produced 8 columns and cards 668, 1104, 668 and 420px wide.
- On phones, a featured product renders as the big wide card and leaves a half-empty row.

## Steps
1. Make the related grid show 4 equal cards on desktop and 2 per row on phones. Recommended: render related cards with `featured: false`, as the blog does in src/blog-engine.mjs, and give the grid a column count that matches the card spans (for example `md:grid-cols-12`, which other grids use). Keep the change local to the related grid.
2. Do not change the order or choice of related products, prices, badges or images.
3. Do not change other product grids (collections, landing pages, home).

## Verify
- Playwright at 375, 768, 1024 and 1440 on at least 3 product pages, including /products/baby-bear-plushie, whose related list includes a featured product. Expect 4 equal cards per row on desktop, 2 per row on a phone, and no empty half rows.
- No horizontal scroll. One H1, one footer.
- npm run build, npm run test:jsonld, npm run test:collections, npm run test:forms and npm run test:cart pass.
- Card widths before and after go in the PR body (no screenshots committed).
