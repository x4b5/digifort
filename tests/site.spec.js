import { test, expect } from '@playwright/test';

import { PAGINAS } from './paginas.js';
import { HOOFDSTUKKEN } from '../src/lib/site.js';
import { WOORDEN } from '../src/data/woorden.js';

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

// naslag lees je niet van a tot z, en de avondpagina telt in stappen in plaats van minuten
const ZONDER_LEESTIJD = ['woordenboek', 'bronnen', 'een-avond'];
for (const { slug } of HOOFDSTUKKEN.filter((h) => !ZONDER_LEESTIJD.includes(h.slug))) {
  test(`/${slug} zegt bovenaan hoe lang het lezen duurt`, async ({ page }) => {
    await page.goto(`/${slug}`);
    await expect(page.locator('.paginakop .leestijd')).toHaveText(/^Ongeveer (1 minuut|\d+ minuten) lezen$/);
  });
}

test('naslagpagina\'s tonen geen leestijd', async ({ page }) => {
  await page.goto('/woordenboek');
  await expect(page.locator('.leestijd')).toHaveCount(0);
});

test('het woordenboek filtert terwijl je typt', async ({ page }) => {
  await page.goto('/woordenboek');
  await page.locator('[data-zoek]').fill('passkey');
  await expect(page.locator('tbody tr:visible')).toHaveCount(7);
  await expect(page.locator('[data-stand]')).toHaveText(`7 van ${WOORDEN.length} woorden`);

  // bij een afkorting staat het volledige woord erachter
  await page.locator('[data-zoek]').fill('dns');
  await expect(page.locator('tbody tr:visible td').first()).toContainText('DNS (domain name system)');

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

test('het woordenboek sorteert van makkelijk naar moeilijk en weer terug', async ({ page }) => {
  await page.goto('/woordenboek');
  const eerste = page.locator('tbody tr td:first-child').first();
  await expect(eerste).toContainText('2FA');

  await page.getByRole('button', { name: 'Makkelijk eerst' }).click();
  await expect(page.getByRole('button', { name: 'Makkelijk eerst' })).toHaveAttribute('aria-pressed', 'true');
  // de niveaus staan nu oplopend, en het niveau is ook af te lezen
  const niveaus = await page.locator('tbody tr').evaluateAll((rs) => rs.map((r) => Number(r.dataset.niveau)));
  expect(niveaus).toEqual([...niveaus].sort((a, b) => a - b));
  await expect(eerste.locator('.niveau')).toBeVisible();

  await page.getByRole('button', { name: 'A\u2013Z' }).click();
  await expect(page.locator('tbody tr td:first-child').first()).toContainText('2FA');
  await expect(page.locator('tbody tr .niveau').first()).toBeHidden();
});

test('het woordenboek filtert niet via de stapelweergave', async ({ page }) => {
  await page.goto('/woordenboek');
  await expect(page.locator('[data-woordenboek] table')).not.toHaveClass(/tabel-stapel/);
});

test('een link naar een andere site opent in een nieuw tabblad, een eigen link niet', async ({ page }) => {
  await page.goto('/bronnen');
  const extern = page.locator('main a[href^="https://"]').first();
  await expect(extern).toHaveAttribute('target', '_blank');
  await expect(extern).toHaveAttribute('rel', /noopener/);
  await expect(page.locator('main a[href^="/"]').first()).not.toHaveAttribute('target', '_blank');
});

test('het woordenboek past op een telefoon zonder zijwaarts schuiven, en zoeken blijft werken', async ({ page }, info) => {
  test.skip(info.project.name !== 'telefoon', 'alleen op een telefoon worden de woorden blokken');
  await page.goto('/woordenboek');
  const bak = page.locator('[data-woordenboek] .tabel-scroll');
  const [breed, zicht] = await bak.evaluate((b) => [b.scrollWidth, b.clientWidth]);
  expect(breed).toBeLessThanOrEqual(zicht);
  // een blok met display:block mag het hidden-attribuut van het zoekveld niet overstemmen
  await page.locator('[data-zoek]').fill('passkey');
  await expect(page.locator('tbody tr:visible')).toHaveCount(7);
});

test('het cijfer op de voorpagina staat er ook als tien poppetjes, één in het rood', async ({ page }) => {
  await page.goto('/');
  const rij = page.locator('.hero-cijfer [data-poppetjes]');
  await expect(rij).toHaveAttribute('aria-hidden', 'true'); // de tekst zegt het al
  await expect(rij.locator('[data-pop]')).toHaveCount(10);
  await expect(rij.locator('[data-pop="rood"]')).toHaveCount(1);
  // alle tien op één regel, ook op een telefoon
  const tops = await rij.locator('[data-pop]').evaluateAll((p) => p.map((e) => Math.round(e.getBoundingClientRect().top)));
  expect(new Set(tops).size).toBe(1);
});

test('bij de ouderen staan acht van de tien poppetjes in het rood', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  const figuur = page.locator('figure.poppetjes-figuur');
  await expect(figuur.locator('[data-pop]')).toHaveCount(10);
  await expect(figuur.locator('[data-pop="rood"]')).toHaveCount(8);
  await expect(figuur.locator('figcaption')).toContainText('ouder dan 60');
});

test('de afspraken met Amerika staan op een tijdlijn, met de twee strepen in het rood', async ({ page }) => {
  await page.goto('/wie-bewaart-je-sleutel');
  const lijn = page.locator('[data-tijdlijn]');
  await expect(lijn.locator('li')).toHaveCount(7);
  await expect(lijn.locator('[data-soort="rood"]')).toHaveCount(2);
  await expect(lijn.locator('li').last()).toHaveAttribute('data-soort', 'open'); // het beroep loopt nog
});

test('de updates van Windows 10 staan op een tijdlijn, van begin tot de laatste extra update', async ({ page }) => {
  await page.goto('/onderhoud');
  const lijn = page.locator('[data-tijdlijn]');
  await expect(lijn.locator('li').first()).toContainText('29 juli 2015');
  await expect(lijn).toContainText('14 oktober 2025');
  await expect(lijn).toContainText('12 oktober 2027');
});
