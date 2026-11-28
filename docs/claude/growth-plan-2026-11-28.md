# Growth plan and priority list (28 Nov 2026)

Repo copy for Claude Code. Task prompts: docs/claude/prompts/P6-*.md. Queue and lanes: CLAUDE.md (lane L6). Read this before any P6 task.

Source: full check on 28 Nov 2026. Live data from Search Console, GA4 and URL Inspection (all 113 sitemap URLs). A local build of main (ccfb197, same commit as the live production deploy) was checked for page text, links and meta, and Lighthouse was run on it in mobile mode. The UI UX Pro Max checklist was used for the UI review.
Not checked: keyword volumes and backlinks (OpenSEO has no credits left), and real-user Core Web Vitals (too little traffic for field data).

## Where we stand
| Measure | 14 Nov baseline | 28 Nov now |
|---|---|---|
| Indexed URLs (sitemap) | 33 | **70 of 113** |
| Indexed products | 14/69 | **30/71** |
| Blog posts indexed | 0/6 | **8/8** |
| Category + occasion pages indexed | 12/13 | **all** |
| Search clicks / impressions (last 28 days) | 16 / ~255 | **40 / 1,041** |
| Clicks last 7 days vs 7 before | - | **23 vs 10** |
| GA4 organic sessions (20-27 Nov vs 12-19 Nov) | 18 | **32 vs 19** |
| Lighthouse mobile (lab, local build) | - | Perf 96-99, A11y 100, CLS 0, LCP 2.0-2.6 s |

Not indexed: 41 products and 2 pages (/custom-order, /crochet-care). Of these, 33 are "Discovered - currently not indexed" and 8 are "URL is unknown to Google".
Clicks by country: India 28, UAE 4. By device: mobile 29, desktop 11.

## What is holding traffic back (in order)
1. **Product pages look almost the same to Google.** About 88% of each product page's text is the same on all 71 pages (shared order steps, 8 generic FAQs, add-ons, trust lines). Only about 12% is unique (the P2-1 description). Each product has 1 image, no size and no real photo. 5 images are shared by 11 products (rose-bouquet = mini-bouquet-note-card; custom-premium-bouquet = couple-bouquet-combo; mini-teddy-plushie = baby-bear-plushie; bunny-plushie = custom-animal-plushie = baby-bunny-plushie = baby-gift-combo; crochet-coaster = table-decor-piece). So Google finds the URLs but does not crawl or index them.
2. **No outside authority.** There are no real backlinks or mentions, so head terms (crochet bouquet, crochet keychain) go to FNP and other national sites. Impressions come from long-tail and informational queries.
3. **Pages that get impressions don't get clicks.**
   - Price guide: 116 impressions, 0.9% CTR, position 5.4.
   - Amigurumi post: 302 impressions, 0 clicks, position 9.
   - /return-gifts: 93 impressions, 3.2% CTR.
   - /about: 56 impressions, 5.4% CTR.
4. **Snippet bug.** 43 of 71 product meta descriptions are cut mid-sentence. Example: "...for personal Starting from ₹199." (src/route-content.mjs, line ~640).
5. **Icon font text leaks into the page.** Icons are Material Symbols ligatures, so the icon names are real words in the HTML (47 on home, 64 on a product page). Google reads them: "pan_tool" showed up as a search query for the site. If the font loads slowly, visitors see words like "add_shopping_cart" instead of icons.
6. **Proof gaps buyers notice.** No sizes, one studio-style image, no customer proof. These are the top worries from the 20 Nov research (size, paying an advance to an unknown seller).

Fine already (no work needed): titles and H1s, canonicals, JSON-LD, speed, CLS, tap targets, accessibility, no horizontal scroll, sitemap, blog and occasion pages indexed.

## Priority list

### P0: this week (biggest effect, least effort)
| # | Task | Who | Model / effort |
|---|---|---|---|
| P0-1 | Request indexing for the 41 missing product URLs, ~10 a day (order below) | Saud | - |
| P0-2 | **P6-1 Snippet fix:** (a) rewrite the product meta template so every description is a full sentence; (b) CTR rewrites of title + meta for the price guide (lowest real bouquet price in the title, read from the catalog), /return-gifts, /about, /crochet-baby-gifts and /collections. The amigurumi post ranks 9-30 for its queries, so that is a ranking issue, not a title issue: left alone. baby-booties-cap-set gets its fix from (a); (c) /return-gifts targets "crochet return gifts" (buy), the blog post targets "crochet return gift ideas" (ideas), with a clear link between them | Claude Code | Sonnet 5.5, medium |
| P0-3 | Add the site to Bing Webmaster Tools (import from Search Console, 2 min). Bing also feeds ChatGPT search and Copilot | Saud | - |
| P0-4 | Start an order log (date, product, source: Google / Instagram / WhatsApp / referral). This is the only way to know what actually sells | Saud | - |

### P1: December (fix the indexing cause)
| # | Task | Who | Model / effort |
|---|---|---|---|
| P1-1 | **P6-2 Product page de-duplication:** remove the 8 generic FAQs from product pages (they live on /faq). Replace them with 3 FAQs per category (7 sets, written only from known facts: care, customisation, occasions, made-to-order timing). Shrink the 6-step order block to a short summary with a link to the full steps. Add a "Pairs well with" line using real catalog items. Goal: unique text share from ~12% to 30%+. Keep URLs, canonicals, one H1 and the JSON-LD guard | Claude Code | **Opus 5.5, high** (template change on 71 pages) |
| P1-2 | **P6-3 Icons to inline SVG:** replace Material Symbols ligatures with inline SVG (aria-hidden) and drop the icon-font request. Screenshot check on 375 and 1440 before and after | Claude Code (run alone) | **Opus 5.5, high** (touches index.html, app.js and the generator) |
| P1-3 | **P6-4 Internal links to the 41 unindexed products:** add a "Gift picks" block on the indexed blog posts and occasion pages that links to unindexed products of the same type. Also remove the WebSite SearchAction schema: Google retired the sitelinks search box in Nov 2024, and its template URL shows up as a "referring page" for most products | Claude Code | Sonnet 5.5, medium |
| P1-4 | **Real photos and sizes (biggest single lever for products).** Phone photos of the top 20 products, in hand or next to a ruler, and the measured size of each. That unblocks P5-1 (photos) and P3-3 (sizes) and fixes the 11 shared-image products. Answer Q1 for those 20 | Saud + sisters | - |
| P1-5 | Pinterest business account: pin every product and blog post (crochet is a big Pinterest category). It gives crawl paths, traffic and links. If Pinterest asks for a domain-claim meta tag, Claude Code adds it | Saud (+ Claude Code tag: Sonnet 5.5, low) | - |

### P2: Dec to mid-Jan (new demand + Valentine's)
| # | Task | Who | Model / effort |
|---|---|---|---|
| P2-1 | **P6-5 Post: crochet keychain gift guide + price** (keychains from ₹149; "keyring crochet" ~33k/month in the owner's data, the biggest term we sell into) | Claude Code | Sonnet 5.5, high |
| P2-2 | **P6-6 Post: handmade crochet gifts for a newborn baby** (baby queries already show: "handmade gifts for newborn" pos 1-2.5, baby-booties-cap-set 27 impressions) | Claude Code | Sonnet 5.5, high |
| P2-3 | **P6-7 Post: crochet gift hamper ideas** ("crochet hampers" 5 impressions at pos 4.2, combos page at pos 12.6) | Claude Code | Sonnet 5.5, high |
| P2-4 | Valentine's push (by 10 Jan): refresh /valentines-day-gifts and the Valentine's post. Order-by date = 14 Feb minus 2 weeks; link both from home | Claude Code | Sonnet 5.5, medium |
| P2-5 | Instagram 3 Reels a week (making, size in hand, packing). Link in bio to /valentines-day-gifts from January, with UTM tags. Repost as YouTube Shorts | Saud | - |

### P3: Jan to Feb (authority)
| # | Task | Who |
|---|---|---|
| P3-1 | Get onto "best handmade gift shops in Kerala / India" lists and gifting blogs (5 pitches) | Saud |
| P3-2 | Maker story pitch to Kerala media (Onmanorama, Mathrubhumi English, The News Minute) without names or photos (Q9) | Saud (Claude drafts the pitch) |
| P3-3 | Partner pitch to Kerala gift sites for a crochet add-on (keralagifts.in, cakezygifting, wegiftkerala) | Saud (Claude drafts) |
| P3-4 | IndiaMART or Justdial listing for bulk return gifts (real B2B demand; gives a citation link) | Saud |
| P3-5 | Customer proof: ask every December buyer for a photo or message, with permission. When you have 5 or more, Claude drafts a proof-section task (Q17) | Saud |

## Request-indexing order for P0-1 (10 a day)
- Day 1 (bouquets + combos): single-crochet-rose, single-sunflower-stem, custom-premium-bouquet, mini-bouquet-note-card, couple-bouquet-combo, anniversary-gift-box, custom-crochet-hamper, baby-gift-combo, couple-keychain-combo, mini-teddy-plushie
- Day 2 (keychains + plushies): couple-keychain-set, initial-letter-keychain, strawberry-keychain, teddy-keychain, cat-keychain, mushroom-keychain, custom-character-keychain, bunny-plushie, cat-plushie, frog-plushie
- Day 3 (plushies + baby): dinosaur-plushie, custom-animal-plushie, mini-pocket-plushies, baby-booties, baby-cap, baby-name-garland, baby-shower-mini-set, baby-bunny-plushie, baby-bear-plushie, crochet-earrings
- Day 4 (accessories + decor): bag-charm, crochet-coin-pouch, crochet-phone-sleeve, crochet-coaster, mini-flower-pot, crochet-garland, table-decor-piece, door-hanging, custom-name-decor, crochet-plant-holder
- Day 5: wall-hanging, /custom-order, /crochet-care
All URLs are https://www.bloomycocoon.com/products/<id> except the last two.

## Claude Code run order and lanes
- P6-1 first (small, L1).
- P6-2 alone (product template).
- P6-3 alone (site-wide).
- P6-4 after P6-2 merges.
- P6-5 to P6-7 can run in parallel with P6-4 (blog files only).
- Valentine's refresh by 10 Jan.
- P5-1 and P3-3 once photos and sizes exist.

## Targets (goals, not forecasts)
- Indexed products: 50/71 by 31 Dec, 65/71 by 31 Jan.
- Search clicks: from 40 per 28 days to 80+ by end of January.
- CTR: price guide over 3%, /return-gifts over 5%.
- WhatsApp key events (whatsapp_click, whatsapp_checkout_click, contact_whatsapp_click, custom_order_submit): track weekly against the order log.

## Not doing (rules or owner answers)
- Google Business Profile: postal delivery only (Q4), so it is not eligible.
- Gulf shipping pages beyond what exists: there is no delivery outside India (Q2).
- Merging or redirecting look-alike products: URLs stay as they are. Give them their own photos instead.
- Paid links, fake reviews, discounts or urgency.
