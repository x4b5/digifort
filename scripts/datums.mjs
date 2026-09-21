/**
 * Zet "voor het laatst nagelopen" gelijk aan wat git weet.
 *
 *   node scripts/datums.mjs
 *
 * Per hoofdstuk: is het bestand nu gewijzigd maar nog niet vastgelegd, dan is
 * de datum vandaag; anders de datum van de laatste commit op dat bestand.
 * SITE.laatstNagelopen wordt de nieuwste van allemaal.
 *
 * Twee zekeringen:
 *  - een datum gaat nooit terug in de tijd en nooit vooruit voorbij vandaag;
 *  - buiten een volledige git-map (deploy-servers halen vaak maar een stukje
 *    geschiedenis op) doet het script niets, zodat het de vastgelegde datums
 *    niet met een verkeerde overschrijft.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const HOOFDSTUKKEN = 'src/content/hoofdstukken';
const SITE_JS = 'src/lib/site.js';

function git(...args) {
  try {
    // stderr weg: buiten een git-map is 'not a git repository' hier geen fout maar een antwoord
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function vandaag() {
  const nu = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${nu.getFullYear()}-${p(nu.getMonth() + 1)}-${p(nu.getDate())}`;
}

if (git('rev-parse', '--is-inside-work-tree') !== 'true') {
  console.log('datums: geen git-map, datums blijven zoals ze zijn.');
  process.exit(0);
}
if (git('rev-parse', '--is-shallow-repository') === 'true') {
  console.log('datums: alleen een stukje geschiedenis beschikbaar, datums blijven zoals ze zijn.');
  process.exit(0);
}

/** De datum die git kent voor één bestand, of '' als git het niet weet. */
function gitDatum(pad) {
  if (git('status', '--porcelain', '--', pad) !== '') return vandaag();
  return git('log', '-1', '--format=%cs', '--', pad);
}

const gewijzigd = [];
let nieuwste = '';

for (const naam of readdirSync(HOOFDSTUKKEN).filter((n) => n.endsWith('.mdx')).sort()) {
  const pad = join(HOOFDSTUKKEN, naam);
  const tekst = readFileSync(pad, 'utf8');
  const huidig = tekst.match(/^datum: "(\d{4}-\d{2}-\d{2})"$/m)?.[1];
  if (!huidig) {
    console.warn(`datums: geen datum gevonden in ${naam}, overgeslagen.`);
    continue;
  }
  const uitGit = gitDatum(pad);
  // nooit terug in de tijd, en nooit een datum die nog moet komen
  const laatste = uitGit > huidig ? uitGit : huidig;
  const nieuw = laatste > vandaag() ? vandaag() : laatste;
  if (nieuw > nieuwste) nieuwste = nieuw;
  if (nieuw !== huidig) {
    writeFileSync(pad, tekst.replace(/^datum: "\d{4}-\d{2}-\d{2}"$/m, `datum: "${nieuw}"`));
    gewijzigd.push(`${naam}: ${huidig} → ${nieuw}`);
  }
}

const site = readFileSync(SITE_JS, 'utf8');
const huidigSite = site.match(/laatstNagelopen: '(\d{4}-\d{2}-\d{2})'/)?.[1];
if (huidigSite && nieuwste > huidigSite) {
  writeFileSync(SITE_JS, site.replace(/laatstNagelopen: '\d{4}-\d{2}-\d{2}'/, `laatstNagelopen: '${nieuwste}'`));
  gewijzigd.push(`site.js: ${huidigSite} → ${nieuwste}`);
}

console.log(gewijzigd.length ? `datums bijgewerkt:\n  ${gewijzigd.join('\n  ')}` : 'datums: alles stond al goed.');
