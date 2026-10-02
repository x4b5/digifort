/**
 * Het gereedschap dat de site noemt: naam, logo (sleutel in simple-icons, of null voor een
 * letter-tegeltje), één zin, en de officiële site. Geen affiliate-links: niemand verdient hieraan.
 */
export const GEREEDSCHAP = {
  bitwarden: { naam: 'Bitwarden', icoon: 'siBitwarden', wat: 'Kluis voor je wachtwoorden. Gratis, iedereen mag nakijken hoe het werkt, en het werkt op al je toestellen.', url: 'https://bitwarden.com' },
  protonpass: { naam: 'Proton Pass', icoon: 'siProton', wat: 'Kluis voor je wachtwoorden van Proton. Kan ook voor elke webwinkel een apart e-mailadres maken.', url: 'https://proton.me/pass' },
  ente: { naam: 'Ente Auth', icoon: 'siEnte', wat: 'App die de codes maakt voor je tweede slot. Bewaart een reservekopie die alleen jij kunt openen.', url: 'https://ente.io/auth' },
  '2fas': { naam: '2FAS', icoon: 'si2fas', wat: 'Eenvoudige app die de codes maakt voor je tweede slot.', url: 'https://2fas.com' },
  aegis: { naam: 'Aegis', icoon: null, letter: 'A', wat: 'App die de codes maakt voor je tweede slot. Alleen voor Android.', url: 'https://getaegis.app' },
  yubikey: { naam: 'YubiKey', icoon: 'siYubico', wat: 'Een klein sleuteltje voor je sleutelbos: het sterkste tweede slot dat er is. Kost geld. Koop er twee.', url: 'https://www.yubico.com' },
  ublock: { naam: 'uBlock Origin', icoon: 'siUblockorigin', wat: 'Houdt advertenties en meekijkers tegen in je browser. Werkt het best in Firefox.', url: 'https://ublockorigin.com' },
  firefox: { naam: 'Firefox', icoon: 'siFirefoxbrowser', wat: 'Browser om mee op internet te gaan. Hierin werkt uBlock Origin helemaal.', url: 'https://www.firefox.com/nl' },
  hibp: { naam: 'Have I Been Pwned', icoon: 'siHaveibeenpwned', wat: 'Kijk of je e-mailadres in een bekend datalek zit. Vraagt nooit een wachtwoord.', url: 'https://haveibeenpwned.com' },
  kopieid: { naam: 'KopieID', icoon: null, letter: 'K', wat: 'App van de overheid die je BSN en foto doorstreept op een kopie van je ID.', url: 'https://www.rijksoverheid.nl/onderwerpen/identiteitsfraude/vraag-en-antwoord/veilige-kopie-identiteitsbewijs' },
  digid: { naam: 'DigiD-app', icoon: null, letter: 'D', wat: 'Inloggen bij de overheid met een app in plaats van een sms-code.', url: 'https://www.digid.nl/digid-app' },
};

export function gereedschap(id) {
  const g = GEREEDSCHAP[id];
  if (!g) throw new Error(`Onbekend gereedschap: ${id}`);
  return g;
}
