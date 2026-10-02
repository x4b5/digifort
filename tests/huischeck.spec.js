import { test, expect } from '@playwright/test';

/** Beantwoord alle tien vragen; `antwoord(nr)` geeft 'ja', 'nee' of 'weet-niet'. */
async function vulIn(page, antwoord) {
  for (let nr = 1; nr <= 10; nr += 1) {
    await page.locator(`input[name=v${nr}][value=${antwoord(nr)}]`).check({ force: true });
  }
}

test('tien keer ja geeft de hoogste uitslag en kleurt het huis groen', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, () => 'ja');
  await expect(page.locator('[data-score]')).toHaveText('10');
  await expect(page.getByRole('heading', { name: 'Je huis zit goed op slot' })).toBeVisible();
  // niets meer open: de volgende handeling is iemand anders helpen
  await expect(page.locator('[data-open-deuren]')).toBeHidden();
  await expect(page.locator('[data-alles-dicht] a.knop')).toHaveAttribute('href', '/voor-de-mensen-om-je-heen');

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

/** De kindvariant staat onderaan in een uitklapblok, zodat hij vraag 1 niet wegduwt. */
async function kindAan(page, aan = true) {
  const keuze = page.locator('[data-kind-keuze]');
  if (!(await keuze.evaluate((d) => d.open))) await keuze.locator('summary').click();
  await page.locator('[data-kind]').setChecked(aan);
}

test('kind-variant laat vier vragen zien', async ({ page }) => {
  await page.goto('/huischeck');
  await kindAan(page);
  await expect(page.locator('[data-vraag]:visible')).toHaveCount(4);
});

test('elke vraag is een fieldset met de vraag als legend en een hint', async ({ page }) => {
  await page.goto('/huischeck');
  for (let nr = 1; nr <= 10; nr += 1) {
    const groep = page.getByRole('group', { name: new RegExp(`^${nr}\\.`) });
    await expect(groep).toHaveCount(1);
    await expect(groep.getByRole('radio')).toHaveCount(3);
    await expect(groep).toHaveAttribute('aria-describedby', `hint-${nr}`);
    await expect(page.locator(`#hint-${nr}`)).not.toBeEmpty();
  }
  // drie groepen onder een eigen kopje
  await expect(page.locator('[data-groep] h2')).toHaveCount(3);
});

test('de voortgang telt mee en wijst de eerste open vraag aan', async ({ page }) => {
  await page.goto('/huischeck');
  await expect(page.locator('[data-voortgang]')).toHaveText('10 vragen. Je hebt er nog geen beantwoord.');
  await page.locator('[data-vraag="1"] .ja').click();
  await page.locator('[data-vraag="2"] .weet').click();
  await expect(page.locator('[data-voortgang]')).toHaveText('Je hebt 2 van de 10 vragen beantwoord.');
  await expect(page.locator('[data-rest]')).toContainText('Nog 8 vragen te gaan.');
  await expect(page.locator('[data-rest] a')).toHaveAttribute('href', '#vraag-3');
  await expect(page.locator('[data-klaar]')).toBeHidden();
  await expect(page.locator('[data-melding]')).toHaveText('2 van de 10 beantwoord. Nog 8 vragen te gaan.');
});

test('bij een nee verschijnt de open deur met een link naar precies die stap', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 2 ? 'nee' : 'ja'));
  const lijst = page.locator('[data-open-lijst] > li');
  await expect(lijst).toHaveCount(1);
  // onder de stap één gewone zin, zonder beeldspraak: hoe lang, en waar de uitleg staat
  await expect(lijst.first().locator('.taak-hint')).toHaveText('20 minuten. Uitleg staat op de pagina "Ik heb één avond".');
  // het label zegt wat je antwoordde
  await expect(lijst.first().locator('.tag')).toHaveText('Je antwoord: nee');
  await expect(lijst.first().locator('a')).toHaveAttribute('href', '/een-avond#wachtwoordmanager');
  // en die stap staat ook bovenaan als de ene handeling voor nu
  await expect(page.locator('[data-eerste-kop]')).toHaveText('Installeer een wachtwoordmanager');
  await expect(page.locator('[data-eerste-link]')).toHaveAttribute('href', '/een-avond#wachtwoordmanager');
  await expect(page.locator('[data-eerste-tijd]')).toHaveText('Dit kost ongeveer 20 minuten.');
  await expect(page.getByRole('heading', { name: 'Begin bij de basis' })).toBeVisible();
  // wat dicht is, staat er ook, in de woorden van de vraag: zo zie je wat elk "ja" betekent
  const dicht = page.locator('[data-dicht-lijst] > li');
  await expect(dicht).toHaveCount(9);
  await expect(dicht.first()).toHaveText('Je e-mail heeft een eigen wachtwoord.');
  await expect(page.locator('[data-dicht-lijst]')).not.toContainText('brievenbus');
});

test('de eerste stap volgt de bouwvolgorde, niet het nummer van de vraag', async ({ page }) => {
  await page.goto('/huischeck');
  // vraag 7 (router) en vraag 3 (tweede slot) open: het tweede slot gaat voor
  await vulIn(page, (nr) => (nr === 7 ? 'nee' : nr === 3 ? 'weet-niet' : 'ja'));
  await expect(page.locator('[data-eerste-kop]')).toHaveText('Zet een tweede slot op je e-mail');
  await expect(page.locator('[data-eerste-link]')).toHaveAttribute('href', '/een-avond#mail-tweede-slot');
  const taken = page.locator('[data-open-lijst] > li');
  await expect(taken).toHaveCount(2);
  await expect(taken.nth(0).locator('.tag')).toHaveText('Je antwoord: weet ik niet');
  await expect(taken.nth(1).locator('a')).toHaveAttribute('href', '/een-weekend#router');
});

test('alleen weekenddeuren open: dan staat de basis', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 5 ? 'nee' : 'ja'));
  await expect(page.getByRole('heading', { name: 'De basis staat' })).toBeVisible();
  await expect(page.locator('[data-eerste-link]')).toHaveAttribute('href', '/een-weekend#backup');
});

test('wie niet weet wie hij moet bellen, gaat naar de noodkaart en kan dat afvinken', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 10 ? 'nee' : 'ja'));
  await expect(page.locator('[data-eerste-link]')).toHaveAttribute('href', '/als-er-is-ingebroken#noodkaart-kop');
  await expect(page.locator('[data-open-lijst] .taak-hint')).toHaveText('Uitleg staat op de pagina "Als er toch is ingebroken".');
  // ook deze laatste stap heeft een vinkje, zodat je weet wanneer hij klaar is
  const vinkje = page.getByRole('checkbox', { name: 'Ik heb dit gedaan' });
  await expect(vinkje).toHaveCount(1);
  await vinkje.check();
  await expect(page.locator('[data-open-lijst] .tag')).toHaveText('Gedaan');
  await expect(page.locator('[data-alles-dicht]')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Ik heb dit gedaan' })).toBeChecked();
});

test('de uitslag spreekt zichzelf niet tegen over hoe lang het duurt', async ({ page }) => {
  await page.goto('/huischeck');
  // e-mail (avond) en reservekopie (weekend) open
  await vulIn(page, (nr) => (nr === 1 || nr === 5 ? 'nee' : 'ja'));
  await expect(page.getByRole('heading', { name: 'Begin bij de basis' })).toBeVisible();
  await expect(page.locator('[data-band="basis"]')).not.toContainText('één avond');
  await expect(page.locator('[data-bouw-tijd]')).toHaveText('Alles samen kost ongeveer 65 minuten. Dat hoeft niet in één keer.');
});

test('de eerste vraag komt direct na de korte uitleg, zonder keuzes ervoor', async ({ page }) => {
  await page.goto('/huischeck');
  // geen inhoudsopgave boven de check: die staat eronder
  await expect(page.locator('[data-inhoud]')).toHaveCount(0);
  const eersteKeuze = page.locator('#doe-de-huischeck input').first();
  await expect(eersteKeuze).toHaveAttribute('name', 'v1');
  // het cijfer en de kindvariant zijn er nog, maar pas na vraag 10
  const naVraag10 = (sel) => page.evaluate((s) => {
    const el = document.querySelector(s);
    const tien = document.querySelector('#vraag-10');
    return Boolean(tien.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
  }, sel);
  expect(await naVraag10('[data-eigen-cijfer]')).toBe(true);
  expect(await naVraag10('[data-kind-keuze]')).toBe(true);
  await expect(page.locator('#vraag-1 .antwoord.ja')).toBeInViewport();
});

test('afvinken in de takenlijst telt mee in Aan de slag en op het fort', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 4 ? 'nee' : 'ja'));
  await page.locator('input[data-bouw="niveau-1:updates"]').check();
  // de lijst wordt opnieuw opgebouwd, maar de focus blijft op het vinkje
  await expect(page.locator('input[data-bouw="niveau-1:updates"]')).toBeFocused();
  await expect(page.locator('[data-open-lijst] .tag')).toHaveText('Gedaan');
  await expect(page.locator('[data-alles-dicht]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Je huis zit goed op slot' })).toBeVisible();
  await page.goto('/aan-de-slag');
  await expect(page.locator('input[data-item="updates"]')).toBeChecked();
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'dicht');
});

test('je eigen cijfer komt naast je uitslag te staan en blijft na herladen', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('input[name=eigen-cijfer][value="8"]').check({ force: true });
  await vulIn(page, (nr) => (nr <= 3 ? 'ja' : 'nee'));
  await expect(page.locator('[data-spiegel-eigen]')).toHaveText('8');
  await expect(page.locator('[data-spiegel-deuren]')).toHaveText('3');
  await expect(page.getByRole('heading', { name: 'Je schatte jezelf hoger in dan je deuren' })).toBeVisible();

  await page.reload();
  await expect(page.locator('input[name=eigen-cijfer][value="8"]')).toBeChecked();
  await expect(page.locator('[data-spiegel-eigen]')).toHaveText('8');
});

test('zonder eigen cijfer blijft de spiegel weg', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, () => 'ja');
  await expect(page.locator('[data-spiegel]')).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Je huis zit goed op slot' })).toBeVisible();
});

test('wie zichzelf te laag inschat krijgt dat ook te horen', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('input[name=eigen-cijfer][value="4"]').check({ force: true });
  await vulIn(page, (nr) => (nr <= 8 ? 'ja' : 'nee'));
  await expect(page.getByRole('heading', { name: 'Je was strenger voor jezelf dan nodig' })).toBeVisible();
});

test('het eigen cijfer hoort niet bij de kind-variant', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('input[name=eigen-cijfer][value="7"]').check({ force: true });
  await kindAan(page);
  await expect(page.locator('[data-eigen-cijfer]')).toBeHidden();
  await kindAan(page, false);
  await expect(page.locator('input[name=eigen-cijfer][value="7"]')).toBeChecked();
});

test('na de laatste vraag hoort een schermlezer de uitslag en de eerste stap', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 1 ? 'nee' : 'ja'));
  await expect(page.locator('[data-melding]')).toHaveText(
    'Klaar. 9 van de 10 deuren zitten dicht. Begin bij de basis. Je eerste stap: Geef je e-mail een nieuw en lang wachtwoord, dat je nergens anders gebruikt. Je uitslag staat onder de vragen.',
  );
});

test('de cijfers onder de check staan er als tekst, ook zonder beweging', async ({ page }) => {
  await page.goto('/huischeck');
  const cijfers = page.locator('#hoe-weten-we-dat ~ ul').first();
  await expect(cijfers).toContainText('62 procent: ruim zes op de tien');
  await expect(cijfers).not.toContainText('0%');
});
