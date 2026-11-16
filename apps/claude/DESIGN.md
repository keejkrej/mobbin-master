---
version: alpha
name: Claude — Warm conversation study
description: A screenshot-derived design system for Claude web, observed in Mobbin
  on November 16, 2026.
colors:
  primary: '#c96f4e'
  primary-hover: '#b55f40'
  canvas: '#fbf9f5'
  sidebar: '#faf8f4'
  surface: '#ffffff'
  text: '#292924'
  muted: '#73726c'
  border: '#e1dfd9'
  hover: '#efeee6'
  dark: '#171816'
typography:
  display:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 42px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -1.3px
  page-title:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.6px
  modal-title:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.2
  assistant:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  composer:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.3
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
rounded:
  small: 6px
  medium: 10px
  large: 20px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  base: 16px
  large: 24px
  sidebar: 274px
  composer: 644px
  list: 792px
components:
  canvas:
    backgroundColor: '{colors.canvas}'
  sidebar:
    backgroundColor: '{colors.sidebar}'
    width: '{spacing.sidebar}'
  sidebar-item:
    textColor: '{colors.text}'
    typography: '{typography.body}'
    rounded: '{rounded.small}'
    height: 31px
  sidebar-item-hover:
    backgroundColor: '{colors.hover}'
  composer:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    rounded: '{rounded.large}'
    typography: '{typography.composer}'
    width: '{spacing.composer}'
  send-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    rounded: 8px
    height: 30px
    width: 30px
  send-button-hover:
    backgroundColor: '{colors.primary-hover}'
  button-primary:
    backgroundColor: '{colors.dark}'
    textColor: '{colors.surface}'
    rounded: 8px
    typography: '{typography.label}'
    height: 34px
  metadata:
    textColor: '{colors.muted}'
    typography: '{typography.caption}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  welcome-heading:
    textColor: '{colors.text}'
    typography: '{typography.display}'
  chat-list-heading:
    textColor: '{colors.text}'
    typography: '{typography.page-title}'
  modal-heading:
    textColor: '{colors.text}'
    typography: '{typography.modal-title}'
  assistant-message:
    textColor: '{colors.text}'
    typography: '{typography.assistant}'
---

# Claude design system

## Overview

Claude uses a warm, quiet canvas with serif greetings, restrained sans-serif controls, a narrow navigation sidebar, and one white composer. The visual hierarchy comes from typography and spacing. The coral starburst and submit control add color without competing with the writing area.

### Sources and fidelity

Source: Mobbin MCP, retrieved and inspected November 16, 2026. Original screenshots and returned metadata are preserved in `references/`.

- [Welcome home with composer](https://mobbin.com/screens/e8c0af18-6e3a-4273-93c1-935e958ff8b3)
- [Chats list and search](https://mobbin.com/screens/ef4dc71f-9d6e-4b35-89d7-26c2393c58c0)
- [Account menu](https://mobbin.com/screens/da3d700f-0862-4c7d-94b0-88526bdcbda6)
- [Feature announcement](https://mobbin.com/screens/f5b26318-4345-4c49-a0bd-a031edacb3a8)
- [Welcome home with another draft](https://mobbin.com/screens/dc0671c0-a055-45bd-92dc-42cadf7c1934)

This is an inferred system, not an official Claude token export. Large surface colors were sampled during reference research; dimensions, font choices, icon geometry, and behavior are estimates. Original screenshots are 1920px wide and include a Mobbin footer that is not part of the product UI. The product layout is implemented as live components, with no screenshot used as the page. The home state uses an empty composer rather than retaining the reference user's typed draft. The conversation screen and mobile layout are inferred from the observed shell and explicitly unverified against a conversation screenshot.

## Colors

The main canvas is warm `#fbf9f5`; the sidebar is a subtly different `#faf8f4`. White `#ffffff` makes the composer and menus distinguishable without heavy contrast. Text is `#292924`, secondary text `#73726c`, borders `#e1dfd9`, and navigation hover `#efeee6`. Coral `#c96f4e` identifies Claude's mark and send action. Black buttons use `#171816`.

The coral send control retains the observed light appearance. White on this inferred coral is approximately 3.58:1, suitable for the large arrow icon under the 3:1 non-text criterion but not for small body text. Do not reuse this pair for small text labels. Machine-readable tokens in this file are mirrored in `tokens.json`; runtime CSS custom properties live in `tokens.css`.

## Typography

Georgia approximates the supplied serif greeting and wordmark because proprietary typefaces are not provided. Inter is bundled locally through `@fontsource/inter` for sans-serif UI text. The default greeting is 42px with tight letter spacing, the Chats heading 26px, body 14px, composer 15px, controls 13px, and metadata 11px. Wide layouts at 1700px and above scale key elements toward the original 1920px capture: greeting 56px, body 18px, and composer 20px.

## Layout

At ordinary desktop widths, the sidebar is 274px, the composer is capped at 644px, and the greeting begins around 27.5% of viewport height. The composer sits 36px below the greeting and has a broad blank writing area above its toolbar. Navigation groups are separated by space, with the account pinned to the bottom.

The Chats page is a 792px-wide centered column with a heading/action row, search field, and simple divided rows. Conversation uses a 680px reading column and a bottom composer. At 1920px wide, the sidebar scales to 366px and the home composer to 858px. Below 600px the sidebar becomes a dismissible drawer; the composer and chat list fit within 15–16px gutters. Responsive rules are an implementation choice because the reference set is desktop-only.

## Elevation & Depth

The composer uses `0 2px 12px #29292408`, a nearly invisible shadow, and a thin neutral border. Menus use `0 4px 15px #29292410`. Dialogs use `0 14px 40px #17181620` over a dark translucent backdrop. Avoid strong card shadows and keep the canvas continuous.

## Shapes

The composer radius is 20px at standard desktop sizes, the main dialog 15px, menu 12px, button 8px, and navigation item 6px. The avatar is circular. The starburst is a custom SVG approximation made from 14 irregular-length radial strokes, not an official logo asset.

## Components

Vercel's actual `@ui-sdk/react` Button and Dialog components are imported through the shared `@study/ui` package. App-owned CSS supplies the visual treatment; Dialog supplies focus handling, Escape dismissal, and top-layer behavior.

- **Home:** serif greeting, starburst, composer, model selector, extended-thinking switch, file-name attachment chip, and incognito toggle.
- **Sidebar:** collapsible navigation, recent/starred chats, account menu, and local settings.
- **Chats:** searchable history, row selection, starring, and opening an existing conversation.
- **Conversation:** local send action, deterministic demo reply, copy, thumbs up/down, and a reply composer.
- **Announcement:** a closeable feature dialog with an HTML/CSS miniature composer and a suggested prompt action.

Routes are `/claude`, `/claude/chats`, and `/claude/conversation`. Chats persist in browser localStorage; incognito changes remain in memory and are discarded when incognito is turned off. Enter sends, Shift+Enter creates a new line. File attachment stores only the selected filename and does not read or upload contents. AI responses are deterministic demo text, with no API connection. Account, subscription, sharing, connector, voice, and project backends are outside the prototype scope.

## Do's and Don'ts

- Do preserve the warm canvas, restrained borders, and generous empty space.
- Do use serif typography only where it establishes the greeting, heading, or reading voice.
- Do label icon-only controls and maintain visible keyboard focus.
- Do distinguish actual observed screens from inferred conversation and responsive states.
- Don't add decorative gradients or tile the home screen with unrelated cards.
- Don't claim model selections invoke an AI service or that local preferences update a real account.
- Don't use the coral/white pair for small text or present fallback fonts as proprietary assets.
