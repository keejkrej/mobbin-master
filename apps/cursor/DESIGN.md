---
version: alpha
name: Cursor Web Agents
description: A visual reconstruction of the Cursor web-agent composer from Mobbin desktop references; tokens are inferred, not official source values.
colors:
  primary: "#202020"
  secondary: "#626262"
  canvas: "#f7f7f7"
  sidebar: "#f3f3f3"
  surface: "#fdfdfd"
  hover: "#ededed"
  selected: "#eeeeee"
  faint: "#8c8c8c"
  border: "#e5e5e5"
  line: "#dddddd"
  enabled: "#238c6b"
  send: "#191919"
  on-send: "#ffffff"
typography:
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  toolbar:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  heading:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.45
rounded:
  sm: 6px
  md: 10px
  lg: 18px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  compact: 12px
  md: 16px
  lg: 24px
  composer-width: 812px
  composer-top: 96px
  model-popup-width: 334px
  tool-popup-width: 280px
components:
  main-panel:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
  sidebar:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.primary}"
  navigation-hover:
    backgroundColor: "{colors.hover}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
  model-selected:
    backgroundColor: "{colors.selected}"
    textColor: "{colors.primary}"
    typography: "{typography.toolbar}"
    rounded: "{rounded.sm}"
  empty-agent-label:
    textColor: "{colors.faint}"
    typography: "{typography.body}"
  popup-divider:
    backgroundColor: "{colors.border}"
    height: 1px
  sidebar-divider:
    backgroundColor: "{colors.line}"
    width: 1px
  composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
    width: "{spacing.composer-width}"
    height: 170px
  send-button:
    backgroundColor: "{colors.send}"
    textColor: "{colors.on-send}"
    rounded: "{rounded.full}"
    size: 31px
  popup:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.toolbar}"
    rounded: "{rounded.md}"
    padding: "{spacing.xs}"
  suggestion:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    height: 35px
  switch-active:
    backgroundColor: "{colors.enabled}"
    rounded: "{rounded.full}"
    width: 36px
    height: 21px
---

# Cursor web agents

## Overview

This folder recreates Cursor's sparse web-agent composer from two Mobbin references. It uses Next.js and Vercel UI SDK through `@study/ui` for buttons, toggles, and dialogs. Large quiet surfaces surround a compact prompt card. Gray controls and regular-weight type make the task text the focus.

References retrieved November 16, 2026 using Mobbin MCP, query `Cursor chat screen`, platform `web`:

- [Composer with MCP server menu](https://mobbin.com/screens/c5ee99ab-46b9-4ffe-a831-2d377d4e3495), retained as `references/c5ee99ab-46b9-4ffe-a831-2d377d4e3495.webp`.
- [Composer with model selection menu](https://mobbin.com/screens/5086a06b-e76b-49ad-a5e4-c2100759b758), retained as `references/5086a06b-e76b-49ad-a5e4-c2100759b758.webp`.

Returned metadata is in `references/sources.json`. Original screenshots measure 1920 × 1320; their bottom 120 pixels are Mobbin's curation footer, not Cursor UI, and are excluded from the frontend. The observed model names are display fixtures, not claims about current model availability.

This is a visual reconstruction of the observed screens, not the complete official Cursor design system. Colors, dimensions, font choices, and interaction details are inferred. Original source tokens, proprietary icons, internal breakpoints, and backend behavior were not exposed.

## Colors

Use near-black primary text on an almost-white canvas. The sidebar is slightly darker than the canvas, and the composer and popovers are slightly lighter. Secondary gray labels recede; subtle borders separate neighboring surfaces. Green is reserved for enabled toggles and completion indicators. The send button is a small black circle.

`tokens.css` maps these values to `--cursor-*` variables. `tokens.json` mirrors this document's token tree. Faint reference labels are preserved for screenshot fidelity and should not be reused as the only way to convey essential information.

## Typography

Use locally bundled Inter with Arial and sans-serif fallbacks. Inter is an approximation because the screenshots do not identify the original font or metrics. Composer text and navigation use 16px regular weight; toolbar and menu text use 15px. Small supporting labels use 13–14px. Inferred result screens introduce restrained 22px medium-weight headings.

Avoid decorative typography or oversized headlines in the observed composer. Preserve normal sentence case and comfortable line height.

## Layout

At the reference width, the left sidebar measures approximately 355px. The implementation uses `clamp(236px, 18.5vw, 356px)` to preserve the desktop proportions while leaving room at smaller widths. Its top row holds collapse and search controls. New Agent, Automations, and Dashboard follow; the empty state sits below; the profile stays at the bottom.

The centered composer is approximately 812px wide, with its repository row at y≈101 and its card at y≈133. The card is approximately 170px tall. The model menu is 334px wide, while the MCP menu is 280px wide. Use the 4, 8, 12, 16, and 24px scale for component spacing.

Smaller viewports reduce composer margins and compact the sidebar; the sidebar button opens the navigation. This responsive treatment is inferred because no mobile reference was available.

## Elevation & Depth

Depth comes primarily from surface tones and one-pixel borders. Popovers use `0 3px 9px #0000000b, 0 1px 4px #00000005`. The composer has almost no shadow. Preserve the broad empty canvas rather than filling it with extra cards. Inferred dialogs use a dim backdrop and stronger shadow so their modal state is clear.

## Shapes

Use 18px corners for the main composer, 10px for popovers, and 6px for small interactive rows. Suggestions and switches are pills. The send action and profile avatar are circles. Model checkbox indicators are compact squares with a small corner radius.

## Components

The initial composer preserves the reference prompt, repository, model names, navigation labels, profile, spacing, and control ordering. Select models and Configure MCP tools reveal the corresponding observed menu states. Model selection keeps at least one model; disabling multiple models retains the first selected model. MCP switches update local state.

Repository and branch selectors, prompt suggestions, attachment filenames, search, sidebar collapse, and the account menu work locally. Submitting creates an agent entry and displays a deterministic sample result. New Agent clears the composer. Dashboard summarizes local tasks. Automations can create and remove an explicitly inactive demo card; no schedule is created.

The submitted result, search dialog, account menu, repository menu contents, dashboard, automations, and voice-note entry were not visible in the supplied screenshots. These are documented implementation inferences that make the visible controls usable. Voice notes use text entry instead of microphone capture. File selection retains only a filename. Sample results explicitly state that no repository was accessed or code executed.

Icon buttons have accessible names and inputs have labels. UI SDK toggles expose pressed state; UI SDK dialogs provide focus handling and Escape dismissal. Popover panels close on outside press or Escape. Lucide icons and a small vector Slack mark approximate the observed assets.

## Do's and Don'ts

- Do keep the composer compact and the surrounding canvas spacious.
- Do style UI SDK state with its documented attributes and preserve accessible names.
- Do distinguish observed screens from inferred interface states in documentation.
- Do keep sample actions local and identify simulated results.
- Don't add the Mobbin curation footer to the application interface.
- Don't claim that inferred token values, font metrics, or icon shapes are official Cursor assets.
- Don't imply that choosing a model connects to that model or that a demo automation creates a real schedule.
