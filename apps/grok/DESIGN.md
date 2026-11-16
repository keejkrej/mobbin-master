---
version: alpha
name: Grok web conversation study
description: An inferred monochrome Grok interface from two Mobbin web screenshots retrieved November 16, 2026.
colors:
  primary: "#080808"
  canvas: "#fdfdfd"
  text: "#101010"
  secondary: "#686868"
  surface: "#f7f7f7"
  hover: "#efefef"
  border: "#e7e7e7"
  white: "#ffffff"
typography:
  headline-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -1px
  headline-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 19px
    fontWeight: 600
    lineHeight: 1.4
  headline-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-wide:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.7
  body-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.8
  body-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.8
  label-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
  label-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.7
  label-compact:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: 8px
  md: 16px
  lg: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  sidebar: 248px
  content: 760px
  header: 63px
components:
  canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: 14px
    typography: "{typography.label-md}"
    padding: 16px
  navigation:
    textColor: "{colors.text}"
    typography: "{typography.label-lg}"
    rounded: 9px
    height: 40px
  navigation-hover:
    backgroundColor: "{colors.hover}"
  composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    height: 59px
  message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: 16px
    typography: "{typography.body-lg}"
  metadata:
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
  divider:
    backgroundColor: "{colors.border}"
    width: 1px
  icon-button:
    rounded: "{rounded.full}"
    size: 32px
  feedback-image:
    rounded: "{rounded.md}"
---

# Grok

## Overview

This study reconstructs Grok's light web conversation surface. A narrow left rail separates navigation, projects, history and the account control from a centered conversation. The interface is almost entirely monochrome: dark type and icons on an off-white canvas, with faintly tinted message surfaces. The conversation and its supplied image remain the focal point.

### Evidence and scope

The design is inferred from two high-resolution Mobbin web references retrieved November 16, 2026:

- [Conversation with copied-link feedback](https://mobbin.com/screens/f8760136-ccfc-4d4c-868e-ca992d36fc4d): sidebar, prompt, response image, sharing control, toast and composer.
- [Editing a conversation prompt](https://mobbin.com/screens/f5f415eb-08da-4177-a637-1ef54a2782ac): expanded prompt bubble with Cancel and Save actions.

The original screenshots and their returned metadata are retained in `references/`. Observed elements include the black-and-white palette, sidebar hierarchy, centered column, pill composer, image treatment and prompt-edit state. Exact token values and names are inferred, not exported from Grok's source. New chat, model choices, search, settings, voice and project dialogs are supporting local states; they are not claimed as matched reference screens.

## Colors

The canvas is #fdfdfd with #101010 primary text. Muted controls and metadata use #686868. The composer and user bubbles use #f7f7f7; hover areas use #efefef. Borders are #e7e7e7. Primary action buttons are near-black (#080808) with white labels. The send control uses the closely related literal #050505 in CSS. There is no chromatic brand accent in these references.

## Typography

The implementation uses Arial, Helvetica and the system sans-serif fallback. The original font is not available from the reference images, so this is an explicit substitution. Navigation is 14px semibold, supporting labels are 12–13px, and conversation text is 15–16px with loose line height. Dialog titles are 19px semibold. The inferred new-chat heading is 32px medium with -1px letter spacing. At 1700px and wider, prompt and section text increase to 20px to approach the 1920px-wide reference capture.

## Layout

The desktop shell fills the viewport with a 248px sidebar and a centered 760px conversation column. The topbar is 63px tall. A pinned composer sits 26px above the bottom edge, at most 792px wide. The scroll area includes enough bottom padding to keep responses clear of this composer. The main spacing scale is 4, 8, 12, 16, 24 and 32px.

At 1700px the sidebar grows to 326px and the content column to 976px, matching the proportions of the supplied 1920 × 1200 UI capture. Mobbin's added attribution footer is excluded. Below 1050px the sidebar becomes 215px wide; below 700px it becomes a 66px icon rail and the composer compresses. These responsive rules are inferred from the desktop layout and are not independently verified Grok mobile patterns.

## Elevation & Depth

Thin borders and subtle background changes distinguish elements. The composer has a very light `0 2px 4px #00000005` shadow. Dropdowns use `0 8px 28px #00000012`. Dialogs use `0 20px 80px #0003` with a translucent black backdrop. Keep shadows restrained so they do not compete with conversation content.

## Shapes

The core radius scale is 8, 16, 24 and 9999px. User bubbles have 24px corners with a smaller 8px bottom-right corner; the editable state retains the same surface. The reference image uses 16px corners. The composer, share button and icon controls are fully rounded. Navigation uses 9px rounding, while supporting local dialogs use 22px corners.

## Components

The implementation uses actual Vercel UI SDK Button and Dialog components through `@study/ui`, with app-specific CSS. Dialog supplies focus behavior, a named title, Escape dismissal and the browser top layer.

- **Sidebar:** Primary navigation, projects, conversation history and account. Collapsing it expands the main surface. Created projects last for the current session; conversation history is stored in localStorage with a safe in-memory fallback.
- **Conversation:** The supplied prompt, uploaded logo thumbnail and response image recreate the visible reference. Prompt editing, version controls, copying and response voting use local state. Additional feedback text below the visible image is locally authored sample content.
- **Composer:** Text input, attachment filename, response-mode menu and send/voice controls. Enter submits and Shift+Enter inserts a line break. Attachments show the chosen filename without uploading or reading file contents.
- **Share and copy:** Copying uses the browser clipboard. The share dialog copies this study's local URL; it does not publish a conversation or grant access to any service.
- **Supporting states:** New-chat suggestions, local sample replies, history search, project creation, settings and a simulated voice dialog. No AI, image generation, speech recognition or microphone recording is connected.

### Asset provenance and limitations

`public/images/logo-avatar.webp` and `logo-feedback.webp` are artwork crops from the Mobbin reference. The logo image is content inside the conversation, not a screenshot used as an interface. The Grok mark is an approximate inline vector, and Lucide substitutes for the original interface icons. Fonts, icon shapes and responsive extrapolation prevent a claim of exact pixel parity. The screenshots establish only the two referenced states, not Grok's complete design system.

## Do's and Don'ts

- Do keep the canvas nearly white and the primary controls black.
- Do maintain a readable centered conversation column and clear space around the composer.
- Do use subtle surface changes, faint borders and restrained shadows.
- Do retain accessible names on icon controls and visible keyboard focus.
- Do identify inferred tokens, typography substitutions and unverified supporting states.
- Don't imply that local replies, voice controls or image prompts call Grok services.
- Don't infer original font files or official token values from screenshots.
- Don't replace the interactive interface with a full-page screenshot.
