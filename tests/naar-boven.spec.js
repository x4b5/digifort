import { test, expect } from '@playwright/test';

test('naar boven: verstopt bovenaan, verschijnt na scrollen en brengt je terug', async ({ page }) => {
  await page.goto('/woordenboek');
  const knop = page.getByRole('link', { name: 'Naar boven' });

  // bovenaan is er niets om naar terug te gaan; verstopt betekent ook: niet met Tab te bereiken
  await expect(knop).toBeHidden();

  // scrollTo in plaats van het muiswiel: dat laatste doet WebKit niet in een test
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
  await expect(knop).toBeVisible();

  await knop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(knop).toBeHidden();
});
