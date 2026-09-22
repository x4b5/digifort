/**
 * Maakt een vierkante animatie (1080x1080, 10s) voor LinkedIn uit de tekeningen van de site.
 * Verhaal: het open huis tekent zichzelf -> de zwakke plekken knipperen rood -> het fort staat groen.
 * Frame-voor-frame: de animaties worden gepauzeerd en per beeld handmatig vooruitgezet.
 *
 * Gebruik (dist/ moet bestaan, dus eerst npm run build):
 *   node scripts/animatie-linkedin.mjs /tmp/digifort-frames
 *   ffmpeg -y -framerate 30 -i /tmp/digifort-frames/%04d.png -c:v libx264 -preset slow \
 *     -crf 20 -pix_fmt yuv420p -movflags +faststart ~/Desktop/digifort-animatie.mp4
 */
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';

const FPS = Number(process.env.FPS || 30);
const DUUR = 10;          // seconden
const MAAT = 1080;
const FRAMES = process.argv[2] || '/tmp/digifort-frames';

const index = readFileSync('dist/index.html', 'utf8');
const css = readFileSync('src/styles/global.css', 'utf8').match(/\/\* tekeningen \*\/[\s\S]*?\.tek-stippel[^\n]*\n/)[0];

const schoon = (s) => s.replace(/<text class="tek-tekst"[\s\S]*?<\/text>/g, '');
const huis = schoon(index.match(/<svg class="links"[\s\S]*?<\/svg>/)[0]).replace('<svg ', '<svg id="huis" ');
const fort = schoon(index.match(/<svg class="rechts"[\s\S]*?<\/svg>/)[0])
  .replace('<svg ', '<svg id="fort" ')
  .replace(/<a href="[^"]*" data-deel="([^"]*)"/g, '<a data-deel="$1" data-toestand="dicht"');

const html = `<!doctype html><html lang="nl"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,700&display=swap">
<style>
  :root { --papier:#fff; --inkt:#141414; --inkt-zacht:#4a4744; --lijn-sterk:#141414; --rood:#c8321e; --groen:#2e7d4f;
          --kop:"Bricolage Grotesque",sans-serif; --tekst:"Atkinson Hyperlegible Next",system-ui,sans-serif; }
  * { box-sizing:border-box; }
  body { margin:0; width:${MAAT}px; height:${MAAT}px; background:var(--papier); color:var(--inkt);
         font-family:var(--tekst); padding:72px 76px 64px; display:flex; flex-direction:column; }
  .merk { font-family:var(--kop); color:var(--rood); font-size:24px; letter-spacing:0.14em; text-transform:uppercase; }
  .woorden { position:relative; height:250px; margin-top:22px; }
  .blok { position:absolute; inset:0; }
  h1 { font-family:var(--kop); font-size:80px; line-height:1; margin:0 0 20px; letter-spacing:-0.015em; }
  p { font-size:32px; line-height:1.3; margin:0; color:var(--inkt-zacht); max-width:860px; }
  .beeld { position:relative; flex:1; margin:8px 0 34px; }
  .beeld svg { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:84%; height:auto; overflow:visible; }
  .voet { font-family:var(--kop); font-size:28px; display:flex; justify-content:space-between; align-items:center; }
  .voet .url { color:var(--rood); }
  [data-toestand="dicht"] .tek, [data-toestand="dicht"] .tek-dun { stroke: var(--groen); }
  [data-toestand="dicht"] .tek-vul { fill: var(--groen); }
  ${css}
  @keyframes teken   { from { stroke-dashoffset: var(--len); } to { stroke-dashoffset: 0; } }
  @keyframes opkomen { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
  @keyframes weg     { from { opacity:1; } to { opacity:0; } }
  @keyframes puls    { 0%,100% { opacity:1; } 50% { opacity:0.12; } }
  @keyframes deel    { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
</style></head><body>
  <div class="merk" style="animation:opkomen .5s ease 0s both">digiFORT.</div>
  <div class="woorden">
    <div class="blok" style="animation:opkomen .6s ease .25s both, weg .5s ease 5.2s both">
      <h1>Staat jouw deur open?</h1>
      <p id="sub1" style="animation:opkomen .6s ease 2.6s both">Open deur. Wachtwoord op het raam. Sleutel onder de mat.</p>
    </div>
    <div class="blok" style="animation:opkomen .6s ease 5.7s both">
      <h1>Van open huis naar fort.</h1>
      <p style="animation:opkomen .6s ease 7.4s both">Tien vragen, twee minuten. In gewone taal, zonder reclame.</p>
    </div>
  </div>
  <div class="beeld">
    <div id="huis-wrap" style="position:absolute;inset:0;animation:weg .6s ease 5.2s both">${huis}</div>
    ${fort}
  </div>
  <div class="voet"><span style="animation:opkomen .5s ease .1s both">Digitale veiligheid in gewone taal.</span><span class="url" style="animation:opkomen .5s ease .1s both">digifort-blue.vercel.app</span></div>
<script>
  // het huis tekent zichzelf, lijn voor lijn
  document.querySelectorAll('#huis path, #huis line, #huis rect, #huis circle, #huis text').forEach((el, i) => {
    const start = 0.35 + i * 0.055;
    const rood = el.classList.contains('tek-rood') || el.classList.contains('tek-vul');
    const pulsen = rood ? ', puls .9s ease 3.3s 2 both' : '';
    const lijn = el.getTotalLength && !el.classList.contains('tek-stippel')
      && el.tagName !== 'text' && getComputedStyle(el).fill === 'none';
    if (lijn) {
      const L = el.getTotalLength();
      el.style.setProperty('--len', L);
      el.style.strokeDasharray = L;
      el.style.animation = 'teken .75s ease ' + start + 's both' + pulsen;
    } else {
      el.style.animation = 'opkomen .5s ease ' + start + 's both' + pulsen;
    }
  });
  // het fort verschijnt deel voor deel
  document.querySelectorAll('#fort > line').forEach(el => { el.style.animation = 'opkomen .5s ease 5.5s both'; });
  document.querySelectorAll('#fort a').forEach((el, i) => {
    el.style.animation = 'deel .55s ease ' + (5.7 + i * 0.17) + 's both';
  });
</script>
</body></html>`;

writeFileSync('/tmp/anim-linkedin.html', html);
rmSync(FRAMES, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: MAAT, height: MAAT }, deviceScaleFactor: 1 });
await page.goto('file:///tmp/anim-linkedin.html');
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);

const totaal = FPS * DUUR;
for (let f = 0; f < totaal; f++) {
  const ms = (f / FPS) * 1000;
  await page.evaluate((t) => {
    document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; });
  }, ms);
  await page.screenshot({ path: `${FRAMES}/${String(f).padStart(4, '0')}.png` });
  if (f % 30 === 0) console.log(`  ${f}/${totaal}`);
}
await browser.close();
console.log('✔ frames in', FRAMES);
