# Grok: Mobbin reference notes

Captured through the connected Mobbin MCP on 2026-11-16. These are observed screen patterns and inferred implementation choices, not an official design system or token export.

## Observed screens

- [Logo-feedback conversation with share toast](https://mobbin.com/screens/f8760136-ccfc-4d4c-868e-ca992d36fc4d?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `f8760136-ccfc-4d4c-868e-ca992d36fc4d.webp`
- [Same conversation while editing the user prompt](https://mobbin.com/screens/f5f415eb-08da-4177-a637-1ef54a2782ac?utm_source=chatgpt&utm_medium=ai-assistant&utm_source_platform=mcp) — `f5f415eb-08da-4177-a637-1ef54a2782ac.webp`

## Visual observations

- A nearly white canvas and simple left sidebar establish a sparse chat shell. The sidebar contains Search, Chat, Voice, Imagine, Projects, and History.
- The central response column is relatively narrow. A rounded pale user prompt appears above a large image and plain assistant analysis.
- The composer is a broad rounded light-gray pill anchored near the bottom of the conversation, with attachment at left and model, microphone, and black voice control at right.
- The edit-message state expands the user bubble into an editable area with Cancel and black Save actions.
- The share state includes a rounded toast near the top, showing an icon, a bold success line, and smaller supporting text.

## Inferred token starting points

`inferred-tokens.json` records suggested CSS values. Large flat surface colors were sampled from the downloaded screenshots; text colors, typography, corner radii, widths, and spacing are estimates. WebP compression can shift sampled colors. Original screenshot pixel dimensions are not verified CSS pixels. Reference files include the Mobbin attribution footer, which should not be reproduced in the app layout.

```json
{
  "canvas": "#fdfdfd",
  "surface": "#f8f8f8",
  "text": "#171717",
  "muted": "#777777",
  "border": "#ededed",
  "button": "#000000",
  "composerRadius": "999px",
  "messageRadius": "20px",
  "sidebarWidth": "260px",
  "conversationMaxWidth": "780px",
  "font": "Inter, Arial, sans-serif"
}
```

## Prototype interactions

Local prompt send, edit/save/cancel a prompt, deterministic answer, local share confirmation (no public share), model selector, history search, sidebar collapse.

All behavior is suitable for local browser state and deterministic mock content. None requires a real account, an AI API, microphone access, or public sharing. Unseen screens must be labeled inferred in the app's design documentation.

## Fidelity limits

Only the retained screens were inspected. Fonts, icon paths, exact breakpoints, motion curves, and internal component implementations are not supplied by Mobbin. The chosen fallback fonts and suggested dimensions are approximations to validate against browser screenshots. Keep original references and source citations beside the implementation.
