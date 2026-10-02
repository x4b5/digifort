import { test, expect } from '@playwright/test';

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
  await expect(plan).toContainText('FileVault');
  await expect(plan).toContainText('Instellingen');
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

test('het tweede slot zegt per telefoon welke app werkt, en wat je doet met de vierkante code', async ({ page }) => {
  await page.goto(PAD);
  const stap = page.locator('#stap-tweede-slot');
  await expect(stap.locator('details.optie')).not.toHaveCount(0);
  // je kiest je eigen e-mail; dicht tot je erop tikt, open als je tikt
  const apple = stap.locator('details.optie', { hasText: '@icloud.com' });
  await apple.locator('summary').click();
  await expect(apple.getByText('Inloggen en beveiliging')).toBeVisible();
  const app = stap.locator('details.optie', { hasText: 'app met codes' }).last();
  await app.locator('summary').click();
  await expect(app).toContainText('iPhone: Ente Auth of 2FAS');
  await expect(app).toContainText('vierkante code');
  // geen vaktaal: 2FA, authenticator; de app 2FAS mag wel
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
