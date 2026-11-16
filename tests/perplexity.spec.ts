import { test, expect, openStudy, captureRender, checkDialogKeyboard } from './fixtures';

test('Perplexity: renders its reference home without overflow or missing images', async ({ page }, testInfo) => {
  await openStudy(page, 'perplexity');
  await expect(page.getByRole('heading', { name: 'perplexity', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Ask Perplexity', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'perplexity');
});

test('Perplexity: searches a question and opens an answer source', async ({ page }) => {
  await openStudy(page, 'perplexity');
  await page.getByRole('button', { name: 'Choose model', exact: true }).click();
  await page.getByRole('button', { name: 'Sonar Explore with Sonar', exact: true }).click();
  await page.getByRole('textbox', { name: 'Ask Perplexity', exact: true }).fill('How do solar panels work?');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'How do solar panels work?', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How it works', exact: true })).toBeVisible();
  await expect(page.getByText('Sonar · Search', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Sources 3', exact: true }).click();
  await page.getByRole('button', { name: /How does solar work\?/ }).click();
  await expect(page.getByRole('dialog', { name: 'Source details', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open original source', exact: true })).toHaveAttribute('href', 'https://www.energy.gov/eere/solar/how-does-solar-work');
});

test('Perplexity: voice dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'perplexity');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Voice search', exact: true }), 'Voice search');
});
