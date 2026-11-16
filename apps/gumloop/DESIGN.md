---
version: alpha
name: Gumloop — Workflows and node builder
description: Screenshot-derived Gumloop workflow gallery and Google Sheets Reader
  builder, with local sample execution.
colors:
  primary: '#282828'
  primary-hover: '#414141'
  canvas: '#fdfdfd'
  sidebar: '#f9f9f9'
  surface: '#ffffff'
  text: '#111214'
  muted: '#737780'
  border: '#e4e4e4'
  selected: '#f1f1f1'
  run: '#f32d9a'
  enabled: '#57d98b'
  node-tint: '#e3fced'
  save: '#ffebca'
  save-text: '#97631e'
  credit: '#009aff'
typography:
  page-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.3
  card-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.4
  node-title:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 23px
    fontWeight: 500
    lineHeight: 1.3
  node-body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.3
  navigation:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter, Arial, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 6px
  md: 10px
  lg: 18px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  compact: 12px
  md: 16px
  lg: 24px
  sidebar: 244px
  chat-panel: 500px
  node-width: 586px
components:
  canvas:
    backgroundColor: '{colors.canvas}'
  sidebar:
    backgroundColor: '{colors.sidebar}'
    textColor: '{colors.text}'
    width: '{spacing.sidebar}'
  primary-button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    rounded: '{rounded.sm}'
    typography: '{typography.body}'
  primary-button-hover:
    backgroundColor: '{colors.primary-hover}'
  workflow-card:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.text}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
    typography: '{typography.body}'
  card-title:
    textColor: '{colors.text}'
    typography: '{typography.card-title}'
  navigation-selected:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.text}'
    typography: '{typography.navigation}'
    rounded: '{rounded.sm}'
  divider:
    backgroundColor: '{colors.border}'
    height: 1px
  metadata:
    textColor: '{colors.muted}'
    typography: '{typography.caption}'
  page-heading:
    textColor: '{colors.text}'
    typography: '{typography.page-title}'
  node-heading:
    textColor: '{colors.text}'
    typography: '{typography.node-title}'
  node-surface:
    backgroundColor: '{colors.node-tint}'
    textColor: '{colors.text}'
    rounded: '{rounded.lg}'
    typography: '{typography.node-body}'
  enabled-switch:
    backgroundColor: '{colors.enabled}'
    rounded: '{rounded.md}'
  save-button:
    backgroundColor: '{colors.save}'
    textColor: '{colors.save-text}'
    rounded: '{rounded.sm}'
  run-button:
    backgroundColor: '{colors.run}'
    textColor: '{colors.surface}'
    rounded: '{rounded.sm}'
  credits-button:
    backgroundColor: '{colors.credit}'
    textColor: '{colors.surface}'
    rounded: '{rounded.sm}'
---

# Gumloop design system

## Overview

Gumloop combines a quiet workflow library with a more expressive visual builder. The gallery uses a white canvas, a pale sidebar, a compact toolbar, and simple outlined cards. The builder places conversational instructions beside a dotted node canvas. Green identifies Google Sheets, pink identifies the Run action, and warm amber distinguishes Save.

### Sources and fidelity

Mobbin MCP screenshots retrieved and inspected November 16, 2026:

- [Workflow Builder with Google Sheets Reader](https://mobbin.com/screens/f5c6b812-dc94-425d-9c3d-2975f5157fed), retained as `references/screen-1.webp`.
- [Workflows gallery with card actions](https://mobbin.com/screens/f4eba594-6b71-412b-ba81-075e265349e4), retained as `references/screen-2.webp`.

The initial gallery follows the second reference, including the first card's open action menu. Opening or creating a workflow uses the first reference's split chat/builder composition. All gallery cards, controls, chat content, and the Google Sheets Reader node are live React elements. The Mobbin curation footer is omitted.

This is a visual reconstruction, not an official Gumloop design-system export. Colors, dimensions, font metrics, icon geometry, and responsive rules are inferred. Transient captured loading messages are replaced with a usable ready state. The private-looking sheet link and account email visible in the source are replaced with a demo sheet identifier and “Personal workspace.”

### Asset provenance

Only small brand/profile assets are cropped from the screenshots. Coordinates are x, y, width, height:

| Asset | Reference | Crop |
| --- | --- | --- |
| `public/assets/wordmark.webp` | `screen-2.webp` | 14, 17, 125, 28 |
| `public/assets/mark.webp` | `screen-1.webp` | 19, 20, 37, 37 |
| `public/assets/avatar.webp` | `screen-2.webp` | 20, 1162, 25, 25 |

The Google Sheets icon is an approximate vector composed from a colored file rectangle and Lucide table icon. Other interface icons use Lucide, with one small hand-drawn settings icon. No complete screenshot or screenshot of a control is used as the application interface.

## Colors

Use `#fdfdfd` for the gallery and builder canvas, `#f9f9f9` for sidebar chrome, and white for dialogs and inputs. Text is near-black `#111214`; supporting text is gray `#737780`. Dividers use `#e4e4e4`. Selected navigation is a restrained `#f1f1f1`.

The main creation button is charcoal `#282828`. Run uses the reference's bright pink `#f32d9a`; Save uses pale amber `#ffebca` with brown text `#97631e`. The Google Sheets node has an inferred pale-green top tint `#e3fced`, and enabled switches use `#57d98b`. Credits use `#009aff`.

The reference pink Run and blue credits controls use white text; the amber Save control uses brown text. Those inferred color pairs fall below the 4.5:1 small-text threshold and are retained for screenshot fidelity; the official linter reports these three contrast limitations. Do not reuse them for body text. `tokens.json` exactly mirrors the YAML in this document, and `tokens.css` supplies corresponding runtime values.

## Typography

Locally bundled Inter approximates the reference sans-serif because the original font files were not supplied. The desktop page heading is 24px medium, workflow titles 15px medium, navigation 13px, body and toolbar 12px, and metadata 10px. In the magnified node view, titles use 23px and descriptions 16px.

At widths of 1700px or more, dimensions and type scale toward the 1920px captures: sidebar text reaches 17px, gallery headings 32px, node titles 30px, and node body 21px. Use regular and medium weights for most content, with semibold only for important node labels.

## Layout

The gallery has a 244px fixed sidebar, a content column with 68px desktop side gutters, and three equal workflow cards. The toolbar contains ownership tabs, expanding search, filtering, grid/list controls, folder creation, and the main workflow action. The sidebar's utility links, credits, and account remain at the bottom. At the captured wide layout, the sidebar becomes 325px and content gutters 91px.

The builder replaces the library sidebar with a 500px chat panel, scaling to 665px at 1920px. The adjacent rounded editor contains a compact action header, a dotted canvas, a single 586px-wide Google Sheets Reader node, and a footer with the Flow tab and account. At wide sizes, the node reaches 782px and dots are spaced 156px apart. The node can be zoomed through local controls.

Below 900px the library navigation and builder chat move into UI SDK dialog drawers. Closed drawers are absent from keyboard navigation; Escape dismisses them and returns focus to the opener. Below 550px the gallery becomes a single column and the toolbar wraps into compact rows. Node inputs remain usable within the viewport. Mobile behavior is inferred because the reference set is desktop-only.

## Elevation & Depth

Most gallery surfaces use thin gray outlines with almost no shadow. Card menus have a soft `0 1px 3px #00000020` shadow. The builder node uses a subtle contact shadow and a broad, faint lower shadow to separate it from the dot grid. The builder prompt has a narrow peach-to-pink-to-cyan border accent. Modal dialogs use a stronger `0 20px 70px #0003` shadow and dimmed backdrop.

## Shapes

Small controls use approximately 6px corners, workflow cards 10px, and large builder shells 18px or greater. The node is a softly rounded rectangle with a circular connection port above it. Provider icons sit in rounded squares. Toggle tracks use rounded rectangles, preserving the slightly squarer form visible in the reference. Menus and fields are compact and consistently rounded.

## Components

The gallery supports searching, a Google Sheets filter, ownership tabs, grid/list layout, local folders, creation, rename, description editing, duplication, and deletion of fixture cards. Sharing copies a study link; it does not alter permissions. The additional sidebar destinations open an explanatory help view rather than contacting services.

The builder keeps the observed Google Sheets Reader layout. The link, trigger toggle, Use Link toggle, optional sheet name, header setting, and builder prompt are editable. Save marks settings as saved within the session. Run opens a deterministic three-row result table after a brief local state transition. It explicitly states that no sheet was opened, no external service was contacted, and the rows are fixtures. Node settings, assistant messages, and gallery edits persist only in React state for the current page session.

The creation, folder, rename, description, help, credits, search, share, and results dialogs are inferred states that make the visible controls useful. The supplied reference only establishes the gallery/card menu and the builder node screen. UI SDK Button, Toggle, and Dialog components provide the actual interaction primitives. Icon controls have accessible names, pressed states are exposed, and keyboard focus stays in open dialogs.

Three Playwright cases cover the gallery screenshot/images/overflow, workflow creation through edited-node execution, and keyboard dialog behavior. The keyboard case also checks the mobile navigation and builder-chat drawers. Each case runs at desktop and mobile sizes.

## Do's and Don'ts

- Do keep the gallery sparse, with consistent card spacing and restrained borders.
- Do preserve the distinct library and chat/builder layouts.
- Do use green to associate the node with Google Sheets and pink for Run.
- Do keep mobile drawers hidden and unfocusable while closed.
- Do disclose that run results are local fixture rows.
- Don't reproduce a screenshot as a page or use static pixels in place of controls.
- Don't claim access to Google Sheets or perform a real workflow run.
- Don't treat screenshot-inferred tokens or mobile layouts as official Gumloop source values.
