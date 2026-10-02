import { test, expect } from '@playwright/test';

import { TOTAAL_SLOTEN } from '../src/data/lijsten.js';

test('afvinken telt, blijft na herladen en verschijnt in de kop', async ({ page }) => {
  await page.goto('/aan-de-slag');
  const lijst = page.locator('[data-lijst="niveau-1"]');
  await expect(lijst.locator('[data-stand-tekst]')).toHaveText('0 van 6 gedaan');
  await lijst.locator('input[data-item="mail-wachtwoord"]').check({ force: true });
  await lijst.locator('input[data-item="pincode"]').check({ force: true });
  await expect(lijst.locator('[data-stand-tekst]')).toHaveText('2 van 6 gedaan');
  await expect(lijst.locator('[data-tijd-rest]')).toHaveText(' · nog 55 min');

  await page.reload();
  await expect(lijst.locator('[data-stand-tekst]')).toHaveText('2 van 6 gedaan');
  await expect(page.locator('[data-sloten-tekst]')).toHaveText(`2 van ${TOTAAL_SLOTEN} sloten dicht`);
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
  // de teller blijft staan, in nulstand: hij nodigt uit om te beginnen
  await expect(page.locator('[data-sloten-tekst]')).toHaveText(`0 van ${TOTAAL_SLOTEN} sloten dicht`);
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

test('Aan de slag is een takenlijst: status per stap en een link naar hoe je het doet', async ({ page }) => {
  await page.goto('/aan-de-slag');
  const lijst = page.locator('[data-lijst="niveau-1"]');
  const rij = lijst.locator('li').filter({ has: page.locator('input[data-item="updates"]') });
  await expect(rij.locator('[data-status]')).toHaveText('Nog doen');
  await expect(rij.locator('a.hoe-link')).toHaveAttribute('href', '/een-avond#stap-updates');
  await rij.locator('input[data-item="updates"]').check({ force: true });
  await expect(rij.locator('[data-status]')).toHaveText('Gedaan');

  // elke stap van niveau 1, 2 en 3 wijst naar zijn eigen stap-voor-stappagina
  for (const [l, pad] of [['niveau-1', '/een-avond'], ['niveau-2', '/een-weekend'], ['niveau-3', '/ik-wil-verder']]) {
    const links = page.locator(`[data-lijst="${l}"] a.hoe-link`);
    expect(await links.count()).toBeGreaterThan(0);
    for (const href of await links.evaluateAll((a) => a.map((x) => x.getAttribute('href')))) expect(href).toMatch(new RegExp(`^${pad}#stap-`));
  }

  // de link opent precies die stap
  await rij.locator('a.hoe-link').click();
  await expect(page.locator('#stap-updates')).toBeVisible();
});

test('de startknop van een niveau zegt begin, ga verder of bekijk nog eens', async ({ page }) => {
  await page.goto('/aan-de-slag');
  const knop = page.locator('[data-niveau="niveau-1"] [data-niveau-knop]');
  await expect(knop).toHaveText('Begin met niveau 1 →');
  await expect(knop).toHaveAttribute('href', '/een-avond');
  await page.locator('input[data-item="mail-wachtwoord"]').check({ force: true });
  await expect(knop).toHaveText('Ga verder met niveau 1 →');
  for (const id of ['mail-tweede-slot', 'wachtwoordmanager', 'updates', 'pincode', 'geheim-woord']) {
    await page.locator(`input[data-item="${id}"]`).check({ force: true });
  }
  await expect(knop).toHaveText('Bekijk niveau 1 nog eens →');
});
