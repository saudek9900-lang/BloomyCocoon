# P2-3: Blog post "crochet return gift ideas"

Branch: content/p2-3-return-gifts-post. PR title: "P2-3: Return gift ideas post". One commit for the post, one for any link changes.

## Why
"crochet return gift ideas" and "crochet return gifts" are the only non-brand searches the site shows up for, and /return-gifts already gets clicks at position ~5.7. A focused post supports that page.

## Task
- New file content/blog/crochet-return-gift-ideas.md, same frontmatter format as the other posts (title, description, slug, date, image, imageAlt, related).
  - slug: crochet-return-gift-ideas
  - date: the real date the post is committed (today). Do not back-date.
  - image: reuse an existing image already used for a return-gift-suitable product (from src/catalog.json). imageAlt describes what is in the image. Nothing about how images were made.
  - related: /return-gifts plus 2 matching category pages.
- Length about 900-1,200 words. Byline is handled by the blog engine ("BloomyCocoon Studio"); do not add another.
- Structure: short intro; why handmade crochet works as a return gift; 6-8 idea sections, each naming a real product from src/catalog.json that suits return gifts (e.g. keychains, small plushies, single flowers, charms) with its real "Starting from" price and a link to its /products/<id> page; how to order in bulk (point to /return-gifts and WhatsApp); a short FAQ (3-4 questions) answered ONLY with facts already on the site.
- Link /return-gifts at least twice. Add one link from /return-gifts or the blog index to the new post only if a natural spot already exists; do not add new sections to existing pages.

## Facts allowed (use exactly these, nothing else)
- Made and delivered in 1-2 weeks. For larger quantities, ask on WhatsApp.
- Prices are "Starting from"; final price confirmed on WhatsApp. Delivery charge is confirmed on WhatsApp before making begins.
- 50% advance by UPI or Google Pay after WhatsApp confirmation; balance after photo approval, before dispatch.
- Minimum quantities, bulk pricing, packaging: copy only what the /return-gifts page already says. If it says nothing, say "ask us on WhatsApp".

## Rules
- Do not invent prices, discounts, minimum quantities, sizes, colours on offer, delivery areas, reviews or customer stories.
- Do not name a yarn brand or type. No "best", "No.1" or unverifiable claims.
- Sitemap, blog index, llms-full.txt must pick up the post through the existing build. Do not hand-edit generated files.

## Verify (in the final report)
- Word count, every product linked with its price as found in catalog.json, every internal link resolves to a built page.
- Built post: one H1, one canonical, valid BlogPosting JSON-LD, appears in sitemap.xml and /blog.
- npm run build and npm run test:jsonld pass.
- Paste the final title and description.
