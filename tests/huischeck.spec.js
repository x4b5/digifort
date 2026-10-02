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

/** Het eigen cijfer staat ingeklapt onder de uitslag: klap open en kies. */
async function gok(page, cijfer) {
  const blok = page.locator('[data-gok]');
  if (!(await blok.evaluate((d) => d.open))) await blok.locator('summary').click();
  await page.locator(`input[name=eigen-cijfer][value="${cijfer}"]`).check({ force: true });
}

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
  await expect(lijst.first().locator('.taak-kop a')).toHaveAttribute('href', '/een-avond#wachtwoordmanager');
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
  // ook wie niet kijkt, hoort dat het gelukt is
  await expect(page.locator('[data-vink-melding]')).toHaveText('Gedaan: Kijk wie je belt als je bent opgelicht.');
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
  const na = (eerst, dan) => page.evaluate(([a, b]) => {
    const el = document.querySelector(b);
    return Boolean(document.querySelector(a).compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
  }, [eerst, dan]);
  expect(await na('#vraag-10', '[data-eigen-cijfer]')).toBe(true);
  expect(await na('#vraag-10', '[data-kind-keuze]')).toBe(true);
  await expect(page.locator('#vraag-1 .antwoord.ja')).toBeInViewport();
});

test('na vraag 10 komt meteen de uitslag, zonder nieuwe keuze ertussen', async ({ page }) => {
  await page.goto('/huischeck');
  // tussen vraag 10 en de uitslag staat geen enkel invulveld
  const tussen = await page.evaluate(() => {
    const tien = document.querySelector('#vraag-10');
    const uitslag = document.querySelector('[data-uitslag]');
    return Array.from(document.querySelectorAll('#doe-de-huischeck input')).filter((i) =>
      (tien.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_FOLLOWING) && !tien.contains(i)
      && (uitslag.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_PRECEDING)).length;
  });
  expect(tussen).toBe(0);
  // het eigen cijfer staat onder de uitslag, en pas als je klaar bent
  await expect(page.locator('[data-gok]')).toBeHidden();
  await vulIn(page, (nr) => (nr === 1 ? 'nee' : 'ja'));
  await expect(page.locator('[data-gok]')).toBeVisible();
  await expect(page.locator('[data-gok]')).not.toHaveAttribute('open', '');
  const uitslagBoven = await page.evaluate(() => Boolean(
    document.querySelector('[data-uitslag]').compareDocumentPosition(document.querySelector('[data-gok]')) & Node.DOCUMENT_POSITION_FOLLOWING));
  expect(uitslagBoven).toBe(true);
});

test('de uitleg onder elke vraag is één zin, even groot en donker als gewone tekst', async ({ page }) => {
  await page.goto('/huischeck');
  // een gewone alinea uit de tekst onder de check
  const tekst = await page.locator('#wat-de-check-meet ~ p').first().evaluate((el) => {
    const s = getComputedStyle(el);
    return { grootte: s.fontSize, kleur: s.color };
  });
  for (let nr = 1; nr <= 10; nr += 1) {
    const hint = page.locator(`#hint-${nr}`);
    const stijl = await hint.evaluate((el) => ({ grootte: getComputedStyle(el).fontSize, kleur: getComputedStyle(el).color }));
    expect(stijl).toEqual(tekst);
    // één zin: geen punt, vraagteken of uitroepteken midden in de tekst
    expect((await hint.textContent()).trim().slice(0, -1)).not.toMatch(/[.?!]\s/);
  }
});

test('de uitleg sluit twijfel uit bij de wachtwoordmanager en het tweede slot', async ({ page }) => {
  await page.goto('/huischeck');
  // wie zijn telefoon wachtwoorden laat bewaren, heeft er al een
  await expect(page.locator('#hint-2')).toContainText('telefoon');
  // je telefoon openen met je gezicht is geen tweede slot op je e-mail
  await expect(page.locator('#hint-3')).toContainText('telt niet');
  // vraag 8 stuurt je niet terug naar vraag 3
  await expect(page.locator('#hint-8')).not.toContainText('tweede slot');
});

test('de score breekt niet midden in "deuren zitten dicht" af', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr <= 6 ? 'ja' : 'nee'));
  await expect(page.locator('[data-uitslag] .score')).toHaveText('6 van de 10 deuren zitten dicht');
  for (const deel of ['.score-getal', '.score-woorden']) {
    const regels = await page.locator(deel).evaluate((el) => el.getClientRects().length);
    expect(regels).toBe(1);
  }
});

test('op een telefoon staan de drie keuzes op één regel en bedekt de naar-boven-knop geen tekst', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/huischeck');
  const boven = await page.locator('#vraag-1 .antwoord').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
  expect(new Set(boven).size).toBe(1);
  await expect(page.locator('.naar-boven')).toHaveCSS('position', 'static');
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
  await vulIn(page, (nr) => (nr <= 3 ? 'ja' : 'nee'));
  await gok(page, 8);
  await expect(page.locator('[data-spiegel-eigen]')).toHaveText('8');
  await expect(page.locator('[data-spiegel-deuren]')).toHaveText('3');
  await expect(page.getByRole('heading', { name: 'Je schatte jezelf hoger in dan je deuren' })).toBeVisible();

  await page.reload();
  // na herladen staat de vergelijking meteen open
  await expect(page.locator('input[name=eigen-cijfer][value="8"]')).toBeChecked();
  await expect(page.locator('[data-spiegel-eigen]')).toBeVisible();
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
  await vulIn(page, (nr) => (nr <= 8 ? 'ja' : 'nee'));
  await gok(page, 4);
  await expect(page.getByRole('heading', { name: 'Je was strenger voor jezelf dan nodig' })).toBeVisible();
});

test('het eigen cijfer hoort niet bij de kind-variant', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, () => 'ja');
  await gok(page, 7);
  await kindAan(page);
  await expect(page.locator('[data-eigen-cijfer]')).toBeHidden();
  await expect(page.locator('[data-gok]')).toBeHidden();
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
  // elk cijfer staat onder een kopje met het nummer van de vraag; één getal per alinea, met de bron erbij
  const kop = page.getByRole('heading', { name: 'Eigen wachtwoorden (vraag 1)' });
  await expect(kop).toBeVisible();
  const cijfer = page.locator('h4:has-text("Eigen wachtwoorden (vraag 1)") + p');
  await expect(cijfer).toContainText('Ruim 6 op de 10');
  await expect(cijfer).toContainText('62 procent');
  await expect(cijfer.locator('a')).toHaveText('CBS, 2024');
  await expect(page.locator('h4:has-text("Een tweede slot (vraag 3)") + p')).toContainText('73 procent');
  expect((await page.locator('#hoe-weten-we-dat ~ p').allTextContents()).join(' ')).not.toContain('0%');
});

test('wie twijfelt, ziet bij de vraag waar hij het kan nakijken', async ({ page }) => {
  await page.goto('/huischeck');
  for (const nr of [2, 3, 4, 8]) {
    const blok = page.locator(`#vraag-${nr} details.nakijken`);
    await expect(blok).toHaveCount(1);
    // ingeklapt: de vraag blijft kort
    await expect(blok).not.toHaveAttribute('open', '');
    await blok.locator('summary').click();
    await expect(blok.locator('li').first()).toBeVisible();
    // en altijd: welk antwoord kies je dan
    await expect(blok).toContainText('Dan kies je Ja');
  }
  // vraag 4: voor iPhone én Android, en je verandert nog niets
  const updates = page.locator('#vraag-4 details.nakijken');
  await expect(updates).toContainText('iPhone');
  await expect(updates).toContainText('Android');
  await expect(updates).toContainText('Je verandert nog niets');
  // vraag 3: wie zijn e-mail nooit hoeft te openen, hoort dat dat normaal is
  await expect(page.locator('#vraag-3 details.nakijken')).toContainText('altijd open');
});

test('vraag en uitslag gebruiken hetzelfde woord: herstelcodes', async ({ page }) => {
  await page.goto('/huischeck');
  await expect(page.locator('#hint-8')).toContainText('herstelcodes');
  await expect(page.locator('#hint-8')).not.toContainText('reservecodes');
  await vulIn(page, (nr) => (nr === 8 ? 'weet-niet' : 'ja'));
  await expect(page.locator('[data-eerste-kop]')).toHaveText('Schrijf je herstelcodes op papier');
  // de uitslag zegt waar je ze vindt
  await expect(page.locator('[data-eerste-noot]')).toContainText('instellingen van je e-mail');
  await expect(page.locator('[data-open-lijst] .taak-noot')).toContainText('instellingen van je e-mail');
});

test('wie zijn telefoon al wachtwoorden laat bewaren, hoort in de uitslag dat hij er al een heeft', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 2 ? 'weet-niet' : 'ja'));
  const noot = page.locator('[data-eerste-noot]');
  await expect(noot).toBeVisible();
  await expect(noot).toContainText('Dan heb je er al een');
  await expect(noot).toContainText('Bitwarden of Proton Pass');
  await expect(noot.locator('a')).toHaveAttribute('href', '#vraag-2');
  // een stap zonder noot laat geen lege regel achter
  await page.locator('input[name=v2][value=ja]').check({ force: true });
  await page.locator('input[name=v1][value=nee]').check({ force: true });
  await expect(page.locator('[data-eerste-noot]')).toBeHidden();
});

test('"Waarom nu?" maakt niet bang en heeft echte links naar de naslag', async ({ page }) => {
  await page.goto('/huischeck');
  const deel = page.locator('#waarom-nu ~ *');
  await expect(deel.filter({ hasText: 'Je hoeft niet bang te zijn' })).toHaveCount(1);
  for (const href of ['/de-storm-om-het-huis', '/inbrekers-van-morgen', '/woordenboek']) {
    await expect(page.locator(`#waarom-nu ~ ul a[href="${href}"]`)).toHaveCount(1);
  }
});

test('ook op een smalle telefoon past elke vraag zonder zijwaarts scrollen', async ({ page }) => {
  for (const breedte of [320, 340, 360, 390]) {
    await page.setViewportSize({ width: breedte, height: 800 });
    await page.goto('/huischeck');
    await page.locator('input[name=v1][value=weet-niet]').check({ force: true });
    const rij = await page.locator('#vraag-1 .antwoorden').evaluate((el) => el.getBoundingClientRect().right);
    expect(rij).toBeLessThanOrEqual(breedte);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(breedte);
  }
});
