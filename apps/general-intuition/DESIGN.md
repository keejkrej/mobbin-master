---
version: alpha
name: General Intuition official-site study
description: Official-source reconstruction of an expressive frontier research
  laboratory website.
colors:
  primary: "#FFFFFF"
  canvas: "#000000"
  surface: "#08090C"
  raised: "#111218"
  text: "#FFFFFF"
  muted: "#BCBCBC"
  label: "#8A8A8A"
  line: "#727275"
  dark: "#000000"
  track: "#45494F"
  thumb: "#DDDDDD"
  focus: "#91C8FF"
typography:
  display-mission:
    fontFamily: Alpha Lyrae
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.5
  headline-lg:
    fontFamily: Alpha Lyrae
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.25
  headline-md:
    fontFamily: Alpha Lyrae
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.25
  body-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  quote:
    fontFamily: Geist
    fontSize: 27px
    fontWeight: 400
    lineHeight: 1.75
  label-lg:
    fontFamily: Geist Mono
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Geist Mono
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.2
  caption:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 2px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 50px
  xxl: 100px
  inner-width: 1152px
components:
  app-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
  editorial-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.body-md}"
    padding: "{spacing.xl}"
  control-surface:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.label}"
  inverted-mission:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.dark}"
    typography: "{typography.display-mission}"
    rounded: "{rounded.none}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.dark}"
    typography: "{typography.button}"
  grid-rule:
    backgroundColor: "{colors.line}"
    width: 1px
  slider-track:
    backgroundColor: "{colors.track}"
    height: 5px
    rounded: "{rounded.full}"
  slider-thumb:
    backgroundColor: "{colors.thumb}"
    width: 35px
    height: 18px
    rounded: "{rounded.full}"
  focus-indicator:
    backgroundColor: "{colors.focus}"
    width: 2px
  section-label:
    textColor: "{colors.label}"
    typography: "{typography.label-md}"
---

## Overview

General Intuition’s site presents a frontier research lab through colored ASCII imagery, a visible structural grid, and sharp black-and-white contrast. Small monospace labels organize the research. The wordmark and unusually shaped display letters sit above quiet editorial copy. A white mission panel cuts across the moving visual field instead of following a conventional centered hero.

### Official source and research trail

This study uses the [official General Intuition website](https://www.generalintuition.com/), inspected and captured on **November 16, 2026**, with the page title “General Intuition | The frontier lab for acting in space and time.” Desktop and mobile captures are retained in `references/desktop.png` and `references/mobile.png`; settings and research captures are retained separately. Browser viewports were 1440 × 1000 and 390 × 844. Full-page image heights differ because of responsive content and scrolling.

**This is an official-site fallback, not a Mobbin-derived General Intuition study.** Limited Mobbin section searches for Standard Intelligence, Physical Intelligence, and Odyssey did not return those exact brands. Their unrelated semantic results were rejected. The returned Atlas brand was verified as Atlas Motion Systems, a motors/actuators manufacturing startup rather than the requested research-lab category. No Atlas image or token is used here. Additional pagination was rate-limited. The research trail and source identity are retained in `references/sources.json`.

Observed details include the ASCII field, mark and wordmark, mission copy, backing logos, research sections and links, thin grid, original fonts, inline ASCII settings, and desktop/mobile proportions. The local renderer, paused visual state, demo dialog, partnership preview, role explorer, and modal treatments are implementation additions. The source’s funding, model performance, partnership, and company claims are captured interface content as of the inspection date; this study does not independently verify or update them.

## Colors

The outer canvas is black `#000000`, with subtly lighter content surfaces `#08090C` and `#111218`. Primary text and filled buttons use white. Body copy uses `#BCBCBC`, labels `#8A8A8A`, and fine grid rules `#727275`. The hero mission and hiring banner invert the palette: white surfaces with black text.

Colors in the ASCII fields come from sampled source imagery rather than brand accent tokens. A tile opacity control separates the colored tile from its character. This keeps the rest of the site monochrome. The slider track is `#45494F` and thumb `#DDDDDD`. The blue `#91C8FF` focus ring is an inferred accessibility treatment, visible only during keyboard navigation.

The YAML front matter is the normative implementation token tree and is mirrored exactly in `tokens.json`. `tokens.css` provides matching runtime values. Values were inspected or approximated from rendered surfaces; they are not an official exported design-system package.

## Typography

The official page loads three typefaces, and this study retains those publicly served font files with source URLs in the asset record: **Alpha Lyrae** for display text, **Geist** for body copy, and **Geist Mono** for settings and labels. Alpha Lyrae’s contextual ligatures create the distinct occasional pixel-like forms. The mission uses `font-variant-ligatures: no-contextual`, matching the official clean treatment.

Standard desktop headings are 36px / 1.25, mission text 24px / 1.5, body 18px / 1.7, and labels 16–18px. The quotation is 27px / 1.75. Buttons use 16px medium text; footer copy is 12–14px. Mobile mission text is 20px / 1.5, headings 32px / 1.25, body 16px / 1.7, and controls 12–14px. Font files preserve the supplied names and remain attributable to their original authors; they are not fonts created for this study.

## Layout

At 1440px, the site uses a 25px top/left outer inset, 40px right inset, a white frame, and a centered inner grid capped at 1152px. Two equal columns hold most editorial sections. Rules continue across the hero, research, visual fields, hiring banner, and footer. Default content padding is 50px. Empty grid bands deliberately separate the long sections.

The desktop hero is 1080px high. Its ASCII field is 800px high and fades into the dark canvas. The wordmark sits 50px inside the inner grid; the 718px-wide white mission panel begins 556px down the hero. Settings expand as a four-column strip below it. The white panel, imagery, and visible grid remain separate DOM/canvas elements.

Below 600px, the outer inset becomes 14px left/top and 29px right, the inner grid spans the frame, the hero is 858px high, and the mission begins 378px down. Editorial columns stack, research links and papers become two-column grids, and settings become stacked rows. Mobile dimensions follow the inspected official mobile capture, while dialog layouts are inferred. There are no offscreen navigation drawers or hidden focusable panels.

## Elevation & Depth

The page is almost entirely flat. One-pixel grid lines, black-to-charcoal tonal differences, and white inversion blocks create hierarchy. ASCII tiles create their own depth through color, density, and the fade at the bottom of the hero. Avoid card shadows and soft floating containers in the main page.

Only inferred dialogs use a `0 30px 100px #0009` shadow, a dim backdrop, and a slight backdrop blur. They keep square edges so they remain part of the site’s structural language. Buttons use clear color inversion on hover rather than movement.

## Shapes

The site uses square panels, rectangular image fields, and unrounded buttons. The token scale includes 0px and 2px for structural controls, with a full radius reserved for the slider track and pill-shaped thumb. Do not round the editorial grid, mission block, research links, or paper rows.

## Components

The app uses real Vercel UI SDK `Button`, `Toggle`, `Slider`, and `Dialog` exports through `@study/ui`. SDK sliders support keyboard and pointer input. Dialogs have names, focus containment, Escape dismissal, and focus return.

- **ASCII renderer:** small, local 256 × 128 frames sampled from six videos on the official page are rendered into colored tiles and characters by app-owned canvas code. No original site implementation code or full-page screenshot is used. Cell size, text opacity, and tile opacity all change the actual output. Visible scenes alone animate. The effect varies character selection over a single frame; it does not replay the original moving footage.
- **Motion controls:** system reduced-motion starts every scene paused on a deterministic image and character mapping. A manual Play/Pause control is always available. Reduced motion also disables CSS transitions and smooth scrolling. The user may explicitly start the local character animation. The standalone demo starts paused regardless of preference.
- **Settings:** the observed inline settings strip opens from the hero control, moves keyboard focus to the first slider, and supports Escape with focus return. A small reset control is an inferred addition. Hidden settings are unmounted.
- **Research:** primary MIRA links and prior-research cards preserve the official destinations. The technical-report dialog identifies the linked work. External links are ordinary links; no account session or remote integration is requested. The “Play the Live Demo” action opens a clearly labeled local visual preview, with a separate link to the actual official demo. Scene selection and Play/Pause work locally; this is not a running world model.
- **Learning and play:** a local summary dialog explains action/world-model concepts and uses the original progression diagram. It does not reproduce the complete official essay. Its return action scrolls to the research section.
- **Work with us:** partnership fields validate locally, preserve editable details, and show an explicit unsent confirmation. No form request is made. Careers provides representative, clearly labeled sample roles, category filtering, expandable details, and an official careers link. Sample roles are inferred, not a live job feed.
- **Footer:** return-to-top, original external social destinations, local partnership/career dialogs, and informative legal/contact previews. This study does not send email, accept applications, or join the actual waitlist.

### Assets and provenance

`references/asset-provenance.json` records every official asset URL and the six video-frame sources. Wordmark, mark, backing logos, diagram, and font files were downloaded from URLs used by the inspected official page. The video elements were sampled through a temporary canvas at their decoded 256 × 128 resolution. No MP4 or remote video runtime is included; the public asset bundle is small and self-contained.

Reference screenshots are evidence only and are never displayed as UI. The full-page official capture contains some dark visual regions because the source renders media on visibility; the implementation provides local frames for all six scenes. The screenshot timing, single-frame motion approximation, dialog inferences, and responsive differences prevent an exact-frame or full-site parity claim. General Intuition, its research, graphics, and typeface assets remain attributed to their original owners.

## Do's and Don'ts

- Do preserve the sharp frame, continuous rules, monochrome copy, and colored ASCII field.
- Do keep the inverted mission panel distinct from the background imagery.
- Do start paused for reduced motion and expose manual visual controls.
- Do distinguish original research links from local, unsent interaction previews.
- Do retain official URLs, capture dates, asset provenance, and the rejected Mobbin search trail.
- Don't claim this study has an exact Mobbin General Intuition source.
- Don't render screenshots as page components or stream unneeded remote media.
- Don't imply the local visualization is a live world model or that a form reaches the company.
- Don't present sampled colors, inferred dialogs, or illustrative roles as official product specifications.
