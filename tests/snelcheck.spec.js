import { test, expect } from '@playwright/test';

test('de snelcheck kleurt het fort meteen en telt mee in de huischeck', async ({ page }) => {
  await page.goto('/');
  const check = page.locator('[data-snelcheck]');
  await expect(check.locator('[data-snel-klaar]')).toBeHidden();

  await check.locator('[data-snel="2"] .ja').click(); // wachtwoordmanager: ja → gracht staat
  await expect(page.locator('[data-deel="gracht"]')).toHaveAttribute('data-toestand', 'dicht');
  await expect(check.locator('[data-snel="2"] [data-gevolg]')).toHaveText('De gracht staat.');

  await check.locator('[data-snel="4"] .nee').click(); // updates: nee → torenwacht wankelt
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'open');
  await expect(page.locator('[data-kanteel="toren"]')).toHaveAttribute('data-toestand', 'open');

  await check.locator('[data-snel="5"] .ja').click();
  await expect(check.locator('[data-snel-klaar]')).toBeVisible();

  // dezelfde antwoorden staan klaar in de huischeck
  await page.goto('/huischeck');
  await expect(page.locator('input[name=v2][value=ja]')).toBeChecked();
  await expect(page.locator('input[name=v4][value=nee]')).toBeChecked();
});

test('de snelcheck laat eerdere huischeck-antwoorden zien', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('[data-vraag="5"] .nee').click();
  await page.goto('/');
  await expect(page.locator('[data-snel="5"] input[value=nee]')).toBeChecked();
  await expect(page.locator('[data-snel="5"]')).toHaveAttribute('data-toestand', 'open');
});
