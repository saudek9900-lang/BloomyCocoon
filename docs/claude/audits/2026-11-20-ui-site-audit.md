# UI audit: whole site, L4 lane (2026-11-20)

**Status: all findings fixed and merged (2026-11-20).** U1 = P3-17 (#40), U2 = P3-18 (#41), U3 = P3-19 (#43), U5 = P3-20 (#44; the route-change half was a wrong finding), U4/U6/U7/U8 = P3-21 (#45), footer links = P3-15 (#46). Not done: product-name links under cards (20px tall, optional) and the floating WhatsApp pill over the add-on box at 1024px (not a bug).

Docs only. No code or site text was changed.
Checklist: `ui-ux-pro-max` (accessibility, touch, performance, layout, type, motion, forms, navigation). Its palette and fonts were not used.
This follows the P2-5 audit (`docs/claude/ui-phase-bc-proposal.md`). That audit covered collections, custom order, cart and contact at 375px. P3-10a/b/c already fixed most of what it found. This audit covers the whole site at all four widths.

## How it was checked
- `npm run build`, then served `dist/` with `vite preview` and drove it with Playwright.
- **18 routes × 4 widths (375, 768, 1024, 1440):** home, /collections, /crochet-bouquets, 2 product pages, /custom-order, /cart, /contact, /faq, /about, /valentines-day-gifts, /return-gifts, /send-gifts-to-kerala, /blog, one blog post, /shipping-delivery, /workshops, and an unknown URL.
- Per page, the script measured:
  - horizontal overflow, H1 count, visible footers and console errors
  - every visible tap target under 44px (inline text links inside paragraphs are exempt)
  - text under 12px
  - text contrast against solid backgrounds
  - images: alt text, size attributes, format and lazy-loading
  - emoji in visible text, and layout shift (CLS)
- Also checked: keyboard Tab order and focus ring, the mobile menu, the quick-look modal, the cart link, fixed bars at the page bottom, and which image files each product page downloads.
- Screenshots were for review only and are not committed.

**Not checked** (nothing below claims it):
- a real phone, a screen reader, or the live site
- Lighthouse or INP
- contrast of text over photos or gradients, and placeholder contrast
- the unknown-URL result: `vite preview` falls back to the home page, but Vercel serves `404.html`, which is fine locally (status 200 from preview, title "Page Not Found").

## What passed (no action)
- No horizontal scroll on any of the 72 page/width pairs.
- Exactly one H1 and one visible footer on every page. No console errors.
- Every `<img>` has an alt. All 47 Material icons are `aria-hidden`. No emoji used as icons in visible text.
- The skip link works. The focus ring is visible (3px outline) on every Tab stop tested.
- The `prefers-reduced-motion` block exists. `lang="en"` is set and there is one `<main>`.
- Form fields all have labels.
- Measured text contrast on solid backgrounds: no failures. Examples:
  - body text rgb(72,71,64) on rgb(255,248,246): about 9:1
  - `text-secondary` rgb(114,88,82): about 6:1
- The quick-look modal handles focus correctly: it is `aria-modal`, focus moves to Close, and Escape returns focus to the button that opened it. Use it as the model for the menu.
- The cart drawer is `inert` while closed, so hidden buttons are not tabbable.

---

## Findings
Effort: S = under half a day, M = about a day. Each finding names the L4 task that fixes it.

### U1. "You May Also Like" grid is broken on product pages (HIGH) → P3-17
- **Desktop (768px and up):**
  - The grid is `md:grid-cols-4` (`index.html` ~5143), but the cards from `getProductCardMarkup` use `md:col-span-4` and `md:col-span-8`, which assume a 12-column grid.
  - The browser adds 4 extra columns. Measured at 1440: cards are 668, 1104, 668 and 420px wide, stacked in uneven rows with empty gaps. These should be four equal small cards.
- **Phone:** a `featured` product, such as Newborn Gift Hamper, renders as the large wide card. The card before it then sits alone in half a row, with an empty half beside it.
- Every other product grid uses `md:grid-cols-12` and is fine. The blog's "Gifts from this guide" also passes `featured: false`.
- **Why it matters:** this is the cross-sell block on all 69 product pages. It looks broken on desktop.
- Effort S, risk low.

### U2. Web fonts cause layout shift above Google's limit (HIGH) → P3-18
- **Measured CLS:**
  - product page at 375: **0.23 to 0.26**
  - blog post at 375: **0.26**
  - /collections at 1440: **0.15 to 0.22**
  - Google rates over 0.1 as "needs improvement" and over 0.25 as "poor".
- **Cause, confirmed:** with the Google Fonts requests blocked, the same pages measure **0.000**. Blocking only the icon font changes nothing. So the cause is Playfair Display and Inter swapping in (`display=swap`): headings and text reflow when the font arrives.
- **Fix idea, fonts unchanged:**
  - Add metric-matched fallback `@font-face` rules (`size-adjust`, `ascent-override`, `descent-override`) for a local serif and sans, so the swap does not move text.
  - Or self-host the two fonts and preload them.
  - Do not switch fonts.
- **Why it matters:** CLS is a Core Web Vital (SEO). Content jumps while the visitor starts reading.
- Measured locally on a fast connection. Real phones may score differently, so verify with field data in Search Console later.
- Effort M, risk low to medium (touches the `<head>` of every built page through `index.html`).

### U3. Every product page downloads an 850 KB PNG it does not show (MEDIUM) → P3-19
- `app.js` ~1442 sets the hidden zoom lightbox `#lightbox-img` to the full PNG on every product render. Example: `cozy_bear_plushie_baby-bear-plushie.png`, 853 KB.
- The visible hero image correctly loads the 480w WebP (43 KB). So each product view downloads about 20× more image than it shows, which hurts phone users on mobile data.
- **Fix idea:** set the lightbox source only when Zoom is opened, and use the `.webp`.
- og:image and the Merchant feed stay PNG; this is only the on-page lightbox.
- Related: the quick-look modal has `<img id="modal-product-img" src="">` (`index.html` ~5301). An empty `src` can make some browsers request the page again. Leave out the attribute until the modal opens.
- Effort S, risk low.

### U4. Fixed bars cover the end of the page on phones (MEDIUM) → P3-21
- **Product page at 375:** scrolled to the bottom, the sticky "Add to Cart" bar (65px) covers the footer's WhatsApp number and the © line. There is no bottom padding for it.
- **Other pages at 375** (home, /collections, /contact): the floating WhatsApp button covers the right end of the © line.
- **At 1024:** the floating "WhatsApp Us" pill sits over the product add-on box (the fairy lights price) when that box is near the bottom of the screen.
- **Fix idea:** add bottom padding equal to the bar or button height while it is shown. Do it in CSS on the page wrapper, not in the 36 footers.
- Effort S, risk low.

### U5. Keyboard: the mobile menu does not hold focus (MEDIUM) → P3-20
- **Correction (found while building P3-20):** the second half of this finding, "route changes drop focus", was wrong. The link I tested does a full page load, where focus starting at the top of the page is normal. In-app transitions already call `focusScreenHeading`. No change was needed for that part.
- **Mobile menu (375):**
  - Opened with the keyboard, Tab leaves the open menu and walks into the page behind it. After 20 Tabs, focus was on an add-to-cart button 1,300px down, with the menu still open.
  - The button's `aria-label` stays "Open mobile menu" while the menu is open.
  - Escape works and returns focus to the button.
- **SPA navigation:** after moving to another page inside the app (tested: cart link to /cart), focus lands on `<body>`. Keyboard and screen-reader users are not taken to the new page's content.
- **Fix idea:**
  - Keep Tab inside the open menu, or close the menu when focus leaves it.
  - Switch the label to "Close mobile menu" while open.
  - After a route change, move focus to the new page's H1 or `#app-viewport`, which is already `tabindex="-1"`.
- Effort S to M, risk low.

### U6. Tap targets under 44px outside the footer (LOW to MEDIUM) → P3-21
Measured at 375, CSS px. Footer links are already covered by P3-15. The /cart items were fixed in C1.

| Where | Element | Size |
|-------|---------|------|
| Product pages | breadcrumb links (Home, Handmade Collection, category) | 15–16px tall |
| Product pages | "View All Collection →" | 16px tall |
| Product pages | "Back to Handmade Collection" | 34px tall |
| Product pages | "Also a great fit for" and occasion links (e.g. "Baby Shower Gifts") | 17px tall |
| All pages with product cards | product name link under the card image | 20px tall (the image link above it is large, so lower priority) |
| /custom-order, /contact, /faq, /shipping-delivery, /workshops | "Back to Home" link | 24px tall |
| Home | "Start Custom Order", "Explore Collection" hero buttons | 40px tall |
| Home | "Read our story" | 28px; Instagram link 26px |
| Landing pages | related-guide and related-page links (e.g. "Eid Gifts", "Return Gifts") | 17px tall |
| Category pages | FAQ `<summary>` rows | 24px tall |
| /blog | "Read article" | 20px tall |
| Blog post | "View all articles", "Read article" | 16px; related links 23px |
| Quick-look modal | Close button 42×42; Add to Cart 42px tall | near miss |

The product add-on checkboxes are 16×16, but each sits inside a full-row `<label>`, so the real tap area is fine.
Effort S to M, risk low (CSS padding or min-height, same look).

### U7. Text under 12px (LOW) → P3-21
- Cart drawer line "About 50% advance…": **11px**. It is in every page's drawer.
- Product card badges ("Made with Love", "Single Stem", "Hamper"…): 11px.
- "Coming soon" badge on the Workshops tile: 10px.
- Product page spec labels ("CRAFT YARN", "CARE", "DELIVERY", "ORIGIN"), the 3 trust tiles ("100% Handcrafted"…), and the "Starting prices are a guide" note: 11px.
- /custom-order live preview lines: 11px.
- **Fix:** raise to at least 12px. Only font sizes change; colour tokens are untouched.
- Effort S, risk low.

### U8. Small layout glitches (LOW) → P3-21
- Home at 375: in "Explore Our World", the "View All →" link wraps onto two lines next to the subtitle.
- Product page at 375: the "+₹89" fairy-lights price wraps, with "+" and "₹89" on separate lines.
- Effort S, risk low.

---

## New L4 tasks (added to the queue)
Run order inside L4. One open PR at a time. All are Sonnet 5.5, medium thinking.

| # | Task | Fixes | Needs from Saud | Conflicts |
|---|------|-------|-----------------|-----------|
| P3-17 | Related products grid fix | U1 | nothing | product page: not with P3-16, P5-1 |
| P3-18 | Font layout shift (CLS) | U2 | nothing | `index.html` head: rebase if another lane edits the head |
| P3-19 | Product page image weight | U3 | nothing | product page: not with P3-16, P5-1 |
| P3-20 | Keyboard focus: menu and page changes | U5 | nothing | `app.js` router: small, local |
| P3-21 | Tap targets, small text, bottom overlap | U4, U6, U7, U8 | nothing | `styles.css`: run before or after P3-15, never at the same time |
| P3-15 | Footer tap targets (existing, run ALONE) | P2-5 3.3 | Saud's OK | all lanes |
| P3-16 | "Customise this" link (existing, optional) | P2-5 2.8 | Saud's wording | product page |

P3-17 to P3-21 add no new text claims and change no prices, colours, fonts or images.
