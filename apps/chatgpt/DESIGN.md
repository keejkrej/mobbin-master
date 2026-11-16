---
version: alpha
name: ChatGPT Web Study
description: A source-backed reconstruction of ChatGPT conversation and navigation surfaces, with inferred local interaction states.
colors:
  primary: "#0d0d0d"
  secondary: "#676767"
  tertiary: "#0285ff"
  neutral: "#ffffff"
  sidebar: "#f9f9f9"
  surface: "#f5f5f5"
  hover: "#ececec"
  border: "#e5e5e5"
  plus: "#6354bd"
  plus-surface: "#f3f1fb"
typography:
  headline:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 29px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: -0.7px
  toolbar:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
  body:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-strong:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.65
  heading-small:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: -0.15px
  label:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  disclaimer:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
  citation:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 9px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 8px
  md: 12px
  lg: 24px
  composer: 32px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  sidebar: 264px
  conversation: 780px
  toolbar: 54px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 11px
  button-icon:
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    size: 34px
  button-icon-hover:
    backgroundColor: "{colors.hover}"
  hairline:
    backgroundColor: "{colors.border}"
    height: 1px
  button-plus:
    backgroundColor: "{colors.plus-surface}"
    textColor: "{colors.plus}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  chat-bubble:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 16px
  sidebar:
    backgroundColor: "{colors.sidebar}"
    width: "{spacing.sidebar}"
  composer:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.composer}"
    height: 58px
  citation:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.citation}"
    rounded: "{rounded.full}"
---

## Overview

ChatGPT uses a quiet white conversation canvas, a pale gray navigation rail, and rounded message surfaces. The main task is reading and composing text. Sparse toolbar controls and muted metadata keep the response readable. This study recreates the observed Osaka group conversation as its initial screen, plus an image conversation and a New chat state.

Evidence was retrieved from Mobbin on **November 16, 2026**. The screenshots are historical captures, not evidence of the live product on that date. These are inferred implementation tokens, not OpenAI's original design system.

| Reference | Observed details | Local source |
| --- | --- | --- |
| [Osaka group conversation](https://mobbin.com/screens/fa707eb9-8ecd-48e1-b94d-647c03a08bc6) | Selected group row, system events, member avatars, gray message bubbles, assistant typography, bottom composer | `references/fa707eb9-8ecd-48e1-b94d-647c03a08bc6.webp` |
| [Image-analysis conversation](https://mobbin.com/screens/fc303bbc-5d5f-4ffc-b3ce-065abc9693bc) | Image attachment, long user prompt, Get Plus pill, share action, sidebar and composer | `references/fc303bbc-5d5f-4ffc-b3ce-065abc9693bc.webp` |

The local `sources.json` preserves Mobbin IDs and canonical links. The supplied 1920×1320 captures include a 120px Mobbin attribution footer; that footer is excluded from the application layout. Only the source logo and unobstructed living-room photo were cropped into assets. No screenshot is used as the page UI. The New chat screen, menus, dialogs, local replies, and responsive behavior are inferred extensions.

## Colors

Primary ink is almost black (`#0d0d0d`) on white. The sidebar is `#f9f9f9`, with user messages at `#f5f5f5`; these three surface values were sampled from source screenshots. Selected and hovered rows use slightly stronger gray. Blue is restricted to unread indicators and the account avatar. The optional Plus promotion uses subdued purple.

Additional borders, hover states, metadata grays, and accent values are visual estimates. Color constants used in the app live in `tokens.css`; `tokens.json` mirrors the parsed YAML front matter exactly. Icon buttons have no painted default surface and inherit the white or pale sidebar beneath them, so their component tokens intentionally omit a background value.

## Typography

Body text is 16px with 1.65 line height; assistant paragraphs favor readable long lines, bold subject names, and small inline citations. Navigation text is 14px, labels and timestamps 12px, toolbar titles 18px, and the inferred New chat heading 29px. Use sentence case for controls.

The source appears to use OpenAI's product font; its font files are not provided by Mobbin. **Arial/Helvetica is an explicit substitution**, so letterforms and line wraps are not pixel-identical. Reference dimensions were normalized to a common desktop scale instead of treating the Mobbin raster as a device-pixel specification.

## Layout

The desktop rail is 264px, the toolbar 54px, and the conversation column is centered at a 780px maximum width. At widths above 1700px, the rail and conversation expand to 300px and 900px. Below 1050px, the rail contracts to 230px. On screens at or below 760px, the rail starts closed and opens as an overlay with keyboard containment, an inert background, and Escape dismissal. Choosing a conversation closes it.

The conversation scrolls independently while the composer stays at the bottom. Reserve at least 140px below transcript content so the composer never permanently hides the final response. The New chat state centers the composer vertically and adds a short row of suggestions. Spacing uses 4/8px increments with small adjustments for screenshot alignment.

## Elevation & Depth

Main content stays flat. A hairline border separates the sidebar and toolbar. User messages use tonal contrast rather than shadows. The composer has a faint `0 2px 5px #00000008` shadow and 1px border. Menus use a soft `0 6px 25px #00000018` shadow. Dialogs occupy the browser top layer with a translucent dark backdrop. Those popup states are inferred.

## Shapes

Use 8px icon-button corners, 10–12px list/menu corners, and 24px message bubbles. The single-line composer has a 32px radius; expanded composition uses 24px. Send controls and avatars are circular. Pills use a full 999px radius. Avoid heavy outlined boxes in the transcript.

## Components

- **Navigation:** Compact leading icons, one-line titles, and a pale selected row. Sidebar controls open New chat, searchable history, image conversation, apps, project creation, and a code prompt.
- **Conversation:** Human messages use gray bubbles. Assistant responses remain on the white canvas with readable paragraphs and concise action icons. Group events are centered and muted.
- **Composer:** A textarea supports Enter to send and Shift+Enter for a newline. File selection adds a removable filename chip. Send is disabled while blank or awaiting the local sample reply. The attachment menu, voice sample, and suggestions modify actual local state.
- **Dialogs:** Search opens matching history, project creation adds a navigation entry, share copies the preview URL, and Plus switches the local plan preview. None creates accounts, shares data externally, charges a payment, or calls an AI service.
- **UI SDK:** All action buttons use `Button` from `@study/ui`, which directly exports Vercel's `@ui-sdk/react`. Modal surfaces use SDK `Dialog`, `DialogContent`, `DialogTitle`, `DialogDescription`, and `DialogClose` for Escape dismissal, focus behavior, and top-layer rendering.
- **Feedback:** Copy, response feedback, pending reply status, and toast messages provide visible outcomes. Reply text is deterministic local sample content, not a generated answer.

## Do's and Don'ts

- Do preserve the large white reading area and small amount of gray navigation chrome.
- Do keep one clear composer and readable paragraph lengths; keep secondary controls visually quiet.
- Do provide accessible names for icon buttons and keyboard-visible focus states.
- Do retain the original source files and record which assets were cropped from them.
- Don't represent estimated dimensions or substituted fonts as official OpenAI tokens.
- Don't embed the reference screenshot as an interactive page or include Mobbin's footer inside the product canvas.
- Don't suggest that local sample replies, voice preview, attachments, or share controls connect to OpenAI services.
