# BloomyCocoon: instructions for Claude Code

## When Saud says "continue" (or anything like "carry on", "next task")
1. Before anything else, sync the Status column from GitHub (merged -> MERGED, open -> OPEN) and commit it on the task branch as the first commit: 'docs: sync queue status'. GitHub is the truth; the table is a mirror.
2. Read the task queue below, top to bottom.
3. For each task, check its PR on GitHub (REST only, GraphQL is blocked here: `gh api "repos/saudek9900-lang/BloomyCocoon/pulls?state=all&head=saudek9900-lang:<branch>"`). If you cannot, check `git log origin/main`.
4. If any queue task has an OPEN PR: stop. Tell Saud it is waiting for him to check the Vercel preview and merge, and give the PR link. Only one open task PR at a time.
5. Otherwise pick the first task that is not merged and is runnable:
   - READY: runnable if the tasks in its "Needs" column are merged.
   - WAITING: runnable once every answer it lists in docs/claude/data/owner-answers.md is no longer TODO (or, for photo tasks, the incoming-photos/ files exist on main). Then treat it as READY.
   - PARKED or NOT DRAFTED: never run. Skip.
   Skipped tasks: list them in your reply with what unblocks each.
6. Before running the chosen task, apply "Model and thinking level" below. Then run it: open its prompt file, follow it exactly, push only its branch, open the PR (`gh api repos/saudek9900-lang/BloomyCocoon/pulls -f title=... -f head=<branch> -f base=main -F body=@file`), give the final report, and STOP. One task per session.
7. If nothing is runnable: tell Saud which answers or photos unblock the next task.

## Task queue
Prompts live in docs/claude/prompts/. Plan and reasons: docs/claude/roadmap.md. Run in this order.
| # | Task | Branch | Status | Needs |
|---|------|--------|--------|-------|
| P3-10a | B1: Collections deep-link bug + tidy (PRIORITY) | ui/b1-collections | MERGED (#29) | - |
| P3-11 | Return-gifts FAQ: bulk orders, no minimum (PRIORITY) | content/p3-11-return-faq | MERGED (#30) | - |
| P3-12 | SEO audit + indexing check, docs only (PRIORITY) | seo/p3-12-audit | MERGED (#31) | - |
| P3-10b | B2: Custom order + contact clarity (PRIORITY) | ui/b2-custom-order | MERGED (#32) | - |
| P3-10c | C1: Cart polish (PRIORITY) | ui/c1-cart | MERGED (#33) | P3-10a |
| P1-1 | Tracking follow-up (live-host gate + missing events) | track/p1-1-tracking | MERGED (#9) | - |
| P1-2 | Internal links for indexing + IndexNow key | seo/p1-2-internal-links | MERGED (#10) | - |
| P1-3 | Order steps + trust strip | ux/p1-3-order-steps | MERGED (#11) | - |
| P1-4 | Titles and meta (CTR) | content/p1-4-titles-meta | MERGED (#12) | - |
| P1-5 | Valentine's Day gifts page (live by 20 Dec) | content/p1-5-valentines | MERGED (#13) | - |
| P2-1 | Unique product descriptions | content/p2-1-product-descriptions | MERGED (#14) | - |
| P2-2 | Kerala + NRI gifting pages | content/p2-2-kerala-nri | MERGED (#15) | P1-3 |
| P2-3 | Return gift ideas post | content/p2-3-return-gifts-post | MERGED (#17) | - |
| P2-4 | Eid gifts page (live by 15 Jan) | content/p2-4-eid | MERGED (#18) | P2-2 |
| P2-5 | UI Phase B/C audit (docs only) | ui/p2-5-audit | MERGED (#20) | - |
| P3-1 | Vishu + Mother's Day pages | content/p3-1-spring-pages | MERGED (#21) | P2-4 |
| P3-2 | Crochet bouquet price guide | content/p3-2-price-guide | MERGED (#22) | - |
| P3-3 | Product sizes | content/p3-3-sizes | PARKED (owner: no size data) | - |
| P3-4 | About the makers | content/p3-4-about | WAITING (Q9: owner will answer later; Q7: owner has no hours data) | - |
| P3-5 | Gulf country pages | content/p3-5-gulf-pages | PARKED (owner: no Gulf shipping) | P2-2 |
| P3-6 | Malayalam page | content/p3-6-malayalam | PARKED (owner: no Malayalam pages) | P2-2 |
| P3-7 | Return-gift packs | content/p3-7-packs | PARKED (Q5: bulk OK, no MOQ, but no pack sizes or prices) | - |
| P3-8 | Merchant feed test set | seo/p3-8-feed | PARKED (owner: skip) | - |
| P3-9 | Damage and remake policy | content/p3-9-policy | MERGED (#26) | - |
| P3-10 | Phase B/C UI builds | - | MERGED (split into P3-10a, b, c)| P2-5 |
| P4-1 | Seasonal pages (Father's Day to Diwali) | content/p4-1-seasonal | MERGED (#25) | P3-1 |
| P4-2 | Workshops details | content/p4-2-workshops | WAITING (Q10; owner will answer later) | - |
| P5-1 | Product photo galleries | img/p5-1-photos | WAITING (photos in incoming-photos/) | - |
| P5-2 | New Sunflower + Lily bouquets | feat/p5-2-new-bouquets | WAITING (images in incoming-photos/new-bouquets/) | - |
| P5-3 | Hidden IPTC tag on feed images | - | PARKED (Q14) | - |

Image tasks (P5) always come last.

## Skills (in .claude/skills/)
- `seo-skill` (`/seo audit|page|technical|content|schema|sitemap|geo|ecommerce <url>`): use for SEO checks inside a task (P1-2, P1-4, P2-x content pages) and when Saud asks for an SEO audit. Audit only; reports go to docs/claude/audits/.
- `ui-ux-pro-max`: use as a checklist for UI work (P1-3, P2-5, P3-10) and UI audits. Do not adopt its palette or fonts.
- Both skills start with a "BloomyCocoon rules" block. Those rules and this file win over the skill text.
- Using a skill never changes the task queue, branch rules or "one task per session".

## Model and thinking level
- Default for every task: Sonnet 5.5, medium thinking.
- High thinking (Sonnet 5.5): P2-2 (Kerala/NRI copy), P2-5 (UI audit), P3-5 (Gulf pages). Opus 5.5 is also fine for these.
- Low thinking: only trivial edits (renames, list updates).
- Never use Haiku for code changes, site copy or audits.
- You cannot change your own model or thinking level. Before starting a task, compare it with this list and with your current model. If the task needs a different model or a higher thinking level than you are running, DO NOT START. Tell Saud: "Change thinking to <level> (or model to <model>) with /model, then say continue." If you are not sure of the current thinking level, ask Saud.
- In every final report, say if the NEXT runnable task needs a different model or thinking level, so Saud can switch before saying "continue" (for example: "Next is P2-2: switch thinking to high").

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
- Never add any visible text, file name, alt text, title or caption about how images were made. Do not create images or change what they show. Resizing and format conversion with the repo's existing image setup is allowed (P5 tasks).
- og:image, twitter:image and the Merchant feed image_link stay PNG.
- Keep existing page URLs, canonicals and redirects. /cart and /workshops stay noindex; /cart stays out of the sitemap.
- Every built page: exactly one H1, one canonical, one footer, valid JSON-LD. No shippingDetails, aggregateRating or review in JSON-LD.
- Do not rename or redefine Tailwind color tokens. Fonts stay Playfair Display + Inter.
- Do not commit Faceless/, product-data/, .env files, dist/ or screenshots.
- Replies to Saud: short, direct, bullets. He is on his phone.
