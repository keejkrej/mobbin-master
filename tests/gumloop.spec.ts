import { test, expect, openStudy, captureRender, assertNoHorizontalOverflow, checkDialogKeyboard } from './fixtures';

test('Gumloop: renders the workflow gallery without missing images or overflow', async ({ page }, testInfo) => {
  await openStudy(page, 'gumloop');
  await expect(page.getByRole('heading', { name: 'Workflows', exact: true })).toBeVisible();
  await expect(page.locator('.workflow-card')).toHaveCount(3);
  await captureRender(page, testInfo, 'gumloop');
});

test('Gumloop: creates a workflow, edits its node, and previews local run results', async ({ page }, testInfo) => {
  await openStudy(page, 'gumloop');
  await page.getByRole('button', { name: 'Create Workflow', exact: true }).click();
  const create = page.getByRole('dialog', { name: 'Create Workflow', exact: true });
  await create.getByRole('textbox', { name: 'Workflow name', exact: true }).fill('Support feedback review');
  await create.getByRole('button', { name: 'Create and open', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Support feedback review', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Google Sheets link', exact: true }).fill('https://docs.google.com/spreadsheets/d/local-feedback');
  await page.getByRole('button', { name: 'Activate as flow trigger', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Activate as flow trigger', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Saved', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Run', exact: true }).click();
  const results = page.getByRole('dialog', { name: 'Run results', exact: true });
  await expect(results).toBeVisible();
  await expect(results.getByText('Workflow completed', { exact: true })).toBeVisible();
  await expect(results.locator('tbody tr')).toHaveCount(3);
  await expect(results.getByText('Needs Attention', { exact: true })).toBeVisible();
  await results.getByRole('button', { name: 'Back to workflow', exact: true }).click();
  await expect(page.getByText('Workflow saved in this session', { exact: true })).toBeHidden();
  await assertNoHorizontalOverflow(page);
  await captureRender(page, testInfo, 'gumloop-builder');
});

test('Gumloop: creation dialog and mobile navigation preserve keyboard focus', async ({ page }) => {
  await openStudy(page, 'gumloop');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Create Workflow', exact: true }), 'Create Workflow');
  const navigation = page.getByRole('button', { name: 'Open navigation', exact: true });
  if (await navigation.isVisible()) {
    await checkDialogKeyboard(page, navigation, 'Navigation');
    await expect(page.getByRole('dialog', { name: 'Navigation', exact: true })).toBeHidden();
    await page.getByRole('button', { name: 'Open New Workflow', exact: true }).click();
    const chat = page.getByRole('button', { name: 'Open workflow builder chat', exact: true });
    await expect(page.getByRole('dialog', { name: 'Workflow builder chat', exact: true })).toBeHidden();
    await checkDialogKeyboard(page, chat, 'Workflow builder chat');
  }
});
