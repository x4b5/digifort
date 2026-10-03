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
 * - `keuzes`: (optioneel) waar het per maildienst of toestel anders gaat, de knoppen zelf.
 *   De lezer kiest zijn dienst en ziet alleen dat pad. Elke keuze heeft een eigen id, zodat
 *   de lijst bovenaan de plattegrond er rechtstreeks naartoe wijst ("Google-account").
 *   De menupaden komen uit avond.js (Ik heb één avond); waar we de knop niet zeker weten,
 *   wijzen we de zoekbalk van de site aan.
 */

/** Waar je bij je maildienst het wachtwoord en het tweede slot vindt. */
const MAILDIENSTEN = [
  { id: 'gmail', kop: 'Gmail (@gmail.com)', stappen: [
    'Ga in je browser naar myaccount.google.com en log in.',
    'Nieuw wachtwoord: typ "wachtwoord" in de zoekbalk bovenaan. Kies Wachtwoord.',
    'Tweede slot: typ "verificatie in twee stappen" in de zoekbalk. Zet het aan en kies de Authenticator-app.',
  ] },
  { id: 'outlook', kop: 'Outlook of Hotmail (@outlook.com, @hotmail.com, @live.nl)', stappen: [
    'Ga in je browser naar account.microsoft.com en log in. Kies Beveiliging.',
    'Nieuw wachtwoord: zoek daar naar het wijzigen van je wachtwoord.',
    'Tweede slot: zoek naar "tweestapsverificatie" en zet het aan. Wil Microsoft dat je zijn eigen app neemt? Dat hoeft niet. Kies de kleine link om een andere app te gebruiken.',
  ] },
  { id: 'icloud', kop: 'iCloud (@icloud.com, @me.com)', stappen: [
    'Open Instellingen op je iPhone. Tik bovenaan op je naam.',
    'Tik op Inloggen en beveiliging. Op een oudere iPhone heet dat Wachtwoord en beveiliging.',
    'Nieuw wachtwoord: tik op Wijzig wachtwoord.',
    'Tweede slot: staat twee-factor-authenticatie op Aan? Dan zit het er al op.',
  ] },
  { id: 'kpn', kop: 'KPN (@kpnmail.nl, @planet.nl, @hetnet.nl)', stappen: [
    'Open de browser op je telefoon of computer. Ga naar de site van KPN en log in op MijnKPN.',
    'Nieuw wachtwoord: zoek naar je e-mail en dan naar "wachtwoord wijzigen".',
    'Tweede slot: typ "tweestapsverificatie" in de zoekbalk van de site. Vind je niets? Dan kan het bij jouw mail nu niet. Dat is niet jouw fout. Je nieuwe wachtwoord beschermt je mail al.',
  ] },
  { id: 'ziggo', kop: 'Ziggo (@ziggo.nl, @home.nl, @upcmail.nl, @casema.nl)', stappen: [
    'Open de browser op je telefoon of computer. Ga naar de site van Ziggo en log in op Mijn Ziggo.',
    'Nieuw wachtwoord: zoek naar je e-mail en dan naar "wachtwoord wijzigen".',
    'Tweede slot: typ "tweestapsverificatie" in de zoekbalk van de site. Vind je niets? Dan kan het bij jouw mail nu niet. Dat is niet jouw fout. Je nieuwe wachtwoord beschermt je mail al.',
  ] },
];

/** Het account van je toestel: per soort toestel waar het tweede slot zit. */
const TOESTELACCOUNTS = [
  { id: 'google-account', kop: 'Google-account (Android, Samsung)', stappen: [
    'Ga in je browser naar myaccount.google.com en log in. Heb je Gmail? Dan is het hetzelfde account.',
    'Typ "verificatie in twee stappen" in de zoekbalk bovenaan. Zet het aan.',
  ] },
  { id: 'apple-account', kop: 'Apple-account (iPhone, Mac)', stappen: [
    'Open Instellingen op je iPhone. Tik bovenaan op je naam.',
    'Tik op Inloggen en beveiliging. Op een oudere iPhone heet dat Wachtwoord en beveiliging.',
    'Staat twee-factor-authenticatie op Aan? Dan zit het tweede slot erop.',
  ] },
  { id: 'microsoft-account', kop: 'Microsoft-account (Windows)', stappen: [
    'Ga in je browser naar account.microsoft.com en log in. Kies Beveiliging.',
    'Zoek naar "tweestapsverificatie" en zet het aan.',
  ] },
];

export const KAMERS = [
  { id: 'voordeur', anker: 'de-voordeur-je-e-mail', naam: 'De voordeur', wat: 'je e-mail', onderwerp: 'E-mail: Gmail, Outlook, iCloud, KPN, Ziggo',
    doe: 'Geef je e-mail een lang wachtwoord dat je nergens anders gebruikt. Zet er een tweede slot op.',
    zin: 'Je e-mail is de belangrijkste deur van je huis.',
    keuzeVraag: 'Welke maildienst heb je? Je ziet het aan het eind van je adres, na de @. Doe dit op de website, niet in de Mail-app.',
    keuzes: MAILDIENSTEN,
    keuzeNa: [
      'Gelukt? Dan zegt de site dat tweestapsverificatie aan staat.',
      'Vraagt de Mail-app op je telefoon daarna om je wachtwoord? Typ het nieuwe in. Dat is normaal.',
    ],
    stappen: ['mail-wachtwoord', 'mail-tweede-slot'] },
  { id: 'tweede-voordeur', anker: 'de-tweede-voordeur-het-account-van-je-telefoon-of-computer', naam: 'De tweede voordeur', wat: 'het account van je telefoon of computer', onderwerp: 'Google-, Apple- of Microsoft-account',
    doe: 'Het account van je telefoon of computer. Android en Samsung: Google. iPhone en Mac: Apple. Windows: Microsoft. Geef het een eigen wachtwoord en een tweede slot.',
    zin: 'Je Apple-, Google- of Microsoft-account is net zo belangrijk als je e-mail.',
    keuzeVraag: 'Welk toestel heb je?',
    keuzeNa: ['Gelukt? Dan zegt het scherm dat het tweede slot aan staat. De code laat je maken door een app, zoals bij je e-mail.'],
    keuzes: TOESTELACCOUNTS,
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
