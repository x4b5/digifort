/**
 * Splitst "Je digitale huis — siteteksten.md" in één MDX-bestand per hoofdstuk.
 * Eenmalig gebruikt op 20 sep 2026; daarna is src/content/hoofdstukken/ de bron.
 *
 *   node scripts/split.mjs <pad-naar-siteteksten.md>
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { HOOFDSTUKKEN, SITE } from '../src/lib/site.js';

const bron = process.argv[2];
if (!bron) throw new Error('Geef het pad naar siteteksten.md mee.');
const tekst = readFileSync(bron, 'utf8');

const IMPORTS = `import Kort from '../../components/Kort.astro';
import Noot from '../../components/Noot.astro';
import Afvinklijst from '../../components/Afvinklijst.astro';
import Huischeck from '../../components/Huischeck.astro';
import Woordenboek from '../../components/Woordenboek.astro';
import Contact from '../../components/Contact.astro';
import Tekening from '../../components/Tekening.astro';
`;

/** Vervangt het eerste blok (tabel, genummerde lijst of opsomming) ná een kop door iets anders. */
function vervangBlokNa(regels, kopStart, vervanging) {
  const start = regels.findIndex((r) => r.startsWith(kopStart));
  if (start < 0) throw new Error(`Kop niet gevonden: ${kopStart}`);
  const isBlok = (r) => /^(\||\d+\.\s|- )/.test(r);
  let van = regels.findIndex((r, i) => i > start && isBlok(r));
  let tot = van;
  while (tot + 1 < regels.length && isBlok(regels[tot + 1])) tot += 1;
  return [...regels.slice(0, van), ...vervanging, ...regels.slice(tot + 1)];
}

function verwijderRegelsDie(regels, test) {
  return regels.filter((r) => !test(r));
}

const PER_HOOFDSTUK = {
  huischeck: (r) => {
    r = vervangBlokNa(r, '## Doe de huischeck', ['<Huischeck />']);
    r = verwijderRegelsDie(r, (x) => /^\*\*(0 tot 4|5 tot 7|8 tot 10) keer ja/.test(x) || x.startsWith('Doe je de huischeck samen met een kind'));
    return r;
  },
  'aan-de-slag': (r) => {
    r = vervangBlokNa(r, '## Niveau 1', ['<Afvinklijst lijst="niveau-1" kop={false} genummerd />']);
    r = vervangBlokNa(r, '## Niveau 2', ['<Afvinklijst lijst="niveau-2" kop={false} genummerd />']);
    r = vervangBlokNa(r, '## Niveau 3', ['<Afvinklijst lijst="niveau-3" kop={false} />']);
    return r;
  },
  onderhoud: (r) => {
    const i = r.findIndex((x) => x.startsWith('## De onderhoudsbeurt'));
    const eind = r.findIndex((x, j) => j > i && x.startsWith('Zet het in je agenda'));
    return [...r.slice(0, eind + 1), '', '<Afvinklijst lijst="onderhoudsbeurt" kop={false} />', ...r.slice(eind + 1)];
  },
  'als-er-is-ingebroken': (r) => {
    r = vervangBlokNa(r, '## Het eerste uur', ['<Afvinklijst lijst="eerste-uur" kop={false} genummerd />']);
    r = vervangBlokNa(r, '## Telefoon of laptop kwijt', ['<Afvinklijst lijst="verlies" kop={false} genummerd />']);
    r = vervangBlokNa(r, '**Wat je vooraf regelt', ['<Afvinklijst lijst="vooraf" kop={false} />']);
    r = vervangBlokNa(r, '## Het noodpakket', ['<Afvinklijst lijst="noodpakket" kop={false} />']);
    return r;
  },
  woordenboek: (r) => {
    const van = r.findIndex((x) => x.startsWith('|'));
    let tot = van;
    while (r[tot + 1]?.startsWith('|')) tot += 1;
    return [...r.slice(0, van), '<Woordenboek>', '', ...r.slice(van, tot + 1), '', '</Woordenboek>', ...r.slice(tot + 1)];
  },
  over: (r) => {
    r = r.map((x) => x === 'Zie je een fout of mis je iets? Laat het weten.' ? 'Zie je een fout of mis je iets? Laat het weten via <Contact />.' : x);
    const i = r.findIndex((x) => x.startsWith('## Hoe je deze site leest'));
    return [...r.slice(0, i), 'Deze site is gemaakt door Xavier, geen beveiligingsexpert maar iemand die het wilde snappen.', '', ...r.slice(i)];
  },
};

const delen = tekst.split(/^## (\d)\. /m).slice(1);
mkdirSync('src/content/hoofdstukken', { recursive: true });

for (let i = 0; i < delen.length; i += 2) {
  const nr = Number(delen[i]);
  const [titelRegel, ...rest] = delen[i + 1].split('\n');
  const meta = HOOFDSTUKKEN.find((h) => h.nr === nr);
  let regels = rest
    .map((r) => r.replace(/^### /, '## '))
    .map((r) => r.replace(/^\*\*In het kort:\*\* (.*)$/, '<Kort>$1</Kort>'))
    .map((r) => r.replace(/^\*\*Waar het beeld niet klopt\.\*\* (.*)$/, '<Noot titel="Waar het beeld niet klopt">$1</Noot>'))
    .map((r) => r.replace(/\{/g, '\\{').replace(/\}/g, '\\}'));
  if (PER_HOOFDSTUK[meta.slug]) regels = PER_HOOFDSTUK[meta.slug](regels);

  const front = `---\nnr: ${nr}\ntitel: "${meta.titel}"\nkort: "${meta.kort.replace(/"/g, '\\"')}"\ndatum: "${SITE.laatstNagelopen}"\n---\n`;
  writeFileSync(`src/content/hoofdstukken/${meta.slug}.mdx`, front + IMPORTS + '\n' + regels.join('\n').trim() + '\n');
  console.log(`✔ ${nr} → ${meta.slug}.mdx  (${titelRegel.trim()})`);
}
