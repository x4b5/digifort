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

test('wis mijn antwoorden vraagt eerst om bevestiging en maakt daarna alles leeg', async ({ page }) => {
  await page.goto('/aan-de-slag');
  await page.locator('input[data-item="mail-wachtwoord"]').check({ force: true });
  const wis = page.locator('[data-wis]');

  // eerste klik wist nog niets, maar vraagt of je het zeker weet
  await wis.click();
  await expect(wis).toHaveText('Weet je het zeker?');
  await expect(page.locator('[data-lijst="niveau-1"] [data-stand-tekst]')).toHaveText('1 van 6 gedaan');

  // tweede klik wist wel, en meldt dat
  await wis.click();
  await expect(page.locator('[data-wis-melding]')).toHaveText('Je antwoorden en vinkjes zijn gewist.');
  await expect(wis).toHaveText('Wis mijn antwoorden');
  await expect(page.locator('[data-lijst="niveau-1"] [data-stand-tekst]')).toHaveText('0 van 6 gedaan');

  await page.reload();
  await expect(page.locator('[data-lijst="niveau-1"] [data-stand-tekst]')).toHaveText('0 van 6 gedaan');
  await expect(page.locator('[data-sloten]')).toBeHidden();
});

test('het fort zet zijn uitnodigende beginzin terug na wissen', async ({ page }) => {
  await page.goto('/aan-de-slag');
  // "updates" is de enige kamer van de torenwacht, dus één vinkje zet meteen een deel van het fort
  await page.locator('input[data-item="updates"]').check({ force: true });
  const stand = page.locator('[data-fort-stand]');
  await expect(stand).toContainText('delen van je fort');

  const wis = page.locator('[data-wis]');
  await wis.click();
  await wis.click();
  await expect(stand).toContainText('Nog niets afgevinkt');
});
