# digi-fort

Een Astro-site zonder database en zonder omgevingsvariabelen: alles staat in
`src/content` en `src/data`, en wordt bij het bouwen tot statische bestanden
gemaakt. Node 22.12 of nieuwer (`engines` in `package.json`).

## Commando's

<!-- AUTO-GENERATED: uit package.json — niet met de hand bijwerken -->

| Commando | Wat het doet |
|----------|--------------|
| `npm run dev` | Ontwikkelserver met hot reload |
| `npm run build` | Zet eerst de datums goed (`scripts/datums.mjs`), bouwt dan naar `dist/` |
| `npm run preview` | Toont de gebouwde `dist/` zoals Vercel hem serveert |
| `npm test` | Alle Playwright-tests (bouwt zelf eerst) |
| `npm run check` | Typecontrole van Astro-bestanden (`astro check`) |
| `npm run datums` | Alleen de datums bijwerken, zonder te bouwen |
| `npm run astro` | De Astro-CLI rechtstreeks |

<!-- /AUTO-GENERATED -->

## Drie dingen die hier anders gaan

**De ontwikkelserver draait op de achtergrond.** Start hem met
`astro dev --background`; beheer hem met `astro dev stop`, `astro dev status` en
`astro dev logs`.

**Kill de preview-server na een build.** `playwright.config.js` heeft
`reuseExistingServer: !process.env.CI`: staat er lokaal nog een server op poort
4173, dan hergebruiken de tests die — inclusief de oude `dist/` eronder. Dat
geeft tests die willekeurig falen op code die allang gewijzigd is.

**`npm run build` schrijft in je bronbestanden.** `scripts/datums.mjs` leest de
git-geschiedenis en zet "voor het laatst nagelopen" per hoofdstuk gelijk aan de
laatste commit op dat bestand. Buiten een volledige git-map doet het script
niets, zodat een ondiepe kloon de vastgelegde datums niet overschrijft.

## Testen

De tests staan in `tests/`, één bestand per onderwerp. Ze draaien in twee
uitvoeringen: `desktop` (1200×900) en `telefoon` (iPhone 13). In CI is dat
Chromium en WebKit, want `<details>`, `:has()` en `localStorage` gedragen zich in
Safari net anders. `.github/workflows/README.md` beschrijft die keten.

## Documentatie

Volledige documentatie: https://docs.astro.build

Raadpleeg deze gidsen voordat je aan verwant werk begint:

- [Pagina's, dynamische routes of middleware toevoegen](https://docs.astro.build/en/guides/routing/)
- [Werken met Astro-componenten](https://docs.astro.build/en/basics/astro-components/)
- [React, Vue, Svelte of andere framework-componenten gebruiken](https://docs.astro.build/en/guides/framework-components/)
- [Content toevoegen of beheren](https://docs.astro.build/en/guides/content-collections/)
- [Stijlen toevoegen of Tailwind gebruiken](https://docs.astro.build/en/guides/styling/)
- [Meerdere talen ondersteunen](https://docs.astro.build/en/guides/internationalization/)
