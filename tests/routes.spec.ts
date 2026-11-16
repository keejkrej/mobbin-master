import { test, expect } from './fixtures';

test('exported pages: nested routes support direct links and reloads', async ({ page, request }) => {
  const routes = [
    '/linear/projects', '/linear/issue', '/claude/chats', '/claude/conversation',
    '/replit/workspace', '/replit/preview', '/bolt/draft', '/bolt/builder',
    '/lindy/flow', '/lindy/agents',
  ];
  for (const route of routes) {
    for (const suffix of ['', '/']) {
      const response = await request.get(route + suffix);
      expect(response.status(), route + suffix).toBe(200);
      expect(response.headers()['content-type']).toContain('text/html');
      expect(await response.text()).toMatch(/<!doctype html>/i);
    }
  }
  await page.goto('/lindy/flow/');
  await expect(page.getByRole('main')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('main')).toBeVisible();
  const missing = await request.get('/lindy/does-not-exist');
  expect(missing.status()).toBe(404);
});
