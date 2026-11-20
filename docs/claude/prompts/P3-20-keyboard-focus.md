# P3-20: Keyboard focus for the mobile menu and page changes

Branch: ui/p3-20-keyboard-focus. PR title: "P3-20: Keyboard focus fixes". Lane L4. Model: Sonnet 5.5, medium thinking. READY. Source: docs/claude/audits/2026-11-20-ui-site-audit.md (U5).

## Problem
- **Mobile menu (375px):** opened with the keyboard, Tab leaves the open menu and walks into the page behind it. In the test, focus reached an add-to-cart button 1,300px down with the menu still open. The button's `aria-label` stays "Open mobile menu" while it is open. Escape already works and returns focus.
- **SPA page changes (`window.navigateTo`, app.js ~1515):** after moving to another page inside the app, focus lands on `<body>`. Keyboard and screen-reader users are not taken to the new page.

The quick-look modal already handles focus correctly; follow its pattern.

## Steps
1. Mobile menu (`toggleMobileMenu`, app.js ~2399): while open, keep Tab and Shift+Tab inside the menu, or close it when focus leaves. Set the button's `aria-label` to "Close mobile menu" while open and back to "Open mobile menu" when closed. Keep Escape as it is.
2. After an in-app route change (not on the first page load, and not when the URL has a #hash target), move focus to the new page's H1 (add `tabindex="-1"` only where needed) or to `#app-viewport`, which already has `tabindex="-1"`. No visible focus ring on that H1 (outline none only for that programmatic focus). Do not scroll differently from today.
3. No visual change for mouse and touch users.

## Verify
- Playwright at 375: open the menu with Enter, press Tab 20 times, and confirm focus is still inside the menu or the menu has closed. Check that the label changes.
- Navigate home → /collections → a product page using links. After each, `document.activeElement` is the H1 or `#app-viewport`, not `<body>`.
- npm run build, npm run test:jsonld and all test:* scripts pass.
