/** De tien vragen van de huischeck. `kamer` verwijst naar de plattegrond. */
export const VRAGEN = [
  { nr: 1, vraag: 'Heeft je e-mail een eigen wachtwoord, dat je nergens anders gebruikt?', kamer: 'voordeur', kind: true },
  { nr: 2, vraag: 'Gebruik je een wachtwoordmanager? Dat is een kluis voor al je wachtwoorden.', kamer: 'sleutelkluis' },
  { nr: 3, vraag: 'Zit er een tweede slot op je e-mail en je bank? Dat heet tweestapsverificatie.', kamer: 'tweede-slot', kind: true },
  { nr: 4, vraag: 'Werken je telefoon en computer zichzelf bij?', kamer: 'onderhoud' },
  { nr: 5, vraag: 'Heb je een kopie van je bestanden die los staat van je computer?', kamer: 'brandkast' },
  { nr: 6, vraag: 'Heeft je telefoon een pincode van zes cijfers of meer?', kamer: 'tweede-voordeur', kind: true },
  { nr: 7, vraag: 'Heb je het wachtwoord van je wifi-kastje ooit veranderd? Dat kastje heet een router.', kamer: 'tuinhek' },
  { nr: 8, vraag: 'Kun je nog in je accounts als je telefoon vandaag kwijtraakt?', kamer: 'sleutels' },
  { nr: 9, vraag: 'Heb je thuis een geheim woord afgesproken voor noodgevallen?', kamer: 'brievenbus', kind: true },
  { nr: 10, vraag: 'Weet je wie je belt als je bent opgelicht?', kamer: 'eigendomsakte' },
];

export const BANDEN = [
  { tot: 4, kop: 'Begin bij niveau 1', tekst: 'Begin bij niveau 1 in hoofdstuk 4. Dat kost één avond.', link: '/aan-de-slag#niveau-1' },
  { tot: 7, kop: 'De basis staat', tekst: 'De basis staat. Ga door naar niveau 2.', link: '/aan-de-slag#niveau-2' },
  { tot: 10, kop: 'Je huis zit goed op slot', tekst: 'Je huis zit goed op slot. Lees hoofdstuk 3 en help daarna iemand anders.', link: '/inbrekers-van-morgen' },
];

export function band(ja) {
  return BANDEN.find((b) => ja <= b.tot) ?? BANDEN[BANDEN.length - 1];
}
