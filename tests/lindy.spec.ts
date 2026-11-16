import { test, expect, openStudy, captureRender, assertNoHorizontalOverflow, checkDialogKeyboard } from './fixtures';

test('Lindy: renders the warm reference home and composer', async ({ page }, testInfo) => {
  await openStudy(page, 'lindy');
  await expect(page.getByRole('heading', { name: 'How can I help?', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Build an agent or perform a task', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Customer support email', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Build agent', exact: true })).toBeDisabled();
  await captureRender(page, testInfo, 'lindy');
  const response = await page.goto('/lindy/flow/', { waitUntil: 'networkidle' });
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('button', { name: 'Configure Email received', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'lindy-flow');
});

test('Lindy: creates an agent, edits a flow node, and tests email routing', async ({ page }) => {
  await openStudy(page, 'lindy');
  await page.getByRole('textbox', { name: 'Build an agent or perform a task', exact: true }).fill('Build a customer support email agent');
  await page.getByRole('button', { name: 'Build agent', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Email Support Agent', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Configure Search Knowledge Base', exact: true }).click();
  const configure = page.getByRole('dialog', { name: 'Configure node', exact: true });
  await configure.getByRole('textbox', { name: 'Node name', exact: true }).fill('Search product documentation');
  await configure.getByRole('textbox', { name: 'Node instructions', exact: true }).fill('Look up the latest product guide and refund policy.');
  await configure.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(configure).toBeHidden();
  await expect(page.getByRole('button', { name: 'Configure Search product documentation', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Undo node edit', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Configure Search Knowledge Base', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Redo node edit', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Configure Search product documentation', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Test agent', exact: true }).click();
  const testDialog = page.getByRole('dialog', { name: 'Test agent', exact: true });
  await testDialog.getByRole('textbox', { name: 'Sample email', exact: true }).fill('What is your refund policy?');
  await testDialog.getByRole('button', { name: 'Run test', exact: true }).click();
  await expect(testDialog.getByRole('status')).toContainText('Test completed');
  await expect(testDialog.getByRole('status')).toContainText('Answer found in knowledge base');
  await testDialog.getByRole('textbox', { name: 'Sample email', exact: true }).fill('I need help with an unusual billing exception');
  await testDialog.getByRole('button', { name: 'Run test', exact: true }).click();
  await expect(testDialog.getByRole('status')).toContainText('Escalation path selected');
  await page.keyboard.press('Escape');
  await expect(testDialog).toBeHidden();
  await assertNoHorizontalOverflow(page);
});

test('Lindy: dialogs contain keyboard focus and restore their opener', async ({ page }) => {
  await openStudy(page, 'lindy');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'New Agent', exact: true }), 'New agent');
  if ((page.viewportSize()?.width ?? 1440) <= 650) {
    await expect(page.locator('.desktop-sidebar')).toBeHidden();
    const navigationOpener = page.getByRole('button', { name: 'Open navigation', exact: true });
    await checkDialogKeyboard(page, navigationOpener, 'Navigation');
    await navigationOpener.click();
    await page.getByRole('dialog', { name: 'Navigation', exact: true }).getByRole('button', { name: 'New agent', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'New agent', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(navigationOpener).toBeFocused();
    await page.getByRole('textbox', { name: 'Build an agent or perform a task', exact: true }).fill('Build an email agent');
    await page.getByRole('button', { name: 'Build agent', exact: true }).click();
    await expect(page.locator('.builder-panel')).toBeHidden();
    await expect(page.locator('.inspector')).toBeHidden();
    await checkDialogKeyboard(page, page.getByRole('button', { name: 'Ask', exact: true }), 'Agent builder');
    await expect(page.locator('.builder-panel')).toBeHidden();
  }
});
