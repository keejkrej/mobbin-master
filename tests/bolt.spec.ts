import { test, expect, openStudy, captureRender, assertNoHorizontalOverflow, checkDialogKeyboard } from './fixtures';

test('Bolt: renders the prompt home and reference draft', async ({ page }, testInfo) => {
  await openStudy(page, 'bolt');
  await expect(page.getByRole('heading', { name: 'What do you want to build?', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Build prompt', exact: true })).toBeEmpty();
  await captureRender(page, testInfo, 'bolt-home');
  await page.goto('/bolt/draft/');
  await expect(page.getByRole('textbox', { name: 'Build prompt', exact: true })).toHaveValue(/I'm a ux designer/);
  await expect(page.getByRole('img', { name: 'Attached design-reference.webp', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'bolt-draft');
});

test('Bolt: builds, edits and renames a local portfolio', async ({ page }, testInfo) => {
  await openStudy(page, 'bolt');
  await page.getByRole('textbox', { name: 'Build prompt', exact: true }).fill('Build a clean designer portfolio with selected case studies');
  await page.getByRole('button', { name: 'Build project', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Senior UX Designer crafting meaningful digital experiences', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Edit preview', exact: true }).click();
  const editor = page.getByRole('dialog', { name: 'Edit preview', exact: true });
  await editor.getByRole('textbox', { name: 'Designer name', exact: true }).fill('Alex Rivera');
  await editor.getByRole('textbox', { name: 'Headline', exact: true }).fill('Design with purpose');
  await editor.getByRole('textbox', { name: 'Highlighted phrase', exact: true }).fill('');
  await editor.getByRole('combobox', { name: 'Accent color', exact: true }).selectOption('#7c3aed');
  await editor.getByRole('button', { name: 'Done', exact: true }).click();
  await expect(page.locator('.portfolio-header strong')).toHaveText('Alex Rivera');
  await expect(page.getByRole('heading', { name: 'Design with purpose', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Rename project', exact: true }).click();
  await page.getByRole('textbox', { name: 'Project name', exact: true }).fill('Rivera Portfolio');
  await page.getByRole('button', { name: 'Save project name', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Rename project', exact: true })).toContainText('Rivera Portfolio');
  await page.getByRole('tab', { name: 'Code', exact: true }).click();
  await expect(page.getByRole('tabpanel', { name: 'Code', exact: true })).toContainText('Alex Rivera');
  await page.getByRole('tab', { name: 'Preview', exact: true }).click();
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Open builder chat', exact: true }).click();
  await page.getByRole('textbox', { name: 'Message Bolt', exact: true }).fill('make it green');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  const chat = testInfo.project.name === 'mobile' ? page.getByRole('dialog', { name: 'Builder chat', exact: true }) : page.getByRole('region', { name: 'Builder conversation', exact: true });
  await expect(chat.getByText('Changed the preview accent to green.', { exact: true })).toBeVisible();
  if (testInfo.project.name === 'mobile') {
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Builder chat', exact: true })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open builder chat', exact: true })).toBeFocused();
  }
  await assertNoHorizontalOverflow(page);
  await captureRender(page, testInfo, 'bolt-builder');
});

test('Bolt: import dialog contains keyboard focus and dismisses with Escape', async ({ page }) => {
  await openStudy(page, 'bolt');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'GitHub', exact: true }), 'Import from GitHub');
});
