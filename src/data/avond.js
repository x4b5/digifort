/**
 * "Ik heb één avond": per stap van niveau 1 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-1.
 *
 * Elke stap heeft dezelfde vorm, zodat de lezer weet waar hij moet kijken:
 * - `wat`: (optioneel) één korte uitleg vooraf, als het woord nieuw is
 * - `hoe`: wat iedereen doet, vóór de stappen per toestel
 * - `toestellen`: (optioneel) de stappen per toestel, waar iPhone, Android, Mac of Windows verschillen
 * - `na`: (optioneel) wat iedereen daarna doet
 * - `letOp`: (optioneel) één waarschuwing, zoals GOV.UK warning text: wat je zou laten schrikken
 * - `uitklap`: (optioneel) hulp die niet iedereen nodig heeft, zoals de knoppen per maildienst;
 *   elk blok klapt open, zoals het details-blok van GOV.UK
 * - `gelukt`: hoe je ziet dat het gelukt is: iets wat je zelf kunt nakijken
 * - `lukNiet`: wat je doet als het niet lukt
 * - `klaar`: de zin die je ziet als je de stap hebt afgevinkt
 * Een link schrijf je als [tekst](/pad). Menupaden verschillen per toestel en per versie;
 * waar we het pad niet zeker weten, wijzen we de zoekbalk van Instellingen of van de site aan.
 *
 * @typedef {{ naam: string, stappen: string[] }} Toestel
 * @typedef {{ vraag: string, antwoord: string[] }} Uitklap
 * @typedef {{ wat?: string, hoe: string[], toestellen?: Toestel[], na?: string[], letOp?: string, uitklap?: Uitklap[], gelukt: string, lukNiet: string[], gereedschap?: string[], klaar: string }} Uitleg
 */

/**
 * Waar je bij de gangbare maildiensten het wachtwoord en het tweede slot vindt.
 * Je herkent je dienst aan het eind van je e-mailadres, na de @.
 * Waar we de knop niet zeker weten, wijzen we de zoekbalk van de site aan.
 */
const MAIL = [
  {
    vraag: 'Mijn adres eindigt op @gmail.com (Google)',
    wachtwoord: [
      'Ga in je browser naar myaccount.google.com en log in.',
      'Typ "wachtwoord" in de zoekbalk bovenaan de pagina. Kies Wachtwoord.',
      'Typ je nieuwe wachtwoord twee keer en bevestig.',
    ],
    tweedeSlot: [
      'Ga in je browser naar myaccount.google.com en log in.',
      'Typ "verificatie in twee stappen" in de zoekbalk bovenaan de pagina. Kies het en zet het aan.',
      'Kies daarna bij de keuzes voor de Authenticator-app. Je ziet nu de vierkante code.',
    ],
  },
  {
    vraag: 'Mijn adres eindigt op @outlook.com, @hotmail.com of @live.nl (Microsoft)',
    wachtwoord: [
      'Ga in je browser naar account.microsoft.com en log in.',
      'Kies Beveiliging. Zoek daar naar het wijzigen van je wachtwoord.',
      'Typ je nieuwe wachtwoord twee keer en bevestig.',
    ],
    tweedeSlot: [
      'Ga in je browser naar account.microsoft.com en log in.',
      'Kies Beveiliging. Zoek daar naar "tweestapsverificatie" en zet het aan.',
      'Kies een app voor codes. Je ziet nu de vierkante code.',
    ],
  },
  {
    vraag: 'Mijn adres eindigt op @kpnmail.nl, @planet.nl of @hetnet.nl (KPN)',
    wachtwoord: [
      'Ga in je browser naar de website van KPN en log in op MijnKPN.',
      'Zoek naar je e-mail en dan naar "wachtwoord wijzigen".',
      'Kun je het niet vinden? Typ "wachtwoord KPN Mail wijzigen" in de zoekbalk op de site van KPN.',
    ],
    tweedeSlot: [
      'Ga in je browser naar de website van KPN en log in op MijnKPN.',
      'Typ "tweestapsverificatie" in de zoekbalk op de site van KPN.',
      'Vind je geen tweede slot voor je mail? Dan kun je deze stap nu niet afmaken. Dat is niet jouw fout. Druk onderaan op Sla over. Je nieuwe wachtwoord beschermt je mail al.',
    ],
  },
  {
    vraag: 'Mijn adres eindigt op @ziggo.nl, @home.nl, @upcmail.nl of @casema.nl (Ziggo)',
    wachtwoord: [
      'Ga in je browser naar de website van Ziggo en log in op Mijn Ziggo.',
      'Zoek naar je e-mail en dan naar "wachtwoord wijzigen".',
      'Kun je het niet vinden? Typ "wachtwoord Ziggo Mail wijzigen" in de zoekbalk op de site van Ziggo.',
    ],
    tweedeSlot: [
      'Ga in je browser naar de website van Ziggo en log in op Mijn Ziggo.',
      'Typ "tweestapsverificatie" in de zoekbalk op de site van Ziggo.',
      'Vind je geen tweede slot voor je mail? Dan kun je deze stap nu niet afmaken. Dat is niet jouw fout. Druk onderaan op Sla over. Je nieuwe wachtwoord beschermt je mail al.',
    ],
  },
  {
    vraag: 'Mijn adres eindigt op @icloud.com of @me.com (Apple)',
    wachtwoord: [
      'Open Instellingen op je iPhone en tik bovenaan op je naam.',
      'Tik op Inloggen en beveiliging. Op een oudere iPhone heet dat Wachtwoord en beveiliging.',
      'Tik op Wijzig wachtwoord. Typ eerst de code van je iPhone en daarna twee keer je nieuwe wachtwoord.',
    ],
    tweedeSlot: [
      'Open Instellingen op je iPhone en tik bovenaan op je naam.',
      'Tik op Inloggen en beveiliging. Op een oudere iPhone heet dat Wachtwoord en beveiliging.',
      'Staat twee-factor-authenticatie op Aan? Dan zit het tweede slot er al op. Je hebt hier geen code-app voor nodig. Je bent klaar met deze stap.',
    ],
  },
  {
    vraag: 'Ik heb een andere maildienst',
    wachtwoord: [
      'Log in op de website van je maildienst.',
      'Zoek in de instellingen naar "account", "beveiliging" of "wachtwoord".',
      'Kun je het niet vinden? Zoek op internet naar de naam van je maildienst en "wachtwoord wijzigen".',
    ],
    tweedeSlot: [
      'Log in op de website van je maildienst.',
      'Zoek in de instellingen naar "beveiliging", "tweestapsverificatie" of "2FA".',
      'Kies voor een authenticator-app. Je ziet nu de vierkante code.',
    ],
  },
];
/** @param {'wachtwoord' | 'tweedeSlot'} wat */
const perMaildienst = (wat) => MAIL.map((m) => ({ vraag: m.vraag, antwoord: m[wat] }));

/** @type {Record<string, Uitleg>} */
export const AVOND = {
  'mail-wachtwoord': {
    wat: 'Dit doe je op de website van je maildienst, in je browser. De Mail-app op je telefoon heeft deze knop niet.',
    hoe: [
      'Bedenk een nieuw wachtwoord van vier of vijf gewone woorden, zoals "lantaarn koffie zebra dakpan". Lengte telt, rare tekens niet.',
      'Schrijf het op papier. In stap 3 zet je het in je wachtwoordmanager.',
      'Kijk naar het eind van je e-mailadres, na de @. Daaraan zie je welke maildienst je hebt.',
      'Klik hieronder op jouw maildienst. Daar staat waar je het wachtwoord verandert. Typ het nieuwe wachtwoord in en bevestig het.',
      'Gebruik dit wachtwoord nergens anders.',
    ],
    uitklap: perMaildienst('wachtwoord'),
    letOp: 'Na het veranderen vraagt de Mail-app op je telefoon of computer misschien om je nieuwe wachtwoord. Tot je het intypt, komt er geen nieuwe mail binnen. Dat is normaal: je hebt niets kapotgemaakt. Typ het nieuwe wachtwoord in.',
    gelukt: 'Log uit en log weer in met het nieuwe wachtwoord. Kom je binnen? Dan is het gelukt.',
    lukNiet: [
      'Kun je "wachtwoord wijzigen" niet vinden? Kijk bij "account" of "beveiliging". Of zoek op de hulppagina van je e-maildienst.',
      'Weet je je oude wachtwoord niet meer? Kies op de inlogpagina "wachtwoord vergeten".',
      'Wil de dienst ook een cijfer of een teken? Zet er dan een tussen de woorden.',
      'Komt er geen mail meer binnen in de Mail-app? Open de app. Vraagt hij om een wachtwoord, typ dan het nieuwe in. Vraagt hij niets? Zoek in de instellingen van de app bij je e-mailaccount naar het wachtwoord. Typ daar het nieuwe in.',
      'Lukt dat niet? Haal je account dan niet zelf weg uit de app. Vraag hulp aan iemand die je vertrouwt, of aan je maildienst. Je mail blijft intussen veilig bij je maildienst.',
    ],
    gereedschap: [],
    klaar: 'De voordeur heeft een eigen sleutel. Wordt een webwinkel gehackt, dan past die sleutel niet op je mail.',
  },
  'mail-tweede-slot': {
    wat: 'Een tweede slot betekent: na je wachtwoord vraagt je e-mail nog een code. Die code maakt een app op je telefoon. Het heet ook tweestapsverificatie of 2FA.',
    hoe: [
      'Doe dit het liefst met je computer en je telefoon samen. Dan staat de code op het grote scherm en scan je hem met je telefoon. Heb je alleen een telefoon? Klik dan hieronder op "Ik heb alleen een telefoon".',
      'Installeer eerst de code-app op je telefoon. Neem Ente Auth. Die werkt op iPhone en Android.',
    ],
    toestellen: [
      { naam: 'Op een iPhone', stappen: ['Open de App Store en tik op Zoek.', 'Typ "Ente Auth" en installeer de app.'] },
      { naam: 'Op een Android-telefoon', stappen: ['Open de Play Store.', 'Typ "Ente Auth" in de zoekbalk en tik op Installeren.'] },
    ],
    na: [
      'Open Ente Auth. De app vraagt om een account te maken. Dit account is je reservekopie: krijg je een nieuwe telefoon, dan krijg je zo je codes terug.',
      'Typ je e-mailadres. Bedenk een nieuw wachtwoord, net als in stap 1: vier of vijf gewone woorden. Schrijf het op je papier. In stap 3 zet je het ook in je kluis.',
      'Krijg je een mail van Ente met een code? Typ die code in de app. Zie je de mail niet? Kijk bij je ongewenste mail.',
      'Laat de app je een herstelsleutel zien? Dat is een lange rij woorden. Daarmee kom je weer in je account als je het wachtwoord vergeet. Schrijf hem over op je papier.',
      'Ga nu op je computer naar de website van je maildienst. Zet daar het tweede slot aan. Klik hieronder op jouw dienst: daar staat waar het zit. Je ziet dan een vierkante code op het scherm.',
      'Tik in Ente Auth op het plusteken (+). Kies de keuze met het woord scannen of QR-code. Vraagt de app of hij de camera mag gebruiken? Kies toestaan. Richt de camera van je telefoon op de vierkante code op je computer.',
      'Ente Auth laat nu een code van zes cijfers zien. Typ die over op je computer, bij je e-mail.',
      'Krijg je herstelcodes te zien? Schrijf ze op je papier. Daarmee kom je binnen als je telefoon kwijt is.',
    ],
    uitklap: [
      ...perMaildienst('tweedeSlot'),
      {
        vraag: 'Ik heb alleen een telefoon',
        antwoord: [
          'Open de website van je maildienst in de browser van je telefoon. Dus niet in de Mail-app.',
          'Zet het tweede slot aan, zoals hierboven per dienst staat. Je ziet een vierkante code. Die kun je niet scannen met dezelfde telefoon.',
          'Tik op de link onder de vierkante code, zoals "Kun je de code niet scannen?". Je ziet nu een lange rij letters en cijfers. Dat is de sleutel.',
          'Staat er een knop om te kopiëren? Tik erop. Zo niet: houd je vinger op de sleutel tot er een menu verschijnt. Kies Kopieer of Kopiëren.',
          'Open Ente Auth. Tik op het plusteken (+) en kies om de gegevens zelf in te voeren.',
          'Typ bij de naam je maildienst, bijvoorbeeld "Gmail". Houd je vinger in het vak voor de sleutel. Kies Plak of Plakken. Sla op.',
          'Ente Auth laat nu een code van zes cijfers zien. Ga terug naar je browser en typ die code daar in.',
        ],
      },
      {
        vraag: 'Mijn mail vraagt om een passkey. Mag dat ook?',
        antwoord: [
          'Ja, een passkey is ook goed. Je logt dan in met je vinger, je gezicht of de pincode van je telefoon.',
          'Wil je daarna inloggen op je laptop? Dan laat de laptop een vierkante code zien. Die scan je met de camera van je telefoon. Daarna bevestig je met je vinger of je gezicht.',
          'Twijfel je? Neem dan nu de code-app. Een passkey kun je later altijd nog toevoegen.',
        ],
      },
      {
        vraag: 'Mag ik ook een code per sms kiezen?',
        antwoord: ['Liever niet. Een telefoonnummer kan gestolen worden. Kan het echt alleen met sms? Dan is sms beter dan geen tweede slot.'],
      },
    ],
    gelukt: 'Log uit en weer in. Vraagt je e-mail na je wachtwoord om een code uit Ente Auth? Dan is het gelukt.',
    lukNiet: [
      'Werkt de code niet? Elke code werkt maar kort. Wacht op de volgende code in de app en typ die over.',
      'Kun je het tweede slot niet vinden? Zoek op de hulppagina van je e-maildienst naar "tweestapsverificatie".',
      'Heb je KPN- of Ziggo-mail, of een andere dienst zonder tweede slot? Dan kun je deze stap nu niet afmaken. Dat is niet jouw fout. Druk op Sla over. Je nieuwe wachtwoord uit stap 1 beschermt je mail al. Ente Auth heb je straks nog nodig, in niveau 2.',
      'Wil je je mail later toch twee sloten geven? Dan kun je overstappen, bijvoorbeeld naar Proton Mail. Dat hoeft niet vanavond.',
      'Wil je geen account bij Ente Auth? Neem dan 2FAS. Zet in de instellingen van 2FAS de reservekopie aan. Anders ben je bij een nieuwe telefoon je codes kwijt.',
    ],
    gereedschap: ['ente', '2fas'],
    klaar: 'Twee sloten op je belangrijkste deur. Wie alleen je wachtwoord heeft, staat nog steeds buiten.',
  },
  'wachtwoordmanager': {
    wat: 'Een wachtwoordmanager is een kluis voor je wachtwoorden. Hij maakt voor elke site een sterk wachtwoord en vult het voor je in. Jij onthoudt er nog maar één: het hoofdwachtwoord.',
    hoe: [
      'Neem Bitwarden. Het is gratis en werkt op iPhone, Android, Mac en Windows. Andere goede keuzes staan hieronder.',
      'Bedenk een hoofdwachtwoord van vijf gewone woorden. Schrijf het op je papier.',
    ],
    toestellen: [
      { naam: 'Op een iPhone', stappen: [
        'Open de App Store. Zoek "Bitwarden" en installeer de app.',
        'Open de app en kies om een account te maken. Vul je e-mailadres en je hoofdwachtwoord in.',
        'Laat je iPhone de kluis gebruiken: open Instellingen en typ "automatisch invullen" in de zoekbalk. Zet Bitwarden aan.',
      ] },
      { naam: 'Op een Android-telefoon', stappen: [
        'Open de Play Store. Zoek "Bitwarden" en tik op Installeren.',
        'Open de app en kies om een account te maken. Vul je e-mailadres en je hoofdwachtwoord in.',
        'Laat je telefoon de kluis gebruiken: open Instellingen en typ "automatisch invullen" in de zoekbalk. Kies Bitwarden.',
      ] },
      { naam: 'Op je computer', stappen: [
        'Open de browser waarmee je altijd internet opent. Meestal is dat Chrome, Edge, Safari of Firefox.',
        'Typ bovenin, in de adresbalk: bitwarden.com/download. Druk op Enter.',
        'Kies bij de extensies jouw browser. Een extensie is een klein hulpprogramma in je browser. Je komt nu in de winkel voor extensies.',
        'Klik op de knop om hem toe te voegen, zoals "Toevoegen aan Chrome". Bevestig.',
        'Klik rechtsboven in je browser op het puzzelstukje en dan op Bitwarden. Log in met hetzelfde e-mailadres en hoofdwachtwoord.',
      ] },
    ],
    na: [
      'Zet nu het wachtwoord van je e-mail in de kluis. Tik in de app op het plusteken (+) en kies een login.',
      'Vul in: de naam van je maildienst, je e-mailadres en het nieuwe wachtwoord van stap 1. Tik op Opslaan.',
      'Log je voortaan ergens in? Dan vraagt Bitwarden of hij het wachtwoord moet bewaren. Kies ja.',
    ],
    uitklap: [
      {
        vraag: 'Mag ik ook een andere kluis nemen?',
        antwoord: [
          'Ja. Proton Pass is ook gratis en werkt ook overal.',
          'Op je iPhone zit al een kluis: de app Wachtwoorden. Die is goed als je alleen apparaten van Apple hebt. Heb je ook een Windows-computer? Neem dan Bitwarden: dat werkt overal hetzelfde.',
          'Het belangrijkste is dat je er één kiest en die echt gebruikt.',
        ],
      },
      {
        vraag: 'Ik gebruik Safari op een Mac',
        antwoord: [
          'Installeer Bitwarden uit de App Store van je Mac.',
          'Zet hem daarna aan in Safari. Kies in het menu Safari voor Instellingen en dan Extensies. Zet Bitwarden aan.',
        ],
      },
    ],
    letOp: 'Schrijf je hoofdwachtwoord op papier en leg het thuis op een vaste, veilige plek. Ben je het kwijt, dan kan niemand je kluis openen. Ook Bitwarden niet.',
    gelukt: 'Open Bitwarden op je telefoon. Zie je daar het wachtwoord van je e-mail? Dan werkt je kluis.',
    lukNiet: [
      'Zie je het wachtwoord niet op je telefoon? Kijk of je overal met hetzelfde account bent ingelogd. Sluit de app en open hem opnieuw.',
      'Vult de kluis niets in op je computer? Klik op het puzzelstukje. Staat Bitwarden er, en ben je daarin ingelogd?',
      'Zie je geen puzzelstukje? Kijk dan rechtsboven naar de kleine pictogrammen. Houd je muis stil op een pictogram. Er verschijnt een naam. Staat er Bitwarden? Klik erop.',
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
      { naam: 'Op een Windows-computer', stappen: [
        'Klik op Start en typ "Windows Update". Open het. Zo vind je het op Windows 10 en op Windows 11.',
        'Klik op de knop om naar updates te zoeken. Installeer wat klaarstaat.',
        'Staat er een knop Updates hervatten? Dan staan de updates op pauze. Klik erop.',
        'Een schuifje voor automatisch bijwerken is er niet. Windows werkt zichzelf vanzelf bij, zolang de updates niet op pauze staan.',
      ] },
    ],
    na: ['Je browser werkt zichzelf bij. Sluit hem af en toe helemaal af en open hem opnieuw.'],
    gelukt: 'Kijk nog eens op dezelfde plek. Op je telefoon en Mac staan de schuifjes voor automatische updates aan. Op Windows staat dat je up-to-date bent, en de updates staan niet op pauze. Dan is het gelukt.',
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
