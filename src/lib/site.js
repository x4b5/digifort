/** De sitekaart: één bron voor menu, kaartjes en volgende/vorige. */
export const SITE = {
  naam: 'digiFORT.',
  slogan: 'Digitale veiligheid in gewone taal, zonder bangmakerij en zonder reclame.',
  laatstNagelopen: '2026-09-23',
  contact: 'x4b5.clause500@8shield.net', // SimpleLogin-alias, stuurt door naar Proton
};

/**
 * Wanneer welk deel van de site voor het laatst met de bron ernaast is nagelopen.
 * Met de hand bijwerken als je het echt hebt gedaan: deze datums staan in de tekst
 * en mogen niet meeschuiven met een willekeurige commit.
 */
export const NAGELOPEN = {
  gereedschap: '2026-09-20',
  bronnen: '2026-09-21',
};

export const HOOFDSTUKKEN = [
  { nr: 0, slug: 'huischeck', titel: 'De huischeck', kort: 'Tien vragen, twee minuten. Elke "nee" is een deur die openstaat.' },
  { nr: 1, slug: 'plattegrond', titel: 'De plattegrond van je digitale huis', kort: 'Veertien plekken in je huis, van de voordeur tot de brandkast.' },
  { nr: 2, slug: 'inbrekers-van-nu', titel: 'De inbrekers van nu', kort: 'Babbeltrucs, datalekken, gijzeling en gestolen nummers.' },
  { nr: 3, slug: 'inbrekers-van-morgen', titel: 'De inbrekers van morgen', kort: 'AI dat jouw stem kent en computers die oude sloten openen.' },
  { nr: null, slug: 'de-storm-om-het-huis', titel: 'De storm om het huis', kort: 'Staten, hackers en oorlog op afstand: wat de wereld met jouw voordeur te maken heeft.', extra: true },
  { nr: 4, slug: 'aan-de-slag', titel: 'Aan de slag: deur voor deur', kort: 'Niveau 1 in één avond, niveau 2 in een weekend. Alles gratis.' },
  { nr: null, slug: 'een-avond', titel: 'Ik heb één avond', kort: 'Zes stappen, één per scherm, ongeveer een uur. Dezelfde lijst als niveau 1.', extra: true },
  { nr: null, slug: 'van-geheim-woord-naar-zegelring', titel: 'Van geheim woord naar zegelring', kort: 'De ladder: acht manieren om in te loggen, van zwak naar sterk.', extra: true },
  { nr: 5, slug: 'onderhoud', titel: 'Onderhoud en opruimen', kort: 'Oude apparaten, weggooien, en wat er over jou op internet staat.' },
  { nr: 6, slug: 'als-er-is-ingebroken', titel: 'Als er toch is ingebroken', kort: 'Het eerste uur, je telefoon kwijt, en het noodpakket.' },
  { nr: 7, slug: 'voor-de-mensen-om-je-heen', titel: 'Voor de mensen om je heen', kort: 'Ouders, kinderen en collega’s: zij hebben ook een sleutel.' },
  { nr: 8, slug: 'woordenboek', titel: 'Woordenboek', kort: 'Elke vakterm in één zin, met de plek in het huis erbij.' },
  { nr: 9, slug: 'over', titel: 'Over deze site', kort: 'Waarom, door wie, en waar de bronnen staan.' },
];

export function buren(slug) {
  const i = HOOFDSTUKKEN.findIndex((h) => h.slug === slug);
  return { vorige: HOOFDSTUKKEN[i - 1] ?? null, volgende: HOOFDSTUKKEN[i + 1] ?? null };
}

export function datumNL(iso) {
  const [j, m, d] = iso.split('-').map(Number);
  const maanden = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  return `${d} ${maanden[m - 1]} ${j}`;
}
