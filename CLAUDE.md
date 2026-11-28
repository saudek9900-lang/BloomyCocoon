# BloomyCocoon: instructions for Claude Code

## When Saud says "continue" (or anything like "carry on", "next task")
0. FIRST sync this local checkout with GitHub: `git fetch origin`, then `git status`. If there are uncommitted or unpushed changes, STOP and tell Saud what they are (never discard them). Otherwise `git checkout main && git pull --ff-only origin main`, and create the task branch from this fresh main.
1. Then sync the Status column from GitHub (merged -> MERGED, open -> OPEN) and commit it on the task branch as the first commit: 'docs: sync queue status'. GitHub is the truth; the table is a mirror.
2. Read the task queue below, top to bottom.
3. For each task, check its PR on GitHub (REST only, GraphQL is blocked here: `gh api "repos/saudek9900-lang/BloomyCocoon/pulls?state=all&head=saudek9900-lang:<branch>"`). If you cannot, check `git log origin/main`.
4. Saud runs one chat per lane (see "Parallel lanes" below) and says which lane, for example "continue L1". If he names no lane, ask which one. If any task IN THAT LANE has an OPEN PR: merge it first by the "Merging" rules below (you merge, Saud does not), sync main again, then continue with the next task. If it cannot be merged, stop and tell Saud why, with the PR link. One open task PR per lane. P3-15 (footer), P3-23 (UK spelling) and the L5 image tasks are the exception: they run alone, only when no other task PR is open.
5. Otherwise pick the first task of that lane that is not merged and is runnable:
   - READY: runnable if the tasks in its "Needs" column are merged.
   - WAITING: runnable once every answer it lists in docs/claude/data/owner-answers.md is no longer TODO (or, for photo tasks, the incoming-photos/ files exist on main). Then treat it as READY.
   - PARKED or NOT DRAFTED: never run. Skip.
   Skipped tasks: list them in your reply with what unblocks each.
6. Before running the chosen task, apply "Model and thinking level" below. Then run it: open its prompt file, follow it exactly, push only its branch, open the PR (`gh api repos/saudek9900-lang/BloomyCocoon/pulls -f title=... -f head=<branch> -f base=main -F body=@file`), merge the PR by the "Merging" rules below, sync local main again (`git checkout main && git pull --ff-only origin main`), give the final report, and STOP. One task per session.
7. If nothing is runnable: tell Saud which answers or photos unblock the next task.

## Task queue
Prompts live in docs/claude/prompts/. Plan and reasons: docs/claude/roadmap.md. Newest plan (28 Nov 2026, tasks P6-x): docs/claude/growth-plan-2026-11-28.md. Run in this order.
| # | Task | Branch | Status | Needs |
|---|------|--------|--------|-------|
| P3-10a | B1: Collections deep-link bug + tidy (PRIORITY) | ui/b1-collections | MERGED (#29) | - |
| P3-11 | Return-gifts FAQ: bulk orders, no minimum (PRIORITY) | content/p3-11-return-faq | MERGED (#30) | - |
| P3-12 | SEO audit + indexing check, docs only (PRIORITY) | seo/p3-12-audit | MERGED (#31) | - |
| P3-10b | B2: Custom order + contact clarity (PRIORITY) | ui/b2-custom-order | MERGED (#32) | - |
| P3-10c | C1: Cart polish (PRIORITY) | ui/c1-cart | MERGED (#33) | P3-10a |
| P3-13 | SEO quick fix: titles, meta, blog links, llms.txt (L1) | seo/p3-13-titles-links | MERGED (#36) | - |
| P3-14 | Return policy alignment (L2) | content/p3-14-return-policy | MERGED (#37) | - |
| P3-15 | Footer tap targets, run ALONE (L4) | ui/p3-15-footer-targets | MERGED (#46) | - |
| P3-16 | "Customise this" link, optional (L4) | ui/p3-16-customise-link | PARKED (Saud: skip) | - |
| P3-17 | Related products grid fix (L4) | ui/p3-17-related-grid | MERGED (#40) | - |
| P3-18 | Font layout shift fix (L4) | ui/p3-18-font-cls | MERGED (#41) | - |
| P3-19 | Product page image weight (L4) | ui/p3-19-image-weight | MERGED (#43) | - |
| P3-20 | Keyboard focus fixes (L4) | ui/p3-20-keyboard-focus | MERGED (#44) | - |
| P3-21 | Tap targets, small text, bottom overlap (L4) | ui/p3-21-targets-text | MERGED (#45) | - |
| P3-22 | Audit content fixes: H1s, tracking wording, llms price, small copy (L1) | content/p3-22-audit-fixes | MERGED (#49) | - |
| P3-24 | Category answer blocks (L1) | content/p3-24-category-answers | MERGED (#50) | P3-22 |
| P3-23 | UK spelling pass, run ALONE | content/p3-23-uk-spelling | MERGED (#52) | P3-22, P3-24 |
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
| P3-4 | About the makers (L3) | content/p3-4-about | MERGED (#39) | - |
| P3-5 | Gulf country pages (L3) | content/p3-5-gulf-pages | MERGED (#38) | P2-2 |
| P3-6 | Malayalam page | content/p3-6-malayalam | PARKED (owner: no Malayalam pages) | P2-2 |
| P3-7 | Return-gift packs | content/p3-7-packs | PARKED (Q5: bulk OK, no MOQ, but no pack sizes or prices) | - |
| P3-8 | Merchant feed test set | seo/p3-8-feed | PARKED (owner: skip) | - |
| P3-9 | Damage and remake policy | content/p3-9-policy | MERGED (#26) | - |
| P3-10 | Phase B/C UI builds | - | MERGED (split into P3-10a, b, c)| P2-5 |
| P4-1 | Seasonal pages (Father's Day to Diwali) | content/p4-1-seasonal | MERGED (#25) | P3-1 |
| P4-2 | Workshops details (L3) | content/p4-2-workshops | PARKED (Q10: owner parked it) | - |
| P5-1 | Product photo galleries | img/p5-1-photos | PARKED (owner: no images for now) | - |
| P5-2 | New Sunflower + Lily bouquets | feat/p5-2-new-bouquets | PARKED (owner: no images for now) | - |
| P5-3 | Hidden IPTC tag on feed images | - | PARKED (Q14) | - |
| P6-1 | Product meta fix + CTR titles (L6) | content/p6-1-snippets | MERGED (#56) | - |
| P6-2 | Product page de-duplication, run ALONE (L6) | content/p6-2-product-dedupe | READY | P6-1 |
| P6-3 | Icons to inline SVG, run ALONE (L6) | ui/p6-3-svg-icons | NOT DRAFTED | P6-2 |
| P6-4 | Internal links to unindexed products + remove SearchAction (L6) | seo/p6-4-links | NOT DRAFTED | P6-2 |
| P6-5 | Post: crochet keychain gift guide (L6) | content/p6-5-keychain-post | NOT DRAFTED | - |
| P6-6 | Post: handmade gifts for a newborn (L6) | content/p6-6-newborn-post | NOT DRAFTED | - |
| P6-7 | Post: crochet gift hamper ideas (L6) | content/p6-7-hamper-post | NOT DRAFTED | - |

Image tasks (P5) always come last, and only when Saud has uploaded the images.

## Parallel lanes (Saud runs one chat per lane)
| Lane | Tasks, in order | Model |
|------|-----------------|-------|
| L0 Saud only (no code) | Search Console indexing (~10 URLs a day), IndexNow submit, check pages on a phone, answer Q9, Q10, Q15, upload photos | - |
| L1 SEO | P3-13, then P3-22, P3-24 (audit: docs/claude/audits/2026-11-20-full-site-audit.md) | Sonnet 5.5, medium |
| L2 Policy | P3-14 | Sonnet 5.5, medium |
| L3 Content pages (CLOSED: P3-5 and P3-4 merged, P4-2 parked) | P3-5, P3-4, P4-2 | P3-5 high; others medium |
| L4 UI | P3-17, P3-18, P3-19, P3-20, P3-21, then P3-15 (alone), then P3-16. Audit: docs/claude/audits/2026-11-20-ui-site-audit.md | Sonnet 5.5, medium |
| L5 Images | P5-1, P5-2, P5-3 (last, alone) | Sonnet 5.5, medium |
| L6 Growth (plan: docs/claude/growth-plan-2026-11-28.md) | P6-1, then P6-2 (alone), P6-3 (alone), P6-4, then P6-5 to P6-7 | P6-1, P6-4: Sonnet 5.5 medium; P6-2, P6-3: Opus 5.5 high; posts: Sonnet 5.5 high |

Can run at the same time: L1, L2 and L3 (different files, small overlaps). L0 can always run.
Cannot run at the same time:
- P3-15 (footer) edits 36 footers in index.html, so it conflicts with every lane. Run it alone, first or last.
- L5 images: P5-1 changes the product template and images, P5-2 adds products (count, sitemap, feed, llms-full). Run alone, after everything else is merged. P5-1 and P5-2 also cannot run together.
- P3-16 and P5-1 both change the product page. Not together.
- P3-17 and P3-19 also change the product page: not together with P3-16 or P5-1.
- P3-21 touches the page bottom next to the footer: never at the same time as P3-15.
- P3-23 (UK spelling) edits text in index.html, app.js, route-content, catalog.json and llms files, so it conflicts with every lane. Run it alone, after P3-22 and P3-24 are merged and no other task PR is open.
- Two tasks inside L3 both add or edit pages and the shared lists below. One after another.
- P6-2 (product template, 71 pages) and P6-3 (icons, site-wide) run ALONE, when no other task PR is open. P6-4 starts after P6-2 is merged. P6-5 to P6-7 only add blog files and may run next to P6-4, one PR at a time.
- P6-1 edits src/route-content.mjs and blog frontmatter: do not run it next to another task that edits them.

Rules for parallel chats:
- Shared files that cause conflicts: index.html, app.js, styles.css, package.json, vercel.json, src/route-content.mjs, src/sitemap-generator.mjs, public/llms.txt, public/llms-full.txt. Keep edits small and local to your task.
- Do NOT edit CLAUDE.md status rows or commit public/sitemap.xml in a task branch (the build regenerates it). Queue status is synced in a separate docs PR.
- Before opening the PR: `git fetch origin && git merge origin/main`, then re-run `npm run build`, `npm run test:jsonld` and any test:* scripts. Fix conflicts yourself; never force-push.
- Claude Code merges one PR at a time (see "Merging"). After each merge, the other lanes merge origin/main again before their PR.

## Skills (in .claude/skills/)
- `seo-skill` (`/seo audit|page|technical|content|schema|sitemap|geo|ecommerce <url>`): use for SEO checks inside a task (P1-2, P1-4, P2-x content pages) and when Saud asks for an SEO audit. Audit only; reports go to docs/claude/audits/.
- `ui-ux-pro-max`: use as a checklist for UI work (P1-3, P2-5, P3-10) and UI audits. Do not adopt its palette or fonts.
- `website-audit`: content, copy, UX and conversion audit (whole site). Audit only; reports go to docs/claude/audits/.
- `seo-geo-aeo`: AI-search (GEO) and answer/snippet (AEO) checks. Markdown report only, no .docx/.pdf.
- All four skills start with a "BloomyCocoon rules" block. Those rules and this file win over the skill text.
- Using a skill never changes the task queue, branch rules or "one task per session".

## Model and thinking level
- Default for every task: Sonnet 5.5, medium thinking.
- High thinking (Sonnet 5.5): P2-2 (Kerala/NRI copy), P2-5 (UI audit), P3-5 (Gulf pages). Opus 5.5 is also fine for these.
- Opus 5.5, high thinking: P6-2 and P6-3 (template and site-wide changes). Sonnet 5.5 high thinking: P6-5 to P6-7 (new posts). P6-1 and P6-4: Sonnet 5.5, medium.
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
- Never push directly to main. Never force-push. Never delete branches. Merge only through a pull request, by the "Merging" rules below.
- One commit per task step, clear messages. Open one PR per prompt, to main, with the PR title from the queue.
- End every session with the final report the prompt asks for, plus the PR link.
- If anything is unclear or needs data that was not given: STOP and ask Saud. Do not guess.

## Merging (Claude Code merges its own task PRs; Saud does not have to)
Saud's decision on 28 Nov 2026. This replaces every older line that says Saud merges or that you must wait for him.
Merge a PR only when ALL of these are true:
- It is the PR of the task you just ran (or an open PR of the lane you were told to run, from step 4), and it is in the queue.
- `git fetch origin && git merge origin/main` is done, and `npm run build`, `npm run test:jsonld` and every `test:*` script pass.
- Every item in the prompt's "Verify" list is satisfied, and the PR changes nothing outside the task's scope.
- GitHub says the PR is mergeable (no conflicts): `gh api repos/saudek9900-lang/BloomyCocoon/pulls/<n> --jq .mergeable`.
- The Vercel preview check on the PR's head commit is green: `gh api repos/saudek9900-lang/BloomyCocoon/commits/<sha>/status --jq .state` must be `success`. If it is `pending`, poll every 60 seconds for up to 10 minutes. If it is `failure` or `error`, do not merge: report it.
Then merge with a merge commit (matches the history): `gh api -X PUT repos/saudek9900-lang/BloomyCocoon/pulls/<n>/merge -f merge_method=merge`. Afterwards confirm the commit is on origin/main.
Do NOT merge when anything above is false, when the PR is not yours, or when you are unsure: stop and tell Saud why, with the PR link. If the merge call is refused (403/405), stop and tell Saud. Merging deploys to production, so never merge on a failed or skipped check.

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
