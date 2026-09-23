/**
 * De acht treden van de ladder, van zwak naar sterk.
 * `soort`: 'weten' (iets wat je weet, zoals een wachtwoord) of 'hebben' (iets wat je hebt).
 * Eén bron voor de tredepagina, de trede-check en de inhoudsopgave.
 */
export const TREDES = [
  { nr: 1, titel: 'Eén wachtwoord voor alles', soort: 'weten' },
  { nr: 2, titel: 'Een ander wachtwoord per site', soort: 'weten' },
  { nr: 3, titel: 'Een wachtwoordmanager', soort: 'weten' },
  { nr: 4, titel: 'Een code per sms', soort: 'weten' },
  { nr: 5, titel: 'Een code uit een app', soort: 'weten' },
  { nr: 6, titel: 'Een passkey', soort: 'hebben' },
  { nr: 7, titel: 'Een sleutel in je hand', soort: 'hebben' },
  { nr: 8, titel: 'Twee sleutels en een papiertje', soort: 'hebben' },
];

export function trede(nr) {
  return TREDES.find((t) => t.nr === Number(nr));
}

/** De treden als kopjes voor de inhoudsopgave van de ladderpagina. */
export function tredeKoppen() {
  return TREDES.map((t) => ({ slug: `trede-${t.nr}`, text: `${t.nr}. ${t.titel}` }));
}
