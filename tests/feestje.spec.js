import { test, expect } from '@playwright/test';

test('een fortdeel dat dicht gaat, krijgt een feestje in de kop', async ({ page }) => {
  await page.goto('/');
  const feestje = page.locator('[data-feestje]');
  await expect(feestje).toBeEmpty();

  await page.locator('[data-snel="2"] .ja').click();
  await expect(feestje).toHaveText('De gracht staat.');
  await expect(feestje).toHaveClass(/zichtbaar/);
  await expect(page.locator('[data-kanteel="gracht"]')).toHaveClass(/net-dicht/);

  // een "nee" is geen feest
  await page.locator('[data-snel="4"] .nee').click();
  await expect(feestje).toHaveText('De gracht staat.');

  // bij het laden van een pagina is er niets te vieren, ook al staat de gracht
  await page.reload();
  await expect(feestje).toBeEmpty();
});

test('elk nieuw deel krijgt zijn eigen zin', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('[data-vraag="4"] .ja').click();
  await expect(page.locator('[data-feestje]')).toHaveText('De torenwacht staat.');
  await page.locator('[data-vraag="5"] .ja').click();
  await expect(page.locator('[data-feestje]')).toHaveText('De schatkamer buiten de muur staat.');
});
