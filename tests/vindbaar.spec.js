import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

import { HOOFDSTUKKEN, SITE } from '../src/lib/site.js';
import { BRONNEN } from '../src/data/bronnen.js';

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

test('de 404 hoort niet in een zoekmachine', async ({ page }) => {
  await page.goto('/404');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});
