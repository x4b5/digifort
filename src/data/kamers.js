/**
 * De veertien plekken van het huis (de plattegrond). `anker` is de id op /plattegrond.
 *
 * - `naam` en `wat`: het beeld en wat het is ("De voordeur", "je e-mail"). Het fort,
 *   het woordenboek en de huischeck gebruiken die.
 * - `onderwerp`: de kop op de plattegrond. Het woord waar een lezer naar zoekt staat
 *   vooraan ("Wifi en router"), met de namen die hij kent (Gmail, Google, Chrome).
 *   Het beeld ("het tuinhek") staat er klein onder.
 * - `doe`: het antwoord, in één of twee zinnen. Dat zie je al als de plek dicht is.
 * - `zin`: waarom het ertoe doet, in één zin.
 * - `stappen`: waar je het stap voor stap doet (ids uit niveau 1, 2 en 3 in lijsten.js).
 */
export const KAMERS = [
  { id: 'voordeur', anker: 'de-voordeur-je-e-mail', naam: 'De voordeur', wat: 'je e-mail', onderwerp: 'E-mail: Gmail, Outlook, iCloud, KPN, Ziggo',
    doe: 'Geef je e-mail een lang wachtwoord dat je nergens anders gebruikt. Zet er een tweede slot op.',
    zin: 'Je e-mail is de belangrijkste deur van je huis.',
    stappen: ['mail-wachtwoord', 'mail-tweede-slot'] },
  { id: 'tweede-voordeur', anker: 'de-tweede-voordeur-het-account-van-je-telefoon-of-computer', naam: 'De tweede voordeur', wat: 'het account van je telefoon of computer', onderwerp: 'Google-, Apple- of Microsoft-account',
    doe: 'Het account van je telefoon of computer. Android en Samsung: Google. iPhone en Mac: Apple. Windows: Microsoft. Geef het een eigen wachtwoord en een tweede slot.',
    zin: 'Je Apple-, Google- of Microsoft-account is net zo belangrijk als je e-mail.',
    stappen: ['pincode', 'accounts-tweede-slot', 'versleuteling'] },
  { id: 'sleutels', anker: 'de-sleutels-wachtwoorden', naam: 'De sleutels', wat: 'wachtwoorden', onderwerp: 'Wachtwoorden',
    doe: 'Gebruik voor elk account een ander wachtwoord. Maak het lang: vier gewone woorden achter elkaar.',
    zin: 'Elke deur hoort een eigen sleutel te hebben.',
    stappen: ['accounts-wachtwoord', 'noodcodes'] },
  { id: 'sleutelkluis', anker: 'de-sleutelkluis-de-wachtwoordmanager', naam: 'De sleutelkluis', wat: 'de wachtwoordmanager', onderwerp: 'Wachtwoordmanager',
    doe: 'Neem een wachtwoordmanager. Dan onthoud je nog maar één wachtwoord: de code van de kluis.',
    zin: 'Een kluis onthoudt al je sleutels, zodat jij dat niet hoeft.',
    stappen: ['wachtwoordmanager'] },
  { id: 'passkey', anker: 'de-sleutel-die-niemand-kan-namaken-de-passkey', naam: 'De sleutel die niemand kan namaken', wat: 'de passkey', onderwerp: 'Passkey: inloggen zonder wachtwoord',
    doe: 'Biedt een site of app je een passkey aan? Zeg dan ja.',
    zin: 'Een passkey is een tweede slot in één handeling: je toestel plus je vinger, gezicht of pincode.',
    stappen: ['accounts-tweede-slot', 'hardwaresleutel'] },
  { id: 'tweede-slot', anker: 'het-tweede-slot-tweestapsverificatie', naam: 'Het tweede slot', wat: 'tweestapsverificatie', onderwerp: 'Tweestapsverificatie (2FA)',
    doe: 'Zet tweestapsverificatie aan op je e-mail. Laat de code door een app maken, niet per sms.',
    zin: 'Twee sloten op je deur zijn beter dan één.',
    stappen: ['mail-tweede-slot', 'accounts-tweede-slot', 'noodcodes'] },
  { id: 'ramen', anker: 'de-ramen-je-browser', naam: 'De ramen', wat: 'je browser', onderwerp: 'Browser: Chrome, Safari, Firefox',
    doe: 'Kijk welke extensies in je browser zitten. Gooi weg wat je niet kent of niet gebruikt.',
    zin: 'Door een raam kijk je naar buiten, maar anderen kijken ook naar binnen.',
    stappen: ['ublock', 'app-rechten', 'profielen'] },
  { id: 'brievenbus', anker: 'de-brievenbus-e-mail-sms-en-whatsapp', naam: 'De brievenbus', wat: 'e-mail, sms en WhatsApp', onderwerp: 'Berichten: e-mail, sms en WhatsApp',
    doe: 'Stuur nooit een code door die je krijgt. Ook niet als een bekende erom vraagt.',
    zin: 'Iedereen kan iets in je brievenbus stoppen, ook een oplichter.',
    stappen: ['whatsapp-pincode', 'sim-pincode', 'geheim-woord'] },
  { id: 'tuinhek', anker: 'tuinhek-en-meterkast-router-en-wifi', naam: 'Tuinhek en meterkast', wat: 'router en wifi', onderwerp: 'Wifi en router',
    doe: 'Staat er nog een wachtwoord uit de fabriek op je router? Verander het.',
    zin: 'Alles wat je huis in en uit gaat, loopt door één kastje.',
    stappen: ['router'] },
  { id: 'kattenluik', anker: 'de-kattenluikjes-slimme-apparaten', naam: 'De kattenluikjes', wat: 'slimme apparaten', onderwerp: 'Slimme apparaten: camera, tv, deurbel',
    doe: 'Zet slimme apparaten, zoals een camera of tv, op een eigen gastnetwerk.',
    zin: 'Elk apparaat met internet is een klein gat in je muur.',
    stappen: ['gastnetwerk'] },
  { id: 'gang', anker: 'de-overdekte-gang-de-vpn', naam: 'De overdekte gang', wat: 'de VPN', onderwerp: 'VPN',
    doe: 'Doe eerst de andere plekken. Een VPN is alleen nuttig op wifi van een ander, zoals in een hotel.',
    zin: 'Een VPN zorgt dat niemand onderweg kan meekijken. Meer doet hij niet.',
    stappen: ['vpn'] },
  { id: 'brandkast', anker: 'de-brandkast-buiten-de-deur-back-ups', naam: 'De brandkast buiten de deur', wat: 'back-ups', onderwerp: 'Back-ups',
    doe: 'Maak een reservekopie van je foto’s en bestanden. Bewaar er één los van je computer.',
    zin: 'Bewaar een kopie van je spullen op een andere plek.',
    stappen: ['backup'] },
  { id: 'onderhoud', anker: 'het-onderhoud-updates', naam: 'Het onderhoud', wat: 'updates', onderwerp: 'Updates',
    doe: 'Zet updates op automatisch, op je telefoon en op je computer.',
    zin: 'Een update is de timmerman die scheuren dichtmaakt.',
    stappen: ['updates'] },
  { id: 'eigendomsakte', anker: 'de-eigendomsakte-je-identiteit', naam: 'De eigendomsakte', wat: 'je identiteit', onderwerp: 'Paspoort, BSN en DigiD',
    doe: 'Vraagt iemand een kopie van je paspoort? Vraag eerst of het echt moet. Moet het, gebruik dan de KopieID-app.',
    zin: 'Wie jouw papieren heeft, kan doen alsof hij jou is.',
    stappen: [] },
];

export function kamer(id) {
  return KAMERS.find((k) => k.id === id);
}
