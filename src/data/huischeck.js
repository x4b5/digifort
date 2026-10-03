/**
 * De tien vragen van de huischeck. `kamer` verwijst naar de plattegrond.
 *
 * - `vraag` is de vraag zelf: kort, één ding. Nooit twee dingen in één vraag.
 * - `hint` legt uit wat we bedoelen, in één zin en zonder link. Hij staat even
 *   groot en even donker als gewone tekst: wie de vraag niet snapt, moet hem
 *   kunnen lezen. Een schermlezer leest hem bij elke keuze voor. Haal er nooit
 *   een andere vraag bij: dan gaat de lezer twijfelen aan zijn eerdere antwoord.
 * - `dicht` zegt in gewone woorden wat een "ja" betekent. Dat staat in de uitslag
 *   onder "Dit heb je al goed", zodat je elk punt terugkoppelt aan je antwoord.
 * - `nakijken` (mag ontbreken) zegt waar je het antwoord ziet. Het staat ingeklapt
 *   onder de hint, als GOV.UK-details: wie twijfelt, klapt het open. Alleen menupaden
 *   die ook in de stappen staan (avond.js, weekend.js); weet je het pad niet zeker,
 *   laat de lezer dan zoeken in Instellingen. Altijd erbij: welk antwoord je dan kiest.
 * - `noot` (mag ontbreken) staat in de uitslag onder de stap: wat je moet weten
 *   voordat je begint. `nootLink` wijst terug naar de vraag als je het al blijkt te hebben.
 * - `groep` zet vragen die bij elkaar horen onder één kopje.
 * - `stap` is de handeling die deze deur dichtdoet. Met `lijst` en `id` is het een
 *   stap uit een afvinklijst (lijsten.js), met een eigen pagina (`STAPPAGINA`).
 *   Zonder lijst is het een link naar een plek op de site.
 *
 * Een regel in `nakijken` mag ook `{ dienst, regels }` zijn: een keuze (maildienst of
 *   toestel) die apart openklapt, zodat je alleen jouw pad ziet.
 *
 * Het nummer `nr` is ook de sleutel in het laatje (opslag.js): verander het nooit.
 *
 * @typedef {string | { dienst: string, regels: string[] }} Nakijkregel
 * @typedef {{ nr: number, groep: string, kamer: string, kind?: boolean, vraag: string, hint: string, nakijken?: Nakijkregel[], noot?: string, nootLink?: { href: string, tekst: string }, dicht: string, stap: { lijst?: string, id?: string, href?: string, tekst?: string, pagina?: string, vinkje?: { lijst: string, id: string } } }} Vraag
 */
/** @type {Vraag[]} */
export const VRAGEN = [
  {
    nr: 1, groep: 'mail', kamer: 'voordeur', kind: true,
    vraag: 'Heeft je e-mail een eigen wachtwoord, dat je nergens anders gebruikt?',
    hint: 'Met je e-mail kun je bijna overal een nieuw wachtwoord aanvragen.',
    dicht: 'Je e-mail heeft een eigen wachtwoord.',
    stap: { lijst: 'niveau-1', id: 'mail-wachtwoord' },
  },
  {
    nr: 2, groep: 'mail', kamer: 'sleutelkluis',
    vraag: 'Gebruik je een wachtwoordmanager, een app die je wachtwoorden bewaart?',
    hint: 'Bewaart je telefoon je wachtwoorden als je op ‘bewaren’ tikt, dan telt dat ook.',
    nakijken: [
      'Open Instellingen. Bovenaan staat een zoekveld of vergrootglas. Zie je het niet? Veeg omlaag.',
      'Typ ‘wachtwoorden’ en open wat je vindt. Je telefoon vraagt eerst je code, gezicht of vinger. Dat is normaal.',
      'Zie je een lijst met namen van sites en apps? Dan kies je Ja. Is de lijst leeg? Kies dan Nee.',
      'Gebruik je Bitwarden of Proton Pass? Ook dan kies je Ja.',
    ],
    noot: 'Bewaart je telefoon je wachtwoorden al? Dan heb je er al een. Zet je antwoord dan op Ja. Anders neem je Bitwarden of Proton Pass. Die zijn allebei gratis.',
    nootLink: { href: '#vraag-2', tekst: 'Terug naar vraag 2' },
    dicht: 'Je gebruikt een wachtwoordmanager.',
    stap: { lijst: 'niveau-1', id: 'wachtwoordmanager' },
  },
  {
    nr: 3, groep: 'mail', kamer: 'tweede-slot', kind: true,
    vraag: 'Zit er een tweede slot op je e-mail?',
    hint: 'Na je wachtwoord vraagt je e-mail dan nog om een code, of om een tik op Ja in een melding op je telefoon; je gezicht of vinger telt niet.',
    nakijken: [
      'Staat je e-mail op je telefoon altijd open? Dat is normaal. Het tweede slot merk je pas als je op een nieuw apparaat inlogt.',
      'Vraagt de site eerst je wachtwoord, en weet je dat niet? Kies dan Weet ik niet.',
      'Tik op je maildienst. Die zie je aan het eind van je e-mailadres, na de @.',
      { dienst: 'Gmail', regels: ['Open de Gmail-app. Tik rechtsboven op je foto en kies het beheren van je Google-account. Of ga in je browser naar myaccount.google.com.', 'Kies Beveiliging en zoek Verificatie in 2 stappen.', 'Staat het aan? Dan kies je Ja.'] },
      { dienst: 'Outlook of Hotmail', regels: ['Ga in je browser naar account.microsoft.com en kies Beveiliging.', 'Zoek naar ‘tweestapsverificatie’.', 'Staat het aan? Dan kies je Ja.'] },
      { dienst: 'iCloud', regels: ['Open Instellingen op je iPhone en tik bovenaan op je naam.', 'Tik op Inloggen en beveiliging. Op een oudere iPhone heet dat Wachtwoord en beveiliging.', 'Staat twee-factor-authenticatie aan? Dan kies je Ja.'] },
      { dienst: 'KPN of Ziggo', regels: ['Ga in je browser naar kpn.com of ziggo.nl. Log in bij MijnKPN of Mijn Ziggo.', 'Typ ‘tweestapsverificatie’ in de zoekbalk van de site.', 'Staat het aan? Dan kies je Ja.'] },
      { dienst: 'Een andere dienst', regels: ['Log in op de website van je maildienst.', 'Zoek in de instellingen naar ‘beveiliging’, ‘tweestapsverificatie’ of ‘2FA’.', 'Staat het aan? Dan kies je Ja.'] },
      'Staat het uit? Dan kies je Nee. Vind je het niet? Kies dan Weet ik niet.',
    ],
    dicht: 'Je e-mail heeft een tweede slot.',
    stap: { lijst: 'niveau-1', id: 'mail-tweede-slot' },
  },
  {
    nr: 4, groep: 'apparaten', kamer: 'onderhoud',
    vraag: 'Werken je telefoon en computer zichzelf bij?',
    hint: 'Updates gaan dan vanzelf, zonder dat jij erop hoeft te tikken.',
    nakijken: [
      'Je kijkt alleen. Je verandert nog niets. Tik op je toestel.',
      { dienst: 'iPhone', regels: ['Open Instellingen, dan Algemeen, dan Software-update.', 'Staat Automatische updates aan? Dan is het goed.'] },
      { dienst: 'Android', regels: ['Open Instellingen en typ ‘software-update’ in de zoekbalk.', 'Kies de update van je telefoon zelf, niet die van Google Play of je apps.', 'Staat automatisch downloaden aan? Bij Samsung heet dat Automatisch downloaden via wifi. Dan is het goed.'] },
      { dienst: 'Mac', regels: ['Open het Apple-menu linksboven en kies Systeeminstellingen.', 'Klik op Algemeen en dan op Software-update.', 'Staan de automatische updates aan? Dan is het goed.'] },
      { dienst: 'Windows', regels: ['Klik op Start en typ ‘Windows Update’. Open het.', 'Staat er dat je up-to-date bent, zonder knop Updates hervatten? Dan is het goed.'] },
      'Is het goed op je telefoon én je computer? Dan kies je Ja.',
    ],
    dicht: 'Je telefoon en computer werken zichzelf bij.',
    stap: { lijst: 'niveau-1', id: 'updates' },
  },
  {
    nr: 5, groep: 'apparaten', kamer: 'brandkast',
    vraag: 'Heb je een kopie van je bestanden die los staat van je computer?',
    hint: 'Bijvoorbeeld op een losse schijf, of op internet.',
    dicht: 'Je hebt een kopie van je bestanden die los staat van je computer.',
    stap: { lijst: 'niveau-2', id: 'backup' },
  },
  {
    nr: 6, groep: 'apparaten', kamer: 'tweede-voordeur', kind: true,
    vraag: 'Heeft je telefoon een pincode van zes cijfers of meer?',
    hint: 'Dat is de code die je intikt om je telefoon te openen; een patroon tekenen telt niet.',
    nakijken: [
      'Gebruik je je gezicht of vinger? Kijk dan naar de code die je na het aanzetten intikt.',
      'Zijn dat zes cijfers of meer? Dan kies je Ja.',
      'Teken je een lijn, of zijn het vier cijfers? Dan kies je Nee.',
    ],
    dicht: 'Je telefoon heeft een pincode van zes cijfers of meer.',
    stap: { lijst: 'niveau-1', id: 'pincode' },
  },
  {
    nr: 7, groep: 'thuis', kamer: 'tuinhek',
    vraag: 'Heb je het wachtwoord van je wifi-kastje ooit veranderd?',
    hint: 'Dat kastje heet een router, en een wachtwoord uit de fabriek is soms makkelijk te raden.',
    dicht: 'Je wifi-kastje heeft een eigen wachtwoord.',
    stap: { lijst: 'niveau-2', id: 'router' },
  },
  {
    nr: 8, groep: 'thuis', kamer: 'sleutels',
    vraag: 'Kun je nog in je e-mail als je telefoon vandaag kwijtraakt?',
    hint: 'Bijvoorbeeld met herstelcodes op papier, of op een computer waar je e-mail al openstaat.',
    nakijken: [
      'Herstelcodes zijn een rijtje codes voor noodgevallen. Elke code werkt één keer.',
      'Je krijgt ze bij het tweede slot op je e-mail. Ze heten soms ook back-upcodes.',
      'Liggen ze thuis op papier? Dan kies je Ja.',
    ],
    noot: 'Herstelcodes zijn noodcodes voor je e-mail. Je vindt ze in de instellingen van je e-mail, bij beveiliging.',
    dicht: 'Je kunt in je e-mail, ook zonder je telefoon.',
    stap: { lijst: 'niveau-2', id: 'noodcodes' },
  },
  {
    nr: 9, groep: 'thuis', kamer: 'brievenbus', kind: true,
    vraag: 'Heb je thuis een geheim woord afgesproken voor noodgevallen?',
    hint: 'Belt iemand in paniek om geld, dan vraag je eerst naar dat woord.',
    dicht: 'Je hebt thuis een geheim woord afgesproken.',
    stap: { lijst: 'niveau-1', id: 'geheim-woord' },
  },
  {
    nr: 10, groep: 'thuis', kamer: 'eigendomsakte',
    vraag: 'Weet je wie je belt als je bent opgelicht?',
    hint: 'Bijvoorbeeld het noodnummer van je bank.',
    dicht: 'Je weet wie je belt als je bent opgelicht.',
    // geen stap uit een afvinklijst; het vinkje bewaren we in een eigen laatje (`vinkje`)
    stap: { href: '/als-er-is-ingebroken#noodkaart-kop', tekst: 'Kijk wie je belt als je bent opgelicht', pagina: 'Als er toch is ingebroken', vinkje: { lijst: 'huischeck', id: 'noodkaart' } },
  },
];

/** De kopjes boven de vragen. De vragen staan in deze volgorde, dus elk kopje staat boven een aaneengesloten rij. */
export const GROEPEN = [
  { id: 'mail', kop: 'Je e-mail en je wachtwoorden' },
  { id: 'apparaten', kop: 'Je telefoon en je computer' },
  { id: 'thuis', kop: 'Thuis en in noodgevallen' },
];

/** Welke pagina hoort bij welke afvinklijst: daar doe je de stap, één per scherm. */
export const STAPPAGINA = {
  'niveau-1': { href: '/een-avond', naam: 'Ik heb één avond' },
  'niveau-2': { href: '/een-weekend', naam: 'Ik heb een weekend' },
};

/**
 * Het cijfer dat Nederlanders zichzelf gemiddeld geven voor het omgaan met online
 * risico's. Staat met bron in de bronnenlijst (Alert Online 2025, Ipsos I&O).
 */
export const LANDELIJK_CIJFER = 6.9;

/**
 * De spiegel: jouw eigen cijfer naast het aantal deuren dat dicht staat.
 * Het gat tussen die twee is waar het om gaat — niet de score zelf.
 * `cijfer` is 1..10 (wat je jezelf gaf), `schaal` is je uitslag omgerekend naar 10.
 */
export const SPIEGELS = [
  {
    vanaf: 2,
    kop: 'Je schatte jezelf hoger in dan je deuren',
    tekst: 'Dat is heel gewoon. Bijna iedereen heeft ergens een tweede slot, en bijna niemand overal.',
    link: '/waarom-dit-saai-voelt',
    linkTekst: 'Lees waarom dat zo is',
  },
  {
    vanaf: -1,
    kop: 'Je kende jezelf goed',
    tekst: 'Je cijfer en je deuren liggen dicht bij elkaar. De meeste mensen schatten zichzelf te hoog in.',
  },
  {
    vanaf: -10,
    kop: 'Je was strenger voor jezelf dan nodig',
    tekst: 'Je doet meer dan je dacht. Dat is iets waard.',
  },
];

/** Bij welk verschil hoort welke spiegel? `gat` is je cijfer min je uitslag. */
export function spiegel(gat) {
  return SPIEGELS.find((s) => gat >= s.vanaf) ?? SPIEGELS[SPIEGELS.length - 1];
}

/**
 * Het oordeel boven je uitslag. Het hangt af van wélke deuren openstaan, niet
 * alleen van hoeveel: wie zijn e-mail nog open heeft, begint bij de basis,
 * ook als de rest dicht is.
 */
export const BANDEN = [
  { id: 'basis', kop: 'Begin bij de basis', tekst: 'Een paar belangrijke deuren staan nog open. Begin met de stap hieronder.' },
  { id: 'verder', kop: 'De basis staat', tekst: 'Je belangrijkste deuren zitten dicht. Doe de rest als het jou uitkomt.' },
  { id: 'dicht', kop: 'Je huis zit goed op slot', tekst: 'Alle deuren zitten dicht. Mooi werk.' },
];

/**
 * Welk oordeel past bij deze open deuren?
 * @param {number[]} open de nummers van de vragen met "nee" of "weet ik niet"
 */
export function band(open) {
  if (!open.length) return BANDEN[2];
  const basis = open.some((nr) => VRAGEN.find((v) => v.nr === nr)?.stap.lijst === 'niveau-1');
  return basis ? BANDEN[0] : BANDEN[1];
}
