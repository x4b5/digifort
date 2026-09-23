import { test, expect } from '@playwright/test';

const MET_SCENE = ['huischeck', 'inbrekers-van-nu', 'inbrekers-van-morgen', 'aan-de-slag', 'onderhoud', 'als-er-is-ingebroken', 'voor-de-mensen-om-je-heen'];

for (const slug of MET_SCENE) {
  test(`/${slug} opent met een scène die zegt dat hij bedacht is`, async ({ page }) => {
    await page.goto(`/${slug}`);
    const scene = page.locator('.scene').first();
    await expect(scene.locator('.herkomst')).toContainText(/^Bedacht/);
    await expect(scene.locator('.portret')).toBeVisible();
  });
}

test('op een telefoon staat de scène in het eerste scherm, de opgave ingeklapt', async ({ page }, info) => {
  test.skip(info.project.name !== 'telefoon', 'alleen op een smal scherm');
  await page.goto('/inbrekers-van-morgen');
  await expect(page.locator('details.inhoud')).not.toHaveAttribute('open');
  await expect(page.locator('.scene .wie')).toBeInViewport();
  await page.locator('.inhoud summary').click();
  await expect(page.locator('.inhoud a').first()).toBeVisible();
});

test('op een breed scherm staat de opgave open', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'alleen op een breed scherm');
  await page.goto('/inbrekers-van-morgen');
  await expect(page.locator('details.inhoud')).toHaveAttribute('open', '');
});
