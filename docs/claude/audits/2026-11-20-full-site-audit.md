# BloomyCocoon: Full Website Audit (content, UX, SEO, GEO, AEO)

> Audit date: 20 Nov 2026
> Skills used: `website-audit`, `seo-geo-aeo`, `seo-skill`, `ui-ux-pro-max` (as checklists, with BloomyCocoon rules)
> Pages reviewed: 114 built pages (45 site pages + 69 product pages)
> Source: **local build of `main`** (`npm run build`, then `dist/`). The live site could not be reached from this sandbox (blocked by the network proxy). The build is the same code Vercel deploys.
> Follows: `2026-11-20-seo-audit.md` (P3-12) and `2026-11-20-ui-site-audit.md` (L4). Fixes from those are not repeated here unless still open.

## Executive summary
- **The technical base is strong.** Every indexable page has one H1, one canonical, one footer, a unique title and meta description, valid JSON-LD and no banned schema fields. Earlier title, meta, return-policy and UI fixes are live in the build.
- **The biggest risk is still indexing, not page errors.** Google has to find and index the pages. That is Saud's Search Console work (L0).
- **The biggest conversion gap is proof.** No page shows real customer feedback or delivered-gift photos. Only real material can fill this (see C1).
- **Quick wins:** clearer H1s on 5 core pages, fix one wrong price claim in `llms.txt`, confirm the "courier tracking" promise, and pick one spelling style.

## Scores (judgment from the build, not measured traffic)
| Area | Score | Status | Why |
|---|---|---|---|
| SEO | 8/10 | Strong | Clean technical base. Generic H1s on 5 core pages, and indexing is unverified. |
| GEO (AI search) | 7/10 | On track | `llms.txt` and `llms-full.txt`, AI crawlers allowed, Organization schema with `sameAs`, clear makers story. No visible customer proof. |
| AEO (answers, snippets) | 7/10 | On track | FAQs on 85 pages, a price table, step lists, question headings on blog posts. Category pages have no question-style headings. |

No 0–100 SEO Health Score: it needs Core Web Vitals and Search Console data, which were not available here.

## What was NOT checked (no data, so no claims)
- Live site, real Core Web Vitals, PageSpeed, mobile screenshots on a real phone.
- Search Console (indexing, clicks, CTR), GA4, backlinks, brand mentions, AI-answer citations.
- To check these: PageSpeed Insights at pagespeed.web.dev, the Search Console "Pages" report, and searching the brand name in ChatGPT, Perplexity and Gemini.

---

## Critical issues
None found. Nothing blocks indexing or breaks a page.

## 🟡 Important (fix soon)

### S1. Five core pages have H1s that do not say what the page is
Search engines and AI tools use the H1 to understand the page. These are taglines, not topics:

| Page | Current H1 | Suggested H1 (keep the tagline as a subline) |
|---|---|---|
| `/about` | Where Every Stitch Tells a Story | About BloomyCocoon: Handmade Crochet Gifts from Kerala |
| `/contact` | Let's Start a Conversation | Contact BloomyCocoon on WhatsApp |
| `/custom-order` | Your Vision, Our Stitches | Custom Crochet Gift Orders |
| `/faq` | Common Questions | Crochet Gift Orders: FAQs |
| `/collections` | The Collection | Handmade Crochet Gift Collection |

Effort: small. Risk: low (text only, no URL change).

### T1. "Courier tracking" promise needs Saud's confirmation ❓
All 69 product pages say: *"we dispatch with courier tracking"*. One more page says *"send you tracking details upon dispatch"*. Tracking is not in the project ground rules or owner answers.
- If every order ships with tracking, keep it.
- If not, change it to *"…before you pay the remaining balance and we dispatch your gift."*

### C1. No customer proof anywhere (biggest conversion gap) 💡
No page has testimonials, delivered-gift photos or customer messages. For a WhatsApp-first shop where buyers pay a 50% advance, proof is the main trust builder.
- **Only use real material.** For example, customer WhatsApp messages or photos shared with their permission, shown as normal page text or images.
- **Never** add `review` or `aggregateRating` to JSON-LD (project rule), and never invent quotes.
- Needs Saud: does he have customer messages or photos he can use with permission?

### G1. `llms.txt` has a wrong price claim
`public/llms.txt` line 46 (and `llms-full.txt`) says return gifts are *"under ₹200"*. The `/return-gifts` page also lists items starting from ₹299 and ₹399.
- Fix: *"…bulk celebration favors starting from ₹149."* That matches the home page wording.
- AI tools quote this file, so a wrong price can spread.

## 🟢 Nice to have

### W1. Mixed UK and US spelling ❓
The site mixes both styles in visible text: "colour" 264 times vs "color" 402, "customise" 5 vs "customize" 168, "favourite" 16 vs "favorite" 129. Indian English usually uses UK spelling. Saud should pick one style; then it can be made consistent in one pass.

### A1. Answer-style headings on category pages (AEO)
The 7 category pages already open with a good intro that includes the starting price. None has a question heading. Adding one short Q&A block per category helps with "People also ask" and AI answers. For example, on `/crochet-bouquets`: **"How much does a crochet bouquet cost?"** Answer with the real catalog range: from ₹149 (single rose) to ₹1,499 (Custom Premium Bouquet), final price confirmed on WhatsApp. Use catalog prices only.

### X1. Small copy fixes on `/about` ⚠️
- *"Thousands of intentional stitches crafted using only **the** quality yarn."* → *"…crafted using only quality yarn."*
- *"…securing every thread for **a lifetime of use**."* This is a strong durability promise. Suggest *"…so it lasts for years with gentle care."* Saud to confirm.

### X2. Small consistency fixes
- Both "1-2 weeks" (hyphen) and "1–2 weeks" (dash) appear. Use "1–2 weeks" everywhere.
- The product page FAQ says "high-resolution photos" for approval, while the order steps say "a photo". Use one wording.

### U1. Four home-page icons are read aloud by screen readers
The occasion cards on `/` use icon-font words (`favorite`, `cake`, `child_care`, `redeem`) without `aria-hidden="true"`. A screen reader says "cake Birthday Gifts". The other 43 icons on the page are already hidden. Add `aria-hidden="true"` to these 4.

### Still open from earlier audits
- **Indexing (P3-12 H1):** request indexing in Search Console, about 10 URLs a day. Not re-verified here.
- **Seasonal links (P3-12 M5):** before each season, link the season page from the home page and related posts.
- **Sitemap `lastmod` is flat (P3-12 L3):** low priority.

---

## What's working well
| Area | Evidence from the build |
|---|---|
| Titles and meta | No duplicates. All indexable titles are 60 chars or less and all meta descriptions 70–160 chars. Only `/order-terms` (26) and `/privacy-policy` (29) have short titles, which is fine for legal pages. |
| Headings and structure | Exactly 1 H1, 1 canonical (`https://www.`), 1 footer on every indexable page. |
| Schema | JSON-LD parses on all pages. Types: Organization, LocalBusiness, WebSite + SearchAction (search works via `?search=`), Product + AggregateOffer, BreadcrumbList on every indexable page, BlogPosting with author "BloomyCocoon Studio" and dates, MerchantReturnPolicy. No banned fields. |
| Indexing controls | `/cart`, `/workshops`, `/404` are noindex. Sitemap has 111 URLs, `/cart` excluded. |
| AI crawlers | `robots.txt` allows Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, GPTBot, ClaudeBot and others. `llms.txt` lists 8 blog posts. `llms-full.txt` covers all 69 products. |
| Content depth | Product pages have several paragraphs of their own description (unique per P3-12). Category pages open with a real intro and starting price. The bouquet price guide has a price table taken from the catalog. |
| Trust and ordering clarity | The 6-step order flow, 50% advance, photo approval, "Starting from" prices and the damage policy link appear on every product page. |
| Images | Every image has alt text (except two script-filled placeholders). Hero is WebP with `fetchpriority=high`. Images have width and height. |
| Makers story (E-E-A-T) | `/about` says who makes the gifts (sisters, at home in Mampad), how, and why. |

---

## Priority action plan
| # | Priority | Action | Type | Page(s) | Who |
|---|---|---|---|---|---|
| 1 | 🟡 | Keep requesting indexing (~10 URLs/day), IndexNow after deploys | SEO | all | Saud (L0) |
| 2 | 🟡 | Confirm "courier tracking" (T1) | Content / trust | 69 product pages | Saud answers, then a small PR |
| 3 | 🟡 | Fix "under ₹200" in `llms.txt` / `llms-full.txt` (G1) | GEO | llms files | Small PR |
| 4 | 🟡 | Clearer H1s on 5 core pages (S1) | SEO / GEO | about, contact, custom-order, faq, collections | Small PR |
| 5 | 🟡 | Customer proof from real messages or photos (C1) | Conversion | home, product pages | Saud provides material first |
| 6 | 🟢 | Pick UK or US spelling, then make it consistent (W1) | Content | site-wide | Saud decides |
| 7 | 🟢 | One Q&A block per category page (A1) | AEO | 7 category pages | Small PR |
| 8 | 🟢 | About-page copy fixes, "1–2 weeks", photo wording (X1, X2) | Content | about, products | Small PR |
| 9 | 🟢 | `aria-hidden` on 4 home icons (U1) | Accessibility | `/` | Tiny PR |

Suggested grouping: items 3, 4, 8 and 9 fit in one small content PR (Sonnet 5.5, medium). Items 2, 5 and 6 need Saud's answers first.

## Decisions (Saud, 20 Nov 2026) and where each finding is fixed
Answers are saved as Q16-Q19 in `docs/claude/data/owner-answers.md`.

| Finding | Decision / solution | Task | Status |
|---|---|---|---|
| S1 H1s | Use the suggested H1s, keep taglines as sublines | P3-22 | READY |
| T1 Tracking | Q16: no tracking on the website; Saud sends tracking details manually. Remove "with courier tracking" from the 69 product pages; mention tracking only on /faq and /shipping-delivery | P3-22 | READY |
| G1 llms price | "under ₹200" → "starting from ₹149" | P3-22 | READY |
| X1 About copy | Q19: OK. "the quality yarn" → "quality yarn"; "a lifetime of use" → "so it lasts for years with gentle care" | P3-22 | READY |
| X2 Consistency | "1–2 weeks" everywhere; "a photo of your finished gift" | P3-22 | READY |
| U1 Icons | `aria-hidden` on 4 home icons | P3-22 | READY |
| A1 Category answers | One question + 40–60 word answer per category page, catalog prices only, no new FAQPage schema | P3-24 | READY after P3-22 |
| W1 Spelling | Q18: UK spelling for all visible text | P3-23 | Run alone, after P3-22 and P3-24 |
| C1 Customer proof | Q17: none for now. Do not add testimonials or reviews | - | PARKED |
| Indexing, seasonal links | Saud (L0), before each season | - | Ongoing |

## Questions for Saud (answered)
1. **T1:** Does every order ship with courier tracking? → Q16 (sent manually; mention only where needed)
2. **C1:** Customer messages or photos? → Q17 (none for now)
3. **W1:** UK or US spelling? → Q18 (UK)
4. **X1:** "lasts for years with gentle care"? → Q19 (OK)
