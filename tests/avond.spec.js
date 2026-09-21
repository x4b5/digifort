import { test, expect } from '@playwright/test';

test('één avond: gedaan zet het vinkje in hoofdstuk 4 en bouwt het fort', async ({ page }) => {
  await page.goto('/een-avond');
  await expect(page.locator('[data-stand]')).toContainText('Stap 1 van 6');
  await expect(page.locator('[data-stap="0"]')).toBeVisible();
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await expect(page.locator('[data-stap="1"]')).toBeVisible();
  await expect(page.locator('[data-bol="0"]')).toHaveAttribute('data-toestand', 'gedaan');
  await page.locator('[data-stap="1"] [data-over]').click();
  await expect(page.locator('[data-stand]')).toContainText('Stap 3 van 6');

  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="mail-wachtwoord"]')).toBeChecked();
  await page.goto('/plattegrond');
  await expect(page.locator('[data-kamer="voordeur"]')).toHaveAttribute('data-toestand', 'dicht');

  // terug: hij begint bij de eerste stap die nog niet gedaan is
  await page.goto('/een-avond');
  await expect(page.locator('[data-stap="1"]')).toBeVisible();
});
