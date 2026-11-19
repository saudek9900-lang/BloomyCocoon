# P1-4: Titles and meta for pages that already get impressions

Branch: content/p1-4-titles-meta. PR title: "P1-4: Titles and meta (CTR)". One commit per page.

## Why
Search Console 20 Oct-16 Nov 2026: /return-gifts ranks ~5.7; the amigurumi post had 33 impressions at position 5.5 and 0 clicks; "crochet anniversary gifts" shows up. Better titles and descriptions should turn impressions into clicks.

## Steps
T1 First find where each page's <title>, meta description, og and twitter tags come from (src/route-content.mjs, blog frontmatter, generator). Change them at the source so all copies match.
T2 /return-gifts: title "Crochet Return Gifts, Handmade in Kerala | From ₹<X> | BloomyCocoon", where X is the lowest real startingPrice among products listed on /return-gifts in src/catalog.json. If over 60 characters, drop the price part. Meta description 140-155 characters: handmade crochet return gifts for birthdays and functions, bulk orders confirmed on WhatsApp.
T3 /anniversary-gifts: keep the title unless over 60 characters. Meta description 140-155 characters that includes "Order 12-14 days ahead".
T4 Amigurumi post (content/blog/what-is-amigurumi-crochet-plushies-guide.md): title "What Is Amigurumi? Meaning, Examples & Handmade Gift Ideas" (if with the site suffix it passes 60 characters, shorten the suffix or wording, keep "What Is Amigurumi?" first). New description 140-155 characters. Rewrite only the first paragraph so the first 40 words answer "what is amigurumi" directly. Slug, date, image, related and the rest of the body stay.

## Rules
- No URL changes. No invented facts or "best"/"No.1" claims.

## Verify (in the final report)
- Old vs new title and description for each page, with character counts.
- Built pages: <title>, meta description, og/twitter, H1 and JSON-LD headline/name consistent.
- npm run build and npm run test:jsonld pass.
