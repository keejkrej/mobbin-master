import { test, expect, openStudy, captureRender, assertNoHorizontalOverflow, checkDialogKeyboard } from './fixtures';

test('General Intuition: renders the official-site layout with deterministic reduced motion', async ({ page }, testInfo) => {
  await openStudy(page, 'general-intuition');
  await expect(page.getByRole('heading', { name: 'We are the frontier lab for acting in space and time.', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Play visual motion', exact: true })).toBeVisible();
  await expect(page.locator('.hero-scene')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('.hero-scene')).toHaveAttribute('data-frame', '0');
  await captureRender(page, testInfo, 'general-intuition');
});

test('General Intuition: adjusts ASCII density and previews a local partnership request', async ({ page }) => {
  await openStudy(page, 'general-intuition');
  await page.getByRole('button', { name: 'Open ASCII settings', exact: true }).click();
  const density = page.getByRole('slider', { name: 'Cell size', exact: true });
  await expect(density).toBeFocused();
  await density.press('Home');
  await density.press('ArrowRight');
  await expect(density).toHaveValue('7');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('region', { name: 'ASCII settings', exact: true })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open ASCII settings', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Enter the waitlist', exact: true }).first().click();
  const form = page.getByRole('dialog', { name: 'Work with our models', exact: true });
  await form.getByRole('textbox', { name: 'Name', exact: true }).fill('Alex Rivera');
  await form.getByRole('textbox', { name: 'Work email', exact: true }).fill('alex@example.com');
  await form.getByRole('combobox', { name: 'Area of interest', exact: true }).selectOption('Robotics');
  await form.getByRole('textbox', { name: 'What would you like to build?', exact: true }).fill('A robot learning environment');
  await form.getByRole('button', { name: 'Preview request', exact: true }).click();
  const confirmation = page.getByRole('dialog', { name: 'You’re on the preview list', exact: true });
  await expect(confirmation).toContainText('Nothing was sent to General Intuition.');
  await expect(confirmation).toContainText('alex@example.com');
  await expect(confirmation).toContainText('robotics');
  await expect.poll(() => confirmation.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await confirmation.getByRole('button', { name: 'Edit details', exact: true }).click();
  await expect(form.getByRole('textbox', { name: 'Name', exact: true })).toBeFocused();
  await expect(form.getByRole('textbox', { name: 'Name', exact: true })).toHaveValue('Alex Rivera');
  await expect(form.getByRole('textbox', { name: 'What would you like to build?', exact: true })).toHaveValue('A robot learning environment');
  await assertNoHorizontalOverflow(page);
});

test('General Intuition: research visualization dialog supports keyboard focus and Escape', async ({ page }) => {
  await openStudy(page, 'general-intuition');
  const opener = page.getByRole('button', { name: 'Play the Live Demo', exact: true });
  await opener.scrollIntoViewIfNeeded();
  await checkDialogKeyboard(page, opener, 'MIRA™ visual preview');
});
