---
version: alpha
name: Spotify web player study
description: An inferred dark music-player system from four Mobbin web references, retrieved November 16, 2026.
colors:
  primary: "#1ed760"
  primary-hover: "#3be477"
  background: "#000000"
  surface: "#121212"
  surface-raised: "#1f1f1f"
  surface-hover: "#2a2a2a"
  surface-selected: "#333333"
  on-surface: "#ffffff"
  secondary: "#b3b3b3"
  border: "#303030"
  track: "#535353"
typography:
  headline-display:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 104px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -4px
  headline-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.8px
  headline-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.7px
  body-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
  body-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  body-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  label-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
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
rounded:
  artwork: 3px
  row: 4px
  panel: 8px
  dialog: 9px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  header: 64px
  player: 88px
  track-row: 56px
components:
  button-play:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    size: 56px
  button-play-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    typography: "{typography.label-md}"
    padding: 16px
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.panel}"
  library-card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.panel}"
    padding: 20px
  track-row:
    textColor: "{colors.on-surface}"
    rounded: "{rounded.row}"
    height: "{spacing.track-row}"
  search:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    height: 48px
  slider:
    backgroundColor: "{colors.track}"
    height: 4px
    rounded: "{rounded.full}"
  chip:
    backgroundColor: "{colors.surface-hover}"
    rounded: "{rounded.full}"
  lyrics-panel:
    backgroundColor: "{colors.surface-selected}"
    textColor: "{colors.on-surface}"
  separator:
    backgroundColor: "{colors.border}"
    height: 1px
---

# Spotify

## Overview

This is a screen-derived study of Spotify's web player, not Spotify's official design-system source. It uses a black frame, inset charcoal content panels, a persistent library, and a player anchored to the bottom edge. Album artwork carries the visual identity. Green identifies playback and saved states while white is used for secondary actions.

### References and confidence

The following Mobbin web screenshots were retrieved through the connected MCP on November 16, 2026. High-resolution copies and machine-readable links are in `references/`.

- [Today's Top Hits playlist](https://mobbin.com/screens/f57cdb1b-d7af-416a-be72-b5d6d9b13fad): primary layout, hero, table and player.
- [Saved playlist state](https://mobbin.com/screens/f0891c7f-4e2e-4423-8e35-c1dcd83e67bf): library selection and saved feedback.
- [Sabrina Carpenter album](https://mobbin.com/screens/fd00bec6-299f-4a82-9b99-448f679233cc): compact album header, artist library and song list.
- [Lyrics unavailable](https://mobbin.com/screens/ff9901a2-78b3-44fb-a2ab-4125118089bc): large white message on a gray panel.

Colors, panel structure, spacing relationships, labels and visible states are observed. Exact token names, numeric values, responsive rules, and non-reference interactions are inferred. The palette in the YAML, `tokens.json`, and `tokens.css` describes this implementation. It is not an export from Spotify.

## Colors

The outer frame is true black. Content is `surface` (#121212), library prompts and the search input use `surface-raised` (#1f1f1f), and selected rows are a little lighter. White titles and muted gray metadata retain a clear hierarchy. Use `primary` (#1ed760) for play, saved status, and active controls. Do not fill large page regions with it.

## Typography

The reference uses Spotify's proprietary typography. This implementation substitutes Arial/Helvetica so it works without proprietary font files; glyph widths and title wrapping are therefore approximate. The playlist headline is fluid (`clamp(44px, 6.2vw, 104px)`), increasing to 120px at the 1920px reference width. Main song names are 16px, metadata is 13–14px, and timings are 11px with tabular numerals. The machine-readable headline token specifies the desktop maximum below the wide-screen override.

## Layout

The shell fills the viewport. A 64px header and 88px player surround two independently scrolling panels with an 8px gap. The library occupies about 23.3% of the desktop width, with a 240px minimum. Track rows are 56px tall with 40px artwork. At 1700px and wider, the shell, type and artwork scale up to approach the 1920 × 1200 source UI; Mobbin's added 120px attribution footer is excluded.

Below 1150px the library is 250px wide and the date column disappears. Below 760px the library becomes a drawer, the album column disappears, and playback uses two rows. These mobile adaptations are implementation decisions, not claims about Spotify's mobile web design.

## Elevation & Depth

Most hierarchy comes from tonal contrast. The hero uses a dark gradient for text contrast. Album artwork uses a soft black shadow. The options menu uses `0 8px 24px #0008`; dialogs use `0 16px 70px #0009`. The remaining panels have no shadow.

## Shapes

Panel and prompt-card corners are 8px. Artwork uses 3px corners; hover rows use 4px. Search, chips and text action buttons are pills. Playback and profile controls are circles. Keep small radii on dense content and full rounding on controls.

## Components

The application imports actual Vercel UI SDK components through the shared `@study/ui` package: Button, Toggle, Dialog and Slider. Styling stays in this app. Toggle manages pressed states for likes, shuffle, repeat and lyrics. Slider provides pointer and keyboard seek/volume controls. Dialog provides focus management, Escape dismissal and titles.

- **Player:** Play/pause, previous/next, seek, mute, volume, shuffle and repeat controls. Playback is a local timer simulation; no audio is streamed. Repeat restarts the simulated track at its end; otherwise the timer stops.
- **Track table:** Real text, images and buttons, with play actions, album navigation and like toggles. Search filters visible tracks. The album view supplies all 12 song labels, with the lower unpictured rows added to complete the interaction.
- **Library:** Saving a playlist opens the populated state. Liked Songs reflects local likes. Creating a playlist saves its name locally. Unimplemented catalog items provide explicit feedback.
- **Dialogs:** Create playlist, queue and profile. These are supporting inferred states, not visually verified reference screens.
- **Feedback:** A white toast acknowledges saving, playlist creation and unavailable catalog actions. Saved lists use localStorage with in-memory fallback.

### Asset provenance and fidelity limits

Artwork files in `public/assets/` are cropped from the downloaded Mobbin references. `short-n-sweet.webp` is the clean 173px album image. Playlist thumbnails are low-resolution crops of the reference table and library. `playlist-portrait.webp` contains only the unobstructed photo region above the screenshot's title, so the hero crop differs from the original. No screenshot is used as a whole-page background, and all text, tables and controls are implemented in HTML/CSS. The Spotify mark is an approximate inline vector. Exact visual matching remains limited by the missing original hero image, proprietary typeface, icon differences and screenshot resolution.

## Do's and Don'ts

- Do preserve the black frame, restrained surface steps and persistent playback controls.
- Do use artwork and the large playlist title as the focal point.
- Do keep icon-only actions labeled and keyboard focus visible.
- Do distinguish observed screenshot details from inferred behavior and tokens.
- Don't present these values as Spotify's official tokens.
- Don't use a reference screenshot as a substitute for interactive UI.
- Don't imply that simulated playback streams audio or that local playlists sync to Spotify.
