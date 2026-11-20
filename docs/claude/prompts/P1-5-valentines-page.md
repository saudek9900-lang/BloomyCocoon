# P1-5: Valentine's Day gifts page

Branch: content/p1-5-valentines. PR title: "P1-5: Valentine's Day gifts page". Must be merged and live by 20 Dec 2026 (Valentine's Day 14 Feb 2027; making takes 1-2 weeks).

## Steps
V1 New route /valentines-day-gifts. Copy the structure, sections and JSON-LD types of /anniversary-gifts (same template, BreadcrumbList, FAQPage). Evergreen URL (no year).
V2 Content:
  - H1 "Handmade Crochet Valentine's Day Gifts". Title and meta written in the same style as other occasion pages; mention 14 February.
  - Intro about 150 words.
  - Product grid of 8-12 real products that fit Valentine's Day (e.g. bouquets, couple and heart items, gift boxes, plushies), chosen from src/catalog.json.
  - "Plan ahead" block: "Every gift is made by hand and delivered in 1-2 weeks. For Valentine's Day, message us at least 2 weeks before 14 February."
  - Add-ons line: handwritten note card and warm fairy lights (existing add-ons only).
  - The "How ordering works" component if P1-3 is merged.
  - 3-4 FAQs answered only with approved facts.
V3 Links: from the existing post /blog/valentines-day-crochet-gift-ideas to the page and back; from /anniversary-gifts (one line); from the nav occasions menu if there is one. Do not change the home page occasion grid. Sitemap via the generator.

## Rules
- No invented cutoff dates, discounts, stock counts or countdowns. No new add-ons or prices.

## Verify (in the final report)
- Title, meta (with length), H1, canonical, JSON-LD types, product list, links in/out.
- npm run build and npm run test:jsonld pass; page in sitemap.xml and llms-full.txt if other occasion pages are there.
