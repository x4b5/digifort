import { test, expect } from '@playwright/test';
import { blokken, meet } from '../scripts/leesniveau.mjs';

const PAD = '/als-er-is-ingebroken';

test('wie net is opgelicht, ziet in het eerste scherm wie hij belt', async ({ page }) => {
  await page.goto(PAD);
  await expect(page.locator('#noodkaart-kop')).toBeInViewport();
  await expect(page.locator('.noodkaart a[href="tel:112"]')).toBeInViewport();
  await expect(page.locator('.noodkaart a.bank').first()).toBeInViewport();
  // elke belknop belt echt: een tel:-link met alleen cijfers
  const hrefs = await page.locator('.noodkaart a[href^="tel:"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThanOrEqual(7);
  for (const h of hrefs) expect(h).toMatch(/^tel:\d+$/);
});

test('de noodkaart staat voor alle andere tekst in het hoofdstuk', async ({ page }) => {
  await page.goto(PAD);
  const eerste = await page.locator('main h2').first().getAttribute('id');
  expect(eerste).toBe('noodkaart-kop');
});

test('elke situatie leidt naar een eigen genummerd stappenplan', async ({ page }) => {
  await page.goto(PAD);
  const links = page.locator('.situaties a');
  await expect(links).toHaveCount(3);
  for (const href of await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')))) {
    const kop = page.locator(`h2${href}`);
    await expect(kop).toHaveCount(1);
    // direct na de kop (en hooguit een paar zinnen) volgt het plan
    const plan = page.locator(`h2${href} ~ .plan`).first();
    const stappen = plan.locator('.stap-item');
    expect(await stappen.count()).toBeGreaterThanOrEqual(5);
    // de schermlezer hoort het nummer van de stap in de kop
    await expect(stappen.first().locator('h3')).toContainText(/^Stap 1:/);
  }
});

test('een stap zegt wat je ziet als het gelukt is', async ({ page }) => {
  await page.goto(PAD);
  await expect(page.locator('[data-stappenplan="stappen-geld"] .stap-item').first().locator('.gelukt')).toContainText('Gelukt als:');
});

test('een afgevinkte stap blijft staan na herladen', async ({ page }) => {
  await page.goto(PAD);
  const plan = page.locator('[data-stappenplan="stappen-verlies"]');
  await plan.locator('.stap-item').first().locator('label.gedaan').click();
  await expect(plan.locator('[data-stand]')).toHaveText('1 van 8 stappen gedaan');
  await page.reload();
  await expect(plan.locator('input[data-stap="vergrendel"]')).toBeChecked();
  await expect(plan.locator('.stap-item').first()).toHaveClass(/af/);
});

test('de waarschuwing heeft een woord voor de schermlezer', async ({ page }) => {
  await page.goto(PAD);
  await expect(page.locator('.noodkaart .waarschuwing .schermlezer')).toHaveText('Waarschuwing: ');
});

test('de plekken waar andere pagina\'s naar linken bestaan nog', async ({ page }) => {
  await page.goto(PAD);
  for (const id of ['het-eerste-uur', 'noodpakket', 'het-noodpakket', 'wie-krijgt-de-sleutels-je-digitale-nalatenschap', 'telefoon-of-laptop-kwijt-het-stappenplan']) {
    await expect(page.locator(`[id="${id}"]`), id).toHaveCount(1);
  }
});

test('elke link binnen de pagina komt ergens uit', async ({ page }) => {
  await page.goto(PAD);
  const ankers = await page.locator('main a[href^="#"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  expect(ankers.length).toBeGreaterThan(5);
  for (const h of new Set(ankers)) {
    await expect(page.locator(`[id="${h.slice(1)}"]`), h).toHaveCount(1);
  }
});

test('het nieuwe e-mailwachtwoord zegt per soort adres waar je het verandert', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('#stap-mail-wachtwoord');
  for (const t of ['@gmail.com', '@outlook.com', '@icloud.com', '@ziggo.nl']) await expect(stap).toContainText(t);
  await expect(stap).toContainText('Mail op je iPhone');
});

test('wat je vooraf regelt is een stappenplan met waar je tikt, per toestel', async ({ page }) => {
  await page.goto(PAD);
  const plan = page.locator('[data-stappenplan="stappen-vooraf"]');
  await expect(plan.locator('.stap-item')).toHaveCount(6);
  // elke stap zegt wat je ziet als het gelukt is
  await expect(plan.locator('.gelukt')).toHaveCount(6);
  await expect(plan).toContainText('Instellingen');
  // wie een iPhone met ronde knop heeft, of een oudere, vindt de stap ook
  await expect(plan).toContainText('Touch ID en toegangscode');
  await expect(plan).toContainText('Je doet niets fout');
  // zoek mijn: op Android de versie van Google, op Windows alleen met een Microsoft-account
  await expect(plan).toContainText('Find Hub');
  await expect(plan).toContainText('Microsoft-account');
  // geen vaktaal die nergens wordt uitgelegd
  await expect(plan).not.toContainText(/FileVault|BitLocker/);
  // wat elders op de site al stap voor stap staat, is een link naar die ene plek
  for (const href of ['/een-avond#stap-pincode', '/een-weekend#stap-versleuteling', '/een-weekend#stap-backup']) {
    await expect(plan.locator(`a[href="${href}"]`), href).toHaveCount(1);
  }
});

test('wie AnyDesk of TeamViewer kreeg, leest per apparaat hoe hij het weghaalt', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('[data-stappenplan="stappen-geld"] .stap-item').nth(2);
  for (const t of ['Windows', 'Mac', 'iPhone', 'Android', 'Verwijder']) await expect(stap).toContainText(t);
});

test('geen stap stuurt je naar een stap in een ander stappenplan', async ({ page }) => {
  await page.goto(PAD);
  await expect(page.locator('main')).not.toContainText(/zoals in stap \d+ bij/);
  await expect(page.locator('main a[href="#stap-mail-wachtwoord"], main a[href="#stap-uitloggen"], main a[href="#stap-bewijs"]')).toHaveCount(0);
});

test('ABN AMRO heeft twee knoppen, elk met de tijd waarop je dat nummer belt', async ({ page }) => {
  await page.goto(PAD);
  const abn = page.locator('.noodkaart a.bank', { hasText: 'ABN AMRO' });
  await expect(abn).toHaveCount(2);
  await expect(abn.nth(0)).toContainText('werkdagen');
  await expect(abn.nth(1)).toContainText('weekend');
});

test('het tweede slot staat op één plek: de stap wijst naar Eén avond, zonder vaktaal', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('#stap-tweede-slot');
  await expect(stap.locator('a[href="/een-avond#stap-mail-tweede-slot"]')).toHaveCount(1);
  // de reden om geen sms te kiezen staat er wel, kort
  await expect(stap).toContainText('geen code per sms');
  await expect(stap).not.toContainText(/\b2FA\b|authenticator/i);
});

test('bewijs bewaren kan ook op een laptop', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('#stap-bewijs');
  for (const t of ['iPhone', 'Android', 'Windows', 'Mac']) await expect(stap.locator('summary', { hasText: t })).toHaveCount(1);
});

test('wie zijn geld kwijt is, leest bij de aangifte of hij het terugkrijgt', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('[data-stappenplan="stappen-geld"] .stap-item').nth(3);
  await expect(stap).toContainText('Krijg je je geld terug?');
  await expect(stap).toContainText('terugbetalen');
});

test('bij de doorstuurregels staat nergens dat je niets mag veranderen', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('[data-stappenplan="stappen-account"] .stap-item').nth(5);
  await expect(stap).not.toContainText('Je verandert hier niets');
  await expect(stap).toContainText('Je haalt alleen weg wat je niet zelf hebt gemaakt');
  // ook bij iCloud staat waar de instellingen van Mail zitten
  const icloud = stap.locator('details.optie', { hasText: 'icloud.com' }).last();
  await icloud.locator('summary').click();
  await expect(icloud).toContainText('drie puntjes of een tandwiel');
});

test('bij het nummer voor herstel staat per dienst waar het staat', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('[data-stappenplan="stappen-account"] .stap-item').nth(4);
  for (const t of ['@gmail.com (Google)', 'Microsoft', '@icloud.com of @me.com (Apple)']) {
    await expect(stap.locator('summary', { hasText: t }).first()).toHaveCount(1);
  }
});

test('wie op een webpagina moet zoeken, leest hoe dat moet', async ({ page }) => {
  await page.goto(PAD);
  // overal waar we zeggen "zoek op die pagina", staat ook hoe
  const keren = await page.locator('main').evaluate((m) => (m.textContent.match(/Zoek op die pagina/g) || []).length);
  expect(keren).toBeGreaterThan(0);
  await expect(page.locator('main .zoek-op-pagina')).toHaveCount(keren);
  await expect(page.locator('main .zoek-op-pagina').first()).toContainText('Ctrl en F');
});

test('wissen op afstand zegt per toestel op welke knop je drukt', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('[data-stappenplan="stappen-verlies"] .stap-item').nth(5);
  for (const t of ['icloud.com/find', 'google.com/android/find', 'account.microsoft.com/devices', 'Bevestig']) await expect(stap).toContainText(t);
  await expect(stap).not.toContainText('dezelfde site als in stap 1');
});

test('wie hetzelfde wachtwoord vaker gebruikte, leest hoe hij uitzoekt waar', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('[data-stappenplan="stappen-account"] .stap-item').nth(6);
  for (const t of ['papier', 'Wachtwoorden', 'passwords.google.com', 'welkom', 'geld', 'je bank']) await expect(stap).toContainText(t);
  // de snelle weg: de telefoon zoekt zelf welke wachtwoorden je vaker gebruikt
  for (const t of ['Wachtwoordcheck', 'Beveiligingsaanbevelingen', 'oogje', 'Touch ID']) await expect(stap).toContainText(t);
  await expect(stap.locator('.gelukt')).toContainText('streep');
});

test('de pagina blijft onder het woordenplafond van 4000', async ({ request }) => {
  const html = await (await request.get(PAD)).text();
  const { woorden } = meet(blokken(html));
  expect(woorden).toBeLessThanOrEqual(4000);
});

test('elke link naar een stap op een andere doe-pagina komt ergens uit', async ({ page }) => {
  await page.goto(PAD);
  const hrefs = await page.locator('main a[href^="/een-"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThanOrEqual(5);
  for (const href of new Set(hrefs)) {
    const [pad, id] = href.split('#');
    await page.goto(pad);
    await expect(page.locator(`[id="${id}"]`), href).toHaveCount(1);
  }
});

test('wie opgelicht is, krijgt het e-mailwachtwoord niet nog eens uitgelegd, maar gaat door naar het accountplan', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('[data-stappenplan="stappen-geld"] .stap-item').nth(2);
  await expect(stap.locator('a[href="#iemand-zit-in-je-account"]')).toHaveCount(1);
  await expect(stap).not.toContainText('@gmail.com');
});

test('bij Google uitloggen staat het adres van de lijst met apparaten', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('#stap-uitloggen');
  const google = stap.locator('details.optie', { hasText: 'Google' }).first();
  await google.locator('summary').click();
  await expect(google).toContainText('myaccount.google.com/device-activity');
});

test('herstelgegevens en doorsturen zijn twee aparte stappen, elk met één rij keuzes', async ({ page }) => {
  await page.goto(PAD);
  const plan = page.locator('[data-stappenplan="stappen-account"]');
  await expect(plan.locator('.stap-item')).toHaveCount(10);
  await expect(page.locator('[data-stappenplan="stappen-account"] h3', { hasText: 'doorgestuurd' })).toHaveCount(1);
  for (const n of [4, 5]) {
    const stap = plan.locator('.stap-item').nth(n);
    await expect(stap.locator('summary', { hasText: '@gmail.com' })).toHaveCount(1);
  }
});

test('wie alleen een telefoon heeft, leest hoe hij de doorstuurregels toch ziet', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('[data-stappenplan="stappen-account"] .stap-item').nth(5);
  await expect(stap).toContainText('Alleen een telefoon?');
  await expect(stap).toContainText('Desktopsite');
});

test('mail van KPN of Ziggo: waar je inlogt, met welk wachtwoord, en hoe je de klantenservice vindt', async ({ page }) => {
  await page.goto(PAD);
  for (const sel of ['#stap-mail-wachtwoord', '[data-stappenplan="stappen-account"] .stap-item >> nth=4', '[data-stappenplan="stappen-account"] .stap-item >> nth=5']) {
    const kpn = page.locator(sel).locator('details.optie', { hasText: '@kpnmail.nl' });
    await expect(kpn, sel).toHaveCount(1);
    await kpn.locator('summary').click();
    for (const t of ['kpn.com', 'ziggo.nl', 'klantenservice', 'rekening']) await expect(kpn, sel).toContainText(t);
  }
  const wachtwoord = page.locator('#stap-mail-wachtwoord details.optie', { hasText: '@kpnmail.nl' });
  await expect(wachtwoord).toContainText('Mijn KPN');
  await expect(wachtwoord).toContainText('kan anders zijn dan dat van je mail');
});

test('wie Mail op de iPhone gebruikt, leest waar het nieuwe wachtwoord komt', async ({ page }) => {
  await page.goto(PAD);
  await expect(page.locator('#stap-mail-wachtwoord')).toContainText('vak Wachtwoord');
});

test('telefoon kwijt: je kiest eerst je toestel, en de inlogcode leidt niet in een rondje', async ({ page }) => {
  await page.goto(PAD);
  const plan = page.locator('[data-stappenplan="stappen-verlies"]');
  const stap3 = plan.locator('.stap-item').nth(2);
  // een iPhone-gebruiker met een KPN-adres ziet toch hoe zijn Apple-wachtwoord verandert
  const apple = stap3.locator('details.optie', { hasText: 'iPhone' });
  await expect(apple).toHaveCount(1);
  await apple.locator('summary').click();
  await expect(apple).toContainText('account.apple.com');
  await expect(stap3).toContainText('nieuwe simkaart');
  const stap1 = plan.locator('.stap-item').nth(0);
  await expect(stap1).toContainText('Doe eerst stap 2');
  await expect(stap1).toContainText('nieuwe simkaart');
  await expect(plan.locator('.stap-item').nth(1)).toContainText('KPN, Odido of Vodafone');
});

test('vaktaal staat er niet zonder uitleg', async ({ page }) => {
  await page.goto(PAD);
  const main = page.locator('main');
  await expect(main).not.toContainText(/provider|wallet|FileVault|BitLocker/i);
  await expect(main).toContainText('een app die je wachtwoorden bewaart');
  await expect(main).toContainText('het vaste nummer van je telefoon');
});
