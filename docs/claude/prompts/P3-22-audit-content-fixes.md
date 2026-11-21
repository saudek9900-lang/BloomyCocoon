# P3-22: Audit content fixes (H1s, tracking wording, llms price, small copy)

Branch: content/p3-22-audit-fixes. PR title: "P3-22: Audit content fixes". Lane L1. Model: Sonnet 5.5, medium thinking.
Source: docs/claude/audits/2026-11-20-full-site-audit.md (findings S1, T1, G1, X1, X2, U1). Answers: Q16, Q19 in docs/claude/data/owner-answers.md.
Use US or UK spelling as the surrounding text already does. The site-wide UK spelling pass is P3-23, not this task.

## Steps (one commit per step)
1. **H1s (S1).** Change the H1 on 5 pages to say what the page is. Keep the current tagline as a line under the H1 (a `<p>` with the same look is fine). Do not change titles, meta, URLs or canonicals.
   | Page | Current H1 (index.html) | New H1 |
   |---|---|---|
   | /about | "Where Every Stitch Tells a Story" | About BloomyCocoon: Handmade Crochet Gifts from Kerala |
   | /contact | "Let's Start a Conversation" | Contact BloomyCocoon on WhatsApp |
   | /custom-order | "Your Vision, Our Stitches" (~line 1499) | Custom Crochet Gift Orders |
   | /faq | "Common Questions" (~line 1159) | Crochet Gift Orders: FAQs |
   | /collections | "The Collection" (~line 883) | Handmade Crochet Gift Collection |
   Check that the static route HTML from scripts/generate-route-html.mjs also shows the new H1 (it may set its own H1 for some routes; grep it).
2. **Tracking wording (T1, Q16).** Tracking is sent manually, and only needs mentioning where it matters.
   - Product page FAQ answer (index.html ~line 5172, shared by all 69 product pages): remove "with courier tracking". New end of sentence: "…before you pay the remaining balance and we dispatch your gift." Also change "high-resolution photos" to "a photo of your finished gift" so it matches the order steps (X2).
   - /faq answer (index.html ~line 3591): change "send you tracking details upon dispatch" to "send you the tracking details after dispatch". Do not name a channel (WhatsApp, SMS) unless the page already does for this step.
   - /shipping-delivery: if it has no tracking line, add one sentence: "After dispatch, we send you the tracking details." Nowhere else.
3. **llms price claim (G1).** public/llms.txt and public/llms-full.txt line 46: replace "under ₹200" with "starting from ₹149". Check the /return-gifts lowest price is still ₹149 in src/catalog.json first.
4. **About copy (X1, Q19).** index.html ~line 1067: "crafted using only the quality yarn" → "crafted using only quality yarn". ~line 1075: "securing every thread for a lifetime of use" → "securing every thread so it lasts for years with gentle care". Do not name a yarn brand or type.
5. **"1–2 weeks" (X2).** Make visible text use the en dash "1–2 weeks" everywhere (index.html, app.js strings, src/route-content.mjs, src/catalog.json text, llms files). Do not change code, URLs or JSON keys.
6. **Icons (U1).** Home page "Gifting by Occasion" cards: add `aria-hidden="true"` to the 4 icon spans (`favorite`, `cake`, `child_care`, `redeem`). Do not change the icon names.
7. Do not commit public/sitemap.xml or CLAUDE.md changes.

## Verify
- `git fetch origin && git merge origin/main`, then `npm run build`, `npm run test:jsonld` and every `test:*` script pass.
- In dist/: `grep -rl "courier tracking" dist` returns nothing; "tracking details" appears only on /faq and /shipping-delivery; "under ₹200" is gone; every built page still has exactly one H1, one canonical and one footer.
- PR body: old vs new H1 table, list of changed sentences.

## Final report
Short bullets for Saud, the PR link, and: "Next in L1 is P3-24 (Sonnet 5.5, medium)."
