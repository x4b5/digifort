import { test, expect } from '@playwright/test';

test('één avond: gedaan zet het vinkje in Aan de slag en bouwt het fort', async ({ page }) => {
  await page.goto('/een-avond');
  await expect(page.locator('[data-stand]')).toContainText('Stap 1 van 6');
  await expect(page.locator('[data-stap="0"]')).toBeVisible();
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await expect(page.locator('[data-stap="1"]')).toBeVisible();
  await expect(page.locator('[data-stand]')).toContainText('Stap 2 van 6');
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
      // "Gelukt als:" met wat je op je scherm ziet, en de afvinkknop in hetzelfde blok
      await expect(stap.locator('.gelukt h3')).toHaveText('Gelukt als:');
      expect((await stap.locator('.gelukt > p').first().textContent())?.trim().length).toBeGreaterThan(10);
      await expect(stap.locator('.gelukt [data-gedaan]')).toHaveCount(1);
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
  await page.getByRole('radio', { name: 'iPhone', exact: true }).check();
  await expect(stap.locator('.toestel[data-soort="android"]').first()).toBeHidden();
  await expect(stap.locator('.toestel[data-soort="iphone"]').first()).toBeVisible();
  // wat voor iedereen geldt, zoals de computer, blijft staan
  await expect(stap.getByRole('heading', { name: 'Op een Mac' })).toBeVisible();
  await page.reload();
  // een eerdere keuze is ingeklapt tot één regel; "Wijzig" klapt hem weer open
  await expect(page.locator('[data-gekozen]').first()).toContainText('Je telefoon: iPhone');
  await expect(page.locator('[data-toestelkeuze]')).toBeHidden();
  await expect(page.locator('[data-toestelkeuze] input[value="iphone"]')).toBeChecked();
  await expect(page.locator('#stap-updates .toestel[data-soort="android"]').first()).toBeHidden();
  await page.locator('[data-gekozen]').first().getByRole('button', { name: 'Wijzig' }).click();
  await page.getByRole('radio', { name: 'Laat allebei zien' }).check();
  await expect(page.locator('#stap-updates .toestel[data-soort="android"]').first()).toBeVisible();
});

test('stap 1 en 2 van de avond zeggen per maildienst waar de knop zit, ook met alleen een telefoon', async ({ page }) => {
  await page.goto('/een-avond#stap-mail-wachtwoord');
  const stap1 = page.locator('#stap-mail-wachtwoord');
  // de Mail-app heeft de knop niet: dat staat bij de waarschuwing
  await expect(stap1.locator('.let-op')).toContainText('niet in de Mail-app');
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
  // bij het nieuwe wachtwoord log je niet uit in de Mail-app (dan raak je de mail op je telefoon niet kwijt):
  // je test op de website zelf, waar je het net veranderde; die heb je dus al open
  await expect(page.locator('#stap-mail-wachtwoord .gelukt')).toContainText('Log niet uit in de Mail-app');
  await expect(page.locator('#stap-mail-wachtwoord .gelukt')).toContainText('Log op die website uit en weer in');
});

test('Bitwarden: de schermen bij het maken van een account, en een nieuw item op de computer', async ({ page }) => {
  await page.goto('/een-avond#stap-wachtwoordmanager');
  const schermen = page.locator('#stap-wachtwoordmanager details.uitklap').filter({ hasText: 'Welke schermen' });
  await schermen.locator('summary').click();
  await expect(schermen).toContainText('EU');
  await expect(schermen).toContainText('hint');
  // de keuze voor de EU staat in de stappen zelf, niet alleen in een uitklapper
  await expect(page.locator('#stap-wachtwoordmanager .hoe').first()).toContainText('bitwarden.eu');
  // wie stap 1 oversloeg, weet wat hij dan in de kluis zet
  await expect(page.locator('#stap-wachtwoordmanager')).toContainText('Stap 1 overgeslagen?');
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
  await expect(stap2.locator('[data-dienstkeuze] input[value="microsoft"]')).toBeChecked();
  // bij de volgende stap is de keuze al ingeklapt: de eerste handeling staat hoger
  await expect(stap2.locator('[data-dienstkeuze]')).toBeHidden();
  await expect(stap2.locator('[data-gekozen]')).toContainText('Je maildienst: Outlook of Hotmail');
  await expect(stap2.locator('details[data-dienst="microsoft"]')).toContainText('andere app');
  await expect(stap2.locator('details[data-dienst="icloud"]')).toBeHidden();
  // hulp die voor iedereen geldt, blijft staan
  await expect(stap2.locator('details.uitklap').filter({ hasText: 'alleen een telefoon' })).toBeVisible();

  // in het weekend: jouw dienst; heeft de stap geen blok voor jouw dienst, dan dat voor een andere dienst
  await page.goto('/een-weekend#stap-noodcodes');
  const nood = page.locator('#stap-noodcodes');
  await expect(nood.locator('details[data-dienst="microsoft"]')).toBeVisible();
  await expect(nood.locator('details[data-dienst="gmail"]')).toBeHidden();
  await nood.getByRole('button', { name: 'Wijzig' }).click();
  await nood.getByRole('radio', { name: /iCloud/ }).check();
  await expect(nood.locator('details[data-dienst="andere"]')).toBeVisible();
  await expect(nood.locator('details[data-dienst="microsoft"]')).toBeHidden();
  // KPN geeft geen herstelcodes: dat staat er, zodat je niet voor niks zoekt
  await nood.getByRole('radio', { name: /KPN/ }).check();
  await expect(nood.locator('details[data-dienst="kpn"]')).toContainText('geen herstelcodes');
  await expect(nood.locator('details[data-dienst="andere"]')).toBeHidden();
  await nood.getByRole('radio', { name: 'Laat alles zien' }).check();
  await expect(nood.locator('details[data-dienst="gmail"]')).toBeVisible();
});

test('bij het tweede slot kies je eerst je maildienst: bij KPN weet je vóór deel 1 of je de delen moet doen', async ({ page }) => {
  await page.goto('/een-avond#stap-mail-tweede-slot');
  const stap = page.locator('#stap-mail-tweede-slot');
  const keuze = stap.locator('[data-dienstkeuze]');
  const deel1 = stap.getByRole('heading', { name: /Deel 1 op een iPhone/ });
  const eerst = await keuze.evaluate((el, d) => Boolean(el.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING), await deel1.elementHandle());
  expect(eerst).toBe(true);
  await keuze.getByRole('radio', { name: /KPN/ }).check();
  const kpn = stap.locator('details[data-dienst="kpn"]');
  await expect(kpn).toContainText('Sla over');
  // KPN kan het misschien niet: dan staan er geen delen onder die iets anders zeggen
  await expect(deel1).toBeHidden();
  await expect(stap.getByRole('heading', { name: /Deel 2/ })).toBeHidden();
  await expect(stap.locator('details[data-dienst="andere"]')).toBeHidden();
  // wie het wel vindt, kiest "Een andere maildienst" en ziet de delen weer
  await expect(kpn).toContainText('Een andere maildienst');
  await keuze.getByRole('radio', { name: /Een andere maildienst/ }).check();
  await expect(stap.getByRole('heading', { name: /Deel 2/ })).toBeVisible();
  // en bij stap 1: wie niet weet of hij een MijnKPN-inlog heeft, slaat over en belt later
  await page.goto('/een-avond#stap-mail-wachtwoord');
  await expect(page.locator('#stap-mail-wachtwoord details[data-dienst="kpn"]')).toContainText('Weet je niet of je een inlog hebt voor MijnKPN');
  // de Mail-app op de iPhone: waar het wachtwoord zit, zonder te gokken naar een menupad
  await page.locator('#stap-mail-wachtwoord .lukt-niet summary').click();
  await expect(page.locator('#stap-mail-wachtwoord .lukt-niet')).toContainText('typ "accounts" in de zoekbalk');
  // en het tweede vak voor het versturen
  await expect(page.locator('#stap-mail-wachtwoord .lukt-niet')).toContainText('SMTP');
});

test('weekend en verder: scannen uitgelegd, foto\'s op Android, en een sleutel met alleen een telefoon of op Bitwarden', async ({ page }) => {
  await page.goto('/een-weekend#stap-accounts-tweede-slot');
  const scan = page.locator('#stap-accounts-tweede-slot details.uitklap').filter({ hasText: 'Een code scannen met Ente Auth' });
  await scan.locator('summary').click();
  await expect(scan).toContainText('plusteken');
  await expect(scan.getByRole('link')).toHaveAttribute('href', '/een-avond#stap-mail-tweede-slot');
  await page.goto('/een-weekend#stap-backup');
  await expect(page.locator('#stap-backup .toestel[data-soort="android"]')).toContainText('Google Foto');
  await page.goto('/ik-wil-verder#stap-hardwaresleutel');
  const stap = page.locator('#stap-hardwaresleutel');
  const telefoon = stap.locator('details.uitklap').filter({ hasText: 'Ik heb alleen een telefoon' });
  await telefoon.locator('summary').click();
  await expect(telefoon).toContainText('achterkant');
  const bw = stap.locator('details.uitklap').filter({ hasText: 'Een sleutel op Bitwarden' });
  await bw.locator('summary').click();
  await expect(bw).toContainText('herstelcode');
});

test('het eindscherm telt wat je net deed, ook als de browser niets mag onthouden', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new Error('geblokkeerd'); };
  });
  await page.goto('/een-avond');
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  await page.locator('[data-stap="1"] [data-gedaan]').click();
  for (const i of [2, 3, 4, 5]) await page.locator(`[data-stap="${i}"] [data-over]`).click();
  const einde = page.locator('[data-einde]');
  await expect(einde.locator('h2')).toHaveText('Je hebt 2 van de 6 stappen gedaan');
  await expect(einde).toContainText('onthoudt je vinkjes niet');
});

test('het eindscherm zegt in gewone woorden hoeveel je deed', async ({ page }) => {
  await page.goto('/een-avond');
  await page.locator('[data-stap="0"] [data-gedaan]').click();
  for (const i of [1, 2, 3, 4, 5]) await page.locator(`[data-stap="${i}"] [data-over]`).click();
  const einde = page.locator('[data-einde]');
  await expect(einde.locator('h2')).toHaveText('Je hebt 1 van de 6 stappen gedaan');
  await expect(einde).not.toContainText('onthoudt je vinkjes niet');
});

test('tweede slot: het deel per maildienst staat in deel 3, met het pad voor alleen een telefoon erbij', async ({ page }) => {
  await page.goto('/een-avond#stap-mail-tweede-slot');
  const stap = page.locator('#stap-mail-tweede-slot');
  await stap.getByRole('radio', { name: /Gmail/ }).check();
  const deel3 = stap.locator('.toestel').filter({ has: page.getByRole('heading', { name: /Deel 3/ }) });
  // Gmail: het blok staat open in deel 3, niet boven deel 1
  await expect(deel3.locator('details[data-dienst="gmail"]')).toHaveAttribute('open', '');
  await expect(deel3.locator('details[data-dienst="gmail"]')).toContainText('myaccount.google.com');
  await expect(stap.locator('details[data-dienst="kpn"]')).toBeHidden();
  // met een computer of met alleen een telefoon: twee gelijke keuzes, naast elkaar in deel 3
  await expect(deel3.locator('details.uitklap').filter({ hasText: 'alleen een telefoon' })).toBeVisible();
  await expect(deel3.locator('details.uitklap').filter({ hasText: 'op mijn computer' })).toBeVisible();
  // de herstelsleutel: met nummers, zodat je kunt nakijken of je alles hebt
  await expect(stap).toContainText('Zet een nummer voor elk woord');
  // KPN: alleen het nakijken, de delen vallen weg
  await stap.getByRole('radio', { name: /KPN/ }).check();
  await expect(stap.locator('details[data-dienst="kpn"]')).toContainText('Sla over');
  await expect(deel3).toBeHidden();
  // bij stap 1: wat je tegen KPN zegt, en dat de rest ook zonder deze stap lukt
  await page.goto('/een-avond#stap-mail-wachtwoord');
  const kpn = page.locator('#stap-mail-wachtwoord details[data-dienst="kpn"]');
  await expect(kpn).toContainText('KPN bellen');
  await expect(kpn).toContainText('Stap 3 tot en met 6 lukken ook zonder deze stap');
});

test('weekend en verder: Samsung-machtigingen, een volle iCloud en inloggen met de sleutel in de app', async ({ page }) => {
  await page.goto('/een-weekend#stap-app-rechten');
  await expect(page.locator('#stap-app-rechten .toestel[data-soort="android"]')).toContainText('Machtigingsbeheer');
  await page.goto('/een-weekend#stap-backup');
  const vol = page.locator('#stap-backup details.uitklap').filter({ hasText: 'Mijn iCloud is vol' });
  await vol.locator('summary').click();
  await expect(vol).toContainText('Vertrouw');
  await expect(vol).toContainText('Importeren');
  await expect(page.locator('#stap-backup .gelukt')).toContainText('vandaag');
  await page.goto('/ik-wil-verder#stap-hardwaresleutel');
  const bw = page.locator('#stap-hardwaresleutel details.uitklap').filter({ hasText: 'Een sleutel op Bitwarden' });
  await bw.locator('summary').click();
  await expect(bw).toContainText('Bitwarden-app van je telefoon');
});

test('Bitwarden op Bitwarden: de pagina stuurt naar de EU, waar je account staat', async ({ page }) => {
  await page.goto('/ik-wil-verder#stap-hardwaresleutel');
  const bw = page.locator('#stap-hardwaresleutel details.uitklap').filter({ hasText: 'Een sleutel op Bitwarden' });
  await bw.locator('summary').click();
  await expect(bw.locator('li').first()).toContainText('vault.bitwarden.eu');
  await page.goto('/een-weekend#stap-noodcodes');
  await expect(page.locator('#stap-noodcodes')).toContainText('vault.bitwarden.eu');
});

test('de eerste handeling staat bij de avond in het eerste scherm, ook op een telefoon', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 664 });
  // wie al koos, ziet de keuzes als één regel
  await page.addInitScript(() => { localStorage.setItem('jdh:toestel', 'iphone'); localStorage.setItem('jdh:maildienst', 'gmail'); });
  await page.goto('/een-avond#stap-mail-tweede-slot');
  const stap = page.locator('#stap-mail-tweede-slot');
  await expect(stap.locator('.toestel[data-soort="iphone"] li').first()).toContainText('App Store');
  await page.goto('/een-avond');
  await page.evaluate(() => window.scrollTo(0, 0));
  // de eerste handeling op het toestel: naar de website van je maildienst
  await expect(page.locator('#stap-mail-wachtwoord details[data-dienst="gmail"] li').first()).toBeInViewport();
});

test('wie stap 1 oversloeg, weet wat hij in de kluis zet, en op de computer welke knop het is', async ({ page }) => {
  await page.goto('/een-avond#stap-wachtwoordmanager');
  const stap = page.locator('#stap-wachtwoordmanager');
  await expect(stap).toContainText('Mijn e-mail');
  await expect(stap).toContainText('Laat het wachtwoord dan leeg');
  await expect(stap.locator('.gelukt')).toContainText('Mijn e-mail');
  // de knop per browser bij naam, en hoe je je browser herkent
  await expect(stap).toContainText('Toevoegen aan Chrome');
  await expect(stap).toContainText('oranje vos');
});
