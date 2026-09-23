import { test, expect } from '@playwright/test';

import { PAGINAS } from './paginas.js';

for (const pad of PAGINAS) {
  test(`${pad} laadt, scrolt niet zijwaarts en elke tekening heeft een label`, async ({ page }) => {
    const fouten = [];
    page.on('pageerror', (e) => fouten.push(e.message));
    await page.goto(pad);
    await expect(page.locator('h1')).toBeVisible();
    const [scroll, client] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(scroll).toBeLessThanOrEqual(client);
    // een tekening is of verborgen voor de schermlezer (ook via een ouder), of hij heeft een label
    const zonderLabel = await page.locator('figure svg').evaluateAll((svgs) =>
      svgs.filter((s) => !s.closest('[aria-hidden="true"]')
        && !s.getAttribute('aria-label') && !s.getAttribute('aria-labelledby')).length,
    );
    expect(zonderLabel).toBe(0);
    expect(fouten).toEqual([]);
  });
}

test('het woordenboek filtert terwijl je typt', async ({ page }) => {
  await page.goto('/woordenboek');
  await page.locator('[data-zoek]').fill('passkey');
  await expect(page.locator('tbody tr:visible')).toHaveCount(4);
  await expect(page.locator('[data-stand]')).toHaveText('4 van 38 woorden');

  await page.locator('[data-zoek]').fill('zeppelin');
  await expect(page.locator('tbody tr:visible')).toHaveCount(0);
  await expect(page.locator('[data-stand]')).toHaveText('Niets gevonden. Probeer een ander woord.');
});

test('een woord in het woordenboek linkt naar zijn plek op de plattegrond', async ({ page }) => {
  await page.goto('/woordenboek');
  await page.locator('[data-zoek]').fill('wachtwoordmanager');
  await page.locator('tbody tr:visible a').first().click();
  await expect(page).toHaveURL(/plattegrond#de-sleutelkluis/);
});

test('de plattegrond linkt naar het juiste kopje', async ({ page }) => {
  await page.goto('/plattegrond');
  await page.locator('[data-kamer-legenda="ramen"] a').click();
  await expect(page).toHaveURL(/plattegrond#de-ramen-je-browser/);
  await expect(page.locator('#de-ramen-je-browser')).toBeInViewport();
});

test('een brede tabel zit in een scrolbare bak en stapelt op een telefoon', async ({ page, viewport }) => {
  await page.goto('/aan-de-slag');
  const tabel = page.locator('table.tabel-stapel').first();
  await expect(tabel).toBeAttached();
  // de tabel hangt in een bak die zelf scrolt, met toetsenbord bereikbaar
  const bak = page.locator('.tabel-scroll').first();
  await expect(bak).toHaveAttribute('role', 'region');
  await expect(bak).toHaveAttribute('tabindex', '0');
  // op een telefoon krijgt elke cel de kolomkop mee
  const label = await tabel.locator('tbody td').nth(1).getAttribute('data-label');
  expect(label && label.length).toBeGreaterThan(0);
  if (viewport && viewport.width < 640) {
    const breder = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(breder).toBe(false);
  }
});

test('het woordenboek filtert niet via de stapelweergave', async ({ page }) => {
  await page.goto('/woordenboek');
  await expect(page.locator('[data-woordenboek] table')).not.toHaveClass(/tabel-stapel/);
});
