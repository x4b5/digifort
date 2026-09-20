# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: toegankelijkheid.spec.js >> /woordenboek heeft geen toegankelijkheidsfouten (axe)
- Location: tests/toegankelijkheid.spec.js:7:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "scrollable-region-focusable: Scrollable region must have keyboard access (1)",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Naar de inhoud" [ref=e2] [cursor=pointer]:
    - /url: "#inhoud"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Je digitale huis" [ref=e5] [cursor=pointer]:
        - /url: /
      - group [ref=e11]:
        - generic "Menu" [ref=e12] [cursor=pointer]
  - main [ref=e13]:
    - paragraph [ref=e14]: Hoofdstuk 8
    - heading "Woordenboek" [level=1] [ref=e15]
    - paragraph [ref=e16]: Elke vakterm in één zin, met de plek in het huis erbij.
    - generic [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]: Zoek een woord
        - searchbox "Zoek een woord" [ref=e20]
      - paragraph [ref=e21]: 25 woorden
      - table [ref=e23]:
        - rowgroup [ref=e24]:
          - row [ref=e25]:
            - columnheader "Term" [ref=e26]
            - columnheader "In gewone taal" [ref=e27]
            - columnheader "In het huis" [ref=e28]
        - rowgroup [ref=e29]:
          - row [ref=e30]:
            - cell "2FA / tweestapsverificatie" [ref=e31]
            - cell "Na je wachtwoord nog een tweede bewijs dat jij het bent" [ref=e32]
            - cell "Het tweede slot" [ref=e33]
          - row [ref=e34]:
            - cell "Alias (e-mail)" [ref=e35]
            - cell "Een wegwerpadres dat doorstuurt naar je echte adres" [ref=e36]
            - cell "Een aparte brievenbus per afzender" [ref=e37]
          - row [ref=e38]:
            - cell "Authenticator-app" [ref=e39]
            - cell "App die elke halve minuut een nieuwe inlogcode maakt" [ref=e40]
            - cell "De sleutel van het tweede slot" [ref=e41]
          - row [ref=e42]:
            - cell "AVG" [ref=e43]
            - cell "De Europese privacywet over omgaan met persoonsgegevens" [ref=e44]
            - cell "De huisregels voor andermans sleutels" [ref=e45]
          - row [ref=e46]:
            - cell "Back-up" [ref=e47]
            - cell "Een kopie van je bestanden op een andere plek" [ref=e48]
            - cell "De brandkast buiten de deur" [ref=e49]
          - row [ref=e50]:
            - cell "Datalek" [ref=e51]
            - cell "Gegevens die bij een bedrijf op straat komen te liggen" [ref=e52]
            - cell "Inbraak bij de sleutelmaker" [ref=e53]
          - row [ref=e54]:
            - cell "Deepfake" [ref=e55]
            - cell "Met AI nagemaakte video, foto of stem van een echt persoon" [ref=e56]
            - cell "Een inbreker met het gezicht van je buurman" [ref=e57]
          - row [ref=e58]:
            - cell "Encryptie / versleuteling" [ref=e59]
            - cell "Gegevens onleesbaar maken voor wie de sleutel niet heeft" [ref=e60]
            - cell "Een kluis om je spullen" [ref=e61]
          - row [ref=e62]:
            - cell "Extensie" [ref=e63]
            - cell "Een uitbreiding voor je browser" [ref=e64]
            - cell "Iemand die mag meekijken door je raam" [ref=e65]
          - row [ref=e66]:
            - cell "Firmware" [ref=e67]
            - cell "De ingebouwde software van een apparaat, zoals je router" [ref=e68]
            - cell "Het binnenwerk van het slot" [ref=e69]
          - row [ref=e70]:
            - cell "Hardware key" [ref=e71]
            - cell "Een fysiek sleuteltje dat je in je apparaat steekt of ertegen houdt" [ref=e72]
            - cell "Een echte sleutel aan je sleutelbos" [ref=e73]
          - row [ref=e74]:
            - cell "Herstelcodes" [ref=e75]
            - cell "Eenmalige noodcodes om binnen te komen zonder telefoon" [ref=e76]
            - cell "De reservesleutel bij de buren" [ref=e77]
          - row [ref=e78]:
            - cell "Kwantumcomputer" [ref=e79]
            - cell "Nieuw type computer dat bepaalde wiskundige sloten kan breken" [ref=e80]
            - cell "De loper voor oude sloten" [ref=e81]
          - row [ref=e82]:
            - cell "Malware" [ref=e83]
            - cell "Verzamelnaam voor kwaadaardige software" [ref=e84]
            - cell "Ongedierte in huis" [ref=e85]
          - row [ref=e86]:
            - cell "Passkey" [ref=e87]
            - cell "Inloggen met vingerafdruk of gezicht in plaats van een wachtwoord" [ref=e88]
            - cell "De sleutel die niet te kopiëren is" [ref=e89]
          - row [ref=e90]:
            - cell "Phishing" [ref=e91]
            - cell "Nepbericht dat je laat klikken, inloggen of betalen" [ref=e92]
            - cell "De babbeltruc aan de deur" [ref=e93]
          - row [ref=e94]:
            - cell "Post-kwantumcryptografie" [ref=e95]
            - cell "Nieuwe versleuteling die bestand is tegen kwantumcomputers" [ref=e96]
            - cell "De nieuwe generatie sloten" [ref=e97]
          - row [ref=e98]:
            - cell "Ransomware" [ref=e99]
            - cell "Software die je bestanden gijzelt voor losgeld" [ref=e100]
            - cell "Gijzeling van je inboedel" [ref=e101]
          - row [ref=e102]:
            - cell "Router" [ref=e103]
            - cell "Het kastje dat je huis met internet verbindt" [ref=e104]
            - cell "Tuinhek en meterkast" [ref=e105]
          - row [ref=e106]:
            - cell "Sim-swapping" [ref=e107]
            - cell "Je telefoonnummer laten overzetten naar een oplichter" [ref=e108]
            - cell "Iemand laat je post omleiden" [ref=e109]
          - row [ref=e110]:
            - cell "Social engineering" [ref=e111]
            - cell "Mensen manipuleren in plaats van systemen hacken" [ref=e112]
            - cell "De inbreker die aanbelt in een net pak" [ref=e113]
          - row [ref=e114]:
            - cell "Tracking" [ref=e115]
            - cell "Volgen wat je online doet om een profiel op te bouwen" [ref=e116]
            - cell "Meekijkers door het raam" [ref=e117]
          - row [ref=e118]:
            - cell "Update" [ref=e119]
            - cell "Reparatie van fouten in software" [ref=e120]
            - cell "De timmerman die scheuren dicht" [ref=e121]
          - row [ref=e122]:
            - cell "VPN" [ref=e123]
            - cell "Een afgeschermde verbinding tussen jou en het internet" [ref=e124]
            - cell "De overdekte gang naar buiten" [ref=e125]
          - row [ref=e126]:
            - cell "Wachtwoordmanager" [ref=e127]
            - cell "Programma dat al je wachtwoorden maakt en bewaart" [ref=e128]
            - cell "De sleutelkluis" [ref=e129]
    - navigation "Vorige en volgende" [ref=e130]:
      - link "← Voor de mensen om je heen" [ref=e131] [cursor=pointer]:
        - /url: /voor-de-mensen-om-je-heen
      - link "Over deze site →" [ref=e132] [cursor=pointer]:
        - /url: /over
  - contentinfo [ref=e133]:
    - generic [ref=e134]:
      - paragraph [ref=e135]:
        - text: Deze pagina is voor het laatst nagelopen op
        - time [ref=e136]: 20 september 2026
        - text: .
      - paragraph [ref=e137]:
        - text: Gratis, onafhankelijk, zonder reclame en zonder volgers.
        - link "Over deze site" [ref=e138] [cursor=pointer]:
          - /url: /over
        - text: ·
        - button "Wis mijn antwoorden" [ref=e139] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | const PAGINAS = ['/', '/huischeck', '/plattegrond', '/aan-de-slag', '/van-geheim-woord-naar-zegelring', '/als-er-is-ingebroken', '/woordenboek', '/over'];
  5  | 
  6  | for (const pad of PAGINAS) {
  7  |   test(`${pad} heeft geen toegankelijkheidsfouten (axe)`, async ({ page }) => {
  8  |     await page.goto(pad);
  9  |     const uitslag = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  10 |     const ernstig = uitslag.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
> 11 |     expect(ernstig.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
     |                                                                          ^ Error: expect(received).toEqual(expected) // deep equality
  12 |   });
  13 | }
  14 | 
```