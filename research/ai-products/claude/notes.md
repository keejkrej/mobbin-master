# Claude: Mobbin reference notes

Captured through the connected Mobbin MCP on 2026-11-16. These are observed screen patterns and inferred implementation choices, not an official design system or token export.

## Observed screens

- [Feature announcement modal](https://mobbin.com/screens/f5b26318-4345-4c49-a0bd-a031edacb3a8?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `f5b26318-4345-4c49-a0bd-a031edacb3a8.webp`
- [Searchable chats list](https://mobbin.com/screens/ef4dc71f-9d6e-4b35-89d7-26c2393c58c0?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `ef4dc71f-9d6e-4b35-89d7-26c2393c58c0.webp`
- [Welcome home with image-analysis draft](https://mobbin.com/screens/e8c0af18-6e3a-4273-93c1-935e958ff8b3?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `e8c0af18-6e3a-4273-93c1-935e958ff8b3.webp`
- [Welcome home with Slack-analysis draft](https://mobbin.com/screens/dc0671c0-a055-45bd-92dc-42cadf7c1934?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `dc0671c0-a055-45bd-92dc-42cadf7c1934.webp`
- [Home with account and language menus](https://mobbin.com/screens/da3d700f-0862-4c7d-94b0-88526bdcbda6?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `da3d700f-0862-4c7d-94b0-88526bdcbda6.webp`

## Visual observations

- Warm off-white canvas and slightly tinted sidebar. Serif wordmark, greeting, and prominent titles contrast with small sans-serif controls.
- The empty-chat layout places a greeting over a shallow white composer near the upper middle of the canvas, rather than vertically centering the whole view.
- The composer uses softly rounded corners, a faint border/shadow, a plus action at the lower left, and model name plus coral submit at the lower right.
- The Chats page is a restrained searchable list: serif title, black New chat button, search field, and thin full-width row separators.
- Observed supporting states include account/language menus and a centered feature announcement with a dimmed backdrop.

## Inferred token starting points

`inferred-tokens.json` records suggested CSS values. Large flat surface colors were sampled from the downloaded screenshots; text colors, typography, corner radii, widths, and spacing are estimates. WebP compression can shift sampled colors. Original screenshot pixel dimensions are not verified CSS pixels. Reference files include the Mobbin attribution footer, which should not be reproduced in the app layout.

```json
{
  "canvas": "#fbf9f5",
  "sidebar": "#faf8f4",
  "surface": "#ffffff",
  "text": "#292924",
  "muted": "#73726c",
  "accent": "#c96f4e",
  "border": "#e9e7e1",
  "composerRadius": "18px",
  "sidebarWidth": "288px",
  "conversationMaxWidth": "680px",
  "font": "Inter, Arial, sans-serif",
  "displayFont": "Georgia, Times New Roman, serif"
}
```

## Prototype interactions

New chat, deterministic composer response, model picker, sidebar collapse, searchable chats list, local chat selection, dismissible feature dialog.

All behavior is suitable for local browser state and deterministic mock content. None requires a real account, an AI API, microphone access, or public sharing. Unseen screens must be labeled inferred in the app's design documentation.

## Fidelity limits

Only the retained screens were inspected. Fonts, icon paths, exact breakpoints, motion curves, and internal component implementations are not supplied by Mobbin. The chosen fallback fonts and suggested dimensions are approximations to validate against browser screenshots. Keep original references and source citations beside the implementation.
