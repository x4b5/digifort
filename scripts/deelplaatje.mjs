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
<div class="tekst"><div class="merk">Je digitale huis</div><h1>Je gaat niet naar het internet. Het internet komt bij jou binnen.</h1><p>Digitale veiligheid in gewone taal. Zonder bangmakerij, zonder reclame.</p></div>
<svg viewBox="0 0 200 180"><path class="tek" d="M20 90 L100 20 L180 90"/><path class="tek" d="M36 80 V160 H164 V80"/><path class="tek" d="M82 160 V118 a18 18 0 0 1 36 0 V160"/><rect x="60" y="92" width="26" height="24" class="tek"/><rect x="114" y="92" width="26" height="24" class="tek"/><circle cx="110" cy="138" r="4" fill="#c8321e"/><circle cx="110" cy="150" r="4" fill="#c8321e"/></svg>
</body></html>`;
writeFileSync('/tmp/deelplaatje.html', html);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file:///tmp/deelplaatje.html');
await page.waitForTimeout(1200);
await page.screenshot({ path: 'public/deelplaatje.png' });
await browser.close();
console.log('✔ public/deelplaatje.png');
