import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    headless: false // Запускаем видимый браузер, чтобы избежать ошибки
  });
  const page = await browser.newPage();
  
  // Переходим на локальный dev server
  await page.goto('http://localhost:10173/');
  
  // Ждем загрузки контента
  await page.waitForLoadState('networkidle');
  
  // Делаем скриншот всей страницы
  await page.screenshot({ 
    path: 'sharepack-linkedin-complete.png', 
    fullPage: true 
  });
  
  console.log('✅ Screenshot saved to sharepack-linkedin-complete.png');
  
  await browser.close();
})();
