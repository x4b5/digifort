import { test, expect } from '@playwright/test';

test('één avond: gedaan zet het vinkje in Aan de slag en bouwt het fort', async ({ page }) => {
  await page.goto('/een-avond');
  await expect(page.locator('[data-stand]')).toContainText('Stap 1 van 6');
  await expect(page.locator('[data-stap="0"]')).toBeVisible();
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await expect(page.locator('[data-stap="1"]')).toBeVisible();
  await expect(page.locator('[data-bol="0"]')).toHaveAttribute('data-toestand', 'gedaan');
  await page.locator('[data-stap="1"] [data-over]').click();
  await expect(page.locator('[data-stand]')).toContainText('Stap 3 van 6');

  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="mail-wachtwoord"]')).toBeChecked();
  await page.goto('/plattegrond');
  await expect(page.locator('[data-kamer="voordeur"]')).toHaveAttribute('data-toestand', 'dicht');

  // terug: hij begint bij de eerste stap die nog niet gedaan is
  await page.goto('/een-avond');
  await expect(page.locator('[data-stap="1"]')).toBeVisible();
});

test('"toch niet gedaan" zet het vinkje terug binnen de avond zelf', async ({ page }) => {
  await page.goto('/een-avond');
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await page.locator('[data-stap="1"] [data-terug]').click();
  const stap = page.locator('[data-stap="0"]');
  await expect(stap.locator('[data-klaar-zin]')).toBeVisible();

  await stap.locator('[data-toch-niet]').click();
  await expect(stap.locator('[data-klaar-zin]')).toBeHidden();

  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="mail-wachtwoord"]')).not.toBeChecked();
});

test('de resterende tijd telt alleen wat nog open staat', async ({ page }) => {
  await page.goto('/een-avond');
  // zes stappen: 5 + 10 + 20 + 10 + 2 + 5 = 52 minuten
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText(/nog ongeveer 52 minuten/);
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText(/nog ongeveer 47 minuten/);
});

test('een weekend: niveau 2 stap voor stap, met het vinkje in Aan de slag', async ({ page }) => {
  await page.goto('/een-weekend');
  // tien stappen, samen 240 minuten: vanaf anderhalf uur in uren
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText(/Stap 1 van 10 · nog ongeveer 4 uur/);
  await expect(page.locator('[data-stap="0"] .hoe li').first()).toBeVisible();
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await expect(page.locator('[data-stap="1"]')).toBeVisible();
  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="accounts-wachtwoord"]')).toBeChecked();
});

test('ik wil verder: niveau 3 stap voor stap, zonder tijden', async ({ page }) => {
  await page.goto('/ik-wil-verder');
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText('Stap 1 van 6');
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="hardwaresleutel"]')).toBeChecked();
});

test('elke stap van niveau 1, 2 en 3 heeft uitleg hoe je het doet', async ({ page }) => {
  for (const [pad, aantal] of [['/een-avond', 6], ['/een-weekend', 10], ['/ik-wil-verder', 6]]) {
    await page.goto(pad);
    const stappen = page.locator('[data-stap]');
    await expect(stappen).toHaveCount(aantal);
    for (let i = 0; i < aantal; i++) expect(await stappen.nth(i).locator('.hoe li').count()).toBeGreaterThan(1);
  }
});

test('elke stap zegt hoe je ziet dat het gelukt is, en wat je doet als het niet lukt', async ({ page }) => {
  for (const [pad, aantal] of [['/een-avond', 6], ['/een-weekend', 10], ['/ik-wil-verder', 6]]) {
    await page.goto(pad);
    const stappen = page.locator('[data-stap]');
    for (let i = 0; i < aantal; i++) {
      const stap = stappen.nth(i);
      await expect(stap.locator('.waarom')).toContainText('Waarom?');
      await expect(stap.locator('.gelukt h3')).toHaveText('Zo zie je dat het gelukt is');
      expect((await stap.locator('.gelukt p').textContent())?.trim().length).toBeGreaterThan(10);
      expect(await stap.locator('details.lukt-niet li').count()).toBeGreaterThan(0);
    }
  }
});

test('lukt het niet? klapt open met hulp', async ({ page }) => {
  await page.goto('/een-avond');
  const hulp = page.locator('[data-stap="0"] details.lukt-niet');
  await expect(hulp.locator('li').first()).toBeHidden();
  await hulp.locator('summary').click();
  await expect(hulp.locator('li').first()).toBeVisible();
});

test('een link naar #stap-<id> opent precies die stap', async ({ page }) => {
  await page.goto('/een-avond#stap-updates');
  await expect(page.locator('#stap-updates')).toBeVisible();
  await expect(page.locator('[data-stand]')).toContainText('Stap 4 van 6');
  await expect(page.locator('#stap-updates h2')).toBeInViewport();
  // verder klikken zet het adres op de stap die je nu ziet
  await page.locator('#stap-updates [data-over]').click();
  await expect(page).toHaveURL(/#stap-pincode$/);
});

test('kies je telefoon, dan zie je alleen de stappen voor die telefoon, ook na herladen', async ({ page }) => {
  await page.goto('/een-avond#stap-updates');
  const stap = page.locator('#stap-updates');
  await expect(stap.locator('.toestel[data-soort="android"]').first()).toBeVisible();
  await page.getByRole('radio', { name: 'iPhone' }).check();
  await expect(stap.locator('.toestel[data-soort="android"]').first()).toBeHidden();
  await expect(stap.locator('.toestel[data-soort="iphone"]').first()).toBeVisible();
  // wat voor iedereen geldt, zoals de computer, blijft staan
  await expect(stap.getByRole('heading', { name: 'Op een Mac' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('radio', { name: 'iPhone' })).toBeChecked();
  await expect(page.locator('#stap-updates .toestel[data-soort="android"]').first()).toBeHidden();
  await page.getByRole('radio', { name: 'Laat allebei zien' }).check();
  await expect(page.locator('#stap-updates .toestel[data-soort="android"]').first()).toBeVisible();
});

test('stap 1 en 2 van de avond zeggen per maildienst waar de knop zit, ook met alleen een telefoon', async ({ page }) => {
  await page.goto('/een-avond#stap-mail-wachtwoord');
  const stap1 = page.locator('#stap-mail-wachtwoord');
  // de Mail-app heeft de knop niet: dat staat er vooraan
  await expect(stap1.locator('.wat')).toContainText('website van je maildienst');
  // en wie schrikt omdat de Mail-app om het nieuwe wachtwoord vraagt, krijgt een waarschuwing vooraf
  await expect(stap1.locator('.let-op')).toContainText('Mail-app');
  const gmail = stap1.locator('details.uitklap').filter({ hasText: '@gmail.com' });
  await expect(gmail.locator('li').first()).toBeHidden();
  await gmail.locator('summary').click();
  await expect(gmail.locator('li').first()).toContainText('myaccount.google.com');

  await page.goto('/een-avond#stap-mail-tweede-slot');
  const stap2 = page.locator('#stap-mail-tweede-slot');
  const telefoon = stap2.locator('details.uitklap').filter({ hasText: 'alleen een telefoon' });
  await telefoon.locator('summary').click();
  await expect(telefoon).toContainText('Kopieer');
  await expect(telefoon).toContainText('Plak');
  // de reservekopie van de code-app staat bij de stap zelf, niet alleen in de gereedschapskist
  await expect(stap2.locator('.hoe').filter({ hasText: 'reservekopie' }).first()).toBeVisible();
});

test('het weekend legt het noodpakket uit voordat een stap ernaar verwijst', async ({ page }) => {
  await page.goto('/een-weekend');
  const uitleg = page.locator('.envelop');
  await expect(uitleg).toContainText('noodpakket');
  // de uitleg staat boven de stappen
  const voor = await uitleg.evaluate((el) => Boolean(el.compareDocumentPosition(document.querySelector('[data-avond]')) & Node.DOCUMENT_POSITION_FOLLOWING));
  expect(voor).toBe(true);
  // de router mag je ook aan je provider overlaten
  await page.goto('/een-weekend#stap-router');
  await expect(page.locator('#stap-router .hoe').first()).toContainText('Bel je provider');
});
