import { test, expect } from '@playwright/test';

test('tien keer ja geeft de hoogste uitslag en kleurt het huis groen', async ({ page }) => {
  await page.goto('/huischeck');
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=ja]`).check({ force: true });
  }
  await expect(page.locator('[data-score]')).toHaveText('10');
  await expect(page.getByRole('heading', { name: 'Je huis zit goed op slot' })).toBeVisible();

  await page.goto('/plattegrond');
  await expect(page.locator('[data-kamer="voordeur"]')).toHaveAttribute('data-toestand', 'dicht');
});

test('een nee kleurt de kamer rood en blijft na herladen staan', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('input[name=v1][value=nee]').check({ force: true });
  await page.reload();
  await expect(page.locator('input[name=v1][value=nee]')).toBeChecked();
  await page.goto('/plattegrond');
  await expect(page.locator('[data-kamer="voordeur"]')).toHaveAttribute('data-toestand', 'open');
});

test('kind-variant laat vier vragen zien', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('[data-kind]').check({ force: true });
  await expect(page.locator('[data-vraag]:visible')).toHaveCount(4);
});

test('bij een nee verschijnt de open deur met een link naar de stap', async ({ page }) => {
  await page.goto('/huischeck');
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=${nr === 2 ? 'nee' : 'ja'}]`).check({ force: true });
  }
  const lijst = page.locator('[data-open-lijst] > li');
  await expect(lijst).toHaveCount(1);
  await expect(lijst.first()).toContainText('De sleutelkluis');
  await expect(lijst.first().locator('a')).toHaveAttribute('href', '/aan-de-slag#niveau-1');
});

test('afvinken in de bouwvolgorde telt mee in hoofdstuk 4 en op het fort', async ({ page }) => {
  await page.goto('/huischeck');
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=${nr === 4 ? 'nee' : 'ja'}]`).check({ force: true });
  }
  await page.locator('input[data-bouw="niveau-1:updates"]').check();
  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="updates"]')).toBeChecked();
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'dicht');
});
