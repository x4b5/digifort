/** De sitekaart: één bron voor menu, kaartjes en volgende/vorige. */
export const SITE = {
  naam: 'digi-fort.',
  url: 'https://digi-fort.nl', // gelijk aan `site` in astro.config.mjs; eenheid.spec.js bewaakt dat
  slogan: 'Digitale weerbaarheid in gewone taal, zonder bangmakerij en zonder reclame.',
  laatstNagelopen: '2026-09-30',
  contact: 'x4b5.clause500@8shield.net', // SimpleLogin-alias, stuurt door naar Proton
};

/**
 * Wanneer welk deel van de site voor het laatst met de bron ernaast is nagelopen.
 * Met de hand bijwerken als je het echt hebt gedaan: deze datums staan in de tekst
 * en mogen niet meeschuiven met een willekeurige commit.
 */
/** @type {Record<string, string>} */
export const NAGELOPEN = {
  gereedschap: '2026-09-20',
  bronnen: '2026-09-21',
};

/**
 * De site heeft twee delen. "Doen" lees je op volgorde, met je telefoon in de hand:
 * na elk hoofdstuk is je huis een stukje dichter. "Opzoeken" is naslag: uitleg en
 * achtergrond die je erbij pakt als je hem nodig hebt, in welke volgorde je wilt.
 * Alleen de hoofdstukken van "Doen" hebben een nummer.
 */
export const DELEN = [
  {
    id: 'doen',
    nr: 1,
    titel: 'Doen',
    kop: 'Hier begin je',
    kort: 'Vijf hoofdstukken, op volgorde. Pak je telefoon erbij: je doet het meteen, en daarna is je huis veiliger.',
  },
  {
    id: 'opzoeken',
    nr: 2,
    titel: 'Opzoeken',
    kop: 'Dit zoek je op',
    kort: 'Uitleg en achtergrond. Lees wat je nodig hebt, wanneer je het nodig hebt.',
  },
];

/**
 * @typedef {{ nr: number | null, slug: string, titel: string, kort: string, deel: 'doen' | 'opzoeken', extra?: boolean }} Hoofdstuk
 * `extra`: een pagina die als zijtak onder het hoofdstuk erboven hangt (de stap-voor-stappagina's).
 */
/** @type {Hoofdstuk[]} */
export const HOOFDSTUKKEN = [
  // Deel 1: Doen
  { deel: 'doen', nr: 1, slug: 'huischeck', titel: 'De huischeck', kort: 'Tien vragen, twee minuten. Elke "nee" is een deur die openstaat.' },
  { deel: 'doen', nr: 2, slug: 'aan-de-slag', titel: 'Aan de slag: deur voor deur', kort: 'Niveau 1 in één avond, niveau 2 in een weekend. Alles gratis.' },
  { deel: 'doen', nr: null, slug: 'een-avond', titel: 'Ik heb één avond', kort: 'Zes stappen, één per scherm, ongeveer een uur. Dezelfde lijst als niveau 1.', extra: true },
  { deel: 'doen', nr: null, slug: 'een-weekend', titel: 'Ik heb een weekend', kort: 'Tien stappen, één per scherm, ongeveer vier uur. Dezelfde lijst als niveau 2.', extra: true },
  { deel: 'doen', nr: null, slug: 'ik-wil-verder', titel: 'Ik wil verder', kort: 'Zes klussen, één per scherm, voor wie de basis heeft staan. Dezelfde lijst als niveau 3.', extra: true },
  { deel: 'doen', nr: 3, slug: 'als-er-is-ingebroken', titel: 'Als er toch is ingebroken', kort: 'Het eerste uur, je telefoon kwijt, en het noodpakket.' },
  { deel: 'doen', nr: 4, slug: 'voor-de-mensen-om-je-heen', titel: 'Voor de mensen om je heen', kort: 'Ouders, kinderen en collega’s: zij hebben ook een sleutel.' },
  { deel: 'doen', nr: 5, slug: 'onderhoud', titel: 'Onderhoud en opruimen', kort: 'Oude apparaten, weggooien, en wat er over jou op internet staat.' },
  // Deel 2: Opzoeken
  { deel: 'opzoeken', nr: null, slug: 'plattegrond', titel: 'De plattegrond van je digitale huis', kort: 'Veertien plekken in je huis, van de voordeur tot de brandkast.' },
  { deel: 'opzoeken', nr: null, slug: 'inbrekers-van-nu', titel: 'De inbrekers van nu', kort: 'Babbeltrucs, datalekken, gijzeling en gestolen nummers.' },
  { deel: 'opzoeken', nr: null, slug: 'inbrekers-van-morgen', titel: 'De inbrekers van morgen', kort: 'AI dat jouw stem kent en computers die oude sloten openen.' },
  { deel: 'opzoeken', nr: null, slug: 'van-geheim-woord-naar-zegelring', titel: 'Van geheim woord naar zegelring', kort: 'De ladder: acht manieren om in te loggen, van zwak naar sterk.' },
  { deel: 'opzoeken', nr: null, slug: 'het-fort-afbouwen', titel: 'Nog sterker beveiligen', kort: 'Voor wie de basis heeft: reservekopieën, herstelcodes, je nalatenschap, en daarna de zwaarste sloten.' },
  { deel: 'opzoeken', nr: null, slug: 'krijg-je-je-geld-terug', titel: 'Krijg je je geld terug?', kort: 'Eén vraag bepaalt bijna alles: heb jij zelf op akkoord gedrukt, of iemand anders?' },
  { deel: 'opzoeken', nr: null, slug: 'de-storm-om-het-huis', titel: 'De storm om het huis', kort: 'Staten, hackers en oorlog op afstand: wat de wereld met jouw voordeur te maken heeft.' },
  { deel: 'opzoeken', nr: null, slug: 'wie-bewaart-je-sleutel', titel: 'Bij wie liggen je sleutels veilig?', kort: 'Waar je wachtwoorden en passkeys staan, of de kluis in je telefoon goed genoeg is, en waarom deze site Europees kiest.' },
  { deel: 'opzoeken', nr: null, slug: 'waarom-dit-saai-voelt', titel: 'Waarom dit saai voelt', kort: 'De helft van Nederland maakt zich geen zorgen. Dat is geen domheid — het zit in één woordje.' },
  { deel: 'opzoeken', nr: null, slug: 'het-inbraakspel', titel: 'Het inbraakspel', kort: 'Speel de oplichter en probeer geld los te krijgen bij Ria. Wie de truc zelf bedenkt, herkent hem later sneller.' },
  { deel: 'opzoeken', nr: null, slug: 'woordenboek', titel: 'Woordenboek', kort: 'Elke vakterm in één zin, met de plek in het huis erbij.' },
  { deel: 'opzoeken', nr: null, slug: 'bronnen', titel: 'De bronnen', kort: 'Elke feitelijke bewering op deze site, met de bron erbij en of hij is nagelopen.' },
  { deel: 'opzoeken', nr: null, slug: 'over', titel: 'Over deze site', kort: 'Waarom, door wie, en waar de bronnen staan.' },
];

/** Het aantal genummerde hoofdstukken in "Doen". */
export const AANTAL_DOEN = HOOFDSTUKKEN.filter((h) => h.deel === 'doen' && h.nr !== null).length;

/** @param {string} slug */
export function hoofdstuk(slug) {
  return HOOFDSTUKKEN.find((h) => h.slug === slug);
}

/**
 * De hoofdstukken, elk met de verdiepingen die erachter staan. Zo kan het menu
 * en de homepage een verdieping onder zijn hoofdstuk wegklappen.
 * @param {Hoofdstuk[]} [lijst]
 * @returns {Array<Hoofdstuk & { verdiepingen: Hoofdstuk[] }>}
 */
export function metVerdiepingen(lijst = HOOFDSTUKKEN) {
  return lijst.reduce((/** @type {Array<Hoofdstuk & { verdiepingen: Hoofdstuk[] }>} */ groepen, h) => {
    const vorige = groepen.at(-1);
    if (!h.extra || !vorige) return [...groepen, { ...h, verdiepingen: [] }];
    return [...groepen.slice(0, -1), { ...vorige, verdiepingen: [...vorige.verdiepingen, h] }];
  }, []);
}

/** De twee delen, elk met zijn hoofdstukken (en hun verdiepingen): voor het menu en de voorpagina. */
export function perDeel() {
  return DELEN.map((d) => ({ ...d, groepen: metVerdiepingen(HOOFDSTUKKEN.filter((h) => h.deel === d.id)) }));
}

/**
 * Waar een pagina in de site staat, in woorden: "Hoofdstuk 2 van 5" voor een
 * genummerd doe-hoofdstuk, "Bij hoofdstuk 2" voor een verdieping, "Naslag" voor opzoeken.
 * @param {string} slug
 */
export function plek(slug) {
  const h = hoofdstuk(slug);
  if (!h) return null;
  const deel = DELEN.find((d) => d.id === h.deel);
  if (h.deel === 'opzoeken') return { deel, tekst: 'Naslag' };
  if (h.nr !== null) return { deel, tekst: `Hoofdstuk ${h.nr} van ${AANTAL_DOEN}` };
  const ouder = HOOFDSTUKKEN.slice(0, HOOFDSTUKKEN.indexOf(h)).findLast((x) => x.nr !== null);
  return { deel, tekst: `Bij hoofdstuk ${ouder?.nr}, stap voor stap` };
}

/**
 * Pagina's die bestaan maar niet in de leesroute staan: ze horen in de voetregel,
 * niet in de inhoudsopgave. Ze staan hier zodat de tests ze net zo goed aflopen
 * als de hoofdstukken.
 */
export const VOETPAGINAS = [
  { slug: 'kleine-lettertjes', titel: 'De kleine lettertjes', kort: 'Wat deze site niet is, wat er over jou bijgehouden wordt, van wie dit is en hoe hij gemaakt is.' },
];

/**
 * Vorige en volgende pagina. De route loopt door beide delen heen; `anderDeel`
 * zegt of de buurman in het andere deel staat, zodat de knop dat kan zeggen.
 * @param {string} slug
 */
export function buren(slug) {
  const i = HOOFDSTUKKEN.findIndex((h) => h.slug === slug);
  // een voetpagina staat niet in de route: dan hoort er onderaan geen vorige/volgende
  if (i === -1) return { vorige: null, volgende: null };
  const hier = HOOFDSTUKKEN[i];
  const met = (/** @type {Hoofdstuk | undefined} */ h) => (h ? { ...h, anderDeel: h.deel !== hier.deel } : null);
  return { vorige: met(HOOFDSTUKKEN[i - 1]), volgende: met(HOOFDSTUKKEN[i + 1]) };
}

export function datumNL(iso) {
  const [j, m, d] = iso.split('-').map(Number);
  const maanden = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  return `${d} ${maanden[m - 1]} ${j}`;
}
