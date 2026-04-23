import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

/**
 * Захватывает скриншоты прототипа AIHR-530 (ветка pl/scout-apply-flow-radar).
 * Использует уже запущенный vite на :10173.
 *   node _snap.mjs                  → /tmp/scout_<step>.png
 *   SNAP_OUT=/path/to/dir node _snap.mjs
 */

const steps = ['landing', 'register', 'screening', 'confirm', 'radar'];
const outDir = process.env.SNAP_OUT || '/tmp';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errs.push('console: ' + m.text());
});

for (const s of steps) {
  await page.goto('http://localhost:10173/#' + s, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const path = `${outDir}/scout_${s}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log('saved ' + path);
}

await browser.close();
console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'OK no errors');
