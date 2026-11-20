# UI upgrade plan (proposed 2026-11-20)

Status: PROPOSED. Nothing here is built. None of these are in the CLAUDE.md task queue yet.
Source: phone-width (375px) review of home, /collections, a product page and a category page, using the `ui-ux-pro-max` checklist. Builds on `docs/claude/audits/2026-11-20-ui-site-audit.md`.

## How to use this file
- When Saud says "do the UI upgrade plan" (or names an item, for example "do U-3"), read this file first.
- Ask Saud which items he wants. Then draft a prompt in `docs/claude/prompts/` for each chosen item and add it to the CLAUDE.md queue, in a separate docs PR. Do not build from this file directly.
- Every item is a normal L4 task: Sonnet 5.5, medium thinking, one branch, one PR.

## Guardrails (all items)
- Branding unchanged: colour tokens, Playfair Display + Inter, logo, wording of page text.
- SEO unchanged: no change to titles, meta, H1s, canonicals, URLs, JSON-LD, sitemap or visible copy. Text that is shortened or collapsed must stay in the HTML (not removed).
- No new data claims: no reviews, ratings, "X sold", stock counts, urgency or invented prices. Prices stay "Starting from".
- No fake alerts or animations that suggest activity that is not real.
- Checks per item: 375 / 768 / 1024 / 1440, no horizontal scroll, 44px tap targets, 4.5:1 contrast, CLS under 0.1, visible focus, reduced motion respected.
- Before the PR: merge origin/main, then `npm run build`, `npm run test:jsonld` and all `test:*` scripts. Do not commit `public/sitemap.xml`.

## Already queued (do not duplicate)
P3-15 footer tap targets, P3-16 "Customise this" link, P3-17 related grid, P3-18 font CLS, P3-19 image weight, P3-20 keyboard focus, P3-21 tap targets / small text / bottom overlap, P5-1 photo galleries.

## Phase 1: quick wins (low risk, small CSS or markup)

| ID | Upgrade | Why | Where (to confirm when building) |
|----|---------|-----|----------------------------------|
| U-1 | Remove the pulsing ping dot on the floating WhatsApp button | It looks like an unread-message alert that is not real, and it animates on every page. Keep the button and its label. | `index.html` ~5235-5242 (`#whatsapp-global-float`, `animate-ping`) |
| U-2 | Keep "Starting from ₹X" tidy on product cards | The price wraps to 2 lines on phones, so cards become uneven. Use a small "Starting from" label above the price. Same words, same prices. | `getProductCardMarkup` in `app.js` and `src/product-cards.mjs` (both must match) |
| U-3 | Search box placeholder not cut off on phones | It shows "Search roses, p". Shorten it or give the input more width. | `/collections` search input in `index.html` |
| U-4 | Show that category chips scroll sideways | The chip row has no sign that more chips exist. Add a soft fade on the right edge. Keep chips as they are (44px min height, Material icons). | `index.html` ~909-917 (`data-category-filter`) |

Conflicts: U-2 touches the product card, so not at the same time as P3-17. U-3 and U-4 touch `/collections` only.

## Phase 2: medium upgrades

| ID | Upgrade | Why | Notes |
|----|---------|-----|-------|
| U-5 | Show products sooner on /collections (phone) | Two text blocks push the first product below the fold. | Collapse the second text block to about 2 lines with a "Read more" toggle (`<details>` or aria-expanded button). The full text stays in the HTML, so SEO is unchanged. Do not delete or reword text. |
| U-6 | Product page: one Add to Cart at a time | The sticky bar and the main button show together on a phone. | Show the sticky bar only after the main button scrolls out of view (IntersectionObserver). Add bottom padding so the footer is not covered (works with P3-21). |
| U-7 | Add-on rows show the selection clearly | Add-ons ("Handwritten Calligraphy Note Card", "Warm Fairy Lights") have no strong selected state. | Add a check mark and light highlight when ticked. Show a running total only from existing prices, for example "₹149 + ₹49". Also stop the "+₹89" wrapping onto two lines (P3-21 U8 also touches this: do U-7 after P3-21). |
| U-8 | Home hero on phones: photo earlier | The visitor reads a long paragraph before any product photo. | Move or shrink the hero photo so it appears higher. All hero text stays. Watch CLS and LCP: keep width/height on the image. Home only. |

Conflicts: U-6 and U-7 change the product page: not at the same time as P3-16, P3-17, P3-19, P5-1. U-5 touches `/collections`: not at the same time as U-3 or U-4.

## Phase 3: bigger, later (after P5-1 photo galleries)

| ID | Upgrade | Notes |
|----|---------|-------|
| U-9 | Swipe on product images, plus a "pinch to zoom" hint | Best built together with, or right after, P5-1. Use existing images only. |
| U-10 | "Recently viewed" strip on product and cart pages | Stored on the visitor's phone only (localStorage in try/catch). No new data, no tracking change without asking Saud. |
| U-11 | "Added to cart" toast with Undo | Replaces opening the full drawer on every add. Keep the cart drawer available. Needs a live-region message such as "Rose Bouquet added to cart" so screen readers hear it. Check cart and tracking events (`test:cart`) still pass. |

## Suggested order
1. Phase 1 (U-1 to U-4) as one small PR each, or U-1 and U-3 together if Saud prefers fewer PRs.
2. U-5, then U-6 and U-7 (after P3-17, P3-19, P3-21 are merged), then U-8.
3. Phase 3 only after the P5 image tasks are merged.

## Not suggested
- Reviews, star ratings, "X sold", "only N left" or countdowns. There is no real data, and the ground rules forbid inventing it.
- New colours, new fonts, a redesign of the header or logo.

## Open questions for Saud (ask before drafting prompts)
1. Phase 1 as 4 PRs or grouped?
2. U-8: is a smaller hero photo on the home page acceptable, or must it stay full width?
3. U-10 / U-11: do you want these at all? (They are optional.)
