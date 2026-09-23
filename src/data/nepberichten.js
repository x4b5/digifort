/**
 * Nagemaakte oplichtersberichten voor de oefening "vind de truc" (Nepbericht.astro).
 * Elk bericht bestaat uit stukjes tekst; een stukje met `vlag` is een verdachte plek
 * die de lezer kan aantikken. De uitleg bij elke vlag leunt op een bron die al in
 * bronnen.js staat (DigiD, Veiliginternetten, Fraudehelpdesk, Openbaar Ministerie).
 *
 * @typedef {string | { tekst: string, vlag: string }} Stukje
 * @typedef {{ id: string, kanaal: 'sms' | 'WhatsApp', afzender: string, tijd: string,
 *   bubbels: Stukje[][], vlaggen: Record<string, string>, les: string }} Nepbericht
 */

/** @type {Nepbericht[]} */
export const NEPBERICHTEN = [
  {
    id: 'digid',
    kanaal: 'sms',
    afzender: 'DigiD',
    tijd: '08:14',
    bubbels: [[
      'Uw DigiD verloopt ',
      { tekst: 'vandaag om 23:59', vlag: 'haast' },
      '. Verleng direct via ',
      { tekst: 'digid-verlengen.nl/inloggen', vlag: 'link' },
      ' om ',
      { tekst: 'blokkade van uw toeslagen', vlag: 'angst' },
      ' te voorkomen.',
    ]],
    vlaggen: {
      haast: 'Haast. Je moet het nu doen, dan denk je niet na. Volgens de Fraudehelpdesk is tijd nemen belangrijker dan elk los signaal kennen.',
      link: 'Een link om in te loggen. DigiD stuurt nooit een inloglink, niet per sms en niet per mail. Ga zelf naar digid.nl.',
      angst: 'Angst. Er dreigt iets met je geld. Dat is dezelfde druk als de haast: je moet reageren voordat je gaat twijfelen.',
    },
    les: 'Tik nooit op een link om in te loggen. Typ het adres zelf, of open de app die je al hebt.',
  },
  {
    id: 'tikkie',
    kanaal: 'WhatsApp',
    afzender: '+31 6 1843 ••••',
    tijd: '19:02',
    bubbels: [
      ['Hoi! Ik wil je fiets graag kopen voor de vraagprijs 👍'],
      [
        { tekst: 'Kun je eerst 1 cent overmaken ter controle?', vlag: 'cent' },
        ' Dan weet ik dat je echt bent. ',
        { tekst: 'tikkie-betalen.nl/verify/82k1', vlag: 'link' },
      ],
      [{ tekst: 'Graag snel, ik moet zo weg', vlag: 'haast' }],
    ],
    vlaggen: {
      cent: 'Eén cent "ter controle". Waarom zou jij betalen als je iets verkoopt? Die cent is het lokaas: de link erachter gaat naar een nagemaakte bankpagina.',
      link: 'Het adres klopt niet. Tikkie heeft maar één webadres: tikkie.me. Alles wat erop lijkt, is nep.',
      haast: 'Haast. Wie snel moet, controleert niet. Een echte koper kan ook morgen nog betalen.',
    },
    les: 'Verkoop je iets? Dan krijg jij geld. Moet je daarvoor eerst zelf iets overmaken, dan klopt het niet.',
  },
  {
    id: 'hoi-mam',
    kanaal: 'WhatsApp',
    afzender: '+31 6 2957 ••••',
    tijd: '10:37',
    bubbels: [
      ['Hoi mam, ', { tekst: 'dit is mijn nieuwe nummer', vlag: 'nummer' }, '. Oude telefoon is in de wc gevallen 🙈 Sla je hem op?'],
      [
        { tekst: 'Ik moet vandaag nog een rekening betalen', vlag: 'haast' },
        ' maar mijn bankapp werkt nog niet op deze telefoon. ',
        { tekst: 'Kun jij het overmaken naar de rekening van de verhuurder?', vlag: 'rekening' },
        ' Ik betaal je morgen terug ❤️',
      ],
      [{ tekst: 'Bellen lukt nu even niet, zit in de trein', vlag: 'bellen' }],
    ],
    vlaggen: {
      nummer: 'Een nieuw nummer. Daar begint de truc. In een rechtszaak uit 2021 zetten twee oplichters de foto van iemands kind op een WhatsApp-account en stuurden ze berichten vanaf een nieuw nummer.',
      haast: 'Haast. Het moet vandaag. In die rechtszaak was het een loodgieter die met spoed betaald moest worden, of een hypotheek die geblokkeerd stond.',
      rekening: 'Geld naar de rekening van een ander. Zo gaat het geld naar een geldezel: iemand die zijn rekening uitleent. Zonder die tussenpersonen werkt deze oplichting niet.',
      bellen: 'Bellen kan niet. Wie niet belt, kun je niet horen. Bel dus juist wel, op het oude nummer: dan krijg je je echte kind aan de lijn.',
    },
    les: 'Bel het oude nummer. Neemt je kind op, dan is het nieuwe nummer nep. Of vraag naar het geheime woord van je familie.',
  },
];

/** Het bericht met dit id; gooit een fout bij het bouwen als het niet bestaat. */
export function nepbericht(id) {
  const bericht = NEPBERICHTEN.find((b) => b.id === id);
  if (!bericht) throw new Error(`Nepbericht "${id}" bestaat niet`);
  return bericht;
}
