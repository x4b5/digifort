import { test, expect } from '@playwright/test';

test('de leesknop maakt de tekst groter en onthoudt dat', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const voor = await page.locator('body').evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

  await page.locator('.kop details.lezen summary').click();
  await page.getByLabel('Grootst').check();

  await expect(html).toHaveAttribute('data-tekst', 'groter');
  const na = await page.locator('body').evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(na).toBeGreaterThan(voor);

  await page.reload();
  await expect(html).toHaveAttribute('data-tekst', 'groter');
});

test('de leesknop zet de site in het donker', async ({ page }) => {
  await page.goto('/');
  await page.locator('.kop details.lezen summary').click();
  await page.getByLabel('Donker').check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const achtergrond = await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(achtergrond).toBe('rgb(20, 20, 20)');
});

test('een uitklapper in de kop sluit met Escape', async ({ page }) => {
  await page.goto('/');
  const menu = page.locator('.kop details.menu');
  await menu.locator('summary').click();
  await expect(menu).toHaveAttribute('open', '');
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open', '');
});

test('twee uitklappers staan nooit tegelijk open', async ({ page }) => {
  await page.goto('/');
  await page.locator('.kop details.lezen summary').click();
  await page.locator('.kop details.menu summary').click();
  await expect(page.locator('.kop details.lezen')).not.toHaveAttribute('open', '');
});

const PAGINAS = ['/', '/huischeck', '/plattegrond', '/inbrekers-van-nu', '/de-storm-om-het-huis', '/aan-de-slag', '/van-geheim-woord-naar-zegelring', '/onderhoud', '/als-er-is-ingebroken', '/voor-de-mensen-om-je-heen', '/woordenboek', '/over'];

for (const pad of PAGINAS) {
  test(`${pad} scrolt ook bij de grootste tekst niet zijwaarts`, async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('jdh:lezen', '{"tekst":"groter","thema":"auto"}'));
    await page.goto(pad);
    const breder = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(breder).toBe(false);
  });
}

test('het open leespaneel past op een telefoon', async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem('jdh:lezen', '{"tekst":"groter","thema":"auto"}'));
  await page.goto('/');
  await page.locator('.kop details.lezen summary').click();
  const paneel = page.locator('.kop .paneel');
  await expect(paneel).toBeVisible();
  const past = await paneel.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.left >= -1 && r.right <= document.documentElement.clientWidth + 1;
  });
  expect(past).toBe(true);
});
