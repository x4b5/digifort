/** De tien vragen van de huischeck. `kamer` verwijst naar de plattegrond. */
export const VRAGEN = [
  { nr: 1, vraag: 'Heeft je e-mail een eigen wachtwoord, dat je nergens anders gebruikt?', kamer: 'voordeur', kind: true },
  { nr: 2, vraag: 'Gebruik je een wachtwoordmanager? Dat is een kluis voor al je wachtwoorden.', kamer: 'sleutelkluis' },
  { nr: 3, vraag: 'Zit er een tweede slot op je e-mail en je bank? Dat heet tweestapsverificatie: een code uit een app, of een passkey.', kamer: 'tweede-slot', kind: true },
  { nr: 4, vraag: 'Werken je telefoon en computer zichzelf bij?', kamer: 'onderhoud' },
  { nr: 5, vraag: 'Heb je een kopie van je bestanden die los staat van je computer?', kamer: 'brandkast' },
  { nr: 6, vraag: 'Heeft je telefoon een pincode van zes cijfers of meer?', kamer: 'tweede-voordeur', kind: true },
  { nr: 7, vraag: 'Heb je het wachtwoord van je wifi-kastje ooit veranderd? Dat kastje heet een router.', kamer: 'tuinhek' },
  { nr: 8, vraag: 'Kun je nog in je accounts als je telefoon vandaag kwijtraakt?', kamer: 'sleutels' },
  { nr: 9, vraag: 'Heb je thuis een geheim woord afgesproken voor noodgevallen?', kamer: 'brievenbus', kind: true },
  { nr: 10, vraag: 'Weet je wie je belt als je bent opgelicht?', kamer: 'eigendomsakte' },
];

/**
 * De snelcheck op de voorpagina: drie huischeck-vragen, korter gezegd.
 * Gekozen omdat elk precies één fortdeel draagt (gracht, torenwacht, schatkamer):
 * dan kleurt zowel "ja" als "nee" meteen iets op het fort.
 */
export const SNELCHECK = [
  { nr: 2, vraag: 'Bewaar je je wachtwoorden in een wachtwoordmanager?', deel: 'gracht' },
  { nr: 4, vraag: 'Werken je telefoon en computer zichzelf bij?', deel: 'toren' },
  { nr: 5, vraag: 'Staat er een kopie van je foto\'s en bestanden op een andere plek?', deel: 'schat' },
];

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
    tekst: 'Dat is geen schande, het is het normaalste van Nederland. Bijna iedereen heeft ergens een tweede slot, en bijna niemand overal.',
    link: '/waarom-dit-saai-voelt',
    linkTekst: 'Lees waarom dat zo is',
  },
  {
    vanaf: -1,
    kop: 'Je kende jezelf goed',
    tekst: 'Je cijfer en je deuren liggen dicht bij elkaar. Dat is zeldzamer dan je denkt: de meeste mensen schatten zichzelf te hoog in.',
    link: '/aan-de-slag',
    linkTekst: 'Ga verder met de deuren die nog openstaan',
  },
  {
    vanaf: -10,
    kop: 'Je was strenger voor jezelf dan nodig',
    tekst: 'Je doet meer dan je dacht. Dat is ook iets waard: wie denkt dat hij niets goed doet, begint er vaak niet meer aan.',
    link: '/aan-de-slag',
    linkTekst: 'Kijk wat er nog over is',
  },
];

/** Bij welk verschil hoort welke spiegel? `gat` is je cijfer min je uitslag. */
export function spiegel(gat) {
  return SPIEGELS.find((s) => gat >= s.vanaf) ?? SPIEGELS[SPIEGELS.length - 1];
}

export const BANDEN = [
  { tot: 4, kop: 'Begin bij niveau 1', tekst: 'Begin bij niveau 1 in hoofdstuk 4. Dat kost één avond.', link: '/aan-de-slag#niveau-1' },
  { tot: 7, kop: 'De basis staat', tekst: 'De basis staat. Ga door naar niveau 2.', link: '/aan-de-slag#niveau-2' },
  { tot: 10, kop: 'Je huis zit goed op slot', tekst: 'Je huis zit goed op slot. Lees hoofdstuk 3 en help daarna iemand anders.', link: '/inbrekers-van-morgen' },
];

export function band(ja) {
  return BANDEN.find((b) => ja <= b.tot) ?? BANDEN[BANDEN.length - 1];
}
