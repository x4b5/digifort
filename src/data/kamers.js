/** De veertien plekken van het huis (hoofdstuk 1). `anker` is de kop-id op /plattegrond. */
export const KAMERS = [
  { id: 'voordeur', anker: 'de-voordeur-je-e-mail', naam: 'De voordeur', wat: 'je e-mail', zin: 'Je e-mail is de belangrijkste deur van je huis.' },
  { id: 'tweede-voordeur', anker: 'de-tweede-voordeur-het-account-van-je-telefoon-of-computer', naam: 'De tweede voordeur', wat: 'het account van je telefoon of computer', zin: 'Je Apple-, Google- of Microsoft-account is net zo belangrijk als je e-mail.' },
  { id: 'sleutels', anker: 'de-sleutels-wachtwoorden', naam: 'De sleutels', wat: 'wachtwoorden', zin: 'Elke deur hoort een eigen sleutel te hebben.' },
  { id: 'sleutelkluis', anker: 'de-sleutelkluis-de-wachtwoordmanager', naam: 'De sleutelkluis', wat: 'de wachtwoordmanager', zin: 'Een kluis onthoudt al je sleutels, zodat jij dat niet hoeft.' },
  { id: 'passkey', anker: 'de-sleutel-die-niemand-kan-namaken-de-passkey', naam: 'De sleutel die niemand kan namaken', wat: 'de passkey', zin: 'Een passkey is een tweede slot in één handeling: je toestel plus je vinger, gezicht of pincode.' },
  { id: 'tweede-slot', anker: 'het-tweede-slot-tweestapsverificatie', naam: 'Het tweede slot', wat: 'tweestapsverificatie', zin: 'Twee sloten op je deur zijn beter dan één.' },
  { id: 'ramen', anker: 'de-ramen-je-browser', naam: 'De ramen', wat: 'je browser', zin: 'Door een raam kijk je naar buiten, maar anderen kijken ook naar binnen.' },
  { id: 'brievenbus', anker: 'de-brievenbus-e-mail-sms-en-whatsapp', naam: 'De brievenbus', wat: 'e-mail, sms en WhatsApp', zin: 'Iedereen kan iets in je brievenbus stoppen, ook een oplichter.' },
  { id: 'tuinhek', anker: 'tuinhek-en-meterkast-router-en-wifi', naam: 'Tuinhek en meterkast', wat: 'router en wifi', zin: 'Alles wat je huis in en uit gaat, loopt door één kastje.' },
  { id: 'kattenluik', anker: 'de-kattenluikjes-slimme-apparaten', naam: 'De kattenluikjes', wat: 'slimme apparaten', zin: 'Elk apparaat met internet is een klein gat in je muur.' },
  { id: 'gang', anker: 'de-overdekte-gang-de-vpn', naam: 'De overdekte gang', wat: 'de VPN', zin: 'Een VPN zorgt dat niemand onderweg kan meekijken. Meer doet hij niet.' },
  { id: 'brandkast', anker: 'de-brandkast-buiten-de-deur-back-ups', naam: 'De brandkast buiten de deur', wat: 'back-ups', zin: 'Bewaar een kopie van je spullen op een andere plek.' },
  { id: 'onderhoud', anker: 'het-onderhoud-updates', naam: 'Het onderhoud', wat: 'updates', zin: 'Een update is de timmerman die scheuren dichtmaakt.' },
  { id: 'eigendomsakte', anker: 'de-eigendomsakte-je-identiteit', naam: 'De eigendomsakte', wat: 'je identiteit', zin: 'Wie jouw papieren heeft, kan doen alsof hij jou is.' },
];

export function kamer(id) {
  return KAMERS.find((k) => k.id === id);
}
