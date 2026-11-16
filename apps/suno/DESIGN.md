---
version: alpha
name: Suno — Dark music creation workspace
description: A Mobbin screenshot-derived Suno web design system with local sample
  songs and silent playback previews.
colors:
  primary: '#F86C43'
  primary-end: '#E43C8B'
  canvas: '#101012'
  surface: '#19191B'
  card: '#171719'
  raised: '#232326'
  text: '#F5F5F5'
  muted: '#A1A1A7'
  dim: '#737378'
  border: '#2B2B2E'
  success: '#65CA93'
typography:
  brand:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 1px
  dialog-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: -0.8px
  page-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 17px
    fontWeight: 500
    lineHeight: 1.3
  navigation:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.44
  song-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  small:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  small: 8px
  medium: 14px
  card: 24px
  dialog: 40px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  large: 24px
  xl: 32px
  player: 106px
  creator-min: 360px
  sidebar-min: 190px
components:
  canvas:
    backgroundColor: '{colors.canvas}'
  wordmark:
    textColor: '{colors.text}'
    typography: '{typography.brand}'
  navigation:
    textColor: '{colors.dim}'
    typography: '{typography.navigation}'
    rounded: '{rounded.small}'
  navigation-active:
    textColor: '{colors.text}'
  workspace-title:
    textColor: '{colors.text}'
    typography: '{typography.page-title}'
  workspace-muted:
    textColor: '{colors.muted}'
  description:
    backgroundColor: '{colors.card}'
    textColor: '{colors.text}'
    typography: '{typography.body}'
    rounded: '{rounded.card}'
    padding: '{spacing.base}'
  description-label:
    typography: '{typography.label}'
  pill:
    backgroundColor: '{colors.raised}'
    textColor: '{colors.text}'
    rounded: '{rounded.full}'
    typography: '{typography.small}'
  inspire-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.text}'
    rounded: '{rounded.full}'
  inspire-gradient-end:
    backgroundColor: '{colors.primary-end}'
  create-button:
    textColor: '{colors.text}'
    rounded: '{rounded.full}'
    typography: '{typography.action}'
    height: 48px
  separator:
    backgroundColor: '{colors.border}'
  song-title:
    typography: '{typography.song-title}'
    textColor: '{colors.text}'
  song-caption:
    typography: '{typography.caption}'
    textColor: '{colors.muted}'
  dialog:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    rounded: '{rounded.dialog}'
    padding: '{spacing.large}'
    typography: '{typography.dialog-title}'
  player:
    backgroundColor: '{colors.surface}'
    height: '{spacing.player}'
  challenge-time:
    textColor: '{colors.success}'
    typography: '{typography.small}'
  attachment:
    backgroundColor: '{colors.raised}'
    rounded: '{rounded.medium}'
    padding: '{spacing.sm}'
---

# Suno interface study

## Overview

Suno's create screen is a compact, dark workspace: account navigation at the left, a persistent song composer in the middle, and a wider library at the right. Warm orange and pink controls stand out against nearly black surfaces. White text identifies the current action; muted text recedes around it. The initial screen intentionally matches the reference's empty results with three active filters.

This is an inferred study, not an official Suno design-system export. Dimensions, colors, typography, and interaction details were estimated from screenshots retrieved through Mobbin MCP on November 16, 2026. The screenshots' original capture dates were not supplied. Inter is a locally bundled approximation; the exact original typeface and tokens were not available.

### Sources

- [Suno Create workspace, Simple mode, filtered empty state](https://mobbin.com/screens/ee1453af-9d35-4929-a0fd-57f087455bc6): primary evidence for layout, creator, toolbar, challenge notice, and player.
- [Create a New Hook song selection dialog](https://mobbin.com/screens/fd30579f-5320-4c90-9310-1576ecd4dedf): evidence for the centered modal, song rows, tabs, cover art, and Use action.

Full references and metadata are retained in `references/`. Four small cover images in `public/assets/cover-*.webp` were cropped from the first screenshot's individual artwork regions; some retain the source's small play glyph. `avatar.webp` comes from the second screenshot's account portrait. The interface is live HTML and React components, never a full screenshot background. No original audio assets were available.

### Implementation scope

The initial Create screen and hook selector follow observed sources. Advanced fields, populated workspace rows, responsive layouts, hook trimming, and silent playback are inferred extensions. Create adds two local sample records, displays an explicit explanation, and selects the first record. It does not generate music or spend credits. Playback moves a visible timeline without audio, labeled “Silent playback preview.” Attachments are filename-only local selections; no upload or processing happens. Account, credit, and subscription values are reference content. The challenge time is an unchanged screenshot fixture, not a live deadline.

## Colors

The canvas is `#101012`. Creator cards use `#171719`; player and dialog surfaces use `#19191B`. Pills and selected rows use `#232326`, with `#2B2B2E` separators. Main text is `#F5F5F5`; supporting copy uses `#A1A1A7`. Reference-style low-emphasis navigation and empty-state copy use `#737378`.

Orange `#F86C43` and pink `#E43C8B` identify creative controls and pressed accents. The main Create action combines a pink radial spot with `linear-gradient(90deg, #F88924, #EF4E35)`. The inspirational wand uses a pink-to-orange gradient. These are visual approximations of the reference's textured treatment; no original gradient texture was extracted.

The reference has low-contrast dim navigation and white glyphs over bright orange. The study preserves those visual choices, so these combinations should not be interpreted as a certified accessible palette. Main text and modal content use high-contrast neutrals; focus outlines remain distinct. For a production adaptation, increase dim text contrast and darken bright action backgrounds while checking the resulting visual change.

## Typography

Use Inter, with Arial and sans-serif fallbacks. Most text is regular weight, with medium song titles and a bold uppercase wordmark. At the standard desktop size, paragraph text is 14px, navigation 16px, song titles 14px, and small control labels 11–13px. Dialog titles use 24px with slightly tighter spacing.

At widths above 1700px, scale paragraph text to 18px, navigation to 20px, the wordmark to 40px, and hook-dialog titles to 31px to follow the supplied 1920px reference. On mobile, creator paragraphs are 12px with 1.6 line height, while control text remains compact. Do not introduce a large landing-page headline into this workspace.

## Layout

The desktop shell fills the viewport and uses a left sidebar, middle creator, right workspace, and a bottom player spanning the middle and right columns. Sidebar width is `clamp(190px, 13.2vw, 254px)`; creator width is `clamp(360px, 29.8vw, 572px)`. The bottom player is 106px high. At the reference width, the composer and workspace top bars are 86px high.

Use 16px default panel padding, increasing to 20px on wide screens. The creator's primary action anchors to the bottom of its panel; the library owns its own scroll region. At intermediate widths the search toolbar wraps. Below 950px navigation becomes an icon rail. Below 700px the creator and workspace stack vertically beside a 54px rail, and a fixed 102px player keeps its controls visible. These narrow layouts are inferred because only desktop references were provided.

## Elevation & Depth

Depth comes from near-black tonal surfaces and thin borders. Property rows and creator cards do not need heavy shadows. Dropdowns use `0 12px 35px #0007`; dialogs use `0 16px 45px #0008` with a `#0009` backdrop. Toasts use a light surface to remain readable over the dark workspace.

Vercel UI SDK Dialog provides the native top layer, focus containment, Escape dismissal, and return to the triggering control. The selector's list scrolls inside the dialog, keeping its title and search visible.

## Shapes

Use 24px creator cards, 40px desktop dialogs, 8px artwork corners, and fully rounded pill controls. Circular buttons appear for playback, the inspiration wand, and utility actions. Mobile dialogs reduce to 28px corners and creator cards to 20px.

Song artwork is portrait-oriented, around 54×68px in the library and 48×64px in the standard hook selector. Circular play and selection controls remain independent interactive elements where applicable.

## Components

- **Creator:** editable description, Simple/Advanced mode, model choice, instrumental toggle, inspiration chips, filename-only audio attachment, and a lyrics dialog. Advanced mode adds a title and lyrics fields. All state stays in the current browser session.
- **Create action:** validates a nonempty description, shows a brief preparation state, and adds two clearly labeled sample cards. The result notification explicitly states that no music was generated.
- **Workspace toolbar:** text search, three reversible filter flags, sort direction, and disabled single-page controls. Reset filters reveals the five reference-derived song fixtures.
- **Song row:** portrait artwork, title, duration, style, optional Sample label, favorite toggle, and a details dialog. Clicking a song selects it in the player.
- **Player:** selected song, previous/next, play/pause, repeat, shuffle, scrubber, and volume state. It is a silent timeline preview, with no audio element or synthesized sound.
- **Hook selector:** accessible dialog with search, All/Public/Liked tabs, song rows, and Use controls. Choosing a song opens an inferred visual hook editor with a 30-second selection and local save feedback.
- **Challenge notice:** collapsible reference content. It does not start a real countdown or award credits.
- **Primitives:** actual Vercel UI SDK Button, Toggle, Dialog, and Slider exports from `@study/ui`, with app-owned CSS rather than a substituted component library.

## Do's and Don'ts

- Do retain the three-column desktop structure and persistent create/player actions.
- Do keep song text compact and use tonal changes to show selection.
- Do provide clear labels for icon buttons and visible keyboard focus.
- Do keep no-result states reversible with Reset filters.
- Do label local samples and silent playback where users encounter them.
- Do keep inferred behavior and exact screenshot evidence separate in documentation.
- Don't imply music generation, audio playback, uploads, or credit spending occurred.
- Don't use a screenshot as the live interface.
- Don't present inferred colors or font choices as Suno's official tokens.
- Don't animate playback or preparation indicators when reduced motion is requested.
