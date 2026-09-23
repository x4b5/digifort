import { HOOFDSTUKKEN, VOETPAGINAS } from '../src/lib/site.js';

/**
 * Alle pagina's van de site, op één plek: de laadtest, de axe-test en de tekeningtest
 * lopen dezelfde lijst af.
 *
 * De hoofdstukken komen uit site.js in plaats van uit een tweede handgeschreven lijst.
 * Toen die lijst nog los bestond liep hij achter, en vielen nieuwe hoofdstukken buiten
 * élke test zonder dat iets dat meldde. Staat een hoofdstuk niet in site.js, dan klaagt
 * eenheid.spec.js daar al over.
 */
export const PAGINAS = ['/', ...HOOFDSTUKKEN.map((h) => `/${h.slug}`), ...VOETPAGINAS.map((p) => `/${p.slug}`), '/404'];
