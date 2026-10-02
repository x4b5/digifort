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

test('kind-variant laat vier vragen zien', async ({ page }) => {
  await page.goto('/huischeck');
  await page.locator('[data-kind]').check({ force: true });
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
  await expect(page.locator('[data-groep] h3')).toHaveCount(3);
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
  await expect(lijst.first()).toContainText('De sleutelkluis');
  await expect(lijst.first()).toContainText('stap 3 van Ik heb één avond');
  await expect(lijst.first().locator('.tag')).toHaveText('Open');
  await expect(lijst.first().locator('a')).toHaveAttribute('href', '/een-avond#wachtwoordmanager');
  // en die stap staat ook bovenaan als de ene handeling voor nu
  await expect(page.locator('[data-eerste-kop]')).toHaveText('Installeer een wachtwoordmanager');
  await expect(page.locator('[data-eerste-link]')).toHaveAttribute('href', '/een-avond#wachtwoordmanager');
  await expect(page.getByRole('heading', { name: 'Begin bij de basis' })).toBeVisible();
  // wat dicht is, staat er ook: zo zie je wat elk "ja" betekent
  await expect(page.locator('[data-dicht-lijst] > li')).toHaveCount(9);
});

test('de eerste stap volgt de bouwvolgorde, niet het nummer van de vraag', async ({ page }) => {
  await page.goto('/huischeck');
  // vraag 7 (router) en vraag 3 (tweede slot) open: het tweede slot gaat voor
  await vulIn(page, (nr) => (nr === 7 ? 'nee' : nr === 3 ? 'weet-niet' : 'ja'));
  await expect(page.locator('[data-eerste-kop]')).toHaveText('Zet een tweede slot op je e-mail');
  await expect(page.locator('[data-eerste-link]')).toHaveAttribute('href', '/een-avond#mail-tweede-slot');
  const taken = page.locator('[data-open-lijst] > li');
  await expect(taken).toHaveCount(2);
  await expect(taken.nth(0).locator('.tag')).toHaveText('Weet je niet');
  await expect(taken.nth(1).locator('a')).toHaveAttribute('href', '/een-weekend#router');
});

test('alleen weekenddeuren open: dan staat de basis', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 5 ? 'nee' : 'ja'));
  await expect(page.getByRole('heading', { name: 'De basis staat' })).toBeVisible();
  await expect(page.locator('[data-eerste-link]')).toHaveAttribute('href', '/een-weekend#backup');
});

test('wie niet weet wie hij moet bellen, gaat naar de noodkaart', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 10 ? 'nee' : 'ja'));
  await expect(page.locator('[data-eerste-link]')).toHaveAttribute('href', '/als-er-is-ingebroken#noodkaart-kop');
  // geen afvinklijst voor deze deur, dus ook geen vinkje
  await expect(page.locator('[data-open-lijst] input')).toHaveCount(0);
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
  await page.locator('[data-kind]').check({ force: true });
  await expect(page.locator('[data-eigen-cijfer]')).toBeHidden();
  await page.locator('[data-kind]').uncheck({ force: true });
  await expect(page.locator('input[name=eigen-cijfer][value="7"]')).toBeChecked();
});

test('na de laatste vraag hoort een schermlezer de uitslag en de eerste stap', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 1 ? 'nee' : 'ja'));
  await expect(page.locator('[data-melding]')).toHaveText(
    'Klaar. 9 van de 10 deuren zitten dicht. Begin bij de basis. Je eerste stap: Geef je e-mail een nieuw en lang wachtwoord, dat je nergens anders gebruikt. Je uitslag staat onder de vragen.',
  );
});
