import { test, expect } from '@playwright/test';

test('vind de truc: elke vondst klapt uitleg open, alles gevonden toont de les', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  const fig = page.locator('[data-nepbericht]').first();
  await expect(fig.locator('[data-uitleg="link"]')).toBeHidden();
  await expect(fig.locator('[data-les]')).toBeHidden();

  // mis tikken: een hint, geen vondst
  await fig.locator('.bubbel').first().click({ position: { x: 5, y: 5 } });
  await expect(fig.locator('[data-teller]')).toContainText('Daar zit het niet');

  await fig.locator('[data-vlag="link"]').click();
  await expect(fig.locator('[data-vlag="link"]')).toHaveAttribute('aria-expanded', 'true');
  await expect(fig.locator('[data-uitleg="link"]')).toBeVisible();
  await expect(fig.locator('[data-teller]')).toHaveText('1 van de 3 gevonden.');

  await fig.locator('[data-vlag="haast"]').click();
  await fig.locator('[data-vlag="angst"]').click();
  await expect(fig.locator('[data-teller]')).toHaveText('Alle 3 gevonden. Zo herken je hem de volgende keer ook.');
  await expect(fig.locator('[data-les]')).toBeVisible();
  await expect(fig.locator('[data-alles]')).toBeHidden();
});

test('vind de truc: laat alles zien opent elke uitleg', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  const fig = page.locator('[data-nepbericht]');
  await fig.locator('[data-alles]').click();
  await expect(fig.locator('[data-uitleg]')).toHaveCount(4);
  for (const li of await fig.locator('[data-uitleg]').all()) await expect(li).toBeVisible();
  await expect(fig.locator('[data-les]')).toBeVisible();
});

test('vind de truc: zonder JavaScript staat alle uitleg open', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/inbrekers-van-nu');
  await expect(page.locator('[data-nepbericht]').first().locator('[data-uitleg="link"]')).toBeVisible();
  await context.close();
});

test('vind de truc: werkt ook met het toetsenbord', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  const fig = page.locator('[data-nepbericht]').first();
  await fig.locator('[data-vlag="haast"]').focus();
  await page.keyboard.press('Enter');
  await expect(fig.locator('[data-uitleg="haast"]')).toBeVisible();
  await fig.locator('[data-vlag="angst"]').focus();
  await page.keyboard.press(' ');
  await expect(fig.locator('[data-teller]')).toHaveText('2 van de 3 gevonden.');
});
