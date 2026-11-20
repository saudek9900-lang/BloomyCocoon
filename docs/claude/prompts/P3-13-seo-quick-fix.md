# P3-13: SEO quick fix (titles, meta, blog links, llms.txt)

Branch: seo/p3-13-titles-links. PR title: "P3-13: SEO quick fix". Lane L1. Model: Sonnet 5.5, medium thinking. Source: docs/claude/audits/2026-11-20-seo-audit.md (findings H2, M1, M2, M4).

## Steps
1. Titles over 60 characters (M1): /about, /baby-shower-gifts, /birthday-gifts, /collections, /fathers-day-gifts, /friendship-day-gifts, /raksha-bandhan-gifts and the 4 blog posts over 60 (bouquet-vs-fresh-flowers is 80). Shorten the wording or drop the " | BloomyCocoon" suffix where the brand is already clear. Keep the main keyword first. No URL, canonical or redirect changes.
2. Meta descriptions over 160 characters (M2): /, /about, /birthday-gifts, /collections. Rewrite to 120-155 characters. Use only facts already on the site. No new prices, dates or claims.
3. Blog links (H2): link /blog/what-is-amigurumi-crochet-plushies-guide from the plushie product pages or the plushies category page and from one or two related blog posts, with natural anchor text. Add contextual links to /blog/valentines-day-crochet-gift-ideas from one more related page.
4. llms.txt (M4): list the 8 blog posts in public/llms.txt and public/llms-full.txt, one line each, in the same style as the other entries.
5. Do not commit public/sitemap.xml or CLAUDE.md changes (see "Parallel lanes" in CLAUDE.md).

## Verify
- Table of old vs new title and meta with lengths in the PR.
- Every built page still has exactly one H1, one canonical, one footer. npm run build and npm run test:jsonld pass.
