/**
 * Per kamer: staat de deur open, dicht, of weten we het niet?
 * Een vinkje in een lijst is het nieuwste bewijs en wint van een "nee" op de huischeck:
 * wie "nee" zei en daarna de stap afvinkt, heeft de deur dichtgedaan.
 */
import { VRAGEN } from '../data/huischeck.js';
import { LIJSTEN } from '../data/lijsten.js';
import { KAMERS, kamer } from '../data/kamers.js';

/**
 * De volgorde waarin je deuren dichtdoet: eerst de voordeur, dan het tweede slot,
 * dan de kluis, dan de rest. Eén lijst, zodat de huischeck en de voorpagina
 * dezelfde eerstvolgende stap noemen.
 */
export const BOUWVOLGORDE = ['voordeur', 'tweede-slot', 'sleutelkluis', 'onderhoud', 'tweede-voordeur', 'brievenbus', 'sleutels', 'tuinhek', 'brandkast', 'eigendomsakte'];

export function toestandPerKamer(data) {
  return Object.fromEntries(
    KAMERS.map((k) => {
      const antwoorden = VRAGEN.filter((v) => v.kamer === k.id).map((v) => data.huischeck[v.nr]);
      const vinkjes = Object.entries(LIJSTEN).flatMap(([lijst, l]) =>
        l.items.filter((it) => it.kamer === k.id).map((it) => Boolean(data.lijsten[lijst]?.[it.id])),
      );
      if (vinkjes.includes(true)) return [k.id, 'dicht'];
      // "nee" en "weet ik niet" (null) tellen allebei als open deur, net als in de uitslag
      if (antwoorden.includes(false) || antwoorden.includes(null)) return [k.id, 'open'];
      if (antwoorden.includes(true)) return [k.id, 'dicht'];
      return [k.id, 'onbekend'];
    }),
  );
}

/**
 * Hoe ver ben je? `gedaan` telt de kamers die dicht zijn, `open` die het niet zijn,
 * en `volgende` is de eerste open kamer in de bouwvolgorde — met de stap erbij
 * als er een afvinklijst is die hem dekt. Geeft null terug als er nog niets is ingevuld:
 * wie net binnenkomt hoort geen voortgang te zien die hij niet heeft.
 */
export function hoeVer(data) {
  const toestand = toestandPerKamer(data);
  const bekend = BOUWVOLGORDE.filter((id) => toestand[id] !== 'onbekend');
  if (!bekend.length) return null;
  const open = BOUWVOLGORDE.filter((id) => toestand[id] === 'open');
  const volgendeId = open[0];
  const k = volgendeId ? kamer(volgendeId) : null;
  const stap = volgendeId
    ? Object.entries(LIJSTEN).flatMap(([lijst, l]) => l.items.filter((it) => it.kamer === volgendeId).map((it) => ({ lijst, it })))[0]
    : null;
  return {
    gedaan: BOUWVOLGORDE.filter((id) => toestand[id] === 'dicht').length,
    open: open.length,
    totaal: BOUWVOLGORDE.length,
    volgende: k ? { naam: k.naam, wat: k.wat, stap: stap?.it.stap ?? k.zin, href: stap ? `/aan-de-slag#${stap.lijst}` : `/plattegrond#${k.anker}` } : null,
  };
}
