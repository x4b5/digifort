import { test, expect } from '@playwright/test';

import { PAGINAS } from './paginas.js';

/**
 * Tekst in een SVG breekt niet af en past zich niet aan: staat een regel niet in zijn vak,
 * dan loopt hij er gewoon uit. Dat zie je alleen op een screenshot, en dus meestal niet.
 * Deze test meet het: per tekstregel de werkelijke afmeting, vergeleken met de tekening
 * en met de vorm eromheen.
 *
 * Een vorm telt als tekstvak zodra hij het midden van een regel omsluit. Omsluit een vorm
 * wel een label maar is hij geen vak (een dak, een deur waar het label bóven hangt),
 * geef hem dan data-geen-vak.
 */

// letters renderen per browser een fractie anders; alles daarboven is een echte fout
const SPELING = 1;

const meet = (speling) => {
  const fouten = [];
  for (const svg of document.querySelectorAll('svg')) {
    const vb = svg.viewBox?.baseVal;
    if (!vb || !vb.width) continue;
    const waar = (svg.getAttribute('aria-label') || svg.getAttribute('role') || 'tekening').slice(0, 40);

    const regels = [];
    for (const el of svg.querySelectorAll('text')) {
      let vak;
      try { vak = el.getBBox(); } catch { continue; }
      if (vak.width) regels.push({ vak, tekst: el.textContent.trim() });
    }

    const vormen = [...svg.querySelectorAll('rect, path, polygon, circle, ellipse')]
      .filter((el) => !el.hasAttribute('data-geen-vak') && typeof el.isPointInFill === 'function');

    const punt = svg.createSVGPoint();
    const raakt = (el, x, y) => { punt.x = x; punt.y = y; try { return el.isPointInFill(punt); } catch { return false; } };

    for (const { vak, tekst } of regels) {
      const rechts = vak.x + vak.width;
      const onder = vak.y + vak.height;

      // 1. de regel blijft binnen de tekening zelf
      const buiten = Math.max(vb.x - vak.x, rechts - (vb.x + vb.width), vb.y - vak.y, onder - (vb.y + vb.height));
      if (buiten > speling) {
        fouten.push(`"${tekst}" steekt ${buiten.toFixed(1)} buiten de tekening — ${waar}`);
        continue;
      }

      // 2. zit de regel in een vorm, dan past hij er helemaal in
      for (const el of vormen) {
        if (!raakt(el, vak.x + vak.width / 2, vak.y + vak.height / 2)) continue;
        const hoeken = [[vak.x, vak.y], [rechts, vak.y], [vak.x, onder], [rechts, onder]];
        const eruit = hoeken.filter(([x, y]) => !raakt(el, x, y)
          && !raakt(el, x + (x === vak.x ? speling : -speling), y + (y === vak.y ? speling : -speling)));
        if (eruit.length) fouten.push(`"${tekst}" past niet in zijn vak (${eruit.length} van 4 hoeken erbuiten) — ${waar}`);
      }
    }

    // 3. twee regels liggen nooit over elkaar heen
    for (let i = 0; i < regels.length; i++) {
      for (let j = i + 1; j < regels.length; j++) {
        const a = regels[i].vak; const b = regels[j].vak;
        const x = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
        const y = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
        if (x > speling && y > speling) {
          fouten.push(`"${regels[i].tekst}" ligt over "${regels[j].tekst}" — ${waar}`);
        }
      }
    }
  }
  return fouten;
};

for (const pad of PAGINAS) {
  test(`${pad}: alle tekst in de tekeningen past in zijn vak`, async ({ page }) => {
    await page.goto(pad);
    expect(await page.evaluate(meet, SPELING)).toEqual([]);
  });
}
