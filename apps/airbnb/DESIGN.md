---
version: alpha
name: Airbnb Web Study
description: A screenshot-derived design system for Airbnb home discovery, search,
  wishlists, and local stay selection.
colors:
  primary: '#FF385C'
  primary-dark: '#E31C5F'
  ink: '#222222'
  muted: '#6A6A6A'
  surface: '#FFFFFF'
  surface-subtle: '#F7F7F7'
  border: '#DDDDDD'
  border-subtle: '#EBEBEB'
  action-gradient-start: '#E51D51'
  action-gradient-end: '#D70466'
typography:
  headline-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.6px
  headline-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 23px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.6px
  headline-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.2
  body-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
  label-md:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.25
  label-sm:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
  caption:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: 8px
  toast: 14px
  card: 22px
  modal: 26px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 14px
components:
  button-primary:
    backgroundColor: '{colors.action-gradient-start}'
    textColor: '{colors.surface}'
    rounded: '{rounded.control}'
    typography: '{typography.label-md}'
    height: 48px
  button-secondary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.surface}'
    rounded: '{rounded.control}'
    typography: '{typography.label-md}'
    height: 48px
  search-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    rounded: '{rounded.full}'
    size: 58px
  stay-photo:
    rounded: '{rounded.card}'
  favorite-badge:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.full}'
    typography: '{typography.label-sm}'
  dialog:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.modal}'
    padding: '{spacing.lg}'
  button-primary-hover:
    backgroundColor: '{colors.action-gradient-end}'
    textColor: '{colors.surface}'
  search-button-hover:
    backgroundColor: '{colors.primary-dark}'
    textColor: '{colors.surface}'
  listing-metadata:
    textColor: '{colors.muted}'
    typography: '{typography.body-sm}'
  footer:
    backgroundColor: '{colors.surface-subtle}'
    textColor: '{colors.muted}'
    typography: '{typography.body-sm}'
  menu-divider:
    backgroundColor: '{colors.border}'
    height: 1px
  header-divider:
    backgroundColor: '{colors.border-subtle}'
    height: 1px
---

# Airbnb web design study

## Overview

This study reconstructs Airbnb's home discovery interface from Mobbin screenshots retrieved on November 16, 2026. White space, warm property photography, compact listing descriptions, and pink search controls give the page its identity. Information is grouped through alignment and photographic cards; heavy card borders are unnecessary.

This is an inferred system, not Airbnb's official token library. Screenshot colors, spacing, radii, and typography were visually measured. The source capture date is unknown. Fonts, unseen responsive states, property details, and secondary interactions are approximations. The current implementation uses Arial because no original licensed brand font was supplied.

### Evidence and scope

- [Home with account menu](https://mobbin.com/screens/f08bfe78-f88c-445b-8969-a0f9b08942f5): primary layout, navigation, search bar, listing rows, prices-including-fees notice, and account menu.
- [Phone sign-in dialog](https://mobbin.com/screens/e0a010cf-5be7-4690-a5bd-0ac5dab3d658): modal structure, input group, social buttons, and pink action.
- [Sign-in field state](https://mobbin.com/screens/fdc96317-c4e6-4740-9196-a7e9946b66f6): field focus and populated state.
- [Profile completion](https://mobbin.com/screens/db89573f-520e-4deb-91e7-3d72a91ff92a): rounded modal and neutral confirmation action.

Source images and full source metadata are retained in `references/`. Public `images/` assets are cropped photographic regions and navigation illustrations from the home/menu screenshot. No screenshot is used as the page. Top portions of the photos were cropped to exclude screenshot badges and heart controls; two obscured Philadelphia images use unobstructed Miami crops. The San Juan row uses shallow crops from the visible lower portion of the reference and has demonstration listing text; its full original images were not available. Exact original property imagery is therefore not fully reproduced.

The home, menu, and sign-in composition follow visible evidence. Search panels, the wishlist page, stay details, and the reservation selection state are inferred extensions. All data remains local. No account is created, payment taken, booking made, or service contacted. The interface is implemented with Next.js and actual Vercel UI SDK Button and Dialog components, exposed through `@study/ui`.

## Colors

Use `primary` pink for search, saved hearts, and important actions. Body copy uses `ink`; supporting descriptions use `muted`. `surface` is the primary canvas and `surface-subtle` distinguishes footer areas and small controls. Borders separate fields and menu groups without outlining every component.

The main form action uses the observed pink-to-magenta treatment: `linear-gradient(100deg, #e51d51, #d70466)`. Search uses the brighter `#FF385C`. The reconstructed logo uses `#E43257`. These are visual estimates from the screenshot, not values retrieved from product source code. The machine-readable `button-primary.backgroundColor` records the first gradient stop (#E51D51); `action-gradient-end` supplies its second stop and the solid hover state. The runtime gradient is preserved in CSS rather than represented as an invalid single Color token.

The official linter reports white on the search button’s #FF385C at **3.52:1**, below its general 4.5:1 text threshold. This control displays a search icon, so it exceeds the 3:1 non-text contrast threshold; the warning remains visible rather than changing the reference color. Do not place normal-size white text on this brighter pink. The actual pink-to-magenta form action has white contrast from **4.54:1 to 5.12:1** at its gradient endpoints. These checks concern the reconstructed palette, not an accessibility certification of Airbnb.

## Typography

Use the system Arial/Helvetica stack as an explicit fallback. Heads and listing labels are semibold; explanatory content remains regular. Wide desktop section headings increase to 25px, listing titles to 16px, and metadata to 14px. At widths below 1450px these step down to 20px, 12px, and 10px to preserve the reference's dense seven-column layout. The mobile adaptation keeps 19px section titles and 12px card titles.

Do not apply oversized marketing type to listing screens. Display property names on a single line with ellipsis in a row, and use full names in the detail view.

## Layout

At the 1920px source width, content uses roughly 5.5% margins and seven columns separated by 14px. Each photo has a 1.04 width-to-height ratio. The header uses a left logo, centered category navigation, right utility controls, and a second row with a centered search pill up to 1080px wide. The desktop search bar is 80–83px high.

Below 1150px, rows show five columns with horizontal scrolling. Below 760px, rows show approximately two cards plus a visible continuation. Mobile search collapses to destination entry; date and guest panels remain available as sequential steps. Results use a wrapping grid; home rows scroll horizontally. These responsive decisions are inferred because the provided sources are desktop captures.

Spacing follows 4px increments for most controls. A 14px photo gutter is deliberately retained to match the screenshot.

## Elevation & Depth

Search shadow: `0 3px 12px #0000001f`. Floating menus and search panels: `0 4px 24px #00000026`. Dialogs: `0 12px 40px #0005`, over a `#0006` backdrop. The prices notice uses `0 2px 13px #0002` with a light border. Property cards stay flat.

The UI SDK Dialog uses the browser's top layer. It manages modal focus, Escape dismissal, and focus return. Dialogs have a scrollable body within the viewport rather than expanding beyond it.

## Shapes

Photos use 22px radii on wide screens and 17px at smaller desktop sizes. Search, guest badges, and circular utility buttons are fully rounded. Form buttons and inputs use 8px radii. Dialogs use 26px radii, reduced to 20px on small screens.

Hearts sit above the top-right photo corner with a white outline; saved hearts fill pink. Guest-favorite badges sit top-left with a near-white fill. Both remain independent of the photographic asset.

## Components

- **Search bar:** destination input, check-in, checkout, guest count, and circular search button. The panels support selection, keyboard input, and Escape dismissal. Search filters the demonstration inventory by location and title.
- **Stay card:** separately clickable photo/title, price for two nights, rating, optional Guest favorite badge, and independent wishlist toggle. Saved IDs persist in browser local storage.
- **Listing row:** section heading and previous/next scroll controls. Small screens support horizontal swipe/trackpad scrolling.
- **Account menu:** help, hosting previews, wishlists, and sign-in. Contextual informational actions are local previews.
- **Sign-in dialog:** visible phone/email field, country code, primary action, alternate provider buttons, and confirmation state. This demonstrates the UI only; entered contact details are neither transmitted nor persisted.
- **Stay details:** inferred page with large photo, amenities, dates, guests, price, and local reservation selection. The Share button produces a local stay URL; it does not publish content externally.
- **Preferences:** local language/currency choices show feedback. Prices remain the reference USD values; no currency conversion is implied.

## Do's and Don'ts

- Do preserve the light canvas, compact labels, and photographic emphasis.
- Do give icon-only actions accessible labels and visible keyboard focus.
- Do keep badges and heart controls as live elements above photos.
- Do distinguish screenshot-derived facts from inferred values and demonstration data.
- Do respect reduced-motion preferences for hover and scrolling behavior.
- Don't imply that simulated sign-in or reservation actions contact Airbnb.
- Don't treat the inferred palette or Arial fallback as official brand assets.
- Don't add shadows or borders around every property card.
- Don't replace working controls with a full screenshot background.
