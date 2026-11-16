import { test, expect, openStudy, captureRender, checkDialogKeyboard, assertNoHorizontalOverflow } from './fixtures';

test('Krea: renders the video and image composers', async ({ page }, testInfo) => {
  await openStudy(page, 'krea');
  await expect(page.getByRole('heading', { name: 'Video', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Video prompt', exact: true })).toHaveValue('A girl transforming into a fairy');
  await captureRender(page, testInfo, 'krea-video');
  await page.getByRole('button', { name: 'Image workspace', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Click generate to start', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'krea-image');
});

test('Krea: creates a local image concept, saves it, and restores its prompt', async ({ page }) => {
  await openStudy(page, 'krea');
  await page.getByRole('button', { name: 'Image workspace', exact: true }).click();
  await page.getByRole('textbox', { name: 'Image prompt', exact: true }).fill('A blue flower floating over a quiet lake');
  await page.getByRole('button', { name: 'Aspect ratio, currently 2:3', exact: true }).click();
  await page.getByRole('dialog', { name: 'Aspect ratio', exact: true }).getByRole('button', { name: '1:1', exact: true }).click();
  await page.getByRole('button', { name: 'Generate', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'A blue flower floating over a quiet lake', exact: true })).toBeVisible();
  await expect(page.getByText('Sample artwork · No AI generation', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Save to favorites', exact: true }).click();
  await page.getByRole('button', { name: 'View gallery', exact: true }).click();
  await page.getByRole('button', { name: 'Favorites', exact: true }).click();
  await expect(page.locator('.gallery-card')).toHaveCount(1);
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Gallery', exact: true }).click();
  await expect(page.locator('.gallery-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Reuse A blue flower floating over a quiet lake', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Image prompt', exact: true })).toHaveValue('A blue flower floating over a quiet lake');
  await expect(page.getByRole('button', { name: 'Aspect ratio, currently 1:1', exact: true })).toBeVisible();
  await assertNoHorizontalOverflow(page);
});

test('Krea: model dialog contains keyboard focus and restores it on Escape', async ({ page }) => {
  await openStudy(page, 'krea');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Choose model, currently Wan 2.1', exact: true }), 'Choose a model');
});
