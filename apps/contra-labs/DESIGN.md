---
version: alpha
name: Contra Labs — Creative AI and human taste
description: A Mobbin-grounded reconstruction of the creative AI evaluation lab, using
  cream paper, editorial serif typography, and Renaissance artwork.
colors:
  primary: '#292c26'
  paper: '#f2f1eb'
  muted: '#61645c'
  line: '#d2d3ca'
  seafoam: '#c2ded9'
  teal: '#2b7477'
  ribbon: '#83aaa2'
  white: '#fffef7'
  focus: '#245e60'
  error: '#9d342a'
typography:
  hero:
    fontFamily: Instrument Serif, Georgia, serif
    fontSize: 61px
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.035em
  section-heading:
    fontFamily: Instrument Serif, Georgia, serif
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.035em
  card-heading:
    fontFamily: Instrument Serif, Georgia, serif
    fontSize: 34px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.03em
  hero-body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.025em
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  eyebrow:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 1.4px
  faq-answer:
    fontFamily: Georgia, serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sm: 4px
  md: 8px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section: 112px
components:
  page:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.primary}'
  hero-heading:
    textColor: '{colors.primary}'
    typography: '{typography.hero}'
  hero-description:
    textColor: '{colors.primary}'
    typography: '{typography.hero-body}'
  section-heading:
    textColor: '{colors.primary}'
    typography: '{typography.section-heading}'
  dark-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.white}'
    rounded: '{rounded.full}'
    typography: '{typography.navigation}'
  outline-button:
    rounded: '{rounded.full}'
  ecosystem:
    backgroundColor: '{colors.seafoam}'
    textColor: '{colors.primary}'
  research-card:
    backgroundColor: '{colors.teal}'
    textColor: '{colors.white}'
    rounded: '{rounded.md}'
    typography: '{typography.card-heading}'
  eyebrow:
    textColor: '{colors.primary}'
    typography: '{typography.eyebrow}'
  ribbon:
    backgroundColor: '{colors.ribbon}'
  body:
    textColor: '{colors.primary}'
    typography: '{typography.body}'
  faq-answer:
    textColor: '{colors.muted}'
    typography: '{typography.faq-answer}'
  field:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.primary}'
    rounded: '{rounded.sm}'
  dialog:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.primary}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xl}'
  ribbon-star:
    backgroundColor: '{colors.paper}'
  divider:
    backgroundColor: '{colors.line}'
    height: 1px
  active-research-tab:
    textColor: '{colors.focus}'
  invalid-field-outline:
    backgroundColor: '{colors.error}'
---

# Contra Labs design system

## Overview

Contra Labs is presented in the references as an independent human-data and creative-evaluation lab. Its research identity centers on expert creative judgment, creative RLHF, and a Human Creativity Benchmark. It is distinct from Contra’s freelance marketplace. The page balances almost gallery-like empty space with human, historical artwork: a halftone landscape, ornamental armor and scales, and a Renaissance-style group working on laptops.

### Evidence and scope

Exact Contra Labs sections inspected at full resolution through Mobbin MCP on November 16, 2026:

- [Human taste and creative AI research](https://mobbin.com/sites/sections/fd230352-a273-4882-b2f4-1f8ed2b32651), `references/section-hero.webp`.
- [Contra Labs ecosystem](https://mobbin.com/sites/sections/057d0d6c-7542-4456-a4a2-7ee9854ec54b), `references/section-ecosystem.webp`.
- [Frequently asked questions](https://mobbin.com/sites/sections/6b60d40c-bee0-4e36-af5d-bc70662eff8b), `references/section-faq.webp`.
- [Creative experts footer](https://mobbin.com/sites/sections/08557308-0293-4220-9b8c-f68089677d7d), `references/section-footer.webp`.

The [intro-only wordmark capture](https://mobbin.com/sites/sections/e934d957-8448-43d3-adf0-b8a8229893bb) was also inspected in the search results. The implemented page starts with the useful human-taste section, rather than leaving the user in that transient empty intro state. The Mobbin curation footer is omitted. All copy, headings, menus, buttons, cards, and forms are real DOM elements; screenshots are retained as reference evidence.

The hero wording, two research categories and project names, first FAQ answer, footer identity, and broad compositions are observed. The top navigation, filter tabs, detail dialogs, additional human-data and invitation sections, expanded FAQ answers, mobile layout, and application flow are inferred extensions. No original design tokens or proprietary font files were provided, so this is a visual study, not an official system export. Numeric claims in the source are not used as new product claims.

### Assets and fonts

Only artwork and a neutral texture are cropped. Coordinates are x, y, width, height in the retained 1920px-wide references:

| Runtime asset | Source | Crop |
| --- | --- | --- |
| `tapestry.webp` | `section-hero.webp` | 152, 147, 694, 730 |
| `paper.webp` | `section-hero.webp` | 910, 70, 128, 128 |
| `arena.webp` | `section-ecosystem.webp` | 152, 506, 780, 408 |
| `benchmark.webp` | `section-ecosystem.webp` | 938, 506, 780, 408 |
| `creative-experts.webp` | `section-footer.webp` | 0, 700, 1920, 505 |
| `gilded-frame.webp` | `section-footer.webp` | 120, 0, 1800, 110 |

The tapestry and ecosystem crops exclude captured text and controls. Their object-fit crops change the artwork framing to fit the reconstructed components; the original art is not claimed. The hero caption, category labels, and project titles are recreated as selectable text. Assets remain attributed to their source owners. The ribbon/star is an approximate SVG; the wordmark is live type, not an original vector.

Locally hosted Instrument Serif is an open-font approximation for the narrow, high-contrast display serif. It was downloaded from Google Fonts (`fonts.gstatic.com`, Instrument Serif v5); `public/fonts/OFL.txt` retains the SIL Open Font License from the Google Fonts repository. Locally bundled Inter approximates the sans serif. The source’s original typefaces are unverified.

## Colors

Warm paper `#f2f1eb` supports dark ink `#292c26`, softened by a repeating crop of the source’s actual paper texture. Muted gray-green `#61645c` supports secondary text. Fine rules use `#d2d3ca`. The ecosystem changes the page to pale seafoam `#c2ded9`, while artwork cards use deep teal `#2b7477` as their fallback surface. A muted green ribbon `#83aaa2` is the quiet brand accent.

White ink `#fffef7` appears over dark buttons and artwork. Card gradients increase the contrast behind live labels. Focus uses deep teal `#245e60`; invalid fields use restrained red `#9d342a`. These colors are inferred from screenshots rather than extracted from official source code. The YAML above is exactly mirrored in `tokens.json`, while `tokens.css` supplies runtime color, family, radius, and spacing values. The runtime `--page-gutter: 8vw` is responsive and therefore not expressed as a fixed dimension in the alpha schema. The alpha component vocabulary has no border-color property: the divider and invalid-outline tokens describe the painted line, and the ribbon-star token describes its SVG fill.

## Typography

Use Instrument Serif at regular weight for expressive headings. At 1440px, the hero is approximately 61px with a 1.02 line height and tight tracking, the ecosystem title 48px, and card titles 34px. The image caption is 42px. The wide-screen hero grows to 81px. Preserve short editorial line lengths and deliberate line breaks.

Inter provides the contrast: navigation 12px, body 15px, hero supporting text 21px, and uppercase eyebrows 10px. FAQ answers use a small Georgia serif, reflecting the supplied FAQ’s contrasting text treatment. The wordmark combines bold Georgia with compact Inter “LABS”. Mobile headings become 43–52px; full-width paragraphs stay around 13–16px.

## Layout

The desktop hero is an asymmetric two-column composition with a tall tapestry on the left, a large gap, and the thesis on the right. The left image occupies roughly 43% of the inner content width, with an 8vw outer gutter. At 1440px the art is 675px high. An unobtrusive live header and ribbon provide navigation without changing the calm, open character.

The ecosystem uses two large adjacent artwork cards; research tabs filter the visible projects. FAQ uses a heading column beside a stack of thin-rule accordions. The footer centers the wordmark and identity over a wide group portrait and a strip of gilded ornament. Substantial spacing between sections preserves the source’s pace.

Below 760px, the hero text precedes its artwork, research cards and supporting rows stack, FAQ becomes one column, and the navigation opens as an SDK modal. Closed dialogs are hidden and unfocusable. Forms use a single column on small screens, with scrollable modal content bounded by the dynamic viewport. These responsive choices are inferred because the source set contains desktop sections.

## Elevation & Depth

The ordinary page has no raised dashboard surfaces. Artwork, color changes, whitespace, and thin rules establish hierarchy. Research cards use only small corner rounding and a subtle dark gradient behind their text. Hover gently enlarges artwork without changing the layout. Reduced-motion users receive no transitions or smooth scrolling.

The inferred dialogs use a restrained shadow and translucent, blurred backdrop. UI SDK uses the browser popover top layer for its dialog component, with dialog semantics and managed focus. App classes style that component directly; styles do not assume an HTML `dialog` tag.

## Shapes

Use square editorial sections and mostly rectangular art. Cards use 8px rounding, fields and dialogs 4px. Main action buttons are pill-shaped with thin outlines or solid dark ink. The long green bookmark ribbon has a split bottom and a four-point star. The small research arrow is enclosed in a circular outline.

## Components

The page uses actual `@study/ui` Button, Dialog, Tabs, and their exported parts. Research tabs expose keyboard tab behavior and filter between All work, Public evaluations, and Research & insights. Cards open contextual research details. Five FAQ controls independently expose their expanded state, with one answer open at a time.

Join and contact actions open a two-step local application: editable name, email, discipline, and introduction; a review view; and a clearly labeled local confirmation. Users can return to edit before finishing. No data is sent, no live model is called, and nothing is persisted outside the React page session. Social-channel buttons open a short invitation to explore the research without inventing official account URLs.

The mobile navigation and all dialogs use named controls, Escape dismissal, focus containment, and opener-focus restoration. Tests cover rendered assets and overflow, research filtering plus the full local application, and keyboard interaction for application and mobile navigation dialogs on desktop and mobile viewports.

## Do's and Don'ts

- Do keep the page rooted in human creative judgment and AI evaluation.
- Do preserve the cream, teal, and historical-art contrast.
- Do use real text for every heading, label, form, and control.
- Do keep generous whitespace and large editorial type.
- Do retain source attribution and distinguish inferred states.
- Don't use an entire screenshot as a page or interactive card.
- Don't claim that the font, tokens, or mobile rules are official source values.
- Don't send application details, contact external services, or invent research results.
