---
version: alpha
name: Cartesia voice research website study
description: A screenshot-derived green and serif marketing system with local voice
  and transcript interactions.
colors:
  primary: '#00512b'
  on-primary: '#ffffff'
  paper: '#f9f9f9'
  ink: '#1d201b'
  accent: '#389955'
  soft: '#f1f0ec'
  border: '#e1e2dc'
  muted: '#5b6059'
  on-hero: '#f4f5ec'
  hero-copy: '#b8cbb9'
typography:
  hero:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.9px
  mission:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: -0.45px
  section:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 25px
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: -0.1px
  feature:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.2
  dialog:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.5px
  hero-body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 23px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.3px
  mission-body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.34
    letterSpacing: -0.25px
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.36
  label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.25
  small:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 6px
  md: 9px
  lg: 15px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  header: 61px
  section-divider: 39px
  frame-maximum: 1584px
components:
  primary-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.sm}'
    typography: '{typography.label}'
    height: 34px
  page:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
  hero:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-hero}'
    rounded: '{rounded.lg}'
    typography: '{typography.hero}'
  hero-description:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.hero-copy}'
    typography: '{typography.hero-body}'
  accent-heading:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.accent}'
    typography: '{typography.section}'
  feature-panel:
    backgroundColor: '{colors.soft}'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
  supporting-text:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.muted}'
    typography: '{typography.small}'
  grid-stroke:
    backgroundColor: '{colors.border}'
    width: 1px
  industry-tab:
    backgroundColor: '{colors.soft}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
  dialog:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: 13px
    typography: '{typography.dialog}'
---

# Cartesia

## Overview

Cartesia uses a restrained research-lab identity: a warm off-white canvas, thin structural grid lines, a forest-green announcement panel, serif editorial headings, and expressive line illustrations. The primary visual contrast comes from the green launch hero against the open page, followed by a large architectural illustration that turns a software use case into a physical scene.

### Evidence and scope

The connected Mobbin MCP supplied four exact Cartesia website sections, retrieved and visually inspected on November 16, 2026. The retrieval date does not establish when the original product was captured.

| Reference | Observed material | Retained source |
| --- | --- | --- |
| [Hero and mission](https://mobbin.com/sites/sections/ee414a56-22ee-417e-a5e4-b6f5071465d2) | Green Sonic-3.5 / Ink-2 panel, header, serif mission, industry tabs | `references/section-1.webp` |
| [Environment demo](https://mobbin.com/sites/sections/30259f3f-32d7-44a1-9847-f859443571e9) | Office illustration, transcription heading, small Listen in card | `references/section-2.webp` |
| [Financial services](https://mobbin.com/sites/sections/3d0d75f1-0794-4a39-ab47-cf46df0b2c68) | Warm gray panel, office-floor-plan artwork, finance copy | `references/section-3.webp` |
| [Research statement](https://mobbin.com/sites/sections/5d435d51-0e0a-4946-b512-15b4efd875c4) | Two-column research statement, green emphasized text, small figure | `references/section-4.webp` |

The original screenshots, provider metadata, and exact artwork crop coordinates remain in `references/`. The first three sources are 1920×1325; the research crop is 1920×466. Each includes a Mobbin attribution footer, which is retained in the source but excluded from product UI. No unrelated site is used as a substitute.

Colors, font metrics, logo geometry, and responsive behavior are inferred. Georgia and Inter are explicit font substitutes. The rendered page joins individually captured sections into one coherent scroll layout; their original ordering is not independently verified. Product claims such as “#1” and the named model versions are transcribed marketing copy from the capture, not verified rankings or claims of current availability. Alternate industry copy, dialog content, environment choices, and footer are authored extensions.

## Colors

The implemented palette uses paper #f9f9f9, near-black #1d201b, forest green #00512b, and accent green #389955. The main hero uses pale #f4f5ec headings and #b8cbb9 supporting text. Feature and research panels use warm gray #f1f0ec. Thin #e1e2dc lines divide the page and create decorative hatch bands.

Tokens are estimates from inspected captures rather than an official design-token export. `tokens.json` exactly mirrors the YAML front matter, while `tokens.css` supplies matching runtime color and core dimension values. The accent green is reserved for large serif headings; its contrast on paper is below the 4.5:1 requirement for small text but above the 3:1 large-text threshold. The official linter reports 3.41:1 against its fixed 4.5:1 check; the standard 25px heading, and its minimum 24px responsive size, qualify as large text and meet the 3:1 threshold. Product interaction labels predominantly use the darker green.

## Typography

Georgia / Times New Roman provide the serif editorial voice. Inter is locally bundled at 400, 500, and 600 and replaces the source's unavailable sans-serif. These substitutions, along with the reconstructed SVG mark, prevent a claim of pixel-identical typography or official brand assets.

At the standard 1440px desktop scale, the hero title is 48px with -0.9px tracking and 1.1 line height; the mission is 36px; section headings are 25px; and feature titles are 24px. Hero supporting copy is 23px, mission copy 18px, other body copy 15px, controls 14px, and small labels 12px. At 1700px and above, the page scales toward the reference proportions: 64px hero, 48px mission, 33px section headings, and 30px hero supporting copy. Mobile uses a 38px hero and 25–28px editorial headings.

## Layout

The desktop frame is 82.5% of the viewport, capped at 1584px, with a hairline border on both sides. At 1440px, the header is 61px high and has 46px internal side padding. The hero has a 15px frame inset and a minimum 366px green panel. The mission uses two columns with generous vertical padding and a broad central gap.

Industry headings and tabs share a row; the panel beneath is roughly 35% text and 61% artwork. The transcription section deliberately separates its heading, environment selectors, illustration, and small listening card. The research statement returns to two balanced editorial columns. Hatch bands, grid intersections, and flat panel boundaries provide the visual rhythm.

Below 1000px, header navigation is replaced by a UI SDK modal. Below 650px, the frame uses 12px outer gutters, hero text wraps, editorial content stacks, artwork becomes full width, and the demo card follows the office illustration. Closed navigation is absent from keyboard access; the SDK contains focus, handles Escape, and returns focus to the opener. All mobile arrangements are inferred because these sources are desktop-only.

## Elevation & Depth

The site is predominantly flat. The listening card uses a restrained `0 2px 3px #0002` shadow; secondary buttons use a nearly invisible `0 1px 2px #00000004` shadow. Dialogs use `0 25px 100px #001e163b`, a dim green backdrop, and 3px backdrop blur. Decorative hatch bands are one-pixel repeated gradients.

The hero's subtle texture is cropped from a clean part of the source background, repeated behind real HTML text. Its opacity and scaling are an approximation of the visible pattern. The static reference cannot establish motion. The only added animation is the browser-voice waveform during playback; the reduced-motion query disables animation, transitions, and smooth scrolling.

## Shapes

The green hero has 15px desktop corners, increasing to 20px at the source-size breakpoint. Basic buttons use 6px corners, selected tabs 9px, dialogs 13px, and the listening card 10px. Industry and research panels remain square. The Cartesia mark is a simplified inline vector; the wordmark is real serif text.

Artwork is kept as separate raster assets, with its source backgrounds matched to the surrounding warm page surfaces. The finance illustration has a rounded building outline, while the office illustration uses sharp, angular figures and fine green strokes. These source shapes are preserved through asset crops, not redrawn as generic dashboard cards.

## Components

Actual Vercel UI SDK Button, Dialog, and Tabs are imported through `@study/ui`. Tabs expose semantic selection and arrow-key behavior. Dialogs have accessible titles, Escape dismissal, focus containment, and explicit return-focus targets. Replacing dialog content refocuses the dialog heading if the previous control was removed.

- **Header and navigation:** Products opens model choices; Resources opens section links and a research overview; Languages opens the voice playground. Customers scrolls to the industry section. Pricing opens an account-free model exploration chooser without invented prices. The research overview and model chooser are inferred dialog states.
- **Industry tabs:** Finance reproduces the observed text and illustration. Healthcare and Government switch to clearly authored use-case descriptions and contact interests. The finance artwork is retained across these tabs because no exact alternate illustration was supplied.
- **Environment demo:** The initial office illustration and small card match the source. Listen in reveals a fixed local transcript. Audio plays only if a matching browser speech voice with `localService: true` is available; otherwise the transcript remains useful and the card states that audio is unavailable. City and café options use authored transcript samples with the same observed office artwork.
- **Voice playground:** Sonic accepts editable text, voice direction, language, and speed. Preview script produces a readable local preview. Optional playback uses the browser SpeechSynthesis API, explicitly labeled as browser voice rather than Cartesia synthesis. Voice directions map to pitch presets; only a matching local browser language voice is used; remote voices and the browser default fallback are never selected. Ink displays fixed environment transcripts and performs no recording or transcription. Copy exports only the visible text to the clipboard after a click.
- **Contact request:** A local form validates name/email, then displays a review summary. It supports editing and copying the draft. It sends no message and changes no external account or contact record.
- **State:** Inputs and previews live in React state for the current page session. The page does not persist contact details or scripts. Closing dialogs stops browser speech. All user text renders as React text, never injected HTML.

### Asset provenance

`references/asset-provenance.json` records XYXY crop coordinates. `hero-texture.webp` is the text-free strip `(210,120)-(1710,175)` in section 1. `office.webp` is `(852,438)-(1691,1041)` in section 2; `finance.webp` is `(789,390)-(1693,955)` in section 3; `research.webp` is the small decorative figure `(1577,202)-(1700,346)` in section 4. Every crop excludes interface labels and controls. All headings, buttons, menus, inputs, cards, line patterns, and layout are real DOM/CSS. No complete screenshot or section is used as the page.

## Do's and Don'ts

- Do preserve the contrast between the forest-green hero and open editorial sections.
- Do keep serif headings, thin grid lines, generous spacing, and the exact source artwork.
- Do use dark green for small interactive text and reserve the brighter green for large headings.
- Do label browser audio, fixed transcript samples, and unsent contact drafts accurately.
- Do retain keyboard focus, closed-menu isolation, and reduced-motion support.
- Don't describe screenshot-derived tokens or mobile layouts as official Cartesia specifications.
- Don't imply that the playground calls Cartesia, records audio, or generates AI speech.
- Don't invent current prices, benchmark evidence, or unobserved alternate artwork.
- Don't flatten the working interface into a screenshot.
