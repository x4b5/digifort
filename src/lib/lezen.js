/**
 * De leesvoorkeur: hoe groot de tekst is en welke kleuren.
 * Eigen laatje, los van `opslag.js`: "wis mijn antwoorden" mag
 * de leesinstelling niet omgooien.
 */
const SLEUTEL = 'jdh:lezen';

export const STANDAARD = Object.freeze({ tekst: 'normaal', thema: 'light' });

/** Alleen deze standen bestaan. Staat er iets anders in het laatje, dan negeren we het:
    anders zet één rare waarde de pagina in een stand die geen knop kan terugdraaien. */
const GELDIG = Object.freeze({ tekst: ['normaal', 'groot', 'groter'], thema: ['auto', 'light', 'dark'] });
const keur = (veld, waarde) => (GELDIG[veld].includes(waarde) ? waarde : STANDAARD[veld]);

export function leesLezen() {
  try {
    const ruw = window.localStorage.getItem(SLEUTEL);
    if (!ruw) return { ...STANDAARD };
    const data = JSON.parse(ruw);
    return { tekst: keur('tekst', data.tekst), thema: keur('thema', data.thema) };
  } catch {
    return { ...STANDAARD };
  }
}

/** Zet de keuze op <html>, zodat de css het overneemt. */
export function pasToe(voorkeur) {
  const html = document.documentElement;
  if (voorkeur.tekst === 'normaal') delete html.dataset.tekst;
  else html.dataset.tekst = voorkeur.tekst;
  if (voorkeur.thema === 'auto') delete html.dataset.theme;
  else html.dataset.theme = voorkeur.thema;
  return voorkeur;
}

/** Eén veld ('tekst' of 'thema') wijzigen; geeft de nieuwe voorkeur terug. */
export function zetLezen(veld, waarde) {
  const nieuw = { ...leesLezen(), [veld]: waarde };
  try {
    window.localStorage.setItem(SLEUTEL, JSON.stringify(nieuw));
  } catch {
    /* opslag geblokkeerd: werkt deze sessie, onthoudt niets */
  }
  pasToe(nieuw);
  window.dispatchEvent(new CustomEvent('jdh:lezen', { detail: nieuw }));
  return nieuw;
}
