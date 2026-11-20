# P3-24: Answer blocks on category pages (AEO)

Branch: content/p3-24-category-answers. PR title: "P3-24: Category answer blocks". Lane L1, after P3-22 is merged. Model: Sonnet 5.5, medium thinking.
Source: docs/claude/audits/2026-11-20-full-site-audit.md (A1).

## Goal
Each of the 7 category pages (/crochet-bouquets, /crochet-plushies, /crochet-keychains, /crochet-baby-gifts, /crochet-accessories, /crochet-home-decor, /crochet-gift-combos) gets one short question heading with a 40–60 word answer, so search engines and AI tools can quote it.

## Steps
1. For each category, read the lowest and highest "Starting from" price from src/catalog.json. Use only those numbers. No sizes, delivery times beyond "1–2 weeks", or other new facts.
2. Add, after the existing intro and before the product grid or near "Why handmade costs more", an H2 like "How much does a crochet bouquet cost?" with an answer such as: "Crochet bouquets at BloomyCocoon start from ₹149 for a single rose and go up to ₹1,499 for the Custom Premium Bouquet. These are starting prices: the final price and delivery charge are confirmed on WhatsApp before we start making your gift." Adjust per category (plushies, keychains…). Keep it natural, not keyword-stuffed.
3. Put it in both places a category page is rendered (the SPA in index.html/app.js and the static route HTML via src/route-content.mjs / scripts/generate-route-html.mjs), so both match.
4. Do NOT add new FAQPage JSON-LD (Google retired FAQ rich results; project rule). Visible text only.
5. Follow the spelling style decided in Q18 (UK) if P3-23 is merged; otherwise match the page.
6. Do not commit public/sitemap.xml or CLAUDE.md.

## Verify
- `git fetch origin && git merge origin/main`, then `npm run build`, `npm run test:jsonld` and every `test:*` script pass.
- Each category page: one H1, one canonical, one footer; the new H2 is present; prices match catalog.json.
- PR body: the 7 questions and answers.

## Final report
Short bullets, PR link, and say whether P3-23 (UK spelling, alone) is now runnable.
