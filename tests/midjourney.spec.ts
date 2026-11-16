import { test, expect, openStudy, captureRender, checkDialogKeyboard } from './fixtures';

test('midjourney: renders the reference image detail', async ({ page }, testInfo) => {
  await openStudy(page, 'midjourney');
  await expect(page.getByRole('textbox', { name: 'Imagine prompt', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Two tomatoes at sunset', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'midjourney');
});

test('midjourney: saves an image and makes a prompt preview', async ({ page }) => {
  await openStudy(page, 'midjourney');
  const favorite = page.getByRole('button', { name: 'Favorite image', exact: true });
  await favorite.click();
  await expect(favorite).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Prompt', exact: true }).click();
  const prompt = page.getByRole('textbox', { name: 'Imagine prompt', exact: true });
  await expect(prompt).toHaveValue(/Two cute tomatoes/);
  await prompt.fill('A quiet blue forest at dawn');
  await prompt.press('Enter');
  await expect(page.locator('.image-prompt')).toHaveText('A quiet blue forest at dawn');
  await expect(page.getByRole('status')).toHaveText('4 preview variations added');
  await page.getByRole('button', { name: 'Close image detail', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Open A quiet blue forest at dawn 1', exact: true })).toBeVisible();
});

test('midjourney: image settings contain keyboard focus and close with Escape', async ({ page }) => {
  await openStudy(page, 'midjourney');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Image settings', exact: true }), 'Image settings');
});
