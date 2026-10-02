import { test, expect } from '@playwright/test';
import { KAMERS } from '../src/data/kamers.js';
import { doeStap } from '../src/data/doestappen.js';

test('de plattegrond: veertien kamers, dicht tot je er een aantikt', async ({ page }) => {
  await page.goto('/plattegrond');
  const kamers = page.locator('details.kamer');
  await expect(kamers).toHaveCount(14);
  await expect(page.locator('details.kamer[open]')).toHaveCount(0);
  const voordeur = page.locator('#de-voordeur-je-e-mail');
  await expect(voordeur.locator('.uitleg')).toBeHidden();
  await voordeur.locator('summary').click();
  await expect(voordeur).toHaveAttribute('open', '');
  await expect(voordeur.locator('.uitleg')).toBeVisible();
});

test('een dichte kamer toont al het antwoord: onderwerp vooraan, en wat je doet', async ({ page }) => {
  await page.goto('/plattegrond');
  const tuinhek = page.locator('#tuinhek-en-meterkast-router-en-wifi');
  await expect(tuinhek).not.toHaveAttribute('open', '');
  // het woord waar je naar zoekt is de kop; het beeld staat erboven
  await expect(tuinhek.getByRole('heading', { level: 2 })).toHaveText('Router en wifi');
  await expect(tuinhek.locator('summary .beeld')).toHaveText('Tuinhek en meterkast');
  await expect(tuinhek.locator('summary .zin')).toBeVisible();
  await expect(tuinhek.locator('summary .zin')).toHaveText('Staat er nog een wachtwoord uit de fabriek op je router? Verander het.');
  for (const k of KAMERS) {
    await expect(page.locator(`#${k.anker} summary .zin`)).toHaveText(k.doe);
  }
});

test('elke kamer met stappen wijst naar de juiste stap in het doe-deel', async ({ page }) => {
  await page.goto('/plattegrond');
  for (const k of KAMERS) {
    const links = page.locator(`#${k.anker} [data-naar-doen] [data-doe-stap]`);
    await expect(links).toHaveCount(k.stappen.length);
    for (const id of k.stappen) {
      const s = doeStap(id);
      const rij = page.locator(`#${k.anker} [data-doe-stap="${id}"]`);
      await expect(rij.locator('a')).toHaveAttribute('href', s.href);
      await expect(rij.locator('a')).toHaveText(s.stap);
      await expect(rij).toContainText(`${s.pagina}, stap ${s.nr}`);
    }
  }
});

test('het stapnummer op de plattegrond is dezelfde stap op de stap-voor-stap-pagina', async ({ page }) => {
  // de router staat in het weekend: kijk of "stap N" daar echt over de router gaat
  const s = doeStap('router');
  await page.goto('/plattegrond#tuinhek-en-meterkast-router-en-wifi');
  await page.locator('#tuinhek-en-meterkast-router-en-wifi [data-doe-stap="router"] a').click();
  await expect(page).toHaveURL(new RegExp(`${s.href}$`));
  await expect(page.locator(`[data-stap="${s.nr - 1}"] h2`)).toHaveText(s.stap);
});

test('een link naar een kamer klapt hem open', async ({ page }) => {
  await page.goto('/plattegrond#de-sleutelkluis-de-wachtwoordmanager');
  const kluis = page.locator('#de-sleutelkluis-de-wachtwoordmanager');
  await expect(kluis).toHaveAttribute('open', '');
  await expect(kluis.locator('summary')).toBeInViewport();
});

test('één knop klapt alle plekken open en weer dicht', async ({ page }) => {
  await page.goto('/plattegrond');
  const knop = page.locator('[data-alle-knop]');
  await expect(knop).toHaveText('Alle plekken openklappen');
  await expect(knop).toHaveAttribute('aria-expanded', 'false');
  await knop.click();
  await expect(page.locator('details.kamer[open]')).toHaveCount(14);
  await expect(knop).toHaveText('Alle plekken dichtklappen');
  await expect(knop).toHaveAttribute('aria-expanded', 'true');
  await knop.click();
  await expect(page.locator('details.kamer[open]')).toHaveCount(0);

  // klap je zelf alles open, dan zegt de knop dat ook
  for (const s of await page.locator('details.kamer summary').all()) await s.click();
  await expect(knop).toHaveText('Alle plekken dichtklappen');
});

test('zonder JavaScript staat de knop er niet: hij zou niets doen', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/plattegrond');
  await expect(page.locator('[data-alle-knop]')).toBeHidden();
  await context.close();
});

test('het lampje van een kamer kleurt mee met de huischeck, en zegt het ook in woorden', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('[data-vraag="2"] .ja').click(); // wachtwoordmanager → sleutelkluis dicht
  await page.locator('[data-vraag="7"] .nee').click(); // router → tuinhek open
  await page.goto('/plattegrond');
  await expect(page.locator('[data-kamer-uitleg="sleutelkluis"]')).toHaveAttribute('data-toestand', 'dicht');
  await expect(page.locator('[data-kamer-uitleg="tuinhek"]')).toHaveAttribute('data-toestand', 'open');
  await expect(page.locator('[data-kamer-uitleg="sleutelkluis"] [data-toestand-tekst]')).toHaveText('Op slot');
  await expect(page.locator('[data-kamer-uitleg="tuinhek"] [data-toestand-tekst]')).toHaveText('Staat open');
});

test('de lijst met plekken staat vóór de tekening, met de voordeur als eerste', async ({ page }) => {
  await page.goto('/plattegrond');
  const eerste = page.locator('details.kamer').first();
  await expect(eerste).toHaveAttribute('id', 'de-voordeur-je-e-mail');
  const voor = await eerste.evaluate((el) => {
    const tekening = document.querySelector('[data-plattegrond]');
    return Boolean(tekening && (el.compareDocumentPosition(tekening) & Node.DOCUMENT_POSITION_FOLLOWING));
  });
  expect(voor).toBe(true);
});

test('op een telefoon staat je e-mail met wat je doet in het eerste scherm', async ({ page }, info) => {
  test.skip(info.project.name !== 'telefoon', 'alleen op een smal scherm');
  await page.goto('/plattegrond');
  await expect(page.locator('#de-voordeur-je-e-mail summary .zin')).toBeInViewport({ ratio: 0.9 });
});

test('wie denkt dat er is ingebroken, vindt een kop met de eerste stappen', async ({ page }) => {
  await page.goto('/plattegrond');
  const kop = page.getByRole('heading', { level: 2, name: 'Is er al ingebroken in een account?' });
  await expect(kop).toHaveCount(1);
  await page.locator('main a', { hasText: 'wat je nu doet' }).click();
  await expect(kop).toBeInViewport();
  // de kop onder paspoort zegt waar hij over gaat, niet "als het toch misgaat"
  // (hij staat in een dichte kamer, dus zoek hem ook als hij verborgen is)
  await expect(page.getByRole('heading', { name: 'Misbruikt iemand je BSN of paspoort?', includeHidden: true })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Wat doe je als het toch misgaat?', includeHidden: true })).toHaveCount(0);
});
