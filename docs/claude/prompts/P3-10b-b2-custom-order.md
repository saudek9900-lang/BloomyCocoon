# P3-10b (B2): Custom order and contact clarity

Branch: ui/b2-custom-order. PR title: "B2: Custom order and contact clarity". WAITING for Saud's approved wording (see Needs). Model: Sonnet 5.5, medium thinking. Source: docs/claude/ui-phase-bc-proposal.md (sections 2 and 4).

## Needs from Saud (STOP and ask if missing)
- Approved wording for: custom-order success message (item 2), photo-reference line (item 4), contact form button (item 5).
- Keep or drop the email field on the contact form.
- Decision on the "Custom build" preview label.

## Steps
1. Open WhatsApp from the tap itself instead of after 600ms.
2. Replace the "submitted" wording with the approved honest wording.
3. Swatches to 44px tall.
4. Optional line telling the customer to send reference photos in the chat (approved wording).
5. Contact form: button and email field match what the form really does; align the floating WhatsApp button aria-label with its visible text.
6. Optional "customise this" link from product pages that pre-fills the type.

## Verify
- 375px and 768px, no horizontal scroll. npm run build and npm run test:jsonld pass.
