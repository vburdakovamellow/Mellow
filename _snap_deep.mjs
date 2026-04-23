import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

/**
 * Captures deeper states of the AIHR-530 prototype that require
 * user interaction to reach. Uses an already-running vite on :10173.
 *   SNAP_OUT=/path/to/dir node _snap_deep.mjs
 */

const outDir = process.env.SNAP_OUT || '/tmp';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errs.push('console: ' + m.text());
});

// 1) Screening — open the cover-letter form with sample materials filled in
await page.goto('http://localhost:10173/#screening', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.getByRole('button', { name: 'Use sample CV' }).click();
await page.waitForTimeout(1300);
await page.getByRole('button', { name: /Looks right/ }).click();
await page.waitForTimeout(300);
await page.getByRole('button', { name: 'Use sample materials (prototype)' }).click();
await page.waitForTimeout(300);
let path = `${outDir}/scout_screening_cover_filled.png`;
await page.screenshot({ path, fullPage: true });
console.log('saved ' + path);

// 2) Confirm — preview with sample cover + attachments + links present
await page.getByRole('button', { name: /Looks good/ }).click();
await page.waitForTimeout(300);
await page.getByRole('button', { name: /Continue to review/ }).click();
await page.waitForTimeout(500);
path = `${outDir}/scout_confirm_filled.png`;
await page.screenshot({ path, fullPage: true });
console.log('saved ' + path);

await browser.close();
console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'OK no errors');
