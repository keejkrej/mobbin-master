import { test, expect, openStudy, captureRender, checkDialogKeyboard, assertNoHorizontalOverflow } from './fixtures';

test('Contra Labs: renders editorial artwork and research without overflow', async ({ page }, testInfo) => {
  await openStudy(page, 'contra-labs');
  await expect(page.getByRole('heading', { name: 'Human taste is the new training data.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore Creative Arena', exact: true })).toBeVisible();
  await captureRender(page, testInfo, 'contra-labs');
});

test('Contra Labs: filters research and completes an editable local application', async ({ page }) => {
  await openStudy(page, 'contra-labs');
  await page.getByRole('tab', { name: 'Research & insights', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Explore Creative Arena', exact: true })).toBeHidden();
  await page.getByRole('button', { name: 'Explore Human Creativity Benchmark', exact: true }).click();
  const research = page.getByRole('dialog', { name: 'Human Creativity Benchmark', exact: true });
  await expect(research).toBeVisible();
  await research.getByRole('button', { name: 'Contact the research team', exact: true }).click();
  const application = page.getByRole('dialog', { name: 'Let’s build better creative AI.', exact: true });
  await expect(application).toBeVisible();
  await application.getByLabel('Your name', { exact: true }).fill('Alex Morgan');
  await application.getByLabel('Email address', { exact: true }).fill('alex@example.com');
  await application.getByRole('combobox', { name: 'Your discipline', exact: true }).selectOption('Research');
  await application.getByLabel('Tell us about your project', { exact: true }).fill('Exploring how human taste can guide creative AI evaluation.');
  await application.getByRole('button', { name: 'Review application', exact: true }).click();
  const review = page.getByRole('dialog', { name: 'A little introduction.', exact: true });
  await expect(review.getByText('alex@example.com', { exact: true })).toBeVisible();
  await expect.poll(() => review.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await review.getByRole('button', { name: 'Edit details', exact: true }).click();
  await application.getByLabel('Your name', { exact: true }).fill('Alex Rivera');
  await application.getByRole('button', { name: 'Review application', exact: true }).click();
  await expect(review.getByText('Alex Rivera', { exact: true })).toBeVisible();
  await review.getByRole('button', { name: 'Finish local application', exact: true }).click();
  const complete = page.getByRole('dialog', { name: 'A new perspective, noted.', exact: true });
  await expect(complete.getByText('Your sample application is complete in this browser. Nothing was sent to Contra Labs.')).toBeVisible();
  await complete.getByRole('button', { name: 'Back to exploring', exact: true }).click();
  await expect(complete).toBeHidden();
  await expect(page.getByRole('button', { name: 'Explore Human Creativity Benchmark', exact: true })).toBeFocused();
  await assertNoHorizontalOverflow(page);
});

test('Contra Labs: application and mobile navigation support keyboard dismissal', async ({ page }) => {
  await openStudy(page, 'contra-labs');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Work with Contra Labs', exact: true }), 'Let’s build better creative AI.');
  const menu = page.getByRole('button', { name: 'Open navigation', exact: true });
  if (await menu.isVisible()) {
    await checkDialogKeyboard(page, menu, 'contra LABS');
    await expect(page.getByRole('dialog', { name: 'contra LABS', exact: true })).toBeHidden();
  }
});
