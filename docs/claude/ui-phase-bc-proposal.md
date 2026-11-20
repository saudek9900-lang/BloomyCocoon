# UI Phase B/C audit and proposal (P2-5)

Docs only. No code or site text was changed.
Date: 2026-11-20. Branch: `ui/p2-5-audit`.

## How this was checked
- Read `app.js`, `index.html`, `styles.css` and the build scripts.
- Ran `npm run build`, served `dist/` with `vite preview`, and drove it with Playwright at **375px** (phone) for every area below. At **768px** only horizontal overflow was checked (none on /collections, /custom-order, /cart, /contact).
- Screenshots were for review only and are not committed.
- Checklist used: the `ui-ux-pro-max` rules (44px touch targets, visible labels, no horizontal scroll, contrast, CLS). Its palette and fonts were not used.

**Not checked** (so nothing below claims it):
- 1024 and 1440 widths, a real iPhone or Android device, a screen reader.
- The live site and its analytics. I do not know whether any real links or ads point at `/collections?category=...`.
- Colour contrast numbers (not measured).

Sizes are in CSS px as measured in the browser. Effort: S = under half a day, M = about a day, L = several days.

---

## 0. Top finding: a live bug (not a design issue)

**Loading `/collections?category=<anything>` breaks the page script.**

- What happens: the browser console shows `ReferenceError: filterCollectionCategory is not defined`. The script stops at that point, so everything defined after it never loads. Seen on the built site: after that load, `filterCollectionCategory`, `handleCollectionSearch` and `submitCustomRequest` are all `undefined`. In my test, tapping add-to-cart did not open the cart drawer.
- Cause: `applyCollectionFilterFromUrl()` is called at startup (`app.js` ~line 1840, inside `if (initialScreen === 'screen-collection')`). It calls `filterCollectionCategory`, which is only assigned later (`window.filterCollectionCategory = ...`, ~line 3462).
- How a real visitor hits it: tap a category pill (the URL becomes `?category=plushies`), then refresh, share or bookmark that URL. Plain `/collections`, `/crochet-keychains` and every other route loaded without errors in my test of 15 routes.
- Why it matters: sales and usability. The visitor lands on a half-dead page: no search, no cart drawer, no filters.
- Effort S, risk low. Fix: make sure the filter and search functions exist before the startup call, or run that call after they are defined.
- Related, not confirmed: `?q=berry` and `?search=bear` are read by the code, but in my test the search box stayed empty and all 69 cards stayed visible. Likely the same order problem; check once the fix is in.

---

## 1. Collections (/collections)

What exists:
- Text search (`#collection-search-input`) with a clear button (44×44) and an empty state with "Clear Search" and "Request Custom Item".
- 8 category pills (All + 7), horizontally scrollable, 44px tall.
- 69 cards in a 2-column grid; quick-look (44×44) and add-to-cart (44×44) buttons on each card.
- A sticky search and filter bar.

| # | Finding | Why it matters | Effort | Risk |
|---|---------|----------------|--------|------|
| 1.1 | Deep-link bug (section 0). | Sales, usability | S | low |
| 1.2 | **No sort.** There is no sort control at all. | Usability. Buyers cannot scan by price. | S–M | low |
| 1.3 | **Category is kept in the URL, search is not.** Filtering updates the URL (`?category=plushies`), but typing a search leaves the URL unchanged, and any `?q=` or `?search=` is dropped from the URL on route updates (`getCleanCollectionSearch` keeps only `category`). | Sharing and back button. Users lose a search on refresh. | S | low |
| 1.4 | **First product sits low on a phone.** Grid top is at about 924px; the viewport is 812px. Above it: back link, H1, long intro, disclaimer box, then the sticky bar, then another category paragraph. | Sales. Phone users scroll about 1.1 screens before seeing a product. | S–M | low (keep the H1 and the text in the page for SEO) |
| 1.5 | **Sticky bar is tall.** 119px of search and pills plus the 69px header leaves about 188px (23% of an 812px screen) covered while scrolling. | Usability on small phones. | S | low |
| 1.6 | **Search matches all card text,** including badge words ("Hamper", "Trending"). No result count, and the empty state does not repeat what was typed. | Usability. | S | low |
| 1.7 | Product descriptions are hidden on phone cards (`.product-card p { display: none }`). | Fine for scanning; just a known trade-off. | n/a | n/a |

No horizontal scroll at 375 or 768. Tap targets on cards and pills are fine.

Needs data from Saud: "Sort by popularity" or "Bestseller first" needs real sales data. Price low-to-high, price high-to-low and name A–Z need none (the catalog has `startingPrice` for every product).

---

## 2. Custom order (/custom-order)

Current flow (3 steps, one form, in `app.js` "CUSTOM ORDERS STEP BUILDER"):
1. **Type:** 6 pills (Bouquet, Plushie, Keychain, Coaster Set, Accessory, Other).
2. **Details:** 6 colour swatches (Blush Pink, Sage Green, Baby Blue, Lavender, Buttercup Yellow, Custom Mix), occasion dropdown, "needed by" date, notes.
3. **Name** (the only required field) and the **Order on WhatsApp** button.

WhatsApp message sent: greeting, customer name, base type, palette, notes, occasion, needed-by date, "Source: Custom Order Page", then the standard wording about Starting from price, 1–2 weeks and the 50% advance by UPI or Google Pay. A live preview card sits below the form on a phone.

| # | Finding | Why it matters | Effort | Risk |
|---|---------|----------------|--------|------|
| 2.1 | **"Submitted" wording is not true.** On submit the page shows "✨ Custom order request submitted!" and a success card, but nothing is submitted. It only opens WhatsApp. | Trust and clarity. A customer who never sends the WhatsApp message believes the order is placed. | S | low (needs Saud's wording) |
| 2.2 | **WhatsApp opens after a 600ms delay** (`setTimeout` then `window.open`). Browsers, especially iPhone Safari, often block pop-ups opened outside the tap. Not reproduced here (needs a real phone), but a known risk. | Sales. The customer sees "submitted" and nothing opens. | S | low |
| 2.3 | **Type is optional.** Step 1 has no check, so the message can say "Base type: Not chosen yet". | Cleaner enquiries. | S | low |
| 2.4 | **Colour swatches are 30px tall** (below the 44px target). Type pills are 44px. | Touch accuracy. | S | low |
| 2.5 | **No way to share a reference photo,** no size, quantity or budget field. A web link cannot attach a photo. The message could say the customer will send photos in the chat. | Fewer back-and-forth messages. | S | low (needs Saud's wording) |
| 2.6 | **"Custom build" preview image** is a stock image that only changes with the type. The badge can read as a picture of the customer's actual order. | Expectation risk. Do not change the images; the question is only the label. | S | low (needs Saud's decision) |
| 2.7 | "Needed by" minimum date is computed from UTC (`toISOString`), so around midnight IST it can be one day off. | Minor. | S | low |
| 2.8 | No way to start a custom order from a product ("customise this one"). | Fewer typed notes. | M | low |

The step indicator was checked and works (an earlier reading was a transition in progress, not a bug).

---

## 3. Cart (drawer and /cart)

Flow today: card add button → toast "Added ... to your cart!" and the drawer opens → drawer has qty, remove, estimated total, 50% advance line, "Continue to WhatsApp to confirm" and "Open Full Cart Page & Gift Touches" → /cart has per-item note, gift add-ons (card +₹49, fairy lights +₹89), order notes, order summary, payment schedule, "Continue on WhatsApp", a 5-step "How ordering works". The cart is saved in the browser (localStorage). The WhatsApp message lists items, qty, totals, notes and the payment wording.

| # | Finding | Why it matters | Effort | Risk |
|---|---------|----------------|--------|------|
| 3.1 | **Toast covers the drawer's main button.** In the 375px drawer, the "Added to cart" toast sits on top of "Continue to WhatsApp to confirm" for a few seconds. | Sales. Hides the main button right after add. | S | low |
| 3.2 | **Drawer header is cramped.** The "Full Page" button wraps to three lines ("Full / Pag / e"), and the "Kerala & Pan-India" line is misaligned. | Polish, trust. | S | low |
| 3.3 | **Small tap targets on /cart.** Measured: breadcrumb links 15px tall, "Continue Shopping" 16px, product name link 22px, item note input 42px, gift add-on checkboxes 16×16. Footer links (29, on every page) are 17–23px tall. | Usability. The drawer's own buttons are fine (44px+). | S–M | low |
| 3.4 | **Advance amounts are shown from "Starting from" prices,** e.g. ₹75 / ₹74 on a ₹149 item, both on the page and in the WhatsApp message, while the page also says delivery and final price are confirmed on WhatsApp. A customer may anchor on the number. | Trust, fewer disputes. Wording or layout change only. | S | low (needs Saud's decision) |
| 3.5 | **Empty-cart "Popular Handcrafted Blooms" picks are hard-coded** (4 product ids with fallback badges "Popular Fav", "Bestseller", "Pocket Love", "Anniversary"). For all 4 ids the catalog item exists, so the fallback badges are not shown today, but "Popular" is stated without sales data. | Honest claims. | S | low (needs Saud's decision) |
| 3.6 | The floating WhatsApp button hides while the drawer is open and on /custom-order, but stays on /cart next to the page's own "Continue on WhatsApp". | Duplicate CTAs. | S | low |

---

## 4. Contact (/contact) and the floating WhatsApp button

| # | Finding | Why it matters | Effort | Risk |
|---|---------|----------------|--------|------|
| 4.1 | **"Write to Us" form does not send an email.** It opens WhatsApp with the name, email and message filled in. The button says "Send Message" and the email field is required, but the email is never used to reply. | Clarity and friction. | S | low (needs Saud's decision on keeping an email field) |
| 4.2 | **Three WhatsApp entry points on one page:** the WhatsApp card, the form, and the floating button. Plus the "Start Custom Order" banner. Instagram and Email cards are the only other routes. | Decision clutter. | S | low |
| 4.3 | **Floating button label mismatch.** Visible text changes ("WhatsApp Us" / "Order via WhatsApp") on desktop widths, but `aria-label` is always "Chat on WhatsApp". Screen-reader and voice-control users may not match what they see. On a phone it is a 48×48 icon only. | Accessibility. | S | low |
| 4.4 | Contact form fields have visible labels and error messages (read in code); no overflow at 375 or 768. Tap-target sizes on this page were not measured. | OK as far as checked. | n/a | n/a |

---

## 5. Mobile CSS and `!important`

- `styles.css` is 821 lines with **116 `!important`**. `app.js` and `index.html` have none.
- Where they are:
  - Lines 1–129: 4 (reduced-motion block).
  - Lines 130–469: 29 (desktop hover rules and the **cart trigger/badge "lock"** block, about 25 rules).
  - Lines 470–589 (first `max-width:767px` block): 2.
  - **Lines 590–714 (second `max-width:767px` block): 76.** This is the heavy one.
  - Lines 715–821 (small-phone and other blocks): 5.
- What the mobile block does: overrides Tailwind utility classes with structural selectors such as `nav > div`, `#sideCart > div:first-child`, `.product-card > div:first-child`, `.mobile-bento-grid > div:nth-child(3)`.
- Intentional and safe to keep: `input, textarea, select { font-size: 16px !important }` (stops iPhone zoom on focus).
- **Risk of refactoring: high.** The selectors depend on page structure, and there is no automated visual test. A change can shift the home page, product cards or cart drawer without any error. Two separate `@media (max-width: 767px)` blocks add confusion.
- Recommendation: do **not** do a general clean-up. Change these rules only when a component is being edited anyway. If it is ever done, first add a screenshot baseline at 375 and 768 for home, collections, product, cart and custom order.

---

## Proposed prompts (pick which to run)

Ordered by impact versus risk. Each is one PR. These would be drafted as new prompt files; P3-10 in the queue is built from this list.

### B1: Fix the deep-link bug and tidy Collections (impact high, risk low, effort S–M)
1. Fix the startup order so `/collections?category=...` loads fully (section 0). Verify `?q=` and `?search=`.
2. Add a sort control: Featured (current order), Price low–high, Price high–low, Name A–Z. No popularity sort.
3. Keep search (and sort) in the URL with `replaceState`; extend the URL allow-list accordingly.
4. Phone layout: bring the first products higher and slim the sticky bar, without removing the H1 or the intro text from the page.
5. Empty state: show what was searched.
6. Add a check script or test for the deep-link case so it cannot regress.
- Needs from Saud: nothing, unless he wants sort labels in a specific wording.

### B2: Custom order and contact clarity (impact medium–high, risk low, effort M)
1. Open WhatsApp from the tap itself (a real link or an immediate open) instead of after 600ms.
2. Replace the "submitted" wording with honest wording; require a type or let the message say so.
3. Swatches to 44px tall.
4. Optional line telling the customer to send reference photos in the chat.
5. Contact form: make the button and email field match what the form really does; align the floating button's `aria-label` with its visible text.
6. Optional "customise this" link from product pages that pre-fills the type.
- Needs from Saud: approved wording for 2, 4 and 5; decision on keeping or dropping the email field; decision on the "Custom build" label (2.6).

### C1: Cart polish (impact medium, risk medium, effort M)
1. Move the toast so it never covers the drawer's main button; fix the "Full Page" button wrap and the delivery line.
2. Raise the /cart tap targets to 44px (breadcrumb, Continue Shopping, product link, note input, add-on checkboxes). Footer links are a site-wide change, so treat them as a separate decision.
3. Advance amounts: show them in a way that does not look final (page and WhatsApp message).
4. Empty cart: build the picks from the catalog and drop badge claims that have no data.
5. Decide whether the floating WhatsApp button should hide on /cart.
- Needs from Saud: wording and decision for 3, decision on "Popular" badges for 4 (no sales data is given to me).
- Risk is medium because the drawer shares the cramped mobile CSS (section 5). Run it after B1 and test at 375 and 768.

### Later, not recommended now: mobile CSS clean-up (impact low, risk high, effort L)
Only with a screenshot baseline first (section 5).

---

## Data or decisions needed from Saud
- Sort by popularity: real sales data (otherwise skip it).
- Wording approval: custom-order success message, photo-reference line, contact form button.
- Keep or drop the required email field on the contact form.
- "Custom build" label on the preview image.
- Whether advance amounts should show before the final quote.
- Whether "Popular" or "Bestseller" style claims can stay (no data given).
- Whether any real links or ads use `/collections?category=...` (affects how urgent B1 is; I cannot see analytics).
