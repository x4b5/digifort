import { test, expect } from '@playwright/test';
import { HOOFDSTUKKEN, VOETPAGINAS, SITE, metVerdiepingen } from '../src/lib/site.js';
import { WOORDEN } from '../src/data/woorden.js';
import { KAMERS } from '../src/data/kamers.js';
import { FORTDELEN } from '../src/data/fort.js';
import { TREDES } from '../src/data/tredes.js';
import { readFileSync, readdirSync } from 'node:fs';

// Deze tests raken de browser niet: ze bewaken dat de losse bronnen bij elkaar blijven.
test.describe.configure({ mode: 'parallel' });

test('de korte omschrijving in site.js is gelijk aan die in de frontmatter', () => {
  const map = 'src/content/hoofdstukken';
  for (const h of [...HOOFDSTUKKEN, ...VOETPAGINAS]) {
    const bestand = `${map}/${h.slug}.mdx`;
    let tekst;
    try {
      tekst = readFileSync(bestand, 'utf8');
    } catch {
      continue; // /een-avond is een gewone pagina, geen hoofdstukbestand
    }
    const kort = tekst.match(/^kort: "(.*)"$/m)?.[1].replace(/\\"/g, '"');
    expect(kort, `kort verschilt voor ${h.slug}`).toBe(h.kort);
    const titel = tekst.match(/^titel: "(.*)"$/m)?.[1];
    expect(titel, `titel verschilt voor ${h.slug}`).toBe(h.titel);
  }
});

test('elk hoofdstukbestand staat in de sitekaart', () => {
  const bestanden = readdirSync('src/content/hoofdstukken').filter((f) => f.endsWith('.mdx'));
  const slugs = [...HOOFDSTUKKEN, ...VOETPAGINAS].map((h) => h.slug);
  for (const b of bestanden) expect(slugs, `${b} ontbreekt in site.js`).toContain(b.replace('.mdx', ''));
});

test('elk fortdeel verwijst naar bestaande kamers', () => {
  const ids = KAMERS.map((k) => k.id);
  for (const d of FORTDELEN) for (const k of d.kamers) expect(ids, `${d.id} verwijst naar ${k}`).toContain(k);
});

test('elk woord verwijst naar een bestaande kamer en de lijst is alfabetisch', () => {
  const ids = KAMERS.map((k) => k.id);
  for (const w of WOORDEN) if (w.kamer) expect(ids, `${w.term} verwijst naar ${w.kamer}`).toContain(w.kamer);
  const namen = WOORDEN.map((w) => w.term);
  expect(namen).toEqual([...namen].sort((a, b) => a.localeCompare(b, 'nl')));
});

test('de treden zijn genummerd van 1 tot en met 8', () => {
  expect(TREDES.map((t) => t.nr)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

test('het anti-flits-script gebruikt dezelfde opslagsleutel als lezen.js', () => {
  const layout = readFileSync('src/layouts/Pagina.astro', 'utf8');
  const lezen = readFileSync('src/lib/lezen.js', 'utf8');
  const sleutel = lezen.match(/const SLEUTEL = '(.*)';/)[1];
  expect(layout, 'de sleutel in de head loopt uit de pas met lezen.js').toContain(`'${sleutel}'`);
  for (const veld of ['tekst', 'thema']) expect(layout).toContain(`v.${veld}`);
});

test('de site kent zijn eigen adres en contact', () => {
  expect(SITE.contact).toMatch(/@/);
  expect(SITE.laatstNagelopen).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

test('elke verdieping hangt onder precies één hoofdstuk en er raakt er geen zoek', () => {
  const groepen = metVerdiepingen();
  expect(groepen.every((g) => !g.extra)).toBe(true);
  const plat = groepen.flatMap((g) => [g.slug, ...g.verdiepingen.map((v) => v.slug)]);
  expect(plat).toEqual(HOOFDSTUKKEN.map((h) => h.slug));
});
