/**
 * "Ik wil verder": per stap van niveau 3 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-3. De vorm staat uitgelegd in avond.js.
 * Geen tijden: dit zijn klussen voor wie de basis heeft staan en er rustig de tijd voor neemt.
 */
/** @type {Record<string, import('./avond.js').Uitleg>} */
export const VERDER = {
  'hardwaresleutel': {
    wat: 'Een echte sleutel is een klein sleuteltje, zoals een YubiKey. Je steekt het in je computer of houdt het tegen je telefoon. Voor deze klus moet je iets kopen; de rest kan gratis.',
    hoe: [
      'Koop twee sleutels van hetzelfde soort, bijvoorbeeld twee YubiKeys. Kies er een die past op je telefoon en je computer.',
      'Ga bij je e-mail en je wachtwoordmanager naar de beveiliging. Zoek "beveiligingssleutel" of "passkey".',
      'Voeg de eerste sleutel toe. Daarna meteen de tweede, als reserve.',
      'Hang de ene aan je sleutelbos. Leg de andere bij je noodpakket.',
    ],
    gelukt: 'Log uit en weer in. Vraagt de site om je sleutel, en lukt het met allebei? Dan staan ze er goed op.',
    lukNiet: [
      'Kan een dienst niet met een sleutel? Houd daar dan je code-app of je passkey.',
      'Eén sleutel kwijt? Log in met de reserve en haal de kwijte sleutel weg uit je account. Koop daarna een nieuwe reserve.',
    ],
    gereedschap: ['yubikey'],
    klaar: 'Je hebt het sterkste slot dat er is. Zonder dat sleuteltje in de hand komt niemand erin, ook niet met je wachtwoord.',
  },
  'alias': {
    wat: 'Zo’n apart adres heet een alias. Het stuurt alles door naar je echte adres. Krijg je ineens rommel op één alias? Dan weet je welk bedrijf je gegevens heeft gelekt.',
    hoe: [
      'Kies een dienst voor aliassen: SimpleLogin (van Proton) of DuckDuckGo Email Protection. Heb je betaald iCloud+? Dan kan ook Verberg mijn e-mail van Apple.',
      'Maak een account en koppel je echte e-mailadres.',
      'Schrijf je je in bij een webwinkel of nieuwsbrief? Maak dan een nieuwe alias en gebruik die.',
      'Gebruik aliassen niet voor je bank of DigiD. Daar blijft je echte adres staan.',
    ],
    gelukt: 'Stuur een mail naar je nieuwe alias. Komt die aan in je gewone mailbox? Dan werkt het.',
    lukNiet: [
      'Komt de mail niet aan? Kijk in je map met ongewenste mail.',
      'Wil je een alias niet meer? Zet hem uit bij je aliasdienst. Mail naar dat adres komt dan niet meer aan.',
    ],
    gereedschap: [],
    klaar: 'Elke winkel kent je nu onder een andere naam. Lekt er een, dan zie je meteen welke, en zet je die alias uit.',
  },
  'gastnetwerk': {
    wat: 'Een gastnetwerk is een tweede wifi in je huis, met een eigen naam en een eigen wachtwoord.',
    hoe: [
      'Log in op je router, net als bij niveau 2. Het adres staat vaak op de sticker.',
      'Zoek "gastnetwerk" en zet het aan. Geef het een eigen naam en een eigen wachtwoord.',
      'Verbind je slimme apparaten opnieuw, maar nu met het gastnetwerk: je camera, je tv, je deurbel, je slimme lampen.',
      'Je laptop en je telefoon blijven op je gewone netwerk.',
    ],
    gelukt: 'Kijk op je tv of camera bij de wifi-instellingen. Staat daar de naam van je gastnetwerk? Dan is het gelukt.',
    lukNiet: [
      'Zie je geen gastnetwerk in je router? Dan kan jouw router het misschien niet. Vraag het je provider.',
      'Werkt iets niet meer, zoals een filmpje van je telefoon naar je tv sturen? Zet dat apparaat dan terug op je gewone netwerk.',
    ],
    gereedschap: [],
    klaar: 'Je slimme apparaten wonen nu in het tuinhuis. Wordt er een gekraakt, dan staat de inbreker nog niet in je huiskamer.',
  },
  'vpn': {
    wat: 'Een VPN is een app die een afgeschermde verbinding maakt tussen jou en het internet. Zie het als een overdekte gang naar buiten.',
    hoe: [
      'Installeer Proton VPN (gratis) of Mullvad (een paar euro per maand) op je telefoon en je laptop.',
      'Zet hem aan als je op de wifi van een ander zit: in de trein, in een hotel of in een café.',
      'Thuis hoeft hij niet aan. Daar is je eigen wifi al afgeschermd.',
    ],
    gelukt: 'In de app staat dat je verbonden bent.',
    lukNiet: [
      'Werkt een site niet met de VPN aan? Kies in de app een andere server, of zet de VPN even uit.',
      'Gebruik geen andere gratis VPN. Veel daarvan verdienen aan wat jij doet.',
    ],
    gereedschap: [],
    klaar: 'Onderweg loop je nu door een overdekte gang. Wie op dezelfde wifi zit, ziet niet waar je naartoe gaat.',
  },
  'opruiming': {
    hoe: [
      'Open je wachtwoordmanager en loop de lijst met accounts door. Gebruik je er een niet meer? Log in en zoek "account verwijderen".',
      'Log je ergens in met Google? Ga naar myaccount.google.com en dan naar Beveiliging. Kijk bij je verbindingen met apps en services. Haal weg wat je niet kent of niet gebruikt.',
      'Met Facebook: ga naar Instellingen en kijk bij Apps en websites.',
      'Kijk op je telefoon welke apps je al een jaar niet hebt geopend. Verwijder ze.',
      'Kijk op haveibeenpwned.com of je e-mailadres in een bekend datalek zit.',
    ],
    gelukt: 'Je lijst met accounts is korter. Bij Google en Facebook staan alleen nog diensten die je kent.',
    lukNiet: [
      'Weet je niet meer waar je een account hebt? Zoek in je mail naar "welkom" of "bevestig je account".',
      'Kun je een account niet verwijderen? Geef het dan een nieuw wachtwoord uit je kluis. En haal er weg wat je kunt weghalen.',
    ],
    gereedschap: ['hibp'],
    klaar: 'Oude deuren die je vergeten was, zijn dichtgemetseld. Wat er niet meer is, kan ook niet lekken.',
  },
  'profielen': {
    hoe: [],
    toestellen: [
      { naam: 'In Firefox', stappen: ['Typ about:profiles in de adresbalk.', 'Kies Nieuw profiel aanmaken.'] },
      { naam: 'In Chrome of Edge', stappen: ['Klik rechtsboven op het rondje met je foto of letter.', 'Kies Toevoegen.'] },
    ],
    na: ['Noem het ene profiel Werk en het andere Thuis. Log in elk profiel alleen in op wat daarbij hoort.'],
    gelukt: 'Je hebt twee browservensters, elk met een eigen profiel. In het ene ben je ingelogd voor je werk, in het andere niet.',
    lukNiet: ['Weet je niet meer welk profiel welk is? Geef ze elk een eigen kleur of thema.'],
    gereedschap: ['firefox'],
    klaar: 'Werk en thuis hebben elk hun eigen kamer. Ze kijken niet meer bij elkaar naar binnen.',
  },
};
