/**
 * Drie vragen aan het eind van elk hoofdstuk. Geen toets: je ziet meteen hoe het zit,
 * en er wordt niets opgeslagen. De uitleg bij elk antwoord komt uit het hoofdstuk zelf.
 * De sleutel is de slug van het hoofdstuk; een hoofdstuk zonder quiz krijgt er geen.
 * @typedef {{ tekst: string, goed?: boolean, uitleg: string }} Optie
 * @typedef {{ vraag: string, opties: Optie[] }} QuizVraag
 * @type {Record<string, QuizVraag[]>}
 */
export const QUIZZEN = {
  huischeck: [
    { vraag: 'Hoeveel Nederlanders gebruiken niet voor elk account een eigen wachtwoord?', opties: [
      { tekst: 'Ongeveer één op de vijf', uitleg: 'Het zijn er veel meer: 62 procent, volgens het CBS dat het aan ruim 33.000 mensen vroeg.' },
      { tekst: 'Ruim zes op de tien', goed: true, uitleg: '62 procent. Wie één sleutel op meer deuren gebruikt, verliest ze allemaal tegelijk zodra één bedrijf gehackt wordt.' },
      { tekst: 'Bijna iedereen', uitleg: 'Zo somber is het niet. Het is 62 procent — een meerderheid, maar geen iedereen.' },
    ] },
    { vraag: 'Wat doen de meeste Nederlanders wél goed?', opties: [
      { tekst: 'Een reservekopie maken van hun bestanden', uitleg: 'Juist niet: 57 procent maakt er hooguit soms een, en één op de zeven nooit.' },
      { tekst: 'Een code of vingerafdruk op al hun apparaten', goed: true, uitleg: 'Vier op de vijf hebben dat, en bijna drie op de vijf doen updates meteen. "Open huis" betekent niet dat er geen enkel slot op zit.' },
      { tekst: 'Overal een tweede slot op hun accounts', uitleg: 'Dat is juist het grootste gat: 73 procent heeft niet overal een tweede slot, en bij e-mail alleen is het driekwart.' },
    ] },
    { vraag: 'Wat betekent "open huis" op deze site?', opties: [
      { tekst: 'Er zit helemaal geen slot op je spullen', uitleg: 'Zo bedoeld is het niet. De meeste mensen hebben wel degelijk sloten; ze weten alleen niet welke deur nog openstaat.' },
      { tekst: 'Bij de meeste mensen staat minstens één deur open', goed: true, uitleg: 'En meestal weten ze niet welke. Daar gaat de huischeck over: hem vinden, niet hem tellen.' },
      { tekst: 'Je gegevens zijn openbaar op internet te vinden', uitleg: 'Dat is een ander onderwerp — wat er over je op je gevel staat, uit hoofdstuk 5.' },
    ] },
  ],

  plattegrond: [
    { vraag: 'Waarom is je e-mail de belangrijkste deur van je huis?', opties: [
      { tekst: 'Omdat daar je persoonlijke berichten in staan', uitleg: 'Dat ook, maar het is niet de reden. Het gaat om wat je met een mailbox kunt doen.' },
      { tekst: 'Omdat je er overal een nieuw wachtwoord mee kunt aanvragen', goed: true, uitleg: 'Wachtwoord vergeten? Dan komt er een mailtje. Wie in jouw e-mail kan, komt daarmee in bijna al je andere accounts.' },
      { tekst: 'Omdat je bank er berichten naartoe stuurt', uitleg: 'Die berichten zijn het probleem niet. Het herstellen van wachtwoorden is dat wel.' },
    ] },
    { vraag: 'Waar horen een slimme deurbel, camera of tv thuis in je netwerk?', opties: [
      { tekst: 'Gewoon op je eigen wifi, net als je laptop', uitleg: 'Ze zijn gemaakt om goedkoop te zijn, niet om veilig te zijn, en worden zelden bijgewerkt. Naast je laptop is geen goede plek.' },
      { tekst: 'Op een apart gastnetwerk', goed: true, uitleg: 'Kruipt er iemand door zo’n kattenluikje, dan staat hij in de schuur en niet in je woonkamer.' },
      { tekst: 'Alleen aan een kabel, nooit op wifi', uitleg: 'Het gaat niet om draad of lucht, maar om waar het apparaat bij kan als het wordt overgenomen.' },
    ] },
    { vraag: 'Waarom is je burgerservicenummer anders dan een wachtwoord?', opties: [
      { tekst: 'Omdat een BSN niet geheim hoeft te zijn', uitleg: 'Het hoeft niet geheim te blijven voor je werkgever of je bank, maar met je naam, geboortedatum en BSN kan iemand geld lenen op jouw naam.' },
      { tekst: 'Omdat je het nooit meer kunt veranderen', goed: true, uitleg: 'Een wachtwoord verander je in een minuut. Je BSN en je geboortedatum verander je nooit meer. Daarom is hier voorkomen het belangrijkst.' },
      { tekst: 'Omdat alleen de overheid het kent', uitleg: 'Het staat op meer plekken dan je denkt: op kopieën van je paspoort, bij instanties en in oude formulieren.' },
    ] },
  ],

  'inbrekers-van-nu': [
    { vraag: 'Je krijgt een bericht: "Hoi mam, ik heb een nieuw nummer en ik heb nu geld nodig." Wat doe je?', opties: [
      { tekst: 'Terugappen op het nieuwe nummer om het te controleren', uitleg: 'Dan controleer je de oplichter bij zichzelf. Het antwoord komt gewoon van hem.' },
      { tekst: 'Bellen op het oude nummer en vragen naar het geheime woord', goed: true, uitleg: 'Nieuw nummer, haast en geld tegelijk is het signaal. Een nagemaakte stem kent het geheime woord niet.' },
      { tekst: 'Een klein bedrag sturen, voor de zekerheid', uitleg: 'Elke overmaking bevestigt dat jij reageert. De vraag wordt daarna groter, niet kleiner.' },
    ] },
    { vraag: 'Wat is een datalek?', opties: [
      { tekst: 'Iemand heeft jouw computer gehackt', uitleg: 'Bij een datalek is er niet bij jou ingebroken, maar bij een bedrijf.' },
      { tekst: 'Een bedrijf waar jij een account hebt, is gehackt', goed: true, uitleg: 'Er is ingebroken bij de sleutelmaker, en die had een kopie van jouw sleutel. Op haveibeenpwned.com kun je zien of jouw adres in een bekend lek zit.' },
      { tekst: 'Je hebt per ongeluk te veel over jezelf gedeeld', uitleg: 'Dat is wat er op je gevel staat, uit hoofdstuk 5. Een datalek overkomt je zonder dat jij iets deed.' },
    ] },
    { vraag: 'Wat zorgt ervoor dat je bij ransomware nooit hoeft te betalen?', opties: [
      { tekst: 'Een goede virusscanner', uitleg: 'Die helpt, maar hij is geen garantie. Als je bestanden eenmaal op slot zitten, doet een scanner niets meer.' },
      { tekst: 'Een reservekopie die los staat van je computer', goed: true, uitleg: 'Heb je die, dan zet je alles gewoon terug. Een kopie die aan je computer vastzit, gaat mee op slot.' },
      { tekst: 'Snel de politie bellen', uitleg: 'Melden hoort erbij, maar het maakt je bestanden niet leesbaar. Alleen een losse kopie doet dat.' },
    ] },
  ],

  'inbrekers-van-morgen': [
    { vraag: 'Hoeveel geluid heeft een oplichter nodig om je stem na te maken?', opties: [
      { tekst: 'Een paar seconden uit een filmpje', goed: true, uitleg: 'Meer is het niet. Daarom staat in hoofdstuk 5 ook: wees zuinig met openbare filmpjes waarin je praat.' },
      { tekst: 'Een gesprek van een paar minuten', uitleg: 'Zoveel is allang niet meer nodig. Een paar seconden is genoeg.' },
      { tekst: 'Een uur aan opnames', uitleg: 'Dat was vroeger zo. Met AI kan het met een fragment uit een filmpje.' },
    ] },
    { vraag: 'Wat zet je niet in een chatbot zoals ChatGPT of Claude?', opties: [
      { tekst: 'Vragen waar je je voor schaamt', uitleg: 'Dat mag gerust. Het gaat niet om waar je je voor schaamt, maar om gegevens die niet van jou alleen zijn.' },
      { tekst: 'Wachtwoorden, je BSN en gegevens van andere mensen', goed: true, uitleg: 'Wat je intypt, gaat je huis uit. Kijk ook in de instellingen of het bedrijf je gesprekken gebruikt om het programma te trainen.' },
      { tekst: 'Niets; een chatbot is altijd onveilig', uitleg: 'Zo streng hoeft het niet. Het is een handige huisgenoot — je geeft hem alleen niet al je sleutels.' },
    ] },
    { vraag: 'Voor wie is "nu stelen, later openbreken" vooral een gevaar?', opties: [
      { tekst: 'Voor iedereen met een e-mailadres', uitleg: 'Voor je gewone post maakt het weinig uit. Het gaat om geheimen die over tien jaar nog geheim moeten zijn.' },
      { tekst: 'Voor geheimen die lang geheim moeten blijven', goed: true, uitleg: 'Van een land, een ziekenhuis of een bedrijf. Voor je boodschappenlijstje maakt het niets uit.' },
      { tekst: 'Voor mensen die hun updates niet doen', uitleg: 'Updates zijn wel je verdediging, maar dit gevaar gaat over gegevens die nu al gestolen en bewaard worden.' },
    ] },
  ],

  'aan-de-slag': [
    { vraag: 'Waarom helpt het al om "lastiger te zijn dan het huis ernaast"?', opties: [
      { tekst: 'Omdat inbrekers de hele straat afgaan en doorlopen bij een gesloten deur', goed: true, uitleg: 'Een computer voelt bij miljoenen huizen tegelijk aan de deur. Zit hij op slot, dan gaan ze naar de volgende.' },
      { tekst: 'Omdat je buren dan eerder aan de beurt zijn', uitleg: 'Zo werkt het niet letterlijk — het gaat erom dat de meeste aanvallen niemand in het bijzonder zoeken.' },
      { tekst: 'Omdat inbrekers geen tijd hebben', uitleg: 'Tijd hebben ze genoeg; het werk wordt door computers gedaan. Het gaat om moeite per huis.' },
    ] },
    { vraag: 'Wat is de 3-2-1-regel voor reservekopieën?', opties: [
      { tekst: 'Drie kopieën, op twee soorten opslag, één buiten je huis', goed: true, uitleg: 'En probeer één keer of je een bestand ook echt kunt terugzetten. Een kopie die je nooit hebt geprobeerd, is een aanname.' },
      { tekst: 'Drie keer per week, twee schijven, één cloud', uitleg: 'Het gaat niet over hoe vaak, maar over hoeveel kopieën en waar ze liggen.' },
      { tekst: 'Drie wachtwoorden, twee sloten, één sleutel', uitleg: 'Die getallen horen bij back-ups, niet bij sloten.' },
    ] },
    { vraag: 'Welke aanrader uit de gereedschapskist kost als enige geld?', opties: [
      { tekst: 'De wachtwoordmanager', uitleg: 'Bitwarden is gratis, en de kluis die al in je telefoon zit ook.' },
      { tekst: 'De fysieke sleutel', goed: true, uitleg: 'Een YubiKey of andere FIDO2-sleutel. Koop er meteen twee, want één sleutel is een onderdeel waar alles van afhangt.' },
      { tekst: 'De virusscanner', uitleg: 'De ingebouwde Windows Beveiliging is gratis, en op een Mac of telefoon heb je niets extra’s nodig.' },
    ] },
  ],

  onderhoud: [
    { vraag: 'Je verkoopt je oude telefoon. Wat moet je doen vóór je hem wist?', opties: [
      { tekst: 'Uitloggen bij je account en "zoek mijn toestel" uitzetten', goed: true, uitleg: 'Doe je dat niet, dan blijft het toestel aan jou vastzitten en kan de koper er niets mee. Let op: bij diefstal doe je juist het omgekeerde.' },
      { tekst: 'De simkaart erin laten zitten voor de nieuwe eigenaar', uitleg: 'Je simkaart en je geheugenkaartje horen eruit. Daar staat van alles op wat niet meeverhuist.' },
      { tekst: 'Alleen je foto’s verwijderen', uitleg: 'Veel te weinig. Het toestel gaat terug naar hoe het uit de fabriek kwam, ná een reservekopie.' },
    ] },
    { vraag: 'Je gooit alle bestanden van een usb-stick in de prullenbak en leegt die. Is de stick nu leeg?', opties: [
      { tekst: 'Ja, weg is weg', uitleg: 'De verwijzing is weg, de gegevens niet. Met gratis gereedschap zijn ze vaak gewoon terug te halen.' },
      { tekst: 'Nee, gebruik een wisprogramma of maak hem kapot', goed: true, uitleg: 'Dat zijn de twee zekere manieren. Hetzelfde geldt voor een losse harde schijf.' },
      { tekst: 'Nee, maar één keer opnieuw formatteren is genoeg', uitleg: 'Ook dat laat vaak nog van alles staan. Wissen of kapotmaken is het antwoord.' },
    ] },
    { vraag: 'Hoe vaak kijk je je huis na?', opties: [
      { tekst: 'Elke maand', uitleg: 'Dat houdt bijna niemand vol, en het hoeft ook niet.' },
      { tekst: 'Twee keer per jaar, als de klok wordt verzet', goed: true, uitleg: 'Vier dingen: loopt je reservekopie, kloppen je herstelcodes, welke apparaten krijgen geen updates meer, en sta je in een nieuw datalek.' },
      { tekst: 'Alleen als er iets misgaat', uitleg: 'Dan ben je te laat. Het punt van onderhoud is dat je het vóór de schade doet.' },
    ] },
  ],

  'als-er-is-ingebroken': [
    { vraag: 'Je bent opgelicht. Een week later belt iemand die je geld kan terughalen. Wat is dat?', opties: [
      { tekst: 'Waarschijnlijk je bank of een incassobureau', uitleg: 'Je bank belt niet met dit aanbod, en vraagt zeker niet om vooraf te betalen.' },
      { tekst: 'De tweede ronde van dezelfde oplichting', goed: true, uitleg: 'Wie één keer is opgelicht, staat op een lijst. Alleen je eigen bank en de politie helpen je.' },
      { tekst: 'De Fraudehelpdesk, die je zaak heeft opgepakt', uitleg: 'De Fraudehelpdesk adviseert en registreert, maar belt je niet op om je geld terug te halen.' },
    ] },
    { vraag: 'Waarom zou je oplichting melden, ook als je je geld toch niet terugkrijgt?', opties: [
      { tekst: 'Omdat je anders strafbaar bent', uitleg: 'Je bent nergens toe verplicht. Melden is iets anders dan moeten.' },
      { tekst: 'Omdat elke melding de volgende poging helpt stoppen', goed: true, uitleg: 'Schaamte beschermt de oplichter; melden beschermt de volgende. Daarom staat dat ook zo in dit hoofdstuk.' },
      { tekst: 'Omdat de verzekering het anders niet vergoedt', uitleg: 'Soms speelt dat mee, maar het is niet de reden die dit hoofdstuk geeft.' },
    ] },
    { vraag: 'Welke van deze drie heeft géén regeling voor als jou iets overkomt?', opties: [
      { tekst: 'Apple', uitleg: 'Apple heeft het erfeniscontact: die persoon krijgt een toegangssleutel en hoeft zelf geen Apple-apparaat te hebben.' },
      { tekst: 'Google', uitleg: 'Google heeft Inactiviteitsvoorkeuren (vroeger Inactief accountbeheer): je kiest hoe lang Google wacht, tot achttien maanden, voordat je contactpersonen worden ingelicht.' },
      { tekst: 'Microsoft', goed: true, uitleg: 'Microsoft heeft zo’n regeling niet. Daar ben je aangewezen op je noodpakket op papier.' },
    ] },
  ],

  'voor-de-mensen-om-je-heen': [
    { vraag: 'Je kind wordt gechanteerd met een foto. Wat is de belangrijkste boodschap vooraf?', opties: [
      { tekst: 'Betaal één keer, dan is het klaar', uitleg: 'Betalen stopt het niet; het bevestigt dat er iets te halen valt.' },
      { tekst: 'Nooit betalen, altijd vertellen, en je krijgt geen straf', goed: true, uitleg: 'Dat laatste is het belangrijkste deel. Een kind dat bang is voor straf, vertelt niet wat er is misgegaan.' },
      { tekst: 'Meteen alle sociale media verwijderen', uitleg: 'Begin met het gesprek, niet met het verbod. En bewaar het bewijs voordat je iets weggooit.' },
    ] },
    { vraag: 'Je maakt op je werk een fout waardoor gegevens van anderen op straat liggen. Hoe snel moet dat gemeld worden?', opties: [
      { tekst: 'Binnen 72 uur na ontdekking', goed: true, uitleg: 'Bij de Autoriteit Persoonsgegevens, als het een risico oplevert voor de mensen om wie het gaat. Dat lukt alleen als jij het meteen zegt.' },
      { tekst: 'Binnen een week', uitleg: 'Te laat. De wet noemt 72 uur na ontdekking.' },
      { tekst: 'Aan het eind van het kwartaal', uitleg: 'Dit is geen administratie maar een melding met een klok eraan: 72 uur.' },
    ] },
    { vraag: 'Je helpt je moeder met haar digitale huis. Wat plan je?', opties: [
      { tekst: 'Eén middag waarin jullie alles in één keer doen', uitleg: 'Probeer niet alles in één keer. Dat is precies waar zulke afspraken op stuklopen.' },
      { tekst: 'Een uur, koffie, en samen alleen niveau 1', goed: true, uitleg: 'Eén avond met vier sloten erbij is meer waard dan een perfect plan dat niemand uitvoert.' },
      { tekst: 'Je doet het zelf, dat gaat sneller', uitleg: 'Dan weet zij niet wat er veranderd is, en bij de eerste vraag staat alles stil. Samen doen is het punt.' },
    ] },
  ],

  'de-storm-om-het-huis': [
    { vraag: 'Wat wil een buitenlandse geheime dienst met jouw huis?', opties: [
      { tekst: 'Je vakantiefoto’s en je berichten lezen', uitleg: 'Daar is geen dienst in geïnteresseerd. Toch raakt het je, op drie manieren.' },
      { tekst: 'Meestal niets, maar je huis kan een schuilplaats zijn', goed: true, uitleg: 'Hackers van staten gebruiken gekaapte routers van gewone mensen als dekmantel. De Amerikaanse overheid haalde in 2024 zo’n netwerk uit de lucht: bijna allemaal oude routers zonder updates.' },
      { tekst: 'Je bankrekening leeghalen', uitleg: 'Dat is het werk van criminelen, niet van een staat. Al huren staten die criminelen soms wél in.' },
    ] },
    { vraag: '97 procent van de aanvallen op accounts is gewoon wachtwoorden raden. Wat houdt daarvan 99 procent tegen?', opties: [
      { tekst: 'Een langer wachtwoord', uitleg: 'Dat helpt, maar het is niet het cijfer dat Microsoft noemt.' },
      { tekst: 'Een tweede slot dat niet te phishen is, zoals een passkey', goed: true, uitleg: 'Dat is het hele punt van de ladder: vanaf trede 6 is er niets meer dat je kunt overtypen aan een oplichter.' },
      { tekst: 'Een virusscanner', uitleg: 'Die kijkt naar wat er op je computer draait, niet naar wie er bij een dienst probeert in te loggen.' },
    ] },
    { vraag: 'Wat heb je níet nodig tegen de dreiging van staten?', opties: [
      { tekst: 'Een "militaire" VPN of een speciale telefoon', goed: true, uitleg: 'Wie dat aan gewone mensen verkoopt, verkoopt angst. Het NCSC adviseert al jaren hetzelfde: doe de basis goed.' },
      { tekst: 'Updates op automatisch', uitleg: 'Die heb je juist wél nodig. Het Openbaar Ministerie lag wekenlang plat door een gat dat nog niet gerepareerd was.' },
      { tekst: 'Een noodpakket op papier', uitleg: 'Dat heb je juist wél nodig: ligt je gemeente plat of valt DigiD uit, dan wil je niet stilvallen.' },
    ] },
  ],

  'van-geheim-woord-naar-zegelring': [
    { vraag: 'Waar op de ladder verandert de aard van de beveiliging echt?', opties: [
      { tekst: 'Tussen trede 2 en 3, als de kluis erbij komt', uitleg: 'Dat is een grote stap vooruit, maar je beschermt jezelf nog steeds met iets wat je kunt navertellen.' },
      { tekst: 'Tussen trede 5 en 6', goed: true, uitleg: 'Tot en met trede 5 is het iets wat je kunt navertellen; vanaf trede 6 iets wat je vast moet houden. De rest zijn verbeteringen binnen dezelfde soort.' },
      { tekst: 'Tussen trede 7 en 8, bij de tweede sleutel', uitleg: 'Trede 8 is niet sterker dan 7. Het is de enige trede waar je niet buitengesloten raakt.' },
    ] },
    { vraag: 'Een site die met passkeys werkt, wordt gehackt. Wat vindt de inbreker van jou?', opties: [
      { tekst: 'Je wachtwoord in versleutelde vorm', uitleg: 'Dat vindt hij bij een site die met wachtwoorden werkt. Daar gaan kraakprogramma’s dagenlang overheen.' },
      { tekst: 'Alleen een afbeelding van hoe je zegel eruitziet', goed: true, uitleg: 'En met een afbeelding van een zegel kun je geen zegel drukken. De buit is letterlijk waardeloos.' },
      { tekst: 'Je passkey, waarmee hij overal kan inloggen', uitleg: 'Je passkey is er nooit geweest. De geheime helft verlaat je apparaat niet; de site kreeg alleen de publieke helft.' },
    ] },
    { vraag: 'Wat is bij accounts bijna altijd de zwakste schakel?', opties: [
      { tekst: 'Het wachtwoord', uitleg: 'Vaak zwak, maar niet de zwakste. Er is een deur die de voordeur overbodig maakt.' },
      { tekst: 'De herstelprocedure', goed: true, uitleg: 'Wie die achterdeur weet te forceren, hoeft de voordeur niet meer. Daarom bewaar je herstelcodes zorgvuldig, en nooit binnen de dienst die ze moeten redden.' },
      { tekst: 'De tweestapsverificatie', uitleg: 'Die maakt het juist sterker. Het gat zit bij de procedure die je binnenlaat als je jezelf hebt buitengesloten.' },
    ] },
  ],
};

/** De quiz van één hoofdstuk; een hoofdstuk zonder quiz krijgt een lege lijst. */
export function quiz(slug) {
  return QUIZZEN[slug] ?? [];
}
