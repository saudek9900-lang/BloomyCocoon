# BloomyCocoon plan: current status and parallel lanes (updated 2026-11-20, night)

This section replaces the phase order further down. The task queue and lane rules in CLAUDE.md win if they differ.

## Done and live (main, 2026-11-20 night)
P1-1 to P1-5, P2-1 to P2-5, P3-1 (Vishu, Mother's Day), P3-2 (price guide), P3-9 (damage wording), P3-11 (return-gifts FAQ), P3-12 (SEO audit), P3-10a/b/c (collections fix, custom order and contact clarity, cart polish), P3-13 (SEO quick fix, #36), P3-14 (return policy, #37), P3-5 (Gulf ordering section, #38), P3-4 (About the makers, #39), P4-1 (Father's Day, Friendship Day, Raksha Bandhan, Onam, Diwali pages).

### L4 UI work shipped today (audit: docs/claude/audits/2026-11-20-ui-site-audit.md)
| PR | Task | What changed |
|----|------|--------------|
| #40 | P3-17 | "You May Also Like" grid on all 69 product pages: 4 equal cards on desktop, 2 per row on phone and tablet |
| #41 | P3-18 | Fallback fonts sized to match Inter and Playfair Display: layout shift 0.23-0.26 down to about 0 on phones (local test) |
| #43 | P3-19 | Hidden zoom image no longer downloaded on load (page load images about 1 MB down to 65 KB on a product page); Quick Look and Zoom use WebP |
| #44 | P3-20 | Mobile menu keeps keyboard focus inside while open; button label switches to "Close mobile menu" |
| #45 | P3-21 | 44px tap targets (71 down to 9 under 44px at 375px), nothing under 12px text, room at page bottom for the sticky bar and WhatsApp button, 2 small wrap glitches fixed |
| #46 | P3-15 | Footer links 44px tall on phones (28 of 29 were under 44px) |

L4 is finished. P3-16 ("Customise this" link) is parked: Saud said skip.

## Priority and lanes
| Priority | Lane | Task | Status | Model |
|----------|------|------|--------|-------|
| P0 | L0 Saud | Request indexing in Search Console (~10 URLs a day), IndexNow submit, phone check of new pages (including the new footer, menu and product grid), answer Q10 and Q14 | Saud | - |
| Last | L5 Images | P5-1 photo galleries, P5-2 new bouquets (needs images in incoming-photos/, none uploaded yet), P5-3 image tag (parked, Q14) | Waiting for Saud's photos | Sonnet 5.5, medium |
| Parked | - | P3-16 customise link (Saud: skip), P3-3 sizes (no data), P3-6 Malayalam (not needed), P3-7 packs (no sizes or prices), P3-8 feed test (skipped), P4-2 workshops (Q10, later) | Parked | - |

Nothing else is runnable. L1, L2, L3 and L4 are closed.

## What can run at the same time
- L0 always.
- L1, L2 and L3 together (different files). Merge one PR at a time; each lane merges origin/main before its PR.
- P3-15 (footer) alone: it edits 36 footers in index.html, so it conflicts with every lane.
- L5 images alone and last: P5-2 adds products (count, sitemap, feed, llms-full), P5-1 changes the product template.
- P3-16, P3-17, P3-19 and P5-1: only one at a time (all change the product page).
- P3-21 and P3-15 not together (both near the footer).
- L4 audit with sources for P3-17 to P3-21: docs/claude/audits/2026-11-20-ui-site-audit.md.

## Other things left (Saud)
Testimonials from the last 10-20 customers (with permission); Instagram 3 Reels a week and Valentine's reminders; link Search Console to GA4; WhatsApp Business catalog (top 20) and quick replies; outreach to 5 Kerala gift sites; media pitches (needs Q9). Not doing: Meesho, Flipkart, Amazon.ae/noon, paid links, mobile CSS clean-up without a screenshot baseline.

---

# Original plan (written 2026-11-20 morning; kept for the reasons and research)

## Growth plan (research and phases)

Based on the research of 2026-11-20 (traffic, competitors, indexing, seasons, channels, conversion). The planning chat holds the master copy; if this differs, ask Saud.
Goal: more organic traffic, more WhatsApp orders, better conversion. Markets: all India, Kerala first, plus Gulf NRI families sending gifts to Kerala.

## Done and live (main 380886e)
SEO Round 3, UI Phase A, /workshops, blog + 5 posts, speed round, JSON-LD fix + guard, Prompts 0, 1, 2 (E9 parked), 3, T (tracking).

## Key findings
- Indexing: 14/69 products and 0/6 blog URLs indexed. At this size the cause is thin pages (product descriptions median 12 words) and weak internal links, not crawl budget. Fix those, then request indexing in batches.
- Niche to own: "handmade in Kerala, ordered on WhatsApp, for occasions and NRI families". National sites (FNP, Zappy Box) own "crochet bouquet"; Kerala gift sites own "send gifts to Kerala from UAE" but sell cakes and flowers, not crochet.
- Our prices are competitive (FNP crochet roses 749-2,099, bouquets 1,699-2,799). Do not discount; explain value and the advance.
- Buyers' main worries: size ("smaller than expected"), paying an unknown seller in advance, delivery time, missing note/add-on.
- FAQ rich results stopped in Google from 7 May 2026: keep FAQs for people and AI, expect no FAQ snippets. Product markup still matters.
- Merchant free listings: test with a few fixed-price items; "starting from" prices and WhatsApp-only checkout risk disapproval.
- Google Business Profile only if you hand-deliver locally or allow pickup (Google needs in-person contact).

## Models and thinking
Default Sonnet 5.5, medium thinking. High for P2-2, P2-5, P3-5. Claude Code tells Saud to switch before starting or at the end of the report. Details in CLAUDE.md.

## Phase 1: now to 4 Dec 2026 (indexing + trust)
Code (Claude Code, in order): P1-1 tracking follow-up, P1-2 internal links + IndexNow key, P1-3 order steps + trust strip, P1-4 titles/meta, P1-5 Valentine's page (live by 20 Dec).
Saud: merge each PR after checking the preview; Search Console request indexing ~10 URLs a day (bouquets and combos, then blog posts); link Search Console to GA4; WhatsApp Business catalog (top 20) + quick replies; start answering docs/claude/data/owner-answers.md (Q1, Q3, Q4, Q11 first).
Measure: indexed products (baseline 14/69), whatsapp_click count, first 20 Clarity recordings.

## Phase 2: 5 Dec 2026 to 1 Jan 2027 (content depth + NRI)
Code: P2-1 unique product descriptions, P2-2 Kerala + NRI pages, P2-3 return gift ideas post, P2-4 Eid page (live by 15 Jan), P2-5 UI audit (plan only).
Saud: after P1-2 deploys, ask the planning chat to submit URLs via IndexNow; Instagram 3 Reels a week (making, size-in-hand, unboxing) + Valentine's order reminders; ask the last 10-20 customers for honest testimonials (screenshots with permission); Google Business Profile if eligible (Q4).
Measure: indexed products target 40+/69; blog posts indexed; CTR on /return-gifts; WhatsApp clicks per product view.

## Phase 3: Jan to Feb 2027 (seasons + answers-based pages)
Code: P3-1 Vishu + Mother's Day pages (Vishu live by 1 Mar), P3-2 price guide; then, when answers arrive: P3-3 sizes (Q1), P3-4 about the makers (Q7, Q9), P3-5 Gulf country pages (Q2, Q3), P3-6 Malayalam page (Q12), P3-7 return-gift packs (Q5), P3-8 Merchant feed test (Q13), P3-9 damage/remake policy (Q6). Phase B/C UI builds: drafted from the P2-5 audit.
Saud: outreach to 5 Kerala gift sites/hamper makers (cakezygifting, keralagifts.in, wegiftkerala, Kochi hamper makers) for a crochet add-on partnership; 5 media pitches (sisters' maker story: Onmanorama, Mathrubhumi English, The News Minute...); Merchant Center account + test set; Etsy shop with 10 fixed-price items if Gulf shipping works (Q2); share a Vishu/Eid gifting guide in 3-5 Gulf Kerala association groups (no spam).
Measure: organic sessions per week (baseline 18), non-brand clicks, WhatsApp orders per week logged by source, first real backlinks.

## Phase 4: Mar to May 2027 (summer/Onam season + channels)
Code: P4-1 seasonal pages (Father's Day, Friendship Day, Raksha Bandhan, Onam live by 15 Jul, Diwali), P4-2 workshops (Q10). "Reserve with UPI" payment link only if GA4/Clarity show high WhatsApp drop-off (not drafted).
Saud: Amazon Karigar only with GST and capacity (Q8); YouTube Shorts from Reels; Pinterest optional; monthly check of ChatGPT/Gemini/Perplexity for "handmade crochet gifts Kerala/India".
Measure: confirmed orders / organic sessions vs ~1.6% India D2C benchmark; repeat customers; seasonal page performance.

## Phase 5: images (last)
P5-1 real product photo galleries + in-hand size photos (Saud uploads photos), P5-2 new Sunflower + Lily bouquets (Saud uploads approved images), P5-3 hidden IPTC tag (parked, Q14).

## Not doing
- Meesho (price-driven, high COD returns), Flipkart, Amazon.ae/noon for now.
- Mass-noindexing products, paid links, fake urgency or reviews.
- Disavowing the old spammy backlinks (only if Google shows a manual action).

## Season dates 2027 (Islamic dates depend on moon sighting)
Valentine's 14 Feb · Eid al-Fitr ~9-10 Mar · Vishu 14-15 Apr · Mother's Day 9 May · Eid al-Adha ~16-17 May · Father's Day 20 Jun · Friendship Day 1 Aug · Raksha Bandhan 17 Aug · Onam 3-15 Sep (Thiruvonam 12 Sep) · Diwali 29 Oct · Christmas 25 Dec. Pages go live 6-8 weeks before.
