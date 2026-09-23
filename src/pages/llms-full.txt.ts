/**
 * /llms-full.txt: alle hoofdstukken als platte tekst, in leesvolgorde, met onder elk
 * hoofdstuk de bronnen die erbij horen. Voor AI-assistenten die de site willen citeren.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, HOOFDSTUKKEN, VOETPAGINAS } from '../lib/site.js';
import { BRONNEN } from '../data/bronnen.js';
import { platteTekst } from '../lib/platteTekst.js';

function bronnenVan(slug: string): string[] {
  return BRONNEN
    .filter((b) => b.hoofdstuk.includes(slug) && b.status === 'gecontroleerd')
    .flatMap((b) => b.bron.filter((s) => s.href).map((s) => `- ${s.tekst}: ${s.href}`))
    .filter((r, i, lijst) => lijst.indexOf(r) === i);
}

export const GET: APIRoute = async () => {
  const inhoud = new Map((await getCollection('hoofdstukken')).map((h) => [h.id, h]));
  const delen = [...HOOFDSTUKKEN, ...VOETPAGINAS].map((h) => {
    const bestand = inhoud.get(h.slug);
    const bronnen = bronnenVan(h.slug);
    return [
      `# ${h.titel}`,
      '',
      `Adres: ${SITE.url}/${h.slug}`,
      bestand ? `Bijgewerkt: ${bestand.data.datum}` : '',
      '',
      `> ${h.kort}`,
      '',
      bestand?.body ? platteTekst(bestand.body) : '(Een pagina om stap voor stap te doorlopen; open het adres hierboven.)',
      ...(bronnen.length ? ['', '## Bronnen bij dit hoofdstuk', '', ...bronnen] : []),
    ].join('\n');
  });
  const kop = `# ${SITE.naam}\n\n> ${SITE.slogan}\n\nBron: ${SITE.url}. Alle bronnen samen: ${SITE.url}/bronnen\n`;
  return new Response([kop, ...delen].join('\n\n---\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
