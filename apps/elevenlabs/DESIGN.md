---
version: alpha
name: ElevenLabs Text to Speech study
description: An inferred light audio workspace from two Mobbin ElevenLabs web references retrieved November 16, 2026.
colors:
  primary: "#141414"
  canvas: "#ffffff"
  sidebar: "#fafafa"
  surface: "#f6f6f6"
  selected: "#efefef"
  border: "#e6e6e6"
  text: "#141414"
  secondary: "#777777"
  slider: "#17202b"
  tag: "#a349bf"
  track: "#e5e5e5"
typography:
  headline-dialog:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.5px
  brand:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.8px
  editor:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.4
  label-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  body-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  body-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
  micro:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 10px
    fontWeight: 600
    lineHeight: 1
rounded:
  sm: 8px
  md: 12px
  lg: 18px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  sidebar: 244px
  header: 48px
  player: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    rounded: 11px
    height: 36px
    typography: "{typography.body-md}"
  shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
  sidebar:
    backgroundColor: "{colors.sidebar}"
    width: "{spacing.sidebar}"
  navigation-selected:
    backgroundColor: "{colors.selected}"
    textColor: "{colors.text}"
    rounded: 9px
    height: 33px
  voice-notice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: 10px
    padding: 12px
  panel-divider:
    backgroundColor: "{colors.border}"
    width: 1px
  supporting-label:
    textColor: "{colors.secondary}"
    typography: "{typography.label-sm}"
  slider-fill:
    backgroundColor: "{colors.slider}"
    height: 4px
    rounded: "{rounded.full}"
  slider-track:
    backgroundColor: "{colors.track}"
    height: 4px
    rounded: "{rounded.full}"
  expression-cue-reference:
    textColor: "{colors.tag}"
    rounded: 4px
  dialog:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
---

# ElevenLabs

## Overview

This study recreates the ElevenLabs Text to Speech workspace: a light navigation rail, an open script editor, a denser settings column, and a persistent preview player. The interface uses restrained grayscale controls and thin borders. Color appears in voice-avatar orbs, the image-generation illustration and the promotional model gradient.

### References and evidence

Two original Mobbin web screenshots were retrieved through the MCP on November 16, 2026:

- [Eleven v3 multi-speaker editor](https://mobbin.com/screens/fe8dcb43-f770-4ade-894d-0e187d80b874): speaker chips, bracketed expression cues, stability control, language override and generated-preview player.
- [Eleven Multilingual v2 editor](https://mobbin.com/screens/fab28130-f253-4610-883d-370b7eb93121): single text editor, four settings sliders, voice picker, model promotion and shell layout.

Downloaded originals and canonical links are retained in `references/`. Shell proportions, visible wording, v2/v3 composition, control hierarchy and the bottom player are observed. Exact numeric tokens, font choice, responsive rules and unpictured dialogs/history states are inferred. These values are not ElevenLabs' official design tokens. The capture dates of the source screenshots are not supplied by the MCP.

## Colors

Use white for the editor and settings canvas, #fafafa for the sidebar, and #efefef for selected navigation. Borders are #e6e6e6. Primary text and generation actions use near-black #141414; slider fills use #17202b. Muted supporting text uses #777777 and similar grays visible in the reference.

The model-promotion strip blends pale gray through cyan and lilac to orange. It is an observed accent treatment, not a general surface style. Voice-avatar orbs use small CSS gradients to approximate the reference artwork. The `tag` token records the purple expression-cue treatment observed in the v3 screenshot. In this implementation cues remain editable plain text in the textarea; they are not rendered as purple rich-text chips. The reference cue token is retained for a future rich-text editor and is identified as reference-only in its component name.

The #777777 secondary text has approximately 4.48:1 contrast on white, just below 4.5:1 for normal-size text. This close visual match is retained as a documented fidelity limitation; production use should darken supporting text and test its actual inherited background. The primary black-and-white controls have strong contrast. No color is the sole indication of a selected voice or model.

## Typography

Arial, Helvetica and sans-serif provide an explicit substitute for the original product typeface. The editor is 16px with 1.5 line height at the standard desktop width. Navigation is 15px, section labels 14px, small controls 12–13px and counters 11px. The reconstructed wordmark uses bold type and two vertical bars rather than an official logo asset.

At widths of 1700px and above, editor text increases to 21px, navigation to 19px and settings labels to 18px. This reproduces the relative density of the supplied 1920px captures. The YAML describes the standard desktop scale; the wide-screen variants are CSS overrides. The mobile adaptation uses a 15px editor and 11–14px labels.

## Layout

The standard desktop shell fills the viewport, with a 244px sidebar, 48px header and 80px bottom player. The remaining workspace divides into approximately 60.3% editor and 39.7% settings. Editor content begins 43px from the top and 46px from its sides. Generation actions sit near the editor's bottom edge; the settings column scrolls independently.

At 1700px and wider, the sidebar is 326px, header 63px and player 103px, matching the proportions of the 1920px-wide reference. The original capture includes a separate Mobbin attribution footer; this footer is preserved in the reference image and excluded from the app.

Below 960px the sidebar becomes a 66px icon rail. Below 700px it becomes 55px wide, the settings stack below the editor, and the player remains fixed at the bottom. These mobile rules are inferred; no mobile reference was supplied. Use 4px increments for spacing, with the source's measured column and inset proportions taking precedence over a strict grid.

## Elevation & Depth

Borders and white space do most of the work. Picker controls use only `0 1px 2px #00000004` shadows. The sidebar invitation card has a faint shadow over the pale rail. Dialogs use `0 20px 80px #0003` and a translucent black backdrop. Toasts use a dark surface with `0 6px 25px #0002`. Do not elevate the editor or settings as separate cards.

## Shapes

The core radius scale is 8, 12, 18 and 999px. Source-specific controls use 9–11px corners, while large illustration cards use 17px. The play control, voice orbs and slider thumbs are circles. Version badges are small outlined pills. The sidebar invitation has 16px rounding at standard desktop size and 22px at the wide reference scale.

## Components

The page uses actual Vercel UI SDK Button, Dialog, Slider and Toggle components through `@study/ui`. Each component is styled locally. Sliders support dragging and keyboard changes; dialogs provide modal focus containment, Escape dismissal and focus return.

- **Editor:** Editable script with live character count and a 5,000-character generation limit. Switching to Eleven v3 exposes speaker chips, bracketed expression cues and a second speaker. Adding/removing the second speaker updates the count. The Enhance action adds an expression cue locally.
- **Voice picker:** Searchable inferred dialog with five sample voices, category filters and selected-state checkmarks. Selecting a voice updates the editor chips, settings control and generated-history metadata. Voice names beyond the observed Sam Lee/Alice examples are demonstration content.
- **Model picker:** Inferred model dialog for Eleven v3, Eleven Multilingual v2 and Eleven Flash v2.5. The v3 layout matches its reference; other model capabilities are not implemented. Model labels/descriptions are interface content, not a claim that any model is connected.
- **Settings:** Speed, stability, similarity, style, language override and output-format controls. Changes are kept in local state and recorded with a preview. Loading a history item restores these settings. Reset restores slider defaults and disables the language override.
- **Generation and history:** Generate speech saves a local script/settings snapshot and estimates its duration. History persists in localStorage and supports reloading and deleting individual previews. Generation does not create audio or consume service credits. The displayed credit count is reference sample data.
- **Player:** Play/pause and ten-second controls animate a timeline, with an explicit visual-preview label and notification. No audio is generated or streamed. Download exports the script as a `.txt` file; share copies the study URL. Feedback and invitation flows are previews that send nothing.

### Assets and limitations

`public/images/generation-art.webp` crops only the green illustration tile from the v3 screenshot. No full screenshot is used as the interface. All navigation, text, controls, counters, editor surfaces and player elements are implemented with HTML/CSS. Avatar orbs and the wordmark are approximations. The plain-text cue representation, substitute icons/typeface, inferred dialogs and mobile layout prevent a claim of exact pixel parity across all states.

## Do's and Don'ts

- Do preserve the open editor, compact settings and persistent player hierarchy.
- Do use subtle dividers instead of surrounding every region with a card.
- Do keep controls keyboard accessible and expose clear labels for icon-only actions.
- Do label local preview behavior accurately and preserve source links and uncertainty.
- Don't imply that changing a voice or model calls the ElevenLabs service.
- Don't represent a simulated timeline or text download as generated audio.
- Don't use the reference screenshot as a whole-page image.
- Don't treat inferred numeric tokens or the Arial fallback as official product assets.
