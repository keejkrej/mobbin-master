# Interface Studies

Fourteen separate Next.js apps reconstructed from saved Mobbin web references, with interactive screen states and documented design systems.

| App | Folder | Preview route | Main interactions |
| --- | --- | --- | --- |
| Linear | [apps/linear](apps/linear) | `/linear/` | Issue filters, create/edit issues, status, comments |
| Spotify | [apps/spotify](apps/spotify) | `/spotify/` | Playlist/album/lyrics, simulated playback, library and likes |
| Airbnb | [apps/airbnb](apps/airbnb) | `/airbnb/` | Stays, destination/date/guest search, wishlist and details |
| ChatGPT | [apps/chatgpt](apps/chatgpt) | `/chatgpt/` | Conversations, new chat, local sample replies and history |
| Claude | [apps/claude](apps/claude) | `/claude/` | Warm chat workspace, conversations and local sample replies |
| Gemini | [apps/gemini](apps/gemini) | `/gemini/` | Home, temporary chat, local conversation and model selection |
| Cursor | [apps/cursor](apps/cursor) | `/cursor/` | Web agent composer, repository/model menus and local tasks |
| Grok | [apps/grok](apps/grok) | `/grok/` | Logo conversation, edit prompt, new chat, modes and local replies |
| Perplexity | [apps/perplexity](apps/perplexity) | `/perplexity/` | Search, Answer, Connectors |
| Replit | [apps/replit](apps/replit) | `/replit/` | Projects, Workspace, Workflows |
| ElevenLabs | [apps/elevenlabs](apps/elevenlabs) | `/elevenlabs/` | Speech editor, Voices, History |
| Midjourney | [apps/midjourney](apps/midjourney) | `/midjourney/` | Gallery, Image, Prompt controls |
| Runway | [apps/runway](apps/runway) | `/runway/` | Tools, Chat, Generation settings |
| Suno | [apps/suno](apps/suno) | `/suno/` | Create, Workspace, Song selection |

## Run

Requires Node.js 20.9+ and npm. From this repository:

```sh
npm ci
npm run build
npm run dev
```

Open `http://localhost:3000` for the collection, then choose an app. The collection serves the static Next.js exports; rebuild after changing app code. Its searchable gallery includes an AI-products filter. `collection.json` defines the gallery entries and their order.

For live development of a single app:

```sh
npm run dev --workspace @study/linear
```

This serves Linear at `http://localhost:3001/linear`. The fourteen apps use ports 3001–3014 in the table order, with their matching base paths. Each is independently runnable and exportable, while sharing dependencies through npm workspaces.

## Files in each app

- `DESIGN.md` — uppercase, following the [Google DESIGN.md alpha specification](https://github.com/google-labs-code/design.md). YAML front matter provides machine-readable color, typography, spacing, radius and component tokens. The eight canonical prose sections explain their application.
- `tokens.json` — the corresponding design token tree for reuse.
- `tokens.css` — runtime CSS custom properties used by that app.
- `app/` and `components/` — real React UI, rather than a screenshot displayed as a page.
- `references/` — original downloaded Mobbin screenshots and a dated `sources.json` with canonical screen URLs.
- `public/` — local assets when required, with extraction provenance documented in `DESIGN.md`.

## Stack

Next.js 16.4.6, React 19, TypeScript, and the actual [Vercel UI SDK](https://github.com/vercel-labs/ui). `packages/ui` imports and re-exports `@ui-sdk/react` primitives with `@ui-sdk/core`, both pinned to `0.1.0-beta.3`. Each app supplies its own styles. Icons use Lucide and selected hand-drawn brand marks. No shadcn substitution is used.

## Validation

```sh
npm run typecheck
npm run design:lint
npm run build
npm test
```

Browser tests expect the collection preview to be running. Set `PLAYWRIGHT_BASE_URL` to its URL if it is not `http://127.0.0.1:3000`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` when using a system browser, or install Playwright Chromium with `npx playwright install chromium`.

## Scope and fidelity

These are independent interface studies, not official applications or original brand design system releases. Colors and dimensions are inferred from the reference captures retrieved on November 16, 2026. Proprietary font files and original vector assets were not supplied. Font substitutions, artwork crops, and states not visible in the references are described per app. Responsive layouts are inferred where only a desktop reference exists.

Interactions run locally. AI replies are deterministic examples; Spotify's player simulates progress without streaming audio; account, reservation and task flows do not call production services. Some examples store their own study data in browser localStorage. No API keys are required. The six additional AI studies cover search (Perplexity), development (Replit), speech (ElevenLabs), images (Midjourney), video (Runway), and music (Suno). Generated results and media playback are local simulations, except where a study explicitly documents otherwise.

Saved reference screenshots retain their source attribution. Brand assets and screenshots remain the property of their respective owners. Dependency licenses remain with their packages; UI SDK is Apache-2.0. This repository does not claim a license to redistribute third-party branding beyond the supplied study materials.
