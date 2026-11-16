# Browser smoke tests

Start the collection's combined preview server separately, then run from the repository root:

```sh
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npm exec playwright test
```

The config uses an existing system Chromium when found. Override its path with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`; if no system browser exists, Playwright's installed Chromium is used. The test config never launches a preview server.

The suite runs each case at desktop 1440×1000 and mobile 390×844:

- Eight reference routes render real content and every image loads.
- Initial layouts and interaction results have no document-level horizontal overflow.
- Each app's main workflow changes visible state; the tests also cover retained Spotify likes, Airbnb favorites, and Grok history.
- Each app opens a dialog from the keyboard, keeps focus inside while tabbing, dismisses with Escape, and restores persistent trigger focus.
- Every test fails for uncaught browser exceptions.

The render cases save and attach screenshots under `test-results/`. They are review artifacts, not pre-approved visual baselines, and do not establish pixel-exact parity with Mobbin. The HTML report is in `playwright-report/`; failed cases also retain traces and screenshots.

To run just rendering or one app:

```sh
npm exec playwright test tests/render.spec.ts
npm exec playwright test -- --grep Airbnb
```
