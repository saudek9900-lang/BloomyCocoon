# BloomyCocoon roadmap (updated 2026-11-20)

Repo copy of the planning chat's roadmap. Saud's planning chat holds the master; if they differ, ask Saud.

## Done and live (main 380886e, deployed 2026-11-20)
- SEO Round 3, UI Phase A, /workshops page, build-time blog + 5 posts, unverified-claim cleanup, speed round, JSON-LD fix + regression guard.
- Prompt 0 (image rename + 301 redirect), Prompt 1 (copy fixes), Prompt 2 (SEO upgrades, E9 parked), Prompt 3 (UI/UX), Prompt T (Clarity + Meta Pixel + GA4 events; details in prompt-T-tracking.md).
- Finished prompt files were removed from this folder; they remain in git history.

## Remaining upgrades (code)
| Item | Status | Needs |
|------|--------|-------|
| T2: tracking follow-up. Load GA4, Clarity and Meta Pixel only on www.bloomycocoon.com (localhost and Vercel preview must send nothing). Add missing events: WhatsApp click by location (product, cart, custom order, floating button, footer), remove from cart, cart opened, scroll depth, blog reads, outbound clicks, collections search/filter use. No personal data in any event. | NOT DRAFTED | Claude drafts it next |
| New Sunflower Bouquet (from Rs 899) + Lily Bouquet (from Rs 799). Pink lily, not all white. | PARKED | New product images that Saud approves |
| E9: hidden IPTC tag on Merchant feed images | PARKED | Saud confirms he uses the Merchant feed |
| Phase B/C UI: collections sort/search, custom order builder, cart/contact UX. Mobile !important CSS refactor is risky: test separately. | NOT DRAFTED | Saud picks priority |
| Per-product facts (size, item count) on product pages | WAITING | Facts from Saud. Do not invent |

## Content proposals (need Saud's okay before any prompt)
- Better title and meta description for the amigurumi blog post (33 impressions, 0 clicks at position 5.5).
- New post: crochet return gift ideas, linking /return-gifts and products.
- Blog: 2 posts a month with spaced dates, each linking 3-4 products.
- Crochet bouquet price guide page, once the new bouquets exist (real starting prices only).

## Saud's tasks (not code)
- Search Console: resubmit sitemap, request indexing about 10 URLs a day (bouquets and combos first).
- GA4: mark WhatsApp click and custom order submit as key events. Check Realtime, Meta Events Manager > Test events, Clarity > Recordings.
- Rich Results Test on /products/rose-bouquet (expect Product + FAQ).
- Merchant Center: is the feed submitted, any errors, shipping settings.
- Google Business Profile as a service-area business (waiting for Saud's okay).
- 3-5 real backlinks, genuine reviews only, Pinterest business account, Instagram 3-4 Reels a week with bio link to /collections.
