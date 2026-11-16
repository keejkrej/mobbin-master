---
version: alpha
name: Giga — Forest and conversation study
description: A Mobbin-grounded marketing interface combining Giga’s forest-era hero
  with adapted newer voice and omnichannel sections.
colors:
  primary: '#ffffff'
  ink: '#101514'
  canvas: '#041326'
  text: '#eff3f4'
  muted: '#aeb9c4'
  border: '#344354'
  sky: '#4c6c7c'
  horizon: '#a59b96'
  forest: '#0b1618'
  blue: '#31a8e8'
  violet: '#703b80'
  rust: '#8b4d3a'
  phone: '#695047'
  bubble: '#101e2e'
  danger: '#ff333c'
  success: '#287954'
typography:
  hero:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 66px
    fontWeight: 400
    lineHeight: 1.15
  section:
    fontFamily: Geist Pixel Line, Courier New, monospace
    fontSize: 46px
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  eyebrow:
    fontFamily: Courier New, monospace
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.3
  chat:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.65
  dialog-title:
    fontFamily: Georgia, Times New Roman, serif
    fontSize: 34px
    fontWeight: 400
    lineHeight: 1.1
  dialog-body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  small: 8px
  card: 20px
  full: 999px
spacing:
  xs: 4px
  small: 8px
  base: 16px
  large: 24px
  gutter: 43px
  section: 110px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.ink}'
    rounded: '{rounded.full}'
    typography: '{typography.navigation}'
    height: 41px
  canvas:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
  metadata:
    textColor: '{colors.muted}'
    typography: '{typography.eyebrow}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  hero-sky:
    backgroundColor: '{colors.sky}'
  hero-horizon:
    backgroundColor: '{colors.horizon}'
  hero-foreground:
    backgroundColor: '{colors.forest}'
  hero-heading:
    textColor: '{colors.primary}'
    typography: '{typography.hero}'
  section-heading:
    typography: '{typography.section}'
  section-copy:
    typography: '{typography.body}'
  section-marker:
    backgroundColor: '{colors.blue}'
    width: 5px
    height: 5px
  conversation-glow:
    backgroundColor: '{colors.violet}'
  voice-marker:
    backgroundColor: '{colors.rust}'
    width: 5px
    height: 5px
  phone:
    backgroundColor: '{colors.phone}'
    width: 310px
  chat-bubble:
    backgroundColor: '{colors.bubble}'
    textColor: '{colors.text}'
    typography: '{typography.chat}'
    rounded: 14px
  end-call:
    backgroundColor: '{colors.danger}'
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
    height: 35px
  start-call:
    backgroundColor: '{colors.success}'
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
    height: 35px
  dialog:
    rounded: '{rounded.card}'
    padding: 30px
  dialog-heading:
    textColor: '{colors.ink}'
    typography: '{typography.dialog-title}'
  dialog-description:
    typography: '{typography.dialog-body}'
  input:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.ink}'
    rounded: '{rounded.small}'
    typography: '{typography.label}'
    height: 42px
---

# Giga design system

## Overview

Giga’s forest-era home opens with a mountain valley and pine branches surrounding a large white serif statement. Navigation is quiet, the announcement is a translucent capsule, the main action is a white pill, and customer marks sit near the dark foreground. The lower product sections move into deep navy, pixel typography, glowing gradients, and live conversation examples.

### Sources and fidelity

Mobbin MCP sections retrieved and visually inspected on November 16, 2026:

- [Forest hero](https://mobbin.com/sites/sections/f11b7c73-1f62-4c2e-a5c1-bf117f99dcd5)
- [Voice-agent section](https://mobbin.com/sites/sections/a751e385-975b-48dc-9981-be7b83f2a150)
- [Conversation across channels](https://mobbin.com/sites/sections/1e41291f-dabe-4797-a893-ee057bedf952)

This is an inferred study, not an official Giga token export or a claim of pixel-exact reconstruction. The hero and two lower references belong to different site revisions. The implementation preserves the forest hero composition and adapts the newer product sections into one continuous page. The closing section, menus, contact and sign-in dialogs, mobile arrangements, and interaction states are inferred extensions. Reference-specific marketing statements remain examples from those captures, not newly verified performance claims.

The official site at [giga.ai](https://giga.ai/) and its [public design assets](https://giga.ai/design/) were inspected for a clean forest backdrop; the current redesign does not expose the old background there. The hero therefore composes three clean scenery crops over a reconstructed CSS sky. Crops exclude the screenshot headline, buttons, navigation, and Mobbin footer. Customer wordmarks are a separate artwork crop, with CSS contrast and screen blending to suppress the photographed backdrop. All text, navigation, forms, phone controls, and chat messages are live DOM. Original references and exact crop coordinates are preserved in `references/sources.json` and `references/asset-provenance.json`.

## Colors

White `#ffffff` is the main action and hero-text color, paired with dark ink `#101514` inside pills. Deep navy `#041326` anchors the product sections; body text is `#eff3f4`, secondary copy `#aeb9c4`, and borders `#344354`. The sky, horizon, and forest colors are estimated anchors for a multilayer gradient, not exact flat background fills. Blue `#31a8e8` marks the conversation section, violet `#703b80` and rust `#8b4d3a` anchor its glow, and warm brown `#695047` reconstructs the phone shell.

The white-on-red end-call control is an icon, not body text. Its approximately 3.63:1 contrast is above the 3:1 non-text criterion while remaining below the linter’s generic 4.5:1 text threshold. Image backgrounds have variable contrast and are not represented by a single contrast ratio; the lower foreground is darkened to support the customer marks. This study does not claim full accessibility conformance. `tokens.json` mirrors this YAML exactly; `tokens.css` supplies the runtime palette and scales.

## Typography

The hero uses Georgia as an approximation of the reference’s editorial serif; no proprietary forest-era font was supplied. At a 1440px viewport its fluid 4.6vw size is about 66px, capped at 88px on larger screens. Line height is 1.15 with tight negative tracking. The large serif closing message continues that visual identity.

Inter is bundled through `@fontsource/inter` for navigation, body copy, controls, and messages. Geist Pixel Line is downloaded from the current official public site and reproduces the newer section-heading style. Its exact source is in asset provenance. Ordinary desktop body copy is 15px, navigation 14px, chat 13px, labels 12px, and mono eyebrows 10px. At 1700px and above, product copy and cards scale toward the 1920px references. Mobile hero type is 44px, section headings 33px, and body copy 12–13px.

## Layout

The hero occupies one viewport with a 730px desktop minimum. Navigation sits inside 3vw gutters, the central announcement starts around 33% of height, and customer marks sit near the lower edge. Forest-edge crops frame the headline while leaving the middle open. The composition adapts to narrow screens by widening the edge treatment and allowing the headline to wrap into four lines.

Product sections use the same horizontal gutters, a large left headline and narrower right explanation. The voice stage centers a modeled phone between supporting copy and a customer quote. The conversation stage centers a functioning chat panel within a violet-to-rust field. On mobile, text stacks above each demo and the quote remains readable below the phone. No offscreen navigation stays keyboard-focusable: desktop navigation uses display:none, and the mobile menu is a native dialog.

## Elevation & Depth

Depth comes from the mountain layers, darkening foreground, fine borders, a sparse dotted orb, and translucent panel treatments. Product cards have thin muted outlines and 20px radii. The phone uses several inset borders and subtle shadows to suggest a physical frame. Navigation menus use `0 14px 40px #08131833`; dialogs use `0 20px 80px #0004` over a dark blurred backdrop. Avoid large generic dashboard shadows.

## Shapes

Pills and call controls are fully rounded. Product stages and dialogs use 20px corners, ordinary inputs 8px, and conversation bubbles 14px. The phone has a larger rounded top with layered edges. The forest remains photographic artwork; the rest of the page geometry is built from HTML and CSS rather than screenshots.

## Components

Actual Vercel `@ui-sdk/react` Button and Dialog primitives are imported through `@study/ui`. App-owned CSS supplies the visual styling. Native dialogs manage top-layer behavior, focus containment, Escape dismissal, and return to the original opener, including a mobile menu switching into another dialog.

- **Header:** product dropdown with in-page links, company menu, sign-in preview, demo action, and mobile navigation dialog.
- **Hero:** source headline, announcement dialog, primary demo action, three clean scenery crops, and a separate customer-logo artwork strip.
- **Voice demo:** scenario selection, start/end state, mute toggle, a visible sample response, and waveform bars. It plays no audio and records nothing.
- **Chat demo:** editable message field, send action, locally generated scenario replies, and an independently scrollable conversation.
- **Demo form:** name, email, company, support-volume selection, browser validation, a review summary, and an edit action. Submission is explicitly a preview; nothing is transmitted.
- **Sign-in preview:** email input and explanatory confirmation, with no account access or message delivery.

The route is `/giga`. All interactions are local component state and reset on reload. The voice and chat examples are deterministic, with no AI, microphone, network service, or live customer data. No form entry is stored persistently or sent externally. Motion is limited to waveform bars during the sample call and hover transitions; reduced-motion preferences disable both.

## Do's and Don'ts

- Do preserve the expansive scenery, centered serif headline, and quiet header hierarchy.
- Do keep forest imagery separate from live text and interaction layers.
- Do document the mixed reference revisions, fallback serif font, and inferred mobile states.
- Do retain visible focus, labelled icon buttons, native form validation, and modal focus restoration.
- Don't use a complete screenshot as the background or retain the Mobbin footer in the website.
- Don't replace the expressive sections with a grid of generic dashboard cards.
- Don't claim the local sample call, sign-in preview, or demo request connects to Giga.
- Don't add continuous motion when reduced motion is requested.
