# P2-1: Unique product descriptions

Branch: content/p2-1-product-descriptions. PR title: "P2-1: Unique product descriptions". One commit per category.

## Why
Product descriptions in src/catalog.json are very short (checked 2026-11-20: median 12 words, min 8, max 32). Thin, similar product pages are a main reason Google leaves them "Discovered - currently not indexed". Target 150-250 words of unique, useful text per product.

## Steps
D1 Add a long description per product: a `longDescription` field in src/catalog.json, or content/products/<id>.md if cleaner (say which and why). Keep the short `description` unchanged (cards, feed, JSON-LD).
D2 Render it on the product page in the details area under the heading "About this gift". Static HTML, not JS-only.
D3 Write all 69. Each covers, in natural varied prose:
  - what the gift is (only from its name, category, short description and badge);
  - who and which occasions it suits (only occasions whose pages list this product, plus the category's obvious uses);
  - how personalising works (colours/name/message confirmed on WhatsApp, only options the site already offers for that product);
  - care (only wording already on /crochet-care);
  - ordering and timing (1-2 weeks, 50% advance, photo approval).
D4 Report: word count per product; duplicate check (no sentence repeated in more than 3 products, except one standard ordering sentence); a list of near-duplicate products (e.g. the same item in other colours). Do NOT merge products or change URLs; only list them for Saud.

## Rules
- No sizes, dimensions, flower counts, weights, yarn brands or types, durability claims beyond /crochet-care wording, "best"/"No.1", reviews or customer stories, nothing about how images were made.
- If the data is not enough to say something specific, write shorter (min 120 words) rather than invent.

## Verify (in the final report)
- npm run build and npm run test:jsonld pass. One H1 per page. Product page HTML size before/after for one product.
- Paste 3 sample descriptions (one bouquet, one plushie, one keychain).
