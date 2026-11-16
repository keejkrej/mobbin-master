---
version: alpha
name: Replit — Projects and workspace study
description: Screenshot-derived dark projects gallery and light agent workspace, observed
  in Mobbin on November 16, 2026.
colors:
  primary: '#0088ff'
  primary-hover: '#0077e0'
  canvas: '#1e1e1e'
  sidebar: '#222222'
  card: '#242424'
  border: '#303030'
  control-border: '#454545'
  text: '#dedede'
  muted: '#a5a5a5'
  hover: '#2b2b2b'
  orange: '#f36c00'
  white: '#ffffff'
  light-canvas: '#f1f1ef'
  light-surface: '#f8f8f6'
  light-border: '#d9d9d3'
  light-text: '#262723'
  light-muted: '#696b65'
typography:
  heading:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4
  small:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 9px
    fontWeight: 400
    lineHeight: 1.4
  dialog-heading:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.3
  code:
    fontFamily: Courier New, monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 2
rounded:
  small: 5px
  medium: 8px
  card: 12px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  base: 16px
  large: 24px
  sidebar: 202px
  agent: 380px
  rail: 38px
  gallery-gutter: 13px
components:
  gallery:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
    typography: '{typography.body}'
  sidebar:
    backgroundColor: '{colors.sidebar}'
    textColor: '{colors.text}'
    width: '{spacing.sidebar}'
  project-card:
    backgroundColor: '{colors.card}'
    textColor: '{colors.text}'
    rounded: '{rounded.card}'
    typography: '{typography.label}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  input-border:
    backgroundColor: '{colors.control-border}'
    height: 1px
  metadata:
    textColor: '{colors.muted}'
    typography: '{typography.small}'
  navigation-hover:
    backgroundColor: '{colors.hover}'
  brand-mark:
    textColor: '{colors.orange}'
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.white}'
    rounded: '{rounded.small}'
    height: 28px
    typography: '{typography.label}'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  workspace:
    backgroundColor: '{colors.light-canvas}'
    textColor: '{colors.light-text}'
    typography: '{typography.body}'
  agent-pane:
    backgroundColor: '{colors.light-surface}'
    textColor: '{colors.light-text}'
    width: '{spacing.agent}'
  workspace-divider:
    backgroundColor: '{colors.light-border}'
    height: 1px
  workspace-metadata:
    textColor: '{colors.light-muted}'
    typography: '{typography.caption}'
  gallery-heading:
    typography: '{typography.heading}'
    textColor: '{colors.text}'
  dialog-heading:
    typography: '{typography.dialog-heading}'
  code-editor:
    typography: '{typography.code}'
---

# Replit design system

## Overview

This study contains two observed Replit surfaces: a dark Projects gallery and a light project workspace. The gallery organizes a dense collection of app thumbnails. The workspace divides the browser into a thin icon rail, an agent conversation column, and a broad tabbed work area. The shell stays understated so project content and workflow state remain easy to scan.

### Sources and uncertainty

Mobbin MCP references retrieved and visually inspected on November 16, 2026:

- [Projects gallery](https://mobbin.com/screens/f710e678-4ae8-42e8-80c8-0d4623c73f5b) — initial route and dark project cards; original at `references/screen-2.webp`.
- [Agent workspace and Workflows](https://mobbin.com/screens/fca46840-f48d-4b1b-b8f7-833ba47a1d31) — workspace shell, agent history, publishing card, and workflow list; original at `references/screen-1.webp`.

Exact tool metadata is preserved in `references/sources.json`. No official component library, font metadata, token files, or Replit source code was provided. Numeric tokens are screenshot-derived approximations; WebP compression can affect sampled colors. Original 1920px screenshots include a Mobbin attribution footer, which is retained in the source files and excluded from the live product layout. The gallery thumbnails are reconstructed DOM/SVG compositions rather than embedded screenshot slices.

The coffee preview, code editor, create dialogs, responsive layout, and runtime transitions are inferred additions that provide local interactivity. They are not verified Replit screenshots. The initial dark theme and light workspace reflect the two supplied references rather than a claim about a single official theme setting.

## Colors

The gallery uses `#1e1e1e` canvas, `#222222` sidebar, `#242424` thumbnail cards, `#303030` dividers, and `#454545` control outlines. Main text is `#dedede`, secondary metadata `#a5a5a5`, and hovered navigation `#2b2b2b`.

The workspace uses a warm gray `#f1f1ef` canvas, `#f8f8f6` controls and agent shell, `#d9d9d3` borders, `#262723` text, and `#696b65` metadata. Bright blue `#0088ff` is the primary action in both surfaces. Orange `#f36c00` identifies the Replit mark in the workspace.

White text on the inferred bright-blue primary button does not reach 4.5:1 for small text. That known reference-fidelity tradeoff is retained and reported by the official linter; it must be darkened for a strict AA production adaptation. It is not presented as accessible small-text contrast. Design tokens above are the normative values and are mirrored exactly in `tokens.json`; `tokens.css` contains matching runtime CSS variables.

## Typography

Inter is bundled locally through `@fontsource/inter` and approximates the screenshot's UI font. At standard desktop sizes, gallery headings use 22px medium weight, body 12px regular, card titles and controls 11px, and metadata 9–10px. Code uses Courier New at 12px with 2.0 line height. Typography and controls scale at widths above 1700px to approximate the original 1920px screenshots.

Small source typography is retained in the dense desktop interface. Mobile text and layouts are adapted where space requires it. Native controls and icon actions remain keyboard focusable with a visible blue focus outline.

## Layout

The desktop gallery has a 202px fixed sidebar, 80px horizontal page margins, four equal card columns, and 13px gaps. Card thumbnails have a 1.79 aspect ratio. At 1920px, the sidebar grows to 270px, the page margins to 107px, and gaps to 18px. Below 1200px the grid uses three columns; below 900px it uses two. Below 650px navigation becomes a drawer and content uses 16px side gutters.

The light workspace uses a 38px rail, 380px agent column, 34px top chrome, and a flexible Workflows pane. The agent conversation scrolls independently above its fixed composer. The workflow list expands inline to show commands and run results. On mobile, the agent pane opens over the work area so the main task retains usable width. Closed mobile drawers are inert and hidden from assistive technology. Open drawers contain keyboard focus; Escape closes them and restores focus to the opener. Desktop navigation remains available.

Routes are `/replit`, `/replit/workspace`, and `/replit/preview`. Clicking a gallery card opens the workspace while retaining its project name. Workspace tabs change views locally.

## Elevation & Depth

The gallery is nearly flat: one-pixel borders separate panels and cards. Strong shadows are reserved for dialogs, which use `0 15px 55px #00000040` over a dimmed backdrop. The workspace composer uses a faint `0 2px 3px #0000000a` shadow. Changes in neutral surface color communicate nesting in the agent cards and workflow details.

## Shapes

Cards use 12px corner radii, task containers 8–9px, and controls 5px. Avatars, status dots, and workflow badges are circular or pill-shaped. Project preview placeholders use simple SVG glyphs. The Replit mark is a hand-built three-block vector approximation, not an official asset export.

## Components

Buttons and dialogs use the actual Vercel `@ui-sdk/react` package through `@study/ui`; this study supplies visual styles. Dialog behavior includes focus containment, Escape dismissal, and focus recovery.

- **Projects gallery:** searchable cards, Published/Private filters, artifact-type filters, grid/list display, and a create-project dialog.
- **Agent pane:** source-matched activity and publishing cards, dismissible notices, suggested-task prompts, plan toggle, and deterministic local messages.
- **Workflows:** search, create a named workflow with a command, expand command details, run a timed local demonstration, collapse generated workflows, and remove user workflows.
- **Tools:** edit a preview heading and inspect a non-executing console example.
- **Preview:** a local coffee finder with text search, neighborhood filters, save controls, and an optional feedback widget.

Projects and workflows persist in browser localStorage. Run commands are shown as text and never executed. Agent replies are deterministic and do not call an AI service. Publishing, billing, invitations, domains, integrations, and voice input use explanatory dialogs and do not change a live account or send data elsewhere. Source screenshot deployment details and credit notices are fixture content, not claims about this environment.

## Do's and Don'ts

- Do preserve the distinct observed dark gallery and light workspace surfaces.
- Do keep project cards compact and use subtle dividers to organize the work area.
- Do provide clear local state changes for search, workflow execution, and preview editing.
- Do give icon-only controls accessible names and dialogs meaningful titles.
- Don't show a full screenshot as an interactive page or claim official tokens were extracted.
- Don't execute typed workflow commands or imply the demo publishes to Replit.
- Don't reuse the bright-blue/white pair for small text without addressing the documented contrast limit.
