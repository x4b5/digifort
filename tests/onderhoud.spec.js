import { test, expect } from '@playwright/test';

// De doe-stappen van Onderhoud en opruimen en Voor de mensen om je heen:
// één stap tegelijk, elk met een vinkje dat de browser onthoudt.

test('onderhoud: het overzicht wijst naar vier momenten, elk met eigen stappen', async ({ page }) => {
  await page.goto('/onderhoud');
  const links = page.locator('[data-momenten] a');
  await expect(links).toHaveCount(4);
  for (const link of await links.all()) {
    const doel = decodeURIComponent((await link.getAttribute('href')).slice(1));
    await expect(page.locator(`[id="${doel}"]`)).toHaveCount(1);
  }
  // de onderhoudsbeurt van twee keer per jaar houdt dezelfde sleutels als de afvinklijst
  await expect(page.locator('[data-beurt]')).toHaveCount(4);
  await expect(page.locator('[data-beurt="onderhoudsbeurt"] [data-beurt-stap]')).toHaveCount(4);
  // elke stap zegt hoe je ziet dat het gelukt is
  for (const stap of await page.locator('[data-beurt-stap]').all()) {
    await expect(stap.locator('[data-gelukt]')).toHaveCount(1);
  }
});

test('onderhoud: een vinkje telt mee in het overzicht en blijft na herladen staan', async ({ page }) => {
  await page.goto('/onderhoud');
  const beurt = page.locator('[data-beurt="onderhoud-maand"]');
  const stand = page.locator('[data-moment-stand="elke-maand"]');
  await expect(stand).toHaveText('Nog niet gedaan');

  // één stap tegelijk
  await expect(beurt.locator('[data-beurt-stap]:visible')).toHaveCount(1);
  await beurt.locator('[data-beurt-stap]:visible').getByText('Gedaan', { exact: true }).click();
  await expect(stand).toHaveText('1 van 2 gedaan');

  await beurt.getByRole('button', { name: 'Volgende stap' }).click();
  await beurt.locator('[data-beurt-stap]:visible').getByText('Gedaan', { exact: true }).click();
  await expect(stand).toHaveText('Gedaan');
  await expect(beurt.locator('[data-beurt-klaar]')).toBeVisible();

  await page.reload();
  await expect(page.locator('[data-moment-stand="elke-maand"]')).toHaveText('Gedaan');
  await expect(page.locator('[data-moment-stand="elk-jaar-in-januari"]')).toHaveText('Nog niet gedaan');
});

test('onderhoud: wie een gestolen toestel heeft, krijgt eerst een waarschuwing', async ({ page }) => {
  await page.goto('/onderhoud');
  const let_op = page.locator('[data-waarschuwing]');
  await expect(let_op).toContainText('gestolen');
  await expect(let_op.locator('a')).toHaveAttribute('href', '/als-er-is-ingebroken#telefoon-of-laptop-kwijt-het-stappenplan');
});

test('het bezoek: zeven stappen, elk met wat je zegt en hoe je ziet dat het gelukt is', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  const bezoek = page.locator('[data-beurt="bezoek"]');
  const stappen = bezoek.locator('[data-beurt-stap]');
  await expect(stappen).toHaveCount(7);
  for (const stap of await stappen.all()) {
    await expect(stap.locator('[data-zeg]').first()).toContainText('Wat je zegt');
    await expect(stap.locator('[data-gelukt]')).toHaveCount(1);
  }
  await expect(bezoek.locator('[data-beurt-stand]')).toContainText('nog ongeveer 60 minuten');

  // één stap tegelijk; de knop brengt je naar de volgende en zet de focus op de kop
  await expect(bezoek.locator('[data-beurt-stap]:visible h3')).toHaveText('Spreek af: bij twijfel bel je mij');
  await bezoek.getByRole('button', { name: 'Volgende stap' }).click();
  await expect(bezoek.locator('[data-beurt-stap]:visible h3')).toHaveText('Spreek een familiewoord af');
  await expect(bezoek.locator('[data-beurt-stap]:visible h3')).toBeFocused();
});

test('het bezoek: zonder JavaScript staan alle stappen onder elkaar', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/voor-de-mensen-om-je-heen');
  for (const stap of await page.locator('[data-beurt="bezoek"] [data-beurt-stap]').all()) await expect(stap).toBeVisible();
  await context.close();
});

test('stalkerware: de waarschuwing staat open, met Let op voor een schermlezer', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  const let_op = page.locator('#als-iemand-dichtbij-meekijkt ~ [data-waarschuwing]').first();
  await expect(let_op).toBeVisible();
  await expect(let_op).toContainText('Let op: Verwijder de app niet meteen');
  await expect(page.getByText('0800-2000')).toBeVisible();
});

test('het bezoek: het tweede slot op de e-mail zegt waar je het aanzet, per soort adres', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  const stap = page.locator('[data-beurt-stap="mail-slot"]');
  await expect(stap).toContainText('niet in de Mail-app');
  for (const adres of ['@gmail.com', '@outlook.com', '@icloud.com', '@kpnmail.nl']) await expect(stap).toContainText(adres);
  // de vaktermen worden uitgelegd waar ze voor het eerst staan
  await expect(stap).toContainText('Wat is een tweede slot?');
  await expect(stap).toContainText('reservesleutels');
});

test('onderhoud: elke klus werkt ook zonder eerdere stappen', async ({ page }) => {
  await page.goto('/onderhoud');
  // een bestand terugzetten: per soort reservekopie hoe het moet
  const terug = page.locator('[data-beurt-stap="backup-loopt"]');
  for (const plek of ['In de cloud', 'met een Mac', 'met Windows']) await expect(terug).toContainText(plek);
  await expect(terug).not.toContainText('(bron)');
  // oude accounts vinden kan ook zonder wachtwoordmanager
  await expect(page.locator('[data-beurt-stap="jaar-accounts"]')).toContainText('Zoek in je e-mail');
  // het noodpakket wordt uitgelegd waar je het nodig hebt
  await expect(page.locator('[data-beurt-stap="noodcodes-kloppen"]')).toContainText('Je noodpakket is');
  // een herinnering die terugkomt: per telefoon hoe
  await expect(page.getByText('Zo zet je een herinnering die vanzelf terugkomt')).toBeVisible();
});

test('onderhoud: de reservekopie van elke maand zegt hoe je er nu een maakt, ook zonder losse schijf of met volle opslag', async ({ page }) => {
  await page.goto('/onderhoud');
  const stap = page.locator('[data-beurt-stap="maand-kopie"]');
  await expect(stap).toContainText('Maak nu reservekopie');
  await expect(stap).toContainText('opslag vol is');
  await expect(stap).toContainText('Heb je geen losse schijf?');
  await expect(stap).not.toContainText('een-weekend');
  // Windows 10 heeft een tussenstap naar Windows Update
  await expect(page.locator('[data-beurt-stap="maand-updates"]')).toContainText('Bijwerken en beveiliging');
  // wissen: de iPhone vraagt om je code, dat staat er vooraf
  await expect(page.locator('[data-beurt-stap="weg-wissen"]')).toContainText('vraagt nu om je toegangscode');
});

test('onderhoud: een link naar een stap opent die stap, ook midden in de rij', async ({ page }) => {
  await page.goto('/onderhoud');
  await page.locator('[data-beurt-stap="backup-loopt"] a[href="#stap-maand-kopie"]').evaluate((a) => a.click());
  const stap = page.locator('#stap-maand-kopie');
  await expect(stap).toBeVisible();
  await expect(stap.locator('h3')).toBeFocused();

  await page.goto('/voor-de-mensen-om-je-heen#stap-mail-slot');
  await expect(page.locator('[data-beurt="bezoek"] [data-beurt-stap]:visible h3')).toHaveText('Zet een tweede slot op de e-mail');
});

test('onderhoud: de quiz over de usb-stick zegt hetzelfde als de stap', async ({ page }) => {
  await page.goto('/onderhoud');
  await expect(page.locator('[data-beurt-stap="weg-rest"]')).toContainText('snel formatteren uit');
  await expect(page.locator('[data-quiz] [data-vraagje]').nth(1).locator('label', { has: page.locator('input[data-goed]') })).toContainText('snel formatteren uit');
});
