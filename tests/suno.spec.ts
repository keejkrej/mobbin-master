import { test, expect, openStudy, captureRender, assertNoHorizontalOverflow, checkDialogKeyboard } from './fixtures';

test('Suno: renders the music creator and filtered workspace', async ({ page }, testInfo) => {
  await openStudy(page, 'suno');
  await expect(page.getByRole('textbox', { name: 'Song description', exact: true })).toHaveValue(/A relaxed lo-fi beat/);
  await expect(page.getByText('No songs found', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create sample songs', exact: true })).toBeEnabled();
  await captureRender(page, testInfo, 'suno');
});

test('Suno: creates local song cards and controls silent playback', async ({ page }) => {
  await openStudy(page, 'suno');
  await page.getByRole('button', { name: 'Advanced', exact: true }).click();
  await page.getByRole('textbox', { name: 'Song title', exact: true }).fill('Night Garden');
  await page.getByRole('textbox', { name: 'Song description', exact: true }).fill('Soft piano, slow jazz, and a quiet summer evening');
  await page.getByRole('button', { name: 'Instrumental', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Instrumental', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Create sample songs', exact: true }).click();
  await expect(page.locator('.song-row')).toHaveCount(7);
  await expect(page.getByRole('status')).toContainText('No music was generated');
  await expect(page.getByLabel('Playback preview', { exact: true })).toContainText('Night Garden');
  await page.getByRole('button', { name: 'Start playback preview', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause playback preview', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Pause playback preview', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search songs', exact: true }).fill('Night Garden');
  await expect(page.locator('.song-row')).toHaveCount(2);
  await assertNoHorizontalOverflow(page);
});

test('Suno: hook song dialog supports keyboard focus and Escape', async ({ page }) => {
  await openStudy(page, 'suno');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Create hook', exact: true }), 'Create a New Hook');
});
