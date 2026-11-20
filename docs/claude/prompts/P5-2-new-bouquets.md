# P5-2: Add Sunflower Bouquet and Lily Bouquet

Branch: feat/p5-2-new-bouquets. PR title: "P5-2: New Sunflower and Lily bouquets". WAITING until Saud uploads approved images:
- incoming-photos/new-bouquets/sunflower-bouquet.png (yellow sunflowers)
- incoming-photos/new-bouquets/lily-bouquet.png (pink lilies, not all white)
Claude Code does not create images. If either file is missing, STOP and tell Saud.

## Approved data (Saud, 2026-11-14)
- Sunflower Bouquet: id sunflower-bouquet, category bouquets, badge "New Arrival", Starting from ₹899, short description "A bright sunflower bouquet for birthdays, congratulations and cheerful surprises, with colors confirmed on WhatsApp.", occasion page: Birthday.
- Lily Bouquet: id lily-bouquet, category bouquets, badge "New Arrival", Starting from ₹799, short description "An elegant lily bouquet for anniversaries, thank-you gifts and gentle celebrations, with colors confirmed on WhatsApp.", occasion page: Anniversary.

## Steps
N1 Locate (no edits): every place "tulip-bouquet" / "Tulip Bouquet" appears, the product source of truth, and every hard-coded product count (e.g. "69"). Report first.
N2 Add both products to the source of truth with the same fields as Tulip Bouquet. Pages must match /products/tulip-bouquet section by section. Titles/meta from the shared builder. Place them after Lavender Bouquet and before Custom Premium Bouquet (or follow the existing ordering rule and say which). Update hard-coded counts. If P2-1 is merged, also write their long descriptions under the same rules. If P3-2 is merged, the price table updates by itself.
N3 Images: file names crochet_sunflower_bouquet_sunflower-bouquet and crochet_lily_bouquet_lily-bouquet (no "generated" anywhere). Make the same variants as the tulip image (PNG master, WebP, all widths) with the repo's existing image setup. Do not change the pixels beyond resizing/encoding.
N4 Alt text in the same pattern as other bouquets. Nothing about how images were made.
N5 Copy edits: /crochet-bouquets intro list adds "Sunflower Bouquet, Lily Bouquet" before Lavender; its meta "rose, tulip, sunflower, lily and lavender bouquets" (max 160 characters, else STOP); /birthday-gifts adds the Sunflower Bouquet card and intro "bright sunflower stems and bouquets"; /anniversary-gifts adds the Lily Bouquet card after Tulip Bouquet and the FAQ list "roses, tulips, sunflowers, lilies, lavender". Do not touch lead-time text.
N6 Sitemap, Merchant feed (price 899 / 799 INR, PNG image_link) and llms files via the generators. The hidden IPTC tag is P5-3, not here.

## Verify
- Both pages: title, meta (length), H1, canonical, price, JSON-LD types, og:image PNG. Product card order on /crochet-bouquets, /collections, /birthday-gifts, /anniversary-gifts. Cart + WhatsApp message test for both. grep dist for "generated": 0 new hits. npm run build and npm run test:jsonld pass.
