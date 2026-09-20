import { test, expect } from '@playwright/test';

test('afvinken telt, blijft na herladen en verschijnt in de kop', async ({ page }) => {
  await page.goto('/aan-de-slag');
  const lijst = page.locator('[data-lijst="niveau-1"]');
  await expect(lijst.locator('[data-stand-tekst]')).toHaveText('0 van 6 gedaan');
  await lijst.locator('input[data-item="mail-wachtwoord"]').check({ force: true });
  await lijst.locator('input[data-item="pincode"]').check({ force: true });
  await expect(lijst.locator('[data-stand-tekst]')).toHaveText('2 van 6 gedaan');
  await expect(lijst.locator('[data-tijd-rest]')).toHaveText(' · nog 45 min');

  await page.reload();
  await expect(lijst.locator('[data-stand-tekst]')).toHaveText('2 van 6 gedaan');
  await expect(page.locator('[data-sloten-tekst]')).toHaveText('2 van 20 sloten dicht');
});

test('wis mijn antwoorden maakt alles leeg', async ({ page }) => {
  await page.goto('/aan-de-slag');
  await page.locator('input[data-item="mail-wachtwoord"]').check({ force: true });
  await page.locator('[data-wis]').click();
  await page.reload();
  await expect(page.locator('[data-lijst="niveau-1"] [data-stand-tekst]')).toHaveText('0 van 6 gedaan');
  await expect(page.locator('[data-sloten]')).toBeHidden();
});
