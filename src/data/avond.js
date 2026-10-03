/**
 * "Ik heb één avond": per stap van niveau 1 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-1.
 *
 * Elke stap heeft dezelfde vorm, zodat de lezer weet waar hij moet kijken:
 * - `wat`: (optioneel) één korte uitleg vooraf, als het woord nieuw is
 * - `hoe`: wat iedereen doet, vóór de stappen per toestel
 * - `dienstEerst`: (optioneel) de keuze van je maildienst staat vóór de delen, want misschien hoef je ze niet te doen
 * - `toestellen`: (optioneel) de stappen per toestel, waar iPhone, Android, Mac of Windows verschillen
 * - `na`: (optioneel) wat iedereen daarna doet
 * - `letOp`: (optioneel) één waarschuwing, zoals GOV.UK warning text: wat je zou laten schrikken
 * - `uitklap`: (optioneel) hulp die niet iedereen nodig heeft, zoals de knoppen per maildienst;
 *   elk blok klapt open, zoals het details-blok van GOV.UK. Een blok met `dienst` hoort bij één
 *   maildienst: kies je boven de blokken je maildienst, dan zie je alleen dat blok, al opengeklapt
 * - `gelukt`: hoe je ziet dat het gelukt is: iets wat je zelf kunt nakijken
 * - `lukNiet`: wat je doet als het niet lukt
 * - `klaar`: de zin die je ziet als je de stap hebt afgevinkt
 * Een link schrijf je als [tekst](/pad). Menupaden verschillen per toestel en per versie;
 * waar we het pad niet zeker weten, wijzen we de zoekbalk van Instellingen of van de site aan.
 *
 * @typedef {{ naam: string, stappen: string[] }} Toestel
 * @typedef {{ vraag: string, antwoord: string[], dienst?: string }} Uitklap
 * @typedef {{ wat?: string, hoe: string[], dienstEerst?: boolean, toestellen?: Toestel[], na?: string[], letOp?: string, uitklap?: Uitklap[], gelukt: string, lukNiet: string[], gereedschap?: string[], klaar: string }} Uitleg
 */

/**
 * Waar je bij de gangbare maildiensten het wachtwoord en het tweede slot vindt.
 * Je herkent je dienst aan het eind van je e-mailadres, na de @.
 * Waar we de knop niet zeker weten, wijzen we de zoekbalk van de site aan.
 */
const MAIL = [
  {
    dienst: 'gmail',
    vraag: 'Mijn adres eindigt op @gmail.com (Google)',
    wachtwoord: [
      'Ga in je browser naar myaccount.google.com en log in.',
      'Typ "wachtwoord" in de zoekbalk bovenaan de pagina. Kies Wachtwoord.',
      'Typ je nieuwe wachtwoord twee keer en bevestig.',
    ],
    tweedeSlot: [
      'Doe eerst deel 1 en 2 hieronder. Ga dan in je browser naar myaccount.google.com.',
      'Typ "verificatie in twee stappen" in de zoekbalk bovenaan. Kies het en zet het aan.',
      'Vraagt Google om je telefoonnummer, of biedt het meldingen op je telefoon aan? Dat mag. Die zijn een reserve.',
      'Zoek op die pagina de Authenticator-app en kies hem. Je ziet nu de vierkante code. Ga naar deel 3.',
    ],
  },
  {
    dienst: 'microsoft',
    vraag: 'Mijn adres eindigt op @outlook.com, @hotmail.com of @live.nl (Microsoft)',
    wachtwoord: [
      'Ga in je browser naar account.microsoft.com en log in.',
      'Kies Beveiliging. Zoek daar naar het wijzigen van je wachtwoord.',
      'Typ je nieuwe wachtwoord twee keer en bevestig.',
    ],
    tweedeSlot: [
      'Doe eerst deel 1 en 2 hieronder. Ga dan in je browser naar account.microsoft.com.',
      'Kies Beveiliging. Zoek daar naar "tweestapsverificatie" en zet het aan.',
      'Microsoft vraagt je nu om zijn eigen app te installeren: Microsoft Authenticator. Dat hoeft niet. Zoek op dat scherm een kleine link om een andere app te gebruiken. Klik daarop.',
      'Je ziet nu de vierkante code. Ga naar deel 3.',
    ],
  },
  {
    dienst: 'kpn',
    vraag: 'Mijn adres eindigt op @kpnmail.nl, @planet.nl of @hetnet.nl (KPN)',
    wachtwoord: [
      'Ga in je browser naar kpn.com. Typ "wachtwoord KPN Mail wijzigen" in de zoekbalk van de site.',
      'Open de uitleg van KPN. Daar staat waar je het verandert. Volg die stappen.',
      'Vraagt KPN om in te loggen op MijnKPN, en heb je die inlog niet? Stop dan hier. Dat is niet jouw fout.',
      'Bel KPN, of vraag hulp aan iemand die je vertrouwt. Druk intussen op Sla over. Je oude wachtwoord blijft werken tot je het verandert.',
    ],
    tweedeSlot: [
      'Kijk dit eerst na, voordat je een app installeert.',
      'Ga naar kpn.com. Typ "tweestapsverificatie e-mail" in de zoekbalk van de site.',
      'Gaat wat je vindt alleen over inloggen op MijnKPN? Dan is dat niet het slot voor je mail.',
      'Vind je in vijf minuten niets voor je mail zelf? Dan heeft je mail geen tweede slot. Druk op Sla over. Deel 1 tot en met 3 hoef je nu niet te doen.',
    ],
  },
  {
    dienst: 'ziggo',
    vraag: 'Mijn adres eindigt op @ziggo.nl, @home.nl, @upcmail.nl of @casema.nl (Ziggo)',
    wachtwoord: [
      'Ga in je browser naar ziggo.nl. Typ "wachtwoord Ziggo Mail wijzigen" in de zoekbalk van de site.',
      'Open de uitleg van Ziggo. Daar staat waar je het verandert. Volg die stappen.',
      'Vraagt Ziggo om in te loggen op Mijn Ziggo, en heb je die inlog niet? Stop dan hier. Dat is niet jouw fout.',
      'Bel Ziggo, of vraag hulp aan iemand die je vertrouwt. Druk intussen op Sla over. Je oude wachtwoord blijft werken tot je het verandert.',
    ],
    tweedeSlot: [
      'Kijk dit eerst na, voordat je een app installeert.',
      'Ga naar ziggo.nl. Typ "tweestapsverificatie e-mail" in de zoekbalk van de site.',
      'Gaat wat je vindt alleen over inloggen op Mijn Ziggo? Dan is dat niet het slot voor je mail.',
      'Vind je in vijf minuten niets voor je mail zelf? Dan heeft je mail geen tweede slot. Druk op Sla over. Deel 1 tot en met 3 hoef je nu niet te doen.',
    ],
  },
  {
    dienst: 'icloud',
    vraag: 'Mijn adres eindigt op @icloud.com of @me.com (Apple)',
    wachtwoord: [
      'Open Instellingen op je iPhone en tik bovenaan op je naam.',
      'Tik op Inloggen en beveiliging. Op een oudere iPhone heet dat Wachtwoord en beveiliging.',
      'Tik op Wijzig wachtwoord. Typ eerst de code van je iPhone en daarna twee keer je nieuwe wachtwoord.',
    ],
    tweedeSlot: [
      'Open Instellingen op je iPhone en tik bovenaan op je naam.',
      'Tik op Inloggen en beveiliging. Op een oudere iPhone heet dat Wachtwoord en beveiliging.',
      'Staat twee-factor-authenticatie op Aan? Dan zit het tweede slot er al op. Deel 1 tot en met 3 hoef je nu niet te doen. Druk op Gedaan.',
    ],
  },
  {
    dienst: 'andere',
    vraag: 'Ik heb een andere maildienst',
    wachtwoord: [
      'Log in op de website van je maildienst.',
      'Zoek in de instellingen naar "account", "beveiliging" of "wachtwoord".',
      'Kun je het niet vinden? Zoek op internet naar de naam van je maildienst en "wachtwoord wijzigen".',
    ],
    tweedeSlot: [
      'Doe eerst deel 1 en 2 hieronder. Log dan in op de website van je maildienst.',
      'Zoek in de instellingen naar "beveiliging", "tweestapsverificatie" of "2FA".',
      'Kies een authenticator-app: zo heet een code-app. Je ziet nu de vierkante code. Ga naar deel 3.',
      'Vind je geen tweede slot? Druk op Sla over.',
    ],
  },
];
/** De keuze "welke maildienst heb je?" boven de blokken per maildienst: naam en hoe het adres eindigt. */
export const DIENSTEN = [
  { id: 'gmail', naam: 'Gmail', adres: '@gmail.com' },
  { id: 'microsoft', naam: 'Outlook of Hotmail', adres: '@outlook.com, @hotmail.com, @live.nl' },
  { id: 'kpn', naam: 'KPN', adres: '@kpnmail.nl, @planet.nl, @hetnet.nl' },
  { id: 'ziggo', naam: 'Ziggo', adres: '@ziggo.nl, @home.nl, @upcmail.nl, @casema.nl' },
  { id: 'icloud', naam: 'iCloud', adres: '@icloud.com, @me.com' },
  { id: 'andere', naam: 'Een andere maildienst', adres: '' },
];

/** @param {'wachtwoord' | 'tweedeSlot'} wat */
const perMaildienst = (wat) => MAIL.map((m) => ({ dienst: m.dienst, vraag: m.vraag, antwoord: m[wat] }));

/** @type {Record<string, Uitleg>} */
export const AVOND = {
  'mail-wachtwoord': {
    wat: 'Dit doe je op de website van je maildienst, in je browser. De Mail-app op je telefoon heeft deze knop niet.',
    hoe: [
      'Bedenk een nieuw wachtwoord van vier of vijf gewone woorden, zoals "lantaarn koffie zebra dakpan". Lengte telt, rare tekens niet.',
      'Schrijf het op papier. In stap 3 zet je het in je wachtwoordmanager.',
      'Kijk naar het eind van je e-mailadres, na de @. Daaraan zie je welke maildienst je hebt.',
      'Kies hieronder jouw maildienst. Daar staat waar je het wachtwoord verandert. Typ het nieuwe wachtwoord in en bevestig het.',
      'Gebruik dit wachtwoord nergens anders.',
    ],
    uitklap: perMaildienst('wachtwoord'),
    letOp: 'Na het veranderen vraagt de Mail-app op je telefoon of computer misschien om je nieuwe wachtwoord. Tot je het intypt, komt er geen nieuwe mail binnen. Dat is normaal: je hebt niets kapotgemaakt. Typ het nieuwe wachtwoord in.',
    gelukt: 'Log nergens uit, niet op je telefoon en niet op je computer. Open in je browser een privévenster. Je vindt het in het menu van je browser, als incognito, privé of geheime modus. Log daar in op je mail met het nieuwe wachtwoord. Heb je iCloud? Ga dan naar icloud.com. Krijg je op je telefoon een code? Typ die over. Kom je binnen? Dan is het gelukt. Sluit het privévenster.',
    lukNiet: [
      'Kun je "wachtwoord wijzigen" niet vinden? Kijk bij "account" of "beveiliging".',
      'Weet je je oude wachtwoord niet meer, of heeft iemand anders je mail ooit ingesteld? Kies op de inlogpagina "wachtwoord vergeten". Bij KPN en Ziggo: bel je provider.',
      'Wil de dienst ook een cijfer of teken? Zet het tussen de woorden.',
      'Komt er geen mail meer binnen in de Mail-app? Open de app en veeg de lijst met mail omlaag. Vraagt hij om een wachtwoord? Typ het nieuwe in.',
      'Vraagt hij niets, op een iPhone? Open Instellingen en typ "accounts" in de zoekbalk bovenaan. Tik op je mailaccount en zoek het vak Wachtwoord. Typ het nieuwe in. Verander verder niets.',
      'Lukt dat niet? Haal je account niet weg uit de app. Vraag hulp aan iemand die je vertrouwt. Je mail blijft bewaard bij je maildienst.',
    ],
    gereedschap: [],
    klaar: 'De voordeur heeft een eigen sleutel. Wordt een webwinkel gehackt, dan past die sleutel niet op je mail.',
  },
  'mail-tweede-slot': {
    wat: 'Een tweede slot betekent: na je wachtwoord vraagt je e-mail nog een code. Die code maakt een app op je telefoon. Het heet ook tweestapsverificatie of 2FA. Dit is de lastigste stap van de avond. Neem er rustig de tijd voor. Stoppen na een deel mag.',
    hoe: [
      'Kies eerst hieronder je maildienst. Daar staat of je de delen hieronder moet doen. Bij iCloud zit het slot er vaak al op. Bij KPN en Ziggo is er misschien geen.',
      'Doe het liefst met je computer en je telefoon samen. De vierkante code staat dan op het grote scherm. Je scant hem met je telefoon. Alleen een telefoon? Open hieronder "Ik heb alleen een telefoon".',
      'Daarna doe je drie delen. Deel 1: de code-app op je telefoon zetten. Deel 2: een account maken in die app. Deel 3: de app aan je e-mail koppelen.',
    ],
    dienstEerst: true,
    toestellen: [
      { naam: 'Deel 1 op een iPhone: zet Ente Auth erop', stappen: ['Open de App Store en tik op Zoek.', 'Typ "Ente Auth" en installeer de app.'] },
      { naam: 'Deel 1 op een Android-telefoon: zet Ente Auth erop', stappen: ['Open de Play Store.', 'Typ "Ente Auth" in de zoekbalk en tik op Installeren.'] },
      { naam: 'Deel 2: maak een account in Ente Auth', stappen: [
        'Open Ente Auth en kies om een account te maken. Dit account is je reservekopie: krijg je een nieuwe telefoon, dan krijg je zo je codes terug.',
        'Typ je e-mailadres. Bedenk een wachtwoord voor Ente, net als in stap 1: vier of vijf gewone woorden. Schrijf het op je papier, met "Ente" erbij.',
        'Ente stuurt je een mail met een code. Typ die code in de app. Zie je de mail niet? Kijk bij je ongewenste mail.',
        'Laat de app een lange rij woorden zien? Dat is de herstelsleutel van Ente. Schrijf hem over op je papier, met "herstelsleutel Ente" erbij.',
      ] },
      { naam: 'Deel 3: koppel Ente Auth aan je e-mail', stappen: [
        'Ga op je computer naar de website van je maildienst. Zet het tweede slot aan, zoals hierboven bij jouw maildienst staat. Je ziet dan een vierkante code.',
        'Tik in Ente Auth op het plusteken (+). Kies de keuze met het woord scannen of QR-code. Vraagt de app om de camera? Kies toestaan.',
        'Richt de camera van je telefoon op de vierkante code op je computer.',
        'Ente Auth laat nu een code van zes cijfers zien. Typ die over op je computer, bij je e-mail.',
      ] },
    ],
    na: [
      'Laat je e-mail herstelcodes zien? Dat is een rijtje codes voor als je telefoon kwijt is. Schrijf ze op je papier, met "herstelcodes e-mail" erbij.',
    ],
    uitklap: [
      {
        vraag: 'Wachtwoord, herstelsleutel, herstelcodes: wat is wat?',
        antwoord: [
          'Het wachtwoord van Ente: daarmee open je je account bij Ente Auth (deel 2).',
          'De herstelsleutel van Ente: een lange rij woorden. Daarmee kom je in je Ente-account als je het wachtwoord kwijt bent (deel 2).',
          'De herstelcodes van je e-mail: codes voor als je telefoon kwijt is. Niet elke maildienst geeft ze (na deel 3).',
          'De vierkante code: je scant hem één keer. Je hoeft hem niet te bewaren.',
          'Schrijf bij alles waar het bij hoort.',
        ],
      },
      ...perMaildienst('tweedeSlot'),
      {
        vraag: 'Ik heb alleen een telefoon',
        antwoord: [
          'Je wisselt dan tussen je browser en Ente Auth. Lukt het niet? Druk op Sla over en doe het later met een computer.',
          'Doe deel 1 en 2. Open dan de website van je maildienst in de browser van je telefoon, niet in de Mail-app.',
          'Zet het tweede slot aan, zoals bij jouw maildienst staat. Je ziet een vierkante code. Die kun je niet scannen met dezelfde telefoon.',
          'Tik op de link eronder, zoals "Kun je de code niet scannen?". Je ziet een lange rij letters: de sleutel.',
          'Tik op de knop om te kopiëren. Geen knop? Houd je vinger op de sleutel en kies Kopieer of Kopiëren.',
          'Open Ente Auth. Tik op het plusteken (+) en kies om de gegevens zelf in te voeren.',
          'Typ bij de naam je maildienst. Houd je vinger in het vak voor de sleutel en kies Plak of Plakken. Sla op.',
          'Ente Auth laat zes cijfers zien. Ga terug naar je browser en typ ze daar in.',
        ],
      },
      {
        vraag: 'Mijn mail vraagt om een passkey. Mag dat ook?',
        antwoord: [
          'Ja, een passkey is ook goed. Je logt dan in met je vinger, je gezicht of de pincode van je telefoon.',
          'Twijfel je? Neem dan nu de code-app. Een passkey kun je later altijd nog toevoegen.',
        ],
      },
      {
        vraag: 'Mag ik ook een code per sms kiezen?',
        antwoord: ['Liever niet. Een telefoonnummer kan gestolen worden. Kan het echt alleen met sms? Dan is sms beter dan geen tweede slot.'],
      },
    ],
    gelukt: 'Kijk in Ente Auth. Staat daar de naam van je maildienst, met zes cijfers die steeds veranderen? En zegt de website van je mail dat tweestapsverificatie aan staat? Dan is het gelukt. Je hoeft niet uit te loggen. Een computer die je mail al kent, vraagt vaak geen code. Heb je iCloud-mail? Dan is het gelukt als twee-factor-authenticatie op Aan staat.',
    lukNiet: [
      'Werkt de code niet? Elke code werkt maar kort. Wacht op de volgende code in de app en typ die over.',
      'Kun je het tweede slot niet vinden? Zoek op de hulppagina van je e-maildienst naar "tweestapsverificatie".',
      'Heeft je mail geen tweede slot? Dan is dat niet jouw fout. Druk op Sla over. Je nieuwe wachtwoord uit stap 1 beschermt je mail al.',
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
        'Typ bovenin, in de adresbalk: bitwarden.com/download. Druk op Enter. De pagina is in het Engels. Je zoekt alleen de naam van jouw browser.',
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
        vraag: 'Welke schermen zie ik als ik het account maak?',
        antwoord: [
          'Je maakt het account één keer, op het toestel waar je begint. Op je andere toestellen log je daarna alleen in.',
          'Vraagt Bitwarden waar je account moet staan, in de VS of in de EU? Kies de EU. Kies daarna op elk toestel dezelfde regio als je inlogt.',
          'Krijg je een mail om je adres te bevestigen? Open je mail en klik op de knop of link in die mail. Ga dan terug naar Bitwarden.',
          'Vraagt Bitwarden om een hint voor je hoofdwachtwoord? Die mag je leeg laten. Zet er nooit je hoofdwachtwoord in.',
          'Log je in op een nieuw toestel? Dan kan Bitwarden een code naar je e-mail sturen. Open je mail en typ de code over. Dat is normaal: zo weet Bitwarden dat jij het bent.',
        ],
      },
      {
        vraag: 'Mag ik ook een andere kluis nemen?',
        antwoord: [
          'Ja. Proton Pass is ook gratis en werkt ook overal.',
          'Heb je alleen apparaten van Apple? Dan is de app Wachtwoorden op je iPhone ook goed.',
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
        'Daarna werkt Windows zichzelf vanzelf bij.',
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
