---
version: alpha
name: FLORA — Connected creative canvas
description: A reference-derived expressive FLORA website with an interactive media canvas and Teams page.
colors:
  primary: '#ffffff'
  canvas: '#000000'
  surface: '#171717'
  raised: '#202020'
  text: '#f5f5f5'
  muted: '#b0b0b0'
  subtle: '#8a8a8a'
  border: '#303030'
  grid: '#151515'
  new: '#a5d8ae'
  pink: '#f391a6'
  mint: '#75d9bd'
  gold: '#f6c54c'
  focus: '#d9e9d9'
typography:
  brand:
    fontFamily: Georgia
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.06em
  display:
    fontFamily: Georgia
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.04em
  team-heading:
    fontFamily: Georgia
    fontSize: 34px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.035em
  section-heading:
    fontFamily: Inter
    fontSize: 27px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.035em
  body:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  feature-heading:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.02em
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  small: 10px
  medium: 16px
  large: 24px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  base: 16px
  large: 24px
  wide: 48px
  header: 68px
  content: 1182px
  grid-step: 14px
components:
  page:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
  header:
    height: '{spacing.header}'
    width: '{spacing.content}'
    typography: '{typography.navigation}'
  wordmark:
    textColor: '{colors.primary}'
    typography: '{typography.brand}'
  hero-heading:
    textColor: '{colors.text}'
    typography: '{typography.display}'
  team-heading:
    textColor: '{colors.text}'
    typography: '{typography.team-heading}'
  section-heading:
    textColor: '{colors.text}'
    typography: '{typography.section-heading}'
  hero-description:
    textColor: '{colors.muted}'
    typography: '{typography.body}'
  light-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.canvas}'
    rounded: '{rounded.medium}'
  dark-button:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.muted}'
    rounded: '{rounded.medium}'
  feature-card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    rounded: '{rounded.large}'
  feature-heading:
    textColor: '{colors.text}'
    typography: '{typography.feature-heading}'
  media-label:
    textColor: '{colors.muted}'
    typography: '{typography.label}'
  metadata:
    textColor: '{colors.subtle}'
    typography: '{typography.caption}'
  new-label:
    textColor: '{colors.new}'
    typography: '{typography.label}'
  border:
    backgroundColor: '{colors.border}'
    height: 1px
  canvas-dot:
    backgroundColor: '{colors.grid}'
    size: 2px
  toast:
    backgroundColor: '{colors.raised}'
    textColor: '{colors.text}'
  cursor-justine:
    textColor: '{colors.pink}'
  cursor-francisco:
    textColor: '{colors.mint}'
  cursor-charlie:
    textColor: '{colors.gold}'
  focus-ring:
    backgroundColor: '{colors.focus}'
    size: 2px
---

# FLORA website design system

## Overview

FLORA presents its product as a connected creative canvas. The homepage places a quiet dotted grid behind four media cards: a truck sketch and desert photograph feed an image result, which connects to a larger video still. The composition surrounds a serif headline with italic emphasis. Small labels and curved connector lines make the website feel like a working creative tool.

The Teams page replaces the grid with uninterrupted black, a centered serif heading, and a broad founder-video frame. Below, a more practical section pairs an asymmetric heading with three dark collaboration tiles. This study recreates both compositions in editable HTML, CSS, and SVG.

Exact FLORA website sections were retrieved through the connected Mobbin MCP and inspected on November 16, 2026:

- [Homepage: connected creative-canvas hero](https://mobbin.com/sites/sections/7d155f9d-4dd1-4dca-8cf6-1755dd00e3b1) — `references/section-1.webp`.
- [Teams: headline and founder introduction](https://mobbin.com/sites/sections/bfcec31b-235f-40f4-a6d1-172d01877627) — `references/section-2.webp`.
- [Teams: multiplayer, permissions, and shared folders](https://mobbin.com/sites/sections/54fe0f47-3ea0-476a-8805-5d85a552206f) — `references/section-3.webp`.

Each original is 1920 × 1320 pixels, including a 120px Mobbin attribution footer. The product UI excludes that footer. `sources.json` preserves the IDs, canonical links, query metadata, and observed state labels. The tokens are visual estimates for this study, not an official FLORA export. The YAML is normative and mirrored exactly in `tokens.json`; `tokens.css` holds the runtime values.

## Colors

Black `#000000` is the main canvas. The subtle `#151515` dot pattern is decorative. Near-white `#F5F5F5` carries headings, while white is reserved for the wordmark and strongest action. Cards and secondary controls use `#171717`, with `#202020` for raised feedback and `#303030` for borders.

Supporting copy uses `#B0B0B0`; compact metadata uses `#8A8A8A`. These values are slightly brighter than the dimmest source text so controls and small labels remain readable. A pale green announcement label is the only hero accent outside the media. The Teams multiplayer illustration adds pink, mint, and gold cursor labels. These colors retain the reference's division between neutral UI and expressive content.

## Typography

The source combines serif display text, italic emphasis, and a simple sans-serif interface. Some serif edges in the supplied image appear deliberately pixelated or rasterized. The exact original typefaces are unavailable, so this implementation uses Georgia for display text and a locally bundled Inter for navigation and body copy. Georgia italics also approximate the FLORA wordmark; the original wordmark artwork is not included.

At 1440px, the homepage display is approximately 48px, using a fluid 3.34vw size and 1.1 line height. Teams uses a 34px heading, section headings 27px, body text 18px, navigation 14px, feature titles 16px, and media labels 12px. At 1920px, the hero reaches about 64px and most other interface dimensions scale by roughly one third. Mobile uses a 37px hero and 34px Teams heading. Font substitution and the absence of the source's rasterized serif treatment are material fidelity limits.

## Layout

The desktop header is 68px tall and centers content within 1182px. At 1920px, these become 90px and 1576px. The homepage positions media against viewport-relative coordinates to preserve the captured composition: input cards begin near 8.5% of the width, the intermediate image near 40.8%, and the larger output near 65.5%. Their widths are about 18.5%, 18.5%, and 32.9%. Labels remain separate live text above each image.

The central announcement, headline, description, and action align between the connected cards. SVG paths connect the input and output positions. The trusted-creatives line sits beneath the composition. The Teams page uses an 820px video frame at the baseline desktop width, followed by a 1090px feature section with three equally sized cards.

Below 760px, the hero becomes a deliberate sequence: headline, announcement, two input cards, intermediate image, and final output. Short vertical connectors preserve the relationship. Teams cards stack below the introduction. The desktop navigation becomes an SDK modal; closed modal content cannot receive focus. These mobile arrangements, the below-hero continuation spacing, and the small footer are inferred from desktop-only references.

## Elevation & Depth

Depth is restrained. Media cards use rounded clipping and a thin light border over the black canvas. A soft hover lift and `0 12px 35px #0009` shadow distinguish a selected card. Connector highlights move slowly along SVG paths, suggesting a workflow without moving the reference artwork itself. This animation is inferred; the screenshots supply no timing or video data.

Feature tiles use a subtle dark gradient, fine border, and foreground labels. Dialogs use a translucent black blurred backdrop, a `0 25px 90px #000B` shadow, and slightly raised charcoal surfaces. All transitions and animations are disabled under `prefers-reduced-motion: reduce`; the static connector lines remain visible.

## Shapes

The homepage's small media cards are approximately 20px rounded at the baseline size, with larger cards around 21px. Large-screen equivalents reach 26–28px. Teams cards use 24px corners and the founder frame 25px. Most dialogs use 20–24px corners, while small controls use 10–16px. Announcement and cursor labels use full pills.

The four-part flower mark is rebuilt from four rounded CSS shapes. Preserve its compact scale and generous gap before the italic wordmark. It is an approximation of the observed mark rather than an official logo asset.

## Components

Actual Vercel UI SDK `Button`, `Dialog`, and `Toggle` components are imported through `@study/ui`. The study owns their visual styling. The SDK supplies modal focus containment, Escape dismissal, and focus recovery.

- **Creative canvas:** four authentic cropped media assets, live labels, curved SVG connections, announcement pill, centered heading, and actions. Cards open an inferred local workflow dialog.
- **Workflow dialog:** input selection, model selector, editable creative direction, save toggle, copy action, and a deterministic preview using existing sample media. No image or video generation occurs.
- **Teams introduction:** the observed founder frame opens a still-image introduction with the visible captured subtitle. The original video and audio are unavailable, and the dialog states this limit.
- **Team features:** collaborator cursors with a local join toggle; an editable member-role list; a shared-folder list with selection and local folder creation. The visuals follow the source, while resulting interaction states are inferred.
- **Signup and demo forms:** email validation and local confirmation states. They create no remote account and send no message. The dialog explicitly identifies the local preview.
- **Secondary navigation:** Teams opens the observed page. Other header labels open clearly marked local content explorations; their unseen pages and copy are inferred, not reproductions of live FLORA resources.

### Content asset provenance

`references/asset-provenance.json` records every crop in original screenshot coordinates. Four homepage crops retain the truck sketch, desert photograph, image result, and video still. One Teams crop retains the founder still, including the original burned-in subtitle. Five small avatar crops come from the permissions illustration; their original approximately 35 × 37px resolution limits enlargement.

All screenshots remain in `references/`. Only content images are cropped into `public/media/`; navigation, text, feature UI, controls, connectors, and card borders are recreated as code. No screenshot is used as page UI. The crop corners may retain a few source-background pixels, which are clipped by the matching CSS radius. State is browser-local and resets on reload.

## Do's and Don'ts

- Do let connected media carry the color and keep the surrounding canvas nearly black.
- Do preserve the airy layout, italic emphasis, compact header, and rounded content frames.
- Do build text, controls, and connectors as editable elements with visible keyboard focus.
- Do keep reduced-motion behavior, source screenshots, and crop provenance together with the implementation.
- Don't imply that static references include original video, audio, animation timing, or mobile behavior.
- Don't present local forms, generated-preview simulations, or secondary navigation copy as live FLORA operations.
- Don't render an entire screenshot as the website or include Mobbin's attribution footer in product UI.
