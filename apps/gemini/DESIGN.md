---
version: alpha
name: Google Gemini — Mobbin Study
description: Inferred design tokens from Google Gemini home and temporary-chat screenshots.
colors:
  primary: '#232625'
  secondary: '#696c6e'
  canvas: '#fdfdfd'
  surface: '#ffffff'
  selected: '#f0eeee'
  border: '#e6e6e6'
  glow: '#c2e4fc'
  temporary-glow: '#dededc'
  focus: '#0b57d0'
  blue: '#4285f4'
  red: '#ea4335'
  yellow: '#fbbc05'
  green: '#34a853'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.02em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  composer:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 8px
  md: 16px
  lg: 24px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  sidebar: 280px
  rail: 56px
  composer: 672px
  control: 36px
components:
  composer:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.primary}'
    typography: '{typography.composer}'
    rounded: '{rounded.full}'
    height: 64px
    padding: '{spacing.md}'
    width: '{spacing.composer}'
  navigation-selected:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
    typography: '{typography.label-md}'
    height: 32px
  icon-button:
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
    size: '{spacing.control}'
  user-message:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.primary}'
    rounded: '{rounded.lg}'
    typography: '{typography.body-md}'
    padding: '{spacing.md}'
  main-canvas:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.primary}'
  ambient-glow:
    backgroundColor: '{colors.glow}'
  temporary-ambient-glow:
    backgroundColor: '{colors.temporary-glow}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  focus-indicator:
    backgroundColor: '{colors.focus}'
    size: 2px
  google-mark-blue:
    textColor: '{colors.blue}'
  google-mark-red:
    textColor: '{colors.red}'
  google-mark-yellow:
    textColor: '{colors.yellow}'
  google-mark-green:
    textColor: '{colors.green}'
---

# Google Gemini

## Overview

This is a screen-derived design study of Google Gemini, captured through the connected Mobbin MCP on **November 16, 2026**. It reproduces the light home screen and temporary-chat screen, then extends their patterns to a local conversation. The initial screen uses a quiet white canvas, a dense left navigation, and a soft blue glow behind a centered greeting and composer.

The YAML tokens are the normative values for this implementation. They are inferred from screenshots, not official Google tokens. Large flat surface colors were sampled; typography, spacing, radii, responsive behavior, and unseen interaction states were estimated. WebP compression can shift sampled colors.

Sources retained in `references/`:

- [Home with blue glow and expanded navigation](https://mobbin.com/screens/f3b9012f-3f75-433b-a9e0-c70c2a39e9bc) — `f3b9012f-3f75-433b-a9e0-c70c2a39e9bc.webp`.
- [Temporary chat with gray glow and collapsed rail](https://mobbin.com/screens/eeb82ce8-837a-4e5c-8364-621c22334f11) — `eeb82ce8-837a-4e5c-8364-621c22334f11.webp`.

Both references measure 1920 × 1325 pixels, including a 120-pixel Mobbin attribution footer. The footer is retained in the source files and excluded from the interface. The product is **Google Gemini**; unrelated results for the Gemini cryptocurrency exchange were excluded.

## Colors

Primary ink `#232625` carries the greeting, navigation, and controls. Secondary gray `#696C6E` is reserved for section labels and supporting text. The canvas is `#FDFDFD`, surfaces are white, and selected navigation uses `#F0EEEE`.

The home glow uses `#C2E4FC` blended into transparency through a broad radial gradient. Temporary chat replaces it with `#DEDEDC`. These glows sit behind readable foreground surfaces. The four Google colors appear only in the approximated Gemini star and a small settings notification dot.

A local Dark preference is an inferred extension, with CSS overrides for canvas, surfaces, borders, and text; it is not claimed to match a captured dark-mode screen.

## Typography

Inter is bundled locally as a practical substitute for Google's proprietary interface typeface. Body and navigation use regular weight, while selected rows and concise labels use medium weight.

- The desktop greeting is 36px / 1.25, regular, with -0.04em tracking.
- Section titles are 24px / 1.3, regular.
- Conversation copy uses 16px / 1.6.
- General controls use 14px, and supporting labels use 12px.
- The composer uses 17px / 1.5.

The greeting reduces to 30px below 1000px viewport width and 29px on small screens. Above 1600px, it increases to 40px.

## Layout

The shell fills the viewport. At the desktop baseline, navigation is 280px wide and collapses to a 56px icon rail. The main content remains centered within the remaining space. The primary composer has a 672px maximum width and a 64px height.

The greeting begins around 38% of the viewport height; the composer begins around 47%. Temporary chat moves the introductory block higher to accommodate its icon and explanation while preserving the composer's position. Conversation mode anchors the composer near the bottom and lets the message column scroll.

The sidebar becomes 240px below 1000px and 320px above 1600px. Above 1600px the composer can grow to 760px. On screens up to 760px, navigation opens as an overlay, the composer fills the available width with 16px margins, and the greeting scales down. These breakpoints are inferred because the supplied references are desktop-only.

## Elevation & Depth

Most hierarchy comes from spacing, tone, and shape. The composer uses `0 2px 5px #0000000c, 0 8px 15px #00000003`, enough to separate it from the glow without a strong card outline. Menus use a 1px border and a `0 6px 24px #00000017` shadow. Dialogs use a dimmed backdrop and a restrained larger shadow.

Keep the glow diffuse. Do not turn it into a sharp gradient panel or add decorative borders around the empty state.

## Shapes

The composer, navigation selection, and icon controls use a full pill radius of 999px. Menus use 16px corners. Dialogs and larger message surfaces use 24px corners. Input fields use 8px corners. The avatar is circular.

## Components

- **Navigation:** compact icon-and-label rows with a pale selected pill. Section labels and chat history have lower visual emphasis. The account and settings remain anchored to the bottom.
- **Composer:** a white pill containing attachment, multiline prompt input, model selector, and microphone or send action. Enter sends; Shift+Enter creates a new line. The send action appears when content or an attachment exists.
- **Model menu:** Flash, Thinking, and Pro choices show selection state. Labels and descriptions are local inferred examples.
- **Conversation:** plain assistant copy with a Gemini star, rounded user messages, feedback toggles, and a copy action. Responses are deterministic local samples and make no network request.
- **Dialogs:** searchable history, notebook creation, preferences, and sample voice transcript entry use real Vercel UI SDK `Dialog` primitives. Actions use the SDK `Button`; feedback and compact navigation use `Toggle`.
- **Temporary chat:** starts with collapsed navigation and a gray glow; local messages never enter recent history. The screenshot's storage-policy copy is replaced with accurate local behavior text.
- **Secondary views:** Images, Videos, Library, Gems, notebook details, menus, and dark appearance are inferred extensions. They reuse the same tokens and provide local navigation/draft behavior.

The avatar in `public/assets/avatar.webp` is an unmodified crop of the home reference at rectangle `(12, 1143, 56, 1187)`. The Gemini star is an approximate SVG shape; Lucide icons substitute for original icon artwork. No full screenshot is used as interface markup or background.

The Next.js App Router entry is `/gemini`. All interactions run in local React state. Attachments remain in the browser, voice entry accepts a sample typed transcript, and no real recording, account access, AI generation, or public sharing occurs.

## Do's and Don'ts

- Do keep the empty state sparse and center it in the space beside the sidebar.
- Do use the blue glow only for the ordinary home state and gray for temporary chat.
- Do keep keyboard focus visible and supply accessible names for icon controls.
- Do label newly inferred screens in documentation and retain the original source screenshots.
- Don't replace the interface with a screenshot or reproduce Mobbin's attribution footer as product UI.
- Don't claim inferred values, substituted fonts, or local sample replies are official Google assets or live Gemini behavior.
