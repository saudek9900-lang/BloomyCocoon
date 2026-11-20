# P3-19: Product page image weight (lightbox and quick-look)

Branch: ui/p3-19-image-weight. PR title: "P3-19: Product page image weight". Lane L4. Model: Sonnet 5.5, medium thinking. READY. Source: docs/claude/audits/2026-11-20-ui-site-audit.md (U3).

## Problem
- On every product page, app.js (~1442) sets the hidden zoom lightbox (`#lightbox-img`, index.html ~5174) to the full PNG. Example: cozy_bear_plushie_baby-bear-plushie.png, 853 KB. The visible hero already uses a 480w WebP (43 KB), so the page downloads about 20× more image than it shows.
- The quick-look modal image is `<img id="modal-product-img" src="">` (index.html ~5301). An empty src can make some browsers request the page again.

## Rules
- Do not change what any image shows, its file name or its alt text. Do not create images.
- og:image, twitter:image and the Merchant feed image_link stay PNG. Only the on-page lightbox changes.
- P5-1 also changes the product template, so do not run this at the same time as P5-1 or P3-16.

## Steps
1. Set the lightbox image only when Zoom is opened (the lightbox open function, app.js ~1337), and use the existing full-size `.webp` of the product image. If no WebP exists, fall back to the current PNG.
2. Remove the empty `src=""` from the quick-look image. Set it when the modal opens (it already gets set there; check).
3. Zoom must still open the large image, with the same alt text.

## Verify
- With Playwright, load /products/baby-bear-plushie at 375 and list the image requests. The PNG must not load until Zoom is tapped. After Zoom, the large image shows.
- The quick-look modal still shows its image on /collections.
- npm run build, npm run test:jsonld and all test:* scripts pass.
