import { chromium } from 'playwright';

(async () => {
  const step = process.env.SCREENSHOT_STEP || 'just_created'; // just_created | ultra_ordered | sourcing | ready_for_review
  const baseUrl = process.env.SCREENSHOT_URL || 'http://localhost:10174/';
  const base = baseUrl.replace(/\/$/, '');
  const url = step === 'just_created' ? baseUrl : `${base}?step=${step}`;
  const filenames = { just_created: 'screenshot-candidates-just-created.png', ultra_ordered: 'screenshot-candidates-ultra-ordered.png', sourcing: 'screenshot-candidates-sourcing.png', ready_for_review: 'screenshot-candidates-ready-for-review.png' };
  const filename = filenames[step] || `screenshot-candidates-${step}.png`;

  const browser = await chromium.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.goto(url, { timeout: 30000, waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});

  await page.screenshot({
    path: filename,
    fullPage: true
  });

  console.log(`✅ Screenshot saved to ${filename} (step: ${step})`);
  await browser.close();
})();
