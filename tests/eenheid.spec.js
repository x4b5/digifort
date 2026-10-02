import { test, expect } from '@playwright/test';
import { HOOFDSTUKKEN, VOETPAGINAS, SITE, DELEN, metVerdiepingen, perDeel, buren } from '../src/lib/site.js';
import { lettergrepen, zinnen, meet, blokken } from '../scripts/leesniveau.mjs';
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
    const nr = tekst.match(/^nr: (.*)$/m)?.[1];
    expect(nr, `nr verschilt voor ${h.slug}`).toBe(String('nr' in h ? h.nr : null));
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

// De site heeft twee delen: eerst doen (genummerd, op volgorde), dan opzoeken (naslag).
// Deze test legt de volgorde van "Doen" vast; wie hem verandert, doet dat met opzet.
test('de site heeft twee delen: eerst doen, genummerd, dan opzoeken, zonder nummer', () => {
  expect(DELEN.map((d) => d.id)).toEqual(['doen', 'opzoeken']);
  for (const h of HOOFDSTUKKEN) expect(DELEN.map((d) => d.id), `${h.slug} heeft geen deel`).toContain(h.deel);

  // alle doe-pagina's staan vóór de naslag, zodat de route niet heen en weer springt
  const delen = HOOFDSTUKKEN.map((h) => h.deel);
  expect(delen.lastIndexOf('doen')).toBeLessThan(delen.indexOf('opzoeken'));

  const doen = HOOFDSTUKKEN.filter((h) => h.deel === 'doen' && !h.extra);
  expect(doen.map((h) => h.slug)).toEqual(['huischeck', 'aan-de-slag', 'als-er-is-ingebroken', 'voor-de-mensen-om-je-heen', 'onderhoud']);
  expect(doen.map((h) => h.nr)).toEqual([1, 2, 3, 4, 5]);

  // een stap-voor-stappagina hangt onder Aan de slag en heeft geen eigen nummer
  const [doeDeel, naslag] = perDeel();
  const metStappen = doeDeel.groepen.filter((g) => g.verdiepingen.length);
  expect(metStappen.map((g) => g.slug)).toEqual(['aan-de-slag']);
  expect(metStappen[0].verdiepingen.map((v) => v.slug)).toEqual(['een-avond', 'een-weekend', 'ik-wil-verder']);
  expect(metStappen[0].verdiepingen.every((v) => v.nr === null)).toBe(true);

  // naslag zoek je op: geen nummers, geen zijtakken
  expect(naslag.groepen.length).toBeGreaterThan(0);
  expect(naslag.groepen.every((g) => g.nr === null && g.verdiepingen.length === 0)).toBe(true);
  for (const slug of ['plattegrond', 'woordenboek', 'bronnen', 'over']) expect(naslag.groepen.map((g) => g.slug)).toContain(slug);

  // de knop onderaan zegt het als je van doen naar opzoeken overstapt
  const laatsteDoen = doen.at(-1).slug;
  expect(buren(laatsteDoen).volgende?.anderDeel).toBe(true);
  expect(buren('huischeck').volgende?.anderDeel).toBe(false);
});

test('geen tekst verwijst nog naar een hoofdstuk met een nummer', () => {
  // Nummers schuiven als de indeling verandert; een titel niet. Verwijs dus met de titel.
  // Hoofdstukken van een boek of rapport (in een bron of citaat) mogen wel.
  const mappen = ['src/content/hoofdstukken', 'src/components', 'src/pages', 'src/data'];
  const fout = [];
  for (const map of mappen) {
    for (const naam of readdirSync(map, { recursive: true })) {
      if (!/\.(mdx|astro|js|ts)$/.test(naam) || naam === 'bronnen.js') continue;
      readFileSync(`${map}/${naam}`, 'utf8').split('\n').forEach((regel, i) => {
        if (/hoofdstuk \d/i.test(regel) && !/bron="|bron: \[/.test(regel)) fout.push(`${map}/${naam}:${i + 1}`);
      });
    }
  }
  expect(fout).toEqual([]);
});

test('het leesniveau-script telt lettergrepen en zinnen zoals een Nederlandse lezer', () => {
  // tweeklanken en lange klinkers zijn één lettergreep; een trema begint een nieuwe
  expect(['huis', 'nieuw', 'groei', 'waaien', 'wachtwoordmanager', 'ideeën', 'januari'].map(lettergrepen)).toEqual([1, 1, 1, 2, 5, 3, 4]);
  expect(zinnen('Bel je bank. Doe bijv. aangifte bij de politie! Klaar?')).toHaveLength(3);
  // alleen lopende tekst in <main>: geen kop, menu of script
  const html = '<nav><p>Menu met veel woorden erin.</p></nav><main><h1>Een kop zonder punt</h1><p class="eyebrow">Doen · Hoofdstuk 1</p><p>Ik doe de deur dicht. Daarna doe ik het raam dicht.</p><script>let a = 1;</script></main>';
  expect(blokken(html)).toEqual(['Ik doe de deur dicht. Daarna doe ik het raam dicht.']);
  const m = meet(blokken(html));
  expect(m.zinnen).toBe(2);
  expect(m.zinslengte).toBe(5.5);
  // 206,84 − 0,77 × (12 lettergrepen / 11 woorden × 100) − 0,93 × 5,5
  expect(m.score).toBeCloseTo(206.84 - 0.77 * (12 / 11) * 100 - 0.93 * 5.5, 0);
});
