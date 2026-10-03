/**
 * "Ik heb één avond": per stap van niveau 1 (lijsten.js) hoe je het doet, in gewone taal.
 * De sleutel is het id van het item in niveau-1.
 *
 * Elke stap heeft dezelfde vorm, zodat de lezer weet waar hij moet kijken:
 * - `wat`: (optioneel) één korte uitleg vooraf, als het woord nieuw is
 * - `hoe`: wat iedereen doet, vóór de stappen per toestel
 * - `dienstEerst`: (optioneel) de keuze van je maildienst staat vóór de delen, want misschien hoef je ze niet te doen
 * - `zonderDelen`: (optioneel) bij deze maildiensten vallen de delen weg: je kijkt alleen iets na
 * - `toestellen`: (optioneel) de stappen per toestel, waar iPhone, Android, Mac of Windows verschillen
 * - `na`: (optioneel) wat iedereen daarna doet
 * - `letOp`: (optioneel) één waarschuwing, zoals GOV.UK warning text: wat je zou laten schrikken
 * - `uitklap`: (optioneel) hulp die niet iedereen nodig heeft, zoals de knoppen per maildienst;
 *   elk blok klapt open, zoals het details-blok van GOV.UK. Een blok met `dienst` hoort bij één
 *   maildienst: kies je boven de blokken je maildienst, dan zie je alleen dat blok, al opengeklapt
 * - `gelukt`: wat je op je scherm ziet als het gelukt is. Het staat na "Gelukt als:", dus het begint met een kleine letter
 * - `lukNiet`: wat je doet als het niet lukt
 * - `klaar`: de zin die je ziet als je de stap hebt afgevinkt
 * Een link schrijf je als [tekst](/pad). Menupaden verschillen per toestel en per versie;
 * waar we het pad niet zeker weten, wijzen we de zoekbalk van Instellingen of van de site aan.
 *
 * Een toestel-blok kan ook een deel van een lange klus zijn. Verschilt dat deel per maildienst,
 * dan staan de blokken per maildienst in `diensten`, in het deel zelf; hulp die alleen bij dat
 * deel hoort, staat in `uitklap` van het blok. Zo hoeft de lezer niet op en neer te springen.
 *
 * @typedef {{ vraag: string, antwoord: string[], dienst?: string }} Uitklap
 * @typedef {{ naam: string, stappen: string[], diensten?: Uitklap[], uitklap?: Uitklap[] }} Toestel
 * @typedef {{ wat?: string, hoe: string[], dienstEerst?: boolean, zonderDelen?: string[], toestellen?: Toestel[], na?: string[], letOp?: string, uitklap?: Uitklap[], gelukt: string, lukNiet: string[], gereedschap?: string[], klaar: string }} Uitleg
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
      'Ga in je browser naar myaccount.google.com en log in.',
      'Typ "verificatie in twee stappen" in de zoekbalk bovenaan. Kies het en zet het aan.',
      'Biedt Google sms of meldingen op je telefoon aan? Dat mag, als reserve.',
      'Zoek op die pagina de Authenticator-app en kies hem. Je ziet nu een vierkante code.',
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
      'Ga in je browser naar account.microsoft.com en log in.',
      'Kies Beveiliging. Zoek daar naar "tweestapsverificatie" en zet het aan.',
      'Vraagt Microsoft om zijn eigen app, Microsoft Authenticator? Dat hoeft niet. Klik op de kleine link om een andere app te gebruiken.',
      'Je ziet nu een vierkante code.',
    ],
  },
  {
    dienst: 'kpn',
    vraag: 'Mijn adres eindigt op @kpnmail.nl, @planet.nl of @hetnet.nl (KPN)',
    wachtwoord: [
      'Weet je niet of je een inlog hebt voor MijnKPN, de site van je rekening? Of stelde iemand anders je mail in? Druk dan op Sla over. Je mail blijft gewoon werken. Stap 3 tot en met 6 lukken ook zonder deze stap.',
      'Schrijf op je papier: "KPN bellen over wachtwoord mail". Bel als het jou uitkomt. Het nummer staat op je rekening. Zeg: "Ik wil het wachtwoord van mijn KPN-mail veranderen, maar ik kan niet inloggen."',
      'Heb je die inlog wel? Typ bovenin je browser, waar je normaal een website typt: KPN Mail wachtwoord wijzigen. Druk op Enter. Kies een uitkomst van kpn.com en volg die uitleg.',
    ],
    tweedeSlot: [
      'Typ bovenin je browser, waar je normaal een website typt: KPN Mail tweestapsverificatie. Druk op Enter.',
      'Zegt een uitkomst van kpn.com hoe je een code-app op je mail zet? Kies dan bij je maildienst "Een andere maildienst". Dan zie je de stappen.',
      'Niets gevonden na vijf minuten? Of twijfel je? Druk op Sla over. Dat is een goede keuze: je nieuwe wachtwoord beschermt je mail al.',
    ],
  },
  {
    dienst: 'ziggo',
    vraag: 'Mijn adres eindigt op @ziggo.nl, @home.nl, @upcmail.nl of @casema.nl (Ziggo)',
    wachtwoord: [
      'Weet je niet of je een inlog hebt voor Mijn Ziggo, de site van je rekening? Of stelde iemand anders je mail in? Druk dan op Sla over. Je mail blijft gewoon werken. Stap 3 tot en met 6 lukken ook zonder deze stap.',
      'Schrijf op je papier: "Ziggo bellen over wachtwoord mail". Bel als het jou uitkomt. Het nummer staat op je rekening. Zeg: "Ik wil het wachtwoord van mijn Ziggo-mail veranderen, maar ik kan niet inloggen."',
      'Heb je die inlog wel? Typ bovenin je browser, waar je normaal een website typt: Ziggo Mail wachtwoord wijzigen. Druk op Enter. Kies een uitkomst van ziggo.nl en volg die uitleg.',
    ],
    tweedeSlot: [
      'Typ bovenin je browser, waar je normaal een website typt: Ziggo Mail tweestapsverificatie. Druk op Enter.',
      'Zegt een uitkomst van ziggo.nl hoe je een code-app op je mail zet? Kies dan bij je maildienst "Een andere maildienst". Dan zie je de stappen.',
      'Niets gevonden na vijf minuten? Of twijfel je? Druk op Sla over. Dat is een goede keuze: je nieuwe wachtwoord beschermt je mail al.',
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
      'Staat twee-factor-authenticatie op Aan? Dan zit het tweede slot er al op. Je hoeft verder niets te doen.',
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
      'Log in op de website van je maildienst.',
      'Zoek in de instellingen naar "tweestapsverificatie" of "2FA". Kies een code-app. Soms heet dat authenticator-app. Je ziet nu een vierkante code.',
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

/**
 * @param {'wachtwoord' | 'tweedeSlot'} wat
 * @param {string[]} [alleen] alleen deze maildiensten
 */
const perMaildienst = (wat, alleen) => MAIL
  .filter((m) => !alleen || alleen.includes(m.dienst))
  .map((m) => ({ dienst: m.dienst, vraag: m.vraag, antwoord: m[wat] }));

/** @type {Record<string, Uitleg>} */
export const AVOND = {
  'mail-wachtwoord': {
    hoe: [
      'Pak pen en papier. Schrijf een nieuw wachtwoord op van vier of vijf gewone woorden, zoals "lantaarn koffie zebra dakpan".',
    ],
    uitklap: perMaildienst('wachtwoord'),
    letOp: 'Gebruik dit wachtwoord nergens anders. Doe dit niet in de Mail-app: die kan het niet. Daarna vraagt de Mail-app misschien om het nieuwe wachtwoord. Tot je het intypt, komt er geen mail binnen. Typ het dan in.',
    gelukt: 'de website zegt dat je wachtwoord is gewijzigd. Zeker weten? Log op die website uit en weer in met je nieuwe wachtwoord. Log niet uit in de Mail-app op je telefoon. Bij iCloud log je in op icloud.com.',
    lukNiet: [
      'Kun je "wachtwoord wijzigen" niet vinden? Kijk bij "account" of "beveiliging".',
      'Weet je je oude wachtwoord niet meer? Kies op de inlogpagina "wachtwoord vergeten". Bij KPN en Ziggo: bel je provider.',
      'Wil de dienst ook een cijfer of teken? Zet het tussen de woorden.',
      'Geen mail meer in de Mail-app? Open de app en veeg de lijst omlaag. Vraagt hij om een wachtwoord? Typ het nieuwe in.',
      'Vraagt je iPhone niets? Open Instellingen en typ "accounts" in de zoekbalk bovenaan. Tik op je mailaccount en dan op Account. Typ het nieuwe wachtwoord bij Wachtwoord.',
      'Tik daar ook op SMTP, bij de uitgaande mail. Tik op de server die er staat. Typ ook daar het nieuwe wachtwoord en tik op Gereed. Anders kun je geen mail meer versturen.',
      'Zie je het niet zo staan? Vraag hulp aan iemand die je vertrouwt. Haal je account nooit weg.',
    ],
    gereedschap: [],
    klaar: 'De voordeur heeft een eigen sleutel. Wordt een webwinkel gehackt, dan past die sleutel niet op je mail.',
  },
  'mail-tweede-slot': {
    wat: 'Na je wachtwoord vraagt je e-mail dan nog om een code van 6 cijfers. Die code maakt een app op je telefoon: Ente Auth. Stoppen na een deel mag.',
    hoe: [],
    dienstEerst: true,
    zonderDelen: ['kpn', 'ziggo', 'icloud'],
    toestellen: [
      { naam: 'Deel 1 op een iPhone: zet Ente Auth erop', stappen: ['Open de App Store en tik op Zoek.', 'Typ "Ente Auth" en installeer de app.'] },
      { naam: 'Deel 1 op een Android-telefoon: zet Ente Auth erop', stappen: ['Open de Play Store.', 'Typ "Ente Auth" in de zoekbalk en tik op Installeren.'] },
      { naam: 'Deel 2: maak een account in Ente Auth', stappen: [
        'Open Ente Auth en kies om een account te maken. Dit account is je reservekopie: bij een nieuwe telefoon krijg je zo je codes terug.',
        'Typ je e-mailadres. Bedenk een wachtwoord voor Ente, net als in stap 1. Schrijf het op je papier, met "Ente" erbij.',
        'Ente stuurt je een mail met een code. Typ die code in de app. Geen mail? Kijk bij je ongewenste mail.',
        'Laat de app een rij woorden zien? Dat is je herstelsleutel. Schrijf de woorden over in blokletters. Zet een nummer voor elk woord: 1, 2, 3.',
        'Kijk het na. Is je laatste nummer gelijk aan het aantal woorden op het scherm? Vergelijk dan woord voor woord. Schrijven lastig? Laat iemand die je vertrouwt meelezen.',
      ] },
      { naam: 'Deel 3: koppel Ente Auth aan je e-mail',
        diensten: perMaildienst('tweedeSlot', ['gmail', 'microsoft', 'andere']),
        uitklap: [
          {
            vraag: 'De vierkante code staat op mijn computer',
            antwoord: [
              'Tik in Ente Auth op het plusteken (+). Kies scannen of QR-code. Vraagt de app om de camera? Kies toestaan.',
              'Richt de camera van je telefoon op de vierkante code.',
              'Ente Auth laat 6 cijfers zien. Typ die over op je computer, bij je e-mail.',
            ],
          },
          {
            vraag: 'Ik heb alleen een telefoon',
            antwoord: [
              'Open de website van je maildienst in de browser van je telefoon, niet in de Mail-app. Zet het tweede slot aan, zoals in het blok van jouw dienst.',
              'De vierkante code kun je niet scannen met dezelfde telefoon. Tik op de link eronder, zoals "Kun je de code niet scannen?". Je ziet een lange rij letters: de sleutel.',
              'Tik op de knop om te kopiëren. Geen knop? Houd je vinger op de sleutel en kies Kopieer.',
              'Open Ente Auth. Tik op het plusteken (+) en kies om de gegevens zelf in te voeren.',
              'Typ bij de naam je maildienst. Houd je vinger in het vak voor de sleutel en kies Plak. Sla op.',
              'Ente Auth laat 6 cijfers zien. Ga terug naar je browser en typ ze daar in.',
            ],
          },
        ],
        stappen: [
          'Laat je e-mail daarna herstelcodes zien? Schrijf ze op je papier, met "herstelcodes e-mail" erbij.',
        ],
      },
    ],
    uitklap: [
      ...perMaildienst('tweedeSlot', ['kpn', 'ziggo', 'icloud']),
      {
        vraag: 'Wachtwoord, herstelsleutel, herstelcodes: wat is wat?',
        antwoord: [
          'Het wachtwoord van Ente opent je account bij Ente Auth.',
          'De herstelsleutel van Ente is voor als je dat wachtwoord kwijt bent.',
          'De herstelcodes van je e-mail zijn voor als je telefoon kwijt is.',
          'De vierkante code scan je één keer. Die hoef je niet te bewaren.',
        ],
      },
    ],
    gelukt: 'je in Ente Auth de naam van je maildienst ziet, met 6 cijfers die steeds veranderen. En de website van je mail zegt dat tweestapsverificatie aan staat. Je hoeft niet uit te loggen. Bij iCloud: twee-factor-authenticatie staat op Aan.',
    lukNiet: [
      'Werkt de code niet? Elke code werkt maar kort. Wacht op de volgende code in de app en typ die over.',
      'Heeft je mail geen tweede slot? Dan is dat niet jouw fout. Druk op Sla over. Je nieuwe wachtwoord beschermt je mail al.',
      'Biedt je mail alleen een passkey of sms? Een passkey is ook goed. Sms is beter dan niets.',
      'Wil je geen account bij Ente Auth? Neem dan 2FAS. Zet in de instellingen van 2FAS de reservekopie aan. Anders ben je bij een nieuwe telefoon je codes kwijt.',
    ],
    gereedschap: ['ente', '2fas'],
    klaar: 'Twee sloten op je belangrijkste deur. Wie alleen je wachtwoord heeft, staat nog steeds buiten.',
  },
  'wachtwoordmanager': {
    wat: 'Een wachtwoordmanager is een kluis voor je wachtwoorden. Hij maakt en onthoudt ze voor je. Jij onthoudt er nog maar één: het hoofdwachtwoord.',
    hoe: [
      'Bedenk een hoofdwachtwoord van vijf gewone woorden. Schrijf het op je papier.',
      'Neem Bitwarden. Het is gratis. Bitwarden vraagt waar je account staat: in de VS (bitwarden.com) of in de EU (bitwarden.eu). Kies de EU, nu en later op elk toestel. Anders vindt Bitwarden je account niet.',
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
      { naam: 'Op je computer (mag ook later)', stappen: [
        'Op welk rondje klik je om op internet te gaan? Rood, geel en groen met blauw in het midden is Chrome. Een blauwgroene golf is Edge. Een oranje vos is Firefox.',
        'Open die browser. Typ bovenin, waar je normaal een website typt: chromewebstore.google.com (Chrome), microsoftedge.microsoft.com/addons (Edge) of addons.mozilla.org (Firefox). Druk op Enter.',
        'Typ "Bitwarden" in de zoekbalk van die winkel. Klik op Bitwarden Password Manager.',
        'Klik op de grote knop: Toevoegen aan Chrome, Ophalen (Edge) of Toevoegen aan Firefox. Klik daarna nog eens op toevoegen.',
        'Klik rechtsboven op het puzzelstukje en dan op Bitwarden. Kies de EU. Log in met je e-mailadres en hoofdwachtwoord.',
      ] },
    ],
    na: [
      'Zet nu je e-mail in de kluis. Tik in Bitwarden op het plusteken (+). Vraagt de app wat voor soort? Kies Login.',
      'Typ bij de naam: Mijn e-mail. Typ bij de gebruikersnaam je e-mailadres. Typ bij het wachtwoord je nieuwe wachtwoord uit stap 1. Tik op Opslaan.',
      'Stap 1 overgeslagen? Laat het wachtwoord dan leeg en sla toch op. Je vult het later aan.',
      'Log je voortaan ergens in? Dan vraagt Bitwarden of hij het wachtwoord moet bewaren. Kies ja.',
    ],
    uitklap: [
      {
        vraag: 'Welke schermen zie ik als ik het account maak?',
        antwoord: [
          'Je maakt het account één keer, op het toestel waar je begint. Op je andere toestellen log je alleen in, met dezelfde regio: de EU.',
          'Krijg je een mail om je adres te bevestigen? Open je mail en klik op de knop of link in die mail. Ga dan terug naar Bitwarden.',
          'Vraagt Bitwarden om een hint voor je hoofdwachtwoord? Die mag je leeg laten. Zet er nooit je hoofdwachtwoord in.',
          'Op een nieuw toestel stuurt Bitwarden soms een code naar je e-mail. Typ die over.',
        ],
      },
      {
        vraag: 'Mag ik ook een andere kluis nemen?',
        antwoord: [
          'Ja. Proton Pass is ook gratis en werkt ook overal.',
          'Heb je alleen apparaten van Apple? Dan is de app Wachtwoorden op je iPhone ook goed.',
        ],
      },
      {
        vraag: 'Ik gebruik Safari op een Mac',
        antwoord: [
          'Installeer Bitwarden uit de App Store van je Mac.',
          'Kies daarna in het menu Safari voor Instellingen en dan Extensies. Zet Bitwarden aan.',
        ],
      },
    ],
    letOp: 'Schrijf je hoofdwachtwoord op papier en leg het thuis op een vaste, veilige plek. Ben je het kwijt, dan kan niemand je kluis openen. Ook Bitwarden niet.',
    gelukt: 'je Bitwarden op je telefoon opent en "Mijn e-mail" in de lijst ziet staan.',
    lukNiet: [
      'Kom je niet binnen op een tweede toestel? Kijk of je daar de EU koos, net als de eerste keer.',
      'Zie je "Mijn e-mail" niet op je telefoon? Sluit de app en open hem opnieuw.',
      'Zie je geen puzzelstukje? Houd je muis stil op de kleine pictogrammen rechtsboven. Er verschijnt een naam. Staat er Bitwarden? Klik erop.',
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
    gelukt: 'op je telefoon en Mac de schuifjes voor automatische updates aan staan. Op Windows staat er dat je up-to-date bent, en de updates staan niet op pauze.',
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
    gelukt: 'je telefoon om je nieuwe code vraagt als je hem uit en weer aan zet.',
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
    gelukt: 'iemand van je gezin het woord over een paar dagen nog weet. Vraag het gewoon.',
    lukNiet: [
      'Woont je familie ver weg? Spreek het woord af aan de telefoon of in een videogesprek. Typ het niet.',
      'Vindt iemand het overdreven? Leg uit dat een stem nagemaakt kan worden. Hulp bij dat gesprek staat in [Voor de mensen om je heen](/voor-de-mensen-om-je-heen).',
    ],
    klaar: 'Een nagemaakte stem kent het woord niet. Zo hoor je het verschil, ook als de stem echt klinkt.',
  },
};
