/**
 * "Ik heb één avond": per stap van niveau 1 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-1.
 */
export const AVOND = {
  'mail-wachtwoord': {
    hoe: [
      'Open de instellingen van je e-mail (Gmail, Outlook, Proton, of die van je provider) en zoek "wachtwoord wijzigen".',
      'Kies vier of vijf willekeurige woorden achter elkaar, bijvoorbeeld "lantaarn koffie zebra dakpan". Lengte telt, rare tekens niet.',
      'Gebruik dit wachtwoord nergens anders. Schrijf het voorlopig op een papiertje; straks gaat het in je kluis.',
    ],
    gereedschap: [],
    klaar: 'De voordeur heeft een eigen sleutel. Wordt een webwinkel gehackt, dan past die sleutel niet meer op je mail.',
  },
  'mail-tweede-slot': {
    hoe: [
      'Ga in de instellingen van je e-mail naar "beveiliging" en zoek "tweestapsverificatie", "2FA" of "passkey".',
      'Is er een passkey? Kies die: je logt dan in met je vinger, gezicht of pincode van je toestel. Anders: kies "authenticator-app" en installeer Ente Auth, 2FAS of Aegis.',
      'Kies liever niet "code per sms": een telefoonnummer kan gestolen worden.',
      'Krijg je herstelcodes te zien? Schrijf ze op papier en bewaar ze thuis.',
    ],
    gereedschap: ['ente', '2fas', 'aegis'],
    klaar: 'Twee sloten op je belangrijkste deur. Wie alleen je wachtwoord heeft, staat nog steeds buiten.',
  },
  'wachtwoordmanager': {
    hoe: [
      'Installeer Bitwarden of Proton Pass: gratis, en ze werken op je telefoon én je computer.',
      'Verzin één hoofdwachtwoord van vijf woorden. Dit is de enige sleutel die je nog uit je hoofd hoeft te kennen.',
      'Zet de app ook in je browser (als extensie), zodat hij wachtwoorden voor je invult.',
      'Zet het nieuwe e-mailwachtwoord van stap 1 erin. De rest komt vanzelf, telkens als je ergens inlogt.',
    ],
    gereedschap: ['bitwarden', 'protonpass'],
    klaar: 'Je hebt een sleutelkluis. Vanaf nu verzint en onthoudt de kluis je sleutels.',
  },
  'updates': {
    hoe: [
      'Telefoon: Instellingen → Algemeen → Software-update (iPhone) of Instellingen → Systeem → Systeemupdate (Android). Zet "automatisch" aan.',
      'Computer: Systeeminstellingen → Algemeen → Software-update (Mac) of Instellingen → Windows Update. Zet automatisch bijwerken aan.',
      'Browser: die werkt zichzelf bij als je hem af en toe helemaal afsluit en opnieuw opent.',
      'Ook de apps: in de App Store of Play Store staat "apps automatisch bijwerken".',
    ],
    klaar: 'De timmerman komt nu vanzelf langs. Scheuren worden gedicht voordat iemand erdoor kruipt.',
  },
  'pincode': {
    hoe: [
      'iPhone: Instellingen → Face ID en toegangscode → Wijzig toegangscode → "Toegangscode-opties" → "Aangepaste numerieke code".',
      'Android: Instellingen → Beveiliging → Schermvergrendeling → Pincode.',
      'Kies zes cijfers of meer, en niet je geboortedatum of 123456.',
      'Laat het scherm na één minuut vanzelf op slot gaan.',
    ],
    klaar: 'Je telefoon is de sleutelbos van je hele huis. Die zit nu op slot.',
  },
  'geheim-woord': {
    hoe: [
      'Spreek vanavond aan tafel, of aan de telefoon, één woord af met je gezin of je ouders. Iets geks, dat nergens op internet staat.',
      'De afspraak: belt er iemand in paniek om geld of een code, dan vraag je eerst naar het woord.',
      'Zet het woord nergens in een bericht of app. Alleen in hoofden.',
    ],
    klaar: 'Een nagemaakte stem kent het woord niet. Dat is de enige beveiliging die AI niet kan omzeilen.',
  },
};
