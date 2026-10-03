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
      'Kijk eerst welke aansluiting je computer heeft. Kijk naar de gaatjes aan de zijkant. Klein en ovaal, aan beide kanten rond? Dat is USB-C. Groter en rechthoekig? Dat is USB-A.',
      'Kijk dan naar het gaatje voor de oplader van je telefoon. Een oudere iPhone heeft vaak Lightning: klein, smal en plat. Lightning is geen USB-C.',
      'Koop twee sleutels van hetzelfde soort, bijvoorbeeld twee YubiKeys. Kies er een met de aansluiting van je computer.',
      'Staat er NFC bij? NFC betekent: je houdt de sleutel tegen je telefoon, zoals je met je bankpas tegen de kassa houdt. Dan werkt hij ook met je telefoon. Dat werkt ook bij een iPhone met Lightning.',
      'Je koopt ze in een computerwinkel of op yubico.com. Twijfel je? Neem je telefoon mee naar de winkel en zeg: "Ik wil twee beveiligingssleutels voor deze computer en deze telefoon."',
      'Zet de sleutels eerst op je e-mail. Open hieronder "Een sleutel toevoegen, stap voor stap".',
      'Doe daarna hetzelfde bij Bitwarden. Kan je mail geen sleutel aan, zoals bij KPN of Ziggo? Begin dan bij Bitwarden.',
      'Hang de ene sleutel aan je sleutelbos. Leg de andere bij je noodpakket.',
    ],
    uitklap: [
      { vraag: 'Een sleutel toevoegen, stap voor stap', antwoord: [
        'Houd beide sleutels bij de hand. Steek ze nog niet in je computer.',
        'Log op je computer in op de website van je e-mail. Ga naar de beveiliging, net als bij het tweede slot in [niveau 1](/een-avond#stap-mail-tweede-slot).',
        'Zoek naar "beveiligingssleutel" of "passkey". Kies om er een toe te voegen.',
        'Vraagt de site welk soort? Kies beveiligingssleutel, of een "extern apparaat". Niet je telefoon.',
        'Je browser vraagt nu om de sleutel. Steek hem nu pas in je computer.',
        'Op de sleutel zit een metalen plekje of een knopje. Raak het aan met je vinger. Vraagt je browser om een pincode voor de sleutel? Bedenk er een en schrijf hem op voor je envelop.',
        'Geef de sleutel een naam, bijvoorbeeld "sleutelbos". Haal hem eruit.',
        'Doe meteen hetzelfde met de tweede sleutel. Noem die "reserve".',
        'Zie je bij de beveiliging nu twee sleutels staan? Dan is het goed.',
      ] },
      { vraag: 'Ik heb alleen een telefoon', antwoord: [
        'Dat kan als je sleutel NFC heeft, of past in het gaatje van je telefoon.',
        'Open de website van je e-mail in de browser van je telefoon, niet in de Mail-app. Ga naar de beveiliging en kies om een beveiligingssleutel toe te voegen.',
        'Vraagt je telefoon om de sleutel? Houd hem plat tegen de achterkant van je telefoon, of steek hem in het gaatje. Raak het knopje aan als de sleutel dat vraagt.',
        'Doe hetzelfde met de tweede sleutel.',
        'Lukt het niet op je telefoon? Stop dan. Doe het later op een computer, ook als die van iemand anders is. Log daar na afloop uit.',
      ] },
      { vraag: 'Een sleutel op Bitwarden', antwoord: [
        'Ga in je browser naar vault.bitwarden.com en log in. Dat kan op de computer en op je telefoon.',
        'Kies Instellingen, dan Beveiliging, dan Tweestapsaanmelding. Kies passkey of beveiligingssleutel. Staat er dat dit alleen met een betaald account kan? Sla Bitwarden dan over.',
        'Je browser vraagt om de sleutel. Steek hem in je computer, of houd hem plat tegen de achterkant van je telefoon. Raak het knopje aan. Geef hem een naam. Doe hetzelfde met de tweede sleutel.',
        'Kies Bekijk herstelcode. Schrijf hem op voor je envelop, zoals in [niveau 2](/een-weekend#stap-noodcodes).',
        'Log je daarna in op de Bitwarden-app van je telefoon? Dan vraagt de app om je sleutel. Houd hem tegen de achterkant tot hij reageert. Bij een iPhone is dat bovenaan, bij de camera.',
      ] },
    ],
    gelukt: 'Log uit en weer in. Vraagt de site om je sleutel, en lukt het met allebei? Dan staan ze er goed op.',
    lukNiet: [
      'Kan een dienst niet met een sleutel? Houd daar je code-app of passkey.',
      'Eén sleutel kwijt? Log in met de reserve en haal de kwijte sleutel weg uit je account. Koop daarna een nieuwe reserve.',
    ],
    gereedschap: ['yubikey'],
    klaar: 'Je hebt het sterkste slot dat er is. Zonder dat sleuteltje in de hand komt niemand erin, ook niet met je wachtwoord.',
  },
  'alias': {
    wat: 'Zo’n apart adres heet een alias. Het stuurt alles door naar je echte adres. Krijg je ineens rommel op één alias? Dan weet je welk bedrijf je gegevens heeft gelekt.',
    hoe: [
      'Neem SimpleLogin, van Proton. Dat is gratis voor een handvol aliassen.',
      'De site is in het Engels. Elke Engelse knop staat hieronder met de betekenis erbij.',
      'Ga naar simplelogin.io. Klik op Sign up (account maken). Typ je echte e-mailadres: daar komt alle mail van je aliassen binnen.',
      'Laat Bitwarden het wachtwoord maken en bewaren, zoals in [niveau 2](/een-weekend#stap-accounts-wachtwoord).',
      'Klik op de link in de mail die je krijgt. Zo bevestig je je adres.',
      'Schrijf je je in bij een webwinkel? Log in bij SimpleLogin. Klik op Random Alias (een willekeurig adres). Dan hoef je geen naam te bedenken.',
      'Het nieuwe adres staat bovenaan de lijst. Klik op Copy (kopiëren). Plak het bij de webwinkel, op de plek van je e-mailadres.',
      'Voor je bank en DigiD houd je je echte adres.',
    ],
    uitklap: [
      { vraag: 'Ik heb een iPhone met betaald iCloud+', antwoord: [
        'Dan kun je ook Verberg mijn e-mail van Apple gebruiken.',
        'Open Instellingen, tik bovenaan op je naam en dan op iCloud. Tik op Verberg mijn e-mail en maak een nieuw adres aan.',
      ] },
      { vraag: 'Zijn er andere diensten?', antwoord: ['Ja. DuckDuckGo Email Protection is ook gratis. Het werkt op dezelfde manier.'] },
    ],
    gelukt: 'Vraag iemand anders om een mail naar je alias te sturen. Komt die aan in je gewone mailbox? Dan werkt het. Zelf sturen vanaf je eigen adres werkt niet altijd.',
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
      'Zet eerst het gastnetwerk aan. Wil je niet zelf in je router? Bel je provider en vraag: "Wilt u het gastnetwerk op mijn router aanzetten?" Schrijf de naam en het wachtwoord op die je krijgt.',
      'Zelf doen? Log in op je router, zoals in [niveau 2](/een-weekend#stap-router). Zoek "gastnetwerk", zet het aan en geef het een eigen naam en wachtwoord.',
      'Zet daarna je slimme apparaten één voor één over naar het gastnetwerk: je tv, je camera, je deurbel, je slimme lampen. Hoe dat gaat, staat hieronder.',
      'Je laptop en je telefoon blijven op je gewone netwerk.',
    ],
    uitklap: [
      { vraag: 'Een apparaat op het gastnetwerk zetten', antwoord: [
        'Een tv: open met de afstandsbediening de instellingen. Zoek "netwerk" of "wifi". Kies je gastnetwerk en typ het wachtwoord.',
        'Een deurbel, camera of lamp: open de app van dat apparaat. Zoek "wifi" of "netwerk" en kies het gastnetwerk.',
        'Kun je de wifi daar niet veranderen? Kijk dan in de handleiding of op de site van de maker. Soms moet je het apparaat opnieuw instellen.',
        'Lukt het niet? Laat dat apparaat op je gewone netwerk.',
      ] },
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
    wat: 'Een VPN is een app die je verbinding met internet afschermt. Zie het als een overdekte gang naar buiten.',
    hoe: [
      'Neem Proton VPN. Dat is gratis. Mullvad is ook goed, en kost een paar euro per maand.',
      'Installeer Proton VPN uit de App Store of de Play Store. Op je laptop ga je naar protonvpn.com en kies je de download.',
      'Open de app. Je moet een account maken, met je e-mailadres en een wachtwoord. Laat Bitwarden het wachtwoord maken en bewaren. Heb je al een account bij Proton? Log daarmee in.',
      'Tik op de knop om te verbinden. Vraagt je telefoon om een VPN-configuratie toe te voegen? Dat is normaal. Kies Sta toe (iPhone) of OK (Android).',
      'Zet de VPN aan op de wifi van een ander: in de trein, een hotel of een café. Thuis hoeft het niet.',
    ],
    gelukt: 'In de app staat dat je verbonden bent.',
    lukNiet: [
      'Werkt een site niet met de VPN aan? Kies in de app een ander land, zoals Nederland. Of zet de VPN even uit.',
      'Gebruik geen andere gratis VPN. Veel daarvan verdienen aan wat jij doet.',
    ],
    gereedschap: [],
    klaar: 'Onderweg loop je nu door een overdekte gang. Wie op dezelfde wifi zit, ziet niet waar je naartoe gaat.',
  },
  'opruiming': {
    hoe: [
      'Loop de accounts in je wachtwoordmanager door. Gebruik je er een niet meer? Log in en zoek "account verwijderen".',
      'Log je ergens in met Google? Ga naar myaccount.google.com en dan naar Beveiliging. Kijk bij je verbindingen met apps en services. Haal weg wat je niet kent of niet gebruikt.',
      'Met Facebook: ga naar Instellingen en kijk bij Apps en websites.',
      'Kijk op je telefoon welke apps je al een jaar niet hebt geopend. Verwijder ze.',
      'Kijk op haveibeenpwned.com of je e-mailadres in een bekend datalek zit. De site is in het Engels. Typ je e-mailadres in het vak en klik op de knop ernaast.',
      'Een groene melding betekent: geen lek gevonden. Je hoeft niets te doen.',
      'Een rode melding met "pwned" betekent: je adres zit in een lek. Schrik niet, dat komt heel vaak voor. Eronder staat per lek de naam van de site.',
      'Geef elke site uit die lijst een nieuw wachtwoord uit je kluis, zoals in [niveau 2](/een-weekend#stap-accounts-wachtwoord). Gebruikte je dat wachtwoord ook ergens anders? Verander het daar ook.',
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
    wat: 'Een profiel is een aparte kamer in je browser, met eigen bladwijzers en eigen logins. Wat je in de ene kamer doet, ziet de andere niet.',
    hoe: [],
    toestellen: [
      { naam: 'In Chrome of Edge', stappen: [
        'Klik rechtsboven op het rondje met je foto of letter.',
        'Kies Toevoegen en volg de stappen. Er gaat een nieuw venster open.',
        'Wisselen doe je op dezelfde plek: klik op het rondje en kies het andere profiel.',
      ] },
      { naam: 'In Firefox', stappen: [
        'Klik bovenin, in de adresbalk. Typ about:profiles en druk op Enter.',
        'Klik op Nieuw profiel aanmaken en volg de stappen.',
        'Wisselen doe je op dezelfde pagina: typ weer about:profiles en klik bij het andere profiel op de knop om het te starten.',
      ] },
    ],
    na: [
      'Noem het ene profiel Werk en het andere Thuis.',
      'Log in elk profiel alleen in op wat erbij hoort. Zet Bitwarden in allebei.',
    ],
    gelukt: 'Je hebt twee browservensters, elk met een eigen profiel. In het ene ben je ingelogd voor je werk, in het andere niet.',
    lukNiet: ['Weet je niet meer welk profiel welk is? Geef ze elk een eigen kleur of thema.'],
    gereedschap: ['firefox'],
    klaar: 'Werk en thuis hebben elk hun eigen kamer. Ze kijken niet meer bij elkaar naar binnen.',
  },
};
