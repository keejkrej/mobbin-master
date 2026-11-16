import { test, expect, openStudy, captureRender, checkDialogKeyboard } from './fixtures';

test('Decart: renders the official-site landing study without overflow or missing images', async ({ page }, testInfo) => {
  await openStudy(page, 'decart');
  await expect(page.getByRole('heading', { name: 'The Live AI Lab the World Runs On' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Try Live AI', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'decart');
});

test('Decart: explores recorded Lucy transformations and switches to Oasis', async ({ page }) => {
  await openStudy(page, 'decart');
  const opener = page.getByRole('button', { name: 'Try Live AI', exact: true });
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Explore Live AI', exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Select Pink streetwear look', exact: true }).click();
  await expect(dialog.getByRole('status')).toHaveText('Pink streetwear look');
  await expect(dialog.locator('video[aria-label="Selected Lucy preview"]')).toHaveAttribute('src', '/decart/assets/lucy-3.mp4');
  await dialog.getByRole('button', { name: 'Original', exact: true }).click();
  await expect(dialog.getByRole('status')).toHaveText('Original scene');
  await dialog.getByRole('tab', { name: 'Oasis', exact: true }).click();
  await expect(dialog.getByRole('heading', { name: 'World Generation Model', exact: true })).toBeVisible();
  await expect(dialog.locator('video[aria-label="Selected Oasis preview"]')).toHaveAttribute('src', '/decart/assets/oasis.mp4');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('Decart: contact dialog contains keyboard focus, saves a local inquiry, and restores focus', async ({ page }) => {
  await openStudy(page, 'decart');
  const opener = page.getByRole('button', { name: 'Contact us about Live AI', exact: true });
  await opener.scrollIntoViewIfNeeded();
  await checkDialogKeyboard(page, opener, 'Let’s build what’s next.');
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Let’s build what’s next.', exact: true });
  await dialog.getByLabel('Work email', { exact: true }).fill('designer@example.com');
  await dialog.getByRole('combobox', { name: 'I’m interested in', exact: true }).selectOption('Research collaboration');
  await dialog.getByLabel('What are you building?', { exact: true }).fill('An interactive model visualization.');
  await dialog.getByRole('button', { name: 'Save inquiry', exact: true }).click();
  const confirmation = page.getByRole('dialog', { name: 'Your inquiry is ready', exact: true });
  await expect(confirmation).toContainText('No message has been sent.');
  await expect.poll(() => confirmation.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  const mobileNavigation = page.getByRole('button', { name: 'Open navigation', exact: true });
  const isMobile = await mobileNavigation.isVisible();
  const navigationTrigger = isMobile ? mobileNavigation : page.getByRole('button', { name: 'Company', exact: true });
  await navigationTrigger.click();
  if (isMobile) await page.getByRole('dialog', { name: 'Explore Decart', exact: true }).getByRole('button', { name: 'Contact us', exact: true }).click();
  else await page.locator('.dropdown').getByRole('button', { name: /Contact/ }).click();
  await expect(confirmation).toBeVisible();
  await expect.poll(() => confirmation.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.getByRole('button', { name: 'Edit inquiry', exact: true }).click();
  await expect(page.getByLabel('Work email', { exact: true })).toHaveValue('designer@example.com');
  await expect(page.getByLabel('Work email', { exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(navigationTrigger).toBeFocused();
});
