# P6-1: Product meta fix + CTR titles

Start by syncing local files with GitHub (CLAUDE.md step 0). Branch: content/p6-1-snippets. PR title: "P6-1: Product meta fix + CTR titles". Lane L6. Model: Sonnet 5.5, medium thinking.
Read first: docs/claude/growth-plan-2026-11-28.md (why this task exists) and CLAUDE.md (rules).

## Why
- 43 of 71 product meta descriptions are cut in the middle of a sentence, for example "...for personal Starting from ₹199." Cause: `buildProductDescription()` in src/route-content.mjs slices the catalog description to fit 160 characters, then glues " Starting from ₹X. Made to order in Kerala, customise on WhatsApp." onto the cut text.
- Search Console 31 Oct to 27 Nov 2026 (impressions, click rate, average position): price guide 116, 0.9%, 5.4 · /return-gifts 93, 3.2%, 5.9 · /about 56, 5.4%, 6.5 · /crochet-baby-gifts 41, 2.4%, 11.7 · /collections 29, 3.4%, 7.2. Pages are shown but not clicked: titles and descriptions need to be clearer.

## Steps
T1 Product meta (all 71 product pages)
- Find every place the product description is built. Start with `buildProductDescription` and `getProductRouteMetadata` in src/route-content.mjs, then check scripts/generate-route-html.mjs and index.html for separate copies (meta description, og:description, twitter:description). Fix at the source so all copies match.
- New rule for every product description: built from whole sentences only, never cut inside a sentence; ends with a full stop; 110 to 160 characters; "Starting from ₹<price>." stays as its own sentence; keeps "Made to order in Kerala." The "customise on WhatsApp" part may be dropped when the text is too long.
- Use the first sentence of the catalog description when it fits. Some catalog descriptions have no final full stop: add one in the output, not in catalog.json. If even the first sentence does not fit, use only: "Handmade crochet <name>, made to order in Kerala. Starting from ₹<price>." Do not invent any other wording.
- Titles stay as they are.
- If the product JSON-LD description uses the same function, it may change with it. It must still pass `npm run test:jsonld`.

T2 CTR rewrites (title 60 characters or less including the site suffix; description 140 to 155 characters)
Find where each page's title, description, og and twitter tags come from (route-content.mjs, blog frontmatter) and change them at the source.
- Price guide (content/blog/crochet-bouquet-price-guide.md): title starts with "Crochet Bouquet Price in India" and carries "From ₹X", where X is the lowest startingPrice in the bouquets category of src/catalog.json (read it, do not hardcode). Example shape: "Crochet Bouquet Price in India: From ₹X | BloomyCocoon". Description: says what the page gives (starting-from prices for every bouquet and stem, add-ons, how ordering works) and that the final price is confirmed on WhatsApp.
- /return-gifts: title starts with "Crochet Return Gifts" and carries "From ₹X", where X is the lowest startingPrice among products listed on that page. Mention "bulk orders" and "no minimum" only if the page's own FAQ (P3-11) already says so. Description: birthdays and functions in Kerala, bulk orders confirmed on WhatsApp.
- /crochet-baby-gifts: title starts with "Crochet Baby Gifts"; lowest baby-gifts startingPrice from the catalog. Description mentions only items that appear on the page.
- /collections: keep the main phrase, add the number of products from the catalog (count, do not hardcode).
- /about: description only. Use facts already on /about; add no new facts.
- Do NOT change the amigurumi post: it ranks 9 to 30 for its queries, so this is a ranking problem, not a title problem.

T3 Overlap check: /return-gifts (people ready to buy) and /blog/crochet-return-gift-ideas (people looking for ideas). Confirm that /return-gifts links to the post and that the post links to /return-gifts near the top. If either link is missing, add one plain sentence with a normal link. No other body changes.

## Rules
- No URL, canonical or redirect changes. No invented facts. No "best", "No.1" or "cheapest" claims.
- UK spelling for visible text (Q18). Prices always as "Starting from" or "From".
- Do not commit public/sitemap.xml (the build regenerates it).

## Verify (in the final report)
- A script run on dist/ for all 71 product pages: every meta description ends with ".", length is 110 to 160, and the pattern `[a-z,] Starting from` matches 0 times. Paste the counts.
- Table: old vs new title and description for the 5 pages in T2, with character counts.
- Built pages: title, meta description, og and twitter tags, H1 and JSON-LD name are consistent. One H1 and one canonical per page.
- `git fetch origin && git merge origin/main`, then `npm run build`, `npm run test:jsonld` and any test:* scripts pass.
- Next runnable task: P6-2 is NOT DRAFTED. Tell Saud to ask the planning chat to draft it, and that P6-2 needs Opus 5.5 with high thinking.
- After all checks pass, merge the PR yourself by the "Merging" rules in CLAUDE.md, then sync local main with GitHub and confirm the commit is on origin/main. Include the merge commit id in the final report.
