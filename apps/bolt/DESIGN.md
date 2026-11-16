---
version: alpha
name: Bolt.new interface study
description: Screenshot-informed dark prompt builder and white portfolio preview.
colors:
  primary: "#438DF4"
  primary-hover: "#337BE0"
  canvas: "#101010"
  surface: "#171717"
  raised: "#262626"
  border: "#343434"
  text: "#FAFAFA"
  muted: "#AAAAAA"
  subtle: "#828282"
  preview: "#FFFFFF"
  preview-text: "#202735"
  preview-muted: "#515560"
  preview-accent: "#365FE3"
  preview-subtle: "#F8FAFC"
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -1.5px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
  preview-title:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -1.15px
  preview-body:
    fontFamily: Inter
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: -0.5px
  preview-heading:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.7px
rounded:
  sm: 5px
  md: 8px
  lg: 12px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  header-height: 52px
  rail-width: 48px
components:
  app-shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
  composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    typography: "{typography.body-md}"
  composer-placeholder:
    textColor: "{colors.subtle}"
  user-message:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    padding: "{spacing.md}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.preview}"
    rounded: "{rounded.sm}"
    typography: "{typography.label-md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  supporting-text:
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  portfolio-shell:
    backgroundColor: "{colors.preview}"
    textColor: "{colors.preview-text}"
  portfolio-body:
    textColor: "{colors.preview-muted}"
    typography: "{typography.preview-body}"
  portfolio-button:
    backgroundColor: "{colors.preview-accent}"
    textColor: "{colors.preview}"
    rounded: "{rounded.md}"
  case-studies:
    backgroundColor: "{colors.preview-subtle}"
    textColor: "{colors.preview-text}"
    typography: "{typography.preview-heading}"
---

## Overview

Bolt.new uses a near-black, mostly empty canvas to make a single prompt field the focus. A faint cool glow sits at the top of the home page. After a project opens, the same dark shell becomes a compact conversation and browser-preview workspace. The white portfolio inside the preview is project content, distinct from the Bolt interface.

### Sources and evidence

Three Mobbin web references were retrieved and inspected on November 16, 2026. The retrieval date does not establish their original capture date.

- [Prompt home and team invitation](https://mobbin.com/screens/05bdef65-e214-4022-a52c-db3aa256d2ec), retained at `references/screen-1.webp`.
- [Populated prompt with a design attachment](https://mobbin.com/screens/b2e0686a-c322-42fd-9aec-066225463ac3), retained at `references/screen-2.webp`.
- [Builder, project rename, and portfolio preview](https://mobbin.com/screens/f87f1d94-ab7c-4a89-8089-f7fd6eaaa490), retained at `references/screen-3.webp`.

Original tool metadata is in `references/sources.json`. All sources are 1920 × 1320, including a 120px Mobbin attribution footer excluded from the live page. The home composition, draft attachment, split workspace, preview typography, and rename treatment are observed. Numeric tokens, font substitution, responsive rules, code tab, editing forms, and secondary dialogs are inferred. This is an implementation design system, not an official Bolt token export.

## Colors

The main canvas is `#101010`; the composer and workbench use `#171717`; user messages and secondary controls use `#262626`. Borders are `#343434`, primary text `#FAFAFA`, supporting text `#AAAAAA`, and placeholders `#828282`. Blue `#438DF4` marks publishing and focus, with `#337BE0` for hover. The home glow uses a low-opacity blue-gray radial gradient and is decorative rather than a general background style.

The embedded portfolio uses white, near-black `#202735` headings, gray `#515560` copy, blue `#365FE3` highlights, and pale `#F8FAFC` case-study surfaces. User-selectable purple, green, and pink are inferred preview-editing alternatives and do not recolor the Bolt shell.

The source-like white-on-blue publishing button is below the 4.5:1 small-text target. The official linter reports this retained fidelity tradeoff; production use should darken the action background. The portfolio's blue button provides stronger contrast. Selection is also communicated with text, checks, or native tab state. The YAML is normative and exactly mirrored in `tokens.json`; runtime values are provided by `tokens.css`.

## Typography

Inter 400, 500, 600, and 700 are bundled locally as a practical substitute for the unavailable original font. The Bolt wordmark is bold, italic live text with a skew, rather than the official logo artwork. At standard desktop sizes, the home title is 44px / 1.2 with -1.5px tracking; supporting copy is 17px / 1.5; the prompt and conversation are 14px. Compact shell controls are 11–12px. The portfolio title is 44px / 1.3 and its body 19px / 1.65.

Above 1700px, the title increases to 56px and the composer to 18px to approximate the 1920px reference. The portfolio title becomes 58px and body 25px. Mobile uses a 32px home title, 13px composer, and 33px portfolio title. The token scale describes the standard desktop presentation; large and mobile variants are explicit CSS overrides.

## Layout

The home header is 52px high. The hero begins about 22% of the viewport height below the header, with a centered 480px composer and 580px suggestion group. Imports sit 41px below the composer. Account controls anchor the bottom left; footer links and a dismissible invitation appear on the right. At large desktop sizes, the header becomes 68px and the composer 594px, matching the supplied raster proportions.

The builder keeps a 48px left rail, 16px outer spacing, a conversation taking 33.8% of the available width, and a flexible workbench. Conversation and preview scroll independently. The composer remains at the bottom of the conversation, while workbench tools stay above the preview. At large desktop sizes the rail is 64px and gaps 21px. The preview itself is live HTML, not an iframe or screenshot.

Below 700px, the home wraps naturally, the invitation joins the page flow below the suggestions, the account button moves into the header, and the workbench fills the builder screen. Conversation opens in an actual SDK modal with focus containment, Escape dismissal, and focus return. The closed desktop conversation is `display:none` at that breakpoint, so it has no hidden tab stops. Project history and navigation also use a modal; no offscreen drawer remains tabbable. Mobile layouts are inferred from desktop evidence.

Routes are `/bolt`, `/bolt/draft`, and `/bolt/builder`. Draft loads the observed prompt and reference thumbnail. Builder opens the observed sample brief and portfolio. Home submission shows the same prepared portfolio with the user's prompt.

## Elevation & Depth

One-pixel borders and subtle changes in dark surfaces define most hierarchy. The composer adds only `0 1px 2px #0002`. Dialogs use a `0 20px 80px #0007` shadow and dimmed native backdrop. The observed rename popover is represented as a small, top-centered modal to preserve keyboard behavior. The invitation and status notices use compact shadows. Keep the white project preview flat and spacious.

## Shapes

Small shell controls and the composer use 5px corners; the workbench and portfolio actions use 8px; dialogs use 10px. Import and suggestion chips are full pills. The avatar and attachment remove button are circular. The design uses restrained rounding rather than oversized cards.

## Components

Actual Vercel UI SDK Button, Dialog, and Tabs are imported through `@study/ui`. Styles and tokens belong to this app. SDK dialogs provide modal focus containment, Escape dismissal, and focus return. Tabs provide arrow-key switching between Preview and Code.

- **Home composer:** editable prompt, Enter submit, Shift+Enter newline, local attachment preview/removal, deterministic prompt enhancement, and starter commands. File input is not uploaded or executed. Object URLs are revoked when the component unmounts. Import dialogs add a URL to the prompt without contacting GitHub or Figma.
- **Builder:** a short progress state opens a prepared portfolio. The conversation displays the user's prompt, reference-style response, and explicit local-template disclosure. Follow-ups containing a quoted headline or named accent change that preview. Other messages explain the available local edit controls. No AI service, terminal, or arbitrary code execution is connected.
- **Project and preview:** rename, responsive device width, refresh-to-top, expanded preview, editable designer name/headline/accent, portfolio navigation, case-study dialogs, and a local-only contact form. Case-study illustrations and below-fold sections are inferred DOM compositions. The source's employer names are sample portfolio copy, not statements about the user.
- **Code and export:** Code shows a compact HTML export reflecting the current name, title, and accent. Download exports that standalone file. It contains the headline and a simplified case-study placeholder, not the full interactive builder or all portfolio cards. Text is HTML-escaped. Publishing shows local readiness, copies the study route, or downloads HTML; no hosting or live sharing occurs. Copied links open the default sample and do not transmit session edits.
- **Secondary actions:** integration selections, invitation acceptance, account, help, footer, and navigation controls produce local state changes or explanatory dialogs. The invitation team name is neutralized to `design-team`. Acceptance explicitly reports that no account was created. State lasts for the current page session.

### Asset provenance and fidelity limits

`public/assets/design-reference.webp` is cropped from screen 2 at `(696,522)-(788,613)`. It contains only the small white design-reference image, excluding the remove control and surrounding composer. Exact provenance is also retained in `references/asset-provenance.json`. No whole screen is rendered as UI. The original image's small size limits thumbnail detail; the wordmark and social icons are approximations.

The builder screenshot's top workbench area is mostly blank. This reconstruction adds compact Preview/Code tabs and Edit preview to expose useful local actions. The rename state opens on demand. The reference's static seven-second thought label is retained with an expandable explanation of its fixture origin. These differences, font metrics, responsive adaptations, and inferred unseen states prevent a claim of exact pixel parity across all states.

## Do's and Don'ts

- Do preserve the open home composition and contrast between dark shell and white portfolio.
- Do keep prompts editable and give each primary action a visible local result.
- Do provide accessible names, visible focus, tab navigation, and modal Escape behavior.
- Do keep source links, crop coordinates, and observed-versus-inferred distinctions.
- Don't embed screenshots as the live interface or include the Mobbin footer as product UI.
- Don't claim the preview calls an AI service, imports repositories, deploys a site, or creates accounts.
- Don't treat inferred tokens, substitute typography, or the exported template as official Bolt assets.
- Don't reuse the known white-on-blue small-text contrast without addressing it for production.
