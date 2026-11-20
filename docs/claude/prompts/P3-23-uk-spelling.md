# P3-23: UK spelling pass (visible text only), run ALONE

Branch: content/p3-23-uk-spelling. PR title: "P3-23: UK spelling". Run alone: no other task PR open (it touches index.html, app.js, src/route-content.mjs, src/catalog.json, public/llms*.txt, blog content). Model: Sonnet 5.5, medium thinking.
Source: docs/claude/audits/2026-11-20-full-site-audit.md (W1). Answer: Q18 (UK spelling for all visible text).
Audit count (built HTML, visible text): colour 264 / color 402, customise 5 / customize 168, personalise 5 / personalize 128, favourite 16 / favorite 129.

## What to change (visible words only)
color → colour, colors → colours, colorful → colourful; customize/customized/customization → customise/customised/customisation; personalize/personalized/personalization → personalise/personalised/personalisation; favorite(s) → favourite(s); organize → organise; center (as a word) → centre. Include titles, meta descriptions, alt text, headings, body copy, button labels, FAQ text, JSON-LD text values (name, description, answer text), llms.txt, llms-full.txt and the Merchant feed text that comes from catalog.json.

## Never change (these break the site or SEO)
- CSS classes and Tailwind tokens (`text-color`, `bg-…`, `colors:` in tailwind.config.js). Color tokens are locked (CLAUDE.md).
- Material icon names in the HTML, e.g. `<span class="material-symbols-outlined">favorite</span>`. "favorite" there is an icon name, not a word.
- JavaScript identifiers, data attributes, event names, GA4/Clarity parameters, JSON keys, schema.org property names (e.g. Product `color`), file names.
- URLs, slugs, canonicals, redirects, branch names (keep /custom-order etc.).
- Quoted search terms in docs; anything in docs/, Faceless/, product-data/.

## Steps
1. Make a list (grep, case-insensitive, word boundaries) of every US form in source files, split into "visible text" and "code". Change only the visible-text list. One commit per file group (index.html; app.js; src/route-content.mjs + src/catalog.json; public/llms*.txt; blog sources).
2. Keep the case: "Color" → "Colour", "COLOR" → "COLOUR".
3. Do not commit public/sitemap.xml or CLAUDE.md.

## Verify
- `git fetch origin && git merge origin/main`, then `npm run build`, `npm run test:jsonld` and every `test:*` script pass.
- Recount in dist/ visible text (same method as the audit): US forms should be 0 or only inside items listed under "Never change". Paste the before/after counts in the PR.
- Spot check: the home page occasion icons still show (not the word "favourite"), and product colour chips/filters still work.

## Final report
Short bullets, PR link, before/after counts.
