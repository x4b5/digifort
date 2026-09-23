/**
 * Het gezin dat door de site loopt, van open huis naar fort. Ze zijn bedacht; wat ze
 * meemaken niet. Elke scène (Scene.astro) noemt de bron van wat er gebeurt.
 *
 * @typedef {{ id: 'ria' | 'sanne' | 'milan', naam: string, leeftijd: number, wie: string }} Bewoner
 */

/** @type {Bewoner[]} */
export const BEWONERS = [
  { id: 'ria', naam: 'Ria', leeftijd: 68, wie: 'moeder van Sanne, oma van Milan' },
  { id: 'sanne', naam: 'Sanne', leeftijd: 41, wie: 'dochter van Ria, moeder van Milan' },
  { id: 'milan', naam: 'Milan', leeftijd: 14, wie: 'zoon van Sanne' },
];

/** @param {string} id */
export function bewoner(id) {
  const b = BEWONERS.find((x) => x.id === id);
  if (!b) throw new Error(`Bewoner "${id}" bestaat niet`);
  return b;
}
