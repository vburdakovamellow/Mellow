import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    headless: false // Запускаем видимый браузер, чтобы избежать ошибки
  });
  const page = await browser.newPage();
  
  // Переходим на локальный dev server
  await page.goto('http://localhost:5173/');
  
  // Ждем загрузки контента
  await page.waitForLoadState('networkidle');
  
  // Делаем скриншот всей страницы
  await page.screenshot({ 
    path: 'screenshot-full-page.png', 
    fullPage: true 
  });
  
  console.log('✅ Screenshot saved to screenshot-full-page.png');
  
  await browser.close();
})();
