---
version: alpha
name: Decart Live AI Lab
description: Official-site study of Decart’s blue and white Live AI lab identity.
colors:
  primary: "#2548F6"
  primary-hover: "#193BD8"
  text: "#101010"
  muted: "#656565"
  surface: "#FFFFFF"
  subtle: "#F5F5F5"
  ice: "#EFF7FF"
  footer: "#22222C"
  line: "#DEDEE2"
typography:
  headline-display:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 65px
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: -3.25px
  headline-mobile:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: -1.8px
  headline-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 52px
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: -2.08px
  headline-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.24
    letterSpacing: -1.92px
  headline-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.66px
  body-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-button:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.25
  label-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  small: 12px
  card: 56px
  pill: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  section: 140px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    typography: "{typography.label-button}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface}"
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
  supporting-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
  capability-card:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
  manifesto:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.primary}"
    typography: "{typography.headline-md}"
  footer:
    backgroundColor: "{colors.footer}"
    textColor: "{colors.surface}"
  input-border:
    backgroundColor: "{colors.line}"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    padding: "{spacing.lg}"
---

## Overview

Decart presents itself as “The Live AI Lab the World Runs On.” Its marketing website combines a white editorial canvas, electric-blue actions, animated sculptural objects, soft colored model demonstrations, and restrained geometric typography. This study reconstructs its hero, partner strip, optimization section, Lucy and Oasis model sections, research cards, and footer as editable React elements.

**Reference status:** this is an explicitly approved official-site fallback, not a Mobbin screenshot recreation. The Mobbin MCP query “Decart hero section,” limited to three results on its first page, returned three **Cartesia** sections. Those were rejected as the wrong brand. No claim is made that Decart is absent from the full Mobbin catalog. Two parallel candidate searches for Periodic Labs and General Intuition likewise returned other brands. The selected reference is the exact official [Decart website](https://decart.ai/), inspected and captured on **2026-11-16**.

The three committed captures are [desktop home](references/official-desktop.png), [mobile home](references/official-mobile.png), and [Lucy model section](references/official-models.png). The desktop reference is 1440 × 1000; mobile is 390 × 844. Captures were taken after declining the official site's optional cookies. Screenshot files are documentation only and are never used as page UI. [sources.json](references/sources.json) records URLs, dimensions, capture date, and the unsuccessful exact-brand Mobbin search. [asset-provenance.json](references/asset-provenance.json) records individual official media URLs and transformations.

Observed: content hierarchy, wording, colors, typography measurements, desktop and mobile hero ordering, media, logo geometry, two-column model rows, and pill treatments. Inferred: the local model explorer dialog, contact draft form, focus treatment, reduced-motion poster states, simplified navigation behavior, and responsive layout of added dialogs. These additions let the study work without authentication, a model service, or an external submission. They are not represented as official Decart functionality.

## Colors

Electric blue `#2548F6` is observed on the announcement strip, main call to action, and deployment banner. Black and near-black form the heading palette; gray `#656565` supports longer body text. White dominates. Light neutral cards and the pale blue manifesto field keep sections distinct without heavy borders. The footer is a deep charcoal with a subtle blue cast.

Runtime values are in [tokens.css](tokens.css); [tokens.json](tokens.json) mirrors this document's parsed YAML exactly. Hover blue and control borders are inferred interaction tokens. The Lucy and Oasis cards use locally authored layered gradients visually matched to the observed blue-lavender and sage fields. Their exact gradient stops are an approximation, not recovered official tokens. Preserve the source palette rather than altering it to change a contrast report.

## Typography

The official site's computed font stack identifies **Roobert**, with Monitor families in secondary roles. Official proprietary font binaries are not redistributed. This study uses **Arial / Helvetica / sans-serif** as an explicit substitute, retaining observed sizes, weight, tracking, line lengths, and line heights where possible. Consequently, glyph shapes and a few wrap positions differ from the source.

At 1440px the observed hero is 65px regular with a 72.8px line height and −3.25px letter spacing. Section headlines use 48–52px; supporting copy uses 18px. The mobile hero drops to 40px. Headlines remain light in tone through regular weight and generous space. Avoid bold display text. Labels, not extra heading weight, distinguish model versions and publication metadata.

## Layout

Desktop uses 40px outer gutters, a sticky 40px announcement strip and 80px navigation row. The hero occupies approximately 780px below the header, with copy left and the animated globe right. Core feature rows have two equal columns and a 64px gap; artwork containers are square. Section gaps grow to approximately 140px. The partner strip distributes ten gray logos horizontally.

Below 800px the navigation becomes a modal menu, the hero artwork moves above centered copy, outer gutters become 20px, and feature rows stack. The mobile header and hero ordering are observed in the official mobile capture. The research grid stacks into one column and partner logos wrap into two rows as a practical adaptation. The source's long scroll-driven manifesto sequence is condensed into a readable static section. This study covers selected homepage sections; the official use-case carousel and the complete research archive are not reproduced.

## Elevation & Depth

Most sections are flat. Depth comes from sculptural media, softly colored artwork fields, and generous whitespace. Lucy's white video frame casts a broad soft shadow and its compact outfit tray overlaps the lower edge. The Oasis frame uses the same spatial cue against a sage background. Dropdowns and dialogs use light shadow and border; the demo modal backdrop is a translucent dark field with slight blur. Those modal treatments are inferred extensions.

The original globe and optimization animations are served locally as muted WebM, transcoded to 600px width to reduce weight. Recorded Lucy and Oasis clips retain their source media. Under `prefers-reduced-motion`, videos start paused on static posters; explicitly labeled play controls remain available in model previews. The hero artwork is decorative and does not require motion to communicate the headline.

## Shapes

Buttons and model badges are full pills. Large desktop artwork cards use approximately 56px corners, shrinking on mobile. Smaller cards, video frames, trays, and dialogs use coordinated 12–40px radii. All copy and controls are DOM text and React components. Logos and demonstration imagery are standalone assets, not flattened screen captures. The Decart wordmark uses the observed SVG paths from the official header, with provenance retained.

## Components

- **Navigation:** a restrained horizontal row with three expandable groups; desktop popovers close on Escape and outside click. Closed popovers are removed from the DOM. The mobile menu uses the actual UI SDK dialog, and local section choices close it and move focus to the destination section.
- **Primary button:** white text on electric blue, full-pill shape, 52px desktop height, compact 42px navigation variant. Hover darkens blue and keyboard focus receives a visible outline.
- **Model artwork:** a local recorded clip in a white frame, plus five real outfit thumbnails. Clicking a thumbnail selects its corresponding clip and poster. Selection is exposed with `aria-pressed`.
- **Model explorer:** actual `Tabs`, `TabsList`, `TabsTab`, and `TabsPanel` select Lucy or Oasis. Lucy offers the original scene and five recorded transformations. Labels state that these are recorded previews. This does not generate video or call an AI service.
- **Contact draft:** accessible labeled email, interest, and project fields use native validation. “Save inquiry” reveals a review state that explicitly says no message has been sent. Editing restores entered values. No network submission or persistent personal-data storage occurs.
- **Dialogs:** actual `Dialog`, `DialogContent`, `DialogTitle`, `DialogDescription`, and `DialogClose` from [Vercel UI SDK](https://github.com/vercel-labs/ui), re-exported through `@study/ui`. Escape dismissal, focus containment, and opener recovery are covered by browser tests.
- **Research cards:** real source images, live text, publication metadata, and explicit links to the official articles. External actions open the exact official URL. The local prototype does not imitate publication pages.

## Do's and Don'ts

- Do preserve the large white margins, light regular headlines, blue pill actions, and blue/green material palette.
- Do keep every recorded scene tied to its source and label its behavior accurately.
- Do honor reduced-motion preferences, visible keyboard focus, dialog Escape behavior, and mobile scrolling.
- Do retain the exact Mobbin-search limitation and official-site fallback in provenance.
- Don't call the font substitute Roobert or describe inferred dialogs as observed official screens.
- Don't place a complete screenshot behind interactive hotspots, invent model output, or claim that a locally saved inquiry was sent.
- Don't introduce dashboard navigation, dense gradients behind body copy, or bold heavyweight headings into this sparse marketing layout.
