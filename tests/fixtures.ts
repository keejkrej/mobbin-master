import { test as base, expect, type Locator, type Page, type TestInfo } from '@playwright/test';

export const test = base.extend<{ runtimeErrors: void }>({
  runtimeErrors: [async ({ page }, use, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.stack || error.message));
    await use();
    if (errors.length) {
      await testInfo.attach('uncaught-browser-errors', {
        body: errors.join('\n\n'),
        contentType: 'text/plain',
      });
    }
    expect.soft(errors, 'The page must not throw uncaught browser exceptions').toEqual([]);
  }, { auto: true }],
});

export { expect };

export async function openStudy(page: Page, app: string) {
  const response = await page.goto(`/${app}/`, { waitUntil: 'networkidle' });
  expect(response?.status(), `${app} route should return HTTP 200`).toBe(200);
  await expect(page.getByRole('main')).toBeVisible();
}

export async function assertNoHorizontalOverflow(page: Page) {
  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(sizes.document, `Document overflow: ${JSON.stringify(sizes)}`).toBeLessThanOrEqual(sizes.viewport + 1);
  expect(sizes.body, `Body overflow: ${JSON.stringify(sizes)}`).toBeLessThanOrEqual(sizes.viewport + 1);
}

export async function captureRender(page: Page, testInfo: TestInfo, app: string) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => undefined)));
  });
  const brokenImages = await page.evaluate(() => Array.from(document.images)
    .filter((image) => !image.complete || image.naturalWidth === 0)
    .map((image) => image.getAttribute('src')));
  expect(brokenImages, `${app} should load every rendered image`).toEqual([]);
  await assertNoHorizontalOverflow(page);
  const screenshot = testInfo.outputPath(`${app}-${testInfo.project.name}.png`);
  await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled' });
  await testInfo.attach(`${app} ${testInfo.project.name}`, { path: screenshot, contentType: 'image/png' });
}

/** Checks keyboard activation, focus containment in both directions, and dismissal. */
export async function checkDialogKeyboard(page: Page, opener: Locator, name: string | RegExp) {
  await expect(opener).toBeVisible();
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name });
  await expect(dialog).toBeVisible();
  const focusInside = () => dialog.evaluate((element) => element.contains(document.activeElement));
  await expect.poll(focusInside, { message: 'Opening the dialog moves focus inside' }).toBe(true);
  for (const key of ['Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Shift+Tab', 'Shift+Tab']) {
    await page.keyboard.press(key);
    expect(await focusInside(), `${key} should keep keyboard focus in the modal`).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  // Menu items can disappear when they open a dialog. Persistent openers restore focus.
  if (await opener.count() && await opener.isVisible()) await expect(opener).toBeFocused();
}
