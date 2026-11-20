# P3-10a (B1): Fix the deep-link bug and tidy Collections

Branch: ui/b1-collections. PR title: "B1: Fix collections deep link and tidy Collections". Priority task. Model: Sonnet 5.5, medium thinking. Source: docs/claude/ui-phase-bc-proposal.md (section 0 and section 1).

## Steps
1. Fix the startup order so `/collections?category=<any>` loads fully (no `filterCollectionCategory is not defined`; search, filters and the cart drawer all work). Verify `?q=` and `?search=` too.
2. Add a sort control: Featured (current order), Price low-high, Price high-low, Name A-Z. No popularity sort (no sales data).
3. Keep search and sort in the URL with `replaceState`; extend the URL allow-list.
4. Phone layout: bring the first products higher and slim the sticky bar. Keep the H1 and the intro text in the page.
5. Empty state: show what was searched.
6. Add a check script or test for the deep-link case so it cannot regress.

## Rules
- Keep Tailwind tokens and fonts. No new claims, prices or badges.
- Test at 375px and 768px: no horizontal scroll, 44px tap targets.

## Verify
- Built site: load /collections?category=plushies, refresh it, add to cart: drawer opens, no console errors.
- npm run build and npm run test:jsonld pass. Report old vs new behaviour.
