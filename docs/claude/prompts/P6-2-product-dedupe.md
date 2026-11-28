# P6-2: Product page de-duplication

Start by syncing local files with GitHub (CLAUDE.md step 0). Branch: content/p6-2-product-dedupe. PR title: "P6-2: Product page de-duplication". Lane L6. Run ALONE (no other task PR open). Model: Opus 5.5, high thinking.
Read first: docs/claude/growth-plan-2026-11-28.md (why), CLAUDE.md (rules), docs/claude/data/owner-answers.md (the only source of policy facts).

## Why
About 88% of the text on each of the 71 product pages is identical (8 shared FAQs, the 6-step order block, add-ons, trust lines). Only about 12% is unique (the P2-1 description). Google finds the URLs but does not index 41 of them. Goal: raise the unique share of each product page's text from about 12% to 30% or more by REMOVING shared text and adding only true, page-specific text. Never pad.

## Steps
T0 Baseline (do this first, before any edit)
- `npm run build`. Write a script (keep it in /tmp, do not commit it) that reads the 71 dist/products/*/index.html pages, takes the visible text of the product section, splits it into sentences, and reports per page: total words, words in sentences that appear on 10 or more of the 71 pages (shared), and unique share = 1 - shared/total. Save the per-page numbers and the average. This is the "before" number.

T1 Shared FAQs
- Find where the shared product FAQs live: the `#detail-faq-accordion` block in the product screen of index.html (and any copy in app.js). Category FAQs are appended by `CATEGORY_PRODUCT_FAQS` in src/route-content.mjs, used in scripts/generate-route-html.mjs (step 13).
- Before deleting any shared FAQ, confirm its question and answer already exist on /faq. If one does not, STOP and tell Saud which one (do not delete it, do not rewrite it).
- Remove the shared FAQs from product pages. /faq keeps them.
- Each category gets exactly 3 FAQs (7 categories). Keep the 2 that exist today in `CATEGORY_PRODUCT_FAQS`. Add one third per category, using ONLY these known facts, worded without new claims:
  - care: from the care paragraph already in content/products/*.md (soft dry brush, avoid prolonged direct sunlight, no heavy objects, do not pull stitches)
  - customisation: colours, size and names confirmed on WhatsApp before making begins
  - occasions: only the occasion pages that product already links to (use `getMatchingOccasions`)
  - timing: made to order, delivered in 1-2 weeks
  - damage: unboxing video within 24 hours of delivery; no returns after purchase; damaged items replaced where feasible (Q15)
  No sizes, hours, brands, tracking promises, delivery fees or dates (Ground rules in CLAUDE.md).
- The product JSON-LD FAQPage (`getProductSchemaGraph`) must contain exactly the FAQs that are visible on the page, with the same words. `npm run test:jsonld` must pass.

T2 Order block
- Replace the 6-step order block on product pages with one short paragraph of facts already on the site: made to order, delivered in 1-2 weeks, final price and delivery charge confirmed on WhatsApp before making begins, 50% advance by UPI or Google Pay, balance after photo approval before dispatch. Link "See all order steps" to where the full steps already live (find it: home page section or /faq). Do not create a new page.
- The full 6 steps stay on every other page that has them today (home, categories, occasion pages). Only product pages change.

T3 "Pairs well with"
- Add one line on each product page with 2 links to real products from src/catalog.json, chosen by a fixed, deterministic rule written in code (for example a category-to-partner-category map; first 2 products in catalog order, never the product itself, never a product already in the related-products grid on that page). No invented claims about the pairing: the line only says "Pairs well with" and shows the product names as links. No prices in the line.
- No duplicate links, no broken links.

T4 Check the result
- Re-run the T0 script on the new dist/. Report average unique share before and after, plus the 5 pages with the lowest "after" share. If the average is below 30%, say so plainly. Do not add filler to reach the number; list what else could be removed or what real data is missing (for example sizes, photos).

## Rules
- Keep every product URL, canonical and redirect. Exactly one H1, one canonical, one footer per page. Valid JSON-LD. No shippingDetails, aggregateRating or review.
- UK spelling for visible text. Prices only as "Starting from". No invented facts.
- Do not touch product titles or meta descriptions (done in P6-1), catalog.json, images, or the footer.
- The single-page app and the static HTML must show the same product content. Check app.js and the generator, open one product page from dist/ and one through the SPA route, and compare.
- Do not commit public/sitemap.xml.

## Verify (in the final report)
- Before and after unique-share numbers (average, lowest 5 pages).
- For all 71 product pages: FAQ count is 3, visible FAQs equal JSON-LD FAQs, exactly one H1 and one canonical, "Pairs well with" has 2 links that resolve to real products.
- Screenshots (do not commit): one product page at 375 px and 1440 px, before and after. Describe layout problems, if any.
- `git fetch origin && git merge origin/main`, then `npm run build`, `npm run test:jsonld` and EVERY `test:*` script. If a test needs Playwright and it is not installed, try `npx playwright install chromium` once. If the tests still cannot run, DO NOT MERGE. Report which tests did not run and why, and give the PR link so Saud decides.
- If everything passes, merge the PR yourself by the "Merging" rules in CLAUDE.md, sync main, report the merge commit id.
- Next runnable task: P6-3 (icons to inline SVG) is NOT DRAFTED. Tell Saud to ask the planning chat for it; it needs Opus 5.5, high thinking, and runs alone.
