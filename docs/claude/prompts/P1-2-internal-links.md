# P1-2: Internal links for indexing (+ IndexNow key)

Branch: seo/p1-2-internal-links. PR title: "P1-2: Internal links for indexing". One commit per step.

## Why
Google has indexed 14 of 69 products and 0 of 6 blog URLs; most are "Discovered - currently not indexed". At this site size the usual causes are weak internal links and thin pages, not crawl budget. Checked 2026-11-20 in dist/: home links 8 products and 0 blog posts; blog posts link 0 products; /crochet-bouquets links 7 products in static HTML.

## Steps
L1 Audit (no edits, no commit). For every built page in dist/, count unique links in the static HTML (not added by JS) to /products/* and /blog/*. For every product and blog post, count how many indexable pages link to it (exclude /collections, /cart, /workshops and the page itself). Print both tables in the report.
L2 Category pages: each category page must link every product of that category in its static HTML. Fix the generator if any are missing.
L3 Blog to products: add a `products:` list (3-4 product ids from src/catalog.json that truly fit the post) to each post's frontmatter. Render them at the end of the post as the existing product cards, heading "Gifts from this guide". Change the blog engine so future posts can use the same field.
L4 Blog discovery: add a "Gift guides" link list to the site footer with the newest blog posts (max 6), generated at build from content/blog so new posts appear automatically. Still exactly one footer per page.
L5 Product pages: if there is no visible breadcrumb, add one (Home > Category > Product) that matches the BreadcrumbList JSON-LD. Each product page must link its category page and at least one occasion page that lists it (Prompt 2 E7 may already do this: verify, fill gaps only).
L6 IndexNow: generate a random 32-character hex key, add public/<key>.txt containing only the key, and write the key into docs/claude/indexnow.md. Do not call any external API (the planning chat submits URLs).
L7 Sitemap: confirm it holds only canonical, 200-status, indexable URLs (no /cart, no noindex pages). Report; fix only if wrong.

## Rules
- No URL changes, no new pages. Only new visible text: the headings "Gifts from this guide" and "Gift guides", plus link text that is a product or post name.

## Verify (in the final report)
- L1 tables before and after. Target: every product linked from 2+ indexable pages other than /collections; every blog post linked from the footer on every page.
- npm run build and npm run test:jsonld pass. Every page: one H1, one canonical, one footer.
- Gzip size of JS/CSS before and after (flag > 2 KB increase).
