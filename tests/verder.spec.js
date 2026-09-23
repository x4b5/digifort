import { test, expect } from '@playwright/test';

test('wie nog niets heeft ingevuld ziet geen voortgang op de voorpagina', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-verder]')).toBeHidden();
});

test('na de huischeck wijst de voorpagina de eerstvolgende stap aan', async ({ page }) => {
  await page.goto('/huischeck');
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=${nr <= 2 ? 'ja' : 'nee'}]`).check({ force: true });
  }
  await page.goto('/');
  await expect(page.locator('[data-verder]')).toBeVisible();
  await expect(page.locator('[data-verder-gedaan]')).toHaveText('2');
  // vraag 3 is het tweede slot: dat is de eerste open deur in de bouwvolgorde
  await expect(page.locator('[data-verder-stap-tekst]')).toHaveText('Zet een tweede slot op je e-mail');
  await expect(page.locator('[data-verder-link]')).toHaveAttribute('href', '/aan-de-slag#niveau-1');
});

test('alles dicht: de voorpagina stuurt je naar iemand anders helpen', async ({ page }) => {
  await page.goto('/huischeck');
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=ja]`).check({ force: true });
  }
  await page.goto('/');
  await expect(page.locator('[data-verder-klaar]')).toBeVisible();
  await expect(page.locator('[data-verder-stap]')).toBeHidden();
});
