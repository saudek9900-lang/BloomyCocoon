# Prompts 1-3: upgrade round (drafted 2026-11-14, adapted for Claude Code 2026-11-20)

Originally written for Antigravity. CLAUDE.md overrides the push rules: "Do not push" here means push ONLY the task branch, open a PR, never merge, never push to main.
Line numbers (~123) are approximate; search for the text.
PR titles: "Prompt 1: copy fixes", "Prompt 2: SEO upgrades", "Prompt 3: UI/UX upgrades".

---

## Prompt 1: Copy fixes (timeline, packaging, payment, zoom, custom order)

```
PROMPT 1: Copy fixes - timeline, packaging add-on, payment wording, zoom label, custom-order defaults

RULES
- Push only branch copy/upgrade-1. Do NOT touch main. Do NOT commit Faceless/ or product-data/.
- Do NOT invent facts. Use ONLY the approved wording below. No new timelines, prices, fees, sizes, reviews or claims.
- Do NOT change any URL, canonical, route or sitemap entry. Do NOT rename or redefine color tokens.
- Keep og:image / twitter:image / feed image_link as PNG. Keep hero preload + WebP. Keep /cart and /workshops noindex.
- The JSON-LD regression guard (npm run test:jsonld) must still pass.
- Never add any text about how product images were made.
- If a change needs wording not given here, STOP and ask me.

APPROVED WORDING (use exactly, small grammar fits allowed)
- Timeline: "Made and delivered in 1–2 weeks" (includes delivery). Short form for badges: "1–2 weeks incl. delivery".
- Anniversary lead time: "Order at least 12–14 days ahead" (all of India; replaces 7–10 days Kerala / 10–14 days elsewhere).
- Payment: "50% advance by UPI or Google Pay once your order is confirmed on WhatsApp. Balance after you approve the photos, before dispatch." Short form: "50% advance after WhatsApp confirmation".
- Add-ons that remain: Handwritten note card (+₹49), Warm fairy lights with battery (+₹89). Gift packaging is NOT an add-on.

STEP 0
git status, git branch --show-current. Confirm main contains 5f0362e and the merged Prompt 0 (image rename). If not, STOP and report. Create branch copy/upgrade-1 from main.
Record BEFORE sizes: dist JS and CSS (raw + gzip), dist/index.html bytes.

P1. Timeline
Replace every "3–7 crafting days" (index.html ~377 cart drawer, ~2971 badge, and anywhere else incl. app.js, src/*.mjs, scripts/*.mjs, content/, public/llms*.txt) with the approved timeline. Replace the anniversary lead-time line (index.html ~2021) with the approved lead time. Make the existing "1-2 weeks" mentions (FAQ ~1318, custom order ~1773, WhatsApp message app.js ~3208) use the same approved wording. List every replaced line.

P2. Gift packaging add-on removal
- Remove the "Gift Packaging" line and its amount from the cart drawer (~402) and the cart page (~3116 "Gift Packaging & Add-ons" -> "Gift add-ons"), and from cart totals logic in app.js. Rename the WhatsApp message header at app.js ~852 to "Gift add-ons".
- Remove the hero badge "Gift Wrapped / Sustainable Packaging" (~520-521). Do not replace it with anything.
- Product page add-on panel (~3318-3324): change "elevate your gift packaging" to "Add a special touch before ordering:".
- Cart meta description (src/route-content.mjs ~190) and llms.txt / llms-full.txt line 18: remove "gift packaging"; say "gift add-ons".
- Remove the word "packaging" from the general price notes (FINAL_PRICE_NOTE, priceNote app.js ~691, the WhatsApp disclaimer ~879, index.html ~813, ~821, ~1325, ~3161, llms ~66), and from the FAQ answer "Can I customize colors, names, or packaging?" (question -> "Can I customize colors or names?").
- KEEP unchanged: About "Packaging – Packed and ready for gifting" (~1160), Return gifts "Individual Packaging" (~2303), and the gift box / hamper product descriptions that mention packaging.
- Remove the line "Secure bubble wrapped packaging" (~3175) and its icon.

P3. Payment wording
Make every advance-payment mention use the approved wording: cart drawer "50% Advance via UPI on booking" (~409), custom order "upon confirmation" (~1771), cart page "50% Advance on Booking" (~3142), product page "50% Advance Booking" (~3387), FAQ (~1288, ~3430), order terms (~1862), PAYMENT_DESCRIPTION and paymentAccepted (src/route-content.mjs ~6, index.html ~201 - text only, JSON-LD stays valid), WhatsApp messages (app.js ~880, ~3209), llms files. List every replaced line.

P4. Product page
- "Inspect Stitches" (~3260) -> "Zoom". Keep the button behaviour and aria-label consistent with the new text.
- Product FAQ "How long does production and delivery take across Kerala and India?" (~3417): answer with the approved timeline, then "Delivery charge is confirmed on WhatsApp before making begins."

P5. Custom order defaults
The custom order flow pre-fills "Bouquet" and "Blush Pink" (index.html ~1740, ~1763; app.js ~890, ~3141, ~3205, ~3236). If the customer did not pick a type or palette, the preview and WhatsApp message must say "Not chosen yet" instead of a default. Picked values still show as picked.

VERIFY (report actual output)
1. npm run build exits 0. npm run test:jsonld passes.
2. grep dist/ for: "3–7", "3-7 crafting", "7–10 days", "Gift Packaging", "Gift Wrapped", "Sustainable Packaging", "bubble", "on booking", "upon confirmation", "Inspect Stitches". Print counts (all 0).
3. grep dist/ for "Packed and ready for gifting" and "Individual Packaging" (still present).
4. Headless Chrome: add 2 items + both add-ons to cart; print cart totals and the WhatsApp message text. No packaging line; totals correct.
5. Custom order: submit with no type/palette picked; print the preview and WhatsApp text ("Not chosen yet"). Repeat with picks.
6. Every built page: one H1, one canonical, one footer, valid JSON-LD.
7. BEFORE/AFTER size table.

COMMITS
One commit per task (P1-P5). Push the branch, open the PR, do not merge.

FINAL REPORT
Per task: commit hash, files changed, every old -> new line. PR link. Anything skipped or uncertain.
```

---

## Prompt 2: SEO (titles, HTML order, copy depth, alt text, links, images)

```
PROMPT 2: SEO upgrades

RULES
- Same RULES as Prompt 1, on branch seo/upgrade-2. Additionally: do NOT add FAQPage schema anywhere new, no HowTo schema, no ratings/reviews.
- New visible copy may use ONLY these facts: handmade to order by hand in Mampad, Malappuram, Kerala; delivery across Kerala and India; made and delivered in 1–2 weeks; "Starting from" prices, final price confirmed on WhatsApp; delivery charge confirmed on WhatsApp; colours, names and details chosen on WhatsApp; no standard sizes - size confirmed on WhatsApp; yarn varies by preference (no yarn brand or type); 50% advance, balance after photo approval; photos shared before dispatch; damage reported within 48 hours with photos and unboxing video; care = spot clean gently, air dry in shade; add-ons = note card, fairy lights with battery; anniversary orders 12–14 days ahead. Anything else: STOP and ask.
- Never add text about how images were made.

STEP 0
Confirm Prompt 1 (copy/upgrade-1) is merged into main. If not, STOP. Create branch seo/upgrade-2 from main. Record BEFORE sizes.

E1. HTML order
In every built page, the main content (H1 onward) must come before the cart drawer, quick-look modal and other off-canvas UI in the source order. Move those blocks after <main> (or to the end of <body>) without visual or behaviour change. Report the character offset of the H1 BEFORE and AFTER on /, one category, one product.

E2. Icon text
Material Symbols ligature names (expand_more, shopping_bag, arrow_forward...) appear in page text. Confirm every icon span has aria-hidden="true" (or an aria-label on icon-only controls). Report the count fixed. If Google-visible text extraction still includes them, tell me options; do not change the icon system.

E3. Product titles and meta descriptions
Single source: src/route-content.mjs ~373-374 and the duplicate in app.js ~1003-1004 must use one shared function.
- Title: "Crochet {Name} | Handmade in Kerala | BloomyCocoon" - but do not double "Crochet" when the name already contains it (e.g. "Crochet Tote Bag" -> "Crochet Tote Bag | Handmade in Kerala | BloomyCocoon"). Print any title over 60 characters and shorten by dropping " | BloomyCocoon" only for those.
- Meta description: start with the product name, then the existing description, then "Starting from ₹{price}. Made to order in Kerala, customize on WhatsApp." Keep under 160 characters; trim the description sentence, not the price.
- Print the table of all product titles + descriptions with lengths.

E4. Category pages (7)
Below the product grid add: one short "Choosing a {category}" paragraph (60-100 words) and 3-4 Q&As as visible <details> text (no FAQPage schema), using only the approved facts. Add links to 1-2 relevant blog posts and the matching occasion page(s). Print all new copy in the report for my review.

E5. Product page FAQs
Keep the shared FAQs but add 1-2 category-specific Q&As per category (approved facts only). Print them.

E6. Image alt text
Product card and product page alt text: "{Product name} – handmade crochet {category singular} by BloomyCocoon". Blog hero images: describe the image, not the post title. No mention of how images were made.

E7. Internal links
Product pages: add a link to the matching occasion page(s) (use the existing occasion product lists). Blog posts: link the products they mention to their product pages.

E8. Images
Home "Popular Products" cards and the home story/Instagram images load PNG. Serve the existing WebP variants with srcset/sizes, width/height, lazy below the fold. Use only variants that already exist; if one is missing, list it instead of generating. og/twitter/feed stay PNG.

E9. PARKED - do not run. (Hidden IPTC metadata on feed images. Saud has not confirmed it yet.)

E10. Link /blog
Add a /blog link in the footer and on the home page (and in the Explore menu if it fits the existing dropdown). Real <a href> in the built static HTML.

E11. Occasion pages from home
Link all 4 occasion pages (anniversary-gifts, birthday-gifts, baby shower, return gifts - use the existing slugs) from the home page. If some are already linked, add only the missing ones.

E12. "You may also like"
Check first whether product pages already have a "You may also like" section. If yes, report it and skip. If not, add 4 products from the same category (existing data only, real <a href> links, no new schema).

E13. Sitemap lastmod
Sitemap lastmod is currently the build date on every URL. Use the real last change date per page (for example the git log date of the files that feed that page). If this is not reliable, STOP and give me the options.

VERIFY
1. npm run build exits 0; npm run test:jsonld passes.
2. H1 offset table (E1).
3. Title/description table (E3) with lengths.
4. All new copy (E4, E5) printed.
5. 3 product pages + 1 category + 1 blog post: alt texts printed.
6. Network check on / at 375 px: Popular Products images are WebP.
7. /blog and the 4 occasion links present in built home HTML (E10, E11). E12 result. 5 sample sitemap lastmod values (E13).
8. One H1, one canonical, one footer, valid JSON-LD on every page. BEFORE/AFTER sizes.

COMMITS
One commit per task (E1-E8, E10-E13). Push the branch, open the PR, do not merge.

FINAL REPORT
Per task: commit hash, files changed, what changed. All new copy. PR link. Anything skipped or uncertain.
```

---

## Prompt 3: UI/UX

```
PROMPT 3: UI/UX upgrades

RULES
- Same RULES as Prompt 1, on branch ui/upgrade-3. No layout redesign beyond what is listed. Keep Playfair Display + Inter and the existing color tokens.

STEP 0
Confirm Prompt 2 (seo/upgrade-2) is merged into main. If not, STOP. Create branch ui/upgrade-3 from main. Record BEFORE sizes.

U1. Emoji -> SVG icons
Replace emoji used as icons (home occasion cards index.html ~840-870, collection filter buttons ~1009-1012, add-on rows ~3329-3336, cart line app.js ~2613, and any other UI emoji) with inline SVG or existing Material Symbols, aria-hidden, same size and color. Emoji inside WhatsApp message text may stay.

U2. Home "How to Order"
The 3-step section (~773-800) and the 4 text blocks below it (~808-830) repeat each other. Keep the 3 steps; fold the Customisation / Delivery / Pricing points into one short line under the steps. No new facts.

U3. Product page trust line
Move the "50% advance after WhatsApp confirmation · Photos for approval before dispatch" line directly under the Add to Cart / Order on WhatsApp buttons.

U4. Button labels
Standardise: product cards "Add to Cart" everywhere; WhatsApp buttons "Order on WhatsApp" on product pages, "Continue on WhatsApp" in cart, "Ask on WhatsApp" for questions. List every label changed.

U5. Empty cart
When the cart is empty, hide totals, add-on and advance lines; show "Your cart is empty" and one "Browse collection" link to /collections.

U6. Custom order form
Add optional fields: Occasion, Needed by (date), Describe your idea (textarea). Include them in the WhatsApp message only when filled. Visible labels (no placeholder-only), mark required vs optional, errors shown next to the field and announced to screen readers.

U7. Checklist audit (fix only small issues, report the rest)
At 375, 768, 1024, 1440 px on /, /collections, one category, one product, /cart, /custom-order:
- Tap targets at least 44x44 px with 8 px gaps.
- Visible focus ring on every interactive element.
- prefers-reduced-motion respected.
- Text contrast 4.5:1 (compute from tokens).
- No horizontal scroll; CLS under 0.1.
- Current page visible in the nav (aria-current exists; check it is also visible).

VERIFY
1. npm run build exits 0; npm run test:jsonld passes.
2. grep dist for emoji in UI markup: 0 (excluding WhatsApp message strings).
3. Screenshots at 375 and 1440 px: home How to Order, product page buttons, empty cart, custom order form (save outside the repo; list paths).
4. Custom order: WhatsApp text with and without the new fields.
5. U7 table: page x check x pass/fail, with fixes made.
6. One H1, one canonical, one footer, valid JSON-LD. BEFORE/AFTER sizes (flag > 3 KB gzip).

COMMITS
One commit per task (U1-U7). Push the branch, open the PR, do not merge.

FINAL REPORT
Per task: commit hash, files changed, what changed. PR link. Anything skipped, uncertain, or found but not fixed.
```
