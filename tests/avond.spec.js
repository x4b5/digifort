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
  // zes stappen: 5 + 20 + 20 + 10 + 2 + 5 = 62 minuten
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText(/nog ongeveer 62 minuten/);
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await expect(page.locator('[data-avond] [data-stand]')).toHaveText(/nog ongeveer 57 minuten/);
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

test('het tweede slot op DigiD legt in twee delen uit hoe je de DigiD-app installeert en activeert', async ({ page }) => {
  await page.goto('/een-weekend#stap-accounts-tweede-slot');
  const stap = page.locator('#stap-accounts-tweede-slot');
  await expect(stap.locator('.hoe').first()).toContainText('DigiD');
  // de lange klus in twee korte delen: eerst installeren, dan laten zien dat jij het bent
  const deel1 = stap.locator('details.uitklap').filter({ hasText: 'DigiD-app, deel 1' });
  const deel2 = stap.locator('details.uitklap').filter({ hasText: 'DigiD-app, deel 2' });
  await expect(deel1.locator('li').first()).toBeHidden();
  await deel1.locator('summary').click();
  await deel2.locator('summary').click();
  // waar je de echte app haalt, de pincode van de app, en beide manieren om te activeren
  await expect(deel1).toContainText('digid.nl/digid-app');
  await expect(deel1).toContainText('vijf cijfers');
  await expect(deel2).toContainText('paspoort of identiteitskaart');
  await expect(deel2).toContainText('brief');
  // en waar je de beveiliging van een andere site vindt
  await expect(stap.locator('details.uitklap').filter({ hasText: 'beveiliging van een site' })).toHaveCount(1);
});

test('ik wil verder legt uit hoe je een sleutel toevoegt, en noemt Lightning naast USB-C', async ({ page }) => {
  await page.goto('/ik-wil-verder#stap-hardwaresleutel');
  const stap = page.locator('#stap-hardwaresleutel');
  await expect(stap.locator('.hoe').first()).toContainText('Lightning');
  const toevoegen = stap.locator('details.uitklap').filter({ hasText: 'Een sleutel toevoegen' });
  await toevoegen.locator('summary').click();
  await expect(toevoegen).toContainText('Steek hem nu pas in je computer');
  await expect(toevoegen).toContainText('tweede sleutel');
});

test('het tweede slot staat in drie delen, met een lijstje dat de woorden uit elkaar houdt', async ({ page }) => {
  await page.goto('/een-avond#stap-mail-tweede-slot');
  const stap = page.locator('#stap-mail-tweede-slot');
  for (const deel of ['Deel 2: maak een account in Ente Auth', 'Deel 3: koppel Ente Auth aan je e-mail']) {
    await expect(stap.getByRole('heading', { name: deel })).toBeVisible();
  }
  const woorden = stap.locator('details.uitklap').filter({ hasText: 'wat is wat?' });
  await woorden.locator('summary').click();
  await expect(woorden).toContainText('herstelsleutel van Ente');
  await expect(woorden).toContainText('herstelcodes van je e-mail');
  // Microsoft duwt zijn eigen app: de pagina zegt dat dat niet hoeft
  const ms = stap.locator('details.uitklap').filter({ hasText: '@outlook.com' });
  await ms.locator('summary').click();
  await expect(ms).toContainText('andere app');
  // de controle werkt zonder uitloggen, ook als de computer je mail al kent
  await expect(stap.locator('.gelukt')).toContainText('Je hoeft niet uit te loggen');
  // en wie iCloud-mail heeft, logt niet uit op de iPhone
  await expect(page.locator('#stap-mail-wachtwoord .gelukt')).toContainText('niet uit op je iPhone');
});

test('Bitwarden: de schermen bij het maken van een account, en een nieuw item op de computer', async ({ page }) => {
  await page.goto('/een-avond#stap-wachtwoordmanager');
  const schermen = page.locator('#stap-wachtwoordmanager details.uitklap').filter({ hasText: 'Welke schermen' });
  await schermen.locator('summary').click();
  await expect(schermen).toContainText('EU');
  await expect(schermen).toContainText('hint');
  await page.goto('/een-weekend#stap-accounts-wachtwoord');
  const niet = page.locator('#stap-accounts-wachtwoord details.uitklap').filter({ hasText: 'niet bewaard' });
  await niet.locator('summary').click();
  await expect(niet).toContainText('nog niet in je kluis');
  await page.goto('/een-weekend#stap-accounts-tweede-slot');
  await expect(page.locator('#stap-accounts-tweede-slot details.uitklap').filter({ hasText: 'Waar bewaar ik een passkey?' })).toHaveCount(1);
});

test('ik wil verder legt NFC uit en laat iemand anders naar je alias mailen', async ({ page }) => {
  await page.goto('/ik-wil-verder#stap-hardwaresleutel');
  await expect(page.locator('#stap-hardwaresleutel .hoe').first()).toContainText('NFC betekent');
  await page.goto('/ik-wil-verder#stap-alias');
  await expect(page.locator('#stap-alias .gelukt')).toContainText('iemand anders');
});

test('kies je maildienst, dan zie je alleen dat blok, al open, ook bij de volgende stap en in het weekend', async ({ page }) => {
  await page.goto('/een-avond#stap-mail-wachtwoord');
  const stap1 = page.locator('#stap-mail-wachtwoord');
  // zonder keuze zie je alle maildiensten, dicht
  await expect(stap1.locator('details[data-dienst]')).toHaveCount(6);
  await expect(stap1.locator('details[data-dienst="gmail"]')).toBeVisible();
  await stap1.getByRole('radio', { name: /Outlook of Hotmail/ }).check();
  await expect(stap1.locator('details[data-dienst="gmail"]')).toBeHidden();
  await expect(stap1.locator('details[data-dienst="microsoft"]')).toBeVisible();
  await expect(stap1.locator('details[data-dienst="microsoft"]')).toHaveAttribute('open', '');
  await expect(stap1.locator('details[data-dienst="microsoft"] li').first()).toContainText('account.microsoft.com');

  // de keuze geldt ook bij het tweede slot, en blijft na herladen
  await page.goto('/een-avond#stap-mail-tweede-slot');
  await page.reload();
  const stap2 = page.locator('#stap-mail-tweede-slot');
  await expect(stap2.getByRole('radio', { name: /Outlook of Hotmail/ })).toBeChecked();
  await expect(stap2.locator('details[data-dienst="microsoft"]')).toContainText('andere app');
  await expect(stap2.locator('details[data-dienst="icloud"]')).toBeHidden();
  // hulp die voor iedereen geldt, blijft staan
  await expect(stap2.locator('details.uitklap').filter({ hasText: 'alleen een telefoon' })).toBeVisible();

  // in het weekend: jouw dienst; heeft de stap geen blok voor jouw dienst, dan dat voor een andere dienst
  await page.goto('/een-weekend#stap-noodcodes');
  const nood = page.locator('#stap-noodcodes');
  await expect(nood.locator('details[data-dienst="microsoft"]')).toBeVisible();
  await expect(nood.locator('details[data-dienst="gmail"]')).toBeHidden();
  await nood.getByRole('radio', { name: /KPN/ }).check();
  await expect(nood.locator('details[data-dienst="andere"]')).toBeVisible();
  await expect(nood.locator('details[data-dienst="microsoft"]')).toBeHidden();
  await nood.getByRole('radio', { name: 'Laat alles zien' }).check();
  await expect(nood.locator('details[data-dienst="gmail"]')).toBeVisible();
});
