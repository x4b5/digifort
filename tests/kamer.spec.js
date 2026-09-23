import { test, expect } from '@playwright/test';

test('de plattegrond: veertien kamers, dicht tot je er een aantikt', async ({ page }) => {
  await page.goto('/plattegrond');
  const kamers = page.locator('details.kamer');
  await expect(kamers).toHaveCount(14);
  await expect(page.locator('details.kamer[open]')).toHaveCount(0);
  const voordeur = page.locator('#de-voordeur-je-e-mail');
  await expect(voordeur.locator('.zin')).toHaveText('Je e-mail is de belangrijkste deur van je huis.');
  await voordeur.locator('summary').click();
  await expect(voordeur).toHaveAttribute('open', '');
  await expect(voordeur.locator('.uitleg')).toBeVisible();
});

test('een link naar een kamer klapt hem open', async ({ page }) => {
  await page.goto('/plattegrond#de-sleutelkluis-de-wachtwoordmanager');
  const kluis = page.locator('#de-sleutelkluis-de-wachtwoordmanager');
  await expect(kluis).toHaveAttribute('open', '');
  await expect(kluis.locator('summary')).toBeInViewport();
});

test('het lampje van een kamer kleurt mee met de huischeck', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('[data-vraag="2"] .ja').click(); // wachtwoordmanager → sleutelkluis dicht
  await page.locator('[data-vraag="7"] .nee').click(); // router → tuinhek open
  await page.goto('/plattegrond');
  await expect(page.locator('[data-kamer-uitleg="sleutelkluis"]')).toHaveAttribute('data-toestand', 'dicht');
  await expect(page.locator('[data-kamer-uitleg="tuinhek"]')).toHaveAttribute('data-toestand', 'open');
});
