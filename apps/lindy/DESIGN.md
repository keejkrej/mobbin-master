---
version: alpha
name: Lindy — Warm agent workspace study
description: An inferred design system from two Lindy web screens supplied by Mobbin
  MCP on November 16, 2026.
colors:
  primary: '#0097fa'
  primary-hover: '#0085dc'
  text: '#171b1d'
  muted: '#797e81'
  canvas: '#ffffff'
  sidebar: '#ffffff'
  hover: '#f3f4f5'
  border: '#e4e5e7'
  send-disabled: '#98b2ff'
  purple: '#7352d5'
  purple-surface: '#f0ebff'
  green: '#2bb86f'
  blue: '#4587d8'
  warm: '#fff3cf'
  peach: '#fbefe4'
  flow: '#fafbfc'
  selected: '#e6f9fd'
  selected-border: '#339cb2'
typography:
  heading:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
  node:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
  builder:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.75
  code:
    fontFamily: Courier New, monospace
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.6
rounded:
  small: 6px
  medium: 10px
  large: 15px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  base: 16px
  large: 24px
  sidebar: 242px
  builder: 380px
  inspector: 380px
  composer: 714px
components:
  canvas:
    backgroundColor: '{colors.canvas}'
  sidebar:
    backgroundColor: '{colors.sidebar}'
    width: '{spacing.sidebar}'
  navigation:
    textColor: '{colors.text}'
    typography: '{typography.body}'
    rounded: '{rounded.small}'
  navigation-selected:
    backgroundColor: '{colors.hover}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  home-warm-glow:
    backgroundColor: '{colors.warm}'
  home-peach-glow:
    backgroundColor: '{colors.peach}'
  heading:
    textColor: '{colors.text}'
    typography: '{typography.heading}'
  composer:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
    rounded: '{rounded.large}'
    width: '{spacing.composer}'
    padding: '{spacing.base}'
  send-disabled:
    backgroundColor: '{colors.send-disabled}'
    textColor: '{colors.canvas}'
    rounded: '{rounded.full}'
    width: 35px
    height: 35px
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.canvas}'
    rounded: '{rounded.small}'
    typography: '{typography.label}'
    height: 31px
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  suggestion-green-icon:
    textColor: '{colors.green}'
  suggestion-blue-icon:
    textColor: '{colors.blue}'
  metadata:
    textColor: '{colors.muted}'
    typography: '{typography.caption}'
  flow-canvas:
    backgroundColor: '{colors.flow}'
  flow-node:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
    rounded: 12px
    typography: '{typography.node}'
    width: 305px
    height: 46px
  flow-node-selected:
    backgroundColor: '{colors.selected}'
  flow-node-selected-outline:
    backgroundColor: '{colors.selected-border}'
    height: 1px
  builder:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
    typography: '{typography.builder}'
    width: '{spacing.builder}'
    rounded: 13px
  builder-code:
    typography: '{typography.code}'
  inspector:
    backgroundColor: '{colors.canvas}'
    width: '{spacing.inspector}'
  dialog:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
    rounded: '{rounded.large}'
    padding: 23px
  build-agent-icon:
    backgroundColor: '{colors.purple-surface}'
    textColor: '{colors.purple}'
    rounded: 3px
---

# Lindy design system

## Overview

Lindy combines a warm, spacious starting page with a compact workflow editor. A pale peach and yellow canvas surrounds the home prompt, while the editor uses white panels, a dotted canvas, slim connectors, and colored service icons. The home invites a request; the flow makes each step available for inspection.

### Sources and fidelity

Retrieved through Mobbin MCP on November 16, 2026. Original screenshots and source metadata are preserved in `references/`.

- [Home and agent composer](https://mobbin.com/screens/f7af1e0d-756c-4eee-b1fe-43043c2d07b1)
- [Email-agent flow editor and agent builder](https://mobbin.com/screens/edf04858-7158-4622-b420-97dea2e7737a)

This is an inferred design system, not an official Lindy token export. Observed elements include the home sidebar and composer, prompt chips, category strip, editor header, builder panel, four-step email workflow, cyan selected agent node, inspector, and bottom toolbar. Dimensions, fonts, colors, shadows, the reconstructed warm gradient, and icons are visual estimates. The references are 1920px wide, with a Mobbin footer excluded from the implemented product interface. No screenshot is used as the UI and no reference artwork is cropped. Template-card decoration and Gmail/service marks are simplified DOM/SVG approximations.

The reference inspector was loading. The local inspector replaces that transient state with a selection hint and editable node details. New-agent, configuration, test, and mobile dialogs, the My agents screen, task results, and responsive arrangements are inferred states. The home template illustrations and text below the visible source crop are an implementation extension.

## Colors

The home uses warm `#fff3cf` and peach `#fbefe4` translucent gradients over a white base. The editor canvas is `#fafbfc`; panels remain white. Text is `#171b1d`, secondary labels `#797e81`, dividers `#e4e5e7`, and hover surfaces `#f3f4f5`. The builder icon pairs purple `#7352d5` with `#f0ebff`. Bright blue `#0097fa` identifies the source's publish and test actions. A selected agent has a pale cyan `#e6f9fd` fill and `#339cb2` outline. Green and blue service icons organize prompt suggestions.

These values preserve the light appearance of the screenshots. White small text on the observed bright blue does not meet 4.5:1; muted labels are also below that threshold. The pale send control is a disabled state, so its white arrow is exempt from the active-control contrast requirement. These are documented fidelity tradeoffs, not a claim of complete WCAG AA compliance. Do not use the low-contrast pairs for longer reading text. `tokens.json` is an exact mirror of this document's YAML, while `tokens.css` provides runtime CSS properties.

## Typography

Inter is bundled locally through `@fontsource/inter`, with Arial as fallback. No proprietary Lindy font is supplied; the family is an approximation. The ordinary desktop heading is 32px/500, body 14px, labels and flow nodes 13px, and metadata 11px. Builder prose uses a relaxed 1.75 line height; inline code uses Courier New. At widths of 1700px and above the home heading, navigation, composer, flow nodes, and builder scale toward the source capture's 1920px proportions.

## Layout

At standard desktop widths, home has a 242px sidebar, a centered composer capped at 714px, and a heading starting around 22.5% of viewport height. Prompt chips wrap into centered rows. Categories and template cards start lower on the page, preserving the large blank area in the reference. At the original wide capture scale the sidebar is 322px and composer 952px.

The editor uses a 53px header, an overlaid 380px builder on the left, a centered vertical node lane, and a 380px inspector on the right. Wide-screen dimensions scale to a 70px header and 506px panels. The node lane maintains the source's substantial vertical gaps and aligned arrows. The toolbar stays near the bottom of the graph.

Below 1000px, builder and inspector use `display: none` rather than translated offscreen panels; Ask opens the builder in a native modal. Below 650px, home navigation also uses a native modal, the composer fits inside 15px gutters, the graph fits the viewport, and secondary header actions are hidden. Closed panels do not contain reachable keyboard controls. Modal Escape, focus containment, and focus return are provided by the SDK. These mobile rules are inferred from desktop references.

## Elevation & Depth

The home composer casts a restrained two-part shadow: `0 5px 4px #251b1012, 0 8px 18px #251b1008`. Editor panels use fine neutral borders and a soft shadow; the dotted canvas makes the graph legible without heavy cards. Modal dialogs sit over a translucent dark backdrop. Gradient warmth is limited to home and does not extend to the graph.

## Shapes

Small controls use 6px corners, nodes and panels around 12–13px, and the home composer 15px at ordinary desktop sizes. Chips use a full 999px radius. Wide-screen dimensions scale proportionately. Nodes have simple rounded rectangles; connectors are thin vertical lines with small arrowheads. The selected response-agent card grows vertically to show a brief instruction preview and integrations.

## Components

Actual Vercel `@ui-sdk/react` Button and Dialog primitives are imported through `@study/ui`; local CSS provides the product-specific appearance. Dialogs use native top-layer behavior and capture the triggering control for focus restoration.

- **Home composer:** editable prompt, Enter to create and Shift+Enter for a newline, Build apps/Build agents toggle, filename attachment chip, disabled/enabled send state, and suggested prompts.
- **Navigation and My agents:** home and agent-list switching, opening an existing agent, and a new-agent dialog. Created agent names and requests persist in browser localStorage.
- **Flow editor:** four editable nodes, an inspector, one-step undo/redo, zoom/fit, starring, enabling, renaming, and a builder conversation area.
- **Testing:** sample-email input, pending and completed results, a deterministic knowledge-answer or escalation path, and a Tasks view with local runs.
- **Supporting dialogs:** help, sharing, publish information, and mobile navigation/builder access. Voice capture is described as unavailable; attachments store only a filename.

Entry routes are `/lindy`, `/lindy/flow`, and `/lindy/agents`; view changes within an entry use local React state. All new requests use the observed email workflow template. Agent list metadata persists locally; node edits, builder messages, enabled/starred state, and test history last for the current session. Replies and test results are deterministic local simulations. Gmail, Slack, knowledge uploads, voice, publishing, and live AI are not connected. No email is sent.

## Do's and Don'ts

- Do keep the home heading, prompt, and large blank areas visually dominant.
- Do preserve the editor's panel boundaries, small type, vertical connectors, and selected-node outline.
- Do label icon controls, keep visible focus styles, and use modal dialogs for narrow-screen navigation.
- Do identify inferred interaction states and fallback fonts honestly.
- Don't replace the interface with a screenshot or stretch the Mobbin footer into the page.
- Don't add unrelated dashboard cards or strong gradients to the workflow editor.
- Don't present local test results as real email delivery, connected services, or AI execution.
- Don't reuse the source's low-contrast blue/white pair for long-form or critical text.
