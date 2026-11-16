---
version: alpha
name: Perplexity — Search and connectors study
description: An inferred Perplexity web design system from Mobbin search-home and connector-management references retrieved November 16, 2026.
colors:
  primary: '#09666a'
  canvas: '#fbf7f6'
  sidebar: '#f2eeeb'
  surface: '#fffbfb'
  canvas-connectors: '#faf8f6'
  sidebar-connectors: '#f1f0ec'
  text: '#22221f'
  muted: '#706f6b'
  border: '#dcd9d5'
  hover: '#eae7e2'
  feature: '#00686b'
  feature-deep: '#071e20'
  feature-text: '#e7f3f3'
  dark: '#25251f'
typography:
  wordmark:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 47px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -2.9px
  page-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 29px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.7px
  section-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 21px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.5px
  dialog-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 19px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.3px
  composer:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.45
  answer:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.85
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  feature-label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
rounded:
  small: 8px
  medium: 12px
  large: 16px
  composer: 17px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  medium: 12px
  base: 16px
  large: 24px
  xl: 32px
  sidebar: 202px
  composer: 650px
  answer: 740px
components:
  canvas:
    backgroundColor: '{colors.canvas}'
  canvas-connectors:
    backgroundColor: '{colors.canvas-connectors}'
  sidebar:
    backgroundColor: '{colors.sidebar}'
    width: '{spacing.sidebar}'
  sidebar-connectors:
    backgroundColor: '{colors.sidebar-connectors}'
  sidebar-item:
    textColor: '{colors.muted}'
    typography: '{typography.body}'
    height: 41px
  sidebar-item-active:
    backgroundColor: '{colors.hover}'
    textColor: '{colors.text}'
  wordmark:
    textColor: '{colors.text}'
    typography: '{typography.wordmark}'
  composer:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    typography: '{typography.composer}'
    rounded: '{rounded.composer}'
    width: '{spacing.composer}'
  feature-search:
    backgroundColor: '{colors.feature}'
    textColor: '{colors.feature-text}'
    typography: '{typography.feature-label}'
    rounded: '{rounded.medium}'
  feature-computer:
    backgroundColor: '{colors.feature-deep}'
    textColor: '{colors.feature-text}'
    rounded: '{rounded.medium}'
  feature-description:
    typography: '{typography.caption}'
  button-primary:
    backgroundColor: '{colors.dark}'
    textColor: '{colors.surface}'
    typography: '{typography.body}'
    rounded: '{rounded.small}'
  button-share:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    typography: '{typography.caption}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  answer:
    textColor: '{colors.text}'
    typography: '{typography.answer}'
    width: '{spacing.answer}'
  answer-title:
    typography: '{typography.page-title}'
  connectors-heading:
    typography: '{typography.section-title}'
  dialog-heading:
    typography: '{typography.dialog-title}'
---

## Overview

Perplexity makes search the primary action: a narrow utility rail, large open canvas, centered wordmark, and a wide composer with controls along its lower edge. Most of the interface uses warm neutrals. Teal is concentrated in the search feature card and small action accents, with a nearly black green used for Computer.

This is an inferred study, not Perplexity's original design system or an official application. Sources were retrieved and visually inspected on **November 16, 2026**. Retrieval date does not establish when Mobbin captured the product.

| Reference | Observed surface | Local evidence |
| --- | --- | --- |
| [Search home and sign-in panel](https://mobbin.com/screens/fa617be8-24d4-49d5-88e0-94b67f876530) | Sidebar, topic navigation, wordmark, composer, feature cards, floating sign-in surface | `references/screen-1.webp` |
| [Customize: connected services](https://mobbin.com/screens/fa09641f-4b4a-468d-b26d-1a4c27d128f7) | Customize tabs, title and search, pill filters, connector cards and connected indicators | `references/screen-2.webp` |

The complete returned metadata is in `references/sources.json`. The 1920px-wide screenshots include a Mobbin footer at approximately y=1205; it is excluded from the app layout. The app is rendered from React components. The Perplexity mark and Gmail/health connector icons are cropped from unobstructed image regions; crop provenance is below. The wordmark is live text. The answer, source details, dialogs, responsive rules, and additional connector states are inferred because those states are absent from these two references.

## Colors

Large-area samples from the home capture produced canvas `#fbf7f6`, sidebar `#f2eeeb`, and composer surface `#fffbfb`. The connector capture has slightly different large surfaces: canvas `#faf8f6` and sidebar `#f1f0ec`. Both are retained as separate tokens instead of treating one image as a universal brand palette. Teal, text, border, and hover values are visually inferred.

The primary accent is teal `#09666a`. The search feature card uses `#00686b`, the Computer feature card `#071e20`, and primary buttons `#25251f`. Keep most text near black and secondary controls quiet. The feature gradients use translucent color to approximate the photographic tone of the source. Component backgrounds are tonal rather than saturated outside the two feature cards.

`tokens.css` contains runtime variables; `tokens.json` is an exact JSON representation of this file's YAML front matter. The front matter uses the Google DESIGN.md alpha format.

## Typography

Inter is bundled locally with 400, 500, and 600 weights. It substitutes for the product's proprietary typeface, which Mobbin does not supply. The wordmark uses live text at 47px with -2.9px tracking; its custom letterforms are therefore an approximation. Body and navigation are 14px, the composer 16px, answer prose 15px, and metadata 12px. Normal prose uses ample line height, while labels remain compact.

At desktop widths of at least 1700px, key dimensions approach the original source raster: 60px wordmark, 18px navigation, 20px composer text, and 26px connector heading. Below 680px, the wordmark is 44px and the composer 15px. These responsive scales are implementation choices, not extracted official values.

## Layout

The ordinary desktop sidebar is 202px wide and fixed to the left. Its account area stays at the bottom. The home composer is centered in the remaining width, capped at 650px, with the wordmark above and two feature cards 32px below. The home content begins around 30% of viewport height, preserving the reference's substantial blank space. The top topic row is centered. A 266px sign-in panel sits at bottom right on wider desktops and is omitted below 1350px to avoid overlap; the sidebar still offers sign-in.

At 1700px and wider, the sidebar becomes 254px, composer 812px, and floating panel 383px, closely following the 1920px screenshots. Connector content is centered at 1100px, expanding to 1392px at the large breakpoint. Connector cards use three columns on wide screens, two below 1350px, and one below 900px.

Below 680px the sidebar starts collapsed and becomes a keyboard-contained drawer with an inert background. Topic and Customize navigation can scroll horizontally within their own row. The composer fits within 14px side gutters. The answer view uses a 740px reading column and a pinned follow-up composer, with enough bottom padding to keep the final content reachable.

## Elevation & Depth

Use flat tonal surfaces for the main canvas and sidebar. Borders are fine and slightly darker than the surface. The composer adds a faint `0 1px 2px #0000000c` shadow. The sign-in panel uses `0 2px 4px #0000000c`; connector cards use a smaller edge shadow. Dialogs sit in the native browser top layer with a translucent backdrop and a `0 16px 70px #0003` shadow. Popups are inferred states and should remain visually consistent with the source surfaces.

## Shapes

The composer uses a 17px radius, expanding to 21px at large desktop sizes. Feature and connector cards use 12px, dialog corners 16px, small controls 8px, and filter/search-mode pills full rounding. Send and voice controls are circular. The sidebar's selected row uses a soft 14px radius. Avoid sharp rectangular containers in the search flow.

## Components

- **Sidebar:** New, Computer, Spaces, Artifacts, Customize, History, and account actions all change local state. Search history reopens previous questions. Saved answers appear under Artifacts. New Spaces appear in the sidebar.
- **Composer:** An editable textarea supports Enter to search and Shift+Enter for a newline. The lower toolbar controls sources, search mode, model, and voice preview. Search switches into an answer state and preserves the chosen model and source selection. The voice preview inserts a sample phrase without recording audio.
- **Answer:** Local prepared content demonstrates a search result, including three solar-energy source previews when Web is enabled for a solar question. Sources open a detail dialog with the original public URL. Other queries receive an explicitly local sample reply and no invented source matches. Follow-up searches, copy, feedback, saving, and model changes all have visible outcomes. No live search or model API is called.
- **Connectors:** The default Connected tab recreates the two observed cards. Search, filter pills, and category selection narrow the cards. Connector details toggle local connection state. Custom connector submission adds a local card; it does not request a remote account or contact a server.
- **Sign-in:** The floating panel and dialog preserve the reference's hierarchy. Email input creates only a local demo identity. Social buttons prefill that identity; no account authentication takes place. No real reference account data is reused.
- **SDK:** Buttons use actual `@study/ui` exports from Vercel UI SDK. Answer/Sources navigation uses `Tabs`, `TabsList`, `TabsTab`, and `TabsPanel`. All modals use `Dialog`, `DialogContent`, `DialogTitle`, `DialogDescription`, and `DialogClose` for native focus containment and Escape dismissal.
- **Assets:** `public/assets/mark.webp` is cropped from screen 1 at `(21,19)-(50,52)`; `gmail.webp` from screen 2 at `(428,281)-(478,334)`; `health.webp` from screen 2 at `(884,278)-(940,333)`. The monochrome mark uses CSS grayscale/contrast with multiply blending to avoid showing the crop’s original background on other surfaces. These are small logo/icon assets only. Full screenshots are retained as reference evidence and never rendered as interface panels.

## Do's and Don'ts

- Do preserve the open center area, restrained wordmark, and lower composer toolbar.
- Do use teal sparingly and keep the source's warm neutral surfaces distinct.
- Do use visible keyboard focus, accessible names for icon controls, and dismissible dialogs.
- Do label prepared replies and local account/connector previews honestly.
- Don't treat sampled screenshot colors, scaled dimensions, or the Inter substitution as official brand tokens.
- Don't simulate current web research or cite unrelated sources as support for an arbitrary reply.
- Don't include Mobbin's attribution footer inside the product interface or use full screenshots as working UI.
