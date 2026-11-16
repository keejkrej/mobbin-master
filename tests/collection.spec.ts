import { test, expect, assertNoHorizontalOverflow } from './fixtures';
import studies from '../collection.json';

test('collection: all studies are reachable and search combines with collection filters', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  const cards = page.locator('.card:visible');
  await expect(cards).toHaveCount(studies.length);
  for (const study of studies) {
    await expect(page.locator(`.card[href="/${study.slug}/"]`)).toContainText(study.name);
  }
  await page.getByRole('button', { name: 'Latest' }).click();
  const latestEdition = Math.max(...studies.map(study => study.edition));
  const latest = studies.filter(study => study.edition === latestEdition);
  await expect(cards).toHaveCount(latest.length);
  const search = page.getByRole('searchbox', { name: 'Find a study' });
  await search.fill(latest[0].name);
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText(latest[0].name);
  await search.fill('Suno');
  await expect(page.getByText('No studies match your search.')).toBeVisible();
  await search.clear();
  await page.getByRole('button', { name: 'Websites' }).click();
  const websites = studies.filter(study => 'surface' in study && study.surface === 'website');
  await expect(cards).toHaveCount(websites.length);
  await search.fill(websites[0].name);
  await expect(cards).toHaveCount(1);
  await search.fill('Suno');
  await expect(page.getByText('No studies match your search.')).toBeVisible();
  await search.clear();
  await page.getByRole('button', { name: 'AI products' }).click();
  await expect(cards).toHaveCount(studies.filter(study => study.ai).length);
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
