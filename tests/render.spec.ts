import { test, expect, openStudy, captureRender } from './fixtures';

const apps = ['linear', 'spotify', 'airbnb', 'chatgpt', 'claude', 'gemini', 'cursor', 'grok'] as const;

for (const app of apps) {
  test(`${app}: renders its reference screen without overflow or missing images`, async ({ page }, testInfo) => {
    await openStudy(page, app);
    if (app === 'linear') await expect(page.getByRole('button', { name: 'All issues', exact: true })).toBeVisible();
    if (app === 'spotify') await expect(page.getByRole('heading', { name: 'Today’s Top Hits', exact: true })).toBeVisible();
    if (app === 'airbnb') await expect(page.getByRole('button', { name: 'Popular homes in Philadelphia', exact: true })).toBeVisible();
    if (app === 'chatgpt') await expect(page.getByRole('textbox', { name: 'Message ChatGPT', exact: true })).toBeVisible();
    if (app === 'claude') await expect(page.getByRole('textbox', { name: 'Message Claude', exact: true })).toBeVisible();
    if (app === 'gemini') await expect(page.getByRole('textbox', { name: 'Ask Gemini', exact: true })).toBeVisible();
    if (app === 'cursor') await expect(page.getByRole('textbox', { name: 'Agent instructions', exact: true })).toBeVisible();
    if (app === 'grok') await expect(page.getByRole('textbox', { name: 'Ask anything', exact: true })).toBeVisible();
    await captureRender(page, testInfo, app);
  });
}
