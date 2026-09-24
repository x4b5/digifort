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
      if (!el.getBoundingClientRect().width) continue;
      try { vak = el.getBBox(); } catch { continue; }
      if (vak.width) regels.push({ vak, tekst: el.textContent.trim(), maat: parseFloat(getComputedStyle(el).fontSize) || 0 });
    }

    const vormen = [...svg.querySelectorAll('rect, path, polygon, circle, ellipse')]
      // een vorm die op deze schermbreedte verborgen is (alleen-smal, alleen-breed) is geen vak
      .filter((el) => !el.hasAttribute('data-geen-vak') && typeof el.isPointInFill === 'function'
        && el.getBoundingClientRect().width > 0);

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
        // het kader van een regel telt de witruimte boven en onder de letters mee; twee
        // regels onder elkaar mogen die delen, zolang de letters zelf elkaar niet raken
        const wit = 0.25 * Math.min(regels[i].maat, regels[j].maat);
        if (x > speling && y > speling + wit) {
          fouten.push(`"${regels[i].tekst}" ligt over "${regels[j].tekst}" — ${waar}`);
        }
      }
    }
  }
  return fouten;
};

// Meet pas als de letters van de site er zijn en elke zichtbare tekening zijn --krimp heeft:
// daarvoor staat er een breder reserveletter of nog de ongekrompen maat, en dat geeft
// fouten die er in het echt niet zijn.
const wachtOpTekeningen = async (page) => {
  // een tekening in een dichte uitklapper (Meer.astro) wordt pas gemeten als hij opengaat;
  // klap ze open, zodat ook die tekeningen gecontroleerd worden
  await page.evaluate(() => document.querySelectorAll('details.meer').forEach((d) => { d.open = true; }));
  // fonts.ready alleen is niet genoeg: dat is al 'klaar' als het lettertype nog niet is opgevraagd
  await page.evaluate(() => Promise.all([...document.fonts].map((f) => f.load().catch(() => null))));
  await expect.poll(() => page.evaluate(() => [...document.querySelectorAll('main svg[viewBox]')]
    .filter((s) => s.querySelector('text') && s.getBoundingClientRect().width)
    // niet alleen gezet, maar ook bij de breedte van nu: tijdens het laden verspringt die nog
    .every((s) => Math.abs(Number(s.style.getPropertyValue('--krimp'))
      - s.viewBox.baseVal.width / s.getBoundingClientRect().width) < 0.005))).toBe(true);
};

for (const pad of PAGINAS) {
  test(`${pad}: alle tekst in de tekeningen past in zijn vak`, async ({ page }) => {
    await page.goto(pad);
    await wachtOpTekeningen(page);
    expect(await page.evaluate(meet, SPELING)).toEqual([]);
  });
}

// Op een telefoon groeit de tekst in een tekening mee (--krimp in Pagina.astro). Op het
// smalste gangbare scherm (360px, veel Android-telefoons) groeit hij het hardst: past het
// daar, dan overal. Het plafond in global.css houdt hem daar op 9,5px of meer.
test.describe('op het smalste scherm', () => {
  test.use({ viewport: { width: 360, height: 740 } });
  for (const pad of PAGINAS) {
    test(`${pad}: tekst past in zijn vak en is minstens 9,5px`, async ({ page }) => {
      await page.goto(pad);
      await wachtOpTekeningen(page);
      expect(await page.evaluate(meet, SPELING)).toEqual([]);
      const klein = await page.evaluate(() => [...document.querySelectorAll('main svg text')]
        .filter((t) => t.getBoundingClientRect().width)
        .map((t) => {
          const s = /** @type {SVGSVGElement} */ (t.ownerSVGElement);
          const px = parseFloat(getComputedStyle(t).fontSize) * s.getBoundingClientRect().width / s.viewBox.baseVal.width;
          return { tekst: t.textContent.trim().slice(0, 30), px: Math.round(px * 10) / 10 };
        })
        .filter((x) => x.px < 9.5));
      expect(klein).toEqual([]);
    });
  }
});
