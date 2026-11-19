# BloomyCocoon roadmap (updated 2026-11-20)

Repo copy of the planning chat's roadmap. The planning chat holds the master; if they differ, ask Saud.

## Done and live (main 380886e, deployed 2026-11-20)
- SEO Round 3, UI Phase A, /workshops page, build-time blog + 5 posts, unverified-claim cleanup, speed round, JSON-LD fix + regression guard.
- Prompt 0 (image rename + 301 redirect, #3), Prompt 1 (copy fixes, #4), Prompt 2 (SEO upgrades, #5, E9 parked), Prompt 3 (UI/UX, #6), Prompt T (Clarity + Meta Pixel + GA4 events, #7).
- Finished prompt files were removed from this folder; they remain in git history.

## Queue (see CLAUDE.md)
| Item | Prompt | Status |
|------|--------|--------|
| Tracking follow-up: trackers only on www.bloomycocoon.com, missing events | prompt-T2-tracking.md | Ready |
| Amigurumi blog post title + meta (33 impressions, 0 clicks at position 5.5) | prompt-4-amigurumi-title.md | Ready |
| Blog post: crochet return gift ideas | prompt-5-return-gifts-post.md | Ready |
| UI Phase B/C audit (plan only, no code) | prompt-6-ui-audit.md | Ready |
| New Sunflower Bouquet (from Rs 899) + Lily Bouquet (from Rs 799, pink not white) | - | PARKED: needs product images Saud approves |
| E9 hidden IPTC tag on Merchant feed images | - | PARKED: until Saud confirms he uses the Merchant feed |
| Per-product facts (size, item count) | - | WAITING: from Saud, never invented |

## Next after the queue (ideas, need Saud's go-ahead)
- Phase B/C builds (collections sort/search, custom order builder, cart/contact UX), split by prompt 6's proposal. Test the mobile !important CSS refactor on its own.
- Bouquet price guide page, once the new bouquets exist. Real starting prices only.
- Blog: 2 posts a month, spaced dates, each linking 3-4 products.

## Saud's tasks (not code)
- Search Console: resubmit sitemap, request indexing about 10 URLs a day (bouquets and combos first).
- GA4: mark whatsapp_click and custom_order_submit as key events (after T2 ships). Check Realtime, Meta Events Manager > Test events, Clarity > Recordings. Filter Hostname = www.bloomycocoon.com for past data.
- Rich Results Test on /products/rose-bouquet (expect Product + FAQ).
- Merchant Center: is the feed submitted, any errors, shipping settings.
- Google Business Profile as a service-area business (home address hidden): waiting for his okay.
- 3-5 real backlinks, genuine reviews only, Pinterest business account, Instagram 3-4 Reels a week with bio link to /collections.
