import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { PAGINAS } from './paginas.js';

async function axe(page, pad) {
  await page.goto(pad);
  const uitslag = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  const ernstig = uitslag.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
  expect(ernstig.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
}

for (const pad of PAGINAS) {
  test(`${pad} heeft geen toegankelijkheidsfouten (axe)`, async ({ page }) => {
    await axe(page, pad);
  });
}

// in donker gelden andere kleuren; contrastfouten zitten juist daar
test.describe('donkere stand', () => {
  test.use({ colorScheme: 'dark' });
  for (const pad of ['/', '/huischeck', '/aan-de-slag', '/een-avond', '/van-geheim-woord-naar-zegelring']) {
    test(`${pad} heeft geen toegankelijkheidsfouten in donker (axe)`, async ({ page }) => {
      await page.addInitScript(() => window.localStorage.setItem('jdh:lezen', '{"tekst":"normaal","thema":"dark"}'));
      await axe(page, pad);
    });
  }
});

// Op een aanraakscherm is alles wat je bedient (knop, vinkje, uitklapper) minstens 44px hoog
// (WCAG 2.5.5), en een losse link minstens 24px (WCAG 2.5.8). Links midden in een zin tellen
// niet mee: die vallen onder de uitzondering voor lopende tekst. De fortdelen in de tekening
// ook niet: de lijst ernaast heeft dezelfde links op volle maat.
for (const pad of PAGINAS) {
  test(`${pad}: alles om aan te tikken is groot genoeg voor een duim`, async ({ page }, info) => {
    test.skip(info.project.name !== 'telefoon', 'alleen op een aanraakscherm');
    await page.goto(pad);
    const klein = await page.evaluate(() => [...document.querySelectorAll('a[href], button, input:not([type=hidden]), summary')]
      .filter((el) => el.getClientRects().length && !el.closest('svg'))
      .filter((el) => !(el.tagName === 'A' && el.closest('p, li, td, figcaption, dd') && !el.closest('nav, .legenda')
        && el.parentElement?.textContent?.trim() !== el.textContent?.trim()))
      .map((el) => {
        const d = el.closest('label') ?? el;
        const minimaal = el.tagName === 'A' && !el.closest('nav, .legenda') ? 24 : 44;
        return { tekst: d.textContent?.trim().slice(0, 30), hoogte: Math.round(d.getBoundingClientRect().height), minimaal };
      })
      .filter((x) => x.hoogte < x.minimaal));
    expect(klein).toEqual([]);
  });
}
