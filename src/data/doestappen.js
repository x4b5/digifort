/**
 * Van naslag naar doen: zoek bij een item uit de afvinklijsten (lijsten.js) op welke
 * stap-voor-stap-pagina het staat, en het hoeveelste het daar is.
 *
 * Het nummer en de titel komen uit lijsten.js, net als op de stap-voor-stap-pagina's zelf.
 * Verschuift daar een stap, dan klopt "stap 6" op de naslagpagina's vanzelf weer.
 */
import { LIJSTEN } from './lijsten.js';

/** Welke lijst op welke pagina staat. */
export const STAPPAGINAS = {
  'niveau-1': { href: '/een-avond', titel: 'Ik heb één avond' },
  'niveau-2': { href: '/een-weekend', titel: 'Ik heb een weekend' },
  'niveau-3': { href: '/ik-wil-verder', titel: 'Ik wil verder' },
};

/**
 * @param {string} id het id van een item in niveau 1, 2 of 3
 * @returns {{ id: string, stap: string, nr: number, tijd?: number, href: string, pagina: string, lijst: string }}
 */
export function doeStap(id) {
  for (const [lijst, pagina] of Object.entries(STAPPAGINAS)) {
    const items = LIJSTEN[lijst].items;
    const i = items.findIndex((it) => it.id === id);
    if (i >= 0) {
      return { id, stap: items[i].stap, nr: i + 1, tijd: items[i].tijd, href: pagina.href, pagina: pagina.titel, lijst };
    }
  }
  throw new Error(`Doe-stap "${id}" staat niet in niveau 1, 2 of 3`);
}
