/**
 * Per kamer: staat de deur open, dicht, of weten we het niet?
 * Een vinkje in een lijst is het nieuwste bewijs en wint van een "nee" op de huischeck:
 * wie "nee" zei en daarna de stap afvinkt, heeft de deur dichtgedaan.
 */
import { VRAGEN } from '../data/huischeck.js';
import { LIJSTEN } from '../data/lijsten.js';
import { KAMERS } from '../data/kamers.js';

export function toestandPerKamer(data) {
  return Object.fromEntries(
    KAMERS.map((k) => {
      const antwoorden = VRAGEN.filter((v) => v.kamer === k.id).map((v) => data.huischeck[v.nr]);
      const vinkjes = Object.entries(LIJSTEN).flatMap(([lijst, l]) =>
        l.items.filter((it) => it.kamer === k.id).map((it) => Boolean(data.lijsten[lijst]?.[it.id])),
      );
      if (vinkjes.includes(true)) return [k.id, 'dicht'];
      if (antwoorden.includes(false)) return [k.id, 'open'];
      if (antwoorden.includes(true)) return [k.id, 'dicht'];
      return [k.id, 'onbekend'];
    }),
  );
}
