# Wat hier draait

`test.yml` bouwt de site en draait alle Playwright-tests bij elke push naar `main`
en bij elke pull request. Twee browsers: de desktoptests in Chromium, de
telefoontests in WebKit (Safari), want `<details>`, `:has()` en `localStorage`
gedragen zich daar net anders.

Faalt er iets, dan staat het rapport met screenshots zeven dagen bij de run onder
"Artifacts".

Tussen bouwen en testen staat `npm run check` (astro check). Die stap komt na
het bouwen, want hij leunt op de types die Astro voor de content-collecties
genereert. De teller staat op nul fouten en nul waarschuwingen; waarschuwingen
laten de stap nog wel slagen, fouten niet.
