# P4-1: Seasonal pages (Father's Day to Diwali)

Branch: content/p4-1-seasonal. PR title: "P4-1: Seasonal pages". One commit per page. Run in March-April 2027 so pages are indexed early.

## Steps
One page each, same template and JSON-LD pattern as /eid-gifts:
- /fathers-day-gifts: Father's Day 20 Jun 2027.
- /friendship-day-gifts: Friendship Day 1 Aug 2027.
- /raksha-bandhan-gifts: Raksha Bandhan 17 Aug 2027.
- /onam-gifts: Onam, Atham 3 Sep, Thiruvonam 12 Sep 2027. Angle: a keepsake that lasts after the sadya; families abroad sending to Kerala (link /send-gifts-to-kerala).
- /diwali-gifts: Diwali 29 Oct 2027.
Each: H1, intro about 150 words, product grid of 8-12 suitable products, "Plan ahead: message us at least 2 weeks before", "How ordering works", 3-4 FAQs from approved facts. Nav occasions menu if there is one. Sitemap via the generator.

## Verify
- Per page: title, meta (with length), H1, canonical, JSON-LD types. npm run build and npm run test:jsonld pass.
