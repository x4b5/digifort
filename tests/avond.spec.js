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

test('"toch niet gedaan" zet het vinkje terug binnen de avond zelf', async ({ page }) => {
  await page.goto('/een-avond');
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await page.locator('[data-stap="1"] [data-terug]').click();
  const stap = page.locator('[data-stap="0"]');
  await expect(stap.locator('[data-klaar-zin]')).toBeVisible();

  await stap.locator('[data-toch-niet]').click();
  await expect(stap.locator('[data-klaar-zin]')).toBeHidden();

  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="mail-wachtwoord"]')).not.toBeChecked();
});

test('de resterende tijd telt alleen wat nog open staat', async ({ page }) => {
  await page.goto('/een-avond');
  // zes stappen: 5 + 10 + 20 + 10 + 2 + 5 = 52 minuten
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText(/nog ongeveer 52 minuten/);
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText(/nog ongeveer 47 minuten/);
});

test('een weekend: niveau 2 stap voor stap, met het vinkje in hoofdstuk 4', async ({ page }) => {
  await page.goto('/een-weekend');
  // tien stappen, samen 240 minuten: vanaf anderhalf uur in uren
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText(/Stap 1 van 10 · nog ongeveer 4 uur/);
  await expect(page.locator('[data-stap="0"] .hoe li').first()).toBeVisible();
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await expect(page.locator('[data-stap="1"]')).toBeVisible();
  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="accounts-wachtwoord"]')).toBeChecked();
});

test('ik wil verder: niveau 3 stap voor stap, zonder tijden', async ({ page }) => {
  await page.goto('/ik-wil-verder');
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText('Stap 1 van 6');
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="hardwaresleutel"]')).toBeChecked();
});

test('elke stap van niveau 1, 2 en 3 heeft uitleg hoe je het doet', async ({ page }) => {
  for (const [pad, aantal] of [['/een-avond', 6], ['/een-weekend', 10], ['/ik-wil-verder', 6]]) {
    await page.goto(pad);
    const stappen = page.locator('[data-stap]');
    await expect(stappen).toHaveCount(aantal);
    for (let i = 0; i < aantal; i++) expect(await stappen.nth(i).locator('.hoe li').count()).toBeGreaterThan(1);
  }
});
