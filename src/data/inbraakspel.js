/**
 * "Breek in bij Ria": de lezer speelt de oplichter in een vertakt WhatsApp-gesprek
 * (Inbraakspel.astro). Elke stap heeft keuzes; een keuze leidt naar de volgende stap
 * of naar een einde. Elk doodlopend einde legt uit waarom een echte oplichter het zo
 * niet doet. Die uitleg leunt op de bronnen over hulpvraagfraude in bronnen.js
 * (Fraudehelpdesk, SNS, RegioBank).
 *
 * @typedef {{ jij: string, ria: string, naar: string }} Keuze
 * @typedef {{ vraag: string, keuzes: Keuze[] }} Stap
 * @typedef {{ binnen: boolean, tekst: string }} Einde
 * @typedef {{ id: string, titel: string, intro: string, start: string,
 *   stappen: Record<string, Stap>, eindes: Record<string, Einde>, tegenhouden: string[] }} Inbraakspel
 */

/** @type {Inbraakspel[]} */
export const INBRAAKSPELLEN = [
  {
    id: 'hoi-mam',
    titel: 'Breek in bij Ria',
    intro: 'Jij bent de oplichter. Je hebt het nummer van Ria, en op haar Facebook zie je dat haar dochter Sanne heet. Je wilt vandaag nog geld zien. Kies steeds wat je stuurt.',
    start: 'eerste',
    stappen: {
      eerste: {
        vraag: 'Je eerste bericht aan Ria:',
        keuzes: [
          { jij: 'Hoi mam, dit is mijn nieuwe nummer. Wil je het opslaan? 😘', ria: 'Hé lieverd! Wat is er met je oude telefoon?', naar: 'doorvragen' },
          { jij: 'Mam, ik heb NU €900 nodig, spoed!!', ria: 'Wie is dit? Ik bel Sanne even.', naar: 'mis-haast' },
        ],
      },
      doorvragen: {
        vraag: 'Ria vraagt door. Wat zeg je?',
        keuzes: [
          { jij: 'In de wc gevallen 🙈 Bellen lukt even niet, slecht bereik hier.', ria: 'Ach meid, wat vervelend.', naar: 'verzoek' },
          { jij: 'Lang verhaal, ik bel je zo!', ria: 'Ik bel jou wel even.', naar: 'mis-bellen' },
        ],
      },
      verzoek: {
        vraag: 'Nu het geld. Wat vraag je?',
        keuzes: [
          { jij: 'Ik moet vandaag nog een rekening betalen en mijn bankapp werkt niet op deze telefoon. Kun jij het voorschieten? Morgen krijg je het terug ❤️', ria: 'Natuurlijk, stuur maar door.', naar: 'binnen' },
          { jij: 'Stuur me je inlogcodes van de bank, dan regel ik het zelf.', ria: 'Mijn codes? Dat vraag jij nooit.', naar: 'mis-codes' },
        ],
      },
    },
    eindes: {
      'mis-haast': {
        binnen: false,
        tekst: 'Ria belt Sanne op haar oude nummer, en Sanne neemt op. Wie meteen om geld vraagt, valt door de mand. Echte oplichters melden eerst alleen een nieuw nummer, en vragen pas daarna om geld.',
      },
      'mis-bellen': {
        binnen: false,
        tekst: 'Ria belt terug en hoort een vreemde stem. Een telefoontje verraadt je. Daarom zegt een oplichter dat bellen niet lukt: slecht bereik, alleen ruis.',
      },
      'mis-codes': {
        binnen: false,
        tekst: 'Om codes vragen laat Ria nadenken. Een oplichter vraagt om een gewone gunst: even voorschieten, morgen terug. En dan met haast.',
      },
      binnen: {
        binnen: true,
        tekst: 'Ria maakt €900 over. Het geld is weg. Een nieuw nummer, een smoes om niet te bellen, haast en een belofte om het terug te betalen: meer was er niet nodig.',
      },
    },
    tegenhouden: [
      'Bel het oude nummer uit je eigen contacten. Neemt Sanne op, dan is het nieuwe nummer nep.',
      'Stel een vraag die alleen Sanne weet, zoals: hoe heette onze eerste hond?',
      'Spreek als familie een geheim woord af voor geldvragen.',
    ],
  },
];

/** @param {string} id @returns {Inbraakspel} */
export function inbraakspel(id) {
  const spel = INBRAAKSPELLEN.find((s) => s.id === id);
  if (!spel) throw new Error(`Inbraakspel "${id}" bestaat niet`);
  return spel;
}
