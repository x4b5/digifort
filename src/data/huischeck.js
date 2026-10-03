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
      'Vraagt je telefoon om je code of gezicht? Dat is normaal. Tik op je toestel.',
      { dienst: 'iPhone', regels: ['Open de app Wachtwoorden, of in Instellingen het kopje Wachtwoorden.'] },
      { dienst: 'Android of Samsung', regels: ['Open Instellingen en typ ‘wachtwoorden’ in de zoekbalk.', 'Zie je meer treffers, zoals Samsung Pass en Google Wachtwoordmanager? Kijk dan in allebei.'] },
      'Staan er namen van sites en apps in? Dan kies je Ja. Is alles leeg? Dan kies je Nee.',
    ],
    noot: 'Bewaart je telefoon je wachtwoorden al? Dan heb je er al een. Zet je antwoord dan op Ja. Anders neem je Bitwarden of Proton Pass, allebei gratis.',
    nootLink: { href: '#vraag-2', tekst: 'Terug naar vraag 2' },
    dicht: 'Je gebruikt een wachtwoordmanager.',
    stap: { lijst: 'niveau-1', id: 'wachtwoordmanager' },
  },
  {
    nr: 3, groep: 'mail', kamer: 'tweede-slot', kind: true,
    vraag: 'Zit er een tweede slot op je e-mail?',
    hint: 'Na je wachtwoord vraagt je e-mail dan nog een code, of een tik op Ja in een melding; je gezicht of vinger telt niet.',
    nakijken: [
      'Staat je mail in de Mail-app altijd open? Dat is normaal. Je kijkt niet in die app, maar bij je maildienst.',
      'Daar heb je je wachtwoord nodig; weet je dat niet? Kies dan Weet ik niet.',
      'Tik op je maildienst. Die staat na de @ in je adres.',
      { dienst: 'Gmail', regels: ['Open de Gmail-app, tik rechtsboven op je foto en kies je Google-account beheren. Of ga naar myaccount.google.com.', 'Kies Beveiliging. Staat Verificatie in 2 stappen aan? Dan kies je Ja.'] },
      { dienst: 'Outlook of Hotmail', regels: ['Ga in je browser naar account.microsoft.com en kies Beveiliging.', 'Staat tweestapsverificatie aan? Dan kies je Ja.'] },
      { dienst: 'iCloud', regels: ['Open Instellingen op je iPhone en tik bovenaan op je naam.', 'Tik op Inloggen en beveiliging. Op een oudere iPhone heet dat Wachtwoord en beveiliging.', 'Staat twee-factor-authenticatie aan? Dan kies je Ja.'] },
      { dienst: 'KPN of Ziggo', regels: ['Dat zie je in MijnKPN (kpn.com) of Mijn Ziggo (ziggo.nl). Dat is vaak een andere inlog dan je mail.', 'Heb je nooit zelf een code voor je mail ingesteld? Dan kies je Nee. Dat is niet jouw fout.'] },
      { dienst: 'Een andere dienst', regels: ['Log in op de website van je maildienst. Zoek bij de beveiliging naar ‘tweestapsverificatie’ of ‘2FA’.', 'Staat het aan? Dan kies je Ja.'] },
      'Staat het uit? Dan kies je Nee.',
    ],
    dicht: 'Je e-mail heeft een tweede slot.',
    stap: { lijst: 'niveau-1', id: 'mail-tweede-slot' },
  },
  {
    nr: 4, groep: 'apparaten', kamer: 'onderhoud',
    vraag: 'Werken je telefoon en computer zichzelf bij?',
    hint: 'Updates gaan dan vanzelf, zonder dat jij erop hoeft te tikken.',
    nakijken: [
      'Je verandert nog niets. Tik op je toestel.',
      { dienst: 'iPhone', regels: ['Open Instellingen, dan Algemeen, dan Software-update.', 'Staat Automatische updates aan? Dan is het goed.'] },
      { dienst: 'Android', regels: ['Open Instellingen en typ ‘software-update’ in de zoekbalk. Kies die van je telefoon, niet die van Google Play.', 'Staat automatisch downloaden aan? Bij Samsung heet dat Automatisch downloaden via wifi. Dan is het goed.'] },
      { dienst: 'Mac', regels: ['Kies in het Apple-menu linksboven Systeeminstellingen, dan Algemeen, dan Software-update.', 'Staan de automatische updates aan? Dan is het goed.'] },
      { dienst: 'Windows', regels: ['Klik op Start, het Windows-logo onderin beeld. Typ ‘Windows Update’ en open het.', 'Staat er dat je up-to-date bent, dat je opnieuw moet opstarten of dat er updates klaarstaan? Dan is het goed.', 'Zie je de knop Updates hervatten? Dan staan ze op pauze: niet goed.'] },
      'Is het goed op je telefoon én je computer? Dan kies je Ja.',
    ],
    dicht: 'Je telefoon en computer werken zichzelf bij.',
    stap: { lijst: 'niveau-1', id: 'updates' },
  },
  {
    nr: 5, groep: 'apparaten', kamer: 'brandkast',
    vraag: 'Heb je een kopie van je foto’s en bestanden op een andere plek?',
    hint: 'Bijvoorbeeld op een losse schijf, of op internet via de back-up van je telefoon.',
    nakijken: [
      'Tik op je toestel.',
      { dienst: 'iPhone', regels: ['Open Instellingen, tik op je naam, dan iCloud, dan iCloud-reservekopie.', 'Staat het aan? Dan is het goed.'] },
      { dienst: 'Android of Samsung', regels: ['Open Instellingen en typ ‘back-up’ in de zoekbalk.', 'Staat de back-up aan? Dan is het goed.'] },
      { dienst: 'Computer', regels: ['Zet je computer een kopie op een losse schijf? Dan is het goed.'] },
      'Overal goed? Dan kies je Ja.',
    ],
    dicht: 'Je hebt een kopie van je foto’s en bestanden op een andere plek.',
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
      'Herstelcodes zijn noodcodes voor je e-mail, ook wel back-upcodes. Liggen ze thuis op papier? Dan kies je Ja.',
      'Nooit gekregen? Open je mail op je computer of tablet. Zie je je berichten zonder in te loggen? Dan kies je ook Ja.',
      'Geen van beide? Dan kies je Nee.',
    ],
    noot: 'Herstelcodes zijn noodcodes voor je e-mail. Je maakt ze op de website van je maildienst, niet in de Mail-app.',
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
