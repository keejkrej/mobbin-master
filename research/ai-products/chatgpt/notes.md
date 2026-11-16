# ChatGPT: Mobbin reference notes

Captured through the connected Mobbin MCP on 2026-11-16. These are observed screen patterns and inferred implementation choices, not an official design system or token export.

## Observed screens

- [Image upload and analyzing state](https://mobbin.com/screens/fc303bbc-5d5f-4ffc-b3ce-065abc9693bc?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `fc303bbc-5d5f-4ffc-b3ce-065abc9693bc.webp`
- [Osaka trip group conversation](https://mobbin.com/screens/fa707eb9-8ecd-48e1-b94d-647c03a08bc6?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `fa707eb9-8ecd-48e1-b94d-647c03a08bc6.webp`
- [Assistant response end and message actions](https://mobbin.com/screens/f9fa472b-1f11-45f1-9132-019c2501f56d?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `f9fa472b-1f11-45f1-9132-019c2501f56d.webp`

## Visual observations

- White main canvas with a pale-gray persistent sidebar and a fine vertical divider. The sidebar is about 17% of the captured viewport width.
- A narrow central conversation column leaves large white margins. User messages use pale rounded bubbles aligned toward the right; assistant responses use plain text on the canvas.
- The composer is a white pill with a faint border and shadow. Attachment is left-aligned; microphone and circular submit/voice actions sit at the right.
- Sidebar sections separate product navigation, group chats, and personal chat history. Account identity is anchored to the bottom.
- Observed states: uploaded image being analyzed, a group conversation, and the end of a long assistant response with copy/feedback actions.

## Inferred token starting points

`inferred-tokens.json` records suggested CSS values. Large flat surface colors were sampled from the downloaded screenshots; text colors, typography, corner radii, widths, and spacing are estimates. WebP compression can shift sampled colors. Original screenshot pixel dimensions are not verified CSS pixels. Reference files include the Mobbin attribution footer, which should not be reproduced in the app layout.

```json
{
  "canvas": "#ffffff",
  "sidebar": "#f9f9f9",
  "userBubble": "#f5f5f5",
  "text": "#0d0d0d",
  "border": "#ececec",
  "composerRadius": "28px",
  "sidebarWidth": "260px",
  "conversationMaxWidth": "780px",
  "font": "Inter, Arial, sans-serif"
}
```

## Prototype interactions

New conversation, sidebar collapse, local history selection, composer submit with a deterministic response, search history, copy response, toggled feedback, local attachment preview.

All behavior is suitable for local browser state and deterministic mock content. None requires a real account, an AI API, microphone access, or public sharing. Unseen screens must be labeled inferred in the app's design documentation.

## Fidelity limits

Only the retained screens were inspected. Fonts, icon paths, exact breakpoints, motion curves, and internal component implementations are not supplied by Mobbin. The chosen fallback fonts and suggested dimensions are approximations to validate against browser screenshots. Keep original references and source citations beside the implementation.
