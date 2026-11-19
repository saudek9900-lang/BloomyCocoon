# P5-1: Real product photos and in-hand size photos

Branch: img/p5-1-photos. PR title: "P5-1: Product photo galleries". WAITING until Saud uploads photos to incoming-photos/<product-id>/ (e.g. incoming-photos/rose-bouquet/1.jpg).

## Why
Buyers want 4-6 photos per product (front, side, close-up, in-hand for scale, packed). In-hand photos answer the size question.

## Steps
H1 List which product folders exist and how many photos each has. If none exist, STOP and tell Saud.
H2 Convert each photo with the repo's existing image setup (same widths and WebP as product images now). Keep the current main image as the first image unless Saud's folder has a file named main.*.
H3 Show a swipeable gallery on the product page (and thumbnails on desktop). Alt text describes what is shown; an in-hand photo says "shown in hand for size". Nothing about how any image was made.
H4 og:image, twitter:image and the feed image_link stay the existing PNG.
H5 Do not commit incoming-photos/ itself; add it to .gitignore after converting.

## Verify
- Products updated, image count each, page weight before/after for one product, LCP from a local Lighthouse run. npm run build and npm run test:jsonld pass.
