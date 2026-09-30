/**
 * "Ik wil verder": per stap van niveau 3 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-3. Geen tijden: dit zijn klussen voor wie
 * de basis heeft staan en er rustig de tijd voor neemt.
 */
/** @type {Record<string, { hoe: string[], gereedschap: string[], klaar: string }>} */
export const VERDER = {
  'hardwaresleutel': {
    hoe: [
      'Koop twee sleutels van hetzelfde soort, bijvoorbeeld twee YubiKeys. Kies er een die past op je telefoon en je computer.',
      'Ga bij je e-mail en je wachtwoordmanager naar de beveiligingsinstellingen en zoek "beveiligingssleutel" of "passkey".',
      'Voeg de eerste sleutel toe. Daarna meteen de tweede, als reserve.',
      'Hang de ene aan je sleutelbos. Leg de andere bij je noodpakket.',
    ],
    gereedschap: ['yubikey'],
    klaar: 'Je hebt het sterkste slot dat er is. Zonder dat sleuteltje in de hand komt niemand erin, ook niet met je wachtwoord.',
  },
  'alias': {
    hoe: [
      'Kies een dienst voor aliassen: SimpleLogin (van Proton) of DuckDuckGo Email Protection. Heb je betaald iCloud+, dan kan ook Verberg mijn e-mail van Apple.',
      'Maak een account en koppel je echte e-mailadres.',
      'Schrijf je je in bij een webwinkel of nieuwsbrief? Maak dan een nieuwe alias en gebruik die.',
      'Gebruik aliassen niet voor je bank of DigiD. Daar blijft je echte adres staan.',
    ],
    gereedschap: [],
    klaar: 'Elke winkel kent je nu onder een andere naam. Lekt er een, dan zie je meteen welke, en zet je die alias uit.',
  },
  'gastnetwerk': {
    hoe: [
      'Log in op je router, net als bij niveau 2. Het adres staat vaak op de sticker.',
      'Zoek "gastnetwerk" en zet het aan. Geef het een eigen naam en een eigen wachtwoord.',
      'Verbind je slimme apparaten opnieuw, maar nu met het gastnetwerk: je camera, je tv, je deurbel, je slimme lampen.',
      'Je laptop en je telefoon blijven op je gewone netwerk.',
    ],
    gereedschap: [],
    klaar: 'Je slimme apparaten wonen nu in het tuinhuis. Wordt er een gekraakt, dan staat de inbreker nog niet in je huiskamer.',
  },
  'vpn': {
    hoe: [
      'Installeer Proton VPN (gratis) of Mullvad (een paar euro per maand) op je telefoon en je laptop.',
      'Zet hem aan als je op de wifi van een ander zit: in de trein, in een hotel of in een café.',
      'Thuis hoeft hij niet aan. Daar is je eigen wifi al afgeschermd.',
      'Gebruik geen andere gratis VPN. Veel daarvan verdienen aan wat jij doet.',
    ],
    gereedschap: [],
    klaar: 'Onderweg loop je nu door een overdekte gang. Wie op dezelfde wifi zit, ziet niet waar je naartoe gaat.',
  },
  'opruiming': {
    hoe: [
      'Open je wachtwoordmanager en loop de lijst met accounts door. Gebruik je er een niet meer? Log in en zoek "account verwijderen".',
      'Log je ergens in met Google? Ga naar myaccount.google.com, dan Beveiliging, en kijk bij je verbindingen met apps en services. Haal weg wat je niet kent of niet gebruikt.',
      'Met Facebook: ga naar Instellingen en kijk bij Apps en websites.',
      'Kijk op je telefoon ook welke apps je al een jaar niet hebt geopend. Verwijder ze.',
    ],
    gereedschap: ['hibp'],
    klaar: 'Oude deuren die je vergeten was, zijn dichtgemetseld. Wat er niet meer is, kan ook niet lekken.',
  },
  'profielen': {
    hoe: [
      'Firefox: typ about:profiles in de adresbalk en kies Nieuw profiel aanmaken.',
      'Chrome of Edge: klik rechtsboven op het rondje met je foto of letter en kies Toevoegen.',
      'Noem het ene profiel Werk en het andere Thuis. Log in elk profiel alleen in op wat daarbij hoort.',
    ],
    gereedschap: ['firefox'],
    klaar: 'Werk en thuis hebben elk hun eigen kamer. Ze kijken niet meer bij elkaar naar binnen.',
  },
};
