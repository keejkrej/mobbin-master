import { test, expect, openStudy, captureRender, assertNoHorizontalOverflow, checkDialogKeyboard } from './fixtures';

test('Giga: renders the forest hero and source-backed product sections', async ({ page }, testInfo) => {
  await openStudy(page, 'giga');
  await expect(page.getByRole('heading', { name: 'AI that talks like a human. Handles millions of calls.', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Postman, Rio, DoorDash, capital.com, and afriex', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Phone support that sounds like your best agent, every call.', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'giga');
});

test('Giga: explores a sample call and chat, then previews a demo request', async ({ page }) => {
  await openStudy(page, 'giga');
  await page.getByLabel('Sample scenario', { exact: true }).selectOption('Delivery delay');
  await page.getByRole('button', { name: 'Start sample call', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Your order is on its way.');
  await page.getByRole('button', { name: 'Mute sample', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Unmute sample', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'End sample call', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Start sample call', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Message Giga', exact: true }).fill('Can I update my shipping address?');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByLabel('Sample conversation messages', { exact: true })).toContainText('your address change is ready for review');
  await expect(page.getByRole('textbox', { name: 'Message Giga', exact: true })).toHaveValue('');
  await page.locator('.closing-section').getByRole('button', { name: 'Talk to us', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Talk to us', exact: true });
  await dialog.getByRole('textbox', { name: 'Full name', exact: true }).fill('Alex Morgan');
  await dialog.getByRole('textbox', { name: 'Work email', exact: true }).fill('alex@example.com');
  await dialog.getByRole('textbox', { name: 'Company', exact: true }).fill('Acme Support');
  await dialog.getByLabel('Monthly support conversations', { exact: true }).selectOption('50,000–250,000');
  await dialog.getByRole('button', { name: 'Preview demo request', exact: true }).click();
  await expect(dialog.getByRole('status')).toContainText('Your demo request is ready.');
  await expect(dialog.getByRole('status')).toContainText('Acme Support');
  await expect(dialog.getByRole('status')).toContainText('alex@example.com');
  await expect(dialog.getByRole('status')).toContainText('Your information has not been sent.');
  await expect(dialog.getByRole('heading', { name: 'Your demo request is ready.', exact: true })).toBeFocused();
  await dialog.getByRole('button', { name: 'Edit request', exact: true }).click();
  await expect(dialog.getByRole('textbox', { name: 'Full name', exact: true })).toBeFocused();
  await expect(dialog.getByRole('textbox', { name: 'Company', exact: true })).toHaveValue('Acme Support');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await assertNoHorizontalOverflow(page);
});

test('Giga: modal and navigation keyboard controls restore focus', async ({ page }) => {
  await openStudy(page, 'giga');
  const contact = page.locator('.hero-cta');
  await checkDialogKeyboard(page, contact, 'Talk to us');
  if ((page.viewportSize()?.width ?? 1440) <= 700) {
    await expect(page.locator('.desktop-nav')).toBeHidden();
    const menu = page.getByRole('button', { name: 'Open navigation', exact: true });
    await checkDialogKeyboard(page, menu, 'Menu');
    await menu.focus();
    await page.keyboard.press('Enter');
    await page.getByRole('dialog', { name: 'Menu', exact: true }).getByRole('button', { name: 'Talk to us', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Talk to us', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
  } else {
    const product = page.getByRole('button', { name: 'Product', exact: true });
    await product.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('link', { name: 'Voice agents Natural conversations at scale', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(product).toHaveAttribute('aria-expanded', 'false');
    await expect(product).toBeFocused();
    const company = page.getByRole('button', { name: 'Company', exact: true }).first();
    await company.click();
    await page.locator('#company-menu').getByRole('button', { name: 'About Giga', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'About Giga', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(company).toBeFocused();
  }
});
