/**
 * De tien delen van het fort. Elk deel hoort bij één of meer plekken uit het huis (kamers.js).
 * Een deel "staat" als al zijn kamers dicht zijn; het "wankelt" zodra er één open is.
 */
export const FORTDELEN = [
  { id: 'poort', naam: 'De poort', kamers: ['voordeur', 'tweede-voordeur'], wat: 'je e-mail en het account van je toestel, elk met een eigen sterk wachtwoord' },
  { id: 'sloten', naam: 'De twee sloten op de poort', kamers: ['tweede-slot', 'passkey'], wat: 'tweestapsverificatie of een passkey' },
  { id: 'muur', naam: 'De muur', kamers: ['sleutels'], wat: 'voor elke deur een andere sleutel' },
  { id: 'gracht', naam: 'De gracht', kamers: ['sleutelkluis'], wat: 'een wachtwoordmanager die de sleutels bewaart' },
  { id: 'brug', naam: 'De ophaalbrug', kamers: ['brievenbus'], wat: 'jij bepaalt wie binnenkomt: het geheime woord en een sim-pincode' },
  { id: 'toren', naam: 'De torenwacht', kamers: ['onderhoud'], wat: 'updates op automatisch' },
  { id: 'luiken', naam: 'De luiken', kamers: ['ramen'], wat: 'een browser die niet meekijkt' },
  { id: 'hek', naam: 'Het hek', kamers: ['tuinhek'], wat: 'een router met een eigen wachtwoord' },
  { id: 'schat', naam: 'De schatkamer buiten de muur', kamers: ['brandkast'], wat: 'een reservekopie op een andere plek' },
  { id: 'schild', naam: 'Het wapenschild', kamers: ['eigendomsakte'], wat: 'zuinig op je BSN en je DigiD' },
];

/** Per fortdeel: 'dicht' als alle kamers dicht zijn, 'open' zodra er één open is, anders 'onbekend'. */
export function toestandPerDeel(kamerToestand) {
  return Object.fromEntries(
    FORTDELEN.map((d) => {
      const t = d.kamers.map((k) => kamerToestand[k]);
      if (t.includes('open')) return [d.id, 'open'];
      if (t.every((x) => x === 'dicht')) return [d.id, 'dicht'];
      return [d.id, 'onbekend'];
    }),
  );
}
