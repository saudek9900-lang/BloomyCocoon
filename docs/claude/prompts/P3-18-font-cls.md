# P3-18: Stop web fonts from shifting the layout (CLS)

Branch: ui/p3-18-font-cls. PR title: "P3-18: Font layout shift fix". Lane L4. Model: Sonnet 5.5, medium thinking. READY. Source: docs/claude/audits/2026-11-20-ui-site-audit.md (U2).

## Problem
Measured CLS, local build, Playwright:
- product page at 375: 0.23 to 0.26
- blog post at 375: 0.26
- /collections at 1440: 0.15 to 0.22

With Google Fonts blocked, it drops to 0.000. Blocking only the Material Symbols icon font changes nothing. So the cause is Playfair Display and Inter swapping in (`display=swap`, index.html ~278).

## Rules
- Fonts stay Playfair Display and Inter. Do not change font sizes, weights or Tailwind tokens.
- og:image and other head tags stay as they are. Keep the head change small, because other lanes may touch index.html.

## Steps
1. Add metric-matched fallback fonts so the swap does not move text. Recommended: `@font-face` rules with `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` over a local serif (for Playfair Display) and a local sans (for Inter, for example Arial). Then put those fallback families right after the web font in the Tailwind `fontFamily` config, or in the CSS that sets them.
   - Alternative if overrides are not enough: self-host the two fonts (woff2, only the weights in use) and preload the two main files.
   - Pick one approach and say which in the PR.
2. Do not use `font-display: optional` unless the PR shows the fonts still show on a first visit.
3. Do not touch the Material Symbols link.

## Verify
- Measure CLS (PerformanceObserver `layout-shift`, no input) before and after on /products/baby-bear-plushie at 375, /blog/crochet-bouquet-price-guide at 375, and /collections at 1440. Run 3 times each. Target: under 0.1 on all of them. Put the numbers in the PR.
- Spot-check that headings still look the same once the fonts have loaded (compare at 375 and 1440).
- npm run build, npm run test:jsonld and all test:* scripts pass.
