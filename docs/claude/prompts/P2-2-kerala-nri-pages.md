# P2-2: Kerala and NRI gifting pages

Branch: content/p2-2-kerala-nri. PR title: "P2-2: Kerala and NRI gifting pages". One commit per page. Needs P1-3 merged (uses the order steps component).

## Why
Kerala gift sites own "send gifts to Kerala from UAE" searches but sell cakes and flowers, not handmade crochet. No Kerala crochet maker ranks for "crochet gifts Kerala". Two pages and one guide target these gaps.

## Pages
K1 /send-gifts-to-kerala: for Malayali families in the UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain and elsewhere sending a handmade crochet gift to family in Kerala. H1, 400-600 words, product grid of 8-12 suitable products, "How ordering works" component, "Plan ahead" (birthdays, anniversaries, Onam, Vishu, Eid: message at least 2 weeks before), 4-5 FAQs, same JSON-LD pattern as occasion pages.
K2 /crochet-gifts-kerala: handmade crochet gifts made in Mampad, Malappuram, delivered across Kerala. Same structure, local angle, links to category and occasion pages.
K3 Blog post content/blog/send-gift-to-kerala-from-uae.md, "How to Send a Handmade Gift to Kerala from the UAE or Saudi Arabia", 800-1,100 words, date = commit date, `products:` list if P1-2 added that field, links to K1 and K2.
K4 Links: both pages in the footer (next to the gift guides list or a small "Kerala gifting" list), one line from /contact, and from /anniversary-gifts and /birthday-gifts.

## Facts allowed
- Everything in the CLAUDE.md ground rules; pan-India delivery (so anywhere in Kerala); the customer can order from any WhatsApp number, including a Gulf number; delivery charge confirmed before making begins; 1-2 weeks.
- Paying from abroad: if docs/claude/data/owner-answers.md Q3 is still TODO, write only "Message us on WhatsApp and we'll confirm a payment method that works for you." If Q3 is answered, use that answer exactly.
- Do NOT claim Gulf delivery, surprise delivery, fixed-date guarantees or district lists unless owner-answers Q2 / Q11 say so.

## Verify (in the final report)
- Title, meta (with length), H1, canonical, JSON-LD types for each page; word counts; all links resolve.
- npm run build and npm run test:jsonld pass; pages in sitemap.xml.
