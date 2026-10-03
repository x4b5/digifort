import { test, expect } from '@playwright/test';
import { LIJSTEN } from '../src/data/lijsten.js';

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

/** De lijst met alle open deuren staat ingeklapt onder de ene stap voor nu: klap hem open. */
async function alleDeuren(page) {
  const blok = page.locator('[data-alle-deuren]');
  if (!(await blok.evaluate((d) => d.open))) await blok.locator('summary').click();
}

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
  await expect(page.locator('[data-voortgang]')).toHaveText('0 van 10 beantwoord');
  await page.locator('[data-vraag="1"] .ja').click();
  await page.locator('[data-vraag="2"] .weet').click();
  await expect(page.locator('[data-voortgang]')).toHaveText('2 van 10 beantwoord');
  await expect(page.locator('[data-rest]')).toContainText('Nog 8 vragen te gaan.');
  await expect(page.locator('[data-rest] a')).toHaveAttribute('href', '#vraag-3');
  await expect(page.locator('[data-klaar]')).toBeHidden();
  await expect(page.locator('[data-melding]')).toHaveText('2 van de 10 beantwoord. Nog 8 vragen te gaan.');
  await vulIn(page, () => 'ja');
  await expect(page.locator('[data-voortgang]')).toHaveText('10 van 10 beantwoord. Je uitslag staat hieronder.');
});

test('de teller ligt nooit over een vraag of knop, en de intro zegt waar de uitslag komt', async ({ page }) => {
  await page.goto('/huischeck');
  await expect(page.locator('.intro')).toContainText('Onder vraag 10');
  const teller = page.locator('[data-voortgang]');
  // geen vaste balk: die viel over de kop van vraag 3 en over de knoppen van vraag 2
  await expect(teller).toHaveCSS('position', 'static');
  for (const nr of [2, 3, 6]) {
    await page.locator(`#vraag-${nr}`).scrollIntoViewIfNeeded();
    for (const deel of ['legend', '.antwoorden']) {
      const [vak, balk] = await Promise.all([page.locator(`#vraag-${nr} ${deel}`).boundingBox(), teller.boundingBox()]);
      expect(vak.y + vak.height <= balk.y || vak.y >= balk.y + balk.height).toBe(true);
    }
  }
  await page.locator('[data-vraag="6"] .ja').click();
  await expect(teller).toHaveText('1 van 10 beantwoord');
  // hij staat direct boven je uitslag
  const vlak = await page.evaluate(() => document.querySelector('[data-voortgang]').nextElementSibling.matches('[data-uitslag]'));
  expect(vlak).toBe(true);
});

test('bij een nee verschijnt de open deur met een link naar precies die stap', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr === 2 ? 'nee' : 'ja'));
  const lijst = page.locator('[data-open-lijst] > li');
  await expect(lijst).toHaveCount(1);
  // onder de stap één gewone zin, zonder beeldspraak: hoe lang, en waar de uitleg staat
  await expect(lijst.first().locator('.taak-hint')).toHaveText('Ongeveer 20 minuten.');
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
  // zonder vaste tijd ook geen lege regel eronder
  await expect(page.locator('[data-open-lijst] .taak-hint')).toHaveCount(0);
  // ook deze laatste stap heeft een vinkje, zodat je weet wanneer hij klaar is
  await alleDeuren(page);
  const vinkje = page.getByRole('checkbox', { name: 'Ik heb dit gedaan' });
  await expect(vinkje).toHaveCount(1);
  await vinkje.check();
  await expect(page.locator('[data-open-lijst] .tag')).toHaveText('Gedaan');
  // ook wie niet kijkt, hoort dat het gelukt is
  await expect(page.locator('[data-vink-melding]')).toHaveText('Gedaan: Kijk wie je belt als je bent opgelicht.');
  await expect(page.locator('[data-alles-dicht]')).toBeVisible();
  await page.reload();
  await alleDeuren(page);
  await expect(page.getByRole('checkbox', { name: 'Ik heb dit gedaan' })).toBeChecked();
});

test('de uitslag spreekt zichzelf niet tegen over hoe lang het duurt', async ({ page }) => {
  await page.goto('/huischeck');
  // e-mail (avond) en reservekopie (weekend) open
  await vulIn(page, (nr) => (nr === 1 || nr === 5 ? 'nee' : 'ja'));
  await expect(page.getByRole('heading', { name: 'Begin bij de basis' })).toBeVisible();
  await expect(page.locator('[data-band="basis"]')).not.toContainText('één avond');
  // geen optelsom van alle minuten: die schrikt af, terwijl je nu maar één stap doet
  await expect(page.locator('[data-uitslag]')).not.toContainText('Alles samen');
});

test('de uitslag toont één stap voor nu; de rest staat ingeklapt', async ({ page }) => {
  await page.goto('/huischeck');
  await vulIn(page, (nr) => (nr <= 3 ? 'ja' : 'nee'));
  await expect(page.locator('[data-eerste]')).toBeVisible();
  const blok = page.locator('[data-alle-deuren]');
  await expect(blok).not.toHaveAttribute('open', '');
  await expect(blok.locator('summary')).toHaveText('Toon alle 7 stappen');
  await expect(page.locator('[data-open-lijst]')).toBeHidden();
  await alleDeuren(page);
  await expect(page.locator('[data-open-lijst] > li')).toHaveCount(7);
  // per stap geen herhaalde zin over waar de uitleg staat: de link brengt je erheen
  await expect(page.locator('[data-open-lijst]')).not.toContainText('Uitleg staat op');
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
  // een tik op Ja in een melding van Google telt ook als tweede slot
  await expect(page.locator('#hint-3')).toContainText('melding');
  // een patroon is geen pincode
  await expect(page.locator('#hint-6')).toContainText('patroon');
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
  await alleDeuren(page);
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
    // de tekst van de stap komt uit lijsten.js, net als op de pagina zelf
    `Klaar. 9 van de 10 deuren zitten dicht. Begin bij de basis. Je eerste stap: ${LIJSTEN['niveau-1'].items.find((i) => i.id === 'mail-wachtwoord').stap}. Je uitslag staat onder de vragen.`,
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
  // geen "73 procent" naast een los "driekwart": twee getallen voor bijna hetzelfde verwarren
  await expect(page.locator('h4:has-text("Een tweede slot (vraag 3)") + p')).not.toContainText('driekwart');
  expect((await page.locator('#hoe-weten-we-dat ~ p').allTextContents()).join(' ')).not.toContain('0%');
});

test('wie twijfelt, ziet bij de vraag waar hij het kan nakijken', async ({ page }) => {
  await page.goto('/huischeck');
  for (const nr of [2, 3, 4, 5, 6, 8]) {
    const blok = page.locator(`#vraag-${nr} details.nakijken`);
    await expect(blok).toHaveCount(1);
    // ingeklapt: de vraag blijft kort
    await expect(blok).not.toHaveAttribute('open', '');
    await blok.locator('> summary').click();
    await expect(blok.locator('li').first()).toBeVisible();
    // en altijd: welk antwoord kies je dan
    await expect(blok).toContainText('Dan kies je Ja');
  }
  // vraag 4: voor iPhone én Android, en je verandert nog niets
  const updates = page.locator('#vraag-4 details.nakijken');
  await expect(updates).toContainText('iPhone');
  await expect(updates).toContainText('Android');
  await expect(updates).toContainText('Je verandert nog niets');
  // vraag 3: wie zijn e-mail nooit hoeft te openen, hoort dat dat normaal is, en dat hij niet in de Mail-app kijkt
  await expect(page.locator('#vraag-3 details.nakijken')).toContainText('altijd open');
  await expect(page.locator('#vraag-3 details.nakijken')).toContainText('niet in die app');
  // wie zijn wachtwoord niet weet of het niet vindt, kiest Weet ik niet in plaats van te gokken
  await expect(page.locator('#vraag-3 details.nakijken')).toContainText('weet je dat niet? Kies dan Weet ik niet');
  // vraag 2: je telefoon vraagt eerst je code; dat is normaal
  await expect(page.locator('#vraag-2 details.nakijken')).toContainText('Dat is normaal');
});

test('vraag 4: je kiest je toestel en ziet alleen dat pad', async ({ page }) => {
  await page.goto('/huischeck');
  const blok = page.locator('#vraag-4 details.nakijken');
  await blok.locator('> summary').click();
  for (const toestel of ['iPhone', 'Android', 'Mac', 'Windows']) {
    await expect(blok.locator(`details[data-dienst="${toestel}"] > summary`)).toBeVisible();
  }
  const android = blok.locator('details[data-dienst="Android"]');
  await android.locator('summary').click();
  // welke treffer, en welke schakelaar bij Samsung
  await expect(android.locator('ol')).toContainText('niet die van Google Play');
  await expect(android.locator('ol')).toContainText('Automatisch downloaden via wifi');
  await expect(blok.locator('details[data-dienst="Windows"] ol')).toBeHidden();
  // Windows: hoe je het opent, en wat je ziet als het goed is
  await expect(blok.locator('details[data-dienst="Windows"]')).toContainText('Klik op Start');
  await expect(blok.locator('details[data-dienst="Windows"]')).toContainText('up-to-date');
});

test('vraag 3: je kiest je maildienst en ziet alleen dat pad', async ({ page }) => {
  await page.goto('/huischeck');
  const blok = page.locator('#vraag-3 details.nakijken');
  await blok.locator('> summary').click();
  for (const dienst of ['Gmail', 'Outlook of Hotmail', 'iCloud', 'KPN of Ziggo', 'Een andere dienst']) {
    await expect(blok.locator(`details[data-dienst="${dienst}"] > summary`)).toBeVisible();
  }
  // dicht tot je je dienst kiest: de andere paden blijven uit beeld
  const gmail = blok.locator('details[data-dienst="Gmail"]');
  await expect(gmail.locator('ol')).toBeHidden();
  await gmail.locator('summary').click();
  await expect(gmail.locator('ol')).toContainText('myaccount.google.com');
  // ook via de Gmail-app, en in de woorden die Google zelf gebruikt
  await expect(gmail.locator('ol')).toContainText('Gmail-app');
  await expect(gmail.locator('ol')).toContainText('Verificatie in 2 stappen');
  // KPN en Ziggo krijgen ook een webadres
  await expect(blok.locator('details[data-dienst="KPN of Ziggo"]')).toContainText('kpn.com');
  await expect(blok.locator('details[data-dienst="KPN of Ziggo"]')).toContainText('ziggo.nl');
  await expect(gmail).toContainText('Dan kies je Ja');
  await expect(blok.locator('details[data-dienst="iCloud"] ol')).toBeHidden();
  // wie het niet vindt, weet ook wat hij kiest
  await expect(blok).toContainText('Dan kies je Nee');
});

test('vraag en uitslag gebruiken hetzelfde woord: herstelcodes', async ({ page }) => {
  await page.goto('/huischeck');
  await expect(page.locator('#hint-8')).toContainText('herstelcodes');
  await expect(page.locator('#hint-8')).not.toContainText('reservecodes');
  await vulIn(page, (nr) => (nr === 8 ? 'weet-niet' : 'ja'));
  await expect(page.locator('[data-eerste-kop]')).toHaveText('Schrijf je herstelcodes op papier');
  // de uitslag zegt waar je ze vindt: op de website, niet in de Mail-app
  await expect(page.locator('[data-eerste-noot]')).toContainText('website van je maildienst, niet in de Mail-app');
  await expect(page.locator('[data-open-lijst] .taak-noot')).toContainText('website van je maildienst');
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
  // geen aanvallen, oorlog of kwantum: wie dat wil lezen, klikt door
  const tekst = (await deel.allTextContents()).join(' ').toLowerCase();
  for (const eng of ['aanval', 'oorlog', 'kwantum', 'stem namaken']) expect(tekst).not.toContain(eng);
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

test('vraag 2: op een Samsung weet je in welke treffer je kijkt', async ({ page }) => {
  await page.goto('/huischeck');
  const blok = page.locator('#vraag-2 details.nakijken');
  await blok.locator('> summary').click();
  const samsung = blok.locator('details[data-dienst="Android of Samsung"]');
  await expect(samsung.locator('ol')).toBeHidden();
  await samsung.locator('summary').click();
  await expect(samsung.locator('ol')).toContainText('Samsung Pass en Google Wachtwoordmanager');
  await expect(samsung.locator('ol')).toContainText('Kijk dan in allebei');
  await expect(blok.locator('details[data-dienst="iPhone"] ol')).toBeHidden();
});

test('vraag 5: ook de back-up van je telefoon telt, en je kunt hem nakijken', async ({ page }) => {
  await page.goto('/huischeck');
  await expect(page.locator('#vraag-5 legend')).not.toContainText('computer');
  await expect(page.locator('#hint-5')).toContainText('telefoon');
  const blok = page.locator('#vraag-5 details.nakijken');
  await blok.locator('> summary').click();
  for (const toestel of ['iPhone', 'Android of Samsung', 'Computer']) {
    await expect(blok.locator(`details[data-dienst="${toestel}"] > summary`)).toBeVisible();
  }
  await blok.locator('details[data-dienst="Android of Samsung"] > summary').click();
  await expect(blok.locator('details[data-dienst="Android of Samsung"] ol')).toContainText('back-up');
});

test('wie geen MijnKPN-inlog of herstelcodes heeft, weet toch wat hij kiest', async ({ page }) => {
  await page.goto('/huischeck');
  const drie = page.locator('#vraag-3 details.nakijken');
  await drie.locator('> summary').click();
  const kpn = drie.locator('details[data-dienst="KPN of Ziggo"]');
  await kpn.locator('summary').click();
  // geen zoekbalk met hulpartikelen, maar een regel om te kiezen
  await expect(kpn.locator('ol')).not.toContainText('zoekbalk');
  await expect(kpn.locator('ol')).toContainText('andere inlog');
  await expect(kpn.locator('ol')).toContainText('Dan kies je Nee');
  // vraag 8: zonder herstelcodes kijk je op je computer of tablet
  const acht = page.locator('#vraag-8 details.nakijken');
  await acht.locator('> summary').click();
  await expect(acht).toContainText('Nooit gekregen?');
  await expect(acht).toContainText('computer of tablet');
  await expect(acht).toContainText('Dan kies je Nee');
});

test('vraag 4, Windows: wat elke melding betekent', async ({ page }) => {
  await page.goto('/huischeck');
  const blok = page.locator('#vraag-4 details.nakijken');
  await blok.locator('> summary').click();
  const win = blok.locator('details[data-dienst="Windows"]');
  await win.locator('summary').click();
  await expect(win.locator('ol')).toContainText('Windows-logo');
  await expect(win.locator('ol')).toContainText('opnieuw moet opstarten');
  await expect(win.locator('ol')).toContainText('Updates hervatten');
});
