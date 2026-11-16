import { test, expect, openStudy, assertNoHorizontalOverflow } from './fixtures';

test('Linear: creates an issue, changes status, and adds a comment', async ({ page }) => {
  await openStudy(page, 'linear');
  await page.keyboard.press('c');
  const dialog = page.getByRole('dialog', { name: 'New issue', exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('textbox', { name: 'Issue title', exact: true }).fill('Verify keyboard navigation');
  await dialog.getByRole('textbox', { name: 'Issue description', exact: true }).fill('Check the newly created issue using the interface.');
  await dialog.getByRole('combobox', { name: 'New issue status', exact: true }).selectOption('Todo');
  await dialog.getByRole('button', { name: 'Create issue', exact: true }).click();
  await expect(dialog).toBeHidden();
  await page.getByRole('button').filter({ hasText: 'Verify keyboard navigation' }).click();
  await expect(page.getByRole('textbox', { name: 'Issue title', exact: true })).toHaveValue('Verify keyboard navigation');
  await page.getByRole('combobox', { name: 'Issue status', exact: true }).selectOption('Done');
  await expect(page.getByRole('combobox', { name: 'Issue status', exact: true })).toHaveValue('Done');
  await page.getByRole('textbox', { name: 'Write a comment', exact: true }).fill('Keyboard flow checked.');
  await page.getByRole('button', { name: 'Comment', exact: true }).click();
  await expect(page.getByText('Keyboard flow checked.', { exact: true })).toBeVisible();
  await assertNoHorizontalOverflow(page);
});

test('Spotify: plays, changes track, searches, and persists a liked song', async ({ page }) => {
  await openStudy(page, 'spotify');
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next track', exact: true }).click();
  await expect(page.getByLabel('Music player', { exact: true })).toContainText('BIRDS OF A FEATHER');
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Play', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search songs', exact: true }).fill('Taste');
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await page.getByRole('button', { name: 'Like Taste', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Unlike Taste', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByRole('button', { name: 'Unlike Taste', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await assertNoHorizontalOverflow(page);
});

test('Airbnb: saves a stay, restores the wishlist, and searches a destination', async ({ page }) => {
  await openStudy(page, 'airbnb');
  await page.getByRole('button', { name: 'Save Apartment in Center City to wishlist', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Remove Apartment in Center City from wishlist', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByRole('button', { name: 'Remove Apartment in Center City from wishlist', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Open main menu', exact: true }).click();
  await page.getByRole('button', { name: /^Wishlists/ }).click();
  await expect(page.getByRole('heading', { name: 'Wishlists', exact: true })).toBeVisible();
  await expect(page.locator('.results-grid .stay-card')).toHaveCount(1);
  await page.getByRole('textbox', { name: 'Search destinations', exact: true }).fill('Miami');
  await page.getByRole('button', { name: 'Search stays', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Stays in Miami', exact: true })).toBeVisible();
  await expect(page.locator('.results-grid .stay-card')).toHaveCount(7);
  await page.getByRole('button', { name: 'View Apartment in Miami, $381 for 2 nights', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Apartment in Miami', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reserve', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('This study does not create a booking.');
  await assertNoHorizontalOverflow(page);
});

test('ChatGPT: submits a prompt and renders a local assistant reply', async ({ page }) => {
  await openStudy(page, 'chatgpt');
  const composer = page.getByRole('textbox', { name: 'Message ChatGPT', exact: true });
  await composer.fill('Help me plan a weekend trip');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.custom-conversation .self-message')).toHaveText('Help me plan a weekend trip');
  await expect(page.locator('.custom-conversation .assistant-message')).toContainText('Let’s keep the plan relaxed');
  await expect(composer).toHaveValue('');
  await assertNoHorizontalOverflow(page);
});

test('Claude: submits a prompt and renders a local assistant reply', async ({ page }) => {
  await openStudy(page, 'claude');
  const composer = page.getByRole('textbox', { name: 'Message Claude', exact: true });
  await composer.fill('Help me plan a relaxed weekend');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.message-user').last()).toContainText('Help me plan a relaxed weekend');
  await expect(page.locator('.message-assistant').last()).toBeVisible();
  await expect(page.locator('.message-assistant .message-content p').last()).not.toBeEmpty();
  await expect(composer).toHaveValue('');
  await assertNoHorizontalOverflow(page);
});

test('Gemini: selects a model, submits a prompt, and toggles feedback', async ({ page }) => {
  await openStudy(page, 'gemini');
  await page.getByRole('button', { name: 'Choose model, current Flash', exact: true }).click();
  await page.getByRole('menuitemradio', { name: /Thinking More time/ }).click();
  await expect(page.getByRole('button', { name: 'Choose model, current Thinking', exact: true })).toBeVisible();
  const composer = page.getByRole('textbox', { name: 'Ask Gemini', exact: true });
  await composer.fill('Plan a picnic for Saturday');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.message.user')).toContainText('Plan a picnic for Saturday');
  await expect(page.locator('.message.assistant')).toContainText('Here’s a simple plan');
  await page.getByRole('button', { name: 'Good response', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Good response', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(composer).toHaveValue('');
  await assertNoHorizontalOverflow(page);
});

test('Cursor: submits instructions and continues the completed local task', async ({ page }) => {
  await openStudy(page, 'cursor');
  await page.getByRole('textbox', { name: 'Agent instructions', exact: true }).fill('Review the app navigation for accessibility');
  await page.getByRole('button', { name: 'Start agent', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Review the app navigation for accessibility', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Repository overview', exact: true })).toBeVisible();
  await expect(page.locator('.task-status')).toContainText('Completed');
  await page.getByRole('button', { name: 'Continue task', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Agent instructions', exact: true })).toHaveValue('Continue reviewing this repository and suggest the next steps.');
  await assertNoHorizontalOverflow(page);
});

test('Grok: submits a prompt and keeps it in local history', async ({ page }) => {
  await openStudy(page, 'grok');
  await page.getByRole('button', { name: 'New chat', exact: true }).click();
  const composer = page.getByRole('textbox', { name: 'Ask anything', exact: true });
  await composer.fill('Suggest a simple weekend project');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('.local-conversation .user-message')).toContainText('Suggest a simple weekend project');
  await expect(page.locator('.local-conversation .assistant-message')).toContainText('Here is a starting point');
  await expect(composer).toHaveValue('');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('grok-study-history'))).toContain('Suggest a simple weekend project');
  await assertNoHorizontalOverflow(page);
});
