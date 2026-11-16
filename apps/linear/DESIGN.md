---
version: alpha
name: Linear — Light workspace study
description: A screenshot-derived design system for the AS Mobbin Linear workspace,
  observed on November 16, 2026.
colors:
  primary: '#7275cf'
  primary-hover: '#6265bf'
  canvas: '#f3f3f3'
  surface: '#fdfdfd'
  elevated: '#ffffff'
  hover: '#eeeeef'
  selected: '#e6e6e7'
  group: '#f4f4f5'
  border: '#e9e9eb'
  text: '#17181a'
  secondary: '#626369'
  muted: '#92929b'
  done: '#6870c8'
  progress: '#e9bc23'
  teal: '#23afc1'
typography:
  title:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 23px
    fontWeight: 600
    lineHeight: 1.3
  modal-title:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  body-medium:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3
  label-small:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
  caption:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.3
rounded:
  small: 5px
  medium: 9px
  panel: 14px
  modal: 22px
  pill: 999px
spacing:
  xs: 4px
  small: 8px
  medium: 12px
  base: 16px
  large: 24px
  sidebar: 232px
  header: 44px
  row: 42px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.elevated}'
    rounded: '{rounded.pill}'
    typography: '{typography.label}'
    height: 28px
    padding: 7px
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  navigation-item:
    textColor: '{colors.secondary}'
    rounded: 6px
    height: 28px
    padding: 8px
  navigation-item-selected:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.text}'
  issue-row:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    typography: '{typography.body}'
    height: '{spacing.row}'
  issue-group:
    backgroundColor: '{colors.group}'
    textColor: '{colors.text}'
    rounded: 7px
    height: 34px
  modal:
    backgroundColor: '{colors.elevated}'
    textColor: '{colors.text}'
    rounded: '{rounded.modal}'
    width: 715px
  workspace-panel:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.panel}'
  workspace-canvas:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
  icon-button-hover:
    backgroundColor: '{colors.hover}'
    textColor: '{colors.text}'
  control-outline-stroke:
    backgroundColor: '{colors.border}'
    width: 1px
  muted-label:
    textColor: '{colors.muted}'
    typography: '{typography.label-small}'
  status-done:
    backgroundColor: '{colors.done}'
    textColor: '{colors.elevated}'
    rounded: '{rounded.pill}'
    size: 13px
  status-progress-fill:
    backgroundColor: '{colors.progress}'
    rounded: '{rounded.pill}'
  issue-label-dot:
    backgroundColor: '{colors.teal}'
    rounded: '{rounded.pill}'
    size: 9px
---

# Linear design system

## Overview

This study reproduces the light AS Mobbin workspace captured in Mobbin. It uses a narrow gray navigation rail, a large off-white work surface, compact rows, restrained status colors, and a purple primary action. Empty space is part of the reference: the default Backlog contains exactly four issues.

### Evidence and scope

Observed November 16, 2026 through the connected Mobbin MCP. The app identity and screenshots come from these references:

- [Backlog list](https://mobbin.com/screens/fd1b4d88-f021-49a3-98af-4cd3a87e1d29)
- [Create issue modal](https://mobbin.com/screens/ffa2e456-85c7-4005-b361-de79dc6b6dc7)
- [Grouped project issues](https://mobbin.com/screens/ef923b0e-9a40-4fdd-80f2-f3aafb4f36ce)

High-resolution original images are preserved in `references/`; the exact returned metadata is in `references/sources.json`. The images include Mobbin's attribution footer, which is preserved in the source images and is not part of the product interface. No official Linear source code, design-token file, or proprietary font was provided. All numeric values are inferred approximations from screenshots. The issue detail screen, mobile behavior, and unpictured interactions are implementation decisions, not verified Linear behavior.

## Colors

The canvas is `#f3f3f3`, the work surface `#fdfdfd`, and elevated dialogs pure white. Text uses `#17181a`, secondary labels `#626369`, and subdued icons `#92929b`. Purple `#7275cf` identifies the create action. Done is purple, In Progress yellow, and Backlog/Todo neutral. Borders should remain quiet; avoid making every row a card.

The normative values above are mirrored in `tokens.json`; `tokens.css` provides the corresponding `--linear-*` runtime variables. The yellow token supplies the filled half and outline of the In Progress glyph. Teal supplies the 9px label dot. The border component describes the colored 1px stroke around compact controls. Muted gray is used for navigation counts and small popover copy as well as icons; those uses are preserved from the study, not recommended for new small text.

The official linter reports white text on the primary purple (#7275CF) at **4.07:1**, below the 4.5:1 WCAG AA requirement for normal-size text. The 12px create-action label therefore retains a genuine accessibility limitation in this visual study. The linter also flags the white check inside the Done status icon at **4.43:1** on #6870C8; this is a non-text glyph and exceeds the applicable 3:1 threshold, so its reference colors are retained. Muted #92929B text is also below 4.5:1 on the light canvas and elevated surfaces (about 3.09:1 on white). The reconstructed colors remain unchanged to preserve screenshot fidelity; a production adaptation should choose darker text/action colors and recheck all states. Transparent label components intentionally omit a background token because they inherit their surrounding surface.

## Typography

Use Arial with Helvetica and sans-serif fallbacks. The original typeface is not bundled; this stack approximates the screenshot's compact neutral sans. Body and navigation use 13px at standard desktop sizes, labels 11–12px, detail titles 23px, and modal inputs 18px. Large 1700px-plus viewports scale chrome and row sizes to match the 1920px source captures. Keep semibold mainly for names, titles, and primary information.

## Layout

At standard desktop sizes, use a fixed 232px sidebar, 44px main header, 41px toolbar, 34px group heading, and 42px issue rows. The main work surface begins 8px from the top and right edges, with a 34px bottom gutter for the Ask Linear shortcut. The sidebar has no visible divider because its surface differs from the work panel.

The create dialog is 715px wide and starts around 13% of the viewport height. Wide 1920px screens increase it to 950px to reflect the source. At widths below 600px, navigation becomes an overlay drawer and issue metadata hides. These responsive adaptations are inferred; the source set contains desktop screens only.

## Elevation & Depth

Work surfaces use borders and a nearly invisible shadow. Popovers use `0 4px 18px #00000018, 0 1px 4px #0000000a`. The create modal uses `0 20px 70px #00000026` over a translucent black backdrop. The small What's new card has a short, soft shadow. Avoid large ambient shadows on the issue list.

## Shapes

Navigation items and rows use 4–6px rounding; main panels 14px; the create dialog 22px; property chips and action buttons full pills. Status glyphs remain circular. The mix is intentional: container radius expresses hierarchy, rather than using the same radius everywhere.

## Components

The app uses Vercel's actual `@ui-sdk/react` Button and Dialog primitives through `@study/ui`. Local CSS supplies all visual styles. Dialog behavior includes focus handling and Escape dismissal.

- **Sidebar:** workspace switch, compose action, navigation, nested team links, and What's new card.
- **Issue list:** collapse groups, switch Backlog/Active/All issues, search, filter statuses, and toggle row metadata.
- **Issue detail:** edit title, description, status, priority, and assignee; add comments locally.
- **Create issue:** required title, description, status and priority selectors, create-more switch, and draft saving.
- **Project issues:** grouped research issues with a starred project state.

Direct entry routes are `/linear`, `/linear/projects`, and `/linear/issue`. In-app navigation switches screens without resetting local state. Issues, comments, and drafts persist in browser localStorage. Integration controls explain the local prototype scope and never send data externally. The app does not implement account authentication, real notifications, attachments, integrations, or multi-user synchronization.

## Do's and Don'ts

- Do retain the sparse Backlog composition and subtle group bars.
- Do use compact icons and ensure every icon-only action has an accessible label.
- Do preserve a visible focus ring, dialog title, Escape dismissal, and keyboard shortcut support.
- Do document inferred values and unpictured states as approximations.
- Don't replace the interface with a screenshot or claim official design-token extraction.
- Don't add decorative gradients, large marketing headings, or oversized cards.
- Don't present local state changes as real Linear account activity.
