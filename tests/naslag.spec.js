import { test, expect } from '@playwright/test';

/**
 * De inbrekers van nu en van morgen zoek je op: het antwoord staat vooraan, in een
 * overzicht dat naar de juiste kop wijst, en elk onderwerp wijst door naar het doe-deel.
 */
const NASLAG = ['/inbrekers-van-nu', '/inbrekers-van-morgen'];

for (const pad of NASLAG) {
  test(`${pad}: het overzicht staat vóór de eerste kop en elke rij wijst naar een plek die bestaat`, async ({ page }) => {
    await page.goto(pad);
    const overzicht = page.locator('[data-overzicht]');
    await expect(overzicht).toHaveCount(1);
    // vooraan: het overzicht komt in de pagina vóór de eerste kop van de tekst
    const voor = await overzicht.evaluate((el) => {
      const kop = document.querySelector('main h2');
      return Boolean(kop && (el.compareDocumentPosition(kop) & Node.DOCUMENT_POSITION_FOLLOWING));
    });
    expect(voor).toBe(true);

    const rijen = overzicht.locator('dt');
    expect(await rijen.count()).toBeGreaterThanOrEqual(5);
    for (const a of await overzicht.locator('dd a').all()) {
      const href = await a.getAttribute('href');
      if (href.startsWith('#')) await expect(page.locator(href), href).toHaveCount(1);
    }
  });

  test(`${pad}: elke link naar het doe-deel komt ergens uit`, async ({ page, request }) => {
    await page.goto(pad);
    const links = page.locator('[data-naar-doen] a');
    expect(await links.count()).toBeGreaterThanOrEqual(3);
    const paden = new Set();
    for (const a of await links.all()) paden.add((await a.getAttribute('href')).split('#')[0]);
    for (const p of paden) expect((await request.get(p)).status(), p).toBe(200);
  });
}

test('een overzichtsrij springt naar het antwoord', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  await page.locator('[data-overzicht] a', { hasText: 'Wat is sim-swapping?' }).click();
  await expect(page).toHaveURL(/#wat-is-sim-swapping$/);
  await expect(page.getByRole('heading', { level: 2, name: 'Wat is sim-swapping?' })).toBeInViewport();
});

test('oude links naar het geheime woord blijven werken', async ({ page }) => {
  // het inbraakspel en Voor de mensen om je heen linken hierheen
  await page.goto('/inbrekers-van-morgen#het-geheime-woord-van-je-familie');
  await expect(page.locator('#het-geheime-woord-van-je-familie')).toBeInViewport();
});
