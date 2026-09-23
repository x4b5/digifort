/**
 * Een hoofdstuk (MDX) als platte Markdown, voor /llms-full.txt. Componenten zijn voor
 * mensen met een browser; een AI-assistent heeft alleen de lopende tekst nodig.
 *
 * - import-regels weg
 * - omhulsels (<Kort>, <Noot>, <Verhaal>, <Scene>, ...) weg, de tekst erin blijft staan
 * - zelfsluitende componenten (tekeningen, quizvragen, lijsten) weg
 * - gewone HTML (een link of nadruk in een onderschrift) wordt Markdown
 * - wat midden in een zin staat, wordt ingevuld: een datum, een aantal
 * - links naar de site zelf worden volledige adressen
 */
import { SITE, NAGELOPEN, datumNL } from './site.js';
import { BRONNEN, NOG_KOPPELEN } from '../data/bronnen.js';

/**
 * @param {string} mdx de ruwe inhoud van een hoofdstuk, zonder frontmatter
 * @returns {string}
 */
export function platteTekst(mdx) {
  return mdx
    .replace(/^(import|export) .*$/gm, '')
    .replace(/<Nagelopen wat="([^"]+)"\s*\/>/g, (_, wat) => datumNL(NAGELOPEN[wat]))
    .replace(/\{BRONNEN\.length\}/g, String(BRONNEN.length))
    .replace(/\{NOG_KOPPELEN\}/g, String(NOG_KOPPELEN))
    .replace(/<Kort>/g, '*In het kort:* ')
    .replace(/<[A-Z][A-Za-z0-9]*\b[^>]*?\/>/gs, '')
    .replace(/<\/?[A-Z][A-Za-z0-9]*\b[^>]*>/gs, '')
    .replace(/<a href="([^"]+)"[^>]*>(.*?)<\/a>/gs, '[$2]($1)')
    .replace(/<\/?(em|i)>/g, '*')
    .replace(/<\/?(strong|b)>/g, '**')
    .replace(/<\/?[a-z][a-z0-9]*\b[^>]*>/g, '')
    .replace(/\{[^{}]*\}/g, '')
    .replace(/\]\(\/(?!\/)/g, `](${SITE.url}/`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
