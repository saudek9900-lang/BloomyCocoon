# P2-4: Eid gifts page

Branch: content/p2-4-eid. PR title: "P2-4: Eid gifts page". Must be live by 15 Jan 2027. Needs P2-2 merged (links to /send-gifts-to-kerala).

## Steps
E1 New route /eid-gifts, evergreen, same template and JSON-LD pattern as the occasion pages. Covers both Eids: Eid al-Fitr 2027 is expected around 9-10 March and Eid al-Adha around 16-17 May; say clearly that dates depend on the moon sighting.
E2 Content: H1 "Handmade Crochet Eid Gifts"; intro about 150 words, warm and respectful, about gifting only (no religious claims); product grid of 8-12 suitable products (bouquets, gift combos, home decor, plushies for children); "Plan ahead: message us at least 2 weeks before"; "How ordering works" component; line + link for families abroad to /send-gifts-to-kerala; 3-4 FAQs from approved facts.
E3 Links: from /send-gifts-to-kerala and the nav occasions menu if there is one. Sitemap via the generator.

## Verify (in the final report)
- Title, meta (with length), H1, canonical, JSON-LD types, product list.
- npm run build and npm run test:jsonld pass.
