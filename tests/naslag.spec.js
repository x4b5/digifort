import { test, expect } from '@playwright/test';

/**
 * De inbrekers van nu en van morgen zoek je op: het antwoord staat vooraan, in een
 * overzicht dat naar de juiste kop wijst, en elk onderwerp wijst door naar het doe-deel.
 */
const NASLAG = ['/inbrekers-van-nu', '/inbrekers-van-morgen'];

for (const pad of NASLAG) {
  test(`${pad}: het overzicht staat vóór de eerste kop en elke rij wijst naar een plek die bestaat`, async ({ page }) => {
    await page.goto(pad);
    const overzicht = page.locator('[data-overzicht]');
    await expect(overzicht).toHaveCount(1);
    // vooraan: het overzicht komt in de pagina vóór de eerste kop van de tekst
    const voor = await overzicht.evaluate((el) => {
      const kop = document.querySelector('main h2');
      return Boolean(kop && (el.compareDocumentPosition(kop) & Node.DOCUMENT_POSITION_FOLLOWING));
    });
    expect(voor).toBe(true);

    const rijen = overzicht.locator('dt');
    expect(await rijen.count()).toBeGreaterThanOrEqual(5);
    for (const a of await overzicht.locator('dd a').all()) {
      const href = await a.getAttribute('href');
      if (href.startsWith('#')) await expect(page.locator(href), href).toHaveCount(1);
    }
  });

  test(`${pad}: elke link naar het doe-deel komt ergens uit`, async ({ page, request }) => {
    await page.goto(pad);
    const links = page.locator('[data-naar-doen] a');
    expect(await links.count()).toBeGreaterThanOrEqual(3);
    const paden = new Set();
    for (const a of await links.all()) paden.add((await a.getAttribute('href')).split('#')[0]);
    for (const p of paden) expect((await request.get(p)).status(), p).toBe(200);
  });
}

test('een overzichtsrij springt naar het antwoord', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  await page.locator('[data-overzicht] a', { hasText: 'Wat is sim-swapping?' }).click();
  await expect(page).toHaveURL(/#wat-is-sim-swapping$/);
  await expect(page.getByRole('heading', { level: 2, name: 'Wat is sim-swapping?' })).toBeInViewport();
});

test('oude links naar het geheime woord blijven werken', async ({ page }) => {
  // het inbraakspel en Voor de mensen om je heen linken hierheen
  await page.goto('/inbrekers-van-morgen#het-geheime-woord-van-je-familie');
  await expect(page.locator('#het-geheime-woord-van-je-familie')).toBeInViewport();
});

test('de inbrekers van nu opent met het antwoord: het kader, dan het overzicht, dan pas Ria', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  const volgorde = await page.evaluate(() => {
    const main = document.querySelector('main');
    const kader = Array.from(main.querySelectorAll('*')).find((el) => el.children.length === 0 && el.textContent.trim() === 'Stop, en neem zelf contact op.');
    const overzicht = main.querySelector('[data-overzicht]');
    const scene = main.querySelector('.scene');
    const na = (a, b) => Boolean(a && b && (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING));
    return { kaderVoorOverzicht: na(kader, overzicht), overzichtVoorScene: na(overzicht, scene) };
  });
  expect(volgorde).toEqual({ kaderVoorOverzicht: true, overzichtVoorScene: true });
  // het verhaal leest rechtop, niet cursief
  await expect(page.locator('.scene .tekst')).toHaveCSS('font-style', 'normal');
});

test('op een telefoon staat het kader in het eerste scherm', async ({ page }, info) => {
  test.skip(info.project.name !== 'telefoon', 'alleen op een smal scherm');
  await page.goto('/inbrekers-van-nu');
  await expect(page.getByText('Stop, en neem zelf contact op.', { exact: true })).toBeInViewport();
});

test('wie al geklikt of betaald heeft, vindt een kop met de eerste stappen en een kop over geld terug', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  for (const naam of ['Ik heb al geklikt, ingelogd of betaald. Wat nu?', 'Krijg ik mijn geld terug?']) {
    await expect(page.getByRole('heading', { level: 2, name: naam })).toHaveCount(1);
  }
  await page.locator('[data-overzicht] a', { hasText: 'Ik heb al geklikt, ingelogd of betaald. Wat nu?' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Ik heb al geklikt, ingelogd of betaald. Wat nu?' })).toBeInViewport();
});

test('wie een code moet doorsturen, vindt op de pagina over oplichting een eigen kop met het antwoord vooraan', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  await page.locator('[data-overzicht] a', { hasText: 'Iemand vraagt me een code door te sturen. Wat is dit?' }).click();
  const kop = page.getByRole('heading', { level: 2, name: 'Iemand vraagt me een code door te sturen. Wat is dit?' });
  await expect(kop).toBeInViewport();
  // het antwoord staat direct onder de kop, niet verstopt in een uitklapper
  const antwoord = await kop.evaluate((h) => h.nextElementSibling?.textContent ?? '');
  expect(antwoord).toContain('Stuur de code nooit door');
  // en de plattegrond wijst ernaar
  await page.goto('/plattegrond');
  await expect(page.locator('a[href="/inbrekers-van-nu#iemand-vraagt-me-een-code-door-te-sturen-wat-is-dit"]').first()).toBeAttached();
});

test('wie vraagt of een kwantumcomputer zijn berichten of bank openbreekt, vindt het hele antwoord onder één kop', async ({ page }) => {
  await page.goto('/inbrekers-van-morgen');
  const vraag = 'Kan een kwantumcomputer mijn berichten of bankzaken openbreken?';
  await page.locator('[data-overzicht] a', { hasText: vraag }).click();
  const kop = page.getByRole('heading', { level: 2, name: vraag });
  await expect(kop).toBeInViewport();
  // het antwoord staat direct onder de kop, niet verstopt in een uitklapper
  const antwoord = await kop.evaluate((h) => h.nextElementSibling?.textContent ?? '');
  expect(antwoord).toContain('nu nog niet');
  expect(antwoord).toContain('updates');
  expect(await kop.evaluate((h) => Boolean(h.closest('details')))).toBe(false);
  // het wachtwoord krijgt een antwoord in dezelfde sectie
  const sectie = await kop.evaluate((h) => {
    let t = '';
    for (let el = h.nextElementSibling; el && el.tagName !== 'H2' && el.tagName !== 'H3'; el = el.nextElementSibling) t += el.textContent;
    return t;
  });
  expect(sectie).toMatch(/Je wachtwoord: blijft gewoon goed, als het lang en sterk is/);
  // de verwachting staat er één keer, niet verspreid over de pagina
  const tekst = await page.locator('main').textContent();
  expect(tekst.match(/2030 en 2040/g)).toHaveLength(1);
  // de vraag die een leek stelt staat als kop, geen vakjargon
  await expect(page.getByRole('heading', { level: 3, name: 'Zijn mijn berichten nu al in gevaar?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /nu stelen, later openbreken/ })).toHaveCount(0);
});

test('in het overzicht staat de link op een eigen regel, niet als volgende zin van het advies', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  const rij = page.locator('[data-overzicht] dd').first();
  const [advies, link] = await Promise.all([rij.locator('.antwoord').boundingBox(), rij.locator('a').boundingBox()]);
  expect(link.y).toBeGreaterThan(advies.y + advies.height - 2);
  // vóór de eerste kop staan het kader en één korte lijst, geen lange
  expect(await page.locator('[data-overzicht] dt').count()).toBeLessThanOrEqual(8);
});

test('wie vraagt wat een passkey is, vindt het op de inbrekers van morgen met een stap om hem aan te zetten', async ({ page }) => {
  await page.goto('/inbrekers-van-morgen');
  // op een telefoon staat de inhoudsopgave eerst dicht
  if (!(await page.locator('[data-inhoud]').evaluate((d) => d.open))) await page.locator('[data-inhoud] summary').click();
  await page.locator('[data-inhoud] a', { hasText: 'passkey' }).click();
  const kop = page.getByRole('heading', { level: 2, name: 'Wat is een passkey, en moet ik die aanzetten?' });
  await expect(kop).toBeInViewport();
  const antwoord = await kop.evaluate((h) => h.nextElementSibling?.textContent ?? '');
  expect(antwoord).toMatch(/In het kort: ja, zet hem aan/);
  await expect(page.locator('[data-naar-doen] [data-doe-stap="accounts-tweede-slot"]')).toHaveCount(1);
});

test('het overzicht en de inhoudsopgave noemen elk onderwerp met dezelfde woorden', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  // elke rij in het overzicht heet net zo als de kop waar hij heen gaat, en die kop
  // staat ook in de inhoudsopgave: geen twee lijsten met andere namen
  const inhoud = (await page.locator('[data-inhoud] a').allTextContents()).map((t) => t.trim());
  for (const a of await page.locator('[data-overzicht] dd a').all()) {
    const tekst = (await a.textContent()).trim();
    const href = await a.getAttribute('href');
    await expect(page.locator(`h2${href}`), href).toHaveText(tekst);
    expect(inhoud, tekst).toContain(tekst);
  }
});

test('wie geappt wordt door "zijn kind" met een nieuw nummer, vindt het in de inhoudsopgave', async ({ page }) => {
  await page.goto('/inbrekers-van-nu');
  if (!(await page.locator('[data-inhoud]').evaluate((d) => d.open))) await page.locator('[data-inhoud] summary').click();
  for (const naam of ['Appt je kind vanaf een nieuw nummer en vraagt het om geld?', 'Wil een koper op Marktplaats dat je 1 cent overmaakt?']) {
    await expect(page.locator('[data-inhoud] a', { hasText: naam })).toHaveCount(1);
    const kop = page.getByRole('heading', { level: 2, name: naam });
    const antwoord = await kop.evaluate((h) => h.nextElementSibling?.textContent ?? '');
    expect(antwoord, naam).toContain('In het kort');
  }
});
