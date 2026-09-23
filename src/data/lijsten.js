/** Alle afvinklijsten van de site. `tijd` in minuten waar de tekst dat noemt. */
export const LIJSTEN = {
  'niveau-1': {
    titel: 'Niveau 1: de basis in één avond',
    slot: true,
    items: [
      { id: 'mail-wachtwoord', stap: 'Geef je e-mail een nieuw en lang wachtwoord, dat je nergens anders gebruikt', waarom: 'De voordeur gaat als eerste op slot', tijd: 5, kamer: 'voordeur' },
      { id: 'mail-tweede-slot', stap: 'Zet een tweede slot op je e-mail', waarom: 'Twee sloten op je belangrijkste deur', tijd: 10, kamer: 'tweede-slot', gereedschap: ['ente', '2fas', 'aegis'] },
      { id: 'wachtwoordmanager', stap: 'Installeer een wachtwoordmanager', waarom: 'Vanaf nu maakt en onthoudt de kluis je sleutels', tijd: 20, kamer: 'sleutelkluis', gereedschap: ['bitwarden', 'protonpass'] },
      { id: 'updates', stap: 'Zet updates op automatisch, op je telefoon, je computer en in je browser', waarom: 'Scheuren worden vanzelf gerepareerd', tijd: 10, kamer: 'onderhoud' },
      { id: 'pincode', stap: 'Geef je telefoon een pincode van zes cijfers of meer', waarom: 'Je telefoon is de sleutelbos van je hele huis', tijd: 2, kamer: 'tweede-voordeur' },
      { id: 'geheim-woord', stap: 'Spreek thuis het geheime woord af', waarom: 'Dat helpt tegen een nagemaakte stem', tijd: 5, kamer: 'brievenbus' },
    ],
  },
  'niveau-2': {
    titel: 'Niveau 2: goed op slot in een weekend',
    slot: true,
    items: [
      { id: 'accounts-wachtwoord', stap: 'Geef je belangrijkste accounts een nieuw wachtwoord: je bank, DigiD, webwinkels en sociale media', waarom: 'Elke deur een eigen sleutel', tijd: 60, kamer: 'sleutels' },
      { id: 'accounts-tweede-slot', stap: 'Zet op al die accounts een tweede slot of een passkey', waarom: 'Twee sloten overal waar je geld of je naam zit', tijd: 45, kamer: 'passkey', gereedschap: ['ente', '2fas'] },
      { id: 'noodcodes', stap: 'Schrijf je herstelcodes op papier', waarom: 'Zo kom je binnen als je telefoon weg is', tijd: 15, kamer: 'sleutels' },
      { id: 'backup', stap: 'Maak twee reservekopieën: één op internet en één op een losse schijf', waarom: 'De brandkast buiten de deur', tijd: 60, kamer: 'brandkast' },
      { id: 'router', stap: 'Geef je router een nieuw wachtwoord en werk hem bij', waarom: 'Het tuinhek gaat op slot', tijd: 20, kamer: 'tuinhek' },
      { id: 'versleuteling', stap: 'Zet je laptop zo in dat alles erop onleesbaar is zonder jouw wachtwoord', waarom: 'Een gestolen laptop is dan alleen nog een stuk metaal', tijd: 10, kamer: 'tweede-voordeur' },
      { id: 'ublock', stap: 'Zet uBlock Origin in je browser en gooi extensies weg die je niet gebruikt', waarom: 'Gordijnen voor de ramen', tijd: 10, kamer: 'ramen', gereedschap: ['ublock', 'firefox'] },
      { id: 'sim-pincode', stap: 'Zet een pincode op je simkaart', waarom: 'Dat helpt tegen diefstal van je nummer', tijd: 5, kamer: 'brievenbus' },
    ],
  },
  'niveau-3': {
    titel: 'Niveau 3: voor wie verder wil',
    slot: true,
    items: [
      { id: 'hardwaresleutel', stap: 'Een echte sleutel', waarom: 'Een klein sleuteltje dat je in je computer steekt of tegen je telefoon houdt, zoals een YubiKey. Het is het sterkste tweede slot dat er is. Koop er twee: één aan je sleutelbos en één als reserve.', kamer: 'passkey', gereedschap: ['yubikey'] },
      { id: 'alias', stap: 'Een apart e-mailadres per dienst', waarom: 'Zo’n adres heet een alias. Het stuurt alles door naar je echte adres. Krijg je ineens rommel op één alias? Dan weet je welk bedrijf je gegevens heeft gelekt. Je zet die alias uit en bent ervan af.', kamer: 'brievenbus' },
      { id: 'gastnetwerk', stap: 'Een gastnetwerk voor slimme apparaten', waarom: 'Zet je camera, je tv en je deurbel op een eigen wifi-netwerk. Los van je laptop en je telefoon.', kamer: 'kattenluik' },
      { id: 'vpn', stap: 'Een VPN op wifi van een ander', waarom: 'Nuttig in de trein, in een hotel en in een café. Thuis heb je er weinig aan.', kamer: 'gang' },
      { id: 'opruiming', stap: 'De grote opruiming', waarom: 'Gooi oude accounts weg. Kijk welke apps nog bij je gegevens mogen. Log je ergens in met je Google- of Facebook-account? Kijk dan in dat account welke diensten eraan vastzitten, en haal weg wat je niet meer gebruikt.', kamer: 'sleutels' },
      { id: 'profielen', stap: 'Aparte profielen in je browser', waarom: 'Eén voor je werk en één voor thuis. Dan kijken ze niet bij elkaar naar binnen.', kamer: 'ramen' },
    ],
  },
  'noodpakket': {
    titel: 'Het noodpakket: op papier, op een veilige plek thuis',
    items: [
      { id: 'hoofdwachtwoord', stap: 'Het hoofdwachtwoord van je wachtwoordmanager' },
      { id: 'herstelcodes', stap: 'De herstelcodes van je e-mail en je belangrijkste accounts' },
      { id: 'sim-puk', stap: 'De pincode van je simkaart en de pukcode' },
      { id: 'banknummer', stap: 'Het noodnummer van je bank' },
      { id: 'vertrouwd', stap: 'Eén persoon die je vertrouwt weet waar het ligt' },
    ],
  },
  'onderhoudsbeurt': {
    titel: 'De onderhoudsbeurt: twee keer per jaar',
    items: [
      { id: 'backup-loopt', stap: 'Loopt je reservekopie nog? Zet één bestand terug om het te testen' },
      { id: 'noodcodes-kloppen', stap: 'Kloppen je herstelcodes nog?' },
      { id: 'geen-updates', stap: 'Welke apparaten krijgen geen updates meer?' },
      { id: 'datalek', stap: 'Staat je e-mailadres in een nieuw datalek? Kijk op haveibeenpwned.com', gereedschap: ['hibp'] },
    ],
  },
  'eerste-uur': {
    titel: 'Het eerste uur',
    items: [
      { id: 'bank', stap: 'Gaat het om geld? Bel direct je bank', waarom: 'Het noodnummer staat op je pas en in de app. Hoe sneller, hoe groter de kans dat een betaling wordt tegengehouden.' },
      { id: 'mail-wachtwoord', stap: 'Verander het wachtwoord van je e-mail, vanaf een apparaat dat je vertrouwt', waarom: 'Daarna dat van het getroffen account.' },
      { id: 'uitloggen', stap: 'Log overal uit', waarom: 'Bijna elke dienst heeft een knop "uitloggen op alle apparaten".' },
      { id: 'herstelgegevens', stap: 'Controleer je herstelgegevens', waarom: 'Staat er een onbekend telefoonnummer of e-mailadres bij je account? Haal het weg. Kijk in je mail ook naar doorstuurregels die je niet zelf hebt gemaakt.' },
      { id: 'contacten', stap: 'Waarschuw je contacten', waarom: 'Als er uit jouw naam berichten zijn verstuurd.' },
      { id: 'bewijs', stap: 'Bewaar bewijs', waarom: 'Maak schermafbeeldingen van berichten, nummers en rekeningnummers voordat je iets verwijdert.' },
    ],
  },
  'verlies': {
    titel: 'Telefoon of laptop kwijt: het stappenplan',
    items: [
      { id: 'vergrendel', stap: 'Zoek en vergrendel op afstand', waarom: 'iPhone en Mac: icloud.com/find. Android: google.com/android/find. Windows-laptop: account.microsoft.com/devices. Zet het apparaat in de verloren-modus en laat een telefoonnummer op het scherm zien.' },
      { id: 'sim', stap: 'Laat je simkaart blokkeren bij je provider', waarom: 'Zo kan niemand je sms-codes ontvangen of op jouw kosten bellen.' },
      { id: 'wachtwoorden', stap: 'Verander het wachtwoord van je e-mail', waarom: 'Daarna van je wachtwoordmanager en je Apple-, Google- of Microsoft-account.' },
      { id: 'uitloggen', stap: 'Log het apparaat overal uit', waarom: 'In je e-mail, WhatsApp, sociale media en je wachtwoordmanager kun je per apparaat de toegang intrekken.' },
      { id: 'bank', stap: 'Bel je bank als je bankapp of betaalpassen in je telefoon-wallet stonden', waarom: 'Laat de koppeling met dat toestel verwijderen.' },
      { id: 'wis', stap: 'Wis het apparaat op afstand', waarom: 'Als je het niet binnen een dag terug hebt, of meteen als je weet dat het gestolen is. Met een back-up verlies je niets.' },
      { id: 'aangifte', stap: 'Doe aangifte bij diefstal', waarom: 'Je hebt het IMEI-nummer (telefoon) of serienummer (laptop) nodig. De politie en je verzekeraar vragen erom.' },
      { id: 'werk', stap: 'Werkapparaat of werkgegevens erop? Meld het direct bij je werkgever', waarom: 'Als er persoonsgegevens van anderen op stonden, kan het een datalek zijn waarvoor de termijn van 72 uur geldt.' },
    ],
  },
  'vooraf': {
    titel: 'Wat je vooraf regelt, want achteraf kan het niet meer',
    items: [
      { id: 'zoek-mijn', stap: 'Zet Zoek mijn (Apple), Vind mijn apparaat (Google) of Mijn apparaat zoeken (Windows) aan' },
      { id: 'schijf', stap: 'Zet schijfversleuteling aan op je laptop: FileVault op Mac, BitLocker of Apparaatversleuteling op Windows', waarom: 'Zonder versleuteling kan iemand de schijf eruit halen en alles lezen, ook als je een wachtwoord op je account hebt.' },
      { id: 'pincode', stap: 'Gebruik een pincode van zes cijfers of meer en laat het scherm na korte tijd vanzelf vergrendelen' },
      { id: 'gestolen-apparaat', stap: 'Zet op iPhone Beveiliging van gestolen apparaten aan', waarom: 'Dan kan een dief die je pincode heeft afgekeken je Apple-wachtwoord niet zomaar wijzigen.' },
      { id: 'imei', stap: 'Noteer het IMEI- en serienummer en leg ze bij je noodpakket', waarom: 'Het IMEI-nummer vind je door *#06# te bellen.' },
      { id: 'backup', stap: 'Zorg dat je back-up loopt, zodat wissen op afstand geen moeilijke beslissing is' },
    ],
  },
};

/** De lijsten die samen "de sloten van je huis" zijn: niveau 1, 2 en 3. */
export const SLOT_LIJSTEN = Object.entries(LIJSTEN).filter(([, l]) => l.slot).map(([id]) => id);
export const TOTAAL_SLOTEN = SLOT_LIJSTEN.reduce((n, id) => n + LIJSTEN[id].items.length, 0);
