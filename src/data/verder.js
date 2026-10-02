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
      'Kijk dan naar je telefoon, naar het gaatje waar de oplader in gaat. Heb je een iPhone van een paar jaar oud? Dan is dat vaak Lightning: ook klein, maar smal en plat. Lightning is geen USB-C. Twijfel je? Neem je oplader mee naar de winkel.',
      'Koop twee sleutels van hetzelfde soort, bijvoorbeeld twee YubiKeys. Kies er een met de aansluiting van je computer.',
      'Staat er NFC bij? NFC betekent: je houdt de sleutel tegen je telefoon, zoals je met je bankpas tegen de kassa houdt. Dan werkt hij ook met je telefoon. Dat werkt ook bij een iPhone met Lightning.',
      'Je koopt ze in een computerwinkel, of op de site van de maker, yubico.com. Die site is in het Engels. Twijfel je welke? Vraag het in de winkel en zeg: "Ik wil twee beveiligingssleutels voor deze computer en deze telefoon." Neem je telefoon mee.',
      'Zet de sleutels eerst op je e-mail. Vind je bij je maildienst geen plek voor een sleutel? Dat kan bij KPN- of Ziggo-mail. Begin dan bij je wachtwoordmanager, en sla je e-mail over. Hoe dat gaat, staat hieronder bij "Een sleutel toevoegen, stap voor stap". Doe het op je computer.',
      'Doe daarna hetzelfde bij je wachtwoordmanager. Bij Bitwarden doe je dit op de website, vault.bitwarden.com. Zoek bij Instellingen, Beveiliging naar Tweestapsaanmelding.',
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
      'Neem SimpleLogin, van Proton. Dat is gratis voor een handvol aliassen.',
      'De site van SimpleLogin is in het Engels. De woorden die je nodig hebt, staan hieronder.',
      'Ga in je browser naar simplelogin.io. Klik op Sign up: dat betekent een account maken. Gebruik je echte e-mailadres. Daar komt straks alle mail van je aliassen binnen.',
      'Laat Bitwarden een wachtwoord maken voor dit nieuwe account, net als in [niveau 2](/een-weekend#stap-accounts-wachtwoord). Laat Bitwarden het bewaren.',
      'Je krijgt een mail om je adres te bevestigen. Klik op de link in die mail.',
      'Schrijf je je in bij een webwinkel of nieuwsbrief? Log in bij SimpleLogin. Klik op de knop om een nieuwe alias te maken. Het woord alias staat erop. Kies een willekeurige alias (random), dan hoef je geen naam te bedenken.',
      'Kopieer het nieuwe adres. Plak het bij de webwinkel, op de plek van je e-mailadres.',
      'Gebruik aliassen niet voor je bank of DigiD. Daar blijft je echte adres staan.',
    ],
    uitklap: [
      { vraag: 'Ik heb een iPhone met betaald iCloud+', antwoord: [
        'Dan kun je ook Verberg mijn e-mail van Apple gebruiken.',
        'Open Instellingen, tik bovenaan op je naam en dan op iCloud. Tik op Verberg mijn e-mail en maak een nieuw adres aan.',
      ] },
      { vraag: 'Zijn er andere diensten?', antwoord: ['Ja. DuckDuckGo Email Protection is ook gratis. Het werkt op dezelfde manier.'] },
    ],
    gelukt: 'Vraag iemand anders om een mail naar je nieuwe alias te sturen. Komt die aan in je gewone mailbox? Dan werkt het. Stuur hem niet zelf vanaf je eigen adres: dan zie je hem soms alleen bij Verzonden.',
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
      'Dit is een klus voor wie het leuk vindt. Vind je het te veel gedoe? Sla hem gerust over.',
      'Zet eerst het gastnetwerk aan. Wil je niet zelf in je router? Bel je provider en vraag: "Wilt u het gastnetwerk op mijn router aanzetten?" Schrijf de naam en het wachtwoord op die je krijgt.',
      'Doe je het zelf? Log in op je router, net als in [niveau 2](/een-weekend#stap-router). Zoek "gastnetwerk" en zet het aan. Geef het een eigen naam en een eigen wachtwoord.',
      'Zet daarna je slimme apparaten één voor één over naar het gastnetwerk: je tv, je camera, je deurbel, je slimme lampen. Hoe dat gaat, staat hieronder.',
      'Je laptop en je telefoon blijven op je gewone netwerk.',
    ],
    uitklap: [
      { vraag: 'Mijn tv op het gastnetwerk zetten', antwoord: [
        'Pak de afstandsbediening en open de instellingen van je tv.',
        'Zoek naar "netwerk" of "wifi".',
        'Kies de naam van je gastnetwerk. Typ het wachtwoord van het gastnetwerk.',
      ] },
      { vraag: 'Een deurbel, camera of lamp op het gastnetwerk zetten', antwoord: [
        'Deze apparaten stel je in met hun eigen app op je telefoon.',
        'Open die app en zoek bij het apparaat naar "wifi" of "netwerk". Kies het gastnetwerk.',
        'Kun je de wifi daar niet veranderen? Kijk dan in de handleiding of op de site van de maker. Soms moet je het apparaat opnieuw instellen.',
        'Lukt het niet? Laat dat apparaat dan op je gewone netwerk. Elk apparaat dat wel overgaat, telt.',
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
    wat: 'Een VPN is een app die een afgeschermde verbinding maakt tussen jou en het internet. Zie het als een overdekte gang naar buiten.',
    hoe: [
      'Neem Proton VPN. Dat is gratis. Mullvad is ook goed, en kost een paar euro per maand.',
      'Installeer Proton VPN uit de App Store of de Play Store. Op je laptop ga je naar protonvpn.com en kies je de download.',
      'Open de app. Je moet een account maken, met je e-mailadres en een wachtwoord. Laat Bitwarden het wachtwoord maken en bewaren. Heb je al een account bij Proton, bijvoorbeeld van SimpleLogin of Proton Mail? Dan log je daarmee in.',
      'Tik op de knop om te verbinden. Op een iPhone vraagt je telefoon nu om een VPN-configuratie toe te voegen. Dat is normaal: zo mag de app de afgeschermde verbinding maken. Kies Sta toe en typ je code. Op Android vraagt je telefoon iets vergelijkbaars. Kies OK.',
      'Zet de VPN aan als je op de wifi van een ander zit: in de trein, in een hotel of in een café.',
      'Thuis hoeft hij niet aan. Daar is je eigen wifi al afgeschermd.',
    ],
    gelukt: 'In de app staat dat je verbonden bent.',
    lukNiet: [
      'Werkt een site niet met de VPN aan? Zet de VPN dan even uit, en daarna weer aan. Of kies in de app een andere server. Een server is de plek waar je verbinding naar buiten gaat. In de app staat een lijst met landen. Kies Nederland of een land dichtbij.',
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
      'Kijk op haveibeenpwned.com of je e-mailadres in een bekend datalek zit. De site is in het Engels. Typ je e-mailadres in het vak en klik op de knop ernaast.',
      'Zit je adres in een lek? Schrik niet: dat komt heel vaak voor. Je ziet onder de melding welke sites zijn gelekt. Heb je bij die sites nog een oud wachtwoord? Geef het een nieuw wachtwoord uit je kluis, zoals in [niveau 2](/een-weekend#stap-accounts-wachtwoord). Gebruikte je dat wachtwoord ook ergens anders? Verander het daar ook.',
      'Zit je adres in geen enkel lek? Dan zie je een groene melding. Je hoeft niets te doen.',
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
      'Log in elk profiel alleen in op wat daarbij hoort. Zet Bitwarden in allebei.',
    ],
    gelukt: 'Je hebt twee browservensters, elk met een eigen profiel. In het ene ben je ingelogd voor je werk, in het andere niet.',
    lukNiet: ['Weet je niet meer welk profiel welk is? Geef ze elk een eigen kleur of thema.'],
    gereedschap: ['firefox'],
    klaar: 'Werk en thuis hebben elk hun eigen kamer. Ze kijken niet meer bij elkaar naar binnen.',
  },
};
