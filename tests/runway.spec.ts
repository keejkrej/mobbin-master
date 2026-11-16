import { test, expect, openStudy, captureRender, assertNoHorizontalOverflow, checkDialogKeyboard } from './fixtures';

test('Runway: renders the editable generator workspace and loaded artwork', async ({ page }, testInfo) => {
  await openStudy(page, 'runway');
  await expect(page.getByRole('heading', { name: 'Introducing Gen-4.5 Image to Video', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'runway');
});

test('Runway: edits a prompt and creates a local generation preview', async ({ page }) => {
  await openStudy(page, 'runway');
  const controls = page.getByRole('button', { name: 'Open generation controls', exact: true });
  if (await controls.isVisible()) await controls.click();
  await page.getByRole('textbox', { name: 'Generation prompt', exact: true }).fill('A cinematic portrait beside a red robot, with warm light and soft shadows.');
  await page.getByRole('button', { name: 'Generate', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Image generation', exact: true })).toBeVisible();
  await expect(page.locator('.result-prompt')).toHaveText('A cinematic portrait beside a red robot, with warm light and soft shadows.');
  await expect(page.locator('.result-disclaimer')).toContainText('No image, video, or audio was generated');
  await page.getByRole('button', { name: 'Back to presets', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Introducing Gen-4.5 Image to Video', exact: true })).toBeVisible();
  await assertNoHorizontalOverflow(page);
});

test('Runway: help dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'runway');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Help and shortcuts', exact: true }), 'Runway help');
});
