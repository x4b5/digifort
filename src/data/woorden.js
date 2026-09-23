/**
 * Het woordenboek: elke vakterm in één zin, met de plek in het huis erbij.
 * `kamer` verwijst naar een plek uit kamers.js, zodat de lezer kan doorklikken
 * naar de plattegrond. Eén bron: de tabel op /woordenboek komt hieruit.
 * Alfabetisch houden. `niveau` zegt hoeveel voorkennis het begrip vraagt:
 * 1 = kent bijna iedereen, 2 = bekend maar vraagt uitleg, 3 = echt vakjargon.
 */
export const WOORDEN = [
  { term: '2FA / tweestapsverificatie', uitleg: 'Inloggen met twee bewijzen: iets wat je weet én iets wat je hebt. Een code uit een app is 2FA, een passkey ook', huis: 'Het tweede slot', kamer: 'tweede-slot', niveau: 2 },
  { term: 'Alias (e-mail)', uitleg: 'Een wegwerpadres dat doorstuurt naar je echte adres', huis: 'Een aparte brievenbus per afzender', kamer: 'brievenbus', niveau: 2 },
  { term: 'Authenticator-app', uitleg: 'App die elke halve minuut een nieuwe inlogcode maakt. In het jargon: TOTP', huis: 'De sleutel van het tweede slot', kamer: 'tweede-slot', niveau: 2 },
  { term: 'AVG', uitleg: 'De Europese privacywet over omgaan met persoonsgegevens', huis: 'De huisregels voor andermans sleutels', niveau: 2 },
  { term: 'Back-up', uitleg: 'Een kopie van je bestanden op een andere plek', huis: 'De brandkast buiten de deur', kamer: 'brandkast', niveau: 1 },
  { term: 'Botnet', uitleg: 'Een leger van gekaapte apparaten (vaak oude routers) dat samen aanvallen uitvoert', huis: 'Jouw schuur als schuilplaats van een ander', kamer: 'tuinhek', niveau: 3 },
  { term: 'BSN', uitleg: 'Je burgerservicenummer, het nummer waarmee de overheid je kent. Met je naam, geboortedatum en BSN kan iemand een lening op jouw naam afsluiten', huis: 'Het nummer op je eigendomsakte', kamer: 'eigendomsakte', niveau: 1 },
  { term: 'CEO-fraude', uitleg: 'Een oplichter doet zich voor als je baas en vraagt om een spoedbetaling', huis: 'De inbreker die zegt dat hij van de huisbaas komt', niveau: 2 },
  { term: 'Datalek', uitleg: 'Gegevens die bij een bedrijf op straat komen te liggen', huis: 'Inbraak bij de sleutelmaker', kamer: 'sleutels', niveau: 1 },
  { term: 'DDoS-aanval', uitleg: 'Duizenden computers bezoeken tegelijk één site, zodat die voor echte bezoekers onbereikbaar wordt', huis: 'Een steen door de ruit, geen inbraak', niveau: 3 },
  { term: 'Deepfake', uitleg: 'Met AI nagemaakte video, foto of stem van een echt persoon', huis: 'Een inbreker met het gezicht van je buurman', niveau: 2 },
  { term: 'DNS', uitleg: 'Het telefoonboek van internet: het zet een webadres om in het nummer van de server. Een filterende DNS-dienst blokkeert bekende foute adressen', huis: 'De portier die opzoekt waar je heen wilt', kamer: 'tuinhek', niveau: 3 },
  { term: 'Encryptie / versleuteling', uitleg: 'Gegevens onleesbaar maken voor wie de sleutel niet heeft', huis: 'Een kluis om je spullen', niveau: 2 },
  { term: 'Extensie', uitleg: 'Een uitbreiding voor je browser', huis: 'Iemand die mag meekijken door je raam', kamer: 'ramen', niveau: 2 },
  { term: 'Firmware', uitleg: 'De ingebouwde software van een apparaat, zoals je router', huis: 'Het binnenwerk van het slot', kamer: 'tuinhek', niveau: 3 },
  { term: 'Gastnetwerk', uitleg: 'Een tweede wifi-netwerk van hetzelfde kastje, los van je eigen apparaten. Slimme apparaten horen daarop', huis: 'De bijkeuken met een eigen deur', kamer: 'kattenluik', niveau: 2 },
  { term: 'Hacktivist', uitleg: 'Iemand die hackt uit politieke overtuiging, vaak in een groep en soms gestuurd door een land', huis: 'De relschopper in de straat', niveau: 3 },
  { term: 'Hardware key', uitleg: 'Een fysiek sleuteltje dat je in je apparaat steekt of ertegen houdt: een passkey in metaal, en de sterkste vorm van 2FA. In winkels heet hij ook security key', huis: 'Een echte sleutel aan je sleutelbos', kamer: 'passkey', niveau: 3 },
  { term: 'Herstelcodes', uitleg: 'Eenmalige noodcodes om binnen te komen zonder telefoon. Ook wel noodcodes of backup codes', huis: 'De reservesleutel bij de buren', kamer: 'sleutels', niveau: 2 },
  { term: 'Hoofdwachtwoord', uitleg: 'Het ene lange wachtwoord dat je wachtwoordmanager opent. Als enige moet je dit uit je hoofd kennen', huis: 'De sleutel van de sleutelkluis', kamer: 'sleutelkluis', niveau: 1 },
  { term: 'Kwantumcomputer', uitleg: 'Nieuw type computer dat bepaalde wiskundige sloten kan breken', huis: 'De loper voor oude sloten', niveau: 3 },
  { term: 'Malware', uitleg: 'Verzamelnaam voor kwaadaardige software', huis: 'Ongedierte in huis', niveau: 2 },
  { term: 'Open broncode', uitleg: 'Software waarvan iedereen de binnenkant mag inzien en controleren. In het Engels: open source', huis: 'Een slot waarvan de tekening openbaar is', niveau: 3 },
  { term: 'Passkey', uitleg: 'Inloggen met je toestel plus je vinger, gezicht of pincode: twee stappen in één handeling, dus een vorm van 2FA. Op deze site ook de zegelring', huis: 'De sleutel die niet te kopiëren is', kamer: 'passkey', niveau: 2 },
  { term: 'Phishing', uitleg: 'Nepbericht dat je laat klikken, inloggen of betalen', huis: 'De babbeltruc aan de deur', kamer: 'brievenbus', niveau: 1 },
  { term: 'Post-kwantumcryptografie', uitleg: 'Nieuwe versleuteling die bestand is tegen kwantumcomputers', huis: 'De nieuwe generatie sloten', niveau: 3 },
  { term: 'Ransomware', uitleg: 'Software die je bestanden gijzelt voor losgeld', huis: 'Gijzeling van je inboedel', kamer: 'brandkast', niveau: 2 },
  { term: 'Router', uitleg: 'Het kastje dat je huis met internet verbindt', huis: 'Tuinhek en meterkast', kamer: 'tuinhek', niveau: 1 },
  { term: 'Schijfversleuteling', uitleg: 'Alles op je laptop onleesbaar maken zonder jouw wachtwoord. Heet FileVault op een Mac en BitLocker op Windows', huis: 'Een kluisdeur om je hele huis', kamer: 'tweede-voordeur', niveau: 2 },
  { term: 'Sextortion', uitleg: 'Chantage met echte of verzonnen naaktbeelden. Betalen helpt niet: bewaar het bericht, betaal niets en doe aangifte', huis: 'Afpersing aan de voordeur', niveau: 2 },
  { term: 'Sim-swapping', uitleg: 'Je telefoonnummer laten overzetten naar een oplichter, waarna sms-codes bij hém aankomen', huis: 'Iemand laat je post omleiden', kamer: 'brievenbus', niveau: 3 },
  { term: 'Social engineering', uitleg: 'Mensen manipuleren in plaats van systemen hacken', huis: 'De inbreker die aanbelt in een net pak', niveau: 3 },
  { term: 'Statelijke actor', uitleg: 'Een land dat hackt: voor spionage, sabotage of beïnvloeding', huis: 'De inbreker met een leger achter zich', niveau: 3 },
  { term: 'Tracking', uitleg: 'Volgen wat je online doet om een profiel op te bouwen', huis: 'Meekijkers door het raam', kamer: 'ramen', niveau: 2 },
  { term: 'Update', uitleg: 'Reparatie van fouten in software', huis: 'De timmerman die scheuren dicht', kamer: 'onderhoud', niveau: 1 },
  { term: 'VPN', uitleg: 'Een afgeschermde verbinding tussen jou en het internet', huis: 'De overdekte gang naar buiten', kamer: 'gang', niveau: 2 },
  { term: 'Wachtwoordmanager', uitleg: 'Programma dat al je wachtwoorden maakt en bewaart. In het Engels: password manager', huis: 'De sleutelkluis', kamer: 'sleutelkluis', niveau: 1 },
  { term: 'Zegelring', uitleg: 'Het beeld dat deze site gebruikt voor de passkey: een sleutel die alleen in jouw hand werkt en die niemand kan namaken', huis: 'De ring die je niet uitleent', kamer: 'passkey', niveau: 1 },
];
