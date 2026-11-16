# Google Gemini: Mobbin reference notes

Captured through the connected Mobbin MCP on 2026-11-16. These are observed screen patterns and inferred implementation choices, not an official design system or token export.

## Observed screens

- [Home with expanded sidebar and blue glow](https://mobbin.com/screens/f3b9012f-3f75-433b-a9e0-c70c2a39e9bc?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `f3b9012f-3f75-433b-a9e0-c70c2a39e9bc.webp`
- [Temporary-chat home with collapsed rail](https://mobbin.com/screens/eeb82ce8-837a-4e5c-8364-621c22334f11?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `eeb82ce8-837a-4e5c-8364-621c22334f11.webp`

## Visual observations

- The correct product is Google Gemini. A search for bare Gemini returned the unrelated cryptocurrency exchange; those results were excluded.
- Expanded left navigation uses compact icon-and-label rows with a rounded selected New chat row. The page is predominantly white.
- The home greeting and pill composer sit over a large, very soft blue radial glow. The glow is the main color treatment; the surrounding controls remain neutral.
- The composer contains a plus action, Ask Gemini placeholder, Flash model selector, and microphone. It is flatter and shallower than Claude's rectangular composer.
- Temporary chat switches to a collapsed icon rail, a gray glow, a temporary-chat glyph, and explanatory text under Welcome, stranger.

## Inferred token starting points

`inferred-tokens.json` records suggested CSS values. Large flat surface colors were sampled from the downloaded screenshots; text colors, typography, corner radii, widths, and spacing are estimates. WebP compression can shift sampled colors. Original screenshot pixel dimensions are not verified CSS pixels. Reference files include the Mobbin attribution footer, which should not be reproduced in the app layout.

```json
{
  "canvas": "#fdfdfd",
  "surface": "#ffffff",
  "text": "#232625",
  "muted": "#696c6e",
  "selected": "#f0eeee",
  "glow": "#c2e4fc",
  "temporaryGlow": "#dededc",
  "composerRadius": "999px",
  "sidebarWidth": "280px",
  "composerMaxWidth": "670px",
  "font": "Inter, Arial, sans-serif"
}
```

## Prototype interactions

Sidebar collapse/expand, temporary chat switch, deterministic send response, recent chat selection, searchable history, model selector, attachment action.

All behavior is suitable for local browser state and deterministic mock content. None requires a real account, an AI API, microphone access, or public sharing. Unseen screens must be labeled inferred in the app's design documentation.

## Fidelity limits

Only the retained screens were inspected. Fonts, icon paths, exact breakpoints, motion curves, and internal component implementations are not supplied by Mobbin. The chosen fallback fonts and suggested dimensions are approximations to validate against browser screenshots. Keep original references and source citations beside the implementation.
