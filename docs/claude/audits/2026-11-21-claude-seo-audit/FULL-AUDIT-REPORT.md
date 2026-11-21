# BloomyCocoon full SEO audit (claude-seo v2.6.2)

- Date: 2026-11-21
- Site: https://www.bloomycocoon.com (live production)
- Tool: claude-seo `seo-audit` skill, run inline (no subagents)
- Business type: e-commerce (handmade crochet gifts, WhatsApp ordering, ships across India)
- Scope: all 111 sitemap URLs fetched (all 200). 7 key pages rendered in Chromium (desktop + throttled mobile).
- Audit only. No site code was changed.

## Executive summary

**SEO Health Score: 84 / 100.** The site is in good technical shape. The big wins from earlier tasks are in place: one H1 per page, self canonicals, unique titles and descriptions, valid JSON-LD, clean internal linking, a full sitemap, and open AI crawler access.

What is left is mostly page speed on mobile, plus one real bug on the blog.

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 90 |
| Content quality | 23% | 78 |
| On-page SEO | 20% | 90 |
| Schema | 10% | 85 |
| Performance (lab) | 10% | 72 |
| AI search readiness | 10% | 86 |
| Images | 5% | 78 |

### Top 5 issues
1. **Blog hreflang points to the homepage (High, new).** All 9 `/blog` pages carry `hreflang="en-IN"` and `x-default` with `href="https://www.bloomycocoon.com/"`, while the canonical is the blog URL. That sends Google mixed signals. Cause: `src/blog-engine.mjs` rewrites the canonical and og:url but not the two hreflang tags (`generate-route-html.mjs` lines 163-170 already do this for other routes).
2. **Product main image is 194 KB with no `srcset` (High, new).** `#detail-product-img` loads the full `.webp`, but 320, 480 and 640 px versions already exist (18, 39 and 69 KB). Mobile lab LCP on a product page: 2.9 s. Source: `scripts/generate-route-html.mjs:432` (and the matching code in `app.js:1429`).
3. **LCP image is lazy-loaded on /about and /contact (Medium, new).** On both pages the LCP element is an `<img loading="lazy">`. Mobile lab LCP: /contact 3.6 s, /about 2.5 s. The skill also flags `first-image-lazy-loaded` on 27 pages, but on category pages the LCP is text, so only /about and /contact clearly matter.
4. **Home page mobile LCP 3.7 s in the lab (Medium).** The hero preload lists 320-1024 w, but on a phone with high pixel density the 108 KB 1024 w file is picked. Could serve a 768 w version or shrink the `sizes` hint.
5. **Seasonal pages overlap a lot (Medium).** Eid vs Vishu share 52% of their wording (6-word shingles). Onam, Diwali and Mother's Day are 40-45% alike. That is close to "doorway page" territory. Each page needs more occasion-specific text.

### Top 5 quick wins
1. Fix the hreflang rewrite in `src/blog-engine.mjs` (2 lines, copy from `generate-route-html.mjs`).
2. Add `srcset` + `sizes` to the product main image, using the existing -320/-480/-640 files.
3. Change `loading="lazy"` to `loading="eager"` + `fetchpriority="high"` on the first image of /about and /contact.
4. Remove `/cart` from `public/llms.txt` (it is noindex, so it should not be listed for AI tools).
5. Lengthen the titles of `/order-terms` (26 chars) and `/privacy-policy` (29 chars), and the `/blog` meta description (75 chars).

## Technical SEO (90)

What works:
- All 111 sitemap URLs return 200. No redirect chains. Unknown URLs return a real 404.
- `https://bloomycocoon.com/` → 308 → `www`. `/index.html` and trailing slashes → 308 to the clean URL.
- Every page: one canonical (self), `lang="en"`, viewport, `<!doctype>`, `utf-8`.
- `/cart` and `/workshops` are `noindex, follow` and kept out of the sitemap, as required.
- Strong security headers: HSTS preload, CSP, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy.
- robots.txt allows everything, lists the sitemap, and has `Content-Signal: search=yes, ai-input=yes, ai-train=yes`.
- Sitemap has 111 URLs and 371 `image:image` entries.

Findings:
| Severity | Finding | Fix |
|---|---|---|
| High | Blog hreflang points to `/` on all 9 blog URLs (see top issue 1). | Rewrite both hreflang tags to the canonical in `src/blog-engine.mjs`. |
| Low | Sitemap `lastmod`: 106 URLs share 2026-11-20. Product dates all come from the git date of `src/catalog.json`, so one catalog edit bumps 69 URLs. Already listed as L3 in the 2026-11-20 audit. | Optional: date each product from its own data. |
| Info | `http://` → `https://` redirect not tested (this container can only reach HTTPS through its proxy). | Check once from a normal browser. |

## Content quality (78)

What works:
- The skill's content scorer gives 94-96/100 on home, a category, a product, a blog post and /about. No filler and no AI-pattern phrasing flagged.
- Most pages have 600-950 words. The biggest page (`/collections`) has 2,238.
- E-E-A-T basics: About page (makers, Mampad, Malappuram), named byline "BloomyCocoon Studio", clear contact/WhatsApp, policy pages, and a price guide.

Findings:
| Severity | Finding | Fix |
|---|---|---|
| Medium | Seasonal landing pages are 40-52% alike (Eid/Vishu 0.52, Eid/Onam 0.45, Onam/Vishu 0.45, Diwali/Vishu 0.40). | Add occasion-specific sections (customs, gift ideas, timing) and trim the shared blocks. Use only facts Saud gives. |
| Medium | Product pages: on average only 44% of the main text is unique to the product; the rest is the shared template (order steps, trust strip, FAQ). Most alike: baby-bear vs baby-bunny plushie (0.36), bag charm vs phone charm (0.34). | Low urgency. When there is time, add 1-2 more product-specific lines (use cases, pairings). Do not invent sizes or materials. |
| Low | Policy pages are short: privacy 254, order terms 260, returns 266, care 271, shipping 276 words. Fine for their purpose. | No action needed. |
| Info | No customer reviews anywhere. Project rules forbid review/rating schema, and there is no Google Business Profile yet. That limits trust signals. | Owner task (L0): collect real testimonials when ready. |

## On-page SEO (90)

What works:
- 111/111 pages have exactly one H1. No heading level skips.
- No duplicate titles. No duplicate meta descriptions.
- 0 images missing alt text, 0 missing width/height.
- No generic anchors ("click here"), no empty links, no mixed content.
- Every indexable page has at least 4 internal links pointing to it. No orphans.

Findings:
| Severity | Finding | Fix |
|---|---|---|
| Medium | Titles under 30 chars: `/order-terms` (26), `/privacy-policy` (29). | e.g. "Order Terms – Handmade Crochet Orders \| BloomyCocoon". |
| Low | Meta descriptions under 120 chars: `/blog` (75), `/crochet-care` (108), `/order-terms` (116), `/returns-cancellations` (116). | Extend to 120-160 chars. |
| Low | `/collections` has one element with more than 60 direct children (wide DOM). | Optional; no ranking effect. |

## Schema / structured data (85)

What works:
- JSON-LD on every page, 0 parse errors.
- Types found: Organization, Store + LocalBusiness, WebSite, WebPage, CollectionPage, ItemList, Product, FAQPage, BreadcrumbList, BlogPosting, AboutPage, ContactPage, Service.
- Product has brand, sku, image, `priceValidUntil`, `itemCondition`, `MerchantReturnPolicy` linked to the returns page.
- No banned fields (no `shippingDetails`, `aggregateRating` or `review`).

Findings (from `schema_ecommerce_validate.py`):
| Severity | Finding | Decision |
|---|---|---|
| Info | Product uses `AggregateOffer` (offerCount 1, `lowPrice` only). The validator says merchant listings need `Offer` + `price`. | **Keep as is.** Prices are "Starting from", so a single fixed `price` would be wrong. The 2026-11-20 audit reached the same decision. Merchant listings come from the Merchant Center feed instead. |
| Info | Validator asks for `shippingDetails`. | **Do not add.** Delivery charge is not fixed (project rule). |
| Info | Validator suggests `MemberProgram` / `ProductGroup`. | Not relevant (no loyalty scheme; variants are confirmed on WhatsApp). |

## Performance (72, lab only)

Measured in Chromium from a US data centre. Desktop = no throttling. Mobile = Pixel 7, ~1.6 Mbps, 150 ms latency, 4x CPU slowdown. **GA4, Meta Pixel and Clarity were blocked in this test, so real-world numbers will be somewhat worse.** No field (CrUX) data was available.

| Page | Mobile LCP | Desktop LCP | CLS | LCP element |
|---|---|---|---|---|
| / | 3.73 s | 1.26 s | 0 | hero webp (108 KB on mobile) |
| /crochet-bouquets | 1.27 s | 0.60 s | 0.001 | intro text |
| /products/anniversary-gift-box | 2.94 s | 0.80 s | 0 | main image, 194 KB full size |
| /blog/crochet-return-gift-ideas | 1.52 s | 0.72 s | 0 | image 47 KB |
| /collections | 1.20 s | 0.52 s | 0.009 | intro text |
| /about | 2.50 s | 0.81 s | 0 | **lazy-loaded** image |
| /contact | 3.56 s | 0.74 s | 0 | **lazy-loaded** image, 181 KB |

- CLS is excellent everywhere (the earlier font fix P3-18 is holding).
- Page weight: 210-690 KB, 12-28 requests. Third parties: Google Fonts, plus the trackers that were blocked here.
- Fixes: see top issues 2-4. On /contact the 181 KB workspace image is also the heaviest file; serve the 640 w version on phones.

## Images (78)

- All images have alt text and dimensions. Browsers get WebP (JS swaps it in).
- **Static HTML still points to the big PNGs** (1,212 `src="/images/*.png"` references across pages; e.g. `crochet_rose_bouquet_single-crochet-rose-landscape.png` is 934 KB). Browsers did not download them in the test, but crawlers and Google Images see the PNG URLs. Low priority: consider putting the WebP in the static `src` and keeping PNG only for og:image, twitter:image and the Merchant feed (project rule).
- Product main image: no `srcset` (top issue 2).

## AI search readiness (86)

What works:
- robots.txt explicitly allows OAI-SearchBot, Claude-SearchBot, PerplexityBot, GPTBot, ClaudeBot, Google-Extended, Applebot-Extended and Amazonbot, plus Content-Signal.
- `llms.txt` (45 links, with "starting from" prices) and `llms-full.txt` are live.
- Static HTML per route, so AI crawlers that do not run JS still get the full text.
- Clear, quotable facts: location, payment flow (50% advance via UPI/Google Pay), 1-2 week making time, category answer blocks.

Findings:
| Severity | Finding | Fix |
|---|---|---|
| Low | `llms.txt` lists `/cart` ("Shopping Cart"), which is noindex. | Remove that line. |
| Info | No Markdown version of pages (`Accept: text/markdown` returns HTML) and no `/.well-known/ai-catalog.json`. | Optional; these are emerging conventions, not required. |

## Search experience (SXO), mobile visual check

- Mobile product page: above the fold you see the breadcrumb, a "Back to Handmade Collection" button and the photo. The H1 (product name) and the price only appear in the sticky bottom bar. Consider putting the name and "Starting from ₹…" under the photo, or dropping the back button on mobile, so the name is visible sooner.
- Mobile home: the floating WhatsApp button sits on top of the "View all" link in the "Explore Our World" section (screenshot taken at Pixel 7 size). Check whether P3-21's bottom-overlap fix covers this spot.

## What was not checked, and why

- **Google field data (CrUX, Search Console, GA4):** no Google API credentials are set up for the skill.
- **Backlinks:** no Moz or Bing Webmaster API keys.
- **Local SEO / maps:** skipped. There is no Google Business Profile yet (project note).
- **The skill's own fetch scripts** could not run here (the container has no DNS of its own; all traffic goes through a proxy). Pages were fetched with curl and Playwright through the proxy instead, then analysed with the skill's `page_checks.py`, `content_quality.py` and `schema_ecommerce_validate.py`.
- **Browser sandbox:** pages were rendered with Chromium's sandbox turned off (`--no-sandbox`), because this cloud container does not support it.
- Screenshots were taken but are not committed (project rule).
