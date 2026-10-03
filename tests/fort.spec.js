import { test, expect } from '@playwright/test';
import { BRONNEN } from '../src/data/bronnen.js';

test('het fort kleurt mee met de huischeck', async ({ page }) => {
  await page.goto('/aan-de-slag');
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'onbekend');
  await page.goto('/huischeck');
  await page.locator('[data-vraag="4"] .ja').click(); // updates: ja → torenwacht staat
  await page.locator('[data-vraag="1"] .nee').click(); // e-mail: nee → poort wankelt
  await page.goto('/aan-de-slag');
  await expect(page.locator('[data-deel="toren"]')).toHaveAttribute('data-toestand', 'dicht');
  await expect(page.locator('[data-deel="poort"]')).toHaveAttribute('data-toestand', 'open');
  await expect(page.locator('[data-fort-stand]')).toHaveText('1 van de 10 delen van je fort staan, 1 wankelt nog.');
  await expect(page.locator('[data-kanteel="toren"]')).toHaveAttribute('data-toestand', 'dicht');
});

test('de trede-check wijst de juiste trede aan', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const check = page.locator('[data-tredecheck]');
  await expect(check.locator('[data-uitslag]')).toBeHidden();
  await check.locator('input[name="tc-ww"][value="kluis"]').check();
  await check.locator('input[name="tc-stap"][value="sms"]').check();
  await check.locator('input[name="tc-nood"][value="nee"]').check();
  await expect(check.locator('[data-titel]')).toHaveText('Een code per sms');
  await expect(check.locator('[data-link]')).toHaveAttribute('href', '#trede-4');
  await check.locator('input[name="tc-stap"][value="sleutel"]').check();
  await check.locator('input[name="tc-nood"][value="ja"]').check();
  await expect(check.locator('[data-titel]')).toHaveText('Twee sleutels en herstelcodes op papier');
  await expect(check.locator('[data-volgende]')).toBeHidden();
});

test('de trede-check stuurt je voor het doen naar de stap-voor-stappagina', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const check = page.locator('[data-tredecheck]');
  await check.locator('input[name="tc-ww"][value="zelfde"]').check();
  await check.locator('input[name="tc-stap"][value="geen"]').check();
  await check.locator('input[name="tc-nood"][value="nee"]').check();
  await expect(check.locator('[data-stap]')).toHaveAttribute('href', '/een-avond');
  await check.locator('input[name="tc-ww"][value="kluis"]').check();
  await check.locator('input[name="tc-stap"][value="sms"]').check();
  await expect(check.locator('[data-stap]')).toHaveAttribute('href', '/een-weekend');
});

// Naslag zoek je op: het antwoord staat vooraan, de koppen zijn vragen, en voor het doen
// wijst elke pagina naar de stap waar je het echt regelt.
const NASLAG = ['/van-geheim-woord-naar-zegelring', '/het-fort-afbouwen', '/krijg-je-je-geld-terug', '/de-storm-om-het-huis', '/wie-bewaart-je-sleutel', '/waarom-dit-saai-voelt'];
const DOEN = /^\/(huischeck|aan-de-slag|een-avond|een-weekend|ik-wil-verder|als-er-is-ingebroken|voor-de-mensen-om-je-heen|onderhoud)(#|$)/;

for (const pad of NASLAG) {
  test(`${pad} begint met het antwoord en heeft vragen als koppen`, async ({ page }) => {
    await page.goto(pad);
    // het antwoord staat direct onder de titel, vóór de inhoudsopgave, en die is dichtgeklapt
    const kort = page.locator('main .kort').first();
    await expect(kort).toBeInViewport();
    const inhoud = page.locator('[data-inhoud]');
    if (await inhoud.count()) {
      expect(await inhoud.evaluate((d) => d.open), 'inhoudsopgave dicht').toBe(false);
      const eerder = await kort.evaluate((k) => {
        const nav = document.querySelector('[data-inhoud]');
        return !!(k.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING);
      });
      expect(eerder, 'In het kort staat vóór de inhoudsopgave').toBe(true);
      // de inhoudsopgave is kort genoeg om te scannen
      expect(await inhoud.locator('li').count()).toBeLessThanOrEqual(10);
    }
    const koppen = await page.locator('main h2:not(.trede h2):not(#quiz-kop):not(#tredecheck-kop)').allTextContents();
    expect(koppen.length).toBeGreaterThanOrEqual(3);
    for (const kop of koppen) expect(kop.trim(), kop).toMatch(/\?$/);
  });

  test(`${pad} wijst voor het doen naar een stap die bestaat`, async ({ page, request }) => {
    await page.goto(pad);
    const links = await page.locator('.naardoen a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(links.length).toBeGreaterThan(0);
    // elke stap zegt in gewone woorden waar hij staat, zonder iets tussen haakjes
    for (const waar of await page.locator('.naardoen .waar').allTextContents()) expect(waar, waar).toMatch(/^Dit (is stap \d+ op|staat op) de pagina ‘[^’]+’.*\.$/);
    for (const href of links) {
      expect(href, href).toMatch(DOEN);
      const [pagina, anker] = href.split('#');
      const antwoord = await request.get(pagina);
      expect(antwoord.status(), href).toBe(200);
      // een anker dat niet (meer) bestaat, laat je bovenaan een lange pagina landen
      if (anker) expect(await antwoord.text(), href).toContain(`id="${anker}"`);
    }
  });
}

test('in de bronnen is een bewering met meer feiten een lijstje, en zoeken telt per bewering', async ({ page }) => {
  await page.goto('/bronnen');
  const lijst = page.locator('[data-bronnen]');
  await expect(lijst.locator('[data-item]')).toHaveCount(BRONNEN.length);
  await expect(lijst.locator('[data-stand]')).toHaveText(`${BRONNEN.length} feiten met een bron`);
  // Mat Honan: één bewering, twee feiten, dus twee punten
  const honan = lijst.locator('[data-item]', { hasText: 'Mat Honan' });
  await expect(honan.locator('ul.bewering > li')).toHaveCount(2);
  // een citaat met een puntkomma erin blijft heel
  await expect(lijst.locator('[data-item]', { hasText: 'Only amateurs attack machines' }).locator('ul.bewering')).toHaveCount(0);
  await lijst.locator('[data-zoek]').fill('Mat Honan');
  await expect(lijst.locator('[data-stand]')).toHaveText(`1 van ${BRONNEN.length} feiten`);
});

test('geld terug: wie in paniek komt, ziet eerst wat hij nu moet doen', async ({ page }) => {
  await page.goto('/krijg-je-je-geld-terug');
  // de waarschuwing staat vóór "In het kort", en in beeld zonder te scrollen, ook op een telefoon
  const eerst = page.locator('main .waarschuwing').first();
  await expect(eerst).toContainText('Bel eerst je bank');
  await expect(eerst).toBeInViewport();
  const volgorde = await page.locator('main .waarschuwing, main .kort').evaluateAll((els) => els.map((e) => e.className));
  expect(volgorde[0]).toContain('waarschuwing');
  // de waarschuwing is één regel, en springt naar de nummers zelf: wie zijn pas niet bij de hand heeft, heeft toch een nummer
  expect((await eerst.innerText()).split(/(?<=[.?])\s+/).length).toBeLessThanOrEqual(3);
  await expect(eerst.locator('a')).toHaveAttribute('href', '#welk-nummer-bel-ik-als-het-net-gebeurd-is');
  const nummers = page.locator('main h2#welk-nummer-bel-ik-als-het-net-gebeurd-is + p + ul');
  await expect(nummers).toContainText('Rabobank: 088 722 66 00');
  await expect(nummers).toContainText('ING: 020 22 888 00');
  await expect(page.locator('main a[href="/als-er-is-ingebroken#het-eerste-uur"]').first()).toBeAttached();
  // In het kort is twee vragen met elk een antwoord, geen blok van zeven regels
  const kort = (await page.locator('main .kort').first().innerText()).replace(/^In het kort:\s*/, '');
  expect(kort.split(/(?<=[.?])\s+/).length).toBeLessThanOrEqual(4);
});

test('de storm: een cijfer klopt ook zonder optellen of in een dichte uitklapper', async ({ page }) => {
  await page.goto('/de-storm-om-het-huis');
  const getallen = await page.locator('main .cijfers .getal').allTextContents();
  expect(getallen).toEqual(expect.arrayContaining(['10 van de 10', '97%', '99%', '80 jaar', '4.875', '60%']));
  for (const g of getallen) expect(g, g).not.toMatch(/^0\D|^0$/);
});

test('de ladder: geen aanloop vóór de treden, en verlies heeft een eigen kop', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  await expect(page.locator('main')).not.toContainText('Er zijn acht manieren om in te loggen');
  await expect(page.locator('main')).not.toContainText('Per trede zie je');
  const kop = page.locator('main h2', { hasText: 'kwijtraak' });
  await expect(kop).toHaveCount(1);
  await expect(page.locator('main')).toContainText('Herstelcodes op papier.');
});

test('in de bronnen is elke kop de naam van een hoofdstuk, met "Bronnen bij" ervoor', async ({ page }) => {
  await page.goto('/bronnen');
  const koppen = (await page.locator('[data-bronnen] h3').allTextContents()).map((k) => k.trim());
  expect(koppen.length).toBeGreaterThan(5);
  expect(new Set(koppen).size).toBe(koppen.length);
  // wie scant, ziet dat hier bronnen staan, geen antwoord: de kop is niet gelijk aan de titel van de pagina zelf
  expect(koppen).toContain('Bronnen bij De storm om het huis');
  for (const k of koppen) expect(k, k).toMatch(/^Bronnen bij /);
  for (const k of koppen) expect(k, k).not.toMatch(/·|NASLAG|HOOFDSTUK/i);
});

test('in de bronnen staat hoe actueel het is, en waar je hulp vindt, bovenaan', async ({ page }) => {
  await page.goto('/bronnen');
  await expect(page.locator('main h2', { hasText: 'Hoe actueel' })).toHaveCount(1);
  const vooraan = page.locator('main [data-vooraan]');
  await expect(vooraan).toContainText('Fraudehelpdesk');
  await expect(vooraan.locator('a[href="/krijg-je-je-geld-terug#welk-nummer-bel-ik-als-het-net-gebeurd-is"]')).toBeVisible();
});

test('geld terug: het beslisschema is gewone tekst, minstens zo groot als de lopende tekst', async ({ page }) => {
  await page.goto('/krijg-je-je-geld-terug');
  const schema = page.locator('main figure.beslis');
  await expect(schema).toContainText('Wie drukte op akkoord?');
  await expect(schema.locator('svg text')).toHaveCount(0);
  const maten = await schema.locator('p').evaluateAll((ps) => ps.map((p) => parseFloat(getComputedStyle(p).fontSize)));
  const brood = await page.locator('main > p').first().evaluate((p) => parseFloat(getComputedStyle(p).fontSize));
  for (const m of maten) expect(m).toBeGreaterThanOrEqual(Math.min(brood, 18));
  // wat je los hiervan terugdraait, staat als gewone zin ónder het schema
  await expect(schema).not.toContainText('incasso');
  await expect(page.locator('main figure.beslis + p')).toContainText('incasso');
  // de twee takken staan onder elkaar, op volle breedte: naast elkaar braken de kernzinnen af
  const takken = await schema.locator('.tak').evaluateAll((ts) => ts.map((t) => t.getBoundingClientRect()));
  expect(takken).toHaveLength(2);
  expect(takken[1].top).toBeGreaterThanOrEqual(takken[0].bottom);
  expect(Math.round(takken[0].width)).toBe(Math.round(takken[1].width));
  const breedte = await schema.evaluate((f) => f.getBoundingClientRect().width);
  expect(takken[0].width).toBeGreaterThan(breedte * 0.9);
  // en zonder vaktermen als "niet-toegestane betaling" of "coulance"
  await expect(schema).not.toContainText(/toegestane|coulance|nalatigheid/);
});

test('de ladder: wat een passkey is en hoe je hem instelt, staat onder een eigen kop', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  await expect(page.locator('main h2', { hasText: 'Wat is een passkey?' })).toHaveCount(1);
  const kop = page.locator('main h2', { hasText: 'Hoe stel ik een passkey in?' });
  await expect(kop).toHaveCount(1);
  // stappen op de pagina zelf, niet alleen een verwijzing
  await expect(page.locator('main h2:has-text("Hoe stel ik een passkey in?") + p + ol > li')).toHaveCount(4);
  // In het kort is één antwoord, geen rij adviezen
  const kort = (await page.locator('main .kort').first().innerText()).replace(/^In het kort:\s*/, '');
  expect(kort.split(/(?<=[.?])\s+/).length).toBeLessThanOrEqual(2);
});

test('het fort afbouwen: wie zoekt naar opruimen of overlijden, vindt het bovenaan en in een kop', async ({ page }) => {
  await page.goto('/het-fort-afbouwen');
  const vooraan = page.locator('main [data-vooraan]');
  // de titel zegt wat er staat: geen "afbouwen" dat als slopen leest
  await expect(page.locator('main h1')).toHaveText(/sterker beveiligen/i);
  await expect(page.locator('main h1')).not.toContainText('afbouwen');
  // wie een account wil opheffen, ziet bovenaan dat dat ergens anders staat
  await expect(vooraan.locator('a[href="/onderhoud"]')).toBeVisible();
  await expect(vooraan).toContainText('oud account opheft');
  // geen rij kaders vóór de inhoud: de eerste kop is "Waar begin ik?", met een volgorde
  await expect(page.locator('main h2').first()).toHaveText('Waar begin ik?');
  await expect(page.locator('main [data-zelf-doen]', { hasText: 'Eerst de basis' })).toHaveCount(0);
  const begin = page.locator('main h2#waar-begin-ik ~ ol a');
  await expect(begin.first()).toHaveAttribute('href', /^#hoeveel-reservekopie/);
  await expect(page.locator('main h2#waar-begin-ik ~ ol a[href="#wie-krijgt-mijn-accounts-als-ik-er-niet-meer-ben"]')).toHaveCount(1);
  // elke stap in de volgorde springt naar een kop die bestaat
  for (const href of await begin.evaluateAll((as) => as.map((a) => decodeURIComponent(a.getAttribute('href'))))) {
    await expect(page.locator(`main h2[id="${href.slice(1)}"]`), href).toHaveCount(1);
  }
  // de vaktaal (IP-adressen, zes huiswerkvragen) zit in een uitklapper, niet in de lopende tekst
  await expect(page.locator('main').getByText('86.54.11.1')).toBeHidden();
  const kop = page.locator('main h2#wie-krijgt-mijn-accounts-als-ik-er-niet-meer-ben');
  await expect(kop).toHaveCount(1);
  // en niet meer verstopt onder de kop over jezelf buitensluiten
  const buitensluit = await page.locator('main h2', { hasText: 'buitensluit' }).evaluate((h) => {
    let t = ''; for (let e = h.nextElementSibling; e && e.tagName !== 'H2'; e = e.nextElementSibling) t += e.textContent; return t;
  });
  expect(buitensluit).not.toContain('erfeniscontact');
});

test('wie bewaart je sleutel: de titel past bij het adres, en de vragen van de lezer staan vooraan', async ({ page }) => {
  await page.goto('/wie-bewaart-je-sleutel');
  await expect(page.locator('main h1')).toHaveText(/sleutels/);
  // de eerste kop beantwoordt "is de kluis in mijn telefoon goed genoeg?" met ja
  const eerste = page.locator('main h2').first();
  await expect(eerste).toHaveText('Is de kluis in mijn telefoon goed genoeg?');
  await expect(page.locator('main h2#is-de-kluis-in-mijn-telefoon-goed-genoeg + p')).toHaveText(/^Ja\./);
  // kwijt, reservesleutel en eigen mail hebben een eigen kop, vóór de Amerikaanse wetten
  const koppen = await page.locator('main h2').allTextContents();
  const plek = (t) => koppen.findIndex((k) => k.includes(t));
  for (const t of ['telefoon kwijt', 'reservesleutel', 'KPN']) expect(plek(t), t).toBeGreaterThan(0);
  for (const t of ['telefoon kwijt', 'reservesleutel', 'KPN']) expect(plek(t), t).toBeLessThan(plek('Europees'));
  // wie zoekt naar nalatenschap, vindt een kop met een verwijzing
  await expect(page.locator('main h2#wie-krijgt-mijn-sleutels-als-ik-er-niet-meer-ben')).toHaveCount(1);
});

test('de storm: wie KPN-mail heeft of geen router kent, loopt niet vast, en wie een nepbericht zoekt, wordt doorgestuurd', async ({ page }) => {
  await page.goto('/de-storm-om-het-huis');
  await expect(page.locator('main [data-vooraan] a[href="/inbrekers-van-nu#is-dit-bericht-echt"]')).toBeVisible();
  const doen = page.locator('main h2#wat-moet-ik-doen + p + ol');
  await expect(doen.locator('li').nth(0)).toContainText('KPN');
  await expect(doen.locator('li').nth(1)).toContainText('Vraag iemand die je vertrouwt');
});

test('geld terug: na het bellen staan aangifte, Fraudehelpdesk en Slachtofferhulp op dezelfde plek', async ({ page }) => {
  await page.goto('/krijg-je-je-geld-terug');
  // de nummers zijn de eerste kop: wie in paniek is, hoeft niet langs de uitleg
  await expect(page.locator('main h2').first()).toHaveId('welk-nummer-bel-ik-als-het-net-gebeurd-is');
  const daarna = page.locator('main h2#welk-nummer-bel-ik-als-het-net-gebeurd-is ~ ol').first();
  await expect(daarna).toContainText('aangifte');
  await expect(daarna).toContainText('088-786 73 72');
  await expect(daarna).toContainText('Slachtofferhulp');
});

test('de ladder: een overzicht met een oordeel per trede, en passkey-stappen per maildienst', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const overzicht = page.locator('main h2#welke-manieren-van-inloggen-zijn-er + p + ol > li');
  await expect(overzicht).toHaveCount(8);
  await expect(overzicht.nth(3).locator('a')).toHaveAttribute('href', '#trede-4');
  await expect(overzicht.nth(3)).toContainText('beter dan niets');
  const passkey = page.locator('main h2:has-text("Hoe stel ik een passkey in?") + p');
  // wie KPN heeft, leest dat vóór de stappen; wie Gmail heeft, ziet waar hij moet zijn
  await expect(passkey).toContainText('KPN');
  await expect(page.locator('main h2:has-text("Hoe stel ik een passkey in?") + p + ol')).toContainText('myaccount.google.com');
});

test('het fort afbouwen: geen onbekende niveaus, en Android en Google krijgen dezelfde hulp als Apple', async ({ page }) => {
  await page.goto('/het-fort-afbouwen');
  await expect(page.locator('main')).not.toContainText(/niveau \d/i);
  await expect(page.locator('main [data-vooraan]')).toContainText('afmaken, niet afbreken');
  const sectie = async (id) => page.locator(`main h2#${id}`).evaluate((h) => {
    let t = ''; for (let e = h.nextElementSibling; e && e.tagName !== 'H2'; e = e.nextElementSibling) t += e.textContent; return t;
  });
  expect(await sectie('wat-als-ik-mezelf-buitensluit')).toContain('back-upcodes');
  const nalaten = await sectie('wie-krijgt-mijn-accounts-als-ik-er-niet-meer-ben');
  expect(nalaten).toContain('Inloggen en beveiliging');
  expect(nalaten).toContain('inactiviteitsvoorkeuren');
  expect(nalaten).toContain('bank');
});

test('wie bewaart je sleutel: je ziet hoe de kluis in je telefoon heet, en Gmail heeft een kop', async ({ page }) => {
  await page.goto('/wie-bewaart-je-sleutel');
  const kluis = page.locator('main h2#is-de-kluis-in-mijn-telefoon-goed-genoeg ~ ul').first();
  await expect(kluis).toContainText('app Wachtwoorden');
  await expect(kluis).toContainText('passwords.google.com');
  await expect(page.locator('main h2', { hasText: 'Gmail' })).toHaveCount(1);
});

test('de ladder: wie niet weet hoe hij inlogt, krijgt geen verzonnen trede maar een begin', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const check = page.locator('[data-tredecheck]');
  await check.locator('input[name="tc-ww"][value="weetniet"]').check();
  await check.locator('input[name="tc-stap"][value="weetniet"]').check();
  await check.locator('input[name="tc-nood"][value="nee"]').check();
  await expect(check.locator('[data-titel]')).toHaveText('Nog niet zeker');
  await expect(check.locator('[data-stap]')).toHaveAttribute('href', '/een-avond');
  await expect(check.locator('[data-link]')).toBeHidden();
  // wie het wel weet, krijgt weer gewoon zijn trede
  await check.locator('input[name="tc-ww"][value="kluis"]').check();
  await check.locator('input[name="tc-stap"][value="app"]').check();
  await expect(check.locator('[data-titel]')).toHaveText('Een code uit een app');
  await expect(check.locator('[data-link]')).toBeVisible();
});

test('de ladder: de acht treden zijn dicht, en een link naar een trede klapt hem open', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const treden = page.locator('main details[data-trede]');
  await expect(treden).toHaveCount(8);
  for (const open of await treden.evaluateAll((ds) => ds.map((d) => d.open))) expect(open).toBe(false);
  // de titels blijven te zien, zonder hoofdletterkopjes of codes
  await expect(page.locator('#trede-4 summary h3')).toContainText('Een code per sms');
  await page.locator('main h2#welke-manieren-van-inloggen-zijn-er + p + ol a[href="#trede-4"]').click();
  await expect(page.locator('#trede-4')).toHaveAttribute('open', '');
  await expect(page.locator('#trede-4 .weeg')).toBeVisible();
  await expect(page.locator('#trede-4 .weeg')).toContainText('Hier gaat het mis');
  // van een andere pagina, met het anker in het adres
  await page.goto('/van-geheim-woord-naar-zegelring#trede-7');
  await expect(page.locator('#trede-7')).toHaveAttribute('open', '');
  await expect(page.locator('main')).not.toContainText('hier kantelt het');
  await expect(page.locator('main')).not.toContainText('a7f2c9');
});

test('de ladder: wie KPN-mail heeft, leest hoe hij het wachtwoord verandert en wat de Mail-app dan doet', async ({ page }) => {
  await page.goto('/van-geheim-woord-naar-zegelring');
  const kpn = page.locator('main h2:has-text("Hoe stel ik een passkey in?") + p');
  await expect(kpn).toContainText('wachtwoord wijzigen');
  await expect(kpn).toContainText('Mail-app');
});

test('geld terug: hoe lang je hebt, staat onder een eigen kop, en elk banknummer heeft zijn bron ernaast', async ({ page }) => {
  await page.goto('/krijg-je-je-geld-terug');
  const kop = page.locator('main h2', { hasText: 'Hoe lang heb ik' });
  await expect(kop).toHaveCount(1);
  const sectie = await kop.evaluate((h) => {
    let t = ''; for (let e = h.nextElementSibling; e && e.tagName !== 'H2'; e = e.nextElementSibling) t += e.textContent; return t;
  });
  expect(sectie).toContain('vandaag');
  expect(sectie).toContain('acht weken');
  expect(sectie).toContain('drie maanden');
  const rabo = page.locator('main h2#welk-nummer-bel-ik-als-het-net-gebeurd-is + p + ul li', { hasText: 'Rabobank' });
  await expect(rabo.locator('a')).toHaveAttribute('href', /rabobank\.nl/);
});

test('in de bronnen zijn de hoofdstukken dicht, en zoeken of een link klapt open wat past', async ({ page }) => {
  await page.goto('/bronnen');
  const groepen = page.locator('[data-bronnen] details[data-groep]');
  expect(await groepen.count()).toBeGreaterThan(5);
  for (const open of await groepen.evaluateAll((ds) => ds.map((d) => d.open))) expect(open).toBe(false);
  await page.locator('[data-zoek]').fill('Rabobank');
  const raak = page.locator('[data-item]:visible', { hasText: '088 722 66 00' });
  await expect(raak).toHaveCount(1);
  await page.locator('[data-zoek]').fill('');
  await expect(raak).toHaveCount(0);
  await page.locator('[data-alles]').click();
  for (const open of await groepen.evaluateAll((ds) => ds.map((d) => d.open))) expect(open).toBe(true);
  await page.goto('/bronnen#krijg-je-je-geld-terug');
  await expect(page.locator('details[data-groep="krijg-je-je-geld-terug"]')).toHaveAttribute('open', '');
});

test('wie bewaart je sleutel: wie een boekje heeft en wie twee kluizen heeft, krijgt een antwoord', async ({ page }) => {
  await page.goto('/wie-bewaart-je-sleutel');
  const kop = page.locator('main h2#mag-ik-mijn-wachtwoorden-in-een-boekje-schrijven');
  await expect(kop).toHaveCount(1);
  await expect(page.locator('main h2#mag-ik-mijn-wachtwoorden-in-een-boekje-schrijven + p')).toHaveText(/^Ja\./);
  await expect(page.locator('main .kort a[href="#mag-ik-mijn-wachtwoorden-in-een-boekje-schrijven"]').first()).toBeVisible();
  const kluis = page.locator('main h2#is-de-kluis-in-mijn-telefoon-goed-genoeg ~ ul').first();
  await expect(kluis).toContainText('Samsung Pass');
  await expect(kluis).toContainText('Kies er één');
});

test('het fort afbouwen: wie een iPhone heeft, ziet waar hij een herstelcontact instelt', async ({ page }) => {
  await page.goto('/het-fort-afbouwen');
  const sectie = await page.locator('main h2#wat-als-ik-mezelf-buitensluit').evaluate((h) => {
    let t = ''; for (let e = h.nextElementSibling; e && e.tagName !== 'H2'; e = e.nextElementSibling) t += e.textContent; return t;
  });
  expect(sectie).toContain('Accountherstel');
  expect(sectie).toContain('herstelcontact');
  expect(sectie).not.toContain('zelfs Apple je niet meer helpen');
});
