# P3-15: Footer link tap targets

Branch: ui/p3-15-footer-targets. PR title: "P3-15: Footer tap targets". Lane L4. Model: Sonnet 5.5, medium thinking. WAITING for Saud's OK (site-wide change). Source: docs/claude/ui-phase-bc-proposal.md (finding 3.3).

## IMPORTANT
index.html has 36 footers, so this touches almost every page. Run it ALONE: no other lane may have an open PR (see "Parallel lanes" in CLAUDE.md). Merge it first or last, never in between.

## Steps
1. Footer links are 17-23px tall. Make them at least 44px tall tap areas on phones without changing the look much (padding or min-height, wrapping layout kept).
2. Prefer one shared change (a CSS rule or one edit applied to every footer the same way). Do not rename or redefine Tailwind color tokens.
3. Measure at 375px and 768px: no horizontal scroll, footer still on one page section per route, exactly one footer per built page.

## Verify
- Before and after link heights in the PR. npm run build, npm run test:jsonld, npm run test:collections, npm run test:forms, npm run test:cart pass.
