---
version: alpha
name: Gamma — Portfolio card editor study
description: A source-backed Gamma editor with an inferred local presentation flow, based on two Mobbin web captures inspected November 16, 2026.
colors:
  primary: '#0646ad'
  chrome: '#ffffff'
  text: '#09244b'
  muted: '#7e8a98'
  border: '#e3e8ee'
  hover: '#f0f5fb'
  card: '#fff8ef'
  card-text: '#2b4141'
  card-accent: '#c7610a'
  workspace: '#eef1c2'
  prism-card: '#e7e8efcc'
  prism-text: '#353646'
  midnight-card: '#192a39'
  midnight-text: '#f3efeb'
typography:
  hero:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 42px
    fontWeight: 700
    lineHeight: 1.27
    letterSpacing: -1.1px
  slide-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.5px
  slide-body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  section-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: 0.5px
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  dialog-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 19px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.4px
  label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.5
  thumbnail:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 4.5px
    fontWeight: 700
    lineHeight: 1.3
rounded:
  small: 6px
  medium: 8px
  dialog: 15px
  card: 37px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  medium: 12px
  base: 16px
  large: 24px
  card-gap: 64px
  title-inset: 63px
  topbar: 50px
  thumbnails: 146px
components:
  editor-toolbar:
    backgroundColor: '{colors.chrome}'
    textColor: '{colors.text}'
    typography: '{typography.body}'
    height: '{spacing.topbar}'
  toolbar-button-hover:
    backgroundColor: '{colors.hover}'
  button-present:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.chrome}'
    typography: '{typography.body}'
    rounded: '{rounded.full}'
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.chrome}'
    typography: '{typography.label}'
    rounded: '{rounded.medium}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  metadata:
    textColor: '{colors.muted}'
    typography: '{typography.caption}'
  workspace:
    backgroundColor: '{colors.workspace}'
  slide:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-text}'
    rounded: '{rounded.card}'
  slide-accent:
    backgroundColor: '{colors.card-accent}'
  slide-prism:
    backgroundColor: '{colors.prism-card}'
  slide-prism-text:
    textColor: '{colors.prism-text}'
  slide-midnight:
    backgroundColor: '{colors.midnight-card}'
    textColor: '{colors.midnight-text}'
  hero-title:
    textColor: '{colors.card-text}'
    typography: '{typography.hero}'
  content-heading:
    typography: '{typography.slide-title}'
  content-body:
    typography: '{typography.slide-body}'
  content-section-heading:
    typography: '{typography.section-title}'
  card-thumbnail:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-text}'
    typography: '{typography.thumbnail}'
    rounded: '{rounded.small}'
  dialog-heading:
    typography: '{typography.dialog-title}'
---

## Overview

Gamma frames a document as a sequence of editable cards. A slim white toolbar carries document identity and sharing/presentation controls. A floating thumbnail rail anchors the left side, while a narrow tool rail provides editing entry points on the right. The document itself carries the visual character: warm paper, a strong title, curved purple artwork, and a colorful surrounding canvas.

The initial view reconstructs the supplied portfolio website/editor capture. A second capture informs the silver/pastel card treatment. This is an independent inferred system, not Gamma's internal token export. References were retrieved and visually inspected on **November 16, 2026**; the date identifies research, not the original product capture date.

| Evidence | Observed details | Local reference |
| --- | --- | --- |
| [Portfolio editor and title card](https://mobbin.com/screens/fcaa1856-e02b-4541-a3ba-46fdd704d0d1) | White toolbar, website navigation, seven-card thumbnail rail, cream title card, orange border/shadow, lavender artwork, tool rail | `references/screen-1.webp` |
| [Three-column presentation card](https://mobbin.com/screens/e0c5f114-3b30-4199-b307-0ece6d512708) | Present control, silver reflective backdrop, translucent card, pastel columns, icon circles, decorative orbit diagram | `references/screen-2.webp` |

Both captures are 1920×1320 with a Mobbin footer below approximately y=1200. That footer is excluded from the product layout. Screenshots remain evidence only: no full slide, thumbnail, or interface screenshot is embedded as UI. The first source says “Published”; this study uses the “Present” control observed in the second source to expose the requested local presentation interaction. Theme names and the transition between the source treatments are inferred.

## Colors

The cream card surface `#fff8ef` was sampled from the unobstructed first reference. Its dark desaturated green text is approximated by `#2b4141`, with orange `#c7610a` outlining the card and creating its hard offset shadow. The workspace combines green, yellow, pink, and peach radial/linear gradients; a single `#eef1c2` token describes its base, not the complete gradient.

The editor chrome uses white, dark navy `#09244b`, a royal-blue primary action `#0646ad`, and pale blue hover states. The Prism treatment uses translucent blue-gray and pink surfaces derived from the second screenshot; Midnight is an explicitly inferred alternative. Small background shades and interaction colors are estimates.

Runtime CSS variables are in `tokens.css`. `tokens.json` exactly mirrors this DESIGN.md YAML front matter. Alpha component tokens intentionally avoid treating translucent Prism surfaces as opaque contrast pairs.

## Typography

Inter is bundled locally at weights 400, 500, 600, and 700. It substitutes for the precise fonts used in the source portfolio and editor, which were not provided. The title card uses 42px, weight 700, 1.27 line height, and -1.1px tracking at an ordinary desktop width. The source's large 1920px composition uses a 56px title. Other card titles are 30px, body copy 17px, editor controls 14px, and dialog labels 12px.

The thumbnail text is genuinely rendered text at a reduced scale. The Gamma “G” and small portfolio mark are lightweight typographic approximations, not official logo vectors. The second capture's distinctive rounded heading letterforms are approximated with Inter. Source content beyond the large title and three-column headings is reconstructed sample copy; no source statistic is presented as verified research.

## Layout

The editor toolbar is 50px high, followed by a 76px website-navigation strip. The main canvas scrolls independently. At 1440px, it uses 230px left padding, 126px right padding, and 30px top padding. Cards use a 16:9 ratio. The first title card splits approximately 64% text to 40% artwork, with an overlapping curved image edge. Its left title inset is 63px.

The floating thumbnail panel is 146px wide, starts 80px below the main region, and contains seven real HTML previews. The right tool rail is vertically arranged. Cards have 64px gaps, with insert controls appearing between them. At 1700px and above, toolbar, sidebar, title typography, and canvas insets scale toward the original 1920px capture: 62px toolbar, 182px thumbnail panel, 287px left canvas inset, 155px right inset, and 56px title.

Below 700px, cards become vertically stacked compositions instead of squeezed desktop slides. Artwork moves below the title. Thumbnails start closed and open in a drawer with keyboard containment, Escape dismissal, focus restoration, and inert background controls. Editing tools become a short bottom rail. The presentation view shows one card at a time, with separate previous/next controls; these mobile and presentation arrangements are inferred.

## Elevation & Depth

The selected document style uses a crisp 2px orange border and a 7px offset orange shadow to lift the card from the gradient workspace. Editor panels use soft shadows such as `0 6px 18px #1e36551a`. Small card controls have almost imperceptible edge shadows. Theme and sharing dialogs use the browser's top layer, a translucent navy backdrop, and a larger soft shadow.

The Prism treatment replaces the hard orange shadow with a soft blue-gray shadow and uses translucent layers. Presentation mode removes editor chrome and frames the active card against a dark neutral backdrop.

## Shapes

Document cards have 37px corners at standard desktop size, 46px on large screens, and 24px on mobile. Small editor surfaces use 6–8px corners. Present, Agent, and New actions use pill shapes. The title image is clipped by a custom curved path that approximates the source's flowing cream/purple division; it becomes a rounded top edge on mobile. The three-column card uses circular icon containers and rectangular pastel panels.

## Components

- **Document toolbar:** Title input, Theme, Share, Agent, Present, notes, and help. The document title is editable. Present enters a local full-window view; arrow keys and visible controls change cards, and Escape restores the editor and trigger focus.
- **Editable cards:** Every card title is a real textarea styled as document text. Supporting copy is editable through the card editor. New adds a card; the layout picker adds one of six layouts. Delete and single-step undo change the local document. No remote save occurs; the save indicator describes browser-session state.
- **Thumbnails:** Seven HTML previews reproduce the visual rhythm without embedding screenshot thumbnails. Clicking one scrolls to its card. Outline mode replaces previews with a numbered title list. The preview titles update when the document changes.
- **Themes:** Studio follows the first capture; Prism follows visual cues in the second; Midnight is inferred. Selecting a theme changes the whole document's surfaces and surrounding canvas.
- **Tools:** Find locates card titles; text opens the card editor; image choice changes actual artwork; layout choices add cards; speaker notes remain outside the presentation. Cards without images switch to a full-image layout when artwork is chosen, with that behavior explained in the picker.
- **Sharing:** Email entries, access selection, and copying the current preview URL provide local interaction. No invitation is sent and no access control changes remotely. Agent creates a deterministic editable outline card from the user's description, with no model API call.
- **SDK:** Buttons use actual Vercel UI SDK exports through `@study/ui`. Dialogs use `Dialog`, `DialogContent`, `DialogTitle`, `DialogDescription`, and `DialogClose`, including native focus containment and Escape dismissal.
- **Artwork provenance:** `public/assets/portfolio-artwork.webp` is cropped from screen 1 at `(1265,250)-(1760,1025)`, an unobstructed image region excluding the card controls and text. `prism-texture.webp` comes from screen 2 at `(1656,65)-(1838,1120)`, a narrow clean strip of reflective artwork to the right of the card. The strip is stretched/cropped as a texture, so it does not reproduce the entire original background composition. The orbit ornament and layout previews are drawn with CSS. The source's tiny beach thumbnail cannot supply a clean full-resolution slide, so its corresponding local visual card uses the retained reflective artwork instead.

## Do's and Don'ts

- Do keep editor chrome compact and visually separate from the document's theme.
- Do preserve the first card's generous space, large title, curved image boundary, and orange edge.
- Do keep thumbnail previews live and align them with the active card.
- Do make presentation navigation, modal keyboard behavior, and mobile drawer dismissal accessible.
- Do record crop coordinates and distinguish observed designs from inferred themes and layouts.
- Don't render an entire reference screenshot as a slide or claim pixel-identical proprietary typography.
- Don't imply that local edits are saved to Gamma or that share/Agent controls call external services.
