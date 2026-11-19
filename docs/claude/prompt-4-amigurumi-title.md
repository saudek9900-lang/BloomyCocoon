# Prompt 4: Amigurumi post title and meta

Branch: content/amigurumi-title. PR title: "Prompt 4: Amigurumi title and meta". One commit.

## Why
Search Console, 20 Oct to 16 Nov: /blog/what-is-amigurumi-crochet-plushies-guide had 33 impressions at average position 5.5 and 0 clicks. The title and description are not earning the click.

## Task
- File: content/blog/what-is-amigurumi-crochet-plushies-guide.md, frontmatter only.
- Rewrite `title` and `description`:
  - Title: lead with the question people search ("What Is Amigurumi?"), add a clear benefit, under 60 characters including the " | BloomyCocoon" suffix if the build adds one (check scripts/generate-route-html.mjs / src/blog-engine.mjs for how the page <title> is built).
  - Description: 140-155 characters, plain, answers the question and gives a reason to click. It may mention handmade crochet plushies from Kerala.
- Keep slug, date, image, imageAlt, related and the body unchanged. The URL must not change.
- If the H1 is taken from `title`, make sure it still reads naturally as the post heading.

## Rules
- No invented facts, prices, dates or claims. Nothing about how images were made.
- No "best", "No.1" or similar unverifiable claims.

## Verify (in the final report)
- Old and new title + description, with character counts.
- Built page: one H1, <title>, meta description, og:title, og:description and BlogPosting JSON-LD headline all use the new text.
- npm run build and npm run test:jsonld pass.
