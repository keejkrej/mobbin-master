import { test, expect, openStudy, captureRender, checkDialogKeyboard } from './fixtures';

test('lovable: renders the referenced portfolio builder', async ({ page }, testInfo) => {
  await openStudy(page, 'lovable');
  await expect(page.getByRole('heading', { name: 'Crafting digital experiences that resonate' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Ask Lovable', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'lovable');
});

test('lovable: updates the editable preview and returns through the workspace', async ({ page }) => {
  await openStudy(page, 'lovable');
  const composer = page.getByRole('textbox', { name: 'Ask Lovable', exact: true });
  await composer.fill('Change headline to Thoughtful digital experiences');
  await page.getByRole('button', { name: 'Send prompt', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Thoughtful digital experiences', exact: true })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Preview updated');
  await page.getByRole('button', { name: 'Go to home', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'What should we build, Samlee?' })).toBeVisible();
  await page.getByRole('button', { name: 'Elegant Portfolio Edited just now', exact: false }).click();
  await expect(page.getByRole('heading', { name: 'Thoughtful digital experiences', exact: true })).toBeVisible();
});

test('lovable: settings retain keyboard focus and close with Escape', async ({ page }) => {
  await openStudy(page, 'lovable');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Project settings', exact: true }), 'Project settings');
});
