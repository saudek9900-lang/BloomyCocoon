# P3-2: Crochet bouquet price guide

Branch: content/p3-2-price-guide. PR title: "P3-2: Crochet bouquet price guide". One commit for the engine change, one for the post.

## Why
"bouquet price" has about 880 searches a month in India, and buyers compare prices. A guide using only our real prices can win that search and answer the price question before WhatsApp.

## Steps
G1 Blog engine: add a placeholder (e.g. {{price-table:bouquets}}) that renders, at build time, a table of every product in a category with its name, link and "Starting from" price from src/catalog.json. Prices then never drift from the catalog.
G2 Post content/blog/crochet-bouquet-price-guide.md, "Crochet Bouquet Price Guide (India)", 800-1,000 words, date = commit date: the price table; that prices are "Starting from" and the final price is confirmed on WhatsApp; add-on prices exactly as the site shows them; ordering steps; link to /crochet-bouquets, /custom-order and the existing post crochet-bouquet-vs-fresh-flowers. `products:` list if available.

## Rules
- No competitor names or prices. Do not explain what changes the final price beyond "your choices, confirmed on WhatsApp" unless the site already says more.

## Verify (in the final report)
- Rendered table matches catalog.json. npm run build and npm run test:jsonld pass.
