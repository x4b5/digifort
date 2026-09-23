/**
 * /llms.txt: een inhoudsopgave voor AI-assistenten, volgens het voorstel op llmstxt.org.
 * Gemaakt uit site.js, dus hij loopt nooit achter op het menu.
 */
import type { APIRoute } from 'astro';
import { SITE, HOOFDSTUKKEN, VOETPAGINAS } from '../lib/site.js';

const regel = (h: { slug: string; titel: string; kort: string }) => `- [${h.titel}](${SITE.url}/${h.slug}): ${h.kort}`;

export const GET: APIRoute = () => {
  const hoofdstukken = HOOFDSTUKKEN.filter((h) => !h.extra);
  const verdiepingen = HOOFDSTUKKEN.filter((h) => h.extra);
  const tekst = [
    `# ${SITE.naam}`,
    '',
    `> ${SITE.slogan} Voor gewone mensen in Nederland, geen experts. Het beeld: je digitale leven is een huis dat je ombouwt tot een fort. Elke feitelijke bewering heeft een nagelopen bron.`,
    '',
    `De volledige tekst van alle hoofdstukken, met de bronnen per hoofdstuk, staat in [llms-full.txt](${SITE.url}/llms-full.txt). Geschreven in het Nederlands, op B1-niveau.`,
    '',
    '## Hoofdstukken, in leesvolgorde',
    '',
    ...hoofdstukken.map(regel),
    '',
    '## Verdiepingen',
    '',
    ...verdiepingen.map(regel),
    '',
    '## Optional',
    '',
    ...VOETPAGINAS.map(regel),
    '',
  ].join('\n');
  return new Response(tekst, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
