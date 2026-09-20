import { test, expect } from '@playwright/test';

const PAGINAS = ['/', '/huischeck', '/plattegrond', '/inbrekers-van-nu', '/inbrekers-van-morgen', '/aan-de-slag', '/van-geheim-woord-naar-zegelring', '/onderhoud', '/als-er-is-ingebroken', '/voor-de-mensen-om-je-heen', '/woordenboek', '/over'];

for (const pad of PAGINAS) {
  test(`${pad} laadt, scrolt niet zijwaarts en elke tekening heeft een label`, async ({ page }) => {
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await page.goto(pad);
    await expect(page.locator('h1')).toBeVisible();
    const [scroll, client] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(scroll).toBeLessThanOrEqual(client);
    const zonderLabel = await page.locator('figure svg:not([aria-hidden="true"])').evaluateAll((svgs) =>
      svgs.filter((s) => !s.getAttribute('aria-label') && !s.getAttribute('aria-labelledby')).length,
    );
    expect(zonderLabel).toBe(0);
    expect(fouten).toEqual([]);
  });
}

test('het woordenboek filtert terwijl je typt', async ({ page }) => {
  await page.goto('/woordenboek');
  await page.locator('[data-zoek]').fill('passkey');
  await expect(page.locator('tbody tr:visible')).toHaveCount(1);
  await expect(page.locator('[data-stand]')).toHaveText('1 van 25 woorden');
});

test('de plattegrond linkt naar het juiste kopje', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-kamer-legenda="ramen"] a').click();
  await expect(page).toHaveURL(/plattegrond#de-ramen-je-browser/);
  await expect(page.locator('#de-ramen-je-browser')).toBeInViewport();
});
