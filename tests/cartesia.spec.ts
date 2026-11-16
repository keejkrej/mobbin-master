import { test, expect, openStudy, captureRender, checkDialogKeyboard, assertNoHorizontalOverflow } from './fixtures';

test('Cartesia: renders its green hero and illustrated research sections', async ({ page }, testInfo) => {
  await openStudy(page, 'cartesia');
  await expect(page.getByRole('heading', { name: 'Meet Sonic-3.5 and Ink-2.', exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Finance', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('img', { name: 'Green line illustration of people in a connected office building', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'cartesia');
});

test('Cartesia: changes industry and previews a custom voice script', async ({ page }) => {
  await openStudy(page, 'cartesia');
  await page.getByRole('tab', { name: 'Healthcare', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Care starts with a conversation', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Try Cartesia', exact: true }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Try a conversation', exact: true });
  await dialog.getByRole('textbox', { name: 'What would you like to say?', exact: true }).fill('Good morning. Your appointment is confirmed for Thursday at ten.');
  await dialog.getByRole('combobox', { name: 'Voice direction', exact: true }).selectOption('Clear assistant');
  await dialog.getByRole('combobox', { name: 'Speaking speed', exact: true }).selectOption('0.8');
  await dialog.getByRole('button', { name: 'Preview script', exact: true }).click();
  const preview = dialog.getByRole('region', { name: 'Script preview', exact: true });
  await expect(preview).toContainText('Good morning. Your appointment is confirmed for Thursday at ten.');
  await expect(preview).toContainText('Clear assistant');
  await expect(preview).toContainText('0.8× · Browser voice preview');
  await dialog.getByRole('tab', { name: 'Ink · Transcription', exact: true }).click();
  await dialog.getByRole('button', { name: 'Café', exact: true }).click();
  await dialog.getByRole('button', { name: 'Show sample transcript', exact: true }).click();
  await expect(preview).toContainText('One flat white, please.');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await assertNoHorizontalOverflow(page);
});

test('Cartesia: dialogs and mobile navigation contain and restore keyboard focus', async ({ page }) => {
  await openStudy(page, 'cartesia');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Try Cartesia', exact: true }).first(), 'Try a conversation');
  const mobileNavigation = page.getByRole('button', { name: 'Open navigation', exact: true });
  if (await mobileNavigation.isVisible()) {
    await expect(page.locator('.desktop-nav')).toBeHidden();
    await checkDialogKeyboard(page, mobileNavigation, 'Explore Cartesia');
    await expect(page.getByRole('dialog', { name: 'Explore Cartesia', exact: true })).toBeHidden();
    await mobileNavigation.click();
    await page.getByRole('dialog', { name: 'Explore Cartesia', exact: true }).getByRole('button', { name: 'Products', exact: true }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('button', { name: 'Products', exact: true }).click();
  }
  const products = page.getByRole('dialog', { name: 'Our models', exact: true });
  await products.getByRole('button', { name: 'Sonic Text to speech', exact: true }).click();
  const playground = page.getByRole('dialog', { name: 'Try a conversation', exact: true });
  await expect.poll(() => playground.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(playground).toBeHidden();
  await page.locator('.mission').getByRole('button', { name: 'Contact Sales', exact: true }).click();
  const contact = page.getByRole('dialog', { name: 'Let’s build something together.', exact: true });
  await contact.getByRole('textbox', { name: 'Your name', exact: true }).fill('Alex Study');
  await contact.getByRole('textbox', { name: 'Work email', exact: true }).fill('alex@example.com');
  await contact.getByRole('button', { name: 'Review request', exact: true }).click();
  await expect(contact.getByRole('heading', { name: 'Your request is ready to review.', exact: true })).toBeVisible();
  await expect.poll(() => contact.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(contact).toBeHidden();
  await expect(page.locator('.mission').getByRole('button', { name: 'Contact Sales', exact: true })).toBeFocused();
});
