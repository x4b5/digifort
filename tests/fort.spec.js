import { test, expect } from '@playwright/test';

test('het fort kleurt mee met de huischeck', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'onbekend');
  await page.goto('/huischeck');
  await page.locator('[data-vraag="4"] .ja').click(); // updates: ja → torenwacht staat
  await page.locator('[data-vraag="1"] .nee').click(); // e-mail: nee → poort wankelt
  await page.goto('/');
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'dicht');
  await expect(page.locator('[data-deel="poort"]')).toHaveAttribute('data-toestand', 'open');
  await expect(page.locator('[data-fort-stand]')).toHaveText('1 van de 10 delen van je fort staan, 1 wankelt nog.');
  await expect(page.locator('[data-kanteel="toren"]')).toHaveAttribute('data-toestand', 'dicht');
});

test('de trede-check wijst de juiste trede aan', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const check = page.locator('[data-tredecheck]');
  await expect(check.locator('[data-uitslag]')).toBeHidden();
  await check.locator('input[name="tc-ww"][value="kluis"]').check();
  await check.locator('input[name="tc-stap"][value="sms"]').check();
  await check.locator('input[name="tc-nood"][value="nee"]').check();
  await expect(check.locator('[data-titel]')).toHaveText('Een code per sms');
  await expect(check.locator('[data-link]')).toHaveAttribute('href', '#trede-4');
  await check.locator('input[name="tc-stap"][value="sleutel"]').check();
  await check.locator('input[name="tc-nood"][value="ja"]').check();
  await expect(check.locator('[data-titel]')).toHaveText('Twee sleutels en een papiertje');
  await expect(check.locator('[data-volgende]')).toBeHidden();
});
