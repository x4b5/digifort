import { test, expect } from '@playwright/test';
import { HOOFDSTUKKEN, perDeel } from '../src/lib/site.js';

// De tweedeling moet je zien: op de voorpagina, in het menu en boven elk hoofdstuk.
// "Doen" is een route met nummers, "Opzoeken" een register zonder.
const [DOEN, OPZOEKEN] = perDeel();

test('de voorpagina toont eerst de knop, dan de doe-route op volgorde, dan wat je opzoekt', async ({ page }) => {
  await page.goto('/');
  const route = page.locator('#doen .route > li');
  await expect(route).toHaveCount(DOEN.groepen.length);
  for (const [i, h] of DOEN.groepen.entries()) {
    const stap = route.nth(i);
    await expect(stap.locator('.route-nr')).toHaveText(`Hoofdstuk ${h.nr}`);
    await expect(stap.getByRole('heading', { level: 3 })).toHaveText(h.titel);
    await expect(stap.locator('h3 a')).toHaveAttribute('href', `/${h.slug}`);
  }
  // de stap-voor-stappagina's staan onder Aan de slag
  await expect(route.nth(1).locator('.route-keuze a')).toHaveText(DOEN.groepen[1].verdiepingen.map((v) => v.titel));

  // de knop naar de huischeck komt vóór de route: de voorpagina blijft een trechter
  const knopVoorRoute = await page.evaluate(() => {
    const knop = document.querySelector('main .knop');
    const route = document.querySelector('#doen');
    return Boolean(knop && route && knop.compareDocumentPosition(route) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(knopVoorRoute).toBe(true);

  const naslag = page.locator('#opzoeken .naslag a');
  await expect(naslag).toHaveText(OPZOEKEN.groepen.map((h) => h.titel));
  // naslag heeft geen nummers
  await expect(page.locator('#opzoeken .route-nr')).toHaveCount(0);
});

test('het menu heeft twee delen: doen met nummers, opzoeken zonder', async ({ page }) => {
  await page.goto('/');
  await page.locator('.kop details.menu > summary').click();
  const doen = page.locator('.kop .menu-doen');
  const opzoeken = page.locator('.kop .menu-opzoeken');
  await expect(doen.locator('.menu-deelkop')).toContainText('Doen');
  await expect(opzoeken.locator('.menu-deelkop')).toContainText('Opzoeken');
  // de lijst heet naar zijn deel, zodat een schermlezer zegt waar je bent
  await expect(page.getByRole('list', { name: /Doen/ })).toBeVisible();
  await expect(page.getByRole('list', { name: /Opzoeken/ })).toBeVisible();
  await expect(doen.locator('.menu-hoofd > li > a .nr')).toHaveText(DOEN.groepen.map((h) => String(h.nr)));
  await expect(opzoeken.locator('.menu-hoofd > li > a')).toHaveCount(OPZOEKEN.groepen.length);
  await expect(opzoeken.locator('.nr')).toHaveCount(0);
  // doen staat boven opzoeken
  const [boven, onder] = await Promise.all([doen.boundingBox(), opzoeken.boundingBox()]);
  expect(boven.y).toBeLessThan(onder.y);
});

for (const h of HOOFDSTUKKEN) {
  const verwacht = h.deel === 'opzoeken'
    ? 'Opzoeken · Naslag'
    : h.nr !== null ? `Doen · Hoofdstuk ${h.nr} van ${DOEN.groepen.length}` : 'Doen · Bij hoofdstuk 2, stap voor stap';
  test(`/${h.slug} zegt bovenaan in welk deel hij staat`, async ({ page }) => {
    await page.goto(`/${h.slug}`);
    const plek = page.locator('main .deelplek');
    await expect(plek).toHaveText(verwacht);
    await expect(plek.locator('a')).toHaveAttribute('href', `/#${h.deel}`);
  });
}

test('na het laatste doe-hoofdstuk zegt de knop dat je naar opzoeken gaat', async ({ page }) => {
  const laatste = DOEN.groepen.at(-1);
  await page.goto(`/${laatste.slug}`);
  await expect(page.locator('.buren a').last()).toContainText(`Verder in Opzoeken: ${OPZOEKEN.groepen[0].titel}`);
});
