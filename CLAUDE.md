# BloomyCocoon: instructions for Claude Code

## When Saud says "continue" (or anything like "carry on", "next task")
1. Look at the task queue below, top to bottom.
2. For each task, check GitHub: is its PR merged into main, still open, or not created yet? (Use the PR title or branch name below. If you cannot see PRs, check `git log origin/main` for the task's commits.)
3. Skip tasks whose PR is merged.
4. If the first unmerged task has an OPEN PR: stop. Tell Saud it is waiting for him to check the Vercel preview and merge, and give the PR link.
5. Otherwise run that task: open its prompt file, follow it exactly, push only its branch, open the PR, give the final report, and STOP. One task per session.
6. Never start a task whose prompt is marked NOT DRAFTED or PARKED. Tell Saud instead.

## Task queue
Tasks 0, 1, 2, 3 and T are merged and live. Run the queue below in order, one task per session.
| # | Task | Prompt | Branch | PR title |
|---|------|--------|--------|----------|
| T2 | Tracking follow-up (live-host gate + missing events) | docs/claude/prompt-T2-tracking.md | track/t2-followup | Prompt T2: Tracking follow-up |
| 4 | Amigurumi post title + meta | docs/claude/prompt-4-amigurumi-title.md | content/amigurumi-title | Prompt 4: Amigurumi title and meta |
| 5 | Return gift ideas blog post | docs/claude/prompt-5-return-gifts-post.md | content/return-gifts-post | Prompt 5: Return gift ideas post |
| 6 | UI Phase B/C audit (docs only, no code) | docs/claude/prompt-6-ui-audit.md | ui/phase-bc-audit | Prompt 6: UI Phase B/C audit |
| - | New Sunflower + Lily bouquets | docs/claude/roadmap.md | - | PARKED (needs new product images) |
| - | E9 hidden IPTC tag on feed images | docs/claude/roadmap.md | - | PARKED (Saud to confirm) |

After task 6: stop and tell Saud the queue is done. Next prompts come from his planning chat. Full plan: docs/claude/roadmap.md.

## Project
- Handmade crochet gifts. Site: https://www.bloomycocoon.com (www is canonical). Based in Mampad, Malappuram, Kerala.
- Owner: Saud EK. Makers: his sisters. Blog byline: "BloomyCocoon Studio".
- 69 products, 7 categories (bouquets, plushies, keychains, baby-gifts, accessories, home-decor, gift-combos). Product data: src/catalog.json.
- Stack: Vite + vanilla JS SPA + Tailwind v3.4 on Vercel. Build: `npm run build` (vite build + scripts/generate-route-html.mjs, which writes static HTML per route, sitemap.xml, llms-full.txt, google-merchant-feed.xml). JSON-LD guard: `npm run test:jsonld`.

## Git rules (override anything in older prompts)
- Prompts were first written for another tool. Where they say "Do not push", it means: push ONLY the task branch.
- Never push to main. Never merge. Never force-push. Never delete branches.
- One commit per task step, clear messages. Open one PR per prompt, to main, with the PR title from the queue.
- End every session with the final report the prompt asks for, plus the PR link.
- If anything is unclear or needs data that was not given: STOP and ask Saud. Do not guess.

## Ground rules
- Never invent data: no prices, sizes, dimensions, shipping times, fees, dates, reviews or ratings.
- Prices are "Starting from"; final price confirmed on WhatsApp. Delivery charge is not fixed; confirmed on WhatsApp before making begins.
- Made and delivered in 1–2 weeks. 50% advance by UPI or Google Pay after WhatsApp confirmation; balance after photo approval, before dispatch.
- Do not name a specific yarn brand or type.
- No Google Business Profile yet. Workshops: no fees/dates yet, no Course schema.
- Never add any visible text, file name, alt text, title or caption about how images were made. Do not create or edit image pixels.
- og:image, twitter:image and the Merchant feed image_link stay PNG.
- Keep existing page URLs, canonicals and redirects. /cart and /workshops stay noindex; /cart stays out of the sitemap.
- Every built page: exactly one H1, one canonical, one footer, valid JSON-LD. No shippingDetails, aggregateRating or review in JSON-LD.
- Do not rename or redefine Tailwind color tokens. Fonts stay Playfair Display + Inter.
- Do not commit Faceless/, product-data/, .env files, dist/ or screenshots.
- Replies to Saud: short, direct, bullets. He is on his phone.
