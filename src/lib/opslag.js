/**
 * Eén laatje in de browser voor alles wat de bezoeker invult.
 * Nooit naar een server. Elke lees- en schrijfactie zit in try/catch:
 * in een privévenster of bij geblokkeerde opslag werkt de site gewoon door.
 */
const SLEUTEL = 'jdh:v1';

const VERSIE = 1;
const LEEG = Object.freeze({ versie: VERSIE, huischeck: {}, lijsten: {} });

/**
 * Oudere vormen van het laatje omzetten naar de huidige.
 * Nu nog leeg: er is één versie. Verandert de vorm, dan hoort hier de omzetting,
 * zodat niemand stilzwijgend zijn vinkjes kwijtraakt.
 */
function migreer(data) {
  return { ...data, versie: VERSIE };
}

export function lees() {
  try {
    const ruw = window.localStorage.getItem(SLEUTEL);
    if (!ruw) return { ...LEEG };
    const data = JSON.parse(ruw);
    return migreer({ huischeck: { ...(data.huischeck ?? {}) }, lijsten: { ...(data.lijsten ?? {}) } });
  } catch {
    return { ...LEEG };
  }
}

function schrijf(data) {
  try {
    window.localStorage.setItem(SLEUTEL, JSON.stringify(data));
  } catch {
    /* opslag geblokkeerd: de pagina werkt, alleen onthoudt hij niets */
  }
  window.dispatchEvent(new CustomEvent('jdh:gewijzigd', { detail: data }));
  return data;
}

/** Antwoord op huischeck-vraag `nr` (1..10): true = ja, false = nee. */
export function zetAntwoord(nr, waarde) {
  const oud = lees();
  return schrijf({ ...oud, huischeck: { ...oud.huischeck, [nr]: waarde } });
}

/** Vinkje in lijst `lijst` bij item `id`. */
export function zetVinkje(lijst, id, aan) {
  const oud = lees();
  const items = { ...(oud.lijsten[lijst] ?? {}), [id]: aan };
  return schrijf({ ...oud, lijsten: { ...oud.lijsten, [lijst]: items } });
}

export function wisAlles() {
  try {
    window.localStorage.removeItem(SLEUTEL);
  } catch {
    /* niets te wissen */
  }
  window.dispatchEvent(new CustomEvent('jdh:gewijzigd', { detail: { ...LEEG } }));
}
