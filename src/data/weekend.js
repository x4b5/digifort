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
      'Maak een lijstje op papier van je accounts met een wachtwoord. Begin met DigiD. Dan je webwinkels, je sociale media, je energie en je verzekering.',
      'Neem één account tegelijk. Heb je een computer? Doe het daar: kopiëren en plakken gaat daar het makkelijkst.',
    ],
    toestellen: [
      { naam: 'Op je computer', stappen: [
        'Ga naar de site en log in. Staat het account al in je kluis? Klik rechtsboven in je browser op het puzzelstukje, dan op Bitwarden, en kies het account.',
        'Weet je het oude wachtwoord niet meer? Kies op de site "wachtwoord vergeten". Klik op de link in de mail die je krijgt. Je ziet dan het vak voor een nieuw wachtwoord.',
        'Anders: zoek op de site in de instellingen naar "wachtwoord wijzigen".',
        'Klik op het puzzelstukje en dan op Bitwarden. Kies Generator. Klik op de knop om het wachtwoord te kopiëren.',
        'Klik op de site in het vak voor het nieuwe wachtwoord. Plak met Ctrl en V (Windows) of Cmd en V (Mac). Moet het twee keer? Plak nog een keer.',
        'Sla het op. Vraagt Bitwarden of hij het moet bewaren of bijwerken? Kies ja.',
      ] },
      { naam: 'Op je telefoon', stappen: [
        'Log in op de site of in de app. Oude wachtwoord kwijt? Kies "wachtwoord vergeten" en volg de mail.',
        'Zoek in de instellingen naar "wachtwoord wijzigen".',
        'Open Bitwarden en tik onderaan op Generator. Tik op de knop om het wachtwoord te kopiëren.',
        'Ga terug. Houd je vinger in het vak voor het nieuwe wachtwoord en kies Plak of Plakken.',
        'Sla het op. Vraagt Bitwarden of hij het moet bewaren? Kies ja.',
      ] },
    ],
    na: ['Zet een streep door het account op je lijstje. Ga dan naar het volgende.'],
    uitklap: [
      {
        vraag: 'Mijn bank laat me inloggen met een app of een pasje',
        antwoord: ['Dan heb je bij de bank geen wachtwoord om te veranderen. Sla de bank over. Je bankapp en je pasje zijn al een goed slot.'],
      },
      {
        vraag: 'Waar verander ik mijn wachtwoord van DigiD?',
        antwoord: ['Ga naar mijn.digid.nl en log in. Zoek bij je gegevens naar "wachtwoord wijzigen".'],
      },
      {
        vraag: 'Bitwarden heeft het nieuwe wachtwoord niet bewaard',
        antwoord: [
          'Het wachtwoord is niet weg. Open in Bitwarden de Generator en zoek de geschiedenis. Kopieer het nieuwste wachtwoord.',
          'Stond het account al in je kluis? Open het en kies om het te bewerken. Plak het nieuwe wachtwoord en sla op.',
          'Stond het account nog niet in je kluis? Open Bitwarden: op de computer via het puzzelstukje. Klik of tik op het plusteken (+) of op Nieuw. Kies Login.',
          'Vul de naam van de site in, je gebruikersnaam of e-mailadres, en plak het wachtwoord. Klik op Opslaan.',
        ],
      },
    ],
    gelukt: 'Log uit en weer in. Laat Bitwarden het wachtwoord invullen. Kom je binnen? Dan is dat account klaar.',
    lukNiet: [
      'Moe? Stop gerust en ga morgen verder. Elk account dat klaar is, telt.',
      'Kun je "wachtwoord wijzigen" niet vinden? Kijk bij "account", "profiel" of "beveiliging".',
      'Bewaart Bitwarden het wachtwoord niet? Open hierboven "Bitwarden heeft het nieuwe wachtwoord niet bewaard".',
    ],
    gereedschap: ['bitwarden', 'protonpass'],
    klaar: 'Elke deur heeft nu een eigen sleutel. Een lek bij één webwinkel opent verder niets.',
  },
  'accounts-tweede-slot': {
    hoe: [
      'Pak je lijstje erbij. Begin met DigiD. Open hieronder de twee delen over de DigiD-app.',
      'Doe daarna nog één ander account. De rest mag een andere dag: elke site heeft andere schermen.',
      'Log in op de site en zoek de beveiliging. Lukt dat niet? Open hieronder "Waar vind ik de beveiliging van een site?".',
      'Zoek daar naar "tweestapsverificatie", "inloggen in twee stappen" of "passkey".',
      'Kan het met een passkey? Kies die. Je bevestigt met je vinger, je gezicht of je pincode. Vraagt je toestel waar de passkey moet? Open hieronder "Waar bewaar ik een passkey?".',
      'Geen passkey? Kies "authenticator-app" en scan de vierkante code met Ente Auth, net als bij je e-mail in [niveau 1](/een-avond#stap-mail-tweede-slot).',
      'Voor je bank gebruik je de app van je bank. Die heb je meestal al.',
      'Krijg je herstelcodes te zien? Schrijf ze op en stop ze in je envelop.',
    ],
    uitklap: [
      { vraag: 'DigiD-app, deel 1: installeren en een pincode kiezen', antwoord: [
        'Met de DigiD-app log je in bij de overheid zonder sms-code. Het kost ongeveer een kwartier. Heb je nog geen DigiD? Vraag die eerst aan op digid.nl.',
        'Ga op je telefoon naar digid.nl/digid-app. Tik op de knop naar de App Store of de Play Store. Zo krijg je zeker de echte app.',
        'Installeer de app DigiD en open hem. Kies om hem te activeren. Dat betekent: DigiD laten weten dat de app van jou is.',
        'Vraagt de app je gebruikersnaam en wachtwoord van DigiD? Ze staan in je kluis.',
        'Kies een pincode van vijf cijfers, alleen voor deze app. Niet de code van je telefoon of je bankpas. Schrijf hem op voor je envelop.',
      ] },
      { vraag: 'DigiD-app, deel 2: laten zien dat jij het bent', antwoord: [
        'De app laat zien welke manieren er voor jou zijn. Kies er één.',
        'Met je paspoort of identiteitskaart: de app vraagt eerst om een foto van een stukje van het document. Daarna leg je je telefoon op het document. Haal hem pas weg als de app dat zegt.',
        'Met een brief: DigiD stuurt een activeringscode naar je huisadres. Die komt binnen een paar dagen. Typ de code dan in de app. Ga intussen verder met andere accounts.',
        'Krijg je een code per sms? Typ die code in de app.',
        'Zegt de app dat hij geactiveerd is? Dan is het gelukt.',
      ] },
      { vraag: 'Waar bewaar ik een passkey?', antwoord: [
        'Staat Bitwarden in de keuze? Kies Bitwarden. Bitwarden staat ook op je computer. Dan heb je de passkey op al je toestellen.',
        'Zie je alleen je telefoon? Dat is ook goed. De passkey staat dan op je telefoon.',
        'Log je later in op je laptop, en staat de passkey op je telefoon? Dan laat de laptop een vierkante code zien. Scan die met je telefoon. Bevestig met je vinger of je gezicht.',
        'Twijfel je? Kies dan de code-app. Dat is ook een goed tweede slot.',
      ] },
      { vraag: 'Waar vind ik de beveiliging van een site?', antwoord: [
        'Klik of tik rechtsboven op je naam, je foto of een poppetje. Zie je dat niet? Zoek drie streepjes of drie puntjes.',
        'Kies "Account", "Profiel" of "Instellingen".',
        'Kijk daar bij een kopje als "Beveiliging" of "Inloggen".',
        'Niet gevonden? Zoek op internet naar de naam van de site met "tweestapsverificatie aanzetten". Kies een uitleg op de site zelf.',
        'Nog niet gevonden? Dan heeft de site misschien geen tweede slot. Ga door naar het volgende account.',
      ] },
    ],
    gelukt: 'Kijk bij de beveiliging van het account. Staat tweestapsverificatie aan, of staat je passkey erbij? Dan zit het tweede slot erop. DigiD test je op mijn.digid.nl: kies inloggen met de DigiD-app en volg het scherm. Kom je binnen? Dan werkt je app.',
    lukNiet: [
      'Heeft een site geen tweede slot? Dan is een eigen, sterk wachtwoord uit je kluis genoeg.',
      'Werkt de code niet? Elke code werkt maar kort. Wacht op de volgende code in de app en typ die over.',
      'Lukt het activeren van de DigiD-app niet? Kies in de app de brief. Of bel de helpdesk van DigiD. Het nummer staat op digid.nl.',
      'Wil je hulp? Laat iemand die je vertrouwt naast je meekijken. Typ je wachtwoorden en pincodes wel zelf.',
    ],
    gereedschap: ['ente', '2fas', 'digid'],
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
      'Schrijf de pincode op en stop hem in je envelop.',
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
      'Pak je envelop. Daarin ligt al het hoofdwachtwoord van Bitwarden.',
      'Leg er de herstelcodes van je e-mail bij. Die kreeg je in niveau 1. Heb je ze niet meer? Maak nieuwe. Kies hieronder jouw maildienst.',
      'Leg er ook het wachtwoord en de herstelsleutel van Ente Auth bij, en de codes uit stap 2.',
      'Schrijf alles met de hand. Zet bij elk rijtje bij welk account het hoort.',
      'Leg de envelop thuis op een vaste, veilige plek. Niet in je telefoon, en niet als foto.',
      'Elke code werkt één keer. Gebruik je er een? Zet er een streep door.',
    ],
    uitklap: [
      { dienst: 'gmail', vraag: 'Nieuwe codes maken bij Gmail', antwoord: ['Ga naar myaccount.google.com en log in.', 'Typ "back-upcodes" in de zoekbalk bovenaan de pagina. Kies het en vraag nieuwe codes aan.'] },
      { dienst: 'microsoft', vraag: 'Nieuwe codes maken bij Outlook of Hotmail', antwoord: ['Ga naar account.microsoft.com en log in.', 'Kies Beveiliging. Zoek naar "herstelcode" en maak een nieuwe.'] },
      { dienst: 'andere', vraag: 'Nieuwe codes maken bij een andere maildienst', antwoord: ['Log in op de website van je maildienst. Zoek bij de beveiliging naar "herstelcodes" of "back-upcodes".'] },
      { vraag: 'Herstelcodes van Bitwarden', antwoord: [
        'Heb je bij Bitwarden een tweede slot aangezet? Dan heeft Bitwarden een herstelcode. Die staat alleen op de website.',
        'Ga op je computer naar vault.bitwarden.com en log in.',
        'Kies Instellingen, dan Beveiliging, dan Tweestapsaanmelding. Daar kun je je herstelcode bekijken. Schrijf hem over.',
        'Geen tweede slot op Bitwarden? Dan is je hoofdwachtwoord in de envelop genoeg.',
      ] },
    ],
    gelukt: 'In je envelop zitten je hoofdwachtwoord en de codes voor je e-mail. Bij elk rijtje staat bij welk account het hoort.',
    lukNiet: [
      'Weet je niet meer waar je oude codes zijn? Vaak kun je op dezelfde plek nieuwe codes maken. De oude werken dan niet meer.',
      'Wat er nog meer in je noodpakket hoort, staat in [Als er toch is ingebroken](/als-er-is-ingebroken).',
    ],
    gereedschap: [],
    klaar: 'Is je telefoon weg, dan kom je toch nog binnen in je eigen huis.',
  },
  'backup': {
    wat: 'Een reservekopie is een kopie van je foto\'s en bestanden op een andere plek. Je telefoon zet zijn kopie op internet. Je computer zet zijn kopie op een losse schijf.',
    hoe: ['Een losse schijf is een externe harde schijf: een kastje dat je met een kabel aan je computer koppelt. Je koopt hem in een elektronicawinkel. Neem er een met meer ruimte dan je computer heeft. Geen computer? Dan heb je geen schijf nodig.'],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open Instellingen en tik bovenaan op je naam.', 'Tik op iCloud en dan op iCloud-reservekopie.', 'Zet het schuifje aan. Tik op Maak nu reservekopie.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open Instellingen en typ "back-up" in de zoekbalk.', 'Zet de back-up aan. Kun je nu een back-up maken? Doe dat.'] },
      { naam: 'Op een Mac', stappen: ['Sluit de losse schijf aan.', 'Open Systeeminstellingen. Klik op Algemeen en dan op Time Machine.', 'Voeg je schijf toe als reservekopieschijf.', 'Vraagt je Mac of hij de schijf mag wissen? Bij een nieuwe, lege schijf is dat normaal: kies wissen. Staan er bestanden op die je wilt houden? Stop dan en neem een lege schijf.', 'Wacht tot de eerste kopie klaar is. De eerste keer duurt dat lang.'] },
      { naam: 'Op een Windows-computer', stappen: ['Sluit de losse schijf aan.', 'Typ "Bestandsgeschiedenis" in de zoekbalk van Start en open het.', 'Kies je schijf en zet Bestandsgeschiedenis aan. Wacht tot de eerste kopie klaar is.'] },
    ],
    na: [
      'Klaar? Werp de schijf eerst uit. Hoe dat gaat, staat hieronder. Trek daarna pas de kabel los.',
      'Bewaar de schijf los van je computer. Zet een virus je bestanden op slot, dan kan het niet bij je kopie.',
      'Sluit de schijf eens per maand weer aan. De kopie wordt dan vanzelf bijgewerkt.',
    ],
    uitklap: [
      { vraag: 'Hoe werp ik de schijf uit?', antwoord: [
        'Op een Mac: klik in de Finder met de rechtermuisknop op de schijf. Kies Werp uit. Wacht tot de schijf uit de lijst verdwijnt.',
        'Op Windows: open de Verkenner. Klik met de rechtermuisknop op de schijf en kies Uitwerpen. Wacht op de melding dat je hem veilig kunt loskoppelen.',
      ] },
      { vraag: 'Hoe zet ik een bestand terug?', antwoord: [
        'Op een Mac: sluit de schijf aan. Open in de Finder de map waar het bestand stond. Typ "Time Machine" in Spotlight (het vergrootglas rechtsboven) en open het. Ga terug in de tijd met de pijltjes. Kies een bestand en klik op Zet terug.',
        'Op Windows: sluit de schijf aan. Typ "Bestandsgeschiedenis" in de zoekbalk van Start. Kies het terugzetten van bestanden. Kies een bestand en klik op de groene knop onderaan.',
      ] },
    ],
    gelukt: 'Zet één bestand terug van je losse schijf en open het. Hoe dat gaat, staat hierboven. Lukt het? Dan werkt je reservekopie echt. Op je telefoon staat bij de back-up een datum van vandaag.',
    lukNiet: [
      'Heb je nog geen losse schijf? Doe dan nu alleen je telefoon.',
      'Zegt je iPhone dat er te weinig ruimte in iCloud is? Open Instellingen, tik op je naam en dan op iCloud. Daar kun je meer ruimte kiezen. Je ziet eerst de prijs per maand. Je kunt het later weer opzeggen.',
      'Wil je niet betalen? Zet je foto\'s dan op je computer. Zo gaan ze mee op de losse schijf.',
      'Ziet je computer de schijf niet? Probeer een andere aansluiting of een andere kabel.',
    ],
    gereedschap: [],
    klaar: 'Je brandkast staat buiten de deur. Gaat er iets kapot of op slot, dan heb je alles nog.',
  },
  'router': {
    wat: 'De router is het kastje van je provider waar je internet uit komt. Hij heeft een eigen wachtwoord voor de instellingen, en eigen software. Die software heet ook firmware.',
    hoe: [
      'Vind je dit eng? Bel je provider. Het nummer staat op je rekening en op de site van je provider.',
      'Zeg: "Wilt u het beheerderswachtwoord van mijn router veranderen? En wilt u zorgen dat de software van mijn router wordt bijgewerkt?"',
      'Schrijf het nieuwe beheerderswachtwoord op en stop het in je envelop.',
      'Liever zelf doen? Open hieronder "Ik doe het zelf".',
    ],
    uitklap: [
      { vraag: 'Ik doe het zelf', antwoord: [
        'Pak een computer die op je eigen wifi zit.',
        'Kijk op de sticker van je router. Daar staan vaak een adres om in te loggen en het wachtwoord. Het adres is een rij cijfers met punten, zoals 192.168.1.1. Sommige providers hebben er ook een app voor.',
        'Typ dat adres in je browser, bovenin, waar je normaal een website typt. Druk op Enter.',
        'Log in met het wachtwoord van de sticker.',
        'Zoek het beheerderswachtwoord. Verander het in een wachtwoord uit je wachtwoordmanager.',
        'Zoek "firmware" of "software bijwerken". Zet automatisch bijwerken aan. Kan dat niet? Werk hem nu met de hand bij.',
      ] },
    ],
    letOp: 'Het beheerderswachtwoord is niet het wachtwoord van je wifi. Laat het wifi-wachtwoord zoals het is. Anders moet je al je apparaten opnieuw verbinden.',
    gelukt: 'Zegt je provider dat het geregeld is, en ligt het nieuwe wachtwoord in je envelop? Dan is het gelukt. Deed je het zelf? Log uit en weer in met het nieuwe wachtwoord. Staat automatisch bijwerken aan? Dan is het gelukt.',
    lukNiet: [
      'Kom je er niet uit? Bel je provider. Zij kunnen het meestal op afstand voor je doen.',
      'Heb je per ongeluk het wifi-wachtwoord veranderd? Verbind je apparaten dan opnieuw, met het nieuwe wachtwoord. Geen ramp.',
    ],
    gereedschap: [],
    klaar: 'Het tuinhek zit op slot, en het slot wordt voortaan vanzelf vernieuwd.',
  },
  'versleuteling': {
    wat: 'Dit heet versleuteling. Alles op je laptop wordt dan onleesbaar zonder jouw wachtwoord.',
    hoe: [],
    toestellen: [
      { naam: 'Op een Mac', stappen: [
        'Open Systeeminstellingen en klik op Privacy en beveiliging.',
        'Scrol naar FileVault en zet het aan.',
        'Je Mac vraagt hoe je de schijf opent als je je wachtwoord vergeet. Weet je het niet? Kies je iCloud-account. Dan kom je met je Apple-account weer in je Mac.',
        'Kies je liever een herstelsleutel? Schrijf die op en stop hem in je envelop.',
      ] },
      { naam: 'Op een Windows-computer', stappen: [
        'Klik op Start en typ "apparaatversleuteling". Zo vind je het op Windows 10 en Windows 11.',
        'Open het en zet het aan.',
        'Vind je niets? Typ dan "BitLocker" in de zoekbalk van Start en zet BitLocker aan.',
        'Krijg je een herstelsleutel te zien? Schrijf hem op en stop hem in je envelop.',
      ] },
    ],
    na: ['Laat de laptop aan de stroom staan. Het versleutelen gaat vanzelf op de achtergrond.'],
    letOp: 'Je logt daarna in zoals altijd, met hetzelfde wachtwoord of dezelfde pincode.',
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
      'Zie je bovenin een groen of oranje lampje? Dan gebruikt een app je camera of microfoon. Doe je daar zelf niets mee? Kijk dan welke app het is.',
    ],
    gereedschap: [],
    klaar: 'Alleen wie je zelf binnenlaat, kijkt nog door je ramen.',
  },
  'ublock': {
    wat: 'uBlock Origin houdt advertenties en meekijkers tegen. Het is een extensie: een klein hulpprogramma in je browser. Je houdt de browser die je nu hebt.',
    hoe: ['Doe dit op je computer, in de browser die je altijd gebruikt.'],
    toestellen: [
      { naam: 'In Chrome of Edge', stappen: [
        'Klik rechtsboven op het puzzelstukje. Kies Extensies beheren.',
        'Ken je een extensie niet, of gebruik je hem niet? Klik op Verwijderen. Laat Bitwarden staan.',
        'Typ bovenin, in de adresbalk: chromewebstore.google.com (in Chrome) of microsoftedge.microsoft.com/addons (in Edge). Druk op Enter. Dit is de winkel voor extensies.',
        'Zoek "uBlock Origin Lite". Dat is de versie die in Chrome en Edge werkt.',
        'Kies die van de maker Raymond Hill. Klik op de knop om hem toe te voegen.',
      ] },
      { naam: 'In Firefox', stappen: [
        'Open het menu rechtsboven, met de drie streepjes. Kies Add-ons en thema\'s.',
        'Ken je een extensie niet, of gebruik je hem niet? Verwijder hem. Laat Bitwarden staan.',
        'Typ bovenin, in de adresbalk: addons.mozilla.org. Druk op Enter.',
        'Zoek "uBlock Origin". Kies die van de maker Raymond Hill en voeg hem toe. In Firefox werkt de volledige versie nog.',
      ] },
    ],
    letOp: 'Er bestaan namaakversies van uBlock. Kies alleen die van de maker Raymond Hill.',
    uitklap: [
      { vraag: 'Ik gebruik Safari op een Mac', antwoord: ['Sla deze stap dan over. Wil je toch uBlock Origin? Installeer dan Firefox, zoals hieronder staat.'] },
      { vraag: 'Moet ik overstappen op Firefox?', antwoord: [
        'Nee. uBlock Origin Lite in je eigen browser is beter dan niets.',
        'Wil je toch de volledige uBlock Origin? Ga naar firefox.com en installeer Firefox.',
        'Firefox biedt aan om je bladwijzers uit je oude browser over te nemen. Kies dat.',
        'Zet Bitwarden ook in Firefox, zoals in [niveau 1](/een-avond#stap-wachtwoordmanager). Je kluis blijft dezelfde.',
      ] },
    ],
    gelukt: 'Klik rechtsboven op het puzzelstukje. Staat uBlock in het lijstje? Dan is het gelukt. Bij je extensies staan alleen nog extensies die je kent.',
    lukNiet: [
      'Werkt een site niet goed meer? Klik op het puzzelstukje en dan op uBlock. Zet uBlock voor die ene site uit.',
      'Weet je niet welk pictogram welk is? Houd je muis stil op een pictogram. Er verschijnt een naam, zoals Bitwarden of uBlock.',
      'Weet je niet welke browser je hebt? Kijk naar het pictogram waarmee je internet opent. Een rond kleurtjes-pictogram is Chrome. Een blauwgroene golf is Edge. Een vos om een bol is Firefox. Een kompas is Safari.',
    ],
    gereedschap: ['ublock', 'firefox'],
    klaar: 'Er hangen gordijnen voor je ramen. Veel meekijkers en nepadvertenties blijven nu buiten.',
  },
  'sim-pincode': {
    hoe: [
      'Zoek eerst de pincode en de pukcode van je simkaart. Ze staan op het plastic kaartje waar je simkaart ooit uit kwam.',
      'Kaartje kwijt? Kijk in de app of op de website van je provider, bij je simkaart. Of bel je provider. Zonder de pincode begin je niet aan deze stap.',
    ],
    toestellen: [
      { naam: 'Op een iPhone', stappen: [
        'Open Instellingen en typ "sim-pincode" in de zoekbalk.',
        'Zet SIM-pincode aan en typ de pincode van het kaartje.',
        'Tik daarna op Wijzig pincode. Typ de oude pincode en dan twee keer een eigen code van vier cijfers.',
      ] },
      { naam: 'Op een Android-telefoon', stappen: [
        'Open Instellingen en typ "sim" in de zoekbalk.',
        'Kies de vergrendeling van je simkaart. Bij veel merken heet dat SIM-kaartvergrendeling.',
        'Zet hem aan en typ de pincode van het kaartje.',
        'Kies daarna om de pincode te wijzigen. Typ de oude pincode en dan twee keer een eigen code van vier cijfers.',
      ] },
    ],
    na: ['Schrijf de nieuwe pincode en de pukcode op. Stop het papier in je envelop.'],
    letOp: 'Na drie keer een foute pincode gaat je simkaart op slot. Is hij twee keer fout? Stop dan en zoek de goede code op. Met de pukcode maak je de kaart weer open.',
    gelukt: 'Zet je telefoon uit en weer aan. Vraagt hij eerst om de pincode van je simkaart? Dan is het gelukt.',
    lukNiet: [
      'Zit je simkaart toch op slot? Typ de pukcode. Daarna kies je een nieuwe pincode. Geen pukcode? Bel je provider vanaf een ander toestel.',
      'Heb je een e-sim? Dan is er geen kaartje. Vraag de pincode bij je provider.',
    ],
    gereedschap: [],
    klaar: 'Steelt iemand je telefoon, dan kan hij je simkaart niet zomaar in een ander toestel gebruiken.',
  },
};
