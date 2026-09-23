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
