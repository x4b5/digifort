/**
 * Eén laatje in de browser voor alles wat de bezoeker invult.
 * Nooit naar een server. Elke lees- en schrijfactie zit in try/catch:
 * in een privévenster of bij geblokkeerde opslag werkt de site gewoon door.
 */
const SLEUTEL = 'jdh:v1';

const VERSIE = 2;
const LEEG = Object.freeze({ versie: VERSIE, huischeck: {}, lijsten: {}, cijfer: null });

/**
 * Oudere vormen van het laatje omzetten naar de huidige.
 * Versie 1 kende het eigen cijfer nog niet. Wie toen de check deed houdt al zijn
 * antwoorden en vinkjes, en krijgt `cijfer: null`: de vraag bereikt hem gewoon opnieuw.
 */
function migreer(data) {
  return { cijfer: null, ...data, versie: VERSIE };
}

/** Een cijfer is 1 tot en met 10, of niets. Al het andere uit het laatje negeren we. */
function schoonCijfer(waarde) {
  return Number.isInteger(waarde) && waarde >= 1 && waarde <= 10 ? waarde : null;
}

export function lees() {
  try {
    const ruw = window.localStorage.getItem(SLEUTEL);
    if (!ruw) return { ...LEEG };
    const data = JSON.parse(ruw);
    return migreer({
      huischeck: { ...(data.huischeck ?? {}) },
      lijsten: { ...(data.lijsten ?? {}) },
      cijfer: schoonCijfer(data.cijfer),
    });
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

/** Het cijfer dat de bezoeker zichzelf vooraf geeft (1..10), of null om het te wissen. */
export function zetCijfer(waarde) {
  const oud = lees();
  return schrijf({ ...oud, cijfer: schoonCijfer(waarde) });
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
