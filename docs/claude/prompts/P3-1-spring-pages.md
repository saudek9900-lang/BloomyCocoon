# P3-1: Vishu and Mother's Day pages

Branch: content/p3-1-spring-pages. PR title: "P3-1: Vishu and Mother's Day pages". One commit per page. Vishu page live by 1 Mar 2027, Mother's Day by 20 Mar 2027.

## Steps
S1 /vishu-gifts: Vishu 2027 falls on 14-15 April (Kerala calendars differ by a day; say "mid-April"). Angle: a keepsake gift for family, including families abroad sending to Kerala (link /send-gifts-to-kerala).
S2 /mothers-day-gifts: Mother's Day in India is 9 May 2027 (second Sunday of May).
Both: same template and JSON-LD pattern as /eid-gifts; H1, intro about 150 words, product grid of 8-12 suitable products, "Plan ahead: message us at least 2 weeks before", "How ordering works", 3-4 FAQs from approved facts. Link from the nav occasions menu if there is one. Sitemap via the generator.

## Verify (in the final report)
- Title, meta (with length), H1, canonical, JSON-LD types, product list per page. npm run build and npm run test:jsonld pass.
