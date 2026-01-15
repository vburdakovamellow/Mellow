import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function takeScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Устанавливаем размер окна браузера
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Открываем локальный dev сервер на странице /edit
  await page.goto('http://localhost:5173/edit', { 
    waitUntil: 'networkidle',
    timeout: 30000 
  });
  
  // Ждем, пока контент загрузится
  try {
    await page.waitForSelector('body', { timeout: 10000 });
    // Ждем дополнительно для загрузки всех элементов
    await page.waitForTimeout(5000);
    // Ждем, пока не прекратятся сетевые запросы
    await page.waitForLoadState('networkidle');
  } catch (e) {
    console.log('Waiting for page content...', e.message);
    // Даже если что-то не загрузилось, ждем еще немного
    await page.waitForTimeout(3000);
  }
  
  // Делаем скриншот всей страницы
  const screenshotPath = join(__dirname, 'screenshot-full-page.png');
  await page.screenshot({ 
    path: screenshotPath,
    fullPage: true,
    timeout: 30000
  });
  
  console.log(`Скриншот сохранен: ${screenshotPath}`);
  
  await browser.close();
}

takeScreenshot().catch(console.error);
