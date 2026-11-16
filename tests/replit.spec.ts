import { test, expect, openStudy, captureRender, assertNoHorizontalOverflow, checkDialogKeyboard } from './fixtures';

test('Replit: renders the reference projects gallery', async ({ page }, testInfo) => {
  await openStudy(page, 'replit');
  await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open NYC Coffee Scout', exact: true })).toBeVisible();
  await expect(page.locator('.project-card')).toHaveCount(12);
  await captureRender(page, testInfo, 'replit');
});

test('Replit: finds a project, creates and runs a workflow, and edits its preview', async ({ page }) => {
  await openStudy(page, 'replit');
  await page.getByRole('textbox', { name: 'Search projects', exact: true }).fill('NYC Coffee Scout');
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'Open NYC Coffee Scout', exact: true }).click();
  await page.getByRole('button', { name: 'New Workflow', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'New workflow', exact: true });
  await dialog.getByRole('textbox', { name: 'Workflow name', exact: true }).fill('Check preview');
  await dialog.getByRole('textbox', { name: 'Workflow command', exact: true }).fill('npm run check');
  await dialog.getByRole('button', { name: 'Create workflow', exact: true }).click();
  await expect(dialog).toBeHidden();
  await page.getByRole('button', { name: 'Run Check preview', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Completed successfully · local demo' })).toBeVisible();
  await page.getByRole('button', { name: 'Tools', exact: true }).click();
  await page.getByRole('textbox', { name: 'Preview heading', exact: true }).fill('Coffee worth slowing down for.');
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Coffee worth slowing down for.', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Brooklyn', exact: true }).click();
  await expect(page.locator('.coffee-grid article')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Devoción', exact: true })).toBeVisible();
  await assertNoHorizontalOverflow(page);
});

test('Replit: create-project dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'replit');
  const mobileOpener = page.getByRole('button', { name: 'Create a project', exact: true });
  const opener = await mobileOpener.isVisible() ? mobileOpener : page.getByRole('button', { name: 'Create something new', exact: true });
  await checkDialogKeyboard(page, opener, 'Create a project');
  if ((page.viewportSize()?.width ?? 1440) <= 650) {
    const sidebar = page.locator('.project-sidebar');
    const navigationOpener = page.getByRole('button', { name: 'Open navigation', exact: true });
    await expect(sidebar).toHaveAttribute('inert', '');
    await expect(sidebar).toBeHidden();
    await navigationOpener.focus();
    await page.keyboard.press('Enter');
    await expect(sidebar).toBeVisible();
    await expect.poll(() => sidebar.evaluate(element => element.contains(document.activeElement))).toBe(true);
    const sidebarFirst = sidebar.getByRole('button', { name: 'Search projects', exact: true });
    const sidebarLast = sidebar.getByRole('button', { name: 'Refer & Earn', exact: true });
    await sidebarFirst.focus();
    await page.keyboard.press('Shift+Tab');
    await expect(sidebarLast).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(sidebarFirst).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(sidebar).toHaveAttribute('inert', '');
    await expect(sidebar).toBeHidden();
    await expect(navigationOpener).toBeFocused();

    await page.getByRole('button', { name: 'Open NYC Coffee Scout', exact: true }).click();
    const agent = page.locator('.agent-pane');
    const agentOpener = page.getByRole('button', { name: 'Open agent panel', exact: true });
    await expect(agent).toHaveAttribute('inert', '');
    await expect(agent).toBeHidden();
    await agentOpener.focus();
    await page.keyboard.press('Enter');
    await expect(agent).toBeVisible();
    await expect.poll(() => agent.evaluate(element => element.contains(document.activeElement))).toBe(true);
    await page.getByRole('textbox', { name: 'Message Agent', exact: true }).fill('Check the preview');
    const agentFirst = agent.getByRole('button', { name: 'NYC Coffee Scout', exact: true });
    const agentLast = agent.getByRole('button', { name: 'Send agent message', exact: true });
    await agentFirst.focus();
    await page.keyboard.press('Shift+Tab');
    await expect(agentLast).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(agentFirst).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(agent).toHaveAttribute('inert', '');
    await expect(agent).toBeHidden();
    await expect(agentOpener).toBeFocused();
  } else {
    await expect(page.locator('.project-sidebar')).not.toHaveAttribute('inert', '');
    await page.getByRole('button', { name: 'Open NYC Coffee Scout', exact: true }).click();
    await expect(page.locator('.agent-pane')).not.toHaveAttribute('inert', '');
  }
});
