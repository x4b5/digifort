# Eenmalige scripts

Deze scripts horen **niet** in de build. Ze zijn één keer gebruikt of draai je met de hand.

- `split.mjs` — heeft op 20 sept 2026 één bestand met alle tekst opgeknipt in de twaalf
  hoofdstukken. **Niet meer draaien:** het overschrijft `src/content/hoofdstukken/*.mdx`
  vanuit een bronbestand dat niet meer bestaat.
- `deelplaatje.mjs` — maakt `public/deelplaatje.png`, het plaatje dat verschijnt als iemand
  de site deelt. Draai met de hand als het beeld verandert.
- `animatie-linkedin.mjs` — maakt de animatie "huis wordt fort" voor LinkedIn.
  Vereist een verse `dist/`, dus eerst `npm run build`.

Alleen `scripts/datums.mjs` hoort in de build: die haalt uit de git-geschiedenis wanneer
elk hoofdstuk voor het laatst is aangeraakt.
