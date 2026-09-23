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
    bewering: 'Bij de meeste mensen staat minstens één deur open: 62 procent gebruikt niet voor elk account een eigen wachtwoord, 73 procent heeft niet overal een tweede slot, 42 procent doet updates niet meteen, 57 procent maakt hooguit soms een reservekopie. Daartegenover: 81 procent heeft een code op alle apparaten',
    bron: [{ tekst: 'CBS, Online Veiligheid en Criminaliteit 2024, tabel 3.4.1', href: 'https://www.cbs.nl/nl-nl/longread/rapportages/2025/online-veiligheid-en-criminaliteit-2024?onepage=true' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Enquête augustus–oktober 2024, ruim 33.000 personen van 15 jaar en ouder. CBS meet wie het wél doet; de percentages op deze site zijn daarvan het spiegelbeeld' }],
  },
  {
    hoofdstuk: ['huischeck'],
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
    bewering: 'Een stem klonen kan met enkele seconden geluid, goedkoop en zonder technische kennis',
    bron: [{ tekst: 'Group-IB, The Voice of Fraud', href: 'https://www.group-ib.com/resources/research-hub/voice-of-fraud/' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Commerciële bron; liefst aanvullen met politie of Fraudehelpdesk' }],
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
    bewering: 'Kifid: fraude soms zo persoonlijk dat herkennen bijna onmogelijk is',
    bron: [{ tekst: 'Zelfde pagina van veiliginternetten.nl' }],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'Gecontroleerd via tweede hand; uitspraak van Kifid zelf nog koppelen' }],
  },
  {
    hoofdstuk: ['inbrekers-van-nu'],
    bewering: 'Druk herkennen is belangrijker dan losse signalen',
    bron: [{ tekst: 'Fraudehelpdesk, jaarcijfers 2025' }],
    status: 'gecontroleerd',
    toelichting: [{ tekst: 'Gecontroleerd via vakpers; nalopen in het persbericht' }],
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
    bewering: 'Bij een betaling die de klant zelf heeft goedgekeurd bestaat geen wettelijke terugbetaalplicht; het coulancekader gold in deze zaak niet omdat het geld naar een rekening bij een andere bank ging',
    bron: [{ tekst: 'Security.NL, 9 juni 2026, over de uitspraak van de Commissie van Beroep van Kifid', href: 'https://www.security.nl/posting/939844/Kifid%3A+bank+hoeft+fraude+niet+te+vergoeden+als+klant+zelf+geld+overmaakte' }],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'Gecontroleerd via vakpers; de uitspraak van Kifid zelf nog koppelen' }],
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
    bron: [{ tekst: 'Kifid', href: 'https://www.kifid.nl' }],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'Gecontroleerd dat de organisatie en de route bestaan; de exacte procedurevoorwaarden nog koppelen' }],
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
    bewering: '4.875 incidenten in de EU (juli 2024 tot juni 2025); bijna 80% hacktivisme, vooral DDoS met weinig effect; phishing bij 60% de toegangsweg; overheden het vaakst getroffen (38%)',
    bron: [{ tekst: 'ENISA Threat Landscape 2025', href: 'https://www.enisa.europa.eu/sites/default/files/2026-01/ENISA%20Threat%20Landscape%202025_v1.2.pdf' }],
    status: 'gecontroleerd',
    toelichting: [
      { tekst: 'Gecontroleerd via vakpers (' },
      { tekst: 'Security Affairs', href: 'https://securityaffairs.com/182978/security/reading-the-enisa-threat-landscape-2025-report.html' },
      { tekst: '); nalopen in het rapport zelf' },
    ],
  },
  {
    hoofdstuk: ['de-storm-om-het-huis'],
    bewering: 'De tien landen die het vaakst door Russische cyberactiviteit worden geraakt zijn allemaal NAVO-landen (+25%); 97% van de aanvallen op accounts is wachtwoorden raden; aanvallen op accounts +32% in de eerste helft van 2025; phishing-bestendige MFA blokkeert meer dan 99%',
    bron: [{ tekst: 'Microsoft, Digital Defense Report 2025, 16 oktober 2025', href: 'https://blogs.microsoft.com/on-the-issues/2025/10/16/mddr-2025/' }],
    status: 'gecontroleerd',
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
    bewering: 'Werkgevers en banken mogen een kopie maken; verhuurders, hotels en webwinkels meestal niet',
    bron: [
      { tekst: 'Rijksoverheid (eerste deel)' },
      { tekst: 'Autoriteit Persoonsgegevens voor de uitzonderingen' },
    ],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'Eerste deel gecontroleerd; tweede deel nog koppelen' }],
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
    bron: [{ tekst: 'SeniorWeb, erfeniscontact toevoegen', href: 'https://www.seniorweb.nl/artikel/erfeniscontact-toevoegen-aan-iphone-of-ipad' }],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'Gecontroleerd via tweede hand; pagina van Apple zelf nog koppelen' }],
  },
  {
    hoofdstuk: ['als-er-is-ingebroken'],
    bewering: 'Google Inactief accountbeheer: periode kiezen, contactpersonen, selectie van gegevens, optioneel verwijderen',
    bron: [{ tekst: 'KPN, digitale erfenis', href: 'https://www.kpn.com/beleef/blog/digitale-erfenis' }],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'Gecontroleerd via tweede hand; pagina van Google zelf nog koppelen' }],
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
    bewering: 'Ruim een derde van de medewerkers vindt beveiligingstraining op het werk saai; bijna twee derde let er niet met volle aandacht bij',
    bron: [{ tekst: 'Computer Weekly, over onderzoek van Tessian', href: 'https://www.computerweekly.com/news/252523196/Cyber-security-training-boring-and-largely-ignored' }],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'De cijfers (36 procent saai, 64 procent onvoldoende aandacht) komen uit een rapport van beveiligingsbedrijf Tessian. Het oorspronkelijke rapport is niet zelf geopend; de krantenberichtgeving erover wel' }],
  },
  {
    hoofdstuk: ['waarom-dit-saai-voelt', 'plattegrond'],
    bewering: 'Gewone computergebruikers verklaren beveiliging met eigen beelden uit een wereld die ze kennen (inbreker, ziekte, oorlog, misdaad). Expertadvies dat niet in zo\'n beeld past, wordt genegeerd',
    bron: [{ tekst: 'Rick Wash, Folk models of home computer security, SOUPS 2010', href: 'https://dl.acm.org/doi/10.1145/1837110.1837125' }],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'Interviewonderzoek onder thuisgebruikers; acht verklaringsmodellen, vier voor virussen en vier voor hackers. Alleen de samenvatting en secundaire besprekingen zijn geraadpleegd, niet de volledige tekst achter de ACM-betaalmuur' }],
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
    bewering: 'Bij de NotPetya-aanval van juni 2017 werden bij rederij Maersk 45.000 computers en 4.000 servers onbruikbaar; het hele netwerk is in tien dagen opnieuw opgebouwd, werk waar normaal maanden voor staat. Alle domeincontrollers gingen verloren op één na, die in Ghana door een stroomstoring los van het netwerk stond; met die kopie kon het herstel beginnen',
    bron: [
      { tekst: 'IT Pro, over de toelichting van Maersk-voorzitter Jim Hagemann Snabe in Davos', href: 'https://www.itpro.com/cyber-attacks/30393/maersk-rebuilt-hefty-it-infrastructure-a-mere-10-days-after-notpetya-attack' },
      { tekst: 'Wired, The Untold Story of NotPetya, augustus 2018', href: 'https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/' },
    ],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'De aantallen (45.000 pc\'s, 4.000 servers, tien dagen) komen uit wat Snabe er zelf over zei op het World Economic Forum en zijn via meerdere media bevestigd. Het verhaal van de domeincontroller in Ghana komt uit de reportage van Wired; die pagina kon bij deze controle niet zelf worden geopend en staat daarom nog op nog koppelen' }],
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
    bewering: 'Het Twitter-account van Jack Dorsey, destijds de baas van Twitter, werd in augustus 2019 overgenomen via simswapping: het telefoonnummer werd bij de provider naar een nieuwe simkaart verplaatst, waarna de inlogcodes per sms bij de aanvallers binnenkwamen. Er verschenen zeventien berichten, waaronder een bommelding',
    bron: [{ tekst: 'Axios, 24 november 2019', href: 'https://www.axios.com/2019/11/24/jack-dorsey-twitter-account-hacker-arrested' }],
    status: 'nog-koppelen',
    toelichting: [{ tekst: 'Dat het om simswapping ging en dat er een minderjarige voor is aangehouden, staat in meerdere media; het aantal van zeventien berichten komt uit de berichtgeving van destijds en is niet bij een primaire bron nagelopen' }],
  },
];

/** Hoeveel beweringen nog op 'nog koppelen' staan. Zo hoeft dat aantal niet in de tekst. */
export const NOG_KOPPELEN = BRONNEN.filter((b) => b.status === 'nog-koppelen').length;
