# Full site audit: findings (20 Nov 2026)

Saved from the audit run. Docs only. No site files were changed.
Build checked: `npm run build` on the current main branch, 113 pages.
Live site and Search Console were not checked (blocked from this environment).

## Problems

| # | Problem | Impact |
|---|---|---|
| 1 | Privacy policy says only "website analytics". The site loads GA4, Meta Pixel and Clarity, and there is no cookie notice. Check what India's data-protection law expects. | Medium to high |
| 2 | Home and collections are slow on mobile. LCP 4.0 s; performance 83 and 87. Product images are larger than shown (about 280 KiB wasted on home, 443 KiB on collections). | Medium |
| 3 | `/images/*` has a one-year `immutable` cache. P5 photo tasks must use new file names, or visitors keep seeing old photos. | Medium (risk) |
| 4 | robots.txt `Content-Signal` line is flagged as invalid by Lighthouse (SEO score 92, not 100). It also says `ai-train=yes`; confirm that is wanted. | Low to medium |
| 5 | 5 npm vulnerabilities (3 high) in build tools only, not shipped to visitors. `vite` is a direct dependency (8.1.3, fix 8.3.8). | Low |
| 6 | Two titles over 60 characters: `/baby-shower-gifts` (64) and `/blog/what-is-amigurumi-crochet-plushies-guide` (62). | Low |
| 7 | `llms.txt` says return gifts are "under ₹200", but keychains run ₹149 to ₹399. Check the wording. | Low |
| 8 | Sitemap `lastmod` comes from git dates: 70 URLs share 2026-11-19. Google likely ignores it. | Low |
| 9 | Google Fonts files cached for 1 day (third party). Self-hosting would fix it and speed first paint. | Low |
| 10 | Axe: 15 pages have content outside page landmarks; product and cart pages nest `<main>` inside another landmark. | Low |
| 11 | CSP allows `unsafe-inline` scripts, which weakens it. Hard to remove with current tracking snippets. | Low |
| 12 | Merchant feed has no shipping fields. Risk of disapproval if submitted (not submitted yet). | Info |
| 13 | No automatic checks: no GitHub workflow runs the tests on PRs. | Process gap |

## Upgrades

1. Turn the checks into repo tests: page rules, broken links, axe, Lighthouse score floor. Run on every PR.
2. Resize product-card images; preload the home hero.
3. Self-host Inter and Playfair Display (same fonts).
4. Update `vite`, `postcss`, `autoprefixer`. Stay on Tailwind 3.4.
5. Real `lastmod` dates in the sitemap (optional).
6. Add an accurate analytics and cookie section to the privacy page (needs owner input).
7. Check real-user CLS and LCP in Search Console after the font and image fixes.

## Already clean

- Crawl of all 113 pages: no console errors, failed requests, broken images, sideways scroll or heading-level skips.
- Earlier SEO items fixed: meta description length, return-policy wording, Gulf delivery answer, blog in `llms.txt`.
- Earlier UI items U1 to U8 fixed.

## Waiting on owner (not code)

- P3-4 (PR #39) is open, waiting for merge.
- P4-2 needs Q10 answers.
- P5-1 and P5-2 need photos.
- Search Console indexing, IndexNow submit, real-phone check, Merchant Center.

## Not checked

- Live site (blocked from this environment)
- Search Console data
- Real phones and screen readers
- INP
- Lighthouse beyond 4 pages; axe beyond 16 pages
- "Starting from" wording on every price
