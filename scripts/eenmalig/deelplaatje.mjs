/** Maakt public/deelplaatje.png (1200×630) — het plaatje dat verschijnt als iemand de site deelt. */
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,700&display=swap">
<style>
  body { margin:0; width:1200px; height:630px; background:#fff; color:#141414; font-family:"Atkinson Hyperlegible Next",system-ui,sans-serif; display:flex; align-items:center; }
  .tekst { padding:0 0 0 80px; width:640px; }
  h1 { font-family:"Bricolage Grotesque",sans-serif; font-size:72px; line-height:1.02; margin:0 0 24px; letter-spacing:-0.01em; }
  p { font-size:30px; line-height:1.35; margin:0; color:#4a4744; }
  .merk { font-family:"Bricolage Grotesque",sans-serif; color:#c8321e; font-size:22px; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:20px; }
  svg { width:420px; height:auto; margin-left:40px; }
  .tek { stroke:#141414; stroke-width:5; fill:none; stroke-linecap:round; stroke-linejoin:round; }
</style></head><body>
<div class="tekst"><div class="merk">digi-fort.</div><h1>Van open huis naar fort.</h1><p>Digitale weerbaarheid in gewone taal. Elke app is een deur. Deze site loopt met je mee tot je huis een fort is.</p></div>
<svg viewBox="0 0 200 180"><path class="tek" d="M20 160 V70 h24 v-18 h20 v18 h24 v-18 h20 v18 h24 v-18 h20 v18 h24 V160"/><path class="tek" d="M8 160 H192"/><path class="tek" d="M80 160 V118 a20 20 0 0 1 40 0 V160"/><path class="tek" d="M56 96 h20 M124 96 h20 M62 122 h14 M124 122 h14"/><circle cx="110" cy="132" r="4" fill="#c8321e"/><circle cx="110" cy="146" r="4" fill="#c8321e"/><path class="tek" style="stroke:#c8321e" d="M154 52 V18 h26 l-8 8 l8 8 h-26"/></svg>
</body></html>`;
writeFileSync('/tmp/deelplaatje.html', html);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file:///tmp/deelplaatje.html');
await page.waitForTimeout(1200);
await page.screenshot({ path: 'public/deelplaatje.png' });
await browser.close();
console.log('✔ public/deelplaatje.png');
