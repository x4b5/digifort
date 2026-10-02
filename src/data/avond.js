/**
 * "Ik heb één avond": per stap van niveau 1 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-1.
 *
 * Elke stap heeft dezelfde vorm, zodat de lezer weet waar hij moet kijken:
 * - `wat`: (optioneel) één korte uitleg vooraf, als het woord nieuw is
 * - `hoe`: wat iedereen doet, vóór de stappen per toestel
 * - `toestellen`: (optioneel) de stappen per toestel, waar iPhone, Android, Mac of Windows verschillen
 * - `na`: (optioneel) wat iedereen daarna doet
 * - `gelukt`: hoe je ziet dat het gelukt is: iets wat je zelf kunt nakijken
 * - `lukNiet`: wat je doet als het niet lukt
 * - `klaar`: de zin die je ziet als je de stap hebt afgevinkt
 * Een link schrijf je als [tekst](/pad). Menupaden verschillen per toestel en per versie;
 * waar we het pad niet zeker weten, wijzen we de zoekbalk van Instellingen aan.
 *
 * @typedef {{ naam: string, stappen: string[] }} Toestel
 * @typedef {{ wat?: string, hoe: string[], toestellen?: Toestel[], na?: string[], gelukt: string, lukNiet: string[], gereedschap?: string[], klaar: string }} Uitleg
 */

/** @type {Record<string, Uitleg>} */
export const AVOND = {
  'mail-wachtwoord': {
    hoe: [
      'Log in op je e-mail. Op een computer typ je het makkelijkst.',
      'Open de instellingen van je e-mail. Zoek naar "wachtwoord wijzigen".',
      'Bedenk een nieuw wachtwoord van vier of vijf gewone woorden, zoals "lantaarn koffie zebra dakpan". Lengte telt, rare tekens niet.',
      'Schrijf het op papier. In stap 3 zet je het in je wachtwoordmanager.',
      'Typ het nieuwe wachtwoord in en bevestig het.',
      'Gebruik dit wachtwoord nergens anders.',
    ],
    gelukt: 'Log uit en log weer in met het nieuwe wachtwoord. Kom je binnen? Dan is het gelukt.',
    lukNiet: [
      'Kun je "wachtwoord wijzigen" niet vinden? Kijk bij "account" of "beveiliging". Of zoek op de hulppagina van je e-maildienst.',
      'Weet je je oude wachtwoord niet meer? Kies op de inlogpagina "wachtwoord vergeten".',
      'Wil de dienst ook een cijfer of een teken? Zet er dan een tussen de woorden.',
    ],
    gereedschap: [],
    klaar: 'De voordeur heeft een eigen sleutel. Wordt een webwinkel gehackt, dan past die sleutel niet op je mail.',
  },
  'mail-tweede-slot': {
    wat: 'Een tweede slot betekent: na je wachtwoord vraagt je e-mail nog iets. Een code uit een app op je telefoon, of je vinger of je gezicht. Het heet ook tweestapsverificatie of 2FA.',
    hoe: ['Zet eerst een app voor codes op je telefoon.'],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open de App Store.', 'Zoek "Ente Auth" of "2FAS" en installeer de app.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open de Play Store.', 'Zoek "Ente Auth", "2FAS" of "Aegis" en installeer de app.'] },
    ],
    na: [
      'Ga naar de instellingen van je e-mail. Zoek bij "beveiliging" naar "tweestapsverificatie", "2FA" of "passkey".',
      'Kun je een passkey maken? Kies die. Je logt dan in met je vinger, je gezicht of de pincode van je toestel.',
      'Geen passkey? Kies dan "authenticator-app". Je ziet een vierkante code op het scherm.',
      'Kies in je code-app voor een account toevoegen. Scan de vierkante code met je telefoon.',
      'De app laat nu een code van zes cijfers zien. Typ die over bij je e-mail.',
      'Kies liever niet "code per sms". Een telefoonnummer kan gestolen worden.',
      'Krijg je herstelcodes te zien? Schrijf ze op papier en bewaar ze thuis.',
    ],
    gelukt: 'Log uit en weer in. Vraagt je e-mail na je wachtwoord om een code uit de app, of om je vinger of gezicht? Dan is het gelukt.',
    lukNiet: [
      'Werkt de code niet? Elke code werkt maar kort. Wacht op de volgende code in de app en typ die over.',
      'Heb je alleen een telefoon? Vaak staat onder de vierkante code een link om de code als tekst te kopiëren. Plak die in je code-app.',
      'Kun je het tweede slot niet vinden? Zoek op de hulppagina van je e-maildienst naar "tweestapsverificatie".',
      'Heeft je e-maildienst geen tweede slot? Dan is dat een goede reden om over te stappen, bijvoorbeeld naar Proton Mail. Dat hoeft niet vanavond.',
    ],
    gereedschap: ['ente', '2fas', 'aegis'],
    klaar: 'Twee sloten op je belangrijkste deur. Wie alleen je wachtwoord heeft, staat nog steeds buiten.',
  },
  'wachtwoordmanager': {
    wat: 'Een wachtwoordmanager is een kluis voor je wachtwoorden. Hij maakt voor elke site een sterk wachtwoord en vult het voor je in. Jij onthoudt er nog maar één: het hoofdwachtwoord.',
    hoe: [
      'Kies Bitwarden of Proton Pass. Ze zijn gratis en werken op je telefoon én je computer. De kluis die al in je iPhone of Android-telefoon zit, mag ook.',
      'Bedenk een hoofdwachtwoord van vijf gewone woorden. Schrijf het op papier en leg dat thuis op een veilige plek.',
    ],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Installeer Bitwarden of Proton Pass uit de App Store.', 'Open de app en maak een account met je hoofdwachtwoord.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Installeer Bitwarden of Proton Pass uit de Play Store.', 'Open de app en maak een account met je hoofdwachtwoord.'] },
      { naam: 'Op je computer', stappen: ['Ga naar de site van Bitwarden of Proton Pass en installeer de extensie voor je browser. Een extensie is een klein hulpprogramma in je browser.', 'Log in de extensie in met hetzelfde account.'] },
    ],
    na: [
      'Zet het nieuwe wachtwoord van je e-mail uit stap 1 in de kluis.',
      'De rest gaat vanzelf. Log je ergens in, dan vraagt de kluis of hij het wachtwoord moet bewaren. Kies dan ja.',
    ],
    gelukt: 'Open de app op je telefoon. Zie je daar het wachtwoord van je e-mail? Dan werkt je kluis.',
    lukNiet: [
      'Zie je het wachtwoord niet op je telefoon? Kijk of je overal met hetzelfde account bent ingelogd. Sluit de app en open hem opnieuw.',
      'Vult de kluis niets in op je computer? Kijk of de extensie in je browser staat en of je daarin bent ingelogd.',
      'Ben je je hoofdwachtwoord kwijt, dan kom je misschien niet meer in je kluis. Daarom staat het op papier.',
    ],
    gereedschap: ['bitwarden', 'protonpass'],
    klaar: 'Je hebt een sleutelkluis. Vanaf nu verzint en onthoudt de kluis je sleutels.',
  },
  'updates': {
    hoe: ['Doe dit op elk toestel dat je hebt.'],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open Instellingen en tik op Algemeen.', 'Tik op Software-update en dan op Automatische updates.', 'Zet de schuifjes aan.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open Instellingen en typ "update" in de zoekbalk bovenaan. Het menu heet bij elk merk net anders.', 'Kies de software-update en installeer wat klaarstaat.', 'Kun je automatisch downloaden aanzetten? Doe dat.'] },
      { naam: 'Apps op een iPhone', stappen: ['Open Instellingen en tik op App Store.', 'Zet App-updates aan.'] },
      { naam: 'Apps op een Android-telefoon', stappen: ['Open de Play Store. Tik rechtsboven op je profielfoto en dan op Instellingen.', 'Zet bij Netwerkvoorkeuren het automatisch updaten van apps aan.'] },
      { naam: 'Op een Mac', stappen: ['Open het Apple-menu linksboven en kies Systeeminstellingen.', 'Klik op Algemeen en dan op Software-update.', 'Zet bij Automatische updates alles aan.'] },
      { naam: 'Op een Windows-computer', stappen: ['Open Start en kies Instellingen.', 'Kies Windows Update.', 'Zoek naar updates en installeer wat klaarstaat.'] },
    ],
    na: ['Je browser werkt zichzelf bij. Sluit hem af en toe helemaal af en open hem opnieuw.'],
    gelukt: 'Kijk nog eens op dezelfde plek. Staat automatisch bijwerken aan, en staat er geen update meer klaar? Dan is het gelukt.',
    lukNiet: [
      'Wil een update niet installeren? Zet je toestel aan de lader en zorg voor wifi. Probeer het dan opnieuw.',
      'Is er al heel lang geen update gekomen? Misschien krijgt je toestel geen updates meer. Lees wat je dan doet in [Onderhoud en opruimen](/onderhoud).',
    ],
    klaar: 'De timmerman komt nu vanzelf langs. Scheuren worden gedicht voordat iemand erdoor kruipt.',
  },
  'pincode': {
    hoe: ['Bedenk een code van zes cijfers of meer. Niet je geboortedatum, en geen rijtje als 123456.'],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open Instellingen en tik op Face ID en toegangscode. Heeft je iPhone een ronde knop onder het scherm? Dan heet het Touch ID en toegangscode.', 'Tik op Wijzig toegangscode en typ je oude code.', 'Heb je nu vier cijfers? Tik dan op de opties voor de toegangscode en kies zes cijfers of meer.', 'Typ je nieuwe code twee keer.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open Instellingen en typ "schermvergrendeling" in de zoekbalk.', 'Kies de schermvergrendeling en dan Pincode.', 'Typ je nieuwe pincode twee keer.'] },
    ],
    na: ['Laat het scherm snel vanzelf op slot gaan, na één minuut of korter. Op een iPhone kies je dat bij Instellingen, Scherm en helderheid. Op Android typ je "time-out" in de zoekbalk van Instellingen.'],
    gelukt: 'Zet je telefoon uit en weer aan. Vraagt hij om je nieuwe code? Dan is het gelukt.',
    lukNiet: [
      'Kun je de keuze niet vinden? Typ in de zoekbalk van Instellingen "toegangscode" (iPhone) of "pincode" (Android).',
      'Ontgrendel je met je gezicht of je vinger? Dat mag gewoon. De pincode is het slot dat erachter zit.',
    ],
    klaar: 'Je telefoon is de sleutelbos van je hele huis. Die zit nu op slot.',
  },
  'geheim-woord': {
    hoe: [
      'Kies samen met je gezin of je ouders één woord. Iets geks, dat nergens op internet staat. Dus niet de naam van je huisdier.',
      'Spreek het af aan tafel of aan de telefoon. Zet het nergens in een bericht of app.',
      'De afspraak: belt iemand in paniek om geld of een code? Dan vraag je eerst naar het woord.',
      'Weet de beller het woord niet? Hang op en bel zelf terug, naar het nummer dat je al had.',
    ],
    gelukt: 'Vraag het over een paar dagen aan iemand van je gezin. Weet die het woord nog? Dan staat het.',
    lukNiet: [
      'Woont je familie ver weg? Spreek het woord af aan de telefoon of in een videogesprek. Typ het niet.',
      'Vindt iemand het overdreven? Leg uit dat een stem nagemaakt kan worden. Hulp bij dat gesprek staat in [Voor de mensen om je heen](/voor-de-mensen-om-je-heen).',
    ],
    klaar: 'Een nagemaakte stem kent het woord niet. Zo hoor je het verschil, ook als de stem echt klinkt.',
  },
};
