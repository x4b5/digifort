/** De veertien plekken van het huis (hoofdstuk 1), met hun anker op /plattegrond. */
export const KAMERS = [
  { id: 'voordeur', naam: 'De voordeur', wat: 'je e-mail', zin: 'Je e-mail is de belangrijkste deur van je huis.' },
  { id: 'tweede-voordeur', naam: 'De tweede voordeur', wat: 'het account van je telefoon of computer', zin: 'Je Apple-, Google- of Microsoft-account is net zo belangrijk als je e-mail.' },
  { id: 'sleutels', naam: 'De sleutels', wat: 'wachtwoorden', zin: 'Elke deur hoort een eigen sleutel te hebben.' },
  { id: 'sleutelkluis', naam: 'De sleutelkluis', wat: 'de wachtwoordmanager', zin: 'Een kluis onthoudt al je sleutels, zodat jij dat niet hoeft.' },
  { id: 'passkey', naam: 'De sleutel die niemand kan namaken', wat: 'de passkey', zin: 'Met een passkey log je in met je vinger of je gezicht, zonder wachtwoord.' },
  { id: 'tweede-slot', naam: 'Het tweede slot', wat: 'tweestapsverificatie', zin: 'Twee sloten op je deur zijn beter dan één.' },
  { id: 'ramen', naam: 'De ramen', wat: 'je browser', zin: 'Door een raam kijk je naar buiten, maar anderen kijken ook naar binnen.' },
  { id: 'brievenbus', naam: 'De brievenbus', wat: 'e-mail, sms en WhatsApp', zin: 'Iedereen kan iets in je brievenbus stoppen, ook een oplichter.' },
  { id: 'tuinhek', naam: 'Tuinhek en meterkast', wat: 'router en wifi', zin: 'Alles wat je huis in en uit gaat, loopt door één kastje.' },
  { id: 'kattenluik', naam: 'De kattenluikjes', wat: 'slimme apparaten', zin: 'Elk apparaat met internet is een klein gat in je muur.' },
  { id: 'gang', naam: 'De overdekte gang', wat: 'de VPN', zin: 'Een VPN zorgt dat niemand onderweg kan meekijken. Meer doet hij niet.' },
  { id: 'brandkast', naam: 'De brandkast buiten de deur', wat: 'back-ups', zin: 'Bewaar een kopie van je spullen op een andere plek.' },
  { id: 'onderhoud', naam: 'Het onderhoud', wat: 'updates', zin: 'Een update is de timmerman die scheuren dichtmaakt.' },
  { id: 'eigendomsakte', naam: 'De eigendomsakte', wat: 'je identiteit', zin: 'Wie jouw papieren heeft, kan doen alsof hij jou is.' },
];

export function kamer(id) {
  return KAMERS.find((k) => k.id === id);
}
