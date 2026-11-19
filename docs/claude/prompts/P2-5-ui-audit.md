# P2-5: UI Phase B/C audit (plan only, no code)

Branch: ui/p2-5-audit. PR title: "P2-5: UI Phase B/C audit". Docs only.

## Why
Phase B/C UI (collections, custom order, cart, contact) is next, but the detailed list was lost. Before writing code, audit what exists today and propose the work so Saud can pick.

## Task
Do NOT change any code. Read app.js, index.html, the build scripts and the built pages (npm run build, then dist/), and check mobile width (375px) with Playwright screenshots for your own review (do not commit screenshots).

Write docs/claude/ui-phase-bc-proposal.md covering:
1. Collections (/collections): what exists (search, category filters, empty state). Is there sort (price, name)? Is filter + search state kept in the URL? Any mobile problems?
2. Custom order (/custom-order): current fields and flow, what a step-by-step builder could add, what WhatsApp message it sends.
3. Cart (drawer and /cart): flow from add to cart to WhatsApp, friction points, mobile layout.
4. Contact (/contact) and the floating WhatsApp button: clarity, tap targets, duplication.
5. Mobile CSS: how many !important rules, where, and the risk of refactoring them.

For each finding: what it is, why it matters (sales, SEO or usability), effort (S/M/L), risk (low/med/high).

End with a proposal of 2-3 prompts (B1, B2, C1...), each a short list of changes, ordered by impact vs risk. Mark anything that needs data from Saud (e.g. sort by popularity needs real sales data).

## Rules
- No code changes, no new text on the site.
- No invented data in the proposal (no fake sales numbers, ratings, prices).
- The doc is the only file changed. Open the PR and stop. Saud picks which proposed prompts to run.
