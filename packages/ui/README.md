# Shared UI behaviors

`@study/ui` directly re-exports the unstyled React components from [Vercel UI SDK](https://github.com/vercel-labs/ui). Every study supplies its own visual design through its tokens and CSS. Both `@ui-sdk/react` and `@ui-sdk/core` are pinned to `0.1.0-beta.3`.

## Exports

```tsx
import {
  Button,
  Dialog, DialogBackdrop, DialogClose, DialogContent,
  DialogDescription, DialogTitle, DialogTrigger,
  Tabs, TabsList, TabsPanel, TabsTab,
  Toggle,
  Slider, SliderControl, SliderIndicator,
  SliderThumb, SliderTrack, SliderValue,
} from "@study/ui";
```

- `Button` accepts `onClick` and handles keyboard presses.
- `Dialog` accepts `open` / `onOpenChange` or `defaultOpen`. Nest its trigger, optional backdrop, and content inside the root. Give the content a `DialogTitle`. Use `DialogClose` for dismissal. The SDK handles focus recovery, Escape, and the browser top layer without a portal.
- `Tabs` accepts `value` / `onValueChange` or `defaultValue`. Put `TabsTab` elements in a named `TabsList`; match each tab's `value` to a `TabsPanel`.
- `Toggle` accepts `pressed` / `onPressedChange` or `defaultPressed`. Give an icon-only toggle a stable accessible name.
- `Slider` accepts a numeric `value` / `onValueChange`, or a number array for a range. Nest `SliderControl > SliderTrack > SliderIndicator + SliderThumb`. For a range, use one thumb for each value with `index={0}`, `index={1}`, and distinct accessible names. The SDK sets positions; app CSS supplies track and thumb sizes.

Callbacks receive the new value first and change details second. Use `render` to change a component's underlying element, rather than `as` or `asChild`. Use React 19 or newer and `@types/react` 19.2.10 or newer. Interactive wrappers with callbacks belong in client modules.

Declare `@layer ui-sdk;` at the top of the global stylesheet. The optional default stylesheet is intentionally not imported, so each app controls its appearance. Style state through `data-pressed`, `data-selected`, `data-open`, and the component's documented attributes.

## Sources and license

API checked on November 16, 2026 against the published `0.1.0-beta.3` package documentation. Read the matching installed documentation in `node_modules/@ui-sdk/react/docs/llms.txt` and `docs/components/` before changing usage. GitHub's main branch may contain a newer beta API.

UI SDK is copyright 2026 Vercel, Inc. and licensed under [Apache-2.0](https://github.com/vercel-labs/ui/blob/main/LICENSE). This package imports it as a dependency and copies no implementation source. Dependency licenses remain in their distributed packages. Brand and screenshot provenance belongs to each app's design documentation.
