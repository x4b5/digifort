import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGINAS = ['/', '/huischeck', '/plattegrond', '/de-storm-om-het-huis', '/aan-de-slag', '/van-geheim-woord-naar-zegelring', '/als-er-is-ingebroken', '/woordenboek', '/over'];

for (const pad of PAGINAS) {
  test(`${pad} heeft geen toegankelijkheidsfouten (axe)`, async ({ page }) => {
    await page.goto(pad);
    const uitslag = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const ernstig = uitslag.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(ernstig.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });
}
