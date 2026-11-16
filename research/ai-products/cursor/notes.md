# Cursor: Mobbin reference notes

Captured through the connected Mobbin MCP on 2026-11-16. These are observed screen patterns and inferred implementation choices, not an official design system or token export.

## Observed screens

- [New agent composer with MCP selector open](https://mobbin.com/screens/c5ee99ab-46b9-4ffe-a831-2d377d4e3495?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `c5ee99ab-46b9-4ffe-a831-2d377d4e3495.webp`
- [New agent composer with multiple-model picker](https://mobbin.com/screens/5086a06b-e76b-49ad-a5e4-c2100759b758?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `5086a06b-e76b-49ad-a5e4-c2100759b758.webp`

## Visual observations

- These are Cursor's web agent screens, not the desktop code editor. Light gray dominates the interface.
- The sidebar occupies roughly 18.5% of the screenshot width and contains New Agent, Automations, Dashboard, an empty agents message, and a bottom account.
- A compact composer is positioned near the top center. A repository and branch label appear immediately above it.
- The prompt sits above a dense action row with multiple model names, an MCP selector, image attachment, microphone, and a black circular submit action.
- The model popover supports multiple checked models and a nested quantity menu; the MCP popover has a search input and integration toggles.

## Inferred token starting points

`inferred-tokens.json` records suggested CSS values. Large flat surface colors were sampled from the downloaded screenshots; text colors, typography, corner radii, widths, and spacing are estimates. WebP compression can shift sampled colors. Original screenshot pixel dimensions are not verified CSS pixels. Reference files include the Mobbin attribution footer, which should not be reproduced in the app layout.

```json
{
  "canvas": "#f7f7f7",
  "sidebar": "#f3f3f3",
  "surface": "#fdfdfd",
  "text": "#303030",
  "muted": "#858585",
  "border": "#e9e9e9",
  "accent": "#2d8d76",
  "composerRadius": "12px",
  "sidebarWidth": "280px",
  "composerMaxWidth": "640px",
  "font": "Inter, Arial, sans-serif"
}
```

## Prototype interactions

Prompt editing, local agent creation, model checkbox selection, quantity picker, MCP search and toggle, repository/branch selection, sidebar nav with local views.

All behavior is suitable for local browser state and deterministic mock content. None requires a real account, an AI API, microphone access, or public sharing. Unseen screens must be labeled inferred in the app's design documentation.

## Fidelity limits

Only the retained screens were inspected. Fonts, icon paths, exact breakpoints, motion curves, and internal component implementations are not supplied by Mobbin. The chosen fallback fonts and suggested dimensions are approximations to validate against browser screenshots. Keep original references and source citations beside the implementation.
