/**
 * De leesvoorkeur: hoe groot de tekst is en welke kleuren.
 * Eigen laatje, los van `opslag.js`: "wis mijn antwoorden" mag
 * de leesinstelling niet omgooien.
 */
const SLEUTEL = 'jdh:lezen';

export const STANDAARD = Object.freeze({ tekst: 'normaal', thema: 'auto' });

export function leesLezen() {
  try {
    const ruw = window.localStorage.getItem(SLEUTEL);
    if (!ruw) return { ...STANDAARD };
    const data = JSON.parse(ruw);
    return { tekst: data.tekst ?? STANDAARD.tekst, thema: data.thema ?? STANDAARD.thema };
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
