import { test, expect, assertNoHorizontalOverflow } from './fixtures';
import studies from '../collection.json';

test('collection: all studies are reachable and search combines with the AI filter', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  const cards = page.locator('.card:visible');
  await expect(cards).toHaveCount(studies.length);
  for (const study of studies) {
    await expect(page.locator(`.card[href="/${study.slug}/"]`)).toContainText(study.name);
  }
  await page.getByRole('button', { name: 'AI products' }).click();
  await expect(cards).toHaveCount(studies.filter(study => study.ai).length);
  const search = page.getByRole('searchbox', { name: 'Find a study' });
  await search.fill('Suno');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('Suno');
  await search.fill('Airbnb');
  await expect(page.getByText('No studies match your search.')).toBeVisible();
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('Airbnb');
  await assertNoHorizontalOverflow(page);
  await cards.click();
  await expect(page).toHaveURL(/\/airbnb\/$/);
  await expect(page.getByRole('main')).toBeVisible();
});
