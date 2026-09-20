/**
 * Per kamer: staat de deur open, dicht, of weten we het niet?
 * Een "nee" op de huischeck wint van alles; daarna telt elk vinkje of "ja" als dicht.
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
      if (antwoorden.includes(false)) return [k.id, 'open'];
      if (antwoorden.includes(true) || vinkjes.includes(true)) return [k.id, 'dicht'];
      return [k.id, 'onbekend'];
    }),
  );
}
