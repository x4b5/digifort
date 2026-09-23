/**
 * De bronnenlijst: elke feitelijke bewering op de site met de bron ernaast.
 * Eén bron: de tabel op /bronnen komt hieruit.
 *
 * `hoofdstuk` is een lijst slugs uit HOOFDSTUKKEN (site.js), zodat titel en nummer
 * daar vandaan komen en hier niet nog eens staan.
 * `bron` en `toelichting` zijn lijstjes van stukjes tekst; een stukje met `href`
 * wordt een link, een stukje zonder href blijft gewone tekst.
 * `status`: 'gecontroleerd' = bron geopend en hij ondersteunt de bewering.
 *           'nog-koppelen'  = de bron bestaat, maar de precieze pagina moet nog opgezocht.
 */

/** @typedef {{ tekst: string, href?: string }} Stukje */
/** @typedef {{ hoofdstuk: string[], bewering: string, bron: Stukje[], status: 'gecontroleerd'|'nog-koppelen', toelichting?: Stukje[] }} Bron */

/** @type {Bron[]} */
export const BRONNEN = [
  {
    hoofdstuk: ['huischeck', 'inbrekers-van-nu'],
    bewering: 'Ongeveer 2,5 miljoen Nederlanders van 15 jaar en ouder (bijna 17 procent) waren in 2025 slachtoffer van online criminaliteit; de stijging komt vooral door online oplichting',
    bron: [{ tekst: 'CBS, Veiligheidsmonitor 2025, hoofdstuk 6', href: 'https://www.cbs.nl/nl-nl/longread/rapportages/2026/veiligheidsmonitor-2025/6-online-criminaliteit' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['huischeck'],
    bewering: 'Bij de meeste mensen staat minstens één deur open: 62 procent gebruikt niet voor elk account een eigen wachtwoord, 73 procent heeft niet overal een tweede slot, 42 procent doet updates niet meteen, 57 procent maakt hooguit soms een reservekopie en 15 procent nooit. Daartegenover: 81 procent heeft een code op alle apparaten',
    bron: [{ tekst: 'CBS, Online Veiligheid en Criminaliteit 2024, tabel 3.4.1', href: 'https://www.cbs.nl/nl-nl/longread/rapportages/2025/online-veiligheid-en-criminaliteit-2024?onepage=true' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Enquête augustus–oktober 2024, ruim 33.000 personen van 15 jaar en ouder. CBS meet wie het wél doet; de percentages op deze site zijn daarvan het spiegelbeeld' }],
  },
  {
    hoofdstuk: ['huischeck', 'aan-de-slag'],
    bewering: 'Driekwart van de gebruikers zet geen tweestapsverificatie op e-mail (65-plus: 88 procent); 51 procent denkt dat een wachtwoord alleen genoeg is; bij ruim driekwart van de online criminaliteit wordt een gestolen wachtwoord misbruikt',
    bron: [{ tekst: 'Rijksoverheid, 12 november 2025', href: 'https://www.rijksoverheid.nl/actueel/nieuws/2025/11/12/nederlanders-zetten-online-de-deur-open-voor-criminelen-driekwart-gebruikers-stelt-geen-tweestapsverificatie-in-voor-e-mail' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Onderzoek van Motivaction in opdracht van de Rijksoverheid, oktober 2025, 1.048 respondenten van 18 jaar en ouder plus 822 van 65 jaar en ouder' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: `Het verhaal van Mat Honan (augustus 2012): via de klantenservice van Amazon kwam een aanvaller aan de laatste vier cijfers van een creditcard, waarmee de klantenservice van Apple hem als Honan accepteerde; binnen een uur vielen zijn Apple-, Gmail- en Twitter-account, en werden zijn telefoon, tablet en laptop op afstand gewist, inclusief ruim een jaar aan foto's die nergens anders stonden`,
    bron: [
      { tekst: 'IEEE Spectrum, 7 augustus 2012', href: 'https://spectrum.ieee.org/amazon-apple-and-google-security-lapses-lead-to-takeover-of-tech-journalists-online-persona' },
      { tekst: 'Honans eigen verslag: Wired, 6 augustus 2012', href: 'https://www.wired.com/2012/08/apple-amazon-mat-honan-hacking/' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: `Gecontroleerd bij IEEE Spectrum: datum, volgorde van de accounts, het uur en het verlies van de foto's. Honans eigen zin over tweestapsverificatie ("it's possible that none of this would have happened") is voorzichtig geformuleerd; de tekst op deze site neemt die voorzichtigheid over. Het Wired-artikel zelf is niet opnieuw geopend bij deze controle` }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Bijna een kwart van de slachtoffers houdt er emotionele, psychische of financiële problemen aan over',
    bron: [{ tekst: 'CBS, Online Veiligheid en Criminaliteit 2024', href: 'https://www.cbs.nl/nl-nl/longread/rapportages/2025/online-veiligheid-en-criminaliteit-2024?onepage=true' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['inbrekers-van-morgen'],
    bewering: 'Criminelen gebruiken AI om de schaal en efficiëntie van hun werk te vergroten, met op maat gemaakte oplichting en deepfakes',
    bron: [{ tekst: 'Europol, IOCTA 2025: Steal, deal and repeat', href: 'https://www.europol.europa.eu/publication-events/main-reports/steal-deal-and-repeat-how-cybercriminals-trade-and-exploit-your-data' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['inbrekers-van-morgen'],
    bewering: 'Een stem klonen kan met een kort geluidsfragment, en de programma\'s kosten weinig of niets',
    bron: [
      { tekst: 'Consumer Reports, AI Voice Cloning, 10 maart 2025 (pdf)', href: 'https://innovation.consumerreports.org/AI-Voice-Cloning-Report-.pdf' },
      { tekst: 'Federal Trade Commission, consumentenwaarschuwing, 20 maart 2023', href: 'https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Consumer Reports (een Amerikaanse consumentenorganisatie zonder winstoogmerk) probeerde tussen september 2024 en januari 2025 bij zes aanbieders een stem te klonen met openbaar geluid: vier kostten niets, de andere 1 en 5 dollar. Eerder stond hier "enkele seconden", op gezag van beveiligingsbedrijf Group-IB; geen neutrale bron noemt een aantal seconden, dus de tekst zegt nu "een kort stukje"' }],
  },
  {
    hoofdstuk: ['inbrekers-van-morgen'],
    bewering: 'Sinds augustus 2024 bestaan er officiële standaarden voor kwantumbestendige versleuteling (FIPS 203, 204 en 205)',
    bron: [{ tekst: 'NIST, persbericht 13 augustus 2024', href: 'https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['inbrekers-van-morgen'],
    bewering: 'Experts verwachten dat kwantumcomputers tussen 2030 en 2040 veel gangbare versleuteling kunnen breken; de kans dat het in 2030 al zover is, is klein maar reëel',
    bron: [
      { tekst: 'AIVD en NCSC, handreiking Maak je organisatie quantumveilig', href: 'https://www.aivd.nl/actueel/nieuws/2023/09/18/handreiking-maak-je-organisatie-quantumveilig-gepubliceerd' },
      { tekst: 'AIVD, lancering PQC-migratiehandboek', href: 'https://www.aivd.nl/actueel/nieuws/2023/04/04/lancering-handboek-voor-overstap-naar-quantumveilige-communicatie' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['inbrekers-van-morgen'],
    bewering: 'Versleutelde gegevens kunnen nu worden onderschept en later met een kwantumcomputer ontcijferd; dit raakt gegevens die lang gevoelig blijven',
    bron: [
      { tekst: 'Zelfde AIVD-bericht over het handboek' },
      { tekst: 'AIVD, Bereid je voor op de dreiging van quantumcomputers', href: 'https://www.aivd.nl/documenten/publicaties/2021/09/23/bereid-je-voor-op-de-dreiging-van-quantumcomputers' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['aan-de-slag'],
    bewering: 'De volledige uBlock Origin werkt niet meer in Chrome; Firefox blijft hem ondersteunen',
    bron: [
      { tekst: 'Heise, uBlock Origin discontinues Chrome version', href: 'https://www.heise.de/en/news/uBlock-Origin-discontinues-Chrome-version-and-recommends-Firefox-9824754.html?view=print' },
      { tekst: 'PCWorld, 13 augustus 2026', href: 'https://www.pcworld.com/article/3212428/' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['aan-de-slag'],
    bewering: 'Lengte maakt een wachtwoord sterker dan ingewikkelde tekens',
    bron: [{ tekst: 'NIST SP 800-63B, Digital Identity Guidelines, §5.1.1 en bijlage A', href: 'https://pages.nist.gov/800-63-3/sp800-63b.html' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['aan-de-slag'],
    bewering: 'Passkeys zijn bestand tegen phishing omdat ze aan het echte webadres gebonden zijn',
    bron: [
      { tekst: 'FIDO Alliance, Passkeys', href: 'https://fidoalliance.org/passkeys/' },
      { tekst: 'Passkey Central, The journey to prevent phishing', href: 'https://www.passkeycentral.org/passkey-roll-out-guides/prevent-phishing/' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['aan-de-slag'],
    bewering: 'De 3-2-1-regel voor back-ups',
    bron: [{ tekst: 'veiliginternetten.nl, Hoe zorg ik voor een veilige back-up?', href: 'https://veiliginternetten.nl/thema/basisbeveiliging/hoe-maak-ik-veilige-back-up/' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'De site adviseert een kopie op een losse schijf én in de cloud; de naam "3-2-1" komt uit de IT-praktijk' }],
  },
  {
    hoofdstuk: ['voor-de-mensen-om-je-heen'],
    bewering: 'Een datalek met risico voor betrokkenen moet binnen 72 uur na ontdekking bij de Autoriteit Persoonsgegevens worden gemeld',
    bron: [
      { tekst: 'AVG artikel 33' },
      { tekst: 'Autoriteit Persoonsgegevens, Datalek: wel of niet melden', href: 'https://www.autoriteitpersoonsgegevens.nl/en/themes/security/data-breaches/reporting-or-not-reporting-a-data-breach' },
      { tekst: 'NCSC, Melden van een datalek', href: 'https://www.ncsc.nl/wet-en-regelgeving/melden-van-een-datalek' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Politie: 112 bij spoed, 0900-8844 zonder spoed; aangifte van internetoplichting kan online',
    bron: [{ tekst: 'politie.nl, internetoplichting', href: 'https://www.politie.nl/onderwerpen/internetoplichting.html' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Fraudehelpdesk: 088-786 73 72, alleen op werkdagen en beperkte uren; melden kan altijd via het formulier',
    bron: [
      { tekst: 'Rijksoverheid, contactgids Fraudehelpdesk', href: 'https://www.rijksoverheid.nl/contact/contactgids/f/fraudehelpdesk' },
      { tekst: 'fraudehelpdesk.nl, contact', href: 'https://www.fraudehelpdesk.nl/contact/' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Het Centraal Meldpunt Identiteitsfraude is onderdeel van de Rijksdienst voor Identiteitsgegevens',
    bron: [{ tekst: 'Zelfde pagina van Rijksoverheid' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Noodnummers van alle banken op één plek',
    bron: [{ tekst: 'Fraudehelpdesk, contactgegevens van de banken', href: 'https://www.fraudehelpdesk.nl/bank/' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Gecontroleerd dat de pagina bestaat; nummers zelf niet nagelopen' }],
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Stappen bij een verloren toestel: zoeken, vergrendelen, wissen, Beveiliging van gestolen apparaten',
    bron: [
      { tekst: 'Apple, Zo vind je een verloren iPhone of iPad', href: 'https://support.apple.com/nl-nl/101593' },
      { tekst: 'Apple, Beveiliging van gestolen apparaten', href: 'https://support.apple.com/nl-nl/120340' },
      { tekst: 'Google, Een kwijtgeraakt Android-apparaat zoeken, beveiligen of wissen', href: 'https://support.google.com/android/answer/6160491?hl=nl' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Slachtofferhulp Nederland als hulpadres',
    bron: [{ tekst: 'Slachtofferhulp Nederland, Online fraude en oplichting', href: 'https://www.slachtofferhulp.nl/gebeurtenissen/oplichting-en-fraude/online-fraude/' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Ruim 100.000 meldingen in 2025 tegen 63.000 in 2024; gemelde schade bijna 69 miljoen euro; beleggingsfraude grootste schadepost',
    bron: [
      { tekst: 'Fraudehelpdesk, Terugblik 2025', href: 'https://www.fraudehelpdesk.nl/wp-content/uploads/2026/02/Terugblik-2025.pdf' },
      { tekst: 'persbericht jaarcijfers 2025', href: 'https://www.fraudehelpdesk.nl/wp-content/uploads/2026/02/Persbericht-jaarcijfers-2025-final.pdf' },
    ],
    status: 'gecontroleerd',
    toelichting: [
      { tekst: 'Totaalcijfers via ' },
      { tekst: 'Security.NL', href: "https://www.security.nl/posting/925610/Nederlanders+vorig+jaar+voor+zeker+68+miljoen+euro+opgelicht:+'nieuwe+mentaliteit+nodig'" },
      { tekst: '; nalopen in het persbericht zelf' },
    ],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Schade beleggingsfraude vermoedelijk honderden miljoenen per jaar, mogelijk tot 750 miljoen; lage meldingsbereidheid',
    bron: [{ tekst: 'AFM, persbericht december 2025', href: 'https://www.afm.nl/nl-nl/persbericht/2025/dec/pb-beleggingsfraude' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Bankhelpdeskfraude 25,8 miljoen euro in 2025, iets minder dan 5.900 slachtoffers, ruim 45 procent vergoed, 70 procent van online fraude begint op sociale media',
    bron: [{ tekst: 'NVB, fraudecijfers 2025', href: 'https://www.nvb.nl/nieuws-en-verhalen/banken-roepen-socialmediaplatforms-op-meer-te-doen-aan-online-fraudebestrijding/' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'De bank vraagt nooit om geld over te maken naar een veilige rekening; de bankapp toont of je echt met de bank belt',
    bron: [{ tekst: 'veiliginternetten.nl, bankhelpdeskfraude', href: 'https://veiliginternetten.nl/bankhelpdeskfraude-kost-slachtoffer-steeds-meer-geld/' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Kifid: bij bankhelpdeskfraude worden consumenten zo gemanipuleerd dat ze denken met een echte bankmedewerker te maken te hebben',
    bron: [{ tekst: 'Kifid, Commissie van Beroep legt de lat voor grof nalatig hoger, 23 april 2026', href: 'https://www.kifid.nl/nieuws/commissie-van-beroep-legt-de-lat-voor-grof-nalatig-hoger-in-zaak-over-bankhelpdeskfraude/' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Eerder stond hier, via veiliginternetten.nl, dat Kifid de fraude "bijna onmogelijk te herkennen" noemde. Die woorden staan nergens bij Kifid zelf; de tekst volgt nu wat Kifid wel schrijft' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Druk herkennen is belangrijker dan losse signalen',
    bron: [{ tekst: 'Fraudehelpdesk, persbericht jaarcijfers 2025, februari 2026 (pdf)', href: 'https://www.fraudehelpdesk.nl/wp-content/uploads/2026/02/Persbericht-jaarcijfers-2025-final.pdf' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Letterlijk: "Nog belangrijker dan het herkennen van signalen van oplichting is het creëren van tijd om na te denken, te controleren, te overleggen met een vertrouwd persoon."' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Webwinkel controleren bij de politie; aanbieder controleren in het AFM-register; QR-fraude met stickers',
    bron: [
      { tekst: 'politie.nl, Check de (ver)koper', href: 'https://www.politie.nl/aangifte-of-melding-doen/controleer-handelspartij.html' },
      { tekst: 'AFM, Check je aanbieder', href: 'https://www.afm.nl/nl-nl/consumenten/themas/financieel-advies/check-je-aanbieder' },
      { tekst: 'Fraudehelpdesk, Check', href: 'https://www.fraudehelpdesk.nl/check/' },
      { tekst: 'Consumentenbond, QR-code fraude', href: 'https://www.consumentenbond.nl/veilig-internetten/qr-code-fraude-tips-en-risicos' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['krijg-je-je-geld-terug'],
    bewering: 'Een bank moet een niet-toegestane betaling in beginsel terugbetalen, tenzij de klant frauduleus of grof nalatig handelde; grove nalatigheid is "aan opzet grenzende schuld"',
    bron: [{ tekst: 'Kifid, 23 oktober 2023: beperkte aansprakelijkheid kan bij grof nalatig handelen consument', href: 'https://www.kifid.nl/nieuws/kifid-beperkte-aansprakelijkheid-kan-bij-grof-nalatig-handelen-consument/' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'In deze zaak deelde Kifid de schade in tweeën omdat opzet en fraude ontbraken en de consument onder druk van afpersers handelde' }],
  },
  {
    hoofdstuk: ['krijg-je-je-geld-terug'],
    bewering: 'Bij een betaling die de klant zelf heeft goedgekeurd rust op de bank in beginsel geen wettelijke plicht om te vergoeden, tenzij ze haar zorgplicht schond. De bank mocht coulance weigeren omdat het geld niet naar een zogenaamde veilige rekening van de bank ging, maar naar een rekening bij een andere bank',
    bron: [
      { tekst: 'Kifid, Commissie van Beroep, uitspraak 2026-0026 (19 mei 2026, gepubliceerd 8 juni 2026)', href: 'https://www.kifid.nl/media/rwljktpe/uitspraak-2026-0026.pdf' },
      { tekst: 'Kifid, nieuwsbericht over deze uitspraak', href: 'https://www.kifid.nl/nieuws/commissie-van-beroep-geen-vergoeding-als-je-betalingen-op-verzoek-van-zogenaamde-bankmedewerker-zelf-hebt-gedaan/' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Kifid besliste niet zelf over coulance: het oordeelde dat de weigering van de bank niet onaanvaardbaar was. De coulanceregeling is een afspraak tussen banken, geen wet' }],
  },
  {
    hoofdstuk: ['krijg-je-je-geld-terug'],
    bewering: 'Banken vergoeden schade door bankhelpdeskfraude (spoofing) uit coulance aan particuliere klanten, onder voorwaarden zoals aangifte doen en aantoonbare nabootsing van naam of nummer van de eigen bank; de regeling geldt niet voor andere fraudevormen waarbij de klant zelf goedkeurt',
    bron: [{ tekst: 'NVB, coulancekader bij bankhelpdeskfraude en spoofing', href: 'https://www.nvb.nl/afspraken-gedragscodes-en-samenwerkingen/toetsingscriteria-voor-coulance-bij-bankhelpdeskfraude-coulancekader/' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Gecontroleerd op de toelichtingspagina van de NVB. Het onderliggende document is versie 2 van juni 2021; die pdf zelf was bij deze controle niet te openen' }],
  },
  {
    hoofdstuk: ['krijg-je-je-geld-terug'],
    bewering: 'Een automatische incasso kun je binnen acht weken zonder opgaaf van reden laten terugboeken, en tot dertien maanden na afschrijving als je nooit een geldige machtiging hebt gegeven',
    bron: [{ tekst: 'ACM ConsuWijzer, automatische incasso terugboeken', href: 'https://consument.acm.nl/rekeningen-en-incassoprocedures/automatisch-incasso-terugboeken' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['krijg-je-je-geld-terug'],
    bewering: 'Een creditcardbetaling kun je via een terugbetaalverzoek (chargeback) terugvragen als de handelaar niet levert of niet terugbetaalt; bij iDEAL en een gewone overboeking kan dat niet',
    bron: [{ tekst: 'ECC Nederland, terugbetaalverzoek creditcardmaatschappij', href: 'https://www.eccnederland.nl/nl/nieuws/terugbetaalverzoek-creditcardmaatschappij-redmiddel-als-handelaar-weigert-om-aankoopbedrag' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'ECC Nederland noemt geen vaste chargeback-termijn; die verschilt per kaartuitgever en staat daarom niet op deze site' }],
  },
  {
    hoofdstuk: ['krijg-je-je-geld-terug'],
    bewering: 'Sinds 9 oktober 2025 controleren banken in de SEPA-landen bij elke digitale overboeking of naam en IBAN bij elkaar horen (IBAN-naamcheck); de betaler mag de waarschuwing negeren en de bank mag de betaling niet blokkeren',
    bron: [{ tekst: 'Betaalvereniging Nederland, IBAN-Naam Check', href: 'https://www.betaalvereniging.nl/kennisbank/iban-en-bic/iban-naam-check/' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Bij een kleine afwijking wordt de juiste naam getoond, bij een grote niet, om te voorkomen dat namen bij rekeningnummers opgezocht kunnen worden' }],
  },
  {
    hoofdstuk: ['krijg-je-je-geld-terug'],
    bewering: 'Kifid behandelt klachten over financiële diensten gratis voor consumenten, nadat je eerst bij de bank zelf hebt geklaagd',
    bron: [
      { tekst: 'Kifid, hoe werkt het', href: 'https://www.kifid.nl/ik-heb-een-klacht/hoe-werkt-het/' },
      { tekst: 'Kifid, veelgestelde vragen', href: 'https://www.kifid.nl/kifid-kennis-en-uitspraken/veelgestelde-vragen/' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Je kunt naar Kifid als de bank niet binnen 8 weken reageert of met een oplossing komt waar je het niet mee eens bent; dien de klacht in binnen drie maanden na de afwijzing of binnen een jaar na je klacht bij de bank. Gratis in eerste aanleg; in hoger beroep betaal je 500 euro. Je kiest zelf of de uitspraak bindend is' }],
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: 'In tachtig jaar zag de AIVD nooit zoveel dreiging tegelijk; Rusland stelde zich in 2025 "agressiever, brutaler en provocerender" op; de dreiging uit China en Rusland bleef onverminderd hoog',
    bron: [
      { tekst: 'AIVD, jaarverslag 2025: cyberdreigingen', href: 'https://www.aivd.nl/actueel/magazines/jaarverslag/2025/2025/cyberdreigingen' },
      { tekst: 'AIVD, persbericht 23 april 2026', href: 'https://www.aivd.nl/actueel/nieuws/2026/04/23/aivd-wereld-vol-conflict-en-botsende-belangen' },
      { tekst: 'NOS, 23 april 2026', href: 'https://nos.nl/artikel/2611683-rusland-china-terroristen-aivd-zag-in-80-jaar-niet-meer-dreiging-dan-nu' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: 'Russische aanval op WhatsApp en Signal van ambtenaren en militairen via nepmedewerkers die vroegen opnieuw in te loggen; Laundry Bear en de politiehack; Salt Typhoon bij telecomproviders; Citrix-lek bij het Openbaar Ministerie',
    bron: [{ tekst: 'Zelfde AIVD-jaarverslag, hoofdstuk cyberdreigingen' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: `Staten bouwen cyberprogramma's en zetten daarbij criminelen en niet-statelijke groepen in; generatieve AI vergroot de schaal van aanvallen`,
    bron: [{ tekst: 'NCTV, Cybersecuritybeeld Nederland 2025', href: 'https://www.nctv.nl/actueel/nieuws/2025/11/26/cybersecuritybeeld-2025-riskante-mix-in-een-onvoorspelbare-wereld' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: 'DDoS-aanvallen op Nederlandse organisaties, waaronder gemeenten en provincies, in april 2025 en rond de NAVO-top in juni 2025, geclaimd door de pro-Russische groep NoName057(16) met een pro-Russisch motief',
    bron: [
      { tekst: 'NCSC, 30 april 2025', href: 'https://www.ncsc.nl/actueel/nieuws/2025/04/30/lopende-ddos-aanvallen-op-nederlandse-organisaties' },
      { tekst: 'Rijksoverheid, 23 juni 2025', href: 'https://www.rijksoverheid.nl/actueel/nieuws/2025/06/23/ddos-aanvallen-op-nederlandse-organisaties-rondom-navo-top' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: '4.875 incidenten in de EU (juli 2024 tot juni 2025); bijna 80% hacktivisme, vooral DDoS met weinig effect; phishing bij 60% de toegangsweg; overheden het vaakst getroffen (38% van de incidenten waarvan de sector bekend is)',
    bron: [{ tekst: 'ENISA Threat Landscape 2025', href: 'https://www.enisa.europa.eu/sites/default/files/2026-01/ENISA%20Threat%20Landscape%202025_v1.2.pdf' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Nagelopen in het rapport zelf (pagina 6, 7 en 16). ENISA telt vooral incidenten uit openbare bronnen en zegt zelf dat de lijst niet volledig is. Bij 28,5 procent van de incidenten was de sector niet bekend' }],
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: 'Buiten Oekraïne zijn de tien landen die het vaakst door Russische cyberactiviteit worden geraakt allemaal NAVO-landen; meer dan 97% van de aanvallen op accounts die Microsoft zag, is wachtwoorden raden; aanvallen op accounts +32% in de eerste helft van 2025; een tweede slot (MFA) houdt meer dan 99% van de inbraakpogingen tegen, phishing-bestendige MFA is nog sterker',
    bron: [
      { tekst: 'Microsoft, Digital Defense Report 2025 (pdf)', href: 'https://aka.ms/mddrdownload' },
      { tekst: 'Microsoft, aankondiging, 16 oktober 2025', href: 'https://blogs.microsoft.com/on-the-issues/2025/10/16/mddr-2025/' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Nagelopen in het rapport zelf (pagina 9, 16, 17 en 47). De 97 procent komt uit meldingen van Microsofts eigen beveiligingsproducten in april tot en met juni 2025: het gaat om wat Microsoft ziet, niet om alle aanvallen' }],
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: 'De Amerikaanse overheid haalde in januari 2024 een netwerk van honderden gekaapte thuisrouters (KV-botnet) uit de lucht dat door Chinese staatshackers (Volt Typhoon) werd gebruikt',
    bron: [{ tekst: 'US Department of Justice, 31 januari 2024', href: 'https://www.justice.gov/archives/opa/pr/us-government-disrupts-botnet-peoples-republic-china-used-conceal-hacking-critical' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Het ging vooral om routers van Cisco en Netgear die geen updates meer kregen' }],
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: 'Advies om contant geld en belangrijke telefoonnummers op papier in huis te hebben voor als internet of betalen uitvalt',
    bron: [{ tekst: 'Rijksoverheid, Denk Vooruit: noodpakket', href: 'https://www.denkvooruit.nl/noodpakket' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'De pagina noemt contant geld en een lijstje met belangrijke telefoonnummers' }],
  },
  {
    hoofdstuk: ['plattegrond', 'inbrekers-van-nu'],
    bewering: 'Met naam, geboortedatum en BSN kan iemand een lening of telefoonabonnement afsluiten; BSN onleesbaar maken, ook in de cijferreeks onderaan; op de kopie zetten dat het een kopie is, voor wie en de datum; vaak volstaat soort document en documentnummer',
    bron: [{ tekst: 'Rijksoverheid, fraude voorkomen met kopie ID-bewijs', href: 'https://www.rijksoverheid.nl/onderwerpen/identiteitsfraude/vraag-en-antwoord/fraude-voorkomen-met-kopie-id-bewijs' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['plattegrond', 'inbrekers-van-nu'],
    bewering: 'De KopieID-app streept gegevens door en zet een watermerk met ontvanger en doel',
    bron: [{ tekst: 'Rijksoverheid, KopieID-app', href: 'https://www.rijksoverheid.nl/onderwerpen/identiteitsfraude/vraag-en-antwoord/veilige-kopie-identiteitsbewijs' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['plattegrond', 'inbrekers-van-nu'],
    bewering: 'Werkgevers en banken mogen een kopie van je identiteitsbewijs maken. Een hotel of camping in Nederland mag dat niet en noteert alleen gegevens; een verhuurmakelaar meestal niet (wel bij een huur van 10.000 euro of meer per maand); een winkel waar je een online bestelling ophaalt ook niet',
    bron: [
      { tekst: 'Rijksoverheid, ben ik verplicht een kopie van mijn identiteitsbewijs te geven', href: 'https://www.rijksoverheid.nl/onderwerpen/identiteitsfraude/vraag-en-antwoord/ben-ik-verplicht-om-een-kopie-van-mijn-identiteitsbewijs-te-geven-aan-een-bedrijf' },
      { tekst: 'Autoriteit Persoonsgegevens, identiteitsbewijs op reis', href: 'https://www.autoriteitpersoonsgegevens.nl/themas/identificatie/paspoort-en-identiteitskaart/identiteitsbewijs-op-reis' },
      { tekst: 'Autoriteit Persoonsgegevens, identiteitsbewijs bij koop, huur of verkoop', href: 'https://www.autoriteitpersoonsgegevens.nl/themas/identificatie/paspoort-en-identiteitskaart/identiteitsbewijs-bij-koop-huur-of-verkoop' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Over een particuliere verhuurder of een webwinkel in het algemeen zeggen deze pagina\'s niets; de tekst noemt daarom alleen de makelaar en het afhalen van een bestelling' }],
  },
  {
    hoofdstuk: ['plattegrond', 'inbrekers-van-nu'],
    bewering: 'DigiD-app veiliger dan sms; DigiD stuurt nooit inloglinks; DigiD Machtigen; inloggeschiedenis in Mijn DigiD',
    bron: [
      { tekst: 'DigiD, Tips veilig inloggen', href: 'https://www.digid.nl/veiligheid/tips-veilig-inloggen' },
      { tekst: 'DigiD, Veiligheid', href: 'https://www.digid.nl/veiligheid' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['plattegrond', 'inbrekers-van-nu'],
    bewering: 'Bij de politie kun je een verkoper of webwinkel controleren op rekeningnummer, e-mailadres, telefoonnummer of webadres; geen meldingen is geen garantie',
    bron: [{ tekst: 'politie.nl, check de (ver)koper', href: 'https://www.politie.nl/aangifte-of-melding-doen/controleer-handelspartij.html' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['onderhoud'],
    bewering: 'Ondersteuning Windows 10 gestopt op 14 oktober 2025; pc blijft werken maar krijgt geen beveiligingsupdates meer',
    bron: [{ tekst: 'Microsoft Support, einde ondersteuning Windows 10', href: 'https://support.microsoft.com/nl-nl/windows/windows-10-ondersteuning-is-be%C3%ABindigd-op-14-oktober-2025-2ca8b313-1946-43d3-b55c-2b95b107f281' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['onderhoud'],
    bewering: 'Verlengde beveiligingsupdates voor particulieren tot 12 oktober 2027; Microsoft-account vereist',
    bron: [{ tekst: 'Microsoft, Extended Security Updates', href: 'https://www.microsoft.com/nl-nl/windows/extended-security-updates' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Apple-erfeniscontact: toegangssleutel plus overlijdensakte; contact hoeft geen Apple-apparaat te hebben',
    bron: [{ tekst: 'Apple Support, een erfeniscontact toevoegen voor je Apple Account', href: 'https://support.apple.com/nl-nl/102631' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'In sommige landen vraagt Apple een ander document dan een overlijdensakte, zoals in Japan een familiecertificaat' }],
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Google Inactiviteitsvoorkeuren (vroeger Inactief accountbeheer): je kiest hoe lang Google wacht, tot maximaal achttien maanden, tot tien contactpersonen, welke gegevens zij krijgen, en of het account daarna wordt verwijderd',
    bron: [
      { tekst: 'Google Accounthulp, over Inactiviteitsvoorkeuren', href: 'https://support.google.com/accounts/answer/3036546?hl=nl' },
      { tekst: 'Google, updating our inactive account policies, 16 mei 2023', href: 'https://blog.google/innovation-and-ai/technology/safety-security/updating-our-inactive-account-policies/' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'De helppagina noemt de tien contactpersonen en de keuze van gegevens; de maximale wachttijd van achttien maanden en het verwijderen staan in de aankondiging van Google zelf' }],
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Microsoft heeft geen regeling voor digitale nalatenschap; telefoonabonnement van overledene niet direct opzeggen',
    bron: [
      { tekst: 'Zelfde pagina van KPN' },
      { tekst: 'Data na de dood', href: 'https://www.datanadedood.nu/digitale-erfenis' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Gecontroleerd via tweede hand' }],
  },
  {
    hoofdstuk: ['inbrekers-van-morgen'],
    bewering: 'Verborgen opdrachten in webpagina’s of e-mails kunnen AI-assistenten misleiden (prompt injection)',
    bron: [{ tekst: 'OWASP Gen AI Security Project, LLM01:2025 Prompt Injection', href: 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['onderhoud'],
    bewering: 'Apparaten wissen: stappen per systeem; activeringsslot bij niet uitloggen',
    bron: [
      { tekst: 'Apple, Activeringsslot verwijderen', href: 'https://support.apple.com/nl-nl/108934' },
      { tekst: 'Google, Je Android-apparaat terugzetten naar de fabrieksinstellingen', href: 'https://support.google.com/android/answer/6088915?hl=nl' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['onderhoud'],
    bewering: 'Recht op verwijdering van gegevens',
    bron: [
      { tekst: 'AVG artikel 17' },
      { tekst: 'Autoriteit Persoonsgegevens, Recht op vergetelheid', href: 'https://autoriteitpersoonsgegevens.nl/nl/zelf-doen/gebruik-uw-privacyrechten/recht-op-vergetelheid' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['waarom-dit-saai-voelt'],
    bewering: 'De helft van de Nederlanders (51 procent) maakt zich weinig tot geen zorgen over de eigen digitale veiligheid thuis; 40 procent enige zorgen, 8 procent veel zorgen. Over de digitale veiligheid van naasten maakt men zich méér zorgen (55 procent) dan over die van zichzelf (48 procent)',
    bron: [{ tekst: 'Alert Online 2025, Cybersecurity onderzoek, samenvatting zorgen', href: 'https://alertonline.veiliginternetten.nl/media/documents/Hoofdrapport_Alert_Online_2025.pdf' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Onderzoek door Ipsos I&O in opdracht van het ministerie van Economische Zaken, jaarlijks sinds 2021. De 55 procent voor naasten is 15 procent (zeer) veel plus 40 procent enige zorgen; de 48 procent voor zichzelf is 8 plus 40' }],
  },
  {
    hoofdstuk: ['huischeck', 'waarom-dit-saai-voelt'],
    bewering: "Nederlanders geven zichzelf gemiddeld een 6,9 voor het omgaan met online risico's; dat cijfer ligt sinds 2022 rond hetzelfde niveau. Tien procent geeft zichzelf een onvoldoende, drie op de tien een acht of hoger",
    bron: [{ tekst: 'Alert Online 2025, samenvatting online gedrag', href: 'https://alertonline.veiliginternetten.nl/media/documents/Hoofdrapport_Alert_Online_2025.pdf' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Dit is het cijfer waarmee de huischeck je eigen antwoord vergelijkt. Mannen geven zichzelf gemiddeld een 7,1, vrouwen een 6,7' }],
  },
  {
    hoofdstuk: ['waarom-dit-saai-voelt'],
    bewering: '72 procent van de Nederlanders maakte in twaalf maanden een voorval van cybercrime mee; phishing 55 procent; telefonische helpdeskfraude verdubbelde van 15 naar 29 procent',
    bron: [{ tekst: 'Alert Online 2025, samenvatting slachtofferschap', href: 'https://alertonline.veiliginternetten.nl/media/documents/Hoofdrapport_Alert_Online_2025.pdf' }],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['waarom-dit-saai-voelt'],
    bewering: 'Wie zich weinig zorgen maakt, noemt als reden vooral dat hij het al geregeld heeft: altijd updaten 48 procent, links controleren 47 procent, twee-staps-inloggen 46 procent, geen aantrekkelijk doelwit 39 procent',
    bron: [{ tekst: 'Alert Online 2025, pagina 32 van 51', href: 'https://alertonline.veiliginternetten.nl/media/documents/Hoofdrapport_Alert_Online_2025.pdf' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Alleen gesteld aan wie zich weinig tot geen zorgen maakt (n=591), meerdere antwoorden mogelijk' }],
  },
  {
    hoofdstuk: ['waarom-dit-saai-voelt'],
    bewering: 'Gevraagd of ze het "altijd of soms" doen, zegt 92 procent twee-staps-inloggen te gebruiken en 80 procent voor elk account een ander wachtwoord te hebben; gevraagd of het voor álle accounts geldt, blijft daar 27 respectievelijk 38 procent van over',
    bron: [
      { tekst: 'Alert Online 2025, pagina 42 van 51', href: 'https://alertonline.veiliginternetten.nl/media/documents/Hoofdrapport_Alert_Online_2025.pdf' },
      { tekst: 'CBS, Online Veiligheid en Criminaliteit 2024, tabel 3.4.1', href: 'https://www.cbs.nl/nl-nl/longread/rapportages/2025/online-veiligheid-en-criminaliteit-2024?onepage=true' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Geen exacte vergelijking, en dat is het punt: Alert Online vraagt "welke van onderstaande zaken gebruikt u of past u toe?" en telt altijd én soms mee (n=624, elke respondent kreeg willekeurig de helft van de opties). Het CBS vraagt of de maatregel voor al je accounts geldt (ruim 33.000 respondenten). Het verschil tussen beide cijfers is het verschil tussen ergens en overal' }],
  },
  {
    hoofdstuk: ['waarom-dit-saai-voelt'],
    bewering: 'Beveiligingsmoeheid (security fatigue): te veel beveiligingsbeslissingen leiden tot berusting, verlies van controle en het kiezen van de makkelijkste optie. Aanbevelingen: minder beslissingen, de goede keuze de makkelijkste maken, en consistentie',
    bron: [{ tekst: 'NIST, 4 oktober 2016', href: 'https://www.nist.gov/news-events/news/2016/10/security-fatigue-can-cause-computer-users-feel-hopeless-and-act-recklessly' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Kwalitatief onderzoek van het Amerikaanse National Institute of Standards and Technology onder computergebruikers; gepubliceerd in IT Professional' }],
  },
  {
    hoofdstuk: ['waarom-dit-saai-voelt'],
    bewering: 'Ruim een derde van de medewerkers die beveiligingstraining krijgen, vindt die saai (36 procent); ook maar 36 procent zegt er met volle aandacht bij te zijn',
    bron: [{ tekst: 'Tessian, How Security Cultures Impact Employee Behavior, juli 2022 (pdf)', href: 'https://1670277.fs1.hubspotusercontent-na1.net/hubfs/1670277/%5BCollateral%5D%20Tessian-Research-Reports/%5BTessian%20Research%5D%20How%20Security%20Cultures%20Impact%20Employee%20Behavior.pdf' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Enquête van OnePoll in opdracht van Tessian onder 2.000 werknemers en 500 beveiligingsleiders in de Verenigde Staten en het Verenigd Koninkrijk. Tessian verkoopt zelf beveiligingssoftware, en het gaat om werk, niet om Nederland: lees het als een aanwijzing, niet als een Nederlands cijfer' }],
  },
  {
    hoofdstuk: ['waarom-dit-saai-voelt', 'plattegrond'],
    bewering: 'Gewone computergebruikers verklaren beveiliging met eigen beelden uit een wereld die ze kennen (inbreker, ziekte, oorlog, misdaad). Expertadvies dat niet in zo\'n beeld past, wordt genegeerd',
    bron: [{ tekst: 'Rick Wash, Folk models of home computer security, SOUPS 2010', href: 'https://dl.acm.org/doi/10.1145/1837110.1837125' }],
    status: 'gecontroleerd',
    toelichting: [
      { tekst: 'Interviews met 33 thuisgebruikers zonder computerkennis in de Verenigde Staten (2007 en 2008); acht verklaringsmodellen, vier voor virussen en vier voor hackers. Volledige tekst vrij te lezen: ' },
      { tekst: 'SOUPS 2010-proceedings (pdf)', href: 'https://cups.cs.cmu.edu/soups/2010/proceedings/a11_Walsh.pdf' },
    ],
  },
  {
    hoofdstuk: ['inbrekers-van-morgen'],
    bewering: 'Een medewerker van ingenieursbureau Arup in Hongkong maakte in januari 2024 omgerekend zo\'n 25 miljoen dollar over in vijftien overboekingen, nadat hij had deelgenomen aan een videogesprek waarin de financieel directeur en de andere collega\'s allemaal met AI nagemaakt waren',
    bron: [{ tekst: 'CNN, 16 mei 2024', href: 'https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'De Hongkongse politie meldde de zaak in februari 2024 zonder de naam van het bedrijf; Arup maakte in mei 2024 zelf bekend het slachtoffer te zijn. Het bedrag van 200 miljoen Hongkongse dollar is omgerekend ongeveer 25,6 miljoen Amerikaanse dollar' }],
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: 'Bij de NotPetya-aanval van juni 2017 werden bij rederij Maersk in tien dagen 4.000 servers en 45.000 computers opnieuw geïnstalleerd; volledig hersteld was het na bijna twee maanden. Van de zo\'n 150 domeincontrollers, die elkaar bijhielden als reservekopie, ging alles verloren op één na: die in Ghana stond door een stroomstoring los van het netwerk. Een medewerker vloog de harde schijf via Nigeria naar Londen',
    bron: [
      { tekst: 'Jim Hagemann Snabe (voorzitter Maersk) op het World Economic Forum, Securing a Common Future in Cyberspace, 24 januari 2018', href: 'https://www.youtube.com/watch?v=Tqe3K3D7TnI' },
      { tekst: 'Wired, The Untold Story of NotPetya, augustus 2018', href: 'https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'De aantallen en de tien dagen zegt Snabe zelf in de opname van het World Economic Forum (vanaf ongeveer 4 minuten). De domeincontrollers, Ghana, de vlucht en de bijna twee maanden komen uit de reportage van Andy Greenberg in Wired, die op interviews met betrokken medewerkers steunt' }],
  },
  {
    hoofdstuk: ['voor-de-mensen-om-je-heen'],
    bewering: 'Twee mannen van 21 en 24 haalden via WhatsApp mensen op met de foto van een bekende en een verhaal over spoed; het geld ging naar rekeningen van geldezels. Geëist werd twee jaar cel tegen de één en een jaar tegen de ander; de jongste verdiende er ongeveer 24.000 euro mee',
    bron: [{ tekst: 'Openbaar Ministerie, 7 april 2021', href: 'https://www.om.nl/actueel/nieuws/2021/04/07/tot-twee-jaar-cel-geeist-voor-vriend-in-nood-fraude-via-whatsapp' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Dit is de eis van het Openbaar Ministerie, niet het vonnis van de rechter. De 21-jarige werd verdacht van acht gevallen van oplichting en witwassen, de 24-jarige van vijf gevallen plus het ronselen van geldezels' }],
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Het Twitter-account van Jack Dorsey, destijds de baas van Twitter, werd op 30 augustus 2019 overgenomen doordat zijn telefoonnummer bij de provider was overgezet; volgens Twitter door een beveiligingsfout van de provider. Via de functie om per sms te tweeten verschenen ongeveer een halfuur lang berichten, waaronder racisme en een bommelding tegen het hoofdkantoor van Twitter',
    bron: [
      { tekst: 'DataBreachToday, 2 september 2019, met de verklaring van Twitter', href: 'https://www.databreachtoday.com/hey-jack-how-was-your-account-hacked-a-13007' },
      { tekst: 'CBS News, 30 augustus 2019', href: 'https://www.cbsnews.com/news/jack-dorsey-hackers-tweet-racial-slurs-from-twitter-ceo-account-today-2019-08-30/' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'De verklaring van Twitter zelf stond in een bericht van @TwitterComms; dat account is inmiddels afgeschermd, dus de tekst is via deze twee media nagelopen. Een eerder genoemd aantal van zeventien berichten staat in geen van de bronnen en is geschrapt' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Online worden mensen vaker opgelicht dan gehackt: in 2025 werd 10 procent van de Nederlanders van 15 jaar en ouder slachtoffer van online oplichting en fraude, 6 procent van hacken',
    bron: [{ tekst: 'CBS, Veiligheidsmonitor 2025, hoofdstuk 6', href: 'https://www.cbs.nl/nl-nl/longread/rapportages/2026/veiligheidsmonitor-2025/6-online-criminaliteit' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'CBS telt slachtoffers, niet wat daders doen. Dat "de meeste inbrekers aanbellen" is de lezing van deze site: oplichting komt vaker voor dan hacken' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu', 'als-er-is-ingebroken'],
    bewering: 'Bij simswapping doet een oplichter zich bij je telefoonbedrijf voor als jou. Codes uit een app zijn veiliger dan codes per sms, en een pincode op je simkaart maakt simswapping moeilijker',
    bron: [
      { tekst: 'Consumentenbond, oplichters nemen simkaartjes over', href: 'https://www.consumentenbond.nl/digitaalgids/digitaalgids-uitgelicht/oplichters-nemen-simkaartjes-over' },
      { tekst: 'Politie, voorkom sim-swapping', href: 'https://www.politie.nl/informatie/voorkom-sim-swapping.html' },
      { tekst: 'NCSC, welke soorten digitale fraude zijn er', href: 'https://www.ncsc.nl/phishing/online-fraude-uitgelegd' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Een pincode beschermt de simkaart in je telefoon; bij simswapping maakt de provider een nieuwe kaart aan. Het NCSC raadt de pincode toch aan ("waar mogelijk") en deze site volgt dat. Het eerdere advies "vraag je provider om extra controle" staat bij geen van deze bronnen en is geschrapt' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Tegen ransomware: houd alles bijgewerkt, open geen bijlagen die je niet verwacht, en maak reservekopieën die niet met je computer verbonden blijven; dan kun je je bestanden terugzetten. Het advies is geen losgeld te betalen',
    bron: [{ tekst: 'NCSC, ransomware uitgelegd', href: 'https://www.ncsc.nl/ransomware/ransomware-uitgelegd' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Het NCSC zegt er ook bij dat geen enkel middel volledige bescherming biedt' }],
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Apple meldt nooit zelf dat een gestolen toestel is gevonden; berichten die dat zeggen zijn phishing. Haal een gestolen toestel niet uit Zoek mijn, want dan verdwijnt het activeringsslot en kan de dief het makkelijker wissen en doorverkopen',
    bron: [{ tekst: 'Apple Support, als je iPhone of iPad is gestolen', href: 'https://support.apple.com/nl-nl/120837' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Hoe vaak zulke berichten na een diefstal komen, meldt Apple niet; de tekst zegt daarom "soms"' }],
  },
  {
    hoofdstuk: ['voor-de-mensen-om-je-heen'],
    bewering: 'Bij bankhelpdeskfraude is bijna 80 procent van de slachtoffers ouder dan 60 en ruim 80 procent van de verdachten jonger dan 40; bij hulpvraagoplichting ("hoi mam") zijn de meeste slachtoffers ouder dan 50',
    bron: [
      { tekst: 'Politie, minder bankhelpdeskfraude in 2023, 11 maart 2024', href: 'https://www.politie.nl/nieuws/2024/maart/11/00-minder-bankhelpdeskfraude-in-2023.html' },
      { tekst: 'Betaalvereniging, 10 juni 2020', href: 'https://www.betaalvereniging.nl/actueel/betaalvereniging-politie-en-fraudehelpdesk-slaan-handen-ineen-tegen-hulpvraagoplichting/' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Het cijfer over hoi mam is van 2020. Over alle vormen van online oplichting samen worden 65-plussers juist minder vaak slachtoffer dan 25- tot 45-jarigen (CBS 2024); ouderen zijn vooral het doelwit van deze twee trucs' }],
  },
  {
    hoofdstuk: ['van-geheim-woord-naar-zegelring'],
    bewering: 'Gestolen e-mailadressen en wachtwoorden worden doorverkocht op criminele marktplaatsen en daarna met programma\'s automatisch bij veel andere diensten geprobeerd (credential stuffing)',
    bron: [
      { tekst: 'Europol, IOCTA 2025: Steal, deal and repeat, juni 2025 (pdf)', href: 'https://www.europol.europa.eu/cms/sites/default/files/documents/Steal-deal-repeat-IOCTA_2025.pdf' },
      { tekst: 'OWASP, credential stuffing', href: 'https://community.owasp.org/attacks/Credential_stuffing' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['van-geheim-woord-naar-zegelring'],
    bewering: 'Zelfbedachte wachtwoorden volgen voorspelbare patronen die kraakprogramma\'s kennen; wachtwoorden moeten worden vergeleken met lijsten van veelgebruikte en gelekte wachtwoorden',
    bron: [
      { tekst: 'NIST SP 800-63B-4, paragraaf 3.1.1.2', href: 'https://pages.nist.gov/800-63-4/sp800-63b.html' },
      { tekst: 'NCSC (VK), three random words, 27 oktober 2016', href: 'https://www.ncsc.gov.uk/blog-post/three-random-words-or-thinkrandom-0' },
      { tekst: 'Ur e.a., "I Added \'!\' at the End to Make It Secure", SOUPS 2015 (pdf)', href: 'https://www.usenix.org/system/files/conference/soups2015/soups15-paper-ur.pdf' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Ur e.a. is een laboratoriumstudie met 49 deelnemers. De voorbeelden op de site (Welkom01, Zomer2026!) zijn ter illustratie en staan niet letterlijk in deze bronnen' }],
  },
  {
    hoofdstuk: ['van-geheim-woord-naar-zegelring'],
    bewering: 'Een nepsite die alles direct doorgeeft aan de echte site (adversary-in-the-middle) werkt tegen elke code die je overtypt, ook uit een app; passkeys en beveiligingssleutels (FIDO2) zijn daar niet gevoelig voor',
    bron: [
      { tekst: 'NCSC (VK), traditional user credentials and FIDO2 credentials, 23 april 2026', href: 'https://www.ncsc.gov.uk/paper/traditional-user-and-fido2-credentials-personal-use' },
      { tekst: 'CISA, Implementing Phishing-Resistant MFA, oktober 2022 (pdf)', href: 'https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf' },
    ],
    status: 'gecontroleerd',
  },
  {
    hoofdstuk: ['aan-de-slag'],
    bewering: 'Veel gratis VPN-apps verdienen aan advertenties of aan het delen van je gegevens of verkeer',
    bron: [
      { tekst: 'Federal Trade Commission, Shopping for a VPN app? Read this, 22 februari 2018 (archiefkopie)', href: 'http://web.archive.org/web/20220119100848/https://www.consumer.ftc.gov/blog/2018/02/shopping-vpn-app-read' },
      { tekst: 'Ikram e.a., Android VPN permission-enabled apps, IMC 2016', href: 'https://doi.org/10.1145/2987443.2987471' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Ikram e.a. onderzochten 283 Android-apps met VPN-rechten: 72 procent van de gratis apps had volgcode aan boord, tegen 35 procent van de betaalde; twee apps voegden reclame- en volgcode toe aan het verkeer van hun gebruikers' }],
  },
  {
    hoofdstuk: ['aan-de-slag'],
    bewering: 'De ingebouwde virusscanner van Windows vangt de meeste gewone kwaadaardige programma\'s af, maar houdt geen nepwebsites tegen',
    bron: [
      { tekst: 'Consumentenbond, gratis virusscanner, 7 september 2026', href: 'https://www.consumentenbond.nl/virusscanner/gratis-virusscanner' },
      { tekst: 'NCSC (VK), device security guidance', href: 'https://www.ncsc.gov.uk/collection/device-security-guidance' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'De Consumentenbond vindt Defender op sommige punten minder goed dan andere gratis en betaalde scanners, vooral omdat het geen phishingwebsites tegenhoudt. De site zei eerder dat de ingebouwde scanner "voor bijna iedereen genoeg" is; dat is afgezwakt. De NCSC-richtlijn is geschreven voor organisaties' }],
  },
  {
    hoofdstuk: ['plattegrond'],
    bewering: 'Veel thuisrouters krijgen lang geen beveiligingsupdate, en sommige hebben een wachtwoord dat bekend of makkelijk te kraken is. Sinds 1 augustus 2025 gelden strengere Europese cybereisen voor nieuwe draadloze apparaten, ook modems',
    bron: [
      { tekst: 'Fraunhofer FKIE, Home Router Security Report 2020, 26 juni 2020', href: 'https://www.fkie.fraunhofer.de/en/press-releases/Home-Router.html' },
      { tekst: 'Rijksinspectie Digitale Infrastructuur, 1 augustus 2025', href: 'https://www.rdi.nl/actueel/nieuws/2025/08/01/strengere-veiligheidseisen-draadloze-apparaten' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Fraunhofer onderzocht 127 thuisrouters van zeven merken: 46 hadden in het jaar ervoor geen beveiligingsupdate gekregen. Hoeveel routers in Nederland nog het fabriekswachtwoord hebben, is niet gemeten; de tekst zegt daarom "sommige"' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu', 'krijg-je-je-geld-terug'],
    bewering: 'Oplichters die zich voordoen als de bank of een helpdesk laten je een programma als AnyDesk of TeamViewer installeren om mee te kijken of je computer over te nemen; een bank vraagt daar nooit om. Ben je erin getrapt: neem contact op met je bank en verander je wachtwoorden. Fraude waarbij zo\'n programma is gebruikt, valt niet onder de coulanceregeling van de banken',
    bron: [
      { tekst: 'Veilig Bankieren (Nederlandse Vereniging van Banken), wat is bankhelpdeskfraude', href: 'https://www.veiligbankieren.nl/fraude/bankhelpdeskfraude/' },
      { tekst: 'Politie, helpdeskfraude', href: 'https://www.politie.nl/campagnes/helpdeskfraude.html' },
      { tekst: 'Consumentenbond, bank spoofing', href: 'https://www.consumentenbond.nl/veilig-internetten/bank-spoofing-oplichting-door-nepmedewerkers' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Dat meekijkfraude buiten de coulanceregeling valt, schrijft de Consumentenbond: de banken houden vast aan de oude omschrijving van bankhelpdeskfraude. De Consumentenbond vindt dat oneerlijk en meldt dat de banken het niet willen aanpassen' }],
  },
  {
    hoofdstuk: ['plattegrond', 'aan-de-slag'],
    bewering: 'Oplichters vragen via een (overgenomen) bekende om de WhatsApp-code door te sturen, of laten de code inspreken en luisteren de voicemail af met de standaardpincode. Deel de code nooit; verificatie in twee stappen met een geheime pincode beschermt je account',
    bron: [
      { tekst: 'Veiliginternetten.nl (ministerie van Economische Zaken, NCSC en ECP), mijn WhatsApp is gehackt', href: 'https://veiliginternetten.nl/thema/mobiel/basisbeveiliging-mobiel/mijn-whatsapp-gehackt/' },
      { tekst: 'WhatsApp, security', href: 'https://www.whatsapp.com/security' },
    ],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'WhatsApp zelf: "Enable two-step verification. Set up a secret pin and never share it with anyone to prevent someone from stealing your account." Veiliginternetten beschrijft de truc met de doorgestuurde code en de voicemail' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Bij Tikkiefraude (betaalverzoekfraude) vraagt iemand je tijdens een online aankoop of verkoop om 1 cent over te maken, zogenaamd ter controle; de link leidt naar een nagemaakte bankpagina. Tikkie heeft maar één webadres: tikkie.me',
    bron: [{ tekst: 'Veiliginternetten.nl (ministerie van Economische Zaken, NCSC en ECP), wat is Tikkiefraude', href: 'https://veiliginternetten.nl/wat-is-tikkiefraude-betaalverzoekfraude/' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'De fraudepagina van Tikkie zelf (tikkie.me/fraude) laadt alleen met JavaScript en kon daarom niet als tekst worden nagelopen' }],
  },
];

/** Hoeveel beweringen nog op 'nog koppelen' staan. Zo hoeft dat aantal niet in de tekst. */
export const NOG_KOPPELEN = BRONNEN.filter((b) => b.status === 'nog-koppelen').length;
