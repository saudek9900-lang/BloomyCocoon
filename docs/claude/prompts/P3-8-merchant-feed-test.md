# P3-8: Merchant feed test set

Branch: seo/p3-8-feed. PR title: "P3-8: Merchant feed test set". WAITING until owner-answers Q13 is filled.

## Why
Google Merchant free listings are free traffic, but "starting from" prices and WhatsApp-only checkout can be flagged as price mismatch or misrepresentation. Test with a few fixed-price items first.

## Steps
F1 If Q13 is TODO, STOP and tell Saud.
F2 Change the feed generator so google-merchant-feed.xml includes only the product ids listed in Q13, with the exact price and shipping given there. Visible page price and JSON-LD price for those products must equal the feed price.
F3 Keep image_link as PNG.

## Verify
- Feed item count and each item's price vs page price vs JSON-LD. npm run build and npm run test:jsonld pass.
