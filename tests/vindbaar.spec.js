import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

import { HOOFDSTUKKEN, SITE } from '../src/lib/site.js';
import { BRONNEN } from '../src/data/bronnen.js';
import { WOORDEN, woordAnker } from '../src/data/woorden.js';

/**
 * Vindbaarheid voor zoekmachines en AI-assistenten: elke pagina zegt in vaste vorm
 * (JSON-LD) wat hij is, en de bronnen van een hoofdstuk gaan mee als citaten.
 * Zie src/lib/gegevens.js.
 */

const etiketten = (page) => page.locator('script[type="application/ld+json"]').evaluateAll(
  (els) => els.map((e) => JSON.parse(e.textContent ?? '')),
);

test('het webadres in site.js is gelijk aan dat in astro.config.mjs', () => {
  const config = readFileSync('astro.config.mjs', 'utf8');
  expect(config).toContain(`site: '${SITE.url}'`);
});

for (const h of HOOFDSTUKKEN) {
  test(`/${h.slug} heeft een artikel-etiket dat klopt met de pagina`, async ({ page }) => {
    await page.goto(`/${h.slug}`);
    const [artikel] = (await etiketten(page)).filter((e) => e['@type'] === 'Article');
    expect(artikel, 'geen Article-etiket').toBeTruthy();
    expect(artikel.headline).toBe(h.titel);
    expect(artikel.inLanguage).toBe('nl-NL');
    expect(artikel.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(artikel.url).toBe(`${SITE.url}/${h.slug}`);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');

    // elk citaat is een bron uit bronnen.js die bij dit hoofdstuk hoort
    const toegestaan = new Set(BRONNEN.filter((b) => b.hoofdstuk.includes(h.slug))
      .flatMap((b) => b.bron.map((s) => s.href)).filter(Boolean));
    for (const c of artikel.citation ?? []) expect(toegestaan.has(c.url), c.url).toBe(true);
  });
}

test('de voorpagina zegt dat het een website is', async ({ page }) => {
  await page.goto('/');
  const [site] = await etiketten(page);
  expect(site['@type']).toBe('WebSite');
  expect(site.url).toBe(`${SITE.url}/`);
});

// korter en Google verzint zelf iets, langer en het wordt afgekapt
for (const slug of ['', ...HOOFDSTUKKEN.map((h) => h.slug)]) {
  test(`/${slug} heeft een omschrijving van een hele zin in de zoekresultaten`, async ({ page }) => {
    await page.goto(`/${slug}`);
    const tekst = await page.locator('meta[name="description"]').getAttribute('content');
    expect(tekst?.length ?? 0).toBeGreaterThanOrEqual(70);
    expect(tekst?.length ?? 0).toBeLessThanOrEqual(160);
  });
}

test('de 404 hoort niet in een zoekmachine', async ({ page }) => {
  await page.goto('/404');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test('het woordenboek is een begrippenlijst, en elk begrip heeft een eigen anker', async ({ page }) => {
  await page.goto('/woordenboek');
  const [lijst] = (await etiketten(page)).filter((e) => e['@type'] === 'DefinedTermSet');
  expect(lijst.hasDefinedTerm).toHaveLength(WOORDEN.length);
  const ankers = WOORDEN.map((w) => woordAnker(w.term));
  expect(new Set(ankers).size, 'twee woorden met hetzelfde anker').toBe(WOORDEN.length);
  for (const anker of ankers) await expect(page.locator(`[id="${anker}"]`)).toHaveCount(1);
});

test('llms.txt noemt elk hoofdstuk, met een volledig adres', async ({ request }) => {
  const tekst = await (await request.get('/llms.txt')).text();
  expect(tekst.startsWith(`# ${SITE.naam}`)).toBe(true);
  for (const h of HOOFDSTUKKEN) expect(tekst, h.slug).toContain(`](${SITE.url}/${h.slug})`);
});

test('llms-full.txt heeft elk hoofdstuk als platte tekst, zonder opmaakcode', async ({ request }) => {
  const tekst = await (await request.get('/llms-full.txt')).text();
  for (const h of HOOFDSTUKKEN) expect(tekst, h.slug).toContain(`# ${h.titel}\n`);
  // geen component, geen HTML-tag, geen quizgegevens: een assistent moet het kunnen lezen als tekst
  expect(tekst).not.toMatch(/<[A-Za-z/][^>]*>/);
  expect(tekst).not.toMatch(/^import /m);
  expect(tekst).not.toMatch(/goed: true|opties=/);
});
