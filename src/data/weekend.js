/**
 * "Ik heb een weekend": per stap van niveau 2 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-2. De vorm staat uitgelegd in avond.js.
 * Menupaden verschillen per toestel en per versie; waar dat zo is, wijzen we de zoekbalk
 * van Instellingen aan in plaats van een pad.
 */
/** @type {Record<string, import('./avond.js').Uitleg>} */
export const WEEKEND = {
  'accounts-wachtwoord': {
    hoe: [
      'Maak eerst een lijstje op papier: je bank, DigiD, je webwinkels en je sociale media.',
      'Begin met je bank en DigiD. Log in en zoek in de instellingen naar "wachtwoord wijzigen".',
      'Laat je wachtwoordmanager een nieuw wachtwoord maken. In Bitwarden heet dat de generator.',
      'Bewaar het nieuwe wachtwoord in je kluis. Je hoeft het niet te onthouden.',
      'Zet een streep door het account op je lijstje. Ga dan naar het volgende.',
    ],
    gelukt: 'Log uit en weer in. Vult je kluis het nieuwe wachtwoord in en kom je binnen? Dan is dat account klaar.',
    lukNiet: [
      'Moe? Stop gerust en ga morgen verder. Elk account dat klaar is, telt.',
      'Kun je "wachtwoord wijzigen" niet vinden? Kijk bij "account", "profiel" of "beveiliging".',
      'Bewaart de kluis het wachtwoord niet vanzelf? Voeg het dan zelf toe in de app.',
    ],
    gereedschap: ['bitwarden', 'protonpass'],
    klaar: 'Elke deur heeft nu een eigen sleutel. Een lek bij één webwinkel opent verder niets.',
  },
  'accounts-tweede-slot': {
    hoe: [
      'Pak je lijstje van de vorige stap erbij.',
      'Log per account in. Zoek bij de beveiliging naar "tweestapsverificatie", "inloggen in twee stappen" of "passkey".',
      'Kan het met een passkey? Kies die. Je bevestigt dan met je vinger, je gezicht of je pincode.',
      'Anders: kies "authenticator-app". Scan de vierkante code met je code-app uit niveau 1.',
      'Voor DigiD gebruik je de DigiD-app. Voor je bank de app van je bank.',
      'Krijg je herstelcodes te zien? Leg ze apart. In stap 4 schrijf je ze op papier.',
    ],
    gelukt: 'Log uit en weer in. Vraagt het account na je wachtwoord om een code, je vinger of je gezicht? Dan zit het tweede slot erop.',
    lukNiet: [
      'Heeft een webwinkel geen tweede slot? Dan is een eigen, sterk wachtwoord uit je kluis genoeg. Ga door naar het volgende account.',
      'Werkt de code niet? Elke code werkt maar kort. Wacht op de volgende code in de app en typ die over.',
    ],
    gereedschap: ['ente', 'aegis', 'digid'],
    klaar: 'Overal waar je geld of je naam zit, zitten nu twee sloten.',
  },
  'whatsapp-pincode': {
    hoe: [],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open WhatsApp en tik rechtsonder op Instellingen.', 'Tik op Account en dan op Verificatie in twee stappen.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open WhatsApp en tik rechtsboven op de drie puntjes. Kies Instellingen.', 'Tik op Account en dan op Verificatie in twee stappen.'] },
    ],
    na: [
      'Tik op Aanzetten. Kies een pincode van zes cijfers die je nergens anders gebruikt.',
      'Vul ook je e-mailadres in. Dan kun je de pincode terugzetten als je hem vergeet.',
      'Schrijf de pincode op het papier van je noodpakket.',
    ],
    gelukt: 'Ga terug naar Verificatie in twee stappen. Zie je nu keuzes om de pincode te wijzigen of uit te zetten? Dan staat hij aan.',
    lukNiet: [
      'Zie je Verificatie in twee stappen niet? Werk WhatsApp eerst bij in de App Store of de Play Store.',
      'Pincode vergeten? Tik in WhatsApp op "Pincode vergeten". Je krijgt dan een mail op het adres dat je hebt ingevuld.',
    ],
    gereedschap: [],
    klaar: 'Ontfutselt iemand je sms-code, dan staat hij nog steeds voor een dichte deur.',
  },
  'noodcodes': {
    hoe: [
      'Pak een vel papier en een pen.',
      'Zoek bij je e-mail en bij je wachtwoordmanager in de beveiliging naar "herstelcodes" of "back-upcodes".',
      'Schrijf de codes met de hand over. Zet erbij bij welk account ze horen.',
      'Leg het papier thuis op een vaste, veilige plek: bij je noodpakket. Niet in je telefoon, en niet als foto.',
      'Elke code werkt één keer. Gebruik je er een, zet er dan een streep door.',
    ],
    gelukt: 'Je hebt een papier met codes voor je e-mail en je wachtwoordmanager. Bij elk rijtje staat bij welk account het hoort.',
    lukNiet: [
      'Weet je niet meer waar je oude codes zijn? Vaak kun je op dezelfde plek nieuwe codes maken. De oude werken dan niet meer.',
      'Wat er nog meer in je noodpakket hoort, staat in [Als er toch is ingebroken](/als-er-is-ingebroken).',
    ],
    gereedschap: [],
    klaar: 'Is je telefoon weg, dan kom je toch nog binnen in je eigen huis.',
  },
  'backup': {
    hoe: ['Je maakt twee kopieën: één op internet en één op een losse schijf.'],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open Instellingen en tik bovenaan op je naam.', 'Tik op iCloud en dan op iCloud-reservekopie.', 'Zet het schuifje aan.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open Instellingen en typ "back-up" in de zoekbalk.', 'Zet de back-up aan.'] },
      { naam: 'Op een Mac', stappen: ['Sluit een losse schijf aan.', 'Open Systeeminstellingen. Klik op Algemeen en dan op Time Machine.', 'Voeg je schijf toe als reservekopieschijf.'] },
      { naam: 'Op een Windows-computer', stappen: ['Sluit een losse schijf aan.', 'Typ "Bestandsgeschiedenis" in de zoekbalk van Start en open het.', 'Kies je schijf en zet Bestandsgeschiedenis aan.'] },
    ],
    na: [
      'Haal de schijf los als de kopie klaar is. Zo kan gijzelsoftware er niet bij.',
      'Sluit de schijf voortaan af en toe weer aan, bijvoorbeeld eens per maand.',
    ],
    gelukt: 'Zet één foto of bestand terug uit je reservekopie en open het. Lukt dat? Dan werkt je reservekopie echt.',
    lukNiet: [
      'Is er te weinig ruimte op internet? Dan kun je extra ruimte kopen. Of je zet alleen je foto\'s op de losse schijf.',
      'Ziet je computer de schijf niet? Probeer een andere aansluiting of een andere kabel.',
    ],
    gereedschap: [],
    klaar: 'Je brandkast staat buiten de deur. Gaat er iets kapot of op slot, dan heb je alles nog.',
  },
  'router': {
    hoe: [
      'Kijk op de sticker van je router. Daar staan vaak het adres om in te loggen en het wachtwoord. Sommige providers hebben er ook een app voor.',
      'Log in. Verander het beheerderswachtwoord: het wachtwoord om bij de instellingen te komen. Laat je wachtwoordmanager er een maken.',
      'Let op: dit is niet het wachtwoord van je wifi. Dat mag blijven zoals het is.',
      'Zoek "firmware" of "software bijwerken". Zet automatisch bijwerken aan. Kan dat niet? Werk hem nu met de hand bij.',
    ],
    gelukt: 'Log uit en weer in op de router, met het nieuwe wachtwoord. Staat automatisch bijwerken aan, of staat de nieuwste versie erop? Dan is het gelukt.',
    lukNiet: [
      'Kom je er niet uit? Bel je provider. Zij kunnen het meestal op afstand voor je doen.',
      'Heb je per ongeluk het wifi-wachtwoord veranderd? Dan verbind je je apparaten opnieuw, met het nieuwe wachtwoord. Geen ramp.',
    ],
    gereedschap: [],
    klaar: 'Het tuinhek zit op slot, en het slot wordt voortaan vanzelf vernieuwd.',
  },
  'versleuteling': {
    wat: 'Dit heet versleuteling. Alles op je laptop wordt dan onleesbaar zonder jouw wachtwoord.',
    hoe: [],
    toestellen: [
      { naam: 'Op een Mac', stappen: ['Open Systeeminstellingen en klik op Privacy en beveiliging.', 'Scrol naar FileVault en zet het aan.'] },
      { naam: 'Op een Windows-computer', stappen: ['Open Instellingen en klik op Privacy en beveiliging.', 'Klik op Apparaatversleuteling en zet het aan.', 'Staat Apparaatversleuteling er niet? Typ dan "BitLocker" in de zoekbalk van Start.'] },
    ],
    na: [
      'Krijg je een herstelsleutel te zien? Schrijf hem op papier en leg hem bij je noodpakket.',
      'Laat de laptop aan de stroom staan. Het versleutelen gaat vanzelf op de achtergrond.',
    ],
    gelukt: 'Kijk nog eens op dezelfde plek. Staat FileVault, Apparaatversleuteling of BitLocker aan? Dan is het gelukt.',
    lukNiet: [
      'Zie je op Windows geen Apparaatversleuteling en geen BitLocker? Dan kan jouw computer het misschien niet. Sla deze stap over en let extra goed op je laptop.',
      'Duurt het lang? Dat is normaal. Je kunt gewoon doorwerken.',
    ],
    gereedschap: [],
    klaar: 'Een gestolen laptop is nu alleen nog een stuk metaal.',
  },
  'app-rechten': {
    hoe: [],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open Instellingen en tik op Privacy en beveiliging.', 'Tik op Locatievoorzieningen. Kijk daarna ook bij Camera, Microfoon en Contacten.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open Instellingen. Tik op Beveiliging en privacy, dan op Privacy en dan op Rechtenbeheer. Heet het bij jouw merk anders? Typ dan "rechten" in de zoekbalk.', 'Tik op Locatie. Kijk daarna ook bij Camera, Microfoon en Contacten.'] },
    ],
    na: [
      'Je ziet per onderdeel welke apps erbij mogen. Heeft een app het niet nodig? Zet het uit. Een zaklamp-app hoeft niet bij je contacten.',
      'Twijfel je? Zet het uit. Vraagt de app er later om, dan kun je het alsnog toestaan.',
    ],
    gelukt: 'Bij Camera, Microfoon en Locatie staan alleen nog apps die het echt nodig hebben, zoals je kaart-app bij Locatie.',
    lukNiet: [
      'Werkt een app niet meer goed? Zet het recht dan weer aan. De app vraagt er vaak zelf om.',
      'Zie je bovenin een groen of oranje lampje? Dan gebruikt een app je camera of microfoon. Doe je zelf niets met de camera of microfoon? Kijk dan welke app het is.',
    ],
    gereedschap: [],
    klaar: 'Alleen wie je zelf binnenlaat, kijkt nog door je ramen.',
  },
  'ublock': {
    wat: 'uBlock Origin houdt advertenties en meekijkers tegen. Het is een extensie: een klein hulpprogramma in je browser.',
    hoe: [
      'Gebruik Firefox op je computer. Daar werkt de volledige uBlock Origin nog.',
      'Open in Firefox het menu rechtsboven, met de drie streepjes. Kies Add-ons en thema\'s.',
      'Zoek "uBlock Origin". Kies die van de maker Raymond Hill en voeg hem toe. Er bestaan namaakversies.',
      'Kijk in hetzelfde scherm welke andere extensies er staan. Ken je er een niet, of gebruik je hem niet? Verwijder hem.',
    ],
    gelukt: 'Rechtsboven in Firefox, of onder het puzzelstukje, staat nu het rode schildje van uBlock Origin.',
    lukNiet: [
      'Werkt een site niet goed meer? Klik op het schildje en zet uBlock voor die ene site uit met de grote aan-uitknop.',
      'Gebruik je liever Chrome? Daar werkt alleen de lichtere uBlock Origin Lite. Die is beter dan niets.',
    ],
    gereedschap: ['ublock', 'firefox'],
    klaar: 'Er hangen gordijnen voor je ramen. Veel meekijkers en nepadvertenties blijven nu buiten.',
  },
  'sim-pincode': {
    hoe: ['Zoek het plastic kaartje waar je simkaart ooit uit kwam. Daar staan de pincode en de pukcode op. Kwijt? Je provider kan ze je geven.'],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open Instellingen en typ "sim-pincode" in de zoekbalk.', 'Zet SIM-pincode aan en typ de pincode van het kaartje.', 'Verander de pincode daarna in een eigen code van vier cijfers.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open Instellingen en typ "sim" in de zoekbalk.', 'Kies de vergrendeling van je simkaart. Bij veel merken heet dat SIM-kaartvergrendeling.', 'Zet hem aan en typ de pincode van het kaartje.', 'Verander de pincode daarna in een eigen code van vier cijfers.'] },
    ],
    na: ['Schrijf de pincode en de pukcode op het papier van je noodpakket.'],
    gelukt: 'Zet je telefoon uit en weer aan. Vraagt hij eerst om de pincode van je simkaart? Dan is het gelukt.',
    lukNiet: [
      'Drie keer een foute pincode? Dan zit je simkaart op slot. Met de pukcode maak je hem weer open. Geen pukcode? Bel je provider vanaf een ander toestel.',
      'Heb je een e-sim? Dan is er geen kaartje. Vraag de pincode bij je provider.',
    ],
    gereedschap: [],
    klaar: 'Steelt iemand je telefoon, dan kan hij je simkaart niet zomaar in een ander toestel gebruiken.',
  },
};
