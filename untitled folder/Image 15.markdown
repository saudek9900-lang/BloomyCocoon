---
name: BloomyCocoon Design System
colors:
  surface: '#fff8f6'
  surface-dim: '#f8d2c9'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ed'
  surface-container: '#ffe9e4'
  surface-container-high: '#ffe2db'
  surface-container-highest: '#ffdad2'
  on-surface: '#2a1611'
  on-surface-variant: '#484740'
  inverse-surface: '#422b25'
  inverse-on-surface: '#ffede9'
  outline: '#79776f'
  outline-variant: '#c9c6bd'
  surface-tint: '#605e5a'
  primary: '#605e5a'
  on-primary: '#ffffff'
  primary-container: '#f7f3ee'
  on-primary-container: '#706f6b'
  inverse-primary: '#c9c6c1'
  secondary: '#725852'
  on-secondary: '#ffffff'
  secondary-container: '#fbd8d0'
  on-secondary-container: '#775d56'
  tertiary: '#566252'
  on-tertiary: '#ffffff'
  tertiary-container: '#ebf8e3'
  on-tertiary-container: '#667262'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6e2dd'
  primary-fixed-dim: '#c9c6c1'
  on-primary-fixed: '#1c1c19'
  on-primary-fixed-variant: '#484743'
  secondary-fixed: '#fedbd2'
  secondary-fixed-dim: '#e1bfb7'
  on-secondary-fixed: '#291712'
  on-secondary-fixed-variant: '#59413b'
  tertiary-fixed: '#d9e6d2'
  tertiary-fixed-dim: '#bdcab7'
  on-tertiary-fixed: '#141e12'
  on-tertiary-fixed-variant: '#3e4a3b'
  background: '#fff8f6'
  on-background: '#2a1611'
  surface-variant: '#ffdad2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style
This design system embodies the "Emotional Minimalism" movement, blending Korean-inspired soft UI with high-end boutique craft. The brand personality is cozy and delicate, yet grounded in a sophisticated, premium aesthetic. It prioritizes emotional resonance through generous whitespace, tactile metaphors, and a serene, "slow-living" digital experience.

The visual style is **Soft Minimalist** with **Tactile/Organic** influences. It avoids sharp edges and aggressive transitions, opting instead for low-contrast depth and a rhythmic use of negative space to allow product photography to serve as the primary emotional anchor.

## Colors
The palette is rooted in natural, earthy tones that evoke the feeling of unbleached cotton, organic wool, and botanical dyes.

- **Primary Background (#F7F3EE):** A warm cream that serves as the canvas for the entire experience, reducing eye strain and providing a soft, non-clinical white.
- **Section Backgrounds (#DCCFC0):** A soft beige used for grouping related content and breaking up the vertical scroll without harsh lines.
- **Buttons & Highlights (#D9B8B0):** A dusty pink that acts as the primary call-to-action color. It is muted enough to remain elegant but distinct enough to guide the user.
- **Typography & Details (#7B5E57):** A rich cocoa brown used for all text and iconography to maintain a softer contrast than pure black.
- **Subtle Accents (#A8B5A2):** A sage green used sparingly for secondary labels, success states, or natural motifs.

## Typography
The typography strategy pairings high-contrast editorial serifs with functional, modern sans-serifs.

- **Headlines:** `Playfair Display` provides a literary and premium feel. Headlines should use "Optical Sizing" where possible to maintain the delicacy of the serifs.
- **Body & Labels:** `Inter` is utilized for its exceptional legibility and neutral character. It ensures that the utilitarian parts of the UI (checkout, descriptions) remain clear.
- **Rhythm:** Use a loose line-height (1.6x for body text) to reinforce the spacious, airy brand feel. All labels should have slight tracking (letter spacing) to enhance the "boutique" look.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous outer margins to simulate the feeling of a high-end magazine.

- **Desktop:** 12-column grid, 80px side margins, 24px gutters. Content is often offset or centered with significant "white space" (cream space) to prevent the UI from feeling crowded.
- **Mobile:** 4-column grid, 20px side margins. Large sections should be separated by `spacing-xl` (80px) to create clear mental breaks between product stories.
- **Alignment:** Use asymmetrical layouts for hero sections to emphasize the "handmade" nature of the brand.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Ambient Shadows** rather than stark borders.

- **Surfaces:** Use the secondary background (#DCCFC0) for containers that sit atop the primary background (#F7F3EE).
- **Shadows:** Shadows should be extremely soft, using the Cocoa Brown (#7B5E57) at very low opacity (e.g., 4-8%) with a high blur radius (20px-40px). This creates a "lo-fi" glow rather than a technical drop shadow.
- **Borders:** Where separation is needed, use 1px solid borders in a slightly darker shade of the background color (e.g., #E5DDD3) to maintain a soft transition.

## Shapes
The shape language is organic and approachable. Sharp 90-degree corners are avoided entirely.

- **Standard Elements:** Buttons and input fields use `rounded-lg` (1rem / 16px) to appear soft and inviting.
- **Cards & Containers:** Use `rounded-xl` (1.5rem / 24px) for product cards and modal windows.
- **Imagery:** Product photos should occasionally use a "squircle" or slightly irregular organic radius to mimic the imperfection of crochet work.

## Components
Consistent component styling reinforces the brand’s premium yet handmade character.

- **Buttons:** Primary buttons are filled with Dusty Pink (#D9B8B0) and use Cocoa Brown (#7B5E57) text. They should have a subtle hover state that slightly deepens the pink. Secondary buttons use a Cocoa Brown outline with no fill.
- **Input Fields:** Soft beige backgrounds (#DCCFC0) with no borders, using `rounded-lg`. Focus states should introduce a thin Cocoa Brown border.
- **Chips & Tags:** Small, pill-shaped tags using the Sage Green (#A8B5A2) with white or cocoa text to denote "Handmade," "Limited Edition," or "Gift Wrapped."
- **Cards:** Product cards should be borderless with a very soft ambient shadow on hover. The typography on cards should prioritize the product name in Playfair Display.
- **Lists:** Use custom Crochet-hook or floral icons as bullet points rather than standard dots to lean into the brand niche.
- **Checkboxes/Radios:** Custom-styled to be rounded and Cocoa Brown when selected, avoiding the default system UI look entirely.