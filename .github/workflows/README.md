# Wat hier draait

`test.yml` bouwt de site en draait alle Playwright-tests bij elke push naar `main`
en bij elke pull request. Twee browsers: de desktoptests in Chromium, de
telefoontests in WebKit (Safari), want `<details>`, `:has()` en `localStorage`
gedragen zich daar net anders.

Faalt er iets, dan staat het rapport met screenshots zeven dagen bij de run onder
"Artifacts".

Nog niet in deze keten: `npm run check` (astro check). Dat geeft nu nog 37
meldingen over impliciete types in de databestanden; zodra die weg zijn, hoort de
stap hier tussen bouwen en testen.
