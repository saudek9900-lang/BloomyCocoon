# P3-21: Tap targets, small text and bottom overlap

Branch: ui/p3-21-targets-text. PR title: "P3-21: Tap targets, small text, bottom overlap". Lane L4. Model: Sonnet 5.5, medium thinking. READY. Source: docs/claude/audits/2026-11-20-ui-site-audit.md (U4, U6, U7, U8).

## IMPORTANT
- Do NOT touch footer links; that is P3-15. Never run this at the same time as P3-15.
- Do not rename or redefine Tailwind color tokens. Fonts stay as they are; only font sizes under 12px go up.
- Prefer small CSS changes (padding, min-height) that keep the same look. Do not refactor the mobile `!important` block in styles.css (see ui-phase-bc-proposal.md, section 5).

## Steps
1. **Bottom overlap (U4)**
   - Product pages on phones: add bottom space equal to the sticky bar (`#detail-sticky-bar`, about 65px) while it shows, so the footer's WhatsApp number and © line are not covered.
   - Other pages on phones: leave room so the floating WhatsApp button (48px) does not cover the © line.
   - At 1024: the floating pill must not cover the product add-on box.
   - Do this on the page wrapper or body, not inside the 36 footers.
2. **Tap targets to at least 44px tall (U6)**. Keep the visual size and use padding or min-height:
   - product breadcrumbs
   - "View All Collection →", "Back to Handmade Collection", "Back to Home" links
   - "Also a great fit for" and occasion links on product pages
   - related-page link rows on landing pages
   - home hero buttons (40px)
   - "Read our story" and the Instagram link
   - FAQ `<summary>` rows on category pages
   - "Read article" and "View all articles" on blog pages
   - quick-look Close (42×42) and Add to Cart (42px)
   Product name links under card images are optional: do them only if the card layout does not change.
3. **Text at least 12px (U7)**:
   - cart drawer advance line (`#cart-drawer-advance-line`, 11px)
   - product card badges
   - "Coming soon" badge (10px)
   - product page spec labels, trust tiles and price note
   - /custom-order preview lines
4. **Glitches (U8)**: stop the home "View All →" link wrapping at 375, and keep "+₹89" on one line on the product page.

## Verify
- Playwright at 375, 768, 1024 and 1440 on: home, /collections, /products/baby-bear-plushie, /custom-order, /faq, /crochet-bouquets, /send-gifts-to-kerala, /blog and one blog post.
  - No horizontal scroll.
  - Re-measure every item above and list before/after sizes in the PR.
  - Scrolled to the bottom at 375, nothing fixed covers footer text.
- One H1 and one footer per page. npm run build, npm run test:jsonld and all test:* scripts pass.
