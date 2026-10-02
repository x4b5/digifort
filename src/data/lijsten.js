/**
 * Alle afvinklijsten van de site. `tijd` in minuten waar de tekst dat noemt.
 * @typedef {{ id: string, stap: string, waarom: string, kamer: string, tijd?: number, gereedschap?: string[] }} LijstItem
 * @typedef {{ titel: string, items: LijstItem[], slot?: boolean }} Lijst
 * @type {Record<string, Lijst>}
 */
export const LIJSTEN = {
  'niveau-1': {
    titel: 'Niveau 1: de basis in één avond',
    slot: true,
    items: [
      { id: 'mail-wachtwoord', stap: 'Geef je e-mail een nieuw, lang wachtwoord', waarom: 'Met je e-mail zet je overal je wachtwoord terug, dus die deur gaat als eerste op slot', tijd: 5, kamer: 'voordeur' },
      { id: 'mail-tweede-slot', stap: 'Zet een tweede slot op je e-mail', waarom: 'Wie alleen je wachtwoord heeft, komt er dan nog steeds niet in', tijd: 20, kamer: 'tweede-slot', gereedschap: ['ente', '2fas', 'aegis'] },
      { id: 'wachtwoordmanager', stap: 'Installeer een wachtwoordmanager', waarom: 'Die maakt en onthoudt voortaan al je wachtwoorden voor je', tijd: 20, kamer: 'sleutelkluis', gereedschap: ['bitwarden', 'protonpass'] },
      { id: 'updates', stap: 'Zet updates op automatisch', waarom: 'Dan worden scheuren in je muren vanzelf gerepareerd', tijd: 10, kamer: 'onderhoud' },
      { id: 'pincode', stap: 'Geef je telefoon een pincode van zes cijfers of meer', waarom: 'Je telefoon is de sleutelbos van je hele huis', tijd: 2, kamer: 'tweede-voordeur' },
      { id: 'geheim-woord', stap: 'Spreek thuis een geheim woord af', waarom: 'Daarmee herken je een nagemaakte stem aan de telefoon', tijd: 5, kamer: 'brievenbus' },
    ],
  },
  'niveau-2': {
    titel: 'Niveau 2: goed op slot in een weekend',
    slot: true,
    items: [
      { id: 'accounts-wachtwoord', stap: 'Geef je belangrijkste accounts een nieuw wachtwoord', waarom: 'Dan opent een gestolen wachtwoord van één site niet ook je bank of DigiD', tijd: 60, kamer: 'sleutels' },
      { id: 'accounts-tweede-slot', stap: 'Zet op die accounts een tweede slot of een passkey', waarom: 'Overal waar je geld of je naam zit, horen twee sloten', tijd: 45, kamer: 'passkey', gereedschap: ['ente', '2fas'] },
      { id: 'whatsapp-pincode', stap: 'Zet in WhatsApp verificatie in twee stappen aan', waarom: 'Ontfutselt iemand je sms-code, dan komt hij er zonder jouw pincode nog niet in', tijd: 5, kamer: 'brievenbus' },
      { id: 'noodcodes', stap: 'Schrijf je herstelcodes op papier', waarom: 'Zo kom je toch binnen als je telefoon weg is', tijd: 15, kamer: 'sleutels' },
      { id: 'backup', stap: 'Maak twee reservekopieën: op internet en op een losse schijf', waarom: 'Gaat er iets kapot of op slot, dan heb je alles nog', tijd: 60, kamer: 'brandkast' },
      { id: 'router', stap: 'Geef je router een nieuw wachtwoord en werk hem bij', waarom: 'De router is het tuinhek: al je internet gaat erdoorheen', tijd: 20, kamer: 'tuinhek' },
      { id: 'versleuteling', stap: 'Maak je laptop onleesbaar voor een dief', waarom: 'Een gestolen laptop is dan alleen nog een stuk metaal', tijd: 10, kamer: 'tweede-voordeur' },
      { id: 'app-rechten', stap: 'Kijk welke apps bij je camera, microfoon en locatie mogen', waarom: 'Niet elke app hoeft door je ramen naar binnen te kijken', tijd: 10, kamer: 'ramen' },
      { id: 'ublock', stap: 'Zet uBlock Origin in je browser en ruim oude extensies op', waarom: 'Dat zijn gordijnen voor je ramen', tijd: 10, kamer: 'ramen', gereedschap: ['ublock', 'firefox'] },
      { id: 'sim-pincode', stap: 'Zet een pincode op je simkaart', waarom: 'Dat helpt tegen diefstal van je telefoonnummer', tijd: 5, kamer: 'brievenbus' },
    ],
  },
  'niveau-3': {
    titel: 'Niveau 3: voor wie verder wil',
    slot: true,
    items: [
      { id: 'hardwaresleutel', stap: 'Neem een echte sleutel als tweede slot', waarom: 'Dat is het sterkste tweede slot dat er is', kamer: 'passkey', gereedschap: ['yubikey'] },
      { id: 'alias', stap: 'Gebruik een apart e-mailadres per webwinkel', waarom: 'Lekt een winkel je adres, dan zet je alleen dat adres uit', kamer: 'brievenbus' },
      { id: 'gastnetwerk', stap: 'Zet je slimme apparaten op een gastnetwerk', waarom: 'Je camera, tv en deurbel staan dan los van je laptop en telefoon', kamer: 'kattenluik' },
      { id: 'vpn', stap: 'Gebruik een VPN op de wifi van een ander', waarom: 'Nuttig in de trein, in een hotel en in een café, thuis heb je er weinig aan', kamer: 'gang' },
      { id: 'opruiming', stap: 'Ruim oude accounts en koppelingen op', waarom: 'Wat er niet meer is, kan ook niet lekken', kamer: 'sleutels' },
      { id: 'profielen', stap: 'Maak in je browser een profiel voor werk en een voor thuis', waarom: 'Dan kijken werk en thuis niet bij elkaar naar binnen', kamer: 'ramen' },
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
