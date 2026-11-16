import { test, expect, openStudy, captureRender, checkDialogKeyboard } from './fixtures';

test('flora: renders the connected creative canvas', async ({ page }, testInfo) => {
  await openStudy(page, 'flora');
  await expect(page.getByRole('heading', { name: 'Your intelligent canvas.', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Truck sketch', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Truck handheld', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'flora');
});

test('flora: previews a direction and creates a shared team folder', async ({ page }, testInfo) => {
  await openStudy(page, 'flora');
  await page.getByRole('button', { name: 'Open Truck handheld', exact: true }).click();
  const canvas = page.getByRole('dialog', { name: 'Truck handheld', exact: true });
  await canvas.getByRole('textbox', { name: 'Creative direction' }).fill('A blue truck crossing the desert at golden hour');
  await canvas.getByRole('combobox', { name: 'Model', exact: true }).selectOption('Reve');
  await canvas.getByRole('button', { name: 'Preview workflow', exact: true }).click();
  await expect(canvas.getByRole('status')).toContainText('Preview ready');
  await expect(canvas.getByRole('img', { name: 'Example truck workflow preview', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Teams', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Intelligent creation for the whole team.', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'flora-teams');
  await page.getByRole('button', { name: 'Add shared folder', exact: true }).click();
  await page.getByRole('textbox', { name: 'Folder name', exact: true }).fill('Launch ideas');
  await page.getByRole('button', { name: 'Create folder', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Launch ideas', exact: true })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Launch ideas created');
});

test('flora: signup dialog traps focus and closes with Escape', async ({ page }, testInfo) => {
  await openStudy(page, 'flora');
  const opener = page.locator('.site-header').getByRole('button', { name: 'Get started for free', exact: true });
  await checkDialogKeyboard(page, opener, 'Create your FLORA workspace');
  await opener.click();
  const signup = page.getByRole('dialog', { name: 'Create your FLORA workspace' });
  await signup.getByRole('textbox', { name: 'Email address' }).fill('designer@example.com');
  await signup.getByRole('button', { name: 'Continue with email', exact: true }).click();
  await expect(signup.getByRole('heading', { name: 'Your workspace is ready to explore.' })).toBeVisible();
  await expect.poll(() => signup.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  if (testInfo.project.name === 'mobile') {
    const navigation = page.getByRole('button', { name: 'Open navigation', exact: true });
    await checkDialogKeyboard(page, navigation, 'Explore FLORA');
    await navigation.click();
    await page.getByRole('dialog', { name: 'Explore FLORA' }).getByRole('button', { name: 'Docs', exact: true }).click();
    const docs = page.getByRole('dialog', { name: 'Docs', exact: true });
    await expect.poll(() => docs.evaluate(element => element.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(navigation).toBeFocused();
  }
});
