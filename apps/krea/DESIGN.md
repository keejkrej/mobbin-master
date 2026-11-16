---
version: alpha
name: Krea AI image and video study
description: Two screenshot-derived creative composers with inferred local result and gallery states, observed through Mobbin on November 16, 2026.
colors:
  primary: "#ffffff"
  on-primary: "#080808"
  canvas: "#ffffff"
  surface: "#f4f4f4"
  secondary: "#8e8e8e"
  border: "#ececec"
  video: "#f7a600"
  blue: "#0877f9"
  dark-canvas: "#111111"
  dark-surface: "#202020"
  dark-chip: "#303030"
typography:
  headline-image:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 90px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -3px
  headline-video:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -2px
  headline-gallery:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -1.5px
  headline-result:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 29px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.8px
  headline-dialog:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.7px
  body-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.4
  body-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.7
  label-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
  label-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.2
rounded:
  sm: 10px
  md: 16px
  lg: 24px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  header: 70px
  video-composer: 590px
  image-composer: 764px
components:
  generate:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: 15px
    height: 65px
    typography: "{typography.label-md}"
  light-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-primary}"
  light-composer:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  dark-canvas:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.primary}"
  dark-composer:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
  dark-option-chip:
    backgroundColor: "{colors.dark-chip}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    typography: "{typography.caption}"
  supporting-label:
    textColor: "{colors.secondary}"
    typography: "{typography.label-sm}"
  border-stroke:
    backgroundColor: "{colors.border}"
    width: 1px
  video-icon:
    backgroundColor: "{colors.video}"
    textColor: "{colors.primary}"
    rounded: 12px
    size: 41px
  model-tip:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.primary}"
    rounded: 7px
    typography: "{typography.label-md}"
  example-art:
    rounded: 11px
    width: 184px
    height: 115px
---

# Krea AI

## Overview

The Krea study contains two observed surfaces: a sparse white Video composer and a dark Image composer. Both center the prompt and generation action within a large amount of negative space. The Video view has a compact icon navigation pill at the top; the Image view replaces this with a large instruction headline and an example-art strip near the bottom.

### Evidence and scope

The connected Mobbin MCP returned two web screenshots on November 16, 2026:

- [White Video composer](https://mobbin.com/screens/fda34297-9d04-46ce-9b59-43d29ed9c4f4): tool navigation, Video title, frame/style thumbnails, Generate button and Wan 2.1 model selector.
- [Dark Image composer](https://mobbin.com/screens/f9a274ad-c0ca-460a-b591-fe1fd5bd7da9): oversized headline, prompt, style controls, aspect ratio, resolution, thumbnails and seven example artworks.

Original screenshots and returned metadata are preserved in `references/`. These references establish visible structure, wording and art placement. Exact font metrics, token values and breakpoints are inferred. Style/model/ratio dialogs, theme switching, result cards and gallery are locally designed extensions rather than verified Krea screens. The source captures' dates are not provided, so these screenshots do not establish the current live Krea UI.

## Colors

The light surface uses white with a #f4f4f4 composer and navigation pill. Near-black labels remain the focus. An amber #f7a600 video badge and blue #0877f9 model suggestion provide small accents. The image surface uses #111111 for the canvas, #202020 for the composer and #303030 for option chips. Generate remains white with near-black text in both themes.

These are visual approximations, not an official token export. The official linter reports two preserved contrast warnings: the model suggestion's white text on blue is 4.19:1, and the white video symbol on amber is 2.02:1. The amber symbol is below the 3:1 non-text threshold; its adjacent black “Video” label names the workspace, but this does not eliminate the symbol's contrast limitation. Both observed accent treatments remain documented fidelity tradeoffs. Muted #8e8e8e on white is also below 4.5:1 and should be darkened in an accessibility-focused production adaptation.

The source image's example heading is almost black on its dark canvas. This study uses readable gray for that supporting heading, an intentional accessibility deviation. Theme changes outside the two observed combinations are inferred.

## Typography

Use Arial/Helvetica as an explicit replacement for the unavailable original typeface. At the standard desktop scale, the Video heading is 48px bold, prompt text is 15px, Generate is 13px semibold and option chips are 10px. The Image headline is fluid at approximately 90px on a 1440px viewport, with tight -3px tracking and 1.1 line height.

At 1700px and above, the Video title becomes 64px and the Image title 120px; prompt text becomes 20px. These overrides follow the proportions in the 1920px reference captures. Gallery and dialog type scales are inferred extensions. The reconstructed Krea mark is an approximate inline vector rather than a proprietary logo file.

## Layout

The Video composer is 590px wide at the standard desktop scale and 788px at wide reference size. Its title starts around 40% of the viewport height. The Image composer is 764px wide, expanding to 1016px at wide size, and its headline starts around 35.5% of viewport height. The prompt column grows while thumbnails and the Generate button keep their size. The seven image examples form a horizontal strip that can scroll.

The screenshot's Mobbin attribution footer is preserved only in the source file. It is excluded from the interactive product. On mobile, the tool navigation moves into a second header row, composer controls wrap and thumbnails/Generate form a separate row. The Image headline wraps, and examples remain horizontally scrollable. These are inferred mobile adaptations because no mobile screenshot was supplied. There are no off-screen navigation drawers.

## Elevation & Depth

The light view is mostly flat. The selected tool has a faint `0 2px 3px #0000000b` shadow and Generate uses `0 1px 3px #00000018`. The dark composer casts `0 25px 35px #0003`. Supporting dialogs use `0 25px 80px #0003` over a dim backdrop. Keep artwork and the headline dominant rather than adding elevation to every control.

## Shapes

Composers use 24px corners at standard size, growing to 32px in the wide layout. Navigation is rounded but not a full pill. Generate uses 15px corners; thumbnails use 13px; option chips are fully rounded. Example art is clipped to 11px corners. The style orb is a soft radial and linear color treatment, not a flat square accent.

## Components

The app imports actual Vercel UI SDK Button, Toggle and Dialog through `@study/ui`. Dialog uses the SDK's modal focus behavior, Escape dismissal and explicit return focus to the triggering control.

- **Prompt editor:** Separate editable image/video prompts, up to 2,000 characters. Blank prompts disable generation. Switching modes preserves each draft.
- **Frames and attachments:** File pickers retain filenames only. Files are not read or uploaded, and sample thumbnails remain reference artwork. A filename badge makes this distinction visible. End frames and image prompt attachments can be removed.
- **Styles:** An inferred searchable dialog selects up to five styles with pressed states and checkmarks. Style names and extra descriptive copy are demonstration content.
- **Model and canvas:** Model selection is local. The observed Wan 2.1 and Seedance labels are preserved; other options are illustrative extensions. Aspect ratio changes result-card shape and resolution cycles between 1K, 2K and 4K. A quiet Image model control is added below the example strip so this setting remains reachable.
- **Examples:** Each cropped example tile loads a corresponding locally authored prompt into the Image editor. The next arrow scrolls the strip.
- **Generate and result:** Generate saves a prompt/settings record and displays sample reference artwork, clearly labeled as a local study result. No new image, video or AI output is produced. Video results are concept stills, not playable clips.
- **Gallery:** LocalStorage-backed records support search, mode/favorite filters, reuse, deletion and favorites. Reuse restores prompt, model, ratio, resolution and selected styles. Download exports the creation brief as JSON; copying copies the prompt.

### Asset provenance and fidelity limits

The seven example crops in `public/images/` come from the bottom art strip of `references/screen-2.webp`. `portrait.webp` comes from the Video start-frame thumbnail; `cosmic-portrait.webp` comes from the Image style thumbnail. The dark reference's coastal attachment is partly obscured by UI, so this study uses the unobstructed house example as a clearly documented substitute. No full-page screenshot is used as the interface. The low-resolution crops, substituted attachment image, approximate logo/typeface/icons and inferred dialogs/mobile states prevent a claim of exact pixel parity.

## Do's and Don'ts

- Do preserve the large empty canvas and compact centered composer.
- Do keep prompt controls editable and example art separate from UI text.
- Do label reference artwork and locally simulated results accurately.
- Do retain keyboard focus, Escape dismissal and accessible names on icon-only controls.
- Do document where screenshot fidelity conflicts with contrast requirements.
- Don't imply that Generate contacts Krea or produces new media.
- Don't treat a chosen filename as an uploaded image or a real preview of that file.
- Don't present inferred dialogs, tokens or mobile layouts as official Krea designs.
- Don't substitute a whole screenshot for the working interface.
