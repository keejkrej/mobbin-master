import { test, expect, openStudy, captureRender, checkDialogKeyboard, assertNoHorizontalOverflow } from './fixtures';

test('ElevenLabs: renders the speech editor and voice settings', async ({ page }, testInfo) => {
  await openStudy(page, 'elevenlabs');
  await expect(page.getByRole('heading', { name: 'Text to Speech', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Speech text', exact: true })).toHaveValue(/AromaBrew/);
  await expect(page.getByRole('button', { name: 'Choose model, currently Eleven Multilingual v2', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'elevenlabs');
});

test('ElevenLabs: selects a voice, creates a local preview, and restores it from history', async ({ page }) => {
  await openStudy(page, 'elevenlabs');
  await page.getByRole('textbox', { name: 'Speech text', exact: true }).fill('A short voice preview for the design study.');
  await page.getByRole('button', { name: 'Choose voice, currently Sam Lee', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Select a voice', exact: true });
  await dialog.getByRole('textbox', { name: 'Search voices', exact: true }).fill('Rachel');
  await dialog.getByRole('button', { name: /Rachel Calm, warm and expressive/ }).click();
  await expect(dialog).toBeHidden();
  await page.getByRole('button', { name: 'Generate speech', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Preview saved.' })).toBeVisible();
  await expect(page.getByLabel('Preview player', { exact: true })).toContainText('Rachel');
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('tab', { name: /History/ }).click();
  await expect(page.getByRole('heading', { name: 'Generation history', exact: true })).toBeVisible();
  await expect(page.locator('.history-card')).toContainText('A short voice preview for the design study.');
  await page.getByRole('button', { name: 'Load into editor', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Speech text', exact: true })).toHaveValue('A short voice preview for the design study.');
  await expect(page.getByRole('button', { name: 'Choose voice, currently Rachel', exact: true })).toBeVisible();
  await assertNoHorizontalOverflow(page);
});

test('ElevenLabs: voice picker supports keyboard focus and Escape', async ({ page }) => {
  await openStudy(page, 'elevenlabs');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Choose voice, currently Sam Lee', exact: true }), 'Select a voice');
});
