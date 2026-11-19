# Prompt T: Tracking

PR title: "Prompt T: Tracking". Drafted and run 2026-11-19 after Saud supplied the IDs.

## IDs (public, safe to commit)
- GA4 Measurement ID: G-M3TXB88CT8 (already in index.html before this task)
- Microsoft Clarity project ID: zgadv9adjz
- Meta Pixel ID: 1844995836681399

## What it does
- T1: Clarity + Meta Pixel added to the head of index.html (the generator copies it to every built route). Both scripts load after idle (6s) or first interaction, same as gtag, so they do not hurt load speed. vercel.json CSP updated so the browser allows the Clarity and Meta hosts.
- T2: app.js trackEvent() also sends Meta standard events:
  view_item -> ViewContent, add_to_cart -> AddToCart, whatsapp_checkout_click -> InitiateCheckout,
  custom_order_submit -> Lead, contact_whatsapp_click -> Contact.
  New GA4 event view_item on product pages (deduped). Meta PageView on SPA route changes (GA4 and Clarity follow history changes on their own).

## Rules
- No new visible text, no layout change. No personal data (name, phone, order note) in any tracking call.
- Do not touch /cart or /workshops noindex, canonicals, JSON-LD, routes.
- After merge: check Vercel preview console for CSP errors, then Meta Events Manager > Test events, GA4 Realtime, Clarity > Recordings.
