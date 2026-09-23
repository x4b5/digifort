import { test, expect } from '@playwright/test';

test('een vraagje geeft uitleg en wijst het goede antwoord aan', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  const vraagje = page.locator('[data-vraagje]').first();
  const uitleg = vraagje.locator('[data-antwoord]');
  await expect(uitleg).toBeHidden();

  // eerst mis gokken: de uitleg verschijnt, en het goede antwoord wordt toch aangewezen
  await vraagje.getByText('Aan de spelfouten').click();
  await expect(uitleg).toContainText('Net niet.');
  await expect(vraagje.locator('.optie[data-rol="mis"]')).toHaveCount(1);
  await expect(vraagje.locator('.optie[data-rol="goed"]')).toContainText('haast');

  // daarna goed: geen enkele optie staat dan nog als mis aangemerkt
  await vraagje.getByText('Aan de haast: het moet nu meteen').click();
  await expect(uitleg).toContainText('Klopt.');
  await expect(vraagje.locator('.optie[data-rol="mis"]')).toHaveCount(0);
});

test('de quiz toont pas een score als alle drie de vragen beantwoord zijn', async ({ page }) => {
  await page.goto('/onderhoud');
  const quiz = page.locator('[data-quiz]');
  const score = quiz.locator('[data-quiz-score]');
  const vraagjes = quiz.locator('[data-vraagje]');
  await expect(vraagjes).toHaveCount(3);
  await expect(score).toBeHidden();

  // twee van de drie goed: pas na de derde verschijnt de uitslag
  await vraagjes.nth(0).locator('input[data-goed]').check();
  await vraagjes.nth(1).locator('input[data-goed]').check();
  await expect(score).toBeHidden();

  await vraagjes.nth(2).locator('input:not([data-goed])').first().check();
  await expect(score).toContainText('2 van de 3 goed');

  // alsnog goed: de uitslag telt mee en de toon verandert
  await vraagjes.nth(2).locator('input[data-goed]').check();
  await expect(score).toContainText('3 van de 3 goed');
  await expect(score).toHaveAttribute('data-alles', '1');
});

test('de inhoudsopgave van een hoofdstuk wijst naar de quiz', async ({ page }) => {
  await page.goto('/plattegrond');
  await page.locator('.inhoud a', { hasText: 'Wat blijft er hangen?' }).click();
  await expect(page).toHaveURL(/plattegrond#quiz/);
  await expect(page.locator('#quiz')).toBeInViewport();
});
