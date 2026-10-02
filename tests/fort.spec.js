import { test, expect } from '@playwright/test';
import { BRONNEN } from '../src/data/bronnen.js';

test('het fort kleurt mee met de huischeck', async ({ page }) => {
  await page.goto('/aan-de-slag');
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'onbekend');
  await page.goto('/huischeck');
  await page.locator('[data-vraag="4"] .ja').click(); // updates: ja → torenwacht staat
  await page.locator('[data-vraag="1"] .nee').click(); // e-mail: nee → poort wankelt
  await page.goto('/aan-de-slag');
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'dicht');
  await expect(page.locator('[data-deel="poort"]')).toHaveAttribute('data-toestand', 'open');
  await expect(page.locator('[data-fort-stand]')).toHaveText('1 van de 10 delen van je fort staan, 1 wankelt nog.');
  await expect(page.locator('[data-kanteel="toren"]')).toHaveAttribute('data-toestand', 'dicht');
});

test('de trede-check wijst de juiste trede aan', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const check = page.locator('[data-tredecheck]');
  await expect(check.locator('[data-uitslag]')).toBeHidden();
  await check.locator('input[name="tc-ww"][value="kluis"]').check();
  await check.locator('input[name="tc-stap"][value="sms"]').check();
  await check.locator('input[name="tc-nood"][value="nee"]').check();
  await expect(check.locator('[data-titel]')).toHaveText('Een code per sms');
  await expect(check.locator('[data-link]')).toHaveAttribute('href', '#trede-4');
  await check.locator('input[name="tc-stap"][value="sleutel"]').check();
  await check.locator('input[name="tc-nood"][value="ja"]').check();
  await expect(check.locator('[data-titel]')).toHaveText('Twee sleutels en een papiertje');
  await expect(check.locator('[data-volgende]')).toBeHidden();
});

test('de trede-check stuurt je voor het doen naar de stap-voor-stappagina', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const check = page.locator('[data-tredecheck]');
  await check.locator('input[name="tc-ww"][value="zelfde"]').check();
  await check.locator('input[name="tc-stap"][value="geen"]').check();
  await check.locator('input[name="tc-nood"][value="nee"]').check();
  await expect(check.locator('[data-stap]')).toHaveAttribute('href', '/een-avond');
  await check.locator('input[name="tc-ww"][value="kluis"]').check();
  await check.locator('input[name="tc-stap"][value="sms"]').check();
  await expect(check.locator('[data-stap]')).toHaveAttribute('href', '/een-weekend');
});

// Naslag zoek je op: het antwoord staat vooraan, de koppen zijn vragen, en voor het doen
// wijst elke pagina naar de stap waar je het echt regelt.
const NASLAG = ['/van-geheim-woord-naar-zegelring', '/het-fort-afbouwen', '/krijg-je-je-geld-terug', '/de-storm-om-het-huis', '/wie-bewaart-je-sleutel', '/waarom-dit-saai-voelt'];
const DOEN = /^\/(huischeck|aan-de-slag|een-avond|een-weekend|ik-wil-verder|als-er-is-ingebroken|voor-de-mensen-om-je-heen|onderhoud)(#|$)/;

for (const pad of NASLAG) {
  test(`${pad} begint met het antwoord en heeft vragen als koppen`, async ({ page }) => {
    await page.goto(pad);
    // het eerste blok na de inhoudsopgave is het antwoord
    await expect(page.locator('main .kort').first()).toBeVisible();
    const koppen = await page.locator('main h2:not(.trede h2):not(#quiz-kop):not(#tredecheck-kop)').allTextContents();
    expect(koppen.length).toBeGreaterThanOrEqual(3);
    for (const kop of koppen) expect(kop.trim(), kop).toMatch(/\?$/);
  });

  test(`${pad} wijst voor het doen naar een stap die bestaat`, async ({ page, request }) => {
    await page.goto(pad);
    const links = await page.locator('.naardoen a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(links.length).toBeGreaterThan(0);
    for (const href of links) {
      expect(href, href).toMatch(DOEN);
      const [pagina, anker] = href.split('#');
      const antwoord = await request.get(pagina);
      expect(antwoord.status(), href).toBe(200);
      // een anker dat niet (meer) bestaat, laat je bovenaan een lange pagina landen
      if (anker) expect(await antwoord.text(), href).toContain(`id="${anker}"`);
    }
  });
}

test('in de bronnen is een bewering met meer feiten een lijstje, en zoeken telt per bewering', async ({ page }) => {
  await page.goto('/bronnen');
  const lijst = page.locator('[data-bronnen]');
  await expect(lijst.locator('[data-item]')).toHaveCount(BRONNEN.length);
  await expect(lijst.locator('[data-stand]')).toHaveText(`${BRONNEN.length} feiten met een bron`);
  // Mat Honan: één bewering, twee feiten, dus twee punten
  const honan = lijst.locator('[data-item]', { hasText: 'Mat Honan' });
  await expect(honan.locator('ul.bewering > li')).toHaveCount(2);
  // een citaat met een puntkomma erin blijft heel
  await expect(lijst.locator('[data-item]', { hasText: 'Only amateurs attack machines' }).locator('ul.bewering')).toHaveCount(0);
  await lijst.locator('[data-zoek]').fill('Mat Honan');
  await expect(lijst.locator('[data-stand]')).toHaveText(`1 van ${BRONNEN.length} feiten`);
});
