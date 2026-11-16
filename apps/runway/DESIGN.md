---
version: alpha
name: Runway — Creative generator workspace
description: A Mobbin-derived study of the Runway Tool and Chat workspace, with inferred
  local interaction states.
colors:
  primary: '#3420fa'
  primary-hover: '#2914dd'
  canvas: '#f2f3f5'
  surface: '#ffffff'
  text: '#101113'
  muted: '#666a73'
  border: '#e0e2e6'
  selected: '#e1e4e9'
  hover: '#eceef1'
typography:
  feature:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 29px
    fontWeight: 600
    lineHeight: 1.2
  heading:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.3
  prompt:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  control:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 5px
  md: 8px
  lg: 12px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  compact: 12px
  md: 16px
  lg: 24px
  rail: 57px
  panel: 381px
  banner: 42px
components:
  canvas:
    backgroundColor: '{colors.canvas}'
  tool-panel:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    width: '{spacing.panel}'
  primary-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    rounded: '{rounded.md}'
    typography: '{typography.body}'
  primary-button-hover:
    backgroundColor: '{colors.primary-hover}'
  prompt:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    typography: '{typography.prompt}'
    rounded: '{rounded.md}'
    padding: '{spacing.compact}'
  navigation-selected:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.text}'
    rounded: '{rounded.md}'
  navigation-hover:
    backgroundColor: '{colors.hover}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  control:
    textColor: '{colors.muted}'
    typography: '{typography.control}'
  feature-heading:
    textColor: '{colors.text}'
    typography: '{typography.feature}'
  dialog-heading:
    textColor: '{colors.text}'
    typography: '{typography.heading}'
  caption:
    textColor: '{colors.muted}'
    typography: '{typography.caption}'
  preset:
    backgroundColor: '{colors.hover}'
    textColor: '{colors.muted}'
    rounded: '{rounded.full}'
    typography: '{typography.control}'
---

# Runway design system

## Overview

Runway pairs a compact white creation panel with a large pale-gray visual canvas. A narrow icon rail separates the product's major modes. Electric purple marks the primary action, while the controls stay neutral and quiet. The composition gives the reference artwork most of the screen and keeps editing controls within reach.

### Sources and fidelity

Mobbin MCP references retrieved and inspected November 16, 2026:

- [Chat workspace and Gen-4.5 feature](https://mobbin.com/screens/f4209d59-d8fa-4b08-9a03-636ae208187c), retained as `references/screen-1.webp`.
- [Tool workspace with image references, styles, and generation settings](https://mobbin.com/screens/efa0ce57-ed63-4e74-96b1-0c6adf1d8356), retained as `references/screen-2.webp`.

This implementation reconstructs the observed desktop shell, Tool workspace, Chat workspace, style cards, feature section, and generation-settings state. Original source tokens, fonts, and component definitions were not supplied. Dimensions, colors, typography, and small icon shapes are inferred. The source's Mobbin curation footer is excluded from the interface. Every control surrounding the artwork is editable React UI; the screenshot is never used as the page.

The default workspace follows the second reference, including the open settings panel. The original draft is transcribed into an editable field; its character count is calculated from the actual text rather than retaining the screenshot's unrelated number. Model names, the promotional code, and credit labels reproduce the captured interface, not a current commercial offer.

### Asset provenance

Artwork files are exact crops of `references/screen-2.webp` (1920 × 1325), with coordinates expressed as x, y, width, height:

| Local asset | Crop | Content |
| --- | --- | --- |
| `public/assets/motion-sketch.webp` | 780, 393, 944, 590 | Cinematic scene and baked-in motion annotations |
| `public/assets/style-vivid.webp` | 261, 716, 139, 82 | Vivid style thumbnail |
| `public/assets/style-warm.webp` | 420, 716, 140, 82 | Warm style thumbnail |
| `public/assets/style-cool.webp` | 100, 840, 90, 80 | Visible portion of cool style thumbnail |
| `public/assets/style-minimal.webp` | 100, 965, 90, 80 | Visible portion of interior thumbnail |
| `public/assets/reference-desk.webp` | 262, 135, 115, 76 | Desk reference photograph |
| `public/assets/reference-sketch.webp` | 127, 135, 102, 74 | Sketch reference drawing |

Thumbnail crops have the resolution available in the screenshot. Crops stop above the baked-in card labels and the feature caption; the large image retains the red and green motion annotations within the artwork. The application supplies its own interactive card borders, labels, buttons, and selection states. The cool and minimal thumbnails are partially occluded in the source; only visible artwork is reused. No image was synthesized or fetched from another provider.

## Colors

The primary action is `#3420fa`, with a darker `#2914dd` hover. Use `#f2f3f5` for the broad canvas and white for the rail, editor, and dialogs. Text is nearly black `#101113`; secondary controls use `#666a73`. Borders are `#e0e2e6`, selected neutral surfaces `#e1e4e9`, and hover surfaces `#eceef1`.

The promotional strip uses an inferred muted green gradient from `#283d37` through `#657047` to `#152a28`. It remains visually separate from the purple creation action. `tokens.json` exactly mirrors this document's YAML tree; `tokens.css` provides matching runtime values.

## Typography

Locally bundled Inter approximates the reference sans-serif because the original typeface and metrics are unavailable. At ordinary desktop widths, feature headings are 29px semibold, prompt text 15px regular, body text 14px, controls 12px, and rail labels and metadata 10px. Feature headings have tight letter spacing. Wider screens at 1700px scale toward the 1920px source: the feature heading becomes 39px and the editor text 20px.

Keep the tool panel's body text readable and its controls concise. Avoid extra display headings in the editing column.

## Layout

The desktop shell uses a 42px promotional strip, 57px navigation rail, and 381px tool panel. At 1700px and wider, these become 56px, 76px, and 508px, matching the proportions of the 1920px references. The tool panel has a scrollable middle section, a settings row above the footer, and a persistent Generate action. Its active settings popover sits above the styles gallery.

The main canvas has a compact session header. The centered feature region contains a heading, supporting sentence, pill tabs, the artwork, and a primary action. Artwork is capped at 944px. Use a 4/8/12/16/24px spacing scale for controls and containers.

Below 800px, the editor becomes a drawer that opens from the stage header. The artwork crops to a taller presentation and controls fit without horizontal overflow. This responsive treatment is inferred; the supplied references are desktop only.

## Elevation & Depth

Most surfaces are flat and separated by subtle one-pixel borders. Selected tabs use tonal backgrounds. The generation-settings panel and small menus have `0 8px 24px #20232a12` shadows. Dialogs use a stronger `0 20px 70px #0003` shadow and a dim backdrop to make their modal state clear. The main artwork provides visual depth; avoid decorative gradients or heavy shadows in the editing controls.

## Shapes

Small controls use 5px radii, prompt boxes and menus use 8px, and larger image/result containers use 12px. Feature tabs and gallery pills use full rounding. Artwork corners are subtly rounded. The promotion, editor, and canvas remain rectangular structural areas.

## Components

The Tool panel includes Image/Video/Audio mode buttons, an editable prompt, reference controls, selectable style cards, model and aspect-ratio menus, output count, resolution, aesthetic range, fixed-seed toggle, and a Generate action. UI SDK supplies real Button, Toggle, and Dialog behaviors through `@study/ui`. Local state updates labels and selections; every field has an accessible name.

The Chat panel recreates the second observed mode with a composer and local sample suggestions. It replaces the captured transient processing indicator with a useful static explanation. Feature preset selection updates its active pill and caption; Try it now loads a matching video prompt. Asset upload retains the selected filename only and does not transfer it anywhere.

Generate creates a short local progress state followed by a result panel using the saved reference artwork. That panel explicitly states that no image, video, or audio was generated, and no credits were used. Model, ratio, style, and resolution values accompany the result. Download preview downloads the reference-derived image. These result states, help dialog, reference chooser, share dialog, custom-style creation, credits explanation, and mobile drawer are implementation inferences because they were not visible in the references.

The keyboard Help dialog is usable at desktop and mobile widths. It traps focus, dismisses with Escape, and returns focus to its trigger using UI SDK. Reduced-motion preferences disable transitions and spinner animation. The three Runway Playwright cases cover rendering/images/overflow, prompt-to-result interaction, and dialog keyboard behavior at both configured viewports.

## Do's and Don'ts

- Do preserve the narrow rail, compact editor, and large visual canvas.
- Do reserve purple for primary actions and meaningful focus indicators.
- Do keep artwork separate from live React controls.
- Do disclose local sample results and preserve reference provenance.
- Do maintain accessible names, keyboard dialog handling, and responsive controls.
- Don't reuse the complete reference screenshot as application UI.
- Don't claim the inferred tokens, mobile behavior, or result screen are official Runway designs.
- Don't imply that the captured model names, promotion, or credit counts represent current service availability.
