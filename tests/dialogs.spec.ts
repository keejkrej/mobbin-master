import { test, openStudy, checkDialogKeyboard } from './fixtures';

test('Linear: create dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'linear');
  const mobileMenu = page.getByRole('button', { name: 'Open navigation', exact: true });
  if (await mobileMenu.isVisible()) await mobileMenu.click();
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Create issue', exact: true }), 'New issue');
});

test('Spotify: queue dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'spotify');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Queue', exact: true }), 'Queue');
});

test('Airbnb: sign-in dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'airbnb');
  await page.getByRole('button', { name: 'Open main menu', exact: true }).click();
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Log in or sign up', exact: true }), 'Log in or sign up');
});

test('ChatGPT: share dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'chatgpt');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Group members', exact: true }), 'Share this conversation');
});

test('Claude: customization dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'claude');
  const navigation = page.getByRole('button', { name: 'Open navigation', exact: true });
  if (await navigation.isVisible()) await navigation.click();
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Customize', exact: true }), 'Customize Claude');
});

test('Gemini: voice dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'gemini');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Use microphone', exact: true }), 'Voice input');
});

test('Cursor: voice note dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'cursor');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Add voice note', exact: true }), 'Add a voice note');
});

test('Grok: share dialog contains keyboard focus and closes with Escape', async ({ page }) => {
  await openStudy(page, 'grok');
  await checkDialogKeyboard(page, page.getByRole('button', { name: 'Share', exact: true }), 'Share conversation');
});
