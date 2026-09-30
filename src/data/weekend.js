/**
 * "Ik heb een weekend": per stap van niveau 2 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-2. Menupaden verschillen per toestel en per
 * versie; waar dat zo is, wijzen we de zoekbalk van Instellingen aan in plaats van een pad.
 */
/** @type {Record<string, { hoe: string[], gereedschap: string[], klaar: string }>} */
export const WEEKEND = {
  'accounts-wachtwoord': {
    hoe: [
      'Maak eerst een lijstje: je bank, DigiD, je webwinkels en je sociale media.',
      'Log per account in en zoek bij de instellingen "wachtwoord wijzigen".',
      'Laat je wachtwoordmanager een nieuw wachtwoord maken en bewaren. Dat hoef je niet te onthouden: de kluis vult het straks voor je in.',
      'Begin met je bank en DigiD. Moe? Stop gerust en ga morgen verder. Elk account dat klaar is, telt.',
    ],
    gereedschap: ['bitwarden', 'protonpass'],
    klaar: 'Elke deur heeft nu een eigen sleutel. Een lek bij één webwinkel opent verder niets.',
  },
  'accounts-tweede-slot': {
    hoe: [
      'Ga per account naar de instellingen voor beveiliging en zoek "tweestapsverificatie", "inloggen in twee stappen" of "passkey".',
      'Kan het met een passkey? Kies die: je bevestigt dan met je vinger, gezicht of pincode.',
      'Anders: kies "authenticator-app" en scan de code met Ente Auth of Aegis. Die app zet je bij niveau 1 al op je telefoon.',
      'Voor DigiD gebruik je de DigiD-app. Voor je bank de app van je bank.',
      'Krijg je herstelcodes te zien? Leg ze apart voor de stap "herstelcodes op papier".',
    ],
    gereedschap: ['ente', 'aegis', 'digid'],
    klaar: 'Overal waar je geld of je naam zit, zitten nu twee sloten.',
  },
  'whatsapp-pincode': {
    hoe: [
      'Open WhatsApp en ga naar Instellingen, dan Account, dan Verificatie in twee stappen.',
      'Tik op Aanzetten en kies een pincode van zes cijfers die je nergens anders gebruikt.',
      'Vul ook je e-mailadres in. Dan kun je de pincode terugzetten als je hem vergeet.',
      'Schrijf de pincode op het papier van je noodpakket.',
    ],
    gereedschap: [],
    klaar: 'Ontfutselt iemand je sms-code, dan staat hij nog steeds voor een dichte deur.',
  },
  'noodcodes': {
    hoe: [
      'Zoek bij je e-mail en bij je wachtwoordmanager in de beveiligingsinstellingen naar "herstelcodes" of "back-upcodes".',
      'Schrijf ze met de hand op papier. Zet erbij bij welk account ze horen.',
      'Leg het papier thuis op een vaste, veilige plek: bij je noodpakket. Niet in je telefoon of in een foto.',
      'Elke code werkt één keer. Gebruik je er een, zet er dan een streep door.',
    ],
    gereedschap: [],
    klaar: 'Is je telefoon weg, dan kom je toch nog binnen in je eigen huis.',
  },
  'backup': {
    hoe: [
      'Op internet: zet de reservekopie van je telefoon aan. Op een iPhone is dat iCloud-reservekopie, op Android zoek je in Instellingen naar "back-up".',
      'Op een losse schijf: sluit een externe schijf aan. Op een Mac kies je Time Machine, op Windows Bestandsgeschiedenis. Zoek het op in de instellingen.',
      'Haal de schijf los als de kopie klaar is. Zo kan gijzelsoftware er niet bij.',
      'Test het één keer: zet één foto of bestand terug en kijk of het werkt.',
    ],
    gereedschap: [],
    klaar: 'Je brandkast staat buiten de deur. Gaat er iets kapot of op slot, dan heb je alles nog.',
  },
  'router': {
    hoe: [
      'Kijk op de sticker van je router. Daar staan vaak het adres om in te loggen en het wachtwoord. Sommige providers hebben er ook een app voor.',
      'Log in en verander het beheerderswachtwoord: het wachtwoord om bij de instellingen te komen. Laat je wachtwoordmanager er een maken.',
      'Zoek "firmware" of "software bijwerken" en zet automatisch bijwerken aan. Kan dat niet? Werk hem nu met de hand bij.',
      'Kom je er niet uit? Bel je provider. Zij kunnen het meestal op afstand voor je doen.',
    ],
    gereedschap: [],
    klaar: 'Het tuinhek zit op slot, en het slot wordt voortaan vanzelf vernieuwd.',
  },
  'versleuteling': {
    hoe: [
      'Mac: open Systeeminstellingen, dan Privacy en beveiliging, en zet FileVault aan.',
      'Windows: open Instellingen, dan Privacy en beveiliging, en zet Apparaatversleuteling aan. Staat dat er niet? Typ "BitLocker" in de zoekbalk.',
      'Je krijgt een herstelsleutel. Schrijf hem op papier en leg hem bij je noodpakket.',
      'Laat de laptop aan de stroom staan. Het versleutelen gaat vanzelf op de achtergrond.',
    ],
    gereedschap: [],
    klaar: 'Een gestolen laptop is nu alleen nog een stuk metaal.',
  },
  'app-rechten': {
    hoe: [
      'iPhone: open Instellingen, dan Privacy en beveiliging. Tik op Locatievoorzieningen, Camera, Microfoon en Contacten.',
      'Android: open Instellingen en typ "machtigingen" in de zoekbalk. Kies Machtigingsbeheer.',
      'Kijk per onderdeel welke apps erbij mogen. Heeft een app het niet nodig? Zet het uit. Een zaklamp-app hoeft niet bij je contacten.',
      'Twijfel je? Zet het uit. Vraagt de app er later om, dan kun je het alsnog toestaan.',
    ],
    gereedschap: [],
    klaar: 'Alleen wie je zelf binnenlaat, kijkt nog door je ramen.',
  },
  'ublock': {
    hoe: [
      'Gebruik Firefox. Daar werkt de volledige uBlock Origin nog. Open in Firefox het menu en kies Add-ons en thema\'s.',
      'Zoek "uBlock Origin", kies die van de maker Raymond Hill en klik op Toevoegen. Er bestaan namaakversies.',
      'Kijk in hetzelfde scherm welke andere extensies er staan. Ken je er een niet, of gebruik je hem niet? Verwijder hem.',
    ],
    gereedschap: ['ublock', 'firefox'],
    klaar: 'Er hangen gordijnen voor je ramen. Veel meekijkers en nepadvertenties blijven nu buiten.',
  },
  'sim-pincode': {
    hoe: [
      'Zoek het plastic kaartje waar je simkaart ooit uit kwam. Daar staan de huidige pincode en de pukcode op. Kwijt? Je provider kan ze je geven.',
      'Open Instellingen en typ "sim" in de zoekbalk. Kies SIM-pincode of SIM-kaartvergrendeling.',
      'Zet hem aan en verander de pincode in een eigen code van vier cijfers.',
      'Schrijf de pincode en de pukcode op het papier van je noodpakket. Drie keer fout? Dan heb je de pukcode nodig.',
    ],
    gereedschap: [],
    klaar: 'Steelt iemand je telefoon, dan kan hij je simkaart niet zomaar in een ander toestel gebruiken.',
  },
};
