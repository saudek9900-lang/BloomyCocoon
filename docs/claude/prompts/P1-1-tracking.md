# P1-1: Tracking follow-up

Branch: track/p1-1-tracking. PR title: "P1-1: Tracking follow-up". One commit per step.

## Why
- Today GA4, Clarity and Meta Pixel load on every host (localhost, Vercel previews), so Saud's own testing pollutes the data.
- Several planned events are missing, so we cannot see where WhatsApp clicks come from.

## Existing setup (read first, do not break)
- index.html head: gtag loader (deferred), then the Clarity + Meta Pixel block (stubs, fbq init 1844995836681399, PageView, scripts injected after idle or first interaction).
- app.js: trackEvent() (around line 844) sends GA4 + Meta via trackMetaEvent(). Existing events: view_item, add_to_cart, toggle_gift_addon, custom_order_submit, category_filter_click, contact_whatsapp_click, instagram_click, whatsapp_checkout_click. Keep all of them and their Meta mappings unchanged.
- Many static WhatsApp links in index.html use href="https://wa.me/919061174579" with data-whatsapp-message.

## T2-1: Production-only gate
- Define one check: the site is live only when location.hostname === 'www.bloomycocoon.com'.
- If not live: do not load gtag, Clarity or Meta scripts, do not call fbq init/PageView, and make trackEvent() a no-op.
- Same deferred loading as now on the live host. No speed regression.

## T2-2: New events (GA4; Meta only where stated)
- whatsapp_click with param link_location, for EVERY click on a wa.me link (one delegated listener). link_location values: product, cart, custom_order, floating, footer, header_nav, occasion_page, category_page, contact, info_page, blog, other. Work it out from the link's position (closest section/route/footer). Not sent to Meta (the existing Contact and InitiateCheckout events already cover Meta). Existing whatsapp_checkout_click and contact_whatsapp_click keep firing as before.
- remove_from_cart (item id, name, category). Meta: none.
- view_cart when the cart drawer or /cart opens (item count only).
- search on /collections search input: param search_term, trimmed, max 50 characters, sent once after typing stops (debounce ~1s) and only if 2+ characters.
- blog_read when a blog post is scrolled to 75% (once per post per page view; param post slug).
- Do NOT add scroll or outbound-click events: GA4 enhanced measurement already sends scroll (90%) and outbound clicks. Say in the report if enhanced measurement looks off.

## Rules
- No personal data in any event: no names, phone numbers, card messages, order notes, custom order text.
- No visible change, no layout change, no new text. Do not touch canonicals, JSON-LD, routes, noindex, sitemap.
- CSP: no new hosts should be needed. If one is, STOP and ask.

## Verify (put results in the final report)
- npm run build and npm run test:jsonld pass.
- On local preview: zero network requests to googletagmanager.com, google-analytics.com, clarity.ms, facebook.net / facebook.com.
- Temporarily force the gate on (local only, not committed) and show each new event fires once with the right params.
- List every file changed and every event with its params.
- After merge, Saud: GA4 Realtime + DebugView, mark whatsapp_click and custom_order_submit as key events, Meta Events Manager > Test events, Clarity > Recordings.
