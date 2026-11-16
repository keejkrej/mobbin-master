---
version: alpha
name: Midjourney — Image workshop study
description: An inferred Midjourney web design system from four Mobbin references.
colors:
  primary: '#c93518'
  text: '#28292d'
  muted: '#686b74'
  canvas: '#fdfdfd'
  surface: '#ffffff'
  panel: '#fafafa'
  border: '#e5e5e7'
  quiet: '#f1f3f4'
  accent-soft: '#fff0ec'
  accent-border: '#f8dfd8'
  focus: '#ca3c20'
typography:
  wordmark:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.01em
  heading:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  prompt:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  small: 6px
  medium: 10px
  large: 14px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  base: 16px
  large: 24px
  sidebar: 208px
  detail: 365px
  toolbar: 52px
  control: 32px
  thumb: 63px
components:
  canvas:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
  sidebar:
    backgroundColor: '{colors.canvas}'
    width: '{spacing.sidebar}'
    typography: '{typography.navigation}'
  selected-navigation:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
  selected-navigation-border:
    backgroundColor: '{colors.accent-border}'
    height: 1px
  imagine-bar:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    rounded: '{rounded.large}'
    typography: '{typography.prompt}'
    height: '{spacing.toolbar}'
  detail-panel:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.text}'
    typography: '{typography.body}'
    width: '{spacing.detail}'
  action-button:
    backgroundColor: '{colors.quiet}'
    textColor: '{colors.muted}'
    typography: '{typography.label}'
    rounded: '{rounded.small}'
    height: 32px
  primary-button:
    backgroundColor: '{colors.text}'
    textColor: '{colors.surface}'
    rounded: '{rounded.medium}'
  section-heading:
    textColor: '{colors.text}'
    typography: '{typography.heading}'
  brand-wordmark:
    textColor: '{colors.text}'
    typography: '{typography.wordmark}'
  muted-label:
    textColor: '{colors.muted}'
    typography: '{typography.caption}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  focus-indicator:
    backgroundColor: '{colors.focus}'
    size: 2px
---

# Midjourney design system

## Overview

This is a screenshot-derived study of Midjourney's web image workspace. Its quiet white shell leaves most of the visual weight to the artwork. A narrow persistent sidebar, a broad prompt field, restrained gray controls, and a small red-orange selection accent organize the experience.

The references were retrieved through the connected Mobbin MCP and inspected on **November 16, 2026**. Original screenshots and metadata are retained in `references/`.

- [Tomatoes at sunset: image detail and creation actions](https://mobbin.com/screens/fc639387-b45b-4dcf-b32a-7455bc507dab) — `screen-1.webp`.
- [Dogs at sunset: edited image detail](https://mobbin.com/screens/fb94adeb-ef10-40a0-a793-fcbf46613435) — `screen-2.webp`.
- [Organize: dense grid and view options](https://mobbin.com/screens/fdaac0b8-326b-4e3f-9223-08bf0b53858c) — `screen-3.webp`.
- [Explore: image reference upload panel](https://mobbin.com/screens/fa00ef21-990c-4f2d-be32-4423dffc14b3) — `screen-4.webp`.

The YAML tokens are normative for this implementation and mirrored in `tokens.json`. They are inferred values, not an official Midjourney export. Large flat surface colors were sampled; dimensions, type, icons, shadows, motion, and responsive breakpoints are estimates. Each source is 1920 × 1320 pixels, including a 120-pixel Mobbin footer that is excluded from the product UI.

## Colors

The main canvas is `#FDFDFD`, the detail panel `#FAFAFA`, and raised inputs and menus white. Ink `#28292D` carries primary copy. Gray `#686B74` is used for metadata and compact action labels; `#F1F3F4` distinguishes subtle controls from their surroundings. Borders use `#E5E5E7`.

The selected sidebar item uses a pale red wash `#FFF0EC`, a faint `#F8DFD8` border, and a red-orange foreground `#C93518`. This accent is an inferred approximation slightly darker than the compressed reference for legible small labels. The colorful artworks supply all other substantial color.

Dark Mode is a local inferred extension, implemented with semantic CSS custom-property overrides. No dark-mode reference was provided.

## Typography

Inter is bundled locally as a practical substitute for the original interface typeface. The wordmark is 20px medium with 0.01em tracking. Navigation is 14px medium, section headings 17px medium, body copy 15px regular, the prompt input 16px regular, control labels 13px, and metadata 12px.

The detail prompt uses a compact 14px / 1.5 reading style at the standard desktop size. At widths of 1700px and above, major typography scales toward the supplied 1920px capture: the wordmark becomes 24px, navigation 18px, the prompt input 20px, and the image description 18px.

## Layout

The viewport shell uses a 208px sidebar at the baseline desktop width. The prompt/search toolbar sits above the content with a 52px prompt height. Image detail divides the remaining space into a flexible artwork stage and a 365px information panel. The description begins at the top; creation actions sit near the bottom; a narrow vertical thumbnail strip aligns to the far right.

The Organize grid uses small square thumbnails, tight 2px gutters, and a 168px options column. Layout and image-size choices change the grid locally. Explore uses a four-column masonry arrangement, reduced to three columns at narrower desktop sizes and two on mobile.

At widths of 1700px and above, the sidebar scales to 273px, the detail panel to 492px, the toolbar to 67px, and small thumbnails to about 82px. Below 760px, navigation becomes a dismissible drawer, the toolbar wraps, and image detail stacks the artwork above its controls. Closed mobile navigation is inert so offscreen controls cannot take keyboard focus. Responsive behavior is inferred because the source set is desktop-only.

## Elevation & Depth

Depth is subtle. The prompt and search controls use a fine border and a faint `0 5px 18px #00000004` shadow. The artwork stage has a soft warm tint; the main artwork uses `0 10px 22px #00000010`. Context menus have a stronger but compact shadow. Dialogs use `0 14px 50px #00000025` over a translucent backdrop.

Avoid heavy shadows around every image tile. Dense gallery separation comes from narrow gaps, while larger artwork is allowed to stand apart.

## Shapes

The prompt field and artwork use 14px corners, regular controls and dialogs use 6–14px corners, and selected navigation uses a full pill radius. Small gallery tiles remain nearly square with minimal 1px rounding so they form a continuous contact sheet.

Keep thumbnails consistently square in Square layout. Full layout varies selected tile ratios. These modes provide local visual feedback rather than exporting new crops.

## Components

The implementation imports real Vercel UI SDK `Button`, `Dialog`, and `Toggle` components through `@study/ui`. App-owned tokens and CSS provide their styling.

- **Prompt bar:** multiline text input, image-reference action, settings action, and a send arrow when a prompt exists. Enter submits and Shift+Enter adds a line.
- **Image detail:** editable prompt reuse, favorite toggle, actual image download, zoom, variation switching, image/style reference selection, and creation-action previews.
- **Organize:** search, liked filter, square/full layout, thumbnail sizes, local folder creation, and explicit addition of workspace images into a folder.
- **Explore and references:** artwork browsing plus a keyboard-accessible reference picker. Local image files can be selected or dropped into the upload area; no upload request is made.
- **Settings:** aspect ratio, stylization, weirdness, variety, model selection, and reset. Changes are reflected in prompt parameters.
- **Secondary views:** Personalize, Edit, Chat, Tasks, Help, account menu, and dark appearance are inferred extensions. They operate on local state only.

The entry route is `/midjourney`. Prompt submission adds four existing sample artworks with the submitted text; variation and upscale actions add local preview records. They do not generate or upscale image pixels. Community messages are browser-local and are not sent to anyone. State resets when the page reloads.

### Artwork provenance and limits

All displayed artwork was cropped from the supplied references. The complete crop list is retained in `references/asset-provenance.json`; no screenshot is used as the page UI.

- The tomato artwork is cropped from `screen-1.webp` at `(304, 342, 1187, 952)`. The reference's open menu covers its lower-right region, so that region was excluded. The narrower retained image is shown at its natural aspect ratio; its composition differs from the full original.
- The dog artwork is an unobstructed crop from `screen-2.webp` at `(344, 142, 1355, 1153)`.
- Thirty-six small gallery images are extracted individually from `screen-3.webp`. Their original roughly 81px resolution limits large-detail fidelity.
- Six Explore/reference images are extracted from unobstructed regions of `screen-4.webp`. Some are partial artwork views because the source upload panel covers other regions.

The default view reproduces the tomato detail with the contextual menu closed. The upload picker follows the observed composition but uses a named modal for focus and Escape behavior. Lucide icons and an HTML wordmark replace unavailable original assets.

## Do's and Don'ts

- Do let artwork dominate the interface and keep the surrounding chrome neutral.
- Do use the warm accent for selected navigation and focused actions.
- Do preserve the dense Organize layout and clear image/action separation.
- Do provide visible keyboard focus, meaningful icon labels, and modal Escape dismissal.
- Do retain source screenshots, crop coordinates, and explicit fidelity limits.
- Don't embed an entire screenshot as an interactive page or reproduce Mobbin's footer as product UI.
- Don't imply local preview records are newly generated images or that uploads and community messages leave the browser.
- Don't present approximate tokens, substitute fonts, or inferred secondary views as official Midjourney implementation details.
