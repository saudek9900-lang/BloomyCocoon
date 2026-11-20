# P3-3: Product sizes

Branch: content/p3-3-sizes. PR title: "P3-3: Product sizes". WAITING until docs/claude/data/owner-answers.md Q1 is filled.

## Why
The most common complaint about crochet bouquets is "smaller than it looked". Real sizes on the page prevent that.

## Steps
Z1 Read Q1. If it is still TODO, STOP and tell Saud.
Z2 Add a `size` field in src/catalog.json only for products listed in Q1, exactly as written there.
Z3 Show a "Size" row in the product page details and in the quick-look modal. Products without a size show nothing (no placeholder).

## Rules
- Use only Q1 values. Never estimate sizes for other products.

## Verify
- List of products with sizes and the text shown. npm run build and npm run test:jsonld pass.
