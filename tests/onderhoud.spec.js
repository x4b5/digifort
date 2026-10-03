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

test('stalkerware: de waarschuwing staat open, met Waarschuwing voor een schermlezer', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  const let_op = page.locator('#als-iemand-dichtbij-meekijkt ~ [data-waarschuwing]').first();
  await expect(let_op).toBeVisible();
  await expect(let_op).toContainText('Waarschuwing: Verwijder de app niet meteen');
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
  await page.locator('[data-beurt-stap="backup-loopt"] a[href="#stap-maand-kopie"]').first().evaluate((a) => a.click());
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

test('onderhoud: een bestand terugzetten maakt onderscheid tussen een kopie van de hele telefoon en losse foto\'s', async ({ page }) => {
  await page.goto('/onderhoud');
  const stap = page.locator('[data-beurt-stap="backup-loopt"]');
  await expect(stap).toContainText('Een kopie van je hele telefoon');
  await expect(stap).toContainText('Die open je niet per foto');
  await expect(stap).toContainText('Alleen een kopie van je hele telefoon');
  await expect(stap).toContainText('Finder');
  // de iPhone-check van twee keer per jaar is vandaag af te maken
  await expect(page.locator('[data-beurt-stap="geen-updates"] [data-gelukt]')).toContainText('staat op papier');
  // een schijf haal je veilig los
  await expect(page.locator('[data-beurt-stap="maand-kopie"]')).toContainText('Uitwerpen');
  // Windows terugzetten: de vragen die Windows stelt staan erbij
  await expect(page.locator('[data-beurt-stap="weg-wissen"]')).toContainText('Lokaal opnieuw installeren');
});

test('het bezoek: het tweede slot zegt wat een code op de telefoon is, en je hoeft niet uit te loggen', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  const stap = page.locator('[data-beurt-stap="mail-slot"]');
  await expect(stap).toContainText('Een sms');
  await expect(stap).toContainText('Een app die codes maakt');
  await expect(stap).toContainText('niet uit te loggen');
  await expect(page.locator('[data-beurt-stap="updates-aan"]')).toContainText('Apps en apparaat beheren');
});

test('onderhoud: Windows 10 zegt per wat je op het scherm ziet wat je doet', async ({ page }) => {
  await page.goto('/onderhoud');
  // de uitleg staat in de stap zelf, waar je winver doet, niet ergens verderop
  const meer = page.locator('[data-beurt-stap="geen-updates"] details', { hasText: 'Windows 10' });
  for (const tekst of ['Windows 11 te downloaden', 'Nu inschrijven', 'Allebei niet']) await expect(meer).toContainText(tekst);
  await expect(meer).not.toContainText('Ga naar 2');
  await expect(meer).toContainText('nieuw account maken');
  // geen vakwoorden zonder uitleg meer
  await expect(meer).not.toContainText('ChromeOS');
});

test('onderhoud en het bezoek blijven onder hun woordenplafond', async ({ request }) => {
  const { blokken, meet } = await import('../scripts/leesniveau.mjs');
  for (const [pad, plafond] of [['/onderhoud', 4000], ['/voor-de-mensen-om-je-heen', 3030]]) {
    const html = await (await request.get(pad)).text();
    expect(meet(blokken(html)).woorden, pad).toBeLessThanOrEqual(plafond);
  }
});

test('onderhoud: per klus kies je je eigen toestel, de rest blijft dicht', async ({ page }) => {
  await page.goto('/onderhoud');
  const updates = page.locator('[data-beurt-stap="maand-updates"]');
  // wie Edge gebruikt, vindt Edge
  await expect(updates.locator('details', { hasText: 'Windows-computer' })).toContainText('Edge');
  for (const id of ['maand-updates', 'maand-kopie', 'backup-loopt', 'noodcodes-kloppen']) {
    const keuzes = page.locator(`[data-beurt-stap="${id}"] details`);
    expect(await keuzes.count(), id).toBeGreaterThan(1);
    for (const keuze of await keuzes.all()) await expect(keuze).not.toHaveAttribute('open', '');
  }
  // een Samsung kiest de goede back-up, en vol iCloud zegt wat het kost en wat het alternatief is
  const kopie = page.locator('[data-beurt-stap="maand-kopie"]');
  await expect(kopie).toContainText('Samsung Cloud en Google');
  await expect(kopie).toContainText('met de prijs per maand erbij');
  await expect(kopie).toContainText('Niet betalen.');
  // icloud.com vraagt om een code op de iPhone; dat staat er vooraf, en waar het bestand staat ook
  const terug = page.locator('[data-beurt-stap="backup-loopt"]');
  await expect(terug).toContainText('code van je iPhone');
  await expect(terug).toContainText('Downloads');
});

test('onderhoud: herstelcodes zijn af te ronden voor elk soort adres, zonder naar een ander hoofdstuk te springen', async ({ page }) => {
  await page.goto('/onderhoud');
  const stap = page.locator('[data-beurt-stap="noodcodes-kloppen"]');
  await expect(stap).toContainText('back-upcodes');
  await expect(stap).toContainText('knop om codes te maken');
  await expect(stap.locator('details', { hasText: 'KPN' })).toContainText('Je hoeft hier niets te doen');
  await expect(stap.locator('a[href^="/voor-de-mensen-om-je-heen"]')).toHaveCount(0);
});

test('onderhoud: de Engelse uitslag van Have I Been Pwned wordt vertaald, en een Samsung-account gaat er ook af', async ({ page }) => {
  await page.goto('/onderhoud');
  const lek = page.locator('[data-beurt-stap="datalek"]');
  await expect(lek).toContainText('Good news');
  await expect(lek).toContainText('Oh no');
  await expect(lek).toContainText('wachtwoord vergeten');
  await expect(lek).not.toContainText('wachtwoordmanager');
  await expect(page.locator('[data-beurt-stap="weg-uitloggen"]')).toContainText('Samsung-account');
  // de quiz spreekt de maandklus niet tegen
  await expect(page.locator('[data-quiz]')).not.toContainText('houdt bijna niemand vol');
});

test('het bezoek: wie het voor zichzelf leest, en wie een KPN-adres heeft, komt er ook uit', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  await expect(page.getByText('Lees je dit voor jezelf?')).toBeVisible();
  const stap = page.locator('[data-beurt-stap="mail-slot"]');
  const kpn = stap.locator('details', { hasText: 'KPN' });
  for (const adres of ['@planet.nl', '@hetnet.nl']) await expect(kpn).toContainText(adres);
  await expect(kpn).toContainText('Dan is deze stap klaar');
  await expect(stap.locator('[data-gelukt]')).toContainText('nergens anders gebruikt');
  await expect(stap.locator('details', { hasText: '@gmail.com' })).toContainText('back-upcodes');
  // App Store-instellingen staan op nieuwe iPhones onder Apps
  await expect(page.locator('[data-beurt-stap="updates-aan"]')).toContainText('tot Apps');
});

test('mail van het internetbedrijf: waar je het wachtwoord verandert, en dat de Mail-app het nieuwe nodig heeft', async ({ page }) => {
  for (const [pad, stap] of [['/voor-de-mensen-om-je-heen', 'mail-slot'], ['/onderhoud', 'datalek']]) {
    await page.goto(pad);
    const mail = page.locator(`[data-beurt-stap="${stap}"] [data-providermail]`);
    await expect(mail, pad).toHaveCount(1);
    for (const tekst of ['mijn.kpn.com', 'ziggo.nl/mijn-ziggo', 'Mail-app', 'Wachtwoord']) await expect(mail, pad).toContainText(tekst);
  }
});

test('onderhoud: een volle iCloud kan ook gratis via Windows, en de browser herken je aan zijn plaatje', async ({ page }) => {
  await page.goto('/onderhoud');
  const kopie = page.locator('[data-beurt-stap="maand-kopie"]');
  await expect(kopie).toContainText('Apple Devices');
  await expect(kopie).not.toContainText('Vraag iemand om hulp');
  const updates = page.locator('[data-beurt-stap="maand-updates"]');
  await expect(updates).not.toContainText('edge://');
  for (const tekst of ['drie puntjes onder elkaar', 'drie streepjes']) await expect(updates).toContainText(tekst);
  // één foto terugzetten kan ook met alleen een telefoon
  await expect(page.locator('[data-beurt-stap="backup-loopt"] details', { hasText: 'op je telefoon' })).toHaveCount(1);
});

test('het bezoek: ook wie het voor zichzelf doet, heeft een pad, en Samsung zegt welk schuifje', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  await expect(page.locator('[data-beurt-stap="harde-regel"] details', { hasText: 'Voor jezelf' })).toHaveCount(1);
  await expect(page.locator('[data-beurt-stap="updates-aan"]')).toContainText('Automatisch downloaden via wifi');
  await expect(page.locator('[data-beurt-stap="schermslot"]')).toContainText('vier cijfers');
});

test('onderhoud en het bezoek: geen onuitgelegde beeldspraak of Engelse citaten', async ({ page }) => {
  for (const pad of ['/onderhoud', '/voor-de-mensen-om-je-heen']) {
    await page.goto(pad);
    await expect(page.locator('main'), pad).not.toContainText('timmerman');
    await expect(page.locator('main'), pad).not.toContainText('niveau 1');
  }
});

test('mail van het internetbedrijf: bellen mag, en de iPhone krijgt het wachtwoord ook voor versturen', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  const mail = page.locator('[data-beurt-stap="mail-slot"] [data-providermail]');
  for (const tekst of ['bel je internetbedrijf', 'gebruikersnaam', 'SMTP', 'Uitgaande mailserver', 'naar je eigen adres']) await expect(mail).toContainText(tekst);
});

test('het bezoek: wie het voor zichzelf doet, ziet bij stap 1, 2 en 7 wat anders is', async ({ page }) => {
  await page.goto('/voor-de-mensen-om-je-heen');
  for (const id of ['bel-mij', 'familiewoord', 'harde-regel']) await expect(page.locator(`[data-beurt-stap="${id}"]`), id).toContainText('Voor jezelf');
  await expect(page.locator('[data-beurt-stap="bel-mij"]')).not.toContainText('Typ je naam');
  await expect(page.locator('[data-beurt-stap="familiewoord"] [data-gelukt]')).toContainText('je familie kent het woord');
});

test('onderhoud: Samsung Agenda, versleutelen bij Apple Devices en een datalek zonder bank', async ({ page }) => {
  await page.goto('/onderhoud');
  const herinnering = page.locator('details', { hasText: 'Zo zet je een herinnering' });
  await expect(herinnering).toContainText('Samsung');
  await expect(herinnering).toContainText('twee afspraken');
  const kopie = page.locator('[data-beurt-stap="maand-kopie"]');
  await expect(kopie).toContainText('versleutelen');
  await expect(kopie).not.toContainText('tasje');
  const lek = page.locator('[data-beurt-stap="datalek"]');
  await expect(lek).not.toContainText('je bank');
  await expect(lek).toContainText('Doe dan eerst je e-mail');
  // een gedownloade foto staat bij zijn eigen datum, niet bij de nieuwste
  await expect(page.locator('[data-beurt-stap="backup-loopt"]')).not.toContainText('bij de nieuwste');
});
