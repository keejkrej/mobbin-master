import { test, expect, openStudy, captureRender, checkDialogKeyboard } from './fixtures';

test('Gamma: renders the portfolio editor without overflow or missing images', async ({ page }, testInfo) => {
  await openStudy(page, 'gamma');
  await expect(page.getByRole('textbox', { name: 'Card 1 title', exact: true })).toHaveValue('Crafting a Professional Design Portfolio for Optimal Recruitment');
  await expect(page.getByRole('button', { name: 'Present', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'gamma');
});

test('Gamma: edits a card title, presents it, and advances the presentation', async ({ page }) => {
  await openStudy(page, 'gamma');
  await page.getByRole('textbox', { name: 'Card 1 title', exact: true }).fill('Designing with intention');
  await page.getByRole('button', { name: 'Present', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Designing with intention', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next card', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'The foundations of a strong portfolio', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Previous card', exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('heading', { name: 'Designing with intention', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Exit presentation', exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('textbox', { name: 'Card 1 title', exact: true })).toHaveValue('Designing with intention');
  await expect(page.getByRole('button', { name: 'Present', exact: true })).toBeFocused();
  const insertAfterFirst = page.getByRole('button', { name: 'Add a card after card 1', exact: true });
  await insertAfterFirst.focus();
  await expect(insertAfterFirst).toHaveCSS('opacity', '1');
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Three columns', exact: true }).click();
  const mobileCards = page.getByRole('button', { name: 'Open cards', exact: true });
  if (await mobileCards.isVisible()) await mobileCards.click();
  await expect(page.getByRole('button', { name: 'Go to card 2: Three columns', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go to card 3: The foundations of a strong portfolio', exact: true })).toBeVisible();
});

test('Gamma: share dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'gamma');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Share', exact: true }), 'Share Portfolio File');
});
