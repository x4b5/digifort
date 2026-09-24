import { test, expect } from '@playwright/test';

const PAGINA = '/het-inbraakspel';

test('breek in bij Ria: de juiste drie keuzes brengen je binnen', async ({ page }) => {
  await page.goto(PAGINA);
  const spel = page.locator('[data-inbraakspel]');
  await expect(spel.locator('[data-uitgeschreven]')).toBeHidden();

  await spel.getByRole('button', { name: /nieuwe nummer/ }).click();
  await expect(spel.locator('.bubbel.ria').last()).toContainText('oude telefoon');
  await spel.getByRole('button', { name: /slecht bereik/ }).click();
  await spel.getByRole('button', { name: /voorschieten/ }).click();

  await expect(spel.locator('[data-uitkomst]')).toHaveAttribute('data-uitkomst', 'binnen');
  await expect(spel.locator('[data-tegenhouden]')).toBeVisible();
});

test('breek in bij Ria: meteen om geld vragen mislukt, en opnieuw begint bij het begin', async ({ page }) => {
  await page.goto(PAGINA);
  const spel = page.locator('[data-inbraakspel]');

  await spel.getByRole('button', { name: /NU €900/ }).click();
  await expect(spel.locator('[data-uitkomst]')).toHaveAttribute('data-uitkomst', 'mislukt');
  await expect(spel.locator('[data-uitkomst]')).toContainText('nieuw nummer');
  await expect(spel.locator('[data-tegenhouden]')).toBeVisible();

  await spel.getByRole('button', { name: 'Probeer het opnieuw' }).click();
  await expect(spel.locator('.bubbel')).toHaveCount(0);
  await expect(spel.locator('[data-uitkomst]')).toBeHidden();
  await expect(spel.getByRole('button', { name: /nieuwe nummer/ })).toBeVisible();
});

test('breek in bij Ria: elke doodlopende keuze legt uit waarom', async ({ page }) => {
  await page.goto(PAGINA);
  const spel = page.locator('[data-inbraakspel]');

  await spel.getByRole('button', { name: /nieuwe nummer/ }).click();
  await spel.getByRole('button', { name: /bel je zo/ }).click();
  await expect(spel.locator('[data-uitkomst]')).toContainText('slecht bereik');

  await spel.getByRole('button', { name: 'Probeer het opnieuw' }).click();
  await spel.getByRole('button', { name: /nieuwe nummer/ }).click();
  await spel.getByRole('button', { name: /slecht bereik/ }).click();
  await spel.getByRole('button', { name: /inlogcodes/ }).click();
  await expect(spel.locator('[data-uitkomst]')).toHaveAttribute('data-uitkomst', 'mislukt');
});

test('breek in bij Ria: zonder JavaScript staat de hele route uitgeschreven', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(PAGINA);
  const uit = page.locator('[data-inbraakspel] [data-uitgeschreven]');
  await expect(uit).toBeVisible();
  await expect(uit).toContainText('voorschieten');
  await expect(uit).toContainText('inlogcodes');
  await context.close();
});
