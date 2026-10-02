#!/usr/bin/env node
/**
 * Leesniveau per pagina, gemeten op de gebouwde site in dist/.
 *
 *   npm run build && npm run leesniveau          tabel per pagina
 *   npm run leesniveau -- --json                 hetzelfde als JSON, voor scripts en CI
 *
 * Per pagina neemt het script de lopende tekst in <main>: alinea's, opsommingen,
 * citaten, bijschriften en tabelcellen die een hele zin zijn. Koppen, kolomkoppen,
 * menu's, knoppen, formulieren, tekeningen en scripts tellen niet mee; dat zijn geen zinnen.
 *
 * Het meet:
 * - de Flesch-Douma-score: 206,84 − 0,77 × lettergrepen per 100 woorden − 0,93 × woorden per zin.
 *   Hoe hoger, hoe makkelijker. Lettergrepen zijn benaderd met klinkergroepen, waarbij een
 *   Nederlandse tweeklank of lange klinker (aa, ee, ie, oe, ui, ij, eeuw, ooi …) één telt
 *   en een trema (ë, ï) een nieuwe lettergreep begint;
 * - de gemiddelde zinslengte in woorden;
 * - het aandeel zinnen van meer dan 20 woorden.
 *
 * Het doel is B1. Voor de doe-pagina's: score ≥ 60 en gemiddeld ≤ 15 woorden per zin.
 * Voor naslag, die je opzoekt in plaats van leest: score ≥ 50 en ≤ 17 woorden per zin.
 *
 * Een meting, geen poortwachter: het script laat de build nooit falen (exit 0),
 * ook niet als er geen dist/ is. Een formule ziet geen moeilijke woorden die kort zijn,
 * en geen makkelijke die lang zijn. Gebruik de uitslag om te zien wáár je moet kijken.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { HOOFDSTUKKEN } from '../src/lib/site.js';

export const DOEL = {
  doen: { score: 60, zinslengte: 15 },
  opzoeken: { score: 50, zinslengte: 17 },
};
const LANG = 20; // een zin met meer woorden telt als lang

// ---------- lettergrepen ----------

// van lang naar kort: de eerste die past, telt als één klank
const KLANKEN = ['eeuw', 'ieuw', 'aai', 'ooi', 'oei', 'eeu', 'ieu', 'eau', 'aa', 'ee', 'oo', 'uu', 'ie', 'oe', 'eu', 'ei', 'ij', 'ui', 'ou', 'au', 'ay', 'ey', 'oy'];
const KLINKER = /[aeiouy]/;

/** Ongeveer het aantal lettergrepen van één woord. */
export function lettergrepen(woord) {
  if (/^\d/.test(woord)) return 2; // een getal lees je als woord; twee is een redelijk midden
  let w = woord.toLowerCase();
  // een trema begint een nieuwe lettergreep: ideeën = i-dee-en, geëmigreerd = ge-e-mi-greerd
  w = w.replace(/[ëïöüä]/g, (t) => `|${t.normalize('NFD')[0]}`);
  w = w.normalize('NFD').replace(/[̀-ͯ]/g, '');
  let n = 0;
  let i = 0;
  while (i < w.length) {
    if (!KLINKER.test(w[i])) { i += 1; continue; }
    const klank = KLANKEN.find((k) => w.startsWith(k, i));
    i += klank ? klank.length : 1;
    n += 1;
  }
  return Math.max(1, n);
}

// ---------- tekst uit html ----------

const ENTITEITEN = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '' };
function ontsleutel(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITEITEN[n.toLowerCase()] ?? m);
}

const WEG = ['script', 'style', 'svg', 'nav', 'template', 'noscript', 'thead', 'th', 'form', 'button', 'select', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'summary'];
const BLOK = /<\/?(p|li|dd|dt|div|section|article|aside|blockquote|figcaption|figure|ul|ol|dl|details|header|footer|br|hr)\b[^>]*>/gi;

/** De lopende tekst in <main>, als losse blokken (alinea's, opsommingstekens). */
export function blokken(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  let s = main.replace(/<!--[\s\S]*?-->/g, ' ');
  for (const tag of WEG) s = s.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi'), ' ');
  // kopjes boven een kop, de leestijd, een bronvermelding en tekst die alleen een schermlezer
  // hoort, zijn geen zinnen
  s = s.replace(/<(\w+)\b[^>]*\bclass="[^"]*\b(eyebrow|schermlezer|leestijd|bron)\b[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  // een tabelcel telt alleen als hij op een zin lijkt (een leesteken, of zes woorden of meer,
  // zoals in het woordenboek); een los trefwoord of getal is geen lopende tekst
  s = s.replace(/<td\b[^>]*>([\s\S]*?)<\/td>/gi, (_, cel) => {
    const tekst = cel.replace(/<[^>]+>/g, ' ').trim();
    const zin = /[.!?…]/.test(tekst) || woordenVan(tekst).length >= 6;
    return zin ? `\n\n${cel}\n\n` : ' ';
  });
  s = s.replace(BLOK, '\n\n').replace(/<[^>]+>/g, '');
  return ontsleutel(s)
    .split(/\n\s*\n/)
    .map((b) => b.replace(/\s+/g, ' ').trim())
    .filter((b) => woordenVan(b).length >= 3); // "Ja", "Nee", "Stap 3": geen lopende tekst
}

// ---------- zinnen en woorden ----------

const AFKORTINGEN = ['bijv', 'bv', 'o.a', 'd.w.z', 'z.o.z', 'nr', 'ca', 'enz', 'etc', 'm.a.w', 'i.p.v', 't.o.v', 'mr', 'dr', 'ir', 'jr', 'blz', 'zgn', 'incl', 'excl', 'max', 'min', 'resp', 'vs'];

export function woordenVan(tekst) {
  return tekst.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''));
}

/** Zinnen in een blok. Een blok zonder slotpunt (een opsommingsteken) telt als één zin. */
export function zinnen(blok) {
  const uit = [];
  let begin = 0;
  const grens = /[.!?…]+["'”’)]*\s+(?=["'“‘(]?[\p{Lu}\p{N}])/gu;
  for (let m; (m = grens.exec(blok));) {
    const voor = blok.slice(begin, m.index).split(/\s+/).at(-1)?.toLowerCase().replace(/^[^\p{L}]+/u, '') ?? '';
    if (AFKORTINGEN.includes(voor) || /^\p{L}$/u.test(voor)) continue; // "bijv. Ria", "J. Jansen"
    uit.push(blok.slice(begin, m.index + m[0].length).trim());
    begin = m.index + m[0].length;
  }
  uit.push(blok.slice(begin).trim());
  return uit.filter((z) => woordenVan(z).length > 0);
}

/** Alle maten voor één stuk tekst (een lijst blokken). */
export function meet(lijst) {
  const alle = lijst.flatMap(zinnen);
  const lengtes = alle.map((z) => woordenVan(z).length);
  const woorden = lengtes.reduce((a, b) => a + b, 0);
  const grepen = alle.flatMap(woordenVan).reduce((a, w) => a + lettergrepen(w), 0);
  if (!woorden) return { woorden: 0, zinnen: 0, score: null, zinslengte: null, lang: null };
  const zinslengte = woorden / alle.length;
  const score = 206.84 - 0.77 * ((grepen / woorden) * 100) - 0.93 * zinslengte;
  return {
    woorden,
    zinnen: alle.length,
    score: Math.round(score * 10) / 10,
    zinslengte: Math.round(zinslengte * 10) / 10,
    lang: Math.round((lengtes.filter((n) => n > LANG).length / alle.length) * 1000) / 10,
  };
}

// ---------- pagina's ----------

function htmlBestanden(map) {
  return readdirSync(map).flatMap((naam) => {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) return htmlBestanden(pad);
    return naam.endsWith('.html') ? [pad] : [];
  });
}

function padVan(bestand, dist) {
  const r = relative(dist, bestand).split(sep).join('/');
  const p = '/' + r.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
  return p === '/' ? '/' : p.replace(/\/$/, '');
}

/** Bij welk deel een pagina hoort. De voorpagina is de trechter naar de huischeck: doen. */
function deelVan(pad) {
  if (pad === '/') return 'doen';
  return HOOFDSTUKKEN.find((h) => `/${h.slug}` === pad)?.deel ?? 'opzoeken';
}

export function meetSite(dist = 'dist') {
  return htmlBestanden(dist)
    .map((bestand) => {
      const pad = padVan(bestand, dist);
      const deel = deelVan(pad);
      const maat = meet(blokken(readFileSync(bestand, 'utf8')));
      const doel = DOEL[deel];
      const problemen = [];
      if (maat.score !== null && maat.score < doel.score) problemen.push(`score < ${doel.score}`);
      if (maat.zinslengte !== null && maat.zinslengte > doel.zinslengte) problemen.push(`zinnen > ${doel.zinslengte}`);
      return { pad, deel, ...maat, doel, ok: maat.woorden > 0 && problemen.length === 0, problemen };
    })
    .filter((r) => r.woorden > 0)
    .sort((a, b) => (a.deel === b.deel ? a.pad.localeCompare(b.pad) : a.deel === 'doen' ? -1 : 1));
}

function tabel(rijen) {
  const kop = ['Pagina', 'Deel', 'Woorden', 'Zinnen', 'Flesch-Douma', 'Gem. zin', '> 20 woorden', 'Oordeel'];
  const data = rijen.map((r) => [
    r.pad, r.deel, String(r.woorden), String(r.zinnen),
    `${r.score.toFixed(1)} (≥ ${r.doel.score})`,
    `${r.zinslengte.toFixed(1)} (≤ ${r.doel.zinslengte})`,
    `${r.lang.toFixed(1)}%`,
    r.ok ? 'OK' : `te hoog: ${r.problemen.join(', ')}`,
  ]);
  const breed = kop.map((k, i) => Math.max(k.length, ...data.map((d) => d[i].length)));
  const rechts = [2, 3, 4, 5, 6];
  const regel = (cellen) => cellen.map((c, i) => (rechts.includes(i) ? c.padStart(breed[i]) : c.padEnd(breed[i]))).join('  ').trimEnd();
  const ok = rijen.filter((r) => r.ok).length;
  return [
    regel(kop),
    breed.map((b) => '-'.repeat(b)).join('  '),
    ...data.map(regel),
    '',
    `${ok} van ${rijen.length} pagina's halen B1. Doel doen: score ≥ ${DOEL.doen.score}, zin ≤ ${DOEL.doen.zinslengte} woorden. Naslag: score ≥ ${DOEL.opzoeken.score}, zin ≤ ${DOEL.opzoeken.zinslengte} woorden.`,
  ].join('\n');
}

// ---------- opdrachtregel ----------

const alsScript = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (alsScript) {
  const json = process.argv.includes('--json');
  const dist = process.argv.find((a, i) => i > 1 && !a.startsWith('--')) ?? 'dist';
  if (!existsSync(dist)) {
    const melding = `Geen ${dist}/ gevonden. Bouw eerst de site: npm run build`;
    if (json) console.log(JSON.stringify({ fout: melding, paginas: [] }));
    else console.log(melding);
    process.exit(0);
  }
  const rijen = meetSite(dist);
  if (json) console.log(JSON.stringify({ doel: DOEL, paginas: rijen }, null, 2));
  else console.log(tabel(rijen));
}
