---
version: alpha
name: Lovable — Project builder study
description: A screenshot-derived Lovable web design system with an editable local portfolio preview.
colors:
  primary: '#2456e9'
  text: '#20211f'
  muted: '#666864'
  canvas: '#fdfbf9'
  surface: '#ffffff'
  cream: '#f8f4ec'
  border: '#e7e7e2'
  selected: '#dce5fb'
  preview: '#f8f7f3'
  preview-text: '#20252b'
  preview-muted: '#6d717d'
  sage: '#416f5b'
  danger: '#c8100b'
  purple: '#5733c7'
  blue: '#5e8cff'
  pink: '#f544ad'
  orange: '#ff602e'
typography:
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  toolbar:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
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
  home-heading:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.04em
  dialog-heading:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.02em
  portfolio-heading:
    fontFamily: Georgia
    fontSize: 69px
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.025em
  portfolio-name:
    fontFamily: Georgia
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.2
  portfolio-body:
    fontFamily: Inter
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.4
  portfolio-eyebrow:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  small: 6px
  medium: 10px
  large: 16px
  composer: 24px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  base: 16px
  large: 24px
  toolbar: 46px
  sidebar: 260px
  settings-nav: 230px
  icon: 30px
components:
  canvas:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
    typography: '{typography.body}'
  toolbar:
    height: '{spacing.toolbar}'
    typography: '{typography.toolbar}'
  primary-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    rounded: '{rounded.small}'
  dark-button:
    backgroundColor: '{colors.text}'
    textColor: '{colors.surface}'
    rounded: '{rounded.small}'
  danger-button:
    backgroundColor: '{colors.danger}'
    textColor: '{colors.surface}'
  composer:
    backgroundColor: '{colors.cream}'
    textColor: '{colors.text}'
    rounded: '{rounded.composer}'
  version-card:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.text}'
    typography: '{typography.label}'
  muted-label:
    textColor: '{colors.muted}'
    typography: '{typography.caption}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  home-heading:
    textColor: '{colors.text}'
    typography: '{typography.home-heading}'
  dialog-heading:
    textColor: '{colors.text}'
    typography: '{typography.dialog-heading}'
  portfolio:
    backgroundColor: '{colors.preview}'
    textColor: '{colors.preview-text}'
  portfolio-heading:
    textColor: '{colors.preview-text}'
    typography: '{typography.portfolio-heading}'
  portfolio-name:
    textColor: '{colors.preview-text}'
    typography: '{typography.portfolio-name}'
  portfolio-description:
    backgroundColor: '{colors.preview}'
    textColor: '{colors.preview-muted}'
    typography: '{typography.portfolio-body}'
  portfolio-eyebrow:
    textColor: '{colors.sage}'
    typography: '{typography.portfolio-eyebrow}'
  portfolio-action:
    backgroundColor: '{colors.sage}'
    textColor: '{colors.surface}'
    rounded: '{rounded.full}'
  workspace-avatar:
    backgroundColor: '{colors.purple}'
    textColor: '{colors.surface}'
  brand-gradient-blue:
    backgroundColor: '{colors.blue}'
  brand-gradient-pink:
    backgroundColor: '{colors.pink}'
  brand-gradient-orange:
    backgroundColor: '{colors.orange}'
---

# Lovable design system

## Overview

This study recreates Lovable's web project builder, its workspace home, and its project settings. The builder places a compact conversation beside a large live preview. Warm neutral chrome keeps the generated site's identity separate from the builder's blue selection and publish controls. The workspace home uses a large soft blue, pink, and orange gradient behind a centered prompt.

Three exact Lovable screens were retrieved through the connected Mobbin MCP, visually inspected, and retained at their original 1920 × 1325 resolution on November 16, 2026:

- [Builder with portfolio preview and tools menu](https://mobbin.com/screens/eec89469-5d45-4f53-861d-a1cbf1db6f82) — `references/screen-1.webp`.
- [Workspace home with invitation inbox](https://mobbin.com/screens/fbc4ad2b-8b0a-4c70-840b-8497f8c6138e) — `references/screen-2.webp`.
- [Project settings](https://mobbin.com/screens/fe7d5eb7-b6fd-4928-bcdf-a150749e9e74) — `references/screen-3.webp`.

`references/sources.json` retains source IDs, canonical URLs, retrieval queries, dimensions, and observed state labels. This is an inferred implementation, not an official Lovable design-token export. The source screenshots contain a 120px Mobbin footer that is excluded from the application. The entry view reproduces the builder with its tools menu open; the home inbox opens from the notification control.

## Colors

Large flat screenshot regions were sampled to select the warm canvas `#FDFBF9`, cream composer `#F8F4EC`, and portfolio surface `#F8F7F3`. Other color values are close visual estimates. The interface uses dark `#20211F` text and `#666864` secondary copy, with fine `#E7E7E2` borders. Blue `#2456E9` identifies publishing, selected controls, and focus; the version card uses `#DCE5FB`.

The portfolio has its own dark `#20252B` text, gray `#6D717D` supporting copy, and sage `#416F5B` accent. Preview accent changes are local semantic overrides, separate from the builder's blue controls. Red `#C8100B` is reserved for the destructive settings action. Purple workspace avatars and the reconstructed multicolor mark supply compact brand cues.

## Typography

Inter is bundled locally as a practical substitute for Lovable's interface font. At the baseline desktop width, conversation text is 15px with 1.6 line height, toolbar text is 14px, labels 13px, and small controls 12px. The home heading is 26px semibold with slightly tight tracking.

Georgia substitutes for the portfolio's unavailable Playfair Display, which is named in the observed conversation. Its large headline uses a fluid 4.8vw size, clamped between 48px and 92px, approximately 69px at a 1440px viewport. The portfolio name is 22px, description 19px, and eyebrow 17px. At 1700px and above, conversation text scales to 19px and the preview heading to 92px to approach the 1920px reference. Mobile uses a roughly 39px headline and 14px description. Font substitution creates visible glyph and line-wrap differences.

## Layout

The desktop toolbar is 46px tall. Below it, the conversation takes 30.3% of the viewport and the preview fills the rest, matching the reference's approximate 580px / 1340px split. The conversation scrolls independently while its suggestions and composer stay near the bottom. The preview is an editable DOM tree, with a slim navigation row, centered hero block, action row, and scroll cue.

The home screen has a 260px sidebar at the baseline width, centered prompt, and a project shelf below the gradient. Its larger reference capture uses a wider sidebar. The settings dialog occupies most of the viewport and divides into 230px navigation and scrollable settings rows; at 1920px, navigation expands to 305px.

Below 760px, the portfolio preview and conversation stack vertically so both remain usable. The home sidebar becomes a dismissible drawer. Closed drawer contents are inert, and Escape closes the drawer and returns focus to its opener. Mobile composition, project shelf contents, and small-screen settings navigation are inferred because the references are desktop-only.

## Elevation & Depth

Most separation comes from warm surface differences and 1px borders. The preview's frame is lightly outlined. Tool menus use a compact `0 2px 4px #0002` shadow; dialogs use `0 15px 45px #0003` and a dark translucent backdrop. The home gradient is recreated with CSS radial and linear layers rather than a screenshot background.

Avoid strong shadows around every panel. The generated portfolio keeps its broad cream canvas and restrained outlined secondary action.

## Shapes

Small controls use 6px corners, cards 10–16px, and the composer a 24px radius. Preview navigation and actions use full pills. The large settings dialog is 14px rounded, while its rows remain flat and separated by thin horizontal rules. The multicolor Lovable mark is a small CSS reconstruction and is not an original vector asset.

## Components

Actual Vercel UI SDK `Button`, `Dialog`, and `Toggle` components are imported through `@study/ui`. Styling is app-owned. The dialog primitive provides focus containment, Escape dismissal, and focus recovery.

- **Builder conversation:** editable prompt, attachment filename, suggestion chips, version selection, helpful feedback, and saved version. Enter submits; Shift+Enter inserts a line.
- **Live portfolio:** the submitted command `Change headline to …` changes the headline. Prompts containing blue, purple, green, or sage change its accent. Other prompts add a change record. The Design panel also provides a color picker. This deterministic behavior is inferred and makes no AI request.
- **Tools:** preview and code views, design controls, and simplified Cloud, Analytics, Security, and Speed panels. The tool names and menu are observed; the interior panels are inferred.
- **Settings:** category, badge and analytics toggles, editable project name, remix, workspace preferences, knowledge, and domain input. Delete resets the sample project locally; publish and unpublish only change local state.
- **Home:** project navigation, project search, saved-project filter, invitation acceptance or dismissal, and prompt-to-preview transition. The small project card below the captured home crop is inferred.
- **Dialogs:** project settings follows the source. Share, publish, database connection, contact form, and selected-work details are inferred extensions. Invitations and contact forms only update local state; no message is sent or site deployed.

The canonical YAML is mirrored exactly in `tokens.json`. `tokens.css` defines the runtime semantic values, and `app/globals.css` contains layout and responsive rules. All displayed interface text and controls are editable HTML; no screenshot is used as page UI. The secondary portfolio work tiles use abstract CSS artwork because no original project imagery is visible in these sources. Lucide icons substitute for unavailable original assets. Local state resets on reload.

## Do's and Don'ts

- Do preserve the conversation-to-preview proportion and separate builder blue from portfolio sage.
- Do keep the warm surfaces, subtle outlines, large preview typography, and restrained controls.
- Do provide accessible icon names, visible focus, and keyboard-complete dialogs.
- Do keep reference screenshots and source metadata alongside inferred tokens.
- Don't treat the prototype's local edits, messages, publishing, or database connection as remote operations.
- Don't embed source screenshots as interactive UI or include Mobbin's attribution footer in the product page.
- Don't present approximate typography, brand marks, secondary panels, or mobile behavior as official Lovable assets or specifications.
