# Action plan: claude-seo audit, 2026-11-21

Score now: **84/100**. Details and evidence: `FULL-AUDIT-REPORT.md`.
These are suggestions only. Any of them becomes a task only when Saud adds it to the queue in CLAUDE.md.

## High (do within a week)
| # | Fix | Where | Effort |
|---|---|---|---|
| H1 | Blog hreflang: rewrite `en-IN` and `x-default` to the page's canonical (now they point to `/`). | `src/blog-engine.mjs`, next to the canonical rewrite (~line 207). Copy the pattern from `scripts/generate-route-html.mjs` lines 163-170. | XS |
| H2 | Product main image: add `srcset` (-320/-480/-640 webp, already built) and `sizes`. Cuts the LCP image from 194 KB to ~39-69 KB. | `scripts/generate-route-html.mjs:432` and `app.js` (~line 1429). | S |

## Medium (within a month)
| # | Fix | Where | Effort |
|---|---|---|---|
| M1 | /about and /contact: the first image is the LCP, so make it `loading="eager"` + `fetchpriority="high"`. | about and contact templates in `index.html` / route content | XS |
| M2 | Home hero on phones: add a 768 w size or tighten `sizes`, so phones stop picking the 1024 w file. | hero `<link rel="preload">` + `<img>` in `index.html` | S |
| M3 | Seasonal pages (Eid, Vishu, Onam, Diwali, Mother's Day) are 40-52% alike. Add occasion-specific sections. Needs facts from Saud; do not invent. | `src/route-content.mjs` | M |
| M4 | Titles under 30 chars on `/order-terms` and `/privacy-policy`. | route meta | XS |
| M5 | Mobile product page: show the product name and "Starting from" price above the fold. | product template | S |

## Low (backlog)
- Remove `/cart` from `public/llms.txt`.
- Extend meta descriptions on `/blog`, `/crochet-care`, `/order-terms`, `/returns-cancellations` to 120-160 chars.
- Check that the floating WhatsApp button does not cover "View all" on the mobile home page.
- Static HTML `src` uses PNGs up to 934 KB; consider WebP in `src` (keep PNG for og:image, twitter:image and the feed).
- Sitemap `lastmod` per product instead of the catalog file's git date (same as L3 in the 2026-11-20 audit).

## Keep as is (checked and intentional)
- `AggregateOffer` with `lowPrice` ("Starting from" pricing).
- No `shippingDetails`, `aggregateRating` or `review` in JSON-LD.

## Owner tasks (L0, no code)
- Connect Search Console / CrUX data so future audits use real field data, not lab tests.
- Collect real customer testimonials when ready (trust signal; no review schema).
