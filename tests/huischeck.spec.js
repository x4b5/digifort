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

test('je eigen cijfer komt naast je uitslag te staan en blijft na herladen', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('input[name=eigen-cijfer][value="8"]').check({ force: true });
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=${nr <= 3 ? 'ja' : 'nee'}]`).check({ force: true });
  }
  await expect(page.locator('[data-spiegel-eigen]')).toHaveText('8');
  await expect(page.locator('[data-spiegel-deuren]')).toHaveText('3');
  await expect(page.getByRole('heading', { name: 'Je schatte jezelf hoger in dan je deuren' })).toBeVisible();

  await page.reload();
  await expect(page.locator('input[name=eigen-cijfer][value="8"]')).toBeChecked();
  await expect(page.locator('[data-spiegel-eigen]')).toHaveText('8');
});

test('zonder eigen cijfer blijft de spiegel weg', async ({ page }) => {
  await page.goto('/huischeck');
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=ja]`).check({ force: true });
  }
  await expect(page.locator('[data-spiegel]')).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Je huis zit goed op slot' })).toBeVisible();
});

test('wie zichzelf te laag inschat krijgt dat ook te horen', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('input[name=eigen-cijfer][value="4"]').check({ force: true });
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=${nr <= 8 ? 'ja' : 'nee'}]`).check({ force: true });
  }
  await expect(page.getByRole('heading', { name: 'Je was strenger voor jezelf dan nodig' })).toBeVisible();
});

test('het eigen cijfer hoort niet bij de kind-variant', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('input[name=eigen-cijfer][value="7"]').check({ force: true });
  await page.locator('[data-kind]').check({ force: true });
  await expect(page.locator('[data-eigen-cijfer]')).toBeHidden();
  await page.locator('[data-kind]').uncheck({ force: true });
  await expect(page.locator('input[name=eigen-cijfer][value="7"]')).toBeChecked();
});
