/**
 * Gestructureerde gegevens (schema.org, als JSON-LD) voor zoekmachines en AI-assistenten.
 * Eén plek, zodat elke pagina hetzelfde zegt over wie de site maakt en wat erop staat.
 *
 * De bronnen van een hoofdstuk gaan mee als `citation`: zo ziet een machine dat elke
 * bewering onderbouwd is, en welke bron waarbij hoort. Ze komen uit bronnen.js, dus
 * ze lopen nooit achter op de bronnenpagina.
 */
import { SITE } from './site.js';
import { BRONNEN } from '../data/bronnen.js';
import { WOORDEN, woordAnker } from '../data/woorden.js';

const TAAL = 'nl-NL';
const thuis = (pad = '/') => new URL(pad, SITE.url).href;

/** De site zelf: wie hem maakt en uitgeeft. Alleen de voornaam, zoals op /over. */
const MAKER = { '@type': 'Person', name: 'Xavier', url: thuis('/over') };
const UITGEVER = { '@type': 'Organization', name: SITE.naam, url: thuis('/'), logo: thuis('/apple-touch-icon.png') };
const WEBSITE = { '@type': 'WebSite', name: SITE.naam, url: thuis('/'), inLanguage: TAAL };

/** Voor de voorpagina: de site als geheel. */
export function websiteGegevens() {
  return {
    '@context': 'https://schema.org',
    ...WEBSITE,
    description: SITE.slogan,
    publisher: UITGEVER,
  };
}

/** De bronnen die bij een hoofdstuk horen, als lijst van citaten met een link. */
function citaten(slug) {
  return BRONNEN
    .filter((b) => b.hoofdstuk.includes(slug) && b.status === 'gecontroleerd')
    .flatMap((b) => b.bron.filter((s) => s.href))
    .filter((s, i, lijst) => lijst.findIndex((t) => t.href === s.href) === i)
    .map((s) => ({ '@type': 'CreativeWork', name: s.tekst, url: s.href }));
}

/**
 * Voor een hoofdstuk: een artikel met datum, maker en bronnen.
 * @param {{ slug: string, titel: string, beschrijving: string, datum: string }} h
 */
export function artikelGegevens({ slug, titel, beschrijving, datum }) {
  const url = thuis(`/${slug}`);
  const bronnen = citaten(slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titel,
    description: beschrijving,
    inLanguage: TAAL,
    url,
    mainEntityOfPage: url,
    dateModified: datum,
    image: thuis('/deelplaatje.png'),
    author: MAKER,
    publisher: UITGEVER,
    isPartOf: WEBSITE,
    isAccessibleForFree: true,
    ...(bronnen.length ? { citation: bronnen } : {}),
  };
}

/** Voor /woordenboek: elke term als gedefinieerd begrip, met een link naar zijn eigen rij. */
export function begrippenGegevens() {
  const url = thuis('/woordenboek');
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: `Woordenboek van ${SITE.naam}`,
    description: 'Vaktermen over digitale veiligheid, elk in één zin gewone taal uitgelegd.',
    inLanguage: TAAL,
    url,
    hasDefinedTerm: WOORDEN.map((w) => ({
      '@type': 'DefinedTerm',
      name: w.term,
      ...(w.voluit ? { alternateName: w.voluit } : {}),
      description: w.uitleg,
      url: `${url}#${woordAnker(w.term)}`,
      inDefinedTermSet: url,
    })),
  };
}

/** JSON veilig in een <script>: een "</script>" in een bronnaam mag de pagina niet breken. */
export function alsScript(gegevens) {
  return JSON.stringify(gegevens).replace(/</g, '\\u003c');
}
